/**
 * Downloads every Maddog image referenced by the app from their CloudFront CDN
 * into public/media, preserving the CDN path structure so the only change
 * needed in lib/products.ts is swapping the CDN origin for "/media".
 *
 * Run: node scripts/fetch-assets.mjs
 */
import { mkdir, writeFile, readFile, stat } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const CDN = "https://d32yu5nuptb5qv.cloudfront.net";
const OUT = join(ROOT, "public", "media");

// Everything referenced from the product catalogue.
const src = await readFile(join(ROOT, "lib", "products.ts"), "utf8");
const fromCatalogue = [...src.matchAll(/\$\{CDN\}(\/[^\s`"']+)/g)].map((m) => m[1]);

// Editorial and brand imagery discovered on the live site but not in the catalogue.
const extra = [
  "/banners/background_1777985582_4572315.webp",
  "/banners/background_1777815489_6903210.webp",
  "/banners/banner_1777985582_1387582.webp",
  "/banners/banner_1777815934_1256461.webp",
  "/images/about-us-poster-1.webp",
  "/images/about-us-poster-2.webp",
  "/images/maddog-uv-accessories-banner-02.webp",
  "/posters/poster_1777963847_7269314.webp",
  "/posters/poster_1777964457_9670251.webp",
  "/posters/poster_1777987499_8485376.webp",
  "/gallery/2838023a778dfaecdc212708f721b7881630846672himalayan 2_022_7_11zon.jpg",
  "/gallery/f9028faec74be6ec9b852b0a542e2f39163084658211_31_11zon.jpg",
  "/gallery/d61e4bbd6393c9111e6526ea173a7c8b1630846556011_24_11zon.jpg",
];

const paths = [...new Set([...fromCatalogue, ...extra])];

let ok = 0;
let skipped = 0;
const failed = [];

for (const p of paths) {
  const dest = join(OUT, p);
  try {
    const existing = await stat(dest);
    if (existing.size > 0) {
      skipped++;
      continue;
    }
  } catch {
    // not downloaded yet
  }

  try {
    const res = await fetch(CDN + encodeURI(p));
    if (!res.ok) {
      failed.push(`${p} → HTTP ${res.status}`);
      continue;
    }
    const buf = Buffer.from(await res.arrayBuffer());
    await mkdir(dirname(dest), { recursive: true });
    await writeFile(dest, buf);
    ok++;
  } catch (err) {
    failed.push(`${p} → ${err.message}`);
  }
}

console.log(`downloaded ${ok}, already present ${skipped}, failed ${failed.length}, total ${paths.length}`);
if (failed.length) console.log("FAILURES:\n" + failed.join("\n"));
