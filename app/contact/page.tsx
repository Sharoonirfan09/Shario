import type { Metadata } from "next";
import { Container, PageHeader } from "@/components/ui";
import { EnquiryForm } from "@/components/enquiry-form";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Book a strategy call with Shario. Fifteen minutes to map where your marketing can win more revenue in Dubai and the UAE.",
  alternates: { canonical: "/contact" },
};

const afterYouReachOut = [
  "We schedule a short call to understand your goals and current numbers.",
  "We map the funnel and identify the highest-leverage wins.",
  "We send a clear proposal with scope, timeline, and expected outcomes.",
];

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Work with Shario"
        title="Begin a conversation."
        standfirst="Whether you are launching a project, scaling lead flow, or improving marketing that should convert better, the first step is a conversation."
      />

      {/* Details and what happens next */}
      <section className="border-b border-rule bg-limestone">
        <Container className="py-20 md:py-24">
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-5">
              <p className="label-sm text-carbon-60">Book a strategy call</p>
              <p className="lede reveal mt-6 max-w-md text-carbon">
                In fifteen minutes we will look at where your marketing can win
                more revenue and outline how Shario would unlock it. It is free,
                focused, and specific to your business.
              </p>

              <dl className="mt-12 space-y-5">
                <div className="border-t border-limestone-deep pt-4">
                  <dt className="label-sm text-carbon-60">Location</dt>
                  <dd className="mt-1.5 text-[1.05rem]">{site.location}</dd>
                </div>
                <div className="border-t border-limestone-deep pt-4">
                  <dt className="label-sm text-carbon-60">Phone</dt>
                  <dd className="mt-1.5 text-[1.05rem]">
                    <a
                      href={`tel:${site.phoneHref}`}
                      className="transition-opacity duration-300 hover:opacity-60"
                    >
                      {site.phone}
                    </a>
                  </dd>
                </div>
                <div className="border-t border-limestone-deep pt-4">
                  <dt className="label-sm text-carbon-60">Email</dt>
                  <dd className="mt-1.5 break-all text-[1.05rem]">
                    <a
                      href={`mailto:${site.email}`}
                      className="transition-opacity duration-300 hover:opacity-60"
                    >
                      {site.email}
                    </a>
                  </dd>
                </div>
                <div className="border-t border-limestone-deep pt-4">
                  <dt className="label-sm text-carbon-60">LinkedIn</dt>
                  <dd className="mt-1.5 text-[1.05rem]">
                    <a
                      href={site.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="break-all transition-opacity duration-300 hover:opacity-60"
                    >
                      {site.linkedinLabel}
                    </a>
                  </dd>
                </div>
              </dl>
            </div>

            <div className="lg:col-span-6 lg:col-start-7">
              <p className="label-sm text-carbon-60">
                What happens after you reach out
              </p>
              <ol className="mt-8">
                {afterYouReachOut.map((step, i) => (
                  <li
                    key={step}
                    className="reveal flex gap-7 border-t border-limestone-deep py-6"
                    data-delay={i * 90}
                  >
                    <span
                      className="label-sm shrink-0 pt-1.5 text-carbon-60"
                      aria-hidden="true"
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p className="text-[1.05rem] leading-relaxed">{step}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </Container>
      </section>

      {/* Enquiry form */}
      <section>
        <Container className="py-24 md:py-32">
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-4">
              <p className="label-sm text-carbon-40">Send an enquiry</p>
              <h2 className="title reveal mt-7 text-[clamp(2rem,4.4vw,3.25rem)]">
                Tell us what you need.
              </h2>
              <p className="mt-6 max-w-sm text-carbon-60">
                Send your details and we will respond within one business day.
              </p>
            </div>

            <div className="lg:col-span-7 lg:col-start-6">
              <EnquiryForm />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
