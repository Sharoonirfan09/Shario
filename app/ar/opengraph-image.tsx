import { buildHomeOgImage, ogContentType, ogSize } from "@/lib/og";

/**
 * Same rendered card as the English homepage's — Satori/Cormorant Garamond
 * can't set Arabic glyphs, so the shared image is reused as-is here; only
 * this route's own `title`/`description`/`url` (in `page.tsx`) are Arabic.
 */
export const size = ogSize;
export const contentType = ogContentType;
export const alt = "شاريو — وكالة تسويق رقمي في دبي. سيمفونية الهوية.";

export default async function Image() {
  return buildHomeOgImage();
}
