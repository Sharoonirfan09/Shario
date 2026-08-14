import { Band, Card, CardGrid, SectionIntro } from "@/components/ui";
import { services } from "@/lib/site";

/**
 * Card grounds. Every one is a distinct photograph used nowhere else on the
 * site — `npm run check:images` fails the build if any of them repeats.
 *
 * This section is shared, byte-for-byte, between the homepage and
 * `/services` — both show the same six services, so both show the same six
 * photographs. Keeping it in one component (rather than copy-pasted into
 * both pages) is what lets `check:images`' static scan see each path
 * referenced exactly once in source, even though the section itself renders
 * on two routes.
 */
const serviceImages: Record<string, string> = {
  "performance-marketing": "/images/texture/svc-performance.jpg",
  "seo-and-content": "/images/texture/svc-seo.jpg",
  "websites-and-cro": "/images/texture/svc-web.jpg",
  "crm-and-automation": "/images/texture/svc-crm.jpg",
  "brand-and-creative": "/images/texture/svc-brand.jpg",
  "strategy-consulting": "/images/texture/svc-strategy.jpg",
};

/**
 * Cycles through the brand's tone palette in order rather than `CardGrid`'s
 * default rhythm (alternating Limestone/Porcelain with the last card forced
 * to Carbon) — every card gets an explicit tone here so the sequence repeats
 * cleanly across all six instead of singling one out.
 */
const serviceTones = ["limestone", "porcelain", "carbon"] as const;

/**
 * "Everything you need to grow, handled by one team." — the six-service
 * grid. Homepage is the master reference; `/services` renders this exact
 * same component rather than a page-specific copy, so the two can never
 * drift apart.
 */
export function SixServices() {
  return (
    <Band>
      <SectionIntro
        eyebrow="Our Services"
        title={
          <>
            Everything you need to grow,
            <br className="hidden wide:block" /> handled by one team.
          </>
        }
        sub="From paid media and search to websites, CRM and creative — the full marketing system a Dubai brand needs to generate demand and convert it into revenue."
      />
      <CardGrid columns={3}>
        {services.map((service, i) => (
          <Card
            key={service.slug}
            href={`/services/${service.slug}`}
            badge={service.num}
            title={service.name}
            titleAs="h3"
            desc={service.descriptor}
            action="Learn more"
            image={serviceImages[service.slug]}
            tone={serviceTones[i % serviceTones.length]}
            delay={i * 60}
          />
        ))}
      </CardGrid>
    </Band>
  );
}
