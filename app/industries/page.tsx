import type { Metadata } from "next";
import Link from "next/link";
import {
  Band,
  Divider,
  FinalCta,
  Hero,
  ProcessSteps,
  SectionHead,
} from "@/components/ui";
import { industries, processSteps } from "@/lib/site";

export const metadata: Metadata = {
  title: "Industries",
  description:
    "The six sectors Shario works in — real estate and development, architecture and interiors, hospitality, fashion and beauty, professional services, and founder brands.",
  alternates: { canonical: "/industries" },
};

export default function IndustriesPage() {
  return (
    <>
      <Hero
        src="/images/book/desk-shelving.jpg"
        eyebrow="Shario — Industries"
        title={
          <>
            Designed for
            <br />
            ambitious brands.
          </>
        }
        subhead="Six sectors, each with its own demands on a brand."
        priority
      />

      {/* 01 — Sectors */}
      <Band>
        <SectionHead title="Sectors." marker="01 / Industries" scale="md" />
        <div className="grid border-t border-carbon/12 wide:grid-cols-3 wide:border-l">
          {industries.map((industry, i) => (
            <Link
              key={industry.slug}
              href={`/industries/${industry.slug}`}
              className="reveal group flex min-h-[220px] flex-col gap-4 border-b border-r border-carbon/12 px-8 py-9 transition-colors duration-500 hover:bg-limestone/40"
              data-delay={i * 60}
            >
              <span className="font-display text-sm text-carbon/50">
                {industry.num}
              </span>
              <span className="font-display text-[1.625rem] font-medium leading-[1.15]">
                {industry.name}
              </span>
              <span className="text-sm leading-[1.7] text-carbon/70">
                {industry.subhead}
              </span>
              <span className="mt-auto pt-4 text-[11px] uppercase tracking-[0.08em] text-carbon/50 transition-opacity duration-500 group-hover:text-carbon">
                View sector →
              </span>
            </Link>
          ))}
        </div>
      </Band>

      <Divider />

      {/* 02 — Process */}
      <Band>
        <SectionHead
          title={
            <>
              One Vision.
              <br />
              Every Touchpoint.
            </>
          }
          marker="02 / Process"
          scale="md"
        />
        <ProcessSteps steps={processSteps} />
      </Band>

      <FinalCta lines={["Let’s compose", "something distinctive."]} />
    </>
  );
}
