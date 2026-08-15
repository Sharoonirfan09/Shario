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
import { aboutApproach, cta, heroImages, ogDefaultsAr, services, sharedImages, site } from "@/lib/site";

const descriptionAr =
  "شاريو شركة تسويق رقمي واستوديو إبداعي في دبي، تربط بين التسويق الأدائي وتحسين محركات البحث والعلامة التجارية والاستراتيجية والاستشارات في نظام واحد للشركات الطموحة.";

const HERO_IMAGE = heroImages.about.src;
const HERO_IMAGE_ALT = "إطارات وقطع مرتبة على جدار دافئ وبسيط";

export const metadata: Metadata = {
  title: "من نحن",
  description: descriptionAr,
  alternates: {
    canonical: "/ar/about",
    languages: { en: "/about", ar: "/ar/about", ru: "/ru/about", "x-default": "/about" },
  },
  openGraph: {
    ...ogDefaultsAr,
    url: "/ar/about",
    type: "website",
    title: "من نحن — شاريو",
    description: descriptionAr,
  },
};

export default function ArabicAboutPage() {
  return (
    <>
      <h1 className="sr-only">
        من نحن — شاريو، شركة تسويق رقمي واستوديو إبداعي في دبي
      </h1>
      <Hero
        src={HERO_IMAGE}
        alt={HERO_IMAGE_ALT}
        focus="object-[50%_50%]"
        eyebrow="من نحن"
        priority
      />

      {/* About SHARIO */}
      <Band>
        <div className="mx-auto max-w-[760px] text-center">
          <p className="eyebrow flex items-center justify-center gap-3 text-carbon/55">
            <span aria-hidden="true" className="h-px w-6 bg-mist" />
            عن شاريو
          </p>
          <Heading as="h2" scale="lg" className="mt-5">
            شاريو
          </Heading>
          <p className="reveal mt-5 font-display text-[1.25rem] italic text-carbon/80 wide:text-[1.4375rem]">
            استوديو تسويق رقمي وإبداعي مبني حول الوضوح والأداء والهوية.
          </p>
          <p
            className="reveal mt-8 text-[1.0625rem] leading-[1.75] text-carbon/75"
            data-delay="80"
          >
            تجمع شاريو بين الاستراتيجية والتسويق الأدائي وتحسين محركات البحث
            والمحتوى والمواقع الإلكترونية وإدارة علاقات العملاء والأتمتة
            والعلامة التجارية والإبداع ضمن نهج واحد متصل.
          </p>
          <p
            className="reveal mt-5 text-[1.0625rem] leading-[1.75] text-carbon/75"
            data-delay="160"
          >
            نؤمن بأن التسويق الجيد يجب أن يفعل أكثر من خلق الانتباه. يجب أن
            يخلق وضوحاً، ويبني ملاءمة، ويدفع العمل إلى الأمام.
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
            <p className="label-sm mt-5 text-carbon/50">فلسفتنا</p>
            <h2 className="mt-4 font-arabic text-[1.4375rem] font-bold leading-[1.3] text-carbon">
              التسويق يجب أن يحرّك شيئاً.
            </h2>
            <p className="mt-4 text-[0.9375rem] leading-[1.75] text-carbon/70">
              تربط شاريو التفكير الإبداعي بالأداء القابل للقياس — العلامة
              التجارية والرقمي والنمو كنظام واحد، لا ثلاث خدمات منفصلة تعمل
              بالتوازي.
            </p>
          </div>
          <div className="reveal ledger" data-delay="80">
            <p className="ledger-figure">02</p>
            <p className="label-sm mt-5 text-carbon/50">رسالتنا</p>
            <h2 className="mt-4 font-arabic text-[1.4375rem] font-bold leading-[1.3] text-carbon">
              أن نجعل التسويق الحديث أوضح وأكثر ترابطاً وفعالية.
            </h2>
            <p className="mt-4 text-[0.9375rem] leading-[1.75] text-carbon/70">
              نبني أنظمة تسويقية مدروسة حيث تعمل الاستراتيجية والإبداع
              والتنفيذ الرقمي والأداء معاً، بدلاً من أن تصل من اتجاهات
              منفصلة.
            </p>
          </div>
          <div className="reveal ledger" data-delay="160">
            <p className="ledger-figure">03</p>
            <p className="label-sm mt-5 text-carbon/50">رؤيتنا</p>
            <h2 className="mt-4 font-arabic text-[1.4375rem] font-bold leading-[1.3] text-carbon">
              أن نبني معياراً أكثر ذكاءً لكيفية تعامل الشركات الطموحة مع
              التسويق.
            </h2>
            <p className="mt-4 text-[0.9375rem] leading-[1.75] text-carbon/70">
              أبعد من الحملات المنفصلة — أنظمة تسويقية حيث تُبنى الهوية
              والتقنية والمحتوى والأداء لتعمل معاً منذ البداية.
            </p>
          </div>
        </div>
      </Band>

      {/* How We Work */}
      <Band>
        <div className="mb-12 max-w-[820px] wide:mb-16">
          <p className="eyebrow flex items-center gap-3 text-carbon/55">
            <span aria-hidden="true" className="h-px w-6 bg-mist" />
            كيف نعمل
          </p>
          <Heading as="h2" scale="md" className="mt-5">
            نفهم. نبني. نقيس. نصقل.
          </Heading>
        </div>
        <CardGrid columns={4}>
          {aboutApproach.map((step, i) => (
            <Card
              key={step.num}
              badge={step.num}
              title={step.titleAr}
              titleAs="h3"
              desc={step.descAr}
              delay={i * 60}
              locale="ar"
            />
          ))}
        </CardGrid>
      </Band>

      {/* What We Do */}
      <Band className="bg-limestone/30">
        <div className="mb-10 max-w-[820px] wide:mb-14">
          <p className="eyebrow flex items-center gap-3 text-carbon/55">
            <span aria-hidden="true" className="h-px w-6 bg-mist" />
            ماذا نفعل
          </p>
          <Heading as="h2" scale="md" className="mt-5">
            فريق واحد، عبر كل جزء من النظام.
          </Heading>
        </div>
        <div className="grid gap-x-10 wide:grid-cols-2">
          {services.map((service, i) => (
            <Link
              key={service.slug}
              href={`/ar/services/${service.slug}`}
              className="group reveal flex items-center justify-between gap-6 border-t border-carbon/15 py-5 transition-colors duration-300 hover:border-carbon/40"
              data-delay={i * 50}
            >
              <span className="font-arabic text-[1.25rem] font-bold text-carbon transition-colors duration-300 group-hover:text-carbon/70 wide:text-[1.375rem]">
                {service.nameAr}
              </span>
              <span
                aria-hidden="true"
                className="text-carbon/40 transition-all duration-300 group-hover:-translate-x-1 group-hover:text-carbon"
              >
                ←
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
            alt={`${site.founderAr}، مؤسس شاريو`}
          />
          <div>
            <p className="eyebrow flex items-center gap-3 text-carbon/55">
              <span aria-hidden="true" className="h-px w-6 bg-mist" />
              المؤسس
            </p>
            <Heading as="h2" scale="md" className="mt-5">
              {site.founderAr}
            </Heading>
            <p className="reveal mt-6 max-w-[560px] text-[1.0625rem] leading-[1.7] text-carbon/75">
              مسوّق أدائي واستراتيجي نمو رقمي، يركز على بناء علامات تجارية
              واضحة وذات صلة ومبنية للنمو.
            </p>
            <p
              className="reveal mt-4 max-w-[560px] text-[1.0625rem] leading-[1.7] text-carbon/75"
              data-delay="80"
            >
              قبل تأسيس شاريو، عمل شارون عبر قطاعات العقارات والضيافة والأعمال
              بين الشركات في دبي، وقاد مبادرات التسويق والاستراتيجية الرقمية
              والنمو لشركات وعلامات تجارية طموحة.
            </p>
            <p
              className="reveal mt-4 max-w-[560px] text-[1.0625rem] leading-[1.7] text-carbon/75"
              data-delay="160"
            >
              شكّلت تلك التجربة شاريو حول إيمان بسيط: التسويق الجيد لا يقتصر
              على أن تُرى. بل يتعلق بمعرفة ما تقوله، وأين تقوله، ولماذا يهم.
            </p>
            <p
              className="reveal mt-4 max-w-[560px] text-[1.0625rem] leading-[1.7] text-carbon/75"
              data-delay="240"
            >
              اليوم، يقع ذلك التفكير في قلب شاريو — يجمع الاستراتيجية والهوية
              والرقمي والنمو تحت اتجاه واضح واحد.
            </p>
            <div
              className="reveal mt-9 flex flex-wrap items-center gap-6"
              data-delay="320"
            >
              <div>
                <p className="font-arabic text-xl font-bold">{site.founderAr}</p>
                <p className="mt-1 text-[0.8125rem] text-carbon/60">
                  مهندس التسويق القائم على الإيرادات
                </p>
              </div>
              <a
                href={site.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="font-arabic border-b border-carbon/30 pb-1 text-[0.75rem] text-carbon/70 transition-colors duration-300 hover:border-carbon hover:text-carbon"
              >
                لينكدإن ←
              </a>
            </div>
          </div>
        </div>
      </Band>

      <CtaBand
        title="التسويق الجيد يبدأ بالوضوح."
        sub="إذا كنتم تعلمون أن هناك إمكانات أكبر في تسويقكم، فلنجد أين تكمن."
      >
        <PillLink href={cta.href} tone="solid" size="lg">
          {cta.labelAr}
        </PillLink>
      </CtaBand>
    </>
  );
}
