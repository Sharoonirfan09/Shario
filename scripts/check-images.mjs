/**
 * Guards two rules the image library has to keep:
 *
 *  1. No photograph is used in more than one place. The library is small and a
 *     repeat reads as a mistake, not a motif.
 *  2. No two files are the same photograph under different names. `public/images`
 *     once held five exports that duplicated `public/images/book` originals,
 *     which is how the site ended up showing the same plinth on two pages.
 *
 * Run with `npm run check:images`.
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import sharp from "sharp";

const ROOT = process.cwd();
const posix = (p) => relative(ROOT, p).split("\\").join("/");

function walk(dir) {
  return readdirSync(dir).flatMap((entry) => {
    const full = join(dir, entry);
    return statSync(full).isDirectory() ? walk(full) : [full];
  });
}

/** Average hash — tolerant of re-encoding and crop-free re-exports. */
async function ahash(file) {
  const buf = await sharp(file)
    .greyscale()
    .resize(16, 16, { fit: "fill" })
    .raw()
    .toBuffer();
  const avg = buf.reduce((a, c) => a + c, 0) / buf.length;
  return Array.from(buf, (v) => (v > avg ? "1" : "0")).join("");
}

function hamming(a, b) {
  let d = 0;
  for (let i = 0; i < a.length; i++) if (a[i] !== b[i]) d++;
  return d;
}

const problems = [];

// --- rule 1: every reference is used exactly once ---
const sources = [
  ...walk(join(ROOT, "app")),
  ...walk(join(ROOT, "lib")),
  ...walk(join(ROOT, "components")),
].filter((f) => /\.(tsx?|mjs)$/.test(f));

const uses = new Map();
for (const file of sources) {
  const text = readFileSync(file, "utf8");
  for (const [, path] of text.matchAll(/"(\/images\/[^"]+)"/g)) {
    uses.set(path, [...(uses.get(path) ?? []), posix(file)]);
  }
}
for (const [path, where] of uses) {
  if (where.length > 1) {
    problems.push(
      `reused ${where.length}x  ${path}\n      ${where.join("\n      ")}`
    );
  }
}

// --- rule 2: no two files are the same photograph ---
const files = walk(join(ROOT, "public/images")).filter((f) =>
  /\.(jpe?g|png|webp)$/i.test(f)
);
const hashed = await Promise.all(
  files.map(async (f) => ({ f: posix(f), h: await ahash(f) }))
);
for (let i = 0; i < hashed.length; i++) {
  for (let j = i + 1; j < hashed.length; j++) {
    const d = hamming(hashed[i].h, hashed[j].h);
    if (d <= 12) {
      problems.push(
        `same photograph (distance ${d})  ${hashed[i].f}  ==  ${hashed[j].f}`
      );
    }
  }
}

// --- report ---
console.log(
  `${uses.size} slots referenced · ${files.length} photographs on disk · ` +
    `${files.length - uses.size} spare`
);
if (problems.length) {
  console.error(`\n${problems.length} problem(s):\n`);
  for (const p of problems) console.error("  " + p);
  process.exit(1);
}
console.log(
  "OK — every slot uses a distinct photograph, and no file duplicates another."
);
