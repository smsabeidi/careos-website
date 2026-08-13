// Splits the fetched lassie.ai HTML into per-section reference files + extracts the US dot-map SVG.
import { readFile, writeFile, mkdir } from "node:fs/promises";
import { parse } from "node-html-parser";
import { fileURLToPath } from "node:url";

const ROOT = fileURLToPath(new URL("..", import.meta.url));
const html = await readFile(ROOT + "docs/research/lassie-source.html", "utf8");
const doc = parse(html);

const clean = (s) =>
  s
    .replace(/\s?srcset="[^"]*"/g, "")
    .replace(/\s?sizes="[^"]*"/g, "")
    .replace(/src="\/_next\/image[^"]*?url=([^&"]*)[^"]*"/g, (m, u) => `src="${decodeURIComponent(u)}"`);

await mkdir(ROOT + "docs/research/sections", { recursive: true });

const main = doc.querySelector("main");
const names = ["0-hero", "1-features", "2-infographic-counter", "3-locations-testimonials", "4-how-it-works", "5-faq", "6-footer-cta"];
const kids = main.childNodes.filter((n) => n.nodeType === 1);
for (let i = 0; i < kids.length; i++) {
  const name = names[i] || `${i}-unknown`;
  await writeFile(ROOT + `docs/research/sections/${name}.html`, clean(kids[i].outerHTML));
  console.log(name, kids[i].outerHTML.length, "bytes");
}

// nav
const nav = doc.querySelector("nav");
await writeFile(ROOT + "docs/research/sections/nav.html", clean(nav.outerHTML));

// US dot map svg
const mapSvg = doc.querySelector('svg[viewBox="0 0 1311 821"]');
if (mapSvg) {
  await writeFile(ROOT + "public/images/us-dot-map.svg", '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1311 821" fill="none">' + mapSvg.innerHTML + "</svg>");
  console.log("us-dot-map.svg", mapSvg.innerHTML.length, "bytes");
}
