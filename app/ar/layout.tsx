import type { ReactNode } from "react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

/**
 * The Arabic counterpart to `app/(en)/layout.tsx`. Only the root layout may
 * declare `<html>`/`<body>`, so `dir="rtl"`/`lang="ar"` can't live there
 * without either (a) reading the current path via `headers()` in the root
 * layout — which forces every route in the app, English included, into
 * dynamic rendering, undoing the static-generation work done earlier — or
 * (b) moving every English route under its own `[locale]` segment, which is
 * a far bigger restructuring than this feature needs. Nesting `dir`/`lang`
 * on this wrapper instead is valid HTML5 (a descendant's `lang`/`dir`
 * correctly overrides an ancestor's for that subtree, respected by browsers,
 * screen readers and search engines) and costs nothing in rendering mode —
 * every `/ar/*` page still prerenders statically.
 *
 * `font-arabic` (Amiri, loaded in the root layout) sets the default face for
 * this whole subtree; components can still layer weight/size on top the
 * same way English layers `font-display`/`font-body` over Jost's default.
 */
export default function ArabicLayout({ children }: { children: ReactNode }) {
  return (
    <div dir="rtl" lang="ar" className="font-arabic flex flex-1 flex-col">
      <SiteHeader locale="ar" />
      <main id="main" className="flex-1">
        {children}
      </main>
      <SiteFooter locale="ar" />
    </div>
  );
}
