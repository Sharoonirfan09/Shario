/**
 * Temporary hero photography for the Industries section, until real
 * commissioned photography replaces it.
 *
 * Every industry hero is a distinct, on-brand editorial composition built
 * from the site's own palette (`app/globals.css`) rather than a stock photo
 * — avoids licensing risk entirely and guarantees each file is perceptually
 * distinct, so `npm run check:images` passes without relying on luck.
 *
 * Replacing a placeholder later is a one-file swap: overwrite the matching
 * path in `public/images/industries/` with a real photograph at the same
 * name and roughly the same 1920x1200 aspect — nothing else references
 * these files by anything other than that one path per industry
 * (`lib/site.ts`'s `industries[].heroImage`).
 *
 * Run with: node scripts/generate-industry-images.mjs
 */
import sharp from "sharp";
import { mkdir } from "node:fs/promises";

const OUT = "public/images/industries";
const WIDTH = 1920;
const HEIGHT = 1200;

// The live brand palette (app/globals.css) — nothing invented here.
const CARBON = { r: 0x25, g: 0x25, b: 0x25 };
const LIMESTONE = { r: 0xd6, g: 0xce, b: 0xc2 };
const PORCELAIN = { r: 0xf1, g: 0xee, b: 0xe7 };
const MIST = { r: 0xab, g: 0xbf, b: 0xc7 };
const LIMESTONE_DEEP = { r: 0xc7, g: 0xbd, b: 0xaf };

/** One entry per industry hero, each a different colour mood and gradient
 *  geometry so no two files read as the same composition. */
const plates = [
  { file: "overview.jpg", from: CARBON, via: LIMESTONE_DEEP, to: MIST, angle: 0, grain: 0.05 },
  { file: "real-estate.jpg", from: LIMESTONE, via: MIST, to: CARBON, angle: 33, grain: 0.045 },
  { file: "hospitality.jpg", from: LIMESTONE_DEEP, via: PORCELAIN, to: MIST, angle: 66, grain: 0.05 },
  { file: "aesthetic-wellness.jpg", from: PORCELAIN, via: MIST, to: LIMESTONE_DEEP, angle: 99, grain: 0.03 },
  { file: "healthcare.jpg", from: MIST, via: CARBON, to: PORCELAIN, angle: 132, grain: 0.04 },
  { file: "ecommerce-retail.jpg", from: CARBON, via: LIMESTONE, to: MIST, angle: 165, grain: 0.05 },
  { file: "fashion-luxury.jpg", from: CARBON, via: MIST, to: LIMESTONE_DEEP, angle: 198, grain: 0.065 },
  { file: "technology-saas.jpg", from: PORCELAIN, via: CARBON, to: MIST, angle: 231, grain: 0.045 },
  { file: "restaurants-fb.jpg", from: LIMESTONE_DEEP, via: CARBON, to: LIMESTONE, angle: 264, grain: 0.055 },
  { file: "professional-services.jpg", from: CARBON, via: LIMESTONE_DEEP, to: PORCELAIN, angle: 297, grain: 0.04 },
  { file: "education.jpg", from: MIST, via: LIMESTONE, to: CARBON, angle: 330, grain: 0.045 },
];

function rgb({ r, g, b }) {
  return `rgb(${r},${g},${b})`;
}

/** A three-stop linear gradient at `angle` degrees, as an SVG string sharp can rasterise. */
function gradientSvg({ from, via, to, angle }) {
  const rad = (angle * Math.PI) / 180;
  const x1 = 50 - 50 * Math.cos(rad);
  const y1 = 50 - 50 * Math.sin(rad);
  const x2 = 50 + 50 * Math.cos(rad);
  const y2 = 50 + 50 * Math.sin(rad);
  return `
    <svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}">
      <defs>
        <linearGradient id="g" x1="${x1}%" y1="${y1}%" x2="${x2}%" y2="${y2}%">
          <stop offset="0%" stop-color="${rgb(from)}" />
          <stop offset="52%" stop-color="${rgb(via)}" />
          <stop offset="100%" stop-color="${rgb(to)}" />
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#g)" />
    </svg>
  `;
}

/** A random monochrome grain layer, screened over the gradient at low opacity
 *  so the plate reads as material rather than a flat vector fill. */
async function grainBuffer(opacity) {
  const size = WIDTH * HEIGHT;
  const data = Buffer.alloc(size * 4);
  for (let i = 0; i < size; i++) {
    const v = Math.floor(Math.random() * 256);
    const o = i * 4;
    data[o] = v;
    data[o + 1] = v;
    data[o + 2] = v;
    data[o + 3] = Math.round(opacity * 255);
  }
  return sharp(data, { raw: { width: WIDTH, height: HEIGHT, channels: 4 } })
    .blur(0.6)
    .png()
    .toBuffer();
}

async function makePlate({ file, from, via, to, angle, grain }) {
  const gradient = await sharp(Buffer.from(gradientSvg({ from, via, to, angle })))
    .resize(WIDTH, HEIGHT)
    .toBuffer();

  const noise = await grainBuffer(grain);

  await sharp(gradient)
    .composite([{ input: noise, blend: "overlay" }])
    .jpeg({ quality: 86, mozjpeg: true })
    .toFile(`${OUT}/${file}`);

  console.log(`${OUT}/${file}`);
}

await mkdir(OUT, { recursive: true });
for (const plate of plates) {
  await makePlate(plate);
}
console.log(`Done — ${plates.length} plates written.`);
