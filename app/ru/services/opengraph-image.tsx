import { buildPageOgImage, ogContentType, ogSize } from "@/lib/og";
import { heroImages } from "@/lib/site";

/** Same rendered card as the English Services page's — reused as-is; only this route's `title`/`description`/`url` are Russian. */
export const size = ogSize;
export const contentType = ogContentType;
export const alt =
  "Оформленный в раму портрет женщины в шляпе с широкими полями и складчатом кремовом платье, облокотившейся на глубокий красный холст в солнечной комнате с деревянными панелями";

export default async function Image() {
  return buildPageOgImage({
    photo: heroImages.services.src,
    eyebrow: "Services",
    title: "Digital Marketing Agency in Dubai",
  });
}
