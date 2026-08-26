import type { Metadata } from "next";
import { SixServices } from "@/components/six-services";
import { CtaBand, Hero, PillLink } from "@/components/ui";
import { cta, heroImages, ogDefaultsAr } from "@/lib/site";

const descriptionAr =
  "شاريو وكالة تسويق رقمي واستوديو إبداعي في دبي، تقدم تحسين محركات البحث، وتطوير المواقع الإلكترونية، والعلامة التجارية، وإدارة علاقات العملاء وأتمتة التسويق، والاستشارات التسويقية. استعينوا بخدمة واحدة أو بالقمع الكامل.";

const HERO_IMAGE = heroImages.services.src;
const HERO_IMAGE_ALT =
  "لوحة مؤطرة لامرأة ترتدي قبعة عريضة الحواف وفستاناً كريمياً مطوياً، مستندة إلى قماش أحمر داكن في غرفة مشمسة ذات ألواح خشبية";

export const metadata: Metadata = {
  title: "وكالة تسويق رقمي في دبي — خدماتنا",
  description: descriptionAr,
  alternates: {
    canonical: "/ar/services",
    languages: { en: "/services", ar: "/ar/services", ru: "/ru/services", "x-default": "/services" },
  },
  openGraph: {
    ...ogDefaultsAr,
    url: "/ar/services",
    type: "website",
    title: "شاريو — وكالة تسويق رقمي في دبي، خدماتنا",
    description: descriptionAr,
  },
};

export default function ArabicServicesPage() {
  return (
    <>
      <h1 className="sr-only">وكالة تسويق رقمي في دبي — خدماتنا</h1>
      <Hero
        src={HERO_IMAGE}
        alt={HERO_IMAGE_ALT}
        focus="object-[48%_30%]"
        eyebrow="الخدمات"
        priority
      />

      <SixServices locale="ar" />

      <CtaBand
        title="لنتواصل."
        sub="خمس عشرة دقيقة حول أين يمكن لتسويقكم كسب المزيد من الإيرادات، وكيف ستحقق شاريو ذلك."
        arabicAccent
      >
        <PillLink href={cta.href} tone="solid" size="lg">
          {cta.labelAr}
        </PillLink>
      </CtaBand>
    </>
  );
}
