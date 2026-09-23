import type { Metadata } from "next";
import { Band, CardGrid, CtaBand, PillLink, SectionIntro, TypeHero, WorkTile } from "@/components/ui";
import { cta, ogDefaults, workWall } from "@/lib/site";

const description =
  "Twenty-plus websites designed, built, ranked and run for real Dubai businesses — real estate, e-commerce, hospitality, SaaS and B2B. Live client work, not mockups.";

export const metadata: Metadata = {
  title: "Our Work — Shario",
  description,
  alternates: {
    canonical: "/work",
    languages: { en: "/work", ar: "/ar/work", ru: "/ru/work", "x-default": "/work" },
  },
  openGraph: {
    ...ogDefaults,
    url: "/work",
    type: "website",
    title: "Shario — Our Work",
    description,
  },
};

export default function WorkPage() {
  return (
    <>
      <TypeHero eyebrow="Selected Work" title="Work you can click." />

      <Band>
        <SectionIntro
          eyebrow="Live Client Work"
          title="Real sites. Real results."
          sub="Twenty-plus websites designed, built, ranked and run — across Dubai real estate, e-commerce, hospitality, SaaS and B2B. Every tile below links to a live, working business."
        />
        <CardGrid columns={3}>
          {workWall.map((item, i) => (
            <WorkTile
              key={item.domain}
              sector={item.sector}
              brand={item.brand}
              line={item.line}
              domain={item.domain}
              cover={item.cover}
              coverPriority={i === 0}
              tone={i % 2 === 0 ? "limestone" : "porcelain"}
              delay={i * 60}
            />
          ))}
        </CardGrid>
      </Band>

      <CtaBand
        title="Want your business to be the next tile on this page?"
        sub="Fifteen minutes on where your marketing can win more revenue, and how Shario would unlock it."
        arabicAccent
      >
        <PillLink href={cta.href} tone="solid" size="lg">
          {cta.label}
        </PillLink>
      </CtaBand>
    </>
  );
}
