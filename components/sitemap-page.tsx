import Link from "next/link";
import { Band, Heading, TypeHero } from "@/components/ui";
import type { Locale } from "@/lib/locale";
import { localizedPath } from "@/lib/locale";
import { healthcareServices, healthcareVerticals } from "@/lib/healthcare-cluster";
import { agentsPage, servicePages as realEstateServicePages } from "@/lib/real-estate-cluster";
import { industries, insightArticles, insightCategories, nav, services } from "@/lib/site";

type LinkItem = { href: string; label: string };

/**
 * Appends a localised "in Dubai" to a service/industry anchor so every link
 * on this page carries the location signal search engines and users look
 * for — "SEO in Dubai", "Digital Marketing for Healthcare in Dubai" —
 * rather than the bare service/industry name the header nav and cards use.
 * Skips the append when the string already names Dubai (a `title`/`h1`
 * field written with it in already, e.g. the Real Estate cluster's own
 * copy), so it never doubles up. Applied at render time to whatever
 * label each item already carries, so a brand-new service or industry
 * added to `lib/site.ts` (or either cluster file) gets the same
 * location-qualified anchor automatically — nothing to remember to write
 * by hand.
 */
function withDubai(label: string, locale: Locale): string {
  if (/dubai|دبي|дуба/i.test(label)) return label;
  return locale === "ar" ? `${label} في دبي` : locale === "ru" ? `${label} в Дубае` : `${label} in Dubai`;
}

/** Every `Industry.title` reads "Digital Marketing for X." — drop the
 *  trailing full stop before `withDubai` appends the location, so the
 *  anchor reads as one clause: "Digital Marketing for X in Dubai". */
function stripTrailingPeriod(label: string): string {
  return label.replace(/[.。]\s*$/, "");
}

const copy = {
  en: {
    eyebrow: "Sitemap",
    title: "Sitemap",
    subhead:
      "Every page on Shario, in one place — services, industries and insights across all three languages.",
    mainPages: "Main Pages",
    servicesTitle: "Services",
    industriesTitle: "Industries",
    insightsTitle: "Insights",
    categories: "Categories",
    articles: "Articles",
  },
  ar: {
    eyebrow: "خريطة الموقع",
    title: "خريطة الموقع",
    subhead:
      "كل صفحات شاريو في مكان واحد — الخدمات والقطاعات والرؤى بثلاث لغات.",
    mainPages: "الصفحات الرئيسية",
    servicesTitle: "الخدمات",
    industriesTitle: "القطاعات",
    insightsTitle: "رؤى",
    categories: "التصنيفات",
    articles: "المقالات",
  },
  ru: {
    eyebrow: "Карта сайта",
    title: "Карта сайта",
    subhead:
      "Все страницы SHARIO в одном месте — услуги, отрасли и статьи на всех трёх языках.",
    mainPages: "Основные страницы",
    servicesTitle: "Услуги",
    industriesTitle: "Отрасли",
    insightsTitle: "Инсайты",
    categories: "Категории",
    articles: "Статьи",
  },
} as const;

/**
 * Builds every section's link list straight from the same data `lib/site.ts`,
 * `lib/real-estate-cluster.ts` and `lib/healthcare-cluster.ts` feed to
 * `app/sitemap.ts` (the XML sitemap) — a service, industry, insight article
 * or category added to any of those arrays appears here automatically, with
 * no page to remember to update. The Healthcare vertical/service pages are
 * English-only (see `lib/healthcare-cluster.ts`'s file header), so they're
 * only added to the `en` locale's lists, matching the XML sitemap.
 */
function buildSections(locale: Locale) {
  const isAr = locale === "ar";
  const isRu = locale === "ru";
  const pick = (en: string, ar: string, ru: string) => (isAr ? ar : isRu ? ru : en);

  const mainPages: LinkItem[] = nav.map((item) => ({
    href: item.href,
    label: pick(item.label, item.labelAr, item.labelRu),
  }));

  const serviceLinks: LinkItem[] = services.map((service) => ({
    href: `/services/${service.slug}`,
    label: withDubai(pick(service.name, service.nameAr, service.nameRu), locale),
  }));

  const realEstateServiceLinks: LinkItem[] = realEstateServicePages.map((page) => {
    const content = isAr ? (page.ar ?? page.en) : isRu ? (page.ru ?? page.en) : page.en;
    return { href: `/services/${page.slug}`, label: withDubai(content.label, locale) };
  });

  const healthcareServiceLinks: LinkItem[] = isAr || isRu
    ? []
    : healthcareServices.map((service) => ({
        href: `/services/${service.slug}`,
        label: withDubai(service.label, locale),
      }));

  // `title` (the page's own H1), not the short `name` — every industry's
  // `title` already reads "Digital Marketing for [Industry]." so this
  // produces "Digital Marketing for [Industry] in Dubai" for every one of
  // them, current and future, rather than the bare industry name.
  const industryLinks: LinkItem[] = industries.map((industry) => ({
    href: `/industries/${industry.slug}`,
    label: withDubai(stripTrailingPeriod(pick(industry.title, industry.titleAr, industry.titleRu)), locale),
  }));

  // The Agents audience page's own `h1` is already written as "Digital
  // Marketing for Real Estate Agents in Dubai" (and its AR/RU equivalents)
  // — `withDubai` recognises that and passes it through unchanged.
  const agentsContent = isAr ? (agentsPage.ar ?? agentsPage.en) : isRu ? (agentsPage.ru ?? agentsPage.en) : agentsPage.en;
  const realEstateAgentsLink: LinkItem = {
    href: "/industries/real-estate-agents",
    label: withDubai(agentsContent.h1, locale),
  };

  // `h1`, not the short `label` — already reads "Digital Marketing for
  // Doctors in Dubai", matching the same pattern as `industryLinks` above.
  const healthcareVerticalLinks: LinkItem[] = isAr || isRu
    ? []
    : healthcareVerticals.map((vertical) => ({
        href: `/industries/healthcare/${vertical.slug}`,
        label: withDubai(vertical.h1, locale),
      }));

  const categoryLinks: LinkItem[] = insightCategories.map((category) => ({
    href: `/insights?category=${category.slug}`,
    label: pick(category.name, category.nameAr, category.nameRu),
  }));

  const articleLinks: LinkItem[] = insightArticles
    .filter((article) => !article.locales || article.locales.includes(locale))
    .map((article) => ({
      href: `/insights/${article.slug}`,
      label: pick(article.title, article.titleAr ?? article.title, article.titleRu ?? article.title),
    }));

  return {
    mainPages,
    services: [...serviceLinks, ...realEstateServiceLinks, ...healthcareServiceLinks],
    industries: [...industryLinks, realEstateAgentsLink, ...healthcareVerticalLinks],
    categories: categoryLinks,
    articles: articleLinks,
  };
}

function LinkGrid({ items, locale, href }: { items: LinkItem[]; locale: Locale; href: (path: string) => string }) {
  const isAr = locale === "ar";
  const arrow = isAr ? "←" : "→";
  const arrowShift = isAr ? "group-hover:-translate-x-1" : "group-hover:translate-x-1";

  return (
    <ul className="grid gap-x-10 wide:grid-cols-2 wide:gap-x-14">
      {items.map((item) => (
        <li key={item.href}>
          <Link
            href={href(item.href)}
            className={`group reveal flex items-center justify-between gap-6 border-t border-carbon/15 py-4 text-[0.9375rem] leading-[1.5] text-carbon/80 transition-colors duration-300 hover:border-carbon/40 hover:text-carbon ${isAr ? "font-arabic" : ""}`}
          >
            <span>{item.label}</span>
            <span
              aria-hidden="true"
              className={`shrink-0 text-carbon/40 transition-all duration-300 ${arrowShift} group-hover:text-carbon`}
            >
              {arrow}
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

function SectionHeading({ children, isAr }: { children: React.ReactNode; isAr: boolean }) {
  return (
    <Heading as="h2" scale="sm" className={`mb-8 wide:mb-10 ${isAr ? "font-arabic" : ""}`}>
      {children}
    </Heading>
  );
}

function SubHeading({ children, isAr }: { children: React.ReactNode; isAr: boolean }) {
  return (
    <p className={`label-sm mb-4 text-carbon/50 ${isAr ? "font-arabic" : ""}`}>
      {children}
    </p>
  );
}

export function SitemapPage({ locale = "en" }: { locale?: Locale }) {
  const isAr = locale === "ar";
  const isRu = locale === "ru";
  const href = (path: string) => (isAr || isRu ? localizedPath(path, locale) : path);
  const t = copy[locale];
  const sections = buildSections(locale);

  return (
    <>
      <TypeHero tone="carbon" eyebrow={t.eyebrow} title={t.title} subhead={t.subhead} />

      <Band>
        <SectionHeading isAr={isAr}>{t.mainPages}</SectionHeading>
        <LinkGrid items={sections.mainPages} locale={locale} href={href} />
      </Band>

      <Band tone="limestone">
        <SectionHeading isAr={isAr}>{t.servicesTitle}</SectionHeading>
        <LinkGrid items={sections.services} locale={locale} href={href} />
      </Band>

      <Band>
        <SectionHeading isAr={isAr}>{t.industriesTitle}</SectionHeading>
        <LinkGrid items={sections.industries} locale={locale} href={href} />
      </Band>

      <Band tone="limestone">
        <SectionHeading isAr={isAr}>{t.insightsTitle}</SectionHeading>
        <div className="mb-12 wide:mb-14">
          <SubHeading isAr={isAr}>{t.categories}</SubHeading>
          <LinkGrid items={sections.categories} locale={locale} href={href} />
        </div>
        <div>
          <SubHeading isAr={isAr}>{t.articles}</SubHeading>
          <LinkGrid items={sections.articles} locale={locale} href={href} />
        </div>
      </Band>
    </>
  );
}
