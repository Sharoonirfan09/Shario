import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArticleBody, InsightCard } from "@/components/insights";
import {
  ArticleStructuredData,
  BreadcrumbStructuredData,
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
  insightArticlesForLocale,
  insightCategories,
  ogDefaultsRu,
  site,
} from "@/lib/site";

/** Every article with a Russian edition is known at build time, so prerender them. English-only pieces (see `InsightArticle.locales`) are left out — visiting one here 404s via the guard below instead of rendering English copy in Russian chrome. */
export function generateStaticParams() {
  return insightArticlesForLocale("ru").map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/ru/insights/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const article = getInsightArticle(slug);
  if (!article || (article.locales && !article.locales.includes("ru"))) return {};

  const title = article.seoTitleRu ?? article.titleRu ?? article.title;
  const description = article.metaDescriptionRu ?? article.excerptRu ?? article.excerpt;

  return {
    title,
    description,
    alternates: {
      canonical: `/ru/insights/${article.slug}`,
      languages: {
        en: `/insights/${article.slug}`,
        ar: `/ar/insights/${article.slug}`,
        ru: `/ru/insights/${article.slug}`,
        "x-default": `/insights/${article.slug}`,
      },
    },
    openGraph: {
      ...ogDefaultsRu,
      url: `/ru/insights/${article.slug}`,
      type: "article",
      title,
      description,
      publishedTime: new Date(article.date).toISOString(),
      authors: [site.founderRu],
    },
  };
}

export default async function RussianInsightArticlePage({
  params,
}: PageProps<"/ru/insights/[slug]">) {
  const { slug } = await params;
  const article = getInsightArticle(slug);
  if (!article || (article.locales && !article.locales.includes("ru"))) notFound();

  const ruArticles = insightArticlesForLocale("ru");
  const category = getInsightCategory(article.category);
  const related = ruArticles
    .filter((a) => a.slug !== article.slug && a.category === article.category)
    .concat(ruArticles.filter((a) => a.slug !== article.slug && a.category !== article.category))
    .slice(0, 3);

  const breadcrumbItems = [
    { href: "/ru", label: "Главная" },
    { href: "/ru/insights", label: "Инсайты" },
    { label: article.titleRu ?? article.title },
  ];

  return (
    <>
      <ArticleStructuredData article={article} category={category} locale="ru" />
      <BreadcrumbStructuredData items={breadcrumbItems} />

      <TypeHero
        tone="carbon"
        eyebrow={category?.nameRu ?? "Инсайты"}
        title={article.titleRu ?? article.title}
        breadcrumb={<Breadcrumb locale="ru" items={breadcrumbItems} />}
      />

      <Band>
        <div className="mx-auto max-w-[760px]">
          <p className="mb-10 text-[0.8125rem] text-carbon/50">
            {article.date} · {article.readingTimeRu ?? article.readingTime}
          </p>

          <div className="frame relative mb-12 aspect-[16/9] overflow-hidden">
            <Image
              src={article.image}
              alt={article.imageAltRu ?? article.imageAlt}
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
              {article.imageTopicRu ?? article.imageTopic}
            </p>
          </div>

          <p className="reveal font-display text-[1.5rem] font-normal leading-[1.4] text-carbon wide:text-[1.75rem]">
            {article.excerptRu ?? article.excerpt}
          </p>

          <ArticleBody blocks={article.bodyRu ?? article.body} locale="ru" />
        </div>
      </Band>

      {related.length > 0 && (
        <Band className="bg-limestone/30">
          <SectionIntro
            eyebrow="Продолжить чтение"
            title="Больше материалов из Инсайтов."
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
                locale="ru"
              />
            ))}
          </CardGrid>
        </Band>
      )}

      <CtaBand
        title="Есть проект, который поднимает подобные вопросы?"
        sub="Пятнадцать минут о том, где ваш маркетинг может приносить больше выручки, и как SHARIO этого добьётся."
        arabicAccent
      >
        <PillLink href={cta.href} tone="solid" size="lg">
          {cta.labelRu}
        </PillLink>
      </CtaBand>
    </>
  );
}
