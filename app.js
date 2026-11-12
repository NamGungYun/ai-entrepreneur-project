// 혼밥 탈출 — 밥약 방 개설·참여 + 실시간 채팅
// 아래 키는 화면에 공개해도 되는 공개용(anon) 키다. 관리자 키는 여기에 넣지 않는다.
const SUPABASE_URL = "https://pepylxlqpguelmujuxwd.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBlcHlseGxxcGd1ZWxtdWp1eHdkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTQ0NDcwMzUsImV4cCI6MjExMDAyMzAzNX0.4uJjQjGGP0cixAA_ywT_RM_Kuq3pmdHpDr09y3Zb000";
const db = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

const app = document.getElementById("app");
const toastEl = document.getElementById("toast");

const state = {
  nick: readNick(),
  view: "list",        // gate | list | create | room
  day: "today",        // today | tomorrow
  rooms: [],
  members: [],         // 목록에 보이는 방들의 참여자
  roomId: null,
  messages: [],
};
let channel = null;
let pollTimer = null;
let toastTimer = null;

function readNick() {
  try { return localStorage.getItem("honbap.nick") || ""; } catch { return ""; }
}
function saveNick(n) {
  try { localStorage.setItem("honbap.nick", n); } catch { /* 저장이 막혀도 계속 쓴다 */ }
}

// ---------- 작은 도우미 ----------
function el(tag, attrs = {}, ...kids) {
  const n = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (v == null || v === false) continue;
    if (k === "class") n.className = v;
    else if (k.startsWith("on")) n.addEventListener(k.slice(2), v);
    else if (v === true) n.setAttribute(k, "");
    else n.setAttribute(k, v);
  }
  for (const kid of kids.flat()) {
    if (kid == null || kid === false) continue;
    n.append(kid.nodeType ? kid : document.createTextNode(String(kid)));
  }
  return n;
}
function toast(text) {
  toastEl.textContent = text;
  toastEl.hidden = false;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => { toastEl.hidden = true; }, 2600);
}
const pad = (n) => String(n).padStart(2, "0");
function ymd(d) { return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`; }
function dayOf(offset) { const d = new Date(); d.setDate(d.getDate() + offset); return d; }
function hhmm(iso) { const d = new Date(iso); return `${pad(d.getHours())}:${pad(d.getMinutes())}`; }
function dayLabel(iso) {
  const key = ymd(new Date(iso));
  if (key === ymd(dayOf(0))) return "오늘";
  if (key === ymd(dayOf(1))) return "내일";
  const d = new Date(iso);
  return `${d.getMonth() + 1}월 ${d.getDate()}일`;
}
function membersOf(roomId) { return state.members.filter((m) => m.room_id === roomId); }
function currentRoom() { return state.rooms.find((r) => r.id === state.roomId) || null; }
function mapUrl(place) { return "https://map.kakao.com/link/search/" + encodeURIComponent(place); }

// ---------- 데이터 ----------
async function loadRooms() {
  const from = new Date(); from.setHours(0, 0, 0, 0);
  const to = dayOf(2); to.setHours(0, 0, 0, 0);
  const { data: rooms, error } = await db.from("rooms").select("*")
    .gte("meet_at", from.toISOString()).lt("meet_at", to.toISOString())
    .order("meet_at", { ascending: true });
  if (error) { toast("방 목록을 불러오지 못했어요. 잠시 뒤 다시 시도해 주세요."); return; }
  state.rooms = rooms;
  if (rooms.length) {
    const { data: members } = await db.from("members").select("*")
      .in("room_id", rooms.map((r) => r.id)).order("joined_at", { ascending: true });
    state.members = members || [];
  } else {
    state.members = [];
  }
}
async function loadMessages() {
  if (!state.roomId) return;
  const { data, error } = await db.from("messages").select("*")
    .eq("room_id", state.roomId).order("created_at", { ascending: true }).limit(200);
  if (!error) state.messages = data;
}

function subscribe() {
  if (channel) db.removeChannel(channel);
  channel = db.channel("honbap-live")
    .on("postgres_changes", { event: "*", schema: "public", table: "rooms" }, onRoomsChanged)
    .on("postgres_changes", { event: "*", schema: "public", table: "members" }, onRoomsChanged)
    .on("postgres_changes", { event: "INSERT", schema: "public", table: "messages" }, (p) => {
      if (p.new.room_id !== state.roomId) return;
      if (state.messages.some((m) => m.id === p.new.id)) return;
      state.messages.push(p.new);
      if (state.view === "room") renderMessages(true);
    })
    .subscribe();
  // 실시간 연결이 끊겨도 화면이 멈추지 않도록 5초마다 다시 불러온다.
  clearInterval(pollTimer);
  pollTimer = setInterval(async () => {
    if (document.hidden) return;
    if (state.view === "list") { await loadRooms(); renderListBody(); }
    if (state.view === "room") {
      const before = state.messages.length;
      await Promise.all([loadRooms(), loadMessages()]);
      renderRoomHead();
      if (state.messages.length !== before) renderMessages(true);
    }
  }, 5000);
}
async function onRoomsChanged() {
  await loadRooms();
  if (state.view === "list") renderListBody();
  if (state.view === "room") renderRoomHead();
}

// ---------- 동작 ----------
async function joinRoom(roomId) {
  const { error } = await db.from("members").insert({ room_id: roomId, nickname: state.nick });
  if (error) {
    if (String(error.message).includes("ROOM_FULL")) toast("방금 정원이 찼어요.");
    else if (error.code === "23505") toast("이미 참여한 방이에요.");
    else toast("참여하지 못했어요. 다시 시도해 주세요.");
  } else {
    toast("참여했어요. 채팅으로 만날 곳을 정해 보세요.");
  }
  await loadRooms();
  renderRoomHead();
}
async function leaveRoom(roomId) {
  const { error } = await db.from("members").delete().eq("room_id", roomId).eq("nickname", state.nick);
  if (error) toast("나가지 못했어요. 다시 시도해 주세요.");
  await loadRooms();
  renderRoomHead();
}
async function sendMessage(text) {
  const body = text.trim();
  if (!body) return false;
  const { data, error } = await db.from("messages")
    .insert({ room_id: state.roomId, nickname: state.nick, body: body.slice(0, 300) }).select().single();
  if (error) { toast("메시지를 보내지 못했어요."); return false; }
  if (!state.messages.some((m) => m.id === data.id)) { state.messages.push(data); renderMessages(true); }
  return true;
}
async function reportRoom(roomId) {
  const reason = window.prompt("신고 사유를 적어 주세요. (예: 부적절한 대화, 약속 장소가 공개된 식당이 아님)");
  if (!reason || !reason.trim()) return;
  const { error } = await db.from("reports").insert({ room_id: roomId, reporter: state.nick, reason: reason.trim().slice(0, 200) });
  toast(error ? "신고를 접수하지 못했어요. 다시 시도해 주세요." : "신고가 접수됐어요.");
}

// ---------- 화면 ----------
function go(view, extra = {}) {
  Object.assign(state, extra, { view });
  render();
  window.scrollTo(0, 0);
}
function render() {
  if (!state.nick) return renderGate();
  if (state.view === "create") return renderCreate();
  if (state.view === "room") return renderRoom();
  renderList();
}

function renderGate() {
  let err;
  let intent = "list";
  const feats = [
    ["list", "밥약 방 참여하기", "오늘·내일 열린 방에 버튼 한 번으로"],
    ["create", "밥약 방 열기", "시간·식당·메뉴·정원을 정해서"],
    ["list", "방 안에서 채팅하기", "만날 곳과 시간을 실시간으로 조율"],
  ];
  const featBtns = feats.map(([to, title, sub], i) => el("button", {
    class: "feat", type: "button", "aria-pressed": "false",
    onclick: (e) => {
      intent = to;
      featBtns.forEach((b) => b.setAttribute("aria-pressed", "false"));
      e.currentTarget.setAttribute("aria-pressed", "true");
      nick.focus();
    },
  }, el("span", { class: "n" }, String(i + 1)), el("span", {}, el("b", {}, title), el("small", {}, sub))));
  const nick = el("input", { type: "text", maxlength: "12", autocomplete: "nickname", placeholder: "예: 점심메이트", required: true });
  const adult = el("input", { type: "checkbox", required: true });
  const form = el("form", {
    onsubmit: (e) => {
      e.preventDefault();
      const n = nick.value.trim();
      if (!n) { err.textContent = "닉네임을 입력해 주세요."; return; }
      if (!adult.checked) { err.textContent = "만 19세 이상 확인에 체크해 주세요."; return; }
      state.nick = n; saveNick(n);
      state.view = intent;
      start();
    },
  },
    el("label", { class: "field" }, el("span", {}, "닉네임"), nick),
    el("label", { class: "check" }, adult, el("span", {}, "만 19세 이상이며, 공개된 식당에서만 만나겠습니다.")),
    (err = el("p", { class: "err", role: "alert" })),
    el("button", { class: "btn", type: "submit" }, "밥약 보러 가기"),
  );
  app.replaceChildren(el("section", { class: "gate" },
    el("p", { class: "mark" }, "혼밥 탈출"),
    el("h1", {}, "오늘 ", el("em", {}, "같이"), " 먹을", el("br"), "사람 있어요?"),
    el("p", { class: "lead" }, "혼자 밥 먹기 외로운 사람을 위한 밥약 서비스예요. 언제, 어디서, 무엇을 먹을지 정한 방에 바로 참여하세요."),
    el("div", { class: "feats" }, featBtns),
    form,
    el("p", { class: "proto" }, "수업용 시제품 · 목록의 '가상 사용자' 방은 예시 데이터입니다"),
  ));
}

function topBar() {
  return el("header", { class: "top" },
    el("div", { class: "brand" }, "혼밥 ", el("em", {}, "탈출")),
    el("button", {
      class: "me", type: "button", "aria-label": "닉네임 바꾸기",
      onclick: () => { state.nick = ""; saveNick(""); render(); },
    }, state.nick + " · 바꾸기"),
  );
}

function renderList() {
  const tab = (key, label) => el("button", {
    class: "tab", type: "button", role: "tab", "aria-selected": String(state.day === key),
    onclick: () => { state.day = key; renderList(); },
  }, label);
  app.replaceChildren(
    topBar(),
    el("div", { class: "tabs", role: "tablist" }, tab("today", "오늘"), tab("tomorrow", "내일")),
    el("div", { id: "listBody" }),
    el("button", { class: "btn fab", type: "button", onclick: () => go("create") }, "+ 밥약 방 열기"),
  );
  renderListBody();
}
function renderListBody() {
  const body = document.getElementById("listBody");
  if (!body) return;
  const key = ymd(dayOf(state.day === "today" ? 0 : 1));
  const rooms = state.rooms.filter((r) => ymd(new Date(r.meet_at)) === key);
  if (!rooms.length) {
    body.replaceChildren(el("div", { class: "empty" },
      el("strong", {}, state.day === "today" ? "오늘 열린 밥약이 아직 없어요" : "내일 열린 밥약이 아직 없어요"),
      "먼저 방을 열면 근처 사람들이 참여할 수 있어요."));
    return;
  }
  body.replaceChildren(el("ul", { class: "rooms" }, rooms.map((r) => {
    const ms = membersOf(r.id);
    const mine = ms.some((m) => m.nickname === state.nick);
    const full = ms.length >= r.capacity;
    const seats = Array.from({ length: r.capacity }, (_, i) => el("span", { class: "seat" + (i < ms.length ? " on" : "") }));
    const badge = mine ? el("span", { class: "badge in" }, "참여 중")
      : full ? el("span", { class: "badge full" }, "마감")
      : el("span", { class: "badge" }, `${r.capacity - ms.length}자리 남음`);
    return el("li", {}, el("button", { class: "room", type: "button", onclick: () => openRoom(r.id) },
      el("span", { class: "time" }, hhmm(r.meet_at)),
      el("span", {},
        el("span", { class: "menu" }, r.menu), el("br"),
        el("span", { class: "place" }, r.place), el("br"),
        el("span", { class: "seats", "aria-label": `${r.capacity}명 중 ${ms.length}명 참여` }, seats)),
      badge,
    ));
  })));
}

function renderCreate() {
  let err;
  const menu = el("input", { type: "text", maxlength: "30", placeholder: "예: 돈까스", required: true });
  const place = el("input", { type: "text", maxlength: "40", placeholder: "예: 강남역 정돈", required: true });
  const day = el("select", {}, el("option", { value: "0" }, "오늘"), el("option", { value: "1" }, "내일"));
  const time = el("input", { type: "time", value: "12:30", required: true });
  const cap = el("select", {},
    el("option", { value: "2" }, "2명"), el("option", { value: "3" }, "3명"), el("option", { value: "4", selected: true }, "4명"));
  if (state.day === "tomorrow") day.value = "1";
  const submit = el("button", { class: "btn", type: "submit" }, "방 열기");
  const form = el("form", {
    onsubmit: async (e) => {
      e.preventDefault();
      err.textContent = "";
      if (!menu.value.trim() || !place.value.trim() || !time.value) { err.textContent = "메뉴, 식당, 시간을 모두 입력해 주세요."; return; }
      const d = dayOf(Number(day.value));
      const [h, m] = time.value.split(":").map(Number);
      d.setHours(h, m, 0, 0);
      if (d.getTime() < Date.now() - 5 * 60 * 1000) { err.textContent = "이미 지난 시간이에요. 시간을 다시 골라 주세요."; return; }
      submit.disabled = true;
      const { data: room, error } = await db.from("rooms").insert({
        menu: menu.value.trim(), place: place.value.trim(), meet_at: d.toISOString(),
        capacity: Number(cap.value), host: state.nick,
      }).select().single();
      if (error) { submit.disabled = false; err.textContent = "방을 열지 못했어요. 다시 시도해 주세요."; return; }
      await db.from("members").insert({ room_id: room.id, nickname: state.nick });
      await loadRooms();
      openRoom(room.id);
    },
  },
    el("label", { class: "field" }, el("span", {}, "무엇을 먹나요"), menu),
    el("label", { class: "field" }, el("span", {}, "어디서 먹나요 (식당 이름)"), place),
    el("div", { class: "row" },
      el("label", { class: "field" }, el("span", {}, "날짜"), day),
      el("label", { class: "field" }, el("span", {}, "시간"), time)),
    el("label", { class: "field" }, el("span", {}, "정원 (나 포함)"), cap),
    (err = el("p", { class: "err", role: "alert" })),
    submit,
  );
  app.replaceChildren(
    el("header", { class: "top" }, el("button", { class: "back", type: "button", onclick: () => go("list") }, "← 목록")),
    el("section", { class: "detail" }, el("h2", {}, "밥약 방 열기"), el("p", { class: "meta" }, "공개된 식당 이름을 적어 주세요.")),
    form,
  );
  menu.focus();
}

async function openRoom(roomId) {
  state.roomId = roomId;
  state.messages = [];
  go("room");
  await loadMessages();
  renderMessages(true);
}
function renderRoom() {
  let input;
  const form = el("form", {
    class: "send",
    onsubmit: async (e) => {
      e.preventDefault();
      const ok = await sendMessage(input.value);
      if (ok) input.value = "";
      input.focus();
    },
  },
    (input = el("input", { id: "msgInput", type: "text", maxlength: "300", autocomplete: "off", "aria-label": "메시지" })),
    el("button", { class: "btn", type: "submit", id: "msgSend" }, "전송"),
  );
  app.replaceChildren(
    el("header", { class: "top" }, el("button", { class: "back", type: "button", onclick: () => go("list", { roomId: null }) }, "← 목록")),
    el("section", { class: "detail", id: "roomHead" }),
    el("section", { class: "chat" }, el("h3", {}, "채팅"), el("div", { class: "msgs", id: "msgs" }), form),
  );
  renderRoomHead();
  renderMessages(true);
}
function renderRoomHead() {
  const head = document.getElementById("roomHead");
  if (!head) return;
  const r = currentRoom();
  if (!r) {
    head.replaceChildren(el("h2", {}, "방을 찾을 수 없어요"), el("p", { class: "meta" }, "시간이 지났거나 삭제된 방이에요."));
    return;
  }
  const ms = membersOf(r.id);
  const mine = ms.some((m) => m.nickname === state.nick);
  const full = ms.length >= r.capacity;
  const main = mine
    ? el("button", { class: "btn ghost", type: "button", onclick: () => leaveRoom(r.id) }, "나가기")
    : el("button", { class: "btn", type: "button", disabled: full, onclick: () => joinRoom(r.id) }, full ? "마감됐어요" : "참여하기");
  head.replaceChildren(
    el("h2", {}, r.menu),
    el("p", { class: "meta" }, `${dayLabel(r.meet_at)} ${hhmm(r.meet_at)} · ${r.place} · ${ms.length}/${r.capacity}명`),
    el("div", { class: "people" }, ms.map((m) => el("span", { class: "chip" + (m.nickname === r.host ? " host" : "") }, m.nickname))),
    el("div", { class: "actions" }, main,
      el("a", { class: "btn ghost", href: mapUrl(r.place), target: "_blank", rel: "noopener" }, "지도 보기")),
    el("p", { class: "notice" }, el("strong", {}, "안전하게 만나요. "), "공개된 식당에서만 만나고, 불편한 일이 있으면 바로 신고해 주세요. ",
      el("button", { class: "linkbtn", type: "button", onclick: () => reportRoom(r.id) }, "이 방 신고하기")),
  );
  const input = document.getElementById("msgInput");
  const send = document.getElementById("msgSend");
  if (input && send) {
    input.disabled = !mine; send.disabled = !mine;
    input.placeholder = mine ? "만날 곳과 시간을 정해 보세요" : "참여하면 채팅할 수 있어요";
  }
}
function renderMessages(toBottom) {
  const box = document.getElementById("msgs");
  if (!box) return;
  if (!state.messages.length) {
    box.replaceChildren(el("p", { class: "hint" }, "아직 대화가 없어요. 먼저 인사해 보세요."));
    return;
  }
  box.replaceChildren(...state.messages.map((m) => el("div", { class: "msg" + (m.nickname === state.nick ? " mine" : "") },
    el("div", { class: "who" }, `${m.nickname} · ${hhmm(m.created_at)}`),
    el("div", { class: "body" }, m.body))));
  if (toBottom) box.scrollTop = box.scrollHeight;
}

// ---------- 시작 ----------
async function start() {
  render();
  await loadRooms();
  render();
  subscribe();
}
if (state.nick) start(); else render();
