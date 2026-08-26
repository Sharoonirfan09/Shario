import type { Metadata } from "next";
import { SixServices } from "@/components/six-services";
import { CtaBand, Hero, PillLink } from "@/components/ui";
import { cta, heroImages, ogDefaultsRu } from "@/lib/site";

const descriptionRu =
  "SHARIO — агентство цифрового маркетинга и креатива в Дубае, предоставляющее услуги SEO, веб-разработки, брендинга, CRM и маркетинговой автоматизации, а также маркетингового консалтинга. Используйте одну услугу или весь цикл целиком.";

const HERO_IMAGE = heroImages.services.src;
const HERO_IMAGE_ALT =
  "Оформленный в раму портрет женщины в шляпе с широкими полями и складчатом кремовом платье, облокотившейся на глубокий красный холст в солнечной комнате с деревянными панелями";

export const metadata: Metadata = {
  title: "Агентство цифрового маркетинга в Дубае — Наши услуги",
  description: descriptionRu,
  alternates: {
    canonical: "/ru/services",
    languages: { en: "/services", ar: "/ar/services", ru: "/ru/services", "x-default": "/services" },
  },
  openGraph: {
    ...ogDefaultsRu,
    url: "/ru/services",
    type: "website",
    title: "SHARIO — агентство цифрового маркетинга в Дубае, наши услуги",
    description: descriptionRu,
  },
};

export default function RussianServicesPage() {
  return (
    <>
      <h1 className="sr-only">Агентство цифрового маркетинга в Дубае — Наши услуги</h1>
      <Hero
        src={HERO_IMAGE}
        alt={HERO_IMAGE_ALT}
        focus="object-[48%_30%]"
        eyebrow="Услуги"
        priority
      />

      <SixServices locale="ru" />

      <CtaBand
        title="Давайте общаться."
        sub="Пятнадцать минут о том, где ваш маркетинг может приносить больше выручки, и как SHARIO этого добьётся."
        arabicAccent
      >
        <PillLink href={cta.href} tone="solid" size="lg">
          {cta.labelRu}
        </PillLink>
      </CtaBand>
    </>
  );
}
