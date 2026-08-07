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
    const targets = new Set(
      document.querySelectorAll<HTMLElement>(".reveal:not([data-shown])")
    );
    if (targets.size === 0) return;

    const show = (el: HTMLElement, animate: boolean) => {
      if (animate) el.style.animationDelay = `${el.dataset.delay ?? 0}ms`;
      el.setAttribute("data-shown", "true");
      targets.delete(el);
    };

    // Reduced motion: nothing to stagger, just show it all.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      targets.forEach((el) => show(el, false));
      return;
    }

    let frame = 0;

    const sweep = () => {
      frame = 0;
      const limit = window.innerHeight * 0.92;
      targets.forEach((el) => {
        if (el.getBoundingClientRect().top < limit) show(el, true);
      });
      if (targets.size === 0) teardown();
    };

    const schedule = () => {
      if (frame === 0) frame = requestAnimationFrame(sweep);
    };

    function teardown() {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    }

    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });
    sweep();

    return teardown;
  }, [pathname]);

  return null;
}
