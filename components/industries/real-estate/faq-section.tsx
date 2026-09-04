import type { Industry } from "@/lib/site";
import { Band } from "@/components/ui";
import { Faq } from "@/components/faq";

/**
 * "Questions, Answered" — a split editorial layout (label left, accordion
 * right) instead of the generic template's centred `SectionIntro` + boxed
 * `<Faq>`. `<Faq>` itself is untouched: it already renders un-boxed rows
 * with a smooth grid-height expansion, which is exactly what the brief asks
 * for here. `items` is `industry.faqs`, matching `FaqStructuredData` on the
 * page exactly.
 */
export function FaqSection({ industry }: { industry: Industry }) {
  return (
    <Band>
      <div className="grid gap-10 wide:grid-cols-[0.85fr_1.6fr] wide:gap-16">
        <div className="reveal">
          <p className="eyebrow flex items-center gap-3 text-carbon/55">
            <span aria-hidden="true" className="h-px w-6 bg-mist" />
            FAQ
          </p>
          <h2 className="mt-5 font-display text-[2.25rem] font-normal leading-[1.1] wide:text-[2.75rem]">
            Questions, answered.
          </h2>
        </div>
        <div className="reveal" data-delay={100}>
          <Faq items={industry.faqs} />
        </div>
      </div>
    </Band>
  );
}
