import { buildPageOgImage, ogContentType, ogSize } from "@/lib/og";
import { HERO_IMAGE, HERO_IMAGE_ALT } from "./page";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = HERO_IMAGE_ALT;

/**
 * One card for the whole listing, not per `?category=` — `generateMetadata`
 * on the page itself already gives each category its own title/description/
 * canonical; a category-specific photo would need artwork this section
 * doesn't have per category, so every variant shares the banner photo.
 */
export default async function Image() {
  return buildPageOgImage({
    photo: HERO_IMAGE,
    eyebrow: "Insights",
    title: "Ideas that move marketing forward.",
  });
}
