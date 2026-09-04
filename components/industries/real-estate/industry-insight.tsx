import Image from "next/image";
import type { Industry } from "@/lib/site";
import { Band, InlineLinks } from "@/components/ui";
import { realEstateImages } from "./images";

/**
 * "The Industry" as a magazine spread — a tall photograph beside the
 * eyebrow on the left, the editorial statement and body copy on the right.
 * Every word here is `industry.subhead` / `industry.intro` / `industry.bodyLinks`,
 * unchanged from the generic template this page replaces — only the
 * composition is new.
 */
export function IndustryInsight({ industry }: { industry: Industry }) {
  return (
    <Band>
      <div className="grid gap-12 wide:grid-cols-[0.8fr_1.2fr] wide:gap-20">
        <div className="reveal flex flex-col gap-8 wide:sticky wide:top-[calc(var(--header-h)+2rem)] wide:self-start">
          <p className="eyebrow re-label flex items-center gap-3 text-carbon/70">
            <span aria-hidden="true" className="h-px w-6 bg-mist" />
            The Industry
          </p>
          <div className="frame relative aspect-[4/5] w-full">
            <Image
              src={realEstateImages.insight}
              alt="Repeating balconies and stone fins on a contemporary Dubai residential facade, catching low afternoon light."
              fill
              sizes="(min-width: 880px) 38vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>

        <div>
          <h2 className="reveal font-display text-[2.25rem] font-normal leading-[1.12] text-balance wide:text-[clamp(2.5rem,4vw,3.5rem)]">
            {industry.subhead}
          </h2>
          <p
            className="lede reveal mt-8 text-carbon/85"
            data-delay={80}
          >
            {industry.intro[0]}
          </p>
          <p
            className="reveal mt-6 text-[1.0625rem] font-normal leading-[1.75] text-carbon/85"
            data-delay={180}
          >
            {industry.intro[1]}
          </p>
          <p
            className="reveal mt-6 border-t border-carbon/12 pt-7 text-[1.0625rem] font-normal leading-[1.75] text-carbon/85"
            data-delay={220}
          >
            <InlineLinks segments={industry.bodyLinks} />
          </p>
        </div>
      </div>
    </Band>
  );
}
