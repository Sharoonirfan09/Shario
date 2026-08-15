import { insightCategories, nav, services, site } from "@/lib/site";

/**
 * `/llms.txt` — the emerging convention (llmstxt.org) for a plain-text
 * summary aimed at AI/LLM crawlers, alongside `robots.txt` and
 * `sitemap.xml`. Built from `lib/site.ts` rather than hand-written prose so
 * it can't quietly drift out of sync with the real service catalogue or
 * Insights categories the way a static file would the next time either
 * changes.
 *
 * Deliberately concise: a link per service/category, not a full article
 * index — the file is meant to orient a crawler toward the real pages, not
 * duplicate their content.
 */
export function GET() {
  const lines: string[] = [];

  lines.push(`# ${site.name}`);
  lines.push("");
  lines.push(`> ${site.description}`);
  lines.push("");
  lines.push(
    `${site.name} is a founder-led digital marketing and creative studio based in ${site.location}, working with ambitious businesses across the region. The founder, ${site.founder} (${site.founderRole}), stays directly involved in the accounts the studio runs.`,
  );
  lines.push("");

  lines.push("## Services");
  for (const service of services) {
    lines.push(`- [${service.name}](${site.domain}/services/${service.slug}): ${service.descriptor}`);
  }
  lines.push("");

  lines.push("## Insights");
  lines.push(
    `${site.name}'s editorial hub — market news, articles, case studies, trends and guides on performance marketing, SEO, websites and CRM in Dubai.`,
  );
  for (const category of insightCategories) {
    lines.push(`- [${category.name}](${site.domain}/insights?category=${category.slug}): ${category.description}`);
  }
  lines.push("");

  lines.push("## Company");
  for (const item of nav) {
    lines.push(`- [${item.label}](${site.domain}${item.href})`);
  }
  lines.push("");

  lines.push("## Languages");
  lines.push(`- English: ${site.domain}/`);
  lines.push(`- Arabic (RTL): ${site.domain}/ar`);
  lines.push(`- Russian: ${site.domain}/ru`);
  lines.push("");

  lines.push("## Contact");
  lines.push(`- Email: ${site.email}`);
  lines.push(`- Website: ${site.website}`);
  lines.push(`- Location: ${site.location}`);

  return new Response(lines.join("\n") + "\n", {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=0, must-revalidate",
    },
  });
}
