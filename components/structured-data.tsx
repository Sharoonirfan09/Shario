import type { Locale } from "@/lib/locale";
import type { InsightArticle, InsightCategory } from "@/lib/site";
import { insightArticles, services, site, social } from "@/lib/site";

/**
 * Organization + LocalBusiness markup. Shario competes on Dubai-local search,
 * so the address, service catalogue and founder are all worth declaring.
 *
 * No street address or `LocalBusiness` `@type`: Shario doesn't operate from
 * a public-facing storefront, so `ProfessionalService` (itself a
 * schema.org subtype of `LocalBusiness`, carrying the same local-search
 * semantics without implying walk-in premises) is the honest fit — inventing
 * a street address just to qualify for a different `@type` would be worse
 * than the schema this site actually has grounds to claim.
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
    description: site.description,
    slogan: site.tagline,
    url: site.domain,
    logo: `${site.domain}/brand/monogram.png`,
    image: `${site.domain}/brand/monogram.png`,
    email: site.email,
    telephone: site.phone,
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
      addressLocality: "Dubai",
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

/** Renders a raw JSON-LD `<script>` tag — every structured-data component in
 *  this file goes through this one, so they stay consistent about how the
 *  object is escaped and injected. */
function JsonLd({ data }: { data: unknown }) {
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
    headline: isAr ? article.titleAr : isRu ? article.titleRu : article.title,
    description: isAr
      ? (article.metaDescriptionAr ?? article.excerptAr)
      : isRu
        ? (article.metaDescriptionRu ?? article.excerptRu)
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
    blogPost: insightArticles.map((article) => ({
      "@type": "BlogPosting",
      headline: isAr ? article.titleAr : isRu ? article.titleRu : article.title,
      url: `${base}/${article.slug}`,
      datePublished: toIsoDate(article.date),
    })),
  };

  return <JsonLd data={data} />;
}
