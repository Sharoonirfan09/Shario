import type { Metadata } from "next";
import { IndustriesGrid } from "@/components/industries-grid";
import { SixServices } from "@/components/six-services";
import { Band, CardGrid, CtaBand, Hero, PillLink, SectionIntro } from "@/components/ui";
import { cta, heroImages, ogDefaultsRu } from "@/lib/site";

const descriptionRu =
  "SHARIO строит маркетинговые системы для десяти отраслей в Дубае — недвижимость, гостиничный бизнес, здравоохранение, e-commerce, технологии и другие — с собственным позиционированием, каналами и поведением покупателей для каждой.";

export const HERO_IMAGE = heroImages.industries.src;
export const HERO_IMAGE_ALT =
  "Вид сверху на команду за ноутбуками, планшетом и распечатанными отчётами с графиками на общем белом столе";

export const metadata: Metadata = {
  title: "Отрасли, с которыми мы работаем — агентство в Дубае",
  description: descriptionRu,
  alternates: {
    canonical: "/ru/industries",
    languages: {
      en: "/industries",
      ar: "/ar/industries",
      ru: "/ru/industries",
      "x-default": "/industries",
    },
  },
  openGraph: {
    ...ogDefaultsRu,
    url: "/ru/industries",
    type: "website",
    title: "SHARIO — отрасли, с которыми мы работаем",
    description: descriptionRu,
  },
};

const differentiators = [
  {
    title: "Команда во главе с основателем",
    desc: "Каждый проект строится на одном и том же уровне экспертизы, без цепочки аккаунт-менеджеров — со стратегией работает тот же человек, что общается с вами.",
  },
  {
    title: "Единая связанная система",
    desc: "Позиционирование, performance-маркетинг, SEO, сайт и CRM планируются вместе, поэтому кампания никогда не ведёт трафик на страницу или процесс, которые к нему не готовы.",
  },
  {
    title: "Понимание рынка Дубая",
    desc: "Поисковое поведение, плотность конкуренции и сезонность покупок здесь не укладываются в общий playbook — стратегия строится от того, что реально происходит на этом рынке.",
  },
  {
    title: "Измеряем по выручке",
    desc: "Каждый проект оценивается по реально повлиявшим сделкам, бронированиям или заявкам на обучение — а не по показам, охвату или формальному дашборду.",
  },
];

const process = [
  { step: "01", title: "Понять отрасль", desc: "Прежде чем выбрать каналы, мы разбираемся, как ваш покупатель реально изучает, сравнивает и принимает решение именно в вашей категории." },
  { step: "02", title: "Чёткое позиционирование", desc: "Сообщение и айдентика строятся вокруг того, что действительно отличает бизнес, а не заимствуются у конкурента." },
  { step: "03", title: "Построить систему", desc: "Сайт, видимость в поиске, платный трафик и CRM — выстроены под реальный цикл продаж или бронирования вашего бизнеса." },
  { step: "04", title: "Запустить и улучшать", desc: "Еженедельный разбор по показателю, который важен именно для вашей отрасли — лиды, бронирования, заявки или пайплайн, а не поверхностные метрики." },
];

export default function RussianIndustriesPage() {
  return (
    <>
      <h1 className="sr-only">Цифровой маркетинг и креативные решения для каждой отрасли</h1>
      <Hero
        src={HERO_IMAGE}
        alt={HERO_IMAGE_ALT}
        focus="object-[50%_45%]"
        eyebrow="Отрасли"
        title="Маркетинг, построенный вокруг вашей реальной отрасли."
        subhead="Software-компания, бутик-отель и застройщик продают совершенно разным покупателям на совершенно разных временных циклах. Мы строим стратегию, каналы и системы под это — а не общий маркетинговый пакет с вашим логотипом."
        priority
      >
        <PillLink href={cta.href} tone="solidLight" size="lg">
          {cta.labelRu}
        </PillLink>
      </Hero>

      <IndustriesGrid locale="ru" />

      <SixServices locale="ru" />

      <Band tone="carbon">
        <SectionIntro
          eyebrow="Почему SHARIO"
          title="Та же дисциплина, применённая к вашей отрасли."
          tone="carbon"
        />
        <CardGrid columns={4}>
          {differentiators.map((item, i) => (
            <div key={item.title} className="reveal border border-porcelain/15 p-8" data-delay={i * 60}>
              <p className="font-display text-[1.25rem] font-medium text-porcelain">{item.title}</p>
              <p className="mt-3.5 text-[0.9375rem] leading-[1.7] text-porcelain/70">{item.desc}</p>
            </div>
          ))}
        </CardGrid>
      </Band>

      <Band>
        <SectionIntro eyebrow="Как мы начинаем" title="От отрасли к системе — за четыре шага." />
        <CardGrid columns={4}>
          {process.map((item, i) => (
            <div key={item.step} className="reveal" data-delay={i * 60}>
              <span className="font-display text-[1.0625rem] text-carbon/40">{item.step}</span>
              <p className="mt-4 font-display text-[1.25rem] font-medium text-carbon">{item.title}</p>
              <p className="mt-3.5 text-[0.9375rem] leading-[1.7] text-carbon/72">{item.desc}</p>
            </div>
          ))}
        </CardGrid>
      </Band>

      <CtaBand
        title="Не нашли свою отрасль в списке? Скорее всего, мы всё равно её знаем."
        sub="Расскажите, чем вы занимаетесь и кому продаёте — мы честно скажем, подходит ли вам SHARIO."
        arabicAccent
      >
        <PillLink href={cta.href} tone="solid" size="lg">
          {cta.labelRu}
        </PillLink>
      </CtaBand>
    </>
  );
}
