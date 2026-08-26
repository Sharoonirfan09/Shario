"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import type { ReactNode } from "react";
import type { Locale } from "@/lib/locale";
import { localizedPath } from "@/lib/locale";
import type { ArticleBlock, InsightArticle, InsightCategory } from "@/lib/site";
import { Figure } from "@/components/ui";

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
  const [query, setQuery] = useState("");
  const isAr = locale === "ar";
  const isRu = locale === "ru";

  const byCategory = useMemo(
    () =>
      active === "all"
        ? articles
        : articles.filter((article) => article.category === active),
    [articles, active],
  );

  const normalizedQuery = query.trim().toLowerCase();

  const filtered = useMemo(() => {
    if (!normalizedQuery) return byCategory;
    return byCategory.filter((article) => {
      const title = isAr ? (article.titleAr ?? article.title) : isRu ? (article.titleRu ?? article.title) : article.title;
      const excerpt = isAr
        ? (article.excerptAr ?? article.excerpt)
        : isRu
          ? (article.excerptRu ?? article.excerpt)
          : article.excerpt;
      const haystack = [title, excerpt, ...(article.tags ?? [])].join(" ").toLowerCase();
      return haystack.includes(normalizedQuery);
    });
  }, [byCategory, normalizedQuery, isAr, isRu]);

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

  const searchLabel = isAr ? "البحث في المقالات" : isRu ? "Поиск по материалам" : "Search Insights";
  const searchPlaceholder = isAr
    ? "ابحث بالعنوان أو الموضوع…"
    : isRu
      ? "Искать по названию или теме…"
      : "Search by title or topic…";

  return (
    <div>
      <form
        role="search"
        onSubmit={(e) => e.preventDefault()}
        className={`mb-8 flex max-w-md items-center gap-3 border-b border-carbon/25 pb-2.5 transition-colors duration-300 focus-within:border-carbon wide:mb-10 ${isAr ? "flex-row-reverse" : ""}`}
      >
        <label htmlFor="insights-search" className="sr-only">
          {searchLabel}
        </label>
        <input
          id="insights-search"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={searchPlaceholder}
          className={`w-full border-0 bg-transparent text-[0.9375rem] text-carbon outline-none placeholder:text-carbon/40 ${isAr ? "font-arabic text-right" : ""}`}
        />
        <button
          type="submit"
          aria-label={searchLabel}
          className="flex shrink-0 items-center justify-center text-carbon/60 transition-colors duration-300 hover:text-carbon"
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 20 20"
            fill="none"
            className="h-[18px] w-[18px]"
          >
            <circle cx="8.5" cy="8.5" r="6" stroke="currentColor" strokeWidth="1.5" />
            <path d="M13.5 13.5 18 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
      </form>

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
            {normalizedQuery
              ? isAr
                ? `لا نتائج لـ "${query}".`
                : isRu
                  ? `Нет результатов по запросу «${query}».`
                  : `No results for "${query}".`
              : isAr
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
          alt={isAr ? (article.imageAltAr ?? article.imageAlt) : isRu ? (article.imageAltRu ?? article.imageAlt) : article.imageAlt}
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
          {isAr ? (article.imageTopicAr ?? article.imageTopic) : isRu ? (article.imageTopicRu ?? article.imageTopic) : article.imageTopic}
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
          {isAr ? (article.titleAr ?? article.title) : isRu ? (article.titleRu ?? article.title) : article.title}
        </h3>
        <p
          className={`mt-3 flex-1 leading-[1.7] text-carbon/70 ${isAr ? "font-arabic" : ""} ${
            large ? "text-[1rem]" : "text-[0.9375rem]"
          }`}
        >
          {isAr ? (article.excerptAr ?? article.excerpt) : isRu ? (article.excerptRu ?? article.excerpt) : article.excerpt}
        </p>
        <p className={`mt-5 text-[0.8125rem] text-carbon/45 ${isAr ? "font-arabic" : ""}`}>
          {isAr ? (
            <>
              <span dir="ltr">{article.date}</span> · {article.readingTimeAr ?? article.readingTime}
            </>
          ) : isRu ? (
            <>
              {article.date} · {article.readingTimeRu ?? article.readingTime}
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
 * Parses `[label](/href)`, `**bold**` and `*italic*` inside an article
 * body's plain-text paragraphs, list items, blockquotes and table cells into
 * real markup. Article content stays plain data in `lib/site.ts` this way —
 * Markdown-style spans rather than stored JSX — while still rendering as
 * proper inline formatting and links, internal or external, on the page.
 */
function renderInline(text: string): ReactNode[] {
  const pattern = /\[([^\]]+)\]\(([^)]+)\)|\*\*([^*]+)\*\*|\*([^*]+)\*/g;
  const nodes: ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let key = 0;

  while ((match = pattern.exec(text))) {
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index));
    }
    const [full, linkLabel, href, bold, italic] = match;

    if (bold !== undefined) {
      nodes.push(<strong key={key++}>{bold}</strong>);
    } else if (italic !== undefined) {
      nodes.push(<em key={key++}>{italic}</em>);
    } else {
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
            {linkLabel}
          </a>
        ) : (
          <Link key={key++} href={href} className={linkClassName}>
            {linkLabel}
          </Link>
        ),
      );
    }
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
        const delay = Math.min(i, 8) * 40;

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

        if (block.type === "p") {
          return (
            <p
              key={i}
              className={`reveal mt-5 text-[1.0625rem] leading-[1.8] text-carbon/80 first:mt-0 ${isAr ? "font-arabic" : ""}`}
              data-delay={delay}
            >
              {renderInline(block.text)}
            </p>
          );
        }

        if (block.type === "ul") {
          return (
            <ul
              key={i}
              className={`reveal mt-5 flex flex-col gap-2.5 ${isAr ? "font-arabic mr-1" : "ml-1"}`}
              data-delay={delay}
            >
              {block.items.map((item, j) => (
                <li
                  key={j}
                  className={`flex gap-3 text-[1.0625rem] leading-[1.75] text-carbon/80 ${isAr ? "flex-row-reverse text-right" : ""}`}
                >
                  <span aria-hidden="true" className="mt-[0.7em] h-1.5 w-1.5 shrink-0 rounded-full bg-mist" />
                  <span>{renderInline(item)}</span>
                </li>
              ))}
            </ul>
          );
        }

        if (block.type === "ol") {
          return (
            <ol
              key={i}
              className={`reveal mt-5 flex flex-col gap-2.5 ${isAr ? "font-arabic mr-1" : "ml-1"}`}
              data-delay={delay}
            >
              {block.items.map((item, j) => (
                <li
                  key={j}
                  className={`flex gap-3 text-[1.0625rem] leading-[1.75] text-carbon/80 ${isAr ? "flex-row-reverse text-right" : ""}`}
                >
                  <span className="shrink-0 font-display text-carbon/50">{j + 1}.</span>
                  <span>{renderInline(item)}</span>
                </li>
              ))}
            </ol>
          );
        }

        if (block.type === "blockquote") {
          return (
            <blockquote
              key={i}
              className={`reveal mt-6 border-l-2 border-mist py-1 pl-6 text-[1.1875rem] leading-[1.6] text-carbon/85 ${isAr ? "border-l-0 border-r-2 pl-0 pr-6 font-arabic" : "font-display italic"}`}
              data-delay={delay}
            >
              {renderInline(block.text)}
            </blockquote>
          );
        }

        if (block.type === "code") {
          return (
            <pre
              key={i}
              className="reveal mt-6 overflow-x-auto rounded-sm border border-carbon/12 bg-limestone/30 p-5 text-[0.875rem] leading-[1.6] text-carbon/85"
              data-delay={delay}
            >
              <code className="font-mono">{block.text}</code>
            </pre>
          );
        }

        if (block.type === "image") {
          return (
            <div key={i} className="reveal mt-8" data-delay={delay}>
              <Figure src={block.src} label={block.alt} caption={block.caption ?? ""} />
            </div>
          );
        }

        // block.type === "table" — wrapped in its own horizontal-scroll
        // container so a wide comparison table never forces the page itself
        // to scroll sideways on mobile (section 18 of the Insights brief).
        return (
          <div
            key={i}
            className="reveal mt-6 -mx-1 overflow-x-auto px-1"
            data-delay={delay}
          >
            <table className={`w-full min-w-[560px] border-collapse text-left text-[0.9375rem] ${isAr ? "font-arabic text-right" : ""}`}>
              <thead>
                <tr className="border-b border-carbon/25">
                  {block.headers.map((heading, h) => (
                    <th
                      key={h}
                      scope="col"
                      className={`whitespace-nowrap px-4 py-3 text-carbon ${isAr ? "font-arabic font-bold" : "font-display font-medium"} first:pl-0`}
                    >
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {block.rows.map((row, r) => (
                  <tr key={r} className="border-b border-carbon/10">
                    {row.map((cell, c) => (
                      <td key={c} className="px-4 py-3 align-top leading-[1.6] text-carbon/80 first:pl-0">
                        {renderInline(cell)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      })}
    </div>
  );
}
