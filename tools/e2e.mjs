// 배포 주소에서 휴대폰 크기로 두 사용자(A, B)가 방 열기 → 참여 → 채팅을 하는지 확인한다.
// 사용: node tools/e2e.mjs   (끝나면 '검토'로 시작하는 시험 데이터가 남는다. 정원 2명 방 1개)
import puppeteer from "puppeteer-core";
import { existsSync } from "node:fs";

const U = "https://namgungyun.github.io/ai-entrepreneur-project/";
const chrome = ["C:/Program Files/Google/Chrome/Application/chrome.exe", "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", "/usr/bin/google-chrome"].find(existsSync);
const b = await puppeteer.launch({ executablePath: chrome, headless: true });
const out = {};

async function user(nick) {
  const ctx = await b.createBrowserContext();
  const p = await ctx.newPage();
  await p.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
  const errs = [];
  p.on("pageerror", (e) => errs.push(String(e)));
  p.on("console", (m) => { if (m.type() === "error") errs.push(m.text()); });
  await p.goto(U, { waitUntil: "networkidle0" });
  await p.type(".gate input[type=text]", nick);
  await p.click(".gate input[type=checkbox]");
  await p.click(".gate form .btn");
  await p.waitForSelector(".verify .btn");
  await p.click(".verify .btn");
  await p.waitForSelector(".fab");
  return { p, errs };
}

try {
  const A = await user("검토A");
  const B = await user("검토B");
  out.가로넘침 = await A.p.evaluate(() => document.documentElement.scrollWidth > innerWidth);
  out.목록방수 = await A.p.$$eval(".room", (r) => r.length);

  await A.p.click(".fab");
  await A.p.waitForSelector("form input[type=text]");
  const ins = await A.p.$$("form input[type=text]");
  await ins[0].type("검토용 삼겹살");
  await ins[1].type("예시역 검토식당");
  await A.p.evaluate(() => {
    document.querySelector("input[type=time]").value = "23:58";
    [...document.querySelectorAll("form select")].pop().value = "2";
  });
  await A.p.click("form .btn[type=submit]");
  await A.p.waitForSelector("#roomHead h2");
  out.방열기 = await A.p.$eval("#roomHead .meta", (e) => e.innerText);

  out.B목록에_새로고침없이_나타남 = await B.p.waitForFunction(
    () => [...document.querySelectorAll(".room .menu")].some((e) => e.innerText.includes("검토용")), { timeout: 12000 })
    .then(() => true).catch(() => false);
  await B.p.evaluate(() => [...document.querySelectorAll(".room")].find((r) => r.innerText.includes("검토용")).click());
  await B.p.waitForSelector("#roomHead .btn");
  await B.p.click("#roomHead .btn");
  await B.p.waitForFunction(() => !document.getElementById("msgInput").disabled, { timeout: 8000 });
  await B.p.type("#msgInput", "2번 출구에서 봬요");
  await B.p.click("#msgSend");
  out.A에게_채팅이_바로_보임 = await A.p.waitForFunction(
    () => document.getElementById("msgs").innerText.includes("2번 출구"), { timeout: 12000 })
    .then(() => true).catch(() => false);
  out.A가_본_방 = await A.p.$eval("#roomHead .meta", (e) => e.innerText);
  out.참여자 = await A.p.$$eval(".chip", (c) => c.map((x) => (x.className.includes("ok") ? "인증 " : "") + x.innerText));
  out.지도주소 = await A.p.$eval("#roomHead a.btn", (a) => a.href);
  await A.p.screenshot({ path: "screenshot-room.png" });
  out.오류 = [...A.errs, ...B.errs];
} catch (e) {
  out.실패 = String(e);
}
console.log(JSON.stringify(out, null, 1));
await b.close();
