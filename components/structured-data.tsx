import type { Locale } from "@/lib/locale";
import type { InsightArticle, InsightCategory, Industry, Service } from "@/lib/site";
import { insightArticlesForLocale, services, site, social } from "@/lib/site";

/**
 * Organization + LocalBusiness markup. Shario competes on Dubai-local search,
 * so the address, service catalogue and founder are all worth declaring.
 *
 * Still `ProfessionalService`, not `LocalBusiness`: Shario doesn't operate
 * from a public-facing storefront, so `ProfessionalService` (itself a
 * schema.org subtype of `LocalBusiness`, carrying the same local-search
 * semantics without implying walk-in premises) stays the honest `@type` fit.
 * `streetAddress`, `legalName`, `foundingDate` and the trade-licence
 * `identifier` were added in the 2026-09 E-E-A-T pass — each reads from a
 * `site.*` constant sourced from the real DWC trade licence (see that
 * constant's own comment in `lib/site.ts`).
 *
 * `sameAs` lists every profile in `social` (`lib/site.ts`) — the same set
 * already live, clickable, in the footer — plus the founder's own personal
 * profile stays scoped to the `founder` object below rather than mixed into
 * the organization's.
 *
 * `@id` on both the organization and its `founder` gives each entity a
 * stable identifier a knowledge graph can resolve consistently: the
 * organization's `@id` is reused by `publisher` references elsewhere in this
 * file, and the founder's `@id` (`site.founderUrl` + `#person`) points at
 * the same Person entity her own site (sharoon.ae) declares — so this
 * markup describes one founder, not a second, disconnected record.
 */
export function StructuredData() {
  const data = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${site.domain}/#organization`,
    name: site.name,
    alternateName: "SHARIO",
    legalName: site.legalName,
    description: site.description,
    slogan: site.tagline,
    url: site.domain,
    logo: `${site.domain}/brand/monogram.png`,
    image: `${site.domain}/brand/monogram.png`,
    email: site.email,
    telephone: site.phone,
    foundingDate: site.foundingDate,
    priceRange: "$$",
    knowsLanguage: ["en", "ar", "ru"],
    identifier: {
      "@type": "PropertyValue",
      name: "UAE Trade Licence",
      value: site.tradeLicenceNumber,
    },
    founder: {
      "@type": "Person",
      "@id": `${site.founderUrl}/#person`,
      name: site.founder,
      url: site.founderUrl,
      jobTitle: site.founderRole,
      gender: "Female",
      sameAs: site.linkedin,
    },
    areaServed: [
      { "@type": "City", name: "Dubai" },
      { "@type": "Country", name: "United Arab Emirates" },
    ],
    address: {
      "@type": "PostalAddress",
      streetAddress: site.streetAddress,
      addressLocality: "Dubai",
      addressRegion: "Dubai",
      addressCountry: "AE",
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer service",
        telephone: site.phone,
        email: site.email,
        areaServed: "AE",
        availableLanguage: ["English", "Arabic", "Russian"],
      },
    ],
    sameAs: social.map((item) => item.href),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Digital marketing services",
      itemListElement: services.map((service) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: service.name,
          description: service.descriptor,
          url: `${site.domain}/services/${service.slug}`,
        },
      })),
    },
  };

  return <JsonLd data={data} />;
}

/**
 * The founder's richer `Person` facts — credentials, `knowsAbout`,
 * `alumniOf` — added on the homepage only in the 2026-09 E-E-A-T pass.
 * Reuses the *same* `@id` (`${site.founderUrl}/#person`) the inline
 * `founder` object in `StructuredData` above and `ArticleStructuredData`'s
 * `author` already declare on every other page, rather than minting a
 * second, disconnected Person record — Google merges same-`@id` nodes into
 * one knowledge-graph entity, so this simply adds detail to the founder
 * entity that already exists sitewide.
 */
export function PersonStructuredData() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${site.founderUrl}/#person`,
    name: site.founder,
    jobTitle: site.founderRole,
    worksFor: { "@id": `${site.domain}/#organization` },
    url: site.founderUrl,
    sameAs: [site.founderUrl, site.linkedin],
    knowsAbout: [
      "Performance marketing",
      "Search engine optimization",
      "Google Ads",
      "Meta Ads",
      "Brand strategy",
      "CRM and marketing automation",
      "Dubai real estate marketing",
    ],
    alumniOf: [{ "@type": "CollegeOrUniversity", name: "University of the Punjab" }],
    hasCredential: [
      {
        "@type": "EducationalOccupationalCredential",
        credentialCategory: "certificate",
        name: "Google Data Analytics Professional Certificate",
        recognizedBy: { "@type": "Organization", name: "Google" },
      },
      {
        "@type": "EducationalOccupationalCredential",
        credentialCategory: "certificate",
        name: "Advertising with Meta",
        recognizedBy: { "@type": "Organization", name: "Meta" },
      },
      {
        "@type": "EducationalOccupationalCredential",
        credentialCategory: "certificate",
        name: "Introduction to Google SEO",
        recognizedBy: { "@type": "Organization", name: "University of California, Davis" },
      },
    ],
  };

  return <JsonLd data={data} />;
}

/**
 * WebSite markup — the site as a whole, distinct from the `ProfessionalService`
 * business entity above. No `potentialAction`/`SearchAction`: the site has no
 * search feature, and declaring one Google can't actually run would be
 * exactly the kind of misleading schema this pass is checking for.
 *
 * `publisher` references the organization by its `@id` (declared in
 * `StructuredData` above) rather than restating its properties, so the two
 * scripts describe one organization, not two.
 */
export function WebsiteStructuredData() {
  const data = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${site.domain}/#website`,
    name: site.name,
    alternateName: "SHARIO",
    url: site.domain,
    publisher: { "@id": `${site.domain}/#organization` },
    inLanguage: ["en", "ar", "ru"],
  };

  return <JsonLd data={data} />;
}

/**
 * Service markup for a single service page — the per-page complement to the
 * sitewide `ProfessionalService.hasOfferCatalog` listing in `StructuredData`
 * above. `provider` references the organization by its `@id` rather than
 * restating it, the same pattern `ArticleStructuredData`'s `publisher` uses.
 */
export function ServiceStructuredData({
  service,
  locale = "en",
}: {
  service: Service;
  locale?: Locale;
}) {
  const isAr = locale === "ar";
  const isRu = locale === "ru";
  const prefix = isAr ? "/ar" : isRu ? "/ru" : "";
  const url = `${site.domain}${prefix}/services/${service.slug}`;

  const data = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": url,
    name: isAr ? service.nameAr : isRu ? service.nameRu : service.name,
    description: isAr
      ? service.metaDescriptionAr
      : isRu
        ? service.metaDescriptionRu
        : service.metaDescription,
    url,
    provider: { "@id": `${site.domain}/#organization` },
    areaServed: [
      { "@type": "City", name: "Dubai" },
      { "@type": "Country", name: "United Arab Emirates" },
    ],
    inLanguage: isAr ? "ar" : isRu ? "ru" : "en",
  };

  return <JsonLd data={data} />;
}

/**
 * Service markup for a single Industries page — the `Industry` counterpart
 * to `ServiceStructuredData` above. Schema.org has no dedicated "Industry"
 * type, so this still declares `Service`, scoped with `serviceType` to name
 * the sector rather than restating a generic offering — an honest reading
 * of what an Industries page actually is: the same marketing service,
 * applied to one sector.
 */
export function IndustryStructuredData({
  industry,
  locale = "en",
}: {
  industry: Industry;
  locale?: Locale;
}) {
  const isAr = locale === "ar";
  const isRu = locale === "ru";
  const prefix = isAr ? "/ar" : isRu ? "/ru" : "";
  const url = `${site.domain}${prefix}/industries/${industry.slug}`;

  const data = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": url,
    name: isAr ? industry.titleAr : isRu ? industry.titleRu : industry.title,
    description: isAr
      ? industry.metaDescriptionAr
      : isRu
        ? industry.metaDescriptionRu
        : industry.metaDescription,
    serviceType: isAr ? industry.nameAr : isRu ? industry.nameRu : industry.name,
    url,
    provider: { "@id": `${site.domain}/#organization` },
    areaServed: [
      { "@type": "City", name: "Dubai" },
      { "@type": "Country", name: "United Arab Emirates" },
    ],
    inLanguage: isAr ? "ar" : isRu ? "ru" : "en",
  };

  return <JsonLd data={data} />;
}

/** Renders a raw JSON-LD `<script>` tag — every structured-data component in
 *  this file goes through this one, so they stay consistent about how the
 *  object is escaped and injected. Exported so a page with no matching
 *  helper here (e.g. the Healthcare cluster's vertical/service pages, which
 *  aren't `Industry`/`Service` entries in `lib/site.ts`) can still emit a
 *  consistent `Service` block without duplicating this escaping logic. */
export function JsonLd({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/** `D Mon YYYY` (e.g. "3 Jul 2026") parses fine in Node/V8 — every date on
 *  the site is authored in this one format, so a single parse here is safe. */
function toIsoDate(date: string): string {
  return new Date(date).toISOString();
}

/**
 * BlogPosting markup for a single Insights article — the per-page complement
 * to the site-wide `ProfessionalService` markup above.
 */
export function ArticleStructuredData({
  article,
  category,
  locale = "en",
}: {
  article: InsightArticle;
  category?: InsightCategory;
  locale?: Locale;
}) {
  const isAr = locale === "ar";
  const isRu = locale === "ru";
  const prefix = isAr ? "/ar" : isRu ? "/ru" : "";
  const url = `${site.domain}${prefix}/insights/${article.slug}`;
  const isoDate = toIsoDate(article.date);

  const data = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": url,
    headline: isAr ? (article.titleAr ?? article.title) : isRu ? (article.titleRu ?? article.title) : article.title,
    description: isAr
      ? (article.metaDescriptionAr ?? article.excerptAr ?? article.excerpt)
      : isRu
        ? (article.metaDescriptionRu ?? article.excerptRu ?? article.excerpt)
        : (article.metaDescription ?? article.excerpt),
    url,
    datePublished: isoDate,
    dateModified: isoDate,
    inLanguage: isAr ? "ar" : isRu ? "ru" : "en",
    articleSection: isAr ? category?.nameAr : isRu ? category?.nameRu : category?.name,
    author: {
      "@type": "Person",
      "@id": `${site.founderUrl}/#person`,
      name: isAr ? site.founderAr : isRu ? site.founderRu : site.founder,
      jobTitle: isAr ? site.founderRoleAr : isRu ? site.founderRoleRu : site.founderRole,
    },
    publisher: {
      "@type": "Organization",
      "@id": `${site.domain}/#organization`,
      name: site.name,
      url: site.domain,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
  };

  return <JsonLd data={data} />;
}

/**
 * FAQPage markup for a page's visible FAQ accordion. `items` must be exactly
 * the question/answer pairs rendered on that page by `<Faq>` — never a
 * different or larger set — so the structured data always matches what a
 * visitor actually sees.
 */
export function FaqStructuredData({
  items,
}: {
  items: readonly { q: string; a: string }[];
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };

  return <JsonLd data={data} />;
}

/** BreadcrumbList markup matching whatever trail `<Breadcrumb>` renders on
 *  the same page, so the visual and structured breadcrumbs never drift. */
export function BreadcrumbStructuredData({
  items,
}: {
  items: { href?: string; label: string }[];
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.label,
      ...(item.href ? { item: `${site.domain}${item.href}` } : {}),
    })),
  };

  return <JsonLd data={data} />;
}

/**
 * Blog + ItemList markup for the Insights index — declares the hub as a
 * Blog whose posts are the full `insightArticles` catalogue, independent of
 * whichever category tab a visitor currently has selected client-side.
 */
export function InsightsBlogStructuredData({ locale = "en" }: { locale?: Locale }) {
  const isAr = locale === "ar";
  const isRu = locale === "ru";
  const prefix = isAr ? "/ar" : isRu ? "/ru" : "";
  const base = `${site.domain}${prefix}/insights`;

  const data = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": base,
    name: isAr ? `رؤى ${site.name}` : isRu ? `Инсайты ${site.name}` : `${site.name} Insights`,
    description: isAr
      ? "المنصة التحريرية لشاريو — أخبار السوق والمقالات ودراسات الحالة والاتجاهات والأدلة حول التسويق الرقمي وتحسين محركات البحث والمواقع الإلكترونية وإدارة علاقات العملاء في دبي."
      : isRu
        ? "Редакционная платформа SHARIO — новости рынка, статьи, кейсы, тренды и руководства о цифровом маркетинге, SEO, сайтах и CRM в Дубае."
        : "SHARIO's editorial hub — market news, articles, case studies, trends and guides on digital marketing, SEO, websites and CRM in Dubai.",
    url: base,
    publisher: {
      "@type": "Organization",
      "@id": `${site.domain}/#organization`,
      name: site.name,
      url: site.domain,
    },
    blogPost: insightArticlesForLocale(locale).map((article) => ({
      "@type": "BlogPosting",
      headline: isAr ? (article.titleAr ?? article.title) : isRu ? (article.titleRu ?? article.title) : article.title,
      url: `${base}/${article.slug}`,
      datePublished: toIsoDate(article.date),
    })),
  };

  return <JsonLd data={data} />;
}
