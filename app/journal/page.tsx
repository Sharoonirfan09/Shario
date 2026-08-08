import type { Metadata } from "next";
import { ArrowLink, ImagePlate, Plate } from "@/components/ui";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Journal",
  description:
    "Notes from Shario on brand strategy, identity and the discipline of keeping a brand coherent across every touchpoint.",
  alternates: { canonical: "/journal" },
};

/**
 * No entries have been supplied yet. Rather than invent articles, the page
 * states the position plainly and offers the one action that is real. Replace
 * this plate with the index once the first pieces are written.
 */
export default function JournalPage() {
  return (
    <>
      <ImagePlate
        src="/images/book/photo-book.jpg"
        label="Journal"
        footnote="Nothing said that isn’t needed."
        index="Cover"
        title="Notes on coherence."
        standfirst="Writing on identity, and the discipline of one standard across every touchpoint."
      />

      <Plate
        label="Journal"
        footnote="Nothing said that isn’t needed."
        index="01 / 01"
      >
        <div className="max-w-2xl">
          <p className="label-sm text-carbon-40">In preparation</p>
          <h2 className="title reveal mt-7 text-[clamp(2rem,4.4vw,3.25rem)]">
            The first entries are being written.
          </h2>
          <p className="lede reveal mt-9 text-carbon-60" data-delay="90">
            We would rather publish nothing than filler. When it opens it
            will carry working notes from live engagements — what held, and why.
          </p>
          <div className="reveal mt-10" data-delay="180">
            <ArrowLink href="/contact">Ask to be notified</ArrowLink>
          </div>
        </div>

        <p className="label-sm reveal mt-20 text-carbon-40" data-delay="260">
          {site.tagline}
        </p>
      </Plate>

    </>
  );
}
