import { buildPageOgImage, ogContentType, ogSize } from "@/lib/og";
import { getIndustry, heroImages, industries, site } from "@/lib/site";

export const size = ogSize;
export const contentType = ogContentType;

export function generateStaticParams() {
  return industries.map((industry) => ({ slug: industry.slug }));
}

export async function generateImageMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const industry = getIndustry(slug);
  return industry ? [{ id: 0, alt: `${industry.nameRu} — ${site.name}`, contentType: ogContentType }] : [];
}

/** Same rendered card as the matching English industry page's — reused as-is (the OG font is subsetted to Latin glyphs, see `lib/og.tsx`). */
export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const industry = getIndustry(slug);
  if (!industry) return buildPageOgImage({ photo: heroImages.industries.src, eyebrow: "Industries", title: "Industries" });

  return buildPageOgImage({
    photo: industry.heroImage,
    eyebrow: "Industries",
    title: industry.name,
  });
}
