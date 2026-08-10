import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Faq } from "@/components/faq";
import {
  Band,
  Divider,
  DotList,
  Eyebrow,
  FinalCta,
  Hero,
  MarkerColumns,
  PillLink,
  ProcessSteps,
  SectionHead,
  SectionLabel,
  WorkCard,
} from "@/components/ui";
import {
  getCaseStudy,
  getService,
  processSteps,
  services,
  site,
  techStack,
} from "@/lib/site";

/** Every capability page is known at build time, so prerender them. */
export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/services/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};

  return {
    title: service.name,
    description: service.metaDescription,
    alternates: { canonical: `/services/${service.slug}` },
    openGraph: {
      title: `${service.name} — ${site.name}`,
      description: service.metaDescription,
    },
  };
}

export default async function ServicePage({
  params,
}: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const related = service.relatedWork
    .map(getCaseStudy)
    .filter((s) => s !== undefined);

  return (
    <>
      <Hero
        src={service.hero}
        focus={service.focus}
        eyebrow={`Service — ${service.num} / ${service.name}`}
        title={service.title}
        subhead={service.subhead}
        scale="service"
        priority
      >
        <PillLink href="/contact" tone="outlineLight">
          Start a Conversation
        </PillLink>
      </Hero>

      {/* 01 — What We Do */}
      <Band>
        <MarkerColumns marker="01 / What We Do" heading="What we do">
          <p className="reveal mb-8 max-w-[780px] font-display text-[1.75rem] font-normal leading-[1.3] wide:text-[clamp(1.75rem,3vw,2.5rem)]">
            {service.lead}
          </p>
          <DotList items={service.whatWeDo} />
        </MarkerColumns>
      </Band>

      <Divider />

      {/* 02 — Business Benefits */}
      <Band>
        <SectionHead
          title="Business Benefits."
          marker="02 / Outcomes"
          scale="md"
        />
        <div className="grid border-t border-carbon/12 wide:grid-cols-4 wide:border-l">
          {service.benefits.map((benefit, i) => (
            <div
              key={benefit.title}
              className="reveal flex min-h-[180px] flex-col gap-3.5 border-b border-r border-carbon/12 px-7 py-8"
              data-delay={i * 60}
            >
              <p className="font-display text-[1.375rem] font-medium">
                {benefit.title}
              </p>
              <p className="text-sm leading-[1.7] text-carbon/70">
                {benefit.desc}
              </p>
            </div>
          ))}
        </div>
      </Band>

      {/* 03 — Process */}
      <Band tone="carbon">
        <SectionHead
          title="Process."
          marker="03 / Workflow"
          scale="md"
          tone="carbon"
        />
        <ProcessSteps steps={processSteps} tone="carbon" />
      </Band>

      {/*
       * Deliverables and the tool row share one band. Apart they were two
       * near-empty sections; the lists are short enough that pairing them
       * reads as one deliberate spread rather than a page running out.
       * The industries pill row that sat between them is gone — the same six
       * pills already appear on the homepage, /work and every industry page,
       * and on a capability page they said nothing the reader needed.
       */}
      <Band>
        <div className="grid gap-12 wide:grid-cols-[1.35fr_1fr] wide:gap-20">
          <div>
            <SectionLabel>Deliverables</SectionLabel>
            <Eyebrow className="mb-8">04 / Deliverables</Eyebrow>
            <DotList items={service.deliverables} columns={1} accent={false} />
          </div>
          <div>
            <SectionLabel>Technology and tools</SectionLabel>
            <Eyebrow className="mb-8">05 / Technology &amp; Tools</Eyebrow>
            <div className="flex flex-wrap gap-x-8 gap-y-5">
              {techStack.map((tool, i) => (
                <span
                  key={tool}
                  className="reveal font-display text-[1.375rem] text-carbon/55"
                  data-delay={i * 50}
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Band>

      {/* 07 — Related Work */}
      <Band tone="carbon">
        <SectionHead
          title="Related Work."
          marker="06 / Case Studies"
          scale="md"
          tone="carbon"
        />
        <div className="grid gap-10 wide:grid-cols-2">
          {related.map((item, i) => (
            <WorkCard
              key={item.slug}
              href={`/work/${item.slug}`}
              image={item.card}
              category={item.category}
              title={item.title}
              ratio="aspect-[4/3]"
              delay={i * 90}
            />
          ))}
        </div>
      </Band>

      {/*
       * The prototype centres the FAQ in its own 1000px column, which pushes
       * its marker 200px right of every other marker on the page. It sits in
       * the standard container here; the accordion keeps a readable measure
       * from its own max-width instead.
       */}
      <Band>
        <SectionLabel>Frequently asked questions</SectionLabel>
        <Eyebrow className="mb-10 wide:mb-16">07 / FAQ</Eyebrow>
        <div className="max-w-[900px]">
          <Faq items={service.faqs} />
        </div>
      </Band>

      <FinalCta lines={service.ctaTitle} />
    </>
  );
}
