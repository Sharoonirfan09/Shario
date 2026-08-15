import type { MetadataRoute } from "next";
import { insightArticles, services, site } from "@/lib/site";

const routes = ["/", "/services", "/insights", "/about", "/contact"];

/** `path` without a leading `/ar` prefix, e.g. `/ar/about` → `/about`, `/ar` → `/`. */
function arPath(path: string): string {
  return path === "/" ? "/ar" : `/ar${path}`;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const pages = routes.flatMap((path) => {
    const enUrl = `${site.domain}${path === "/" ? "" : path}`;
    const arUrl = `${site.domain}${arPath(path)}`;
    const languages = { en: enUrl, ar: arUrl, "x-default": enUrl };
    const priority = path === "/" ? 1 : 0.8;

    return [
      { url: enUrl, lastModified, changeFrequency: "monthly" as const, priority, alternates: { languages } },
      { url: arUrl, lastModified, changeFrequency: "monthly" as const, priority, alternates: { languages } },
    ];
  });

  const servicePages = services.flatMap((service) => {
    const enUrl = `${site.domain}/services/${service.slug}`;
    const arUrl = `${site.domain}/ar/services/${service.slug}`;
    const languages = { en: enUrl, ar: arUrl, "x-default": enUrl };

    return [
      { url: enUrl, lastModified, changeFrequency: "monthly" as const, priority: 0.7, alternates: { languages } },
      { url: arUrl, lastModified, changeFrequency: "monthly" as const, priority: 0.7, alternates: { languages } },
    ];
  });

  const insightPages = insightArticles.flatMap((article) => {
    const enUrl = `${site.domain}/insights/${article.slug}`;
    const arUrl = `${site.domain}/ar/insights/${article.slug}`;
    const languages = { en: enUrl, ar: arUrl, "x-default": enUrl };
    // The article's own publish date, not build time — a real, distinct
    // signal per URL rather than every page in the sitemap sharing one
    // "now" timestamp that means nothing to a crawler.
    const modified = new Date(article.date);
    const priority = article.featured ? 0.7 : 0.6;

    return [
      { url: enUrl, lastModified: modified, changeFrequency: "monthly" as const, priority, alternates: { languages } },
      { url: arUrl, lastModified: modified, changeFrequency: "monthly" as const, priority, alternates: { languages } },
    ];
  });

  return [...pages, ...servicePages, ...insightPages];
}
