import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { InsightsExplorer } from "@/components/insights";
import { InsightsBlogStructuredData } from "@/components/structured-data";
import { Band, CtaBand, Heading, Hero, PillLink, SectionIntro } from "@/components/ui";
import {
  cta,
  getInsightCategory,
  heroImages,
  insightArticles,
  insightCategories,
  ogDefaultsRu,
} from "@/lib/site";

const DEFAULT_TITLE_RU = "Инсайты";
const DEFAULT_DESCRIPTION_RU =
  "Редакционная платформа SHARIO — новости рынка, статьи, кейсы, тренды и руководства о цифровом маркетинге, SEO, сайтах и CRM в Дубае.";

const HERO_IMAGE = heroImages.insights.src;
const HERO_IMAGE_ALT =
  "Женщина в бежевом пальто и солнцезащитных очках стоит у солнечной каменной стены, на которой пересекаются резкие тени";

export async function generateMetadata({
  searchParams,
}: PageProps<"/ru/insights">): Promise<Metadata> {
  const sp = await searchParams;
  const requested = typeof sp.category === "string" ? sp.category : undefined;
  const category = requested ? getInsightCategory(requested) : undefined;

  const canonical = category ? `/ru/insights?category=${category.slug}` : "/ru/insights";
  const enCanonical = category ? `/insights?category=${category.slug}` : "/insights";
  const arCanonical = category ? `/ar/insights?category=${category.slug}` : "/ar/insights";
  const title = category ? `${category.nameRu} — Инсайты` : DEFAULT_TITLE_RU;
  const description = category?.descriptionRu ?? DEFAULT_DESCRIPTION_RU;

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: { en: enCanonical, ar: arCanonical, ru: canonical, "x-default": enCanonical },
    },
    openGraph: {
      ...ogDefaultsRu,
      url: canonical,
      type: "website",
      title: `${title} — SHARIO`,
      description,
    },
  };
}

export default async function RussianInsightsPage({
  searchParams,
}: PageProps<"/ru/insights">) {
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
      <InsightsBlogStructuredData locale="ru" />

      <h1 className="sr-only">
        {requestedCategory ? `${requestedCategory.nameRu} — Инсайты` : "Идеи, которые двигают маркетинг вперёд."}
      </h1>
      <Hero
        src={HERO_IMAGE}
        alt={HERO_IMAGE_ALT}
        focus="object-[58%_28%]"
        eyebrow="Инсайты"
        priority
      />

      {/* Featured */}
      {featured && (
        <Band className="relative overflow-hidden">
          <span
            aria-hidden="true"
            className="wordmark-ar pointer-events-none absolute -right-[18%] top-1/2 z-0 w-[65%] -translate-y-1/2 text-carbon/[0.045] wide:-right-[10%] wide:w-[38%]"
          />
          <p className="eyebrow relative z-10 mb-8 flex items-center gap-3 text-carbon/55">
            <span aria-hidden="true" className="h-px w-6 bg-mist" />
            Рекомендуем
          </p>
          <div className="relative z-10 grid items-center gap-10 wide:grid-cols-[1.05fr_0.95fr] wide:gap-16">
            <Link
              href={`/ru/insights/${featured.slug}`}
              className="group block"
              aria-hidden="true"
              tabIndex={-1}
            >
              <div className="frame relative aspect-[4/3] overflow-hidden">
                <Image
                  src={featured.image}
                  alt={featured.imageAltRu}
                  fill
                  sizes="(min-width: 880px) 50vw, 100vw"
                  preload
                  fetchPriority="high"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-carbon/85 via-carbon/15 to-transparent"
                />
                <p className="absolute bottom-6 left-6 right-6 font-display text-[1.375rem] font-normal leading-[1.25] text-porcelain wide:bottom-8 wide:left-8 wide:right-8 wide:text-[1.5rem]">
                  {featured.imageTopicRu}
                </p>
              </div>
            </Link>
            <div>
              <p className="eyebrow flex items-center gap-3 text-carbon/55">
                <span aria-hidden="true" className="h-px w-6 bg-mist" />
                {featuredCategory?.nameRu}
              </p>
              <Heading scale="md" className="mt-5">
                <Link
                  href={`/ru/insights/${featured.slug}`}
                  className="transition-colors duration-300 hover:text-carbon/70"
                >
                  {featured.titleRu}
                </Link>
              </Heading>
              <p className="reveal mt-6 max-w-[520px] text-[1.0625rem] leading-[1.7] text-carbon/75">
                {featured.excerptRu}
              </p>
              <p className="mt-6 text-[0.8125rem] text-carbon/50">
                {featured.date} · {featured.readingTimeRu}
              </p>
              <div className="mt-8">
                <PillLink href={`/ru/insights/${featured.slug}`}>
                  Читать материал
                </PillLink>
              </div>
            </div>
          </div>
        </Band>
      )}

      {/* Category navigation + editorial grid */}
      <Band className="bg-limestone/30">
        <SectionIntro
          eyebrow="Архив"
          title="Смотреть по категориям."
          align="left"
          scale="sm"
        />
        <InsightsExplorer
          articles={insightArticles}
          categories={insightCategories}
          initialCategory={initialCategory}
          locale="ru"
        />
      </Band>

      <CtaBand
        title="Есть проект, который поднимает подобные вопросы?"
        sub="Пятнадцать минут о том, где ваш маркетинг может приносить больше выручки, и как SHARIO этого добьётся."
      >
        <PillLink href={cta.href} tone="solid" size="lg">
          {cta.labelRu}
        </PillLink>
      </CtaBand>
    </>
  );
}
