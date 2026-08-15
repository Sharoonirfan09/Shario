import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Faq } from "@/components/faq";
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
import { cta, getService, homeFaqs, ogDefaultsAr, services, site } from "@/lib/site";

/** Every service page is known at build time, so prerender them. */
export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/ar/services/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};

  return {
    title: service.nameAr,
    description: service.metaDescriptionAr,
    alternates: {
      canonical: `/ar/services/${service.slug}`,
      languages: {
        en: `/services/${service.slug}`,
        ar: `/ar/services/${service.slug}`,
        "x-default": `/services/${service.slug}`,
      },
    },
    openGraph: {
      ...ogDefaultsAr,
      url: `/ar/services/${service.slug}`,
      type: "website",
      title: `${service.nameAr} — ${site.name}`,
      description: service.metaDescriptionAr,
    },
  };
}

export default async function ArabicServicePage({
  params,
}: PageProps<"/ar/services/[slug]">) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const related = services.filter((s) => s.slug !== service.slug).slice(0, 3);

  return (
    <>
      <Hero
        src={service.heroImage}
        alt={`${service.nameAr} — ${site.name}`}
        eyebrow={service.categoryAr}
        title={service.titleAr}
        priority
        breadcrumb={
          <Breadcrumb
            locale="ar"
            items={[
              { href: "/ar", label: "الرئيسية" },
              { href: "/ar/services", label: "الخدمات" },
              { label: service.nameAr },
            ]}
          />
        }
      />

      {/* What you get */}
      <Band>
        <SectionIntro
          eyebrow="ما الذي ستحصلون عليه"
          title={`كيف نقدّم ${service.nameAr}.`}
          sub={service.subheadAr}
        />
        <CardGrid columns={4}>
          {service.benefitsAr.map((benefit, i) => (
            <Card
              key={benefit.title}
              badge={String(i + 1).padStart(2, "0")}
              title={benefit.title}
              titleAs="h3"
              desc={benefit.desc}
              delay={i * 60}
              locale="ar"
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
              label={image.labelAr}
              caption={image.captionAr}
              sizes="(min-width: 880px) 46vw, 100vw"
            />
          ))}
        </div>
        <p className="lede reveal mb-12 max-w-[760px] font-arabic text-carbon/80 wide:mb-14">
          {service.leadAr}
        </p>
        <div className="grid gap-14 wide:grid-cols-2 wide:gap-20">
          <div>
            <p className="eyebrow flex items-center gap-3 text-carbon/55">
              <span aria-hidden="true" className="h-px w-6 bg-mist" />
              العمل
            </p>
            <Heading scale="sm" className="mb-8 mt-5">
              ماذا نفعل.
            </Heading>
            <DotList items={service.whatWeDoAr} columns={1} />
          </div>
          <div>
            <p className="eyebrow flex items-center gap-3 text-carbon/55">
              <span aria-hidden="true" className="h-px w-6 bg-mist" />
              المخرجات
            </p>
            <Heading scale="sm" className="mb-8 mt-5">
              ما الذي ستستلمونه.
            </Heading>
            <DotList items={service.deliverablesAr} columns={1} accent={false} />
          </div>
        </div>
      </Band>

      {/* Related services */}
      <Band className="relative overflow-hidden">
        <span
          aria-hidden="true"
          className="wordmark-ar pointer-events-none absolute -top-4 left-4 z-0 w-16 text-carbon/[0.06] wide:left-8 wide:w-20"
        />
        <SectionIntro
          eyebrow="تابعوا القراءة"
          title="خدمات ذات صلة."
          align="left"
          scale="sm"
        />
        <CardGrid columns={3}>
          {related.map((item, i) => (
            <Card
              key={item.slug}
              href={`/ar/services/${item.slug}`}
              badge={item.num}
              title={item.nameAr}
              titleAs="h3"
              desc={item.descriptorAr}
              action="استكشفوا"
              delay={i * 60}
              locale="ar"
            />
          ))}
        </CardGrid>
      </Band>

      {/* FAQ — the same shared set as the homepage */}
      <Band className="bg-limestone/30">
        <SectionIntro eyebrow="الأسئلة الشائعة" title="أسئلة، مُجابة." />
        <div className="mx-auto max-w-[880px]">
          <Faq
            items={homeFaqs.map((item) => ({ q: item.qAr, a: item.aAr }))}
            answerClassName="font-arabic"
            locale="ar"
          />
        </div>
      </Band>

      <CtaBand
        title={`${service.ctaTitleAr[0]} ${service.ctaTitleAr[1]}`}
        sub="احجزوا مكالمة مجانية وسنعود إليكم بخطة واضحة وبلا التزام."
      >
        <PillLink
          href={`${cta.href}?text=${encodeURIComponent(`مرحباً، أنا مهتم بـ ${service.nameAr}.`)}`}
          tone="solid"
          size="lg"
        >
          {cta.labelAr}
        </PillLink>
      </CtaBand>
    </>
  );
}
