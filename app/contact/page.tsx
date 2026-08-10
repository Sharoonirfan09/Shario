import type { Metadata } from "next";
import Image from "next/image";
import { Suspense } from "react";
import { EnquiryForm } from "@/components/enquiry-form";
import { Container } from "@/components/ui";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Tell us about your brand — Shario replies within one business day. Dubai, United Arab Emirates.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      {/* Hero — the only page in the set that opens on type rather than a photograph */}
      <Container className="pb-10 pt-14 wide:pb-[60px] wide:pt-20">
        <p className="eyebrow eyebrow-hero text-carbon/60">Contact</p>
        <h1 className="mt-6 max-w-[900px] font-display text-[2.75rem] font-normal leading-[1.05] wide:text-[clamp(3.25rem,6vw,5.25rem)]">
          Let’s compose
          <br />
          something distinctive.
        </h1>
        <p className="mt-7 max-w-[560px] font-body text-lg italic text-carbon/80 wide:text-[1.3125rem]">
          Tell us about your brand — we’ll respond within one business day.
        </p>
      </Container>

      {/* Form + studio details */}
      <Container className="pb-12 wide:pb-[clamp(3.75rem,7vw,6.875rem)]">
        <div className="grid gap-14 wide:grid-cols-[1.3fr_1fr] wide:gap-20">
          {/*
           * The form reads `?sector=` from the URL, so it must be able to
           * suspend. The boundary keeps the rest of this route prerendered.
           */}
          <Suspense fallback={<div className="min-h-[520px]" />}>
            <EnquiryForm />
          </Suspense>

          <div className="flex flex-col gap-8 wide:gap-12">
            <Detail label="Email">
              <a
                href={`mailto:${site.email}`}
                className="font-display text-2xl transition-opacity duration-300 hover:opacity-70"
              >
                {site.email}
              </a>
            </Detail>
            <Detail label="Phone">
              <a
                href={`tel:${site.phoneHref}`}
                className="font-display text-2xl transition-opacity duration-300 hover:opacity-70"
              >
                {site.phone}
              </a>
            </Detail>
            <Detail label="Studio">
              <p className="font-display text-2xl">{site.studio}</p>
            </Detail>
            <Detail label="Follow">
              <div className="flex gap-5">
                <a
                  href={site.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm transition-opacity duration-300 hover:opacity-70"
                >
                  Instagram
                </a>
                <a
                  href={site.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm transition-opacity duration-300 hover:opacity-70"
                >
                  LinkedIn
                </a>
              </div>
            </Detail>
          </div>
        </div>
      </Container>

      {/*
       * Location strip. The handoff leaves this as a map drop-zone; no map
       * asset or embed has been supplied, so the studio exterior stands in and
       * carries the location as a caption.
       */}
      <section className="relative h-[280px] w-full wide:h-[420px]">
        <Image
          src="/images/book/sign-exterior.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-carbon/25" />
        <p className="eyebrow absolute bottom-8 left-6 text-porcelain wide:left-12">
          {site.studio}
        </p>
      </section>
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
      <p className="mb-3.5 text-[11px] uppercase tracking-[0.1em] text-carbon/50">
        {label}
      </p>
      {children}
    </div>
  );
}
