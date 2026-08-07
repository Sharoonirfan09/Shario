import type { Metadata } from "next";
import Image from "next/image";
import { CallToAction, Container, PageHeader } from "@/components/ui";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "Shario was built by Sharoon Irfan, a performance marketer with 6+ years across Dubai real estate, hospitality and B2B, and AED 35M+ in CRM-attributed sales.",
  alternates: { canonical: "/about" },
};

/** What founder-led means — qualities, not a sequence, so no numbering. */
const principles = [
  {
    title: "Senior ownership",
    body: "Your account is run to a founder's standard and stays in senior hands.",
  },
  {
    title: "Revenue accountability",
    body: "We align on pipeline and closed sales, the metrics that matter.",
  },
  {
    title: "Full-funnel thinking",
    body: "Brand, traffic, conversion, and CRM are handled as one connected system.",
  },
  {
    title: "Direct access",
    body: "You talk to the people building your campaigns.",
  },
];

/** How we work — an actual ordered process, which is what earns the numbering. */
const process = [
  {
    title: "We start with your numbers",
    body: "Including cost per lead, close rate, and revenue per channel.",
  },
  {
    title: "We build the system",
    body: "With ads, SEO, website, and CRM working together.",
  },
  {
    title: "We track everything",
    body: "So every campaign ties back to attributable revenue.",
  },
  {
    title: "We optimize relentlessly",
    body: "Every week, against the metrics that move money.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About Shario"
        title="Built by an operator who has carried a revenue number."
        standfirst="Shario was founded on a simple belief. Brands in Dubai deserve marketing that delivers real results, measured in revenue. Sharoon Irfan built Shario to deliver exactly that."
      />

      {/* The founder */}
      <section className="border-b border-rule">
        <Container className="py-24 md:py-32">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-4">
              <p className="label-sm text-carbon-40">The founder</p>
              <div className="reveal mt-9 max-w-[200px]">
                {/* The S monogram, used here as a portrait-slot placeholder
                    until a photograph of the founder is supplied. */}
                <Image
                  src="/brand/monogram.png"
                  alt=""
                  width={397}
                  height={772}
                  className="h-auto w-[86px] opacity-90"
                />
              </div>
              <p className="title mt-8 text-[1.75rem]">{site.founder}</p>
              <p className="label-sm mt-3 text-carbon-40">
                Founder · Performance marketer
              </p>
            </div>

            <div className="lg:col-span-7 lg:col-start-6">
              <p className="lede reveal text-carbon">
                Sharoon Irfan is a performance marketer and digital growth
                strategist with 6+ years of experience building revenue-focused
                marketing across Dubai&apos;s real estate, hospitality, and B2B
                sectors.
              </p>
              <p className="reveal mt-7 text-carbon-60" data-delay="90">
                Before founding Shario, Sharoon led marketing for developer-led
                real estate launches and generated AED 35M+ in CRM-attributed
                sales, earning a Marketing Excellence Award for campaign ROI.
              </p>
              <p className="reveal mt-7 text-carbon-60" data-delay="150">
                That operator background shapes everything Shario does. Strategy
                is written by someone who has carried a revenue target and
                delivered on it.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* What founder-led means for you */}
      <section className="border-b border-rule bg-limestone">
        <Container className="py-24 md:py-32">
          <div className="max-w-2xl">
            <p className="label-sm text-carbon-60">
              What founder-led means for you
            </p>
            <h2 className="title reveal mt-7 text-[clamp(2rem,4.4vw,3.25rem)]">
              Four commitments, on every account.
            </h2>
          </div>

          <div className="mt-16 grid gap-x-12 gap-y-12 sm:grid-cols-2">
            {principles.map((item, i) => (
              <div
                key={item.title}
                className="reveal border-t border-limestone-deep pt-7"
                data-delay={i * 90}
              >
                <h3 className="title text-[1.65rem]">{item.title}</h3>
                <p className="mt-3 max-w-md text-carbon-60">{item.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* How we work — numbered, because the order is the point */}
      <section className="border-b border-rule">
        <Container className="py-24 md:py-32">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-4">
              <p className="label-sm text-carbon-40">How we work</p>
              <h2 className="title reveal mt-7 text-[clamp(2rem,4.4vw,3.25rem)]">
                A sequence, not a menu.
              </h2>
            </div>

            <ol className="lg:col-span-7 lg:col-start-6">
              {process.map((step, i) => (
                <li
                  key={step.title}
                  className="reveal flex gap-8 border-t border-rule py-8"
                  data-delay={i * 90}
                >
                  <span
                    className="label-sm shrink-0 pt-2 text-carbon-40"
                    aria-hidden="true"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="title text-[1.65rem]">{step.title}</h3>
                    <p className="mt-2 text-carbon-60">{step.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </Container>
      </section>

      <CallToAction
        title="See if Shario is the right fit for your brand."
        body="A short call is the fastest way to find out. No pitch deck, just your numbers and where the leverage is."
        action="Book a call"
      />
    </>
  );
}
