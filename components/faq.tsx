"use client";

import { useId, useState } from "react";
import type { Locale } from "@/lib/locale";

/** Lists longer than this start collapsed behind "Load More". */
const INITIAL_COUNT = 4;

/**
 * The service page accordion. One item open at a time, `+`/`−` toggle.
 *
 * The handoff shows an instant show/hide and its README asks for a smooth
 * height transition in production. `grid-template-rows: 0fr → 1fr` gives one
 * that animates to the content's real height without measuring it in JS, and
 * it collapses to an instant toggle under `prefers-reduced-motion` via the
 * global transition reset in `globals.css`.
 *
 * Sets past `INITIAL_COUNT` start collapsed behind "Load More" — every call
 * site shares the same 26-question `homeFaqs` list, so this always triggers.
 * Items past `INITIAL_COUNT` are always rendered — hidden with `className`,
 * not filtered out of the array — so the full, already-written answer text
 * for every question is present in the server-rendered HTML (and so crawled
 * and counted as real page content) whether or not a visitor ever clicks
 * "Load More".
 */
export function Faq({
  items,
  answerClassName = "",
  locale = "en",
}: {
  items: readonly { q: string; a: string }[];
  /** Extra classes on the answer paragraph — e.g. a font override for one call site. */
  answerClassName?: string;
  locale?: Locale;
}) {
  const [open, setOpen] = useState(-1);
  const [expanded, setExpanded] = useState(false);
  const id = useId();
  const isAr = locale === "ar";
  const isRu = locale === "ru";

  const hasMore = items.length > INITIAL_COUNT;

  return (
    <div className="flex flex-col">
      {items.map((item, i) => {
        const isOpen = open === i;
        const panelId = `${id}-panel-${i}`;
        const isOverflow = i >= INITIAL_COUNT;

        return (
          <div
            key={item.q}
            className={`border-t border-carbon/15 ${isOverflow && !expanded ? "hidden" : ""}`}
          >
            <h3>
              <button
                type="button"
                onClick={() => setOpen(isOpen ? -1 : i)}
                aria-expanded={isOpen}
                aria-controls={panelId}
                className={`flex w-full cursor-pointer items-center justify-between gap-5 py-6 ${isAr ? "text-right" : "text-left"}`}
              >
                <span
                  className={`text-[1.3125rem] text-carbon ${isAr ? "font-arabic font-bold" : "font-display font-medium"}`}
                >
                  {item.q}
                </span>
                <span aria-hidden="true" className="shrink-0 text-xl text-carbon">
                  {isOpen ? "−" : "+"}
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              className={`grid transition-[grid-template-rows] duration-500 ease-out ${
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              }`}
            >
              {/* The overflow clip is what makes the 0fr row hide its content. */}
              <div className="overflow-hidden">
                <p
                  className={`max-w-[720px] pb-7 text-[0.9375rem] leading-[1.7] text-carbon/75 ${isAr ? "font-arabic" : ""} ${answerClassName}`}
                >
                  {item.a}
                </p>
              </div>
            </div>
          </div>
        );
      })}
      <div className="border-t border-carbon/15" />
      {hasMore && (
        <div className="mt-10 flex justify-center">
          <button
            type="button"
            onClick={() => setExpanded((e) => !e)}
            aria-expanded={expanded}
            className={`inline-block cursor-pointer rounded-full border border-carbon px-8 py-3.5 text-[11px] text-carbon transition-colors duration-500 hover:bg-carbon hover:text-porcelain ${isAr ? "font-arabic" : "uppercase tracking-[0.08em]"}`}
          >
            {isAr
              ? expanded
                ? "عرض أقل"
                : "عرض المزيد"
              : isRu
                ? expanded
                  ? "Показать меньше"
                  : "Показать ещё"
                : expanded
                  ? "Show Less"
                  : "Load More"}
          </button>
        </div>
      )}
    </div>
  );
}
