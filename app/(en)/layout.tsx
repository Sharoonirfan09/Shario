import type { ReactNode } from "react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

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
