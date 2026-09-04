"use client";

import type { Industry } from "@/lib/site";
import { Band } from "@/components/ui";
import { useScrollStory } from "./use-scroll-story";

/**
 * "The Approach" as a vertical timeline with a moving indicator — the
 * page's third and final scroll-linked interaction. Content is
 * `industry.approach`, the same five real steps the generic template
 * already rendered as a `CardGrid`; only the composition changes, from a
 * grid of cards to a single strategic sequence with one thing visibly
 * progressing down it.
 */
export function ApproachTimeline({ industry }: { industry: Industry }) {
  const { containerRef, active, progress } = useScrollStory<HTMLDivElement>(
    industry.approach.length,
  );

  return (
    <Band className="bg-mist">
      <div className="reveal mb-14 max-w-[720px] wide:mb-20">
        <p className="eyebrow re-label flex items-center gap-3 text-carbon/70">
          <span aria-hidden="true" className="h-px w-6 bg-carbon/50" />
          The Approach
        </p>
        <h2 className="mt-5 font-display text-[2.25rem] font-normal leading-[1.12] wide:text-[2.75rem]">
          How we&apos;d take this on.
        </h2>
      </div>

      <div className="grid gap-10 wide:grid-cols-[3rem_1fr] wide:gap-16">
        <div
          aria-hidden="true"
          className="relative hidden w-px bg-platinum/50 wide:block"
        >
          <div
            className="absolute left-0 top-0 w-px origin-top bg-carbon transition-transform duration-300 ease-out"
            style={{ height: "100%", transform: `scaleY(${progress})` }}
          />
          <div
            className="absolute -left-[5px] h-[11px] w-[11px] rounded-full bg-carbon shadow-[0_0_0_4px_#abbfc7] transition-[top] duration-300 ease-out"
            style={{
              top:
                industry.approach.length > 1
                  ? `${(active / (industry.approach.length - 1)) * 100}%`
                  : "0%",
            }}
          />
        </div>

        <div ref={containerRef} className="flex flex-col">
          {industry.approach.map((step, i) => {
            const isActive = i === active;
            return (
              <div
                key={step.step}
                data-story-item
                className="grid grid-cols-[3.5rem_1fr] gap-6 border-t border-platinum/50 py-8 wide:grid-cols-1 wide:gap-3 wide:py-9"
              >
                <span
                  className={`font-display transition-[font-size,color,opacity] duration-500 wide:hidden ${
                    isActive ? "text-[2rem] text-carbon" : "text-[1.5rem] text-carbon/50"
                  }`}
                >
                  {step.step}
                </span>
                <div>
                  <div className="hidden items-baseline gap-4 wide:flex">
                    <span
                      className={`font-display transition-[font-size,color] duration-500 ${
                        isActive
                          ? "text-[2.5rem] text-carbon"
                          : "text-[1.75rem] text-carbon/50"
                      }`}
                    >
                      {step.step}
                    </span>
                    <h3
                      className={`font-display font-medium leading-[1.15] transition-[font-size,color] duration-500 ${
                        isActive
                          ? "text-[2rem] text-carbon"
                          : "text-[1.5rem] text-carbon/60"
                      }`}
                    >
                      {step.title}
                    </h3>
                  </div>
                  <h3
                    className={`font-display text-[1.375rem] font-medium leading-[1.2] wide:hidden ${
                      isActive ? "text-carbon" : "text-carbon/62"
                    }`}
                  >
                    {step.title}
                  </h3>
                  <p
                    className={`mt-3 max-w-[560px] text-[0.9375rem] font-normal leading-[1.7] transition-colors duration-500 wide:mt-3 wide:text-[1.0625rem] ${
                      isActive ? "text-carbon/88" : "text-carbon/72"
                    }`}
                  >
                    {step.desc}
                  </p>
                </div>
              </div>
            );
          })}
          <div className="border-t border-platinum/50" />
        </div>
      </div>
    </Band>
  );
}
