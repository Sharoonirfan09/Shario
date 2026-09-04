"use client";

import Link from "next/link";
import type { Industry } from "@/lib/site";
import { Band } from "@/components/ui";
import { useScrollStory } from "./use-scroll-story";

/**
 * "The Real Estate Funnel" — the page's first signature interaction.
 *
 * A horizontal stage map (Position → Measure) sits above a vertical list of
 * the same six stages with their supporting copy. Both are driven by one
 * `useScrollStory` reading of the vertical list's scroll position: the
 * connecting line above fills to `progress`, the map numbers light up in step
 * with `active`, and the active row below brightens the same way the
 * Challenges band's editorial list does. Collapses to just the vertical list
 * on mobile — the map is a desktop-width affordance, not something worth
 * fighting into a phone's width.
 */
const STAGES = [
  {
    label: "Position",
    desc: "Define what makes this launch or brokerage the obvious choice against what's next door.",
  },
  {
    label: "Attract",
    desc: "Paid and organic reach structured around the actual launch calendar, not a flat monthly spend.",
  },
  {
    label: "Capture",
    desc: "A website fast enough, and clear enough, to convert a buyer researching on their phone.",
  },
  {
    label: "Nurture",
    desc: "Automated follow-up that keeps a six-week decision warm without a salesperson chasing it daily.",
  },
  {
    label: "Convert",
    desc: "Filtering for genuine buyer intent, so the sales team spends its time on leads that can actually close.",
  },
  {
    label: "Measure",
    desc: "Reviewing cost per qualified lead weekly against what the team can close, not against impressions.",
  },
] as const;

export function Funnel({ industry }: { industry: Industry }) {
  const { containerRef, active, progress } = useScrollStory<HTMLDivElement>(
    STAGES.length,
  );

  return (
    <Band className="bg-limestone/30">
      <div className="reveal mb-14 max-w-[720px] wide:mb-20">
        <p className="eyebrow re-label flex items-center gap-3 text-carbon/70">
          <span aria-hidden="true" className="h-px w-6 bg-mist" />
          The System
        </p>
        <h2 className="mt-5 font-display text-[2.25rem] font-normal leading-[1.12] wide:text-[2.75rem]">
          One connected system, not six separate vendors.
        </h2>
        <p className="mt-6 flex flex-wrap items-center gap-x-2.5 gap-y-2 text-[0.9375rem] font-normal text-carbon/82">
          {industry.services.map((s, i) => (
            <span key={s.slug} className="flex items-center gap-2.5">
              <Link
                href={`/services/${s.slug}`}
                className="border-b border-carbon/25 pb-0.5 transition-colors duration-300 hover:border-carbon hover:text-carbon"
              >
                {s.title.replace(/ for Real Estate$| for Launches$/, "")}
              </Link>
              {i < industry.services.length - 1 && (
                <span aria-hidden="true" className="text-carbon/45">
                  +
                </span>
              )}
            </span>
          ))}
        </p>
      </div>

      {/* Desktop stage map — six numbers over a connecting hairline that
          fills as the reader scrolls the detail list below. */}
      <div
        aria-hidden="true"
        className="reveal relative mb-16 hidden wide:block"
      >
        <div className="absolute inset-x-0 top-[13px] h-px bg-platinum/60" />
        <div
          className="absolute left-0 top-[13px] h-px w-full origin-left bg-carbon transition-transform duration-300 ease-out"
          style={{ transform: `scaleX(${progress})` }}
        />
        <div className="relative grid grid-cols-6">
          {STAGES.map((stage, i) => (
            <div key={stage.label} className="flex flex-col items-center gap-4">
              <span
                className={`z-10 flex h-7 w-7 items-center justify-center rounded-full font-display text-[0.8125rem] transition-colors duration-500 ${
                  i <= active
                    ? "bg-carbon text-porcelain"
                    : "bg-limestone text-carbon/58 border border-platinum/60"
                }`}
              >
                {i + 1}
              </span>
              <span
                className={`label-sm re-label transition-colors duration-500 ${
                  i === active ? "text-carbon" : "text-carbon/58"
                }`}
              >
                {stage.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Vertical detail list — the scroll-tracked source of truth for both
          the map above and the row highlighting here. */}
      <div ref={containerRef} className="flex flex-col">
        {STAGES.map((stage, i) => {
          const isActive = i === active;
          return (
            <div
              key={stage.label}
              data-story-item
              className="grid grid-cols-[auto_1fr] items-baseline gap-6 border-t border-platinum/45 py-7 transition-opacity duration-500 wide:grid-cols-[3rem_10rem_1fr] wide:gap-10 wide:py-8"
              style={{ opacity: isActive ? 1 : 0.62 }}
            >
              <span className="font-display text-[1.375rem] text-carbon/65 wide:text-[1.625rem]">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3
                className={`font-display text-[1.5rem] leading-[1.15] wide:text-[1.875rem] ${
                  isActive ? "text-carbon" : "text-carbon/72"
                }`}
              >
                {stage.label}
              </h3>
              <p className="col-span-2 max-w-[520px] text-[0.9375rem] font-normal leading-[1.7] text-carbon/82 wide:col-span-1">
                {stage.desc}
              </p>
            </div>
          );
        })}
        <div className="border-t border-platinum/45" />
      </div>
    </Band>
  );
}
