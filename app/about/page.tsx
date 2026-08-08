import type { Metadata } from "next";
import Image from "next/image";
import { CallToAction, GridPlate, ImagePlate, Plate } from "@/components/ui";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "Shario is a boutique creative studio in Dubai, founded by Sharoon Irfan to unify strategy, design, communication and technology into one coherent brand system.",
  alternates: { canonical: "/about" },
};

/** What founder-led means — qualities, not a sequence, so no numbering. */
const principles = [
  {
    title: "Senior ownership",
    body: "Every engagement is run to a founder’s standard and stays in senior hands.",
  },
  {
    title: "Accountability",
    body: "We align on what the brand must achieve, not on output volume.",
  },
  {
    title: "Whole-system thinking",
    body: "Strategy, design, communication and technology are handled as one connected system.",
  },
  {
    title: "Direct access",
    body: "You talk to the people composing the work.",
  },
];

/** How we work — an actual ordered process, which is what earns the numbering. */
const process = [
  {
    title: "We start with meaning",
    body: "What the brand stands for, who it is for, and where it sits against everyone else.",
  },
  {
    title: "We build the system",
    body: "Identity, language and digital surfaces designed as one set of rules.",
  },
  {
    title: "We document the standard",
    body: "Guidelines precise enough that the identity survives every team that uses it.",
  },
  {
    title: "We hold it in place",
    body: "Every new touchpoint is composed against the system, not alongside it.",
  },
];

/** Brand Book p30 — the identity in place. */
const environments = [
  { src: "/images/book/sign-exterior.jpg", caption: "Exterior signage" },
  { src: "/images/book/sign-glass.jpg", caption: "Glass door" },
  { src: "/images/book/reception-wall.jpg", caption: "Reception wall" },
  { src: "/images/book/sign-tablet.jpg", caption: "In room" },
];

export default function AboutPage() {
  return (
    <>
      <ImagePlate
        src="/images/book/photo-lounge.jpg"
        label="About the studio"
        footnote="A Symphony of Identity."
        index="Cover"
        title="To make identity coherent, distinctive and meaningful."
        standfirst="Unifying the fragmented pieces of a brand into one legible, purposeful system."
      />

      {/* The founder */}
      <Plate
        label="The founder"
        footnote="A Symphony of Identity."
        index="01 / 04"
      >
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-4">
              <p className="label-sm text-carbon-40">The name</p>
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
              <p className="title mt-8 text-[1.75rem]">{site.tagline}</p>
              <p className="label-sm mt-3 text-carbon-40" dir="rtl" lang="ar">
                {site.taglineAr}
              </p>
            </div>

            <div className="lg:col-span-7 lg:col-start-6">
              <p className="lede reveal text-carbon">
                <strong className="font-normal">Shar</strong> — from Sharoon.
                Founder-led vision, creative ownership, individual direction.
              </p>
              <p className="lede reveal mt-7 text-carbon" data-delay="90">
                <strong className="font-normal">io</strong> — input and output.
                The exchange that turns ideas into results.
              </p>
              <p className="reveal mt-9 text-carbon-60" data-delay="150">
                Together: where ideas enter, creativity intervenes, and
                distinctive identities emerge.
              </p>
              <p className="reveal mt-7 text-carbon-60" data-delay="210">
                Led by {site.founder} — AED 35M+ in CRM-attributed sales and
                a Marketing Excellence Award behind him. Growth is part of the
                brand system here, not an afterthought.
              </p>
            </div>
          </div>
      </Plate>

      {/* What founder-led means for you */}
      <Plate
        label="Commitments"
        footnote="The same standard, everywhere."
        index="02 / 04"
        tone="limestone"
      >
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="frame reveal relative aspect-[3/2] sm:aspect-[3/4] lg:col-span-4">
              <Image
                src="/images/pedestal.jpg"
                alt=""
                fill
                sizes="(min-width: 1024px) 30vw, 100vw"
                className="object-cover"
              />
            </div>

            <div className="lg:col-span-7 lg:col-start-6">
              <p className="label-sm text-carbon-60">
                What independence means for you
              </p>
              <h2 className="title reveal mt-7 text-[clamp(2rem,4.4vw,3.25rem)]">
                Four commitments, on every engagement.
              </h2>

              <div className="mt-14 grid gap-x-12 gap-y-12 sm:grid-cols-2">
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
            </div>
          </div>
      </Plate>

      {/* How we work — numbered, because the order is the point */}
      <GridPlate
        label="Brand collateral"
        footnote="Minimal and realistic in every context."
        index="03 / 04"
        columns={4}
        frames={environments}
      />

      <Plate label="Method" footnote="A sequence, not a menu." index="04 / 04">
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
      </Plate>

      <CallToAction
        title="See if Shario is the right fit for your brand."
        body="No pitch deck — just the brand as it stands, and where the coherence breaks."
        action="Let’s connect"
      />
    </>
  );
}
