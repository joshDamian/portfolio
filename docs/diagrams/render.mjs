// Render an SVG to a PNG at 2x with headless Chromium.
//   node render.mjs <in.svg> <out.png>
// Needs `playwright-core` resolvable from where this runs, plus a Chromium
// (any `chromium.launch` setup works; set CHROME_PATH to pick the binary).
import { readFileSync, writeFileSync, mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { chromium } from "playwright-core";

const [input, output] = process.argv.slice(2);
const svg = readFileSync(input, "utf8");
const [, w, h] = svg.match(/width="(\d+)" height="(\d+)"/);
const html = join(mkdtempSync(join(tmpdir(), "c4-")), "d.html");
writeFileSync(html, `<!doctype html><html><body style="margin:0">${svg}</body></html>`);

const browser = await chromium.launch(process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : {});
const page = await browser.newPage({ viewport: { width: +w, height: +h }, deviceScaleFactor: 2 });
await page.goto("file://" + html);
await page.screenshot({ path: output });
await browser.close();
console.log(`${output} ${w * 2}x${h * 2}`);
