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
  insightArticles,
  insightCategories,
  ogDefaultsAr,
  site,
} from "@/lib/site";

/** Every article is known at build time, so prerender them. */
export function generateStaticParams() {
  return insightArticles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/ar/insights/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const article = getInsightArticle(slug);
  if (!article) return {};

  const title = article.seoTitleAr ?? article.titleAr;
  const description = article.metaDescriptionAr ?? article.excerptAr;

  return {
    title,
    description,
    alternates: {
      canonical: `/ar/insights/${article.slug}`,
      languages: {
        en: `/insights/${article.slug}`,
        ar: `/ar/insights/${article.slug}`,
        "x-default": `/insights/${article.slug}`,
      },
    },
    openGraph: {
      ...ogDefaultsAr,
      url: `/ar/insights/${article.slug}`,
      type: "article",
      title,
      description,
      publishedTime: new Date(article.date).toISOString(),
      authors: [site.founderAr],
    },
  };
}

export default async function ArabicInsightArticlePage({
  params,
}: PageProps<"/ar/insights/[slug]">) {
  const { slug } = await params;
  const article = getInsightArticle(slug);
  if (!article) notFound();

  const category = getInsightCategory(article.category);
  const related = insightArticles
    .filter((a) => a.slug !== article.slug && a.category === article.category)
    .concat(insightArticles.filter((a) => a.slug !== article.slug && a.category !== article.category))
    .slice(0, 3);

  const breadcrumbItems = [
    { href: "/ar", label: "الرئيسية" },
    { href: "/ar/insights", label: "رؤى" },
    { label: article.titleAr },
  ];

  return (
    <>
      <ArticleStructuredData article={article} category={category} locale="ar" />
      <BreadcrumbStructuredData items={breadcrumbItems} />

      <TypeHero
        tone="carbon"
        eyebrow={category?.nameAr ?? "رؤى"}
        title={article.titleAr}
        breadcrumb={<Breadcrumb locale="ar" items={breadcrumbItems} />}
      />

      <Band>
        <div className="mx-auto max-w-[760px]">
          <p className="mb-10 text-[0.8125rem] text-carbon/50">
            <span dir="ltr">{article.date}</span> · {article.readingTimeAr}
          </p>

          <div className="frame relative mb-12 aspect-[16/9] overflow-hidden">
            <Image
              src={article.image}
              alt={article.imageAltAr}
              fill
              sizes="(min-width: 880px) 760px, 100vw"
              priority
              className="object-cover"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-carbon/85 via-carbon/15 to-transparent"
            />
            <p className="absolute bottom-6 left-6 right-6 font-arabic text-[1.25rem] font-bold leading-[1.25] text-porcelain wide:bottom-8 wide:left-8 wide:right-8 wide:text-[1.5rem]">
              {article.imageTopicAr}
            </p>
          </div>

          <p className="reveal font-arabic text-[1.375rem] font-bold leading-[1.5] text-carbon wide:text-[1.625rem]">
            {article.excerptAr}
          </p>

          <ArticleBody blocks={article.bodyAr} locale="ar" />
        </div>
      </Band>

      {related.length > 0 && (
        <Band className="bg-limestone/30">
          <SectionIntro
            eyebrow="تابعوا القراءة"
            title="المزيد من رؤى."
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
                locale="ar"
              />
            ))}
          </CardGrid>
        </Band>
      )}

      <CtaBand
        title="هل لديكم مشروع يثير أسئلة كهذه؟"
        sub="خمس عشرة دقيقة حول أين يمكن لتسويقكم كسب المزيد من الإيرادات، وكيف ستحقق شاريو ذلك."
        arabicAccent
      >
        <PillLink href={cta.href} tone="solid" size="lg">
          {cta.labelAr}
        </PillLink>
      </CtaBand>
    </>
  );
}
