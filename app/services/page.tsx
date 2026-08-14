import type { Metadata } from "next";
import { SixServices } from "@/components/six-services";
import { CtaBand, Hero, PillLink } from "@/components/ui";
import { cta } from "@/lib/site";

const description =
  "SHARIO is a performance marketing agency in Dubai offering performance marketing, SEO and content, websites and CRO, CRM and automation, brand and creative. Engage one service or the entire funnel.";

/** Shared with `opengraph-image.tsx` (and `[slug]`'s not-found fallback) so the banner path is a literal in exactly one file — `check:images` flags any path quoted more than once. */
export const HERO_IMAGE = "/images/book/services-drive.jpg";
export const HERO_IMAGE_ALT =
  "The cream leather interior of a classic convertible in warm afternoon light, a bow and a leather shoe resting on the seat";

export const metadata: Metadata = {
  title: "Performance Marketing Agency Services in Dubai",
  description,
  alternates: { canonical: "/services" },
  openGraph: {
    url: "/services",
    type: "website",
    title: "Performance Marketing Agency Services in Dubai — Shario",
    description,
  },
};

export default function ServicesPage() {
  return (
    <>
      {/* `Hero` here carries no visible `title` — this banner is
          eyebrow-only by design, matching About. A screen-reader-only H1
          gives the page the one real heading every page needs, carrying the
          "performance marketing agency" phrase this page is the natural
          home for, without adding anything to what a sighted visitor sees. */}
      <h1 className="sr-only">
        Performance Marketing Agency Services in Dubai
      </h1>
      <Hero
        src={HERO_IMAGE}
        alt={HERO_IMAGE_ALT}
        focus="object-[38%_45%]"
        eyebrow="Services"
        priority
      />

      {/* The homepage's own "Everything you need to grow, handled by one
          team." section, unmodified — the homepage is the master reference,
          so this page renders that exact component rather than a
          page-specific copy with its own heading and image set. */}
      <SixServices />

      <CtaBand
        title="Let's connect."
        sub="Fifteen minutes on where your marketing can win more revenue, and how Shario would unlock it."
        arabicAccent
      >
        <PillLink href={cta.href} tone="solid" size="lg">
          {cta.label}
        </PillLink>
      </CtaBand>
    </>
  );
}
