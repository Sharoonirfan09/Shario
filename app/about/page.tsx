import type { Metadata } from "next";
import {
  Band,
  Card,
  CardGrid,
  CtaBand,
  Frame,
  Heading,
  Hero,
  PillLink,
  SectionIntro,
} from "@/components/ui";
import { cta, founderLed, site, workPrinciples } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "Shario was founded by Sharoon Irfan, a Dubai performance marketer with 6+ years building revenue-focused marketing and AED 35M+ in CRM-attributed sales.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <Hero
        src="/images/book/about-frames.jpg"
        focus="object-[50%_50%]"
        eyebrow="About Shario"
        priority
      />

      {/* The founder */}
      <Band>
        <div className="grid items-center gap-12 wide:grid-cols-[1fr_1.05fr] wide:gap-20">
          {/* Not `photo-lounge.jpg` — it has the retired positioning statement
              painted across the back wall. */}
          <Frame src="/images/book/founder-stable.jpg" ratio="aspect-[4/5]" />
          <div>
            <p className="eyebrow flex items-center gap-3 text-carbon/55">
              <span aria-hidden="true" className="h-px w-6 bg-mist" />
              The Founder
            </p>
            <Heading scale="md" className="mt-5">
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

      {/* What founder-led means */}
      <Band className="bg-limestone/30">
        <SectionIntro
          eyebrow="The Model"
          title="What founder-led means for you."
          sub="Four commitments that follow from a senior team running the account rather than handing it down."
        />
        <CardGrid columns={4}>
          {founderLed.map((item, i) => (
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

      {/* Where We Work — principles, not stats, so this sits outside StatBand's
          figure/CountUp mechanism rather than repurposing it: "01"–"04" would
          lose their leading zero the moment CountUp's animation finished. */}
      <Band tone="carbon">
        <div className="grid gap-12 wide:grid-cols-[1fr_1.15fr] wide:items-center wide:gap-24">
          <div>
            <p className="eyebrow flex items-center gap-3 text-porcelain/70">
              <span aria-hidden="true" className="h-px w-6 bg-mist" />
              Where We Work
            </p>
            <Heading scale="md" className="mt-5">
              Built for brands ready to move with clarity.
            </Heading>
            <p className="mt-6 max-w-[480px] text-[0.9375rem] leading-[1.7] text-porcelain/70">
              We work with ambitious businesses that understand growth takes
              more than visibility. It takes a clear position, a strong
              identity and a marketing system built to move people from
              attention to action.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-x-8 gap-y-10 wide:gap-x-12">
            {workPrinciples.map((item, i) => (
              <div key={item.num} className="reveal ledger" data-delay={i * 70}>
                <p className="ledger-figure ledger-figure-sm">{item.num}</p>
                <p className="label-sm mt-4 text-porcelain/60">
                  {item.title}
                </p>
                <p className="mt-2 text-[0.8125rem] leading-[1.6] text-porcelain/50">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Band>

      <CtaBand
        title="See if Shario is the right fit for your brand."
        sub="A short call, your current numbers, and an honest answer on where the leverage is."
      >
        <PillLink href={cta.href} tone="solid" size="lg">
          {cta.label}
        </PillLink>
      </CtaBand>
    </>
  );
}
