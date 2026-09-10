import type { Metadata } from "next";
import { SitemapPage } from "@/components/sitemap-page";
import { ogDefaultsAr } from "@/lib/site";

const descriptionAr =
  "كل صفحات شاريو في مكان واحد — الخدمات والقطاعات والرؤى، بالإنجليزية والعربية والروسية.";

export const metadata: Metadata = {
  title: "خريطة الموقع",
  description: descriptionAr,
  alternates: {
    canonical: "/ar/sitemap",
    languages: { en: "/sitemap", ar: "/ar/sitemap", ru: "/ru/sitemap", "x-default": "/sitemap" },
  },
  openGraph: {
    ...ogDefaultsAr,
    url: "/ar/sitemap",
    type: "website",
    title: "خريطة الموقع — شاريو",
    description: descriptionAr,
  },
};

export default function Page() {
  return <SitemapPage locale="ar" />;
}
