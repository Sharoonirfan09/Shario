import { buildPageOgImage, ogContentType, ogSize } from "@/lib/og";
import { heroImages, site } from "@/lib/site";

/** Same rendered card as the English About page's — reused as-is (Cormorant Garamond can't set Arabic glyphs); only this route's `title`/`description`/`url` are Arabic. */
export const size = ogSize;
export const contentType = ogContentType;
export const alt = "إطارات وقطع مرتبة على جدار دافئ وبسيط";

export default async function Image() {
  return buildPageOgImage({
    photo: heroImages.about.src,
    eyebrow: "About",
    title: `About ${site.name}`,
  });
}
