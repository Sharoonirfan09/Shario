import Image from "next/image";
import type { Industry } from "@/lib/site";
import { Breadcrumb, Container } from "@/components/ui";
import { cta, site } from "@/lib/site";
import { realEstateImages } from "./images";

/**
 * The Real Estate page's own cinematic hero — a full-height photograph with
 * a staged type reveal, distinct from the sitewide `Hero` in `components/ui.tsx`
 * (which every other Industries page still uses). Built from the same
 * primitives (`.rise`, `.settle`, `.draw`, the two-part scrim) rather than a
 * new animation system, so entrance timing and the header's transparent-dark
 * contrast handling stay identical to the rest of the site.
 */
export function RealEstateHero({
  industry,
  breadcrumbItems,
}: {
  industry: Industry;
  breadcrumbItems: readonly { href?: string; label: string }[];
}) {
  return (
    <section className="relative flex min-h-[640px] items-end mt-[calc(-1*var(--header-h))] wide:min-h-[94vh]">
      <Image
        src={realEstateImages.hero}
        alt="A residential tower's honey-limestone facade and private terraces catching golden-hour light, Dubai."
        fill
        sizes="100vw"
        priority
        fetchPriority="high"
        className="settle object-cover object-[72%_38%]"
      />
      {/* Same two-part scrim as the sitewide Hero — a full-frame bottom fade
          for the type, plus a strip scoped to the header's own height so a
          bright sky at the top edge never washes out the Porcelain nav ink. */}
      <div className="absolute inset-0 bg-gradient-to-t from-carbon/75 via-carbon/20 via-40% to-transparent" />
      <div className="absolute inset-x-0 top-0 h-[calc(var(--header-h)+64px)] bg-gradient-to-b from-carbon/70 via-carbon/25 to-transparent" />

      <Container className="relative z-10 w-full pb-16 pt-[calc(var(--header-h)+4rem)] text-porcelain wide:pb-24 wide:pt-[calc(var(--header-h)+5.5rem)]">
        <Breadcrumb items={breadcrumbItems} />

        <p className="eyebrow eyebrow-hero rise rise-delay-1 mt-6 flex items-center gap-3 text-porcelain/85">
          <span aria-hidden="true" className="h-px w-7 bg-mist" />
          Industries / {industry.name}
        </p>

        <h1 className="rise rise-delay-2 mt-6 max-w-[900px] font-display text-[2.75rem] font-normal leading-[1.05] wide:text-[clamp(3.5rem,6.2vw,6rem)]">
          {industry.title}
        </h1>

        {/* The site's strongest existing positioning line for this
            industry — `industry.lead` — carried verbatim, not rewritten. */}
        <p className="lede rise rise-delay-3 mt-8 max-w-[560px] text-porcelain/85">
          {industry.lead}
        </p>

        {/* `.draw` alone, not combined with `.rise` — both set the `animation`
            shorthand, and stacking them on one element would let only
            whichever rule wins the cascade actually play. The inline delay
            keeps it in step with the `rise-delay-3` group beside it. */}
        <div
          className="mt-6 h-px w-24 origin-left bg-mist/70 draw"
          style={{ animationDelay: "420ms" }}
        />

        <div className="rise rise-delay-3 mt-9 flex flex-wrap items-center gap-6">
          <a
            href={`${cta.href}?text=${encodeURIComponent(industry.ctaMessage)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block rounded-full border border-porcelain bg-porcelain px-11 py-[18px] text-xs uppercase tracking-[0.08em] text-carbon transition-colors duration-500 hover:border-mist hover:bg-mist"
          >
            Book a launch strategy call
          </a>
          {/* Small editorial metadata, in the ledger's own numeric setting —
              a magazine credit line, not a stat claim. */}
          <p className="label-sm re-label flex items-center gap-2.5 text-porcelain/78">
            <span aria-hidden="true" className="font-display text-[0.9375rem] text-porcelain/80">
              {industry.num}
            </span>
            {site.location}
          </p>
        </div>
      </Container>
    </section>
  );
}
