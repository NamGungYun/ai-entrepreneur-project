const pptxgen = require("pptxgenjs");
const path = require("path");

const REPO = process.argv[2];
const OUT = process.argv[3];
const img = (f) => path.join(REPO, f);

const NAVY = "212C67", SURF = "1A2458", DEEP = "111A36", RULE = "3A4479";
const LIME = "D8E072", INK = "07080D", TXT = "F3F5FA", TXT2 = "BCC1D6", LINE = "A5AAB8";
const F = "맑은 고딕";

const pres = new pptxgen();
pres.layout = "LAYOUT_WIDE"; // 13.333 x 7.5
pres.title = "혼밥 탈출 — 9조 CODE NEXUS 발표";
pres.theme = { headFontFace: F, bodyFontFace: F };

pres.defineSlideMaster({
  title: "LAUNCH",
  background: { color: NAVY },
  objects: [
    { text: { text: "9조 CODE NEXUS / 야르 · 혼밥 탈출 · 수업용 시제품", options: { x: 0.6, y: 6.95, w: 8, h: 0.3, fontFace: F, fontSize: 11, color: TXT2, margin: 0 } } },
  ],
  slideNumber: { x: 12.2, y: 6.95, w: 0.6, h: 0.3, fontFace: F, fontSize: 11, color: TXT2, align: "right" },
});

const T = (s, text, opt) => s.addText(text, Object.assign({ isTextBox: true, fontFace: F, color: TXT, margin: 0, valign: "top" }, opt));

function header(s, label, title) {
  T(s, label, { x: 0.6, y: 0.5, w: 8, h: 0.35, fontSize: 14, bold: true, color: LIME });
  T(s, title, { x: 0.6, y: 0.9, w: 12.1, h: 0.8, fontSize: 34, bold: true });
}
function panel(s, x, y, w, h) {
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y, w, h, fill: { color: SURF }, line: { color: RULE, width: 1 }, rectRadius: 0.2 });
}
function phone(s, file, x, y, h, caption) {
  const w = h * 390 / 844;
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: x - 0.08, y: y - 0.08, w: w + 0.16, h: h + 0.16, fill: { color: INK }, line: { color: LINE, width: 1 }, rectRadius: 0.18 });
  s.addImage({ path: img(file), x, y, w, h, altText: caption });
  if (caption) T(s, caption, { x: x - 0.3, y: y + h + 0.2, w: w + 0.6, h: 0.35, fontSize: 14, color: TXT2, align: "center" });
  return w;
}

// 1. 표지
{
  const s = pres.addSlide({ masterName: "LAUNCH" });
  T(s, "AI 앙트레프레너 LAUNCH! · 9조 CODE NEXUS / 야르", { x: 0.8, y: 0.9, w: 8, h: 0.4, fontSize: 16, bold: true, color: LIME });
  s.addShape(pres.shapes.RECTANGLE, { x: 0.7, y: 1.7, w: 6.6, h: 1.5, fill: { color: INK }, rotate: -3 });
  T(s, "혼밥 탈출", { x: 1.0, y: 1.8, w: 6.2, h: 1.3, fontSize: 66, bold: true, valign: "middle" });
  T(s, [
    { text: "오늘 ", options: { color: LIME, bold: true } },
    { text: "같이 먹을 사람 있어요?", options: { bold: true } },
  ], { x: 0.8, y: 3.6, w: 7, h: 0.6, fontSize: 28 });
  T(s, "확인된 동네 사람과, 밥만 먹고 헤어지는 밥약 서비스", { x: 0.8, y: 4.3, w: 7, h: 0.5, fontSize: 18, color: TXT2 });
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 0.8, y: 5.2, w: 2.1, h: 0.5, fill: { color: LIME }, rectRadius: 0.25 });
  T(s, "수업용 시제품", { x: 0.8, y: 5.2, w: 2.1, h: 0.5, fontSize: 14, bold: true, color: INK, align: "center", valign: "middle" });
  phone(s, "screenshot-home.png", 9.6, 0.8, 5.6, null);
  s.addNotes("안녕하세요, 9조입니다. 저희 서비스는 혼밥 탈출입니다.");
}

// 2. 문제
{
  const s = pres.addSlide({ masterName: "LAUNCH" });
  header(s, "문제", "같이 먹을 사람을 바로 구할 방법이 없어요");
  const items = [
    ["편의점·배달로 때우기", "점심·저녁에 같이 먹을 사람이 없어 혼자 해결한 적이 많아요"],
    ["2인 이상 메뉴 포기", "고깃집, 전골처럼 혼자 주문이 안 되는 메뉴는 아예 못 먹어요"],
    ["글 올려도 안 맞음", "오픈채팅·커뮤니티는 시간·장소가 안 맞거나 답이 늦어요"],
    ["모르는 사람은 불안", "1:1로 만나는 건 소개팅 같아 부담되고 안전도 걱정돼요"],
  ];
  items.forEach(([h, b], i) => {
    const x = 0.6 + (i % 2) * 3.55, y = 2.0 + Math.floor(i / 2) * 2.15;
    panel(s, x, y, 3.35, 1.95);
    T(s, h, { x: x + 0.3, y: y + 0.3, w: 2.8, h: 0.45, fontSize: 18, bold: true });
    T(s, b, { x: x + 0.3, y: y + 0.85, w: 2.8, h: 0.95, fontSize: 14, color: TXT2, lineSpacingMultiple: 1.3 });
  });
  // 핵심 문제 두 가지
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 7.9, y: 2.0, w: 4.85, h: 4.1, fill: { color: LIME }, rectRadius: 0.2 });
  T(s, "그래서 문제는 두 가지예요", { x: 8.25, y: 2.3, w: 4.2, h: 0.45, fontSize: 18, bold: true, color: INK });
  T(s, [
    { text: "1  바로 구할 방법이 없다", options: { bold: true, fontSize: 22, breakLine: true } },
    { text: "\"지금, 이 근처, 이 메뉴\"를 같이 먹을 사람", options: { fontSize: 15, breakLine: true } },
    { text: " ", options: { fontSize: 12, breakLine: true } },
    { text: "2  누군지 몰라 망설여진다", options: { bold: true, fontSize: 22, breakLine: true } },
    { text: "구하더라도 확인되지 않은 낯선 사람", options: { fontSize: 15 } },
  ], { x: 8.25, y: 3.0, w: 4.3, h: 2.8, color: INK, lineSpacingMultiple: 1.25 });
  s.addNotes("점심시간에 같이 먹을 사람이 없어서 편의점이나 배달로 때운 적, 있으실 겁니다. 고깃집이나 전골처럼 2인 이상만 주문되는 메뉴는 아예 포기하게 됩니다. 오픈채팅이나 커뮤니티에 글을 올려 봐도 시간과 장소가 안 맞거나 답이 늦어서 결국 혼자 먹습니다. 그렇다고 모르는 사람과 1:1로 만나는 건 소개팅 같아서 부담스럽고 걱정도 됩니다. 문제는 두 가지입니다. '지금, 이 근처에서, 이 메뉴'를 같이 먹을 사람을 바로 구할 방법이 없고, 구하더라도 누구인지 모르는 사람이라 나가기가 망설여진다는 것입니다.");
}

// 3. 해결
{
  const s = pres.addSlide({ masterName: "LAUNCH" });
  header(s, "해결", "밥약 방에 버튼 한 번으로 참여");
  const feats = [
    ["1", "밥약 방 열기·참여", "메뉴·식당·시간·정원(2~4명)을 정해 열고, 정원이 차면 마감돼요"],
    ["2", "방 안 실시간 채팅", "만날 곳과 시간을 새로고침 없이 바로 주고받아요"],
    ["3", "내 지역 제한 + 본인 인증", "내 지역 방만 보이고 그 지역에만 열 수 있어요(작동). 본인 인증은 데모 화면이에요"],
  ];
  feats.forEach(([n, h, b], i) => {
    const y = 2.0 + i * 1.45;
    panel(s, 0.6, y, 7.6, 1.25);
    s.addShape(pres.shapes.OVAL, { x: 0.9, y: y + 0.32, w: 0.6, h: 0.6, fill: { color: LIME } });
    T(s, n, { x: 0.9, y: y + 0.32, w: 0.6, h: 0.6, fontSize: 20, bold: true, color: INK, align: "center", valign: "middle" });
    T(s, h, { x: 1.8, y: y + 0.18, w: 6.2, h: 0.4, fontSize: 18, bold: true });
    T(s, b, { x: 1.8, y: y + 0.6, w: 6.2, h: 0.6, fontSize: 14, color: TXT2 });
  });
  T(s, "사람 프로필이 아니라 \"언제·어디서·무엇을\"이 중심. 사진·자기소개는 받지 않아요", { x: 0.6, y: 6.35, w: 7.6, h: 0.4, fontSize: 14, color: LIME, bold: true });
  phone(s, "screenshot.png", 9.6, 1.0, 5.3, "방 목록 (가상 데이터)");
  s.addNotes("저희는 사람이 아니라 '언제, 어디서, 무엇을'을 중심에 둔 밥약 방을 만들었습니다. 방을 열고, 버튼 한 번으로 참여하고, 방 안에서 실시간으로 만날 곳과 시간을 정합니다.");
}

// 4. 시연
{
  const s = pres.addSlide({ masterName: "LAUNCH" });
  header(s, "시연", "QR을 찍고 지금 같이 써 보세요");
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 0.6, y: 1.95, w: 4.3, h: 4.7, fill: { color: "FFFFFF" }, rectRadius: 0.2 });
  s.addImage({ path: img("qr.png"), x: 0.85, y: 2.15, w: 3.8, h: 3.8, altText: "서비스 주소 QR 코드" });
  T(s, "namgungyun.github.io/ai-entrepreneur-project", { x: 0.7, y: 6.05, w: 4.1, h: 0.4, fontSize: 12, color: INK, align: "center", bold: true });
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 5.4, y: 1.95, w: 7.35, h: 0.85, fill: { color: LIME }, rectRadius: 0.15 });
  T(s, "지역은 '서울 동대문구' 그대로 두세요", { x: 5.7, y: 1.95, w: 6.9, h: 0.85, fontSize: 18, bold: true, color: INK, valign: "middle" });
  const steps = [
    "닉네임 입력, 지역 확인, 성인 확인 체크",
    "본인 인증 세 단계 → '데모 인증 완료하기'",
    "오늘·내일 탭: 내 지역 방만 시간순으로",
    "'+ 밥약 방 열기' → 다른 폰에 바로 나타남",
    "참여하기 → 인원 증가, 정원 차면 마감",
    "채팅으로 만날 곳 정하기 · 지도 보기 · 신고",
  ];
  panel(s, 5.4, 3.0, 7.35, 3.65);
  steps.forEach((t, i) => {
    const y = 3.2 + i * 0.55;
    T(s, String(i + 1), { x: 5.7, y, w: 0.4, h: 0.45, fontSize: 18, bold: true, color: LIME });
    T(s, t, { x: 6.2, y, w: 6.3, h: 0.45, fontSize: 16 });
  });
  s.addNotes("QR을 찍으시면 지금 바로 같이 써 보실 수 있습니다. 설치도 가입도 없습니다. 지역은 동대문구 그대로 두세요.\n\n[A] 닉네임 입력 → 지역 확인 → 성인 확인 → 다음: 본인 인증. '닉네임과 내 지역만 고릅니다. 사진이나 자기소개 같은 프로필은 받지 않습니다.'\n[A] 본인 인증 세 단계 → 데모 인증 완료하기. '오늘은 데모라서 실제 얼굴과 신분증은 받지 않습니다.'\n[A] 오늘·내일 탭. '내 지역에 열린 밥약 방만 보입니다. 지금 보이는 방은 가상 데이터입니다.'\n[A] + 밥약 방 열기 → 삼겹살, 정원 2명 → 방 열기.\n[B] 새로고침 없이 방이 나타남.\n[B] 참여하기. '이름 옆 체크는 인증을 마친 사람이라는 뜻입니다. 정원이 차면 마감됩니다.'\n[A,B] 채팅: '2번 출구에서 봬요' / '네, 12시 25분에요'.\n[A] 지도 보기, 신고하기. '밥만 먹고 헤어지는 자리라는 안내도 방마다 넣었습니다.'\n\n막히면: 주소 뒤에 ?nick=닉네임&region=동대문구&verified=1 을 붙이면 첫 화면과 인증을 건너뜁니다. 인터넷이 안 되면 다음 장의 화면으로 설명합니다.");
}

// 5. 화면
{
  const s = pres.addSlide({ masterName: "LAUNCH" });
  header(s, "화면", "가입 없이, 세 화면이면 밥약에 들어가요");
  const h = 4.2, w = h * 390 / 844, gap = (12.13 - 3 * w) / 2;
  [["screenshot-home.png", "1  첫 화면: 닉네임·지역"], ["screenshot-verify.png", "2  본인 인증 (데모)"], ["screenshot.png", "3  내 지역 방 목록"]]
    .forEach(([f, c], i) => phone(s, f, 0.6 + i * (w + gap) + 0.0, 1.95, h, c));
  s.addNotes("시연이 막히면 이 화면으로 설명합니다. 첫 화면에서 닉네임과 지역만 고르고, 본인 인증은 데모 화면, 그다음 내 지역의 방 목록이 나옵니다.");
}

// 6. AI 활용 과정
{
  const s = pres.addSlide({ masterName: "LAUNCH" });
  header(s, "AI 활용 과정", "AI에게 묻고, 고르고, 시험하며 만들었어요");
  const flow = [
    ["요청", "\"혼밥 탈출 앱 기획서를 1시간 안에 작동하는 범위로 짜 줘. 모르는 건 질문해 줘\""],
    ["선택", "6칸 기획서와 질문 4개 → 핵심 기능은 '방 + 실시간 채팅', 저장은 슈파베이스로 결정"],
    ["개발·배포", "행사 프롬프트 순서대로: 규칙 파일 → 첫 화면 → 가상 데이터 → 개인정보·키 점검 → 사실 확인"],
    ["협업", "조원과 각자 Claude로 작업하고, GitHub의 작업현황.md로 진행 상황을 주고받음"],
  ];
  const cw = 2.85, gap = (12.13 - 4 * cw) / 3;
  flow.forEach(([h, b], i) => {
    const x = 0.6 + i * (cw + gap);
    panel(s, x, 2.1, cw, 3.6);
    s.addShape(pres.shapes.OVAL, { x: x + 0.3, y: 2.4, w: 0.6, h: 0.6, fill: { color: i === 0 ? LIME : DEEP }, line: { color: LIME, width: 1.5 } });
    T(s, String(i + 1), { x: x + 0.3, y: 2.4, w: 0.6, h: 0.6, fontSize: 18, bold: true, color: i === 0 ? INK : LIME, align: "center", valign: "middle" });
    T(s, h, { x: x + 0.3, y: 3.2, w: cw - 0.6, h: 0.45, fontSize: 20, bold: true });
    T(s, b, { x: x + 0.3, y: 3.8, w: cw - 0.6, h: 1.8, fontSize: 14, color: TXT2, lineSpacingMultiple: 1.3 });
    if (i < 3) T(s, "›", { x: x + cw, y: 3.5, w: gap, h: 0.6, fontSize: 28, bold: true, color: LIME, align: "center", valign: "middle" });
  });
  T(s, "단계별 기록: 저장소의 개발기록.md · 점검기록.md · 사실확인.md", { x: 0.6, y: 6.0, w: 12, h: 0.4, fontSize: 14, color: TXT2 });
  s.addNotes("처음에 AI에게 '혼밥 탈출 앱을 만들고 싶어. 기획서를 짜줘. 모르는 건 내가 고를 수 있게 질문해 줘. 1시간 안에 작동하는 범위로'라고 요청했더니, 질문 네 개와 함께 6칸 기획서가 나왔습니다. 저희는 핵심 기능을 '방과 실시간 채팅'으로, 저장은 슈파베이스로 골랐습니다. 개발과 배포는 행사 프롬프트 순서를 따랐습니다. 규칙 파일, 첫 화면, 단계 나누기, 가상 데이터, 그리고 올리기 전 개인정보·키 점검과 사실 확인까지 했고, 단계별 기록은 저장소의 개발기록.md에 있습니다. 조원과는 GitHub의 작업현황.md로 진행 상황을 주고받았습니다.");
}

// 7. 검증과 개선
{
  const s = pres.addSlide({ masterName: "LAUNCH" });
  header(s, "검증과 개선", "직접 시험해서 찾고, 고치고, 더했어요");
  // 왼쪽: 찾은 문제
  panel(s, 0.6, 1.95, 4.6, 4.7);
  T(s, "시험해서 찾은 문제", { x: 0.9, y: 2.2, w: 4, h: 0.4, fontSize: 14, bold: true, color: LIME });
  T(s, "정원이 찼는데도 참여가 됐어요", { x: 0.9, y: 2.7, w: 4.0, h: 0.9, fontSize: 20, bold: true });
  T(s, [
    { text: "원인  ", options: { bold: true, color: LIME } },
    { text: "보안 규칙(RLS) 때문에 서버가 정원을 읽지 못함", options: { breakLine: true } },
    { text: " ", options: { fontSize: 8, breakLine: true } },
    { text: "확인  ", options: { bold: true, color: LIME } },
    { text: "고친 뒤 2명 방에 세 번째 참여가 거절됨", options: { breakLine: true } },
    { text: " ", options: { fontSize: 8, breakLine: true } },
    { text: "추가 시험  ", options: { bold: true, color: LIME } },
    { text: "밖에서 방 수정·삭제 0건, 없는 지역으로 방 열기 거절" },
  ], { x: 0.9, y: 3.75, w: 4.0, h: 2.7, fontSize: 14, color: TXT, lineSpacingMultiple: 1.3 });
  // 오른쪽: 더한 강점
  T(s, "\"모르는 사람이라 불안하다\"가 남아서 더한 것", { x: 5.6, y: 1.95, w: 7.2, h: 0.4, fontSize: 16, bold: true });
  const rows = [
    ["본인 인증", "신분증 확인 → 얼굴 대조 → 지역 확인 세 단계. 실제 얼굴·신분증은 받지도 저장하지도 않아요", "데모"],
    ["본인 지역 제한", "내가 고른 지역의 방만 보이고, 그 지역에만 방을 열 수 있어요", "작동"],
    ["밥만 먹고 헤어지기", "프로필 사진·자기소개 없음. 방마다 안내 문구와 신고 버튼", "작동"],
  ];
  rows.forEach(([h, b, st], i) => {
    const y = 2.5 + i * 1.4;
    panel(s, 5.6, y, 7.15, 1.25);
    T(s, h, { x: 5.9, y: y + 0.2, w: 4.5, h: 0.4, fontSize: 18, bold: true });
    T(s, b, { x: 5.9, y: y + 0.62, w: 5.4, h: 0.6, fontSize: 13, color: TXT2 });
    const live = st === "작동";
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 11.55, y: y + 0.38, w: 0.95, h: 0.45, fill: { color: live ? LIME : SURF }, line: { color: live ? LIME : TXT, width: 1.5 }, rectRadius: 0.22 });
    T(s, st, { x: 11.55, y: y + 0.38, w: 0.95, h: 0.45, fontSize: 14, bold: true, color: live ? INK : TXT, align: "center", valign: "middle" });
  });
  s.addNotes("만든 뒤에는 직접 시험했습니다. 두 번째 사용자를 만들어 참여와 채팅이 실시간으로 보이는지 확인했고, 이 과정에서 정원이 찼는데도 참여가 되는 문제를 찾았습니다. 원인은 보안 규칙 때문에 서버가 정원을 읽지 못한 것이었고, 고친 뒤 2명 방에 세 번째 참여가 거절되는 것을 확인했습니다.\n\n그리고 시험하면서 가장 크게 느낀 것은 '모르는 사람이라 불안하다'는 문제가 그대로 남아 있다는 점이었습니다. 그래서 두 가지를 더했습니다. 첫째, 본인 인증입니다. 오늘은 데모 화면이고 실제 얼굴 정보는 받지 않습니다. 실제 서비스에서는 전문 본인확인 서비스를 연동할 계획입니다. 둘째, 본인 지역 제한입니다. 이건 오늘 실제로 작동합니다.");
}

// 8. 마무리
{
  const s = pres.addSlide({ masterName: "LAUNCH" });
  T(s, "다음 단계", { x: 0.6, y: 0.5, w: 8, h: 0.35, fontSize: 14, bold: true, color: LIME });
  T(s, "솔직하게 남은 것", { x: 0.6, y: 0.9, w: 7.5, h: 0.8, fontSize: 34, bold: true });
  const nx = [
    ["본인 인증", "전문 본인확인 서비스를 연동하고 '인증됨' 결과만 저장"],
    ["지역 확인", "본인이 고른 지역 대신 인증 주소나 휴대폰 위치로 확인"],
    ["닉네임 도용", "지금은 막지 못해요. 로그인을 붙일 계획"],
    ["실제 사용 검증", "동대문구에서 점심시간에 실제로 방이 열리는지 써 보기"],
  ];
  nx.forEach(([h, b], i) => {
    const y = 2.0 + i * 1.12;
    panel(s, 0.6, y, 7.5, 0.95);
    T(s, h, { x: 0.9, y, w: 2.0, h: 0.95, fontSize: 16, bold: true, color: LIME, valign: "middle" });
    T(s, b, { x: 2.9, y, w: 5.0, h: 0.95, fontSize: 14, valign: "middle" });
  });
  T(s, "시장조사·인터뷰는 하지 못해 이용자 수 같은 숫자는 넣지 않았어요", { x: 0.6, y: 6.5, w: 7.5, h: 0.35, fontSize: 12, color: TXT2 });
  s.addShape(pres.shapes.RECTANGLE, { x: 8.7, y: 1.0, w: 4.1, h: 1.1, fill: { color: INK }, rotate: -4 });
  T(s, "감사합니다", { x: 8.8, y: 1.05, w: 3.9, h: 1.0, fontSize: 34, bold: true, align: "center", valign: "middle" });
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 9.0, y: 2.6, w: 3.5, h: 3.9, fill: { color: "FFFFFF" }, rectRadius: 0.2 });
  s.addImage({ path: img("qr.png"), x: 9.25, y: 2.8, w: 3.0, h: 3.0, altText: "서비스 주소 QR 코드" });
  T(s, "혼밥 탈출 써 보기", { x: 9.0, y: 5.9, w: 3.5, h: 0.4, fontSize: 14, bold: true, color: INK, align: "center" });
  s.addNotes("확인된 동네 사람과, 밥만 먹고 헤어지는 혼밥 탈출이었습니다. 감사합니다.\n\n[예상 질문]\n1. 얼굴 인증이 실제로 작동하나요? → 오늘은 데모입니다. 실제 얼굴 사진과 신분증은 받지도 저장하지도 않습니다. 실제로는 전문 본인확인 서비스를 연동하고 '인증됨' 결과만 저장할 계획입니다.\n2. 다른 지역을 고르면 되지 않나요? → 지금은 고른 지역을 그대로 믿습니다. 다음 단계에서 인증 주소나 휴대폰 위치로 확인합니다.\n3. 오픈채팅과 무엇이 다른가요? → 글을 올리고 기다리는 대신, 시간·식당·메뉴·정원이 정해진 방에 버튼 한 번으로 들어갑니다. 다른 서비스를 자세히 비교 조사하지는 못했습니다.\n4. AI가 만든 코드를 어떻게 확인했나요? → 직접 실행해 실시간 반영, 정원 초과 거절, 밖에서 수정·삭제 불가, 없는 지역 거절을 시험했습니다. 테스트시나리오.md에 있습니다.\n5. 수익은요? → 오늘은 정하지 않았고 시장조사도 못 했습니다. 다음 단계는 동대문구에서 실제로 써 보는 것입니다.");
}

pres.writeFile({ fileName: OUT }).then(() => console.log("written", OUT));
