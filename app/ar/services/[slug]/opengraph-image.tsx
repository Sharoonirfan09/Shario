import { buildPageOgImage, ogContentType, ogSize } from "@/lib/og";
import { getService, heroImages, services, site } from "@/lib/site";

export const size = ogSize;
export const contentType = ogContentType;

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateImageMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getService(slug);
  return service ? [{ id: 0, alt: `${service.nameAr} — ${site.name}`, contentType: ogContentType }] : [];
}

/** Same rendered card as the matching English service page's — reused as-is (Cormorant Garamond can't set Arabic glyphs). */
export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return buildPageOgImage({ photo: heroImages.services.src, eyebrow: "Services", title: "Services" });

  return buildPageOgImage({
    photo: service.heroImage,
    eyebrow: service.category,
    title: service.name,
  });
}
