import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLink,
  CallToAction,
  GridPlate,
  ImagePlate,
  LedgerEntry,
  Plate,
} from "@/components/ui";
import { industries, proof } from "@/lib/site";

export const metadata: Metadata = {
  title: "Work",
  description:
    "The Shario identity applied — stationery, digital and environmental collateral, and the measured outcomes behind the work.",
  alternates: { canonical: "/work" },
};

/*
 * Frames are lifted from the Brand Book itself (p28, stationery) rather than
 * re-shot or approximated. The digital and environmental spreads live on
 * /services and /about, so no single page carries every grid.
 */

const stationery = [
  { src: "/images/book/stat-card.jpg", caption: "Business card" },
  { src: "/images/book/stat-letterhead.jpg", caption: "Letterhead" },
  { src: "/images/book/stat-envelope.jpg", caption: "Envelope" },
  { src: "/images/book/stat-folder.jpg", caption: "Document folder" },
  { src: "/images/book/stat-invoice.jpg", caption: "Invoice" },
  { src: "/images/book/stat-proposal.jpg", caption: "Proposal" },
];


export default function WorkPage() {
  return (
    <>
      <ImagePlate
        src="/images/stair.jpg"
        label="Selected work"
        footnote="Harmony is a discipline, not an accident."
        index="Cover"
        title="Identity, applied."
        standfirst="A brand is only as good as its weakest touchpoint. The identity in print — held, signed, kept."
      />

      <GridPlate
        label="Identity in print"
        footnote="Purpose before decoration."
        index="01 / 03"
        frames={stationery}
      />

      <Plate
        label="The measure"
        footnote="Clarity before expression."
        index="02 / 03"
      >
        <div className="max-w-2xl">
          <p className="label-sm text-carbon-40">Outcomes</p>
          <h2 className="title reveal mt-7 text-[clamp(2rem,4.4vw,3.25rem)]">
            Recognised by clarity, not by volume.
          </h2>
        </div>

        <div className="mt-16 grid gap-x-12 gap-y-16 md:grid-cols-2">
          {proof.map((entry, i) => (
            <LedgerEntry
              key={entry.label}
              figure={entry.figure}
              label={entry.label}
              note={entry.note}
              delay={i * 90}
            />
          ))}
        </div>
      </Plate>

      <Plate
        label="Sectors"
        footnote="Ideas suited to their moment."
        index="03 / 03"
        tone="limestone"
      >
        <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <p className="label-sm text-carbon-60">Sectors</p>
            <h2 className="title reveal mt-7 text-[clamp(2rem,4.4vw,3.25rem)]">
              Eight sectors, one method.
            </h2>
            <p className="reveal mt-8 max-w-sm text-carbon-60" data-delay="120">
              Selected project work is shared on request — much of it sits
              under confidentiality until launch.
            </p>
            <div className="reveal mt-9" data-delay="200">
              <ArrowLink href="/contact">Request the portfolio</ArrowLink>
            </div>
          </div>

          <ul className="grid gap-x-12 sm:grid-cols-2 lg:col-span-7 lg:col-start-6">
            {industries.map((industry, i) => (
              <li key={industry}>
                <Link
                  href={`/contact?sector=${encodeURIComponent(industry)}`}
                  className="reveal title group flex items-baseline justify-between gap-6 border-t border-limestone-deep py-5 text-[clamp(1.25rem,2.2vw,1.7rem)] transition-colors duration-500 hover:text-carbon-60"
                  data-delay={i * 55}
                >
                  {industry}
                  <span
                    aria-hidden="true"
                    className="label shrink-0 self-center opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100 sm:-translate-x-2"
                  >
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Plate>

      <CallToAction
        title="Begin a conversation."
        body="Tell us what the brand needs to become. We will say plainly what we would build."
        action="Let’s connect"
      />
    </>
  );
}
