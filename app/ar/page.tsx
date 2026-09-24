import type { Metadata } from "next";
import Link from "next/link";
import { Faq } from "@/components/faq";
import { IndustriesGrid } from "@/components/industries-grid";
import { InsightCard } from "@/components/insights";
import { SixServices } from "@/components/six-services";
import {
  FaqStructuredData,
  PersonStructuredData,
} from "@/components/structured-data";
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
  TestimonialCard,
  WorkTile,
} from "@/components/ui";
import {
  cta,
  heroImages,
  homeFaqs,
  howWeWork,
  insightCategories,
  latestInsightArticles,
  ogDefaultsAr,
  resources,
  sharedImages,
  site,
  testimonials,
  transparencyBlocks,
  trustStrip,
  workWall,
} from "@/lib/site";

const HOME_META_DESCRIPTION_AR =
  "وكالة تسويق رقمي في دبي بقيادة مؤسستها. تسويق الأداء، تحسين محركات البحث، المواقع الإلكترونية، إدارة علاقات العملاء والعلامة التجارية، مبنية كنظام واحد — ونقيسها بعدد العملاء المحتملين المؤهلين الذين يتحوّلون فعلياً إلى إيرادات.";

export const metadata: Metadata = {
  // Written out in full rather than relying on `app/ar/layout.tsx`'s
  // `title.template`: a layout's template does not apply to a page in that
  // same route segment, and this page is the index of `app/ar` itself.
  title: "وكالة تسويق رقمي في دبي | شاريو",
  description: HOME_META_DESCRIPTION_AR,
  alternates: {
    canonical: "/ar",
    languages: { en: "/", ar: "/ar", ru: "/ru", "x-default": "/" },
  },
  openGraph: {
    ...ogDefaultsAr,
    url: "/ar",
    type: "website",
    title: "شاريو — وكالة تسويق رقمي في دبي",
    description: HOME_META_DESCRIPTION_AR,
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
      <PersonStructuredData />

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
        lead={
          <>
            وكالة تسويق رقمي في دبي بقيادة مؤسستها، تدير الإعلانات المدفوعة
            وتحسين محركات البحث والمواقع الإلكترونية وإدارة علاقات العملاء
            كنظام واحد متكامل، تحت مسؤولية فريق واحد. بقيادة{" "}
            <Link
              href="/ar/about"
              className="border-b border-carbon/40 pb-0.5 text-carbon/90 transition-colors duration-300 hover:border-carbon hover:text-carbon"
            >
              شارون عرفان خان
            </Link>
            ، بإيرادات تتجاوز {site.revenue} منسوبة إلى العملاء المحتملين عبر
            حسابات العملاء.
          </>
        }
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

      {/* Trust strip */}
      <Band compact>
        <p className="eyebrow flex flex-wrap items-center justify-center gap-x-2.5 gap-y-2 text-center text-carbon/60 font-arabic">
          {trustStrip.map((item, i) => (
            <span key={i} className="flex items-center gap-2.5">
              {i > 0 && <span aria-hidden="true">·</span>}
              {item.textAr}
            </span>
          ))}
        </p>
      </Band>

      <SixServices locale="ar" />

      {/* Work wall */}
      <Band className="bg-limestone/30">
        <SectionIntro
          eyebrow="أعمال مختارة"
          title="أعمال يمكنكم النقر عليها."
          sub="أكثر من عشرين موقعاً إلكترونياً صُمم وبُني ورُتّب وأُدير — عبر قطاع العقارات والتجارة الإلكترونية والضيافة وSaaS وB2B في دبي. أعمال تجارية حقيقية وفعلية يمكنكم فتحها في تبويب جديد."
        />
        <CardGrid columns={3}>
          {workWall.map((item, i) => (
            <WorkTile
              key={item.domain}
              sector={item.sectorAr}
              brand={item.brand}
              line={item.lineAr}
              domain={item.domain}
              cover={item.cover}
              coverPriority={i === 0}
              tone={i % 2 === 0 ? "limestone" : "porcelain"}
              delay={i * 60}
              locale="ar"
            />
          ))}
        </CardGrid>
        <div className="mt-12 text-center wide:mt-16">
          <PillLink href="/ar/work">استعرضوا كامل الأعمال ←</PillLink>
        </div>
      </Band>

      {/* Testimonials */}
      <Band className="bg-limestone/30">
        <SectionIntro eyebrow="آراء العملاء" title="ماذا يقول عملاؤنا." />
        <CardGrid columns={2}>
          {testimonials.map((item, i) => (
            <TestimonialCard
              key={item.name}
              quote={item.quoteAr}
              name={item.name}
              role={item.roleAr}
              linkedin={item.linkedin}
              photo={item.photo}
              tone={i % 2 === 0 ? "limestone" : "porcelain"}
              delay={i * 60}
              locale="ar"
            />
          ))}
        </CardGrid>
      </Band>

      {/* About — image beside text */}
      <Band className="bg-limestone/30">
        <div className="grid items-center gap-12 wide:grid-cols-[1fr_1.05fr] wide:gap-20">
          <Frame
            src={sharedImages.founderPortrait}
            ratio="aspect-[4/5]"
            alt="صورة شخصية لشارون عرفان خان، مؤسسة شاريو"
          />
          <div>
            <p className="eyebrow flex items-center gap-3 text-carbon/55">
              <span aria-hidden="true" className="h-px w-6 bg-mist" />
              عن شاريو
            </p>
            <Heading scale="md" className="mt-5">
              من الذي يقوم بالعمل فعلاً.
            </Heading>
            <p className="reveal mt-6 max-w-[560px] text-[1.0625rem] leading-[1.7] text-carbon/75">
              تقود شاريو شارون عرفان خان، خبيرة تسويق أداء واستراتيجية علامات
              تجارية مقيمة في دبي، ومديرة التسويق لدى{" "}
              <a
                href="https://msndevelopments.com"
                target="_blank"
                rel="noopener"
                className="border-b border-carbon/30 pb-0.5 text-carbon/90 transition-colors duration-300 hover:border-carbon hover:text-carbon"
              >
                MSN Developments
              </a>
              . خمس سنوات من بناء أنظمة تسويقية متكاملة للعقارات التي يقودها
              المطورون والعلامات التجارية الفاخرة — أداء جوجل وميتا، تحسين
              محركات البحث، إدارة علاقات العملاء والعلامة التجارية — بإيرادات
              تتجاوز {site.revenue} منسوبة إلى العملاء المحتملين، وأكثر من 20
              موقعاً إلكترونياً أُطلق وحُسّن، وأكثر من 8 حسابات علامات تجارية
              تُدار.
            </p>
            <p
              className="reveal mt-4 max-w-[560px] text-[1.0625rem] leading-[1.7] text-carbon/75"
              data-delay="90"
            >
              تحصلون على تفكير على مستوى أول في كل حملة، من شخص بنى وأطلق هذه
              الأنظمة بنفسه — وصول مباشر إلى صانعة الاستراتيجية نفسها، من
              أول مكالمة وحتى التسليم.
            </p>
            <Heading as="h3" scale="sm" className="mt-9 text-[1.125rem]">
              المؤهلات
            </Heading>
            <p
              className="reveal mt-3 max-w-[560px] text-[0.9375rem] leading-[1.7] text-carbon/70"
              data-delay="140"
            >
              ماجستير في العلوم السياسية والحكم — جامعة البنجاب · دبلوم عالٍ
              في الإنتاج التلفزيوني والتواصل البصري · بكالوريوس في التجارة ·
              أكثر من 25 شهادة مهنية، بما في ذلك شهادة Google المهنية في
              تحليل البيانات، وشهادات ميتا الإعلانية، ومقدمة في تحسين محركات
              البحث من جوجل (جامعة كاليفورنيا ديفيس).
            </p>
            <p className="reveal mt-5 flex flex-wrap gap-x-6 gap-y-2 text-[0.9375rem]" data-delay="150">
              <a
                href="https://sharoon.ae"
                target="_blank"
                rel="me noopener"
                className="border-b border-carbon/30 pb-0.5 text-carbon/90 transition-colors duration-300 hover:border-carbon hover:text-carbon"
              >
                الملف المهني لشارون عرفان خان ←
              </a>
              <a
                href="https://linkedin.com/in/sharoonirfan"
                target="_blank"
                rel="me noopener"
                className="border-b border-carbon/30 pb-0.5 text-carbon/90 transition-colors duration-300 hover:border-carbon hover:text-carbon"
              >
                تواصلوا عبر لينكدإن ←
              </a>
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

      {/* Industries — the full ten-sector grid, shared with `/ar/industries`
          via `IndustriesGrid`. */}
      <IndustriesGrid locale="ar" />

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

      {/* Resources */}
      <Band className="bg-limestone/30">
        <SectionIntro eyebrow="الموارد" title="خذوا معكم شيئاً مفيداً." />
        <div className="grid gap-6 wide:grid-cols-2 wide:gap-8">
          {resources.map((resource) => (
            <a
              key={resource.href}
              href={resource.href}
              download
              className="reveal group flex flex-col border border-platinum/50 bg-porcelain p-8 transition-colors duration-500 hover:border-mist hover:bg-mist/[0.06] wide:p-10"
            >
              <h3 className="font-arabic text-[1.375rem] font-bold leading-[1.25] text-carbon">
                {resource.titleAr}
              </h3>
              <p className="mt-3.5 flex-1 text-[0.9375rem] leading-[1.75] text-carbon/72 font-arabic">
                {resource.descAr}
              </p>
              <span className="mt-7 flex items-center gap-2 border-t border-carbon/12 pt-6 text-carbon font-arabic text-[0.75rem]">
                تحميل
                <span aria-hidden="true" className="text-carbon/50">
                  · {resource.fileSize}
                </span>
                <span
                  aria-hidden="true"
                  className="mr-auto transition-transform duration-500 group-hover:-translate-x-1.5"
                >
                  ←
                </span>
              </span>
            </a>
          ))}
        </div>
      </Band>

      {/* How we work together */}
      <Band>
        <SectionIntro eyebrow="كيف نعمل معاً" title="قبل أن تتواصلوا معنا." />
        <div className="mx-auto grid max-w-[820px] gap-10 wide:gap-12">
          {transparencyBlocks.map((block, i) => (
            <div key={block.title} className="reveal" data-delay={i * 60}>
              <Heading as="h3" scale="sm" className="text-[1.125rem]">
                {block.titleAr}
              </Heading>
              <p className="mt-3 text-[0.9375rem] leading-[1.75] text-carbon/72">
                {block.bodyAr}
              </p>
            </div>
          ))}
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
