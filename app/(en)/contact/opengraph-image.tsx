import { buildPageOgImage, ogContentType, ogSize } from "@/lib/og";
import { site } from "@/lib/site";
import { HERO_IMAGE, HERO_IMAGE_ALT } from "./page";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = HERO_IMAGE_ALT;

export default async function Image() {
  return buildPageOgImage({
    photo: HERO_IMAGE,
    eyebrow: "Contact",
    title: `Contact ${site.name}`,
  });
}
