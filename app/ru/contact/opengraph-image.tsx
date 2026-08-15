import { buildPageOgImage, ogContentType, ogSize } from "@/lib/og";
import { heroImages, site } from "@/lib/site";

/** Same rendered card as the English Contact page's — reused as-is; only this route's `title`/`description`/`url` are Russian. */
export const size = ogSize;
export const contentType = ogContentType;
export const alt = "Стена из травертина, освещённая тёплым, косым дневным светом";

export default async function Image() {
  return buildPageOgImage({
    photo: heroImages.contact.src,
    eyebrow: "Contact",
    title: `Contact ${site.name}`,
  });
}
