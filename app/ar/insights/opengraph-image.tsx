import { buildPageOgImage, ogContentType, ogSize } from "@/lib/og";
import { heroImages } from "@/lib/site";

/** One card for the whole listing, matching the English route's — see that file's own note on why every `?category=` variant shares it. */
export const size = ogSize;
export const contentType = ogContentType;
export const alt =
  "امرأة ترتدي معطفاً بيج وتضع نظارة شمسية، تقف أمام جدار حجري مشمس تتقاطع عليه ظلال حادة";

export default async function Image() {
  return buildPageOgImage({
    photo: heroImages.insights.src,
    eyebrow: "Insights",
    title: "Ideas that move marketing forward.",
  });
}
