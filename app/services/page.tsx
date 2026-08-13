import type { Metadata } from "next";
import {
  Band,
  Card,
  CardGrid,
  CtaBand,
  PillLink,
  SectionIntro,
  TypeHero,
} from "@/components/ui";
import { cta, services } from "@/lib/site";

/**
 * Card grounds for this page.
 *
 * The homepage renders the same six services and has its own set — no
 * photograph may appear twice anywhere on the site, so the two grids cannot
 * share. These are cut from five further originals; strategy-consulting has
 * no distinct replacement yet (see its `heroImage` note in `lib/site.ts`), so
 * its card renders the same badge-only header the design system already uses
 * for photo-less cards elsewhere.
 */
const cardImages: Record<string, string> = {
  "performance-marketing": "/images/texture/idx-performance.jpg",
  "seo-and-content": "/images/texture/idx-seo.jpg",
  "websites-and-cro": "/images/texture/idx-web.jpg",
  "crm-and-automation": "/images/texture/idx-crm.jpg",
  "brand-and-creative": "/images/texture/idx-brand.jpg",
};

export const metadata: Metadata = {
  title: "Services",
  description:
    "Digital marketing services in Dubai — performance marketing, SEO and content, websites and CRO, CRM and automation, brand and creative. Engage one service or the entire funnel.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      {/* Carbon, like every other hero on the site — the header overlays the
          hero and sets its type in Porcelain, so a light hero would swallow
          the navigation. Simplified to the page name only, matching About. */}
      <TypeHero
        src="/images/book/services-lounge.jpg"
        focus="object-[50%_60%]"
        tone="carbon"
        eyebrow="Services"
      />

      {/* Same card system as the homepage's Services section — numbered,
          image-headed cards, one per service — expanded with the closing CTA
          band a full services index needs. */}
      <Band>
        <SectionIntro
          eyebrow="What We Do"
          title="Six services. One connected system."
          sub="Each stands on its own, and each is stronger when the others are carrying their part of the funnel."
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
              image={cardImages[service.slug]}
              delay={i * 60}
            />
          ))}
        </CardGrid>
      </Band>

      <CtaBand
        title="Let's connect."
        sub="Fifteen minutes on where your marketing can win more revenue, and how Shario would unlock it."
      >
        <PillLink href={cta.href} tone="solid" size="lg">
          {cta.label}
        </PillLink>
      </CtaBand>
    </>
  );
}
