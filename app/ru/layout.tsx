import type { Metadata } from "next";
import type { ReactNode } from "react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

/**
 * The closest-ancestor `title.template` for every `/ru` page — same
 * reasoning as `app/ar/layout.tsx`'s. `SHARIO` stays in Latin, matching how
 * the brand name is kept untranslated everywhere else in the Russian copy.
 */
export const metadata: Metadata = {
  title: {
    template: "%s — SHARIO",
    default: "SHARIO — агентство цифрового маркетинга в Дубае",
  },
};

/**
 * The Russian counterpart to `app/(en)/layout.tsx` and `app/ar/layout.tsx`.
 * Same reasoning as the Arabic layout for why `lang` nests here rather than
 * on the root `<html>` — the difference is `dir="ltr"` (Russian reads
 * left-to-right, same as English) and no `font-arabic` override: Russian
 * renders in the same Cormorant/Jost pairing as English, which is why
 * `app/layout.tsx` adds a Cyrillic subset to those fonts rather than this
 * subtree pulling in a separate typeface.
 */
export default function RussianLayout({ children }: { children: ReactNode }) {
  return (
    <div dir="ltr" lang="ru" className="flex flex-1 flex-col">
      <SiteHeader locale="ru" />
      <main id="main" className="flex-1">
        {children}
      </main>
      <SiteFooter locale="ru" />
    </div>
  );
}
