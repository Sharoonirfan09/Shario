import type { Metadata } from "next";
import { Amiri, Cormorant_Garamond, EB_Garamond, Jost } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Reveal } from "@/components/reveal";
import { StructuredData } from "@/components/structured-data";
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
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  display: "swap",
});

const ebGaramond = EB_Garamond({
  variable: "--font-eb-garamond",
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  display: "swap",
});

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
  weight: ["300", "400"],
  display: "swap",
});

/**
 * Carries exactly one line on the site: the Arabic tagline in
 * `ArabicStatement` (`components/ui.tsx`). A classical Naskh revival —
 * Cormorant's counterpart on the Arabic side rather than a plain sans —
 * subset to `arabic` only, since it's never set in Latin here.
 */
const amiri = Amiri({
  variable: "--font-amiri",
  subsets: ["arabic"],
  weight: ["400"],
  style: ["normal"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.domain),
  title: {
    default: "Shario — Digital Marketing Company in Dubai",
    template: "%s — Shario",
  },
  description: site.description,
  openGraph: {
    type: "website",
    locale: "en_AE",
    siteName: site.name,
    title: "Shario — Digital Marketing Company in Dubai",
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
        <SiteHeader />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter />
        <Reveal />
        <StructuredData />
      </body>
    </html>
  );
}
