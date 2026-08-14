import type { InsightArticle, InsightCategory } from "@/lib/site";
import { insightArticles, services, site } from "@/lib/site";

/**
 * Organization + LocalBusiness markup. Shario competes on Dubai-local search,
 * so the address, service catalogue and founder are all worth declaring.
 * `sameAs` carries LinkedIn only — it is the one profile the content document
 * lists, and asserting an unverified handle here is worse than omitting it.
 */
export function StructuredData() {
  const data = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: site.name,
    description: site.description,
    url: site.domain,
    email: site.email,
    telephone: site.phone,
    founder: {
      "@type": "Person",
      name: site.founder,
      jobTitle: site.founderRole,
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
    sameAs: [site.linkedin],
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
}: {
  article: InsightArticle;
  category?: InsightCategory;
}) {
  const url = `${site.domain}/insights/${article.slug}`;
  const isoDate = toIsoDate(article.date);

  const data = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": url,
    headline: article.title,
    description: article.metaDescription ?? article.excerpt,
    url,
    datePublished: isoDate,
    dateModified: isoDate,
    inLanguage: "en",
    articleSection: category?.name,
    author: {
      "@type": "Person",
      name: site.founder,
      jobTitle: site.founderRole,
    },
    publisher: {
      "@type": "Organization",
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
export function InsightsBlogStructuredData() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": `${site.domain}/insights`,
    name: `${site.name} Insights`,
    description:
      "SHARIO's editorial hub — market news, articles, case studies, trends and guides on performance marketing, SEO, websites and CRM in Dubai.",
    url: `${site.domain}/insights`,
    publisher: {
      "@type": "Organization",
      name: site.name,
      url: site.domain,
    },
    blogPost: insightArticles.map((article) => ({
      "@type": "BlogPosting",
      headline: article.title,
      url: `${site.domain}/insights/${article.slug}`,
      datePublished: toIsoDate(article.date),
    })),
  };

  return <JsonLd data={data} />;
}
