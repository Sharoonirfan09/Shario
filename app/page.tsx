import type { Metadata } from "next";
import Link from "next/link";
import {
  Band,
  Divider,
  DotList,
  Eyebrow,
  FinalCta,
  Frame,
  Hero,
  MarkerColumns,
  NumberedRows,
  Pill,
  PillLink,
  ProcessSteps,
  SectionHead,
  SectionLabel,
  StatementImage,
  WorkCard,
} from "@/components/ui";
import {
  creativeTechnology,
  industries,
  insights,
  principles,
  processSteps,
  services,
  site,
  testimonial,
  work,
} from "@/lib/site";

export const metadata: Metadata = {
  title: "Shario — A Symphony of Identity",
  description: site.description,
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <Hero
        src="/images/book/reception-wall.jpg"
        /*
         * A phone crops this 4:5 photograph hard from both sides, which cut the
         * wordmark on the reception wall in half. Anchoring the crop right
         * keeps the lockup whole; the desktop box is wide enough to centre.
         */
        focus="object-right wide:object-center"
        eyebrow="Shario — Creative Studio — Dubai"
        title={
          <>
            A Symphony
            <br />
            of Identity.
          </>
        }
        subhead="One vision, composed across every touchpoint."
        scale="home"
        priority
      />

      {/* 01 — Introduction */}
      <Band>
        <MarkerColumns marker="01 / Introduction" heading="Introduction">
          <p className="reveal max-w-[820px] font-display text-[1.875rem] font-normal leading-[1.3] wide:text-[clamp(1.875rem,3.4vw,2.875rem)]">
            SHARIO is a boutique creative studio composing coherent brand
            identities across strategy, design and technology.
          </p>
          <p
            className="reveal mt-8 max-w-[620px] font-body text-[1.1875rem] leading-[1.7] text-carbon/80"
            data-delay="120"
          >
            Clarity before expression. Purpose before decoration. Every
            engagement receives close creative direction, considered
            decision-making and a high level of attention — building complete
            brand ecosystems where positioning, identity, digital presence and
            communication support one another.
          </p>
        </MarkerColumns>
      </Band>

      <Divider />

      {/* 02 — Capabilities */}
      <Band>
        <SectionHead
          title={
            <>
              A Complete
              <br />
              Creative System.
            </>
          }
          marker="02 / Capabilities"
        />
        {/*
         * The grid draws its own rules: a top and left edge on the container,
         * a bottom and right edge on every cell. Below the breakpoint the left
         * edge is dropped so a single column does not gain a stray rule.
         */}
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
            </Link>
          ))}
        </div>
      </Band>

      <StatementImage src="/images/travertine-wall.jpg">
        Harmony is a discipline, not an accident.
      </StatementImage>

      {/* 03 — What Defines Us */}
      <Band>
        <SectionLabel>What defines us</SectionLabel>
        <Eyebrow className="mb-10 wide:mb-16">03 / What Defines Us</Eyebrow>
        <NumberedRows rows={principles} />
      </Band>

      {/* 04 — Selected Work */}
      <Band tone="carbon">
        <SectionHead
          title="Selected Work."
          marker="04 / Portfolio"
          tone="carbon"
        />
        <div className="grid gap-12 wide:grid-cols-3 wide:gap-10">
          {work.map((item, i) => (
            <WorkCard
              key={item.slug}
              href={`/work/${item.slug}`}
              image={item.card}
              category={item.category}
              title={item.title}
              scope={item.scope}
              delay={i * 90}
            />
          ))}
        </div>
        <div className="mt-10 text-center wide:mt-16">
          <PillLink href="/work" tone="outlineLight">
            View All Work
          </PillLink>
        </div>
      </Band>

      {/* 05 — Industries */}
      <Band id="industries">
        <SectionHead
          title={
            <>
              Designed for
              <br />
              ambitious brands.
            </>
          }
          marker="05 / Industries"
        />
        <div className="flex flex-wrap gap-3.5">
          {industries.map((industry) => (
            <Pill key={industry.slug} href={`/industries/${industry.slug}`}>
              {industry.name}
            </Pill>
          ))}
        </div>
      </Band>

      <Divider />

      {/* 06 — Process */}
      <Band>
        <SectionHead
          title={
            <>
              One Vision.
              <br />
              Every Touchpoint.
            </>
          }
          marker="06 / Process"
        />
        <ProcessSteps steps={processSteps} />
        <p className="eyebrow mt-10 text-center text-carbon/50 wide:mt-16">
          Continuous, Not Linear
        </p>
      </Band>

      {/* 07 — Creative Technology */}
      <Band tone="carbon">
        <MarkerColumns
          marker="07 / Creative Technology"
          heading="Creative technology"
          tone="carbon"
        >
          <p className="reveal max-w-[780px] font-display text-[1.875rem] font-normal leading-[1.3] wide:text-[clamp(1.875rem,3.4vw,2.875rem)]">
            Visibility is only valuable when it is earned by substance.
          </p>
          <div className="mt-10">
            <DotList items={creativeTechnology} tone="carbon" />
          </div>
        </MarkerColumns>
      </Band>

      {/* Testimonial */}
      <section>
        <div className="mx-auto max-w-[960px] px-6 py-16 text-center wide:px-12 wide:py-[clamp(5rem,9vw,8.75rem)]">
          <blockquote className="reveal font-body text-2xl italic leading-[1.5] wide:text-[2rem]">
            “{testimonial.quote}”
          </blockquote>
          <p className="mt-8 text-xs uppercase tracking-[0.08em] text-carbon/60">
            {testimonial.attribution}
          </p>
        </div>
      </section>

      {/* 08 — Insights */}
      <Band id="insights">
        <SectionHead title="Insights." marker="08 / Journal" />
        <div className="grid gap-12 wide:grid-cols-3 wide:gap-10">
          {insights.map((article, i) => (
            <article
              key={article.id}
              className="reveal flex flex-col gap-4"
              data-delay={i * 90}
            >
              <Frame src={article.image} ratio="aspect-[16/10]" />
              <p className="eyebrow text-carbon/50">
                {article.category} · {article.date}
              </p>
              <h3 className="font-display text-[1.375rem] font-medium leading-[1.25]">
                {article.title}
              </h3>
            </article>
          ))}
        </div>
      </Band>

      <FinalCta lines={["Let’s compose", "something distinctive."]} />
    </>
  );
}
