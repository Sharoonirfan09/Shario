import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  BreadcrumbStructuredData,
  FaqStructuredData,
  IndustryStructuredData,
} from "@/components/structured-data";
import { getIndustry, ogDefaults, site } from "@/lib/site";
import { RealEstateHero } from "@/components/industries/real-estate/hero";
import { IndustryInsight } from "@/components/industries/real-estate/industry-insight";
import { Funnel } from "@/components/industries/real-estate/funnel";
import { Audience } from "@/components/industries/real-estate/audience";
import { Challenges } from "@/components/industries/real-estate/challenges";
import { Services } from "@/components/industries/real-estate/services";
import { Authority } from "@/components/industries/real-estate/authority";
import { ApproachTimeline } from "@/components/industries/real-estate/approach-timeline";
import { FaqSection } from "@/components/industries/real-estate/faq-section";
import { FinalCta } from "@/components/industries/real-estate/final-cta";

/**
 * The bespoke Real Estate & Property industry page — a literal sibling of
 * `../[slug]/page.tsx` that Next's router resolves ahead of the dynamic
 * route for this exact path, so every other Industries page (and the AR/RU
 * Real Estate pages, which still use the generic template) is untouched.
 *
 * Content throughout is `industries.find(slug: "real-estate")` from
 * `lib/site.ts`, unchanged — only the composition is new. See the note on
 * `industries` there, and the comment on `generateStaticParams` in
 * `../[slug]/page.tsx`, which excludes this slug now that it's served here.
 */
const SLUG = "real-estate";

export async function generateMetadata(): Promise<Metadata> {
  const industry = getIndustry(SLUG);
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

export default function RealEstateIndustryPage() {
  const industry = getIndustry(SLUG);
  if (!industry) notFound();

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

      <RealEstateHero industry={industry} breadcrumbItems={breadcrumbItems} />
      <IndustryInsight industry={industry} />
      <Funnel industry={industry} />
      <Audience whoWeWorkWith={industry.whoWeWorkWith} />
      <Challenges industry={industry} />
      <Services industry={industry} />
      <Authority />
      <ApproachTimeline industry={industry} />
      <FaqSection industry={industry} />
      <FinalCta industry={industry} />
    </>
  );
}
