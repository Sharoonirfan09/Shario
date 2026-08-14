"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import type { ReactNode } from "react";
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
}: {
  articles: InsightArticle[];
  categories: InsightCategory[];
  initialCategory?: string;
}) {
  const [active, setActive] = useState(initialCategory);

  const filtered = useMemo(
    () =>
      active === "all"
        ? articles
        : articles.filter((article) => article.category === active),
    [articles, active],
  );

  const activeCategory = categories.find((category) => category.slug === active);

  return (
    <div>
      <div
        role="tablist"
        aria-label="Filter by category"
        className="mb-12 flex flex-wrap gap-3 wide:mb-16"
      >
        <CategoryTab
          label="All"
          active={active === "all"}
          onClick={() => setActive("all")}
        />
        {categories.map((category) => (
          <CategoryTab
            key={category.slug}
            label={category.name}
            active={active === category.slug}
            onClick={() => setActive(category.slug)}
          />
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="border-t border-carbon/15 py-20 text-center">
          <p className="text-[1.0625rem] text-carbon/60">
            More {activeCategory?.name.toLowerCase() ?? "articles"} are on the
            way.
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
            />
          ))}
        </div>
      )}
    </div>
  );
}

function CategoryTab({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      onClick={onClick}
      className={`eyebrow rounded-full border px-5 py-2.5 transition-colors duration-300 ${
        active
          ? "border-carbon bg-carbon text-porcelain"
          : "border-carbon/20 text-carbon/60 hover:border-mist hover:bg-mist/15 hover:text-carbon"
      }`}
    >
      {label}
    </button>
  );
}

export function InsightCard({
  article,
  categories,
  delay = 0,
  size = "default",
}: {
  article: InsightArticle;
  categories: InsightCategory[];
  delay?: number;
  /** `large` — the homepage's editorial band: bigger type, more air, the
   *  same card the Archive grid uses underneath rather than a bespoke one. */
  size?: "default" | "large";
}) {
  const category = categories.find((c) => c.slug === article.category);
  const large = size === "large";

  return (
    <Link
      href={`/insights/${article.slug}`}
      className="group reveal flex flex-col"
      data-delay={delay}
    >
      <div className="frame relative aspect-[4/3] overflow-hidden">
        <Image
          src={article.image}
          alt={article.imageAlt}
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
        <p className="absolute bottom-5 left-5 right-5 font-display text-[1.1875rem] font-normal leading-[1.25] text-porcelain wide:bottom-6 wide:left-6 wide:right-6 wide:text-[1.3125rem]">
          {article.imageTopic}
        </p>
      </div>
      <div className={`flex flex-1 flex-col ${large ? "pt-7" : "pt-6"}`}>
        <p className="eyebrow flex items-center gap-3 text-carbon/50">
          <span aria-hidden="true" className="h-px w-4 bg-mist" />
          {category?.name}
        </p>
        <h3
          className={`mt-3 font-display font-medium leading-[1.2] transition-colors duration-300 group-hover:text-carbon/70 ${
            large
              ? "text-[1.625rem] wide:text-[1.75rem]"
              : "text-[1.375rem]"
          }`}
        >
          {article.title}
        </h3>
        <p
          className={`mt-3 flex-1 leading-[1.7] text-carbon/70 ${
            large ? "text-[1rem]" : "text-[0.9375rem]"
          }`}
        >
          {article.excerpt}
        </p>
        <p className="mt-5 text-[0.8125rem] text-carbon/45">
          {article.date} · {article.readingTime}
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
 * other text block on the site uses.
 */
export function ArticleBody({ blocks }: { blocks: ArticleBlock[] }) {
  return (
    <div className="mt-8">
      {blocks.map((block, i) => {
        const delay = i * 40;

        if (block.type === "h2") {
          return (
            <h2
              key={i}
              className="reveal mt-12 font-display text-[1.5rem] font-normal leading-[1.3] text-carbon first:mt-0 wide:text-[1.75rem]"
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
              className="reveal mt-8 font-display text-[1.1875rem] font-medium leading-[1.35] text-carbon first:mt-0"
              data-delay={delay}
            >
              {block.text}
            </h3>
          );
        }

        return (
          <p
            key={i}
            className="reveal mt-5 text-[1.0625rem] leading-[1.8] text-carbon/80 first:mt-0"
            data-delay={delay}
          >
            {renderInline(block.text)}
          </p>
        );
      })}
    </div>
  );
}
