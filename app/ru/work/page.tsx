import type { Metadata } from "next";
import { Band, CardGrid, CtaBand, PillLink, SectionIntro, TypeHero, WorkTile } from "@/components/ui";
import { cta, ogDefaultsRu, workWall } from "@/lib/site";

const description =
  "Более двадцати сайтов спроектированы, построены, выведены в топ и сопровождаются для реального бизнеса в Дубае — недвижимость, e-commerce, гостеприимство, SaaS и B2B. Реальные работы клиентов, а не макеты.";

export const metadata: Metadata = {
  title: "Наши работы — SHARIO",
  description,
  alternates: {
    canonical: "/ru/work",
    languages: { en: "/work", ar: "/ar/work", ru: "/ru/work", "x-default": "/work" },
  },
  openGraph: {
    ...ogDefaultsRu,
    url: "/ru/work",
    type: "website",
    title: "SHARIO — Наши работы",
    description,
  },
};

export default function RussianWorkPage() {
  return (
    <>
      <TypeHero eyebrow="Избранные работы" title="Работы, которые можно проверить." />

      <Band>
        <SectionIntro
          eyebrow="Реальные работы клиентов"
          title="Реальные сайты. Реальные результаты."
          sub="Более двадцати сайтов спроектированы, построены, выведены в топ и сопровождаются — в сферах недвижимости, e-commerce, гостеприимства, SaaS и B2B в Дубае. Каждая карточка ниже ведёт на реальный работающий бизнес."
        />
        <CardGrid columns={3}>
          {workWall.map((item, i) => (
            <WorkTile
              key={item.domain}
              sector={item.sectorRu}
              brand={item.brand}
              line={item.lineRu}
              domain={item.domain}
              cover={item.cover}
              coverPriority={i === 0}
              tone={i % 2 === 0 ? "limestone" : "porcelain"}
              delay={i * 60}
              locale="ru"
            />
          ))}
        </CardGrid>
      </Band>

      <CtaBand
        title="Хотите, чтобы ваш бизнес стал следующей карточкой на этой странице?"
        sub="Пятнадцать минут о том, где ваш маркетинг может принести больше выручки, и как SHARIO этого добьётся."
        arabicAccent
      >
        <PillLink href={cta.href} tone="solid" size="lg">
          {cta.labelRu}
        </PillLink>
      </CtaBand>
    </>
  );
}
