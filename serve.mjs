import { createServer } from "node:http";
import { readFileSync, statSync } from "node:fs";
import { resolve, extname, sep } from "node:path";

const root = resolve("dist");
const prefix = new URL(JSON.parse(readFileSync("contact.json", "utf8")).siteUrl).pathname.replace(/\/+$/, "");
const types = { ".html": "text/html; charset=utf-8", ".css": "text/css; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".png": "image/png", ".jpg": "image/jpeg", ".xml": "application/xml", ".txt": "text/plain" };
createServer((req, res) => {
  try {
    const path = decodeURIComponent(new URL(req.url, "http://localhost").pathname);
    if (path === "/" || path === prefix) {
      res.writeHead(302, { Location: `${prefix}/` }).end();
      return;
    }
    if (!path.startsWith(`${prefix}/`)) throw new Error("Not found");
    let file = resolve(root, `.${path.slice(prefix.length)}`);
    if (file !== root && !file.startsWith(`${root}${sep}`)) throw new Error("Not found");
    if (statSync(file).isDirectory()) file = resolve(file, "index.html");
    res.writeHead(200, { "Content-Type": types[extname(file)] || "application/octet-stream", "Cache-Control": "no-store" });
    res.end(readFileSync(file));
  } catch {
    res.writeHead(404, { "Content-Type": "text/html; charset=utf-8" });
    res.end(readFileSync(resolve(root, "404.html")));
  }
}).listen(8765, "127.0.0.1", () => console.log(`Local: http://127.0.0.1:8765${prefix}/`));
