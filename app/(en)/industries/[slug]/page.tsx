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
import { cta, getIndustry, industries, ogDefaults, site } from "@/lib/site";

/** Every industry page is known at build time, so prerender them. */
export function generateStaticParams() {
  return industries.map((industry) => ({ slug: industry.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/industries/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const industry = getIndustry(slug);
  if (!industry) return {};

  const title = industry.seoTitle ?? industry.name;

  return {
    title,
    description: industry.metaDescription,
    alternates: {
      canonical: `/industries/${industry.slug}`,
      languages: {
        en: `/industries/${industry.slug}`,
        ar: `/ar/industries/${industry.slug}`,
        ru: `/ru/industries/${industry.slug}`,
        "x-default": `/industries/${industry.slug}`,
      },
    },
    openGraph: {
      ...ogDefaults,
      url: `/industries/${industry.slug}`,
      type: "website",
      title: `${title} — ${site.name}`,
      description: industry.metaDescription,
    },
  };
}

export default async function IndustryPage({
  params,
}: PageProps<"/industries/[slug]">) {
  const { slug } = await params;
  const industry = getIndustry(slug);
  if (!industry) notFound();

  const relatedIndustry = industry.relatedIndustrySlug
    ? getIndustry(industry.relatedIndustrySlug)
    : undefined;

  const breadcrumbItems = [
    { href: "/", label: "Home" },
    { href: "/industries", label: "Industries" },
    { label: industry.name },
  ];

  return (
    <>
      <BreadcrumbStructuredData items={breadcrumbItems} />
      <FaqStructuredData items={industry.faqs} />
      <IndustryStructuredData industry={industry} />

      <Hero
        src={industry.heroImage}
        alt=""
        eyebrow="Industries"
        title={industry.title}
        priority
        breadcrumb={<Breadcrumb items={breadcrumbItems} />}
      />

      {/* The industry today — landscape, digital behaviour, why visibility
          matters here specifically. */}
      <Band>
        <SectionIntro
          eyebrow="The Industry"
          title={industry.subhead}
          align="left"
          scale="sm"
        />
        <div className="max-w-[760px]">
          <p className="lede reveal mb-10 text-carbon/80">{industry.lead}</p>
          <p className="reveal mb-6 text-[1.0625rem] leading-[1.75] text-carbon/75">
            {industry.intro[0]}
          </p>
          <p className="reveal text-[1.0625rem] leading-[1.75] text-carbon/75">
            {industry.intro[1]}
          </p>
        </div>
      </Band>

      {/* Who we work with — unique per industry, never a generic client list. */}
      <Band className="bg-limestone/30">
        <SectionIntro eyebrow="Who We Work With" title="Built for the people who need it." scale="sm" />
        <DotList items={industry.whoWeWorkWith} columns={2} />
      </Band>

      {/* This industry's actual marketing challenges. */}
      <Band>
        <SectionIntro
          eyebrow="The Challenges"
          title="What makes this market hard."
          scale="sm"
        />
        <CardGrid columns={3}>
          {industry.challenges.map((challenge, i) => (
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

      {/* Where Shario's real services apply — the Industries↔Services link. */}
      <Band className="bg-limestone/30">
        <SectionIntro
          eyebrow="Where We Help"
          title={`${industry.name} marketing services.`}
          scale="sm"
        />
        <CardGrid columns={3}>
          {industry.services.map((item, i) => (
            <Card
              key={item.slug}
              href={`/services/${item.slug}`}
              badge={String(i + 1).padStart(2, "0")}
              title={item.title}
              titleAs="h3"
              desc={item.desc}
              action="Explore"
              delay={i * 60}
            />
          ))}
        </CardGrid>
      </Band>

      {/* This industry's own engagement framework. */}
      <Band className="relative overflow-hidden">
        <span
          aria-hidden="true"
          className="wordmark-ar pointer-events-none absolute -top-4 right-4 z-0 w-16 text-carbon/[0.06] wide:right-8 wide:w-20"
        />
        <SectionIntro
          eyebrow="The Approach"
          title="How we'd take this on."
          scale="sm"
        />
        <CardGrid columns={industry.approach.length > 4 ? 3 : 2}>
          {industry.approach.map((step) => (
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
            Also relevant:{" "}
            <Link
              href={`/industries/${relatedIndustry.slug}`}
              className="border-b border-carbon/30 pb-0.5 text-carbon/80 transition-colors duration-300 hover:border-carbon hover:text-carbon"
            >
              {relatedIndustry.name}
            </Link>
          </p>
        )}
      </Band>

      {/* FAQ — this industry's own questions, matching FaqStructuredData above. */}
      <Band className="bg-limestone/30">
        <SectionIntro eyebrow="FAQ" title="Questions, answered." />
        <div className="mx-auto max-w-[880px]">
          <Faq items={industry.faqs} answerClassName="font-body" />
        </div>
      </Band>

      <CtaBand
        title={`${industry.ctaTitle[0]} ${industry.ctaTitle[1]}`}
        sub="Book a free call and we will come back with a clear, no-obligation plan."
      >
        <PillLink
          href={`${cta.href}?text=${encodeURIComponent(industry.ctaMessage)}`}
          tone="solid"
          size="lg"
        >
          {cta.label}
        </PillLink>
      </CtaBand>
    </>
  );
}
