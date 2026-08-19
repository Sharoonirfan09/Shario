import type { Metadata } from "next";
import type { ReactNode } from "react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

/**
 * Every English page sets a plain string `title` (e.g. `"About"`); this is
 * the closest ancestor template that turns it into `"About — Shario"` in
 * the `<title>` tag. Kept here rather than on the root layout so `/ar` and
 * `/ru` can each resolve their own, correctly-scripted suffix instead of
 * this one — see the note on `title` in `app/layout.tsx`.
 */
export const metadata: Metadata = {
  title: {
    template: "%s — Shario",
    default: "Shario — Digital Marketing Agency in Dubai",
  },
};

/**
 * Everything the root layout used to render directly (`SiteHeader`, the
 * `#main` content wrapper, `SiteFooter`), now scoped to the `(en)` route
 * group so `app/ar/layout.tsx` can render its own Arabic-aware versions
 * without the two colliding. A route group adds no URL segment, so every
 * page in here keeps its exact existing path (`/`, `/about`, …).
 */
export default function EnglishLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <SiteHeader />
      <main id="main" className="flex-1">
        {children}
      </main>
      <SiteFooter />
    </>
  );
}
