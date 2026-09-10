import type { Metadata } from "next";
import { SitemapPage } from "@/components/sitemap-page";
import { ogDefaultsRu } from "@/lib/site";

const descriptionRu =
  "Все страницы SHARIO в одном месте — услуги, отрасли и статьи на английском, арабском и русском языках.";

export const metadata: Metadata = {
  title: "Карта сайта",
  description: descriptionRu,
  alternates: {
    canonical: "/ru/sitemap",
    languages: { en: "/sitemap", ar: "/ar/sitemap", ru: "/ru/sitemap", "x-default": "/sitemap" },
  },
  openGraph: {
    ...ogDefaultsRu,
    url: "/ru/sitemap",
    type: "website",
    title: "Карта сайта — SHARIO",
    description: descriptionRu,
  },
};

export default function Page() {
  return <SitemapPage locale="ru" />;
}
