import type { Metadata } from "next";
import { Suspense } from "react";
import { ImagePlate, Plate } from "@/components/ui";
import { EnquiryForm } from "@/components/enquiry-form";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Begin a conversation with Shario — a boutique creative studio in Dubai composing coherent brand identities.",
  alternates: { canonical: "/contact" },
};

const afterYouReachOut = [
  "We schedule a short call to understand the brand and what it needs to become.",
  "We audit the identity as it stands and mark where it fragments.",
  "We send a clear proposal with scope, timeline and expected outcomes.",
];

export default function ContactPage() {
  return (
    <>
      <ImagePlate
        src="/images/corridor.jpg"
        label="Work with Shario"
        footnote="One vision. Every touchpoint."
        index="Cover"
        title="Begin a conversation."
        standfirst="Building an identity, correcting one that has drifted, or composing the digital experience around it — it starts with a conversation."
      />

      {/* Details and what happens next */}
      <Plate
        label="Get in touch"
        footnote="One vision. Every touchpoint."
        index="01 / 02"
        tone="limestone"
      >
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-5">
              <p className="label-sm text-carbon-60">Begin a conversation</p>
              <p className="lede reveal mt-6 max-w-md text-carbon">
                Bring the brand as it stands. We will show you where the
                coherence breaks, and what it takes to hold it.
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
      </Plate>

      {/* Enquiry form */}
      <Plate
        label="Enquiry"
        footnote="We respond within one business day."
        index="02 / 02"
      >
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
              <Suspense fallback={null}>
                <EnquiryForm />
              </Suspense>
            </div>
          </div>
      </Plate>
    </>
  );
}
