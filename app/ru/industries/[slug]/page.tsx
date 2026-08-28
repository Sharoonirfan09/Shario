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
import { cta, getIndustry, industries, ogDefaultsRu, site } from "@/lib/site";

/** Every industry page is known at build time, so prerender them. */
export function generateStaticParams() {
  return industries.map((industry) => ({ slug: industry.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/ru/industries/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const industry = getIndustry(slug);
  if (!industry) return {};

  const title = industry.seoTitleRu ?? industry.nameRu;

  return {
    title,
    description: industry.metaDescriptionRu,
    alternates: {
      canonical: `/ru/industries/${industry.slug}`,
      languages: {
        en: `/industries/${industry.slug}`,
        ar: `/ar/industries/${industry.slug}`,
        ru: `/ru/industries/${industry.slug}`,
        "x-default": `/industries/${industry.slug}`,
      },
    },
    openGraph: {
      ...ogDefaultsRu,
      url: `/ru/industries/${industry.slug}`,
      type: "website",
      title: `${title} — ${site.name}`,
      description: industry.metaDescriptionRu,
    },
  };
}

export default async function RussianIndustryPage({
  params,
}: PageProps<"/ru/industries/[slug]">) {
  const { slug } = await params;
  const industry = getIndustry(slug);
  if (!industry) notFound();

  const relatedIndustry = industry.relatedIndustrySlug
    ? getIndustry(industry.relatedIndustrySlug)
    : undefined;

  const breadcrumbItems = [
    { href: "/ru", label: "Главная" },
    { href: "/ru/industries", label: "Отрасли" },
    { label: industry.nameRu },
  ];

  return (
    <>
      <BreadcrumbStructuredData items={breadcrumbItems} />
      <FaqStructuredData items={industry.faqsRu} />
      <IndustryStructuredData industry={industry} locale="ru" />

      <Hero
        src={industry.heroImage}
        alt={`${industry.nameRu} — ${site.name}`}
        eyebrow="Отрасли"
        title={industry.titleRu}
        priority
        breadcrumb={<Breadcrumb items={breadcrumbItems} />}
      />

      {/* Отрасль сегодня */}
      <Band>
        <SectionIntro
          eyebrow="Отрасль"
          title={industry.subheadRu}
          align="left"
          scale="sm"
        />
        <div className="max-w-[760px]">
          <p className="lede reveal mb-10 text-carbon/80">{industry.leadRu}</p>
          <p className="reveal mb-6 text-[1.0625rem] leading-[1.75] text-carbon/75">
            {industry.introRu[0]}
          </p>
          <p className="reveal text-[1.0625rem] leading-[1.75] text-carbon/75">
            {industry.introRu[1]}
          </p>
        </div>
      </Band>

      {/* С кем мы работаем */}
      <Band className="bg-limestone/30">
        <SectionIntro eyebrow="С кем мы работаем" title="Создано для тех, кому это нужно." scale="sm" />
        <DotList items={industry.whoWeWorkWithRu} columns={2} />
      </Band>

      {/* Задачи этой отрасли */}
      <Band>
        <SectionIntro eyebrow="Задачи" title="Что усложняет этот рынок." scale="sm" />
        <CardGrid columns={3}>
          {industry.challengesRu.map((challenge, i) => (
            <Card
              key={challenge.title}
              badge={String(i + 1).padStart(2, "0")}
              title={challenge.title}
              titleAs="h3"
              desc={challenge.desc}
              delay={i * 60}
            />
          ))}
        </CardGrid>
      </Band>

      {/* Где применяются услуги SHARIO */}
      <Band className="bg-limestone/30">
        <SectionIntro
          eyebrow="Где мы помогаем"
          title={`Маркетинговые услуги для отрасли: ${industry.nameRu}.`}
          scale="sm"
        />
        <CardGrid columns={3}>
          {industry.servicesRu.map((item, i) => (
            <Card
              key={item.slug}
              href={`/ru/services/${item.slug}`}
              badge={String(i + 1).padStart(2, "0")}
              title={item.title}
              titleAs="h3"
              desc={item.desc}
              action="Узнать больше"
              delay={i * 60}
            />
          ))}
        </CardGrid>
      </Band>

      {/* Собственная методология для этой отрасли */}
      <Band className="relative overflow-hidden">
        <span
          aria-hidden="true"
          className="wordmark-ar pointer-events-none absolute -top-4 right-4 z-0 w-16 text-carbon/[0.06] wide:right-8 wide:w-20"
        />
        <SectionIntro eyebrow="Подход" title="Как мы будем действовать." scale="sm" />
        <CardGrid columns={industry.approachRu.length > 4 ? 3 : 2}>
          {industry.approachRu.map((step) => (
            <Card
              key={step.step}
              badge={step.step}
              title={step.title}
              titleAs="h3"
              desc={step.desc}
            />
          ))}
        </CardGrid>

        {relatedIndustry && (
          <p className="reveal mt-14 text-[0.9375rem] text-carbon/60">
            Также по теме:{" "}
            <Link
              href={`/ru/industries/${relatedIndustry.slug}`}
              className="border-b border-carbon/30 pb-0.5 text-carbon/80 transition-colors duration-300 hover:border-carbon hover:text-carbon"
            >
              {relatedIndustry.nameRu}
            </Link>
          </p>
        )}
      </Band>

      {/* Часто задаваемые вопросы */}
      <Band className="bg-limestone/30">
        <SectionIntro eyebrow="Вопросы и ответы" title="Отвечаем на главные вопросы." />
        <div className="mx-auto max-w-[880px]">
          <Faq items={industry.faqsRu} answerClassName="font-body" />
        </div>
      </Band>

      <CtaBand
        title={`${industry.ctaTitleRu[0]} ${industry.ctaTitleRu[1]}`}
        sub="Забронируйте бесплатный звонок — мы вернёмся с чётким планом без каких-либо обязательств."
      >
        <PillLink
          href={`${cta.href}?text=${encodeURIComponent(industry.ctaMessageRu)}`}
          tone="solid"
          size="lg"
        >
          {cta.labelRu}
        </PillLink>
      </CtaBand>
    </>
  );
}
