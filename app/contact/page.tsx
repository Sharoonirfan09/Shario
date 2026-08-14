import type { Metadata } from "next";
import { Suspense } from "react";
import { EnquiryForm } from "@/components/enquiry-form";
import { SocialIcon } from "@/components/social-icons";
import { Band, Frame, Heading, Hero, SectionIntro } from "@/components/ui";
import { nextSteps, ogDefaults, site, social } from "@/lib/site";

const description =
  "Book a free fifteen-minute strategy call with Shario. Dubai, UAE — we respond within one business day.";

/** Shared with `opengraph-image.tsx` so the banner path is a literal in exactly one file — `check:images` flags any path quoted more than once. */
export const HERO_IMAGE = "/images/travertine-wall.jpg";
export const HERO_IMAGE_ALT = "A travertine wall lit by warm, angled daylight";

export const metadata: Metadata = {
  title: "Contact",
  description,
  alternates: { canonical: "/contact" },
  openGraph: {
    ...ogDefaults,
    url: "/contact",
    type: "website",
    title: "Contact — Shario",
    description,
  },
};

export default function ContactPage() {
  return (
    <>
      {/* `Hero` here carries no visible `title` — every page banner is
          label-only now, Services is the reference. A screen-reader-only H1
          gives the page the one real heading every page needs without
          adding anything to what a sighted visitor sees. Not
          `contact-archway.jpg` for the photograph — this stone-and-shadow
          interior reads architectural and warm without a single literal
          "contact" prop. */}
      <h1 className="sr-only">Contact Shario</h1>
      <Hero
        src={HERO_IMAGE}
        alt={HERO_IMAGE_ALT}
        focus="object-[62%_50%]"
        eyebrow="Contact"
        priority
      />

      {/* Form + details */}
      <Band>
        <div className="grid gap-14 wide:grid-cols-[1.05fr_0.95fr] wide:gap-20">
          <div>
            <p className="eyebrow flex items-center gap-3 text-carbon/55">
              <span aria-hidden="true" className="h-px w-6 bg-mist" />
              Let&rsquo;s Connect
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

          {/* A quiet stairwell in the same limestone-and-shadow register as
              the hero, not a repeat of it — chosen for the same reason the
              hero was: architectural and warm without a literal "contact"
              prop. Its height is what balances this column against the form
              rather than leaving it short and the ground bare beneath it,
              and `.frame`'s existing quiet hover settle (globals.css)
              applies here for free. */}
          <div className="flex flex-col gap-10 wide:border-l wide:border-carbon/15 wide:pl-16">
            <Frame
              src="/images/book/photo-stair.jpg"
              ratio="aspect-[4/5]"
              alt="A quiet limestone stairwell in warm, natural light"
            />
            <div>
              <p className="eyebrow flex items-center gap-3 text-carbon/55">
                <span aria-hidden="true" className="h-px w-6 bg-mist" />
                Reach Us Directly
              </p>
              <div className="mt-6 grid grid-cols-2 gap-x-8 gap-y-8">
                <Detail index="01" label="Email">
                  <a
                    href={`mailto:${site.email}`}
                    className="break-all font-display text-[1.375rem] transition-colors duration-300 hover:text-mist"
                  >
                    {site.email}
                  </a>
                </Detail>
                <Detail index="02" label="Phone">
                  <a
                    href={`tel:${site.phoneHref}`}
                    className="font-display text-[1.375rem] transition-colors duration-300 hover:text-mist"
                  >
                    {site.phone}
                  </a>
                </Detail>
                <Detail index="03" label="Location">
                  <p className="font-display text-[1.375rem]">{site.studio}</p>
                </Detail>
                <Detail index="04" label="Social">
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
                    {social.map((item) => (
                      <a
                        key={item.platform}
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={item.label}
                        className="text-carbon/50 transition-colors duration-300 hover:text-mist"
                      >
                        <span className="block h-[18px] w-[18px]">
                          <SocialIcon platform={item.platform} />
                        </span>
                      </a>
                    ))}
                  </div>
                </Detail>
              </div>
            </div>
          </div>
        </div>
      </Band>

      {/* What happens next — the ledger measure About's "Where We Work" sets
          its principles in (globals.css: figures in the display serif over
          a hairline, no boxes, no shadows), not the boxed Card grid every
          other numbered set on the site uses. A three-step sequence reads
          as one clean editorial rule this way, rather than another row of
          stat cards competing with the ones above and below it. */}
      <Band className="relative overflow-hidden bg-limestone/30">
        {/* Sits low and half-cropped by the section's own bottom edge —
            this is the page's closing content, so the mark reads as a
            quiet sign-off rather than a backdrop behind live copy. */}
        <span
          aria-hidden="true"
          className="wordmark-ar pointer-events-none absolute -bottom-10 left-1/2 z-0 w-[60%] -translate-x-1/2 text-carbon/[0.05] wide:-bottom-16 wide:w-[26%] wide:left-[14%] wide:translate-x-0"
        />
        <div className="relative z-10">
          <SectionIntro
            eyebrow="After You Enquire"
            title="What happens next."
            sub="We respond within one business day."
          />
          <div className="grid gap-y-14 wide:grid-cols-3 wide:gap-x-16 wide:gap-y-0">
            {nextSteps.map((step, i) => (
              <div key={step.num} className="reveal ledger" data-delay={i * 80}>
                <p className="ledger-figure">{step.num}</p>
                <p className="mt-6 font-display text-[1.375rem] font-medium leading-[1.25] text-carbon">
                  {step.title}
                </p>
                <p className="mt-3 max-w-[320px] text-[0.9375rem] leading-[1.65] text-carbon/65">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Band>
    </>
  );
}

/**
 * A refined information block, not a plain label-over-value row — a small
 * serif index alongside the label borrows the ledger numerals About sets its
 * stats in, and turns Mist on hover, the one place this accent shows up
 * outside a link.
 */
function Detail({
  index,
  label,
  children,
}: {
  index: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="group border-t border-carbon/15 pt-5">
      <div className="flex items-baseline justify-between gap-3">
        <p className="label-sm text-carbon/50">{label}</p>
        <span
          aria-hidden="true"
          className="font-display text-[0.75rem] text-carbon/30 transition-colors duration-500 group-hover:text-mist"
        >
          {index}
        </span>
      </div>
      <div className="mt-3">{children}</div>
    </div>
  );
}
