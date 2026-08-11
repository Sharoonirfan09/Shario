import type { Metadata } from "next";
import { Suspense } from "react";
import { EnquiryForm } from "@/components/enquiry-form";
import {
  Band,
  Card,
  CardGrid,
  Figure,
  Heading,
  PillLink,
  SectionIntro,
  TypeHero,
} from "@/components/ui";
import { nextSteps, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Book a free fifteen-minute strategy call with Shario. Dubai, UAE — we respond within one business day.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <TypeHero
        tone="carbon"
        eyebrow="Contact"
        title="Work with Shario."
        subhead="Whether you are launching a project, scaling lead flow, or improving marketing that should convert better — the first step is a conversation."
      >
        <PillLink href={`tel:${site.phoneHref}`} tone="solidLight">
          Call {site.phone}
        </PillLink>
      </TypeHero>

      {/* Form + details */}
      <Band>
        <div className="grid gap-14 wide:grid-cols-[1.3fr_1fr] wide:gap-20">
          <div>
            <p className="eyebrow flex items-center gap-3 text-carbon/55">
              <span aria-hidden="true" className="h-px w-6 bg-mist" />
              Book a Strategy Call
            </p>
            <Heading scale="sm" className="mt-5">
              Fifteen minutes, free.
            </Heading>
            <p className="mb-10 mt-5 max-w-[520px] text-[1.0625rem] leading-[1.7] text-carbon/75">
              We will look at where your marketing can win more revenue and
              outline how Shario would unlock it. Focused and specific to your
              business.
            </p>
            {/*
             * The form reads `?service=` from the URL, so it must be able to
             * suspend. The boundary keeps the rest of this route prerendered.
             */}
            <Suspense fallback={<div className="min-h-[520px]" />}>
              <EnquiryForm />
            </Suspense>
          </div>

          <div className="flex flex-col gap-8 border-carbon/15 wide:gap-10 wide:border-l wide:pl-16">
            <Figure
              src="/images/book/stat-envelope.jpg"
              label="One business day"
              caption="Enquiries are answered by the person who would run the account, not by a form autoresponder."
              ratio="aspect-[4/3]"
              sizes="(min-width: 880px) 32vw, 100vw"
            />
            <Detail label="Email">
              <a
                href={`mailto:${site.email}`}
                className="break-all font-display text-[1.5rem] transition-opacity duration-300 hover:opacity-70"
              >
                {site.email}
              </a>
            </Detail>
            <Detail label="Phone">
              <a
                href={`tel:${site.phoneHref}`}
                className="font-display text-[1.5rem] transition-opacity duration-300 hover:opacity-70"
              >
                {site.phone}
              </a>
            </Detail>
            <Detail label="Location">
              <p className="font-display text-[1.5rem]">{site.studio}</p>
            </Detail>
            <Detail label="LinkedIn">
              <a
                href={site.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm transition-opacity duration-300 hover:opacity-70"
              >
                linkedin.com/in/sharoonirfan
              </a>
            </Detail>
          </div>
        </div>
      </Band>

      {/* What happens next */}
      <Band className="bg-limestone/30">
        <SectionIntro
          eyebrow="After You Enquire"
          title="What happens next."
          sub="We respond within one business day."
        />
        <CardGrid columns={3}>
          {nextSteps.map((step, i) => (
            <Card
              key={step.num}
              badge={step.num}
              title={step.title}
              titleAs="h3"
              desc={step.desc}
              delay={i * 60}
            />
          ))}
        </CardGrid>
      </Band>

    </>
  );
}

function Detail({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <p className="label-sm mb-3 text-carbon/50">{label}</p>
      {children}
    </div>
  );
}
