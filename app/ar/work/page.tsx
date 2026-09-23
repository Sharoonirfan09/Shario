import type { Metadata } from "next";
import { Band, CardGrid, CtaBand, PillLink, SectionIntro, TypeHero, WorkTile } from "@/components/ui";
import { cta, ogDefaultsAr, workWall } from "@/lib/site";

const description =
  "أكثر من عشرين موقعاً إلكترونياً صُمم وبُني ورُتّب وأُدير لأعمال تجارية حقيقية في دبي — العقارات والتجارة الإلكترونية والضيافة وSaaS وB2B. أعمال عملاء حقيقية، لا نماذج تجريبية.";

export const metadata: Metadata = {
  title: "أعمالنا — شاريو",
  description,
  alternates: {
    canonical: "/ar/work",
    languages: { en: "/work", ar: "/ar/work", ru: "/ru/work", "x-default": "/work" },
  },
  openGraph: {
    ...ogDefaultsAr,
    url: "/ar/work",
    type: "website",
    title: "شاريو — أعمالنا",
    description,
  },
};

export default function ArabicWorkPage() {
  return (
    <>
      <TypeHero eyebrow="أعمال مختارة" title="أعمال يمكنكم النقر عليها." />

      <Band>
        <SectionIntro
          eyebrow="أعمال عملاء حقيقية"
          title="مواقع حقيقية. نتائج حقيقية."
          sub="أكثر من عشرين موقعاً إلكترونياً صُمم وبُني ورُتّب وأُدير — عبر قطاع العقارات والتجارة الإلكترونية والضيافة وSaaS وB2B في دبي. كل بطاقة أدناه ترتبط بعمل تجاري حقيقي وفعّال."
        />
        <CardGrid columns={3}>
          {workWall.map((item, i) => (
            <WorkTile
              key={item.domain}
              sector={item.sectorAr}
              brand={item.brand}
              line={item.lineAr}
              domain={item.domain}
              cover={item.cover}
              coverPriority={i === 0}
              tone={i % 2 === 0 ? "limestone" : "porcelain"}
              delay={i * 60}
              locale="ar"
            />
          ))}
        </CardGrid>
      </Band>

      <CtaBand
        title="هل تريدون أن يكون عملكم البطاقة التالية في هذه الصفحة؟"
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
