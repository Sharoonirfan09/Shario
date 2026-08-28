import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Faq } from "@/components/faq";
import {
  BreadcrumbStructuredData,
  FaqStructuredData,
  IndustryStructuredData,
} from "@/components/structured-data";
import {
  Band,
  Breadcrumb,
  Card,
  CardGrid,
  CtaBand,
  DotList,
  Hero,
  PillLink,
  SectionIntro,
} from "@/components/ui";
import { cta, getIndustry, industries, ogDefaultsAr, site } from "@/lib/site";

/** Every industry page is known at build time, so prerender them. */
export function generateStaticParams() {
  return industries.map((industry) => ({ slug: industry.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/ar/industries/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const industry = getIndustry(slug);
  if (!industry) return {};

  const title = industry.seoTitleAr ?? industry.nameAr;

  return {
    title,
    description: industry.metaDescriptionAr,
    alternates: {
      canonical: `/ar/industries/${industry.slug}`,
      languages: {
        en: `/industries/${industry.slug}`,
        ar: `/ar/industries/${industry.slug}`,
        ru: `/ru/industries/${industry.slug}`,
        "x-default": `/industries/${industry.slug}`,
      },
    },
    openGraph: {
      ...ogDefaultsAr,
      url: `/ar/industries/${industry.slug}`,
      type: "website",
      title: `${title} — ${site.name}`,
      description: industry.metaDescriptionAr,
    },
  };
}

export default async function ArabicIndustryPage({
  params,
}: PageProps<"/ar/industries/[slug]">) {
  const { slug } = await params;
  const industry = getIndustry(slug);
  if (!industry) notFound();

  const relatedIndustry = industry.relatedIndustrySlug
    ? getIndustry(industry.relatedIndustrySlug)
    : undefined;

  const breadcrumbItems = [
    { href: "/ar", label: "الرئيسية" },
    { href: "/ar/industries", label: "القطاعات" },
    { label: industry.nameAr },
  ];

  return (
    <>
      <BreadcrumbStructuredData items={breadcrumbItems} />
      <FaqStructuredData items={industry.faqsAr} />
      <IndustryStructuredData industry={industry} locale="ar" />

      <Hero
        src={industry.heroImage}
        alt=""
        eyebrow="القطاعات"
        title={industry.titleAr}
        priority
        breadcrumb={<Breadcrumb locale="ar" items={breadcrumbItems} />}
      />

      {/* القطاع اليوم */}
      <Band>
        <SectionIntro
          eyebrow="القطاع"
          title={industry.subheadAr}
          align="left"
          scale="sm"
        />
        <div className="max-w-[760px]">
          <p className="lede reveal mb-10 font-arabic text-carbon/80">{industry.leadAr}</p>
          <p className="reveal mb-6 font-arabic text-[1.0625rem] leading-[1.9] text-carbon/75">
            {industry.introAr[0]}
          </p>
          <p className="reveal font-arabic text-[1.0625rem] leading-[1.9] text-carbon/75">
            {industry.introAr[1]}
          </p>
        </div>
      </Band>

      {/* من نعمل معهم */}
      <Band className="bg-limestone/30">
        <SectionIntro eyebrow="من نعمل معهم" title="مبني لمن يحتاجه فعلاً." scale="sm" />
        <DotList items={industry.whoWeWorkWithAr} columns={2} />
      </Band>

      {/* التحديات الخاصة بهذا القطاع */}
      <Band>
        <SectionIntro eyebrow="التحديات" title="ما الذي يجعل هذا السوق صعباً." scale="sm" />
        <CardGrid columns={3}>
          {industry.challengesAr.map((challenge, i) => (
            <Card
              key={challenge.title}
              badge={String(i + 1).padStart(2, "0")}
              title={challenge.title}
              titleAs="h3"
              desc={challenge.desc}
              delay={i * 60}
              locale="ar"
            />
          ))}
        </CardGrid>
      </Band>

      {/* أين تنطبق خدمات شاريو */}
      <Band className="bg-limestone/30">
        <SectionIntro
          eyebrow="أين نساعد"
          title={`خدمات التسويق لـ${industry.nameAr}.`}
          scale="sm"
        />
        <CardGrid columns={3}>
          {industry.servicesAr.map((item, i) => (
            <Card
              key={item.slug}
              href={`/ar/services/${item.slug}`}
              badge={String(i + 1).padStart(2, "0")}
              title={item.title}
              titleAs="h3"
              desc={item.desc}
              action="استكشفوا"
              delay={i * 60}
              locale="ar"
            />
          ))}
        </CardGrid>
      </Band>

      {/* إطار العمل الخاص بهذا القطاع */}
      <Band className="relative overflow-hidden">
        <span
          aria-hidden="true"
          className="wordmark-ar pointer-events-none absolute -top-4 left-4 z-0 w-16 text-carbon/[0.06] wide:left-8 wide:w-20"
        />
        <SectionIntro eyebrow="منهجية العمل" title="كيف سنتعامل مع هذا." scale="sm" />
        <CardGrid columns={industry.approachAr.length > 4 ? 3 : 2}>
          {industry.approachAr.map((step) => (
            <Card
              key={step.step}
              badge={step.step}
              title={step.title}
              titleAs="h3"
              desc={step.desc}
              locale="ar"
            />
          ))}
        </CardGrid>

        {relatedIndustry && (
          <p className="reveal mt-14 font-arabic text-[0.9375rem] text-carbon/60">
            قطاع ذو صلة:{" "}
            <Link
              href={`/ar/industries/${relatedIndustry.slug}`}
              className="border-b border-carbon/30 pb-0.5 font-arabic text-carbon/80 transition-colors duration-300 hover:border-carbon hover:text-carbon"
            >
              {relatedIndustry.nameAr}
            </Link>
          </p>
        )}
      </Band>

      {/* الأسئلة الشائعة */}
      <Band className="bg-limestone/30">
        <SectionIntro eyebrow="الأسئلة الشائعة" title="أسئلة، مُجابة." />
        <div className="mx-auto max-w-[880px]">
          <Faq items={industry.faqsAr} answerClassName="font-arabic" locale="ar" />
        </div>
      </Band>

      <CtaBand
        title={`${industry.ctaTitleAr[0]} ${industry.ctaTitleAr[1]}`}
        sub="احجزوا مكالمة مجانية وسنعود إليكم بخطة واضحة وبلا التزام."
      >
        <PillLink
          href={`${cta.href}?text=${encodeURIComponent(industry.ctaMessageAr)}`}
          tone="solid"
          size="lg"
        >
          {cta.labelAr}
        </PillLink>
      </CtaBand>
    </>
  );
}
