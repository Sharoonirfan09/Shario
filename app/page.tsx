import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLink,
  Button,
  CallToAction,
  Container,
  LedgerEntry,
} from "@/components/ui";
import { industries, proof, services, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Shario — Digital Marketing Company in Dubai",
  description:
    "Shario is a founder-led digital marketing company in Dubai that turns spend into revenue. AED 35M+ in CRM-attributed revenue across real estate and B2B.",
  alternates: { canonical: "/" },
};

/** The four capabilities named on the home page, in the order the brief sets them. */
const homeServices = services.slice(0, 4);

export default function HomePage() {
  return (
    <>
      {/* Hero — the thesis: spend becomes revenue. */}
      <section className="border-b border-rule">
        <Container className="pt-20 pb-16 md:pt-28 md:pb-20">
          <p className="label rise text-carbon-40">
            {site.location} · Founder-led
          </p>

          <div className="mt-14 grid gap-12 lg:grid-cols-12 lg:gap-12">
            <h1
              className="display rise text-balance text-[clamp(2.6rem,6.2vw,5.25rem)] lg:col-span-8"
              style={{ animationDelay: "110ms" }}
            >
              A Dubai digital marketing company that turns spend into{" "}
              <em className="italic">revenue</em>.
            </h1>

            <div
              className="rise flex flex-col justify-end lg:col-span-4"
              style={{ animationDelay: "260ms" }}
            >
              <p className="lede max-w-xl text-carbon-60">
                Shario is a founder-led digital marketing company in Dubai,
                built by an operator who has generated AED 35M+ in tracked
                revenue for real estate and B2B brands. We build marketing
                systems that produce sales.
              </p>
              <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-4">
                <Button href="/contact">Book a strategy call</Button>
                <ArrowLink href="/results">See the results</ArrowLink>
              </div>
            </div>
          </div>
        </Container>

        {/* The hairline that carries the eye into the ledger. */}
        <div className="draw h-px w-full bg-rule" style={{ animationDelay: "620ms" }} />

        {/* Signature: the ledger measure. */}
        <Container className="py-16 md:py-20">
          <div className="grid gap-x-12 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
            {proof.slice(0, 4).map((entry, i) => (
              <LedgerEntry
                key={entry.label}
                figure={entry.figure}
                label={entry.label}
                delay={i * 110}
                size="sm"
              />
            ))}
          </div>
        </Container>
      </section>

      {/* Founder-led */}
      <section className="border-b border-rule bg-limestone">
        <Container className="py-24 md:py-32">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <p className="label-sm text-carbon-60">Founder-led from day one</p>
              <h2 className="title reveal mt-7 text-[clamp(2rem,4.4vw,3.25rem)]">
                Senior thinking on every campaign.
              </h2>
            </div>
            <div className="lg:col-span-6 lg:col-start-7">
              <p className="lede reveal text-carbon" data-delay="90">
                Shario runs on a senior model. Every strategy is set to the
                standard of a founder who has personally built and launched
                full-funnel marketing systems for developer-led projects in
                Dubai. You get senior thinking on every campaign, from a team
                that stays with your account.
              </p>
              <div className="reveal mt-9" data-delay="180">
                <ArrowLink href="/about">About Shario</ArrowLink>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* What we do */}
      <section className="border-b border-rule">
        <Container className="py-24 md:py-32">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4">
              <p className="label-sm text-carbon-40">What we do</p>
              <h2 className="title reveal mt-7 text-[clamp(2rem,4.4vw,3.25rem)]">
                One connected system.
              </h2>
              <p className="reveal mt-7 max-w-sm text-carbon-60" data-delay="90">
                Brand, traffic, conversion and CRM are handled together — never
                as separate campaigns that cannot be measured against each
                other.
              </p>
            </div>

            <div className="lg:col-span-7 lg:col-start-6">
              <ul>
                {homeServices.map((service, i) => (
                  <li key={service.slug}>
                    <Link
                      href={`/services/${service.slug}`}
                      className="reveal group flex flex-col gap-2 border-t border-rule py-8 transition-colors duration-500 hover:bg-limestone/40 sm:flex-row sm:items-baseline sm:gap-10"
                      data-delay={i * 80}
                    >
                      <h3 className="title shrink-0 text-[1.5rem] sm:w-[13rem]">
                        {service.name}
                      </h3>
                      <p className="text-carbon-60">{service.summary}</p>
                      <span
                        aria-hidden="true"
                        className="label hidden shrink-0 self-center text-carbon-40 transition-transform duration-500 group-hover:translate-x-1.5 sm:block"
                      >
                        →
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="reveal mt-10 border-t border-rule pt-8">
                <ArrowLink href="/services">All services</ArrowLink>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Proof, in full */}
      <section className="border-b border-rule">
        <Container className="py-24 md:py-32">
          <div className="max-w-2xl">
            <p className="label-sm text-carbon-40">Proof over promises</p>
            <h2 className="title reveal mt-7 text-[clamp(2rem,4.4vw,3.25rem)]">
              Measured in revenue, not impressions.
            </h2>
          </div>

          <div className="mt-16 grid gap-x-12 gap-y-14 sm:grid-cols-2">
            {proof.slice(0, 4).map((entry, i) => (
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

      {/* Who we work with */}
      <section className="border-b border-rule bg-limestone">
        <Container className="py-24 md:py-32">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4">
              <p className="label-sm text-carbon-60">Who we work with</p>
              <h2 className="title reveal mt-7 text-[clamp(2rem,4.4vw,3.25rem)]">
                Across Dubai and the wider UAE.
              </h2>
            </div>
            <ul className="lg:col-span-7 lg:col-start-6">
              {industries.slice(0, 7).map((industry, i) => (
                <li
                  key={industry}
                  className="reveal title border-t border-limestone-deep py-5 text-[clamp(1.35rem,2.6vw,1.9rem)]"
                  data-delay={i * 60}
                >
                  {industry}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      <CallToAction
        title="Book a strategy call."
        body="In fifteen minutes we will map where your marketing can win more revenue and how to unlock it."
      />
    </>
  );
}
