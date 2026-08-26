import { buildHomeOgImage, ogContentType, ogSize } from "@/lib/og";

/**
 * Same rendered card as the English homepage's. `buildHomeOgImage` fetches
 * Cormorant Garamond/EB Garamond subsetted to Latin glyphs only (see
 * `CORMORANT_CHARS`/`EB_GARAMOND_CHARS` in `lib/og.tsx`), so Cyrillic text
 * wouldn't render even though the family itself ships a Cyrillic cut — the
 * same reason the Arabic `/ar` route reuses this card rather than rendering
 * its own text. Only this route's own `title`/`description`/`url` (in
 * `page.tsx`) are Russian.
 */
export const size = ogSize;
export const contentType = ogContentType;
export const alt = "SHARIO — агентство цифрового маркетинга в Дубае. Симфония идентичности.";

export default async function Image() {
  return buildHomeOgImage();
}
