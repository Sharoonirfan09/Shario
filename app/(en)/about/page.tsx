import type { Metadata } from "next";
import Link from "next/link";
import {
  Band,
  Card,
  CardGrid,
  CtaBand,
  Frame,
  Heading,
  Hero,
  PillLink,
} from "@/components/ui";
import { aboutApproach, cta, heroImages, ogDefaults, services, sharedImages, site } from "@/lib/site";

const description =
  "SHARIO is a Dubai digital marketing agency and creative studio connecting performance marketing, SEO, brand and strategy and consulting into one system for ambitious businesses.";

/** Path/crop live in `lib/site.ts` as `heroImages.about`, shared with the Arabic page and both locales' `opengraph-image.tsx`. */
export const HERO_IMAGE = heroImages.about.src;
export const HERO_IMAGE_ALT = "Framed prints and objects arranged on a warm, minimal wall";

export const metadata: Metadata = {
  title: "About",
  description,
  alternates: {
    canonical: "/about",
    languages: { en: "/about", ar: "/ar/about", "x-default": "/about" },
  },
  openGraph: {
    ...ogDefaults,
    url: "/about",
    type: "website",
    title: "About — Shario",
    description,
  },
};

export default function AboutPage() {
  return (
    <>
      {/* `Hero` here carries no visible `title` — every page banner is
          label-only now, Services is the reference. A screen-reader-only H1
          gives the page the one real heading every page needs without
          adding anything to what a sighted visitor sees. */}
      <h1 className="sr-only">
        About Shario — Digital Marketing Agency &amp; Creative Studio in
        Dubai
      </h1>
      <Hero
        src={HERO_IMAGE}
        alt={HERO_IMAGE_ALT}
        focus="object-[50%_50%]"
        eyebrow="About"
        priority
      />

      {/* About SHARIO — the company, first. Text-only and centred, the one
          section on this page built for whitespace over structure. */}
      <Band>
        <div className="mx-auto max-w-[760px] text-center">
          <p className="eyebrow flex items-center justify-center gap-3 text-carbon/55">
            <span aria-hidden="true" className="h-px w-6 bg-mist" />
            About Shario
          </p>
          <Heading as="h2" scale="lg" className="mt-5">
            SHARIO
          </Heading>
          <p className="reveal mt-5 font-display text-[1.25rem] italic text-carbon/80 wide:text-[1.4375rem]">
            A digital marketing and creative studio built around clarity,
            performance and identity.
          </p>
          <p
            className="reveal mt-8 text-[1.0625rem] leading-[1.75] text-carbon/75"
            data-delay="80"
          >
            SHARIO brings together strategy, performance marketing, SEO,
            content, websites, CRM, automation, branding and creative under
            one connected approach.
          </p>
          <p
            className="reveal mt-5 text-[1.0625rem] leading-[1.75] text-carbon/75"
            data-delay="160"
          >
            We believe good marketing should do more than create attention.
            It should create clarity, build relevance and move the business
            forward.
          </p>
        </div>
      </Band>

      {/* Philosophy, Mission, Vision — the ledger measure (globals.css:
          figures in the display serif over a hairline, no boxes, no
          shadows) rather than another hairline-eyebrow-and-heading block.
          The rest of this page already opens every section that way —
          About SHARIO, How We Work, What We Do, the Founder — so three
          more of them back to back would read as the same block repeated,
          not three distinct ideas. The numerals also give three full
          sentences a real anchor to sit under, instead of a heading set at
          section-title size trying to hold a sentence in a column narrow
          enough to break it into a ragged four or five lines. Carries the
          Arabic mark centred and very large behind all three columns,
          fainter than anywhere else it appears on the site — this band's
          own text spans the full width, so the mark has to sit further
          back than the cornered or edge-bled versions elsewhere. */}
      <Band className="relative overflow-hidden bg-limestone/30">
        <span
          aria-hidden="true"
          className="wordmark-ar pointer-events-none absolute left-1/2 top-1/2 z-0 w-[70%] -translate-x-1/2 -translate-y-1/2 text-carbon/[0.035] wide:w-[42%]"
        />
        <div className="relative z-10 grid gap-14 wide:grid-cols-3 wide:gap-16">
          <div className="reveal ledger">
            <p className="ledger-figure">01</p>
            <p className="label-sm mt-5 text-carbon/50">Philosophy</p>
            <h2 className="mt-4 font-display text-[1.4375rem] font-normal leading-[1.3] text-carbon">
              Marketing should move something.
            </h2>
            <p className="mt-4 text-[0.9375rem] leading-[1.75] text-carbon/70">
              SHARIO connects creative thinking with measurable performance —
              brand, digital and growth held as one system, not three
              disconnected services run in parallel.
            </p>
          </div>
          <div className="reveal ledger" data-delay="80">
            <p className="ledger-figure">02</p>
            <p className="label-sm mt-5 text-carbon/50">Our Mission</p>
            <h2 className="mt-4 font-display text-[1.4375rem] font-normal leading-[1.3] text-carbon">
              To make modern marketing clearer, more connected and more
              effective.
            </h2>
            <p className="mt-4 text-[0.9375rem] leading-[1.75] text-carbon/70">
              We build thoughtful marketing systems where strategy, creative,
              digital execution and performance work together, rather than
              arriving from separate directions.
            </p>
          </div>
          <div className="reveal ledger" data-delay="160">
            <p className="ledger-figure">03</p>
            <p className="label-sm mt-5 text-carbon/50">Our Vision</p>
            <h2 className="mt-4 font-display text-[1.4375rem] font-normal leading-[1.3] text-carbon">
              To build a more intelligent standard for how ambitious
              businesses approach marketing.
            </h2>
            <p className="mt-4 text-[0.9375rem] leading-[1.75] text-carbon/70">
              Beyond disconnected campaigns — marketing ecosystems where
              identity, technology, content and performance are built to
              work together from the start.
            </p>
          </div>
        </div>
      </Band>

      {/* How We Work — the method the company runs on, one level up from a
          single engagement's own four-step rhythm on the homepage. Same
          numbered-card system as the rest of the site rather than a bespoke
          layout for four short steps. */}
      <Band>
        <div className="mb-12 max-w-[820px] wide:mb-16">
          <p className="eyebrow flex items-center gap-3 text-carbon/55">
            <span aria-hidden="true" className="h-px w-6 bg-mist" />
            How We Work
          </p>
          <Heading as="h2" scale="md" className="mt-5">
            Understand. Build. Measure. Refine.
          </Heading>
        </div>
        <CardGrid columns={4}>
          {aboutApproach.map((step, i) => (
            <Card
              key={step.num}
              badge={step.num}
              title={step.title}
              titleAs="h3"
              desc={step.desc}
              delay={i * 60}
            />
          ))}
        </CardGrid>
      </Band>

      {/* What We Do — named and linked, not catalogued again; the full
          six-service grid with its own imagery already lives on the
          homepage and `/services`. */}
      <Band className="bg-limestone/30">
        <div className="mb-10 max-w-[820px] wide:mb-14">
          <p className="eyebrow flex items-center gap-3 text-carbon/55">
            <span aria-hidden="true" className="h-px w-6 bg-mist" />
            What We Do
          </p>
          <Heading as="h2" scale="md" className="mt-5">
            One team, across every part of the system.
          </Heading>
        </div>
        <div className="grid gap-x-10 wide:grid-cols-2">
          {services.map((service, i) => (
            <Link
              key={service.slug}
              href={`/services/${service.slug}`}
              className="group reveal flex items-center justify-between gap-6 border-t border-carbon/15 py-5 transition-colors duration-300 hover:border-carbon/40"
              data-delay={i * 50}
            >
              <span className="font-display text-[1.25rem] font-normal text-carbon transition-colors duration-300 group-hover:text-carbon/70 wide:text-[1.375rem]">
                {service.name}
              </span>
              <span
                aria-hidden="true"
                className="text-carbon/40 transition-all duration-300 group-hover:translate-x-1 group-hover:text-carbon"
              >
                →
              </span>
            </Link>
          ))}
        </div>
      </Band>

      {/* The Founder — after the company, not instead of it. Same image,
          same story, same layout as before; only its position on the page
          and the heading introducing it have changed. */}
      <Band>
        <div className="grid items-center gap-12 wide:grid-cols-[1fr_1.05fr] wide:gap-20">
          {/* Not `photo-lounge.jpg` — it has the retired positioning statement
              painted across the back wall. */}
          <Frame
            src={sharedImages.founderPortrait}
            ratio="aspect-[4/5]"
            alt={`${site.founder}, founder of Shario`}
          />
          <div>
            <p className="eyebrow flex items-center gap-3 text-carbon/55">
              <span aria-hidden="true" className="h-px w-6 bg-mist" />
              The Founder
            </p>
            <Heading as="h2" scale="md" className="mt-5">
              {site.founder}
            </Heading>
            <p className="reveal mt-6 max-w-[560px] text-[1.0625rem] leading-[1.7] text-carbon/75">
              A performance marketer and digital growth strategist focused on
              building brands that are clear, relevant and built to grow.
            </p>
            <p
              className="reveal mt-4 max-w-[560px] text-[1.0625rem] leading-[1.7] text-carbon/75"
              data-delay="80"
            >
              Before founding SHARIO, Sharoon worked across Dubai&rsquo;s real
              estate, hospitality and B2B sectors, leading marketing, digital
              strategy and growth initiatives for ambitious businesses and
              brands.
            </p>
            <p
              className="reveal mt-4 max-w-[560px] text-[1.0625rem] leading-[1.7] text-carbon/75"
              data-delay="160"
            >
              That experience shaped SHARIO around a simple belief: good
              marketing is not just about being seen. It is about knowing what
              to say, where to say it, and why it matters.
            </p>
            <p
              className="reveal mt-4 max-w-[560px] text-[1.0625rem] leading-[1.7] text-carbon/75"
              data-delay="240"
            >
              Today, that thinking sits at the heart of SHARIO — bringing
              strategy, identity, digital and growth together under one clear
              direction.
            </p>
            <div
              className="reveal mt-9 flex flex-wrap items-center gap-6"
              data-delay="320"
            >
              <div>
                <p className="font-display text-xl">{site.founder}</p>
                <p className="mt-1 text-[0.8125rem] text-carbon/60">
                  Revenue Marketing Architect
                </p>
              </div>
              <a
                href={site.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="eyebrow border-b border-carbon/30 pb-1 text-carbon/70 transition-colors duration-300 hover:border-carbon hover:text-carbon"
              >
                LinkedIn →
              </a>
            </div>
          </div>
        </div>
      </Band>

      <CtaBand
        title="Good marketing starts with clarity."
        sub="If you know there is more potential in your marketing, let's find where it is."
      >
        <PillLink href={cta.href} tone="solid" size="lg">
          {cta.label}
        </PillLink>
      </CtaBand>
    </>
  );
}
