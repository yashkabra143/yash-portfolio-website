// One-off: convert heavy portfolio images to WebP (run: node scripts/convert-images.mjs)
import sharp from "sharp";

const jobs = [
  ["client/public/attached_assets/firstcry-screenshot.png", "client/public/attached_assets/firstcry-screenshot.webp", { width: 1280 }],
  ["client/public/attached_assets/yadara.png", "client/public/attached_assets/yadara.webp", { width: 1280 }],
  ["client/public/attached_assets/yash-photo-removebg-preview.png", "client/public/attached_assets/yash-photo-removebg-preview.webp", { width: 800 }],
];

for (const [src, dest, { width }] of jobs) {
  const meta = await sharp(src).metadata();
  const out = await sharp(src)
    .resize({ width: Math.min(width, meta.width), withoutEnlargement: true })
    .webp({ quality: 82 })
    .toFile(dest);
  console.log(`${src} (${meta.width}px) -> ${dest}: ${Math.round(out.size / 1024)} KB`);
}
