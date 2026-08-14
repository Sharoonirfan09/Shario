import { buildPageOgImage, ogContentType, ogSize } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;
export const alt =
  "A woman in a wide-brimmed hat walking past a stone colonnade, in black and white";

/**
 * One card for the whole listing, not per `?category=` — `generateMetadata`
 * on the page itself already gives each category its own title/description/
 * canonical; a category-specific photo would need artwork this section
 * doesn't have per category, so every variant shares the banner photo.
 */
export default async function Image() {
  return buildPageOgImage({
    photo: "/images/insights/insights-banner-editorial-walk.jpg",
    eyebrow: "Insights",
    title: "Ideas that move marketing forward.",
  });
}
