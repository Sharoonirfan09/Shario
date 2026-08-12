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
  StatBand,
} from "@/components/ui";
import { cta, founderLed, site, stats } from "@/lib/site";

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
        src="/images/book/corridor-dusk.jpg"
        focus="object-[50%_55%]"
        eyebrow="About Shario"
        title="Built by an operator who has carried a revenue number."
        subhead="Brands in Dubai deserve marketing that delivers real results, measured in revenue. Shario exists to deliver exactly that."
        priority
      >
        <PillLink href={cta.href} tone="solidLight">
          {cta.label}
        </PillLink>
      </Hero>

      {/* The founder */}
      <Band>
        <div className="grid items-center gap-12 wide:grid-cols-[1fr_1.05fr] wide:gap-20">
          {/* Not `photo-lounge.jpg` — it has the retired positioning statement
              painted across the back wall. */}
          <Frame src="/images/book/photo-shelf.jpg" ratio="aspect-[4/5]" />
          <div>
            <p className="eyebrow flex items-center gap-3 text-carbon/55">
              <span aria-hidden="true" className="h-px w-6 bg-mist" />
              The Founder
            </p>
            <Heading scale="md" className="mt-5">
              {site.founder}
            </Heading>
            <p className="reveal mt-6 max-w-[560px] text-[1.0625rem] leading-[1.7] text-carbon/75">
              A performance marketer and digital growth strategist with{" "}
              {site.experience} of experience building revenue-focused marketing
              across Dubai&rsquo;s real estate, hospitality and B2B sectors.
            </p>
            <p
              className="reveal mt-4 max-w-[560px] text-[1.0625rem] leading-[1.7] text-carbon/75"
              data-delay="90"
            >
              Before founding Shario, he led marketing for developer-led real
              estate launches and generated {site.revenue} in CRM-attributed
              sales, earning a Marketing Excellence Award for campaign ROI. That
              operator background shapes everything Shario does — strategy here
              is written by someone who has carried a revenue target and
              delivered on it.
            </p>
            <div
              className="reveal mt-9 flex flex-wrap items-center gap-6"
              data-delay="160"
            >
              <div>
                <p className="font-display text-xl">{site.founder}</p>
                <p className="mt-1 text-[0.8125rem] text-carbon/60">
                  {site.founderRole}
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

      <StatBand
        eyebrow="Where We Work"
        title="Dubai is the hardest auction in the region."
        body="Competing here means going up against agencies with larger budgets and developers running their own in-house teams. The only durable advantage is knowing precisely what a lead is worth and refusing to pay more than that for it."
        stats={stats}
      />

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
