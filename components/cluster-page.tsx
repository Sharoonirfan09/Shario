import type { Metadata } from "next";
import Link from "next/link";
import { Faq } from "@/components/faq";
import {
  BreadcrumbStructuredData,
  FaqStructuredData,
  IndustryStructuredData,
} from "@/components/structured-data";
import {
  Band,
  Breadcrumb,
  Card,
  CardGrid,
  CtaBand,
  DotList,
  Hero,
  PillLink,
  SectionIntro,
  TypeHero,
} from "@/components/ui";
import type { Locale } from "@/lib/locale";
import {
  agentsPageContent,
  audienceLinks,
  clusterCtaHref,
  getServicePage,
  hubPageContent,
  serviceCardGrid,
  servicePageContent,
  type ClusterCard,
  type ClusterList,
  type ServicePage,
} from "@/lib/real-estate-cluster";
import { site, type Industry } from "@/lib/site";

/* -------------------------------------------------------------------------- */
/* Shared, locale-aware chrome                                                 */
/* -------------------------------------------------------------------------- */

const prefixFor = (locale: Locale) => (locale === "en" ? "" : `/${locale}`);

type UiCopy = {
  home: string;
  services: string;
  industries: string;
  ctaSub: string;
  relatedEyebrow: string;
  relatedTitle: string;
  explore: string;
  faqEyebrow: string;
  faqTitle: string;
  experienceEyebrow: string;
  caseStudiesEyebrow: string;
  whatsIncludedEyebrow: string;
  forCompaniesEyebrow: string;
  forAgentsEyebrow: string;
  channelsEyebrow: string;
  pipelineEyebrow: string;
  servicesGridAction: string;
};

const UI: Record<Locale, UiCopy> = {
  en: {
    home: "Home",
    services: "Services",
    industries: "Industries",
    ctaSub: "Book a free call and we will come back with a clear, no-obligation plan.",
    relatedEyebrow: "Keep Going",
    relatedTitle: "Related services.",
    explore: "Explore",
    faqEyebrow: "FAQ",
    faqTitle: "Questions, answered.",
    experienceEyebrow: "Experience",
    caseStudiesEyebrow: "Case Studies",
    whatsIncludedEyebrow: "What's Included",
    forCompaniesEyebrow: "For Developers & Brokerages",
    forAgentsEyebrow: "For Agents",
    channelsEyebrow: "The Channels",
    pipelineEyebrow: "The Approach",
    servicesGridAction: "Explore",
  },
  ar: {
    home: "الرئيسية",
    services: "الخدمات",
    industries: "القطاعات",
    ctaSub: "احجزوا مكالمة مجانية وسنعود إليكم بخطة واضحة وبلا التزام.",
    relatedEyebrow: "تابعوا",
    relatedTitle: "خدمات ذات صلة.",
    explore: "استكشفوا",
    faqEyebrow: "الأسئلة الشائعة",
    faqTitle: "أسئلة، مُجابة.",
    experienceEyebrow: "الخبرة",
    caseStudiesEyebrow: "دراسات حالة",
    whatsIncludedEyebrow: "ما الذي يشمله",
    forCompaniesEyebrow: "للمطورين والوسطاء",
    forAgentsEyebrow: "للوكلاء",
    channelsEyebrow: "القنوات",
    pipelineEyebrow: "منهجية العمل",
    servicesGridAction: "استكشفوا",
  },
  ru: {
    home: "Главная",
    services: "Услуги",
    industries: "Отрасли",
    ctaSub: "Запишитесь на бесплатный звонок — вернёмся с понятным планом без обязательств.",
    relatedEyebrow: "Дальше",
    relatedTitle: "Смежные услуги.",
    explore: "Подробнее",
    faqEyebrow: "Вопросы",
    faqTitle: "Ответы на вопросы.",
    experienceEyebrow: "Опыт",
    caseStudiesEyebrow: "Кейсы",
    whatsIncludedEyebrow: "Что входит",
    forCompaniesEyebrow: "Для застройщиков и агентств",
    forAgentsEyebrow: "Для агентов",
    channelsEyebrow: "Каналы",
    pipelineEyebrow: "Подход",
    servicesGridAction: "Подробнее",
  },
};

/** Short, keyword-free descriptors for the "Related services" cards — kept
 *  out of the content schema so a sibling link never carries another page's
 *  primary keyword as its anchor (PART 3 — anti-cannibalisation). */
const RELATED_BLURB: Record<string, Record<Locale, string>> = {
  "real-estate-seo-dubai": {
    en: "Rank projects, area guides and listings for the searches buyers make before they call.",
    ar: "ترتيب المشاريع وأدلة المناطق والعروض في عمليات البحث التي يجريها المشترون قبل الاتصال.",
    ru: "Ранжирование проектов, гайдов по районам и объявлений по запросам покупателей до звонка.",
  },
  "real-estate-ppc-dubai": {
    en: "Google and Meta campaigns paced to your launch calendar and measured on qualified leads.",
    ar: "حملات جوجل وميتا موقّتة وفق جدول إطلاقك ومقاسة على العملاء المؤهلين.",
    ru: "Кампании в Google и Meta по календарю запуска, измеряемые по квалифицированным лидам.",
  },
  "real-estate-content-marketing-dubai": {
    en: "Area guides and market insight that build authority and pull organic traffic.",
    ar: "أدلة المناطق ورؤى السوق التي تبني الثقة وتجذب الزيارات العضوية.",
    ru: "Гайды по районам и аналитика рынка, которые строят авторитет и приводят органический трафик.",
  },
  "real-estate-social-media-marketing-dubai": {
    en: "Reels, listing tours and brand storytelling on Instagram and TikTok.",
    ar: "مقاطع ريلز وجولات العروض وسرد العلامة على إنستغرام وتيك توك.",
    ru: "Reels, туры по объектам и бренд-контент в Instagram и TikTok.",
  },
  "real-estate-email-marketing-dubai": {
    en: "CRM-driven nurture that keeps a six-week decision warm to the viewing.",
    ar: "رعاية مبنية على CRM تُبقي قرار الستة أسابيع دافئاً حتى المعاينة.",
    ru: "Прогрев на базе CRM, удерживающий шестинедельное решение до показа.",
  },
  "real-estate-web-development-dubai": {
    en: "Fast, mobile-first project and listing sites with forms that qualify buyers.",
    ar: "مواقع مشاريع وعروض سريعة للهاتف أولاً بنماذج تؤهّل المشترين.",
    ru: "Быстрые мобильные сайты проектов и объектов с формами, квалифицирующими покупателей.",
  },
};

/* -------------------------------------------------------------------------- */
/* Small building blocks                                                       */
/* -------------------------------------------------------------------------- */

/** SectionIntro + optional lead line + a one-column dot list. */
function ListBand({
  eyebrow,
  list,
  locale,
  className = "",
}: {
  eyebrow: string;
  list: ClusterList;
  locale: Locale;
  className?: string;
}) {
  return (
    <Band className={className}>
      <SectionIntro eyebrow={eyebrow} title={list.heading} align="left" scale="sm" />
      {list.lead && (
        <p
          className={`lede reveal mb-10 max-w-[760px] text-carbon/80 ${locale === "ar" ? "font-arabic" : ""}`}
        >
          {list.lead}
        </p>
      )}
      <DotList items={list.items} columns={list.items.length > 4 ? 2 : 1} />
    </Band>
  );
}

/** A grid of unlinked cards — "channels" and "case studies". */
function CardBand({
  eyebrow,
  title,
  items,
  locale,
  className = "",
}: {
  eyebrow: string;
  title: string;
  items: ClusterCard[];
  locale: Locale;
  className?: string;
}) {
  return (
    <Band className={className}>
      <SectionIntro eyebrow={eyebrow} title={title} align="left" scale="sm" />
      <CardGrid columns={3}>
        {items.map((item, i) => (
          <Card
            key={item.title}
            badge={String(i + 1).padStart(2, "0")}
            title={item.title}
            titleAs="h3"
            desc={item.desc}
            delay={i * 60}
            locale={locale}
          />
        ))}
      </CardGrid>
    </Band>
  );
}

/** The E-E-A-T "Why work with a specialist" band. */
function ExpertiseBand({
  eyebrow,
  heading,
  body,
  locale,
  className = "bg-limestone/30",
}: {
  eyebrow: string;
  heading: string;
  body: string[];
  locale: Locale;
  className?: string;
}) {
  return (
    <Band className={className}>
      <SectionIntro eyebrow={eyebrow} title={heading} align="left" scale="sm" />
      <div className="max-w-[760px]">
        {body.map((para, i) => (
          <p
            key={i}
            className={`reveal mb-6 text-[1.0625rem] leading-[1.75] text-carbon/75 last:mb-0 ${locale === "ar" ? "font-arabic" : ""}`}
          >
            {para}
          </p>
        ))}
      </div>
    </Band>
  );
}

/** The six-card "Real Estate & Property marketing services" grid — the
 *  pillar→cluster link, shared by the Agents page (the hub renders its own
 *  copy of this from `Industry.services`). */
function ServiceCardGridBand({
  locale,
  className = "bg-limestone/30",
}: {
  locale: Locale;
  className?: string;
}) {
  const prefix = prefixFor(locale);
  const grid = serviceCardGrid[locale];

  return (
    <Band className={className}>
      <SectionIntro eyebrow={grid.eyebrow} title={grid.title} scale="sm" />
      <CardGrid columns={3}>
        {grid.cards.map((cardItem, i) => (
          <Card
            key={cardItem.slug}
            href={`${prefix}/services/${cardItem.slug}`}
            badge={String(i + 1).padStart(2, "0")}
            title={cardItem.title}
            titleAs="h3"
            desc={cardItem.desc}
            action={UI[locale].servicesGridAction}
            delay={i * 60}
            locale={locale}
          />
        ))}
      </CardGrid>
    </Band>
  );
}

/** "Who this is for" — the two audience cards every sub-service page links up
 *  to (the hub and the Agents page). */
function AudienceBand({ locale }: { locale: Locale }) {
  const prefix = prefixFor(locale);
  const a = audienceLinks[locale];

  return (
    <Band>
      <SectionIntro eyebrow={a.heading} title={a.title} scale="sm" />
      <CardGrid columns={2}>
        {[a.companies, a.agents].map((entry, i) => (
          <Card
            key={entry.href}
            href={`${prefix}${entry.href}`}
            badge={String(i + 1).padStart(2, "0")}
            title={entry.anchor}
            titleAs="h3"
            desc={entry.desc}
            action={UI[locale].explore}
            delay={i * 60}
            locale={locale}
          />
        ))}
      </CardGrid>
    </Band>
  );
}

/** "Related services" — 2–3 sibling sub-service pages. */
function RelatedBand({ slugs, locale }: { slugs: string[]; locale: Locale }) {
  const prefix = prefixFor(locale);
  const ui = UI[locale];

  return (
    <Band className="relative overflow-hidden">
      <span
        aria-hidden="true"
        className={`wordmark-ar pointer-events-none absolute -top-4 z-0 w-16 text-carbon/[0.06] wide:w-20 ${locale === "ar" ? "left-4 wide:left-8" : "right-4 wide:right-8"}`}
      />
      <SectionIntro eyebrow={ui.relatedEyebrow} title={ui.relatedTitle} align="left" scale="sm" />
      <CardGrid columns={3}>
        {slugs.map((slug, i) => {
          const sib = getServicePage(slug);
          if (!sib) return null;
          return (
            <Card
              key={slug}
              href={`${prefix}/services/${slug}`}
              badge={String(i + 1).padStart(2, "0")}
              title={servicePageContent(sib, locale).label}
              titleAs="h3"
              desc={RELATED_BLURB[slug]?.[locale] ?? ""}
              action={ui.explore}
              delay={i * 60}
              locale={locale}
            />
          );
        })}
      </CardGrid>
    </Band>
  );
}

function ClosingCta({
  title,
  label,
  locale,
}: {
  title: string;
  label: string;
  locale: Locale;
}) {
  const prefix = prefixFor(locale);
  return (
    <CtaBand title={title} sub={UI[locale].ctaSub}>
      <PillLink href={`${prefix}${clusterCtaHref}`} tone="solid" size="lg">
        {label}
      </PillLink>
    </CtaBand>
  );
}

/* -------------------------------------------------------------------------- */
/* Page 1: Real Estate (Companies / Hub) — /industries/real-estate             */
/* -------------------------------------------------------------------------- */

export function ClusterHubPageBody({
  industry,
  locale,
}: {
  industry: Industry;
  locale: Locale;
}) {
  const c = hubPageContent(locale);
  const ui = UI[locale];
  const prefix = prefixFor(locale);
  const isAr = locale === "ar";
  const name = isAr ? industry.nameAr : locale === "ru" ? industry.nameRu : industry.name;

  const crumbs = [
    { href: prefix || "/", label: ui.home },
    { href: `${prefix}/industries`, label: ui.industries },
    { label: name },
  ];

  const para = `reveal mb-6 text-[1.0625rem] leading-[1.75] text-carbon/75 last:mb-0 ${isAr ? "font-arabic" : ""}`;

  return (
    <>
      <BreadcrumbStructuredData items={crumbs} />
      <FaqStructuredData items={c.faqs} />
      <IndustryStructuredData industry={industry} locale={locale} />

      <Hero
        src={industry.heroImage}
        alt={`${c.h1} — ${site.name}`}
        eyebrow={ui.industries}
        title={c.h1}
        priority
        breadcrumb={<Breadcrumb items={crumbs} locale={locale} />}
      >
        <div className="flex flex-col gap-3">
          <PillLink href={`${prefix}${clusterCtaHref}`} tone="solidLight" size="lg">
            {c.ctaLabel}
          </PillLink>
          <p className={`max-w-[440px] text-[0.8125rem] leading-[1.6] text-porcelain/70 ${isAr ? "font-arabic" : ""}`}>
            {c.ctaSub}
          </p>
        </div>
      </Hero>

      <Band>
        <SectionIntro
          eyebrow={locale === "ar" ? "القطاع" : locale === "ru" ? "Отрасль" : "The Industry"}
          title={c.movesUnits.heading}
          align="left"
          scale="sm"
        />
        <div className="max-w-[760px]">
          <p className={`lede reveal mb-10 text-carbon/80 ${isAr ? "font-arabic" : ""}`}>{c.heroLede}</p>
          <p className={para}>{c.movesUnits.body}</p>
        </div>
      </Band>

      <ListBand
        eyebrow={ui.whatsIncludedEyebrow}
        list={c.whatsIncluded}
        locale={locale}
        className="bg-limestone/30"
      />

      <Band>
        <SectionIntro
          eyebrow={locale === "ar" ? "لمن هذه الصفحة" : locale === "ru" ? "Для кого" : "Who It's For"}
          title={c.builtFor.heading}
          align="left"
          scale="sm"
        />
        <div className="max-w-[760px]">
          <p className={para}>{c.builtFor.body}</p>
          <p className={`reveal text-[0.9375rem] text-carbon/60 ${isAr ? "font-arabic" : ""}`}>
            {c.builtFor.agentsLinkPrefix}
            <Link
              href={`${prefix}/industries/real-estate-agents`}
              className="border-b border-carbon/30 pb-0.5 text-carbon/80 transition-colors duration-300 hover:border-carbon hover:text-carbon"
            >
              {c.builtFor.agentsAnchor}
            </Link>
            {c.builtFor.agentsLinkSuffix}
          </p>
        </div>
      </Band>

      <Band className="bg-limestone/30">
        <SectionIntro
          eyebrow={locale === "ar" ? "من نعمل معهم" : locale === "ru" ? "С кем мы работаем" : "Who We Work With"}
          title={c.whoWeWorkWith.heading}
          align="left"
          scale="sm"
        />
        <DotList items={c.whoWeWorkWith.items} columns={2} />
      </Band>

      <ServiceCardGridBand locale={locale} className="" />

      <CardBand
        eyebrow={ui.caseStudiesEyebrow}
        title={c.caseStudies.heading}
        items={c.caseStudies.items}
        locale={locale}
        className="bg-limestone/30"
      />

      <ExpertiseBand
        eyebrow={ui.experienceEyebrow}
        heading={c.expertise.heading}
        body={c.expertise.body}
        locale={locale}
        className=""
      />

      <Band className="bg-limestone/30">
        <SectionIntro eyebrow={ui.faqEyebrow} title={ui.faqTitle} />
        <div className="mx-auto max-w-[880px]">
          <Faq
            items={c.faqs}
            answerClassName={isAr ? "font-arabic" : "font-body"}
            locale={locale}
          />
        </div>
      </Band>

      <ClosingCta title={c.closingTitle} label={c.ctaLabel} locale={locale} />
    </>
  );
}

/* -------------------------------------------------------------------------- */
/* Page: one sub-service (SEO / PPC / Content / Social / Email / Web)          */
/* -------------------------------------------------------------------------- */

export function ClusterServicePageBody({
  page,
  locale,
}: {
  page: ServicePage;
  locale: Locale;
}) {
  const c = servicePageContent(page, locale);
  const ui = UI[locale];
  const prefix = prefixFor(locale);
  const isAr = locale === "ar";

  const crumbs = [
    { href: prefix || "/", label: ui.home },
    { href: `${prefix}/services`, label: ui.services },
    { label: c.label },
  ];

  return (
    <>
      <BreadcrumbStructuredData items={crumbs} />
      <FaqStructuredData items={c.faqs} />

      <TypeHero
        tone="carbon"
        eyebrow={isAr ? "تسويق العقارات" : locale === "ru" ? "Маркетинг недвижимости" : "Real Estate Marketing"}
        title={c.h1}
        subhead={c.heroLede}
        breadcrumb={<Breadcrumb items={crumbs} locale={locale} />}
      >
        <div className="flex flex-col gap-3">
          <PillLink href={`${prefix}${clusterCtaHref}`} tone="solidLight" size="lg">
            {c.ctaLabel}
          </PillLink>
          <p className={`max-w-[440px] text-[0.8125rem] leading-[1.6] text-porcelain/70 ${isAr ? "font-arabic" : ""}`}>
            {c.ctaSub}
          </p>
        </div>
      </TypeHero>

      <ListBand eyebrow={ui.whatsIncludedEyebrow} list={c.whatsIncluded} locale={locale} />
      <ListBand
        eyebrow={ui.forCompaniesEyebrow}
        list={c.forCompanies}
        locale={locale}
        className="bg-limestone/30"
      />
      <ListBand eyebrow={ui.forAgentsEyebrow} list={c.forAgents} locale={locale} />

      <CardBand
        eyebrow={ui.caseStudiesEyebrow}
        title={c.caseStudies.heading}
        items={c.caseStudies.items}
        locale={locale}
        className="bg-limestone/30"
      />

      <ExpertiseBand
        eyebrow={ui.experienceEyebrow}
        heading={c.expertise.heading}
        body={c.expertise.body}
        locale={locale}
      />

      <AudienceBand locale={locale} />
      <RelatedBand slugs={page.related} locale={locale} />

      <Band className="bg-limestone/30">
        <SectionIntro eyebrow={ui.faqEyebrow} title={ui.faqTitle} />
        <div className="mx-auto max-w-[880px]">
          <Faq
            items={c.faqs}
            answerClassName={isAr ? "font-arabic" : "font-body"}
            locale={locale}
          />
        </div>
      </Band>

      <ClosingCta title={c.closingTitle} label={c.ctaLabel} locale={locale} />
    </>
  );
}

/* -------------------------------------------------------------------------- */
/* Page: Real Estate Agents                                                    */
/* -------------------------------------------------------------------------- */

export function ClusterAgentsPageBody({ locale }: { locale: Locale }) {
  const c = agentsPageContent(locale);
  const ui = UI[locale];
  const prefix = prefixFor(locale);
  const isAr = locale === "ar";
  const hubAnchor =
    locale === "ar"
      ? "التسويق الرقمي لشركات العقارات"
      : locale === "ru"
        ? "цифровой маркетинг для компаний в сфере недвижимости"
        : "digital marketing for real estate companies";

  const crumbs = [
    { href: prefix || "/", label: ui.home },
    { href: `${prefix}/industries`, label: ui.industries },
    { label: locale === "ar" ? "وكلاء العقارات" : locale === "ru" ? "Агенты по недвижимости" : "Real Estate Agents" },
  ];

  return (
    <>
      <BreadcrumbStructuredData items={crumbs} />
      <FaqStructuredData items={c.faqs} />

      <TypeHero
        tone="carbon"
        eyebrow={ui.industries}
        title={c.h1}
        subhead={c.heroLede}
        breadcrumb={<Breadcrumb items={crumbs} locale={locale} />}
      >
        <div className="flex flex-col gap-3">
          <PillLink href={`${prefix}${clusterCtaHref}`} tone="solidLight" size="lg">
            {c.ctaLabel}
          </PillLink>
          <p className={`max-w-[440px] text-[0.8125rem] leading-[1.6] text-porcelain/70 ${isAr ? "font-arabic" : ""}`}>
            {c.ctaSub}
          </p>
        </div>
      </TypeHero>

      <ListBand eyebrow={ui.whatsIncludedEyebrow} list={c.whatItCovers} locale={locale} />

      <Band className="bg-limestone/30">
        <SectionIntro
          eyebrow={locale === "ar" ? "لمن هذه الصفحة" : locale === "ru" ? "Для кого" : "Who It's For"}
          title={c.builtForAgent.heading}
          align="left"
          scale="sm"
        />
        <div className="max-w-[760px]">
          <p className={`reveal text-[1.0625rem] leading-[1.75] text-carbon/75 ${isAr ? "font-arabic" : ""}`}>
            {c.builtForAgent.body}
          </p>
          <p className={`reveal mt-6 text-[0.9375rem] text-carbon/60 ${isAr ? "font-arabic" : ""}`}>
            {locale === "ar"
              ? "تسوّق لمؤسسة لا لاسمك؟ راجع "
              : locale === "ru"
                ? "Продвигаете организацию, а не своё имя? См. "
                : "Marketing an organisation rather than your own name? See "}
            <Link
              href={`${prefix}/industries/real-estate`}
              className="border-b border-carbon/30 pb-0.5 text-carbon/80 transition-colors duration-300 hover:border-carbon hover:text-carbon"
            >
              {hubAnchor}
            </Link>
            .
          </p>
        </div>
      </Band>

      <CardBand
        eyebrow={ui.channelsEyebrow}
        title={c.channels.heading}
        items={c.channels.items}
        locale={locale}
      />

      <Band className="bg-limestone/30">
        <SectionIntro eyebrow={ui.pipelineEyebrow} title={c.pipeline.heading} align="left" scale="sm" />
        <p
          className={`lede reveal max-w-[820px] text-carbon/80 ${isAr ? "font-arabic" : ""}`}
        >
          {c.pipeline.note}
        </p>
      </Band>

      <ServiceCardGridBand locale={locale} />

      <CardBand
        eyebrow={ui.caseStudiesEyebrow}
        title={c.caseStudies.heading}
        items={c.caseStudies.items}
        locale={locale}
      />

      <ExpertiseBand
        eyebrow={ui.experienceEyebrow}
        heading={c.expertise.heading}
        body={c.expertise.body}
        locale={locale}
      />

      <Band>
        <SectionIntro eyebrow={ui.faqEyebrow} title={ui.faqTitle} />
        <div className="mx-auto max-w-[880px]">
          <Faq
            items={c.faqs}
            answerClassName={isAr ? "font-arabic" : "font-body"}
            locale={locale}
          />
        </div>
      </Band>

      <ClosingCta title={c.closingTitle} label={c.ctaLabel} locale={locale} />
    </>
  );
}

/* -------------------------------------------------------------------------- */
/* Metadata helpers                                                            */
/* -------------------------------------------------------------------------- */

/** `<title>`/description/canonical/OG for one sub-service page in one locale. */
export function servicePageMetadata(slug: string, locale: Locale): Metadata {
  const page = getServicePage(slug);
  if (!page) return {};
  const c = servicePageContent(page, locale);
  const prefix = prefixFor(locale);
  const path = `${prefix}/services/${slug}`;

  return {
    title: c.metaTitle,
    description: c.metaDescription,
    alternates: {
      canonical: path,
      languages: {
        en: `/services/${slug}`,
        ar: `/ar/services/${slug}`,
        ru: `/ru/services/${slug}`,
        "x-default": `/services/${slug}`,
      },
    },
    openGraph: {
      siteName: site.name,
      locale: locale === "ar" ? "ar_AE" : locale === "ru" ? "ru_RU" : "en_AE",
      url: path,
      type: "website" as const,
      title: `${c.metaTitle} — ${site.name}`,
      description: c.metaDescription,
    },
  };
}

export function agentsPageMetadata(locale: Locale): Metadata {
  const c = agentsPageContent(locale);
  const prefix = prefixFor(locale);
  const path = `${prefix}/industries/real-estate-agents`;

  return {
    title: c.metaTitle,
    description: c.metaDescription,
    alternates: {
      canonical: path,
      languages: {
        en: "/industries/real-estate-agents",
        ar: "/ar/industries/real-estate-agents",
        ru: "/ru/industries/real-estate-agents",
        "x-default": "/industries/real-estate-agents",
      },
    },
    openGraph: {
      siteName: site.name,
      locale: locale === "ar" ? "ar_AE" : locale === "ru" ? "ru_RU" : "en_AE",
      url: path,
      type: "website" as const,
      title: `${c.metaTitle} — ${site.name}`,
      description: c.metaDescription,
    },
  };
}

/** The hero/OG eyebrow shared by every cluster page. */
export function clusterOgEyebrow(locale: Locale): string {
  return locale === "ar"
    ? "تسويق العقارات"
    : locale === "ru"
      ? "Маркетинг недвижимости"
      : "Real Estate Marketing";
}
