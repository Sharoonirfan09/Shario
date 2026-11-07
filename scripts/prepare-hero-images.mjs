/**
 * Pre-renders the home hero photograph to static AVIF files at every width
 * its `srcset` asks for, so the hero never goes through `/_next/image`.
 *
 * Why: the on-demand optimizer caches per CDN region. When PageSpeed's test
 * machine lands on a region where that cache is cold, the 20KB hero takes
 * close to a second to come back while the image is resized, and on the
 * mobile profile that alone swings the Performance score from ~100 to the
 * high 80s from one run to the next. A static file is served straight from
 * the CDN everywhere, with no transformation step to wait on.
 *
 * Output: public/images/hero/static/portrait-<width>.avif. AVIF is outside
 * `check:images`' duplicate scan by design (it only hashes jpg/png/webp), so
 * these renditions don't read as copies of the original photograph.
 *
 * Re-run after replacing `public/images/hero/portrait.jpg`:
 *   npm run hero:images
 */
import { mkdir } from "node:fs/promises";
import sharp from "sharp";

const SRC = "public/images/hero/portrait.jpg";
const OUT = "public/images/hero/static";

/** Must match `HERO_STATIC_WIDTHS` in components/ui.tsx. */
const WIDTHS = [384, 640, 750, 828, 1080, 1200, 1400];

await mkdir(OUT, { recursive: true });
const { width: original } = await sharp(SRC).metadata();

for (const w of WIDTHS) {
  const out = `${OUT}/portrait-${w}.avif`;
  const info = await sharp(SRC)
    .resize({ width: Math.min(w, original), withoutEnlargement: true })
    .avif({ quality: 48, effort: 6 })
    .toFile(out);
  console.log(`${out} — ${info.width}x${info.height}, ${(info.size / 1024).toFixed(1)}KB`);
}
