import type { Metadata } from "next";
import { Cormorant_Garamond, EB_Garamond, Jost } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Reveal } from "@/components/reveal";
import { StructuredData } from "@/components/structured-data";
import { site } from "@/lib/site";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const ebGaramond = EB_Garamond({
  variable: "--font-eb-garamond",
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  display: "swap",
});

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
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
      className={`${cormorant.variable} ${ebGaramond.variable} ${jost.variable} h-full antialiased`}
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
