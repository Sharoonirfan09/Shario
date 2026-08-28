import { buildPageOgImage, ogContentType, ogSize } from "@/lib/og";
import { heroImages } from "@/lib/site";

/** Same rendered card as the English Industries page's — reused as-is; only this route's `title`/`description`/`url` are Russian. */
export const size = ogSize;
export const contentType = ogContentType;
export const alt =
  "Вид сверху на команду за ноутбуками, планшетом и распечатанными отчётами с графиками на общем белом столе";

export default async function Image() {
  return buildPageOgImage({
    photo: heroImages.industries.src,
    eyebrow: "Industries",
    title: "Industries We Work With",
  });
}
