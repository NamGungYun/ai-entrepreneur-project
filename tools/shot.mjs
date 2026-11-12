// 화면을 PNG로 찍는다. 사용: node tools/shot.mjs <주소 또는 파일> <저장 경로> <가로> <세로> [기다릴 선택자] [배율]
import puppeteer from "puppeteer-core";
import { pathToFileURL } from "node:url";
import { existsSync } from "node:fs";
import { resolve } from "node:path";

const [target, out, w = "390", h = "844", waitFor = "", scale = "1"] = process.argv.slice(2);
if (!target || !out) { console.error("사용: node tools/shot.mjs <주소|파일> <저장 경로> <가로> <세로> [선택자] [배율]"); process.exit(1); }
const chrome = ["C:/Program Files/Google/Chrome/Application/chrome.exe", "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", "/usr/bin/google-chrome"].find(existsSync);
if (!chrome) { console.error("크롬을 찾지 못했다."); process.exit(1); }
const url = /^https?:/.test(target) ? target : pathToFileURL(resolve(target)).href;

const browser = await puppeteer.launch({ executablePath: chrome, headless: true });
try {
  const page = await browser.newPage();
  await page.setViewport({ width: Number(w), height: Number(h), deviceScaleFactor: Number(scale) });
  await page.goto(url, { waitUntil: "networkidle0", timeout: 30000 });
  if (waitFor) await page.waitForSelector(waitFor, { timeout: 15000 });
  await page.evaluate(() => document.fonts.ready);   // 글꼴을 다 불러온 뒤에 찍는다
  await new Promise((r) => setTimeout(r, 400));
  await page.screenshot({ path: out, type: "png" });
  console.log("저장:", out);
} finally { await browser.close(); }
