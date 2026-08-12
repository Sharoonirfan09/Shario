import type { MetadataRoute } from "next";
import { services, site } from "@/lib/site";

const routes = ["/", "/services", "/about", "/contact"];

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

  return [...pages, ...servicePages];
}
