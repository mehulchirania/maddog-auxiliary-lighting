import sharp from "sharp";
import { mkdirSync } from "fs";

mkdirSync("public/media/derived", { recursive: true });

// 1. HERO BACKDROP — clean cinematic dark mountain lineup of Maddog auxiliary lights.
await sharp("public/media/banners/background_1777985582_4572315.webp")
  .extract({ left: 665, top: 0, width: 1255, height: 772 })
  .webp({ quality: 92 })
  .toFile("public/media/derived/hero-hardware-wide.webp");

// 2. HERO BACKDROP (mobile) — tighter square on the Rage & Delta units.
await sharp("public/media/banners/background_1777985582_4572315.webp")
  .extract({ left: 880, top: 200, width: 550, height: 550 })
  .webp({ quality: 92 })
  .toFile("public/media/derived/hero-hardware-square.webp");

// 3. CLEAN ROAD STRIP (Maddog state) — annotation-free band of the Rage beam photo.
await sharp("public/media/products/MDR/original/product_1752410419_3352346.webp")
  .extract({ left: 0, top: 560, width: 1200, height: 470 })
  .webp({ quality: 85 })
  .toFile("public/media/derived/road-strip-rage.webp");

// 4. CLEAN ROAD STRIP (Lycan state) — same crop box, same road, shorter throw.
await sharp("public/media/products/MDL/original/product_1752410035_6210319.webp")
  .extract({ left: 0, top: 560, width: 1200, height: 470 })
  .webp({ quality: 85 })
  .toFile("public/media/derived/road-strip-lycan.webp");

console.log("All derived assets successfully prepared.");
