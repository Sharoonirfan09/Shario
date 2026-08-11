import type { Metadata } from "next";
import { Faq } from "@/components/faq";
import {
  Band,
  Card,
  CardGrid,
  Container,
  CtaBand,
  Frame,
  Heading,
  PillLink,
  SectionIntro,
  SplitHero,
  StatBand,
} from "@/components/ui";
import {
  cta,
  homeFaqs,
  howWeWork,
  proof,
  services,
  site,
  stats,
} from "@/lib/site";

export const metadata: Metadata = {
  title: "Shario — Digital Marketing Company in Dubai",
  description: site.description,
  alternates: { canonical: "/" },
};

/**
 * Card grounds. Every one is a distinct photograph used nowhere else on the
 * site — `npm run check:images` fails the build if any of them repeats.
 *
 * They live here rather than in `lib/site.ts` because the services grid also
 * renders on `/services`, and giving both pages the same backgrounds would
 * break that rule — that page carries its own set, cut from different
 * originals.
 */
const stepTextures = [
  "/images/texture/stone.jpg",
  "/images/texture/build.jpg",
  "/images/texture/interior.jpg",
  "/images/texture/desk.jpg",
];

const serviceTextures: Record<string, string> = {
  "performance-marketing": "/images/texture/svc-performance.jpg",
  "seo-and-content": "/images/texture/svc-seo.jpg",
  "websites-and-cro": "/images/texture/svc-web.jpg",
  "crm-and-automation": "/images/texture/svc-crm.jpg",
  "brand-and-creative": "/images/texture/svc-brand.jpg",
};

export default function HomePage() {
  return (
    <>
      {/*
       * Not `reception-wall.jpg`, which was the hero until the positioning
       * changed: it has "SHARIO — A Symphony of Identity" and the Arabic
       * lockup painted across the wall. Four photographs in the library carry
       * the retired tagline — that one, `sign-exterior`, `sign-glass` and
       * `photo-lounge`. None are used anywhere on the site.
       */}
      <SplitHero
        src="/images/book/photo-stair.jpg"
        focus="object-[50%_45%]"
        eyebrow="Digital Marketing Company — Dubai"
        title="Marketing that turns spend into revenue."
        subhead="Shario is a founder-led digital marketing company in Dubai, built by an operator who has generated AED 35M+ in tracked revenue for real estate and B2B brands."
        href="/results"
        linkLabel="See the record"
      >
        <PillLink href={cta.href} tone="solid" size="lg">
          {cta.label}
        </PillLink>
        <PillLink href="/services" tone="outline" size="lg">
          Our Services
        </PillLink>
      </SplitHero>

      {/*
       * The reference puts a client logo wall here. Shario has no logo
       * permissions, so the same slot carries the three claims that do the
       * same job — credibility before any prose is asked for. A single line,
       * not a grid: the figures band further down is where numbers belong.
       */}
      {/* Porcelain, not Limestone — the hero above it is now Limestone, and
          two adjacent bands of the same field read as one. */}
      <section className="border-b border-carbon/12">
        <Container className="flex flex-wrap items-center justify-center gap-x-12 gap-y-5 py-8 wide:gap-x-20 wide:py-10">
          {proof.map((item, i) => (
            <p
              key={item.title}
              className="reveal flex items-center gap-3 font-display text-[1.0625rem] leading-none text-carbon wide:text-[1.3125rem]"
              data-delay={i * 110}
            >
              <span
                aria-hidden="true"
                className="h-1.5 w-1.5 shrink-0 rounded-full bg-mist"
              />
              {item.title}
            </p>
          ))}
        </Container>
      </section>

      {/* About — image beside text, as the reference sets it */}
      <Band>
        <div className="grid items-center gap-12 wide:grid-cols-[1fr_1.05fr] wide:gap-20">
          <Frame src="/images/book/photo-desk.jpg" ratio="aspect-[4/3]" />
          <div>
            <p className="eyebrow flex items-center gap-3 text-carbon/55">
              <span aria-hidden="true" className="h-px w-6 bg-mist" />
              About Shario
            </p>
            <Heading scale="md" className="mt-5">
              Founder-led from day one.
            </Heading>
            <p className="reveal mt-6 max-w-[560px] text-[1.0625rem] leading-[1.7] text-carbon/75">
              Shario runs on a senior model. Every strategy is set to the
              standard of a founder who has personally built and launched
              full-funnel marketing systems for developer-led projects in Dubai.
            </p>
            <p
              className="reveal mt-4 max-w-[560px] text-[1.0625rem] leading-[1.7] text-carbon/75"
              data-delay="90"
            >
              You get senior thinking on every campaign, from a team that stays
              with your account.
            </p>
            <div className="reveal mt-9" data-delay="160">
              <PillLink href="/about">Learn More</PillLink>
            </div>
          </div>
        </div>
      </Band>

      {/* Services */}
      <Band className="bg-limestone/30">
        <SectionIntro
          eyebrow="Our Services"
          title={
            <>
              Everything you need to grow,
              <br className="hidden wide:block" /> handled by one team.
            </>
          }
          sub="From paid media and search to websites, CRM and creative — the full marketing system a Dubai brand needs to generate demand and convert it into revenue."
        />
        <CardGrid columns={3}>
          {services.map((service, i) => (
            <Card
              key={service.slug}
              href={`/services/${service.slug}`}
              badge={service.num}
              title={service.name}
              titleAs="h3"
              desc={service.descriptor}
              action="Learn more"
              background={serviceTextures[service.slug]}
              delay={i * 60}
            />
          ))}
          <Card
            href={cta.href}
            title="Not sure which you need?"
            desc="Tell us your goal and we will tell you which of these gets you there — and which you can leave until later."
            action={cta.label}
            background="/images/texture/svc-cta.jpg"
            delay={services.length * 60}
          />
        </CardGrid>
      </Band>

      {/* What makes us different — the engagement, as the reference frames it */}
      <Band>
        <SectionIntro
          eyebrow="What Makes Us Different"
          title="This is how we work."
          sub="Four steps, run every week rather than every quarter."
        />
        {/*
         * One texture per card, each used nowhere else on the site. They are
         * crops of material — stone, paper, an interior, a desk — rather than
         * photographs with a subject, so they read as the card's ground and
         * leave the type at full contrast.
         */}
        <CardGrid columns={4}>
          {howWeWork.map((step, i) => (
            <Card
              key={step.num}
              badge={step.num}
              title={step.title}
              titleAs="h3"
              desc={step.desc}
              background={stepTextures[i]}
              delay={i * 60}
            />
          ))}
        </CardGrid>
      </Band>

      <StatBand
        eyebrow="Leading With Revenue"
        title="Built on a record you can check."
        body="Every engagement is run to a founder's standard and measured against revenue. That focus is what turns marketing into real growth."
        stats={stats}
        action={
          <PillLink href="/results" tone="solidLight">
            See the full record
          </PillLink>
        }
      />

      {/* FAQ */}
      <Band>
        <SectionIntro
          eyebrow="FAQ"
          title="Frequently asked questions."
        />
        <div className="mx-auto max-w-[880px]">
          <Faq items={homeFaqs} />
        </div>
      </Band>

      <CtaBand
        title="Book a strategy call."
        sub="In fifteen minutes we will map where your marketing can win more revenue and how to unlock it. Free, focused and specific to your business."
        >
        <PillLink href={cta.href} tone="solid" size="lg">
          {cta.label}
        </PillLink>
        <PillLink href={`mailto:${site.email}`} tone="outline" size="lg">
          Email Us
        </PillLink>
      </CtaBand>
    </>
  );
}
