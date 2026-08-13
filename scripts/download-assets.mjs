// Downloads all lassie.ai assets to public/ with clean local names.
import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = fileURLToPath(new URL("..", import.meta.url));

const ASSETS = [
  // Fonts (next/font self-hosted)
  ["https://www.lassie.ai/_next/static/media/dmsans_variable-s.p.2wix-n_3i8lhx.woff2", "public/fonts/dmsans-variable.woff2"],
  ["https://www.lassie.ai/_next/static/media/abcmarist_book-s.p.1it8i_yv1yk4l.woff2", "public/fonts/abcmarist-book.woff2"],
  ["https://www.lassie.ai/_next/static/media/abcmarist_bookitalic-s.p.1-e4k4awtxivk.woff2", "public/fonts/abcmarist-bookitalic.woff2"],
  ["https://www.lassie.ai/_next/static/media/dmmono_regular-s.3r-2j304oiare.woff2", "public/fonts/dmmono-regular.woff2"],
  // Videos
  ["https://cdn.lassie.ai/assets/media/website/hero/hero.mp4", "public/videos/hero.mp4"],
  ["https://cdn.lassie.ai/assets/media/website/lassie-pg-1-e1832fd4-4bf4-4fbd-acbb-ec8ee35882a2.mp4", "public/videos/lassie-pg-1.mp4"],
  ["https://cdn.lassie.ai/assets/media/website/lassie-pg-2-4fba523a-2180-4814-bf6a-2c9000826b7c.mp4", "public/videos/lassie-pg-2.mp4"],
  ["https://cdn.lassie.ai/assets/media/website/lassie-pg-3-01a69d26-1a50-4804-9dec-c1b1670faf17.mp4", "public/videos/lassie-pg-3.mp4"],
  ["https://cdn.lassie.ai/assets/media/website/interview/interview-cta-13bf15dc-b00c-4851-adca-b977b95169e8.mp4", "public/videos/interview-cta.mp4"],
  // Hero / feature covers
  ["https://cdn.lassie.ai/assets/media/website/hero/hero-cover-a27631dc-5a4b-4521-aaf0-eed19c9c2be6.jpg", "public/images/hero-cover.jpg"],
  ["https://cdn.lassie.ai/assets/media/website/lassie-pg-1.jpg", "public/images/lassie-pg-1.jpg"],
  ["https://cdn.lassie.ai/assets/media/website/lassie-pg-2.jpg", "public/images/lassie-pg-2.jpg"],
  ["https://cdn.lassie.ai/assets/media/website/lassie-pg-3.jpg", "public/images/lassie-pg-3.jpg"],
  // Infographic (layered: photos + SVG stat cards)
  ["https://cdn.lassie.ai/assets/media/website/infographic/top-left-9a8c2dff-8249-4cbe-99d9-3c11d1e56105.jpg", "public/images/infographic/top-left.jpg"],
  ["https://cdn.lassie.ai/assets/media/website/infographic/top-left-1-983872b1-f53d-40b6-93ef-4ef36423303a.svg", "public/images/infographic/top-left-card.svg"],
  ["https://cdn.lassie.ai/assets/media/website/infographic/top-right-9c96bfd2-d943-4721-af2b-970d6f1e8056.jpg", "public/images/infographic/top-right.jpg"],
  ["https://cdn.lassie.ai/assets/media/website/infographic/bottom-left-bb2d87e3-276f-4e1d-8077-cdfc77ce079b.svg", "public/images/infographic/bottom-left-card.svg"],
  ["https://cdn.lassie.ai/assets/media/website/infographic/bottom-right-dffd49f7-779e-491d-bbec-97ed5a920117.jpg", "public/images/infographic/bottom-right.jpg"],
  ["https://cdn.lassie.ai/assets/media/website/infographic/bottom-right-6f11c3d8-d8de-4a85-81cd-ac22c29c59c8.svg", "public/images/infographic/bottom-right-card.svg"],
  // Testimonials
  ["https://cdn.lassie.ai/assets/media/website/testimonials/kwon-desktop-644bff27-485f-44ac-b43b-edd396aa782d.jpg", "public/images/testimonials/kwon-desktop.jpg"],
  ["https://cdn.lassie.ai/assets/media/website/testimonials/kwon-mobile-2-c233dd89-844a-4c51-ad90-263b6a4ba90d.png", "public/images/testimonials/kwon-mobile.png"],
  ["https://cdn.lassie.ai/assets/media/website/testimonials/haag-desktop-7f3d8fae-418d-42c9-afca-fbfb83df3256.jpg", "public/images/testimonials/haag-desktop.jpg"],
  ["https://cdn.lassie.ai/assets/media/website/testimonials/haag-mobile-2-f3790cbb-bb02-4dac-b667-9cc359f458db.png", "public/images/testimonials/haag-mobile.png"],
  ["https://cdn.lassie.ai/assets/media/website/testimonials/webb-desktop-34f2068e-a92e-43de-bd91-6d768c533513.jpg", "public/images/testimonials/webb-desktop.jpg"],
  ["https://cdn.lassie.ai/assets/media/website/testimonials/webb-mobile-2-ed71faf1-315f-41c2-a748-b925f537ff21.png", "public/images/testimonials/webb-mobile.png"],
  // Static features SVGs
  ["https://cdn.lassie.ai/assets/media/website/static-features/enrolls-1578d987-de61-4782-a576-e8044bdf7a8e.svg", "public/images/static-features/enrolls.svg"],
  ["https://cdn.lassie.ai/assets/media/website/static-features/efts-c992d751-82c8-471c-9507-e9e43818a48c.svg", "public/images/static-features/efts.svg"],
  ["https://cdn.lassie.ai/assets/media/website/static-features/payments-b0d4943f-0f19-49e2-a603-0307296dc7ea.svg", "public/images/static-features/payments.svg"],
  // Careers
  ["https://cdn.lassie.ai/assets/media/website/careers/37e8d1b6-9fb6-4ceb-b707-9eb2525b0be3.png", "public/images/careers.png"],
  // Favicons / SEO
  ["https://www.lassie.ai/favicon.svg?v=2", "public/seo/favicon.svg"],
  ["https://www.lassie.ai/favicon.png?v=2", "public/seo/favicon.png"],
  ["https://www.lassie.ai/favicon@96x96.png?v=2", "public/seo/favicon-96.png"],
  ["https://www.lassie.ai/apple-touch-icon.png?v=2", "public/seo/apple-touch-icon.png"],
];

async function download([url, dest]) {
  const out = join(ROOT, dest);
  await mkdir(dirname(out), { recursive: true });
  const res = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0" } });
  if (!res.ok) throw new Error(`${res.status} ${url}`);
  const buf = Buffer.from(await res.arrayBuffer());
  await writeFile(out, buf);
  return `${dest} (${(buf.length / 1024).toFixed(0)}kB)`;
}

const results = { ok: [], fail: [] };
for (let i = 0; i < ASSETS.length; i += 4) {
  const batch = ASSETS.slice(i, i + 4);
  const settled = await Promise.allSettled(batch.map(download));
  settled.forEach((s, j) => {
    if (s.status === "fulfilled") results.ok.push(s.value);
    else results.fail.push(`${batch[j][0]}: ${s.reason.message}`);
  });
}
console.log(`Downloaded ${results.ok.length}/${ASSETS.length}`);
results.ok.forEach((r) => console.log("  ok:", r));
if (results.fail.length) {
  console.error("FAILURES:");
  results.fail.forEach((f) => console.error("  ", f));
  process.exit(1);
}
