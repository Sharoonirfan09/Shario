"use client";

import { useSyncExternalStore } from "react";

const emptySubscribe = () => () => {};

/** True only once hydrated on the client — the React-recommended way to read "has mounted" without the cascading extra render `useState` + `useEffect` causes for the same check. */
function useHasMounted() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );
}

/**
 * Renders an email address without ever putting the literal "user@domain"
 * string, or a working `mailto:` href, in the server-rendered HTML — both of
 * which are exactly what a plain-text address and a static `mailto:` link
 * hand a harvesting bot on a silver platter. `user`/`domain` are passed
 * split, joined only in the browser after mount.
 *
 * Real visitors (JS on, which is effectively everyone, and the only
 * meaningful audience for a mailto link — a no-JS visitor can't submit the
 * site's other forms either) see a normal, fully clickable email link within
 * one paint of hydration. The contact form (`EnquiryForm`) stays the
 * primary, always-server-rendered way to reach Shario regardless — this
 * only protects the secondary "email us directly" links in the footer and
 * Contact page detail block, and never touches that form.
 */
export function ObfuscatedEmail({
  user,
  domain,
  className,
  dir,
}: {
  user: string;
  domain: string;
  className?: string;
  /** The Arabic Contact page renders this at `dir="ltr"` inside its RTL page — a Latin email address reads backwards otherwise. */
  dir?: "ltr" | "rtl";
}) {
  const revealed = useHasMounted();

  if (!revealed) {
    // No "@", no dot, no working link — nothing a regex-based harvester can
    // reassemble into a sendable address, and no href a scraper can follow.
    // Still fully readable text (not `aria-hidden`) for the brief pre-hydration
    // window, including for anyone genuinely browsing with JS disabled.
    return (
      <span className={className} dir={dir}>
        {user} [at] {domain.replace(".", " [dot] ")}
      </span>
    );
  }

  const email = `${user}@${domain}`;
  return (
    <a href={`mailto:${email}`} className={className} dir={dir}>
      {email}
    </a>
  );
}
