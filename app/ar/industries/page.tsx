import type { Metadata } from "next";
import { IndustriesGrid } from "@/components/industries-grid";
import { SixServices } from "@/components/six-services";
import { Band, CardGrid, CtaBand, Hero, PillLink, SectionIntro } from "@/components/ui";
import { cta, heroImages, ogDefaultsAr } from "@/lib/site";

const descriptionAr =
  "تبني شاريو أنظمة تسويقية لعشرة قطاعات في دبي — العقارات، الضيافة، الرعاية الصحية، التجارة الإلكترونية، التكنولوجيا وغيرها — لكل منها تموضعها وقنواتها وسلوك عملائها الخاص.";

export const HERO_IMAGE = heroImages.industries.src;
export const HERO_IMAGE_ALT =
  "منظر علوي لفريق عمل يستخدم أجهزة لابتوب وجهاز لوحي وتقارير مطبوعة مليئة بالرسوم البيانية، على مكتب أبيض مشترك";

export const metadata: Metadata = {
  title: "القطاعات التي نعمل معها — وكالة تسويق في دبي",
  description: descriptionAr,
  alternates: {
    canonical: "/ar/industries",
    languages: {
      en: "/industries",
      ar: "/ar/industries",
      ru: "/ru/industries",
      "x-default": "/industries",
    },
  },
  openGraph: {
    ...ogDefaultsAr,
    url: "/ar/industries",
    type: "website",
    title: "شاريو — القطاعات التي نعمل معها",
    description: descriptionAr,
  },
};

const differentiators = [
  {
    title: "فريق أول، بقيادة المؤسِّسة",
    desc: "كل تعاون يُبنى بنفس الحكمة العليا، لا يمر عبر طبقات حسابات متعددة — من يضع الاستراتيجية هو من تتحدثون معه مباشرة.",
  },
  {
    title: "نظام واحد متكامل",
    desc: "التموضع، الأداء الإعلاني، تحسين محركات البحث، الموقع الإلكتروني وإدارة علاقات العملاء تُخطَّط معاً، فلا تُرسل حملة زواراً إلى صفحة أو عملية غير جاهزة لاستقبالهم.",
  },
  {
    title: "معرفة عميقة بسوق دبي",
    desc: "سلوك البحث، وكثافة المنافسة، ومواسم الشراء هنا لا تطابق أي دليل عام — تبدأ الاستراتيجية مما يحدث فعلياً في هذا السوق.",
  },
  {
    title: "يُقاس بالإيراد",
    desc: "يُراجَع كل تعاون مقابل الفرص التجارية أو الحجوزات أو التسجيلات التي أثّر فيها فعلياً — لا مقابل مرات الظهور أو لوحة قياس شكلية.",
  },
];

const process = [
  { step: "01", title: "فهم القطاع", desc: "قبل اختيار أي قناة، نرسم كيف يبحث عميلكم فعلياً، ويقارن، ويقرر ضمن قطاعكم تحديداً." },
  { step: "02", title: "تموضع واضح", desc: "رسالة وهوية مبنيتان على ما يميّز العمل فعلياً، لا نموذجاً مستعاراً من منافس." },
  { step: "03", title: "بناء النظام", desc: "الموقع الإلكتروني، والظهور في البحث، والإعلانات المدفوعة، وإدارة علاقات العملاء، مرتبة بحسب دورة المبيعات أو الحجز الفعلية لديكم." },
  { step: "04", title: "تشغيل وتحسين", desc: "مراجعة أسبوعية مقابل النتيجة التي تهم قطاعكم — عملاء محتملون، حجوزات، تسجيلات، أو فرص تجارية — لا مؤشرات سطحية." },
];

export default function ArabicIndustriesPage() {
  return (
    <>
      <h1 className="sr-only">حلول التسويق الرقمي والإبداعي لكل قطاع</h1>
      <Hero
        src={HERO_IMAGE}
        alt={HERO_IMAGE_ALT}
        focus="object-[50%_45%]"
        eyebrow="القطاعات"
        title="تسويق يُبنى حول القطاع الذي تعملون فيه فعلياً."
        subhead="شركة برمجيات، وفندق بوتيكي، ومطوّر عقاري يبيعون لعملاء مختلفين تماماً وعلى جداول زمنية مختلفة تماماً. نبني الاستراتيجية والقنوات والأنظمة لتناسب ذلك — لا حزمة تسويقية عامة تحمل شعاركم فقط."
        priority
      >
        <PillLink href={cta.href} tone="solidLight" size="lg">
          {cta.labelAr}
        </PillLink>
      </Hero>

      <IndustriesGrid locale="ar" />

      <SixServices locale="ar" />

      <Band tone="carbon">
        <SectionIntro
          eyebrow="لماذا شاريو"
          title="نفس الانضباط، مطبّق على قطاعكم."
          tone="carbon"
        />
        <CardGrid columns={4}>
          {differentiators.map((item, i) => (
            <div key={item.title} className="reveal border border-porcelain/15 p-8" data-delay={i * 60}>
              <p className="font-arabic text-[1.25rem] font-bold text-porcelain">{item.title}</p>
              <p className="mt-3.5 font-arabic text-[0.9375rem] leading-[1.9] text-porcelain/70">{item.desc}</p>
            </div>
          ))}
        </CardGrid>
      </Band>

      <Band>
        <SectionIntro eyebrow="كيف نبدأ" title="من القطاع إلى النظام، في أربع خطوات." />
        <CardGrid columns={4}>
          {process.map((item, i) => (
            <div key={item.step} className="reveal" data-delay={i * 60}>
              <span className="font-display text-[1.0625rem] text-carbon/40">{item.step}</span>
              <p className="mt-4 font-arabic text-[1.25rem] font-bold text-carbon">{item.title}</p>
              <p className="mt-3.5 font-arabic text-[0.9375rem] leading-[1.9] text-carbon/72">{item.desc}</p>
            </div>
          ))}
        </CardGrid>
      </Band>

      <CtaBand
        title="لا ترون قطاعكم في القائمة؟ على الأرجح نعرفه جيداً."
        sub="أخبرونا بما تفعلونه ولمن تبيعون — سنخبركم بصراحة إن كانت شاريو الجهة المناسبة."
        arabicAccent
      >
        <PillLink href={cta.href} tone="solid" size="lg">
          {cta.labelAr}
        </PillLink>
      </CtaBand>
    </>
  );
}
