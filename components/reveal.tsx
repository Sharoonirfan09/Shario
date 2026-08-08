"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Scroll reveal for anything marked `.reveal`.
 *
 * Mounted once in the root layout and re-scanned on navigation, so pages stay
 * server components.
 *
 * Deliberately a swept check rather than an IntersectionObserver: an observer
 * only fires when intersection *changes*, so an element that is jumped past —
 * an anchor link, a fast scroll fling, restored scroll position — can go from
 * "below the fold" to "above the fold" without ever being reported, and would
 * stay invisible for good. Sweeping every remaining target on scroll cannot
 * miss one, and with a few dozen targets the cost is negligible.
 */
export function Reveal() {
  const pathname = usePathname();

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let frame = 0;

    /*
     * Targets are re-queried on every pass rather than captured once.
     *
     * The document is marked `js` before first paint, which puts every
     * `.reveal` at opacity 0 — so this effect is the *only* thing that can
     * make that content visible again. Capturing the list once meant that any
     * content not yet in the DOM when the effect ran (streamed HTML, a client
     * route transition) was never tracked, and stayed invisible permanently.
     * A querySelectorAll per animation frame is nothing next to that risk, and
     * `:not([data-shown])` shrinks the match set to empty almost immediately.
     */
    const sweep = () => {
      frame = 0;
      const limit = window.innerHeight * 0.92;
      document
        .querySelectorAll<HTMLElement>(".reveal:not([data-shown])")
        .forEach((el) => {
          if (!reduce && el.getBoundingClientRect().top >= limit) return;
          if (!reduce) el.style.setProperty("--reveal-delay", `${el.dataset.delay ?? 0}ms`);
          el.setAttribute("data-shown", "true");
        });
    };

    const schedule = () => {
      if (frame === 0) frame = requestAnimationFrame(sweep);
    };

    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });

    // Sweep again as late content arrives and as layout settles once fonts
    // and images have loaded — each can move a target across the trigger line.
    const timers = [0, 120, 600, 1600].map((ms) =>
      window.setTimeout(sweep, ms)
    );
    sweep();

    return () => {
      if (frame) cancelAnimationFrame(frame);
      timers.forEach(clearTimeout);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [pathname]);

  return null;
}
