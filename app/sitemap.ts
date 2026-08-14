import type { MetadataRoute } from "next";
import { insightArticles, services, site } from "@/lib/site";

const routes = ["/", "/services", "/insights", "/about", "/contact"];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const pages = routes.map((path) => ({
    url: `${site.domain}${path === "/" ? "" : path}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: path === "/" ? 1 : 0.8,
  }));

  const servicePages = services.map((service) => ({
    url: `${site.domain}/services/${service.slug}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const insightPages = insightArticles.map((article) => ({
    url: `${site.domain}/insights/${article.slug}`,
    // The article's own publish date, not build time — a real, distinct
    // signal per URL rather than every page in the sitemap sharing one
    // "now" timestamp that means nothing to a crawler.
    lastModified: new Date(article.date),
    changeFrequency: "monthly" as const,
    priority: article.featured ? 0.7 : 0.6,
  }));

  return [...pages, ...servicePages, ...insightPages];
}
