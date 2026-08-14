import { buildPageOgImage, ogContentType, ogSize } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "A minimal, warmly lit lounge interior";

export default async function Image() {
  return buildPageOgImage({
    photo: "/images/book/services-lounge.jpg",
    eyebrow: "Services",
    title: "Performance Marketing Agency Services in Dubai",
  });
}
