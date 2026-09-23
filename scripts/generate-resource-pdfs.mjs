// Hand-rolled, dependency-free PDF writer for the two Step 7 downloads.
//
// No PDF library exists in package.json and this pass's brief explicitly
// rules out new libraries for anything touching the page's visual system —
// a build-time text PDF is simple enough (one content stream per page,
// Helvetica, left-aligned text) to write directly against the PDF 1.4 spec
// rather than add a dependency for it.
//
// Content in both PDFs is drawn only from facts already live and vetted
// elsewhere in this repo (`lib/site.ts`'s `services`, `industries` and
// `workWall`) or from Shario's own documented service methodology — nothing
// here is invented client history or a fabricated statistic.

import { mkdirSync, writeFileSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");

const PAGE_WIDTH = 595.28; // A4 pt
const PAGE_HEIGHT = 841.89;
const MARGIN = 56;
const TEXT_WIDTH = PAGE_WIDTH - MARGIN * 2;

/** Rough average glyph width for Helvetica as a fraction of font size — good enough for wrapping body text, not for exact typesetting. */
const AVG_CHAR_WIDTH = 0.52;

function wrap(text, fontSize) {
  const maxChars = Math.floor(TEXT_WIDTH / (fontSize * AVG_CHAR_WIDTH));
  const words = text.split(/\s+/);
  const lines = [];
  let line = "";
  for (const word of words) {
    const candidate = line ? `${line} ${word}` : word;
    if (candidate.length > maxChars && line) {
      lines.push(line);
      line = word;
    } else {
      line = candidate;
    }
  }
  if (line) lines.push(line);
  return lines;
}

/**
 * Standard PDF text strings (no font encoding declared, so it defaults to
 * StandardEncoding) only cover Latin-1 — typographic punctuation like em
 * dashes and curly quotes falls outside that range and `Buffer.from(...,
 * "latin1")` silently mangles it into control-byte garbage. Normalize to
 * plain ASCII before it ever reaches the content stream.
 */
function toAscii(text) {
  return text
    .replace(/[–—]/g, "-")
    .replace(/[‘’]/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/…/g, "...");
}

function escapePdfText(text) {
  return toAscii(text).replace(/\\/g, "\\\\").replace(/\(/g, "\\(").replace(/\)/g, "\\)");
}

/**
 * Builds a multi-page PDF from a flat list of typed blocks:
 * `{ type: "title" | "h2" | "p" | "li", text }`.
 */
function buildPdf(blocks) {
  const sizes = { title: 20, h2: 13, p: 10.5, li: 10.5 };
  const leading = { title: 26, h2: 20, p: 15, li: 15 };
  const spaceBefore = { title: 0, h2: 22, p: 6, li: 2 };

  const pages = [];
  let currentLines = [];
  let y = PAGE_HEIGHT - MARGIN;

  function newPage() {
    if (currentLines.length) pages.push(currentLines);
    currentLines = [];
    y = PAGE_HEIGHT - MARGIN;
  }

  for (const block of blocks) {
    const size = sizes[block.type];
    const lh = leading[block.type];
    y -= spaceBefore[block.type];
    const prefix = block.type === "li" ? "-  " : "";
    const indent = block.type === "li" ? 14 : 0;
    const wrapWidth = block.type === "li" ? TEXT_WIDTH - indent : TEXT_WIDTH;
    const maxChars = Math.floor(wrapWidth / (size * AVG_CHAR_WIDTH));
    const words = (prefix + block.text).split(/\s+/);
    let line = "";
    const wrapped = [];
    for (const word of words) {
      const candidate = line ? `${line} ${word}` : word;
      if (candidate.length > maxChars && line) {
        wrapped.push(line);
        line = word;
      } else {
        line = candidate;
      }
    }
    if (line) wrapped.push(line);

    for (const [i, text] of wrapped.entries()) {
      if (y < MARGIN + lh) newPage();
      currentLines.push({ text, size, x: MARGIN + (i === 0 ? 0 : indent), y });
      y -= lh;
    }
  }
  newPage();

  // --- Assemble the PDF object graph ---
  const objects = [];
  const fontObjNum = 1;
  objects[fontObjNum] =
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>";

  const pageObjNums = [];
  const contentObjNums = [];
  let nextObj = 2;

  for (const lines of pages) {
    let stream = "BT\n";
    for (const l of lines) {
      stream += `/F1 ${l.size} Tf\n${l.x.toFixed(2)} ${l.y.toFixed(2)} Td\n(${escapePdfText(l.text)}) Tj\n0 -0 Td\n`;
    }
    stream += "ET";
    // Reset Td accumulation isn't needed since we set absolute Td each time via BT..ET per line — simplify by using Td as absolute move via re-entering BT per line instead.
    stream = "";
    for (const l of lines) {
      stream += `BT\n/F1 ${l.size} Tf\n${l.x.toFixed(2)} ${l.y.toFixed(2)} Td\n(${escapePdfText(l.text)}) Tj\nET\n`;
    }
    const contentObjNum = nextObj++;
    objects[contentObjNum] = `<< /Length ${Buffer.byteLength(stream)} >>\nstream\n${stream}endstream`;
    contentObjNums.push(contentObjNum);
  }

  const pagesObjNum = nextObj++;
  for (const contentObjNum of contentObjNums) {
    const pageObjNum = nextObj++;
    objects[pageObjNum] = `<< /Type /Page /Parent ${pagesObjNum} 0 R /Resources << /Font << /F1 ${fontObjNum} 0 R >> >> /MediaBox [0 0 ${PAGE_WIDTH} ${PAGE_HEIGHT}] /Contents ${contentObjNum} 0 R >>`;
    pageObjNums.push(pageObjNum);
  }

  objects[pagesObjNum] = `<< /Type /Pages /Kids [${pageObjNums.map((n) => `${n} 0 R`).join(" ")}] /Count ${pageObjNums.length} >>`;

  const catalogObjNum = nextObj++;
  objects[catalogObjNum] = `<< /Type /Catalog /Pages ${pagesObjNum} 0 R >>`;

  // --- Serialize ---
  let pdf = "%PDF-1.4\n";
  const offsets = [0];
  for (let i = 1; i < nextObj; i++) {
    offsets[i] = Buffer.byteLength(pdf, "latin1");
    pdf += `${i} 0 obj\n${objects[i]}\nendobj\n`;
  }
  const xrefStart = Buffer.byteLength(pdf, "latin1");
  pdf += `xref\n0 ${nextObj}\n0000000000 65535 f \n`;
  for (let i = 1; i < nextObj; i++) {
    pdf += `${String(offsets[i]).padStart(10, "0")} 00000 n \n`;
  }
  pdf += `trailer\n<< /Size ${nextObj} /Root ${catalogObjNum} 0 R >>\nstartxref\n${xrefStart}\n%%EOF`;

  return Buffer.from(pdf, "latin1");
}

function b(type, text) {
  return { type, text };
}

/* -------------------------------------------------------------------------- */
/* Resource 1 — The 15-Point Pre-Engagement Audit                             */
/* -------------------------------------------------------------------------- */

const auditBlocks = [
  b("title", "The 15-Point Pre-Engagement Audit"),
  b("p", "Shario — the checklist we run on every website, ad account and CRM before we quote. Run it yourself — you'll know what's broken whether or not you hire us."),

  b("h2", "Website & technical"),
  b("li", "Site loads in under 3 seconds on mobile and passes Core Web Vitals."),
  b("li", "An XML sitemap exists, is submitted, and is current in Google Search Console."),
  b("li", "No orphaned pages, broken internal links, or multi-hop redirect chains."),
  b("li", "SSL is valid and HTTPS is enforced site-wide, with no mixed-content warnings."),
  b("li", "Every page has a unique title tag and meta description — none duplicated or missing."),

  b("h2", "SEO"),
  b("li", "Each primary keyword is mapped to one canonical page — no keyword cannibalisation."),
  b("li", "Structured data (schema.org) is present on key pages and validates cleanly."),
  b("li", "robots.txt and meta-robots tags are reviewed for anything accidentally blocked from indexing."),
  b("li", "The backlink profile is checked for toxic or spammy referring domains."),

  b("h2", "Paid media & ad accounts"),
  b("li", "Conversion tracking fires correctly on every key action — lead form, call click, WhatsApp click."),
  b("li", "No campaigns are structured to compete against each other in the same auction."),
  b("li", "Budget is reviewed against cost per qualified lead, not cost per click alone."),

  b("h2", "CRM & attribution"),
  b("li", "Every lead source is tagged and attributed back to its originating channel in the CRM."),
  b("li", "Lead response time is measured from first enquiry to first contact."),
  b("li", "Monthly reporting is tied to revenue or qualified pipeline, not vanity metrics."),

  b("p", "Shario is a founder-led digital marketing agency in Dubai — shario.ae"),
];

/* -------------------------------------------------------------------------- */
/* Resource 2 — Shario Company Profile                                        */
/* -------------------------------------------------------------------------- */

const services = [
  ["Digital Marketing", "Digital advertising across Google and Meta, engineered for qualified leads at below-target cost per lead."],
  ["SEO (Search Engine Optimization)", "Technical SEO, on-page optimisation and content built to rank in Dubai search and win AI-driven results."],
  ["Website Development", "High-converting websites with SEO-ready architecture, custom landing pages and CRM-integrated funnels."],
  ["CRM & Marketing Automation", "Attribution tracking and marketing automation that tie every dirham of spend to pipeline and closed revenue."],
  ["Branding", "Brand strategy, identity systems, campaign visuals and creative produced to a launch standard."],
  ["Marketing Consulting", "Go-to-market strategy, marketing audits and channel planning that turn a fragmented budget into one coherent plan."],
];

const sectors = [
  "Real Estate & Property", "Hospitality", "Aesthetic & Wellness", "Healthcare",
  "E-commerce & Retail", "Fashion & Luxury", "Technology & SaaS",
  "Restaurants & F&B", "Professional Services", "Education",
];

const selectedWork = [
  ["MSN Developments (msndevelopments.com)", "Brand system, website and SEO architecture for off-plan launches."],
  ["M Shahid Nawaz (mshahidnawaz.com)", "Institutional positioning and thought-leadership platform."],
  ["Earthlink Premium Holiday Homes (earthlinkholidayhomes.com)", "Property management site with booking and enquiry flow."],
  ["First Key International (firstkeyint.com)", "Brokerage platform built for buyer lead capture."],
  ["Shanti Kiaans (shantikiaans.com)", "Luxury property brand, website and social system."],
  ["Gumus by Aneelas (gumusbyaneelas.com)", "E-commerce build for an imported Turkish jewellery brand."],
  ["Spendwise (getspendwise.co)", "Product site and go-to-market for an expense-tracking app."],
  ["MakTek (maktek.co)", "B2B product platform and positioning."],
  ["Fragrance Chapter (fragrancechapter.com)", "Shopify store — on-page SEO from a standing start."],
];

const profileBlocks = [
  b("title", "Shario — Company Profile"),
  b("p", "A founder-led digital marketing agency in Dubai, running paid media, SEO, websites and CRM as one connected system. shario.ae — 2026."),

  b("h2", "Approach"),
  b("p", "Every engagement is shaped by the same senior judgment, planned as one connected system rather than isolated channels, and reviewed against pipeline and revenue rather than impressions or reach."),

  b("h2", "Services"),
  ...services.flatMap(([name, desc]) => [b("li", `${name} — ${desc}`)]),

  b("h2", "Sectors"),
  b("p", sectors.join(" · ")),

  b("h2", "Selected work"),
  ...selectedWork.flatMap(([name, desc]) => [b("li", `${name} — ${desc}`)]),

  b("p", "Shario — A Symphony of Identity. info@shario.ae · +971 50 467 9095"),
];

/* -------------------------------------------------------------------------- */

const resourcesDir = join(root, "public", "resources");
mkdirSync(resourcesDir, { recursive: true });

const auditPath = join(resourcesDir, "pre-engagement-audit.pdf");
writeFileSync(auditPath, buildPdf(auditBlocks));

const profilePath = join(root, "public", "shario-company-profile.pdf");
writeFileSync(profilePath, buildPdf(profileBlocks));

for (const p of [auditPath, profilePath]) {
  const kb = (statSync(p).size / 1024).toFixed(0);
  console.log(`${p} — ${kb} KB`);
}
