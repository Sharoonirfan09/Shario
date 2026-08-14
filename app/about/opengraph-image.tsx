import { buildPageOgImage, ogContentType, ogSize } from "@/lib/og";
import { site } from "@/lib/site";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "Framed prints and objects arranged on a warm, minimal wall";

export default async function Image() {
  return buildPageOgImage({
    photo: "/images/book/about-frames.jpg",
    eyebrow: "About",
    title: `About ${site.name}`,
  });
}
