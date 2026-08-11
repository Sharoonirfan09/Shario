import type { Metadata } from "next";
import {
  Band,
  Card,
  CardGrid,
  CtaBand,
  Figure,
  Pill,
  PillLink,
  SectionIntro,
  SplitHero,
  StatBand,
  StatementImage,
} from "@/components/ui";
import { cta, industries, results, stats } from "@/lib/site";

export const metadata: Metadata = {
  title: "Results",
  description:
    "AED 35M+ in CRM-attributed revenue, a Marketing Excellence Award for campaign ROI, and 40%+ organic traffic growth — Shario's record across Dubai real estate and B2B marketing.",
  alternates: { canonical: "/results" },
};

export default function ResultsPage() {
  return (
    <>
      {/* The homepage's opening, repeated — Limestone ground, type left,
          one photograph panelled right. `photo-plinth` was freed when the
          contact page's location strip came out. */}
      <SplitHero
        src="/images/book/photo-plinth.jpg"
        focus="object-[50%_42%]"
        eyebrow="Results"
        title="Results that show up in revenue."
        subhead="A track record of measurable outcomes across real estate and B2B marketing in Dubai and the wider UAE."
        href="/services"
        linkLabel="See the services"
      >
        <PillLink href={cta.href} tone="solid" size="lg">
          {cta.label}
        </PillLink>
        <PillLink href="/about" tone="outline" size="lg">
          About Shario
        </PillLink>
      </SplitHero>

      {/*
       * The evidence. There are no case studies here by design: the three that
       * used to run on this site were written for clients that do not exist.
       * What follows is the founder's own tracked record, which is both
       * verifiable and stronger.
       */}
      <Band>
        <SectionIntro
          eyebrow="The Record"
          title="The numbers."
          sub="Every figure below is attributable — tracked in a CRM from first click to closed sale, not modelled or estimated."
        />
        {/*
         * A pair, each at its own full proportion. Both photographs are 4:5,
         * so `width`/`height` are passed rather than a ratio — the frame takes
         * the picture's real shape and nothing is cropped out of either.
         */}
        <div className="mb-14 grid gap-8 wide:mb-20 wide:grid-cols-2 wide:gap-10">
          <Figure
            src="/images/book/photo-aperture.jpg"
            width={1122}
            height={1402}
            label="Tracked to the sale"
            caption="Every figure below is reconciled against CRM records at the close of the engagement it belongs to."
            sizes="(min-width: 880px) 46vw, 100vw"
          />
          <Figure
            src="/images/book/pen-cover.jpg"
            width={1120}
            height={1402}
            label="Reported weekly"
            caption="Against pipeline and closed revenue — never impressions, and never at the end of the quarter."
            sizes="(min-width: 880px) 46vw, 100vw"
          />
        </div>
        <CardGrid columns={3}>
          {results.map((item, i) => (
            <Card
              key={item.num}
              badge={item.num}
              title={item.title}
              titleAs="h3"
              desc={item.desc}
              delay={i * 60}
            />
          ))}
        </CardGrid>
      </Band>

      <StatementImage src="/images/travertine-wall.jpg">
        Every engagement is measured against revenue, not activity.
      </StatementImage>

      <StatBand
        eyebrow="Why It Works"
        title="Run to a founder's standard, judged on revenue."
        body="That focus is what turns marketing into real growth. It also means the uncomfortable conversations happen early — when a channel is not returning, we say so in the weekly review rather than at the end of the quarter."
        stats={stats}
        action={
          <PillLink href="/services" tone="solidLight">
            See the services
          </PillLink>
        }
      />

      {/*
       * The sector list appears here and on no other page. Eight pills
       * previously ran on the homepage, the services index, the work index and
       * six sector pages that restated the service copy.
       */}
      <Band className="bg-limestone/30">
        <SectionIntro
          eyebrow="Sectors"
          title="Industries we deliver in."
          sub="Deepest in real estate development, where the majority of the AED 35M+ was generated, and in B2B where the sales cycle is long enough that attribution is the whole argument."
        />
        <div className="flex flex-wrap justify-center gap-3.5">
          {industries.map((industry) => (
            <Pill key={industry}>{industry}</Pill>
          ))}
        </div>
      </Band>

      <CtaBand
        title="Want results like these for your brand?"
        sub="Book a call and we will show you the path — specific to your numbers, not a generic proposal."
      >
        <PillLink href={cta.href} tone="solid" size="lg">
          {cta.label}
        </PillLink>
      </CtaBand>
    </>
  );
}
