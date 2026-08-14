/**
 * The default social-share card for every route that doesn't define its own
 * `opengraph-image` — which, until this ran, was every route. Without it, a
 * shared SHARIO link carries no preview image at all on WhatsApp, LinkedIn,
 * Facebook or iMessage.
 *
 * A static file (`app/opengraph-image.png`) rather than the code-generation
 * convention (`app/opengraph-image.tsx` + `next/og`'s `ImageResponse`):
 * `ImageResponse` renders through Satori and a native Resvg binary, which
 * doesn't load in this environment (the request hangs with no response, even
 * on Next's own minimal doc example — an environment limitation, not a
 * mistake in how it was called). A static PNG sidesteps that at zero runtime
 * cost, and needs regenerating only if the wordmark or tagline changes.
 *
 * Run with: node scripts/generate-og-image.mjs
 */
import sharp from "sharp";

const WIDTH = 1200;
const HEIGHT = 630;
const PORCELAIN = "#f1eee7";
const CARBON = "#252525";
const MIST = "#abbfc7";

const wordmark = await sharp("public/brand/wordmark.png")
  .resize({ width: 640 })
  .toBuffer();
const wordmarkMeta = await sharp(wordmark).metadata();

const tagline = "Marketing that turns spend into revenue.";

const svg = `
<svg width="${WIDTH}" height="${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${WIDTH}" height="${HEIGHT}" fill="${PORCELAIN}" />
  <rect x="${WIDTH / 2 - 32}" y="398" width="64" height="1" fill="${MIST}" />
  <text
    x="50%"
    y="452"
    text-anchor="middle"
    font-family="Georgia, 'Times New Roman', serif"
    font-size="30"
    fill="${CARBON}"
    fill-opacity="0.7"
    letter-spacing="0.5"
  >${tagline}</text>
</svg>`;

await sharp(Buffer.from(svg))
  .composite([
    {
      input: wordmark,
      top: Math.round(HEIGHT / 2 - 60 - wordmarkMeta.height / 2),
      left: Math.round(WIDTH / 2 - wordmarkMeta.width / 2),
    },
  ])
  .png({ compressionLevel: 9 })
  .toFile("app/opengraph-image.png");

console.log("app/opengraph-image.png — 1200x630");
