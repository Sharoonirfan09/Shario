/**
 * One-time asset prep for the homepage "Brands we've worked with" wall.
 *
 * The client logos arrive as 2000×2000 flat PNGs (`../clients logos /N.png`) with
 * a white ground baked in. This knocks that ground out to alpha, trims to the
 * mark, scales down for web and writes `public/images/clients/<slug>.webp`, plus
 * a manifest (`lib/client-logos.json`) carrying each file's real dimensions so
 * the wall can balance wide wordmarks against square marks by area.
 *
 * Run with: node scripts/prepare-client-logos.mjs
 *
 * To add a client: drop the PNG in the source folder, add a line to LOGOS, re-run.
 * Order in LOGOS is the order on the page.
 */
import sharp from "sharp";
import { mkdir, writeFile } from "node:fs/promises";

const SRC = "../clients logos ";
const OUT = "public/images/clients";
const MANIFEST = "lib/client-logos.json";

/** Longest side after trim. The wall shows them at ~60–200 CSS px, so this covers 2× density. */
const MAX_W = 560;
const MAX_H = 280;

/**
 * file → slug/name. Left out on purpose: alternate colourways of marks already
 * here (2, 3 MSN; 4, 5 ERE; 36 First Key; 10 Earthlink), and the app-icon-only
 * marks with no name on them (19, 27, 28, 31, 32, 33).
 *
 * `mode: "light-on-grey"` is for a white mark on a grey ground (35): it's lifted
 * off the grey and recoloured Carbon, since a white logo vanishes on Porcelain.
 *
 * `file` is a number (→ `N.png`) or a full filename. `mode: "transparent"` is for
 * sources that already have a transparent ground (the brands' own SVGs), and
 * `mode: "white-on-transparent"` recolours a white-only mark to Carbon (Isolana
 * only publishes its wordmark in white).
 */
const LOGOS = [
  { file: 1, slug: "msn-developments", name: "MSN Developments" },
  { file: "hayaat-developments.svg", slug: "hayaat-developments", name: "Hayaat Developments", mode: "transparent" },
  { file: "isolana-residences-white.png", slug: "isolana-residences", name: "Isolana Residences", mode: "white-on-transparent" },
  { file: 12, slug: "earthlink-real-estate", name: "Earthlink Real Estate" },
  { file: 8, slug: "ere-management", name: "ERE Management" },
  { file: 9, slug: "khayal-properties", name: "Khayal Properties" },
  { file: 20, slug: "first-key-international", name: "First Key International Real Estate" },
  { file: 11, slug: "prive-business-lounge", name: "Privé Business Lounge" },
  { file: 24, slug: "al-basit", name: "Al Basit Group of Companies" },
  { file: 14, slug: "earthlink-premium", name: "Earthlink Premium Holiday Homes" },
  { file: 15, slug: "shanti-kiaans", name: "Shanti Kiaans Real Estate" },
  { file: 26, slug: "luxury-space", name: "Luxury Space Vacation Homes Rental" },
  { file: "rocks-n-logs.svg", slug: "rocks-n-logs", name: "Rocks & Logs", mode: "transparent" },
  { file: 6, slug: "shahid-nawaz", name: "Shahid Nawaz" },
  { file: 29, slug: "maktek", name: "Maktek" },
  { file: 13, slug: "spaceflip", name: "SpaceFlip" },
  { file: 16, slug: "spendwise", name: "Spendwise" },
  { file: 17, slug: "lumasleep", name: "LumaSleep" },
  { file: 18, slug: "9zero", name: "9Zero" },
  { file: 25, slug: "nalk-solutions", name: "NALK Solutions" },
  { file: 22, slug: "one10", name: "One10" },
  { file: 7, slug: "aroma-dream", name: "Aroma Dream" },
  { file: 30, slug: "fragrance-chapter", name: "Fragrance Chapter" },
  { file: 34, slug: "gumus-by-aneela", name: "Gümüş by Aneela's" },
  { file: 23, slug: "paasand", name: "Paasand" },
  { file: 21, slug: "babar-hayat", name: "Babar Hayat" },
  { file: 35, slug: "najmat-al-insaf", name: "Najmat Al Insaf", mode: "light-on-grey" },
];

/** Carbon, for recoloured marks. */
const CARBON = [0x25, 0x25, 0x25];

/**
 * Un-mix a white ground: each pixel is treated as colour C composited over white
 * at alpha a, solved for the smallest a that keeps C in range. Anti-aliased edges
 * come out as true partial alpha instead of a pale fringe.
 */
function unmixWhite(data) {
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i], g = data[i + 1], b = data[i + 2];
    const a = Math.max(255 - r, 255 - g, 255 - b) / 255;
    if (a <= 0.02) {
      data[i + 3] = 0;
      continue;
    }
    data[i] = Math.round((r - 255 * (1 - a)) / a);
    data[i + 1] = Math.round((g - 255 * (1 - a)) / a);
    data[i + 2] = Math.round((b - 255 * (1 - a)) / a);
    data[i + 3] = Math.round(a * 255);
  }
}

/** White mark on a flat light-grey ground → Carbon mark on transparent. */
function liftLightOnGrey(data) {
  const bg = (data[0] + data[1] + data[2]) / 3;
  const range = 255 - bg;
  for (let i = 0; i < data.length; i += 4) {
    const l = (data[i] + data[i + 1] + data[i + 2]) / 3;
    const a = Math.min(1, Math.max(0, (l - bg - 1.5) / (range - 1.5)));
    data[i] = CARBON[0];
    data[i + 1] = CARBON[1];
    data[i + 2] = CARBON[2];
    data[i + 3] = Math.round(a * 255);
  }
}

await mkdir(OUT, { recursive: true });
const manifest = [];

for (const logo of LOGOS) {
  const path = typeof logo.file === "number" ? `${SRC}/${logo.file}.png` : `${SRC}/${logo.file}`;
  // SVGs rasterise at their tiny native size by default; render them large enough to downscale.
  const input = path.endsWith(".svg") ? sharp(path, { density: 1200 }) : sharp(path);
  const { data, info } = await input.ensureAlpha().raw().toBuffer({ resolveWithObject: true });

  if (logo.mode === "light-on-grey") liftLightOnGrey(data);
  else if (logo.mode === "white-on-transparent") {
    for (let i = 0; i < data.length; i += 4) {
      data[i] = CARBON[0];
      data[i + 1] = CARBON[1];
      data[i + 2] = CARBON[2];
    }
  } else if (logo.mode !== "transparent") unmixWhite(data);

  const trimmed = await sharp(data, { raw: { width: info.width, height: info.height, channels: 4 } })
    .png()
    .toBuffer()
    .then((buf) => sharp(buf).trim({ threshold: 1 }).png().toBuffer());

  const out = `${OUT}/${logo.slug}.webp`;
  const result = await sharp(trimmed)
    .resize(MAX_W, MAX_H, { fit: "inside", withoutEnlargement: true })
    .webp({ quality: 90, alphaQuality: 100, effort: 6 })
    .toFile(out);

  manifest.push({
    slug: logo.slug,
    name: logo.name,
    src: `/images/clients/${logo.slug}.webp`,
    width: result.width,
    height: result.height,
  });
  console.log(`${path.slice(SRC.length + 1)} → ${out} (${result.width}×${result.height}, ${Math.round(result.size / 1024)}KB)`);
}

await writeFile(MANIFEST, JSON.stringify(manifest, null, 2) + "\n");
console.log(`\n${manifest.length} logos → ${MANIFEST}`);
