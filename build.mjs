// Static site generator for the TapMe support & privacy pages.
// Usage: node build.mjs [--draft]   (--draft allows empty contact details for local preview)
import { mkdirSync, writeFileSync, copyFileSync, readFileSync, rmSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { appName, content } from "./content.mjs";
import { validateContact } from "./validate.mjs";

const root = dirname(fileURLToPath(import.meta.url));
const out = join(root, "dist");
const draft = process.argv.includes("--draft");
const contact = JSON.parse(readFileSync(join(root, "contact.json"), "utf8"));
if (!draft) validateContact(contact);
const { publisher, supportEmail, policyDate } = contact;
const siteUrl = contact.siteUrl.replace(/\/+$/, "");

const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#x27;" })[c]);
const htmlLang = (lang) => (lang === "zh" ? "zh-Hans" : "en");

function head({ lang, title, description, canonical, image, alternates = [] }) {
  return `<!doctype html>
<html lang="${htmlLang(lang)}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<link rel="canonical" href="${canonical}">
${alternates.map((a) => `<link rel="alternate" hreflang="${a.hreflang}" href="${a.href}">`).join("\n")}
<link rel="icon" href="${siteUrl}/app-icon.png" type="image/png">
<link rel="apple-touch-icon" href="${siteUrl}/app-icon.png">
<link rel="stylesheet" href="${siteUrl}/styles.css">
<meta property="og:type" content="website">
<meta property="og:site_name" content="${esc(appName)}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${canonical}">
${image ? `<meta property="og:image" content="${image}">\n<meta property="og:image:alt" content="${esc(title)}">` : ""}
<meta name="twitter:card" content="${image ? "summary_large_image" : "summary"}">
<meta name="twitter:title" content="${esc(title)}">
<meta name="twitter:description" content="${esc(description)}">
${image ? `<meta name="twitter:image" content="${image}">` : ""}
</head>
<body>
`;
}

function docPage(lang, page) {
  const c = content[lang];
  const other = c.other;
  const title = `${c[page]} — ${appName}`;
  const description = page === "privacy" ? c.privacyDescription : c.supportDescription;
  const sibling = page === "privacy" ? "support" : "privacy";
  const canonical = `${siteUrl}/${lang}/${page}/`;
  const alternates = [
    { hreflang: "en", href: `${siteUrl}/en/${page}/` },
    { hreflang: "zh-Hans", href: `${siteUrl}/zh/${page}/` },
    { hreflang: "x-default", href: `${siteUrl}/en/${page}/` },
  ];
  const contactBlock = `<aside class="contact"><h2>${esc(c.contact)}</h2><p>${esc(c.contactBody)}</p>${
    publisher ? `<p>${esc(publisher)}</p>` : ""
  }${
    supportEmail
      ? `<p><a href="mailto:${esc(supportEmail)}?subject=${encodeURIComponent(c.mailSubject)}">${esc(supportEmail)}</a></p>`
      : `<p class="muted">${lang === "zh" ? "联系信息待发布者确认（发布前草稿）" : "Contact details awaiting publisher confirmation (unpublished draft)"}</p>`
  }${page === "support" ? `<p class="muted">${esc(c.requestHint)}</p>` : ""}</aside>`;

  const body = page === "privacy"
    ? `<div class="summary">${esc(c.summary)}</div>${c.sections.map((s) => `<section><h2>${esc(s.title)}</h2>${s.paragraphs.map((p) => `<p>${esc(p)}</p>`).join("")}</section>`).join("\n")}`
    : `<section><h2>${esc(c.how)}</h2><ol>${c.steps.map((s) => `<li>${esc(s)}</li>`).join("")}</ol></section>
<section><h2>${esc(c.questions)}</h2><div class="faq">${c.faq.map(([q, a]) => `<details><summary>${esc(q)}</summary><p>${esc(a)}</p></details>`).join("")}</div></section>`;

  const heading = page === "privacy"
    ? `<p class="muted">${esc(c.updated)}: ${esc(policyDate)}</p>`
    : `<span class="tag">iPhone · iOS 15+</span><span class="tag">${lang === "zh" ? "离线游玩" : "Offline play"}</span>`;

  return head({ lang, title, description, canonical, alternates }) + `<main class="document">
<header class="topbar"><a href="../../" class="brand" aria-label="${esc(c.home)}"><img src="../../app-icon.png" width="40" height="40" alt=""><span>TapMe <small>Number Merge</small></span></a><nav aria-label="${esc(c.home)}"><a href="../${sibling}/">${esc(c[sibling])}</a><a href="../../${other}/${page}/" lang="${htmlLang(other)}">${esc(c.language)}</a></nav></header>
<div class="doc-heading"><p class="eyebrow">${esc(c[page])}</p><h1>${esc(page === "privacy" ? c.privacyTitle : c.supportTitle)}</h1><p>${esc(description)}</p>${heading}</div>
<div class="body-copy">
${body}
${contactBlock}
</div>
<footer><span>${esc(appName)}${publisher ? ` · ${esc(publisher)}` : ""}</span><a href="../${sibling}/">${esc(c[sibling])}</a></footer>
</main>
</body>
</html>
`;
}

function homePage() {
  const title = `${appName} — Support & Privacy`;
  const description = "Official help, game rules, contact information and privacy policy for TapMe: Number Merge.";
  return head({ lang: "en", title, description, canonical: `${siteUrl}/`, image: `${siteUrl}/og.jpg` }) + `<main class="home">
<header class="brand"><img src="app-icon.png" width="48" height="48" alt=""><span>TapMe <small>Number Merge</small></span></header>
<div class="hero"><p class="eyebrow">THE TAPME HELP DESK · 帮助中心</p><h1>A little help.<br><span>Back to play.</span></h1><p class="intro">Everything you need to know about your game,<br class="desktop"> your progress, and your privacy.</p><p class="intro-cn" lang="zh-Hans">了解玩法、找回游戏节奏，也了解你的数据。</p></div>
<section class="cards" aria-label="Help and privacy">
<article class="card"><span class="number">01 / PLAY</span><h2>Support <span lang="zh-Hans">游戏支持</span></h2><p>Simple rules. Helpful answers.<br>A direct line when you need us.</p><div class="card-links"><a href="en/support/">English <span aria-hidden="true">↗</span></a><a href="zh/support/" lang="zh-Hans">简体中文 <span aria-hidden="true">↗</span></a></div></article>
<article class="card privacy-card"><span class="number">02 / PRIVACY</span><h2>Your privacy <span lang="zh-Hans">隐私政策</span></h2><p>Your game stays on your device.<br>Read exactly how data is handled.</p><div class="card-links"><a href="en/privacy/">English <span aria-hidden="true">↗</span></a><a href="zh/privacy/" lang="zh-Hans">简体中文 <span aria-hidden="true">↗</span></a></div></article>
</section>
<footer><span>${esc(appName)}${publisher ? ` · ${esc(publisher)}` : ""}</span><span>Made for a moment of play.</span></footer>
</main>
</body>
</html>
`;
}

function notFoundPage() {
  const title = `Page not found — ${appName}`;
  return head({ lang: "en", title, description: "This page does not exist.", canonical: `${siteUrl}/404.html` }) + `<main class="document">
<header class="topbar"><a href="${siteUrl}/" class="brand"><img src="${siteUrl}/app-icon.png" width="40" height="40" alt=""><span>TapMe <small>Number Merge</small></span></a></header>
<div class="doc-heading"><p class="eyebrow">404</p><h1>Page not found<br><span lang="zh-Hans">页面不存在</span></h1><p><a href="${siteUrl}/">Help center · 帮助中心</a></p></div>
</main>
</body>
</html>
`;
}

rmSync(out, { recursive: true, force: true });
mkdirSync(out, { recursive: true });
writeFileSync(join(out, "index.html"), homePage());
writeFileSync(join(out, "404.html"), notFoundPage());
for (const lang of ["en", "zh"]) for (const page of ["privacy", "support"]) {
  mkdirSync(join(out, lang, page), { recursive: true });
  writeFileSync(join(out, lang, page, "index.html"), docPage(lang, page));
}
copyFileSync(join(root, "styles.css"), join(out, "styles.css"));
copyFileSync(join(root, "assets", "app-icon.png"), join(out, "app-icon.png"));
copyFileSync(join(root, "assets", "og.jpg"), join(out, "og.jpg"));
writeFileSync(join(out, ".nojekyll"), "");
writeFileSync(join(out, "robots.txt"), `User-agent: *\nAllow: /\nSitemap: ${siteUrl}/sitemap.xml\n`);
writeFileSync(join(out, "sitemap.xml"), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${["/", "/en/privacy/", "/zh/privacy/", "/en/support/", "/zh/support/"].map((p) => `  <url><loc>${siteUrl}${p}</loc></url>`).join("\n")}\n</urlset>\n`);
console.log(`Built ${draft ? "DRAFT " : ""}site into ${out} for ${siteUrl}`);
