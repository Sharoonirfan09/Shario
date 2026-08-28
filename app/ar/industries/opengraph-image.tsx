import { buildPageOgImage, ogContentType, ogSize } from "@/lib/og";
import { heroImages } from "@/lib/site";

/** Same rendered card as the English Industries page's — reused as-is (the OG font is subsetted to Latin glyphs, see `lib/og.tsx`); only this route's `title`/`description`/`url` are Arabic. */
export const size = ogSize;
export const contentType = ogContentType;
export const alt =
  "منظر علوي لفريق عمل يستخدم أجهزة لابتوب وجهاز لوحي وتقارير مطبوعة مليئة بالرسوم البيانية، على مكتب أبيض مشترك";

export default async function Image() {
  return buildPageOgImage({
    photo: heroImages.industries.src,
    eyebrow: "Industries",
    title: "Industries We Work With",
  });
}
