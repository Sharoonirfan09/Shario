import type { MetadataRoute } from "next";
import { industries, services, site, work } from "@/lib/site";

/**
 * Built from the routes themselves rather than from `nav` — Insights is still
 * a homepage anchor, and an anchor is not a URL a crawler should be handed
 * separately.
 */
const routes = [
  "/",
  "/about",
  "/services",
  "/work",
  "/industries",
  "/contact",
];

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

  const workPages = work.map((item) => ({
    url: `${site.domain}/work/${item.slug}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const industryPages = industries.map((industry) => ({
    url: `${site.domain}/industries/${industry.slug}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...pages, ...servicePages, ...workPages, ...industryPages];
}
