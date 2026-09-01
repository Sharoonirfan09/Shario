/**
 * The Real Estate pillar → cluster.
 *
 * `/industries/real-estate` (the hub, "companies") and every other industry
 * page stay data-driven from `industries` in `lib/site.ts`. This file holds
 * the *cluster* pages that sit under that hub but deliberately live outside
 * the `industries`/`services` arrays, so they never enter the global
 * `/industries` and `/services` grids, the header mega-menu, `SixServices`,
 * `servicesByCategory` or `scripts/check-images.mjs` — they're reached only
 * through the pillar↔cluster card links:
 *
 *   /industries/real-estate-agents               — the second audience page
 *   /services/real-estate-seo-dubai              ─┐
 *   /services/real-estate-ppc-dubai               │
 *   /services/real-estate-content-marketing-dubai │  six sub-service pages,
 *   /services/real-estate-social-media-…-dubai    │  each owning one keyword
 *   /services/real-estate-email-marketing-dubai   │  (see PART 3 of the brief)
 *   /services/real-estate-web-development-dubai   ─┘
 *
 * Every page is rendered by `components/cluster-page.tsx` from the primitives
 * in `components/ui.tsx` — the same Hero/Band/SectionIntro/CardGrid/DotList/
 * Faq/CtaBand the live industry and service templates use — so the cluster
 * looks identical to what's already shipped. Heroes are the photo-less
 * `TypeHero tone="carbon"` variant the service pages already use.
 *
 * Trilingual, same convention as `lib/site.ts`: `en` is always present; `ar`
 * and `ru` are filled per page and fall back to `en` until they are.
 *
 * Case-study copy here is the finished on-page text only. The "(Publishing
 * note: attribute to … / confirm figures)" lines in the brief are editorial
 * instructions for the client, not page content, so they are not stored or
 * rendered.
 */

import type { Locale } from "@/lib/locale";

/** A titled list — an intro line over dot-bulleted items. */
export type ClusterList = {
  /** The section's H2. */
  heading: string;
  /** One line introducing the list. Optional. */
  lead?: string;
  items: string[];
};

/** A named card in the "channels" / "case studies" grids. */
export type ClusterCard = { title: string; desc: string };

export type ClusterFaq = { q: string; a: string };

/** The E-E-A-T "Why work with a specialist" band. */
export type ClusterExpertise = { heading: string; body: string[] };

/* -------------------------------------------------------------------------- */
/* The six sub-service pages                                                   */
/* -------------------------------------------------------------------------- */

/** One sub-service page's copy in a single language. */
export type ServicePageContent = {
  /** Breadcrumb leaf + related-services card label. */
  label: string;
  /** `<title>` / `og:title` (before the ` — Shario` suffix). */
  metaTitle: string;
  metaDescription: string;
  /** The single H1. */
  h1: string;
  /** Hero paragraph, under the H1. */
  heroLede: string;
  /** Primary CTA button label. */
  ctaLabel: string;
  /** Line under the primary CTA button. */
  ctaSub: string;
  whatsIncluded: ClusterList;
  forCompanies: ClusterList;
  forAgents: ClusterList;
  caseStudies: { heading: string; items: ClusterCard[] };
  expertise: ClusterExpertise;
  faqs: ClusterFaq[];
  /** Closing CTA heading. */
  closingTitle: string;
};

export type ServicePage = {
  slug: string;
  /** 2–3 sibling service slugs for the "Related services" row. */
  related: string[];
  en: ServicePageContent;
  ar?: ServicePageContent;
  ru?: ServicePageContent;
};

/* -------------------------------------------------------------------------- */
/* The Agents audience page                                                    */
/* -------------------------------------------------------------------------- */

export type AgentsPageContent = {
  metaTitle: string;
  metaDescription: string;
  h1: string;
  heroLede: string;
  ctaLabel: string;
  ctaSub: string;
  whatItCovers: ClusterList;
  /** "Built for the agent — not the brokerage". */
  builtForAgent: { heading: string; body: string };
  channels: { heading: string; items: ClusterCard[] };
  /** "How we'd grow your personal pipeline" — one line. */
  pipeline: { heading: string; note: string };
  caseStudies: { heading: string; items: ClusterCard[] };
  expertise: ClusterExpertise;
  faqs: ClusterFaq[];
  closingTitle: string;
};

export type AgentsPage = {
  en: AgentsPageContent;
  ar?: AgentsPageContent;
  ru?: AgentsPageContent;
};

/* -------------------------------------------------------------------------- */
/* Shared: the pillar↔cluster links                                            */
/* -------------------------------------------------------------------------- */

/** Anchor + blurb for the "Who this is for" row on every sub-service page. */
export const audienceLinks = {
  en: {
    heading: "Who this is for",
    title: "Which side of the deal are you on?",
    companies: {
      href: "/industries/real-estate",
      anchor: "Digital marketing for real estate companies",
      desc: "Developers, multi-agent brokerages, property-management and investment firms — organisational marketing with launch pressure and a sales team to feed.",
    },
    agents: {
      href: "/industries/real-estate-agents",
      anchor: "Digital marketing for real estate agents",
      desc: "Solo agents and realtors marketing their own listings, face and referral pipeline — not a brokerage's inventory.",
    },
  },
  ar: {
    heading: "لمن هذه الصفحة",
    title: "على أي جانب من الصفقة أنت؟",
    companies: {
      href: "/industries/real-estate",
      anchor: "التسويق الرقمي لشركات العقارات",
      desc: "المطورون والوسطاء متعددو الوكلاء وشركات إدارة الممتلكات والاستثمار — تسويق مؤسسي بضغط إطلاقات وفريق مبيعات بحاجة إلى عملاء محتملين.",
    },
    agents: {
      href: "/industries/real-estate-agents",
      anchor: "التسويق الرقمي لوكلاء العقارات",
      desc: "الوكلاء المستقلون الذين يسوّقون عروضهم واسمهم وقاعدة إحالاتهم — لا مخزون وكالة.",
    },
  },
  ru: {
    heading: "Для кого эта страница",
    title: "На какой вы стороне сделки?",
    companies: {
      href: "/industries/real-estate",
      anchor: "Цифровой маркетинг для компаний в сфере недвижимости",
      desc: "Застройщики, брокерские агентства, управляющие и инвестиционные компании — маркетинг организации с давлением запусков и отделом продаж.",
    },
    agents: {
      href: "/industries/real-estate-agents",
      anchor: "Цифровой маркетинг для агентов по недвижимости",
      desc: "Частные агенты и риелторы, продвигающие свои объекты, имя и поток рекомендаций, — не инвентарь агентства.",
    },
  },
} as const;

/** The six-card "Real Estate & Property marketing services" grid — shared by
 *  the hub (`/industries/real-estate`, via `Industry.services`) and the Agents
 *  page. Each card links to its sub-service page (PART 1 · Step 4). */
export const serviceCardGrid = {
  en: {
    eyebrow: "Where We Help",
    title: "Real Estate & Property marketing services.",
    cards: [
      { slug: "real-estate-ppc-dubai", title: "Performance Marketing for Launches", desc: "Google and Meta campaigns structured around a launch calendar, not a flat monthly spend, so budget peaks when the project needs it." },
      { slug: "real-estate-seo-dubai", title: "SEO for Real Estate", desc: "Project and area landing pages built to rank for the searches a buyer actually types before they ever contact an agent." },
      { slug: "real-estate-web-development-dubai", title: "Property Websites That Qualify Leads", desc: "Fast, mobile-first listing and project sites with enquiry forms built to separate a serious buyer from a browser." },
      { slug: "real-estate-email-marketing-dubai", title: "CRM & Lead Nurturing", desc: "Automated follow-up sequences that keep a six-week decision warm without relying on an agent remembering to call back." },
      { slug: "real-estate-social-media-marketing-dubai", title: "Developer & Brokerage Branding", desc: "A positioning and identity system a project or brokerage can carry from the first render to the handover event." },
      { slug: "real-estate-content-marketing-dubai", title: "Go-to-Market Strategy", desc: "A channel and budget plan built around your launch timeline, not a generic marketing calendar." },
    ],
  },
  ar: {
    eyebrow: "أين نساعد",
    title: "خدمات تسويق العقارات والممتلكات.",
    cards: [
      { slug: "real-estate-ppc-dubai", title: "التسويق الأدائي لإطلاقات المشاريع", desc: "حملات على جوجل وميتا مبنية وفق جدول الإطلاق، لا وفق إنفاق شهري ثابت، بحيث تتركز الميزانية حين يحتاجها المشروع." },
      { slug: "real-estate-seo-dubai", title: "تحسين محركات البحث للعقارات", desc: "صفحات هبوط للمشروع والمنطقة مصممة للترتيب في عمليات البحث التي يكتبها المشتري قبل التواصل مع أي وكيل." },
      { slug: "real-estate-web-development-dubai", title: "مواقع عقارية تؤهّل العملاء المحتملين", desc: "مواقع سريعة مصممة أولاً للهاتف لعرض المشاريع والعقارات، بنماذج استفسار تميّز المشتري الجاد عن المتصفح." },
      { slug: "real-estate-email-marketing-dubai", title: "إدارة علاقات العملاء ورعاية العملاء المحتملين", desc: "سلاسل متابعة آلية تُبقي قراراً يمتد ستة أسابيع دافئاً دون الاعتماد على تذكّر الوكيل للاتصال." },
      { slug: "real-estate-social-media-marketing-dubai", title: "هوية المطورين والوسطاء", desc: "نظام تموضع وهوية يواكب المشروع أو الوكالة من أول تصميم افتراضي وحتى حفل التسليم." },
      { slug: "real-estate-content-marketing-dubai", title: "استراتيجية الدخول إلى السوق", desc: "خطة قنوات وميزانية مبنية حول الجدول الزمني لإطلاقك، لا وفق تقويم تسويقي عام." },
    ],
  },
  ru: {
    eyebrow: "Где мы помогаем",
    title: "Маркетинговые услуги для недвижимости.",
    cards: [
      { slug: "real-estate-ppc-dubai", title: "Performance-маркетинг для запусков", desc: "Кампании в Google и Meta вокруг календаря запуска, а не равномерного месячного бюджета, — расходы растут, когда это нужно проекту." },
      { slug: "real-estate-seo-dubai", title: "SEO для недвижимости", desc: "Страницы проекта и района, созданные для ранжирования по запросам, которые покупатель вводит до обращения к агенту." },
      { slug: "real-estate-web-development-dubai", title: "Сайты, которые квалифицируют лиды", desc: "Быстрые мобильные сайты объектов и проектов с формами, отделяющими серьёзного покупателя от посетителя." },
      { slug: "real-estate-email-marketing-dubai", title: "CRM и прогрев лидов", desc: "Автоматизированные цепочки, поддерживающие шестинедельное решение «в тепле» без напоминаний агенту позвонить." },
      { slug: "real-estate-social-media-marketing-dubai", title: "Брендинг застройщиков и агентств", desc: "Система позиционирования и айдентики от первого рендера до церемонии передачи ключей." },
      { slug: "real-estate-content-marketing-dubai", title: "Стратегия вывода на рынок", desc: "План по каналам и бюджету вокруг графика вашего запуска, а не универсального календаря." },
    ],
  },
} as const;

/** Prefilled WhatsApp / enquiry context — mirrors the `Industry.ctaMessage`
 *  pattern. Primary and closing CTAs on the cluster pages point at the
 *  enquiry form (`/contact`), matching the brief's "→ form" / "→ booking
 *  form"; this string is the `?enquiry=` hint the form can pick up. */
export const clusterCtaHref = "/contact";

/* -------------------------------------------------------------------------- */
/* PAGE 2 — Real Estate Agents                                                 */
/* -------------------------------------------------------------------------- */

export const agentsPage: AgentsPage = {
  en: {
    metaTitle: "Digital Marketing for Real Estate Agents in Dubai",
    metaDescription:
      "Digital marketing for real estate agents in Dubai — turn listings and DMs into qualified buyer enquiries with Google, Meta & portal campaigns. Book a call.",
    h1: "Digital Marketing for Real Estate Agents in Dubai",
    heroLede:
      "You don't need a bigger ad budget. You need the digital marketing for real estate agents that turns a scroll into a viewing and a viewing into a signed form — built around you, your listings and your patch of Dubai, not a faceless brokerage brand.",
    ctaLabel: "Get my agent lead plan",
    ctaSub: "A free 20-minute call and a clear, no-obligation plan for your listings.",
    whatItCovers: {
      heading: "What digital marketing for real estate agents actually covers",
      lead: "For a solo agent, marketing has one job: put your listings in front of ready buyers and keep warm ones from going cold. Done right, digital marketing for real estate agents means:",
      items: [
        "Listing campaigns on Google and Meta that target buyers actively searching your community and price band",
        "A personal brand for realtors — reels, walkthroughs and market takes that make you the agent people remember",
        "Portal and paid support so your Property Finder and Bayut leads arrive with intent, not just an email",
        "WhatsApp and CRM follow-up so every enquiry gets answered inside the hour — where most agent pipelines quietly leak",
      ],
    },
    builtForAgent: {
      heading: "Built for the agent — not the brokerage",
      body: "This is digital marketing for realtors working on their own name and referral pipeline — a different job from marketing a developer's tower or a brokerage's inventory. If you're building real estate agent lead generation in Dubai around your face, your listings and your sphere, everything on this page is for you.",
    },
    channels: {
      heading: "The channels that bring Dubai agents qualified buyers",
      items: [
        { title: "Instagram & TikTok", desc: "Social media for real estate agents — short listing tours, “just sold”, and neighbourhood guides that build trust before the DM." },
        { title: "Google Search", desc: "Intent campaigns for “[community] apartments for sale” so you appear the moment a buyer starts looking." },
        { title: "Property portals", desc: "Property Finder, Bayut and Dubizzle listings optimised and boosted to pull enquiries, not tyre-kickers." },
        { title: "WhatsApp + CRM", desc: "Automated follow-up that keeps a six-week buyer decision warm without you chasing every lead by hand." },
      ],
    },
    pipeline: {
      heading: "How we'd grow your personal pipeline",
      note: "Position your niche → build a fast, mobile listing page & profile → launch paid + portal traffic → nurture every enquiry with CRM and WhatsApp → review weekly on cost per qualified lead, not likes.",
    },
    caseStudies: {
      heading: "Agent case studies",
      items: [
        { title: "Shanti Kiaans — luxury personal real-estate brand", desc: "Built the personal brand and ran end-to-end social media — creative direction, “Beachfront Living in Dubai” lifestyle content, campaigns and community — growing a trusted, enquiry-generating audience for a Dubai agent-led real estate brand." },
        { title: "Dubai Luxury Space — listings & property revenue", desc: "Website (dubai-luxuryspace.ae) and social built around one message — “maximise your property's revenue” — with enquiry forms designed to separate a serious buyer/owner from a browser." },
        { title: "Personal-brand authority (M Shahid Nawaz)", desc: "An executive property portfolio positioned for thought leadership and high-trust client acquisition — proof that in Dubai real estate, the agent's personal brand is the asset that compounds." },
        { title: "Content that compounds — 0 → 1,000 users in 3 months", desc: "A property/market blog taken from zero to 1,000 active users in three months on pure on-page SEO — no ads, no bought backlinks (1m 09s average engagement). The same content engine builds an agent's organic pipeline." },
      ],
    },
    expertise: {
      heading: "Why work with a Dubai real estate marketing specialist",
      body: [
        "Sharoon Irfan Khan — performance marketer & brand strategist for Dubai real estate, Head of Marketing at MSN Developments. Five years and AED 35M+ in lead-attributed revenue across Google, Meta and the UAE's property portals (Property Finder, Bayut, Dubizzle); 20+ websites launched and optimised.",
        "This is a digital marketing agency for real estate agents that has actually sold Dubai property, not a generalist guessing at it.",
      ],
    },
    faqs: [
      { q: "What does digital marketing for real estate agents include?", a: "Digital marketing for real estate agents covers listing ads on Google and Meta, a personal-brand content plan, portal optimisation (Property Finder, Bayut), and WhatsApp/CRM follow-up — a full loop from first scroll to signed form." },
      { q: "How much do real estate leads cost in Dubai?", a: "It varies by community and price band; we review weekly on cost per qualified lead — the ones your pipeline can actually close — not raw form fills." },
      { q: "Which platform is best for a Dubai agent?", a: "Instagram builds the brand, Google captures intent, and the portals convert — most agents need a small, well-run mix rather than one channel." },
    ],
    closingTitle: "Ready for a steadier stream of buyer enquiries? Book a free call and get a clear digital marketing for real estate agents plan for your listings.",
  },
  ar: {
    metaTitle: "التسويق الرقمي لوكلاء العقارات في دبي",
    metaDescription:
      "التسويق الرقمي لوكلاء العقارات في دبي — حوّل العروض والرسائل إلى استفسارات مشترين مؤهلين عبر حملات جوجل وميتا والمنصات العقارية. احجز مكالمة.",
    h1: "التسويق الرقمي لوكلاء العقارات في دبي",
    heroLede:
      "لست بحاجة إلى ميزانية إعلانات أكبر. أنت بحاجة إلى التسويق الرقمي لوكلاء العقارات الذي يحوّل التصفّح إلى معاينة، والمعاينة إلى نموذج موقّع — مبني حولك أنت وعروضك ومنطقتك في دبي، لا حول علامة وكالة بلا وجه.",
    ctaLabel: "احصل على خطة عملاء الوكيل",
    ctaSub: "مكالمة مجانية مدتها 20 دقيقة وخطة واضحة بلا التزام لعروضك.",
    whatItCovers: {
      heading: "ما الذي يغطيه التسويق الرقمي لوكلاء العقارات فعلياً",
      lead: "بالنسبة للوكيل المستقل، للتسويق مهمة واحدة: وضع عروضك أمام مشترين جاهزين، ومنع المهتمّين من أن يبردوا. إذا نُفّذ بشكل صحيح، فإن التسويق الرقمي لوكلاء العقارات يعني:",
      items: [
        "حملات عروض على جوجل وميتا تستهدف المشترين الباحثين فعلياً عن مجتمعك وشريحتك السعرية",
        "علامة شخصية للوكلاء — مقاطع ريلز وجولات وآراء سوقية تجعلك الوكيل الذي يتذكره الناس",
        "دعم عبر المنصات والإعلانات المدفوعة بحيث تصل عملاء Property Finder وBayut بنية شراء، لا بمجرد بريد إلكتروني",
        "متابعة عبر واتساب ونظام إدارة علاقات العملاء بحيث يُجاب كل استفسار خلال ساعة — وهي النقطة التي تتسرب منها معظم قواعد عملاء الوكلاء بهدوء",
      ],
    },
    builtForAgent: {
      heading: "مصمم للوكيل — لا للوكالة",
      body: "هذا تسويق رقمي للوكلاء الذين يعملون على اسمهم الخاص وقاعدة إحالاتهم — وهي مهمة مختلفة عن تسويق برج مطوّر أو مخزون وكالة. إذا كنت تبني توليد عملاء الوكيل العقاري في دبي حول وجهك وعروضك ودائرتك، فكل ما في هذه الصفحة موجّه إليك.",
    },
    channels: {
      heading: "القنوات التي تجلب لوكلاء دبي مشترين مؤهلين",
      items: [
        { title: "إنستغرام وتيك توك", desc: "وسائل التواصل لوكلاء العقارات — جولات عروض قصيرة، ومنشورات «تم البيع»، وأدلة أحياء تبني الثقة قبل الرسالة الخاصة." },
        { title: "بحث جوجل", desc: "حملات نية شراء لعبارات مثل «شقق للبيع في [المجتمع]» بحيث تظهر في اللحظة التي يبدأ فيها المشتري بالبحث." },
        { title: "المنصات العقارية", desc: "عروض Property Finder وBayut وDubizzle محسّنة ومدعّمة لجذب الاستفسارات الجادة، لا المتصفّحين العابرين." },
        { title: "واتساب وإدارة علاقات العملاء", desc: "متابعة آلية تُبقي قرار شراء يمتد ستة أسابيع دافئاً دون أن تلاحق كل عميل يدوياً." },
      ],
    },
    pipeline: {
      heading: "كيف سننمّي قاعدة عملائك الشخصية",
      note: "حدّد تخصصك ← ابنِ صفحة عروض وملفاً سريعاً للهاتف ← أطلق حركة مدفوعة ومن المنصات ← ارعَ كل استفسار عبر CRM وواتساب ← راجع أسبوعياً على تكلفة العميل المؤهل، لا على الإعجابات.",
    },
    caseStudies: {
      heading: "دراسات حالة للوكلاء",
      items: [
        { title: "شانتي كيانز — علامة عقارية شخصية فاخرة", desc: "بناء العلامة الشخصية وإدارة وسائل تواصل متكاملة — توجيه إبداعي، محتوى نمط حياة «العيش على شاطئ دبي»، حملات ومجتمع — لتنمية جمهور موثوق يولّد الاستفسارات لعلامة عقارية دبيّة يقودها وكيل." },
        { title: "Dubai Luxury Space — عروض وإيرادات العقار", desc: "موقع (dubai-luxuryspace.ae) ووسائل تواصل مبنية حول رسالة واحدة — «ضاعف إيراد عقارك» — بنماذج استفسار مصممة لتمييز المشتري/المالك الجاد عن المتصفح." },
        { title: "سلطة العلامة الشخصية (م. شهيد نواز)", desc: "محفظة عقارية تنفيذية مموضعة للريادة الفكرية واكتساب عملاء عالي الثقة — دليل على أن العلامة الشخصية للوكيل في عقارات دبي هي الأصل الذي يتراكم." },
        { title: "محتوى يتراكم — من صفر إلى 1,000 مستخدم في 3 أشهر", desc: "مدونة عقارية/سوقية انتقلت من صفر إلى 1,000 مستخدم نشط خلال ثلاثة أشهر على تحسين محركات البحث الصفحي وحده — بلا إعلانات، بلا روابط مشتراة (متوسط تفاعل 1 دقيقة و09 ثوانٍ). المحرك نفسه يبني قاعدة عضوية للوكيل." },
      ],
    },
    expertise: {
      heading: "لماذا تعمل مع مختص تسويق عقاري في دبي",
      body: [
        "شارون عرفان خان — مسوّقة أداء واستراتيجية علامة لعقارات دبي، ورئيسة التسويق في MSN Developments. خمس سنوات و+35 مليون درهم من الإيرادات المنسوبة للعملاء المحتملين عبر جوجل وميتا ومنصات دبي العقارية (Property Finder وBayut وDubizzle)؛ و+20 موقعاً أُطلق وحُسّن.",
        "هذه وكالة تسويق رقمي لوكلاء العقارات باعت عقارات دبي فعلياً، لا عامّة تخمّن.",
      ],
    },
    faqs: [
      { q: "ماذا يشمل التسويق الرقمي لوكلاء العقارات؟", a: "يشمل التسويق الرقمي لوكلاء العقارات إعلانات العروض على جوجل وميتا، وخطة محتوى للعلامة الشخصية، وتحسين المنصات (Property Finder وBayut)، ومتابعة عبر واتساب/CRM — حلقة كاملة من أول تصفّح إلى نموذج موقّع." },
      { q: "كم تكلفة العملاء المحتملين في عقارات دبي؟", a: "تختلف حسب المجتمع والشريحة السعرية؛ نراجع أسبوعياً على تكلفة العميل المؤهل — الذي يستطيع خط مبيعاتك إغلاقه فعلاً — لا على عدد النماذج." },
      { q: "ما المنصة الأفضل لوكيل في دبي؟", a: "إنستغرام يبني العلامة، وجوجل يلتقط النية، والمنصات تحوّل — يحتاج معظم الوكلاء مزيجاً صغيراً مُدَاراً جيداً لا قناة واحدة." },
    ],
    closingTitle: "مستعد لتدفّق أكثر ثباتاً من استفسارات المشترين؟ احجز مكالمة مجانية واحصل على خطة واضحة للتسويق الرقمي لوكلاء العقارات لعروضك.",
  },
  ru: {
    metaTitle: "Цифровой маркетинг для агентов по недвижимости в Дубае",
    metaDescription:
      "Цифровой маркетинг для агентов по недвижимости в Дубае — превращайте объявления и переписки в квалифицированные заявки покупателей через Google, Meta и порталы. Записаться на звонок.",
    h1: "Цифровой маркетинг для агентов по недвижимости в Дубае",
    heroLede:
      "Вам не нужен больший рекламный бюджет. Вам нужен цифровой маркетинг для агентов по недвижимости, который превращает пролистывание в показ, а показ — в подписанную форму, выстроенный вокруг вас, ваших объектов и вашего района Дубая, а не вокруг безликого бренда агентства.",
    ctaLabel: "Получить план по лидам для агента",
    ctaSub: "Бесплатный 20-минутный звонок и понятный план без обязательств для ваших объектов.",
    whatItCovers: {
      heading: "Что на самом деле охватывает цифровой маркетинг для агентов по недвижимости",
      lead: "У маркетинга частного агента одна задача: показать ваши объекты готовым покупателям и не дать «тёплым» остыть. Сделанный правильно, цифровой маркетинг для агентов по недвижимости — это:",
      items: [
        "Кампании по объектам в Google и Meta, нацеленные на покупателей, которые активно ищут ваш район и ценовой сегмент",
        "Личный бренд риелтора — Reels, обзоры и мнения о рынке, благодаря которым вас запоминают",
        "Поддержка порталов и платного трафика, чтобы лиды с Property Finder и Bayut приходили с намерением, а не просто с email",
        "Сопровождение в WhatsApp и CRM, чтобы на каждую заявку отвечали в течение часа — там, где тихо утекает большинство агентских воронок",
      ],
    },
    builtForAgent: {
      heading: "Для агента, а не для агентства",
      body: "Это цифровой маркетинг для риелторов, работающих на своё имя и поток рекомендаций, — другая задача, чем маркетинг башни застройщика или инвентаря агентства. Если вы выстраиваете генерацию лидов для агента по недвижимости в Дубае вокруг своего лица, объектов и круга общения — всё на этой странице для вас.",
    },
    channels: {
      heading: "Каналы, которые приводят агентам Дубая квалифицированных покупателей",
      items: [
        { title: "Instagram и TikTok", desc: "Соцсети для агентов по недвижимости — короткие туры по объектам, посты «продано» и гайды по районам, которые строят доверие до личного сообщения." },
        { title: "Поиск Google", desc: "Кампании по намерению для запросов вида «квартиры на продажу в [районе]», чтобы вы появлялись, как только покупатель начинает искать." },
        { title: "Порталы недвижимости", desc: "Объявления на Property Finder, Bayut и Dubizzle, оптимизированные и продвигаемые, чтобы приводить заявки, а не праздных зевак." },
        { title: "WhatsApp и CRM", desc: "Автоматическое сопровождение, удерживающее шестинедельное решение покупателя «в тепле» без ручной погони за каждым лидом." },
      ],
    },
    pipeline: {
      heading: "Как мы будем растить ваш личный поток клиентов",
      note: "Определить нишу → собрать быструю мобильную страницу объекта и профиль → запустить платный и портальный трафик → прогревать каждую заявку через CRM и WhatsApp → еженедельно оценивать по стоимости квалифицированного лида, а не по лайкам.",
    },
    caseStudies: {
      heading: "Кейсы агентов",
      items: [
        { title: "Shanti Kiaans — люксовый личный бренд в недвижимости", desc: "Построили личный бренд и вели соцсети под ключ — креативное направление, лайфстайл-контент «Жизнь у моря в Дубае», кампании и работу с аудиторией — вырастив доверенную аудиторию, генерирующую заявки, для дубайского бренда недвижимости во главе с агентом." },
        { title: "Dubai Luxury Space — объекты и доход от недвижимости", desc: "Сайт (dubai-luxuryspace.ae) и соцсети вокруг одного посыла — «увеличьте доход вашей недвижимости» — с формами заявок, отделяющими серьёзного покупателя/собственника от посетителя." },
        { title: "Авторитет личного бренда (M Shahid Nawaz)", desc: "Портфолио недвижимости уровня руководителя, спозиционированное под лидерство мнений и привлечение клиентов с высоким доверием, — доказательство того, что в недвижимости Дубая личный бренд агента — это накапливающийся актив." },
        { title: "Контент, который накапливается — с 0 до 1 000 пользователей за 3 месяца", desc: "Блог о недвижимости и рынке вырос с нуля до 1 000 активных пользователей за три месяца на чистом on-page SEO — без рекламы, без покупных ссылок (среднее вовлечение 1 мин 09 с). Тот же контент-движок строит органический поток для агента." },
      ],
    },
    expertise: {
      heading: "Почему стоит работать со специалистом по маркетингу недвижимости в Дубае",
      body: [
        "Шарун Ирфан Хан — performance-маркетолог и бренд-стратег для недвижимости Дубая, руководитель маркетинга в MSN Developments. Пять лет и AED 35M+ выручки, атрибутированной лидам, в Google, Meta и на порталах недвижимости ОАЭ (Property Finder, Bayut, Dubizzle); 20+ сайтов запущено и оптимизировано.",
        "Это агентство цифрового маркетинга для агентов по недвижимости, которое реально продавало недвижимость в Дубае, а не универсал, который догадывается.",
      ],
    },
    faqs: [
      { q: "Что входит в цифровой маркетинг для агентов по недвижимости?", a: "Цифровой маркетинг для агентов по недвижимости включает рекламу объектов в Google и Meta, план контента для личного бренда, оптимизацию порталов (Property Finder, Bayut) и сопровождение в WhatsApp/CRM — полный цикл от первого пролистывания до подписанной формы." },
      { q: "Сколько стоят лиды в недвижимости Дубая?", a: "Зависит от района и ценового сегмента; мы еженедельно оцениваем по стоимости квалифицированного лида — того, кого ваша воронка действительно может закрыть, — а не по числу заполненных форм." },
      { q: "Какая площадка лучше для агента в Дубае?", a: "Instagram строит бренд, Google ловит намерение, а порталы конвертируют — большинству агентов нужен небольшой, хорошо настроенный микс, а не один канал." },
    ],
    closingTitle: "Готовы к более стабильному потоку заявок от покупателей? Запишитесь на бесплатный звонок и получите понятный план цифрового маркетинга для агентов по недвижимости под ваши объекты.",
  },
};

/* -------------------------------------------------------------------------- */
/* PAGE 1 — Real Estate (Companies / Hub)                                      */
/* -------------------------------------------------------------------------- */
/* Rendered at the *existing* URL `/industries/real-estate` (kept). The
 * `industries` entry in `lib/site.ts` still carries this page's `name`,
 * `descriptor`, `heroImage`, `title` and `metaDescription` for the nav, the
 * `/industries` grid, the sitemap and its structured data / OG image; the
 * body below is rendered by `ClusterHubPageBody` in place of the standard
 * `[slug]` industry template. */

export type HubPageContent = {
  h1: string;
  heroLede: string;
  ctaLabel: string;
  ctaSub: string;
  movesUnits: { heading: string; body: string };
  whatsIncluded: ClusterList;
  builtFor: {
    heading: string;
    body: string;
    /** Text before the inline link to the Agents page. */
    agentsLinkPrefix: string;
    /** The anchor text for the Agents-page link. */
    agentsAnchor: string;
    /** Text after the link. */
    agentsLinkSuffix: string;
  };
  whoWeWorkWith: { heading: string; items: string[] };
  caseStudies: { heading: string; items: ClusterCard[] };
  expertise: ClusterExpertise;
  faqs: ClusterFaq[];
  closingTitle: string;
};

export const realEstateHub: { en: HubPageContent; ar?: HubPageContent; ru?: HubPageContent } = {
  en: {
    h1: "Digital Marketing for Real Estate in Dubai",
    heroLede:
      "A launch shouldn't depend on which portal you paid the most that month. Digital marketing for real estate companies in Dubai is a system — brand, website, paid, SEO and CRM built around your launch calendar and your investor pipeline, so budget peaks when the project needs it and every lead is measured against what the sales team can actually close.",
    ctaLabel: "Book a launch strategy call",
    ctaSub: "A clear channel-and-budget plan mapped to your next project, not a generic retainer.",
    movesUnits: {
      heading: "Marketing that moves units — launches & investor lead-gen",
      body: "In Dubai a dozen towers can launch in the same district in the same quarter, all chasing the same investor list. Off-plan launch marketing has to do what a floor plan can't: position the project, structure paid media around the actual launch dates, and capture intent while the buying cycle is still invisible — the weeks of quiet browsing before a single enquiry.",
    },
    whatsIncluded: {
      heading: "What digital marketing for real estate companies includes",
      lead: "As a real estate digital marketing agency for Dubai, we run the full funnel so a project isn't relying on any single channel:",
      items: [
        "Performance marketing for launches — Google & Meta structured around the launch calendar, not a flat monthly spend",
        "SEO & project/area landing pages that rank for the searches a buyer makes before they ever contact an agent",
        "Developer & brokerage brand systems — a positioning and identity a project can carry from first render to handover",
        "CRM & investor lead nurturing so a six-week decision stays warm across a whole sales team",
        "Go-to-market strategy — a channel-and-budget plan built around off-plan launch marketing, not a template",
      ],
    },
    builtFor: {
      heading: "Built for developers, brokerages and property firms — not solo agents",
      body: "This is digital marketing for property developers, multi-agent brokerages and property companies — organisational marketing with launch pressure, long ticket sizes and a team to feed.",
      agentsLinkPrefix: "Marketing your own personal listings? That's ",
      agentsAnchor: "digital marketing for real estate agents",
      agentsLinkSuffix: ".",
    },
    whoWeWorkWith: {
      heading: "Who we work with",
      items: [
        "Real estate developers bringing a new project to market",
        "Multi-agent brokerages managing shared listing inventory",
        "Property management companies marketing managed portfolios — property management digital marketing",
        "Real estate investment & asset-management firms and property consultants",
      ],
    },
    caseStudies: {
      heading: "Company case studies",
      items: [
        { title: "MSN Developments — off-plan launches & investor pipeline", desc: "Brand system, website (msndevelopments.com) and an SEO + lead-gen architecture wired to the investor pipeline for a Dubai boutique developer — brand, web and performance in one system, including a launch feature reporting AED 210M in 60 days." },
        { title: "Ranked #1 in the Dubai property market — pure SEO", desc: "A “DLRC Dubai Area Guide” ranked #1 for its target query in the crowded Dubai property market on on-page SEO alone — no paid ads, no bought backlinks. Proof that buyer-intent content captures demand competitors pay for." },
        { title: "First Key International — B2B brokerage brand", desc: "A market-intelligence campaign series (“world-class systems, structure and market stability”) building trust and lead quality for a Dubai real estate brokerage." },
        { title: "Earthlink Real Estate — market-led demand creative", desc: "Data-led campaigns — rental yields, informed-buyer and market-confidence series, plus exclusive property-showcase invitations — turning market intelligence into qualified investor interest." },
      ],
    },
    expertise: {
      heading: "Why partner with a Dubai real estate marketing specialist",
      body: [
        "Sharoon Irfan Khan — performance marketer & brand strategist for Dubai real estate and Head of Marketing at MSN Developments. Five years and AED 35M+ in lead-attributed revenue, 8+ brand accounts and 20+ websites across Google, Meta and the UAE property portals.",
        "A real estate digital marketing agency partner who has run Dubai launches end to end — brand, web, SEO, paid and CRM — not a generalist learning on your project.",
      ],
    },
    faqs: [
      { q: "What does digital marketing for real estate companies include?", a: "Digital marketing for real estate companies spans launch performance marketing, SEO and project landing pages, brand identity, CRM/investor nurturing and go-to-market strategy — run as one system across the launch calendar." },
      { q: "How can real estate developers generate better-quality leads?", a: "By targeting buyer intent (search + retargeting) instead of raw reach, qualifying on the landing page and enquiry form, and measuring cost per qualified lead against what sales actually closes — so the pipeline fills with investors, not tyre-kickers." },
      { q: "Why does SEO matter for a project that only sells out once?", a: "Because buyers research a community for weeks before enquiring. Ranking for those area and project searches captures demand throughout the launch window — cheaper and more durable than paying for every click — and the authority carries to your next project." },
    ],
    closingTitle:
      "Planning a launch or scaling a brokerage? Book a strategy call for a digital marketing for real estate companies plan mapped to your pipeline.",
  },
  ar: {
    h1: "التسويق الرقمي للعقارات في دبي",
    heroLede:
      "لا ينبغي أن يعتمد الإطلاق على المنصة التي دفعت لها أكثر هذا الشهر. التسويق الرقمي لشركات العقارات في دبي نظام — علامة وموقع وإعلانات مدفوعة وتحسين محركات بحث وإدارة علاقات عملاء مبنية حول جدول إطلاقك وقاعدة مستثمريك، بحيث تتركز الميزانية حين يحتاجها المشروع، ويُقاس كل عميل محتمل بما يستطيع فريق المبيعات إغلاقه فعلاً.",
    ctaLabel: "احجز مكالمة استراتيجية للإطلاق",
    ctaSub: "خطة واضحة للقنوات والميزانية مرتبطة بمشروعك القادم، لا عقد شهري عام.",
    movesUnits: {
      heading: "تسويق يبيع الوحدات — الإطلاقات وتوليد عملاء المستثمرين",
      body: "في دبي قد يُطلق عشرات الأبراج في الحي نفسه خلال الربع نفسه، وكلها تلاحق قائمة المستثمرين ذاتها. على تسويق الإطلاق على المخطط أن يفعل ما لا تستطيعه المخططات المعمارية: يموضع المشروع، ويبني الإعلانات المدفوعة حول تواريخ الإطلاق الفعلية، ويلتقط النية بينما دورة الشراء لا تزال غير مرئية — أسابيع التصفح الصامت قبل أول استفسار.",
    },
    whatsIncluded: {
      heading: "ما الذي يشمله التسويق الرقمي لشركات العقارات",
      lead: "بصفتنا وكالة تسويق رقمي للعقارات في دبي، ندير مسار التحويل الكامل بحيث لا يعتمد المشروع على قناة واحدة:",
      items: [
        "تسويق أدائي للإطلاقات — جوجل وميتا مبنيان حول جدول الإطلاق، لا حول إنفاق شهري ثابت",
        "تحسين محركات البحث وصفحات هبوط للمشروع/المنطقة تُرتَّب في عمليات البحث التي يجريها المشتري قبل التواصل مع أي وكيل",
        "أنظمة هوية للمطورين والوسطاء — تموضع وهوية يواكبان المشروع من أول تصميم افتراضي حتى التسليم",
        "إدارة علاقات العملاء ورعاية عملاء المستثمرين بحيث يبقى قرار الستة أسابيع دافئاً عبر فريق مبيعات كامل",
        "استراتيجية الدخول إلى السوق — خطة قنوات وميزانية مبنية حول تسويق الإطلاق على المخطط، لا نموذجاً جاهزاً",
      ],
    },
    builtFor: {
      heading: "مصمم للمطورين والوسطاء وشركات العقارات — لا للوكلاء المستقلين",
      body: "هذا تسويق رقمي للمطورين العقاريين والوسطاء متعددي الوكلاء وشركات العقارات — تسويق مؤسسي بضغط إطلاقات وقيم صفقات كبيرة وفريق بحاجة إلى عملاء.",
      agentsLinkPrefix: "تسوّق عروضك الشخصية بنفسك؟ ذلك هو ",
      agentsAnchor: "التسويق الرقمي لوكلاء العقارات",
      agentsLinkSuffix: ".",
    },
    whoWeWorkWith: {
      heading: "من نعمل معهم",
      items: [
        "مطورون عقاريون يطلقون مشروعاً جديداً إلى السوق",
        "وسطاء متعددو الوكلاء يديرون مخزوناً مشتركاً من العروض",
        "شركات إدارة الممتلكات التي تسوّق محافظ مُدارة — التسويق الرقمي لإدارة الممتلكات",
        "شركات الاستثمار وإدارة الأصول العقارية ومستشارو العقارات",
      ],
    },
    caseStudies: {
      heading: "دراسات حالة للشركات",
      items: [
        { title: "MSN Developments — إطلاقات على المخطط وقاعدة مستثمرين", desc: "نظام علامة وموقع (msndevelopments.com) وبنية تحسين محركات بحث وتوليد عملاء مرتبطة بقاعدة المستثمرين لمطوّر دبيّ بوتيك — علامة وموقع وأداء في نظام واحد، بما في ذلك حملة إطلاق سجّلت 210 مليون درهم في 60 يوماً." },
        { title: "الأول في سوق عقارات دبي — تحسين محركات بحث خالص", desc: "«دليل منطقة DLRC دبي» تصدّر المرتبة الأولى لاستعلامه المستهدف في سوق عقارات دبي المزدحم بتحسين محركات البحث الصفحي وحده — بلا إعلانات مدفوعة، بلا روابط مشتراة. دليل على أن محتوى نية الشراء يلتقط طلباً يدفع المنافسون مقابله." },
        { title: "First Key International — علامة وساطة B2B", desc: "سلسلة حملات ذكاء سوقي («أنظمة وهيكلة واستقرار سوقي عالمية المستوى») تبني الثقة وجودة العملاء لوسيط عقاري في دبي." },
        { title: "Earthlink Real Estate — إبداع طلب مدفوع بالسوق", desc: "حملات قائمة على البيانات — عوائد الإيجار، وسلاسل المشتري المطّلع وثقة السوق، إضافة إلى دعوات حصرية لعرض العقارات — تحوّل ذكاء السوق إلى اهتمام مستثمرين مؤهل." },
      ],
    },
    expertise: {
      heading: "لماذا الشراكة مع مختص تسويق عقاري في دبي",
      body: [
        "شارون عرفان خان — مسوّقة أداء واستراتيجية علامة لعقارات دبي ورئيسة التسويق في MSN Developments. خمس سنوات و+35 مليون درهم من الإيرادات المنسوبة للعملاء، و+8 حسابات علامات و+20 موقعاً عبر جوجل وميتا ومنصات دبي العقارية.",
        "شريك وكالة تسويق رقمي للعقارات أدار إطلاقات دبي من طرف إلى طرف — علامة وموقع وتحسين محركات بحث وإعلانات وإدارة علاقات عملاء — لا عامّة يتعلم على مشروعك.",
      ],
    },
    faqs: [
      { q: "ماذا يشمل التسويق الرقمي لشركات العقارات؟", a: "يمتد التسويق الرقمي لشركات العقارات ليشمل تسويق أداء الإطلاقات، وتحسين محركات البحث وصفحات المشاريع، وهوية العلامة، ورعاية عملاء المستثمرين عبر CRM، واستراتيجية الدخول إلى السوق — يُدار كنظام واحد عبر جدول الإطلاق." },
      { q: "كيف يمكن للمطورين العقاريين توليد عملاء أعلى جودة؟", a: "باستهداف نية المشتري (البحث + إعادة الاستهداف) بدلاً من الوصول الواسع، والتأهيل على صفحة الهبوط ونموذج الاستفسار، وقياس تكلفة العميل المؤهل مقابل ما تغلقه المبيعات فعلاً — بحيث يمتلئ خط الأنابيب بالمستثمرين لا بغير الجادين." },
      { q: "لماذا يهم تحسين محركات البحث لمشروع يُباع مرة واحدة؟", a: "لأن المشترين يبحثون عن المجتمع أسابيع قبل الاستفسار. الترتيب في عمليات بحث المنطقة والمشروع يلتقط الطلب طوال نافذة الإطلاق — أرخص وأكثر ديمومة من الدفع مقابل كل نقرة — وتنتقل السلطة إلى مشروعك التالي." },
    ],
    closingTitle:
      "تخطط لإطلاق أو توسيع وكالة؟ احجز مكالمة استراتيجية للحصول على خطة تسويق رقمي لشركات العقارات مرتبطة بقاعدة عملائك.",
  },
  ru: {
    h1: "Цифровой маркетинг для недвижимости в Дубае",
    heroLede:
      "Запуск не должен зависеть от того, на какой портал вы в этом месяце потратили больше всего. Цифровой маркетинг для компаний в сфере недвижимости в Дубае — это система: бренд, сайт, платный трафик, SEO и CRM, выстроенные вокруг календаря запуска и вашей воронки инвесторов, так что бюджет растёт, когда это нужно проекту, а каждый лид оценивается по тому, что отдел продаж действительно может закрыть.",
    ctaLabel: "Записаться на стратегический звонок по запуску",
    ctaSub: "Понятный план по каналам и бюджету под ваш следующий проект, а не типовой ретейнер.",
    movesUnits: {
      heading: "Маркетинг, который продаёт лоты — запуски и генерация лидов-инвесторов",
      body: "В Дубае десяток башен может выйти на рынок в одном районе в один квартал, и все охотятся за одним списком инвесторов. Маркетинг запуска на этапе строительства должен делать то, что не под силу планировке: позиционировать проект, строить платный трафик вокруг реальных дат запуска и ловить намерение, пока цикл покупки ещё невидим — недели тихого просмотра до первого обращения.",
    },
    whatsIncluded: {
      heading: "Что входит в цифровой маркетинг для компаний в сфере недвижимости",
      lead: "Как агентство цифрового маркетинга для недвижимости в Дубае, мы ведём всю воронку, чтобы проект не зависел ни от одного канала:",
      items: [
        "Performance-маркетинг для запусков — Google и Meta вокруг календаря запуска, а не равномерного месячного бюджета",
        "SEO и посадочные страницы проекта/района, ранжирующиеся по запросам, которые покупатель делает до обращения к агенту",
        "Бренд-системы для застройщиков и агентств — позиционирование и айдентика, которые проект несёт от первого рендера до передачи ключей",
        "CRM и прогрев лидов-инвесторов, чтобы шестинедельное решение оставалось «тёплым» на весь отдел продаж",
        "Стратегия вывода на рынок — план по каналам и бюджету вокруг маркетинга запуска на этапе строительства, а не шаблон",
      ],
    },
    builtFor: {
      heading: "Для застройщиков, агентств и профильных компаний — не для частных агентов",
      body: "Это цифровой маркетинг для застройщиков, брокерских агентств с несколькими агентами и профильных компаний — маркетинг организации с давлением запусков, крупными чеками и командой, которую нужно загружать.",
      agentsLinkPrefix: "Продвигаете собственные объекты как частный агент? Это ",
      agentsAnchor: "цифровой маркетинг для агентов по недвижимости",
      agentsLinkSuffix: ".",
    },
    whoWeWorkWith: {
      heading: "С кем мы работаем",
      items: [
        "Застройщики, выводящие новый проект на рынок",
        "Брокерские агентства с несколькими агентами и общим пулом объектов",
        "Управляющие компании, продвигающие портфели в управлении, — цифровой маркетинг для управления недвижимостью",
        "Инвестиционные и управляющие активами компании в недвижимости и консультанты по недвижимости",
      ],
    },
    caseStudies: {
      heading: "Кейсы компаний",
      items: [
        { title: "MSN Developments — запуски на этапе строительства и воронка инвесторов", desc: "Бренд-система, сайт (msndevelopments.com) и архитектура SEO + лидогенерации, связанная с воронкой инвесторов, для бутикового застройщика в Дубае — бренд, сайт и performance в одной системе, включая запуск с показателем AED 210M за 60 дней." },
        { title: "Первое место на рынке недвижимости Дубая — чистое SEO", desc: "«DLRC Dubai Area Guide» вышел на первое место по целевому запросу на переполненном рынке недвижимости Дубая только за счёт on-page SEO — без платной рекламы, без покупных ссылок. Доказательство того, что контент под намерение покупателя ловит спрос, за который конкуренты платят." },
        { title: "First Key International — B2B-бренд агентства", desc: "Серия кампаний с рыночной аналитикой («системы, структура и рыночная стабильность мирового уровня»), выстраивающая доверие и качество лидов для брокерского агентства в Дубае." },
        { title: "Earthlink Real Estate — креатив спроса на основе рынка", desc: "Кампании на данных — доходность аренды, серии для информированного покупателя и уверенности в рынке, плюс эксклюзивные приглашения на показы — превращают рыночную аналитику в квалифицированный интерес инвесторов." },
      ],
    },
    expertise: {
      heading: "Почему партнёрство со специалистом по маркетингу недвижимости в Дубае",
      body: [
        "Шарун Ирфан Хан — performance-маркетолог и бренд-стратег для недвижимости Дубая и руководитель маркетинга в MSN Developments. Пять лет и AED 35M+ выручки, атрибутированной лидам, 8+ бренд-аккаунтов и 20+ сайтов в Google, Meta и на порталах недвижимости ОАЭ.",
        "Партнёр-агентство цифрового маркетинга для недвижимости, которое вело запуски в Дубае от начала до конца — бренд, сайт, SEO, платный трафик и CRM, — а не универсал, который учится на вашем проекте.",
      ],
    },
    faqs: [
      { q: "Что входит в цифровой маркетинг для компаний в сфере недвижимости?", a: "Цифровой маркетинг для компаний в сфере недвижимости охватывает performance-маркетинг запусков, SEO и посадочные страницы проектов, айдентику бренда, прогрев инвесторов через CRM и стратегию вывода на рынок — как единая система на весь календарь запуска." },
      { q: "Как застройщикам получать более качественные лиды?", a: "Через таргетинг на намерение покупателя (поиск + ретаргетинг) вместо широкого охвата, квалификацию на посадочной странице и в форме заявки и оценку стоимости квалифицированного лида относительно того, что реально закрывают продажи, — чтобы воронка наполнялась инвесторами, а не праздными." },
      { q: "Зачем SEO проекту, который распродаётся один раз?", a: "Потому что покупатели неделями изучают район до обращения. Ранжирование по запросам района и проекта ловит спрос на всём окне запуска — дешевле и надёжнее, чем платить за каждый клик, — и накопленный авторитет переходит к следующему запуску." },
    ],
    closingTitle:
      "Планируете запуск или масштабируете агентство? Запишитесь на стратегический звонок за планом цифрового маркетинга для компаний в сфере недвижимости под вашу воронку.",
  },
};

export function hubPageContent(locale: Locale): HubPageContent {
  return (locale === "ar" ? realEstateHub.ar : locale === "ru" ? realEstateHub.ru : undefined) ?? realEstateHub.en;
}

/* -------------------------------------------------------------------------- */
/* PAGES 3–8 — the six sub-service pages                                       */
/* -------------------------------------------------------------------------- */

export const servicePages: ServicePage[] = [
  /* PAGE 3 — SEO ---------------------------------------------------------- */
  {
    slug: "real-estate-seo-dubai",
    related: ["real-estate-ppc-dubai", "real-estate-content-marketing-dubai", "real-estate-web-development-dubai"],
    en: {
      label: "Real Estate SEO",
      metaTitle: "Real Estate SEO Dubai | Rank for Property Searches",
      metaDescription:
        "Real estate SEO in Dubai that ranks your projects, area guides and listings before buyers ever call — on-page SEO for developers, brokerages and agents.",
      h1: "Real Estate SEO in Dubai",
      heroLede:
        "Buyers research a Dubai community for weeks before they call anyone. Real estate SEO in Dubai puts your projects, area guides and listings at the top of those searches — so demand you'd otherwise pay for on every click starts arriving for free.",
      ctaLabel: "Get my real estate SEO plan",
      ctaSub: "A free site & keyword audit and a clear ranking plan for your market.",
      whatsIncluded: {
        heading: "What SEO for real estate in Dubai includes",
        lead: "Full-funnel real estate SEO Dubai that turns search intent into enquiries:",
        items: [
          "Keyword & area mapping — the communities, buildings and price bands your buyers actually search",
          "Project and area landing pages built to rank for buyer-intent queries",
          "Technical SEO — speed, mobile, indexing and schema for listings",
          "Portal and listing optimisation (Property Finder, Bayut, Dubizzle) alongside your own site",
          "Local SEO — Google Business Profile, maps and reviews",
          "Content that ranks — area guides and market insight (see Content Marketing)",
        ],
      },
      forCompanies: {
        heading: "SEO for property developers & brokerages",
        lead: "For companies, SEO compounds across a whole portfolio, not one campaign:",
        items: [
          "Off-plan SEO and project pages that rank through the entire launch window",
          "Area-guide authority that positions the developer as the market expert",
          "Domain authority that carries from one project to the next — the reason SEO still pays even when a project sells out once",
          "Organic pipeline wired to CRM so ranked traffic becomes tracked, investor-grade leads",
        ],
      },
      forAgents: {
        heading: "SEO for real estate agents",
        lead: "For an individual agent, SEO builds a pipeline that isn't rented:",
        items: [
          "Community and “[agent name] Dubai” pages that rank for your patch",
          "Google Business Profile and review SEO so you show up in the map pack",
          "Buyer-FAQ and neighbourhood content that earns trust before the DM",
        ],
      },
      caseStudies: {
        heading: "Case studies",
        items: [
          { title: "Ranked #1 in the Dubai property market", desc: "A “DLRC Dubai Area Guide” ranked #1 for its target query in the crowded Dubai property market on on-page SEO alone — no paid ads, no bought backlinks." },
          { title: "0 → 1,000 users in 3 months", desc: "A property/market blog taken from zero to 1,000 active users in three months on pure on-page SEO (1m 09s average engagement) — organic growth with no ad spend." },
          { title: "On-page framework, proven cross-niche", desc: "The same on-page system delivered 626 clicks, 12.1K impressions and a 7.5 average position for a live store in under three months — a repeatable method." },
        ],
      },
      expertise: {
        heading: "Why a Dubai real estate SEO company — not a generalist",
        body: [
          "Sharoon Irfan Khan — performance & SEO specialist for Dubai real estate, Head of Marketing at MSN Developments. Ranked a Dubai area guide #1 in a crowded property market, grew a blog 0→1,000 users in three months (no ads, no backlinks), and runs SEO across live developer sites.",
          "Certified in SEO (UC Davis) and working daily in Ahrefs, Semrush, Search Console and Screaming Frog.",
        ],
      },
      faqs: [
        { q: "How long does real estate SEO take in Dubai?", a: "Real estate SEO in Dubai typically shows movement on long-tail area/project terms in 2–3 months and compounds from there; competitive head terms take longer. Buyer-intent content can rank within weeks." },
        { q: "Why does SEO matter for a project that only sells out once?", a: "Because buyers research the area for weeks before enquiring, and the domain authority you build carries to your next launch — ranking captures demand throughout the window, cheaper and more durably than paid." },
        { q: "Can SEO help an individual agent?", a: "Yes — SEO for real estate agents focuses on your community pages, Google Business Profile and reviews so you appear in local and map results for your patch." },
      ],
      closingTitle: "Want to rank for the searches your buyers make? Book a free audit and get a real estate SEO Dubai plan for your market.",
    },
    ar: {
      label: "تحسين محركات البحث للعقارات",
      metaTitle: "تحسين محركات البحث للعقارات في دبي | تصدّر عمليات البحث العقاري",
      metaDescription:
        "تحسين محركات البحث للعقارات في دبي يرتّب مشاريعك وأدلة مناطقك وعروضك قبل أن يتصل المشتري — تحسين صفحي للمطورين والوسطاء والوكلاء.",
      h1: "تحسين محركات البحث للعقارات في دبي",
      heroLede:
        "يبحث المشترون عن مجتمع في دبي أسابيع قبل أن يتصلوا بأحد. تحسين محركات البحث للعقارات في دبي يضع مشاريعك وأدلة مناطقك وعروضك في صدارة تلك النتائج — فيبدأ الطلب الذي كنت ستدفع مقابله في كل نقرة بالوصول مجاناً.",
      ctaLabel: "احصل على خطة تحسين محركات البحث",
      ctaSub: "تدقيق مجاني للموقع والكلمات المفتاحية وخطة ترتيب واضحة لسوقك.",
      whatsIncluded: {
        heading: "ما الذي يشمله تحسين محركات البحث للعقارات في دبي",
        lead: "تحسين محركات بحث كامل المسار للعقارات في دبي يحوّل نية البحث إلى استفسارات:",
        items: [
          "رسم الكلمات المفتاحية والمناطق — المجتمعات والمباني والشرائح السعرية التي يبحث عنها مشتروك فعلاً",
          "صفحات هبوط للمشروع والمنطقة مبنية للترتيب في استعلامات نية الشراء",
          "تحسين تقني — السرعة، والهاتف، والفهرسة، والبيانات المنظمة للعروض",
          "تحسين المنصات والعروض (Property Finder وBayut وDubizzle) إلى جانب موقعك",
          "تحسين محلي — ملف الأعمال في جوجل والخرائط والتقييمات",
          "محتوى يُرتَّب — أدلة المناطق ورؤى السوق (انظر تسويق المحتوى)",
        ],
      },
      forCompanies: {
        heading: "تحسين محركات البحث للمطورين والوسطاء",
        lead: "للشركات، يتراكم تحسين محركات البحث عبر محفظة كاملة لا حملة واحدة:",
        items: [
          "تحسين محركات بحث للمشاريع على المخطط وصفحات مشاريع تُرتَّب طوال نافذة الإطلاق",
          "سلطة أدلة المناطق التي تموضع المطوّر كخبير السوق",
          "سلطة نطاق تنتقل من مشروع إلى آخر — سبب استمرار جدوى تحسين محركات البحث حتى حين يُباع المشروع مرة واحدة",
          "خط عملاء عضوي مرتبط بـ CRM بحيث تصبح الزيارات المرتّبة عملاء مستثمرين متتبَّعين",
        ],
      },
      forAgents: {
        heading: "تحسين محركات البحث لوكلاء العقارات",
        lead: "للوكيل الفردي، يبني تحسين محركات البحث قاعدة عملاء غير مستأجَرة:",
        items: [
          "صفحات مجتمع وصفحات «[اسم الوكيل] دبي» تُرتَّب لمنطقتك",
          "تحسين ملف الأعمال في جوجل والتقييمات بحيث تظهر في حزمة الخرائط",
          "محتوى أسئلة المشتري والأحياء الذي يكسب الثقة قبل الرسالة الخاصة",
        ],
      },
      caseStudies: {
        heading: "دراسات حالة",
        items: [
          { title: "الأول في سوق عقارات دبي", desc: "«دليل منطقة DLRC دبي» تصدّر المرتبة الأولى لاستعلامه المستهدف في سوق عقارات دبي المزدحم بتحسين محركات البحث الصفحي وحده — بلا إعلانات مدفوعة، بلا روابط مشتراة." },
          { title: "من صفر إلى 1,000 مستخدم في 3 أشهر", desc: "مدونة عقارية/سوقية انتقلت من صفر إلى 1,000 مستخدم نشط خلال ثلاثة أشهر على تحسين محركات البحث الصفحي الخالص (متوسط تفاعل 1 دقيقة و09 ثوانٍ) — نمو عضوي بلا إنفاق إعلاني." },
          { title: "إطار صفحي مثبت عبر مجالات متعددة", desc: "النظام الصفحي نفسه حقّق 626 نقرة و12.1 ألف ظهور ومتوسط ترتيب 7.5 لمتجر فعّال خلال أقل من ثلاثة أشهر — منهجية قابلة للتكرار." },
        ],
      },
      expertise: {
        heading: "لماذا شركة تحسين محركات بحث عقارية في دبي — لا عامّة",
        body: [
          "شارون عرفان خان — مختصة أداء وتحسين محركات بحث لعقارات دبي، ورئيسة التسويق في MSN Developments. رتّبت دليل منطقة دبيّ في المرتبة الأولى في سوق عقاري مزدحم، ونمّت مدونة من صفر إلى 1,000 مستخدم في ثلاثة أشهر (بلا إعلانات، بلا روابط)، وتدير تحسين محركات البحث عبر مواقع مطوّرين فعّالة.",
          "معتمَدة في تحسين محركات البحث (UC Davis) وتعمل يومياً في Ahrefs وSemrush وSearch Console وScreaming Frog.",
        ],
      },
      faqs: [
        { q: "كم يستغرق تحسين محركات البحث للعقارات في دبي؟", a: "عادةً يُظهر تحسين محركات البحث للعقارات في دبي حركة على عبارات المنطقة/المشروع طويلة الذيل خلال شهرين إلى ثلاثة ثم يتراكم؛ العبارات الرئيسية التنافسية تستغرق أطول. ومحتوى نية الشراء قد يُرتَّب خلال أسابيع." },
        { q: "لماذا يهم تحسين محركات البحث لمشروع يُباع مرة واحدة؟", a: "لأن المشترين يبحثون عن المنطقة أسابيع قبل الاستفسار، ولأن سلطة النطاق التي تبنيها تنتقل إلى إطلاقك التالي — الترتيب يلتقط الطلب طوال النافذة، أرخص وأكثر ديمومة من المدفوع." },
        { q: "هل يساعد تحسين محركات البحث الوكيل الفردي؟", a: "نعم — يركّز تحسين محركات البحث لوكلاء العقارات على صفحات مجتمعك وملف الأعمال في جوجل والتقييمات بحيث تظهر في النتائج المحلية ونتائج الخرائط لمنطقتك." },
      ],
      closingTitle: "تريد الترتيب في عمليات البحث التي يجريها مشتروك؟ احجز تدقيقاً مجانياً واحصل على خطة تحسين محركات بحث عقارية في دبي لسوقك.",
    },
    ru: {
      label: "SEO для недвижимости",
      metaTitle: "SEO для недвижимости в Дубае | Ранжирование по запросам о недвижимости",
      metaDescription:
        "SEO для недвижимости в Дубае, которое выводит ваши проекты, гайды по районам и объявления наверх до того, как покупатели позвонят, — on-page SEO для застройщиков, агентств и агентов.",
      h1: "SEO для недвижимости в Дубае",
      heroLede:
        "Покупатели неделями изучают район Дубая, прежде чем кому-то позвонить. SEO для недвижимости в Дубае выводит ваши проекты, гайды по районам и объявления в топ этих запросов — и спрос, за который вы иначе платили бы за каждый клик, начинает приходить бесплатно.",
      ctaLabel: "Получить план SEO для недвижимости",
      ctaSub: "Бесплатный аудит сайта и семантики и понятный план по ранжированию для вашего рынка.",
      whatsIncluded: {
        heading: "Что входит в SEO для недвижимости в Дубае",
        lead: "SEO для недвижимости в Дубае на всю воронку, которое превращает поисковое намерение в заявки:",
        items: [
          "Карта запросов и районов — сообщества, здания и ценовые сегменты, которые ваши покупатели реально ищут",
          "Посадочные страницы проекта и района под запросы с намерением покупки",
          "Техническое SEO — скорость, мобильная версия, индексация и schema для объявлений",
          "Оптимизация порталов и объявлений (Property Finder, Bayut, Dubizzle) вместе с вашим сайтом",
          "Локальное SEO — Google Business Profile, карты и отзывы",
          "Контент, который ранжируется, — гайды по районам и аналитика рынка (см. контент-маркетинг)",
        ],
      },
      forCompanies: {
        heading: "SEO для застройщиков и агентств",
        lead: "Для компаний SEO накапливается по всему портфелю, а не по одной кампании:",
        items: [
          "SEO для проектов на этапе строительства и страницы проектов, ранжирующиеся всё окно запуска",
          "Авторитет гайдов по районам, который делает застройщика экспертом рынка",
          "Авторитет домена, переходящий от проекта к проекту, — причина, почему SEO окупается даже при разовой распродаже проекта",
          "Органическая воронка, связанная с CRM, чтобы ранжируемый трафик становился отслеживаемыми лидами инвесторского уровня",
        ],
      },
      forAgents: {
        heading: "SEO для агентов по недвижимости",
        lead: "Для отдельного агента SEO строит поток клиентов, который не арендуется:",
        items: [
          "Страницы районов и «[имя агента] Дубай», ранжирующиеся по вашему участку",
          "SEO для Google Business Profile и отзывов, чтобы вы попадали в блок карт",
          "Контент с ответами покупателям и по районам, который завоёвывает доверие до личного сообщения",
        ],
      },
      caseStudies: {
        heading: "Кейсы",
        items: [
          { title: "Первое место на рынке недвижимости Дубая", desc: "«DLRC Dubai Area Guide» вышел на первое место по целевому запросу на переполненном рынке недвижимости Дубая только за счёт on-page SEO — без платной рекламы, без покупных ссылок." },
          { title: "С 0 до 1 000 пользователей за 3 месяца", desc: "Блог о недвижимости и рынке вырос с нуля до 1 000 активных пользователей за три месяца на чистом on-page SEO (среднее вовлечение 1 мин 09 с) — органический рост без рекламного бюджета." },
          { title: "On-page-фреймворк, проверенный в разных нишах", desc: "Та же on-page-система дала 626 кликов, 12,1K показов и среднюю позицию 7,5 для действующего магазина менее чем за три месяца — воспроизводимый метод." },
        ],
      },
      expertise: {
        heading: "Почему SEO-компания по недвижимости в Дубае, а не универсал",
        body: [
          "Шарун Ирфан Хан — специалист по performance и SEO для недвижимости Дубая, руководитель маркетинга в MSN Developments. Вывела гайд по району Дубая на первое место на переполненном рынке, вырастила блог с 0 до 1 000 пользователей за три месяца (без рекламы, без ссылок) и ведёт SEO на действующих сайтах застройщиков.",
          "Сертификат по SEO (UC Davis); ежедневная работа в Ahrefs, Semrush, Search Console и Screaming Frog.",
        ],
      },
      faqs: [
        { q: "Сколько времени занимает SEO для недвижимости в Дубае?", a: "SEO для недвижимости в Дубае обычно показывает движение по низкочастотным запросам района/проекта за 2–3 месяца и дальше накапливается; конкурентные высокочастотные запросы занимают дольше. Контент под намерение покупателя может ранжироваться за недели." },
        { q: "Зачем SEO проекту, который распродаётся один раз?", a: "Потому что покупатели неделями изучают район до обращения, а накопленный авторитет домена переходит к следующему запуску — ранжирование ловит спрос всё окно, дешевле и надёжнее платного." },
        { q: "Помогает ли SEO отдельному агенту?", a: "Да — SEO для агентов по недвижимости сосредоточено на страницах ваших районов, Google Business Profile и отзывах, чтобы вы появлялись в локальной выдаче и на картах по вашему участку." },
      ],
      closingTitle: "Хотите ранжироваться по запросам ваших покупателей? Запишитесь на бесплатный аудит и получите план SEO для недвижимости в Дубае под ваш рынок.",
    },
  },

  /* PAGE 4 — PPC --------------------------------------------------------- */
  {
    slug: "real-estate-ppc-dubai",
    related: ["real-estate-seo-dubai", "real-estate-social-media-marketing-dubai", "real-estate-web-development-dubai"],
    en: {
      label: "Real Estate PPC",
      metaTitle: "Real Estate PPC Dubai | Google & Meta Lead Ads",
      metaDescription:
        "Real estate PPC in Dubai — Google and Meta ad campaigns built around your launch calendar and measured on cost per qualified lead, not clicks. Book a call.",
      h1: "Real Estate PPC in Dubai",
      heroLede:
        "A launch shouldn't hinge on which portal you overspent on this month. Real estate PPC in Dubai structures Google and Meta around your launch calendar and measures every dirham on cost per qualified lead — the enquiries your sales team can actually close.",
      ctaLabel: "Get my real estate PPC plan",
      ctaSub: "A channel-and-budget plan mapped to your launch, and a cost-per-qualified-lead target.",
      whatsIncluded: {
        heading: "What Google Ads for real estate in Dubai & paid social cover",
        lead: "Full-funnel real estate PPC Dubai across every channel a buyer touches:",
        items: [
          "Google Search & Performance Max for high-intent property queries",
          "Meta ads for real estate — lead and listing campaigns with tight audience control",
          "Property portal ads (Property Finder, Bayut, Dubizzle) integrated with paid",
          "YouTube & TikTok for launch awareness",
          "Conversion-built landing pages and full tracking so leads are attributed, not guessed",
          "Budget pacing tied to the launch calendar — spend peaks when the project needs it",
        ],
      },
      forCompanies: {
        heading: "PPC for real estate developers & brokerages",
        lead: "For companies, paid media is a launch weapon, not a monthly drip:",
        items: [
          "Off-plan launch ads structured around actual launch dates",
          "Investor lead-gen with qualification on the form, not just reach",
          "Multi-project and multi-agent account structures",
          "Reporting on cost per qualified lead and AED pipeline — not impressions",
        ],
      },
      forAgents: {
        heading: "PPC for real estate agents",
        lead: "For an individual agent, PPC has to be efficient on a small budget:",
        items: [
          "Listing and community campaigns that pull buyers actively searching",
          "Retargeting so browsers come back, and click-to-WhatsApp for instant replies",
          "Tight cost control — every lead measured against what you can close",
        ],
      },
      caseStudies: {
        heading: "Case studies",
        items: [
          { title: "AED 35M+ in lead-attributed revenue", desc: "Across five years of Google and Meta performance for Dubai real estate, campaigns generated AED 35M+ in lead-attributed revenue — measured on pipeline, not impressions, across 8+ ad accounts." },
          { title: "MSN Developments — off-plan launch performance", desc: "Paid media structured around off-plan launch calendars and wired to the investor pipeline, including a launch feature reporting AED 210M in 60 days." },
          { title: "Portal-integrated lead-gen", desc: "Google and Meta run alongside Property Finder, Bayut and Dubizzle so paid and portal demand are captured together, not in silos." },
        ],
      },
      expertise: {
        heading: "Why a Dubai real estate PPC agency that has sold property",
        body: [
          "Sharoon Irfan Khan — performance marketer for Dubai real estate, Head of Marketing at MSN Developments. AED 35M+ in lead-attributed revenue across Google, Meta and the UAE property portals, 8+ ad accounts managed.",
          "Certified in Google Ads and Meta advertising — buying media for Dubai launches daily, not in theory.",
        ],
      },
      faqs: [
        { q: "How much should a Dubai developer budget for PPC?", a: "Enough to own the launch window at a target cost per qualified lead — real estate PPC in Dubai paces budget to the calendar rather than a flat monthly figure, so spend concentrates when demand is highest." },
        { q: "What is a cost per qualified lead in Dubai real estate?", a: "It varies by community, price band and channel; we set a target against what your sales team closes and optimise weekly toward it — not raw form fills." },
        { q: "Google or Meta for real estate?", a: "Both: Google captures active-search intent, Meta ads for real estate builds demand and retargets. Most launches need a measured mix plus the portals." },
      ],
      closingTitle: "Planning a launch or scaling agent leads? Book a call for a real estate PPC Dubai plan built around your pipeline.",
    },
    ar: {
      label: "إعلانات الدفع لكل نقرة للعقارات",
      metaTitle: "إعلانات الدفع لكل نقرة للعقارات في دبي | إعلانات جوجل وميتا للعملاء",
      metaDescription:
        "إعلانات الدفع لكل نقرة للعقارات في دبي — حملات جوجل وميتا مبنية حول جدول إطلاقك ومقاسة على تكلفة العميل المؤهل، لا النقرات. احجز مكالمة.",
      h1: "إعلانات الدفع لكل نقرة للعقارات في دبي",
      heroLede:
        "لا ينبغي أن يتوقف الإطلاق على المنصة التي أفرطت في الإنفاق عليها هذا الشهر. إعلانات الدفع لكل نقرة للعقارات في دبي تبني جوجل وميتا حول جدول إطلاقك وتقيس كل درهم على تكلفة العميل المؤهل — الاستفسارات التي يستطيع فريق مبيعاتك إغلاقها فعلاً.",
      ctaLabel: "احصل على خطة إعلانات الدفع لكل نقرة",
      ctaSub: "خطة قنوات وميزانية مرتبطة بإطلاقك، وهدف لتكلفة العميل المؤهل.",
      whatsIncluded: {
        heading: "ما الذي تغطيه إعلانات جوجل للعقارات في دبي والإعلانات الاجتماعية المدفوعة",
        lead: "إعلانات دفع لكل نقرة كاملة المسار للعقارات في دبي عبر كل قناة يلمسها المشتري:",
        items: [
          "بحث جوجل وPerformance Max لاستعلامات العقارات عالية النية",
          "إعلانات ميتا للعقارات — حملات عملاء وعروض بضبط جمهور دقيق",
          "إعلانات المنصات العقارية (Property Finder وBayut وDubizzle) مدمجة مع المدفوع",
          "يوتيوب وتيك توك للوعي بالإطلاق",
          "صفحات هبوط مبنية للتحويل وتتبّع كامل بحيث تُنسَب العملاء لا يُخمَّنون",
          "توقيت الميزانية مرتبط بجدول الإطلاق — يتركز الإنفاق حين يحتاجه المشروع",
        ],
      },
      forCompanies: {
        heading: "إعلانات الدفع لكل نقرة للمطورين والوسطاء",
        lead: "للشركات، الإعلانات المدفوعة سلاح إطلاق لا تنقيط شهري:",
        items: [
          "إعلانات إطلاق على المخطط مبنية حول تواريخ الإطلاق الفعلية",
          "توليد عملاء مستثمرين مع تأهيل على النموذج، لا مجرد وصول",
          "هياكل حسابات متعددة المشاريع ومتعددة الوكلاء",
          "تقارير على تكلفة العميل المؤهل وخط الأنابيب بالدرهم — لا الظهور",
        ],
      },
      forAgents: {
        heading: "إعلانات الدفع لكل نقرة لوكلاء العقارات",
        lead: "للوكيل الفردي، يجب أن تكون الإعلانات المدفوعة فعّالة على ميزانية صغيرة:",
        items: [
          "حملات عروض ومجتمعات تجذب المشترين الباحثين فعلياً",
          "إعادة استهداف تعيد المتصفّحين، ونقرة إلى واتساب للردود الفورية",
          "ضبط تكلفة محكم — كل عميل مقاس مقابل ما تستطيع إغلاقه",
        ],
      },
      caseStudies: {
        heading: "دراسات حالة",
        items: [
          { title: "+35 مليون درهم من الإيرادات المنسوبة للعملاء", desc: "عبر خمس سنوات من أداء جوجل وميتا لعقارات دبي، ولّدت الحملات أكثر من 35 مليون درهم من الإيرادات المنسوبة للعملاء — مقاسة على خط الأنابيب لا الظهور، عبر أكثر من 8 حسابات إعلانية." },
          { title: "MSN Developments — أداء إطلاق على المخطط", desc: "إعلانات مدفوعة مبنية حول جداول الإطلاق على المخطط ومرتبطة بقاعدة المستثمرين، بما في ذلك حملة إطلاق سجّلت 210 مليون درهم في 60 يوماً." },
          { title: "توليد عملاء مدمج مع المنصات", desc: "جوجل وميتا يعملان إلى جانب Property Finder وBayut وDubizzle بحيث يُلتقَط طلب المدفوع والمنصات معاً، لا في صوامع منفصلة." },
        ],
      },
      expertise: {
        heading: "لماذا وكالة إعلانات دفع لكل نقرة عقارية في دبي باعت عقارات",
        body: [
          "شارون عرفان خان — مسوّقة أداء لعقارات دبي، ورئيسة التسويق في MSN Developments. أكثر من 35 مليون درهم من الإيرادات المنسوبة للعملاء عبر جوجل وميتا ومنصات دبي العقارية، وأكثر من 8 حسابات إعلانية مُدارة.",
          "معتمَدة في إعلانات جوجل وإعلانات ميتا — تشتري الوسائط لإطلاقات دبي يومياً، لا نظرياً.",
        ],
      },
      faqs: [
        { q: "كم ينبغي أن يخصّص مطوّر في دبي لإعلانات الدفع لكل نقرة؟", a: "ما يكفي لامتلاك نافذة الإطلاق عند هدف لتكلفة العميل المؤهل — إعلانات الدفع لكل نقرة للعقارات في دبي توقّت الميزانية وفق الجدول لا رقماً شهرياً ثابتاً، فيتركز الإنفاق حين يكون الطلب أعلى." },
        { q: "ما تكلفة العميل المؤهل في عقارات دبي؟", a: "تختلف حسب المجتمع والشريحة السعرية والقناة؛ نحدّد هدفاً مقابل ما يغلقه فريق مبيعاتك ونحسّن أسبوعياً نحوه — لا عدد النماذج." },
        { q: "جوجل أم ميتا للعقارات؟", a: "كلاهما: جوجل يلتقط نية البحث النشط، وإعلانات ميتا للعقارات تبني الطلب وتعيد الاستهداف. معظم الإطلاقات تحتاج مزيجاً مقاساً إضافة إلى المنصات." },
      ],
      closingTitle: "تخطط لإطلاق أو توسيع عملاء الوكلاء؟ احجز مكالمة للحصول على خطة إعلانات دفع لكل نقرة عقارية في دبي مبنية حول قاعدة عملائك.",
    },
    ru: {
      label: "PPC для недвижимости",
      metaTitle: "PPC для недвижимости в Дубае | Лид-реклама Google и Meta",
      metaDescription:
        "PPC для недвижимости в Дубае — рекламные кампании в Google и Meta вокруг календаря запуска, измеряемые по стоимости квалифицированного лида, а не по кликам. Записаться на звонок.",
      h1: "PPC для недвижимости в Дубае",
      heroLede:
        "Запуск не должен зависеть от того, на какой портал вы в этом месяце перерасходовали бюджет. PPC для недвижимости в Дубае выстраивает Google и Meta вокруг календаря запуска и оценивает каждый дирхам по стоимости квалифицированного лида — заявок, которые ваш отдел продаж действительно может закрыть.",
      ctaLabel: "Получить план PPC для недвижимости",
      ctaSub: "План по каналам и бюджету под ваш запуск и целевая стоимость квалифицированного лида.",
      whatsIncluded: {
        heading: "Что охватывают Google Ads для недвижимости в Дубае и платные соцсети",
        lead: "PPC для недвижимости в Дубае на всю воронку по каждому каналу, которого касается покупатель:",
        items: [
          "Google Поиск и Performance Max по запросам о недвижимости с высоким намерением",
          "Реклама Meta для недвижимости — лид- и объектные кампании с точным контролем аудитории",
          "Реклама на порталах недвижимости (Property Finder, Bayut, Dubizzle), интегрированная с платным трафиком",
          "YouTube и TikTok для узнаваемости запуска",
          "Посадочные страницы под конверсию и полный трекинг, чтобы лиды атрибутировались, а не угадывались",
          "Темп расходования бюджета по календарю запуска — траты растут, когда это нужно проекту",
        ],
      },
      forCompanies: {
        heading: "PPC для застройщиков и агентств",
        lead: "Для компаний платный трафик — оружие запуска, а не месячная капельница:",
        items: [
          "Реклама запуска на этапе строительства вокруг реальных дат запуска",
          "Генерация лидов-инвесторов с квалификацией в форме, а не просто охват",
          "Структуры аккаунтов на несколько проектов и несколько агентов",
          "Отчётность по стоимости квалифицированного лида и воронке в AED — не по показам",
        ],
      },
      forAgents: {
        heading: "PPC для агентов по недвижимости",
        lead: "Для отдельного агента PPC должен быть эффективным на небольшом бюджете:",
        items: [
          "Кампании по объектам и районам, приводящие активно ищущих покупателей",
          "Ретаргетинг, чтобы посетители возвращались, и click-to-WhatsApp для мгновенных ответов",
          "Жёсткий контроль стоимости — каждый лид измеряется относительно того, что вы можете закрыть",
        ],
      },
      caseStudies: {
        heading: "Кейсы",
        items: [
          { title: "AED 35M+ выручки, атрибутированной лидам", desc: "За пять лет performance в Google и Meta для недвижимости Дубая кампании принесли AED 35M+ выручки, атрибутированной лидам, — измерялось по воронке, а не по показам, в 8+ рекламных аккаунтах." },
          { title: "MSN Developments — performance запуска на этапе строительства", desc: "Платный трафик вокруг календарей запуска на этапе строительства, связанный с воронкой инвесторов, включая запуск с показателем AED 210M за 60 дней." },
          { title: "Лидогенерация, интегрированная с порталами", desc: "Google и Meta работают вместе с Property Finder, Bayut и Dubizzle, так что спрос из платного и с порталов ловится вместе, а не по отдельности." },
        ],
      },
      expertise: {
        heading: "Почему PPC-агентство по недвижимости в Дубае, которое продавало недвижимость",
        body: [
          "Шарун Ирфан Хан — performance-маркетолог для недвижимости Дубая, руководитель маркетинга в MSN Developments. AED 35M+ выручки, атрибутированной лидам, в Google, Meta и на порталах недвижимости ОАЭ, 8+ рекламных аккаунтов под управлением.",
          "Сертификаты Google Ads и рекламы Meta — закупка трафика для запусков в Дубае ежедневно, а не в теории.",
        ],
      },
      faqs: [
        { q: "Какой бюджет на PPC закладывать застройщику в Дубае?", a: "Достаточный, чтобы занять окно запуска при целевой стоимости квалифицированного лида — PPC для недвижимости в Дубае распределяет бюджет по календарю, а не фиксированной месячной суммой, так что траты концентрируются, когда спрос выше всего." },
        { q: "Что такое стоимость квалифицированного лида в недвижимости Дубая?", a: "Зависит от района, ценового сегмента и канала; мы задаём цель относительно того, что закрывает ваш отдел продаж, и еженедельно оптимизируем к ней — не по числу заполненных форм." },
        { q: "Google или Meta для недвижимости?", a: "И то и другое: Google ловит намерение активного поиска, реклама Meta для недвижимости строит спрос и ретаргетит. Большинству запусков нужен выверенный микс плюс порталы." },
      ],
      closingTitle: "Планируете запуск или масштабируете лиды агентов? Запишитесь на звонок за планом PPC для недвижимости в Дубае под вашу воронку.",
    },
  },

  /* PAGE 5 — Content Marketing ----------------------------------------- */
  {
    slug: "real-estate-content-marketing-dubai",
    related: ["real-estate-seo-dubai", "real-estate-social-media-marketing-dubai", "real-estate-email-marketing-dubai"],
    en: {
      label: "Real Estate Content Marketing",
      metaTitle: "Real Estate Content Marketing Dubai | Guides & Insight",
      metaDescription:
        "Real estate content marketing in Dubai — area guides, market insight and buyer-intent content that ranks, builds authority and feeds your pipeline.",
      h1: "Real Estate Content Marketing in Dubai",
      heroLede:
        "In a market where a dozen towers launch in the same quarter, content is how you become the name buyers trust first. Real estate content marketing in Dubai turns area guides, market insight and project stories into ranked traffic and warm leads.",
      ctaLabel: "Get my content plan",
      ctaSub: "A content strategy mapped to buyer intent and your launch calendar.",
      whatsIncluded: {
        heading: "What content marketing for real estate includes",
        lead: "Real estate content marketing Dubai built around the buyer journey:",
        items: [
          "Area and community guides that rank for the searches buyers make before enquiring",
          "Market insight and market-thesis editorial that positions you as the expert",
          "Project storytelling — from first render to handover",
          "Blog and lead-magnet content wired to email and CRM",
          "A content calendar tied to launches and search demand (pairs with SEO)",
        ],
      },
      forCompanies: {
        heading: "Content marketing for property developers & brokerages",
        lead: "For companies, content is the authority layer of the funnel:",
        items: [
          "Market-thesis and investor-insight editorial that earns trust at the top",
          "Area guides per project that capture buyer-research intent",
          "Thought-leadership for the founder/brand — the reason serious buyers pick you",
        ],
      },
      forAgents: {
        heading: "Content for real estate agents",
        lead: "For agents, content is personal authority that compounds:",
        items: [
          "Neighbourhood guides and buyer FAQs that make you the local expert",
          "Market-update posts that keep your sphere warm",
          "Evergreen content that ranks and earns leads long after posting",
        ],
      },
      caseStudies: {
        heading: "Case studies",
        items: [
          { title: "Area guide ranked #1 in Dubai", desc: "A “DLRC Dubai 2026 Area Guide & Investment Opportunities” ranked #1 for its target query in the crowded Dubai property market — buyer-intent content capturing demand on-page, no ads." },
          { title: "MSN Developments — market-thesis editorial", desc: "Market-thesis and brand-voice creative (“a market heading toward 4.7M residents”, investor-trust series) that framed a developer as the disciplined, credible choice." },
          { title: "Earthlink — market-intelligence series", desc: "Data-led content — rental yields, informed-buyer and market-confidence pieces — turning market intelligence into qualified investor interest." },
          { title: "0 → 1,000 users in 3 months", desc: "A content engine taken from zero to 1,000 active users in three months on pure on-page SEO — proof content builds an organic pipeline with no ad spend." },
        ],
      },
      expertise: {
        heading: "Why a Dubai real estate content strategy specialist",
        body: [
          "Sharoon Irfan Khan — brand strategist and content lead for Dubai real estate, Head of Marketing at MSN Developments. Ranked a Dubai area guide #1, built market-thesis editorial for a developer brand, and grew a property blog 0→1,000 users in three months.",
          "Content written to rank and to sell, not to fill a calendar.",
        ],
      },
      faqs: [
        { q: "What content works for Dubai real estate?", a: "Area/community guides, market insight and project stories — real estate content marketing in Dubai focuses on buyer-intent topics that rank and move a long buying cycle forward." },
        { q: "How does content help sales, not just traffic?", a: "It builds the authority buyers weigh during weeks of quiet research, and feeds email/CRM nurture — so ranked traffic becomes warm, qualified enquiries." },
        { q: "Content or ads?", a: "Both do different jobs: ads capture now-demand, content marketing compounds and lowers cost per lead over time. Most brands need both." },
      ],
      closingTitle: "Want to be the name buyers trust first? Book a call for a real estate content marketing Dubai plan.",
    },
    ar: {
      label: "تسويق المحتوى للعقارات",
      metaTitle: "تسويق المحتوى للعقارات في دبي | الأدلة والرؤى",
      metaDescription:
        "تسويق المحتوى للعقارات في دبي — أدلة مناطق ورؤى سوق ومحتوى نية شراء يُرتَّب ويبني السلطة ويغذّي قاعدة عملائك.",
      h1: "تسويق المحتوى للعقارات في دبي",
      heroLede:
        "في سوق تُطلق فيه عشرات الأبراج في الربع نفسه، المحتوى هو كيف تصبح الاسم الذي يثق به المشترون أولاً. تسويق المحتوى للعقارات في دبي يحوّل أدلة المناطق ورؤى السوق وقصص المشاريع إلى زيارات مرتّبة وعملاء دافئين.",
      ctaLabel: "احصل على خطة المحتوى",
      ctaSub: "استراتيجية محتوى مرتبطة بنية المشتري وجدول إطلاقك.",
      whatsIncluded: {
        heading: "ما الذي يشمله تسويق المحتوى للعقارات",
        lead: "تسويق محتوى للعقارات في دبي مبني حول رحلة المشتري:",
        items: [
          "أدلة مناطق ومجتمعات تُرتَّب في عمليات البحث التي يجريها المشترون قبل الاستفسار",
          "رؤى سوق ومحتوى أطروحة سوقية يموضعك كخبير",
          "سرد المشروع — من أول تصميم افتراضي حتى التسليم",
          "محتوى مدونة وجاذب عملاء مرتبط بالبريد وإدارة علاقات العملاء",
          "تقويم محتوى مرتبط بالإطلاقات وطلب البحث (يقترن بتحسين محركات البحث)",
        ],
      },
      forCompanies: {
        heading: "تسويق المحتوى للمطورين والوسطاء",
        lead: "للشركات، المحتوى هو طبقة السلطة في مسار التحويل:",
        items: [
          "محتوى أطروحة سوقية ورؤى للمستثمرين يكسب الثقة في القمة",
          "أدلة مناطق لكل مشروع تلتقط نية بحث المشتري",
          "ريادة فكرية للمؤسس/العلامة — سبب اختيار المشترين الجادين لك",
        ],
      },
      forAgents: {
        heading: "المحتوى لوكلاء العقارات",
        lead: "للوكلاء، المحتوى سلطة شخصية تتراكم:",
        items: [
          "أدلة أحياء وأسئلة مشترين تجعلك الخبير المحلي",
          "منشورات تحديث السوق التي تُبقي دائرتك دافئة",
          "محتوى دائم يُرتَّب ويجلب عملاء بعد نشره بوقت طويل",
        ],
      },
      caseStudies: {
        heading: "دراسات حالة",
        items: [
          { title: "دليل منطقة في المرتبة الأولى في دبي", desc: "«دليل منطقة دبي 2026 وفرص الاستثمار» من DLRC تصدّر المرتبة الأولى لاستعلامه المستهدف في سوق عقارات دبي المزدحم — محتوى نية شراء يلتقط الطلب صفحياً، بلا إعلانات." },
          { title: "MSN Developments — محتوى أطروحة سوقية", desc: "محتوى أطروحة سوقية وصوت علامة («سوق يتجه نحو 4.7 مليون مقيم»، سلسلة ثقة المستثمرين) أطّر مطوّراً بوصفه الخيار المنضبط الموثوق." },
          { title: "Earthlink — سلسلة ذكاء سوقي", desc: "محتوى قائم على البيانات — عوائد الإيجار، ومواد المشتري المطّلع وثقة السوق — يحوّل ذكاء السوق إلى اهتمام مستثمرين مؤهل." },
          { title: "من صفر إلى 1,000 مستخدم في 3 أشهر", desc: "محرك محتوى انتقل من صفر إلى 1,000 مستخدم نشط خلال ثلاثة أشهر على تحسين محركات البحث الصفحي الخالص — دليل على أن المحتوى يبني قاعدة عضوية بلا إنفاق إعلاني." },
        ],
      },
      expertise: {
        heading: "لماذا مختص استراتيجية محتوى عقاري في دبي",
        body: [
          "شارون عرفان خان — استراتيجية علامة وقائدة محتوى لعقارات دبي، ورئيسة التسويق في MSN Developments. رتّبت دليل منطقة دبيّ في المرتبة الأولى، وبنت محتوى أطروحة سوقية لعلامة مطوّر، ونمّت مدونة عقارية من صفر إلى 1,000 مستخدم في ثلاثة أشهر.",
          "محتوى مكتوب ليُرتَّب وليبيع، لا ليملأ تقويماً.",
        ],
      },
      faqs: [
        { q: "ما المحتوى الذي ينجح لعقارات دبي؟", a: "أدلة المناطق/المجتمعات ورؤى السوق وقصص المشاريع — يركّز تسويق المحتوى للعقارات في دبي على مواضيع نية الشراء التي تُرتَّب وتدفع دورة شراء طويلة إلى الأمام." },
        { q: "كيف يساعد المحتوى المبيعات لا الزيارات فقط؟", a: "يبني السلطة التي يزنها المشترون خلال أسابيع البحث الهادئ، ويغذّي رعاية البريد/CRM — فتصبح الزيارات المرتّبة استفسارات دافئة مؤهلة." },
        { q: "المحتوى أم الإعلانات؟", a: "كلاهما بمهمة مختلفة: الإعلانات تلتقط الطلب الآني، وتسويق المحتوى يتراكم ويخفض تكلفة العميل مع الوقت. معظم العلامات تحتاج الاثنين." },
      ],
      closingTitle: "تريد أن تكون الاسم الذي يثق به المشترون أولاً؟ احجز مكالمة للحصول على خطة تسويق محتوى عقاري في دبي.",
    },
    ru: {
      label: "Контент-маркетинг для недвижимости",
      metaTitle: "Контент-маркетинг для недвижимости в Дубае | Гайды и аналитика",
      metaDescription:
        "Контент-маркетинг для недвижимости в Дубае — гайды по районам, аналитика рынка и контент под намерение покупателя, который ранжируется, строит авторитет и питает воронку.",
      h1: "Контент-маркетинг для недвижимости в Дубае",
      heroLede:
        "На рынке, где десяток башен выходит в один квартал, контент — это то, как вы становитесь именем, которому покупатели доверяют первым. Контент-маркетинг для недвижимости в Дубае превращает гайды по районам, аналитику рынка и истории проектов в ранжируемый трафик и тёплые лиды.",
      ctaLabel: "Получить контент-план",
      ctaSub: "Контент-стратегия под намерение покупателя и ваш календарь запуска.",
      whatsIncluded: {
        heading: "Что входит в контент-маркетинг для недвижимости",
        lead: "Контент-маркетинг для недвижимости в Дубае вокруг пути покупателя:",
        items: [
          "Гайды по районам и сообществам, ранжирующиеся по запросам, которые покупатели делают до обращения",
          "Аналитика рынка и редакционные материалы с рыночным тезисом, которые позиционируют вас как эксперта",
          "Сторителлинг проекта — от первого рендера до передачи ключей",
          "Блог и лид-магниты, связанные с email и CRM",
          "Контент-календарь, привязанный к запускам и поисковому спросу (сочетается с SEO)",
        ],
      },
      forCompanies: {
        heading: "Контент-маркетинг для застройщиков и агентств",
        lead: "Для компаний контент — это слой авторитета в воронке:",
        items: [
          "Материалы с рыночным тезисом и аналитикой для инвесторов, которые завоёвывают доверие наверху воронки",
          "Гайды по районам под каждый проект, ловящие исследовательское намерение покупателя",
          "Лидерство мнений для основателя/бренда — причина, по которой серьёзные покупатели выбирают вас",
        ],
      },
      forAgents: {
        heading: "Контент для агентов по недвижимости",
        lead: "Для агентов контент — это личный авторитет, который накапливается:",
        items: [
          "Гайды по районам и ответы покупателям, которые делают вас местным экспертом",
          "Посты с обновлениями рынка, которые держат ваш круг общения тёплым",
          "Вечнозелёный контент, который ранжируется и приводит лиды спустя долгое время после публикации",
        ],
      },
      caseStudies: {
        heading: "Кейсы",
        items: [
          { title: "Гайд по району на первом месте в Дубае", desc: "«DLRC Dubai 2026 Area Guide & Investment Opportunities» вышел на первое место по целевому запросу на переполненном рынке недвижимости Дубая — контент под намерение покупателя ловит спрос на странице, без рекламы." },
          { title: "MSN Developments — материалы с рыночным тезисом", desc: "Материалы с рыночным тезисом и бренд-голосом («рынок, идущий к 4,7 млн жителей», серия о доверии инвесторов), которые представили застройщика как дисциплинированный и надёжный выбор." },
          { title: "Earthlink — серия рыночной аналитики", desc: "Контент на данных — доходность аренды, материалы для информированного покупателя и об уверенности в рынке — превращает рыночную аналитику в квалифицированный интерес инвесторов." },
          { title: "С 0 до 1 000 пользователей за 3 месяца", desc: "Контент-движок вырос с нуля до 1 000 активных пользователей за три месяца на чистом on-page SEO — доказательство того, что контент строит органическую воронку без рекламного бюджета." },
        ],
      },
      expertise: {
        heading: "Почему специалист по контент-стратегии в недвижимости Дубая",
        body: [
          "Шарун Ирфан Хан — бренд-стратег и контент-лид для недвижимости Дубая, руководитель маркетинга в MSN Developments. Вывела гайд по району Дубая на первое место, построила материалы с рыночным тезисом для бренда застройщика и вырастила блог о недвижимости с 0 до 1 000 пользователей за три месяца.",
          "Контент, написанный чтобы ранжироваться и продавать, а не чтобы заполнить календарь.",
        ],
      },
      faqs: [
        { q: "Какой контент работает для недвижимости Дубая?", a: "Гайды по районам/сообществам, аналитика рынка и истории проектов — контент-маркетинг для недвижимости в Дубае сосредоточен на темах под намерение покупателя, которые ранжируются и двигают длинный цикл покупки вперёд." },
        { q: "Как контент помогает продажам, а не только трафику?", a: "Он строит авторитет, который покупатели взвешивают за недели тихого исследования, и питает прогрев в email/CRM — так ранжируемый трафик становится тёплыми квалифицированными заявками." },
        { q: "Контент или реклама?", a: "У них разные задачи: реклама ловит спрос сейчас, контент-маркетинг накапливается и со временем снижает стоимость лида. Большинству брендов нужны оба." },
      ],
      closingTitle: "Хотите быть именем, которому покупатели доверяют первым? Запишитесь на звонок за планом контент-маркетинга для недвижимости в Дубае.",
    },
  },

  /* PAGE 6 — Social Media --------------------------------------------- */
  {
    slug: "real-estate-social-media-marketing-dubai",
    related: ["real-estate-content-marketing-dubai", "real-estate-ppc-dubai", "real-estate-web-development-dubai"],
    en: {
      label: "Real Estate Social Media Marketing",
      metaTitle: "Real Estate Social Media Marketing Dubai | IG & TikTok",
      metaDescription:
        "Real estate social media marketing in Dubai — Instagram, TikTok and reels that build brand and pull enquiries for developers, brokerages and agents.",
      h1: "Real Estate Social Media Marketing in Dubai",
      heroLede:
        "In Dubai property, buyers judge you on the feed before the call. Real estate social media marketing in Dubai turns reels, walkthroughs and market takes into brand trust — and trust into enquiries — for developers, brokerages and agents.",
      ctaLabel: "Get my social plan",
      ctaSub: "Creative direction, a content calendar and a plan to turn followers into enquiries.",
      whatsIncluded: {
        heading: "What social media marketing for real estate includes",
        lead: "End-to-end real estate social media marketing Dubai — creative direction to community:",
        items: [
          "Content and creative direction — reels, listing tours, “just sold”, neighbourhood guides",
          "Instagram marketing for real estate, plus TikTok and YouTube shorts",
          "Paid social to amplify the best content (pairs with PPC)",
          "Community management — comments, DMs and enquiry handling",
          "Launch and seasonal campaign creative",
          "Brand storytelling that carries across every post",
        ],
      },
      forCompanies: {
        heading: "Social media for property developers & brokerages",
        lead: "For companies, social is the brand system around a launch:",
        items: [
          "A consistent brand identity a project carries from teaser to handover",
          "Launch campaign creative — countdowns, showcase invites, market thesis",
          "Multi-account management across projects and a multi-agent team",
        ],
      },
      forAgents: {
        heading: "Social media for real estate agents",
        lead: "For an individual agent, social is the personal-brand engine that fills your DMs:",
        items: [
          "Reels for real estate — listing tours and market takes that build your name",
          "A consistent posting rhythm so you're the agent people remember",
          "Community and DM handling that turns followers into viewings",
        ],
      },
      caseStudies: {
        heading: "Case studies",
        items: [
          { title: "Shanti Kiaans — luxury personal real-estate brand", desc: "Built the brand and ran end-to-end social — creative direction, “Beachfront Living in Dubai” lifestyle content, campaigns and community — growing a trusted, enquiry-generating audience." },
          { title: "MSN Developments — developer social system", desc: "A full social brand system for a Dubai developer — editorial market-thesis content, launch creative and community across projects." },
          { title: "8+ brand accounts managed", desc: "End-to-end social — creative, content, campaigns and community — across 8+ real estate and lifestyle brand accounts." },
        ],
      },
      expertise: {
        heading: "Why a Dubai real estate social specialist",
        body: [
          "Sharoon Irfan Khan — brand & social lead for Dubai real estate, Head of Marketing at MSN Developments. Runs end-to-end social — creative direction, content, campaigns and community — across 8+ brand accounts including MSN Developments, Shanti Kiaans and First Key International.",
          "Certified in Meta advertising and social media management.",
        ],
      },
      faqs: [
        { q: "Which platform is best for Dubai real estate?", a: "Instagram builds the brand and TikTok extends reach; real estate social media marketing in Dubai usually leads with reels, with paid amplification for the best-performing content." },
        { q: "Does social generate leads or just brand?", a: "Both — the feed builds the trust that precedes the enquiry, and DMs plus click-to-WhatsApp turn that trust into viewings." },
        { q: "How often should a Dubai agent post?", a: "Consistency beats volume — a sustainable rhythm of reels and market updates outperforms sporadic bursts. Social media for real estate agents is built around a cadence you can keep." },
      ],
      closingTitle: "Ready to turn your feed into enquiries? Book a call for a real estate social media marketing Dubai plan.",
    },
    ar: {
      label: "تسويق وسائل التواصل الاجتماعي للعقارات",
      metaTitle: "تسويق وسائل التواصل الاجتماعي للعقارات في دبي | إنستغرام وتيك توك",
      metaDescription:
        "تسويق وسائل التواصل الاجتماعي للعقارات في دبي — إنستغرام وتيك توك ومقاطع ريلز تبني العلامة وتجذب الاستفسارات للمطورين والوسطاء والوكلاء.",
      h1: "تسويق وسائل التواصل الاجتماعي للعقارات في دبي",
      heroLede:
        "في عقارات دبي، يحكم المشترون عليك من الواجهة قبل المكالمة. تسويق وسائل التواصل الاجتماعي للعقارات في دبي يحوّل مقاطع الريلز والجولات والآراء السوقية إلى ثقة بالعلامة — والثقة إلى استفسارات — للمطورين والوسطاء والوكلاء.",
      ctaLabel: "احصل على خطة وسائل التواصل",
      ctaSub: "توجيه إبداعي وتقويم محتوى وخطة لتحويل المتابعين إلى استفسارات.",
      whatsIncluded: {
        heading: "ما الذي يشمله تسويق وسائل التواصل الاجتماعي للعقارات",
        lead: "تسويق وسائل تواصل اجتماعي متكامل للعقارات في دبي — من التوجيه الإبداعي إلى المجتمع:",
        items: [
          "المحتوى والتوجيه الإبداعي — ريلز، جولات عروض، «تم البيع»، أدلة أحياء",
          "تسويق إنستغرام للعقارات، إضافة إلى تيك توك ومقاطع يوتيوب القصيرة",
          "إعلانات اجتماعية مدفوعة لتضخيم أفضل المحتوى (يقترن بإعلانات الدفع لكل نقرة)",
          "إدارة المجتمع — التعليقات والرسائل الخاصة ومعالجة الاستفسارات",
          "إبداع حملات الإطلاق والمواسم",
          "سرد علامة يحمل نفسه عبر كل منشور",
        ],
      },
      forCompanies: {
        heading: "وسائل التواصل للمطورين والوسطاء",
        lead: "للشركات، وسائل التواصل هي نظام العلامة حول الإطلاق:",
        items: [
          "هوية علامة ثابتة يحملها المشروع من الإعلان التشويقي حتى التسليم",
          "إبداع حملات الإطلاق — العد التنازلي، ودعوات العرض، والأطروحة السوقية",
          "إدارة حسابات متعددة عبر المشاريع وفريق متعدد الوكلاء",
        ],
      },
      forAgents: {
        heading: "وسائل التواصل لوكلاء العقارات",
        lead: "للوكيل الفردي، وسائل التواصل هي محرك العلامة الشخصية الذي يملأ رسائلك:",
        items: [
          "ريلز للعقارات — جولات عروض وآراء سوقية تبني اسمك",
          "إيقاع نشر ثابت بحيث تكون الوكيل الذي يتذكره الناس",
          "إدارة المجتمع والرسائل التي تحوّل المتابعين إلى معاينات",
        ],
      },
      caseStudies: {
        heading: "دراسات حالة",
        items: [
          { title: "شانتي كيانز — علامة عقارية شخصية فاخرة", desc: "بناء العلامة وإدارة وسائل تواصل متكاملة — توجيه إبداعي، ومحتوى نمط حياة «العيش على شاطئ دبي»، وحملات ومجتمع — لتنمية جمهور موثوق يولّد الاستفسارات." },
          { title: "MSN Developments — نظام وسائل تواصل لمطوّر", desc: "نظام علامة وسائل تواصل كامل لمطوّر دبيّ — محتوى تحريري بأطروحة سوقية، وإبداع إطلاق، ومجتمع عبر المشاريع." },
          { title: "أكثر من 8 حسابات علامات مُدارة", desc: "وسائل تواصل متكاملة — إبداع ومحتوى وحملات ومجتمع — عبر أكثر من 8 حسابات علامات عقارية ونمط حياة." },
        ],
      },
      expertise: {
        heading: "لماذا مختص وسائل تواصل عقارية في دبي",
        body: [
          "شارون عرفان خان — قائدة علامة ووسائل تواصل لعقارات دبي، ورئيسة التسويق في MSN Developments. تدير وسائل تواصل متكاملة — توجيه إبداعي ومحتوى وحملات ومجتمع — عبر أكثر من 8 حسابات علامات منها MSN Developments وShanti Kiaans وFirst Key International.",
          "معتمَدة في إعلانات ميتا وإدارة وسائل التواصل الاجتماعي.",
        ],
      },
      faqs: [
        { q: "ما المنصة الأفضل لعقارات دبي؟", a: "إنستغرام يبني العلامة وتيك توك يوسّع الوصول؛ يقود تسويق وسائل التواصل الاجتماعي للعقارات في دبي عادةً بالريلز، مع تضخيم مدفوع لأفضل المحتوى أداءً." },
        { q: "هل تولّد وسائل التواصل عملاء أم علامة فقط؟", a: "كلاهما — الواجهة تبني الثقة التي تسبق الاستفسار، والرسائل الخاصة ونقرة واتساب تحوّلان تلك الثقة إلى معاينات." },
        { q: "كم مرة ينبغي أن ينشر وكيل في دبي؟", a: "الثبات يتغلب على الكم — إيقاع مستدام من الريلز وتحديثات السوق يتفوّق على الاندفاعات المتقطعة. وسائل التواصل لوكلاء العقارات مبنية حول وتيرة تستطيع الحفاظ عليها." },
      ],
      closingTitle: "مستعد لتحويل واجهتك إلى استفسارات؟ احجز مكالمة للحصول على خطة تسويق وسائل تواصل اجتماعي عقارية في دبي.",
    },
    ru: {
      label: "SMM для недвижимости",
      metaTitle: "SMM для недвижимости в Дубае | Instagram и TikTok",
      metaDescription:
        "SMM для недвижимости в Дубае — Instagram, TikTok и Reels, которые строят бренд и приводят заявки для застройщиков, агентств и агентов.",
      h1: "SMM для недвижимости в Дубае",
      heroLede:
        "В недвижимости Дубая покупатели судят о вас по ленте до звонка. SMM для недвижимости в Дубае превращает Reels, обзоры и мнения о рынке в доверие к бренду — а доверие в заявки — для застройщиков, агентств и агентов.",
      ctaLabel: "Получить план по соцсетям",
      ctaSub: "Креативное направление, контент-календарь и план превращения подписчиков в заявки.",
      whatsIncluded: {
        heading: "Что входит в SMM для недвижимости",
        lead: "SMM для недвижимости в Дубае под ключ — от креативного направления до работы с аудиторией:",
        items: [
          "Контент и креативное направление — Reels, туры по объектам, «продано», гайды по районам",
          "Продвижение в Instagram для недвижимости, плюс TikTok и YouTube Shorts",
          "Платные соцсети для усиления лучшего контента (сочетается с PPC)",
          "Работа с аудиторией — комментарии, сообщения и обработка заявок",
          "Креатив под кампании запуска и сезонные кампании",
          "Бренд-сторителлинг, который проходит через каждый пост",
        ],
      },
      forCompanies: {
        heading: "Соцсети для застройщиков и агентств",
        lead: "Для компаний соцсети — это бренд-система вокруг запуска:",
        items: [
          "Последовательная айдентика, которую проект несёт от тизера до передачи ключей",
          "Креатив кампаний запуска — обратный отсчёт, приглашения на показы, рыночный тезис",
          "Управление несколькими аккаунтами по проектам и команде из нескольких агентов",
        ],
      },
      forAgents: {
        heading: "Соцсети для агентов по недвижимости",
        lead: "Для отдельного агента соцсети — движок личного бренда, который наполняет ваши сообщения:",
        items: [
          "Reels для недвижимости — туры по объектам и мнения о рынке, которые строят ваше имя",
          "Последовательный ритм публикаций, чтобы вас запоминали",
          "Работа с аудиторией и сообщениями, которая превращает подписчиков в показы",
        ],
      },
      caseStudies: {
        heading: "Кейсы",
        items: [
          { title: "Shanti Kiaans — люксовый личный бренд в недвижимости", desc: "Построили бренд и вели соцсети под ключ — креативное направление, лайфстайл-контент «Жизнь у моря в Дубае», кампании и работу с аудиторией — вырастив доверенную аудиторию, генерирующую заявки." },
          { title: "MSN Developments — соцсистема застройщика", desc: "Полная соцбренд-система для застройщика в Дубае — редакционный контент с рыночным тезисом, креатив запуска и работа с аудиторией по проектам." },
          { title: "8+ бренд-аккаунтов под управлением", desc: "Соцсети под ключ — креатив, контент, кампании и работа с аудиторией — по 8+ бренд-аккаунтам в недвижимости и лайфстайле." },
        ],
      },
      expertise: {
        heading: "Почему специалист по соцсетям в недвижимости Дубая",
        body: [
          "Шарун Ирфан Хан — бренд- и соцлид для недвижимости Дубая, руководитель маркетинга в MSN Developments. Ведёт соцсети под ключ — креативное направление, контент, кампании и работу с аудиторией — по 8+ бренд-аккаунтам, включая MSN Developments, Shanti Kiaans и First Key International.",
          "Сертификаты по рекламе Meta и управлению соцсетями.",
        ],
      },
      faqs: [
        { q: "Какая площадка лучше для недвижимости Дубая?", a: "Instagram строит бренд, а TikTok расширяет охват; SMM для недвижимости в Дубае обычно ведёт с Reels и платным усилением самого результативного контента." },
        { q: "Соцсети приводят лиды или только бренд?", a: "И то и другое — лента строит доверие, предшествующее заявке, а сообщения и click-to-WhatsApp превращают это доверие в показы." },
        { q: "Как часто агенту в Дубае публиковать?", a: "Последовательность важнее объёма — устойчивый ритм Reels и обновлений рынка обгоняет спорадические всплески. Соцсети для агентов по недвижимости строятся вокруг темпа, который вы можете выдержать." },
      ],
      closingTitle: "Готовы превратить ленту в заявки? Запишитесь на звонок за планом SMM для недвижимости в Дубае.",
    },
  },

  /* PAGE 7 — Email Marketing ----------------------------------------- */
  {
    slug: "real-estate-email-marketing-dubai",
    related: ["real-estate-content-marketing-dubai", "real-estate-ppc-dubai", "real-estate-seo-dubai"],
    en: {
      label: "Real Estate Email Marketing",
      metaTitle: "Real Estate Email Marketing Dubai | Nurture & CRM",
      metaDescription:
        "Real estate email marketing in Dubai — CRM-driven nurture sequences that keep a six-week buyer decision warm and turn enquiries into viewings.",
      h1: "Real Estate Email Marketing in Dubai",
      heroLede:
        "Most Dubai property leads don't say no — they go quiet. Real estate email marketing in Dubai uses CRM-driven nurture to keep a six-week buyer decision warm and bring enquiries back to a viewing, without an agent remembering to chase.",
      ctaLabel: "Get my nurture plan",
      ctaSub: "A CRM and email sequence that keeps every enquiry warm to decision.",
      whatsIncluded: {
        heading: "What email marketing for real estate includes",
        lead: "Real estate email marketing Dubai built on a proper CRM foundation:",
        items: [
          "CRM setup and cleanup (HubSpot, Zoho, ActiveCampaign, Mailchimp)",
          "Lead segmentation — buyer vs investor, community, price band, stage",
          "Drip and nurture sequences that keep a long decision warm",
          "Broadcast newsletters — new listings, market updates, launches",
          "Email + WhatsApp automation for instant, consistent follow-up",
          "Attribution back to enquiry source so you know what email is worth",
        ],
      },
      forCompanies: {
        heading: "Email marketing for property developers & brokerages",
        lead: "For companies, email is the pipeline layer that protects ad spend:",
        items: [
          "Investor nurture sequences that carry a lead across the whole cycle",
          "CRM structured for a full sales team, not one inbox",
          "Launch and re-engagement campaigns to a warm database you already paid to build",
        ],
      },
      forAgents: {
        heading: "Email & follow-up for real estate agents",
        lead: "For an individual agent, automation does the chasing for you:",
        items: [
          "Automated follow-up so every enquiry is answered inside the hour",
          "A sphere newsletter that keeps past and potential clients warm",
          "Listing-alert emails matched to each buyer's search",
        ],
      },
      caseStudies: {
        heading: "Case studies",
        items: [
          { title: "CRM & lead nurturing — the warm middle", desc: "Automated follow-up sequences that keep a six-week decision warm without relying on an agent remembering to call — closing the gap where most Dubai property pipelines leak." },
          { title: "MSN Developments — pipeline-wired", desc: "Email and CRM nurture wired to the investor pipeline so paid and organic leads are worked to decision, not left to cool." },
          { title: "Full automation stack", desc: "Built on HubSpot, Zoho, ActiveCampaign, Mailchimp, Zapier and WhatsApp Business — the tooling to run reliable nurture at scale." },
        ],
      },
      expertise: {
        heading: "Why a Dubai real estate CRM & lead nurturing specialist",
        body: [
          "Sharoon Irfan Khan — performance & CRM lead for Dubai real estate, Head of Marketing at MSN Developments. Builds CRM and email/WhatsApp automation (HubSpot, Zoho, ActiveCampaign, Zapier) wired to the investor pipeline — the follow-up layer that turns AED 35M+ of generated leads into closed deals.",
        ],
      },
      faqs: [
        { q: "Does email marketing work for Dubai real estate?", a: "Yes — real estate email marketing in Dubai is where long buying cycles are won: it keeps the weeks-long decision warm and re-engages a database you already paid to build." },
        { q: "Email or WhatsApp?", a: "Both — WhatsApp for instant, personal follow-up and email for depth (listings, market updates, investor detail). We automate the two together." },
        { q: "What should developers send investors?", a: "Investor nurture — market insight, project progress and rental-yield/return updates on a sequence, not one-off blasts." },
      ],
      closingTitle: "Losing leads in the gap before decision? Book a call for a real estate email marketing Dubai and CRM plan.",
    },
    ar: {
      label: "التسويق عبر البريد الإلكتروني للعقارات",
      metaTitle: "التسويق عبر البريد الإلكتروني للعقارات في دبي | الرعاية وإدارة علاقات العملاء",
      metaDescription:
        "التسويق عبر البريد الإلكتروني للعقارات في دبي — سلاسل رعاية مبنية على CRM تُبقي قرار مشترٍ يمتد ستة أسابيع دافئاً وتحوّل الاستفسارات إلى معاينات.",
      h1: "التسويق عبر البريد الإلكتروني للعقارات في دبي",
      heroLede:
        "معظم عملاء العقارات في دبي لا يقولون لا — بل يصمتون. التسويق عبر البريد الإلكتروني للعقارات في دبي يستخدم رعاية مبنية على CRM لإبقاء قرار مشترٍ يمتد ستة أسابيع دافئاً وإعادة الاستفسارات إلى معاينة، دون أن يتذكر وكيل الملاحقة.",
      ctaLabel: "احصل على خطة الرعاية",
      ctaSub: "نظام CRM وسلسلة بريد تُبقي كل استفسار دافئاً حتى القرار.",
      whatsIncluded: {
        heading: "ما الذي يشمله التسويق عبر البريد الإلكتروني للعقارات",
        lead: "تسويق بريد إلكتروني للعقارات في دبي مبني على أساس CRM سليم:",
        items: [
          "إعداد وتنظيف CRM (HubSpot وZoho وActiveCampaign وMailchimp)",
          "تقسيم العملاء — مشترٍ مقابل مستثمر، والمجتمع، والشريحة السعرية، والمرحلة",
          "سلاسل تنقيط ورعاية تُبقي قراراً طويلاً دافئاً",
          "نشرات بث — عروض جديدة، وتحديثات سوق، وإطلاقات",
          "أتمتة بريد وواتساب لمتابعة فورية ومتسقة",
          "نسب إلى مصدر الاستفسار بحيث تعرف قيمة كل بريد",
        ],
      },
      forCompanies: {
        heading: "التسويق عبر البريد الإلكتروني للمطورين والوسطاء",
        lead: "للشركات، البريد هو طبقة خط الأنابيب التي تحمي الإنفاق الإعلاني:",
        items: [
          "سلاسل رعاية للمستثمرين تحمل العميل عبر الدورة كاملة",
          "CRM مُهيكل لفريق مبيعات كامل، لا صندوق وارد واحد",
          "حملات إطلاق وإعادة تفاعل لقاعدة بيانات دافئة دفعت مسبقاً لبنائها",
        ],
      },
      forAgents: {
        heading: "البريد والمتابعة لوكلاء العقارات",
        lead: "للوكيل الفردي، الأتمتة تقوم بالملاحقة عنك:",
        items: [
          "متابعة آلية بحيث يُجاب كل استفسار خلال ساعة",
          "نشرة للدائرة تُبقي العملاء السابقين والمحتملين دافئين",
          "رسائل تنبيه عروض مطابقة لبحث كل مشترٍ",
        ],
      },
      caseStudies: {
        heading: "دراسات حالة",
        items: [
          { title: "إدارة علاقات العملاء ورعايتهم — الوسط الدافئ", desc: "سلاسل متابعة آلية تُبقي قرار الستة أسابيع دافئاً دون الاعتماد على تذكّر الوكيل للاتصال — تسدّ الفجوة التي تتسرب منها معظم قواعد عملاء العقارات في دبي." },
          { title: "MSN Developments — مرتبط بخط الأنابيب", desc: "رعاية بريد وCRM مرتبطة بقاعدة المستثمرين بحيث يُعمَل على عملاء المدفوع والعضوي حتى القرار، لا يُتركون ليبردوا." },
          { title: "منظومة أتمتة كاملة", desc: "مبنية على HubSpot وZoho وActiveCampaign وMailchimp وZapier وWhatsApp Business — الأدوات لإدارة رعاية موثوقة على نطاق." },
        ],
      },
      expertise: {
        heading: "لماذا مختص CRM ورعاية عملاء عقارية في دبي",
        body: [
          "شارون عرفان خان — قائدة أداء وCRM لعقارات دبي، ورئيسة التسويق في MSN Developments. تبني CRM وأتمتة بريد/واتساب (HubSpot وZoho وActiveCampaign وZapier) مرتبطة بقاعدة المستثمرين — طبقة المتابعة التي تحوّل أكثر من 35 مليون درهم من العملاء المولَّدين إلى صفقات مغلقة.",
        ],
      },
      faqs: [
        { q: "هل ينجح التسويق عبر البريد الإلكتروني لعقارات دبي؟", a: "نعم — التسويق عبر البريد الإلكتروني للعقارات في دبي هو حيث تُكسب دورات الشراء الطويلة: يُبقي القرار الذي يمتد أسابيع دافئاً ويعيد تفعيل قاعدة بيانات دفعت مسبقاً لبنائها." },
        { q: "البريد أم واتساب؟", a: "كلاهما — واتساب للمتابعة الفورية الشخصية والبريد للعمق (العروض، وتحديثات السوق، وتفاصيل المستثمرين). نؤتمت الاثنين معاً." },
        { q: "ماذا ينبغي أن يرسل المطورون للمستثمرين؟", a: "رعاية مستثمرين — رؤى سوق، وتقدّم المشروع، وتحديثات عوائد/إيجارات على سلسلة، لا رسائل متفرقة." },
      ],
      closingTitle: "تخسر عملاء في الفجوة قبل القرار؟ احجز مكالمة للحصول على خطة تسويق بريد إلكتروني عقارية في دبي وخطة CRM.",
    },
    ru: {
      label: "Email-маркетинг для недвижимости",
      metaTitle: "Email-маркетинг для недвижимости в Дубае | Прогрев и CRM",
      metaDescription:
        "Email-маркетинг для недвижимости в Дубае — цепочки прогрева на базе CRM, которые удерживают шестинедельное решение покупателя «в тепле» и превращают заявки в показы.",
      h1: "Email-маркетинг для недвижимости в Дубае",
      heroLede:
        "Большинство лидов в недвижимости Дубая не говорят «нет» — они замолкают. Email-маркетинг для недвижимости в Дубае использует прогрев на базе CRM, чтобы удерживать шестинедельное решение покупателя «в тепле» и возвращать заявки к показу, без того чтобы агент помнил о напоминании.",
      ctaLabel: "Получить план прогрева",
      ctaSub: "CRM и email-цепочка, которые держат каждую заявку тёплой до решения.",
      whatsIncluded: {
        heading: "Что входит в email-маркетинг для недвижимости",
        lead: "Email-маркетинг для недвижимости в Дубае на нормальном фундаменте CRM:",
        items: [
          "Настройка и чистка CRM (HubSpot, Zoho, ActiveCampaign, Mailchimp)",
          "Сегментация лидов — покупатель против инвестора, район, ценовой сегмент, стадия",
          "Drip- и nurture-цепочки, которые держат долгое решение тёплым",
          "Рассылки — новые объекты, обновления рынка, запуски",
          "Автоматизация email + WhatsApp для мгновенного и последовательного сопровождения",
          "Атрибуция к источнику заявки, чтобы вы знали цену каждого письма",
        ],
      },
      forCompanies: {
        heading: "Email-маркетинг для застройщиков и агентств",
        lead: "Для компаний email — слой воронки, который защищает рекламный бюджет:",
        items: [
          "Цепочки прогрева инвесторов, которые проводят лид через весь цикл",
          "CRM, выстроенная под целый отдел продаж, а не один ящик",
          "Кампании запуска и реактивации по тёплой базе, за построение которой вы уже заплатили",
        ],
      },
      forAgents: {
        heading: "Email и сопровождение для агентов по недвижимости",
        lead: "Для отдельного агента автоматизация ведёт погоню за вас:",
        items: [
          "Автоматическое сопровождение, чтобы на каждую заявку отвечали в течение часа",
          "Рассылка по кругу общения, которая держит прошлых и потенциальных клиентов тёплыми",
          "Письма-оповещения об объектах под поиск каждого покупателя",
        ],
      },
      caseStudies: {
        heading: "Кейсы",
        items: [
          { title: "CRM и прогрев лидов — тёплая середина", desc: "Автоматические цепочки сопровождения, которые держат шестинедельное решение тёплым без опоры на память агента о звонке, — закрывают разрыв, где утекает большинство воронок недвижимости Дубая." },
          { title: "MSN Developments — связано с воронкой", desc: "Email- и CRM-прогрев, связанный с воронкой инвесторов, так что платные и органические лиды доводятся до решения, а не остывают." },
          { title: "Полный стек автоматизации", desc: "На базе HubSpot, Zoho, ActiveCampaign, Mailchimp, Zapier и WhatsApp Business — инструментарий для надёжного прогрева в масштабе." },
        ],
      },
      expertise: {
        heading: "Почему специалист по CRM и прогреву лидов в недвижимости Дубая",
        body: [
          "Шарун Ирфан Хан — performance- и CRM-лид для недвижимости Дубая, руководитель маркетинга в MSN Developments. Строит CRM и автоматизацию email/WhatsApp (HubSpot, Zoho, ActiveCampaign, Zapier), связанную с воронкой инвесторов, — слой сопровождения, который превращает AED 35M+ сгенерированных лидов в закрытые сделки.",
        ],
      },
      faqs: [
        { q: "Работает ли email-маркетинг для недвижимости Дубая?", a: "Да — email-маркетинг для недвижимости в Дубае — это то, где выигрываются длинные циклы покупки: он держит многонедельное решение тёплым и реактивирует базу, за построение которой вы уже заплатили." },
        { q: "Email или WhatsApp?", a: "И то и другое — WhatsApp для мгновенного личного сопровождения, email для глубины (объекты, обновления рынка, детали для инвесторов). Мы автоматизируем их вместе." },
        { q: "Что застройщикам отправлять инвесторам?", a: "Прогрев инвесторов — аналитику рынка, ход проекта и обновления по доходности/аренде в цепочке, а не разовые рассылки." },
      ],
      closingTitle: "Теряете лиды в разрыве перед решением? Запишитесь на звонок за планом email-маркетинга для недвижимости в Дубае и CRM.",
    },
  },

  /* PAGE 8 — Web Development ----------------------------------------- */
  {
    slug: "real-estate-web-development-dubai",
    related: ["real-estate-seo-dubai", "real-estate-ppc-dubai", "real-estate-social-media-marketing-dubai"],
    en: {
      label: "Real Estate Web Development",
      metaTitle: "Real Estate Web Development Dubai | Lead-Gen Sites",
      metaDescription:
        "Real estate web development in Dubai — fast, mobile-first project and listing sites with enquiry forms built to qualify buyers, not just collect emails.",
      h1: "Real Estate Web Development in Dubai",
      heroLede:
        "A buyer decides in seconds whether your listing is worth an enquiry — on their phone. Real estate web development in Dubai builds fast, mobile-first project and listing sites with forms designed to qualify a serious buyer, not just collect an email address.",
      ctaLabel: "Get my website plan",
      ctaSub: "A site that loads fast, ranks, and turns traffic into qualified enquiries.",
      whatsIncluded: {
        heading: "What real estate web design in Dubai includes",
        lead: "Real estate web development Dubai built for speed, mobile and leads:",
        items: [
          "Strategy, UX and design around the buyer journey",
          "Build on WordPress/Elementor or custom — fast, secure, easy to update",
          "Listing and off-plan project pages with search and enquiry forms",
          "Lead-capture forms that qualify (intent, budget, timeline), not just collect",
          "Speed and mobile-first — the difference between an enquiry and a bounce",
          "SEO-ready build and CRM integration (pairs with SEO and Email)",
        ],
      },
      forCompanies: {
        heading: "Property website development for developers & brokerages",
        lead: "For companies, the website is the hub of the launch and the investor pipeline:",
        items: [
          "Off-plan project websites and developer platforms tied to lead-gen architecture",
          "Inventory/listing systems for multi-agent brokerages",
          "Analytics and CRM wiring so every enquiry is tracked to source",
        ],
      },
      forAgents: {
        heading: "Website for real estate agents",
        lead: "For an individual agent, the site is your always-on lead machine:",
        items: [
          "A personal agent site and listing pages that build credibility",
          "Mobile-first lead-capture with click-to-WhatsApp",
          "SEO-ready so your community pages can rank",
        ],
      },
      caseStudies: {
        heading: "Case studies",
        items: [
          { title: "MSN Developments — developer platform", desc: "msndevelopments.com — a luxury developer platform for off-plan launches with SEO and lead-gen architecture tied to the investor pipeline." },
          { title: "Real estate sites, designed & ranked", desc: "firstkeyint.com (B2B brokerage), dubai-luxuryspace.ae (property management / short-term rental) and mshahidnawaz.com (executive property brand) — built for lead capture and positioning." },
          { title: "20+ websites launched & optimised", desc: "Strategy, design, development and SEO across 20+ launches — sites designed, built and ranked, not just handed over." },
        ],
      },
      expertise: {
        heading: "Why a Dubai real estate web specialist",
        body: [
          "Sharoon Irfan Khan — web & performance lead for Dubai real estate, Head of Marketing at MSN Developments. 20+ websites launched and optimised (WordPress, Elementor, HTML/CSS, WooCommerce) including live developer and brokerage platforms — sites that are designed, built AND ranked, with lead-gen and CRM wired in from day one.",
        ],
      },
      faqs: [
        { q: "How long does a real estate website take in Dubai?", a: "A focused real estate web development Dubai build typically runs a few weeks depending on listings and integrations; we prioritise a fast, converting launch over endless scope." },
        { q: "What makes a property website convert?", a: "Speed, mobile-first design and enquiry forms that qualify — plus an SEO-ready build so the traffic is there to convert in the first place." },
        { q: "WordPress or custom?", a: "Website for real estate agents and most brokerages are served best by WordPress/Elementor (fast, editable); developer platforms may warrant custom — we choose by pipeline, not preference." },
      ],
      closingTitle: "Need a site that converts buyers, not just looks good? Book a call for a real estate web development Dubai plan.",
    },
    ar: {
      label: "تطوير مواقع العقارات",
      metaTitle: "تطوير مواقع العقارات في دبي | مواقع توليد العملاء",
      metaDescription:
        "تطوير مواقع العقارات في دبي — مواقع مشاريع وعروض سريعة مصممة أولاً للهاتف بنماذج استفسار مبنية لتأهيل المشترين، لا لجمع البريد فقط.",
      h1: "تطوير مواقع العقارات في دبي",
      heroLede:
        "يقرّر المشتري خلال ثوانٍ إن كان عرضك يستحق استفساراً — على هاتفه. تطوير مواقع العقارات في دبي يبني مواقع مشاريع وعروض سريعة مصممة أولاً للهاتف بنماذج مصممة لتأهيل مشترٍ جاد، لا لمجرد جمع عنوان بريد.",
      ctaLabel: "احصل على خطة الموقع",
      ctaSub: "موقع يُحمّل بسرعة، ويُرتَّب، ويحوّل الزيارات إلى استفسارات مؤهلة.",
      whatsIncluded: {
        heading: "ما الذي يشمله تصميم مواقع العقارات في دبي",
        lead: "تطوير مواقع عقارية في دبي مبني للسرعة والهاتف والعملاء:",
        items: [
          "استراتيجية وتجربة استخدام وتصميم حول رحلة المشتري",
          "بناء على WordPress/Elementor أو مخصص — سريع وآمن وسهل التحديث",
          "صفحات عروض ومشاريع على المخطط ببحث ونماذج استفسار",
          "نماذج التقاط عملاء تؤهّل (النية، الميزانية، الإطار الزمني)، لا تجمع فقط",
          "السرعة والهاتف أولاً — الفرق بين استفسار وارتداد",
          "بناء جاهز لتحسين محركات البحث وتكامل CRM (يقترن بتحسين محركات البحث والبريد)",
        ],
      },
      forCompanies: {
        heading: "تطوير مواقع العقارات للمطورين والوسطاء",
        lead: "للشركات، الموقع هو محور الإطلاق وقاعدة المستثمرين:",
        items: [
          "مواقع مشاريع على المخطط ومنصات مطوّرين مرتبطة ببنية توليد العملاء",
          "أنظمة مخزون/عروض للوسطاء متعددي الوكلاء",
          "تحليلات وربط CRM بحيث يُتتبَّع كل استفسار إلى مصدره",
        ],
      },
      forAgents: {
        heading: "موقع لوكلاء العقارات",
        lead: "للوكيل الفردي، الموقع هو آلة توليد العملاء الدائمة:",
        items: [
          "موقع وكيل شخصي وصفحات عروض تبني المصداقية",
          "التقاط عملاء أولاً للهاتف مع نقرة إلى واتساب",
          "جاهز لتحسين محركات البحث بحيث تُرتَّب صفحات مجتمعك",
        ],
      },
      caseStudies: {
        heading: "دراسات حالة",
        items: [
          { title: "MSN Developments — منصة مطوّر", desc: "msndevelopments.com — منصة مطوّر فاخرة لإطلاقات على المخطط ببنية تحسين محركات بحث وتوليد عملاء مرتبطة بقاعدة المستثمرين." },
          { title: "مواقع عقارية، صُمّمت ورُتّبت", desc: "firstkeyint.com (وساطة B2B)، وdubai-luxuryspace.ae (إدارة ممتلكات/إيجار قصير الأمد)، وmshahidnawaz.com (علامة عقارية تنفيذية) — مبنية لالتقاط العملاء والتموضع." },
          { title: "أكثر من 20 موقعاً أُطلق وحُسّن", desc: "استراتيجية وتصميم وتطوير وتحسين محركات بحث عبر أكثر من 20 إطلاقاً — مواقع صُمّمت وبُنيت ورُتّبت، لا سُلّمت فقط." },
        ],
      },
      expertise: {
        heading: "لماذا مختص مواقع عقارية في دبي",
        body: [
          "شارون عرفان خان — قائدة ويب وأداء لعقارات دبي، ورئيسة التسويق في MSN Developments. أكثر من 20 موقعاً أُطلق وحُسّن (WordPress وElementor وHTML/CSS وWooCommerce) تشمل منصات مطوّرين ووسطاء فعّالة — مواقع صُمّمت وبُنيت ورُتّبت، مع توليد عملاء وCRM مربوطين من اليوم الأول.",
        ],
      },
      faqs: [
        { q: "كم يستغرق موقع عقاري في دبي؟", a: "بناء موقع عقاري مركّز في دبي عادةً يمتد بضعة أسابيع حسب العروض والتكاملات؛ نعطي الأولوية لإطلاق سريع يحوّل على نطاق لا نهاية له." },
        { q: "ما الذي يجعل موقع عقار يحوّل؟", a: "السرعة، والتصميم أولاً للهاتف، ونماذج استفسار تؤهّل — إضافة إلى بناء جاهز لتحسين محركات البحث بحيث تكون الزيارات موجودة لتحويلها أساساً." },
        { q: "WordPress أم مخصص؟", a: "موقع لوكلاء العقارات ومعظم الوسطاء يُخدَمون على أفضل نحو بـ WordPress/Elementor (سريع، قابل للتحرير)؛ منصات المطوّرين قد تستدعي المخصص — نختار حسب خط الأنابيب لا التفضيل." },
      ],
      closingTitle: "تحتاج موقعاً يحوّل المشترين، لا يبدو جيداً فقط؟ احجز مكالمة للحصول على خطة تطوير موقع عقاري في دبي.",
    },
    ru: {
      label: "Веб-разработка для недвижимости",
      metaTitle: "Веб-разработка для недвижимости в Дубае | Сайты под лидогенерацию",
      metaDescription:
        "Веб-разработка для недвижимости в Дубае — быстрые мобильные сайты проектов и объектов с формами заявок, созданными чтобы квалифицировать покупателей, а не просто собирать email.",
      h1: "Веб-разработка для недвижимости в Дубае",
      heroLede:
        "Покупатель за секунды решает, стоит ли ваш объект заявки, — на телефоне. Веб-разработка для недвижимости в Дубае строит быстрые мобильные сайты проектов и объектов с формами, созданными чтобы квалифицировать серьёзного покупателя, а не просто собрать адрес email.",
      ctaLabel: "Получить план по сайту",
      ctaSub: "Сайт, который быстро грузится, ранжируется и превращает трафик в квалифицированные заявки.",
      whatsIncluded: {
        heading: "Что входит в веб-дизайн для недвижимости в Дубае",
        lead: "Веб-разработка для недвижимости в Дубае, построенная под скорость, мобильные и лиды:",
        items: [
          "Стратегия, UX и дизайн вокруг пути покупателя",
          "Сборка на WordPress/Elementor или кастом — быстро, безопасно, легко обновлять",
          "Страницы объектов и проектов на этапе строительства с поиском и формами заявок",
          "Формы захвата, которые квалифицируют (намерение, бюджет, сроки), а не просто собирают",
          "Скорость и mobile-first — разница между заявкой и отказом",
          "Сборка, готовая к SEO, и интеграция с CRM (сочетается с SEO и Email)",
        ],
      },
      forCompanies: {
        heading: "Разработка сайтов недвижимости для застройщиков и агентств",
        lead: "Для компаний сайт — это центр запуска и воронки инвесторов:",
        items: [
          "Сайты проектов на этапе строительства и платформы застройщиков, связанные с архитектурой лидогенерации",
          "Системы инвентаря/объектов для агентств с несколькими агентами",
          "Аналитика и связка с CRM, чтобы каждая заявка отслеживалась к источнику",
        ],
      },
      forAgents: {
        heading: "Сайт для агентов по недвижимости",
        lead: "Для отдельного агента сайт — это ваша всегда работающая машина лидов:",
        items: [
          "Личный сайт агента и страницы объектов, которые строят доверие",
          "Mobile-first захват лидов с click-to-WhatsApp",
          "Готовность к SEO, чтобы страницы ваших районов могли ранжироваться",
        ],
      },
      caseStudies: {
        heading: "Кейсы",
        items: [
          { title: "MSN Developments — платформа застройщика", desc: "msndevelopments.com — люксовая платформа застройщика для запусков на этапе строительства с архитектурой SEO и лидогенерации, связанной с воронкой инвесторов." },
          { title: "Сайты недвижимости, спроектированные и выведенные в топ", desc: "firstkeyint.com (B2B-агентство), dubai-luxuryspace.ae (управление недвижимостью / краткосрочная аренда) и mshahidnawaz.com (бренд недвижимости уровня руководителя) — построены под захват лидов и позиционирование." },
          { title: "20+ сайтов запущено и оптимизировано", desc: "Стратегия, дизайн, разработка и SEO по 20+ запускам — сайты спроектированы, собраны и выведены в топ, а не просто сданы." },
        ],
      },
      expertise: {
        heading: "Почему веб-специалист по недвижимости в Дубае",
        body: [
          "Шарун Ирфан Хан — веб- и performance-лид для недвижимости Дубая, руководитель маркетинга в MSN Developments. 20+ сайтов запущено и оптимизировано (WordPress, Elementor, HTML/CSS, WooCommerce), включая действующие платформы застройщиков и агентств, — сайты, которые спроектированы, собраны И выведены в топ, с лидогенерацией и CRM, встроенными с первого дня.",
        ],
      },
      faqs: [
        { q: "Сколько занимает сайт недвижимости в Дубае?", a: "Сфокусированная сборка сайта недвижимости в Дубае обычно занимает несколько недель в зависимости от объектов и интеграций; мы отдаём приоритет быстрому конвертирующему запуску, а не бесконечному объёму." },
        { q: "Что заставляет сайт недвижимости конвертировать?", a: "Скорость, mobile-first дизайн и формы заявок, которые квалифицируют, — плюс сборка, готовая к SEO, чтобы трафик для конверсии вообще был." },
        { q: "WordPress или кастом?", a: "Сайт для агентов по недвижимости и большинство агентств лучше всего обслуживаются WordPress/Elementor (быстро, редактируемо); платформам застройщиков может подойти кастом — мы выбираем по воронке, а не по предпочтению." },
      ],
      closingTitle: "Нужен сайт, который конвертирует покупателей, а не просто хорошо выглядит? Запишитесь на звонок за планом веб-разработки для недвижимости в Дубае.",
    },
  },
];

/* -------------------------------------------------------------------------- */
/* Lookups                                                                     */
/* -------------------------------------------------------------------------- */

export function getServicePage(slug: string): ServicePage | undefined {
  return servicePages.find((page) => page.slug === slug);
}

/** All sub-service slugs — for `generateStaticParams` and the sitemap. */
export const servicePageSlugs = servicePages.map((p) => p.slug);

/** The localized content for a page, falling back to English until a
 *  translation is filled in. */
export function servicePageContent(page: ServicePage, locale: Locale): ServicePageContent {
  return (locale === "ar" ? page.ar : locale === "ru" ? page.ru : undefined) ?? page.en;
}

export function agentsPageContent(locale: Locale): AgentsPageContent {
  return (locale === "ar" ? agentsPage.ar : locale === "ru" ? agentsPage.ru : undefined) ?? agentsPage.en;
}
