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
  ogDefaultsAr,
} from "@/lib/site";

const DEFAULT_TITLE_AR = "رؤى";
const DEFAULT_DESCRIPTION_AR =
  "المنصة التحريرية لشاريو — أخبار السوق والمقالات ودراسات الحالة والاتجاهات والأدلة حول التسويق الأدائي وتحسين محركات البحث والمواقع الإلكترونية وإدارة علاقات العملاء في دبي.";

const HERO_IMAGE = heroImages.insights.src;
const HERO_IMAGE_ALT =
  "امرأة ترتدي معطفاً بيج وتضع نظارة شمسية، تقف أمام جدار حجري مشمس تتقاطع عليه ظلال حادة";

export async function generateMetadata({
  searchParams,
}: PageProps<"/ar/insights">): Promise<Metadata> {
  const sp = await searchParams;
  const requested = typeof sp.category === "string" ? sp.category : undefined;
  const category = requested ? getInsightCategory(requested) : undefined;

  const canonical = category ? `/ar/insights?category=${category.slug}` : "/ar/insights";
  const enCanonical = category ? `/insights?category=${category.slug}` : "/insights";
  const ruCanonical = category ? `/ru/insights?category=${category.slug}` : "/ru/insights";
  const title = category ? `${category.nameAr} — رؤى` : DEFAULT_TITLE_AR;
  const description = category?.descriptionAr ?? DEFAULT_DESCRIPTION_AR;

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: { en: enCanonical, ar: canonical, ru: ruCanonical, "x-default": enCanonical },
    },
    openGraph: {
      ...ogDefaultsAr,
      url: canonical,
      type: "website",
      title: `${title} — شاريو`,
      description,
    },
  };
}

export default async function ArabicInsightsPage({
  searchParams,
}: PageProps<"/ar/insights">) {
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
      <InsightsBlogStructuredData locale="ar" />

      <h1 className="sr-only">
        {requestedCategory ? `${requestedCategory.nameAr} — رؤى` : "أفكار تدفع التسويق إلى الأمام."}
      </h1>
      <Hero
        src={HERO_IMAGE}
        alt={HERO_IMAGE_ALT}
        focus="object-[58%_28%]"
        eyebrow="رؤى"
        priority
      />

      {/* Featured */}
      {featured && (
        <Band className="relative overflow-hidden">
          <span
            aria-hidden="true"
            className="wordmark-ar pointer-events-none absolute -left-[18%] top-1/2 z-0 w-[65%] -translate-y-1/2 text-carbon/[0.045] wide:-left-[10%] wide:w-[38%]"
          />
          <p className="eyebrow relative z-10 mb-8 flex items-center gap-3 text-carbon/55">
            <span aria-hidden="true" className="h-px w-6 bg-mist" />
            مميز
          </p>
          <div className="relative z-10 grid items-center gap-10 wide:grid-cols-[1.05fr_0.95fr] wide:gap-16">
            <Link
              href={`/ar/insights/${featured.slug}`}
              className="group block"
              aria-hidden="true"
              tabIndex={-1}
            >
              <div className="frame relative aspect-[4/3] overflow-hidden">
                <Image
                  src={featured.image}
                  alt={featured.imageAltAr}
                  fill
                  sizes="(min-width: 880px) 50vw, 100vw"
                  priority
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-carbon/85 via-carbon/15 to-transparent"
                />
                <p className="absolute bottom-6 left-6 right-6 font-arabic text-[1.25rem] font-bold leading-[1.25] text-porcelain wide:bottom-8 wide:left-8 wide:right-8 wide:text-[1.375rem]">
                  {featured.imageTopicAr}
                </p>
              </div>
            </Link>
            <div>
              <p className="eyebrow flex items-center gap-3 text-carbon/55">
                <span aria-hidden="true" className="h-px w-6 bg-mist" />
                {featuredCategory?.nameAr}
              </p>
              <Heading scale="md" className="mt-5">
                <Link
                  href={`/ar/insights/${featured.slug}`}
                  className="transition-colors duration-300 hover:text-carbon/70"
                >
                  {featured.titleAr}
                </Link>
              </Heading>
              <p className="reveal mt-6 max-w-[520px] text-[1.0625rem] leading-[1.7] text-carbon/75">
                {featured.excerptAr}
              </p>
              <p className="mt-6 text-[0.8125rem] text-carbon/50">
                <span dir="ltr">{featured.date}</span> · {featured.readingTimeAr}
              </p>
              <div className="mt-8">
                <PillLink href={`/ar/insights/${featured.slug}`}>
                  اقرؤوا المقال
                </PillLink>
              </div>
            </div>
          </div>
        </Band>
      )}

      {/* Category navigation + editorial grid */}
      <Band className="bg-limestone/30">
        <SectionIntro
          eyebrow="الأرشيف"
          title="تصفحوا حسب الفئة."
          align="left"
          scale="sm"
        />
        <InsightsExplorer
          articles={insightArticles}
          categories={insightCategories}
          initialCategory={initialCategory}
          locale="ar"
        />
      </Band>

      <CtaBand
        title="هل لديكم مشروع يثير أسئلة كهذه؟"
        sub="خمس عشرة دقيقة حول أين يمكن لتسويقكم كسب المزيد من الإيرادات، وكيف ستحقق شاريو ذلك."
      >
        <PillLink href={cta.href} tone="solid" size="lg">
          {cta.labelAr}
        </PillLink>
      </CtaBand>
    </>
  );
}
