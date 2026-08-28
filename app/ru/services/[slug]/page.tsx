import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Faq } from "@/components/faq";
import {
  BreadcrumbStructuredData,
  FaqStructuredData,
  ServiceStructuredData,
} from "@/components/structured-data";
import {
  Band,
  Breadcrumb,
  Card,
  CardGrid,
  CtaBand,
  DotList,
  Figure,
  Heading,
  Hero,
  PillLink,
  SectionIntro,
} from "@/components/ui";
import {
  cta,
  getInsightArticle,
  getService,
  ogDefaultsRu,
  services,
  site,
} from "@/lib/site";

/** Every service page is known at build time, so prerender them. */
export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/ru/services/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};

  const title = service.seoTitleRu ?? service.nameRu;

  return {
    title,
    description: service.metaDescriptionRu,
    alternates: {
      canonical: `/ru/services/${service.slug}`,
      languages: {
        en: `/services/${service.slug}`,
        ar: `/ar/services/${service.slug}`,
        ru: `/ru/services/${service.slug}`,
        "x-default": `/services/${service.slug}`,
      },
    },
    openGraph: {
      ...ogDefaultsRu,
      url: `/ru/services/${service.slug}`,
      type: "website",
      title: `${title} — ${site.name}`,
      description: service.metaDescriptionRu,
    },
  };
}

export default async function RussianServicePage({
  params,
}: PageProps<"/ru/services/[slug]">) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const related = services.filter((s) => s.slug !== service.slug).slice(0, 3);
  const relatedInsight = service.relatedInsightSlug
    ? getInsightArticle(service.relatedInsightSlug)
    : undefined;

  const breadcrumbItems = [
    { href: "/ru", label: "Главная" },
    { href: "/ru/services", label: "Услуги" },
    { label: service.nameRu },
  ];

  return (
    <>
      <BreadcrumbStructuredData items={breadcrumbItems} />
      <FaqStructuredData items={service.faqsRu} />
      <ServiceStructuredData service={service} locale="ru" />

      <Hero
        src={service.heroImage}
        alt={`${service.nameRu} в Дубае — ${site.name}`}
        eyebrow={service.categoryRu}
        title={service.titleRu}
        priority
        breadcrumb={<Breadcrumb locale="ru" items={breadcrumbItems} />}
      />

      {/* What you get */}
      <Band>
        <SectionIntro
          eyebrow="Что вы получите"
          title={`Как мы реализуем ${service.nameRu}.`}
          sub={service.subheadRu}
        />
        <CardGrid columns={4}>
          {service.benefitsRu.map((benefit, i) => (
            <Card
              key={benefit.title}
              badge={String(i + 1).padStart(2, "0")}
              title={benefit.title}
              titleAs="h3"
              desc={benefit.desc}
              delay={i * 60}
              locale="ru"
            />
          ))}
        </CardGrid>
      </Band>

      {/* Scope and deliverables */}
      <Band className="bg-limestone/30">
        <div className="mb-14 grid gap-8 wide:mb-20 wide:grid-cols-2 wide:gap-10">
          {service.images.map((image) => (
            <Figure
              key={image.src}
              src={image.src}
              ratio="aspect-[2/3]"
              label={image.labelRu}
              caption={image.captionRu}
              sizes="(min-width: 880px) 46vw, 100vw"
            />
          ))}
        </div>
        <p className="lede reveal mb-12 max-w-[760px] text-carbon/80 wide:mb-14">
          {service.leadRu}
        </p>
        <div className="grid gap-14 wide:grid-cols-2 wide:gap-20">
          <div>
            <p className="eyebrow flex items-center gap-3 text-carbon/55">
              <span aria-hidden="true" className="h-px w-6 bg-mist" />
              Работа
            </p>
            <Heading scale="sm" className="mb-8 mt-5">
              Что мы делаем.
            </Heading>
            <DotList items={service.whatWeDoRu} columns={1} />
          </div>
          <div>
            <p className="eyebrow flex items-center gap-3 text-carbon/55">
              <span aria-hidden="true" className="h-px w-6 bg-mist" />
              Результаты
            </p>
            <Heading scale="sm" className="mb-8 mt-5">
              Что вы получаете.
            </Heading>
            <DotList items={service.deliverablesRu} columns={1} accent={false} />
          </div>
        </div>

        {relatedInsight && (
          <p className="reveal mt-14 text-[0.9375rem] text-carbon/60">
            Читайте также:{" "}
            <Link
              href={`/ru/insights/${relatedInsight.slug}`}
              className="border-b border-carbon/30 pb-0.5 text-carbon/80 transition-colors duration-300 hover:border-carbon hover:text-carbon"
            >
              {relatedInsight.titleRu}
            </Link>
          </p>
        )}
      </Band>

      {/* Where this shows up — named sub-services, absent on the narrower
          pages where whatWeDo/benefits already cover the ground. */}
      {service.subServicesRu && (
        <Band>
          <SectionIntro
            eyebrow="Где это проявляется"
            title="Внутри работы."
            scale="sm"
          />
          <CardGrid columns={service.subServicesRu.length > 4 ? 3 : 2}>
            {service.subServicesRu.map((item) => (
              <Card
                key={item.title}
                title={item.title}
                titleAs="h3"
                desc={item.desc}
                locale="ru"
              />
            ))}
          </CardGrid>
        </Band>
      )}

      {/* Related services */}
      <Band className="relative overflow-hidden">
        <span
          aria-hidden="true"
          className="wordmark-ar pointer-events-none absolute -top-4 right-4 z-0 w-16 text-carbon/[0.06] wide:right-8 wide:w-20"
        />
        <SectionIntro
          eyebrow="Смотрите также"
          title="Похожие услуги."
          align="left"
          scale="sm"
        />
        <CardGrid columns={3}>
          {related.map((item, i) => (
            <Card
              key={item.slug}
              href={`/ru/services/${item.slug}`}
              badge={item.num}
              title={item.nameRu}
              titleAs="h3"
              desc={item.descriptorRu}
              action="Подробнее"
              delay={i * 60}
              locale="ru"
            />
          ))}
        </CardGrid>
      </Band>

      {/* FAQ — this service's own four questions, matching FaqStructuredData above */}
      <Band className="bg-limestone/30">
        <SectionIntro eyebrow="FAQ" title="Вопросы и ответы." />
        <div className="mx-auto max-w-[880px]">
          <Faq
            items={service.faqsRu}
            answerClassName="font-body"
            locale="ru"
          />
        </div>
      </Band>

      <CtaBand
        title={`${service.ctaTitleRu[0]} ${service.ctaTitleRu[1]}`}
        sub="Забронируйте бесплатный звонок, и мы вернёмся к вам с чётким планом без каких-либо обязательств."
      >
        <PillLink
          href={`${cta.href}?text=${encodeURIComponent(`Здравствуйте, меня интересует услуга «${service.nameRu}».`)}`}
          tone="solid"
          size="lg"
        >
          {cta.labelRu}
        </PillLink>
      </CtaBand>
    </>
  );
}
