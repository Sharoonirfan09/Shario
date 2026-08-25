import type { Metadata } from "next";
import Link from "next/link";
import {
  Band,
  Card,
  CardGrid,
  CtaBand,
  Frame,
  Heading,
  Hero,
  PillLink,
} from "@/components/ui";
import { aboutApproach, cta, heroImages, ogDefaultsRu, services, sharedImages, site } from "@/lib/site";

const descriptionRu =
  "SHARIO — агентство цифрового маркетинга и креативная студия в Дубае, объединяющая performance-маркетинг, SEO, бренд, а также стратегию и консалтинг в единую систему для амбициозных компаний.";

const HERO_IMAGE = heroImages.about.src;
const HERO_IMAGE_ALT = "Оформленные в рамы гравюры и предметы на тёплой, минималистичной стене";

export const metadata: Metadata = {
  title: "О нас",
  description: descriptionRu,
  alternates: {
    canonical: "/ru/about",
    languages: { en: "/about", ar: "/ar/about", ru: "/ru/about", "x-default": "/about" },
  },
  openGraph: {
    ...ogDefaultsRu,
    url: "/ru/about",
    type: "website",
    title: "О нас — SHARIO",
    description: descriptionRu,
  },
};

export default function RussianAboutPage() {
  return (
    <>
      <h1 className="sr-only">
        О нас — SHARIO, агентство цифрового маркетинга и креативная студия в Дубае
      </h1>
      <Hero
        src={HERO_IMAGE}
        alt={HERO_IMAGE_ALT}
        focus="object-[50%_50%]"
        eyebrow="О нас"
        priority
      />

      {/* About SHARIO */}
      <Band>
        <div className="mx-auto max-w-[760px] text-center">
          <p className="eyebrow flex items-center justify-center gap-3 text-carbon/55">
            <span aria-hidden="true" className="h-px w-6 bg-mist" />
            О SHARIO
          </p>
          <Heading as="h2" scale="lg" className="mt-5">
            SHARIO
          </Heading>
          <p className="reveal mt-5 font-display text-[1.25rem] italic text-carbon/80 wide:text-[1.4375rem]">
            Digital-маркетинг и креативная студия, построенная на ясности, эффективности и
            идентичности.
          </p>
          <p
            className="reveal mt-8 text-[1.0625rem] leading-[1.75] text-carbon/75"
            data-delay="80"
          >
            SHARIO объединяет стратегию, performance-маркетинг, SEO, контент, сайты, CRM,
            автоматизацию, брендинг и креатив в единый комплексный подход.
          </p>
          <p
            className="reveal mt-5 text-[1.0625rem] leading-[1.75] text-carbon/75"
            data-delay="160"
          >
            Мы убеждены, что хороший маркетинг должен делать больше, чем просто привлекать
            внимание. Он должен создавать ясность, выстраивать релевантность и двигать бизнес
            вперёд.
          </p>
        </div>
      </Band>

      {/* Philosophy, Mission, Vision */}
      <Band className="relative overflow-hidden bg-limestone/30">
        <span
          aria-hidden="true"
          className="wordmark-ar pointer-events-none absolute left-1/2 top-1/2 z-0 w-[70%] -translate-x-1/2 -translate-y-1/2 text-carbon/[0.035] wide:w-[42%]"
        />
        <div className="relative z-10 grid gap-14 wide:grid-cols-3 wide:gap-16">
          <div className="reveal ledger">
            <p className="ledger-figure">01</p>
            <p className="label-sm mt-5 text-carbon/50">Философия</p>
            <h2 className="mt-4 font-display text-[1.4375rem] font-normal leading-[1.3] text-carbon">
              Маркетинг должен приводить в движение.
            </h2>
            <p className="mt-4 text-[0.9375rem] leading-[1.75] text-carbon/70">
              SHARIO соединяет креативное мышление с измеримой эффективностью — бренд, digital и
              рост как единая система, а не три разрозненные услуги, работающие параллельно.
            </p>
          </div>
          <div className="reveal ledger" data-delay="80">
            <p className="ledger-figure">02</p>
            <p className="label-sm mt-5 text-carbon/50">Миссия</p>
            <h2 className="mt-4 font-display text-[1.4375rem] font-normal leading-[1.3] text-carbon">
              Делать современный маркетинг яснее, слаженнее и эффективнее.
            </h2>
            <p className="mt-4 text-[0.9375rem] leading-[1.75] text-carbon/70">
              Мы выстраиваем продуманные маркетинговые системы, в которых стратегия, креатив,
              digital-реализация и эффективность работают вместе, а не приходят с разных сторон.
            </p>
          </div>
          <div className="reveal ledger" data-delay="160">
            <p className="ledger-figure">03</p>
            <p className="label-sm mt-5 text-carbon/50">Видение</p>
            <h2 className="mt-4 font-display text-[1.4375rem] font-normal leading-[1.3] text-carbon">
              Создать более интеллектуальный стандарт того, как амбициозные компании подходят к
              маркетингу.
            </h2>
            <p className="mt-4 text-[0.9375rem] leading-[1.75] text-carbon/70">
              Больше, чем разрозненные кампании, — маркетинговые экосистемы, где идентичность,
              технологии, контент и эффективность изначально выстроены для совместной работы.
            </p>
          </div>
        </div>
      </Band>

      {/* How We Work */}
      <Band>
        <div className="mb-12 max-w-[820px] wide:mb-16">
          <p className="eyebrow flex items-center gap-3 text-carbon/55">
            <span aria-hidden="true" className="h-px w-6 bg-mist" />
            Как мы работаем
          </p>
          <Heading as="h2" scale="md" className="mt-5">
            Понимание. Создание. Измерение. Совершенствование.
          </Heading>
        </div>
        <CardGrid columns={4}>
          {aboutApproach.map((step, i) => (
            <Card
              key={step.num}
              badge={step.num}
              title={step.titleRu}
              titleAs="h3"
              desc={step.descRu}
              delay={i * 60}
              locale="ru"
            />
          ))}
        </CardGrid>
      </Band>

      {/* What We Do */}
      <Band className="bg-limestone/30">
        <div className="mb-10 max-w-[820px] wide:mb-14">
          <p className="eyebrow flex items-center gap-3 text-carbon/55">
            <span aria-hidden="true" className="h-px w-6 bg-mist" />
            Что мы делаем
          </p>
          <Heading as="h2" scale="md" className="mt-5">
            Одна команда — на каждом участке системы.
          </Heading>
        </div>
        <div className="grid gap-x-10 wide:grid-cols-2">
          {services.map((service, i) => (
            <Link
              key={service.slug}
              href={`/ru/services/${service.slug}`}
              className="group reveal flex items-center justify-between gap-6 border-t border-carbon/15 py-5 transition-colors duration-300 hover:border-carbon/40"
              data-delay={i * 50}
            >
              <span className="font-display text-[1.25rem] font-normal text-carbon transition-colors duration-300 group-hover:text-carbon/70 wide:text-[1.375rem]">
                {service.nameRu}
              </span>
              <span
                aria-hidden="true"
                className="text-carbon/40 transition-all duration-300 group-hover:translate-x-1 group-hover:text-carbon"
              >
                →
              </span>
            </Link>
          ))}
        </div>
      </Band>

      {/* The Founder */}
      <Band>
        <div className="grid items-center gap-12 wide:grid-cols-[1fr_1.05fr] wide:gap-20">
          <Frame
            src={sharedImages.founderPortrait}
            ratio="aspect-[4/5]"
            alt="Женщина в элегантном белом пиджаке стоит рядом с лошадью в конюшне, вид со спины"
          />
          <div>
            <p className="eyebrow flex items-center gap-3 text-carbon/55">
              <span aria-hidden="true" className="h-px w-6 bg-mist" />
              Основатель
            </p>
            <Heading as="h2" scale="md" className="mt-5">
              {site.founderRu}
            </Heading>
            <p className="reveal mt-6 max-w-[560px] text-[1.0625rem] leading-[1.7] text-carbon/75">
              Специалист по performance-маркетингу и стратег цифрового роста, сосредоточенный на
              создании брендов, которые понятны, актуальны и выстроены для роста.
            </p>
            <p
              className="reveal mt-4 max-w-[560px] text-[1.0625rem] leading-[1.7] text-carbon/75"
              data-delay="80"
            >
              До основания SHARIO Шарун работала в сферах недвижимости, гостиничного бизнеса и B2B
              в Дубае, руководя маркетинговыми, digital-стратегическими и ростовыми инициативами
              для амбициозных компаний и брендов.
            </p>
            <p
              className="reveal mt-4 max-w-[560px] text-[1.0625rem] leading-[1.7] text-carbon/75"
              data-delay="160"
            >
              Этот опыт сформировал SHARIO вокруг простого убеждения: хороший маркетинг — это не
              только заметность. Это понимание того, что сказать, где сказать и почему это важно.
            </p>
            <p
              className="reveal mt-4 max-w-[560px] text-[1.0625rem] leading-[1.7] text-carbon/75"
              data-delay="240"
            >
              Сегодня это мышление лежит в основе SHARIO — объединяя стратегию, идентичность,
              digital и рост под одним чётким направлением.
            </p>
            <div
              className="reveal mt-9 flex flex-wrap items-center gap-6"
              data-delay="320"
            >
              <div>
                <p className="font-display text-xl">{site.founderRu}</p>
                <p className="mt-1 text-[0.8125rem] text-carbon/60">
                  {site.founderRoleRu}
                </p>
              </div>
              <a
                href={site.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="eyebrow border-b border-carbon/30 pb-1 text-carbon/70 transition-colors duration-300 hover:border-carbon hover:text-carbon"
              >
                LinkedIn →
              </a>
              <a
                href={site.founderUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="eyebrow border-b border-carbon/30 pb-1 text-carbon/70 transition-colors duration-300 hover:border-carbon hover:text-carbon"
              >
                Личный сайт →
              </a>
            </div>
          </div>
        </div>
      </Band>

      <CtaBand
        title="Хороший маркетинг начинается с ясности."
        sub="Если вы чувствуете, что у вашего маркетинга есть больший потенциал, давайте найдём, в чём он заключается."
      >
        <PillLink href={cta.href} tone="solid" size="lg">
          {cta.labelRu}
        </PillLink>
      </CtaBand>
    </>
  );
}
