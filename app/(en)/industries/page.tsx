import type { Metadata } from "next";
import { IndustriesGrid } from "@/components/industries-grid";
import { Band, CardGrid, CtaBand, Hero, PillLink, SectionIntro } from "@/components/ui";
import { SixServices } from "@/components/six-services";
import { cta, heroImages, ogDefaults } from "@/lib/site";

const description =
  "Shario builds marketing systems for ten sectors across Dubai — real estate, hospitality, healthcare, e-commerce, technology and more — each with its own positioning, channels and buyer behaviour.";

export const HERO_IMAGE = heroImages.industries.src;
export const HERO_IMAGE_ALT = "";

export const metadata: Metadata = {
  title: "Industries We Work With — Dubai Marketing Agency",
  description,
  alternates: {
    canonical: "/industries",
    languages: {
      en: "/industries",
      ar: "/ar/industries",
      ru: "/ru/industries",
      "x-default": "/industries",
    },
  },
  openGraph: {
    ...ogDefaults,
    url: "/industries",
    type: "website",
    title: "Shario — Industries We Work With",
    description,
  },
};

const differentiators = [
  {
    title: "Founder-led, senior team",
    desc: "Every engagement is shaped by the same senior judgment, not handed down through account layers — the person setting strategy is the person you talk to.",
  },
  {
    title: "One connected system",
    desc: "Positioning, performance media, SEO, the website and CRM are planned together, so a campaign never sends traffic to a page or a process that isn't ready for it.",
  },
  {
    title: "Fluent in the Dubai market",
    desc: "Search behaviour, competitive density and buying seasons here don't match a generic playbook — the strategy starts from what actually happens in this market.",
  },
  {
    title: "Measured against revenue",
    desc: "Every engagement is reviewed against pipeline, bookings or enrolments it actually influenced — not impressions, reach or a vanity dashboard.",
  },
];

const process = [
  {
    step: "01",
    title: "Understand the sector",
    desc: "Before any channel is chosen, we map how your specific buyer actually researches, compares and decides in your category.",
  },
  {
    step: "02",
    title: "Position clearly",
    desc: "A message and identity built around what genuinely differentiates the business, not a template borrowed from a competitor.",
  },
  {
    step: "03",
    title: "Build the system",
    desc: "Website, search visibility, paid media and CRM, sequenced to how your sales or booking cycle actually works.",
  },
  {
    step: "04",
    title: "Run and refine",
    desc: "Weekly review against the outcome that matters for your sector — leads, bookings, enrolments or pipeline — not surface metrics.",
  },
];

export default function IndustriesPage() {
  return (
    <>
      <h1 className="sr-only">Digital Marketing & Creative Solutions for Every Industry</h1>
      <Hero
        src={HERO_IMAGE}
        alt={HERO_IMAGE_ALT}
        focus="object-[50%_45%]"
        eyebrow="Industries"
        title="Marketing built around the sector you're actually in."
        subhead="A software company, a boutique hotel and a real estate developer sell to completely different buyers on completely different timelines. We build the strategy, channels and systems to match — not a generic marketing package with your logo on it."
        priority
      >
        <PillLink href={cta.href} tone="solidLight" size="lg">
          {cta.label}
        </PillLink>
      </Hero>

      <IndustriesGrid />

      <SixServices />

      <Band tone="carbon">
        <SectionIntro
          eyebrow="Why Shario"
          title="The same discipline, applied to your sector."
          tone="carbon"
        />
        <CardGrid columns={4}>
          {differentiators.map((item, i) => (
            <div
              key={item.title}
              className="reveal border border-porcelain/15 p-8"
              data-delay={i * 60}
            >
              <p className="font-display text-[1.25rem] font-medium text-porcelain">
                {item.title}
              </p>
              <p className="mt-3.5 text-[0.9375rem] leading-[1.7] text-porcelain/70">
                {item.desc}
              </p>
            </div>
          ))}
        </CardGrid>
      </Band>

      <Band>
        <SectionIntro
          eyebrow="How We Start"
          title="From sector to system, in four steps."
        />
        <CardGrid columns={4}>
          {process.map((item, i) => (
            <div key={item.step} className="reveal" data-delay={i * 60}>
              <span className="font-display text-[1.0625rem] text-carbon/40">
                {item.step}
              </span>
              <p className="mt-4 font-display text-[1.25rem] font-medium text-carbon">
                {item.title}
              </p>
              <p className="mt-3.5 text-[0.9375rem] leading-[1.7] text-carbon/72">
                {item.desc}
              </p>
            </div>
          ))}
        </CardGrid>
      </Band>

      <CtaBand
        title="Don't see your industry listed? We probably still know it."
        sub="Tell us what you do and who you sell to — we'll tell you honestly whether Shario is the right fit."
        arabicAccent
      >
        <PillLink href={cta.href} tone="solid" size="lg">
          {cta.label}
        </PillLink>
      </CtaBand>
    </>
  );
}
