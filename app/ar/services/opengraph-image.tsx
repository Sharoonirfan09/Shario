import { buildPageOgImage, ogContentType, ogSize } from "@/lib/og";
import { heroImages } from "@/lib/site";

/** Same rendered card as the English Services page's — reused as-is; only this route's `title`/`description`/`url` are Arabic. */
export const size = ogSize;
export const contentType = ogContentType;
export const alt =
  "لوحة مؤطرة لامرأة ترتدي قبعة عريضة الحواف وفستاناً كريمياً مطوياً، مستندة إلى قماش أحمر داكن في غرفة مشمسة ذات ألواح خشبية";

export default async function Image() {
  return buildPageOgImage({
    photo: heroImages.services.src,
    eyebrow: "Services",
    title: "Performance Marketing Agency Services in Dubai",
  });
}
