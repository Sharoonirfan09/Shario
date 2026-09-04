import Image from "next/image";
import { Band, DotList } from "@/components/ui";
import { realEstateImages } from "./images";

/**
 * "Who It's For" as four large interactive panels rather than the generic
 * template's two-column dot list. The four categories and their wording are
 * a direct recomposition of `industry.whoWeWorkWith` (still rendered
 * unabridged, screen-reader only, immediately after — see the closing
 * `DotList`) — nothing here is a new claim, only a new arrangement of the
 * same six approved lines into four editorial categories.
 *
 * Three categories carry a photograph; Investment & Asset Management runs
 * typography-only by design — the same light/porcelain/carbon/image/type
 * variety the Services grid below it uses, not a missing asset.
 */
const CATEGORIES = [
  {
    num: "01",
    title: "Developers",
    desc: "Bringing a new project to market — from first render to the launch weekend that decides its momentum.",
    image: realEstateImages.audienceDevelopers,
    alt: "A tower under construction at dusk, its concrete frame and crane silhouetted against a warm sky.",
  },
  {
    num: "02",
    title: "Brokerages",
    desc: "Multi-agent brokerages managing shared listing inventory, and independent brokers building a personal referral pipeline.",
    image: realEstateImages.audienceBrokerages,
    alt: "A stone reception desk inside a Dubai brokerage, the city skyline visible through floor-to-ceiling glass.",
  },
  {
    num: "03",
    title: "Property Firms",
    desc: "Consultants advising investors and end-users, and management companies marketing the portfolios they run.",
    image: realEstateImages.audienceProperty,
    alt: "Close detail of brushed bronze and stone facade cladding, raking afternoon light.",
  },
  {
    num: "04",
    title: "Investment & Asset Management",
    desc: "Real estate investment and asset management firms marketing performance, not just inventory.",
    image: null,
    alt: "",
  },
] as const;

export function Audience({
  whoWeWorkWith,
}: {
  whoWeWorkWith: readonly string[];
}) {
  return (
    <Band>
      <div className="reveal mb-14 max-w-[760px] wide:mb-20">
        <p className="eyebrow re-label flex items-center gap-3 text-carbon/70">
          <span aria-hidden="true" className="h-px w-6 bg-mist" />
          Who We Work With
        </p>
        <h2 className="mt-5 font-display text-[2.25rem] font-normal leading-[1.12] wide:text-[2.75rem]">
          Built for the businesses behind the property market.
        </h2>
      </div>

      <div className="grid gap-5 wide:grid-cols-4 wide:gap-6">
        {CATEGORIES.map((cat, i) => (
          <div
            key={cat.title}
            data-delay={i * 90}
            className="reveal group relative isolate flex aspect-[3/4] flex-col justify-end overflow-hidden border border-platinum/50 p-7 wide:p-8"
          >
            {cat.image ? (
              <>
                <Image
                  src={cat.image}
                  alt={cat.alt}
                  fill
                  sizes="(min-width: 880px) 25vw, 100vw"
                  className="object-cover opacity-[0.55] transition-[transform,opacity] duration-700 ease-out group-hover:scale-[1.06] group-hover:opacity-80"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-carbon/85 via-carbon/35 to-carbon/10 transition-opacity duration-700 group-hover:from-carbon/90" />
              </>
            ) : (
              <div className="absolute inset-0 bg-carbon transition-colors duration-700 group-hover:bg-black" />
            )}

            <span
              aria-hidden="true"
              className="relative z-10 font-display text-[0.9375rem] text-porcelain/78 transition-colors duration-500 group-hover:text-mist"
            >
              {cat.num}
            </span>
            <h3 className="relative z-10 mt-4 font-display text-[1.5rem] font-medium leading-[1.15] text-porcelain transition-transform duration-500 group-hover:-translate-y-1 wide:text-[1.625rem]">
              {cat.title}
            </h3>
            <p className="relative z-10 mt-3.5 max-w-[220px] text-[0.9375rem] font-normal leading-[1.6] text-porcelain/88">
              {cat.desc}
            </p>
            <span
              aria-hidden="true"
              className="relative z-10 mt-6 flex items-center gap-2 text-porcelain/85 transition-colors duration-500 group-hover:text-porcelain"
            >
              <span className="h-px w-6 bg-current transition-all duration-500 group-hover:w-9" />
              <span className="text-[0.75rem] uppercase tracking-[0.15em]">
                {String(i + 1).padStart(2, "0")} / 04
              </span>
            </span>
          </div>
        ))}
      </div>

      {/* The full six-line list stays in the document for search engines and
          screen readers — the four panels above are a visual recomposition,
          not a content reduction. */}
      <div className="sr-only">
        <DotList items={whoWeWorkWith} columns={1} accent={false} />
      </div>
    </Band>
  );
}
