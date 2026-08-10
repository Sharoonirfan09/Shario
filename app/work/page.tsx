import type { Metadata } from "next";
import {
  Band,
  FinalCta,
  Hero,
  MarkerColumns,
  Pill,
  SectionHead,
  WorkCard,
} from "@/components/ui";
import { industries, work } from "@/lib/site";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Selected work from Shario — brand identity, digital experience and complete brand ecosystems for real estate, architecture and hospitality in Dubai.",
  alternates: { canonical: "/work" },
};

/**
 * The handoff supplies a case study template rather than an index. This page
 * reuses the homepage's Selected Work cards at full width so every study has
 * a route in, without introducing a pattern the design does not contain.
 */
export default function WorkPage() {
  return (
    <>
      <Hero
        src="/images/book/photo-shelf.jpg"
        eyebrow="Shario — Work"
        title="Selected Work."
        subhead="Brands composed to hold together at every scale."
        priority
      />

      <Band>
        <SectionHead title="Projects." marker="01 / Portfolio" scale="md" />
        <div className="grid gap-12 wide:grid-cols-3 wide:gap-10">
          {work.map((item, i) => (
            <WorkCard
              key={item.slug}
              href={`/work/${item.slug}`}
              image={item.card}
              category={item.category}
              title={item.title}
              scope={item.scope}
              tone="porcelain"
              delay={i * 90}
            />
          ))}
        </div>
      </Band>

      <Band tone="carbon">
        <MarkerColumns marker="02 / Industries" tone="carbon">
          <div className="flex flex-wrap gap-3.5">
            {industries.map((industry) => (
              <Pill
                key={industry.slug}
                href={`/industries/${industry.slug}`}
                tone="carbon"
              >
                {industry.name}
              </Pill>
            ))}
          </div>
        </MarkerColumns>
      </Band>

      <FinalCta lines={["Let’s compose", "something distinctive."]} />
    </>
  );
}
