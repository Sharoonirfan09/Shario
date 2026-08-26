import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArticleBody, InsightCard } from "@/components/insights";
import {
  ArticleStructuredData,
  BreadcrumbStructuredData,
  FaqStructuredData,
} from "@/components/structured-data";
import {
  Band,
  Breadcrumb,
  CardGrid,
  CtaBand,
  PillLink,
  SectionIntro,
  TypeHero,
} from "@/components/ui";
import {
  cta,
  getInsightArticle,
  getInsightCategory,
  insightArticles,
  insightCategories,
  ogDefaults,
  site,
} from "@/lib/site";

/** Every article is known at build time, so prerender them. */
export function generateStaticParams() {
  return insightArticles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/insights/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const article = getInsightArticle(slug);
  if (!article) return {};

  const title = article.seoTitle ?? article.title;
  const description = article.metaDescription ?? article.excerpt;

  // An English-only article (see `InsightArticle.locales`) asserts no `ar`/
  // `ru` alternate — declaring one would point hreflang at a route that
  // 404s, which is worse than simply not declaring it yet.
  const hasAr = !article.locales || article.locales.includes("ar");
  const hasRu = !article.locales || article.locales.includes("ru");
  const languages: Record<string, string> = {
    en: `/insights/${article.slug}`,
    "x-default": `/insights/${article.slug}`,
  };
  if (hasAr) languages.ar = `/ar/insights/${article.slug}`;
  if (hasRu) languages.ru = `/ru/insights/${article.slug}`;

  return {
    title,
    description,
    alternates: {
      canonical: `/insights/${article.slug}`,
      languages,
    },
    openGraph: {
      ...ogDefaults,
      url: `/insights/${article.slug}`,
      type: "article",
      title,
      description,
      publishedTime: new Date(article.date).toISOString(),
      authors: [site.founder],
    },
  };
}

export default async function InsightArticlePage({
  params,
}: PageProps<"/insights/[slug]">) {
  const { slug } = await params;
  const article = getInsightArticle(slug);
  if (!article) notFound();

  const category = getInsightCategory(article.category);
  const related = insightArticles
    .filter((a) => a.slug !== article.slug && a.category === article.category)
    .concat(insightArticles.filter((a) => a.slug !== article.slug && a.category !== article.category))
    .slice(0, 3);

  const breadcrumbItems = [
    { href: "/", label: "Home" },
    { href: "/insights", label: "Insights" },
    { label: article.title },
  ];

  return (
    <>
      <ArticleStructuredData article={article} category={category} />
      <BreadcrumbStructuredData items={breadcrumbItems} />
      {article.faqs && <FaqStructuredData items={article.faqs} />}

      <TypeHero
        tone="carbon"
        eyebrow={category?.name ?? "Insights"}
        title={article.title}
        breadcrumb={<Breadcrumb items={breadcrumbItems} />}
      />

      <Band>
        <div className="mx-auto max-w-[760px]">
          <p className="mb-10 text-[0.8125rem] text-carbon/50">
            {article.date} · {article.readingTime}
          </p>

          <div className="frame relative mb-12 aspect-[16/9] overflow-hidden">
            <Image
              src={article.image}
              alt={article.imageAlt}
              fill
              sizes="(min-width: 880px) 760px, 100vw"
              preload
              fetchPriority="high"
              className="object-cover"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-carbon/85 via-carbon/15 to-transparent"
            />
            <p className="absolute bottom-6 left-6 right-6 font-display text-[1.375rem] font-normal leading-[1.25] text-porcelain wide:bottom-8 wide:left-8 wide:right-8 wide:text-[1.625rem]">
              {article.imageTopic}
            </p>
          </div>

          <p className="reveal font-display text-[1.5rem] font-normal leading-[1.4] text-carbon wide:text-[1.75rem]">
            {article.excerpt}
          </p>

          <ArticleBody blocks={article.body} />
        </div>
      </Band>

      {related.length > 0 && (
        <Band className="bg-limestone/30">
          <SectionIntro
            eyebrow="Keep Reading"
            title="More from Insights."
            align="left"
            scale="sm"
          />
          <CardGrid columns={3}>
            {related.map((item, i) => (
              <InsightCard
                key={item.slug}
                article={item}
                categories={insightCategories}
                delay={i * 60}
              />
            ))}
          </CardGrid>
        </Band>
      )}

      <CtaBand
        title="Have a project this raises questions about?"
        sub="Fifteen minutes on where your marketing can win more revenue, and how Shario would unlock it."
        arabicAccent
      >
        <PillLink href={cta.href} tone="solid" size="lg">
          {cta.label}
        </PillLink>
      </CtaBand>
    </>
  );
}
