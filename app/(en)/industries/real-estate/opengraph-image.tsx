import { buildPageOgImage, ogContentType, ogSize } from "@/lib/og";
import { getIndustry, site } from "@/lib/site";
import { realEstateImages } from "@/components/industries/real-estate/images";

/**
 * Mirrors `../[slug]/opengraph-image.tsx`, hardcoded to this one slug.
 *
 * Needed because this route is now a literal sibling of `[slug]`, not a
 * value it resolves to — Next matches metadata routes (like this one)
 * against the same literal-vs-dynamic tree as `page.tsx`, so without this
 * file `/industries/real-estate` would carry no dedicated OG image at all
 * rather than silently falling back to the dynamic route's version.
 */
export const size = ogSize;
export const contentType = ogContentType;

export async function generateImageMetadata() {
  const industry = getIndustry("real-estate");
  return industry
    ? [{ id: 0, alt: `${industry.name} — ${site.name}`, contentType: ogContentType }]
    : [];
}

export default function Image() {
  const industry = getIndustry("real-estate");
  return buildPageOgImage({
    photo: realEstateImages.hero,
    eyebrow: "Industries",
    title: industry?.name ?? "Real Estate & Property",
  });
}
