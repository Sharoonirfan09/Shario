import type { Metadata } from "next";
import { Suspense } from "react";
import { EnquiryForm } from "@/components/enquiry-form";
import { ObfuscatedEmail } from "@/components/obfuscated-email";
import { SocialIcon } from "@/components/social-icons";
import { Band, Frame, Heading, Hero, SectionIntro } from "@/components/ui";
import { heroImages, nextSteps, ogDefaultsAr, sharedImages, site, social } from "@/lib/site";

const descriptionAr =
  "احجزوا مكالمة استراتيجية مجانية مدتها خمس عشرة دقيقة مع شاريو. دبي، الإمارات — نرد خلال يوم عمل واحد.";

const HERO_IMAGE = heroImages.contact.src;
const HERO_IMAGE_ALT = "جدار من الترافرتين مضاء بضوء نهار دافئ ومائل";

export const metadata: Metadata = {
  title: "تواصل",
  description: descriptionAr,
  alternates: {
    canonical: "/ar/contact",
    languages: { en: "/contact", ar: "/ar/contact", ru: "/ru/contact", "x-default": "/contact" },
  },
  openGraph: {
    ...ogDefaultsAr,
    url: "/ar/contact",
    type: "website",
    title: "تواصل — شاريو",
    description: descriptionAr,
  },
};

export default function ArabicContactPage() {
  return (
    <>
      <h1 className="sr-only">تواصلوا مع شاريو</h1>
      <Hero
        src={HERO_IMAGE}
        alt={HERO_IMAGE_ALT}
        focus="object-[62%_50%]"
        eyebrow="تواصل"
        priority
      />

      {/* Form + details */}
      <Band>
        <div className="grid gap-14 wide:grid-cols-[1.05fr_0.95fr] wide:gap-20">
          <div>
            <p className="eyebrow flex items-center gap-3 text-carbon/55">
              <span aria-hidden="true" className="h-px w-6 bg-mist" />
              لنتواصل
            </p>
            <Heading scale="sm" className="mt-5">
              خمس عشرة دقيقة، مجاناً.
            </Heading>
            <p className="mb-10 mt-5 max-w-[520px] text-[1.0625rem] leading-[1.7] text-carbon/75">
              سننظر في أين يمكن لتسويقكم كسب المزيد من الإيرادات، ونوضح كيف
              ستحقق شاريو ذلك. بتركيز يخص عملكم تحديداً.
            </p>
            <Suspense fallback={<div className="min-h-[520px]" />}>
              <EnquiryForm locale="ar" />
            </Suspense>
          </div>

          <div className="flex flex-col gap-10 wide:border-r wide:border-carbon/15 wide:pr-16">
            <Frame
              src={sharedImages.contactStair}
              ratio="aspect-[4/5]"
              alt="درج من الحجر الجيري الهادئ بإضاءة طبيعية دافئة"
            />
            <div>
              <p className="eyebrow flex items-center gap-3 text-carbon/55">
                <span aria-hidden="true" className="h-px w-6 bg-mist" />
                تواصلوا معنا مباشرة
              </p>
              <div className="mt-6 grid grid-cols-2 gap-x-8 gap-y-8">
                <Detail index="01" label="البريد الإلكتروني">
                  <ObfuscatedEmail
                    user={site.emailUser}
                    domain={site.emailDomain}
                    dir="ltr"
                    className="break-all font-display text-[1.375rem] transition-colors duration-300 hover:text-mist"
                  />
                </Detail>
                <Detail index="02" label="الهاتف">
                  <a
                    href={`tel:${site.phoneHref}`}
                    dir="ltr"
                    className="font-display text-[1.375rem] transition-colors duration-300 hover:text-mist"
                  >
                    {site.phone}
                  </a>
                </Detail>
                <Detail index="03" label="واتساب">
                  <a
                    href={site.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-display text-[1.375rem] transition-colors duration-300 hover:text-mist"
                  >
                    راسلونا
                  </a>
                </Detail>
                <Detail index="04" label="الموقع">
                  <p className="font-arabic text-[1.375rem] font-bold">{site.locationAr}</p>
                </Detail>
                <Detail index="05" label="التواصل الاجتماعي">
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

      {/* What happens next */}
      <Band className="relative overflow-hidden bg-limestone/30">
        <span
          aria-hidden="true"
          className="wordmark-ar pointer-events-none absolute -bottom-10 left-1/2 z-0 w-[60%] -translate-x-1/2 text-carbon/[0.05] wide:-bottom-16 wide:left-[14%] wide:w-[26%] wide:translate-x-0"
        />
        <div className="relative z-10">
          <SectionIntro
            eyebrow="بعد أن تستفسروا"
            title="ماذا يحدث بعد ذلك."
            sub="نرد خلال يوم عمل واحد."
          />
          <div className="grid gap-y-14 wide:grid-cols-3 wide:gap-x-16 wide:gap-y-0">
            {nextSteps.map((step, i) => (
              <div key={step.num} className="reveal ledger" data-delay={i * 80}>
                <p className="ledger-figure">{step.num}</p>
                <p className="mt-6 font-arabic text-[1.375rem] font-bold leading-[1.25] text-carbon">
                  {step.titleAr}
                </p>
                <p className="mt-3 max-w-[320px] text-[0.9375rem] leading-[1.65] text-carbon/65">
                  {step.descAr}
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
        <p className="font-arabic text-[0.8125rem] text-carbon/50">{label}</p>
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
