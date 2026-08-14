import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { InsightsExplorer } from "@/components/insights";
import { InsightsBlogStructuredData } from "@/components/structured-data";
import { Band, CtaBand, Heading, Hero, PillLink, SectionIntro } from "@/components/ui";
import {
  cta,
  getInsightCategory,
  insightArticles,
  insightCategories,
} from "@/lib/site";

const DEFAULT_TITLE = "Insights";
const DEFAULT_DESCRIPTION =
  "SHARIO's editorial hub — market news, articles, case studies, trends and guides on performance marketing, SEO, websites and CRM in Dubai.";

/**
 * A single constant, so swapping this banner's photograph later is a
 * one-line edit here, not a layout change. `Hero` (the same component
 * About and Contact use) handles the box height, padding and `settle`
 * entrance animation on its own; this file only ever needs to change the
 * path. Exported so `opengraph-image.tsx` (here and in `[slug]`'s not-found
 * fallback) reuses the same reference instead of quoting the path again —
 * `check:images` flags any path quoted more than once.
 */
export const HERO_IMAGE = "/images/insights/insights-banner-editorial-walk.jpg";
export const HERO_IMAGE_ALT =
  "A woman in a wide-brimmed hat walking past a stone colonnade, in black and white";

/**
 * Generated rather than static, so each category — reached via `?category=`
 * — gets its own <title>, meta description and canonical, matching what a
 * dedicated category page would carry, without turning this into a second
 * route to keep in sync with the client-filtered grid below.
 */
export async function generateMetadata({
  searchParams,
}: PageProps<"/insights">): Promise<Metadata> {
  const sp = await searchParams;
  const requested = typeof sp.category === "string" ? sp.category : undefined;
  const category = requested ? getInsightCategory(requested) : undefined;

  const canonical = category ? `/insights?category=${category.slug}` : "/insights";
  const title = category ? `${category.name} — Insights` : DEFAULT_TITLE;
  const description = category?.description ?? DEFAULT_DESCRIPTION;

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      url: canonical,
      type: "website",
      title: `${title} — Shario`,
      description,
    },
  };
}

export default async function InsightsPage({
  searchParams,
}: PageProps<"/insights">) {
  const sp = await searchParams;
  const requested = typeof sp.category === "string" ? sp.category : "all";
  const requestedCategory = getInsightCategory(requested);
  const initialCategory = requestedCategory ? requested : "all";

  const featured = insightArticles.find((article) => article.featured);
  const featuredCategory = featured
    ? getInsightCategory(featured.category)
    : undefined;

  return (
    <>
      <InsightsBlogStructuredData />

      {/* `Hero` here carries no visible `title` — every page banner is
          label-only now, Services is the reference. A screen-reader-only H1
          gives the page the one real heading every page needs, still
          following the active category (from `?category=`) for unique
          on-page SEO signal per section, without adding anything to what a
          sighted visitor sees. */}
      <h1 className="sr-only">
        {requestedCategory ? `${requestedCategory.name} — Insights` : "Ideas that move marketing forward."}
      </h1>
      <Hero
        src={HERO_IMAGE}
        alt={HERO_IMAGE_ALT}
        focus="object-[50%_35%]"
        eyebrow="Insights"
        priority
      />

      {/* Featured Content — the same image-beside-text band the homepage
          uses for "About Shario", reused here rather than inventing a new
          layout for a single featured piece. */}
      {featured && (
        <Band className="relative overflow-hidden">
          {/* Large and bleeding off the edge, extending past where the
              viewport actually cuts it — a different scale and crop than
              the homepage's own version of this same mark, so the two
              don't read as one motif copy-pasted twice. */}
          <span
            aria-hidden="true"
            className="wordmark-ar pointer-events-none absolute -right-[18%] top-1/2 z-0 w-[65%] -translate-y-1/2 text-carbon/[0.045] wide:-right-[10%] wide:w-[38%]"
          />
          <p className="eyebrow relative z-10 mb-8 flex items-center gap-3 text-carbon/55">
            <span aria-hidden="true" className="h-px w-6 bg-mist" />
            Featured
          </p>
          <div className="relative z-10 grid items-center gap-10 wide:grid-cols-[1.05fr_0.95fr] wide:gap-16">
            <Link
              href={`/insights/${featured.slug}`}
              className="group block"
              aria-hidden="true"
              tabIndex={-1}
            >
              <div className="frame relative aspect-[4/3] overflow-hidden">
                <Image
                  src={featured.image}
                  alt={featured.imageAlt}
                  fill
                  sizes="(min-width: 880px) 50vw, 100vw"
                  priority
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-carbon/85 via-carbon/15 to-transparent"
                />
                <p className="absolute bottom-6 left-6 right-6 font-display text-[1.375rem] font-normal leading-[1.25] text-porcelain wide:bottom-8 wide:left-8 wide:right-8 wide:text-[1.5rem]">
                  {featured.imageTopic}
                </p>
              </div>
            </Link>
            <div>
              <p className="eyebrow flex items-center gap-3 text-carbon/55">
                <span aria-hidden="true" className="h-px w-6 bg-mist" />
                {featuredCategory?.name}
              </p>
              <Heading scale="md" className="mt-5">
                <Link
                  href={`/insights/${featured.slug}`}
                  className="transition-colors duration-300 hover:text-carbon/70"
                >
                  {featured.title}
                </Link>
              </Heading>
              <p className="reveal mt-6 max-w-[520px] text-[1.0625rem] leading-[1.7] text-carbon/75">
                {featured.excerpt}
              </p>
              <p className="mt-6 text-[0.8125rem] text-carbon/50">
                {featured.date} · {featured.readingTime}
              </p>
              <div className="mt-8">
                <PillLink href={`/insights/${featured.slug}`}>
                  Read the piece
                </PillLink>
              </div>
            </div>
          </div>
        </Band>
      )}

      {/* Category navigation + editorial grid */}
      <Band className="bg-limestone/30">
        <SectionIntro
          eyebrow="The Archive"
          title="Browse by category."
          align="left"
          scale="sm"
        />
        <InsightsExplorer
          articles={insightArticles}
          categories={insightCategories}
          initialCategory={initialCategory}
        />
      </Band>

      <CtaBand
        title="Have a project this raises questions about?"
        sub="Fifteen minutes on where your marketing can win more revenue, and how Shario would unlock it."
      >
        <PillLink href={cta.href} tone="solid" size="lg">
          {cta.label}
        </PillLink>
      </CtaBand>
    </>
  );
}
