import { buildBrandOgImage, ogContentType, ogSize } from "@/lib/og";

/**
 * Root card: the site's default share preview, and the fallback every page
 * without its own `opengraph-image.tsx` inherits (currently none — every
 * route below defines its own — but this is what a future page would get
 * before someone adds one). Replaces a static PNG that had gone stale: it
 * still quoted the retired "Marketing that turns spend into revenue." line
 * after the footer and hero moved back to `site.tagline`.
 */
export const size = ogSize;
export const contentType = ogContentType;
export const alt = "SHARIO — A Symphony of Identity";

export default async function Image() {
  return buildBrandOgImage();
}
