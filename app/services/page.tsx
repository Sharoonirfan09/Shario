import type { Metadata } from "next";
import {
  Band,
  Card,
  CardGrid,
  CtaBand,
  PillLink,
  SectionIntro,
  StatBand,
  TypeHero,
} from "@/components/ui";
import { cta, services, stats } from "@/lib/site";

/**
 * Card grounds for this page.
 *
 * The homepage renders the same five services and has its own set — no
 * photograph may appear twice anywhere on the site, so the two grids cannot
 * share. These are cut from six further originals; the clean part of the
 * library is now spent.
 */
const cardTextures: Record<string, string> = {
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
          the navigation. */}
      <TypeHero
        tone="carbon"
        eyebrow="Services"
        title="Digital marketing services in Dubai."
        subhead="Shario delivers the full marketing system a Dubai brand needs to generate demand and convert it into revenue. Engage one service, or the entire funnel."
      >
        <PillLink href={cta.href} tone="solidLight">
          {cta.label}
        </PillLink>
      </TypeHero>

      <Band>
        <SectionIntro
          eyebrow="What We Do"
          title="Five services. One connected system."
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
              action="Explore"
              background={cardTextures[service.slug]}
              delay={i * 60}
            />
          ))}
          <Card
            href={cta.href}
            title="Tell us your goal."
            desc="We will tell you which of these gets you there, and which you can leave until later."
            action={cta.label}
            background="/images/texture/idx-cta.jpg"
            delay={services.length * 60}
          />
        </CardGrid>
      </Band>

      <StatBand
        eyebrow="Why It Works"
        title="Every service is measured against revenue."
        body="Not impressions, not rankings for their own sake. Each engagement reports weekly against pipeline and closed sales."
        stats={stats}
        action={
          <PillLink href="/results" tone="solidLight">
            See the record
          </PillLink>
        }
      />

      <CtaBand
        title="Book a strategy call."
        sub="Fifteen minutes on where your marketing can win more revenue, and how Shario would unlock it."
      >
        <PillLink href={cta.href} tone="solid" size="lg">
          {cta.label}
        </PillLink>
      </CtaBand>
    </>
  );
}
