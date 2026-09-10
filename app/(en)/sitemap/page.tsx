import type { Metadata } from "next";
import { SitemapPage } from "@/components/sitemap-page";
import { ogDefaults } from "@/lib/site";

const description =
  "Every page on Shario in one place — services, industries and insights, across English, Arabic and Russian.";

export const metadata: Metadata = {
  title: "Sitemap",
  description,
  alternates: {
    canonical: "/sitemap",
    languages: { en: "/sitemap", ar: "/ar/sitemap", ru: "/ru/sitemap", "x-default": "/sitemap" },
  },
  openGraph: {
    ...ogDefaults,
    url: "/sitemap",
    type: "website",
    title: "Sitemap — Shario",
    description,
  },
};

export default function Page() {
  return <SitemapPage />;
}
