/**
 * One-time prep for the client-supplied Insights imagery: crop each source
 * frame to 4:3 (the ratio every Insights card and the homepage's Insights
 * band already use), holding the described focal point, and export as an
 * optimised, SEO-named JPG. `position` (or an explicit `extract` box) is
 * chosen per source to keep the subject in frame and, on the chess source,
 * to crop out a subtitle-fragment baked into the corner of that frame.
 *
 * Three of the seventeen supplied sources are not used at all: one is a
 * dense page of unrelated body-copy text, one is a poster whose entire
 * subject is a third-party brand name, one is stationery whose entire
 * subject is a repeated third-party wordmark — none can be cropped around
 * without losing the shot, so they're left out rather than risking
 * reproducing someone else's trademark/copy on a client site.
 *
 * Run with: node scripts/process-insights-images.mjs <source-dir>
 */
import sharp from "sharp";
import { mkdir } from "node:fs/promises";

const SRC = process.argv[2];
if (!SRC) {
  console.error("Usage: node scripts/process-insights-images.mjs <source-dir>");
  process.exit(1);
}
const OUT = "public/images/insights";
await mkdir(OUT, { recursive: true });

const jobs = [
  ["16.png", "insights-banner-editorial-walk.jpg", { position: "centre" }],
  ["6.png", "strategy-consulting-chess-board.jpg", { extract: { left: 0, top: 0, width: 1920, height: 900 } }],
  ["5.png", "dubai-ad-auctions-clock-detail.jpg", { position: "left" }],
  ["9.png", "rising-ad-costs-budget-watch.jpg", { position: "centre" }],
  ["10.png", "real-cost-slow-website-door-handle.jpg", { position: "centre" }],
  ["11.png", "crm-rollouts-fail-paintbrushes.jpg", { position: "left" }],
  ["12.png", "ai-search-ranking-gallery-wall.jpg", { position: "centre" }],
  ["8.png", "leads-to-pipeline-travel-notebook.jpg", { position: "right" }],
  ["14.png", "briefing-performance-agency-photo-stack.jpg", { position: "centre" }],
  ["1.png", "real-estate-case-study-ornate-ceiling.jpg", { position: "centre" }],
  ["3.png", "hospitality-case-study-bouquet-portrait.jpg", { position: "centre" }],
  ["2.png", "b2b-case-study-poppy-portrait.jpg", { position: "centre" }],
];

for (const [src, out, crop] of jobs) {
  let pipeline = sharp(`${SRC}/${src}`);
  pipeline = crop.extract
    ? pipeline.extract(crop.extract)
    : pipeline;
  await pipeline
    .resize({ width: 1600, height: 1200, fit: "cover", position: crop.position ?? "centre" })
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(`${OUT}/${out}`);
  console.log(out);
}
