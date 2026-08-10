import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Band,
  Divider,
  DotList,
  FinalCta,
  MarkerColumns,
  Pill,
  PillLink,
  SectionHead,
  TypeHero,
  WorkCard,
} from "@/components/ui";
import {
  getIndustry,
  getService,
  industries,
  site,
  workForIndustry,
} from "@/lib/site";

export function generateStaticParams() {
  return industries.map((industry) => ({ slug: industry.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/industries/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const industry = getIndustry(slug);
  if (!industry) return {};

  return {
    title: industry.name,
    description: industry.metaDescription,
    alternates: { canonical: `/industries/${industry.slug}` },
    openGraph: {
      title: `${industry.name} — ${site.name}`,
      description: industry.metaDescription,
    },
  };
}

export default async function IndustryPage({
  params,
}: PageProps<"/industries/[slug]">) {
  const { slug } = await params;
  const industry = getIndustry(slug);
  if (!industry) notFound();

  const capabilities = industry.capabilities
    .map(getService)
    .filter((s) => s !== undefined);
  const studies = workForIndustry(industry.name);
  const others = industries.filter((i) => i.slug !== industry.slug);

  return (
    <>
      <TypeHero
        eyebrow={`Industry — ${industry.num} / ${industry.name}`}
        title={industry.title}
        subhead={industry.subhead}
      >
        <PillLink href="/contact" tone="outline">
          Start a Conversation
        </PillLink>
      </TypeHero>

      {/* 01 — Overview */}
      <Band>
        <MarkerColumns marker="01 / Overview" heading="Overview">
          <p className="reveal mb-8 max-w-[780px] font-display text-[1.75rem] font-normal leading-[1.3] wide:text-[clamp(1.75rem,3vw,2.5rem)]">
            {industry.lead}
          </p>
          <p
            className="reveal max-w-[680px] font-body text-[1.1875rem] leading-[1.75] text-carbon/80"
            data-delay="120"
          >
            {industry.body}
          </p>
        </MarkerColumns>
      </Band>

      <Divider />

      {/* 02 — What the sector demands */}
      <Band>
        <SectionHead
          title="What This Sector Demands."
          marker="02 / Requirements"
          scale="md"
        />
        <DotList items={industry.demands} />
      </Band>

      {/* 03 — Capabilities that matter most here */}
      <Band tone="carbon">
        <SectionHead
          title="How We Help."
          marker="03 / Capabilities"
          scale="md"
          tone="carbon"
        />
        <div className="grid border-t border-porcelain/15 wide:grid-cols-3 wide:border-l">
          {capabilities.map((service, i) => (
            <Link
              key={service.slug}
              href={`/services/${service.slug}`}
              className="reveal group flex min-h-[220px] flex-col gap-4 border-b border-r border-porcelain/15 px-8 py-9 transition-colors duration-500 hover:bg-porcelain/5"
              data-delay={i * 70}
            >
              <span className="font-display text-sm text-porcelain/50">
                {service.num}
              </span>
              <span className="font-display text-[1.625rem] font-medium">
                {service.name}
              </span>
              <span className="text-sm leading-[1.7] text-porcelain/70">
                {service.descriptor}
              </span>
              <span className="mt-auto pt-4 text-[11px] uppercase tracking-[0.08em] text-porcelain/50 transition-opacity duration-500 group-hover:text-porcelain">
                View capability →
              </span>
            </Link>
          ))}
        </div>
      </Band>

      {/* 04 — Selected work */}
      <Band>
        <SectionHead
          title="Selected Work."
          marker="04 / Case Studies"
          scale="md"
        />
        <div
          className={`grid gap-12 wide:gap-10 ${
            studies.length > 1 ? "wide:grid-cols-2" : "wide:max-w-[560px]"
          }`}
        >
          {studies.map((item, i) => (
            <WorkCard
              key={item.slug}
              href={`/work/${item.slug}`}
              image={item.card}
              category={item.category}
              title={item.title}
              scope={item.scope}
              tone="porcelain"
              ratio="aspect-[4/3]"
              delay={i * 90}
            />
          ))}
        </div>
      </Band>

      {/* 05 — The rest of the set */}
      <Band>
        <MarkerColumns marker="05 / Other Industries" heading="Other industries">
          <div className="flex flex-wrap gap-3.5">
            {others.map((other) => (
              <Pill key={other.slug} href={`/industries/${other.slug}`}>
                {other.name}
              </Pill>
            ))}
          </div>
        </MarkerColumns>
      </Band>

      <FinalCta lines={industry.ctaTitle} />
    </>
  );
}
