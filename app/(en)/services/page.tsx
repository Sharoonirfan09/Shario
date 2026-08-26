import type { Metadata } from "next";
import { SixServices } from "@/components/six-services";
import { CtaBand, Hero, PillLink } from "@/components/ui";
import { cta, heroImages, ogDefaults } from "@/lib/site";

const description =
  "Shario is a digital marketing agency in Dubai offering SEO, website development, branding, CRM & marketing automation and marketing consulting. Engage one service or the entire funnel.";

/** Path/crop live in `lib/site.ts` as `heroImages.services`, shared with the Arabic page, both locales' `opengraph-image.tsx`, and `[slug]`'s not-found fallback. */
export const HERO_IMAGE = heroImages.services.src;
export const HERO_IMAGE_ALT =
  "A framed painting of a woman in a wide-brimmed hat and a pleated cream dress, leaning against a deep red canvas in a sunlit, panelled room";

export const metadata: Metadata = {
  title: "Digital Marketing Agency in Dubai — Our Services",
  description,
  alternates: {
    canonical: "/services",
    languages: { en: "/services", ar: "/ar/services", ru: "/ru/services", "x-default": "/services" },
  },
  openGraph: {
    ...ogDefaults,
    url: "/services",
    type: "website",
    title: "Shario — Digital Marketing Agency in Dubai, Our Services",
    description,
  },
};

export default function ServicesPage() {
  return (
    <>
      {/* `Hero` here carries no visible `title` — this banner is
          eyebrow-only by design, matching About. A screen-reader-only H1
          gives the page the one real heading every page needs — phrased to
          cover the full six-service catalogue below rather than lead with
          any one service, without adding anything to what a sighted visitor
          sees. */}
      <h1 className="sr-only">
        Digital Marketing Agency in Dubai — Our Services
      </h1>
      <Hero
        src={HERO_IMAGE}
        alt={HERO_IMAGE_ALT}
        focus="object-[48%_30%]"
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
