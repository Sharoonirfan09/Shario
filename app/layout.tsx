import type { Metadata } from "next";
import { Amiri, Cormorant_Garamond, EB_Garamond, Jost } from "next/font/google";
import "./globals.css";
import { FacebookPixel, GoogleAnalytics } from "@/components/analytics";
import { FirebaseAnalytics } from "@/components/firebase-analytics";
import { Reveal } from "@/components/reveal";
import { StructuredData, WebsiteStructuredData } from "@/components/structured-data";
import { site } from "@/lib/site";

/**
 * Weight/style arrays are trimmed to what the site actually renders, not the
 * family's full range — every `font-medium` in the codebase pairs with
 * Cormorant (never Jost or EB Garamond), and nothing sets 600. Verified by
 * grepping every `font-display`/`font-body`/`font-label` and weight-utility
 * usage across `app` and `components` before trimming; re-check that sweep
 * before adding a heavier weight back rather than assuming it's unused.
 */
const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  // "cyrillic" added for the Russian site: Cormorant Garamond ships a real
  // Cyrillic cut (verified against next/font's own google/font-data.json), so
  // Russian headings render in the same premium serif as English rather than
  // falling back to a system font — no separate Russian type system needed.
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  display: "swap",
});

const ebGaramond = EB_Garamond({
  variable: "--font-eb-garamond",
  subsets: ["latin", "cyrillic"],
  weight: ["400"],
  style: ["normal", "italic"],
  display: "swap",
});

const jost = Jost({
  variable: "--font-jost",
  // Jost also ships Cyrillic — same reasoning as Cormorant above.
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400"],
  display: "swap",
});

/**
 * The Arabic type system, in full since the `/ar` site's launch: a
 * classical Naskh revival, Cormorant's counterpart on the Arabic side.
 * Originally loaded just for the one tagline line in `ArabicStatement`
 * (`components/ui.tsx`) at weight 400; now also carries every Arabic page's
 * headlines at 700, mirroring how Cormorant itself steps up in weight for
 * emphasis rather than switching family. Subset to `arabic` only — never
 * set in Latin anywhere on the site.
 */
const amiri = Amiri({
  variable: "--font-amiri",
  subsets: ["arabic"],
  weight: ["400", "700"],
  style: ["normal"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.domain),
  /**
   * A plain string, not `{ default, template }` — a template set here would
   * be global and Latin-only, which is wrong for `/ar` and `/ru`: their own
   * pages already suffix themselves correctly (`— شاريو`, `— SHARIO`) in
   * `openGraph.title`, but every plain `<title>` was silently getting this
   * root template's `— Shario` appended on top, on every locale. Each
   * locale layout (`app/(en)/layout.tsx`, `app/ar/layout.tsx`,
   * `app/ru/layout.tsx`) now sets its own `title.template`, which — being
   * the closest ancestor to every page in that subtree — is what actually
   * resolves; this string only exists as the ultimate fallback for a route
   * that somehow renders outside all three (none currently do).
   */
  title: "Shario — Digital Marketing Agency in Dubai",
  description: site.description,
  openGraph: {
    type: "website",
    locale: "en_AE",
    siteName: site.name,
    title: "Shario — Digital Marketing Agency in Dubai",
    description: site.description,
  },
  /**
   * `card` has to be set here explicitly, not inferred: Next decides the
   * default ("summary" vs "summary_large_image") once, at this root
   * object's own resolution, based only on what's in *this* object — it
   * never revisits that decision after a page's own `opengraph-image.tsx`
   * gets auto-filled in later. Every route has its own OG image, so this is
   * always the large card.
   */
  twitter: {
    card: "summary_large_image",
    site: "@shario_ae",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      // The inline script below adds `js` to this element before hydration,
      // so the server and client className differ by design.
      suppressHydrationWarning
      /*
       * Tells Next that the smooth scrolling in globals.css is intentional, so
       * it suppresses it during route transitions. Without this the browser
       * animates all the way back to the top of a very tall page on every
       * navigation, which reads as the site hanging.
       */
      data-scroll-behavior="smooth"
      className={`${cormorant.variable} ${ebGaramond.variable} ${jost.variable} ${amiri.variable} h-full antialiased`}
    >
      <head>
        {/*
          Marks the document as JS-capable before first paint, which is what
          arms the scroll-reveal styles. Without this the reveals stay visible
          rather than stuck at opacity 0.
        */}
        <script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.classList.add('js')`,
          }}
        />
      </head>
      {/*
        `overflow-x-hidden` matches the design files, whose page root carries it
        too. It absorbs the sub-pixel width the hero's settle transform borrows
        while it plays, which otherwise lets a phone scroll a pixel sideways.
      */}
      <body className="min-h-full flex flex-col overflow-x-hidden bg-porcelain text-carbon">
        {children}
        <Reveal />
        <StructuredData />
        <WebsiteStructuredData />
        <GoogleAnalytics />
        <FacebookPixel />
        <FirebaseAnalytics />
      </body>
    </html>
  );
}
