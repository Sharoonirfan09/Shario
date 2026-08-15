import type { Metadata } from "next";
import { Faq } from "@/components/faq";
import { InsightCard } from "@/components/insights";
import { SixServices } from "@/components/six-services";
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
  ogDefaultsRu,
  sharedImages,
  site,
} from "@/lib/site";

export const metadata: Metadata = {
  // Written out in full rather than relying on `app/ru/layout.tsx`'s
  // `title.template`: a layout's template does not apply to a page in that
  // same route segment, and this page is the index of `app/ru` itself.
  title: "агентство цифрового маркетинга в Дубае — SHARIO",
  description: site.descriptionRu,
  alternates: {
    canonical: "/ru",
    languages: { en: "/", ar: "/ar", ru: "/ru", "x-default": "/" },
  },
  openGraph: {
    ...ogDefaultsRu,
    url: "/ru",
    type: "website",
    title: "SHARIO — агентство цифрового маркетинга в Дубае",
    description: site.descriptionRu,
  },
};

/** Same photograph and crop as the English homepage — `heroImages.home` in `lib/site.ts`. */
const HERO_IMAGE = heroImages.home.src;
const HERO_IMAGE_ALT = `${site.founderRu}, основатель SHARIO`;

/** Same four textures as the English homepage's "How We Work" cards — `lib/site.ts`'s `sharedImages.homeStepTextures`. */
const stepTextures = sharedImages.homeStepTextures;

export default function RussianHomePage() {
  return (
    <>
      <SplitHero
        src={HERO_IMAGE}
        alt={HERO_IMAGE_ALT}
        focus="object-[50%_28%]"
        locale="ru"
        title={
          <>
            <span className="block">Цифровой маркетинг,</span>
            <span className="block">который превращает</span>
            <span className="block">расходы в выручку</span>
          </>
        }
        subhead={<em className="italic">Симфония идентичности</em>}
        href="/ru/about"
        linkLabel="Внутри SHARIO"
      >
        <PillLink href={cta.href} tone="solid" size="lg">
          {cta.labelRu}
        </PillLink>
        <PillLink href="/ru/services" tone="outline" size="lg">
          Наши услуги
        </PillLink>
      </SplitHero>

      <SixServices locale="ru" />

      {/* About — image beside text */}
      <Band className="bg-limestone/30">
        <div className="grid items-center gap-12 wide:grid-cols-[1fr_1.05fr] wide:gap-20">
          <Frame
            src={sharedImages.homeAboutHorizon}
            ratio="aspect-[4/3]"
            alt={`${site.founderRu}, основатель SHARIO`}
          />
          <div>
            <p className="eyebrow flex items-center gap-3 text-carbon/55">
              <span aria-hidden="true" className="h-px w-6 bg-mist" />
              О SHARIO
            </p>
            <Heading scale="md" className="mt-5">
              Под личным руководством основателя с первого дня.
            </Heading>
            <p className="reveal mt-6 max-w-[560px] text-[1.0625rem] leading-[1.7] text-carbon/75">
              SHARIO работает по модели прямого участия основателя. Каждая
              стратегия выстраивается на уровне человека, который лично
              создавал и запускал комплексные маркетинговые системы для
              девелоперских проектов в Дубае.
            </p>
            <p
              className="reveal mt-4 max-w-[560px] text-[1.0625rem] leading-[1.7] text-carbon/75"
              data-delay="90"
            >
              Вы получаете экспертный уровень мышления в каждой кампании — от
              команды, которая остаётся с вашим проектом. Это значит прямой
              доступ к тому, кто выстраивает стратегию, а не к сменяющейся
              команде, которая просто передаёт её вам.
            </p>
            <div className="reveal mt-9" data-delay="160">
              <PillLink href="/ru/about">Узнать больше</PillLink>
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
            eyebrow="Чем мы отличаемся"
            title="Вот как мы работаем."
            sub="Четыре шага, которые выполняются каждую неделю, а не раз в квартал."
          />
          <CardGrid columns={4}>
            {howWeWork.map((step, i) => (
              <Card
                key={step.num}
                badge={step.num}
                title={step.titleRu}
                titleAs="h3"
                desc={step.descRu}
                image={stepTextures[i]}
                delay={i * 60}
                locale="ru"
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
              Из редакции
            </p>
            <Heading scale="md" className="mt-5">
              Идеи, которые стоят вашего времени.
            </Heading>
          </div>
          <PillLink href="/ru/insights">Все инсайты →</PillLink>
        </div>

        <div className="grid gap-x-8 gap-y-14 wide:grid-cols-3">
          {latestInsightArticles(3).map((article, i) => (
            <InsightCard
              key={article.slug}
              article={article}
              categories={insightCategories}
              size="large"
              delay={i * 60}
              locale="ru"
            />
          ))}
        </div>
      </Band>

      {/* FAQ */}
      <Band>
        <SectionIntro eyebrow="FAQ" title="Часто задаваемые вопросы." />
        <div className="mx-auto max-w-[880px]">
          <Faq
            items={homeFaqs.map((item) => ({ q: item.qRu, a: item.aRu }))}
            answerClassName="font-body"
            locale="ru"
          />
        </div>
      </Band>

      <CtaBand title="Остался вопрос, на который мы ещё не ответили?">
        <PillLink href={cta.href} tone="solid" size="lg">
          {cta.labelRu}
        </PillLink>
      </CtaBand>
    </>
  );
}
