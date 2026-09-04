"use client";

import type { Industry } from "@/lib/site";
import { Container } from "@/components/ui";
import { useScrollStory } from "./use-scroll-story";

/**
 * "The Challenges" as a dark Carbon editorial list — the page's one
 * full-contrast band, and its second signature scroll interaction. Content
 * is `industry.challenges`, unchanged; only the heading above it departs
 * from the generic template's plain UI label ("What makes this market
 * hard."), since that string is interface copy rather than indexed
 * per-industry content.
 */
export function Challenges({ industry }: { industry: Industry }) {
  const { containerRef, active, progress } = useScrollStory<HTMLDivElement>(
    industry.challenges.length,
  );

  return (
    <section className="bg-carbon text-porcelain">
      <Container className="py-16 wide:py-[clamp(5rem,9vw,8.75rem)]">
        <div className="reveal mb-16 max-w-[820px] wide:mb-20">
          <p className="eyebrow flex items-center gap-3 text-porcelain/70">
            <span aria-hidden="true" className="h-px w-6 bg-mist" />
            The Challenges
          </p>
          <h2 className="mt-5 font-display text-[2.25rem] font-normal leading-[1.14] wide:text-[clamp(2.5rem,4.2vw,3.75rem)]">
            The property market doesn&apos;t have a traffic problem.
            <br className="hidden wide:block" /> It has a relevance problem.
          </h2>
        </div>

        <div className="grid gap-12 wide:grid-cols-[auto_1fr] wide:gap-16">
          {/* Progress rail — hidden on mobile, where the list itself is the
              only indicator needed. */}
          <div
            aria-hidden="true"
            className="relative hidden w-px bg-porcelain/15 wide:block"
          >
            <div
              className="absolute left-0 top-0 w-px origin-top bg-mist transition-transform duration-300 ease-out"
              style={{
                height: "100%",
                transform: `scaleY(${progress})`,
              }}
            />
          </div>

          <div ref={containerRef} className="flex flex-col">
            {industry.challenges.map((challenge, i) => {
              const isActive = i === active;
              return (
                <div
                  key={challenge.title}
                  data-story-item
                  className="grid grid-cols-[3.5rem_1fr] gap-6 border-t border-porcelain/15 py-8 transition-[opacity] duration-500 wide:grid-cols-[5rem_1fr] wide:gap-12 wide:py-10"
                  style={{ opacity: isActive ? 1 : 0.4 }}
                >
                  <span
                    className={`font-display leading-none transition-[font-size,color] duration-500 ${
                      isActive
                        ? "text-[2.75rem] text-mist wide:text-[3.5rem]"
                        : "text-[2rem] text-porcelain/40 wide:text-[2.5rem]"
                    }`}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3
                      className={`font-display text-[1.5rem] leading-[1.2] transition-colors duration-500 wide:text-[2rem] ${
                        isActive ? "text-porcelain" : "text-porcelain/60"
                      }`}
                    >
                      {challenge.title}
                    </h3>
                    <p
                      className={`mt-3 max-w-[620px] text-[0.9375rem] leading-[1.7] transition-[opacity] duration-500 wide:mt-4 wide:text-[1.0625rem] ${
                        isActive ? "text-porcelain/80 opacity-100" : "text-porcelain/60 opacity-70"
                      }`}
                    >
                      {challenge.desc}
                    </p>
                  </div>
                </div>
              );
            })}
            <div className="border-t border-porcelain/15" />
          </div>
        </div>
      </Container>
    </section>
  );
}
