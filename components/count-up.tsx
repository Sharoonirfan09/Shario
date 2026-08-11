"use client";

import { useEffect, useRef } from "react";

/**
 * Counts a figure up to its value the first time it scrolls into view.
 *
 * The figures are written as display strings — "AED 35M+", "6+", "5" — so the
 * numeric part is found rather than passed separately, and whatever sits either
 * side of it is reprinted untouched. A figure with no digits is left alone.
 *
 * Two deliberate choices:
 *
 *  - The finished value is what renders. The countdown to zero happens in an
 *    effect after mount, which means the server HTML, a crawler and a visitor
 *    without JavaScript all read the real figure. The reset is invisible
 *    because every figure sits inside `.reveal`, which holds it at opacity 0
 *    until it is scrolled to.
 *  - The animation writes to the DOM through a ref rather than through state,
 *    so a four-figure band does not re-render sixty times a second.
 *
 * `tabular-nums` is already set on `.ledger-figure`, so the width does not
 * jitter while the number climbs.
 */
export function CountUp({
  value,
  duration = 1600,
}: {
  value: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const match = value.match(/^(\D*)(\d[\d,]*)(.*)$/);
    if (!match) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const [, prefix, digits, suffix] = match;
    const target = Number(digits.replace(/,/g, ""));
    const print = (n: number) =>
      `${prefix}${n.toLocaleString("en-US")}${suffix}`;

    node.textContent = print(0);

    let frame = 0;
    let start = 0;

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return;
        observer.disconnect();

        function step(now: number) {
          if (!start) start = now;
          const progress = Math.min((now - start) / duration, 1);
          // Ease out cubic — quick off the mark, settling rather than stopping.
          const eased = 1 - Math.pow(1 - progress, 3);
          if (node) node.textContent = print(Math.round(target * eased));
          if (progress < 1) frame = requestAnimationFrame(step);
        }

        frame = requestAnimationFrame(step);
      },
      { threshold: 0.4 },
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      node.textContent = value;
    };
  }, [value, duration]);

  return <span ref={ref}>{value}</span>;
}
