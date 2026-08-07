import type { Metadata } from "next";
import {
  CallToAction,
  Container,
  LedgerEntry,
  PageHeader,
} from "@/components/ui";
import { industries, proof } from "@/lib/site";

export const metadata: Metadata = {
  title: "Results",
  description:
    "AED 35M+ in CRM-attributed revenue, a Marketing Excellence Award, and 40%+ organic traffic growth across real estate and B2B marketing in Dubai and the UAE.",
  alternates: { canonical: "/results" },
};

export default function ResultsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Results"
        title="Results that show up in revenue."
        standfirst="Shario is built on a track record of measurable outcomes across real estate and B2B marketing in Dubai and the UAE."
      />

      {/* The ledger, at full measure */}
      <section className="border-b border-rule">
        <Container className="py-24 md:py-32">
          <p className="label-sm text-carbon-40">The numbers</p>

          <div className="mt-14 grid gap-x-12 gap-y-16 md:grid-cols-2">
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
        </Container>
      </section>

      {/* Industries */}
      <section className="border-b border-rule bg-limestone">
        <Container className="py-24 md:py-32">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-4">
              <p className="label-sm text-carbon-60">Industries we deliver in</p>
              <h2 className="title reveal mt-7 text-[clamp(2rem,4.4vw,3.25rem)]">
                Eight sectors, one method.
              </h2>
            </div>

            <ul className="grid gap-x-12 sm:grid-cols-2 lg:col-span-7 lg:col-start-6">
              {industries.map((industry, i) => (
                <li
                  key={industry}
                  className="reveal title border-t border-limestone-deep py-5 text-[clamp(1.25rem,2.2vw,1.7rem)]"
                  data-delay={i * 55}
                >
                  {industry}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      {/* Why it works */}
      <section className="border-b border-rule">
        <Container className="py-24 md:py-32">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-4">
              <p className="label-sm text-carbon-40">Why it works</p>
            </div>
            <div className="lg:col-span-7 lg:col-start-6">
              <p className="display reveal text-[clamp(1.9rem,4vw,3rem)]">
                Every engagement is run to a founder&apos;s standard and
                measured against revenue.
              </p>
              <p className="lede reveal mt-8 max-w-xl text-carbon-60" data-delay="120">
                That focus is what turns marketing into real growth.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <CallToAction
        title="Want results like these for your brand?"
        body="Book a call and we will show you the path — which channels to press, which to cut, and what the first ninety days should produce."
      />
    </>
  );
}
