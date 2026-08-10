import type { Metadata } from "next";
import Link from "next/link";
import {
  Band,
  Divider,
  FinalCta,
  Hero,
  MarkerColumns,
  Pill,
  ProcessSteps,
  SectionHead,
} from "@/components/ui";
import { industries, processSteps, services } from "@/lib/site";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Six capabilities composing one creative system — brand strategy, brand identity, digital experiences, content, growth and creative technology.",
  alternates: { canonical: "/services" },
};

/**
 * The handoff supplies a single service template rather than an index. This
 * page is assembled from the same parts — the homepage capability grid, the
 * shared process row and the standard closing action — so the set has a
 * landing page without inventing a new pattern.
 */
export default function ServicesPage() {
  return (
    <>
      <Hero
        src="/images/book/desk-poster.jpg"
        focus="object-[55%_45%]"
        eyebrow="Shario — Services"
        title={
          <>
            A Complete
            <br />
            Creative System.
          </>
        }
        subhead="Six capabilities, composed to support one another."
        priority
      />

      {/* 01 — Capabilities */}
      <Band>
        <SectionHead title="Capabilities." marker="01 / Services" scale="md" />
        <div className="grid border-t border-carbon/12 wide:grid-cols-3 wide:border-l">
          {services.map((service, i) => (
            <Link
              key={service.slug}
              href={`/services/${service.slug}`}
              className="reveal group flex min-h-[220px] flex-col gap-4 border-b border-r border-carbon/12 px-8 py-9 transition-colors duration-500 hover:bg-limestone/40"
              data-delay={i * 60}
            >
              <span className="font-display text-sm text-carbon/50">
                {service.num}
              </span>
              <span className="font-display text-[1.625rem] font-medium">
                {service.name}
              </span>
              <span className="text-sm leading-[1.7] text-carbon/70">
                {service.descriptor}
              </span>
              <span className="mt-auto pt-4 text-[11px] uppercase tracking-[0.08em] text-carbon/50 transition-opacity duration-500 group-hover:text-carbon">
                View capability →
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

      {/* 03 — Industries */}
      <Band tone="carbon">
        <MarkerColumns marker="03 / Industries" tone="carbon">
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
