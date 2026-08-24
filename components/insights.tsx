"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import type { ReactNode } from "react";
import type { Locale } from "@/lib/locale";
import { localizedPath } from "@/lib/locale";
import type { ArticleBlock, InsightArticle, InsightCategory } from "@/lib/site";

/**
 * Category pills over an editorial grid, filtered client-side.
 *
 * The catalogue is small enough (single digits per category) that a client
 * filter is simpler and faster than a route per category, and it keeps the
 * page itself a server component. `initialCategory` lets a link elsewhere on
 * the site land pre-filtered via `?category=`.
 */
export function InsightsExplorer({
  articles,
  categories,
  initialCategory = "all",
  locale = "en",
}: {
  articles: InsightArticle[];
  categories: InsightCategory[];
  initialCategory?: string;
  locale?: Locale;
}) {
  const [active, setActive] = useState(initialCategory);
  const isAr = locale === "ar";
  const isRu = locale === "ru";

  const filtered = useMemo(
    () =>
      active === "all"
        ? articles
        : articles.filter((article) => article.category === active),
    [articles, active],
  );

  const activeCategory = categories.find((category) => category.slug === active);
  const activeCategoryLabel = isAr
    ? (activeCategory?.nameAr ?? "المقالات")
    : isRu
      ? (activeCategory?.nameRu ?? "материалы")
      : (activeCategory?.name.toLowerCase() ?? "articles");

  /**
   * A real, crawlable `/insights?category=…` URL per tab — `generateMetadata`
   * in the Insights page already gives each of these its own title, meta
   * description and canonical, but nothing on the site linked to them as an
   * `href` before this, so they sat outside normal crawl discovery.
   */
  const hrefFor = (categorySlug: string) => {
    const path = categorySlug === "all" ? "/insights" : `/insights?category=${categorySlug}`;
    return locale === "en" ? path : localizedPath(path, locale);
  };

  return (
    <div>
      <div
        role="tablist"
        aria-label={isAr ? "تصفية حسب الفئة" : isRu ? "Фильтр по категории" : "Filter by category"}
        className="mb-12 flex flex-wrap gap-3 wide:mb-16"
      >
        <CategoryTab
          href={hrefFor("all")}
          label={isAr ? "الكل" : isRu ? "Все" : "All"}
          active={active === "all"}
          onClick={() => setActive("all")}
          isAr={isAr}
        />
        {categories.map((category) => (
          <CategoryTab
            key={category.slug}
            href={hrefFor(category.slug)}
            label={isAr ? category.nameAr : isRu ? category.nameRu : category.name}
            active={active === category.slug}
            onClick={() => setActive(category.slug)}
            isAr={isAr}
          />
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="border-t border-carbon/15 py-20 text-center">
          <p className={`text-[1.0625rem] text-carbon/60 ${isAr ? "font-arabic" : ""}`}>
            {isAr
              ? `المزيد من ${activeCategoryLabel} في الطريق.`
              : isRu
                ? `Больше материалов из раздела «${activeCategoryLabel}» уже скоро.`
                : `More ${activeCategoryLabel} are on the way.`}
          </p>
        </div>
      ) : (
        <div className="grid gap-5 wide:grid-cols-3 wide:gap-6">
          {filtered.map((article, i) => (
            <InsightCard
              key={article.slug}
              article={article}
              categories={categories}
              delay={i * 60}
              locale={locale}
            />
          ))}
        </div>
      )}
    </div>
  );
}

/**
 * Renders as a real `<a href>` — so crawlers can discover and follow every
 * category URL — while a click still filters in place via `onClick`'s
 * `preventDefault`, exactly as the plain button did before. Same markup,
 * same styling, same instant client-side behaviour for a visitor; only a
 * search engine sees the difference.
 */
function CategoryTab({
  href,
  label,
  active,
  onClick,
  isAr,
}: {
  href: string;
  label: string;
  active: boolean;
  onClick: () => void;
  isAr?: boolean;
}) {
  return (
    <Link
      href={href}
      role="tab"
      aria-selected={active}
      onClick={(e) => {
        e.preventDefault();
        onClick();
      }}
      className={`rounded-full border px-5 py-2.5 transition-colors duration-300 ${isAr ? "font-arabic text-[0.6875rem]" : "eyebrow"} ${
        active
          ? "border-carbon bg-carbon text-porcelain"
          : "border-carbon/20 text-carbon/60 hover:border-mist hover:bg-mist/15 hover:text-carbon"
      }`}
    >
      {label}
    </Link>
  );
}

export function InsightCard({
  article,
  categories,
  delay = 0,
  size = "default",
  locale = "en",
}: {
  article: InsightArticle;
  categories: InsightCategory[];
  delay?: number;
  /** `large` — the homepage's editorial band: bigger type, more air, the
   *  same card the Archive grid uses underneath rather than a bespoke one. */
  size?: "default" | "large";
  locale?: Locale;
}) {
  const category = categories.find((c) => c.slug === article.category);
  const large = size === "large";
  const isAr = locale === "ar";
  const isRu = locale === "ru";
  const href =
    isAr || isRu ? localizedPath(`/insights/${article.slug}`, locale) : `/insights/${article.slug}`;

  return (
    <Link href={href} className="group reveal flex flex-col" data-delay={delay}>
      <div className="frame relative aspect-[4/3] overflow-hidden">
        <Image
          src={article.image}
          alt={isAr ? article.imageAltAr : isRu ? article.imageAltRu : article.imageAlt}
          fill
          sizes="(min-width: 880px) 33vw, 100vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />
        {/* The topic sits over its own quiet scrim rather than the card's
            title below it — a short editorial label, not a second headline,
            kept out of the photograph's own focal point by staying to the
            bottom edge with generous space above it. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-carbon/85 via-carbon/15 to-transparent"
        />
        <p
          className={`absolute bottom-5 left-5 right-5 text-[1.1875rem] leading-[1.25] text-porcelain wide:bottom-6 wide:left-6 wide:right-6 wide:text-[1.3125rem] ${isAr ? "font-arabic" : "font-display font-normal"}`}
        >
          {isAr ? article.imageTopicAr : isRu ? article.imageTopicRu : article.imageTopic}
        </p>
      </div>
      <div className={`flex flex-1 flex-col ${large ? "pt-7" : "pt-6"}`}>
        <p
          className={`flex items-center gap-3 text-carbon/50 ${isAr ? "font-arabic text-[0.6875rem]" : "eyebrow"}`}
        >
          <span aria-hidden="true" className="h-px w-4 bg-mist" />
          {isAr ? category?.nameAr : isRu ? category?.nameRu : category?.name}
        </p>
        <h3
          className={`mt-3 leading-[1.2] transition-colors duration-300 group-hover:text-carbon/70 ${isAr ? "font-arabic font-bold" : "font-display font-medium"} ${
            large ? "text-[1.625rem] wide:text-[1.75rem]" : "text-[1.375rem]"
          }`}
        >
          {isAr ? article.titleAr : isRu ? article.titleRu : article.title}
        </h3>
        <p
          className={`mt-3 flex-1 leading-[1.7] text-carbon/70 ${isAr ? "font-arabic" : ""} ${
            large ? "text-[1rem]" : "text-[0.9375rem]"
          }`}
        >
          {isAr ? article.excerptAr : isRu ? article.excerptRu : article.excerpt}
        </p>
        <p className={`mt-5 text-[0.8125rem] text-carbon/45 ${isAr ? "font-arabic" : ""}`}>
          {isAr ? (
            <>
              <span dir="ltr">{article.date}</span> · {article.readingTimeAr}
            </>
          ) : isRu ? (
            <>
              {article.date} · {article.readingTimeRu}
            </>
          ) : (
            `${article.date} · ${article.readingTime}`
          )}
        </p>
      </div>
    </Link>
  );
}

/**
 * Parses `[label](/href)` inside an article body's plain-text paragraphs
 * into real links. Article content stays plain data in `lib/site.ts` this
 * way — a `[text](url)` pair rather than JSX — while still rendering as a
 * proper in-context link, internal or external, on the page.
 */
function renderInline(text: string): ReactNode[] {
  const pattern = /\[([^\]]+)\]\(([^)]+)\)/g;
  const nodes: ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let key = 0;

  while ((match = pattern.exec(text))) {
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index));
    }
    const [full, label, href] = match;
    const external = /^https?:\/\//.test(href);
    const linkClassName =
      "text-carbon underline decoration-carbon/30 underline-offset-2 transition-colors duration-300 hover:text-mist hover:decoration-mist";

    nodes.push(
      external ? (
        <a
          key={key++}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={linkClassName}
        >
          {label}
        </a>
      ) : (
        <Link key={key++} href={href} className={linkClassName}>
          {label}
        </Link>
      ),
    );
    lastIndex = match.index + full.length;
  }

  if (lastIndex < text.length) nodes.push(text.slice(lastIndex));
  return nodes;
}

/**
 * Renders an article's `body` blocks — H2/H3 headings and prose paragraphs
 * with inline links — sharing the same `reveal` scroll-in treatment every
 * other text block on the site uses. `locale` (default `"en"`) only affects
 * typography (Amiri, no Latin `font-display`); the caller passes either
 * `article.body` or `article.bodyAr` — the blocks themselves are already in
 * the right language by the time they reach this component.
 */
export function ArticleBody({ blocks, locale = "en" }: { blocks: ArticleBlock[]; locale?: Locale }) {
  const isAr = locale === "ar";

  return (
    <div className="mt-8">
      {blocks.map((block, i) => {
        const delay = i * 40;

        if (block.type === "h2") {
          return (
            <h2
              key={i}
              className={`reveal mt-12 text-[1.5rem] leading-[1.3] text-carbon first:mt-0 wide:text-[1.75rem] ${isAr ? "font-arabic font-bold" : "font-display font-normal"}`}
              data-delay={delay}
            >
              {block.text}
            </h2>
          );
        }

        if (block.type === "h3") {
          return (
            <h3
              key={i}
              className={`reveal mt-8 text-[1.1875rem] leading-[1.35] text-carbon first:mt-0 ${isAr ? "font-arabic font-bold" : "font-display font-medium"}`}
              data-delay={delay}
            >
              {block.text}
            </h3>
          );
        }

        return (
          <p
            key={i}
            className={`reveal mt-5 text-[1.0625rem] leading-[1.8] text-carbon/80 first:mt-0 ${isAr ? "font-arabic" : ""}`}
            data-delay={delay}
          >
            {renderInline(block.text)}
          </p>
        );
      })}
    </div>
  );
}
