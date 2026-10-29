// Verifies the published pages. Usage: node check.mjs [--release] [origin]
// Default origin is contact.json siteUrl; --release also enforces contact details.
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { validateContact, validatePublicPage } from "./validate.mjs";

const root = dirname(fileURLToPath(import.meta.url));
const contact = JSON.parse(readFileSync(join(root, "contact.json"), "utf8"));
const release = process.argv.includes("--release");
const args = process.argv.slice(2).filter((a) => a !== "--release");
const base = (args[0] || contact.siteUrl).replace(/\/+$/, "") + "/";
if (release) {
  assert.ok(base.startsWith("https://"), "Public pages must use HTTPS.");
  validateContact(contact);
}
const request = (path) => fetch(new URL(path.replace(/^\//, ""), base), { redirect: "manual", credentials: "omit", signal: AbortSignal.timeout(15000) });
const pages = [
  ["/en/privacy/", "Privacy policy", "Your game. Your privacy."],
  ["/zh/privacy/", "隐私政策", "你的游戏，你的隐私。"],
  ["/en/support/", "Support", "A hand with your next move."],
  ["/zh/support/", "游戏支持", "下一步，我们帮你。"],
  ["/en/terms/", "Terms of use", "Simple rules for playing."],
  ["/zh/terms/", "用户协议", "简单的使用约定。"],
];
for (const [path, title, heading] of pages) {
  const response = await request(path);
  assert.equal(response.status, 200, path);
  const html = await response.text();
  if (release) validatePublicPage(response, html, path, contact);
  assert.ok(html.includes(`<title>${title} — TapMe: Number Merge</title>`), `${path}: title`);
  assert.ok(html.includes(heading), `${path}: content`);
  assert.ok(html.includes(`property="og:title" content="${title} — TapMe: Number Merge"`), `${path}: Open Graph title`);
  assert.ok(!/<meta[^>]+(?:property="og:image"|name="twitter:image")/.test(html), `${path}: no inherited image`);
  console.log(`OK ${path}`);
}
for (const [path, title, lang] of [["/", "A little tap.", "en"], ["/zh/", "轻轻一点，", "zh"]]) {
  const home = await request(path);
  assert.equal(home.status, 200, path);
  const html = await home.text();
  if (release) validatePublicPage(home, html, path, contact);
  assert.ok(html.includes(title), `${path}: marketing heading`);
  assert.ok(html.includes('property="og:image"'), `${path}: Open Graph image`);
  assert.ok(html.includes(`game-${lang}.png`), `${path}: actual game screenshot`);
  for (const page of ["support", "privacy", "terms"]) {
    assert.ok(html.includes(`/${lang}/${page}/`), `${path}: ${page} link`);
  }
  console.log(`OK ${path}`);
}
for (const path of ["/marketing.css", "/marketing.js", "/game-en.png", "/game-zh.png"]) {
  const response = await request(path);
  assert.equal(response.status, 200, path);
  assert.ok((await response.arrayBuffer()).byteLength > 0, `${path}: nonempty asset`);
  console.log(`OK ${path}`);
}
const missing = await request("/fr/privacy/");
assert.ok(missing.status === 404, `unsupported language should 404, got ${missing.status}`);
console.log("OK unsupported language returns 404");
