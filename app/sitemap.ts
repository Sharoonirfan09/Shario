import type { MetadataRoute } from "next";
import { insightArticles, insightCategories, services, site } from "@/lib/site";

const routes = ["/", "/services", "/insights", "/about", "/contact"];

/** Every non-English locale's URL prefix — mirrors `PREFIXES` in `lib/locale.ts`. */
const LOCALE_PREFIXES = { ar: "/ar", ru: "/ru" } as const;

/** `path` with a locale prefix applied, e.g. `("ar", "/about")` → `/ar/about`, `("ru", "/")` → `/ru`. */
function localePath(locale: keyof typeof LOCALE_PREFIXES, path: string): string {
  const prefix = LOCALE_PREFIXES[locale];
  return path === "/" ? prefix : `${prefix}${path}`;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const pages = routes.flatMap((path) => {
    const enUrl = `${site.domain}${path === "/" ? "" : path}`;
    const arUrl = `${site.domain}${localePath("ar", path)}`;
    const ruUrl = `${site.domain}${localePath("ru", path)}`;
    const languages = { en: enUrl, ar: arUrl, ru: ruUrl, "x-default": enUrl };
    const priority = path === "/" ? 1 : 0.8;

    return [
      { url: enUrl, lastModified, changeFrequency: "monthly" as const, priority, alternates: { languages } },
      { url: arUrl, lastModified, changeFrequency: "monthly" as const, priority, alternates: { languages } },
      { url: ruUrl, lastModified, changeFrequency: "monthly" as const, priority, alternates: { languages } },
    ];
  });

  const servicePages = services.flatMap((service) => {
    const enUrl = `${site.domain}/services/${service.slug}`;
    const arUrl = `${site.domain}/ar/services/${service.slug}`;
    const ruUrl = `${site.domain}/ru/services/${service.slug}`;
    const languages = { en: enUrl, ar: arUrl, ru: ruUrl, "x-default": enUrl };

    return [
      { url: enUrl, lastModified, changeFrequency: "monthly" as const, priority: 0.7, alternates: { languages } },
      { url: arUrl, lastModified, changeFrequency: "monthly" as const, priority: 0.7, alternates: { languages } },
      { url: ruUrl, lastModified, changeFrequency: "monthly" as const, priority: 0.7, alternates: { languages } },
    ];
  });

  const insightPages = insightArticles.flatMap((article) => {
    const enUrl = `${site.domain}/insights/${article.slug}`;
    const arUrl = `${site.domain}/ar/insights/${article.slug}`;
    const ruUrl = `${site.domain}/ru/insights/${article.slug}`;
    const languages = { en: enUrl, ar: arUrl, ru: ruUrl, "x-default": enUrl };
    // The article's own publish date, not build time — a real, distinct
    // signal per URL rather than every page in the sitemap sharing one
    // "now" timestamp that means nothing to a crawler.
    const modified = new Date(article.date);
    const priority = article.featured ? 0.7 : 0.6;

    return [
      { url: enUrl, lastModified: modified, changeFrequency: "monthly" as const, priority, alternates: { languages } },
      { url: arUrl, lastModified: modified, changeFrequency: "monthly" as const, priority, alternates: { languages } },
      { url: ruUrl, lastModified: modified, changeFrequency: "monthly" as const, priority, alternates: { languages } },
    ];
  });

  // Each Insights category tab (`/insights?category=…`) already carries its
  // own title, meta description and canonical (see `generateMetadata` in
  // `app/(en)/insights/page.tsx`) — listed here so it's discoverable the same
  // way the rest of the site's real, indexable URLs are.
  const categoryPages = insightCategories.flatMap((category) => {
    const enUrl = `${site.domain}/insights?category=${category.slug}`;
    const arUrl = `${site.domain}/ar/insights?category=${category.slug}`;
    const ruUrl = `${site.domain}/ru/insights?category=${category.slug}`;
    const languages = { en: enUrl, ar: arUrl, ru: ruUrl, "x-default": enUrl };

    return [
      { url: enUrl, lastModified, changeFrequency: "monthly" as const, priority: 0.6, alternates: { languages } },
      { url: arUrl, lastModified, changeFrequency: "monthly" as const, priority: 0.6, alternates: { languages } },
      { url: ruUrl, lastModified, changeFrequency: "monthly" as const, priority: 0.6, alternates: { languages } },
    ];
  });

  return [...pages, ...servicePages, ...insightPages, ...categoryPages];
}
