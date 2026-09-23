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
  ogDefaultsRu,
  resources,
  sharedImages,
  site,
  testimonials,
  transparencyBlocks,
  trustStrip,
  workWall,
} from "@/lib/site";

const HOME_META_DESCRIPTION_RU =
  "Агентство цифрового маркетинга в Дубае под руководством основателя. Performance-маркетинг, SEO, сайты, CRM и брендинг — как единая система, измеряемая квалифицированными лидами, которые превращаются в реальную выручку.";

export const metadata: Metadata = {
  // Written out in full rather than relying on `app/ru/layout.tsx`'s
  // `title.template`: a layout's template does not apply to a page in that
  // same route segment, and this page is the index of `app/ru` itself.
  title: "Агентство цифрового маркетинга в Дубае | SHARIO",
  description: HOME_META_DESCRIPTION_RU,
  alternates: {
    canonical: "/ru",
    languages: { en: "/", ar: "/ar", ru: "/ru", "x-default": "/" },
  },
  openGraph: {
    ...ogDefaultsRu,
    url: "/ru",
    type: "website",
    title: "SHARIO — Агентство цифрового маркетинга в Дубае",
    description: HOME_META_DESCRIPTION_RU,
  },
};

/** Same photograph and crop as the English homepage — `heroImages.home` in `lib/site.ts`. */
const HERO_IMAGE = heroImages.home.src;
const HERO_IMAGE_ALT = `${site.founderRu}, основатель SHARIO, агентства цифрового маркетинга в Дубае`;

/** Same four textures as the English homepage's "How We Work" cards — `lib/site.ts`'s `sharedImages.homeStepTextures`. */
const stepTextures = sharedImages.homeStepTextures;

export default function RussianHomePage() {
  return (
    <>
      <FaqStructuredData items={homeFaqs.map((item) => ({ q: item.qRu, a: item.aRu }))} />
      <PersonStructuredData />

      <SplitHero
        src={HERO_IMAGE}
        alt={HERO_IMAGE_ALT}
        focus="object-[50%_28%]"
        locale="ru"
        title={
          <>
            <span className="block">Агентство цифрового</span>
            <span className="block">маркетинга в Дубае</span>
          </>
        }
        subhead={<em className="italic">Симфония идентичности</em>}
        lead={
          <>
            Агентство цифрового маркетинга в Дубае под руководством
            основателя, объединяющее платный трафик, SEO, сайты и CRM в
            единую систему под ответственностью одной команды. Под
            руководством{" "}
            <Link
              href="/ru/about"
              className="border-b border-carbon/40 pb-0.5 text-carbon/90 transition-colors duration-300 hover:border-carbon hover:text-carbon"
            >
              Шарун Ирфан Хан
            </Link>
            , с выручкой более {site.revenue}, атрибутированной лидам по
            клиентским аккаунтам.
          </>
        }
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

      {/* Trust strip */}
      <Band className="py-8 wide:py-10">
        <p className="eyebrow flex flex-wrap items-center justify-center gap-x-2.5 gap-y-2 text-center text-carbon/60">
          {trustStrip.map((item, i) => (
            <span key={i} className="flex items-center gap-2.5">
              {i > 0 && <span aria-hidden="true">·</span>}
              {item.textRu}
            </span>
          ))}
        </p>
      </Band>

      <SixServices locale="ru" />

      {/* Work wall */}
      <Band className="bg-limestone/30">
        <SectionIntro
          eyebrow="Избранные работы"
          title="Работы, которые можно проверить."
          sub="Более двадцати сайтов спроектированы, построены, выведены в топ и сопровождаются — в сферах недвижимости, e-commerce, гостеприимства, SaaS и B2B в Дубае. Реальный, действующий бизнес, который можно открыть в новой вкладке."
        />
        <CardGrid columns={3}>
          {workWall.map((item, i) => (
            <WorkTile
              key={item.domain}
              sector={item.sectorRu}
              brand={item.brand}
              line={item.lineRu}
              domain={item.domain}
              cover={item.cover}
              coverPriority={i === 0}
              tone={i % 2 === 0 ? "limestone" : "porcelain"}
              delay={i * 60}
              locale="ru"
            />
          ))}
        </CardGrid>
        <div className="mt-12 text-center wide:mt-16">
          <PillLink href="/ru/work">Смотреть все работы →</PillLink>
        </div>
      </Band>

      {/* Testimonials */}
      <Band className="bg-limestone/30">
        <SectionIntro eyebrow="Отзывы клиентов" title="Что говорят клиенты." />
        <CardGrid columns={2}>
          {testimonials.map((item, i) => (
            <TestimonialCard
              key={item.name}
              quote={item.quoteRu}
              name={item.name}
              role={item.roleRu}
              linkedin={item.linkedin}
              photo={item.photo}
              tone={i % 2 === 0 ? "limestone" : "porcelain"}
              delay={i * 60}
              locale="ru"
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
            alt="Портрет Шарун Ирфан Хан, основателя SHARIO"
          />
          <div>
            <p className="eyebrow flex items-center gap-3 text-carbon/55">
              <span aria-hidden="true" className="h-px w-6 bg-mist" />
              О SHARIO
            </p>
            <Heading scale="md" className="mt-5">
              Кто на самом деле выполняет работу.
            </Heading>
            <p className="reveal mt-6 max-w-[560px] text-[1.0625rem] leading-[1.7] text-carbon/75">
              SHARIO возглавляет Шарун Ирфан Хан — performance-маркетолог и
              бренд-стратег из Дубая, руководитель отдела маркетинга в{" "}
              <a
                href="https://msndevelopments.com"
                target="_blank"
                rel="noopener"
                className="border-b border-carbon/30 pb-0.5 text-carbon/90 transition-colors duration-300 hover:border-carbon hover:text-carbon"
              >
                MSN Developments
              </a>
              . Пять лет создания комплексных маркетинговых систем для
              девелоперской недвижимости и премиальных брендов — performance в
              Google и Meta, SEO, CRM и бренд — с выручкой более{" "}
              {site.revenue}, атрибутированной лидам, более чем 20 запущенными
              и оптимизированными сайтами и более чем 8 управляемыми
              брендовыми аккаунтами.
            </p>
            <p
              className="reveal mt-4 max-w-[560px] text-[1.0625rem] leading-[1.7] text-carbon/75"
              data-delay="90"
            >
              Вы получаете экспертный уровень мышления в каждой кампании — от
              человека, который лично создал и запустил эти системы: прямой
              доступ к тому, кто выстраивает стратегию, с первого звонка и
              до самой сдачи проекта.
            </p>
            <Heading as="h3" scale="sm" className="mt-9 text-[1.125rem]">
              Квалификация
            </Heading>
            <p
              className="reveal mt-3 max-w-[560px] text-[0.9375rem] leading-[1.7] text-carbon/70"
              data-delay="140"
            >
              Магистр политологии и государственного управления — Университет
              Пенджаба · Диплом о высшем образовании в области
              телепроизводства и визуальных коммуникаций · Бакалавр коммерции
              · Более 25 профессиональных сертификатов, включая Google Data
              Analytics Professional Certificate, рекламные сертификаты Meta и
              курс Introduction to Google SEO (UC Davis).
            </p>
            <p className="reveal mt-5 flex flex-wrap gap-x-6 gap-y-2 text-[0.9375rem]" data-delay="150">
              <a
                href="https://sharoon.ae"
                target="_blank"
                rel="me noopener"
                className="border-b border-carbon/30 pb-0.5 text-carbon/90 transition-colors duration-300 hover:border-carbon hover:text-carbon"
              >
                Профессиональный профиль Шарун Ирфан Хан →
              </a>
              <a
                href="https://linkedin.com/in/sharoonirfan"
                target="_blank"
                rel="me noopener"
                className="border-b border-carbon/30 pb-0.5 text-carbon/90 transition-colors duration-300 hover:border-carbon hover:text-carbon"
              >
                Подключиться в LinkedIn →
              </a>
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
            sub="Четыре шага, которые выполняются каждую неделю, а не раз в квартал — так работает SHARIO, агентство цифрового маркетинга и креатива в Дубае."
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

      {/* Industries — the full ten-sector grid, shared with `/ru/industries`
          via `IndustriesGrid`. */}
      <IndustriesGrid locale="ru" />

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
          {latestInsightArticles(3, "ru").map((article, i) => (
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
        <SectionIntro
          eyebrow="FAQ"
          title="Часто задаваемые вопросы."
          sub="Ответы о работе с SHARIO — агентством цифрового маркетинга в Дубае, ОАЭ."
        />
        <div className="mx-auto max-w-[880px]">
          <Faq
            items={homeFaqs.map((item) => ({ q: item.qRu, a: item.aRu }))}
            answerClassName="font-body"
            locale="ru"
          />
        </div>
      </Band>

      {/* Resources */}
      <Band className="bg-limestone/30">
        <SectionIntro eyebrow="Ресурсы" title="Заберите с собой что-то полезное." />
        <div className="grid gap-6 wide:grid-cols-2 wide:gap-8">
          {resources.map((resource) => (
            <a
              key={resource.href}
              href={resource.href}
              download
              className="reveal group flex flex-col border border-platinum/50 bg-porcelain p-8 transition-colors duration-500 hover:border-mist hover:bg-mist/[0.06] wide:p-10"
            >
              <h3 className="font-display text-[1.375rem] font-medium leading-[1.25] text-carbon">
                {resource.titleRu}
              </h3>
              <p className="mt-3.5 flex-1 text-[0.9375rem] leading-[1.75] text-carbon/72">
                {resource.descRu}
              </p>
              <span className="eyebrow mt-7 flex items-center gap-2 border-t border-carbon/12 pt-6 text-carbon">
                Скачать
                <span aria-hidden="true" className="text-carbon/50">
                  · {resource.fileSize}
                </span>
                <span
                  aria-hidden="true"
                  className="ml-auto transition-transform duration-500 group-hover:translate-x-1.5"
                >
                  →
                </span>
              </span>
            </a>
          ))}
        </div>
      </Band>

      {/* How we work together */}
      <Band>
        <SectionIntro eyebrow="Как мы работаем вместе" title="Перед тем как обратиться к нам." />
        <div className="mx-auto grid max-w-[820px] gap-10 wide:gap-12">
          {transparencyBlocks.map((block, i) => (
            <div key={block.title} className="reveal" data-delay={i * 60}>
              <Heading as="h3" scale="sm" className="text-[1.125rem]">
                {block.titleRu}
              </Heading>
              <p className="mt-3 text-[0.9375rem] leading-[1.75] text-carbon/72">
                {block.bodyRu}
              </p>
            </div>
          ))}
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
