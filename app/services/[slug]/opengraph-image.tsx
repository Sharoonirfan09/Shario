import { buildPageOgImage, ogContentType, ogSize } from "@/lib/og";
import { getService, services, site } from "@/lib/site";

export const size = ogSize;
export const contentType = ogContentType;

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateImageMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getService(slug);
  return service ? [{ id: 0, alt: `${service.name} — ${site.name}` }] : [];
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return buildPageOgImage({ photo: "/images/book/services-lounge.jpg", eyebrow: "Services", title: "Services" });

  return buildPageOgImage({
    photo: service.heroImage,
    eyebrow: service.category,
    title: service.name,
  });
}
