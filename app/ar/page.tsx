import type { Metadata } from "next";
import Link from "next/link";
import { Faq } from "@/components/faq";
import { InsightCard } from "@/components/insights";
import { SixServices } from "@/components/six-services";
import { FaqStructuredData } from "@/components/structured-data";
import {
  ArabicStatement,
  Band,
  Card,
  CardGrid,
  CtaBand,
  Frame,
  Heading,
  PillLink,
  SectionIntro,
  SplitHero,
} from "@/components/ui";
import {
  cta,
  heroImages,
  homeFaqs,
  howWeWork,
  insightCategories,
  latestInsightArticles,
  ogDefaultsAr,
  sharedImages,
  site,
} from "@/lib/site";

export const metadata: Metadata = {
  // Written out in full rather than relying on `app/ar/layout.tsx`'s
  // `title.template`: a layout's template does not apply to a page in that
  // same route segment, and this page is the index of `app/ar` itself.
  title: "وكالة تسويق رقمي في دبي — شاريو",
  description: site.descriptionAr,
  alternates: {
    canonical: "/ar",
    languages: { en: "/", ar: "/ar", ru: "/ru", "x-default": "/" },
  },
  openGraph: {
    ...ogDefaultsAr,
    url: "/ar",
    type: "website",
    title: "شاريو — وكالة تسويق رقمي في دبي",
    description: site.descriptionAr,
  },
};

/** Same photograph and crop as the English homepage — `heroImages.home` in `lib/site.ts`. */
const HERO_IMAGE = heroImages.home.src;
const HERO_IMAGE_ALT = `${site.founderAr}، مؤسسة شاريو، وكالة تسويق رقمي في دبي`;

/** Same four textures as the English homepage's "How We Work" cards — `lib/site.ts`'s `sharedImages.homeStepTextures`. */
const stepTextures = sharedImages.homeStepTextures;

export default function ArabicHomePage() {
  return (
    <>
      <FaqStructuredData items={homeFaqs.map((item) => ({ q: item.qAr, a: item.aAr }))} />

      <SplitHero
        src={HERO_IMAGE}
        alt={HERO_IMAGE_ALT}
        focus="object-[50%_28%]"
        locale="ar"
        title={
          <>
            <span className="block">وكالة تسويق رقمي</span>
            <span className="block">في دبي</span>
          </>
        }
        subhead="سيمفونية الهوية"
        href="/ar/about"
        linkLabel="داخل شاريو"
      >
        <PillLink href={cta.href} tone="solid" size="lg">
          {cta.labelAr}
        </PillLink>
        <PillLink href="/ar/services" tone="outline" size="lg">
          خدماتنا
        </PillLink>
      </SplitHero>

      <SixServices locale="ar" />

      {/* About — image beside text */}
      <Band className="bg-limestone/30">
        <div className="grid items-center gap-12 wide:grid-cols-[1fr_1.05fr] wide:gap-20">
          <Frame
            src={sharedImages.homeAboutHorizon}
            ratio="aspect-[4/3]"
            alt="امرأة جالسة عند البحر وقت الغروب، في مشهد ضبابي ناعم، تنظر نحو الأفق"
          />
          <div>
            <p className="eyebrow flex items-center gap-3 text-carbon/55">
              <span aria-hidden="true" className="h-px w-6 bg-mist" />
              عن شاريو
            </p>
            <Heading scale="md" className="mt-5">
              بقيادة المؤسسة منذ اليوم الأول.
            </Heading>
            <p className="reveal mt-6 max-w-[560px] text-[1.0625rem] leading-[1.7] text-carbon/75">
              شاريو وكالة تسويق رقمي في دبي، تعمل وفق نموذج قيادة أول. تُضبط
              كل استراتيجية على معيار مؤسسة بنت وأطلقت بنفسها أنظمة تسويقية
              متكاملة — تشمل{" "}
              <Link
                href="/ar/services/digital-marketing"
                className="border-b border-carbon/30 pb-0.5 text-carbon/90 transition-colors duration-300 hover:border-carbon hover:text-carbon"
              >
                التسويق الرقمي
              </Link>
              {" "}و{" "}
              <Link
                href="/ar/services/seo"
                className="border-b border-carbon/30 pb-0.5 text-carbon/90 transition-colors duration-300 hover:border-carbon hover:text-carbon"
              >
                تحسين محركات البحث
              </Link>
              {" "}و{" "}
              <Link
                href="/ar/services/website-development"
                className="border-b border-carbon/30 pb-0.5 text-carbon/90 transition-colors duration-300 hover:border-carbon hover:text-carbon"
              >
                تطوير المواقع الإلكترونية
              </Link>
              {" "}و{" "}
              <Link
                href="/ar/services/branding"
                className="border-b border-carbon/30 pb-0.5 text-carbon/90 transition-colors duration-300 hover:border-carbon hover:text-carbon"
              >
                العلامة التجارية
              </Link>
              {" "}— لمشاريع يقودها مطورون في المنطقة.
            </p>
            <p
              className="reveal mt-4 max-w-[560px] text-[1.0625rem] leading-[1.7] text-carbon/75"
              data-delay="90"
            >
              تحصلون على تفكير على مستوى أول في كل حملة، من فريق يبقى مع
              حسابكم — وصول مباشر إلى صانع الاستراتيجية نفسه، لا فريق حسابات
              متغيّر ينقلها إليكم بالنيابة.
            </p>
            <div className="reveal mt-9" data-delay="160">
              <PillLink href="/ar/about">اعرفوا المزيد</PillLink>
            </div>
          </div>
        </div>
      </Band>

      <ArabicStatement />

      {/* What makes us different */}
      <Band className="relative overflow-hidden">
        <span
          aria-hidden="true"
          className="wordmark-ar pointer-events-none absolute right-[4%] top-6 z-0 w-[46%] text-carbon/[0.07] wide:right-[6%] wide:top-10 wide:w-[26%]"
        />
        <div className="relative z-10">
          <SectionIntro
            eyebrow="ما الذي يميزنا"
            title="هكذا نعمل."
            sub="أربع خطوات، تُنفَّذ كل أسبوع لا كل ربع سنة — هذه هي طريقة عمل شاريو، وكالة تسويق رقمي وإبداعي في دبي."
          />
          <CardGrid columns={4}>
            {howWeWork.map((step, i) => (
              <Card
                key={step.num}
                badge={step.num}
                title={step.titleAr}
                titleAs="h3"
                desc={step.descAr}
                image={stepTextures[i]}
                delay={i * 60}
                locale="ar"
              />
            ))}
          </CardGrid>
        </div>
      </Band>

      {/* Insights */}
      <Band className="bg-limestone/30">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6 wide:mb-16">
          <div>
            <p className="eyebrow flex items-center gap-3 text-carbon/55">
              <span aria-hidden="true" className="h-px w-6 bg-mist" />
              من المجلة
            </p>
            <Heading scale="md" className="mt-5">
              أفكار تستحق وقتكم.
            </Heading>
          </div>
          <PillLink href="/ar/insights">عرض جميع الرؤى ←</PillLink>
        </div>

        <div className="grid gap-x-8 gap-y-14 wide:grid-cols-3">
          {latestInsightArticles(3, "ar").map((article, i) => (
            <InsightCard
              key={article.slug}
              article={article}
              categories={insightCategories}
              size="large"
              delay={i * 60}
              locale="ar"
            />
          ))}
        </div>
      </Band>

      {/* FAQ */}
      <Band>
        <SectionIntro
          eyebrow="الأسئلة الشائعة"
          title="أسئلة متكررة."
          sub="إجابات حول العمل مع شاريو، وكالة التسويق الرقمي في دبي، الإمارات."
        />
        <div className="mx-auto max-w-[880px]">
          <Faq
            items={homeFaqs.map((item) => ({ q: item.qAr, a: item.aAr }))}
            answerClassName="font-arabic"
            locale="ar"
          />
        </div>
      </Band>

      <CtaBand title="هل لديكم سؤال لم نجب عنه؟">
        <PillLink href={cta.href} tone="solid" size="lg">
          {cta.labelAr}
        </PillLink>
      </CtaBand>
    </>
  );
}
