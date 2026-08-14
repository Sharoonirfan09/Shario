import { buildPageOgImage, ogContentType, ogSize } from "@/lib/og";
import { site } from "@/lib/site";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "A travertine wall lit by warm, angled daylight";

export default async function Image() {
  return buildPageOgImage({
    photo: "/images/travertine-wall.jpg",
    eyebrow: "Contact",
    title: `Contact ${site.name}`,
  });
}
