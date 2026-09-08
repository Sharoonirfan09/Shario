import type { Metadata } from "next";
import Link from "next/link";
import { Faq } from "@/components/faq";
import { ClosingCta, ExpertiseBand, ListBand } from "@/components/cluster-page";
import {
  BreadcrumbStructuredData,
  FaqStructuredData,
  JsonLd,
} from "@/components/structured-data";
import {
  Band,
  Breadcrumb,
  Card,
  CardGrid,
  Hero,
  PillLink,
  SectionIntro,
  TypeHero,
} from "@/components/ui";
import { getIndustry, site } from "@/lib/site";
import {
  getHealthcareService,
  getHealthcareVertical,
  healthcareAudienceCards,
  healthcareCtaHref,
  healthcareHub,
  healthcareServiceCards,
  type ClusterNote,
  type LinkCard,
  type ServicePage,
} from "@/lib/healthcare-cluster";

/**
 * Healthcare pillar → cluster page bodies — English only (see the scope note
 * in `lib/healthcare-cluster.ts`). Built from exactly the same primitives
 * (`Band`, `SectionIntro`, `CardGrid`, `Card`, `Faq`, `CtaBand`, `PillLink`,
 * `Hero`/`TypeHero`, `Breadcrumb`) and the same small helper bands
 * (`ListBand`, `ExpertiseBand`, `ClosingCta`, imported from
 * `components/cluster-page.tsx`) the Real Estate cluster already renders
 * with — no new visual components, no restyling.
 */

const UI = {
  home: "Home",
  services: "Services",
  industries: "Industries",
  ctaSub: "Book a free call and we will come back with a clear, no-obligation plan.",
  faqEyebrow: "FAQ",
  faqTitle: "Questions, answered.",
  experienceEyebrow: "Experience",
  whatsIncludedEyebrow: "What's Included",
};

/* -------------------------------------------------------------------------- */
/* Small building blocks (generic — not real-estate- or healthcare-specific)  */
/* -------------------------------------------------------------------------- */

/** A grid of cards that link elsewhere — the pillar↔cluster wiring unit,
 *  built from the same `Band`/`SectionIntro`/`CardGrid`/`Card` primitives
 *  `ServiceCardGridBand`/`AudienceBand`/`RelatedBand` in `cluster-page.tsx`
 *  use, generalised to take an arbitrary card list instead of one hardcoded
 *  to Real Estate's six services or two audiences. */
function LinkCardGrid({
  eyebrow,
  title,
  cards,
  className = "",
}: {
  eyebrow: string;
  title: string;
  cards: LinkCard[];
  className?: string;
}) {
  return (
    <Band className={className}>
      <SectionIntro eyebrow={eyebrow} title={title} scale="sm" />
      <CardGrid columns={3}>
        {cards.map((card, i) => (
          <Card
            key={card.href}
            href={card.href}
            badge={String(i + 1).padStart(2, "0")}
            title={card.title}
            titleAs="h3"
            desc={card.desc}
            action="Explore"
            delay={i * 60}
          />
        ))}
      </CardGrid>
    </Band>
  );
}

/** A `SectionIntro` over a single flowing paragraph — every "For X" / "How
 *  we'd approach it" / "Built for a regulated market" section in Part 2 is
 *  written as prose, not a bullet list, so this stands in for `ListBand`
 *  there. `variant="lede"` matches the larger-set "pipeline" paragraph style
 *  the Real Estate Agents page already uses for its own arrow-chain note. */
function NoteBand({
  note,
  variant = "body",
  className = "",
}: {
  note: ClusterNote;
  variant?: "body" | "lede";
  className?: string;
}) {
  return (
    <Band className={className}>
      <SectionIntro eyebrow={note.eyebrow} title={note.heading} align="left" scale="sm" />
      <p
        className={
          variant === "lede"
            ? "lede reveal max-w-[820px] text-carbon/80"
            : "reveal max-w-[760px] text-[1.0625rem] leading-[1.75] text-carbon/75"
        }
      >
        {note.body}
      </p>
    </Band>
  );
}

/** An honest stand-in for the brief's "MedicalBusiness/LocalBusiness where
 *  appropriate" ask: Shario is a marketing agency, not a clinic or hospital,
 *  so declaring it as a `MedicalBusiness` would misrepresent the entity the
 *  schema describes. Every other Industry/Service page on the site instead
 *  declares a `Service` scoped with `serviceType` and `areaServed` — this
 *  mirrors that exact, accurate pattern for a cluster page that has no
 *  `Industry`/`Service` array entry of its own to hang `IndustryStructuredData`/
 *  `ServiceStructuredData` off. */
function HealthcareServiceSchema({
  name,
  description,
  serviceType,
  path,
}: {
  name: string;
  description: string;
  serviceType: string;
  path: string;
}) {
  const url = `${site.domain}${path}`;
  const data = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": url,
    name,
    description,
    serviceType,
    url,
    provider: { "@id": `${site.domain}/#organization` },
    areaServed: [
      { "@type": "City", name: "Dubai" },
      { "@type": "Country", name: "United Arab Emirates" },
    ],
    inLanguage: "en",
  };
  return <JsonLd data={data} />;
}

/* -------------------------------------------------------------------------- */
/* Page 1: Healthcare (Hub) — /industries/healthcare                          */
/* -------------------------------------------------------------------------- */

export function HealthcareHubPageBody() {
  const industry = getIndustry("healthcare");
  const c = healthcareHub;

  const crumbs = [
    { href: "/", label: UI.home },
    { href: "/industries", label: UI.industries },
    { label: industry?.name ?? "Healthcare" },
  ];

  return (
    <>
      <BreadcrumbStructuredData items={crumbs} />
      <FaqStructuredData items={c.faqs} />
      <HealthcareServiceSchema
        name={c.h1}
        description={c.metaDescription}
        serviceType="Healthcare Digital Marketing"
        path="/industries/healthcare"
      />

      <Hero
        src={industry?.heroImage ?? "/images/industries/healthcare.jpg"}
        alt={`${c.h1} — ${site.name}`}
        eyebrow={UI.industries}
        title={c.h1}
        subhead={c.heroLede}
        priority
        breadcrumb={<Breadcrumb items={crumbs} />}
      >
        <div className="flex flex-col gap-3">
          <PillLink href={healthcareCtaHref} tone="solidLight" size="lg">
            {c.ctaLabel}
          </PillLink>
          <p className="max-w-[440px] text-[0.8125rem] leading-[1.6] text-porcelain/70">
            {c.ctaSub}
          </p>
        </div>
      </Hero>

      <ListBand
        eyebrow={UI.whatsIncludedEyebrow}
        list={c.whatsIncluded}
        locale="en"
        className="bg-limestone/30"
      />

      <LinkCardGrid eyebrow="Who We Help" title={c.whoWeHelp.heading} cards={c.whoWeHelp.cards} />

      <LinkCardGrid
        eyebrow="Where We Help"
        title="Healthcare marketing services."
        cards={healthcareServiceCards}
        className="bg-limestone/30"
      />

      <NoteBand note={c.builtForRegulated} />

      <ExpertiseBand
        eyebrow={UI.experienceEyebrow}
        heading={c.expertise.heading}
        body={c.expertise.body}
        locale="en"
        className="bg-limestone/30"
      />

      <Band>
        <SectionIntro eyebrow={UI.faqEyebrow} title={UI.faqTitle} />
        <div className="mx-auto max-w-[880px]">
          <Faq items={c.faqs} answerClassName="font-body" />
        </div>
      </Band>

      <ClosingCta title={c.closingTitle} label={c.ctaLabel} locale="en" />
    </>
  );
}

export function healthcareHubMetadata(): Metadata {
  const c = healthcareHub;
  const path = "/industries/healthcare";
  return {
    title: c.metaTitle,
    description: c.metaDescription,
    alternates: { canonical: path },
    openGraph: {
      siteName: site.name,
      locale: "en_AE",
      url: path,
      type: "website",
      title: `${c.metaTitle} — ${site.name}`,
      description: c.metaDescription,
    },
  };
}

/* -------------------------------------------------------------------------- */
/* Pages 2–5: the four vertical pages                                         */
/* -------------------------------------------------------------------------- */

export function HealthcareVerticalPageBody({ slug }: { slug: string }) {
  const v = getHealthcareVertical(slug);
  if (!v) return null;

  const crumbs = [
    { href: "/", label: UI.home },
    { href: "/industries", label: UI.industries },
    { href: "/industries/healthcare", label: "Healthcare" },
    { label: v.label },
  ];

  return (
    <>
      <BreadcrumbStructuredData items={crumbs} />
      <FaqStructuredData items={v.faqs} />
      <HealthcareServiceSchema
        name={v.h1}
        description={v.metaDescription}
        serviceType={`Digital Marketing for ${v.label}`}
        path={`/industries/healthcare/${v.slug}`}
      />

      <TypeHero
        tone="carbon"
        eyebrow="Healthcare Marketing"
        title={v.h1}
        subhead={v.heroLede}
        breadcrumb={<Breadcrumb items={crumbs} />}
      >
        <div className="flex flex-col gap-3">
          <PillLink href={healthcareCtaHref} tone="solidLight" size="lg">
            {v.ctaLabel}
          </PillLink>
          <p className="max-w-[440px] text-[0.8125rem] leading-[1.6] text-porcelain/70">
            {v.ctaSub}
          </p>
        </div>
      </TypeHero>

      <ListBand eyebrow={UI.whatsIncludedEyebrow} list={v.whatsIncluded} locale="en" />

      <Band className="bg-limestone/30">
        <SectionIntro eyebrow={v.forWhom.eyebrow} title={v.forWhom.heading} align="left" scale="sm" />
        <div className="max-w-[760px]">
          <p className="reveal text-[1.0625rem] leading-[1.75] text-carbon/75">{v.forWhom.body}</p>
          <p className="reveal mt-6 text-[0.9375rem] text-carbon/60">
            Looking for the full picture? See{" "}
            <Link
              href="/industries/healthcare"
              className="border-b border-carbon/30 pb-0.5 text-carbon/80 transition-colors duration-300 hover:border-carbon hover:text-carbon"
            >
              healthcare digital marketing agency
            </Link>
            .
          </p>
        </div>
      </Band>

      <NoteBand note={v.howWeGrow} variant="lede" />

      <LinkCardGrid
        eyebrow="We Also Help"
        title="Other specialties we work with."
        cards={v.siblings}
        className="bg-limestone/30"
      />

      <LinkCardGrid eyebrow="Where We Help" title="Healthcare marketing services." cards={healthcareServiceCards} />

      <ExpertiseBand
        eyebrow={UI.experienceEyebrow}
        heading={v.expertise.heading}
        body={v.expertise.body}
        locale="en"
        className="bg-limestone/30"
      />

      <Band>
        <SectionIntro eyebrow={UI.faqEyebrow} title={UI.faqTitle} />
        <div className="mx-auto max-w-[880px]">
          <Faq items={v.faqs} answerClassName="font-body" />
        </div>
      </Band>

      <ClosingCta title={v.closingTitle} label={v.ctaLabel} locale="en" />
    </>
  );
}

export function healthcareVerticalMetadata(slug: string): Metadata {
  const v = getHealthcareVertical(slug);
  if (!v) return {};
  const path = `/industries/healthcare/${slug}`;
  return {
    title: v.metaTitle,
    description: v.metaDescription,
    alternates: { canonical: path },
    openGraph: {
      siteName: site.name,
      locale: "en_AE",
      url: path,
      type: "website",
      title: `${v.metaTitle} — ${site.name}`,
      description: v.metaDescription,
    },
  };
}

/* -------------------------------------------------------------------------- */
/* Pages 6–11: the six service (cluster) pages                                */
/* -------------------------------------------------------------------------- */

export function HealthcareServicePageBody({ slug }: { slug: string }) {
  const s = getHealthcareService(slug);
  if (!s) return null;

  const crumbs = [
    { href: "/", label: UI.home },
    { href: "/services", label: UI.services },
    { label: s.label },
  ];

  const relatedCards: LinkCard[] = s.related
    .map((relSlug) => getHealthcareService(relSlug))
    .filter((rel): rel is ServicePage => Boolean(rel))
    .map((rel) => ({
      href: `/services/${rel.slug}`,
      title: rel.label,
      desc: rel.heroLede.split(". ").slice(-1)[0],
    }));

  return (
    <>
      <BreadcrumbStructuredData items={crumbs} />
      <FaqStructuredData items={s.faqs} />
      <HealthcareServiceSchema
        name={s.h1}
        description={s.metaDescription}
        serviceType={s.label}
        path={`/services/${s.slug}`}
      />

      <TypeHero
        tone="carbon"
        eyebrow="Healthcare Marketing"
        title={s.h1}
        subhead={s.heroLede}
        breadcrumb={<Breadcrumb items={crumbs} />}
      >
        <div className="flex flex-col gap-3">
          <PillLink href={healthcareCtaHref} tone="solidLight" size="lg">
            {s.ctaLabel}
          </PillLink>
          <p className="max-w-[440px] text-[0.8125rem] leading-[1.6] text-porcelain/70">
            {s.ctaSub}
          </p>
        </div>
      </TypeHero>

      <ListBand eyebrow={UI.whatsIncludedEyebrow} list={s.whatsIncluded} locale="en" />

      <NoteBand note={s.sectionA} className="bg-limestone/30" />
      <NoteBand note={s.sectionB} />
      <NoteBand note={s.howWeApproach} variant="lede" className="bg-limestone/30" />

      <ExpertiseBand
        eyebrow={UI.experienceEyebrow}
        heading={s.expertise.heading}
        body={s.expertise.body}
        locale="en"
      />

      <LinkCardGrid
        eyebrow="Who This Is For"
        title="Which side of care are you on?"
        cards={healthcareAudienceCards}
        className="bg-limestone/30"
      />

      <LinkCardGrid eyebrow="Keep Going" title="Related services." cards={relatedCards} />

      <Band className="bg-limestone/30">
        <SectionIntro eyebrow={UI.faqEyebrow} title={UI.faqTitle} />
        <div className="mx-auto max-w-[880px]">
          <Faq items={s.faqs} answerClassName="font-body" />
        </div>
      </Band>

      <ClosingCta title={s.closingTitle} label={s.ctaLabel} locale="en" />
    </>
  );
}

export function healthcareServiceMetadata(slug: string): Metadata {
  const s = getHealthcareService(slug);
  if (!s) return {};
  const path = `/services/${slug}`;
  return {
    title: s.metaTitle,
    description: s.metaDescription,
    alternates: { canonical: path },
    openGraph: {
      siteName: site.name,
      locale: "en_AE",
      url: path,
      type: "website",
      title: `${s.metaTitle} — ${site.name}`,
      description: s.metaDescription,
    },
  };
}
