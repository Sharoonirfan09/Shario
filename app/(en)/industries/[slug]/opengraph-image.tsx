import { buildPageOgImage, ogContentType, ogSize } from "@/lib/og";
import { getIndustry, industries, site } from "@/lib/site";
import { HERO_IMAGE } from "../page";

export const size = ogSize;
export const contentType = ogContentType;

export function generateStaticParams() {
  return industries.map((industry) => ({ slug: industry.slug }));
}

export async function generateImageMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const industry = getIndustry(slug);
  return industry ? [{ id: 0, alt: `${industry.name} — ${site.name}` }] : [];
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const industry = getIndustry(slug);
  if (!industry) return buildPageOgImage({ photo: HERO_IMAGE, eyebrow: "Industries", title: "Industries" });

  return buildPageOgImage({
    photo: industry.heroImage,
    eyebrow: "Industries",
    title: industry.name,
  });
}
