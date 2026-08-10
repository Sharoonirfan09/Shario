"use client";

import { useId, useState } from "react";

/**
 * The service page accordion. One item open at a time, `+`/`−` toggle.
 *
 * The handoff shows an instant show/hide and its README asks for a smooth
 * height transition in production. `grid-template-rows: 0fr → 1fr` gives one
 * that animates to the content's real height without measuring it in JS, and
 * it collapses to an instant toggle under `prefers-reduced-motion` via the
 * global transition reset in `globals.css`.
 */
export function Faq({ items }: { items: readonly { q: string; a: string }[] }) {
  const [open, setOpen] = useState(-1);
  const id = useId();

  return (
    <div className="flex flex-col">
      {items.map((item, i) => {
        const isOpen = open === i;
        const panelId = `${id}-panel-${i}`;

        return (
          <div key={item.q} className="border-t border-carbon/15">
            <h3>
              <button
                type="button"
                onClick={() => setOpen(isOpen ? -1 : i)}
                aria-expanded={isOpen}
                aria-controls={panelId}
                className="flex w-full cursor-pointer items-center justify-between gap-5 py-6 text-left"
              >
                <span className="font-display text-[1.3125rem] font-medium text-carbon">
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
                <p className="max-w-[720px] pb-7 text-[0.9375rem] leading-[1.7] text-carbon/75">
                  {item.a}
                </p>
              </div>
            </div>
          </div>
        );
      })}
      <div className="border-t border-carbon/15" />
    </div>
  );
}
