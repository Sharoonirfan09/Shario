import { buildPageOgImage, ogContentType, ogSize } from "@/lib/og";
import { heroImages, site } from "@/lib/site";

/** Same rendered card as the English About page's — reused as-is (the OG font is subsetted to Latin glyphs, see `lib/og.tsx`); only this route's `title`/`description`/`url` are Russian. */
export const size = ogSize;
export const contentType = ogContentType;
export const alt = "Оформленные в рамы гравюры и предметы на тёплой, минималистичной стене";

export default async function Image() {
  return buildPageOgImage({
    photo: heroImages.about.src,
    eyebrow: "About",
    title: `About ${site.name}`,
  });
}
