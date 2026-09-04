"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Drives the three signature scroll-linked interactions on the Real Estate
 * page — the funnel's drawing connector, the Challenges active-item spy, and
 * the Approach timeline's moving indicator.
 *
 * Deliberately not `IntersectionObserver`: that API only reports *changes* in
 * intersection, so it can't answer "which item is currently nearest the
 * trigger line" on every frame, which is what a moving indicator needs. This
 * follows the same swept-on-scroll shape as `components/reveal.tsx` — a
 * `requestAnimationFrame`-throttled scroll listener re-measuring the tracked
 * items — rather than introducing a second scroll-tracking mechanism.
 *
 * Returns the container ref to attach to the list wrapper, the index of the
 * item nearest the trigger line, and a 0–1 progress value spanning the first
 * item's centre to the last item's centre — the input for a connector line
 * that draws as the section scrolls past.
 */
export function useScrollStory<T extends HTMLElement>(count: number) {
  const containerRef = useRef<T>(null);
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || count === 0) return;

    let frame = 0;

    const measure = () => {
      frame = 0;
      const items = Array.from(
        container.querySelectorAll<HTMLElement>("[data-story-item]"),
      );
      if (!items.length) return;

      // A trigger line just above vertical centre reads as "active" a beat
      // before an item is fully centred, which feels more responsive on a
      // fast scroll than waiting for dead centre.
      const line = window.innerHeight * 0.42;

      let closest = 0;
      let closestDist = Infinity;
      items.forEach((el, i) => {
        const rect = el.getBoundingClientRect();
        const mid = rect.top + rect.height / 2;
        const dist = Math.abs(mid - line);
        if (dist < closestDist) {
          closestDist = dist;
          closest = i;
        }
      });
      setActive(closest);

      const first = items[0].getBoundingClientRect();
      const last = items[items.length - 1].getBoundingClientRect();
      const span = last.top + last.height / 2 - (first.top + first.height / 2);
      const p = span > 0 ? (line - (first.top + first.height / 2)) / span : 0;
      setProgress(Math.min(1, Math.max(0, p)));
    };

    const schedule = () => {
      if (frame === 0) frame = requestAnimationFrame(measure);
    };

    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });
    measure();

    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [count]);

  return { containerRef, active, progress };
}
