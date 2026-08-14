/* eslint-disable @next/next/no-img-element, jsx-a11y/alt-text --
 * This JSX is Satori's renderer (via `ImageResponse`), not the DOM: it
 * rasterizes to a bitmap rather than rendering real, accessible HTML, so
 * `next/image` doesn't work inside it and an `alt` prop has nothing to
 * attach to. The real accessible text is the route's own `export const alt`,
 * set per page in each `opengraph-image.tsx`. */
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import sharp from "sharp";
import { site } from "@/lib/site";

/**
 * Shared social-preview image generator.
 *
 * Every route's `opengraph-image.tsx` calls one of the two builders below
 * rather than hand-rolling Satori JSX per page — so every card shares one
 * source of truth for size, palette and the wordmark treatment, and a page
 * only ever supplies its own title/photo. Twitter reuses the same file: Next
 * auto-fills `twitter:image` from `openGraph.images` when a page doesn't set
 * its own `twitter.images` (see each route's `generateMetadata`), so there is
 * no separate `twitter-image.tsx` to keep in sync.
 *
 * Static routes (Home, About, Contact, Services, every service and article
 * page — everything but the searchParams-driven Insights listing) render
 * these once at build time, so the Google Fonts fetch below runs at build
 * time for them, not on every crawler hit.
 */

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/jpeg";

/**
 * `ImageResponse` (Satori/resvg under the hood) only ever outputs PNG —
 * there's no format option. PNG is lossless, so a full-bleed photograph
 * comes back well over 1MB even at this card's fixed 1200×630. `sharp` is
 * already a project dependency for `check:images`/`brand:assets`; reusing it
 * here to re-encode the rendered PNG as JPEG cuts every card to a few
 * hundred KB with no visible quality loss, which is what "optimized for
 * social sharing" actually requires — every platform's crawler fetches this
 * synchronously before it can show a preview, so the file size is latency a
 * sharer feels, not a background concern.
 */
async function toJpegResponse(image: ImageResponse): Promise<Response> {
  const pngBuffer = Buffer.from(await image.arrayBuffer());
  const jpegBuffer = await sharp(pngBuffer).jpeg({ quality: 85, mozjpeg: true }).toBuffer();
  return new Response(new Uint8Array(jpegBuffer), {
    headers: {
      "content-type": ogContentType,
      "cache-control":
        process.env.NODE_ENV === "development"
          ? "no-cache, no-store"
          : "public, max-age=0, must-revalidate",
    },
  });
}

const CORMORANT_CHARS =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789 —–.,&:'’\"?!/";

let cormorantRegular: Promise<ArrayBuffer> | null = null;
let cormorantMedium: Promise<ArrayBuffer> | null = null;

/**
 * Google's CSS2 endpoint returns a stylesheet with a single `src: url(...)`
 * pointing at the actual font file for the requested weight — fetch that
 * text, pull the URL out, then fetch the font bytes themselves. The `text`
 * param subsets the file to the glyphs this card can ever need, which keeps
 * the fetch small. Cached per weight so concurrent card builds in one
 * `next build` share a single request rather than one each.
 */
async function loadCormorant(weight: 400 | 500): Promise<ArrayBuffer> {
  const cache = weight === 400 ? cormorantRegular : cormorantMedium;
  if (cache) return cache;

  const promise = (async () => {
    const css = await fetch(
      `https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@${weight}&text=${encodeURIComponent(CORMORANT_CHARS)}`,
      { headers: { "User-Agent": "Mozilla/5.0" } },
    ).then((res) => res.text());
    const match = css.match(/src: url\(([^)]+)\)/);
    if (!match) {
      throw new Error(`og: could not resolve Cormorant Garamond ${weight} font URL`);
    }
    const fontRes = await fetch(match[1]);
    return fontRes.arrayBuffer();
  })();

  if (weight === 400) cormorantRegular = promise;
  else cormorantMedium = promise;
  return promise;
}

async function loadPublicImage(publicPath: string): Promise<string> {
  const bytes = await readFile(join(process.cwd(), "public", publicPath));
  const ext = publicPath.split(".").pop()?.toLowerCase();
  const mime = ext === "png" ? "image/png" : "image/jpeg";
  return `data:${mime};base64,${bytes.toString("base64")}`;
}

/** The wordmark is a black mask source (see `.wordmark` in globals.css) — fine painted straight on Porcelain, which every card variant below uses as its text/mark colour. */
async function loadWordmark(): Promise<string> {
  return loadPublicImage("/brand/wordmark.png");
}

/**
 * The Home/root card and any page that doesn't define its own
 * `opengraph-image.tsx` falls back to this one: wordmark over the tagline on
 * a flat Limestone ground, replacing the old static PNG that still quoted
 * the retired "Marketing that turns spend into revenue." line. Reads
 * `site.tagline` directly, so it can't drift out of sync with the footer and
 * hero again.
 */
export async function buildBrandOgImage() {
  const [cormorant, wordmark] = await Promise.all([
    loadCormorant(400),
    loadWordmark(),
  ]);

  const image = new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#D6CEC2",
        }}
      >
        <img src={wordmark} width={440} height={81} style={{ objectFit: "contain" }} />
        <div
          style={{
            marginTop: 40,
            width: 60,
            height: 1,
            background: "#ABBFC7",
          }}
        />
        <div
          style={{
            marginTop: 40,
            display: "flex",
            fontFamily: "Cormorant Garamond",
            fontSize: 34,
            color: "#6F6D69",
          }}
        >
          {site.tagline}
        </div>
      </div>
    ),
    { ...ogSize, fonts: [{ name: "Cormorant Garamond", data: cormorant, style: "normal", weight: 400 }] },
  );
  return toJpegResponse(image);
}

/**
 * The page-photograph card: a page's own real photography full-bleed, the
 * same dark bottom-left gradient treatment `Hero` (`components/ui.tsx`) uses
 * on the live banner, wordmark top-left, eyebrow + title bottom-left. Used
 * for every inner page and article so each share preview shows what that
 * page is actually about rather than one generic brand card.
 */
export async function buildPageOgImage({
  photo,
  eyebrow,
  title,
}: {
  /** Public-relative path, e.g. "/images/book/about-frames.jpg". */
  photo: string;
  eyebrow: string;
  title: string;
}) {
  const [cormorantMedium, wordmark, photoDataUri] = await Promise.all([
    loadCormorant(500),
    loadWordmark(),
    loadPublicImage(photo),
  ]);

  const image = new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          background: "#252525",
        }}
      >
        <img
          src={photoDataUri}
          width={ogSize.width}
          height={ogSize.height}
          style={{ objectFit: "cover", position: "absolute", inset: 0 }}
        />
        {/* Two stacked linear gradients approximate the radial-ish scrim
            `Hero` gets from its two CSS gradients — Satori supports only
            `linear-gradient`, not the arbitrary layering CSS allows. */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to top, rgba(37,37,37,0.92) 0%, rgba(37,37,37,0.2) 62%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to right, rgba(37,37,37,0.78) 0%, rgba(37,37,37,0) 55%)",
          }}
        />
        <img
          src={wordmark}
          width={170}
          height={31}
          style={{
            position: "absolute",
            left: 64,
            top: 56,
            objectFit: "contain",
            filter: "invert(1) brightness(2)",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: 64,
            bottom: 64,
            display: "flex",
            flexDirection: "column",
            maxWidth: 980,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              fontSize: 20,
              letterSpacing: 6,
              textTransform: "uppercase",
              color: "rgba(241,238,231,0.85)",
              marginBottom: 20,
            }}
          >
            <div style={{ display: "flex", width: 32, height: 1, background: "#ABBFC7", marginRight: 14 }} />
            {eyebrow}
          </div>
          <div
            style={{
              display: "flex",
              fontFamily: "Cormorant Garamond",
              fontWeight: 500,
              fontSize: 58,
              lineHeight: 1.15,
              color: "#F1EEE7",
            }}
          >
            {title}
          </div>
        </div>
      </div>
    ),
    {
      ...ogSize,
      fonts: [
        { name: "Cormorant Garamond", data: cormorantMedium, style: "normal", weight: 500 },
      ],
    },
  );
  return toJpegResponse(image);
}
