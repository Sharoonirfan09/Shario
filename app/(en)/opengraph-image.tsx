import { buildHomeOgImage, ogContentType, ogSize } from "@/lib/og";
import { HERO_IMAGE_ALT } from "./page";

/**
 * Home's card: the live `SplitHero` recreated — headline, tagline and the
 * hero photograph — via `buildHomeOgImage`, not the plain wordmark card
 * `buildBrandOgImage` used to render here. A share of the homepage should
 * look like the homepage; the wordmark-only treatment now lives at
 * `buildBrandOgImage` for any future page that wants it instead.
 */
export const size = ogSize;
export const contentType = ogContentType;
export const alt = `Shario — Digital Marketing Agency in Dubai. A Symphony of Identity. ${HERO_IMAGE_ALT}.`;

export default async function Image() {
  return buildHomeOgImage();
}
