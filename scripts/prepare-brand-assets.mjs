/**
 * One-time asset prep: the supplied SHARIO artwork ships with a solid brand-field
 * background baked in. The guidelines require using the master artwork as-is, so we
 * only knock the flat background out to alpha and trim — the letterforms are untouched.
 *
 * Run with: node scripts/prepare-brand-assets.mjs
 */
import sharp from "sharp";
import { mkdir } from "node:fs/promises";

/** Master artwork as supplied by the client — not served to the browser. */
const SRC = "assets/brand-source";
/** Web-ready, background knocked out to alpha. */
const OUT = "public/brand";

/** Distance in RGB space, used to decide what counts as "the flat background". */
function distance(a, b) {
  return Math.sqrt((a[0] - b[0]) ** 2 + (a[1] - b[1]) ** 2 + (a[2] - b[2]) ** 2);
}

async function knockOutBackground(input, output, { tolerance = 42, feather = 26 } = {}) {
  const src = sharp(input).ensureAlpha();
  const { width, height } = await src.metadata();
  const { data } = await src.raw().toBuffer({ resolveWithObject: true });

  // Sample the top-left corner: on all three supplied files this is flat background.
  const bg = [data[0], data[1], data[2]];

  for (let i = 0; i < data.length; i += 4) {
    const d = distance([data[i], data[i + 1], data[i + 2]], bg);
    if (d <= tolerance) {
      data[i + 3] = 0;
    } else if (d <= tolerance + feather) {
      // Soft edge so the thin serif strokes keep their antialiasing.
      data[i + 3] = Math.round(((d - tolerance) / feather) * 255);
    }
  }

  await sharp(data, { raw: { width, height, channels: 4 } })
    .png()
    .trim({ threshold: 1 })
    .toFile(output);

  const meta = await sharp(output).metadata();
  console.log(`${output} — ${meta.width}x${meta.height}`);
}

/**
 * A display-sized cut of the master, for the header and footer.
 *
 * The wordmark is painted through a CSS mask so it can take the ink colour the
 * header switches between, and a mask URL never reaches Next's image optimiser
 * — whatever is on disk is what every page downloads. The master is 1535px
 * wide for a mark that sets at ~120, so it ships its own web size rather than
 * making every visit carry 160KB of unused resolution.
 */
async function webCut(input, output, width) {
  await sharp(input)
    .resize({ width, kernel: "lanczos3" })
    .png({ compressionLevel: 9, palette: true })
    .toFile(output);

  const meta = await sharp(output).metadata();
  console.log(`${output} — ${meta.width}x${meta.height}`);
}

await mkdir(OUT, { recursive: true });

await knockOutBackground(`${SRC}/wordmark.png`, `${OUT}/wordmark.png`);
await knockOutBackground(`${SRC}/monogram.jpg`, `${OUT}/monogram.png`);
await knockOutBackground(`${SRC}/wordmark-ar.jpg`, `${OUT}/wordmark-ar.png`);

await webCut(`${OUT}/wordmark.png`, `${OUT}/wordmark-web.png`, 400);
