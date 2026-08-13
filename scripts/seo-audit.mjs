import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const ROOT = process.cwd();
const APP_DIR = join(ROOT, ".next", "server", "app");
const PUBLIC_DIR = join(ROOT, "public");
const SITE_ORIGIN = "https://www.selmou.com";
const errors = [];

function assert(condition, message) {
  if (!condition) errors.push(message);
}

function read(path) {
  return readFileSync(path, "utf8");
}

function normalizeUrl(url) {
  const parsed = new URL(url, SITE_ORIGIN);
  const pathname = parsed.pathname === "/" ? "/" : parsed.pathname.replace(/\/$/, "");
  return `${parsed.origin}${pathname}`;
}

function routeHtmlPath(url) {
  const pathname = new URL(url).pathname;
  return pathname === "/"
    ? join(APP_DIR, "index.html")
    : join(APP_DIR, `${pathname.slice(1)}.html`);
}

function filesRecursively(directory) {
  if (!existsSync(directory)) return [];
  return readdirSync(directory).flatMap((entry) => {
    const path = join(directory, entry);
    return statSync(path).isDirectory() ? filesRecursively(path) : [path];
  });
}

assert(existsSync(APP_DIR), "Missing .next build output; run npm run build first.");

const sitemapPath = join(APP_DIR, "sitemap.xml.body");
const robotsPath = join(APP_DIR, "robots.txt.body");
const feedPath = join(APP_DIR, "feed.xml.body");
const llmsPath = join(APP_DIR, "llms.txt.body");

for (const path of [sitemapPath, robotsPath, feedPath, llmsPath]) {
  assert(existsSync(path), `Missing generated discovery file: ${path}`);
}

const sitemap = existsSync(sitemapPath) ? read(sitemapPath) : "";
const sitemapUrls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1]);
const sitemapImageUrls = [...sitemap.matchAll(/<image:loc>(.*?)<\/image:loc>/g)].map(
  (match) => match[1],
);
const pageUrls = sitemapUrls.filter((url) => !url.includes("/images/"));

assert(pageUrls.length === 21, `Expected 21 indexable sitemap URLs, found ${pageUrls.length}.`);
assert(new Set(pageUrls).size === pageUrls.length, "Sitemap contains duplicate page URLs.");
assert(
  pageUrls.every((url) => url.startsWith(`${SITE_ORIGIN}/`) || url === `${SITE_ORIGIN}/`),
  "Sitemap contains a non-canonical host.",
);

const knownRoutes = new Set([
  ...pageUrls.map((url) => new URL(url).pathname.replace(/\/$/, "") || "/"),
  "/book-a-demo",
  "/company",
  "/blog",
  "/get-started",
  "/legal",
  "/legal/privacy",
  "/legal/terms-of-service",
  "/legal/services-agreement",
  "/legal/referral-program",
  "/legal/business-associate-agreement",
  "/feed.xml",
  "/llms.txt",
  "/robots.txt",
  "/sitemap.xml",
  "/manifest.webmanifest",
]);

for (const url of pageUrls) {
  const htmlPath = routeHtmlPath(url);
  assert(existsSync(htmlPath), `Sitemap URL has no prerendered HTML: ${url}`);
  if (!existsSync(htmlPath)) continue;

  const html = read(htmlPath);
  const head = html.match(/<head>([\s\S]*?)<\/head>/)?.[1] ?? "";
  const titles = [...head.matchAll(/<title>(.*?)<\/title>/g)];
  const descriptions = [...head.matchAll(/<meta name="description" content="([^"]+)"\/>/g)];
  const canonicals = [...head.matchAll(/<link rel="canonical" href="([^"]+)"\/>/g)];
  const h1s = [...html.matchAll(/<h1(?:\s|>)/g)];

  assert(titles.length === 1, `${url} has ${titles.length} document titles.`);
  assert(descriptions.length === 1, `${url} has ${descriptions.length} meta descriptions.`);
  assert(canonicals.length === 1, `${url} has ${canonicals.length} canonical links.`);
  assert(h1s.length === 1, `${url} has ${h1s.length} H1 elements.`);
  assert(!head.includes('name="robots" content="noindex'), `${url} is in the sitemap but noindexed.`);

  if (canonicals[0]) {
    assert(
      normalizeUrl(canonicals[0][1]) === normalizeUrl(url),
      `${url} canonicalizes to ${canonicals[0][1]}.`,
    );
  }

  const jsonLdBlocks = [
    ...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g),
  ];
  assert(jsonLdBlocks.length > 0, `${url} has no JSON-LD.`);
  for (const [, json] of jsonLdBlocks) {
    try {
      JSON.parse(json);
    } catch (error) {
      errors.push(`${url} has invalid JSON-LD: ${error.message}`);
    }
  }

  for (const [, href] of html.matchAll(/href="(\/[^"]*)"/g)) {
    const pathname = href.split(/[?#]/)[0].replace(/\/$/, "") || "/";
    if (pathname.startsWith("/_next/")) continue;
    const publicPath = join(PUBLIC_DIR, pathname.slice(1));
    assert(
      knownRoutes.has(pathname) || existsSync(publicPath),
      `${url} links to an unknown internal target: ${href}`,
    );
  }
}

const robots = existsSync(robotsPath) ? read(robotsPath) : "";
assert(robots.includes("User-Agent: *"), "robots.txt has no default user-agent rule.");
assert(robots.includes("Allow: /"), "robots.txt does not allow public crawling.");
assert(
  robots.includes(`Sitemap: ${SITE_ORIGIN}/sitemap.xml`),
  "robots.txt does not advertise the canonical sitemap.",
);

for (const legalHtml of filesRecursively(join(APP_DIR, "legal")).filter((path) => path.endsWith(".html"))) {
  assert(
    read(legalHtml).includes('name="robots" content="noindex, follow"'),
    `${legalHtml} should be noindex, follow while it remains a draft.`,
  );
}

const feed = existsSync(feedPath) ? read(feedPath) : "";
assert((feed.match(/<item>/g) ?? []).length === 12, "RSS feed should contain all 12 field notes.");
assert(feed.includes("<rss version=\"2.0\""), "RSS feed root is missing.");

const llms = existsSync(llmsPath) ? read(llmsPath) : "";
assert(llms.startsWith("# Selmou"), "llms.txt has no Selmou entity heading.");
assert(llms.includes("product in development"), "llms.txt lacks the product-stage disclosure.");

if (errors.length) {
  console.error(`SEO audit failed with ${errors.length} issue${errors.length === 1 ? "" : "s"}:`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(
  `SEO audit passed: ${pageUrls.length} indexable pages, ${sitemapImageUrls.length} sitemap images, valid metadata, canonicals, JSON-LD, internal links, robots.txt, RSS, and llms.txt.`,
);
