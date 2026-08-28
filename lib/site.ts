/**
 * Single source of truth for site content and contact details.
 *
 * Copy follows `Shario content (1).pdf` — the client's content document, which
 * positions Shario as a founder-led *performance marketing* company: "A Dubai
 * Digital Marketing Company That Turns Spend Into Revenue". That document
 * supersedes the earlier Brand Book positioning (a boutique creative studio),
 * and the Arabic lockup and the six creative-studio capabilities retired with
 * it. The tagline itself, "A Symphony of Identity", was later reinstated by
 * the client as the brand line under the hero and in the footer — set without
 * a trailing period everywhere it appears.
 *
 * The Brand Book still governs the *visual* system only — palette, typography
 * and the composed, unhurried tone. Never "game-changing" or "world-class".
 *
 * The content document supplies finished copy for Home, About, Services and
 * Contact. The five service detail pages are written here to the same voice,
 * expanding the one-paragraph summary the document gives each service into
 * outcomes, deliverables and FAQs.
 *
 * Structure rule, and the reason this file is much shorter than it was: every
 * block appears on exactly one page. The process steps live on About, the FAQs
 * live on service pages. Nothing is repeated across templates.
 */

import type { Locale } from "@/lib/locale";

export const site = {
  name: "Shario",
  /**
   * The canonical production host. `metadataBase` and every
   * canonical/og:url/og:image/sitemap/robots/structured-data URL derive
   * from this one constant, so it has to be the host that serves directly
   * at the Vercel edge with zero redirect hops — `www.shario.ae` 308s here,
   * not the other way around (domain-alias config, not this app). Google
   * Search Console treats the apex and `www` as distinct hosts; splitting
   * canonical signals between them is what caused pages to sit as
   * "Discovered/Crawled — currently not indexed" instead of indexing under
   * one host. If the Vercel domain config ever flips which host is primary,
   * this is the one line to change back — and OG crawlers (WhatsApp,
   * Facebook) that fetch `og:image` once without following a redirect are
   * the reason it must always match whichever host is actually primary.
   */
  domain: "https://shario.ae",
  tagline: "A Symphony of Identity",
  /**
   * The exact phrase `ArabicStatement` (`components/ui.tsx`) sets as the
   * homepage's Arabic brand accent — hoisted here so the footer and every
   * `/ar` page quote the same literal rather than each retyping it.
   */
  taglineAr: "سيمفونية الهوية",
  /** Russian counterpart to `taglineAr` — a natural adaptation ("Symphony of Identity"), not a stiffer literal rendering. */
  taglineRu: "Симфония идентичности",
  /**
   * ~150–160 characters — the practical ceiling before Google truncates a
   * snippet in search results. All three language versions below are held
   * to the same range for the same reason; `descriptionAr`/`descriptionRu`
   * previously ran to 174/211 characters respectively.
   */
  description:
    "Shario is a founder-led marketing agency in Dubai building digital marketing systems — paid media, SEO, websites and CRM — that turn spend into revenue.",
  descriptionAr:
    "شاريو وكالة تسويق رقمي في دبي تقودها مؤسستها، تبني أنظمة تسويقية تحقق مبيعات: الإعلانات المدفوعة، تحسين محركات البحث، المواقع الإلكترونية، وإدارة علاقات العملاء.",
  descriptionRu:
    "SHARIO — агентство цифрового маркетинга в Дубае под руководством основателя. Строим системы, которые приносят продажи: платный трафик, SEO, сайты, CRM.",
  location: "Dubai, UAE",
  locationAr: "دبي، الإمارات العربية المتحدة",
  locationRu: "Дубай, ОАЭ",
  studio: "Dubai, United Arab Emirates",
  phone: "+971 50 467 9095",
  phoneHref: "+971504679095",
  /** wa.me's click-to-chat format: country code + number, no "+", no spaces. */
  whatsapp: "https://wa.me/971504679095",
  email: "info@shario.ae",
  /** Split for `<ObfuscatedEmail>` (`components/obfuscated-email.tsx`), the same way `phoneHref` is `phone` in the one format `tel:` needs. */
  emailUser: "info",
  emailDomain: "shario.ae",
  website: "shario.ae",
  linkedin: "https://linkedin.com/in/sharoonirfan",
  /** Her own site — the canonical Person entity SHARIO's founder markup points back to via `@id`/`url` (`components/structured-data.tsx`), rather than restating a second, disconnected Person record. */
  founderUrl: "https://sharoon.ae",
  founder: "Sharoon Irfan Khan",
  founderAr: "شارون عرفان خان",
  /** Personal name, transliterated — not the SHARIO brand name, which stays in Latin script everywhere, including inside Russian copy. */
  founderRu: "Шарун Ирфан Хан",
  /** Matches the title already used in the About page's founder credit line — kept as one value here so structured data and visible copy can never drift apart. */
  founderRole: "Revenue Marketing Architect",
  founderRoleAr: "مهندسة التسويق القائم على الإيرادات",
  founderRoleRu: "Архитектор маркетинга, ориентированного на выручку",
  /** The headline claim, cited on Home and About. */
  revenue: "AED 35M+",
  experience: "6+ years",
  experienceAr: "أكثر من 6 سنوات",
  experienceRu: "Более 6 лет",
} as const;

/**
 * Spread into every page's `openGraph` object, not set once at the root.
 * Next resolves `openGraph` per route segment as a full reassignment, not a
 * deep merge — a page that sets its own `openGraph.title`/`description`
 * silently drops whatever the root layout set (`siteName`, `locale`), which
 * is how `og:site_name` went missing on every page despite the root layout
 * declaring it. Verified against node_modules/next's own resolve-metadata.js
 * (the `case 'openGraph':` branch assigns rather than merging) before
 * concluding this wasn't fixable by relying on inheritance.
 */
export const ogDefaults = {
  siteName: site.name,
  locale: "en_AE",
} as const;

/** Same as `ogDefaults`, for every `/ar` page's `openGraph` object. */
export const ogDefaultsAr = {
  siteName: site.name,
  locale: "ar_AE",
} as const;

/** Same as `ogDefaults`, for every `/ru` page's `openGraph` object. */
export const ogDefaultsRu = {
  siteName: site.name,
  locale: "ru_RU",
} as const;

/**
 * Every hero/banner photo's path and crop bias, one place, shared by both
 * the English and Arabic version of each page (and by that page's
 * `opengraph-image.tsx`) — the photography doesn't change between
 * languages, only the copy over it. Alt text stays per-page-per-locale
 * (it's translated content, not a shared fact), so it isn't here.
 *
 * `focus` values are read as plain `objectPosition` strings by `lib/og.tsx`;
 * the live pages still hardcode the matching `object-[…]` Tailwind class
 * themselves rather than deriving it from this string — Tailwind's JIT only
 * generates a utility for a class name it finds verbatim in source, so a
 * class built from a template literal would silently produce no CSS.
 */
export const heroImages = {
  home: { src: "/images/hero/portrait.jpg", focus: "50% 28%" },
  about: { src: "/images/book/about-frames.jpg", focus: "50% 50%" },
  contact: { src: "/images/travertine-wall.jpg", focus: "62% 50%" },
  services: { src: "/images/book/services-portrait.jpg", focus: "48% 30%" },
  insights: {
    src: "/images/insights/insights-banner-sunlit-wall.jpg",
    focus: "58% 28%",
  },
  industries: { src: "/images/industries/overview.jpg", focus: "50% 45%" },
} as const;

/**
 * Non-hero photograph paths shared between the English and Arabic version of
 * the same page — same reasoning as `heroImages` above: `check:images` fails
 * the build the moment a literal `/images/...` string appears twice in
 * source, so both locales' pages import the one constant rather than each
 * quoting the path itself.
 */
export const sharedImages = {
  /** Home's "About Shario" band and About's own opening portrait band. */
  homeAboutHorizon: "/images/about/horizon.jpg",
  /** About's "The Founder" band. */
  founderPortrait: "/images/book/founder-stable.jpg",
  /** Contact's stairwell beside the enquiry form. */
  contactStair: "/images/book/photo-stair.jpg",
  /** Home's "How We Work" / "What Makes Us Different" card textures, in order. */
  homeStepTextures: [
    "/images/texture/stone.jpg",
    "/images/texture/build.jpg",
    "/images/texture/interior.jpg",
    "/images/texture/desk.jpg",
  ],
  /**
   * The default banner for a Market News article's card/hero `image` when it
   * doesn't have a dedicated photograph of its own — used so a shared photo
   * across multiple Market News articles reads as deliberate to `check:images`
   * rather than a mistake. Not mandatory per article: `dubai-ad-auctions-
   * getting-more-competitive` has its own unique image instead, and that's
   * fine — set `image: sharedImages.marketNewsBanner` only when an article
   * doesn't need its own.
   */
  marketNewsBanner: "/images/insights/market-news-banner-candlelit-chessboard.jpg",
} as const;

/** Primary navigation. The CTA button beside it is not a nav item. */
export const nav = [
  { href: "/", label: "Home", labelAr: "الرئيسية", labelRu: "Главная" },
  { href: "/services", label: "Services", labelAr: "الخدمات", labelRu: "Услуги" },
  { href: "/industries", label: "Industries", labelAr: "القطاعات", labelRu: "Отрасли" },
  { href: "/insights", label: "Insights", labelAr: "رؤى", labelRu: "Инсайты" },
  { href: "/about", label: "About", labelAr: "من نحن", labelRu: "О нас" },
  { href: "/contact", label: "Contact", labelAr: "تواصل", labelRu: "Контакты" },
] as const;

/** The footer's social row. `platform` selects the icon glyph in `<SocialIcon>`. */
export const social = [
  {
    platform: "facebook",
    label: "Facebook",
    href: "https://www.facebook.com/shario.ae",
  },
  {
    platform: "instagram",
    label: "Instagram",
    href: "https://www.instagram.com/shario.ae/",
  },
  {
    platform: "threads",
    label: "Threads",
    href: "https://www.threads.com/@shario.ae",
  },
  { platform: "x", label: "X (Twitter)", href: "https://x.com/shario_ae" },
  {
    platform: "youtube",
    label: "YouTube",
    href: "https://www.youtube.com/channel/UCERPHhfg4nYz0FcrM1T7nMg",
  },
  {
    platform: "tiktok",
    label: "TikTok",
    href: "https://www.tiktok.com/@shario.ae",
  },
  {
    platform: "snapchat",
    label: "Snapchat",
    href: "https://www.snapchat.com/add/shario.ae",
  },
  {
    platform: "linkedin",
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/shario-ae",
  },
] as const;

/** The action repeated in the header, every hero and every closing band. */
/**
 * The "Let's Connect" pill — header, every hero and every closing band.
 * Opens WhatsApp directly rather than the Contact page: the fastest path to
 * a reply for a visitor who already knows they want to talk. The Contact
 * page itself (nav link, form, phone, email) is unchanged and still there
 * for anyone who wants it instead.
 */
export const cta = {
  label: "Let's Connect",
  labelAr: "تواصل معنا",
  labelRu: "Связаться с нами",
  href: site.whatsapp,
} as const;

/* -------------------------------------------------------------------------- */
/* Home                                                                        */
/* -------------------------------------------------------------------------- */

/**
 * The stat row beneath the hero. Four figures, each defensible: two are the
 * founder's tracked results, two describe how the company is staffed.
 */
export const stats = [
  { figure: "AED 35M+", label: "CRM-attributed revenue" },
  { figure: "6+", label: "Years in Dubai marketing" },
  { figure: "5", label: "Services, one connected system" },
  { figure: "1", label: "Senior team, founder-led" },
] as const;

/**
 * The homepage FAQ. Kept distinct from the per-service FAQs — those answer
 * "how does this service work", these answer "should I talk to you at all".
 */
export const homeFaqs = [
  {
    q: "What does SHARIO do?",
    qAr: "ماذا تفعل شاريو؟",
    qRu: "Чем занимается SHARIO?",
    a: "SHARIO brings strategy, digital, creative and growth together to build clearer brands and stronger marketing systems.",
    aAr: "تجمع شاريو بين الاستراتيجية والرقمي والإبداع والنمو لبناء علامات تجارية أوضح وأنظمة تسويقية أقوى.",
    aRu: "SHARIO объединяет стратегию, digital, креатив и рост в единую систему, чтобы создавать более чёткие бренды и более сильные маркетинговые системы.",
  },
  {
    q: "What services do you offer?",
    qAr: "ما الخدمات التي تقدمونها؟",
    qRu: "Какие услуги вы предоставляете?",
    a: "Our core services include Digital Marketing, SEO (Search Engine Optimization), Website Development, CRM & Marketing Automation, Branding, and Marketing Consulting.",
    aAr: "تشمل خدماتنا الأساسية التسويق الرقمي، وتحسين محركات البحث (SEO)، وتطوير المواقع الإلكترونية، وإدارة علاقات العملاء وأتمتة التسويق، والعلامة التجارية، والاستشارات التسويقية.",
    aRu: "Наши ключевые направления — цифровой маркетинг, SEO (поисковая оптимизация), веб-разработка, CRM и маркетинговая автоматизация, брендинг, а также маркетинговый консалтинг.",
  },
  {
    q: "Do you work with businesses in Dubai only?",
    qAr: "هل تعملون مع شركات في دبي فقط؟",
    qRu: "Вы работаете только с компаниями в Дубае?",
    a: "SHARIO is based in Dubai and works with brands across the UAE and beyond.",
    aAr: "تتخذ شاريو من دبي مقراً لها وتعمل مع علامات تجارية في جميع أنحاء الإمارات وخارجها.",
    aRu: "SHARIO базируется в Дубае и работает с брендами по всей территории ОАЭ и за её пределами.",
  },
  {
    q: "How do we start working with SHARIO?",
    qAr: "كيف نبدأ العمل مع شاريو؟",
    qRu: "Как начать работу с SHARIO?",
    a: "Every engagement starts with a conversation. We first understand your goals, challenges and current marketing setup, then recommend the right direction.",
    aAr: "يبدأ كل تعاون بمحادثة. نفهم أولاً أهدافكم وتحدياتكم وإعداد التسويق الحالي لديكم، ثم نوصي بالاتجاه الصحيح.",
    aRu: "Любое сотрудничество начинается с разговора. Сначала мы разбираемся в ваших целях, задачах и текущей маркетинговой ситуации, а затем предлагаем верное направление.",
  },
  {
    q: "Do you offer individual services or complete marketing systems?",
    qAr: "هل تقدمون خدمات فردية أم أنظمة تسويقية كاملة؟",
    qRu: "Вы предлагаете отдельные услуги или комплексные маркетинговые системы?",
    a: "Both. We can support a specific need or bring multiple disciplines together into one connected system.",
    aAr: "كلاهما. يمكننا دعم حاجة محددة أو جمع عدة تخصصات في نظام واحد متصل.",
    aRu: "И то, и другое. Мы можем закрыть конкретную задачу или объединить несколько направлений в единую слаженную систему.",
  },
  {
    q: "How long does an engagement typically take?",
    qAr: "كم تستغرق مدة التعاون عادة؟",
    qRu: "Сколько обычно длится сотрудничество?",
    a: "It depends on the scope. After understanding your requirements, we define the appropriate timeline and deliverables before work begins.",
    aAr: "يعتمد ذلك على النطاق. بعد فهم متطلباتكم، نحدد الجدول الزمني والمخرجات المناسبة قبل بدء العمل.",
    aRu: "Это зависит от объёма задач. Разобравшись в ваших требованиях, мы определяем сроки и результаты ещё до начала работы.",
  },
  {
    q: "Do you work with existing brands?",
    qAr: "هل تعملون مع علامات تجارية قائمة بالفعل؟",
    qRu: "Вы работаете с уже существующими брендами?",
    a: "Yes. We work with brands that need clearer positioning, stronger digital experiences, better performance or a more connected marketing system.",
    aAr: "نعم. نعمل مع العلامات التجارية التي تحتاج إلى تموضع أوضح، وتجارب رقمية أقوى، وأداء أفضل، أو نظام تسويقي أكثر ترابطاً.",
    aRu: "Да. Мы работаем с брендами, которым нужно более чёткое позиционирование, более сильный digital-опыт, лучшие показатели эффективности или более слаженная маркетинговая система.",
  },
  {
    q: "Can SHARIO build and manage our website?",
    qAr: "هل يمكن لشاريو بناء موقعنا الإلكتروني وإدارته؟",
    qRu: "Может ли SHARIO создать и вести наш сайт?",
    a: "Yes. Website work can cover strategy, structure, design, development, SEO-ready architecture, conversion and ongoing optimisation.",
    aAr: "نعم. يمكن أن يشمل عمل الموقع الإلكتروني الاستراتيجية والبنية والتصميم والتطوير، وبنية جاهزة لتحسين محركات البحث، والتحويل، والتحسين المستمر.",
    aRu: "Да. Работа над сайтом может включать стратегию, структуру, дизайн, разработку, архитектуру, готовую к SEO, конверсию и постоянную оптимизацию.",
  },
  {
    q: "Do you provide ongoing marketing support?",
    qAr: "هل تقدمون دعماً تسويقياً مستمراً؟",
    qRu: "Вы оказываете постоянную маркетинговую поддержку?",
    a: "Yes. Depending on the engagement, SHARIO can support ongoing strategy, performance, SEO, creative, CRM and digital growth.",
    aAr: "نعم. حسب طبيعة التعاون، يمكن لشاريو دعم الاستراتيجية المستمرة والأداء وتحسين محركات البحث والإبداع وإدارة علاقات العملاء والنمو الرقمي.",
    aRu: "Да. В зависимости от формата сотрудничества SHARIO может постоянно вести стратегию, цифровой маркетинг, SEO, креатив, CRM и цифровой рост.",
  },
  {
    q: "How do I know which service I need?",
    qAr: "كيف أعرف الخدمة التي أحتاجها؟",
    qRu: "Как понять, какая услуга мне нужна?",
    a: "You don't have to figure it out alone. Tell us what you're trying to achieve, and we'll identify the most relevant starting point.",
    aAr: "لستم بحاجة لمعرفة ذلك بمفردكم. أخبرونا بما تحاولون تحقيقه، وسنحدد نقطة البداية الأنسب.",
    aRu: "Вам не нужно разбираться в этом самостоятельно. Расскажите нам, чего вы хотите достичь, и мы определим наиболее подходящую отправную точку.",
  },
  {
    q: "What industries does SHARIO work with?",
    qAr: "ما القطاعات التي تعمل معها شاريو؟",
    qRu: "С какими отраслями работает SHARIO?",
    a: "We work with ambitious businesses and brands across sectors where positioning, digital presence and measurable growth matter.",
    aAr: "نعمل مع الشركات والعلامات التجارية الطموحة عبر القطاعات التي يهم فيها التموضع والحضور الرقمي والنمو القابل للقياس.",
    aRu: "Мы работаем с амбициозными компаниями и брендами из разных отраслей — там, где важны позиционирование, цифровое присутствие и измеримый рост.",
  },
  {
    q: "Can you work with our existing marketing team?",
    qAr: "هل يمكنكم العمل مع فريق التسويق الحالي لدينا؟",
    qRu: "Можете ли вы работать с нашей действующей маркетинговой командой?",
    a: "Yes. SHARIO can work alongside internal teams, existing partners or specialist suppliers.",
    aAr: "نعم. يمكن لشاريو العمل جنباً إلى جنب مع الفرق الداخلية أو الشركاء الحاليين أو الموردين المتخصصين.",
    aRu: "Да. SHARIO может работать совместно с внутренними командами, существующими партнёрами или профильными подрядчиками.",
  },
  {
    q: "Do you provide strategy before execution?",
    qAr: "هل تقدمون استراتيجية قبل التنفيذ؟",
    qRu: "Вы разрабатываете стратегию до начала реализации?",
    a: "Yes. We believe execution is stronger when it is built around a clear strategic direction.",
    aAr: "نعم. نؤمن بأن التنفيذ يكون أقوى عندما يُبنى حول اتجاه استراتيجي واضح.",
    aRu: "Да. Мы убеждены, что реализация эффективнее, когда она строится вокруг чёткого стратегического направления.",
  },
  {
    q: "Can you help reposition an existing brand?",
    qAr: "هل يمكنكم المساعدة في إعادة تموضع علامة تجارية قائمة؟",
    qRu: "Можете ли вы помочь с репозиционированием существующего бренда?",
    a: "Yes. We can help clarify positioning, refine messaging and create a stronger expression of the brand.",
    aAr: "نعم. يمكننا المساعدة في توضيح التموضع وصقل الرسائل وخلق تعبير أقوى عن العلامة التجارية.",
    aRu: "Да. Мы помогаем уточнить позиционирование, отточить коммуникацию и создать более сильное выражение бренда.",
  },
  {
    q: "Can you improve an existing website rather than build a new one?",
    qAr: "هل يمكنكم تحسين موقع إلكتروني قائم بدلاً من بناء موقع جديد؟",
    qRu: "Можете ли вы улучшить существующий сайт вместо разработки нового?",
    a: "Yes. We can assess the existing experience and identify opportunities across structure, UX, SEO, conversion and performance.",
    aAr: "نعم. يمكننا تقييم التجربة الحالية وتحديد الفرص عبر البنية وتجربة المستخدم وتحسين محركات البحث والتحويل والأداء.",
    aRu: "Да. Мы оцениваем текущий пользовательский опыт и находим точки роста в структуре, UX, SEO, конверсии и производительности.",
  },
  {
    q: "Do you provide SEO as a standalone service?",
    qAr: "هل تقدمون تحسين محركات البحث كخدمة منفصلة؟",
    qRu: "Предоставляете ли вы SEO как отдельную услугу?",
    a: "Yes. SEO can be approached as a standalone engagement or integrated with content, website and broader digital strategy.",
    aAr: "نعم. يمكن التعامل مع تحسين محركات البحث كتعاون منفصل أو دمجه مع المحتوى والموقع الإلكتروني والاستراتيجية الرقمية الأوسع.",
    aRu: "Да. SEO можно вести как самостоятельное направление или интегрировать с контентом, сайтом и более широкой digital-стратегией.",
  },
  {
    q: "Do you manage paid advertising?",
    qAr: "هل تديرون الإعلانات المدفوعة؟",
    qRu: "Вы занимаетесь платной рекламой?",
    a: "Yes. Our Digital Marketing service covers paid media across relevant platforms, with a focus on qualified demand and measurable outcomes.",
    aAr: "نعم. تغطي خدمة التسويق الرقمي لدينا الإعلانات المدفوعة عبر المنصات ذات الصلة، مع التركيز على الطلب المؤهَّل والنتائج القابلة للقياس.",
    aRu: "Да. Наша услуга цифрового маркетинга охватывает платное продвижение на нужных площадках с акцентом на квалифицированный спрос и измеримые результаты.",
  },
  {
    q: "Can you create content for our brand?",
    qAr: "هل يمكنكم إنشاء محتوى لعلامتنا التجارية؟",
    qRu: "Можете ли вы создавать контент для нашего бренда?",
    a: "Yes. Content can include strategic messaging, social content, campaign creative and marketing collateral.",
    aAr: "نعم. يمكن أن يشمل المحتوى الرسائل الاستراتيجية والمحتوى الاجتماعي والتصاميم الإبداعية للحملات والمواد التسويقية.",
    aRu: "Да. Контент может включать стратегические сообщения, материалы для соцсетей, креатив для кампаний и маркетинговые материалы.",
  },
  {
    q: "Do you offer CRM and marketing automation?",
    qAr: "هل تقدمون إدارة علاقات العملاء وأتمتة التسويق؟",
    qRu: "Вы предлагаете CRM и автоматизацию маркетинга?",
    a: "Yes. We can help connect marketing activity, CRM and automation so leads and customer journeys are managed more effectively.",
    aAr: "نعم. يمكننا المساعدة في ربط النشاط التسويقي وإدارة علاقات العملاء والأتمتة بحيث تُدار رحلات العملاء المحتملين والعملاء بفعالية أكبر.",
    aRu: "Да. Мы помогаем связать маркетинговую активность, CRM и автоматизацию, чтобы более эффективно управлять лидами и путём клиента.",
  },
  {
    q: "What happens after the initial strategy?",
    qAr: "ماذا يحدث بعد الاستراتيجية الأولية؟",
    qRu: "Что происходит после разработки первоначальной стратегии?",
    a: "The strategy becomes the foundation for the next stage — whether that means brand work, digital execution, paid media, website development or ongoing growth support.",
    aAr: "تصبح الاستراتيجية الأساس للمرحلة التالية — سواء كان ذلك عمل العلامة التجارية، أو التنفيذ الرقمي، أو الإعلانات المدفوعة، أو تطوير الموقع الإلكتروني، أو دعم النمو المستمر.",
    aRu: "Стратегия становится основой для следующего этапа — будь то работа над брендом, digital-реализация, платный трафик, разработка сайта или постоянная поддержка роста.",
  },
  {
    q: "Do you offer custom solutions?",
    qAr: "هل تقدمون حلولاً مخصصة؟",
    qRu: "Вы предлагаете индивидуальные решения?",
    a: "Yes. We build the scope around the problem that needs solving.",
    aAr: "نعم. نبني النطاق حول المشكلة التي تحتاج إلى حل.",
    aRu: "Да. Мы формируем объём работ исходя из задачи, которую нужно решить.",
  },
  {
    q: "Can SHARIO work on a project basis?",
    qAr: "هل يمكن لشاريو العمل على أساس مشروع محدد؟",
    qRu: "Может ли SHARIO работать над отдельными проектами?",
    a: "Yes. Specific projects can be scoped around defined objectives, deliverables and timelines.",
    aAr: "نعم. يمكن تحديد نطاق المشاريع المحددة حول أهداف ومخرجات وجداول زمنية واضحة.",
    aRu: "Да. Отдельные проекты можно определить через чёткие цели, результаты и сроки.",
  },
  {
    q: "Can we start with just one service?",
    qAr: "هل يمكننا البدء بخدمة واحدة فقط؟",
    qRu: "Можно ли начать всего с одной услуги?",
    a: "Yes. You can begin with a specific requirement and expand into other areas as your needs evolve.",
    aAr: "نعم. يمكنكم البدء بمتطلب محدد والتوسع إلى مجالات أخرى مع تطور احتياجاتكم.",
    aRu: "Да. Вы можете начать с конкретной задачи и постепенно расширять сотрудничество по мере роста потребностей.",
  },
  {
    q: "How do you measure success?",
    qAr: "كيف تقيسون النجاح؟",
    qRu: "Как вы измеряете успех?",
    a: "Success depends on the objective. We focus on meaningful business and marketing outcomes rather than vanity metrics alone.",
    aAr: "يعتمد النجاح على الهدف. نركز على نتائج تجارية وتسويقية ذات معنى بدلاً من المقاييس السطحية وحدها.",
    aRu: "Успех зависит от цели. Мы фокусируемся на значимых бизнес- и маркетинговых результатах, а не только на показных метриках.",
  },
  {
    q: "What makes SHARIO different?",
    qAr: "ما الذي يميز شاريو؟",
    qRu: "Чем SHARIO отличается от других?",
    a: "We connect strategy, identity, digital and growth instead of treating them as isolated pieces.",
    aAr: "نربط الاستراتيجية والهوية والرقمي والنمو بدلاً من التعامل معها كأجزاء منفصلة.",
    aRu: "Мы связываем стратегию, идентичность, digital и рост, а не рассматриваем их как разрозненные элементы.",
  },
  {
    q: "How can I speak with SHARIO?",
    qAr: "كيف يمكنني التحدث مع شاريو؟",
    qRu: "Как я могу связаться с SHARIO?",
    a: "Let's connect — tell us what you're trying to achieve and we'll take it from there.",
    aAr: "لنتواصل — أخبرونا بما تحاولون تحقيقه وسنأخذ الأمر من هناك.",
    aRu: "Давайте общаться — расскажите, чего вы хотите достичь, и мы продолжим разговор с этого момента.",
  },
] as const;

/* -------------------------------------------------------------------------- */
/* About                                                                       */
/* -------------------------------------------------------------------------- */

/** The four principles in the About page's "Where We Work" band. */
export const workPrinciples = [
  {
    num: "01",
    title: "Strategy first",
    desc: "Every strong outcome begins with knowing what matters, who it is for and where to focus.",
  },
  {
    num: "02",
    title: "Built to connect",
    desc: "Strategy, identity, digital and growth work together rather than in isolation.",
  },
  {
    num: "03",
    title: "Made for momentum",
    desc: "We create systems that can evolve with the brand, the market and the next stage of growth.",
  },
  {
    num: "04",
    title: "Founder-led thinking",
    desc: "SHARIO stays close to the decisions that shape the brand and the business.",
  },
] as const;

/** "What Founder-Led Means for You". */
export const founderLed = [
  {
    num: "01",
    title: "Senior ownership",
    desc: "Your account is run to a founder's standard and stays in senior hands.",
  },
  {
    num: "02",
    title: "Revenue accountability",
    desc: "We align on pipeline and closed sales — the metrics that matter.",
  },
  {
    num: "03",
    title: "Full-funnel thinking",
    desc: "Brand, traffic, conversion and CRM handled as one connected system.",
  },
  {
    num: "04",
    title: "Direct access",
    desc: "You talk to the people building your campaigns.",
  },
] as const;

/**
 * The About page's own approach band — Understand, Build, Measure, Refine.
 * Distinct from `howWeWork` below: that one is the homepage's four-step
 * engagement rhythm ("Start with your numbers" etc.); this is the broader
 * method the company itself runs on, one level up from a single engagement.
 */
export const aboutApproach = [
  {
    num: "01",
    title: "Understand",
    titleAr: "الفهم",
    titleRu: "Понимание",
    desc: "Start with the business, audience, numbers and opportunity.",
    descAr: "نبدأ بالعمل والجمهور والأرقام والفرصة.",
    descRu: "Начинаем с бизнеса, аудитории, цифр и возможностей.",
  },
  {
    num: "02",
    title: "Build",
    titleAr: "البناء",
    titleRu: "Создание",
    desc: "Create the strategy, digital infrastructure, content and creative system.",
    descAr: "نبني الاستراتيجية والبنية التحتية الرقمية والمحتوى والنظام الإبداعي.",
    descRu: "Выстраиваем стратегию, digital-инфраструктуру, контент и креативную систему.",
  },
  {
    num: "03",
    title: "Measure",
    titleAr: "القياس",
    titleRu: "Измерение",
    desc: "Track the metrics that connect marketing activity to meaningful business outcomes.",
    descAr: "نتتبع المقاييس التي تربط النشاط التسويقي بنتائج تجارية ذات معنى.",
    descRu: "Отслеживаем метрики, которые связывают маркетинговую активность со значимыми результатами для бизнеса.",
  },
  {
    num: "04",
    title: "Refine",
    titleAr: "الصقل",
    titleRu: "Совершенствование",
    desc: "Continuously improve what works and remove what does not.",
    descAr: "نحسّن باستمرار ما ينجح ونزيل ما لا ينجح.",
    descRu: "Постоянно улучшаем то, что работает, и убираем то, что нет.",
  },
] as const;

/**
 * "How We Work" — the four-step engagement, the homepage's "what makes us
 * different" band. It appears there and nowhere else; it previously ran on the
 * homepage, the services index, the industries index and all six service
 * pages at once.
 */
export const howWeWork = [
  {
    num: "01",
    title: "Start with your numbers",
    titleAr: "نبدأ بأرقامكم",
    titleRu: "Начинаем с ваших цифр",
    desc: "Cost per lead, close rate and revenue per channel, before anything is built.",
    descAr: "تكلفة العميل المحتمل ومعدل الإغلاق والإيرادات لكل قناة، قبل بناء أي شيء.",
    descRu: "Стоимость лида, конверсия в сделку и выручка по каждому каналу — ещё до того, как что-либо построено.",
  },
  {
    num: "02",
    title: "Build the system",
    titleAr: "نبني النظام",
    titleRu: "Выстраиваем систему",
    desc: "Ads, SEO, website and CRM working together rather than in separate silos.",
    descAr: "الإعلانات وتحسين محركات البحث والموقع الإلكتروني وإدارة علاقات العملاء تعمل معاً بدلاً من العمل بمعزل عن بعضها.",
    descRu: "Реклама, SEO, сайт и CRM работают как единое целое, а не разрозненно.",
  },
  {
    num: "03",
    title: "Track everything",
    titleAr: "نتتبع كل شيء",
    titleRu: "Отслеживаем всё",
    desc: "Every campaign tied back to attributable revenue, not to impressions.",
    descAr: "كل حملة مرتبطة بإيرادات قابلة للإسناد، لا بمرات الظهور.",
    descRu: "Каждая кампания привязана к измеримой выручке, а не к показам.",
  },
  {
    num: "04",
    title: "Optimise relentlessly",
    titleAr: "نحسّن بلا توقف",
    titleRu: "Непрерывно оптимизируем",
    desc: "Every week, against the metrics that move money.",
    descAr: "كل أسبوع، وفق المقاييس التي تحرك المال.",
    descRu: "Каждую неделю — по метрикам, которые напрямую влияют на прибыль.",
  },
] as const;

/* -------------------------------------------------------------------------- */
/* Contact                                                                     */
/* -------------------------------------------------------------------------- */

/** "What Happens After You Reach Out". */
export const nextSteps = [
  {
    num: "01",
    title: "A short call",
    titleAr: "مكالمة قصيرة",
    titleRu: "Короткий звонок",
    desc: "We schedule fifteen minutes to understand your goals and current numbers.",
    descAr: "نحدد موعداً لخمس عشرة دقيقة لفهم أهدافكم وأرقامكم الحالية.",
    descRu: "Мы назначаем пятнадцатиминутный звонок, чтобы понять ваши цели и текущие показатели.",
  },
  {
    num: "02",
    title: "We map the funnel",
    titleAr: "نرسم خريطة القمع",
    titleRu: "Составляем карту воронки",
    desc: "We identify where the leverage is and which wins come first.",
    descAr: "نحدد أين تكمن نقطة التأثير وأي المكاسب تأتي أولاً.",
    descRu: "Определяем, где скрыт наибольший потенциал и какие победы стоит одержать в первую очередь.",
  },
  {
    num: "03",
    title: "A clear proposal",
    titleAr: "عرض واضح",
    titleRu: "Понятное предложение",
    desc: "Scope, timeline and expected outcomes, written down.",
    descAr: "النطاق والجدول الزمني والنتائج المتوقعة، مكتوبة بوضوح.",
    descRu: "Объём работ, сроки и ожидаемые результаты — всё зафиксировано на бумаге.",
  },
] as const;

/* -------------------------------------------------------------------------- */
/* Services                                                                    */
/* -------------------------------------------------------------------------- */

export type Service = {
  slug: string;
  /** Two-digit index — the services grid and the service hero both show it. */
  num: string;
  /** Short name used in navigation, cards and the enquiry form. */
  name: string;
  nameAr: string;
  nameRu: string;
  /**
   * The group this service belongs to. The reference site organises its
   * catalogue into four such groups and labels each service page with its
   * group rather than repeating the service name under the breadcrumb.
   */
  category: string;
  categoryAr: string;
  categoryRu: string;
  /** Hero heading. */
  title: string;
  titleAr: string;
  titleRu: string;
  /** The banner photograph behind the hero. Never used anywhere else on the site. */
  heroImage: string;
  /** The one-line description shown in the services grid. */
  descriptor: string;
  descriptorAr: string;
  descriptorRu: string;
  /** Italic hero subhead. */
  subhead: string;
  subheadAr: string;
  subheadRu: string;
  /** The large serif statement that opens "What We Do". */
  lead: string;
  leadAr: string;
  leadRu: string;
  whatWeDo: string[];
  whatWeDoAr: string[];
  whatWeDoRu: string[];
  benefits: { title: string; desc: string }[];
  benefitsAr: { title: string; desc: string }[];
  benefitsRu: { title: string; desc: string }[];
  deliverables: string[];
  deliverablesAr: string[];
  deliverablesRu: string[];
  faqs: { q: string; a: string }[];
  faqsAr: { q: string; a: string }[];
  faqsRu: { q: string; a: string }[];
  /**
   * Named sub-services shown as their own headed subsection — for a service
   * broad enough that its distinct components (e.g. Technical SEO vs. Local
   * SEO) each deserve a title and a sentence of their own rather than living
   * as one line inside `whatWeDo`. Left unset where the service is narrow
   * enough that `whatWeDo`/`benefits` already cover it without fragmenting.
   */
  subServices?: { title: string; desc: string }[];
  subServicesAr?: { title: string; desc: string }[];
  subServicesRu?: { title: string; desc: string }[];
  /**
   * The page's two photographs, shown side by side. Each carries its own
   * pixel dimensions so the frame takes the picture's real proportion and
   * nothing is cropped, and both in a pair share a ratio so the row is even.
   * No image appears on more than one page — `check:images` enforces it.
   */
  images: {
    src: string;
    label: string;
    labelAr: string;
    labelRu: string;
    caption: string;
    captionAr: string;
    captionRu: string;
    width: number;
    height: number;
  }[];
  /** Closing CTA heading, split across two lines. */
  ctaTitle: [string, string];
  ctaTitleAr: [string, string];
  ctaTitleRu: [string, string];
  metaDescription: string;
  metaDescriptionAr: string;
  metaDescriptionRu: string;
  /**
   * The `<title>`/`og:title` text, when it should differ from the on-page
   * `name` — room for the "Agency in Dubai" search-intent phrase the short
   * nav/card label doesn't need. Falls back to `name`, same pattern as
   * `InsightArticle.seoTitle`.
   */
  seoTitle?: string;
  seoTitleAr?: string;
  seoTitleRu?: string;
  /**
   * Slug of the one Insights article genuinely relevant to this service, for
   * a single "Further reading" link on the service page. Left unset rather
   * than pointed at a loosely related piece — not every service has one.
   */
  relatedInsightSlug?: string;
};

export const services: Service[] = [
  {
    slug: "digital-marketing",
    num: "01",
    name: "Digital Marketing",
    nameAr: "التسويق الرقمي",
    nameRu: "Цифровой маркетинг",
    category: "Reach & Performance",
    categoryAr: "الوصول والأداء",
    categoryRu: "Охват и эффективность",
    title: "Digital Marketing.",
    titleAr: "التسويق الرقمي.",
    titleRu: "Цифровой маркетинг.",
    heroImage: "/images/book/hero-performance.jpg",
    descriptor:
      "Digital advertising across Google and Meta, engineered for qualified leads at below-target cost per lead.",
    descriptorAr:
      "حملات إعلانية على جوجل وميتا مصممة لجذب عملاء محتملين مؤهلين بتكلفة أقل من المستهدف لكل عميل محتمل.",
    descriptorRu:
      "Google Ads и Meta Ads, настроенные на привлечение квалифицированных лидов по цене ниже целевой.",
    subhead: "Paid media judged on pipeline, not impressions.",
    subheadAr: "إعلانات مدفوعة تُقاس بمسار المبيعات، لا بعدد المشاهدات.",
    subheadRu: "Платная реклама, которую оценивают по воронке продаж, а не по показам.",
    lead: "This is digital advertising bought and measured against a specific outcome — a lead, a sale — rather than an impression. Paid media works when every dirham can be traced to a lead the sales team actually wants.",
    leadAr:
      "هذا إعلان رقمي يُشترى ويُقاس مقابل نتيجة محددة — عميل محتمل، عملية بيع — لا مجرد ظهور. تنجح الإعلانات المدفوعة عندما يمكن تتبع كل درهم يُنفق وصولاً إلى عميل محتمل يريده فريق المبيعات فعلاً.",
    leadRu:
      "Это цифровая реклама, которую покупают и оценивают относительно конкретного результата — лида, продажи, — а не показа. Платное продвижение работает тогда, когда каждый потраченный дирхам можно проследить до лида, который действительно нужен отделу продаж.",
    whatWeDo: [
      "Google Ads management — Search, Display and Performance Max",
      "Social media marketing across Meta (Facebook and Instagram)",
      "YouTube and video marketing for demand generation",
      "Email marketing and lifecycle campaigns tied to the same pipeline",
      "Search-everywhere presence — paid visibility wherever buyers search, not Google alone",
      "Audience, offer and creative testing, with budget pacing and bid strategy",
    ],
    whatWeDoAr: [
      "إدارة إعلانات جوجل — البحث والعرض والأداء الأقصى",
      "حملات ميتا عبر فيسبوك وإنستغرام",
      "يوتيوب والتسويق عبر الفيديو لتوليد الطلب",
      "التسويق عبر البريد الإلكتروني وحملات دورة حياة العميل المرتبطة بمسار المبيعات نفسه",
      "حضور بحثي أينما كان — ظهور مدفوع حيثما يبحث المشترون، لا في جوجل وحده",
      "اختبار الجمهور والعروض والتصاميم الإبداعية، مع إدارة وتيرة الإنفاق واستراتيجية المزايدة",
    ],
    whatWeDoRu: [
      "Управление Google Ads — поиск, медийная реклама и Performance Max",
      "Кампании Meta в Facebook и Instagram",
      "YouTube и видеомаркетинг для генерации спроса",
      "Email-маркетинг и цепочки писем, привязанные к той же воронке продаж",
      "Присутствие «везде, где ищут» — платная видимость там, где ищут покупатели, а не только в Google",
      "Тестирование аудиторий, офферов и креативов, управление темпом расходования бюджета и стратегией ставок",
    ],
    benefits: [
      {
        title: "Qualified leads",
        desc: "Campaigns tuned to the lead your sales team can close, not the cheapest click available.",
      },
      {
        title: "Cost control",
        desc: "Cost per lead held below the number your unit economics need to work.",
      },
      {
        title: "Scale",
        desc: "Multi-million AED budgets managed without return on ad spend falling away.",
      },
      {
        title: "Honest reporting",
        desc: "Spend read against pipeline and closed revenue, reviewed every week.",
      },
    ],
    benefitsAr: [
      {
        title: "عملاء محتملون مؤهلون",
        desc: "حملات مضبوطة لجذب العميل المحتمل الذي يستطيع فريق مبيعاتك إغلاقه، لا أرخص نقرة متاحة.",
      },
      {
        title: "التحكم في التكلفة",
        desc: "تكلفة العميل المحتمل تبقى أقل من الرقم الذي يحتاجه اقتصاد وحدتك التجارية ليعمل.",
      },
      {
        title: "التوسع",
        desc: "إدارة ميزانيات بملايين الدراهم دون تراجع في العائد على الإنفاق الإعلاني.",
      },
      {
        title: "تقارير شفافة",
        desc: "قراءة الإنفاق مقابل مسار المبيعات والإيرادات المحققة، بمراجعة أسبوعية.",
      },
    ],
    benefitsRu: [
      {
        title: "Квалифицированные лиды",
        desc: "Кампании настроены на лид, который ваш отдел продаж сможет закрыть, а не на самый дешёвый клик.",
      },
      {
        title: "Контроль затрат",
        desc: "Стоимость лида удерживается ниже показателя, необходимого для рентабельности вашей юнит-экономики.",
      },
      {
        title: "Масштаб",
        desc: "Управление многомиллионными бюджетами (в дирхамах) без падения окупаемости рекламных вложений.",
      },
      {
        title: "Честная отчётность",
        desc: "Расходы оцениваются относительно воронки продаж и закрытой выручки — с еженедельным разбором.",
      },
    ],
    deliverables: [
      "Account audit and restructure",
      "Campaign build and conversion tracking",
      "Ad creative and copy",
      "Audience and remarketing strategy",
      "Weekly optimisation cycle",
      "Spend-to-revenue reporting",
    ],
    deliverablesAr: [
      "تدقيق الحساب وإعادة هيكلته",
      "بناء الحملات وتتبع التحويلات",
      "التصميم الإبداعي والنصوص الإعلانية",
      "استراتيجية الجمهور وإعادة الاستهداف",
      "دورة تحسين أسبوعية",
      "تقارير الإنفاق مقابل الإيرادات",
    ],
    deliverablesRu: [
      "Аудит и реструктуризация аккаунта",
      "Настройка кампаний и отслеживание конверсий",
      "Рекламные креативы и тексты",
      "Стратегия по аудиториям и ремаркетингу",
      "Еженедельный цикл оптимизации",
      "Отчётность по соотношению расходов и выручки",
    ],
    faqs: [
      {
        q: "What budget do you work with?",
        a: "We run accounts from roughly AED 20,000 a month upward. Below that, media spend is usually better placed into SEO and conversion work first.",
      },
      {
        q: "How quickly will we see leads?",
        a: "Search campaigns typically produce leads in the first fortnight. The first six to eight weeks are spent finding which audiences and offers hold up at volume.",
      },
      {
        q: "Is media spend included in your fee?",
        a: "No. Media budget is paid to the platforms at cost and reported separately from our management fee, so you can always see what bought what.",
      },
      {
        q: "Do you work in competitive Dubai verticals?",
        a: "Yes — real estate is the most contested auction in the market and it is where most of the AED 35M+ was generated.",
      },
    ],
    faqsAr: [
      {
        q: "ما هي الميزانية التي تتعاملون معها؟",
        a: "ندير حسابات تبدأ من حوالي 20,000 درهم شهرياً فما فوق. وما دون ذلك، يكون توجيه الإنفاق نحو تحسين محركات البحث وتحسين التحويل أولاً هو الخيار الأفضل عادة.",
      },
      {
        q: "بعد كم مدة سنبدأ برؤية عملاء محتملين؟",
        a: "عادة ما تُنتج حملات البحث عملاء محتملين خلال أول أسبوعين. وتُخصَّص الأسابيع الستة إلى الثمانية الأولى لتحديد الجمهور والعروض التي تصمد عند زيادة الحجم.",
      },
      {
        q: "هل الإنفاق الإعلاني مشمول ضمن أتعابكم؟",
        a: "لا. تُدفع ميزانية الإعلانات مباشرة للمنصات بسعر التكلفة، ويُقدَّم تقريرها بشكل منفصل عن أتعاب إدارتنا، بحيث يمكنك دائماً معرفة ما الذي اشتراه كل درهم.",
      },
      {
        q: "هل تعملون في قطاعات دبي شديدة التنافسية؟",
        a: "نعم — قطاع العقارات هو الأكثر تنافسية في السوق، وهو المصدر الأكبر لما يزيد على 35 مليون درهم من الإيرادات التي حققناها.",
      },
    ],
    faqsRu: [
      {
        q: "С каким бюджетом вы работаете?",
        a: "Мы ведём аккаунты от примерно 20 000 дирхамов в месяц. Если бюджет меньше, обычно эффективнее сначала вложиться в SEO и работу над конверсией.",
      },
      {
        q: "Как быстро появятся лиды?",
        a: "Поисковые кампании обычно приносят первые лиды в течение первых двух недель. Первые шесть-восемь недель уходят на определение аудиторий и офферов, которые стабильно работают при увеличении объёма.",
      },
      {
        q: "Рекламный бюджет включён в вашу комиссию?",
        a: "Нет. Рекламный бюджет напрямую перечисляется платформам по фактической стоимости и отражается в отчётности отдельно от нашей комиссии за управление — вы всегда видите, что именно куплено на каждый дирхам.",
      },
      {
        q: "Вы работаете в высококонкурентных отраслях Дубая?",
        a: "Да — недвижимость остаётся самым конкурентным аукционом на рынке, и именно в этой сфере получена основная часть выручки свыше 35 млн дирхамов.",
      },
    ],
    images: [
      {
        src: "/images/detail/performance-1.jpg",
        label: "The account room",
        labelAr: "غرفة إدارة الحسابات",
        labelRu: "Комната управления аккаунтами",
        caption: "Campaigns are reviewed weekly against pipeline, not monthly against impressions.",
        captionAr: "تُراجَع الحملات أسبوعياً مقابل مسار المبيعات، لا شهرياً مقابل عدد المشاهدات.",
        captionRu: "Кампании оцениваются еженедельно по воронке продаж, а не ежемесячно по показам.",
        width: 933,
        height: 1400,
      },
      {
        src: "/images/detail/performance-2.jpg",
        label: "Held to a number",
        labelAr: "مقيّد برقم واضح",
        labelRu: "Привязано к цифре",
        caption: "Every campaign carries a target cost per lead, agreed before it goes live.",
        captionAr: "تحمل كل حملة تكلفة مستهدفة للعميل المحتمل، متفق عليها قبل الإطلاق.",
        captionRu: "У каждой кампании есть целевая стоимость лида, согласованная до запуска.",
        width: 933,
        height: 1400,
      },
    ],
    ctaTitle: ["Let's put the spend", "where it returns."],
    ctaTitleAr: ["لنضع الإنفاق", "حيث يُثمر."],
    ctaTitleRu: ["Направим бюджет", "туда, где он окупается."],
    metaDescription:
      "Digital marketing agency in Dubai — performance marketing across Google Ads, Meta Ads, PPC and email, engineered for qualified leads at below-target cost per lead.",
    metaDescriptionAr:
      "التسويق الرقمي في دبي — تسويق أداء عبر إعلانات جوجل وميتا، والإعلانات المدفوعة بالنقرة (PPC)، والتسويق عبر البريد الإلكتروني، لجذب عملاء محتملين مؤهلين بتكلفة أقل من المستهدف.",
    metaDescriptionRu:
      "Цифровой маркетинг в Дубае — перформанс-маркетинг через Google Ads, Meta Ads, PPC и email, нацеленный на привлечение квалифицированных лидов по цене ниже целевой.",
    seoTitle: "Digital & Performance Marketing Agency in Dubai — Google & Meta Ads",
    seoTitleAr: "وكالة التسويق الرقمي والأداء في دبي — إعلانات جوجل وميتا",
    seoTitleRu: "Агентство цифрового и перформанс-маркетинга в Дубае — Google и Meta Ads",
    relatedInsightSlug: "dubai-ad-auctions-getting-more-competitive",
  },
  {
    slug: "seo",
    num: "02",
    name: "SEO (Search Engine Optimization)",
    nameAr: "تحسين محركات البحث (SEO)",
    nameRu: "SEO (поисковая оптимизация)",
    category: "Reach & Performance",
    categoryAr: "الوصول والأداء",
    categoryRu: "Охват и эффективность",
    title: "SEO (Search Engine Optimization).",
    titleAr: "تحسين محركات البحث (SEO).",
    titleRu: "SEO (поисковая оптимизация).",
    heroImage: "/images/book/hero-seo.jpg",
    descriptor:
      "Technical SEO, on-page optimisation and content built to rank in Dubai search and win AI-driven results.",
    descriptorAr:
      "تحسين تقني لمحركات البحث، وتحسين داخل الصفحات، ومحتوى مصمم للترتب في نتائج البحث بدبي والفوز بنتائج الذكاء الاصطناعي.",
    descriptorRu:
      "Техническое SEO, оптимизация страниц и контент, созданные для попадания в топ поиска в Дубае и в ответы ИИ-поисковиков.",
    subhead: "Demand that keeps arriving after the budget stops.",
    subheadAr: "طلب يستمر في الوصول حتى بعد توقف الميزانية.",
    subheadRu: "Спрос, который продолжает поступать даже после остановки бюджета.",
    lead: "Organic is the only channel that compounds — every month of work keeps paying after it is done. Done well, SEO and digital marketing reinforce each other rather than compete for the same budget.",
    leadAr:
      "النتائج العضوية هي القناة الوحيدة التي تتراكم قيمتها — إذ يستمر كل شهر من العمل في تحقيق العائد بعد انتهائه. وعند تنفيذه بإتقان، يعزز تحسين محركات البحث والتسويق الرقمي أحدهما الآخر بدلاً من التنافس على الميزانية نفسها.",
    leadRu:
      "Органика — единственный канал, эффект от которого накапливается: каждый месяц работы продолжает приносить результат и после своего завершения. При грамотном подходе SEO и цифровой маркетинг усиливают друг друга, а не конкурируют за один и тот же бюджет.",
    whatWeDo: [
      "Technical SEO and indexing fixes",
      "On-page and site architecture optimisation",
      "Content clusters built around buyer intent",
      "Local and Dubai-specific search",
      "Visibility in AI-driven search results",
    ],
    whatWeDoAr: [
      "إصلاحات تقنية لمحركات البحث والفهرسة",
      "تحسين الصفحات وبنية الموقع",
      "مجموعات محتوى مبنية حول نية المشتري",
      "البحث المحلي والخاص بدبي",
      "الظهور في نتائج البحث المدعومة بالذكاء الاصطناعي",
    ],
    whatWeDoRu: [
      "Технические исправления для SEO и индексации",
      "Оптимизация страниц и архитектуры сайта",
      "Контентные кластеры, выстроенные вокруг намерений покупателя",
      "Локальный поиск и запросы, связанные с Дубаем",
      "Видимость в результатах поиска на базе ИИ",
    ],
    benefits: [
      {
        title: "Compounding traffic",
        desc: "Organic foundations that keep returning long after the campaign budget stops.",
      },
      {
        title: "Qualified intent",
        desc: "Rankings on the terms buyers search before they enquire, not on vanity keywords.",
      },
      {
        title: "Lower blended cost",
        desc: "Organic volume that reduces what paid has to carry to hit the same pipeline.",
      },
      {
        title: "Durability",
        desc: "Technical foundations that survive algorithm changes and site redesigns.",
      },
    ],
    benefitsAr: [
      {
        title: "زيارات متراكمة القيمة",
        desc: "أسس عضوية تستمر في تحقيق العوائد لفترة طويلة بعد توقف ميزانية الحملة.",
      },
      {
        title: "نية بحث مؤهلة",
        desc: "ترتيب على المصطلحات التي يبحث عنها المشترون قبل التواصل، لا على كلمات مفتاحية شكلية.",
      },
      {
        title: "تكلفة إجمالية أقل",
        desc: "حجم عضوي يقلل العبء الذي يجب أن تتحمله الإعلانات المدفوعة للوصول إلى نفس مسار المبيعات.",
      },
      {
        title: "استمرارية",
        desc: "أسس تقنية تصمد أمام تغييرات الخوارزميات وإعادة تصميم المواقع.",
      },
    ],
    benefitsRu: [
      {
        title: "Накопительный трафик",
        desc: "Органическая база, которая продолжает приносить результат ещё долго после завершения бюджета кампании.",
      },
      {
        title: "Квалифицированный спрос",
        desc: "Позиции по запросам, которые покупатели вводят перед обращением, а не по формальным ключевым словам.",
      },
      {
        title: "Более низкая совокупная стоимость",
        desc: "Органический объём снижает нагрузку, которую платному трафику нужно нести для достижения той же воронки.",
      },
      {
        title: "Устойчивость",
        desc: "Техническая база, которая выдерживает изменения алгоритмов и редизайн сайта.",
      },
    ],
    deliverables: [
      "Technical and content SEO audit",
      "Keyword and intent mapping",
      "On-page optimisation",
      "Content plan and production",
      "Internal linking and site structure",
      "Monthly ranking and traffic reporting",
    ],
    deliverablesAr: [
      "تدقيق تقني ومحتوى لمحركات البحث",
      "تحديد الكلمات المفتاحية ونية البحث",
      "تحسين داخل الصفحات",
      "خطة المحتوى وإنتاجه",
      "الروابط الداخلية وبنية الموقع",
      "تقارير شهرية عن الترتيب والزيارات",
    ],
    deliverablesRu: [
      "Технический и контентный SEO-аудит",
      "Сбор ключевых слов и определение намерений",
      "Оптимизация страниц",
      "Контент-план и производство материалов",
      "Внутренняя перелинковка и структура сайта",
      "Ежемесячная отчётность по позициям и трафику",
    ],
    faqs: [
      {
        q: "How quickly does SEO show results?",
        a: "Technical fixes can move rankings within weeks. Content and authority typically take three to six months to compound meaningfully — a 40%+ traffic gain in one quarter is the fast end, not the norm.",
      },
      {
        q: "Do you write the content or only plan it?",
        a: "Both. We map the clusters and write them, with your input on anything that requires genuine sector knowledge.",
      },
      {
        q: "Does SEO still matter with AI search?",
        a: "It matters more. AI answers are assembled from indexed, well-structured pages — the same technical work that wins rankings is what gets a brand cited.",
      },
      {
        q: "Can you work on our existing site?",
        a: "Usually yes. Where the platform itself is what blocks indexing, we will say so rather than bill months of work around it.",
      },
    ],
    faqsAr: [
      {
        q: "بعد كم مدة تظهر نتائج تحسين محركات البحث؟",
        a: "يمكن للإصلاحات التقنية أن تحرك الترتيب خلال أسابيع. أما المحتوى والمصداقية فيستغرقان عادة من ثلاثة إلى ستة أشهر ليتراكما بشكل ملموس — وتحقيق زيادة تفوق 40% في الزيارات خلال ربع سنة واحد يمثل الحد الأسرع، لا المعدل المعتاد.",
      },
      {
        q: "هل تكتبون المحتوى أم تخططون له فقط؟",
        a: "كلاهما. نحدد مجموعات المحتوى ونكتبها، مع الاستعانة برأيكم في أي جانب يتطلب معرفة حقيقية بالقطاع.",
      },
      {
        q: "هل ما زال تحسين محركات البحث مهماً مع بحث الذكاء الاصطناعي؟",
        a: "أهميته تزداد أكثر. فإجابات الذكاء الاصطناعي تُبنى من صفحات مفهرسة وجيدة البنية — والعمل التقني ذاته الذي يحقق الترتيب هو ما يجعل العلامة التجارية مصدراً يُستشهد به.",
      },
      {
        q: "هل يمكنكم العمل على موقعنا الحالي؟",
        a: "غالباً نعم. وفي حال كانت المنصة نفسها هي ما يعيق الفهرسة، سنخبركم بذلك بصراحة بدلاً من إصدار فواتير لأشهر من العمل حولها.",
      },
    ],
    faqsRu: [
      {
        q: "Как быстро SEO даёт результат?",
        a: "Технические исправления могут повлиять на позиции уже за несколько недель. Контент и авторитетность сайта обычно накапливают заметный эффект за три-шесть месяцев — рост трафика более чем на 40% за один квартал — это быстрый результат, а не норма.",
      },
      {
        q: "Вы пишете контент или только планируете его?",
        a: "И то, и другое. Мы формируем кластеры и пишем тексты, привлекая вас там, где нужна реальная экспертиза в отрасли.",
      },
      {
        q: "SEO по-прежнему важно с учётом ИИ-поиска?",
        a: "Оно становится ещё важнее. Ответы ИИ формируются из проиндексированных, хорошо структурированных страниц — та же техническая работа, что выводит сайт в топ, делает бренд источником, на который ссылаются.",
      },
      {
        q: "Можете ли вы работать с нашим существующим сайтом?",
        a: "Обычно да. Если индексацию блокирует сама платформа, мы прямо об этом скажем, а не будем выставлять счета за месяцы работы вокруг этого ограничения.",
      },
    ],
    subServices: [
      {
        title: "Technical SEO",
        desc: "Crawlability, indexing, site speed and structured data — the foundation that decides whether the rest of SEO can work at all.",
      },
      {
        title: "On-Page SEO",
        desc: "Titles, headings and content matched page by page to what it is actually trying to rank for.",
      },
      {
        title: "Off-Page SEO",
        desc: "Authority built through the right mentions and links, not link volume for its own sake.",
      },
      {
        title: "Keyword Research",
        desc: "Search terms mapped to buyer intent and business value, not to raw search volume.",
      },
      {
        title: "Local SEO",
        desc: "Dubai and UAE search visibility — Google Business Profile, local citations and location-specific content that wins nearby demand.",
      },
    ],
    subServicesAr: [
      {
        title: "التحسين التقني (Technical SEO)",
        desc: "الزحف والفهرسة وسرعة الموقع والبيانات المنظمة — الأساس الذي يحدد ما إذا كان بقية عمل تحسين محركات البحث سينجح أصلاً.",
      },
      {
        title: "تحسين الصفحات (On-Page SEO)",
        desc: "عناوين ومحتوى مطابقان، صفحة تلو الأخرى، لما تسعى كل صفحة فعلاً للترتب من أجله.",
      },
      {
        title: "التحسين خارج الصفحة (Off-Page SEO)",
        desc: "مصداقية تُبنى من خلال الإشارات والروابط المناسبة، لا الكم لمجرد الكم.",
      },
      {
        title: "البحث عن الكلمات المفتاحية",
        desc: "مصطلحات بحث تُربط بنية المشتري وقيمته للأعمال، لا بحجم البحث الخام فقط.",
      },
      {
        title: "تحسين محركات البحث المحلي (Local SEO)",
        desc: "ظهور في نتائج البحث بدبي والإمارات — ملف Google للأعمال، والإشارات المحلية، ومحتوى مرتبط بالموقع الجغرافي يستقطب الطلب القريب.",
      },
    ],
    subServicesRu: [
      {
        title: "Техническое SEO",
        desc: "Индексация, скорость сайта и структурированные данные — основа, от которой зависит, сработает ли остальное SEO вообще.",
      },
      {
        title: "On-page SEO (оптимизация страниц)",
        desc: "Заголовки и содержание, постранично соответствующие тому, за что реально должна ранжироваться каждая страница.",
      },
      {
        title: "Off-page SEO (внешняя оптимизация)",
        desc: "Авторитетность, выстроенная через нужные упоминания и ссылки, а не объём ради объёма.",
      },
      {
        title: "Подбор ключевых слов",
        desc: "Поисковые запросы, сопоставленные с намерением покупателя и ценностью для бизнеса, а не просто с объёмом поиска.",
      },
      {
        title: "Локальное SEO",
        desc: "Видимость в поиске по Дубаю и ОАЭ — профиль в Google Business, локальные упоминания и контент, привязанный к местоположению.",
      },
    ],
    images: [
      {
        src: "/images/detail/seo-1.jpg",
        label: "Structure first",
        labelAr: "البنية أولاً",
        labelRu: "Сначала структура",
        caption: "Indexing, architecture and internal linking are planned before a word is written.",
        captionAr: "يُخطَّط للفهرسة والبنية والروابط الداخلية قبل كتابة أي كلمة.",
        captionRu: "Индексация, архитектура и внутренние ссылки планируются ещё до того, как написано первое слово.",
        width: 933,
        height: 1400,
      },
      {
        src: "/images/detail/seo-2.jpg",
        label: "Written to be read",
        labelAr: "مكتوب ليُقرأ",
        labelRu: "Написано, чтобы читали",
        caption: "Content is commissioned against what buyers actually search, not against a volume list.",
        captionAr: "يُكلَّف المحتوى بناءً على ما يبحث عنه المشترون فعلاً، لا بناءً على قائمة أحجام بحث.",
        captionRu: "Контент заказывается под реальные запросы покупателей, а не под список по объёму поиска.",
        width: 1120,
        height: 1400,
      },
    ],
    ctaTitle: ["Let's make the brand", "easier to find."],
    ctaTitleAr: ["لنجعل العلامة التجارية", "أسهل في الإيجاد."],
    ctaTitleRu: ["Сделаем бренд", "легче находимым."],
    metaDescription:
      "SEO company in Dubai — technical SEO, on-page optimisation and content clusters built to rank in Dubai search and win AI-driven results.",
    metaDescriptionAr:
      "تحسين محركات البحث والتسويق بالمحتوى في دبي — تحسين تقني، وتحسين داخل الصفحات، ومجموعات محتوى مصممة للترتب في نتائج البحث بدبي والفوز بنتائج الذكاء الاصطناعي.",
    metaDescriptionRu:
      "SEO и контент-маркетинг в Дубае — техническое SEO, оптимизация страниц и контентные кластеры, созданные для попадания в топ поиска в Дубае и в ответы ИИ-поисковиков.",
    seoTitle: "SEO Agency in Dubai — Technical SEO & Content Strategy",
    seoTitleAr: "وكالة تحسين محركات البحث في دبي — SEO تقني ومحتوى",
    seoTitleRu: "Агентство SEO в Дубае — техническое SEO и контент-стратегия",
    relatedInsightSlug: "ai-search-changing-what-ranking-means",
  },
  {
    slug: "website-development",
    num: "03",
    name: "Website Development",
    nameAr: "تطوير المواقع الإلكترونية",
    nameRu: "Веб-разработка",
    category: "Web & Build",
    categoryAr: "الويب والبناء",
    categoryRu: "Веб-разработка",
    title: "Website Development.",
    titleAr: "تطوير المواقع الإلكترونية.",
    titleRu: "Веб-разработка.",
    heroImage: "/images/book/hero-web.jpg",
    descriptor:
      "High-converting websites with SEO-ready architecture, custom landing pages and CRM-integrated funnels.",
    descriptorAr:
      "مواقع إلكترونية عالية التحويل ببنية جاهزة لمحركات البحث، وصفحات هبوط مخصصة، ومسارات مبيعات متكاملة مع إدارة علاقات العملاء.",
    descriptorRu:
      "Высококонверсионные сайты с готовой к SEO архитектурой, посадочными страницами под задачу и воронками, интегрированными с CRM.",
    subhead: "Built around the sales process, not the sitemap.",
    subheadAr: "مبني حول عملية البيع، لا حول خريطة الموقع.",
    subheadRu: "Строится вокруг процесса продажи, а не карты сайта.",
    lead: "A website earns its cost at one moment — when a visitor who was going to leave decides to enquire instead.",
    leadAr: "يستحق الموقع الإلكتروني تكلفته في لحظة واحدة — حين يقرر زائر كان سيغادر أن يتواصل معكم بدلاً من ذلك.",
    leadRu:
      "Сайт окупает себя в один-единственный момент — когда посетитель, который собирался уйти, вместо этого решает оставить заявку.",
    whatWeDo: [
      "Website design and development",
      "Campaign and project landing pages",
      "SEO-ready site architecture",
      "CRM-integrated enquiry funnels",
      "Conversion rate optimisation and testing",
    ],
    whatWeDoAr: [
      "تصميم المواقع الإلكترونية وتطويرها",
      "صفحات هبوط للحملات والمشاريع",
      "بنية موقع جاهزة لمحركات البحث",
      "مسارات استفسار متكاملة مع إدارة علاقات العملاء",
      "تحسين معدل التحويل واختباره",
    ],
    whatWeDoRu: [
      "Дизайн и разработка сайтов",
      "Посадочные страницы для кампаний и проектов",
      "Архитектура сайта, готовая к SEO",
      "Воронки заявок, интегрированные с CRM",
      "Оптимизация конверсии и тестирование",
    ],
    benefits: [
      {
        title: "More enquiries",
        desc: "The same traffic converting at a higher rate, which costs nothing extra to acquire.",
      },
      {
        title: "Search-ready",
        desc: "Structure, speed and markup that let the SEO work rank rather than fight the build.",
      },
      {
        title: "Connected",
        desc: "Every enquiry landing in the CRM with its source attached, not in an inbox.",
      },
      {
        title: "Credibility",
        desc: "A presence that matches the standard of the projects it is selling.",
      },
    ],
    benefitsAr: [
      {
        title: "استفسارات أكثر",
        desc: "نفس حجم الزيارات، لكن بمعدل تحويل أعلى، دون أي تكلفة إضافية للاستقطاب.",
      },
      {
        title: "جاهز لمحركات البحث",
        desc: "بنية وسرعة وترميز تتيح لعمل تحسين محركات البحث تحقيق الترتيب بدلاً من مواجهة عوائق في البناء.",
      },
      {
        title: "متصل",
        desc: "كل استفسار يصل إلى نظام إدارة علاقات العملاء مع مصدره مرفقاً، لا إلى صندوق بريد إلكتروني.",
      },
      {
        title: "مصداقية",
        desc: "حضور رقمي يليق بمستوى المشاريع التي يسوّق لها.",
      },
    ],
    benefitsRu: [
      {
        title: "Больше заявок",
        desc: "Тот же трафик конвертируется эффективнее — без дополнительных затрат на привлечение.",
      },
      {
        title: "Готовность к поиску",
        desc: "Структура, скорость и разметка, которые позволяют SEO выводить сайт в топ, а не бороться с самой сборкой.",
      },
      {
        title: "Интеграция",
        desc: "Каждая заявка попадает в CRM с указанием источника, а не теряется во входящих письмах.",
      },
      {
        title: "Доверие",
        desc: "Присутствие в сети, которое соответствует уровню продаваемых проектов.",
      },
    ],
    deliverables: [
      "Sitemap and content structure",
      "Responsive design system",
      "Built and deployed website",
      "Landing page templates",
      "CRM and form integration",
      "Analytics, tracking and A/B testing setup",
    ],
    deliverablesAr: [
      "خريطة الموقع وبنية المحتوى",
      "نظام تصميم متجاوب",
      "موقع إلكتروني مبني ومنشور",
      "قوالب صفحات هبوط",
      "ربط مع إدارة علاقات العملاء والنماذج",
      "إعداد التحليلات والتتبع واختبارات A/B",
    ],
    deliverablesRu: [
      "Карта сайта и структура контента",
      "Адаптивная дизайн-система",
      "Разработанный и опубликованный сайт",
      "Шаблоны посадочных страниц",
      "Интеграция с CRM и формами",
      "Настройка аналитики, отслеживания и A/B-тестов",
    ],
    faqs: [
      {
        q: "How long does a website take?",
        a: "Eight to twelve weeks for a full marketing site, from structure through build and launch. A campaign landing page is usually two to three.",
      },
      {
        q: "Can you improve our current site instead?",
        a: "Often that is the better spend. We audit first and rebuild only what the conversion data says is worth rebuilding.",
      },
      {
        q: "Which platform do you build on?",
        a: "WordPress, Webflow and Shopify most often, and custom where the requirements justify it. The choice follows who has to maintain it after launch.",
      },
      {
        q: "Do you handle hosting and maintenance?",
        a: "Yes, on a retained basis — or we hand over documentation and train your team, which costs you less if you have someone in-house.",
      },
    ],
    faqsAr: [
      {
        q: "كم يستغرق بناء الموقع الإلكتروني؟",
        a: "من ثمانية إلى اثني عشر أسبوعاً لموقع تسويقي كامل، من التخطيط إلى البناء والإطلاق. أما صفحة هبوط لحملة فتستغرق عادة من أسبوعين إلى ثلاثة.",
      },
      {
        q: "هل يمكنكم تحسين موقعنا الحالي بدلاً من ذلك؟",
        a: "غالباً ما يكون ذلك الخيار الأفضل للإنفاق. ندقق الموقع أولاً، ولا نعيد بناء سوى ما تشير بيانات التحويل إلى أنه يستحق إعادة البناء.",
      },
      {
        q: "على أي منصة تبنون المواقع؟",
        a: "غالباً على ووردبريس وويبفلو وشوبيفاي، وبشكل مخصص حين تبرر المتطلبات ذلك. ويُحدَّد الاختيار وفق من سيتولى صيانة الموقع بعد الإطلاق.",
      },
      {
        q: "هل تتولون الاستضافة والصيانة؟",
        a: "نعم، على أساس تعاقد مستمر — أو نسلّمكم التوثيق الكامل وندرّب فريقكم، وهو خيار أقل تكلفة إن كان لديكم من يتولى ذلك داخلياً.",
      },
    ],
    faqsRu: [
      {
        q: "Сколько времени занимает разработка сайта?",
        a: "От восьми до двенадцати недель на полноценный маркетинговый сайт — от структуры до сборки и запуска. Посадочная страница для кампании обычно занимает две-три недели.",
      },
      {
        q: "Можете ли вы улучшить наш текущий сайт вместо разработки нового?",
        a: "Часто это более разумное вложение средств. Мы сначала проводим аудит и пересобираем только то, что действительно оправдано данными по конверсии.",
      },
      {
        q: "На какой платформе вы разрабатываете сайты?",
        a: "Чаще всего на WordPress, Webflow и Shopify, а также в индивидуальной разработке, когда это оправдано требованиями. Выбор зависит от того, кто будет обслуживать сайт после запуска.",
      },
      {
        q: "Вы занимаетесь хостингом и поддержкой?",
        a: "Да, на условиях постоянного сопровождения — либо мы передаём полную документацию и обучаем вашу команду, что обойдётся дешевле, если у вас есть свой специалист.",
      },
    ],
    subServices: [
      {
        title: "WordPress Development",
        desc: "Built on WordPress where a content team needs to publish and edit independently, without waiting on a developer for every change.",
      },
      {
        title: "E-commerce Development",
        desc: "Product catalogues, checkout and payment flows built to convert, on Shopify or a custom stack depending on scale.",
      },
      {
        title: "Custom Web Development",
        desc: "Bespoke builds for requirements a template platform cannot meet — proprietary logic, integrations or performance targets.",
      },
      {
        title: "B2B Web & Portal Development",
        desc: "Client portals, dealer logins and quote tools that give B2B buyers self-serve access to what used to be a phone call.",
      },
      {
        title: "Website Maintenance & Support",
        desc: "Ongoing updates, security patching and uptime monitoring after launch, on a retained basis.",
      },
      {
        title: "Automation & API Integration",
        desc: "The website connected to CRM, inventory and marketing tools by API, so a lead or order updates every system at once.",
      },
    ],
    subServicesAr: [
      {
        title: "تطوير ووردبريس",
        desc: "نبني على ووردبريس حين يحتاج فريق المحتوى إلى النشر والتعديل باستقلالية، دون انتظار مطوّر مع كل تغيير.",
      },
      {
        title: "تطوير المتاجر الإلكترونية",
        desc: "كتالوجات منتجات، ومسارات دفع وإتمام شراء مصممة للتحويل، على شوبيفاي أو بنية مخصصة بحسب الحجم.",
      },
      {
        title: "تطوير مواقع مخصصة",
        desc: "بناء مخصص للمتطلبات التي لا تلبيها منصة جاهزة — منطق خاص، أو تكاملات، أو أهداف أداء محددة.",
      },
      {
        title: "تطوير بوابات B2B",
        desc: "بوابات عملاء، وحسابات موزعين، وأدوات عروض أسعار تمنح مشتري B2B وصولاً ذاتياً لما كان يتطلب سابقاً مكالمة هاتفية.",
      },
      {
        title: "صيانة ودعم المواقع",
        desc: "تحديثات مستمرة، وتصحيحات أمنية، ومراقبة لجاهزية الموقع بعد الإطلاق، على أساس تعاقد مستمر.",
      },
      {
        title: "الأتمتة وتكامل الواجهات البرمجية (API)",
        desc: "ربط الموقع بإدارة علاقات العملاء والمخزون وأدوات التسويق عبر API، بحيث يحدّث كل عميل محتمل أو طلب جميع الأنظمة دفعة واحدة.",
      },
    ],
    subServicesRu: [
      {
        title: "Разработка на WordPress",
        desc: "Разрабатываем на WordPress, когда контент-команде нужно публиковать и редактировать материалы самостоятельно, не дожидаясь разработчика для каждого изменения.",
      },
      {
        title: "Разработка интернет-магазинов",
        desc: "Каталоги товаров, оформление заказа и оплата, выстроенные для конверсии — на Shopify или на индивидуальной платформе, в зависимости от масштаба.",
      },
      {
        title: "Индивидуальная веб-разработка",
        desc: "Разработка под требования, которые не покрывает готовая платформа — уникальная логика, интеграции или целевые показатели производительности.",
      },
      {
        title: "Разработка B2B-порталов",
        desc: "Клиентские порталы, личные кабинеты дилеров и инструменты расчёта стоимости, дающие B2B-покупателям самостоятельный доступ к тому, что раньше требовало звонка.",
      },
      {
        title: "Обслуживание и поддержка сайта",
        desc: "Постоянные обновления, устранение уязвимостей и мониторинг доступности сайта после запуска — на условиях постоянного сопровождения.",
      },
      {
        title: "Автоматизация и интеграция API",
        desc: "Подключение сайта к CRM, складу и маркетинговым инструментам через API, чтобы каждая заявка или заказ обновляли все системы одновременно.",
      },
    ],
    images: [
      {
        src: "/images/detail/web-1.jpg",
        label: "Built around the sale",
        labelAr: "مبني حول عملية البيع",
        labelRu: "Строится вокруг продажи",
        caption: "Every build starts from how your sales team actually closes, not from the sitemap.",
        captionAr: "يبدأ كل بناء من الطريقة الفعلية التي يُغلق بها فريق مبيعاتكم الصفقات، لا من خريطة الموقع.",
        captionRu: "Любая разработка начинается с того, как ваш отдел продаж реально закрывает сделки, а не с карты сайта.",
        width: 1050,
        height: 1400,
      },
      {
        src: "/images/detail/web-2.jpg",
        label: "Tested, then kept",
        labelAr: "يُختبر ثم يُعتمد",
        labelRu: "Проверено, затем внедрено",
        caption: "Layout and copy changes ship behind measurement, so a win can be told from a hunch.",
        captionAr: "تُطلق تغييرات التخطيط والنصوص خلف قياس دقيق، بحيث يمكن تمييز النجاح الحقيقي عن مجرد التخمين.",
        captionRu: "Изменения в макете и текстах внедряются только после измерения результата — так реальную победу можно отличить от догадки.",
        width: 933,
        height: 1400,
      },
    ],
    ctaTitle: ["Let's build the site", "that actually converts."],
    ctaTitleAr: ["لنبنِ الموقع", "الذي يحوّل فعلاً."],
    ctaTitleRu: ["Создадим сайт,", "который действительно конвертирует."],
    metaDescription:
      "Website development agency in Dubai — WordPress, e-commerce and custom-built websites with SEO-ready architecture, CRM-integrated funnels and ongoing maintenance.",
    metaDescriptionAr:
      "تطوير المواقع الإلكترونية في دبي — مواقع ووردبريس ومتاجر إلكترونية ومواقع مخصصة ببنية جاهزة لمحركات البحث، ومسارات متكاملة مع إدارة علاقات العملاء، وصيانة مستمرة.",
    metaDescriptionRu:
      "Веб-разработка в Дубае — сайты на WordPress, интернет-магазины и индивидуальные решения с готовой к SEO архитектурой, воронками на базе CRM и постоянной поддержкой.",
    seoTitle: "Website Development Agency in Dubai — WordPress, E-commerce & Custom Builds",
    seoTitleAr: "وكالة تطوير المواقع الإلكترونية في دبي — ووردبريس ومتاجر إلكترونية ومواقع مخصصة",
    seoTitleRu: "Агентство веб-разработки в Дубае — WordPress, интернет-магазины и индивидуальные сайты",
    relatedInsightSlug: "real-cost-of-a-slow-website",
  },
  {
    slug: "crm-marketing-automation",
    num: "04",
    name: "CRM & Marketing Automation",
    nameAr: "إدارة علاقات العملاء وأتمتة التسويق",
    nameRu: "CRM и маркетинговая автоматизация",
    category: "Data & Systems",
    categoryAr: "البيانات والأنظمة",
    categoryRu: "Данные и системы",
    title: "CRM & Marketing Automation.",
    titleAr: "إدارة علاقات العملاء وأتمتة التسويق.",
    titleRu: "CRM и маркетинговая автоматизация.",
    heroImage: "/images/book/hero-crm.jpg",
    descriptor:
      "Attribution tracking and marketing automation that tie every dirham of spend to pipeline and closed revenue.",
    descriptorAr:
      "تتبع إسناد النتائج وأتمتة تسويقية تربط كل درهم يُنفق بمسار المبيعات والإيرادات المحققة.",
    descriptorRu:
      "Отслеживание атрибуции и маркетинговая автоматизация, которые привязывают каждый потраченный дирхам к воронке продаж и закрытой выручке.",
    subhead: "Every dirham of spend, traced to a closed sale.",
    subheadAr: "كل درهم يُنفق، متتبَّع حتى صفقة مغلقة.",
    subheadRu: "Каждый потраченный дирхам прослеживается до закрытой сделки.",
    lead: "Marketing stops being an argument the moment the pipeline can be read back to the campaign that filled it. That's what turns a dashboard of digital marketing metrics into an honest read on marketing performance, not a vanity report.",
    leadAr:
      "يتوقف التسويق عن كونه موضع جدل في اللحظة التي يمكن فيها قراءة مسار المبيعات ورده إلى الحملة التي غذّته. وهذا ما يحوّل لوحة مؤشرات التسويق الرقمي إلى قراءة صادقة لأداء التسويق، لا مجرد تقرير شكلي.",
    leadRu:
      "Маркетинг перестаёт быть предметом споров в тот момент, когда воронку продаж можно проследить обратно до кампании, которая её наполнила. Именно это превращает панель показателей цифрового маркетинга в честную оценку эффективности, а не формальный отчёт.",
    whatWeDo: [
      "CRM setup, migration and configuration",
      "End-to-end attribution tracking",
      "Lead capture, scoring and routing",
      "Automated nurture and follow-up",
      "Pipeline and revenue reporting",
    ],
    whatWeDoAr: [
      "إعداد نظام إدارة علاقات العملاء وترحيله وضبطه",
      "تتبع إسناد النتائج من البداية إلى النهاية",
      "التقاط العملاء المحتملين وتقييمهم وتوجيههم",
      "متابعة ورعاية آلية",
      "تقارير مسار المبيعات والإيرادات",
    ],
    whatWeDoRu: [
      "Настройка, миграция и конфигурация CRM",
      "Сквозное отслеживание атрибуции",
      "Захват, оценка и распределение лидов",
      "Автоматизированное сопровождение и follow-up",
      "Отчётность по воронке продаж и выручке",
    ],
    benefits: [
      {
        title: "Attribution",
        desc: "A clear line from first click to closed sale, so spend can be judged honestly.",
      },
      {
        title: "No leaked leads",
        desc: "Every enquiry captured, scored and routed to someone accountable for it.",
      },
      {
        title: "Faster follow-up",
        desc: "Automated response in minutes, which is where most Dubai enquiries are won or lost.",
      },
      {
        title: "Clarity",
        desc: "Reporting your team can read without a translator sitting next to them.",
      },
    ],
    benefitsAr: [
      {
        title: "إسناد النتائج",
        desc: "خط واضح من أول نقرة إلى إغلاق الصفقة، بحيث يمكن الحكم على الإنفاق بصدق.",
      },
      {
        title: "لا فرص ضائعة",
        desc: "كل استفسار يُلتقط ويُقيَّم ويُوجَّه إلى شخص مسؤول عنه.",
      },
      {
        title: "متابعة أسرع",
        desc: "استجابة آلية خلال دقائق، وهي اللحظة التي تُكسب أو تُفقد فيها معظم استفسارات دبي.",
      },
      {
        title: "وضوح",
        desc: "تقارير يستطيع فريقكم قراءتها دون الحاجة إلى من يشرحها.",
      },
    ],
    benefitsRu: [
      {
        title: "Атрибуция",
        desc: "Чёткая цепочка от первого клика до закрытой сделки — расходы можно оценивать честно.",
      },
      {
        title: "Ни один лид не теряется",
        desc: "Каждое обращение фиксируется, оценивается и направляется ответственному человеку.",
      },
      {
        title: "Быстрее follow-up",
        desc: "Автоматический ответ за считаные минуты — именно в этот момент решается судьба большинства обращений в Дубае.",
      },
      {
        title: "Ясность",
        desc: "Отчётность, которую ваша команда сможет читать без переводчика рядом.",
      },
    ],
    deliverables: [
      "CRM audit and configuration",
      "Conversion and offline tracking setup",
      "Lead scoring and routing rules",
      "Automated nurture sequences",
      "Pipeline and attribution dashboards",
      "Team training and documentation",
    ],
    deliverablesAr: [
      "تدقيق نظام إدارة علاقات العملاء وضبطه",
      "إعداد تتبع التحويلات والمبيعات غير الرقمية",
      "قواعد تقييم العملاء المحتملين وتوجيههم",
      "تسلسلات رعاية آلية",
      "لوحات بيانات مسار المبيعات وإسناد النتائج",
      "تدريب الفريق وتوثيق العمليات",
    ],
    deliverablesRu: [
      "Аудит и настройка CRM",
      "Настройка отслеживания конверсий и офлайн-продаж",
      "Правила оценки и распределения лидов",
      "Автоматизированные цепочки сопровождения",
      "Дашборды воронки продаж и атрибуции",
      "Обучение команды и документация",
    ],
    faqs: [
      {
        q: "Which CRMs do you work with?",
        a: "HubSpot and Salesforce most often, and Zoho and Bitrix where they are already in place. We map to the system you have rather than sell you a new one.",
      },
      {
        q: "We already have a CRM nobody uses. Can you fix that?",
        a: "Usually the problem is routing and data entry, not the software. We audit how leads actually move through it before recommending anything be replaced.",
      },
      {
        q: "Can you attribute offline and phone sales?",
        a: "Yes — call tracking and offline conversion imports close the loop on deals that never touch a web form, which in real estate is most of them.",
      },
      {
        q: "Who owns the setup afterwards?",
        a: "You do. It is built in your account, documented, and your team is trained on it. Nothing depends on us to keep running.",
      },
    ],
    faqsAr: [
      {
        q: "ما هي أنظمة إدارة علاقات العملاء التي تعملون بها؟",
        a: "غالباً هابسبوت وسيلزفورس، وزوهو وبيتركس حين تكون معتمدة مسبقاً. نتكيف مع النظام الذي لديكم بدلاً من بيعكم نظاماً جديداً.",
      },
      {
        q: "لدينا نظام إدارة علاقات عملاء لا يستخدمه أحد. هل يمكنكم إصلاح ذلك؟",
        a: "غالباً ما تكون المشكلة في التوجيه وإدخال البيانات، لا في البرنامج نفسه. ندقق كيف تتحرك العملاء المحتملون فعلياً داخل النظام قبل التوصية باستبدال أي شيء.",
      },
      {
        q: "هل يمكنكم إسناد المبيعات غير الرقمية والهاتفية؟",
        a: "نعم — يُغلق تتبع المكالمات واستيراد التحويلات غير الرقمية الحلقة على الصفقات التي لا تمر أبداً عبر نموذج إلكتروني، وهي معظم الصفقات في قطاع العقارات.",
      },
      {
        q: "من يملك الإعداد بعد ذلك؟",
        a: "أنتم. يُبنى الإعداد في حسابكم، ويُوثَّق، ويُدرَّب فريقكم عليه. لا شيء يعتمد علينا لاستمرار عمله.",
      },
    ],
    faqsRu: [
      {
        q: "С какими CRM-системами вы работаете?",
        a: "Чаще всего с HubSpot и Salesforce, а также с Zoho и Bitrix, если они уже внедрены. Мы подстраиваемся под вашу систему, а не продаём новую.",
      },
      {
        q: "У нас уже есть CRM, которой никто не пользуется. Можете это исправить?",
        a: "Обычно проблема в маршрутизации и вводе данных, а не в самом ПО. Мы анализируем, как лиды реально движутся по системе, прежде чем рекомендовать что-либо менять.",
      },
      {
        q: "Можете ли вы отслеживать офлайн- и телефонные продажи?",
        a: "Да — отслеживание звонков и импорт офлайн-конверсий замыкают цепочку по сделкам, которые никогда не проходят через веб-форму, а в недвижимости это большинство сделок.",
      },
      {
        q: "Кому принадлежит настроенная система в дальнейшем?",
        a: "Вам. Она настраивается в вашем аккаунте, документируется, и ваша команда проходит обучение по работе с ней. Ничего не зависит от нас для её дальнейшей работы.",
      },
    ],
    subServices: [
      {
        title: "Marketing Automation",
        desc: "Nurture sequences, lifecycle emails and lead routing that run without a person triggering each one.",
      },
      {
        title: "API Integration Services",
        desc: "CRM connected to your website, ad accounts and finance tools by API, so data moves once and stays consistent everywhere.",
      },
      {
        title: "Workflow Automation",
        desc: "Manual handoffs between sales and marketing replaced with rules that fire the moment a lead qualifies.",
      },
    ],
    subServicesAr: [
      {
        title: "أتمتة التسويق",
        desc: "تسلسلات رعاية، ورسائل بريد إلكتروني لدورة حياة العميل، وتوجيه للعملاء المحتملين تعمل دون تدخل يدوي في كل مرة.",
      },
      {
        title: "خدمات تكامل الواجهات البرمجية (API)",
        desc: "ربط نظام إدارة علاقات العملاء بموقعكم وحسابات الإعلانات وأدوات المحاسبة عبر API، بحيث تنتقل البيانات مرة واحدة وتبقى متسقة في كل مكان.",
      },
      {
        title: "أتمتة سير العمل",
        desc: "استبدال عمليات التسليم اليدوية بين المبيعات والتسويق بقواعد تعمل تلقائياً بمجرد تأهل العميل المحتمل.",
      },
    ],
    subServicesRu: [
      {
        title: "Автоматизация маркетинга",
        desc: "Цепочки взращивания лидов, письма жизненного цикла и маршрутизация лидов, которые работают без ручного запуска каждый раз.",
      },
      {
        title: "Интеграция API",
        desc: "Подключение CRM к сайту, рекламным кабинетам и финансовым инструментам через API — данные передаются один раз и остаются согласованными везде.",
      },
      {
        title: "Автоматизация рабочих процессов",
        desc: "Замена ручной передачи между отделами продаж и маркетинга правилами, которые срабатывают в момент квалификации лида.",
      },
    ],
    images: [
      {
        src: "/images/detail/crm-1.jpg",
        label: "Documented, then handed over",
        labelAr: "موثَّق ثم مُسلَّم",
        labelRu: "Задокументировано, затем передано",
        caption: "The configuration is built in your account and written down, so nothing depends on us.",
        captionAr: "يُبنى الإعداد في حسابكم ويُدوَّن بالكامل، بحيث لا يعتمد شيء علينا.",
        captionRu: "Настройка выполняется в вашем аккаунте и полностью документируется — ничто не зависит от нас.",
        width: 1056,
        height: 1400,
      },
      {
        src: "/images/detail/crm-2.jpg",
        label: "One record per lead",
        labelAr: "سجل واحد لكل عميل محتمل",
        labelRu: "Одна карточка на каждый лид",
        caption: "Source, score and outcome held in one place — which is what makes attribution possible.",
        captionAr: "المصدر والتقييم والنتيجة، جميعها في مكان واحد — وهذا ما يجعل إسناد النتائج ممكناً.",
        captionRu: "Источник, оценка и результат хранятся в одном месте — именно это делает атрибуцию возможной.",
        width: 934,
        height: 1400,
      },
    ],
    ctaTitle: ["Let's connect the spend", "to the pipeline."],
    ctaTitleAr: ["لنربط الإنفاق", "بمسار المبيعات."],
    ctaTitleRu: ["Свяжем расходы", "с воронкой продаж."],
    metaDescription:
      "CRM integration, marketing automation and API integration services in Dubai — attribution tracking, lead scoring and automated follow-up that tie marketing spend to closed revenue.",
    metaDescriptionAr:
      "دمج إدارة علاقات العملاء، وأتمتة التسويق، وخدمات تكامل API في دبي — تتبع إسناد النتائج وتقييم العملاء المحتملين ومتابعة آلية تربط الإنفاق التسويقي بالإيرادات المحققة.",
    metaDescriptionRu:
      "Интеграция CRM, автоматизация маркетинга и интеграция API в Дубае — отслеживание атрибуции, оценка лидов и автоматизированный follow-up, которые привязывают маркетинговые расходы к закрытой выручке.",
    seoTitle: "CRM & Marketing Automation Agency in Dubai — API Integration",
    seoTitleAr: "وكالة إدارة علاقات العملاء والأتمتة التسويقية في دبي — تكامل API",
    seoTitleRu: "Агентство CRM, автоматизации маркетинга и интеграции API в Дубае",
    relatedInsightSlug: "why-crm-rollouts-fail-before-they-start",
  },
  {
    slug: "branding",
    num: "05",
    name: "Branding",
    nameAr: "العلامة التجارية",
    nameRu: "Брендинг",
    category: "Branding",
    categoryAr: "العلامة التجارية",
    categoryRu: "Брендинг",
    title: "Branding.",
    titleAr: "العلامة التجارية.",
    titleRu: "Брендинг.",
    heroImage: "/images/book/hero-brand.jpg",
    descriptor:
      "Brand strategy, identity systems, campaign visuals and creative produced to a launch standard.",
    descriptorAr:
      "هوية بصرية، ومرئيات حملات، ومحتوى إبداعي لمنصات التواصل، ومواد تسويقية بجودة تليق بإطلاق العلامة التجارية.",
    descriptorRu:
      "Айдентика бренда, визуалы для кампаний, креатив для соцсетей и маркетинговые материалы, созданные на уровне готовности к запуску.",
    subhead: "Creative held to the standard the campaign is spending at.",
    subheadAr: "إبداع بمستوى الإنفاق الذي تُخصصه الحملة.",
    subheadRu: "Креатив, соответствующий уровню бюджета кампании.",
    lead: "Creative is the variable with the widest range in paid media — the same budget behind better work buys a different result.",
    leadAr:
      "الإبداع هو المتغير الأوسع تأثيراً في الإعلانات المدفوعة — فنفس الميزانية خلف عمل أفضل تشتري نتيجة مختلفة تماماً.",
    leadRu:
      "Креатив — переменная с самым широким разбросом результатов в платном продвижении: один и тот же бюджет за более сильной работой покупает совершенно другой результат.",
    whatWeDo: [
      "Brand strategy and positioning",
      "Brand identity and visual systems",
      "Campaign concepts and key visuals",
      "Social media and paid ad creative",
      "Marketing collateral and brochures",
    ],
    whatWeDoAr: [
      "الهوية البصرية والأنظمة التصميمية",
      "أفكار الحملات والمرئيات الرئيسية",
      "محتوى إبداعي لمنصات التواصل والإعلانات المدفوعة",
      "المواد التسويقية والكتيبات",
      "هوية الإطلاق والمشاريع",
    ],
    whatWeDoRu: [
      "Айдентика бренда и визуальные системы",
      "Концепции кампаний и ключевые визуалы",
      "Креатив для соцсетей и платной рекламы",
      "Маркетинговые материалы и брошюры",
      "Брендинг запусков и проектов",
    ],
    benefits: [
      {
        title: "Better performing ads",
        desc: "Creative is the largest lever in a paid account once targeting is settled.",
      },
      {
        title: "Consistency",
        desc: "One standard across every channel, so the brand reads as one company.",
      },
      {
        title: "Launch-ready",
        desc: "Collateral produced to the standard a developer-led launch is judged at.",
      },
      {
        title: "Speed",
        desc: "Variants produced fast enough to keep testing without the brand loosening.",
      },
    ],
    benefitsAr: [
      {
        title: "إعلانات أعلى أداءً",
        desc: "الإبداع هو أكبر رافعة أداء في الحساب الإعلاني بمجرد ضبط الاستهداف.",
      },
      {
        title: "اتساق",
        desc: "معيار واحد عبر كل القنوات، بحيث تظهر العلامة التجارية ككيان واحد متماسك.",
      },
      {
        title: "جاهز للإطلاق",
        desc: "مواد تسويقية تُنتج بالمستوى الذي يُقيَّم به إطلاق مشروع عقاري كبير.",
      },
      {
        title: "سرعة",
        desc: "نسخ إبداعية تُنتج بسرعة كافية لمواصلة الاختبار دون التفريط في هوية العلامة التجارية.",
      },
    ],
    benefitsRu: [
      {
        title: "Более эффективная реклама",
        desc: "Как только таргетинг настроен, креатив становится главным рычагом эффективности рекламного аккаунта.",
      },
      {
        title: "Единообразие",
        desc: "Единый стандарт по всем каналам — бренд воспринимается как одна цельная компания.",
      },
      {
        title: "Готовность к запуску",
        desc: "Материалы создаются на уровне, по которому оценивается запуск крупного девелоперского проекта.",
      },
      {
        title: "Скорость",
        desc: "Варианты создаются достаточно быстро, чтобы продолжать тестирование без потери целостности бренда.",
      },
    ],
    deliverables: [
      "Brand identity and guidelines",
      "Campaign key visuals",
      "Paid and social ad creative sets",
      "Brochures and sales collateral",
      "Presentation and proposal templates",
      "Asset library and handover",
    ],
    deliverablesAr: [
      "الهوية التجارية ودليل الاستخدام",
      "المرئيات الرئيسية للحملات",
      "مجموعات إبداعية للإعلانات المدفوعة ومنصات التواصل",
      "الكتيبات ومواد المبيعات",
      "قوالب العروض التقديمية والمقترحات",
      "مكتبة الأصول التصميمية وتسليمها",
    ],
    deliverablesRu: [
      "Айдентика бренда и брендбук",
      "Ключевые визуалы для кампаний",
      "Наборы креативов для платной рекламы и соцсетей",
      "Брошюры и материалы для продаж",
      "Шаблоны презентаций и предложений",
      "Библиотека активов и её передача",
    ],
    faqs: [
      {
        q: "Can you work with our existing brand guidelines?",
        a: "Yes. Most engagements start that way — we produce inside your system and flag only where it is genuinely blocking performance.",
      },
      {
        q: "How many ad creative variants do we get?",
        a: "Enough to test properly, which is usually six to twelve concepts per campaign, then iterations on whichever hold up.",
      },
      {
        q: "Do you produce video?",
        a: "We concept, script and direct it, and produce through trusted Dubai production partners where a shoot is required.",
      },
      {
        q: "Do you do brand work on its own?",
        a: "Yes, though it is strongest alongside the channels that will carry it — brand work priced against a campaign has a clearer measure of success.",
      },
    ],
    faqsAr: [
      {
        q: "هل يمكنكم العمل ضمن دليل علامتنا التجارية الحالي؟",
        a: "نعم. تبدأ معظم المشاريع بهذه الطريقة — ننتج ضمن نظامكم الحالي، ولا نشير إلا إلى ما يعيق الأداء فعلياً.",
      },
      {
        q: "كم عدد النسخ الإبداعية الإعلانية التي نحصل عليها؟",
        a: "ما يكفي لاختبار حقيقي، وهو عادة من ست إلى اثنتي عشرة فكرة لكل حملة، ثم تطوير النسخ التي تثبت نجاحها.",
      },
      {
        q: "هل تنتجون محتوى فيديو؟",
        a: "نتولى الفكرة والسيناريو والإخراج، وننتج بالتعاون مع شركاء إنتاج موثوقين في دبي حين يتطلب الأمر تصويراً.",
      },
      {
        q: "هل تنفذون أعمال العلامة التجارية بشكل مستقل؟",
        a: "نعم، لكنها تكون أقوى حين تُنفذ جنباً إلى جنب مع القنوات التي ستحملها — فأعمال العلامة التجارية المرتبطة بحملة فعلية لها مقياس نجاح أوضح.",
      },
    ],
    faqsRu: [
      {
        q: "Можете ли вы работать в рамках нашего существующего брендбука?",
        a: "Да. Большинство проектов начинаются именно так — мы работаем внутри вашей системы и указываем только на то, что реально мешает эффективности.",
      },
      {
        q: "Сколько вариантов рекламного креатива мы получаем?",
        a: "Столько, сколько нужно для полноценного теста — обычно от шести до двенадцати концепций на кампанию, а затем доработка тех, что показывают результат.",
      },
      {
        q: "Вы производите видео?",
        a: "Мы разрабатываем концепцию, сценарий и режиссуру, а съёмку проводим совместно с надёжными продакшн-партнёрами в Дубае, когда это требуется.",
      },
      {
        q: "Вы занимаетесь брендингом отдельно, без остальных услуг?",
        a: "Да, хотя эффект сильнее, когда это идёт вместе с каналами, которые будут нести этот бренд дальше — работа над брендом, привязанная к конкретной кампании, имеет более чёткий критерий успеха.",
      },
    ],
    subServices: [
      {
        title: "Logo Design",
        desc: "A mark built to work small on a favicon and large on a hoarding, designed alongside the system it has to live inside.",
      },
      {
        title: "Graphic Design",
        desc: "Layouts, print and digital assets produced to one visual standard, not styled fresh by whoever is free that week.",
      },
      {
        title: "UI/UX Design",
        desc: "Interface and product-screen design for the sites and portals we build, held to the same brand system as everything else.",
      },
      {
        title: "Creative Advertising",
        desc: "Campaign concepts built to stop a scroll or a drive-by glance, then carried consistently across every format they run in.",
      },
    ],
    subServicesAr: [
      {
        title: "تصميم الشعارات",
        desc: "شعار مصمم ليعمل بوضوح صغيراً على أيقونة موقع وكبيراً على لوحة إعلانية، ويُصمَّم جنباً إلى جنب مع النظام البصري الذي سيعيش داخله.",
      },
      {
        title: "التصميم الجرافيكي",
        desc: "تخطيطات وأصول مطبوعة ورقمية تُنتج بمعيار بصري واحد، لا بأسلوب مختلف كل مرة حسب من هو متاح.",
      },
      {
        title: "تصميم واجهات وتجربة المستخدم (UI/UX)",
        desc: "تصميم الواجهات وشاشات المنتج للمواقع والبوابات التي نبنيها، بنفس معيار الهوية البصرية المعتمد في كل شيء آخر.",
      },
      {
        title: "الإعلانات الإبداعية",
        desc: "أفكار حملات مصممة لتوقف المتصفح أو لفتة عابر السبيل، ثم تُنقل باتساق عبر كل صيغة تُعرض فيها.",
      },
    ],
    subServicesRu: [
      {
        title: "Дизайн логотипа",
        desc: "Знак, который одинаково чётко работает и на маленькой иконке сайта, и на большом рекламном щите, — создаётся вместе с системой, в которой ему предстоит жить.",
      },
      {
        title: "Графический дизайн",
        desc: "Макеты, печатные и цифровые материалы, созданные по единому визуальному стандарту, а не в новом стиле каждый раз в зависимости от исполнителя.",
      },
      {
        title: "UI/UX-дизайн",
        desc: "Дизайн интерфейсов и экранов продукта для сайтов и порталов, которые мы разрабатываем, — по тому же бренд-стандарту, что и всё остальное.",
      },
      {
        title: "Креативная реклама",
        desc: "Концепции кампаний, созданные, чтобы остановить взгляд в ленте или на улице, а затем последовательно перенесённые на каждый формат размещения.",
      },
    ],
    images: [
      {
        src: "/images/detail/brand-1.jpg",
        label: "Direction before production",
        labelAr: "التوجيه قبل الإنتاج",
        labelRu: "Направление перед производством",
        caption: "Material, colour and typographic direction are set before a single asset is made.",
        captionAr: "يُحدَّد التوجيه الخاص بالخامات والألوان والطباعة قبل إنتاج أي عنصر تصميمي.",
        captionRu: "Направление по материалам, цвету и типографике определяется ещё до создания первого элемента.",
        width: 1001,
        height: 1400,
      },
      {
        src: "/images/detail/brand-2.jpg",
        label: "Made to be tested",
        labelAr: "مصمم ليُختبر",
        labelRu: "Создано для тестирования",
        caption: "Creative ships in variants, because the winning execution is rarely the first one.",
        captionAr: "يُطلق العمل الإبداعي بنسخ متعددة، لأن التنفيذ الفائز نادراً ما يكون الأول.",
        captionRu: "Креатив запускается в нескольких вариантах, потому что победивший вариант редко оказывается первым.",
        width: 788,
        height: 1400,
      },
    ],
    ctaTitle: ["Let's make the creative", "worth the spend."],
    ctaTitleAr: ["لنجعل الإبداع", "يستحق الإنفاق."],
    ctaTitleRu: ["Сделаем креатив,", "который оправдывает бюджет."],
    metaDescription:
      "Branding agency in Dubai — logo design, graphic design, UI/UX and brand identity, with campaign visuals and creative advertising produced to a launch standard.",
    metaDescriptionAr:
      "العلامة التجارية في دبي — تصميم الشعارات، والتصميم الجرافيكي، وتصميم واجهات وتجربة المستخدم (UI/UX)، إلى جانب مرئيات الحملات والإعلانات الإبداعية بجودة تليق بالإطلاق.",
    metaDescriptionRu:
      "Брендинг в Дубае — дизайн логотипа, графический дизайн, UI/UX и айдентика бренда, а также визуалы для кампаний и креативная реклама на уровне готовности к запуску.",
    seoTitle: "Branding Agency in Dubai — Logo, Identity & UI/UX Design",
    seoTitleAr: "وكالة العلامات التجارية في دبي — تصميم الشعارات والهوية وUI/UX",
    seoTitleRu: "Брендинговое агентство в Дубае — логотип, айдентика и UI/UX",
  },
  {
    slug: "marketing-consulting",
    num: "06",
    name: "Marketing Consulting",
    nameAr: "الاستشارات التسويقية",
    nameRu: "Маркетинговый консалтинг",
    category: "Strategy & Growth",
    categoryAr: "الاستراتيجية والنمو",
    categoryRu: "Стратегия и рост",
    title: "Marketing Consulting.",
    titleAr: "الاستشارات التسويقية.",
    titleRu: "Маркетинговый консалтинг.",
    heroImage: "/images/insights/strategy-consulting-chess-board.jpg",
    descriptor:
      "Go-to-market strategy, marketing audits and channel planning that turn a fragmented budget into one coherent plan.",
    descriptorAr:
      "استراتيجية دخول السوق، وتدقيق تسويقي، وتخطيط للقنوات يحوّل ميزانية مبعثرة إلى خطة واحدة متماسكة.",
    descriptorRu:
      "Стратегия выхода на рынок, маркетинговые аудиты и планирование каналов, которые превращают разрозненный бюджет в единый связный план.",
    subhead: "A plan before the spend, not instead of it.",
    subheadAr: "خطة قبل الإنفاق، لا بديلاً عنه.",
    subheadRu: "План до расходов, а не вместо них.",
    lead: "Most marketing budgets are not underfunded — they are unplanned, spread across channels that were never asked to work together. A marketing consultant's job is to find that plan before adding a single dirham of new spend.",
    leadAr:
      "معظم الميزانيات التسويقية ليست ناقصة التمويل — بل غير مخطَّطة، موزعة على قنوات لم يُطلب منها العمل معاً يوماً. مهمة استشاري التسويق هي إيجاد تلك الخطة قبل إضافة درهم واحد من إنفاق جديد.",
    leadRu:
      "Большинство маркетинговых бюджетов страдают не от нехватки средств, а от отсутствия плана — они распределены по каналам, которых никогда не просили работать вместе. Задача маркетингового консультанта — найти этот план ещё до того, как будет добавлен хотя бы один новый дирхам расходов.",
    whatWeDo: [
      "Go-to-market and channel strategy",
      "Marketing audits and diagnostics",
      "Budget planning and channel mix",
      "Quarterly roadmaps and OKRs",
      "Leadership reporting and advisory",
    ],
    whatWeDoAr: [
      "استراتيجية دخول السوق والقنوات",
      "تدقيق تسويقي وتشخيص",
      "تخطيط الميزانية ومزيج القنوات",
      "خرائط طريق ربع سنوية وأهداف قابلة للقياس",
      "تقارير واستشارات للإدارة العليا",
    ],
    whatWeDoRu: [
      "Стратегия выхода на рынок и выбора каналов",
      "Маркетинговые аудиты и диагностика",
      "Планирование бюджета и медиамикса",
      "Квартальные роадмапы и OKR",
      "Отчётность и консультирование руководства",
    ],
    benefits: [
      {
        title: "One plan",
        desc: "Every channel working from the same targets, instead of several teams optimising in isolation.",
      },
      {
        title: "Clear priorities",
        desc: "A roadmap that says what to fund first and what to leave until it has earned the budget.",
      },
      {
        title: "Faster decisions",
        desc: "A standing point of reference, so spend decisions do not wait on a quarterly review.",
      },
      {
        title: "Senior input",
        desc: "Direct access to the strategist accountable for the plan, not an account manager relaying it.",
      },
    ],
    benefitsAr: [
      {
        title: "خطة واحدة",
        desc: "كل قناة تعمل وفق الأهداف نفسها، بدلاً من فرق متعددة تحسّن أداءها بمعزل عن بعضها.",
      },
      {
        title: "أولويات واضحة",
        desc: "خارطة طريق تحدد ما يجب تمويله أولاً وما يُترك حتى يثبت جدارته بالميزانية.",
      },
      {
        title: "قرارات أسرع",
        desc: "مرجع ثابت يمكن الرجوع إليه، بحيث لا تنتظر قرارات الإنفاق مراجعة ربع سنوية.",
      },
      {
        title: "خبرة عليا مباشرة",
        desc: "تواصل مباشر مع الاستراتيجي المسؤول عن الخطة، لا مدير حساب ينقلها بالنيابة.",
      },
    ],
    benefitsRu: [
      {
        title: "Единый план",
        desc: "Все каналы работают по одним и тем же целям, а не оптимизируются разрозненно разными командами.",
      },
      {
        title: "Чёткие приоритеты",
        desc: "Роадмап, который определяет, что финансировать в первую очередь, а что оставить, пока оно не докажет свою эффективность.",
      },
      {
        title: "Быстрые решения",
        desc: "Постоянная точка опоры — решения по расходам не ждут квартального обзора.",
      },
      {
        title: "Экспертиза первого лица",
        desc: "Прямой доступ к стратегу, ответственному за план, а не к аккаунт-менеджеру, который его пересказывает.",
      },
    ],
    deliverables: [
      "Marketing and channel audit",
      "Go-to-market strategy document",
      "Budget and channel allocation plan",
      "Quarterly roadmap and OKRs",
      "Monthly strategy and performance review",
      "Leadership-ready reporting",
    ],
    deliverablesAr: [
      "تدقيق تسويقي وتدقيق القنوات",
      "وثيقة استراتيجية دخول السوق",
      "خطة توزيع الميزانية والقنوات",
      "خارطة طريق ربع سنوية وأهداف قابلة للقياس",
      "مراجعة شهرية للاستراتيجية والأداء",
      "تقارير جاهزة لعرضها على الإدارة العليا",
    ],
    deliverablesRu: [
      "Маркетинговый аудит и аудит каналов",
      "Документ стратегии выхода на рынок",
      "План распределения бюджета и каналов",
      "Квартальный роадмап и OKR",
      "Ежемесячный обзор стратегии и результатов",
      "Отчётность, готовая для руководства",
    ],
    faqs: [
      {
        q: "Do we need this if we already work with your other teams?",
        a: "Not always — most clients bring this in once the channels are already running but nobody owns how they fit together. If you are starting from zero, the strategy is usually built into the first engagement instead.",
      },
      {
        q: "Is this a one-off project or ongoing?",
        a: "Both are available. Most engagements start with a one-off audit and roadmap, then move to a monthly retainer once the plan is being executed.",
      },
      {
        q: "Can you advise without running the channels yourselves?",
        a: "Yes. Some clients want an independent read on an in-house or multi-agency setup — we advise on the plan without needing to hold the media budget.",
      },
      {
        q: "Who do you report to?",
        a: "Whoever owns the number — usually a founder or marketing lead. Reporting is built to be read in a leadership meeting, not decoded afterward.",
      },
    ],
    faqsAr: [
      {
        q: "هل نحتاج هذه الخدمة إذا كنا نعمل بالفعل مع فرقكم الأخرى؟",
        a: "ليس دائماً — يلجأ إليها معظم العملاء عندما تكون القنوات تعمل بالفعل لكن لا أحد يملك رؤية شاملة لكيفية تكاملها. أما إن كنتم تبدأون من الصفر، فتُبنى الاستراتيجية عادة ضمن المشروع الأول.",
      },
      {
        q: "هل هذا مشروع لمرة واحدة أم مستمر؟",
        a: "كلاهما متاح. تبدأ معظم المشاريع بتدقيق وخارطة طريق لمرة واحدة، ثم تنتقل إلى تعاقد شهري بمجرد بدء تنفيذ الخطة.",
      },
      {
        q: "هل يمكنكم تقديم الاستشارة دون إدارة القنوات بأنفسكم؟",
        a: "نعم. يرغب بعض العملاء في قراءة مستقلة لإعداد داخلي أو متعدد الوكالات — نقدم الاستشارة حول الخطة دون الحاجة إلى إدارة الميزانية الإعلانية.",
      },
      {
        q: "لمن تُقدَّم التقارير؟",
        a: "لمن يملك الرقم — عادة المؤسس أو مسؤول التسويق. تُبنى التقارير لتُقرأ في اجتماع الإدارة مباشرة، لا لتُفسَّر لاحقاً.",
      },
    ],
    faqsRu: [
      {
        q: "Нужна ли нам эта услуга, если мы уже работаем с вашими другими командами?",
        a: "Не всегда — большинство клиентов подключают её, когда каналы уже работают, но никто не отвечает за то, как они сочетаются друг с другом. Если вы начинаете с нуля, стратегия обычно закладывается в первый же проект.",
      },
      {
        q: "Это разовый проект или постоянное сотрудничество?",
        a: "Доступны оба формата. Большинство проектов начинаются с разового аудита и роадмапа, а затем переходят на ежемесячное сопровождение по мере реализации плана.",
      },
      {
        q: "Можете ли вы консультировать, не управляя каналами самостоятельно?",
        a: "Да. Некоторым клиентам нужен независимый взгляд на внутреннюю команду или работу с несколькими агентствами — мы консультируем по плану, не беря на себя управление рекламным бюджетом.",
      },
      {
        q: "Перед кем вы отчитываетесь?",
        a: "Перед тем, кто отвечает за результат — обычно это основатель или руководитель маркетинга. Отчётность строится так, чтобы её можно было представить на встрече руководства напрямую, без расшифровки.",
      },
    ],
    images: [
      {
        src: "/images/detail/strategy-1.jpg",
        label: "Where the plan gets made",
        labelAr: "حيث تُصاغ الخطة",
        labelRu: "Где рождается план",
        caption: "Strategy is set at a desk, then handed to the channels built to run it.",
        captionAr: "تُصاغ الاستراتيجية على الطاولة، ثم تُسلَّم إلى القنوات المُعدة لتنفيذها.",
        captionRu: "Стратегия формируется за столом, а затем передаётся каналам, настроенным для её реализации.",
        width: 934,
        height: 1400,
      },
      {
        src: "/images/detail/strategy-2.jpg",
        label: "Written down, not assumed",
        labelAr: "مدوَّنة، لا مفترَضة",
        labelRu: "Зафиксировано, а не подразумевается",
        caption: "Every roadmap is documented, so the plan survives past whoever is in the room.",
        captionAr: "تُوثَّق كل خارطة طريق، بحيث تستمر الخطة بعد رحيل أي شخص من الاجتماع.",
        captionRu: "Каждый роадмап документируется, поэтому план не зависит от того, кто присутствует в комнате.",
        width: 1120,
        height: 1400,
      },
    ],
    ctaTitle: ["Let's build the plan", "the spend can follow."],
    ctaTitleAr: ["لنبنِ الخطة", "التي يتبعها الإنفاق."],
    ctaTitleRu: ["Создадим план,", "за которым последуют расходы."],
    metaDescription:
      "Marketing consulting and consultation in Dubai — go-to-market strategy, marketing audits and channel planning that turn a fragmented budget into one coherent plan.",
    metaDescriptionAr:
      "الاستشارات التسويقية في دبي — استراتيجية دخول السوق، وتدقيق تسويقي، وتخطيط للقنوات يحوّل ميزانية مبعثرة إلى خطة واحدة متماسكة.",
    metaDescriptionRu:
      "Маркетинговый консалтинг в Дубае — стратегия выхода на рынок, маркетинговые аудиты и планирование каналов, которые превращают разрозненный бюджет в единый связный план.",
    seoTitle: "Marketing Consulting Agency in Dubai",
    seoTitleAr: "وكالة الاستشارات التسويقية في دبي",
    seoTitleRu: "Агентство маркетингового консалтинга в Дубае",
    relatedInsightSlug: "audit-your-marketing-funnel-in-an-afternoon",
  },
];

export function getService(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug);
}

/**
 * The catalogue grouped by category, in first-appearance order — the shape the
 * navigation dropdown renders.
 */
export function servicesByCategory(): {
  category: string;
  categoryAr: string;
  categoryRu: string;
  items: Service[];
}[] {
  const groups: { category: string; categoryAr: string; categoryRu: string; items: Service[] }[] = [];

  for (const service of services) {
    const group = groups.find((g) => g.category === service.category);
    if (group) group.items.push(service);
    else
      groups.push({
        category: service.category,
        categoryAr: service.categoryAr,
        categoryRu: service.categoryRu,
        items: [service],
      });
  }

  return groups;
}

/**
 * The handful of fields a client-side nav/selector actually renders — never
 * the full `Service` (FAQs, deliverables, images, benefits, in three
 * languages each). `SiteHeader` and `EnquiryForm` are `"use client"`, so
 * whatever they import from this file ships to the browser on every page;
 * importing the full `services`/`servicesByCategory` there was pulling this
 * entire file's trilingual content into the client bundle. Pass the result
 * of `navServices()`/`navServiceGroups()` in as a prop from the server
 * component that renders them instead.
 */
export type NavService = Pick<Service, "slug" | "num" | "name" | "nameAr" | "nameRu">;

function toNavService({ slug, num, name, nameAr, nameRu }: Service): NavService {
  return { slug, num, name, nameAr, nameRu };
}

/** `services`, trimmed for a client component. */
export function navServices(): NavService[] {
  return services.map(toNavService);
}

/** `servicesByCategory()`, trimmed the same way — what the nav dropdown renders. */
export function navServiceGroups(): {
  category: string;
  categoryAr: string;
  categoryRu: string;
  items: NavService[];
}[] {
  return servicesByCategory().map((group) => ({
    ...group,
    items: group.items.map(toNavService),
  }));
}

/** Previous and next service, for walking the set from any one page. */
export function adjacentServices(slug: string) {
  const i = services.findIndex((service) => service.slug === slug);
  return {
    previous: i > 0 ? services[i - 1] : services[services.length - 1],
    next: i < services.length - 1 ? services[i + 1] : services[0],
  };
}

/* -------------------------------------------------------------------------- */
/* Industries                                                                  */
/* -------------------------------------------------------------------------- */

/**
 * The Industries catalogue — "who Shario does it for", the deliberate
 * counterpart to `services` ("what Shario does"). Same trilingual-suffix
 * convention as `Service`: every field is tripled (`nameAr`/`nameRu`, etc.)
 * rather than split into separate objects or files.
 *
 * `services` (the field, not the module-level array) names the real service
 * pages this industry actually leans on, with a bespoke title/desc per
 * industry rather than the service's own generic copy — Services explains
 * a discipline in general; Industries explains how that discipline is
 * applied to this one sector. Never duplicate a service page's own copy
 * here.
 *
 * `relatedIndustrySlug` is left unset unless the pairing is genuinely
 * useful to a reader (Hospitality↔Restaurants, Aesthetic↔Healthcare,
 * E-commerce↔Fashion, SaaS↔Professional Services) — not every industry
 * needs one.
 */
export type Industry = {
  slug: string;
  /** Two-digit index — mirrors `Service.num`. */
  num: string;
  /** Short name used in navigation, cards and the enquiry form. */
  name: string;
  nameAr: string;
  nameRu: string;
  /** Hero heading. */
  title: string;
  titleAr: string;
  titleRu: string;
  /** The banner photograph behind the hero. Never used anywhere else on the site. */
  heroImage: string;
  /** The one-line description shown in the industries grid. */
  descriptor: string;
  descriptorAr: string;
  descriptorRu: string;
  /** Italic hero subhead. */
  subhead: string;
  subheadAr: string;
  subheadRu: string;
  /** The lede statement opening "The Industry" section. */
  lead: string;
  leadAr: string;
  leadRu: string;
  /** The industry-introduction body — landscape, digital behaviour, why visibility matters. Two paragraphs. */
  intro: [string, string];
  introAr: [string, string];
  introRu: [string, string];
  /**
   * A short closing line for "The Industry" section — natural inline anchor
   * text, not a boxed link list, linking out to the 4–5 service pages most
   * relevant to this industry plus Contact and (where one exists) the
   * paired related industry: 5–6 links total, matching the internal-linking
   * cap the rest of the site holds to. Segments alternate plain text and
   * linked text; a segment with no `href` renders as plain text.
   */
  bodyLinks: { text: string; href?: string }[];
  bodyLinksAr: { text: string; href?: string }[];
  bodyLinksRu: { text: string; href?: string }[];
  /** Who this industry page is written for — unique per industry, never a generic client-type list. */
  whoWeWorkWith: string[];
  whoWeWorkWithAr: string[];
  whoWeWorkWithRu: string[];
  /** This industry's actual marketing challenges — never the same set reused elsewhere. */
  challenges: { title: string; desc: string }[];
  challengesAr: { title: string; desc: string }[];
  challengesRu: { title: string; desc: string }[];
  /**
   * The real Shario service pages this industry leans on, each with a
   * bespoke title/description written for this industry specifically.
   * `slug` must match a real entry in `services` (the module-level array) —
   * this is how Industries links to Services (§16 of the brief).
   */
  services: { slug: string; title: string; desc: string }[];
  servicesAr: { slug: string; title: string; desc: string }[];
  servicesRu: { slug: string; title: string; desc: string }[];
  /** This industry's own engagement framework — never the same six steps reused elsewhere. */
  approach: { step: string; title: string; desc: string }[];
  approachAr: { step: string; title: string; desc: string }[];
  approachRu: { step: string; title: string; desc: string }[];
  faqs: { q: string; a: string }[];
  faqsAr: { q: string; a: string }[];
  faqsRu: { q: string; a: string }[];
  /** Closing CTA heading, split across two lines. */
  ctaTitle: [string, string];
  ctaTitleAr: [string, string];
  ctaTitleRu: [string, string];
  /** Pre-filled WhatsApp message for the closing CTA — mirrors `Service`'s inline template, held here instead since it varies by industry, not just by name. */
  ctaMessage: string;
  ctaMessageAr: string;
  ctaMessageRu: string;
  metaDescription: string;
  metaDescriptionAr: string;
  metaDescriptionRu: string;
  /** The `<title>`/`og:title` text, when it should differ from `name`. Falls back to `name`. */
  seoTitle?: string;
  seoTitleAr?: string;
  seoTitleRu?: string;
  /** Slug of one genuinely related industry, for a single cross-link — left unset when no pairing is actually useful. */
  relatedIndustrySlug?: string;
};

export const industries: Industry[] = [
  {
    slug: "real-estate",
    num: "01",
    name: "Real Estate & Property",
    nameAr: "العقارات والممتلكات",
    nameRu: "Недвижимость",
    title: "Digital Marketing for Real Estate.",
    titleAr: "التسويق الرقمي للعقارات.",
    titleRu: "Цифровой маркетинг для рынка недвижимости.",
    heroImage: "/images/industries/real-estate.jpg",
    descriptor:
      "Demand generation and brand positioning for developers, brokerages and property consultants competing for the same buyer's attention.",
    descriptorAr:
      "توليد الطلب وتموضع العلامة التجارية للمطورين والوسطاء العقاريين ومستشاري العقارات المتنافسين على انتباه المشتري نفسه.",
    descriptorRu:
      "Генерация спроса и позиционирование бренда для застройщиков, брокерских агентств и консультантов по недвижимости, конкурирующих за внимание одного и того же покупателя.",
    subhead: "Marketing built for launches, listings and long buying cycles.",
    subheadAr: "تسويق مصمم لإطلاقات المشاريع والعروض العقارية ودورات الشراء الطويلة.",
    subheadRu: "Маркетинг, рассчитанный на запуски проектов, листинги и долгие циклы покупки.",
    lead:
      "Property in Dubai is sold twice — once to the buyer's imagination and once to the algorithm deciding who sees the listing first.",
    leadAr:
      "يُباع العقار في دبي مرتين — مرة لمخيلة المشتري، ومرة للخوارزمية التي تقرر من يرى العرض أولاً.",
    leadRu:
      "Недвижимость в Дубае продают дважды — сначала воображению покупателя, а затем алгоритму, который решает, кто увидит объявление первым.",
    intro: [
      "Every major launch in Dubai now competes on the same three feeds: Google, Instagram and the portals. A strong master plan and a good broker relationship still matter, but neither decides who gets found first when a buyer starts searching from their phone. That's decided by paid media structure, landing page speed, and whether a website is built to qualify a lead or just collect an email address.",
      "The buying cycle is long and the ticket size is high, which means most of the funnel is invisible — a prospect can view a project three times over six weeks before ever calling. Developers, agencies and brokers who win are the ones treating that invisible middle as a system: retargeting, CRM follow-up and a content trail that keeps a serious buyer warm without a salesperson chasing them daily.",
    ],
    introAr: [
      "أصبح كل إطلاق كبير في دبي اليوم يتنافس على الواجهات الرقمية الثلاث نفسها: جوجل، إنستغرام، ومنصات العقارات. المخطط الرئيسي القوي وعلاقة الوسيط الجيدة لا يزالان مهمّين، لكنهما لا يحددان من يظهر أولاً حين يبدأ المشتري بالبحث من هاتفه. القرار هنا يعود إلى بنية الحملات المدفوعة، وسرعة صفحة الهبوط، وما إذا كان الموقع الإلكتروني مصمماً لتأهيل العميل المحتمل أم لمجرد جمع بريد إلكتروني.",
      "دورة الشراء طويلة وقيمة الصفقة كبيرة، ما يعني أن معظم مسار التحويل غير مرئي — فقد يشاهد العميل المحتمل المشروع ثلاث مرات على مدى ستة أسابيع قبل أن يتصل. المطورون والوكالات والوسطاء الذين ينجحون هم من يتعاملون مع هذه المرحلة الوسطى الخفية كنظام متكامل: إعادة الاستهداف، والمتابعة عبر نظام إدارة علاقات العملاء، ومسار محتوى يبقي المشتري الجاد متفاعلاً دون أن يضطر مندوب المبيعات لملاحقته يومياً.",
    ],
    introRu: [
      "Каждый крупный запуск проекта в Дубае сегодня конкурирует в одних и тех же трёх каналах: Google, Instagram и на порталах недвижимости. Сильный мастер-план и хорошие отношения с брокером по-прежнему важны, но не они решают, кого покупатель найдёт первым, начав поиск с телефона. Это решают структура платного трафика, скорость посадочной страницы и то, создан ли сайт для квалификации лида — или просто для сбора email-адресов.",
      "Цикл покупки долгий, а чек — высокий, поэтому бóльшая часть воронки остаётся невидимой: потенциальный покупатель может просмотреть проект три раза за шесть недель, прежде чем впервые позвонить. Выигрывают те застройщики, агентства и брокеры, которые превращают эту невидимую середину воронки в систему — ретаргетинг, работу с CRM и цепочку контента, которая держит серьёзного покупателя «в тепле» без ежедневных звонков менеджера.",
    ],
    bodyLinks: [
      { text: "In practice, that usually starts with " },
      { text: "performance marketing", href: "/services/digital-marketing" },
      { text: " and " },
      { text: "SEO", href: "/services/seo" },
      { text: " built for buyer intent, a " },
      { text: "website", href: "/services/website-development" },
      { text: " fast enough to convert that traffic, and " },
      { text: "CRM follow-up", href: "/services/crm-marketing-automation" },
      { text: " that keeps a six-week decision warm. " },
      { text: "Get in touch", href: "/contact" },
      { text: " and we'll map it to where you actually are." },
    ],
    bodyLinksAr: [
      { text: "عملياً، يبدأ ذلك عادة بـ" },
      { text: "التسويق الرقمي", href: "/services/digital-marketing" },
      { text: " و" },
      { text: "تحسين محركات البحث", href: "/services/seo" },
      { text: " المبنيَّين على نية المشتري، و" },
      { text: "موقع إلكتروني", href: "/services/website-development" },
      { text: " سريع بما يكفي لتحويل تلك الحركة، و" },
      { text: "متابعة عبر نظام إدارة علاقات العملاء", href: "/services/crm-marketing-automation" },
      { text: " تُبقي قراراً يمتد ستة أسابيع دافئاً. " },
      { text: "تواصلوا معنا", href: "/contact" },
      { text: " وسنحدد نقطة البداية المناسبة لكم." },
    ],
    bodyLinksRu: [
      { text: "На практике это обычно начинается с " },
      { text: "performance-маркетинга", href: "/services/digital-marketing" },
      { text: " и " },
      { text: "SEO", href: "/services/seo" },
      { text: ", настроенных на намерение покупателя, " },
      { text: "сайта", href: "/services/website-development" },
      { text: ", достаточно быстрого, чтобы конвертировать этот трафик, и " },
      { text: "CRM-сопровождения", href: "/services/crm-marketing-automation" },
      { text: ", которое держит шестинедельное решение «в тепле». " },
      { text: "Свяжитесь с нами", href: "/contact" },
      { text: " — и мы определим, с чего начать именно вам." },
    ],
    whoWeWorkWith: [
      "Real estate developers bringing a new project to market",
      "Multi-agent brokerages managing shared listing inventory",
      "Independent brokers building a personal referral pipeline",
      "Property consultants advising investors and end-users",
      "Real estate investment and asset management firms",
      "Property management companies marketing managed portfolios",
    ],
    whoWeWorkWithAr: [
      "مطورون عقاريون يطلقون مشروعاً جديداً إلى السوق",
      "وسطاء عقاريون متعددو الوكلاء يديرون مخزوناً مشتركاً من العروض",
      "وسطاء مستقلون يبنون قاعدة إحالات شخصية",
      "مستشارون عقاريون يقدمون الاستشارة للمستثمرين والمستخدمين النهائيين",
      "شركات الاستثمار العقاري وإدارة الأصول",
      "شركات إدارة الممتلكات التي تسوّق محافظ عقارية مُدارة",
    ],
    whoWeWorkWithRu: [
      "Застройщики, выводящие новый проект на рынок",
      "Брокерские агентства с несколькими агентами, работающие с общим пулом объектов",
      "Независимые брокеры, выстраивающие личный поток рекомендаций",
      "Консультанты по недвижимости, работающие с инвесторами и конечными покупателями",
      "Инвестиционные и управляющие компании в сфере недвижимости",
      "Управляющие компании, продвигающие портфели объектов в управлении",
    ],
    challenges: [
      { title: "Crowded launches", desc: "A dozen towers can launch in the same district in the same quarter, all chasing the same investor list — positioning has to do work a floor plan can't." },
      { title: "Long, invisible buying cycles", desc: "Most decisions form over weeks of quiet browsing before a single enquiry — losing that middle stretch means losing the buyer to whoever stayed visible." },
      { title: "Lead quality over lead volume", desc: "A form full of tyre-kickers costs a sales team more than it earns — targeting has to filter for intent, not just capture an email." },
      { title: "CRM follow-up that actually happens", desc: "A lead that isn't called within the hour is a lead a competitor closes — the handoff from ad to agent is where most pipelines leak." },
      { title: "Differentiating on more than location", desc: "Two projects five minutes apart with similar pricing need a brand reason to choose one over the other, not just a better view." },
    ],
    challengesAr: [
      { title: "إطلاقات مزدحمة", desc: "قد يُطلق أكثر من عشرة أبراج في الحي نفسه خلال الربع نفسه، وكلها تستهدف قائمة المستثمرين ذاتها — هنا يجب أن يقوم التموضع بما لا تستطيع المخططات المعمارية وحدها تحقيقه." },
      { title: "دورات شراء طويلة وغير مرئية", desc: "تتشكل معظم القرارات خلال أسابيع من التصفح الصامت قبل أي استفسار فعلي — وفقدان هذه المرحلة الوسطى يعني خسارة المشتري لصالح من بقي ظاهراً أمامه." },
      { title: "جودة العملاء المحتملين لا عددهم", desc: "نموذج مليء بالمهتمين غير الجادين يكلّف فريق المبيعات أكثر مما يحققه — لذا يجب أن يُصمَّم الاستهداف لتصفية النية الحقيقية للشراء، لا لمجرد جمع بريد إلكتروني." },
      { title: "متابعة فعلية عبر نظام إدارة علاقات العملاء", desc: "العميل المحتمل الذي لا يتم الاتصال به خلال ساعة هو عميل يغلقه منافس آخر — ونقطة التسليم من الإعلان إلى الوكيل هي حيث تتسرب معظم الفرص." },
      { title: "التميّز بما هو أبعد من الموقع", desc: "مشروعان يفصل بينهما خمس دقائق بأسعار متقاربة يحتاجان إلى سبب علامة تجارية يجعل المشتري يختار أحدهما، لا مجرد إطلالة أفضل." },
    ],
    challengesRu: [
      { title: "Перегруженные запуски", desc: "Десяток башен может выйти на рынок в одном районе в один квартал, охотясь за одним и тем же списком инвесторов — позиционирование должно делать то, что не под силу планировке квартир." },
      { title: "Долгие и незаметные циклы покупки", desc: "Большинство решений формируется за недели тихого просмотра ещё до первого обращения — потерять этот промежуточный этап значит отдать покупателя тому, кто оставался на виду." },
      { title: "Качество лидов важнее их количества", desc: "Форма, заполненная праздно интересующимися, обходится отделу продаж дороже, чем приносит — таргетинг должен отсеивать по намерению, а не просто собирать email-адреса." },
      { title: "CRM-обработка, которая действительно происходит", desc: "Лид, которому не позвонили в течение часа, — это лид, который закроет конкурент: именно на передаче от рекламы к агенту чаще всего теряется воронка." },
      { title: "Отличие не только за счёт локации", desc: "Два проекта в пяти минутах друг от друга с похожей ценой нуждаются в брендовой причине выбрать именно его, а не просто в более красивом виде из окна." },
    ],
    services: [
      { slug: "digital-marketing", title: "Performance Marketing for Launches", desc: "Google and Meta campaigns structured around a launch calendar, not a flat monthly spend, so budget peaks when the project needs it." },
      { slug: "seo", title: "SEO for Real Estate", desc: "Project and area landing pages built to rank for the searches a buyer actually types before they ever contact an agent." },
      { slug: "website-development", title: "Property Websites That Qualify Leads", desc: "Fast, mobile-first listing and project sites with enquiry forms built to separate a serious buyer from a browser." },
      { slug: "crm-marketing-automation", title: "CRM & Lead Nurturing", desc: "Automated follow-up sequences that keep a six-week decision warm without relying on an agent remembering to call back." },
      { slug: "branding", title: "Developer & Brokerage Branding", desc: "A positioning and identity system a project or brokerage can carry from the first render to the handover event." },
      { slug: "marketing-consulting", title: "Go-to-Market Strategy", desc: "A channel and budget plan built around your launch timeline, not a generic marketing calendar." },
    ],
    servicesAr: [
      { slug: "digital-marketing", title: "التسويق الأدائي لإطلاقات المشاريع", desc: "حملات على جوجل وميتا مبنية وفق جدول الإطلاق الفعلي، لا وفق إنفاق شهري ثابت، بحيث تتركز الميزانية حين يحتاجها المشروع فعلاً." },
      { slug: "seo", title: "تحسين محركات البحث للعقارات", desc: "صفحات هبوط للمشروع والمنطقة مصممة للترتيب في عمليات البحث التي يكتبها المشتري فعلياً قبل التواصل مع أي وكيل." },
      { slug: "website-development", title: "مواقع عقارية تؤهّل العملاء المحتملين", desc: "مواقع سريعة مصممة أولاً للهاتف المحمول لعرض المشاريع والعقارات، بنماذج استفسار مصممة للتمييز بين المشتري الجاد والمتصفح العابر." },
      { slug: "crm-marketing-automation", title: "إدارة علاقات العملاء ورعاية العملاء المحتملين", desc: "سلاسل متابعة آلية تُبقي قراراً يستغرق ستة أسابيع متفاعلاً دون الاعتماد على تذكّر الوكيل للاتصال مجدداً." },
      { slug: "branding", title: "هوية العلامة التجارية للمطورين والوسطاء", desc: "نظام تموضع وهوية بصرية يواكب المشروع أو الوكالة من أول تصميم افتراضي وحتى حفل التسليم." },
      { slug: "marketing-consulting", title: "استراتيجية الدخول إلى السوق", desc: "خطة قنوات وميزانية مبنية حول الجدول الزمني لإطلاق مشروعك، لا وفق تقويم تسويقي عام." },
    ],
    servicesRu: [
      { slug: "digital-marketing", title: "Performance-маркетинг для запусков", desc: "Кампании в Google и Meta, выстроенные вокруг календаря запуска, а не равномерного месячного бюджета, — расходы растут именно тогда, когда это нужно проекту." },
      { slug: "seo", title: "SEO для недвижимости", desc: "Страницы проекта и района, созданные для ранжирования по запросам, которые покупатель реально вводит ещё до обращения к агенту." },
      { slug: "website-development", title: "Сайты объектов, которые квалифицируют лиды", desc: "Быстрые, мобильно-ориентированные сайты объектов и проектов с формами заявок, отделяющими серьёзного покупателя от праздного посетителя." },
      { slug: "crm-marketing-automation", title: "CRM и прогрев лидов", desc: "Автоматизированные цепочки касаний, которые поддерживают интерес на протяжении шестинедельного решения, не полагаясь на память агента о звонке." },
      { slug: "branding", title: "Брендинг застройщиков и агентств", desc: "Система позиционирования и айдентики, которую проект или агентство пронесёт от первого рендера до церемонии передачи ключей." },
      { slug: "marketing-consulting", title: "Стратегия вывода на рынок", desc: "План по каналам и бюджету, выстроенный вокруг графика вашего запуска, а не универсального маркетингового календаря." },
    ],
    approach: [
      { step: "01", title: "Position", desc: "Define what makes this project or brokerage the obvious choice against the launches sitting next to it." },
      { step: "02", title: "Build", desc: "Ship a website and landing pages fast enough, and clear enough, to convert a buyer researching on their phone." },
      { step: "03", title: "Launch", desc: "Structure paid media around the actual launch calendar — awareness before the event, intent capture during it." },
      { step: "04", title: "Nurture", desc: "Put CRM automation behind every enquiry so a six-week decision stays warm without manual chasing." },
      { step: "05", title: "Optimise", desc: "Review cost per qualified lead weekly against what the sales team can actually close, not against impressions." },
    ],
    approachAr: [
      { step: "01", title: "التموضع", desc: "تحديد ما يجعل هذا المشروع أو هذه الوكالة الخيار الواضح مقارنة بالإطلاقات المنافسة القريبة منه." },
      { step: "02", title: "البناء", desc: "إطلاق موقع وصفحات هبوط سريعة وواضحة بما يكفي لتحويل مشترٍ يبحث من هاتفه." },
      { step: "03", title: "الإطلاق", desc: "بناء الإعلانات المدفوعة حول جدول الإطلاق الفعلي — بناء الوعي قبل الحدث، والتقاط النية أثناءه." },
      { step: "04", title: "الرعاية", desc: "ربط كل استفسار بأتمتة إدارة علاقات العملاء بحيث يبقى قرار الستة أسابيع متفاعلاً دون ملاحقة يدوية." },
      { step: "05", title: "التحسين", desc: "مراجعة تكلفة العميل المحتمل المؤهل أسبوعياً مقارنةً بما يستطيع فريق المبيعات إغلاقه فعلياً، لا مقارنةً بعدد مرات الظهور." },
    ],
    approachRu: [
      { step: "01", title: "Позиционирование", desc: "Определяем, что делает этот проект или агентство очевидным выбором на фоне соседних запусков." },
      { step: "02", title: "Разработка", desc: "Запускаем сайт и посадочные страницы — достаточно быстрые и понятные, чтобы конвертировать покупателя, изучающего предложение с телефона." },
      { step: "03", title: "Запуск", desc: "Выстраиваем платный трафик вокруг реального календаря запуска — узнаваемость до события, сбор намерений во время него." },
      { step: "04", title: "Прогрев", desc: "Подключаем CRM-автоматизацию к каждой заявке, чтобы шестинедельное решение оставалось «тёплым» без ручного контроля." },
      { step: "05", title: "Оптимизация", desc: "Еженедельно оцениваем стоимость квалифицированного лида относительно реальных закрытых сделок отдела продаж, а не показов." },
    ],
    faqs: [
      { q: "What does digital marketing for real estate actually include?", a: "Typically a mix of performance marketing for launches, SEO for project and area pages, a conversion-focused website, and CRM automation to follow up every enquiry — engaged together or one at a time depending on where the gap is." },
      { q: "How can digital marketing help real estate brokers specifically?", a: "For an individual broker or a brokerage, it usually means paid lead generation tied to CRM follow-up and a personal or agency brand that gives a buyer a reason to call you instead of the next listing." },
      { q: "How can real estate developers generate better-quality leads?", a: "By targeting intent signals rather than broad reach, qualifying leads on the landing page itself, and routing every enquiry into a CRM sequence within minutes rather than hours." },
      { q: "Why does SEO matter for a project that only sells out once?", a: "Even a single-phase launch benefits from ranking for its own project name and area searches from day one — most of that early organic traffic becomes the retargeting audience performance media later relies on." },
    ],
    faqsAr: [
      { q: "ماذا يشمل التسويق الرقمي للعقارات فعلياً؟", a: "عادةً مزيج من التسويق الأدائي للإطلاقات، وتحسين محركات البحث لصفحات المشروع والمنطقة، وموقع إلكتروني مركّز على التحويل، وأتمتة إدارة علاقات العملاء لمتابعة كل استفسار — سواء معاً أو بشكل منفرد حسب موضع الفجوة الفعلية." },
      { q: "كيف يمكن للتسويق الرقمي أن يساعد الوسطاء العقاريين تحديداً؟", a: "بالنسبة للوسيط الفردي أو الوكالة، يعني ذلك عادةً توليد عملاء محتملين مدفوعين مرتبطين بمتابعة عبر إدارة علاقات العملاء، وعلامة شخصية أو مؤسسية تمنح المشتري سبباً للاتصال بك بدلاً من العرض التالي." },
      { q: "كيف يمكن للمطورين العقاريين توليد عملاء محتملين أعلى جودة؟", a: "من خلال استهداف إشارات النية الحقيقية بدلاً من الوصول الواسع، وتأهيل العملاء المحتملين مباشرة على صفحة الهبوط، وتوجيه كل استفسار إلى سلسلة متابعة في نظام إدارة علاقات العملاء خلال دقائق لا ساعات." },
      { q: "لماذا يهم تحسين محركات البحث لمشروع يُباع مرة واحدة فقط؟", a: "حتى الإطلاق أحادي المرحلة يستفيد من الترتيب في نتائج البحث باسم المشروع والمنطقة منذ اليوم الأول — إذ تتحول معظم هذه الزيارات العضوية المبكرة إلى جمهور إعادة استهداف تعتمد عليه الحملات المدفوعة لاحقاً." },
    ],
    faqsRu: [
      { q: "Что на самом деле включает digital-маркетинг для недвижимости?", a: "Как правило, это сочетание performance-маркетинга для запусков, SEO для страниц проекта и района, сайта, ориентированного на конверсию, и CRM-автоматизации для обработки каждой заявки — вместе или по отдельности, в зависимости от того, где находится слабое место." },
      { q: "Чем именно digital-маркетинг может помочь брокерам по недвижимости?", a: "Для отдельного брокера или агентства это обычно означает платную генерацию лидов, связанную с CRM-обработкой, а также личный или агентский бренд, который даёт покупателю причину позвонить именно вам, а не по следующему объявлению." },
      { q: "Как застройщикам получать более качественные лиды?", a: "За счёт таргетинга по сигналам намерения, а не по широкому охвату, квалификации лидов уже на посадочной странице и передачи каждой заявки в CRM-цепочку за минуты, а не часы." },
      { q: "Зачем нужен SEO проекту, который распродаётся всего один раз?", a: "Даже однофазный запуск выигрывает от ранжирования по названию проекта и запросам района с первого дня — большая часть раннего органического трафика становится аудиторией для ретаргетинга, на которую позже опирается платная реклама." },
    ],
    ctaTitle: ["Let's put your next launch", "in front of the right buyer."],
    ctaTitleAr: ["لنضع إطلاقك القادم", "أمام المشتري المناسب."],
    ctaTitleRu: ["Покажем ваш следующий запуск", "нужному покупателю."],
    ctaMessage: "Hi, I'm interested in digital marketing for real estate.",
    ctaMessageAr: "مرحباً، أنا مهتم بالتسويق الرقمي للعقارات.",
    ctaMessageRu: "Здравствуйте, меня интересует digital-маркетинг для недвижимости.",
    metaDescription:
      "Digital marketing for real estate in Dubai — performance marketing, SEO, websites and CRM automation built for developers, brokerages and property consultants.",
    metaDescriptionAr:
      "تسويق رقمي للعقارات في دبي — تسويق أدائي، تحسين لمحركات البحث، مواقع إلكترونية وأتمتة CRM للمطورين والوسطاء ومستشاري العقارات.",
    metaDescriptionRu:
      "Digital-маркетинг для недвижимости в Дубае: performance-реклама, SEO, сайты и CRM-автоматизация для застройщиков, агентств и консультантов.",
    seoTitle: "Digital Marketing for Real Estate & Property — Dubai",
    seoTitleAr: "التسويق الرقمي للعقارات والممتلكات — دبي",
    seoTitleRu: "Digital-маркетинг для рынка недвижимости — Дубай",
  },
  {
    slug: "hospitality",
    num: "02",
    name: "Hospitality",
    nameAr: "الضيافة",
    nameRu: "Гостиничный бизнес",
    title: "Digital Marketing for Hospitality.",
    titleAr: "التسويق الرقمي لقطاع الضيافة.",
    titleRu: "Цифровой маркетинг для гостиничного бизнеса.",
    heroImage: "/images/industries/hospitality.jpg",
    descriptor:
      "Direct-booking growth and brand experience marketing for hotels and resorts competing with OTA commission and a crowded feed.",
    descriptorAr:
      "نمو الحجوزات المباشرة وتسويق تجربة العلامة التجارية للفنادق والمنتجعات التي تنافس عمولات وكالات الحجز الإلكترونية وزحام المنصات الرقمية.",
    descriptorRu:
      "Рост прямых бронирований и маркетинг гостевого опыта для отелей и курортов, конкурирующих с комиссией OTA и перегруженной лентой соцсетей.",
    subhead: "Marketing that earns the direct booking, not just the impression.",
    subheadAr: "تسويق يكسب الحجز المباشر، لا مجرد مشاهدة عابرة.",
    subheadRu: "Маркетинг, который приносит прямое бронирование, а не просто просмотр.",
    lead:
      "A hotel's best guest is the one who books direct — every campaign here is measured against how much commission it saves, not just how many people see it.",
    leadAr:
      "أفضل نزيل لدى الفندق هو من يحجز مباشرة — وكل حملة هنا تُقاس بمقدار العمولة التي توفرها، لا بعدد من شاهدها فقط.",
    leadRu:
      "Лучший гость отеля — тот, кто бронирует напрямую: каждая кампания здесь оценивается по тому, сколько комиссии она экономит, а не по тому, сколько человек её увидели.",
    intro: [
      "Hospitality marketing runs on two clocks at once: the booking window, which can be same-day for a staycation or eighteen months out for a destination wedding, and the review cycle, where one bad week on the guest-facing feed undoes months of paid reach. A property that treats its Instagram feed, its Google Business Profile and its booking engine as three separate jobs is paying twice — once in OTA commission, once in wasted ad spend sending traffic to a booking flow that loses the guest at the last step.",
      "The properties winning direct bookings right now are the ones that built a content and search presence strong enough to be found without paying an OTA for the introduction, then backed it with a booking engine fast enough to close the guest before they open a second tab to compare.",
    ],
    introAr: [
      "يعمل تسويق الضيافة على إيقاعين في آن واحد: نافذة الحجز، التي قد تكون في اليوم نفسه لإقامة محلية أو قبل ثمانية عشر شهراً لحفل زفاف في وجهة سياحية، ودورة التقييمات، حيث يمكن لأسبوع سيئ واحد على واجهة النزلاء أن يمحو أثر أشهر من الوصول المدفوع. أي منشأة تتعامل مع حساب إنستغرام وملف جوجل التجاري ومحرك الحجز كثلاث مهام منفصلة تدفع الثمن مرتين — مرة في عمولة وكالات الحجز، ومرة في إنفاق إعلاني مهدور يقود الزوار إلى مسار حجز يفقد النزيل في الخطوة الأخيرة.",
      "المنشآت التي تكسب الحجوزات المباشرة اليوم هي تلك التي بنت حضوراً قوياً في المحتوى ونتائج البحث يكفي لتُكتشف دون دفع عمولة تعريف لوكالة حجز، ثم دعمته بمحرك حجز سريع بما يكفي لإتمام حجز النزيل قبل أن يفتح تبويباً آخر للمقارنة.",
    ],
    introRu: [
      "Маркетинг в гостиничном бизнесе живёт сразу в двух ритмах: окно бронирования — от одного дня для локального отдыха до восемнадцати месяцев для свадьбы мечты — и цикл отзывов, где одна неудачная неделя на гостевой ленте может свести на нет месяцы платного охвата. Отель, который относится к своей ленте в Instagram, профилю в Google Business и системе бронирования как к трём разным задачам, платит дважды — сначала комиссией OTA, затем впустую потраченным рекламным бюджетом, который приводит трафик на форму бронирования, теряющую гостя на последнем шаге.",
      "Сегодня прямые бронирования выигрывают те объекты, которые выстроили достаточно сильное присутствие в контенте и поиске, чтобы их находили без посредничества и комиссии OTA, и подкрепили это системой бронирования, достаточно быстрой, чтобы закрыть гостя раньше, чем он откроет вторую вкладку для сравнения.",
    ],
    bodyLinks: [
      { text: "That usually means " },
      { text: "performance marketing", href: "/services/digital-marketing" },
      { text: " and " },
      { text: "SEO", href: "/services/seo" },
      { text: " built for direct bookings, working alongside a " },
      { text: "booking-ready website", href: "/services/website-development" },
      { text: " and " },
      { text: "brand experience", href: "/services/branding" },
      { text: " that reflects the actual stay. It shares real overlap with " },
      { text: "Restaurants & F&B", href: "/industries/restaurants-fb" },
      { text: " — or if you'd rather talk it through first, " },
      { text: "get in touch", href: "/contact" },
      { text: "." },
    ],
    bodyLinksAr: [
      { text: "يعني ذلك عادة " },
      { text: "التسويق الرقمي", href: "/services/digital-marketing" },
      { text: " و" },
      { text: "تحسين محركات البحث", href: "/services/seo" },
      { text: " المصممين للحجز المباشر، إلى جانب " },
      { text: "موقع إلكتروني جاهز للحجز", href: "/services/website-development" },
      { text: " و" },
      { text: "تجربة علامة تجارية", href: "/services/branding" },
      { text: " تعكس الإقامة الفعلية. يتقاطع هذا القطاع فعلياً مع " },
      { text: "المطاعم والأغذية والمشروبات", href: "/industries/restaurants-fb" },
      { text: " — أو إن كنتم تفضلون الحديث أولاً، " },
      { text: "تواصلوا معنا", href: "/contact" },
      { text: "." },
    ],
    bodyLinksRu: [
      { text: "Обычно это значит " },
      { text: "performance-маркетинг", href: "/services/digital-marketing" },
      { text: " и " },
      { text: "SEO", href: "/services/seo" },
      { text: " для прямых бронирований, вместе с " },
      { text: "сайтом, готовым к бронированию", href: "/services/website-development" },
      { text: ", и " },
      { text: "брендингом", href: "/services/branding" },
      { text: ", который отражает реальный опыт проживания. Эта отрасль тесно пересекается с " },
      { text: "ресторанами и F&B", href: "/industries/restaurants-fb" },
      { text: " — а если хотите сначала обсудить детали, " },
      { text: "свяжитесь с нами", href: "/contact" },
      { text: "." },
    ],
    whoWeWorkWith: [
      "Independent hotels and boutique properties",
      "Resort groups and multi-property hospitality brands",
      "Serviced apartment and short-stay operators",
      "Hospitality management companies running managed portfolios",
      "Event and destination-wedding venues",
      "F&B-led hospitality concepts inside a hotel or resort",
    ],
    whoWeWorkWithAr: [
      "فنادق مستقلة ومنشآت بوتيك",
      "مجموعات منتجعات وعلامات ضيافة متعددة الفروع",
      "مشغلو الشقق الفندقية والإقامات القصيرة",
      "شركات إدارة الضيافة التي تدير محافظ عقارية مُدارة",
      "قاعات المناسبات ووجهات حفلات الزفاف",
      "مفاهيم ضيافة قائمة على المأكولات والمشروبات داخل الفنادق والمنتجعات",
    ],
    whoWeWorkWithRu: [
      "Независимые отели и бутик-объекты",
      "Курортные группы и гостиничные бренды с несколькими объектами",
      "Операторы апарт-отелей и краткосрочного размещения",
      "Управляющие гостиничные компании, работающие с портфелями объектов",
      "Площадки для мероприятий и свадеб в живописных локациях",
      "Гастрономические концепции внутри отелей и курортов",
    ],
    challenges: [
      { title: "OTA dependency", desc: "Booking.com and Expedia bring volume at a commission cost that compounds — every direct booking a campaign wins pays for itself twice over." },
      { title: "Seasonal demand swings", desc: "Occupancy strategy has to flex with the calendar, which means media spend and offers need to move with it, not sit on autopilot." },
      { title: "A crowded, visual-first feed", desc: "Every property has a beautiful pool shot — differentiation now comes from the guest experience story around it, not the photograph itself." },
      { title: "Review and reputation exposure", desc: "A property's search ranking and conversion rate both move with its review score, which makes reputation management a performance lever, not just PR." },
      { title: "Booking-engine friction", desc: "Paid traffic that lands on a slow or confusing booking flow converts at a fraction of what the media spend should return." },
    ],
    challengesAr: [
      { title: "الاعتماد على وكالات الحجز الإلكترونية", desc: "تجلب منصات مثل Booking.com وExpedia حجماً من الحجوزات مقابل عمولة تتراكم كلفتها — وكل حجز مباشر تكسبه حملة يُسدد تكلفته مرتين." },
      { title: "تقلبات الطلب الموسمية", desc: "يجب أن تتكيف استراتيجية الإشغال مع التقويم الموسمي، ما يعني أن الإنفاق الإعلاني والعروض يجب أن يتحركا معه، لا أن يُتركا على وضع تلقائي ثابت." },
      { title: "واجهة مزدحمة تعتمد على الصورة أولاً", desc: "لكل منشأة صورة جميلة لمسبحها — والتميّز اليوم يأتي من قصة تجربة النزيل المحيطة بالصورة، لا من الصورة نفسها." },
      { title: "التعرّض لمخاطر التقييمات والسمعة", desc: "يتأثر ترتيب المنشأة في نتائج البحث ومعدل تحويلها بتقييماتها، ما يجعل إدارة السمعة رافعة أداء حقيقية، لا مجرد نشاط علاقات عامة." },
      { title: "تعقيد في محرك الحجز", desc: "الزيارات المدفوعة التي تصل إلى مسار حجز بطيء أو مربك تتحول بنسبة أقل بكثير مما يستحقه الإنفاق الإعلاني." },
    ],
    challengesRu: [
      { title: "Зависимость от OTA", desc: "Booking.com и Expedia приносят объём, но их комиссия накапливается — каждое прямое бронирование, которое приносит кампания, окупается вдвойне." },
      { title: "Сезонные колебания спроса", desc: "Стратегия загрузки номерного фонда должна подстраиваться под календарь, а значит, рекламный бюджет и предложения должны двигаться вместе с ним, а не работать на автопилоте." },
      { title: "Перегруженная визуальная лента", desc: "У каждого отеля есть красивое фото бассейна — отличие сегодня достигается не самой фотографией, а историей гостевого опыта вокруг неё." },
      { title: "Уязвимость репутации через отзывы", desc: "Позиция объекта в поиске и его конверсия напрямую зависят от рейтинга отзывов, поэтому управление репутацией — это рычаг эффективности, а не просто PR." },
      { title: "Трудности системы бронирования", desc: "Платный трафик, попадающий на медленную или запутанную форму бронирования, конвертируется в разы хуже, чем должен при таких вложениях в рекламу." },
    ],
    services: [
      { slug: "digital-marketing", title: "Direct-Booking Performance Marketing", desc: "Search and social campaigns tuned to book direct, measured against OTA commission saved, not just reach." },
      { slug: "seo", title: "Hospitality SEO", desc: "Ranking for the property, the destination and the occasion — from 'hotel in [area]' to 'venue for [event type]'." },
      { slug: "website-development", title: "Booking-Ready Websites", desc: "Fast, mobile-first sites with a booking engine built to close a guest, not lose them between the offer and checkout." },
      { slug: "branding", title: "Hospitality Brand Experience", desc: "A visual and content identity that carries the property's actual guest experience across every channel, not a generic stock aesthetic." },
      { slug: "crm-marketing-automation", title: "Guest CRM & Retention", desc: "Automated pre-arrival, post-stay and re-engagement sequences that turn a first stay into a repeat one." },
    ],
    servicesAr: [
      { slug: "digital-marketing", title: "تسويق أدائي للحجز المباشر", desc: "حملات بحث وسوشيال ميديا مضبوطة لتحقيق الحجز المباشر، تُقاس بعمولة وكالات الحجز الموفَّرة، لا بالوصول فقط." },
      { slug: "seo", title: "تحسين محركات البحث للضيافة", desc: "الترتيب في نتائج البحث للمنشأة والوجهة والمناسبة — من 'فندق في [المنطقة]' إلى 'قاعة لـ[نوع المناسبة]'." },
      { slug: "website-development", title: "مواقع جاهزة للحجز", desc: "مواقع سريعة مصممة أولاً للهاتف المحمول، بمحرك حجز مبني لإتمام حجز النزيل، لا لفقدانه بين العرض والدفع." },
      { slug: "branding", title: "تجربة العلامة التجارية في الضيافة", desc: "هوية بصرية ومحتوى ينقلان تجربة النزيل الفعلية للمنشأة عبر كل قناة، لا مظهراً عاماً من صور جاهزة." },
      { slug: "crm-marketing-automation", title: "إدارة علاقات النزلاء والاحتفاظ بهم", desc: "سلاسل آلية لما قبل الوصول وما بعد الإقامة وإعادة التفاعل تحوّل الإقامة الأولى إلى إقامة متكررة." },
    ],
    servicesRu: [
      { slug: "digital-marketing", title: "Performance-маркетинг для прямых бронирований", desc: "Поисковые и социальные кампании, настроенные на прямое бронирование и оцениваемые по сэкономленной комиссии OTA, а не только по охвату." },
      { slug: "seo", title: "SEO для гостиничного бизнеса", desc: "Продвижение по запросам об отеле, направлении и поводе — от «отель в [районе]» до «площадка для [типа мероприятия]»." },
      { slug: "website-development", title: "Сайты, готовые к бронированию", desc: "Быстрые, мобильно-ориентированные сайты с системой бронирования, которая закрывает гостя, а не теряет его между предложением и оплатой." },
      { slug: "branding", title: "Брендовый гостевой опыт", desc: "Визуальная и контентная айдентика, которая передаёт реальный гостевой опыт объекта во всех каналах, а не общую стоковую эстетику." },
      { slug: "crm-marketing-automation", title: "CRM для гостей и удержание", desc: "Автоматизированные цепочки до заезда, после проживания и повторного вовлечения, которые превращают первый визит в повторный." },
    ],
    approach: [
      { step: "01", title: "Brand Experience", desc: "Define what the property actually feels like to a guest, and build every channel around that, not a generic hospitality look." },
      { step: "02", title: "Content", desc: "Build a content library — photography, video, guest stories — that carries the brand across search, social and paid." },
      { step: "03", title: "Search & Social", desc: "Establish organic presence across Google and the visual platforms where a guest actually researches a stay." },
      { step: "04", title: "Performance", desc: "Run paid media measured against direct bookings and OTA commission saved, not raw traffic." },
      { step: "05", title: "Conversion", desc: "Tighten the booking engine itself so paid and organic traffic actually closes." },
      { step: "06", title: "Retention", desc: "Turn a single stay into a repeat guest with CRM sequences that run well after checkout." },
    ],
    approachAr: [
      { step: "01", title: "تجربة العلامة", desc: "تحديد الإحساس الفعلي الذي تتركه المنشأة لدى النزيل، وبناء كل قناة حول هذا الإحساس، لا حول مظهر ضيافة عام." },
      { step: "02", title: "المحتوى", desc: "بناء مكتبة محتوى — تصوير، فيديو، قصص نزلاء — تحمل العلامة عبر البحث والسوشيال ميديا والإعلانات المدفوعة." },
      { step: "03", title: "البحث والسوشيال ميديا", desc: "بناء حضور عضوي على جوجل والمنصات البصرية التي يبحث فيها النزيل فعلياً عن إقامته." },
      { step: "04", title: "الأداء", desc: "إدارة حملات مدفوعة تُقاس بالحجوزات المباشرة وعمولة وكالات الحجز الموفَّرة، لا بحجم الزيارات الخام." },
      { step: "05", title: "التحويل", desc: "تحسين محرك الحجز نفسه بحيث تتحول الزيارات المدفوعة والعضوية فعلياً إلى حجوزات." },
      { step: "06", title: "الاحتفاظ بالنزلاء", desc: "تحويل الإقامة الواحدة إلى نزيل متكرر عبر سلاسل إدارة علاقات العملاء التي تستمر بعد المغادرة." },
    ],
    approachRu: [
      { step: "01", title: "Гостевой опыт бренда", desc: "Определяем, что реально чувствует гость в этом отеле, и выстраиваем каждый канал вокруг этого, а не общего гостиничного образа." },
      { step: "02", title: "Контент", desc: "Создаём библиотеку контента — фотографии, видео, истории гостей, — которая несёт бренд через поиск, соцсети и платную рекламу." },
      { step: "03", title: "Поиск и соцсети", desc: "Формируем органическое присутствие в Google и визуальных платформах, где гость реально изучает варианты проживания." },
      { step: "04", title: "Performance-реклама", desc: "Запускаем платную рекламу, которую оцениваем по прямым бронированиям и сэкономленной комиссии OTA, а не по объёму трафика." },
      { step: "05", title: "Конверсия", desc: "Дорабатываем саму систему бронирования, чтобы платный и органический трафик реально конвертировался." },
      { step: "06", title: "Удержание", desc: "Превращаем разовое проживание в повторные визиты с помощью CRM-цепочек, которые работают долго после выезда." },
    ],
    faqs: [
      { q: "How is hotel marketing different from marketing any other local business?", a: "It runs on two audiences at once — guests actively booking now and future guests being nurtured toward a stay months out — plus a booking engine that has to convert, not just a contact form." },
      { q: "Can digital marketing actually reduce our OTA dependency?", a: "Yes, when direct-booking performance media, SEO and a fast booking engine work together — the goal is making the direct channel cheaper and more convenient than the OTA, not just running ads alongside it." },
      { q: "How important is SEO for a single-property hotel?", a: "Very — most stay research starts with a Google search for the destination or occasion before a specific property name, and that's where organic visibility either earns the click or hands it to an OTA listing." },
      { q: "Do you work with resorts as well as boutique hotels?", a: "Yes, from independent boutique properties to multi-property resort groups — the channel mix scales with the portfolio, but the direct-booking logic stays the same." },
    ],
    faqsAr: [
      { q: "كيف يختلف تسويق الفنادق عن تسويق أي نشاط تجاري محلي آخر؟", a: "يعمل على جمهورين في آن واحد — نزلاء يحجزون الآن فعلياً، ونزلاء مستقبليون تتم رعايتهم نحو إقامة بعد أشهر — إضافة إلى محرك حجز يجب أن يُحوّل فعلياً، لا مجرد نموذج تواصل." },
      { q: "هل يمكن للتسويق الرقمي أن يقلل فعلياً اعتمادنا على وكالات الحجز الإلكترونية؟", a: "نعم، عندما تعمل الحملات الأدائية للحجز المباشر وتحسين محركات البحث ومحرك حجز سريع معاً — الهدف هو جعل القناة المباشرة أرخص وأكثر سهولة من وكالة الحجز، لا مجرد تشغيل إعلانات موازية لها." },
      { q: "ما مدى أهمية تحسين محركات البحث لفندق ذي منشأة واحدة؟", a: "بالغة الأهمية — إذ يبدأ معظم البحث عن الإقامة بعملية بحث على جوجل عن الوجهة أو المناسبة قبل اسم المنشأة تحديداً، وهنا يكسب الحضور العضوي النقرة أو يخسرها لصالح عرض على وكالة حجز." },
      { q: "هل تعملون مع المنتجعات إلى جانب الفنادق البوتيك؟", a: "نعم، من المنشآت البوتيك المستقلة إلى مجموعات المنتجعات متعددة الفروع — ويتوسع مزيج القنوات مع حجم المحفظة، بينما يبقى منطق الحجز المباشر ثابتاً." },
    ],
    faqsRu: [
      { q: "Чем маркетинг отеля отличается от маркетинга любого другого локального бизнеса?", a: "Он работает сразу с двумя аудиториями — гостями, бронирующими прямо сейчас, и будущими гостями, которых «прогревают» к проживанию через несколько месяцев, — плюс система бронирования должна конвертировать, а не просто быть формой обратной связи." },
      { q: "Может ли digital-маркетинг реально снизить зависимость от OTA?", a: "Да, если performance-реклама на прямые бронирования, SEO и быстрая система бронирования работают вместе — цель в том, чтобы сделать прямой канал дешевле и удобнее OTA, а не просто запускать рекламу параллельно." },
      { q: "Насколько важен SEO для отдельного отеля?", a: "Очень важен — большинство поисков начинается с запроса о направлении или поводе, а не с названия конкретного отеля, и именно здесь органическая видимость либо приносит клик, либо отдаёт его листингу OTA." },
      { q: "Вы работаете и с курортами, и с бутик-отелями?", a: "Да, от независимых бутик-объектов до курортных групп с несколькими отелями — набор каналов масштабируется вместе с портфелем, но логика прямых бронирований остаётся неизменной." },
    ],
    ctaTitle: ["Let's turn more lookers", "into direct bookings."],
    ctaTitleAr: ["لنحوّل المزيد من المتصفحين", "إلى حجوزات مباشرة."],
    ctaTitleRu: ["Превратим больше просмотров", "в прямые бронирования."],
    ctaMessage: "Hi, I'm interested in digital marketing for hospitality.",
    ctaMessageAr: "مرحباً، أنا مهتم بالتسويق الرقمي لقطاع الضيافة.",
    ctaMessageRu: "Здравствуйте, меня интересует digital-маркетинг для гостиничного бизнеса.",
    metaDescription:
      "Hospitality marketing in Dubai — direct-booking performance media, SEO, branding and booking-ready websites for hotels, resorts and hospitality groups.",
    metaDescriptionAr:
      "تسويق الضيافة في دبي — حملات أدائية للحجز المباشر، تحسين لمحركات البحث، هوية بصرية ومواقع جاهزة للحجز للفنادق والمنتجعات ومجموعات الضيافة.",
    metaDescriptionRu:
      "Маркетинг для гостиничного бизнеса в Дубае: performance-реклама на прямые бронирования, SEO, брендинг и сайты для отелей, курортов и гостиничных групп.",
    seoTitle: "Hospitality & Hotel Digital Marketing Agency — Dubai",
    seoTitleAr: "وكالة تسويق رقمي للضيافة والفنادق — دبي",
    seoTitleRu: "Агентство digital-маркетинга для отелей — Дубай",
    relatedIndustrySlug: "restaurants-fb",
  },
  {
    slug: "aesthetic-wellness",
    num: "03",
    name: "Aesthetic & Wellness",
    nameAr: "التجميل والعافية",
    nameRu: "Эстетическая медицина и wellness",
    title: "Digital Marketing for Aesthetic Clinics.",
    titleAr: "التسويق الرقمي لعيادات التجميل.",
    titleRu: "Цифровой маркетинг для клиник эстетической медицины.",
    heroImage: "/images/industries/aesthetic-wellness.jpg",
    descriptor:
      "Trust-led marketing for aesthetic clinics and medical spas, where a booked consultation depends on visible proof, not a discount.",
    descriptorAr:
      "تسويق قائم على الثقة لعيادات التجميل والمنتجعات الطبية، حيث يعتمد حجز الاستشارة على دليل مرئي، لا على خصم.",
    descriptorRu:
      "Маркетинг, построенный на доверии, для клиник эстетической медицины и медицинских спа, где запись на консультацию зависит от наглядных доказательств, а не от скидки.",
    subhead: "Marketing that earns trust before it earns the booking.",
    subheadAr: "تسويق يكسب الثقة قبل أن يكسب الحجز.",
    subheadRu: "Маркетинг, который сначала завоёвывает доверие, а затем — запись.",
    lead:
      "Nobody books an aesthetic treatment on price alone — they book on proof, and proof is a marketing problem before it's a clinical one.",
    leadAr:
      "لا أحد يحجز جلسة تجميل بناءً على السعر وحده — بل بناءً على الدليل، والدليل هنا مسألة تسويقية قبل أن تكون مسألة طبية.",
    leadRu:
      "Никто не записывается на эстетическую процедуру только из-за цены — записываются на основании доказательств, а доказательства — это прежде всего маркетинговая задача, а не клиническая.",
    intro: [
      "Aesthetic and wellness clients research differently to almost any other category: before-and-after results, practitioner credentials and other patients' reviews carry more weight than the offer itself. A clinic competing purely on price or a follow count is competing on the wrong axis — the client is really asking 'can I trust this person with my face,' and a marketing system has to answer that before it asks for the booking.",
      "The category is also intensely local and intensely visual, which means Google Business Profile visibility, review volume and a social feed built on real results — not stock imagery — do more for booking rate than a wider awareness campaign ever will.",
    ],
    introAr: [
      "يبحث عملاء التجميل والعافية بطريقة مختلفة عن أي فئة أخرى تقريباً: نتائج ما قبل وبعد، ومؤهلات الممارس، وتقييمات مرضى آخرين، كلها تزن أكثر من العرض نفسه. أي عيادة تتنافس فقط على السعر أو عدد المتابعين تتنافس على المحور الخاطئ — فالسؤال الحقيقي الذي يطرحه العميل هو 'هل أثق بهذا الشخص مع وجهي؟'، ويجب أن يجيب النظام التسويقي عن هذا السؤال قبل أن يطلب الحجز.",
      "هذه الفئة أيضاً محلية بشكل كبير وبصرية بشكل كبير، ما يعني أن ظهور العيادة في ملف جوجل التجاري، وحجم التقييمات، وحساب سوشيال ميديا مبني على نتائج حقيقية لا صور جاهزة، كلها تفعل لمعدل الحجز أكثر بكثير مما تفعله أي حملة توعية أوسع.",
    ],
    introRu: [
      "Клиенты в сфере эстетической медицины и wellness изучают предложения иначе, чем в почти любой другой категории: результаты «до и после», квалификация врача и отзывы других пациентов весят больше, чем сама акция. Клиника, конкурирующая только ценой или числом подписчиков, борется не на той оси — клиент на самом деле спрашивает себя «могу ли я доверить этому человеку своё лицо», и система маркетинга должна ответить на этот вопрос ещё до того, как попросит записаться.",
      "Эта категория предельно локальна и предельно визуальна, поэтому видимость в Google Business Profile, объём отзывов и лента в соцсетях, построенная на реальных результатах, а не на стоковых изображениях, влияют на конверсию в запись сильнее, чем любая широкая имиджевая кампания.",
    ],
    bodyLinks: [
      { text: "That usually pairs " },
      { text: "performance marketing", href: "/services/digital-marketing" },
      { text: " and " },
      { text: "clinic SEO", href: "/services/seo" },
      { text: " with " },
      { text: "branding", href: "/services/branding" },
      { text: " and a " },
      { text: "website", href: "/services/website-development" },
      { text: " built to earn trust before the first consultation. It overlaps closely with " },
      { text: "healthcare marketing", href: "/industries/healthcare" },
      { text: ", and if the fit feels right, " },
      { text: "get in touch", href: "/contact" },
      { text: "." },
    ],
    bodyLinksAr: [
      { text: "عادة ما يقترن ذلك بـ" },
      { text: "التسويق الرقمي", href: "/services/digital-marketing" },
      { text: " و" },
      { text: "تحسين محركات البحث", href: "/services/seo" },
      { text: " مع " },
      { text: "العلامة التجارية", href: "/services/branding" },
      { text: " و" },
      { text: "موقع إلكتروني", href: "/services/website-development" },
      { text: " مبني لكسب الثقة قبل الاستشارة الأولى. يتداخل هذا القطاع بشكل وثيق مع " },
      { text: "الرعاية الصحية", href: "/industries/healthcare" },
      { text: "، وإن شعرتم أن التوافق مناسب، " },
      { text: "تواصلوا معنا", href: "/contact" },
      { text: "." },
    ],
    bodyLinksRu: [
      { text: "Обычно это сочетание " },
      { text: "performance-маркетинга", href: "/services/digital-marketing" },
      { text: " и " },
      { text: "SEO для клиник", href: "/services/seo" },
      { text: " с " },
      { text: "брендингом", href: "/services/branding" },
      { text: " и " },
      { text: "сайтом", href: "/services/website-development" },
      { text: ", который вызывает доверие ещё до первой консультации. Эта отрасль тесно связана со " },
      { text: "здравоохранением", href: "/industries/healthcare" },
      { text: " — и если формат кажется подходящим, " },
      { text: "свяжитесь с нами", href: "/contact" },
      { text: "." },
    ],
    whoWeWorkWith: [
      "Aesthetic and cosmetic clinics",
      "Medical spas and skin clinics",
      "Dermatology-led aesthetic practices",
      "Wellness centres offering non-surgical treatments",
      "Multi-practitioner aesthetic groups",
      "Beauty and wellness brands launching a clinical treatment line",
    ],
    whoWeWorkWithAr: [
      "عيادات التجميل وطب التجميل غير الجراحي",
      "المنتجعات الطبية وعيادات العناية بالبشرة",
      "ممارسات تجميلية بقيادة أطباء الجلدية",
      "مراكز العافية التي تقدم علاجات غير جراحية",
      "مجموعات تجميل متعددة الممارسين",
      "علامات تجميل وعافية تطلق خط علاجات طبية",
    ],
    whoWeWorkWithRu: [
      "Клиники эстетической и косметической медицины",
      "Медицинские спа и клиники по уходу за кожей",
      "Дерматологические эстетические практики",
      "Wellness-центры с неинвазивными процедурами",
      "Многопрофильные группы эстетической медицины",
      "Beauty- и wellness-бренды, запускающие линейку клинических процедур",
    ],
    challenges: [
      { title: "Earning trust before the first visit", desc: "A client is trusting a practitioner with a visible result — marketing has to build credibility long before a consultation is booked." },
      { title: "Advertising in a regulated category", desc: "Aesthetic and medical marketing carries platform and regulatory restrictions that a generic media plan isn't built to navigate." },
      { title: "Local visibility against a crowded clinic map", desc: "A client typically compares three to five nearby clinics — Google Business Profile and local search presence decide who makes that shortlist." },
      { title: "Social proof that reads as real", desc: "Results content has to look credible, not curated to the point of looking staged, or it undermines the trust it's meant to build." },
      { title: "Converting interest into a booked consultation", desc: "A conversion-focused website and a fast enquiry-to-booking handoff matter more here than in most categories — hesitation kills the lead." },
    ],
    challengesAr: [
      { title: "كسب الثقة قبل الزيارة الأولى", desc: "يضع العميل ثقته في ممارس سيترك أثراً مرئياً على مظهره — لذا يجب أن يبني التسويق المصداقية قبل حجز الاستشارة بوقت طويل." },
      { title: "الإعلان ضمن فئة منظَّمة", desc: "يخضع التسويق التجميلي والطبي لقيود من المنصات والجهات التنظيمية لا تستطيع خطة إعلانية عامة التعامل معها." },
      { title: "الظهور المحلي وسط خريطة عيادات مزدحمة", desc: "يقارن العميل عادةً بين ثلاث إلى خمس عيادات قريبة — ويحدد ملف جوجل التجاري وحضور البحث المحلي من يصل إلى تلك القائمة المختصرة." },
      { title: "دليل اجتماعي يبدو حقيقياً", desc: "يجب أن يبدو محتوى النتائج موثوقاً، لا منسّقاً إلى درجة تبدو مفتعلة، وإلا قوّض الثقة التي يُفترض أن يبنيها." },
      { title: "تحويل الاهتمام إلى استشارة محجوزة", desc: "الموقع المركّز على التحويل والانتقال السريع من الاستفسار إلى الحجز يهمان هنا أكثر من معظم الفئات الأخرى — فالتردد يقتل العميل المحتمل." },
    ],
    challengesRu: [
      { title: "Завоевать доверие ещё до первого визита", desc: "Клиент доверяет специалисту видимый результат — маркетинг должен формировать доверие задолго до записи на консультацию." },
      { title: "Реклама в регулируемой категории", desc: "Эстетический и медицинский маркетинг подчиняется ограничениям платформ и регуляторов, с которыми типовой медиаплан просто не рассчитан работать." },
      { title: "Локальная видимость на перегруженной карте клиник", desc: "Клиент обычно сравнивает три-пять клиник поблизости — профиль в Google Business и локальный поиск решают, кто попадёт в этот шорт-лист." },
      { title: "Социальное доказательство, которому верят", desc: "Контент с результатами должен выглядеть достоверно, а не отредактированным до постановочности — иначе он подрывает то самое доверие, которое должен создавать." },
      { title: "Превратить интерес в запись на консультацию", desc: "Сайт, ориентированный на конверсию, и быстрый переход от заявки к записи важны здесь больше, чем в большинстве категорий — колебание убивает лида." },
    ],
    services: [
      { slug: "digital-marketing", title: "Performance Marketing for Clinics", desc: "Search and social campaigns built within the category's advertising restrictions, targeted at genuine consultation intent." },
      { slug: "seo", title: "Aesthetic Clinic SEO", desc: "Local and treatment-specific search visibility that puts the clinic on the shortlist before a client ever compares reviews." },
      { slug: "branding", title: "Clinic Branding & Positioning", desc: "A visual identity and tone that reads as clinical and credible, not clinical and cold." },
      { slug: "website-development", title: "Conversion-Focused Clinic Websites", desc: "Fast, trust-building websites with treatment pages and booking flows designed for a hesitant first-time client." },
      { slug: "crm-marketing-automation", title: "Consultation & Retention Automation", desc: "Automated follow-up from enquiry to consultation, and post-treatment sequences that bring a client back for the next one." },
    ],
    servicesAr: [
      { slug: "digital-marketing", title: "التسويق الأدائي للعيادات", desc: "حملات بحث وسوشيال ميديا مصممة ضمن القيود الإعلانية لهذه الفئة، وتستهدف نية استشارة حقيقية." },
      { slug: "seo", title: "تحسين محركات البحث لعيادات التجميل", desc: "ظهور محلي ومرتبط بالعلاج تحديداً في نتائج البحث، يضع العيادة على القائمة المختصرة قبل أن يقارن العميل التقييمات." },
      { slug: "branding", title: "هوية العيادة وتموضعها", desc: "هوية بصرية ونبرة توحي بالمصداقية الطبية، لا بالبرود الطبي." },
      { slug: "website-development", title: "مواقع عيادات مركّزة على التحويل", desc: "مواقع سريعة تبني الثقة، بصفحات علاجات ومسارات حجز مصممة للعميل المتردد في زيارته الأولى." },
      { slug: "crm-marketing-automation", title: "أتمتة الاستشارات والاحتفاظ بالعملاء", desc: "متابعة آلية من الاستفسار وحتى الاستشارة، وسلاسل ما بعد العلاج التي تعيد العميل لجلسته التالية." },
    ],
    servicesRu: [
      { slug: "digital-marketing", title: "Performance-маркетинг для клиник", desc: "Поисковые и социальные кампании, выстроенные с учётом рекламных ограничений категории и нацеленные на реальное намерение записаться на консультацию." },
      { slug: "seo", title: "SEO для клиник эстетической медицины", desc: "Локальная и по-процедурная видимость в поиске, которая ставит клинику в шорт-лист ещё до того, как клиент начнёт сравнивать отзывы." },
      { slug: "branding", title: "Брендинг и позиционирование клиники", desc: "Визуальная айдентика и тон коммуникации, которые звучат клинически достоверно, а не клинически холодно." },
      { slug: "website-development", title: "Сайты клиник, ориентированные на конверсию", desc: "Быстрые сайты, формирующие доверие, со страницами процедур и формами записи, продуманными для сомневающегося клиента, обращающегося впервые." },
      { slug: "crm-marketing-automation", title: "Автоматизация консультаций и удержания", desc: "Автоматизированное сопровождение от заявки до консультации и цепочки после процедуры, которые возвращают клиента на следующую." },
    ],
    approach: [
      { step: "01", title: "Trust Audit", desc: "Review what a prospective client actually sees across Google, social and the website before they ever ask a question." },
      { step: "02", title: "Positioning", desc: "Define the clinic's credible point of difference — practitioner expertise, results, patient experience — and build the message around it." },
      { step: "03", title: "Content & Proof", desc: "Build a library of genuine before-and-after and patient-experience content that carries the trust story across channels." },
      { step: "04", title: "Local Search", desc: "Strengthen Google Business Profile and local SEO so the clinic surfaces on the shortlist a nearby search generates." },
      { step: "05", title: "Performance", desc: "Run compliant, consultation-focused paid campaigns measured against booked consultations, not clicks." },
      { step: "06", title: "Retention", desc: "Keep clients returning with CRM sequences built around treatment cycles, not one-off promotions." },
    ],
    approachAr: [
      { step: "01", title: "تدقيق الثقة", desc: "مراجعة ما يراه العميل المحتمل فعلياً عبر جوجل والسوشيال ميديا والموقع قبل أن يطرح أي سؤال." },
      { step: "02", title: "التموضع", desc: "تحديد نقطة تميّز العيادة الموثوقة — خبرة الممارس، النتائج، تجربة المريض — وبناء الرسالة حولها." },
      { step: "03", title: "المحتوى والدليل", desc: "بناء مكتبة محتوى حقيقي لنتائج ما قبل وبعد وتجارب المرضى تحمل قصة الثقة عبر القنوات." },
      { step: "04", title: "البحث المحلي", desc: "تعزيز ملف جوجل التجاري وتحسين محركات البحث المحلي بحيث تظهر العيادة في القائمة المختصرة لبحث قريب." },
      { step: "05", title: "الأداء", desc: "إدارة حملات مدفوعة متوافقة مع الأنظمة ومركّزة على الاستشارات، تُقاس بالاستشارات المحجوزة لا بالنقرات." },
      { step: "06", title: "الاحتفاظ بالعملاء", desc: "إبقاء العملاء يعودون عبر سلاسل إدارة علاقات عملاء مبنية حول دورات العلاج، لا العروض لمرة واحدة." },
    ],
    approachRu: [
      { step: "01", title: "Аудит доверия", desc: "Анализируем, что потенциальный клиент реально видит в Google, соцсетях и на сайте ещё до того, как задаст первый вопрос." },
      { step: "02", title: "Позиционирование", desc: "Определяем убедительное отличие клиники — экспертизу врача, результаты, опыт пациентов — и строим вокруг этого сообщение." },
      { step: "03", title: "Контент и доказательства", desc: "Создаём библиотеку подлинного контента «до и после» и историй пациентов, которая несёт историю доверия через все каналы." },
      { step: "04", title: "Локальный поиск", desc: "Усиливаем профиль в Google Business и локальный SEO, чтобы клиника попадала в шорт-лист при поиске «рядом со мной»." },
      { step: "05", title: "Performance-реклама", desc: "Запускаем платные кампании в рамках правил площадок, ориентированные на запись на консультацию, а не на клики." },
      { step: "06", title: "Удержание", desc: "Возвращаем клиентов с помощью CRM-цепочек, построенных вокруг циклов процедур, а не разовых акций." },
    ],
    faqs: [
      { q: "Can you advertise aesthetic and medical treatments on Google and Meta?", a: "Within each platform's advertising policy for medical and cosmetic content — we build campaigns to work inside those restrictions rather than around them, which protects the account long-term." },
      { q: "How important is Google Business Profile for a clinic?", a: "It's often the first thing a prospective client checks before a website — reviews, photos and response rate there directly influence whether the clinic makes the shortlist." },
      { q: "What makes aesthetic clinic marketing different from general healthcare marketing?", a: "The purchase decision leans more heavily on visible results, aesthetic taste and social proof, and the client journey is usually elective rather than needs-driven, which changes both the content and the funnel." },
      { q: "Do you help with social media content, not just advertising?", a: "Yes — for this category the organic feed does as much trust-building work as any paid campaign, so content strategy and advertising are planned together." },
    ],
    faqsAr: [
      { q: "هل يمكن الإعلان عن العلاجات التجميلية والطبية على جوجل وميتا؟", a: "ضمن سياسات الإعلان الخاصة بكل منصة للمحتوى الطبي والتجميلي — نبني الحملات لتعمل داخل هذه القيود لا للالتفاف عليها، وهو ما يحمي الحساب على المدى الطويل." },
      { q: "ما مدى أهمية ملف جوجل التجاري للعيادة؟", a: "غالباً ما يكون أول ما يفحصه العميل المحتمل قبل الموقع الإلكتروني — إذ تؤثر التقييمات والصور ومعدل الرد مباشرةً في وصول العيادة إلى القائمة المختصرة." },
      { q: "ما الذي يميّز تسويق عيادات التجميل عن التسويق الصحي العام؟", a: "يعتمد قرار الشراء بشكل أكبر على النتائج المرئية والذوق الجمالي والدليل الاجتماعي، وتكون رحلة العميل عادةً اختيارية لا قائمة على حاجة ملحّة، ما يغيّر طبيعة المحتوى ومسار التحويل معاً." },
      { q: "هل تساعدون في محتوى السوشيال ميديا، لا الإعلانات فقط؟", a: "نعم — ففي هذه الفئة يقوم المحتوى العضوي بجهد بناء ثقة يوازي أي حملة مدفوعة، لذا نخطط استراتيجية المحتوى والإعلانات معاً." },
    ],
    faqsRu: [
      { q: "Можно ли рекламировать эстетические и медицинские процедуры в Google и Meta?", a: "Да, в рамках рекламной политики каждой платформы для медицинского и косметологического контента — мы строим кампании так, чтобы работать внутри этих ограничений, а не в обход них, что защищает аккаунт в долгосрочной перспективе." },
      { q: "Насколько важен профиль Google Business для клиники?", a: "Часто это первое, что проверяет потенциальный клиент ещё до сайта — отзывы, фото и скорость ответа там напрямую влияют на то, попадёт ли клиника в шорт-лист." },
      { q: "Чем маркетинг эстетической клиники отличается от маркетинга обычного медицинского учреждения?", a: "Решение о покупке здесь сильнее опирается на видимые результаты, эстетический вкус и социальное доказательство, а путь клиента чаще связан с личным выбором, а не с необходимостью, — это меняет и контент, и воронку." },
      { q: "Вы помогаете с контентом в соцсетях, а не только с рекламой?", a: "Да — в этой категории органическая лента формирует доверие не хуже любой платной кампании, поэтому контент-стратегию и рекламу мы планируем вместе." },
    ],
    ctaTitle: ["Let's build the trust", "that earns the booking."],
    ctaTitleAr: ["لنبنِ الثقة", "التي تكسب الحجز."],
    ctaTitleRu: ["Построим доверие,", "которое приводит к записи."],
    ctaMessage: "Hi, I'm interested in digital marketing for aesthetic clinics.",
    ctaMessageAr: "مرحباً، أنا مهتم بالتسويق الرقمي لعيادات التجميل.",
    ctaMessageRu: "Здравствуйте, меня интересует digital-маркетинг для клиник эстетической медицины.",
    metaDescription:
      "Aesthetic clinic and medical spa marketing in Dubai — trust-led performance marketing, SEO, branding and conversion websites for clinics and wellness brands.",
    metaDescriptionAr:
      "تسويق عيادات التجميل والمنتجعات الطبية في دبي — تسويق أدائي قائم على الثقة، تحسين لمحركات البحث، هوية بصرية ومواقع تحويل للعيادات وعلامات العافية.",
    metaDescriptionRu:
      "Маркетинг для клиник эстетической медицины и медицинских спа в Дубае: performance-реклама на доверии, SEO, брендинг и конверсионные сайты.",
    seoTitle: "Aesthetic Clinic & Medical Spa Marketing Agency — Dubai",
    seoTitleAr: "وكالة تسويق لعيادات التجميل والمنتجعات الطبية — دبي",
    seoTitleRu: "Агентство маркетинга для клиник эстетической медицины — Дубай",
    relatedIndustrySlug: "healthcare",
  },
  {
    slug: "healthcare",
    num: "04",
    name: "Healthcare",
    nameAr: "الرعاية الصحية",
    nameRu: "Здравоохранение",
    title: "Digital Marketing for Healthcare.",
    titleAr: "التسويق الرقمي للرعاية الصحية.",
    titleRu: "Цифровой маркетинг для здравоохранения.",
    heroImage: "/images/industries/healthcare.jpg",
    descriptor:
      "Credibility-first marketing for clinics and healthcare providers, where patient trust and local search visibility decide who gets the appointment.",
    descriptorAr:
      "تسويق قائم على المصداقية أولاً للعيادات ومقدمي الرعاية الصحية، حيث تحدد ثقة المريض والظهور في البحث المحلي من يحصل على الموعد.",
    descriptorRu:
      "Маркетинг, построенный на доверии, для клиник и медицинских учреждений, где запись на приём решают доверие пациентов и видимость в локальном поиске.",
    subhead: "Marketing built on credibility, not claims.",
    subheadAr: "تسويق مبني على المصداقية، لا على الادعاءات.",
    subheadRu: "Маркетинг, основанный на достоверности, а не на заявлениях.",
    lead:
      "A patient chooses a clinic the way they choose a doctor — on trust, proximity and proof — and that decision is made online before it's made in a waiting room.",
    leadAr:
      "يختار المريض العيادة بالطريقة نفسها التي يختار بها الطبيب — بناءً على الثقة والقرب والدليل — ويُتخذ هذا القرار عبر الإنترنت قبل أن يُتخذ في غرفة الانتظار.",
    leadRu:
      "Пациент выбирает клинику так же, как выбирает врача, — по доверию, близости и доказательствам, — и это решение принимается в интернете задолго до приёмной.",
    intro: [
      "Healthcare search behaviour is need-driven and time-sensitive: a symptom, an insurance panel, or a recommendation sends a patient straight to Google, and the clinics that appear, load fast and answer the actual question win the appointment. Unlike more discretionary categories, healthcare marketing has to be accurate as much as it is persuasive — overstating a claim doesn't just risk regulatory exposure, it erodes exactly the trust the whole funnel depends on.",
      "Most clinics also compete on two fronts simultaneously: paid and organic visibility for symptom and specialty searches, and a Google Business Profile and review presence strong enough to win the 'near me' comparison a patient runs before calling. Getting both right is what turns local search into a steady stream of appointments rather than a single campaign spike.",
    ],
    introAr: [
      "سلوك البحث في قطاع الرعاية الصحية قائم على حاجة فعلية وحساس للوقت: عرَض صحي، أو شبكة تأمين، أو توصية، كلها تدفع المريض مباشرة إلى جوجل، والعيادات التي تظهر بسرعة وتُجيب عن السؤال الفعلي هي من تفوز بالموعد. وخلافاً للفئات الأكثر اختيارية، يجب أن يكون التسويق الصحي دقيقاً بقدر ما هو مقنع — فالمبالغة في ادعاء لا تعرّض العيادة لمخاطر تنظيمية فحسب، بل تقوّض الثقة التي يعتمد عليها مسار التحويل بأكمله.",
      "تتنافس معظم العيادات أيضاً على جبهتين في آن واحد: الظهور المدفوع والعضوي في عمليات البحث عن الأعراض والتخصصات، وحضور قوي في ملف جوجل التجاري والتقييمات يكفي للفوز بمقارنة 'بالقرب مني' التي يجريها المريض قبل الاتصال. إتقان الجبهتين معاً هو ما يحوّل البحث المحلي إلى تدفق ثابت من المواعيد بدلاً من ارتفاع مؤقت مرتبط بحملة واحدة.",
    ],
    introRu: [
      "Поведение пациентов в поиске продиктовано необходимостью и ограничено во времени: симптом, страховая программа или рекомендация сразу же приводят пациента в Google, и запись получает та клиника, которая появляется в выдаче, быстро загружается и отвечает на реальный вопрос. В отличие от менее насущных категорий, медицинский маркетинг должен быть точным не меньше, чем убедительным, — преувеличенное заявление не просто создаёт регуляторный риск, оно подрывает то самое доверие, на котором держится вся воронка.",
      "Большинству клиник приходится конкурировать сразу на двух фронтах: платная и органическая видимость по запросам симптомов и специализаций, а также присутствие в Google Business Profile и отзывах, достаточно сильное, чтобы выигрывать сравнение «рядом со мной», которое пациент проводит перед звонком. Именно правильная работа с обоими направлениями превращает локальный поиск в стабильный поток записей, а не в разовый всплеск от одной кампании.",
    ],
    bodyLinks: [
      { text: "In practice that's " },
      { text: "performance marketing", href: "/services/digital-marketing" },
      { text: " and " },
      { text: "healthcare SEO", href: "/services/seo" },
      { text: " paired with a fast, accessible " },
      { text: "website", href: "/services/website-development" },
      { text: " and " },
      { text: "patient CRM", href: "/services/crm-marketing-automation" },
      { text: " that follows up on every enquiry. It shares real ground with " },
      { text: "aesthetic and wellness marketing", href: "/industries/aesthetic-wellness" },
      { text: ", and " },
      { text: "get in touch", href: "/contact" },
      { text: " if you want to talk specifics." },
    ],
    bodyLinksAr: [
      { text: "عملياً، يعني ذلك " },
      { text: "التسويق الرقمي", href: "/services/digital-marketing" },
      { text: " و" },
      { text: "تحسين محركات البحث", href: "/services/seo" },
      { text: " إلى جانب " },
      { text: "موقع إلكتروني", href: "/services/website-development" },
      { text: " سريع وسهل الوصول و" },
      { text: "نظام إدارة علاقات العملاء", href: "/services/crm-marketing-automation" },
      { text: " يتابع كل استفسار. يشترك هذا القطاع في أرضية حقيقية مع " },
      { text: "التجميل والعافية", href: "/industries/aesthetic-wellness" },
      { text: "، و" },
      { text: "تواصلوا معنا", href: "/contact" },
      { text: " إن أردتم مناقشة التفاصيل." },
    ],
    bodyLinksRu: [
      { text: "На практике это " },
      { text: "performance-маркетинг", href: "/services/digital-marketing" },
      { text: " и " },
      { text: "SEO для здравоохранения", href: "/services/seo" },
      { text: " вместе с быстрым, доступным " },
      { text: "сайтом", href: "/services/website-development" },
      { text: " и " },
      { text: "CRM для пациентов", href: "/services/crm-marketing-automation" },
      { text: ", которая отслеживает каждое обращение. Эта отрасль во многом пересекается с " },
      { text: "эстетической медициной и wellness", href: "/industries/aesthetic-wellness" },
      { text: " — " },
      { text: "свяжитесь с нами", href: "/contact" },
      { text: ", если хотите обсудить детали." },
    ],
    whoWeWorkWith: [
      "Multi-specialty and single-specialty medical clinics",
      "Dental practices and dental groups",
      "Diagnostic and imaging centres",
      "Physiotherapy and rehabilitation clinics",
      "Healthcare groups managing multiple branches",
      "Telehealth and digital-first healthcare providers",
    ],
    whoWeWorkWithAr: [
      "عيادات طبية متعددة التخصصات وأحادية التخصص",
      "عيادات ومجموعات طب الأسنان",
      "مراكز التشخيص والأشعة",
      "عيادات العلاج الطبيعي وإعادة التأهيل",
      "مجموعات رعاية صحية تدير عدة فروع",
      "مقدمو رعاية صحية عن بُعد ورقميون أولاً",
    ],
    whoWeWorkWithRu: [
      "Многопрофильные и узкоспециализированные медицинские клиники",
      "Стоматологические практики и группы клиник",
      "Диагностические и визуализационные центры",
      "Клиники физиотерапии и реабилитации",
      "Медицинские группы с несколькими филиалами",
      "Телемедицинские и digital-ориентированные медицинские сервисы",
    ],
    challenges: [
      { title: "Trust and regulatory accuracy", desc: "Claims have to be accurate as well as persuasive — marketing here carries a credibility and compliance bar most categories don't." },
      { title: "Winning the 'near me' search", desc: "Local pack visibility and review volume decide whether a patient calls this clinic or the next listing down." },
      { title: "Insurance and panel complexity", desc: "A patient's first question is often whether their insurer is accepted — that has to be answered clearly and fast, ideally before the call." },
      { title: "Multi-branch consistency", desc: "A group with several branches needs every location visible and accurately listed, not just the flagship clinic." },
      { title: "Converting search intent into a booked appointment", desc: "A fast, clear booking path matters as much as visibility — a patient who can't book in two clicks often just calls the next result." },
    ],
    challengesAr: [
      { title: "الثقة والدقة التنظيمية", desc: "يجب أن تكون الادعاءات دقيقة بقدر ما هي مقنعة — فالتسويق هنا يحمل معياراً من المصداقية والامتثال لا تحمله معظم الفئات الأخرى." },
      { title: "الفوز ببحث 'بالقرب مني'", desc: "يحدد الظهور في نتائج الخريطة المحلية وحجم التقييمات ما إذا كان المريض سيتصل بهذه العيادة أو بالعرض الذي يليها." },
      { title: "تعقيد شبكات التأمين", desc: "غالباً ما يكون سؤال المريض الأول هو هل تُقبل شركة تأمينه — ويجب الإجابة عن ذلك بوضوح وسرعة، ويُفضّل قبل الاتصال." },
      { title: "الاتساق بين الفروع المتعددة", desc: "تحتاج المجموعة ذات الفروع المتعددة إلى أن يكون كل موقع ظاهراً ومدرجاً بدقة، لا العيادة الرئيسية وحدها." },
      { title: "تحويل نية البحث إلى موعد محجوز", desc: "مسار حجز سريع وواضح لا يقل أهمية عن الظهور نفسه — فالمريض الذي لا يستطيع الحجز خلال نقرتين غالباً ما يتصل بالنتيجة التالية فحسب." },
    ],
    challengesRu: [
      { title: "Доверие и регуляторная точность", desc: "Заявления должны быть точными настолько же, насколько убедительными, — маркетинг здесь несёт планку достоверности и соответствия требованиям, недостижимую для большинства категорий." },
      { title: "Победа в поиске «рядом со мной»", desc: "Видимость в локальной выдаче и объём отзывов решают, позвонит ли пациент именно в эту клинику или в следующую по списку." },
      { title: "Сложность работы со страховками", desc: "Первый вопрос пациента часто в том, принимается ли его страховка, — на него нужно отвечать ясно и быстро, в идеале ещё до звонка." },
      { title: "Единообразие для сети филиалов", desc: "Группе с несколькими филиалами нужна видимость и точные данные по каждой локации, а не только по флагманской клинике." },
      { title: "Превратить поисковый запрос в запись на приём", desc: "Быстрый и понятный путь к записи важен не меньше видимости — пациент, который не может записаться за два клика, часто просто звонит по следующей ссылке в выдаче." },
    ],
    services: [
      { slug: "digital-marketing", title: "Performance Marketing for Clinics", desc: "Search campaigns built around genuine appointment intent, respecting the accuracy standard healthcare advertising requires." },
      { slug: "seo", title: "Healthcare SEO", desc: "Specialty, symptom and location-based search visibility, plus the local pack presence that wins the 'near me' search." },
      { slug: "website-development", title: "Clinic & Practice Websites", desc: "Fast, accessible websites with clear booking flows, insurance information and per-branch location pages." },
      { slug: "branding", title: "Healthcare Branding", desc: "A credible, reassuring identity that reads as clinically sound across every touchpoint, from signage to social." },
      { slug: "crm-marketing-automation", title: "Patient CRM & Follow-Up", desc: "Automated appointment reminders, recall sequences and post-visit follow-up that reduce no-shows and build return visits." },
    ],
    servicesAr: [
      { slug: "digital-marketing", title: "التسويق الأدائي للعيادات", desc: "حملات بحث مبنية حول نية حجز موعد حقيقية، مع الالتزام بمعيار الدقة الذي يتطلبه الإعلان الصحي." },
      { slug: "seo", title: "تحسين محركات البحث للرعاية الصحية", desc: "ظهور في البحث حسب التخصص والعرض الصحي والموقع الجغرافي، إضافة إلى حضور في نتائج الخريطة المحلية يفوز ببحث 'بالقرب مني'." },
      { slug: "website-development", title: "مواقع العيادات والممارسات الطبية", desc: "مواقع سريعة وسهلة الوصول بمسارات حجز واضحة، ومعلومات تأمين، وصفحات موقع لكل فرع." },
      { slug: "branding", title: "الهوية البصرية للرعاية الصحية", desc: "هوية موثوقة ومطمئنة تبدو سليمة طبياً عبر كل نقطة تواصل، من اللافتات إلى السوشيال ميديا." },
      { slug: "crm-marketing-automation", title: "إدارة علاقات المرضى والمتابعة", desc: "تذكيرات مواعيد آلية، وسلاسل استدعاء، ومتابعة بعد الزيارة تقلل من الغياب عن المواعيد وتبني زيارات متكررة." },
    ],
    servicesRu: [
      { slug: "digital-marketing", title: "Performance-маркетинг для клиник", desc: "Поисковые кампании, построенные вокруг реального намерения записаться на приём, с соблюдением стандартов точности медицинской рекламы." },
      { slug: "seo", title: "SEO для медицинских учреждений", desc: "Видимость в поиске по специализациям, симптомам и локации, а также присутствие в локальной выдаче, побеждающее в запросах «рядом со мной»." },
      { slug: "website-development", title: "Сайты клиник и медицинских практик", desc: "Быстрые, доступные сайты с понятными формами записи, информацией о страховках и страницами для каждого филиала." },
      { slug: "branding", title: "Брендинг для здравоохранения", desc: "Достоверная, вызывающая доверие айдентика, которая читается как клинически обоснованная на каждой точке контакта — от вывески до соцсетей." },
      { slug: "crm-marketing-automation", title: "CRM для пациентов и сопровождение", desc: "Автоматические напоминания о приёме, цепочки повторных вызовов и сопровождение после визита, которые сокращают неявки и формируют повторные визиты." },
    ],
    approach: [
      { step: "01", title: "Audit", desc: "Review current visibility across search, maps and review platforms for every specialty and location the practice covers." },
      { step: "02", title: "Positioning", desc: "Establish a credible, accurate message for each specialty that a patient can act on without second-guessing it." },
      { step: "03", title: "Local Search", desc: "Build out Google Business Profile, local SEO and per-branch pages so every location wins its own local pack." },
      { step: "04", title: "Performance Marketing", desc: "Run appointment-focused paid campaigns within healthcare advertising standards." },
      { step: "05", title: "Booking Experience", desc: "Tighten the website's booking path so search intent converts into a confirmed appointment, not an abandoned form." },
      { step: "06", title: "Patient Retention", desc: "Layer in CRM automation for reminders, recalls and follow-up that keep patients returning." },
    ],
    approachAr: [
      { step: "01", title: "التدقيق", desc: "مراجعة الظهور الحالي عبر البحث والخرائط ومنصات التقييم لكل تخصص وموقع تغطيه الممارسة." },
      { step: "02", title: "التموضع", desc: "بناء رسالة موثوقة ودقيقة لكل تخصص يستطيع المريض التصرف بناءً عليها دون تردد." },
      { step: "03", title: "البحث المحلي", desc: "بناء ملف جوجل التجاري وتحسين محركات البحث المحلي وصفحات لكل فرع بحيث يفوز كل موقع بنتائجه المحلية الخاصة." },
      { step: "04", title: "التسويق الأدائي", desc: "إدارة حملات مدفوعة مركّزة على الحجز ضمن معايير الإعلان الصحي." },
      { step: "05", title: "تجربة الحجز", desc: "تحسين مسار الحجز في الموقع بحيث تتحول نية البحث إلى موعد مؤكد لا نموذج مهجور." },
      { step: "06", title: "الاحتفاظ بالمرضى", desc: "إضافة أتمتة إدارة علاقات العملاء للتذكيرات والاستدعاءات والمتابعة التي تُبقي المرضى يعودون." },
    ],
    approachRu: [
      { step: "01", title: "Аудит", desc: "Анализируем текущую видимость в поиске, картах и на платформах отзывов по каждой специализации и локации практики." },
      { step: "02", title: "Позиционирование", desc: "Формируем достоверное и точное сообщение для каждой специализации, на которое пациент может действовать без сомнений." },
      { step: "03", title: "Локальный поиск", desc: "Развиваем профиль Google Business, локальный SEO и страницы филиалов, чтобы каждая локация выигрывала свою локальную выдачу." },
      { step: "04", title: "Performance-маркетинг", desc: "Запускаем платные кампании, ориентированные на запись на приём, в рамках стандартов медицинской рекламы." },
      { step: "05", title: "Опыт записи", desc: "Дорабатываем путь записи на сайте, чтобы поисковый запрос превращался в подтверждённый приём, а не в брошенную форму." },
      { step: "06", title: "Удержание пациентов", desc: "Добавляем CRM-автоматизацию для напоминаний, повторных вызовов и сопровождения, которая возвращает пациентов снова." },
    ],
    faqs: [
      { q: "Is healthcare marketing regulated differently to other industries?", a: "Yes — claims about outcomes and treatments have to be accurate and compliant with platform and, where applicable, local health-advertising standards, which shapes both the messaging and the media strategy." },
      { q: "How much does local SEO matter for a single clinic?", a: "It's usually the single highest-leverage channel — most patients search by symptom, specialty or 'near me' before they search for a clinic by name." },
      { q: "Can you manage marketing for a multi-branch healthcare group?", a: "Yes — each branch needs its own accurate listing, local SEO presence and tracked performance, coordinated under one overall strategy rather than run separately." },
      { q: "Do you help reduce no-shows, not just generate new patients?", a: "Yes — CRM-driven reminder and recall sequences are part of the system, since retaining and reactivating existing patients is usually more cost-effective than acquiring new ones." },
    ],
    faqsAr: [
      { q: "هل يخضع التسويق الصحي لتنظيم مختلف عن القطاعات الأخرى؟", a: "نعم — يجب أن تكون الادعاءات حول النتائج والعلاجات دقيقة ومتوافقة مع معايير المنصات، وحيثما ينطبق، مع معايير الإعلان الصحي المحلية، ما يشكّل الرسالة واستراتيجية الحملات معاً." },
      { q: "ما مدى أهمية تحسين محركات البحث المحلي لعيادة واحدة؟", a: "غالباً ما تكون القناة الأعلى تأثيراً بمفردها — إذ يبحث معظم المرضى بالعرض الصحي أو التخصص أو 'بالقرب مني' قبل البحث باسم العيادة تحديداً." },
      { q: "هل يمكنكم إدارة التسويق لمجموعة رعاية صحية متعددة الفروع؟", a: "نعم — يحتاج كل فرع إلى إدراج دقيق خاص به، وحضور في البحث المحلي، وأداء يُتابع، منسّق ضمن استراتيجية شاملة واحدة بدلاً من إدارته بمعزل عن غيره." },
      { q: "هل تساعدون في تقليل الغياب عن المواعيد، لا استقطاب مرضى جدد فقط؟", a: "نعم — سلاسل التذكير والاستدعاء المعتمدة على إدارة علاقات العملاء جزء من النظام، إذ يكون الاحتفاظ بالمرضى الحاليين وإعادة تنشيطهم عادةً أكثر جدوى من حيث التكلفة من استقطاب مرضى جدد." },
    ],
    faqsRu: [
      { q: "Регулируется ли медицинский маркетинг иначе, чем другие отрасли?", a: "Да — заявления о результатах и методах лечения должны быть точными и соответствовать правилам платформ и, где применимо, местным стандартам медицинской рекламы, что определяет и сообщения, и медиастратегию." },
      { q: "Насколько важен локальный SEO для отдельной клиники?", a: "Обычно это самый эффективный канал — большинство пациентов ищут по симптому, специализации или запросу «рядом со мной», прежде чем искать клинику по названию." },
      { q: "Вы можете вести маркетинг для медицинской группы с несколькими филиалами?", a: "Да — каждому филиалу нужны собственный точный листинг, присутствие в локальном SEO и отслеживаемые показатели, скоординированные в рамках единой стратегии, а не работающие по отдельности." },
      { q: "Вы помогаете сократить неявки, а не только привлекать новых пациентов?", a: "Да — цепочки напоминаний и повторных вызовов на базе CRM входят в систему, поскольку удержание и реактивация существующих пациентов обычно обходится дешевле привлечения новых." },
    ],
    ctaTitle: ["Let's build the visibility", "patients actually trust."],
    ctaTitleAr: ["لنبنِ الظهور", "الذي يثق به المرضى فعلاً."],
    ctaTitleRu: ["Построим видимость,", "которой действительно доверяют пациенты."],
    ctaMessage: "Hi, I'm interested in digital marketing for healthcare.",
    ctaMessageAr: "مرحباً، أنا مهتم بالتسويق الرقمي للرعاية الصحية.",
    ctaMessageRu: "Здравствуйте, меня интересует digital-маркетинг для здравоохранения.",
    metaDescription:
      "Healthcare marketing in Dubai — SEO, performance marketing, branding and websites for clinics, medical groups and healthcare providers, built on patient trust.",
    metaDescriptionAr:
      "تسويق الرعاية الصحية في دبي — تحسين لمحركات البحث، تسويق أدائي، هوية بصرية ومواقع للعيادات والمجموعات الطبية، مبني على ثقة المرضى.",
    metaDescriptionRu:
      "Медицинский маркетинг в Дубае: SEO, performance-реклама, брендинг и сайты для клиник и медицинских групп, построенные на доверии пациентов.",
    seoTitle: "Healthcare & Medical Clinic Marketing Agency — Dubai",
    seoTitleAr: "وكالة تسويق للرعاية الصحية والعيادات الطبية — دبي",
    seoTitleRu: "Агентство маркетинга для медицинских клиник — Дубай",
    relatedIndustrySlug: "aesthetic-wellness",
  },
  {
    slug: "ecommerce-retail",
    num: "05",
    name: "E-commerce & Retail",
    nameAr: "التجارة الإلكترونية والتجزئة",
    nameRu: "E-commerce и ритейл",
    title: "Digital Marketing for E-commerce.",
    titleAr: "التسويق الرقمي للتجارة الإلكترونية.",
    titleRu: "Цифровой маркетинг для e-commerce.",
    heroImage: "/images/industries/ecommerce-retail.jpg",
    descriptor:
      "Performance marketing and store experience built to lift conversion rate and repeat purchase, not just traffic.",
    descriptorAr:
      "تسويق أدائي وتجربة متجر مصممان لرفع معدل التحويل والشراء المتكرر، لا لزيادة الزيارات فقط.",
    descriptorRu:
      "Performance-маркетинг и опыт покупки в магазине, направленные на рост конверсии и повторных покупок, а не только трафика.",
    subhead: "Marketing measured in revenue per visitor, not visits.",
    subheadAr: "تسويق يُقاس بالإيراد لكل زائر، لا بعدد الزيارات.",
    subheadRu: "Маркетинг, который измеряют выручкой на посетителя, а не числом визитов.",
    lead:
      "Traffic is the easiest number to buy in e-commerce and the least useful one to report — the only figure that matters is what a visitor actually spends.",
    leadAr:
      "الزيارات هي أسهل رقم يمكن شراؤه في التجارة الإلكترونية وأقلها فائدة في التقارير — الرقم الوحيد المهم هو ما ينفقه الزائر فعلياً.",
    leadRu:
      "Трафик — это самое простое, что можно купить в e-commerce, и самый бесполезный показатель для отчёта: единственная цифра, которая имеет значение, — сколько реально тратит посетитель.",
    intro: [
      "An e-commerce brand's marketing and its store are the same system: a campaign that drives traffic to a slow page, a confusing category structure or a checkout with too many steps is paying to lose the sale it just won. Growth here compounds through conversion rate, average order value and repeat purchase rate as much as through acquisition spend — three levers most retailers under-invest in relative to how much they spend on ads.",
      "Dubai's retail audience is also genuinely channel-diverse — search, social commerce, marketplaces and direct — so a strategy tuned to one channel alone leaves margin on the table. The brands scaling fastest treat SEO, paid media and the store experience as one funnel, measured end to end rather than by channel in isolation.",
    ],
    introAr: [
      "تسويق علامة التجارة الإلكترونية ومتجرها نظام واحد: فالحملة التي تقود الزيارات إلى صفحة بطيئة، أو بنية تصنيفات مربكة، أو عملية دفع بخطوات كثيرة، تدفع لتخسر البيع الذي كسبته للتو. ينمو هذا القطاع من خلال معدل التحويل ومتوسط قيمة الطلب ومعدل الشراء المتكرر بقدر نموه من خلال إنفاق الاستقطاب — وهي ثلاث روافع يقلّ استثمار معظم تجار التجزئة فيها مقارنةً بما ينفقونه على الإعلانات.",
      "جمهور التجزئة في دبي أيضاً متنوع القنوات فعلياً — البحث، التجارة عبر السوشيال ميديا، الأسواق الإلكترونية، والقناة المباشرة — لذا فإن أي استراتيجية مضبوطة على قناة واحدة فقط تترك هامش ربح غير مستغل. العلامات الأسرع نمواً تتعامل مع تحسين محركات البحث والإعلانات المدفوعة وتجربة المتجر كمسار تحويل واحد، يُقاس من البداية إلى النهاية لا قناة بمعزل عن أخرى.",
    ],
    introRu: [
      "Маркетинг e-commerce-бренда и его магазин — это одна система: кампания, которая приводит трафик на медленную страницу, запутанную структуру категорий или чекаут со слишком многими шагами, платит за то, чтобы тут же потерять только что выигранную продажу. Рост здесь накапливается через конверсию, средний чек и долю повторных покупок не меньше, чем через расходы на привлечение, — три рычага, в которые большинство ритейлеров инвестируют меньше, чем в рекламу.",
      "Розничная аудитория Дубая по-настоящему многоканальна — поиск, social commerce, маркетплейсы и прямые продажи, — поэтому стратегия, настроенная только на один канал, оставляет маржу на столе. Бренды, которые растут быстрее всех, работают с SEO, платной рекламой и опытом покупки в магазине как с единой воронкой, измеряемой целиком, а не по каналам по отдельности.",
    ],
    bodyLinks: [
      { text: "Day to day that's " },
      { text: "performance marketing", href: "/services/digital-marketing" },
      { text: " and " },
      { text: "e-commerce SEO", href: "/services/seo" },
      { text: " feeding a " },
      { text: "storefront", href: "/services/website-development" },
      { text: " built to convert, backed by " },
      { text: "retention automation", href: "/services/crm-marketing-automation" },
      { text: " that turns a first order into a second one. It runs close to " },
      { text: "fashion and luxury marketing", href: "/industries/fashion-luxury" },
      { text: ", and " },
      { text: "get in touch", href: "/contact" },
      { text: " if that's a better fit." },
    ],
    bodyLinksAr: [
      { text: "يومياً، يعني ذلك " },
      { text: "التسويق الرقمي", href: "/services/digital-marketing" },
      { text: " و" },
      { text: "تحسين محركات البحث", href: "/services/seo" },
      { text: " لتغذية " },
      { text: "متجر إلكتروني", href: "/services/website-development" },
      { text: " مصمم للتحويل، مدعوماً بـ" },
      { text: "أتمتة تسويقية", href: "/services/crm-marketing-automation" },
      { text: " تحوّل الطلب الأول إلى طلب ثانٍ. يقترب هذا القطاع من " },
      { text: "تسويق الأزياء والفخامة", href: "/industries/fashion-luxury" },
      { text: "، و" },
      { text: "تواصلوا معنا", href: "/contact" },
      { text: " إن كان ذلك أنسب لكم." },
    ],
    bodyLinksRu: [
      { text: "Изо дня в день это " },
      { text: "performance-маркетинг", href: "/services/digital-marketing" },
      { text: " и " },
      { text: "SEO для e-commerce", href: "/services/seo" },
      { text: ", которые ведут трафик на " },
      { text: "витрину", href: "/services/website-development" },
      { text: ", созданную для конверсии, вместе с " },
      { text: "автоматизацией удержания", href: "/services/crm-marketing-automation" },
      { text: ", превращающей первый заказ во второй. Эта отрасль близка к " },
      { text: "маркетингу моды и люкса", href: "/industries/fashion-luxury" },
      { text: " — " },
      { text: "свяжитесь с нами", href: "/contact" },
      { text: ", если это подходит лучше." },
    ],
    whoWeWorkWith: [
      "Direct-to-consumer e-commerce brands",
      "Multi-category online retailers",
      "Retail chains adding or scaling an online storefront",
      "Marketplace sellers building a direct-to-consumer channel",
      "Subscription and repeat-purchase commerce brands",
      "Retail brands launching in the UAE market",
    ],
    whoWeWorkWithAr: [
      "علامات تجارة إلكترونية تبيع مباشرة للمستهلك",
      "متاجر إلكترونية متعددة الفئات",
      "سلاسل تجزئة تضيف أو توسّع متجرها الإلكتروني",
      "بائعون في الأسواق الإلكترونية يبنون قناة مباشرة للمستهلك",
      "علامات تجارية تعتمد على الاشتراك والشراء المتكرر",
      "علامات تجزئة تطلق أعمالها في سوق الإمارات",
    ],
    whoWeWorkWithRu: [
      "D2C-бренды в e-commerce",
      "Мультикатегорийные онлайн-ритейлеры",
      "Розничные сети, запускающие или масштабирующие онлайн-магазин",
      "Продавцы на маркетплейсах, выстраивающие собственный D2C-канал",
      "Подписочные бренды и бренды с повторными покупками",
      "Розничные бренды, выходящие на рынок ОАЭ",
    ],
    challenges: [
      { title: "Rising acquisition costs", desc: "Paid channels get more expensive every quarter — margin has to come from conversion rate and retention, not just cheaper clicks." },
      { title: "Store experience as a conversion lever", desc: "Page speed, checkout friction and mobile usability move conversion rate more than most campaign optimisations ever will." },
      { title: "Fragmented channel performance", desc: "Search, social and marketplace traffic each convert differently — a single blended target hides which channel is actually working." },
      { title: "Repeat purchase and retention", desc: "Acquiring a customer once is expensive; a brand's real margin lives in the second and third purchase, which needs its own strategy." },
      { title: "Inventory-led campaign timing", desc: "Promotions, drops and stock cycles need media spend that moves with them, not a flat always-on budget." },
    ],
    challengesAr: [
      { title: "ارتفاع تكاليف الاستقطاب", desc: "تزداد تكلفة القنوات المدفوعة كل ربع سنة — لذا يجب أن يأتي الهامش من معدل التحويل والاحتفاظ بالعملاء، لا من نقرات أرخص فقط." },
      { title: "تجربة المتجر كرافعة تحويل", desc: "سرعة الصفحة، وسلاسة الدفع، وسهولة الاستخدام على الهاتف تؤثر في معدل التحويل أكثر بكثير مما تفعله معظم تحسينات الحملات." },
      { title: "أداء متفرق بين القنوات", desc: "تتحول زيارات البحث والسوشيال ميديا والأسواق الإلكترونية بمعدلات مختلفة — وأي هدف مجمّع واحد يخفي القناة التي تعمل فعلياً." },
      { title: "الشراء المتكرر والاحتفاظ بالعملاء", desc: "استقطاب العميل مرة واحدة مكلف؛ والهامش الحقيقي للعلامة يكمن في الشراء الثاني والثالث، وهو ما يحتاج إلى استراتيجية خاصة به." },
      { title: "توقيت الحملات وفق المخزون", desc: "تحتاج العروض وإطلاقات المنتجات ودورات المخزون إلى إنفاق إعلاني يتحرك معها، لا ميزانية ثابتة مستمرة." },
    ],
    challengesRu: [
      { title: "Рост стоимости привлечения", desc: "Платные каналы дорожают каждый квартал — маржу нужно искать в конверсии и удержании, а не только в более дешёвых кликах." },
      { title: "Опыт покупки как рычаг конверсии", desc: "Скорость загрузки страниц, трудности чекаута и удобство на мобильных влияют на конверсию сильнее, чем большинство оптимизаций кампаний." },
      { title: "Разрозненная эффективность каналов", desc: "Трафик из поиска, соцсетей и маркетплейсов конвертируется по-разному — единая усреднённая цель скрывает, какой канал реально работает." },
      { title: "Повторные покупки и удержание", desc: "Привлечь клиента один раз дорого; реальная маржа бренда живёт во второй и третьей покупке, а для этого нужна отдельная стратегия." },
      { title: "Календарь кампаний, привязанный к товарным остаткам", desc: "Промоакции, дропы и циклы поставок требуют рекламного бюджета, который двигается вместе с ними, а не работает по плоскому always-on графику." },
    ],
    services: [
      { slug: "digital-marketing", title: "Performance Marketing for E-commerce", desc: "Search and social campaigns structured around revenue per visitor and return on ad spend, not raw traffic." },
      { slug: "seo", title: "E-commerce SEO", desc: "Category and product page optimisation built to capture high-intent search traffic without relying entirely on paid." },
      { slug: "website-development", title: "E-commerce Website Development", desc: "Fast, mobile-first storefronts with checkout flows built to convert, not just display a catalogue." },
      { slug: "crm-marketing-automation", title: "Retention & Lifecycle Automation", desc: "Email and CRM sequences for abandoned cart, post-purchase and win-back that lift repeat purchase rate." },
      { slug: "branding", title: "Retail Brand Identity", desc: "A brand system consistent across the storefront, packaging and every channel a customer meets it on." },
    ],
    servicesAr: [
      { slug: "digital-marketing", title: "التسويق الأدائي للتجارة الإلكترونية", desc: "حملات بحث وسوشيال ميديا مبنية حول الإيراد لكل زائر والعائد على الإنفاق الإعلاني، لا حجم الزيارات الخام." },
      { slug: "seo", title: "تحسين محركات البحث للتجارة الإلكترونية", desc: "تحسين صفحات التصنيفات والمنتجات لالتقاط زيارات بحث عالية النية دون الاعتماد كلياً على الإعلانات المدفوعة." },
      { slug: "website-development", title: "تطوير مواقع التجارة الإلكترونية", desc: "متاجر إلكترونية سريعة مصممة أولاً للهاتف المحمول، بمسارات دفع مبنية للتحويل، لا لعرض الكتالوج فقط." },
      { slug: "crm-marketing-automation", title: "أتمتة الاحتفاظ بالعملاء ودورة حياتهم", desc: "سلاسل بريد إلكتروني وإدارة علاقات عملاء للسلة المتروكة وما بعد الشراء واستعادة العملاء ترفع معدل الشراء المتكرر." },
      { slug: "branding", title: "هوية علامة التجزئة", desc: "نظام هوية متسق عبر المتجر والتغليف وكل قناة يلتقي فيها العميل بالعلامة." },
    ],
    servicesRu: [
      { slug: "digital-marketing", title: "Performance-маркетинг для e-commerce", desc: "Поисковые и социальные кампании, выстроенные вокруг выручки на посетителя и окупаемости рекламных вложений, а не голого трафика." },
      { slug: "seo", title: "SEO для e-commerce", desc: "Оптимизация страниц категорий и товаров для захвата высокоинтентного поискового трафика без полной зависимости от платной рекламы." },
      { slug: "website-development", title: "Разработка сайтов для e-commerce", desc: "Быстрые, мобильно-ориентированные интернет-магазины с чекаутом, созданным для конверсии, а не просто для показа каталога." },
      { slug: "crm-marketing-automation", title: "Автоматизация удержания и жизненного цикла", desc: "Email- и CRM-цепочки для брошенных корзин, постпродажного сопровождения и возврата клиентов, повышающие долю повторных покупок." },
      { slug: "branding", title: "Айдентика розничного бренда", desc: "Система бренда, единая для витрины магазина, упаковки и каждого канала, где её встречает клиент." },
    ],
    approach: [
      { step: "01", title: "Audit", desc: "Review the full funnel — traffic, conversion rate, checkout and retention — to find where revenue is actually being lost." },
      { step: "02", title: "Store Experience", desc: "Fix the conversion levers inside the store itself before scaling spend that would otherwise be wasted on them." },
      { step: "03", title: "Acquisition", desc: "Build performance campaigns across search and social, budgeted to the channels actually returning revenue." },
      { step: "04", title: "SEO", desc: "Strengthen category and product page visibility to reduce long-term dependency on paid acquisition." },
      { step: "05", title: "Retention", desc: "Layer in lifecycle automation so a first purchase reliably leads to a second one." },
      { step: "06", title: "Optimise", desc: "Review performance by channel weekly against revenue per visitor, not blended traffic totals." },
    ],
    approachAr: [
      { step: "01", title: "التدقيق", desc: "مراجعة مسار التحويل الكامل — الزيارات، معدل التحويل، الدفع، الاحتفاظ بالعملاء — لتحديد أين يُفقد الإيراد فعلياً." },
      { step: "02", title: "تجربة المتجر", desc: "إصلاح روافع التحويل داخل المتجر نفسه قبل توسيع الإنفاق الذي سيُهدر عليها لولا ذلك." },
      { step: "03", title: "الاستقطاب", desc: "بناء حملات أدائية عبر البحث والسوشيال ميديا، بميزانية موجهة للقنوات التي تحقق إيراداً فعلياً." },
      { step: "04", title: "تحسين محركات البحث", desc: "تعزيز ظهور صفحات التصنيفات والمنتجات لتقليل الاعتماد طويل الأمد على الاستقطاب المدفوع." },
      { step: "05", title: "الاحتفاظ بالعملاء", desc: "إضافة أتمتة دورة حياة العميل بحيث تقود عملية الشراء الأولى إلى الثانية بشكل موثوق." },
      { step: "06", title: "التحسين", desc: "مراجعة الأداء حسب القناة أسبوعياً مقارنةً بالإيراد لكل زائر، لا بإجمالي الزيارات المجمّع." },
    ],
    approachRu: [
      { step: "01", title: "Аудит", desc: "Анализируем всю воронку — трафик, конверсию, чекаут и удержание, — чтобы найти, где реально теряется выручка." },
      { step: "02", title: "Опыт покупки", desc: "Устраняем проблемы с конверсией внутри самого магазина, прежде чем масштабировать расходы, которые иначе были бы потрачены впустую." },
      { step: "03", title: "Привлечение", desc: "Строим performance-кампании в поиске и соцсетях с бюджетом, распределённым по каналам, которые реально приносят выручку." },
      { step: "04", title: "SEO", desc: "Усиливаем видимость страниц категорий и товаров, чтобы снизить долгосрочную зависимость от платного привлечения." },
      { step: "05", title: "Удержание", desc: "Добавляем автоматизацию жизненного цикла, чтобы первая покупка надёжно вела ко второй." },
      { step: "06", title: "Оптимизация", desc: "Еженедельно оцениваем эффективность по каналам через выручку на посетителя, а не через усреднённые показатели трафика." },
    ],
    faqs: [
      { q: "What's the difference between e-commerce marketing and general digital marketing?", a: "E-commerce marketing is measured against revenue per visitor and return on ad spend rather than leads, and it treats the store's conversion rate as part of the marketing system, not a separate concern." },
      { q: "How do you approach rising ad costs on Google and Meta?", a: "By shifting some of the growth burden onto conversion rate, retention and organic search, so the brand isn't entirely dependent on paid acquisition getting cheaper." },
      { q: "Can you help with both marketplace and direct-to-consumer channels?", a: "Yes — the two usually need different strategies, and we help brands balance marketplace reach with building a direct channel that isn't subject to marketplace fees and rules." },
      { q: "Do you work on the website itself, or only the marketing around it?", a: "Both — a campaign sending traffic to a slow or confusing storefront wastes spend, so store experience and website development sit inside the same engagement." },
    ],
    faqsAr: [
      { q: "ما الفرق بين تسويق التجارة الإلكترونية والتسويق الرقمي العام؟", a: "يُقاس تسويق التجارة الإلكترونية بالإيراد لكل زائر والعائد على الإنفاق الإعلاني بدلاً من العملاء المحتملين، ويتعامل مع معدل تحويل المتجر كجزء من النظام التسويقي، لا كمسألة منفصلة." },
      { q: "كيف تتعاملون مع ارتفاع تكاليف الإعلانات على جوجل وميتا؟", a: "من خلال نقل جزء من عبء النمو إلى معدل التحويل والاحتفاظ بالعملاء والبحث العضوي، بحيث لا تعتمد العلامة كلياً على انخفاض تكلفة الاستقطاب المدفوع." },
      { q: "هل يمكنكم المساعدة في قنوات الأسواق الإلكترونية والبيع المباشر للمستهلك معاً؟", a: "نعم — تحتاج القناتان عادةً إلى استراتيجيات مختلفة، ونساعد العلامات على الموازنة بين وصول الأسواق الإلكترونية وبناء قناة مباشرة غير خاضعة لرسوم وقواعد تلك الأسواق." },
      { q: "هل تعملون على الموقع نفسه، أم على التسويق المحيط به فقط؟", a: "كلاهما — فالحملة التي تقود الزيارات إلى متجر بطيء أو مربك تُهدر الإنفاق، لذا تندرج تجربة المتجر وتطوير الموقع ضمن التعاون نفسه." },
    ],
    faqsRu: [
      { q: "В чём разница между маркетингом для e-commerce и обычным digital-маркетингом?", a: "Маркетинг для e-commerce измеряется выручкой на посетителя и окупаемостью рекламы, а не лидами, и рассматривает конверсию магазина как часть маркетинговой системы, а не отдельный вопрос." },
      { q: "Как вы работаете с ростом стоимости рекламы в Google и Meta?", a: "Перераспределяя часть нагрузки по росту на конверсию, удержание и органический поиск, чтобы бренд не зависел полностью от удешевления платного привлечения." },
      { q: "Вы можете помочь и с маркетплейсами, и с прямыми продажами?", a: "Да — этим двум направлениям обычно нужны разные стратегии, и мы помогаем брендам сочетать охват маркетплейсов с развитием прямого канала, не зависящего от их комиссий и правил." },
      { q: "Вы работаете с самим сайтом или только с маркетингом вокруг него?", a: "И с тем, и с другим — кампания, направляющая трафик на медленную или запутанную витрину, тратит бюджет впустую, поэтому опыт покупки и разработка сайта входят в один проект." },
    ],
    ctaTitle: ["Let's turn traffic", "into repeat revenue."],
    ctaTitleAr: ["لنحوّل الزيارات", "إلى إيراد متكرر."],
    ctaTitleRu: ["Превратим трафик", "в повторную выручку."],
    ctaMessage: "Hi, I'm interested in digital marketing for e-commerce.",
    ctaMessageAr: "مرحباً، أنا مهتم بالتسويق الرقمي للتجارة الإلكترونية.",
    ctaMessageRu: "Здравствуйте, меня интересует digital-маркетинг для e-commerce.",
    metaDescription:
      "E-commerce marketing in Dubai — performance marketing, SEO, conversion-focused website development and retention automation for online retail brands.",
    metaDescriptionAr:
      "تسويق التجارة الإلكترونية في دبي — تسويق أدائي، تحسين لمحركات البحث، تطوير مواقع مركّز على التحويل وأتمتة للاحتفاظ بالعملاء لعلامات التجزئة الإلكترونية.",
    metaDescriptionRu:
      "Маркетинг для e-commerce в Дубае: performance-реклама, SEO, разработка конверсионных сайтов и автоматизация удержания для розничных онлайн-брендов.",
    seoTitle: "E-commerce & Retail Digital Marketing Agency — Dubai",
    seoTitleAr: "وكالة تسويق رقمي للتجارة الإلكترونية والتجزئة — دبي",
    seoTitleRu: "Агентство digital-маркетинга для e-commerce и ритейла — Дубай",
    relatedIndustrySlug: "fashion-luxury",
  },
  {
    slug: "fashion-luxury",
    num: "06",
    name: "Fashion & Luxury",
    nameAr: "الأزياء والفخامة",
    nameRu: "Мода и люкс",
    title: "Digital Marketing for Fashion Brands.",
    titleAr: "التسويق الرقمي لعلامات الأزياء.",
    titleRu: "Цифровой маркетинг для fashion-брендов.",
    heroImage: "/images/industries/fashion-luxury.jpg",
    descriptor:
      "Brand-led marketing for fashion and luxury labels, where perceived value has to survive the same feed as a fast-fashion discount code.",
    descriptorAr:
      "تسويق قائم على العلامة التجارية لدور الأزياء والفخامة، حيث يجب أن تصمد القيمة المُدركة في الواجهة نفسها التي يظهر فيها كود خصم لأزياء سريعة.",
    descriptorRu:
      "Маркетинг, ориентированный на бренд, для модных и люксовых марок, чья воспринимаемая ценность должна выживать в той же ленте, что и промокод масс-маркета.",
    subhead: "Marketing that protects the brand while it performs.",
    subheadAr: "تسويق يحمي العلامة التجارية بينما يحقق الأداء.",
    subheadRu: "Маркетинг, который приносит результат, не теряя ценности бренда.",
    lead:
      "A luxury brand can win the click and still lose the sale if the campaign around it looks like every other discount in the feed.",
    leadAr:
      "قد تكسب علامة فخامة النقرة وتخسر البيع مع ذلك، إذا بدت الحملة المحيطة بها كأي خصم آخر في الواجهة.",
    leadRu:
      "Люксовый бренд может выиграть клик и всё равно потерять продажу, если кампания вокруг него выглядит как ещё одна скидка в ленте.",
    intro: [
      "Fashion and luxury marketing carries a tension most categories don't: it has to perform on the same measurable channels as mass retail — search, paid social, retargeting — without adopting the price-led tone that undercuts perceived value. A 20%-off banner might lift short-term conversion and quietly damage the brand's positioning for the next full-price campaign. Getting the balance right means treating brand and performance as one strategy, not two competing budgets.",
      "The audience is also unusually visual and platform-literate — a label's Instagram grid, its editorial partnerships and its influencer presence do as much positioning work as any paid campaign, and increasingly convert directly through social commerce. A fashion brand's marketing system has to hold creative quality and commercial performance to the same standard at once.",
    ],
    introAr: [
      "يحمل تسويق الأزياء والفخامة توتراً لا تحمله معظم الفئات الأخرى: فهو مطالب بتحقيق أداء قابل للقياس على القنوات نفسها التي تستخدمها التجزئة الجماهيرية — البحث، الإعلانات الاجتماعية المدفوعة، إعادة الاستهداف — دون تبنّي نبرة قائمة على السعر تقوّض القيمة المُدركة. فبانر خصم بنسبة 20% قد يرفع التحويل على المدى القصير ويضرّ بصمت بتموضع العلامة في الحملة التالية بالسعر الكامل. تحقيق التوازن الصحيح يعني التعامل مع العلامة والأداء كاستراتيجية واحدة، لا ميزانيتين متنافستين.",
      "الجمهور هنا أيضاً بصري بشكل غير معتاد وملمّ بالمنصات — فشبكة صور العلامة على إنستغرام، وشراكاتها التحريرية، وحضورها مع المؤثرين، كلها تقوم بجهد تموضع يوازي أي حملة مدفوعة، وتتحول بشكل متزايد مباشرة عبر التجارة الاجتماعية. يجب أن يحافظ النظام التسويقي لعلامة الأزياء على جودة إبداعية وأداء تجاري بالمعيار نفسه في آن واحد.",
    ],
    introRu: [
      "Маркетинг моды и люкса несёт напряжение, незнакомое большинству других категорий: он обязан работать на тех же измеримых каналах, что и массовая розница — поиск, платный трафик в соцсетях, ретаргетинг — не перенимая при этом ценового тона, который подрывает воспринимаемую ценность бренда. Баннер со скидкой 20% может краткосрочно поднять конверсию и незаметно повредить позиционированию бренда перед следующей кампанией по полной цене. Найти верный баланс — значит рассматривать бренд и перформанс как единую стратегию, а не два конкурирующих бюджета.",
      "Аудитория здесь также необычно визуальна и хорошо ориентируется в платформах: лента бренда в Instagram, редакционные партнёрства и присутствие среди инфлюенсеров формируют позиционирование не хуже любой платной кампании — и всё чаще напрямую конвертируют через социальную коммерцию. Маркетинговая система fashion-бренда должна одновременно удерживать высокое качество креатива и коммерческую эффективность на одном уровне.",
    ],
    bodyLinks: [
      { text: "That means " },
      { text: "branding", href: "/services/branding" },
      { text: " and " },
      { text: "performance marketing", href: "/services/digital-marketing" },
      { text: " calibrated to protect margin, a " },
      { text: "storefront", href: "/services/website-development" },
      { text: " built to editorial standard, and " },
      { text: "SEO", href: "/services/seo" },
      { text: " that reduces reliance on paid discovery over time. It sits close to " },
      { text: "e-commerce and retail marketing", href: "/industries/ecommerce-retail" },
      { text: ", and " },
      { text: "get in touch", href: "/contact" },
      { text: " if you'd like to compare notes." },
    ],
    bodyLinksAr: [
      { text: "يعني ذلك " },
      { text: "العلامة التجارية", href: "/services/branding" },
      { text: " و" },
      { text: "التسويق الرقمي", href: "/services/digital-marketing" },
      { text: " المعايَرين لحماية الهامش، و" },
      { text: "متجراً إلكترونياً", href: "/services/website-development" },
      { text: " بمعايير تحريرية راقية، و" },
      { text: "تحسين محركات البحث", href: "/services/seo" },
      { text: " الذي يقلل الاعتماد على الاكتشاف المدفوع مع الوقت. يقترب هذا القطاع من " },
      { text: "التجارة الإلكترونية والتجزئة", href: "/industries/ecommerce-retail" },
      { text: "، و" },
      { text: "تواصلوا معنا", href: "/contact" },
      { text: " إن أردتم مقارنة الأفكار." },
    ],
    bodyLinksRu: [
      { text: "Это " },
      { text: "брендинг", href: "/services/branding" },
      { text: " и " },
      { text: "performance-маркетинг", href: "/services/digital-marketing" },
      { text: ", откалиброванные так, чтобы защищать маржу, " },
      { text: "витрина", href: "/services/website-development" },
      { text: " на редакционном уровне и " },
      { text: "SEO", href: "/services/seo" },
      { text: ", снижающее зависимость от платного обнаружения со временем. Эта отрасль близка к " },
      { text: "e-commerce и ритейлу", href: "/industries/ecommerce-retail" },
      { text: " — " },
      { text: "свяжитесь с нами", href: "/contact" },
      { text: ", если хотите сравнить подходы." },
    ],
    whoWeWorkWith: [
      "Fashion and apparel labels, local and international",
      "Luxury and premium lifestyle brands",
      "Jewellery and accessories houses",
      "Fashion e-commerce and multi-brand boutiques",
      "Emerging designers launching direct-to-consumer",
      "Luxury retail groups expanding into the UAE",
    ],
    whoWeWorkWithAr: [
      "دور أزياء وملابس محلية وعالمية",
      "علامات فخامة ونمط حياة راقٍ",
      "دور مجوهرات وإكسسوارات",
      "متاجر أزياء إلكترونية وبوتيكات متعددة العلامات",
      "مصممون ناشئون يطلقون بيعاً مباشراً للمستهلك",
      "مجموعات تجزئة فاخرة تتوسع في سوق الإمارات",
    ],
    whoWeWorkWithRu: [
      "Локальные и международные дома моды и одежды",
      "Люксовые и премиальные lifestyle-бренды",
      "Ювелирные дома и производители аксессуаров",
      "Fashion-e-commerce и мультибрендовые бутики",
      "Начинающие дизайнеры, выходящие на прямые продажи потребителю",
      "Люксовые ритейл-группы, выходящие на рынок ОАЭ",
    ],
    challenges: [
      { title: "Protecting perceived value", desc: "Performance tactics that work for mass retail — heavy discounting, aggressive retargeting — can quietly erode a luxury brand's pricing power." },
      { title: "Creative consistency across channels", desc: "A brand's visual standard has to hold from a paid social ad to a product page to an influencer collaboration, or the whole positioning weakens." },
      { title: "Social commerce and discovery", desc: "Fashion is increasingly discovered and purchased inside the platform itself, which changes how content, tagging and paid social need to work together." },
      { title: "Balancing brand campaigns with performance targets", desc: "A brand-building campaign and a performance campaign are often judged by different metrics — reconciling both under one strategy is where most fashion marketing breaks down." },
      { title: "Seasonal and drop-based demand", desc: "Collections, drops and seasonal calendars need media spend that peaks around them, not a flat always-on plan." },
    ],
    challengesAr: [
      { title: "حماية القيمة المُدركة", desc: "تكتيكات الأداء الفعالة للتجزئة الجماهيرية — الخصومات الكبيرة، إعادة الاستهداف العدوانية — قد تقوّض بصمت قدرة علامة الفخامة على التسعير." },
      { title: "اتساق إبداعي عبر القنوات", desc: "يجب أن يظل المعيار البصري للعلامة ثابتاً من الإعلان الاجتماعي المدفوع إلى صفحة المنتج إلى التعاون مع المؤثرين، وإلا ضعف التموضع بأكمله." },
      { title: "التجارة الاجتماعية والاكتشاف", desc: "يتم اكتشاف الأزياء وشراؤها بشكل متزايد داخل المنصة نفسها، ما يغيّر طريقة عمل المحتوى والوسم والإعلانات الاجتماعية المدفوعة معاً." },
      { title: "الموازنة بين حملات العلامة وأهداف الأداء", desc: "غالباً ما تُقيَّم حملة بناء العلامة وحملة الأداء بمقاييس مختلفة — والتوفيق بينهما ضمن استراتيجية واحدة هو ما يفشل فيه معظم تسويق الأزياء." },
      { title: "طلب موسمي ومرتبط بإطلاقات المنتجات", desc: "تحتاج المجموعات والإطلاقات والتقويم الموسمي إلى إنفاق إعلاني يتركز حولها، لا خطة ثابتة مستمرة." },
    ],
    challengesRu: [
      { title: "Защита воспринимаемой ценности", desc: "Тактики перформанс-маркетинга, работающие для масс-маркета — агрессивные скидки, навязчивый ретаргетинг — могут незаметно подорвать ценовую силу люксового бренда." },
      { title: "Единство креатива на всех каналах", desc: "Визуальный стандарт бренда должен сохраняться от рекламы в соцсетях до страницы товара и коллаборации с инфлюенсером — иначе слабеет всё позиционирование." },
      { title: "Социальная коммерция и обнаружение бренда", desc: "Моду всё чаще открывают и покупают прямо внутри платформы, а это меняет то, как должны работать вместе контент, теги и платная реклама в соцсетях." },
      { title: "Баланс между имиджевыми кампаниями и перформанс-целями", desc: "Имиджевую кампанию и перформанс-кампанию часто оценивают по разным метрикам — и именно на попытке свести их в одну стратегию чаще всего спотыкается маркетинг модных брендов." },
      { title: "Сезонный спрос и спрос на дропы", desc: "Коллекции, дропы и сезонный календарь требуют медиабюджета, который растёт пиками вокруг них, а не работает по плоской постоянной схеме." },
    ],
    services: [
      { slug: "branding", title: "Fashion & Luxury Branding", desc: "An identity and tone of voice that protects perceived value while staying flexible enough to run performance media." },
      { slug: "digital-marketing", title: "Performance Marketing for Fashion", desc: "Paid social and search campaigns built to convert without adopting a discount-led tone that undercuts the brand." },
      { slug: "website-development", title: "Fashion E-commerce Development", desc: "Storefronts and lookbooks built to editorial standard, fast enough to keep the conversion rate a performance campaign needs." },
      { slug: "seo", title: "Fashion SEO", desc: "Search visibility for collections, categories and brand terms that reduces reliance on paid discovery over time." },
      { slug: "crm-marketing-automation", title: "Client CRM & Retention", desc: "Automated sequences around drops, restocks and loyalty that turn a first purchase into a returning client relationship." },
    ],
    servicesAr: [
      { slug: "branding", title: "هوية الأزياء والفخامة", desc: "هوية ونبرة تحميان القيمة المُدركة مع بقائهما مرنتين بما يكفي لتشغيل إعلانات الأداء." },
      { slug: "digital-marketing", title: "التسويق الأدائي للأزياء", desc: "حملات إعلانات اجتماعية وبحث مدفوعة مبنية للتحويل دون تبنّي نبرة قائمة على الخصم تقوّض العلامة." },
      { slug: "website-development", title: "تطوير مواقع الأزياء الإلكترونية", desc: "متاجر إلكترونية وكتالوجات مصممة بمعيار تحريري، وسريعة بما يكفي للحفاظ على معدل التحويل الذي تحتاجه حملة الأداء." },
      { slug: "seo", title: "تحسين محركات البحث للأزياء", desc: "ظهور في البحث للمجموعات والتصنيفات ومصطلحات العلامة يقلل الاعتماد على الاكتشاف المدفوع مع الوقت." },
      { slug: "crm-marketing-automation", title: "إدارة علاقات العملاء والاحتفاظ بهم", desc: "سلاسل آلية حول الإطلاقات وإعادة التخزين والولاء تحوّل الشراء الأول إلى علاقة عميل متكررة." },
    ],
    servicesRu: [
      { slug: "branding", title: "Брендинг для моды и люкса", desc: "Идентичность и тон коммуникации, которые защищают воспринимаемую ценность бренда и при этом остаются достаточно гибкими для перформанс-рекламы." },
      { slug: "digital-marketing", title: "Перформанс-маркетинг для fashion-брендов", desc: "Кампании в платных соцсетях и поиске, построенные на конверсию без скидочного тона, который подрывает ценность бренда." },
      { slug: "website-development", title: "Разработка fashion-e-commerce", desc: "Витрины и лукбуки, выполненные на редакционном уровне и достаточно быстрые для конверсии, которую требует перформанс-кампания." },
      { slug: "seo", title: "SEO для fashion-брендов", desc: "Видимость в поиске по коллекциям, категориям и брендовым запросам, которая со временем снижает зависимость от платного трафика." },
      { slug: "crm-marketing-automation", title: "CRM и удержание клиентов", desc: "Автоматизированные цепочки вокруг дропов, пополнения ассортимента и программ лояльности, превращающие первую покупку в постоянные отношения с клиентом." },
    ],
    approach: [
      { step: "01", title: "Brand Definition", desc: "Establish the tone, visual standard and positioning that every channel has to hold to, before any media plan is built." },
      { step: "02", title: "Creative", desc: "Build a content and campaign system that reads as editorial, not promotional, across every platform it appears on." },
      { step: "03", title: "Social", desc: "Grow presence and social commerce across the platforms where fashion is actually discovered and purchased." },
      { step: "04", title: "Performance", desc: "Run paid campaigns calibrated to protect margin and perceived value, not just short-term conversion rate." },
      { step: "05", title: "Conversion", desc: "Ensure the storefront holds the brand's creative standard through to checkout." },
      { step: "06", title: "Retention", desc: "Build client loyalty and repeat purchase through CRM, not repeated discounting." },
    ],
    approachAr: [
      { step: "01", title: "تحديد العلامة", desc: "تحديد النبرة والمعيار البصري والتموضع الذي يجب أن تلتزم به كل قناة، قبل بناء أي خطة إعلانية." },
      { step: "02", title: "الإبداع", desc: "بناء نظام محتوى وحملات يبدو تحريرياً لا ترويجياً، عبر كل منصة يظهر عليها." },
      { step: "03", title: "السوشيال ميديا", desc: "تنمية الحضور والتجارة الاجتماعية عبر المنصات التي تُكتشف فيها الأزياء وتُشترى فعلياً." },
      { step: "04", title: "الأداء", desc: "إدارة حملات مدفوعة مضبوطة لحماية الهامش والقيمة المُدركة، لا معدل التحويل قصير الأمد فقط." },
      { step: "05", title: "التحويل", desc: "التأكد من أن المتجر الإلكتروني يحافظ على المعيار الإبداعي للعلامة حتى إتمام الدفع." },
      { step: "06", title: "الاحتفاظ بالعملاء", desc: "بناء ولاء العملاء والشراء المتكرر عبر إدارة علاقات العملاء، لا الخصومات المتكررة." },
    ],
    approachRu: [
      { step: "01", title: "Определение бренда", desc: "Формируем тон, визуальный стандарт и позиционирование, которым должен следовать каждый канал, прежде чем строить медиаплан." },
      { step: "02", title: "Креатив", desc: "Выстраиваем систему контента и кампаний, которая на любой площадке читается как редакционная, а не рекламная." },
      { step: "03", title: "Социальные сети", desc: "Развиваем присутствие и социальную коммерцию на площадках, где моду действительно находят и покупают." },
      { step: "04", title: "Перформанс", desc: "Запускаем платные кампании, настроенные на защиту маржи и воспринимаемой ценности, а не только на краткосрочную конверсию." },
      { step: "05", title: "Конверсия", desc: "Следим, чтобы витрина сохраняла креативный стандарт бренда вплоть до оформления заказа." },
      { step: "06", title: "Удержание", desc: "Формируем лояльность и повторные покупки через CRM, а не через повторяющиеся скидки." },
    ],
    faqs: [
      { q: "How is fashion marketing different from general e-commerce marketing?", a: "It carries a brand-value dimension general retail doesn't — performance tactics have to be calibrated so they don't undercut the pricing power the brand depends on." },
      { q: "Can performance marketing work for a luxury brand without discounting?", a: "Yes — targeting, creative and offer structure can be built around exclusivity and intent rather than price, which protects margin while still driving measurable conversion." },
      { q: "How important is social commerce for fashion brands right now?", a: "Increasingly central — a growing share of fashion discovery and purchase now happens inside the platform itself, which changes how content and tagging need to work." },
      { q: "Do you work with emerging designers, not just established labels?", a: "Yes — the strategy scales down to a single-collection launch as much as it scales up to a multi-market luxury group." },
    ],
    faqsAr: [
      { q: "كيف يختلف تسويق الأزياء عن تسويق التجارة الإلكترونية العام؟", a: "يحمل بُعد قيمة العلامة التجارية الذي لا تحمله التجزئة العامة — إذ يجب ضبط تكتيكات الأداء بحيث لا تقوّض قدرة العلامة على التسعير." },
      { q: "هل يمكن أن ينجح التسويق الأدائي لعلامة فخامة دون خصومات؟", a: "نعم — يمكن بناء الاستهداف والإبداع وبنية العروض حول الحصرية والنية بدلاً من السعر، ما يحمي الهامش مع تحقيق تحويل قابل للقياس." },
      { q: "ما مدى أهمية التجارة الاجتماعية لعلامات الأزياء حالياً؟", a: "أصبحت محورية بشكل متزايد — إذ تحدث حصة متنامية من اكتشاف الأزياء وشرائها داخل المنصة نفسها، ما يغيّر طريقة عمل المحتوى والوسم." },
      { q: "هل تعملون مع مصممين ناشئين، لا الدور الراسخة فقط؟", a: "نعم — تتكيف الاستراتيجية مع إطلاق مجموعة واحدة بقدر ما تتكيف مع مجموعة فخامة عاملة في أسواق متعددة." },
    ],
    faqsRu: [
      { q: "Чем маркетинг моды отличается от маркетинга e-commerce в целом?", a: "Он несёт измерение ценности бренда, которого нет у обычного ритейла — тактики перформанса нужно калибровать так, чтобы они не подрывали ценовую силу, на которую опирается бренд." },
      { q: "Может ли перформанс-маркетинг работать для люксового бренда без скидок?", a: "Да — таргетинг, креатив и структуру предложения можно строить вокруг эксклюзивности и намерения, а не цены, что защищает маржу и одновременно обеспечивает измеримую конверсию." },
      { q: "Насколько важна социальная коммерция для fashion-брендов сейчас?", a: "Всё более важна — растущая доля обнаружения и покупки модных товаров происходит прямо внутри платформы, что меняет требования к работе с контентом и тегами." },
      { q: "Работаете ли вы с начинающими дизайнерами, а не только с известными домами?", a: "Да — стратегия одинаково масштабируется и для запуска одной коллекции, и для люксовой группы, работающей на нескольких рынках." },
    ],
    ctaTitle: ["Let's grow the brand", "without discounting it."],
    ctaTitleAr: ["لننمّي العلامة", "دون التنازل عن قيمتها."],
    ctaTitleRu: ["Растим бренд", "не размывая его ценность."],
    ctaMessage: "Hi, I'm interested in digital marketing for fashion and luxury brands.",
    ctaMessageAr: "مرحباً، أنا مهتم بالتسويق الرقمي لعلامات الأزياء والفخامة.",
    ctaMessageRu: "Здравствуйте, меня интересует цифровой маркетинг для fashion- и люксовых брендов.",
    metaDescription:
      "Fashion and luxury brand marketing in Dubai — branding, performance marketing, SEO and e-commerce development that protects perceived value while it converts.",
    metaDescriptionAr:
      "تسويق علامات الأزياء والفخامة في دبي — هوية بصرية، تسويق أدائي، تحسين لمحركات البحث وتطوير مواقع إلكترونية تحمي القيمة المُدركة مع تحقيق التحويل.",
    metaDescriptionRu:
      "Маркетинг для fashion- и люксовых брендов в Дубае — брендинг, перформанс-маркетинг, SEO и разработка e-commerce, которые защищают ценность бренда и одновременно приносят конверсии.",
    seoTitle: "Fashion & Luxury Brand Marketing Agency — Dubai",
    seoTitleAr: "وكالة تسويق علامات الأزياء والفخامة — دبي",
    seoTitleRu: "Агентство маркетинга для fashion- и люкс-брендов — Дубай",
    relatedIndustrySlug: "ecommerce-retail",
  },
  {
    slug: "technology-saas",
    num: "07",
    name: "Technology & SaaS",
    nameAr: "التكنولوجيا والبرمجيات كخدمة",
    nameRu: "Технологии и SaaS",
    title: "Digital Marketing for SaaS.",
    titleAr: "التسويق الرقمي لشركات البرمجيات كخدمة.",
    titleRu: "Цифровой маркетинг для SaaS.",
    heroImage: "/images/industries/technology-saas.jpg",
    descriptor:
      "Pipeline-focused marketing for SaaS and technology companies, built around trial signups, demo requests and sales-qualified leads.",
    descriptorAr:
      "تسويق مركّز على خط المبيعات لشركات البرمجيات والتكنولوجيا، مبني حول التسجيل التجريبي وطلبات العروض التوضيحية والعملاء المحتملين المؤهلين للبيع.",
    descriptorRu:
      "Маркетинг для SaaS и технологических компаний, нацеленный на пайплайн: пробные регистрации, заявки на демо и квалифицированные для продажи лиды.",
    subhead: "Marketing judged on pipeline, not page views.",
    subheadAr: "تسويق يُقيَّم بخط المبيعات، لا بمشاهدات الصفحة.",
    subheadRu: "Маркетинг, который оценивают по пайплайну, а не по просмотрам страниц.",
    lead:
      "A SaaS company doesn't need more traffic — it needs more of the right person requesting a demo, and those are two very different marketing problems.",
    leadAr:
      "لا تحتاج شركة البرمجيات كخدمة إلى المزيد من الزيارات — بل إلى المزيد من الأشخاص المناسبين الذين يطلبون عرضاً توضيحياً، وهاتان مشكلتان تسويقيتان مختلفتان تماماً.",
    leadRu:
      "SaaS-компании не нужно больше трафика — ей нужно больше нужных людей, запрашивающих демо, а это две совершенно разные маркетинговые задачи.",
    intro: [
      "SaaS and technology marketing sits closer to sales than to brand awareness: the buyer is usually researching a category, not a company name, which means SEO and content built around the problem the software solves often outperforms paid alone. The sales cycle also involves more than one decision-maker, so a marketing system has to speak to the end user requesting the trial and the budget-holder approving it, often with different content entirely.",
      "Because the product itself is the best proof of value, growth loops — trial-to-paid conversion, in-product referral, case studies from real usage — do more long-term work than any single campaign. The marketing function's job becomes filling the top of that loop with qualified demand and getting out of the way once the product can prove itself.",
    ],
    introAr: [
      "يقترب تسويق البرمجيات والتكنولوجيا من المبيعات أكثر من اقترابه من الوعي بالعلامة التجارية: فالمشتري عادةً يبحث عن فئة حلول، لا عن اسم شركة، ما يعني أن تحسين محركات البحث والمحتوى المبني حول المشكلة التي يحلها البرنامج غالباً ما يتفوق على الإعلانات المدفوعة وحدها. كما تشمل دورة المبيعات أكثر من صانع قرار واحد، لذا يجب أن يخاطب النظام التسويقي المستخدم النهائي الذي يطلب التجربة وصاحب الميزانية الذي يوافق عليها، غالباً بمحتوى مختلف تماماً لكل منهما.",
      "ولأن المنتج نفسه هو أفضل دليل على القيمة، فإن حلقات النمو — تحويل التجربة إلى اشتراك مدفوع، الإحالة داخل المنتج، دراسات الحالة من الاستخدام الفعلي — تحقق أثراً طويل الأمد يفوق أي حملة منفردة. تصبح مهمة وظيفة التسويق هي تغذية أعلى تلك الحلقة بطلب مؤهل، ثم إفساح المجال بمجرد أن يثبت المنتج نفسه بنفسه.",
    ],
    introRu: [
      "Маркетинг SaaS и технологий стоит ближе к продажам, чем к узнаваемости бренда: покупатель обычно ищет решение категории проблемы, а не название конкретной компании, поэтому SEO и контент, построенные вокруг задачи, которую решает продукт, часто работают лучше одной только платной рекламы. Цикл продажи вовлекает не одного человека, принимающего решение, поэтому маркетинговая система должна говорить и с конечным пользователем, запрашивающим триал, и с держателем бюджета, который его утверждает, — зачастую совершенно разным контентом.",
      "Поскольку лучшее доказательство ценности — сам продукт, петли роста — конверсия триала в оплату, реферальные механики внутри продукта, кейсы на основе реального использования — дают больше долгосрочного эффекта, чем любая отдельная кампания. Задача маркетинга сводится к тому, чтобы наполнять начало этой петли квалифицированным спросом и затем не мешать продукту доказывать свою ценность самому.",
    ],
    bodyLinks: [
      { text: "That's usually " },
      { text: "performance marketing", href: "/services/digital-marketing" },
      { text: " and " },
      { text: "SaaS SEO", href: "/services/seo" },
      { text: " feeding conversion-focused " },
      { text: "landing pages", href: "/services/website-development" },
      { text: ", with " },
      { text: "go-to-market strategy", href: "/services/marketing-consulting" },
      { text: " behind a launch or a new segment. It overlaps with " },
      { text: "professional services marketing", href: "/industries/professional-services" },
      { text: " more than most B2B categories, and " },
      { text: "get in touch", href: "/contact" },
      { text: " to talk through where you are." },
    ],
    bodyLinksAr: [
      { text: "عادة ما يعني ذلك " },
      { text: "التسويق الرقمي", href: "/services/digital-marketing" },
      { text: " و" },
      { text: "تحسين محركات البحث", href: "/services/seo" },
      { text: " لتغذية " },
      { text: "صفحات هبوط", href: "/services/website-development" },
      { text: " مصممة للتحويل، إلى جانب " },
      { text: "الاستشارات التسويقية", href: "/services/marketing-consulting" },
      { text: " خلف إطلاق منتج أو دخول شريحة جديدة. يتقاطع هذا القطاع مع " },
      { text: "الخدمات المهنية", href: "/industries/professional-services" },
      { text: " أكثر من معظم فئات B2B الأخرى، و" },
      { text: "تواصلوا معنا", href: "/contact" },
      { text: " لمناقشة أين أنتم الآن." },
    ],
    bodyLinksRu: [
      { text: "Обычно это " },
      { text: "performance-маркетинг", href: "/services/digital-marketing" },
      { text: " и " },
      { text: "SEO для SaaS", href: "/services/seo" },
      { text: ", которые ведут на " },
      { text: "посадочные страницы", href: "/services/website-development" },
      { text: ", настроенные на конверсию, вместе со " },
      { text: "стратегией выхода на рынок", href: "/services/marketing-consulting" },
      { text: " для запуска или нового сегмента. Эта отрасль пересекается с " },
      { text: "профессиональными услугами", href: "/industries/professional-services" },
      { text: " больше, чем большинство других B2B-категорий — " },
      { text: "свяжитесь с нами", href: "/contact" },
      { text: ", чтобы обсудить, на каком вы этапе." },
    ],
    whoWeWorkWith: [
      "B2B SaaS platforms and software companies",
      "Enterprise technology and IT solution providers",
      "Startups building toward product-market fit",
      "Technology platforms serving vertical industries",
      "API and developer-tool companies",
      "Regional offices of international SaaS brands entering the UAE",
    ],
    whoWeWorkWithAr: [
      "منصات برمجيات كخدمة وشركات برمجيات لقطاع الأعمال",
      "مزودو حلول تقنية وتكنولوجيا للمؤسسات",
      "شركات ناشئة تسعى لتحقيق التوافق بين المنتج والسوق",
      "منصات تقنية تخدم قطاعات عمودية محددة",
      "شركات واجهات برمجة التطبيقات وأدوات المطورين",
      "مكاتب إقليمية لعلامات برمجيات عالمية تدخل سوق الإمارات",
    ],
    whoWeWorkWithRu: [
      "B2B SaaS-платформы и разработчики программного обеспечения",
      "Поставщики корпоративных технологий и IT-решений",
      "Стартапы на пути к product-market fit",
      "Технологические платформы для отдельных отраслей",
      "API и разработчики инструментов для программистов",
      "Региональные офисы международных SaaS-брендов, выходящих на рынок ОАЭ",
    ],
    challenges: [
      { title: "Multi-stakeholder buying decisions", desc: "The person who signs up for a trial often isn't the person who approves the budget — messaging has to work for both." },
      { title: "Category education vs. brand awareness", desc: "Many buyers are searching for a solution to a problem before they know your company exists — content has to meet them at that stage." },
      { title: "Trial-to-paid conversion", desc: "A signup isn't a customer — the marketing and onboarding handoff around activation is where most SaaS revenue is actually won or lost." },
      { title: "Long, considered sales cycles", desc: "Enterprise deals can run months — nurture sequences and retargeting have to sustain interest that long without becoming noise." },
      { title: "Proving marketing's contribution to pipeline", desc: "SaaS leadership tracks marketing against sales-qualified leads and revenue influenced, not vanity traffic metrics." },
    ],
    challengesAr: [
      { title: "قرارات شراء متعددة أصحاب المصلحة", desc: "غالباً ما يكون الشخص الذي يسجّل للتجربة مختلفاً عن الشخص الذي يوافق على الميزانية — ويجب أن تخاطب الرسالة كليهما." },
      { title: "التوعية بالفئة مقابل الوعي بالعلامة", desc: "يبحث كثير من المشترين عن حل لمشكلة قبل أن يعرفوا بوجود شركتك — ويجب أن يقابلهم المحتوى في تلك المرحلة." },
      { title: "تحويل التجربة إلى اشتراك مدفوع", desc: "التسجيل ليس عميلاً بعد — فنقطة التسليم بين التسويق والتأهيل حول التفعيل هي حيث يُكسب أو يُفقد معظم إيراد شركات البرمجيات كخدمة فعلياً." },
      { title: "دورات مبيعات طويلة ومدروسة", desc: "قد تستغرق صفقات المؤسسات أشهراً — ويجب أن تحافظ سلاسل الرعاية وإعادة الاستهداف على الاهتمام طوال تلك المدة دون أن تتحول إلى إزعاج." },
      { title: "إثبات مساهمة التسويق في خط المبيعات", desc: "تتابع قيادة شركات البرمجيات كخدمة أداء التسويق بناءً على العملاء المحتملين المؤهلين للبيع والإيراد المتأثر، لا مقاييس الزيارات الشكلية." },
    ],
    challengesRu: [
      { title: "Решение о покупке принимают несколько человек", desc: "Тот, кто регистрирует триал, часто не тот, кто утверждает бюджет — сообщение должно работать для обоих." },
      { title: "Обучение категории против узнаваемости бренда", desc: "Многие покупатели ищут решение проблемы ещё до того, как узнали о существовании вашей компании — контент должен встречать их именно на этом этапе." },
      { title: "Конверсия триала в оплату", desc: "Регистрация — ещё не клиент: именно на стыке маркетинга и онбординга вокруг активации по факту выигрывается или теряется большая часть выручки SaaS." },
      { title: "Долгие, взвешенные циклы продаж", desc: "Корпоративные сделки могут тянуться месяцами — цепочки нёрчеринга и ретаргетинга должны поддерживать интерес всё это время, не превращаясь в шум." },
      { title: "Доказать вклад маркетинга в пайплайн", desc: "Руководство SaaS-компаний оценивает маркетинг по квалифицированным для продажи лидам и влиянию на выручку, а не по показным метрикам трафика." },
    ],
    services: [
      { slug: "digital-marketing", title: "Performance Marketing for SaaS", desc: "Search and paid social campaigns built around demo requests and trial signups, tracked through to sales-qualified pipeline." },
      { slug: "seo", title: "SaaS SEO", desc: "Category and problem-focused content that captures buyers before they've searched for a specific product by name." },
      { slug: "website-development", title: "SaaS Website & Landing Pages", desc: "Fast, conversion-focused product and pricing pages built to move a visitor from interest to trial signup." },
      { slug: "crm-marketing-automation", title: "Lead Scoring & Nurture Automation", desc: "CRM sequences that qualify and nurture leads through a long sales cycle without burying sales in unqualified volume." },
      { slug: "marketing-consulting", title: "Go-to-Market Strategy", desc: "Positioning and channel strategy for a launch, a new market entry, or a pivot in target segment." },
    ],
    servicesAr: [
      { slug: "digital-marketing", title: "التسويق الأدائي لشركات البرمجيات كخدمة", desc: "حملات بحث وسوشيال ميديا مدفوعة مبنية حول طلبات العروض التوضيحية والتسجيلات التجريبية، تُتابع حتى خط المبيعات المؤهل." },
      { slug: "seo", title: "تحسين محركات البحث للبرمجيات كخدمة", desc: "محتوى مركّز على الفئة والمشكلة يلتقط المشترين قبل أن يبحثوا عن منتج محدد باسمه." },
      { slug: "website-development", title: "مواقع وصفحات هبوط للبرمجيات كخدمة", desc: "صفحات منتج وتسعير سريعة ومركّزة على التحويل، مصممة لنقل الزائر من الاهتمام إلى التسجيل التجريبي." },
      { slug: "crm-marketing-automation", title: "تصنيف العملاء المحتملين وأتمتة الرعاية", desc: "سلاسل إدارة علاقات عملاء تؤهل وترعى العملاء المحتملين طوال دورة مبيعات طويلة دون إغراق فريق المبيعات بحجم غير مؤهل." },
      { slug: "marketing-consulting", title: "استراتيجية الدخول إلى السوق", desc: "استراتيجية تموضع وقنوات لإطلاق منتج، أو دخول سوق جديد، أو تحول في الشريحة المستهدفة." },
    ],
    servicesRu: [
      { slug: "digital-marketing", title: "Перформанс-маркетинг для SaaS", desc: "Кампании в поиске и платных соцсетях, построенные вокруг заявок на демо и регистраций триала, с отслеживанием до квалифицированного пайплайна." },
      { slug: "seo", title: "SEO для SaaS", desc: "Контент, сфокусированный на категории и проблеме, который захватывает покупателей ещё до того, как они начали искать конкретный продукт по названию." },
      { slug: "website-development", title: "Сайт и лендинги для SaaS", desc: "Быстрые, ориентированные на конверсию страницы продукта и тарифов, которые ведут посетителя от интереса к регистрации триала." },
      { slug: "crm-marketing-automation", title: "Скоринг лидов и автоматизация нёрчеринга", desc: "CRM-цепочки, которые квалифицируют и подогревают лиды на протяжении долгого цикла продажи, не заваливая отдел продаж неквалифицированным объёмом." },
      { slug: "marketing-consulting", title: "Go-to-market стратегия", desc: "Позиционирование и стратегия каналов для запуска, выхода на новый рынок или смены целевого сегмента." },
    ],
    approach: [
      { step: "01", title: "Positioning", desc: "Define the problem the product solves in the language the buyer actually searches and thinks in, not internal product terminology." },
      { step: "02", title: "Content & SEO", desc: "Build category-education content that captures demand before a buyer knows the product by name." },
      { step: "03", title: "Demand Generation", desc: "Run performance campaigns focused on trial and demo requests, not top-of-funnel traffic alone." },
      { step: "04", title: "Lead Qualification", desc: "Score and route leads through CRM automation so sales spends time on pipeline that's actually ready." },
      { step: "05", title: "Nurture", desc: "Sustain multi-stakeholder, long-cycle deals with content and retargeting built for the buying committee, not one persona." },
      { step: "06", title: "Optimise", desc: "Review performance against sales-qualified leads and pipeline influenced, not raw lead volume." },
    ],
    approachAr: [
      { step: "01", title: "التموضع", desc: "تحديد المشكلة التي يحلها المنتج باللغة التي يبحث ويفكر بها المشتري فعلياً، لا بالمصطلحات الداخلية للمنتج." },
      { step: "02", title: "المحتوى وتحسين محركات البحث", desc: "بناء محتوى توعوي بالفئة يلتقط الطلب قبل أن يعرف المشتري المنتج باسمه." },
      { step: "03", title: "توليد الطلب", desc: "إدارة حملات أدائية مركّزة على طلبات التجربة والعروض التوضيحية، لا زيارات أعلى مسار التحويل فقط." },
      { step: "04", title: "تأهيل العملاء المحتملين", desc: "تصنيف العملاء المحتملين وتوجيههم عبر أتمتة إدارة علاقات العملاء بحيث يقضي فريق المبيعات وقته في خط مبيعات جاهز فعلياً." },
      { step: "05", title: "الرعاية", desc: "الحفاظ على الصفقات الطويلة متعددة الأطراف بمحتوى وإعادة استهداف مصممين للجنة الشراء بأكملها، لا لشخصية واحدة." },
      { step: "06", title: "التحسين", desc: "مراجعة الأداء مقارنةً بالعملاء المحتملين المؤهلين للبيع وخط المبيعات المتأثر، لا حجم العملاء المحتملين الخام." },
    ],
    approachRu: [
      { step: "01", title: "Позиционирование", desc: "Формулируем проблему, которую решает продукт, языком, которым покупатель реально пользуется и мыслит, а не внутренней терминологией продукта." },
      { step: "02", title: "Контент и SEO", desc: "Создаём контент для обучения категории, который захватывает спрос ещё до того, как покупатель узнал продукт по имени." },
      { step: "03", title: "Генерация спроса", desc: "Запускаем перформанс-кампании, сфокусированные на заявках на триал и демо, а не только на трафике верха воронки." },
      { step: "04", title: "Квалификация лидов", desc: "Оцениваем и распределяем лиды через CRM-автоматизацию, чтобы отдел продаж тратил время только на действительно готовый пайплайн." },
      { step: "05", title: "Нёрчеринг", desc: "Поддерживаем долгие сделки с несколькими участниками контентом и ретаргетингом, рассчитанными на весь закупочный комитет, а не на одну персону." },
      { step: "06", title: "Оптимизация", desc: "Оцениваем результат по квалифицированным для продажи лидам и влиянию на пайплайн, а не по сырому объёму лидов." },
    ],
    faqs: [
      { q: "How is SaaS marketing different from marketing for other B2B companies?", a: "It's more product-led — trial signups, activation and in-product growth loops carry as much weight as traditional lead generation, and the funnel has to be measured accordingly." },
      { q: "What's the fastest way to generate demo requests for a new SaaS product?", a: "Usually a combination of targeted performance campaigns and problem-focused content, paired with a landing page built specifically to convert a cold visitor into a trial signup." },
      { q: "Can you help with lead scoring and CRM, not just advertising?", a: "Yes — for SaaS, unscored leads flooding a sales team is often the bigger problem, so we build scoring and nurture logic into the CRM alongside acquisition campaigns." },
      { q: "Do you work with early-stage startups or only established SaaS companies?", a: "Both — the strategy adapts to stage, from establishing early product-market fit signals to scaling demand generation for an established platform." },
    ],
    faqsAr: [
      { q: "كيف يختلف تسويق البرمجيات كخدمة عن التسويق لشركات B2B الأخرى؟", a: "إنه أكثر اعتماداً على المنتج نفسه — إذ تحمل التسجيلات التجريبية والتفعيل وحلقات النمو داخل المنتج وزناً يوازي توليد العملاء المحتملين التقليدي، ويجب قياس مسار التحويل وفقاً لذلك." },
      { q: "ما أسرع طريقة لتوليد طلبات عروض توضيحية لمنتج برمجيات جديد؟", a: "عادةً مزيج من حملات أدائية مستهدفة ومحتوى مركّز على المشكلة، مقترناً بصفحة هبوط مصممة خصيصاً لتحويل زائر جديد إلى تسجيل تجريبي." },
      { q: "هل يمكنكم المساعدة في تصنيف العملاء المحتملين وإدارة علاقات العملاء، لا الإعلانات فقط؟", a: "نعم — بالنسبة لشركات البرمجيات كخدمة، غالباً ما تكون المشكلة الأكبر هي إغراق فريق المبيعات بعملاء محتملين غير مصنّفين، لذا نبني منطق التصنيف والرعاية داخل نظام إدارة علاقات العملاء إلى جانب حملات الاستقطاب." },
      { q: "هل تعملون مع شركات ناشئة في مراحلها الأولى أم مع شركات برمجيات راسخة فقط؟", a: "كلاهما — تتكيف الاستراتيجية مع المرحلة، من ترسيخ إشارات مبكرة للتوافق بين المنتج والسوق إلى توسيع توليد الطلب لمنصة راسخة." },
    ],
    faqsRu: [
      { q: "Чем маркетинг SaaS отличается от маркетинга для других B2B-компаний?", a: "Он больше опирается на сам продукт — регистрации триала, активация и петли роста внутри продукта весят не меньше традиционной генерации лидов, и воронку нужно измерять соответственно." },
      { q: "Как быстрее всего получить заявки на демо для нового SaaS-продукта?", a: "Обычно это сочетание таргетированных перформанс-кампаний и контента, сфокусированного на проблеме, вместе с посадочной страницей, специально созданной для конверсии холодного посетителя в регистрацию триала." },
      { q: "Вы помогаете со скорингом лидов и CRM, а не только с рекламой?", a: "Да — для SaaS поток неоценённых лидов, заваливающий отдел продаж, часто оказывается более серьёзной проблемой, поэтому мы встраиваем логику скоринга и нёрчеринга в CRM наряду с кампаниями по привлечению." },
      { q: "Вы работаете со стартапами на ранней стадии или только с устоявшимися SaaS-компаниями?", a: "И с теми, и с другими — стратегия адаптируется к стадии: от закрепления первых сигналов product-market fit до масштабирования генерации спроса для устоявшейся платформы." },
    ],
    ctaTitle: ["Let's turn demand", "into qualified pipeline."],
    ctaTitleAr: ["لنحوّل الطلب", "إلى خط مبيعات مؤهل."],
    ctaTitleRu: ["Превратим спрос", "в квалифицированный пайплайн."],
    ctaMessage: "Hi, I'm interested in digital marketing for SaaS and technology companies.",
    ctaMessageAr: "مرحباً، أنا مهتم بالتسويق الرقمي لشركات البرمجيات والتكنولوجيا.",
    ctaMessageRu: "Здравствуйте, меня интересует цифровой маркетинг для SaaS- и технологических компаний.",
    metaDescription:
      "SaaS and technology marketing in Dubai — performance marketing, SEO, CRM automation and go-to-market strategy built around demo requests and pipeline.",
    metaDescriptionAr:
      "تسويق البرمجيات والتكنولوجيا في دبي — تسويق أدائي، تحسين لمحركات البحث، أتمتة CRM واستراتيجية دخول السوق مبنية حول طلبات العروض التوضيحية وخط المبيعات.",
    metaDescriptionRu:
      "Маркетинг SaaS и технологических компаний в Дубае — перформанс-маркетинг, SEO, автоматизация CRM и go-to-market стратегия, построенные вокруг заявок на демо и пайплайна.",
    seoTitle: "SaaS & Technology Marketing Agency — Dubai",
    seoTitleAr: "وكالة تسويق للبرمجيات والتكنولوجيا — دبي",
    seoTitleRu: "Агентство маркетинга для SaaS и технологических компаний — Дубай",
    relatedIndustrySlug: "professional-services",
  },
  {
    slug: "restaurants-fb",
    num: "08",
    name: "Restaurants & F&B",
    nameAr: "المطاعم والأغذية والمشروبات",
    nameRu: "Рестораны и F&B",
    title: "Digital Marketing for Restaurants.",
    titleAr: "التسويق الرقمي للمطاعم.",
    titleRu: "Цифровой маркетинг для ресторанов.",
    heroImage: "/images/industries/restaurants-fb.jpg",
    descriptor:
      "Marketing for restaurants and F&B brands built around covers, footfall and repeat visits, not just likes.",
    descriptorAr:
      "تسويق لعلامات المطاعم والأغذية والمشروبات مبني حول عدد الزبائن، الإقبال الفعلي، والزيارات المتكررة، لا الإعجابات فقط.",
    descriptorRu:
      "Маркетинг для ресторанов и F&B-брендов, построенный вокруг числа гостей, посещаемости и повторных визитов, а не лайков.",
    subhead: "Marketing measured in covers, not comments.",
    subheadAr: "تسويق يُقاس بعدد الزبائن، لا بالتعليقات.",
    subheadRu: "Маркетинг, который измеряют числом гостей, а не комментариями.",
    lead:
      "A great dish photographs well for free — the marketing problem is turning that scroll into a booked table.",
    leadAr:
      "الطبق الرائع يُصوَّر بشكل جذاب مجاناً — أما التحدي التسويقي الحقيقي فهو تحويل تلك المشاهدة العابرة إلى طاولة محجوزة.",
    leadRu:
      "Красивое блюдо и само по себе хорошо фотографируется — задача маркетинга в том, чтобы превратить этот просмотр в забронированный столик.",
    intro: [
      "F&B marketing lives entirely in the moment of decision: someone is hungry, near your area, deciding in the next few minutes where to eat. That means local search visibility, an accurate Google Business Profile and a booking flow that works from a phone in one hand matter more than almost any other channel. A beautiful feed with no reservation link or an out-of-date menu is losing covers it already earned the attention for.",
      "The category also runs on a delivery-and-dine-in split that most concepts underplan for: aggregator platforms bring volume at a commission cost, direct ordering and reservations protect margin, and the two need coordinated, not competing, marketing. Add a launch calendar of new menus, seasonal offers and events, and F&B marketing becomes less about one campaign and more about a steady operating rhythm.",
    ],
    introAr: [
      "يعيش تسويق قطاع الأغذية والمشروبات بالكامل في لحظة القرار: شخص جائع، قريب من منطقتك، يقرر خلال الدقائق القليلة القادمة أين سيأكل. هذا يعني أن الظهور في البحث المحلي، وملف جوجل التجاري الدقيق، ومسار حجز يعمل بسلاسة من هاتف بيد واحدة، أمور تفوق أهمية أي قناة أخرى تقريباً. الحساب الجميل على وسائل التواصل الاجتماعي دون رابط حجز أو بقائمة طعام قديمة يخسر زبائن استحقهم بالفعل من خلال جذب انتباههم.",
      "يعمل القطاع أيضاً على توازن بين التوصيل وتناول الطعام داخل المطعم، وهو توازن تُخطط له معظم المفاهيم بشكل غير كافٍ: منصات التوصيل الوسيطة تجلب حجماً من الطلبات مقابل عمولة، بينما الطلب المباشر والحجوزات تحمي هامش الربح، والاثنان يحتاجان إلى تسويق منسّق لا متنافس. أضف إلى ذلك تقويم إطلاقات لقوائم جديدة وعروض موسمية وفعاليات، ليصبح تسويق قطاع الأغذية والمشروبات أقرب إلى إيقاع تشغيلي ثابت منه إلى حملة واحدة.",
    ],
    introRu: [
      "Маркетинг F&B полностью живёт в моменте принятия решения: человек голоден, находится рядом с вами и в ближайшие несколько минут решает, где поесть. Это значит, что видимость в локальном поиске, точный профиль Google Business и путь бронирования, который работает с телефона в одной руке, важнее почти любого другого канала. Красивая лента без ссылки на бронирование или с устаревшим меню теряет гостей, чьё внимание она уже завоевала.",
      "Категория также живёт на балансе между доставкой и залом, который большинство концепций планируют недостаточно продуманно: платформы-агрегаторы приносят объём заказов ценой комиссии, а прямые заказы и бронирования защищают маржу — и то, и другое нуждается в согласованном, а не конкурирующем маркетинге. Добавьте к этому календарь запусков новых меню, сезонных предложений и мероприятий — и маркетинг F&B перестаёт быть отдельной кампанией, превращаясь в устойчивый операционный ритм.",
    ],
    bodyLinks: [
      { text: "In practice that's local " },
      { text: "performance marketing", href: "/services/digital-marketing" },
      { text: " and " },
      { text: "restaurant SEO", href: "/services/seo" },
      { text: " paired with " },
      { text: "concept branding", href: "/services/branding" },
      { text: " and a " },
      { text: "website", href: "/services/website-development" },
      { text: " built for direct reservations, not just a menu PDF. It shares real ground with " },
      { text: "hospitality marketing", href: "/industries/hospitality" },
      { text: ", and " },
      { text: "get in touch", href: "/contact" },
      { text: " if you'd like to see how it applies to your concept." },
    ],
    bodyLinksAr: [
      { text: "عملياً، يعني ذلك " },
      { text: "التسويق الرقمي", href: "/services/digital-marketing" },
      { text: " المحلي و" },
      { text: "تحسين محركات البحث", href: "/services/seo" },
      { text: " إلى جانب " },
      { text: "علامة تجارية للمفهوم", href: "/services/branding" },
      { text: " و" },
      { text: "موقع إلكتروني", href: "/services/website-development" },
      { text: " مصمم للحجوزات المباشرة، لا مجرد قائمة طعام بصيغة PDF. يشترك هذا القطاع في أرضية حقيقية مع " },
      { text: "الضيافة", href: "/industries/hospitality" },
      { text: "، و" },
      { text: "تواصلوا معنا", href: "/contact" },
      { text: " إن أردتم معرفة كيف ينطبق ذلك على مفهومكم." },
    ],
    bodyLinksRu: [
      { text: "На практике это локальный " },
      { text: "performance-маркетинг", href: "/services/digital-marketing" },
      { text: " и " },
      { text: "SEO для ресторанов", href: "/services/seo" },
      { text: " вместе с " },
      { text: "брендингом концепции", href: "/services/branding" },
      { text: " и " },
      { text: "сайтом", href: "/services/website-development" },
      { text: ", созданным для прямых бронирований, а не просто PDF-меню. Эта отрасль во многом пересекается с " },
      { text: "гостиничным бизнесом", href: "/industries/hospitality" },
      { text: " — " },
      { text: "свяжитесь с нами", href: "/contact" },
      { text: ", если хотите узнать, как это применимо к вашей концепции." },
    ],
    whoWeWorkWith: [
      "Independent restaurants and cafés",
      "Multi-outlet restaurant groups",
      "Cloud kitchens and delivery-first F&B brands",
      "Bars, lounges and nightlife-led F&B concepts",
      "Franchise and franchisor F&B brands",
      "Event-led and pop-up food concepts",
    ],
    whoWeWorkWithAr: [
      "مطاعم ومقاهٍ مستقلة",
      "مجموعات مطاعم متعددة الفروع",
      "مطابخ سحابية وعلامات أغذية ومشروبات قائمة على التوصيل",
      "حانات وصالات ومفاهيم أغذية ومشروبات مرتبطة بالحياة الليلية",
      "علامات أغذية ومشروبات تعمل بنظام الامتياز التجاري ومانحوه",
      "مفاهيم طعام مرتبطة بالفعاليات والمتاجر المؤقتة",
    ],
    whoWeWorkWithRu: [
      "Независимые рестораны и кафе",
      "Сети ресторанов с несколькими точками",
      "Тёмные кухни и F&B-бренды, ориентированные на доставку",
      "Бары, лаунджи и F&B-концепции ночной жизни",
      "Франчайзинговые F&B-бренды и франчайзеры",
      "Концепции с фокусом на мероприятия и pop-up формат",
    ],
    challenges: [
      { title: "Winning the 'near me, right now' search", desc: "Local pack visibility and an accurate Google Business Profile decide who gets the booking when someone is deciding in the moment." },
      { title: "Delivery aggregator dependency", desc: "Platform commission eats margin fast — protecting direct ordering and reservations is a marketing job, not just an ops one." },
      { title: "Content that drives bookings, not just likes", desc: "A high-performing food photo means little if it doesn't lead to a reservation link or a clear call to visit." },
      { title: "Seasonal and event-driven demand", desc: "New menus, Ramadan, festive seasons and events all need their own campaign timing, not a flat always-on plan." },
      { title: "Review management at scale", desc: "A single bad review can outweigh a hundred good ones in the local pack — response speed and volume both matter." },
    ],
    challengesAr: [
      { title: "الفوز بعمليات بحث \"بالقرب مني الآن\"", desc: "الظهور في نتائج البحث المحلي وملف جوجل التجاري الدقيق هما ما يحدد من يحصل على الحجز حين يتخذ شخص ما قراره في اللحظة نفسها." },
      { title: "الاعتماد المفرط على منصات التوصيل الوسيطة", desc: "عمولات هذه المنصات تلتهم هامش الربح بسرعة — وحماية الطلب المباشر والحجوزات مهمة تسويقية لا تشغيلية فقط." },
      { title: "محتوى يقود إلى الحجوزات لا مجرد الإعجابات", desc: "صورة طعام تحقق تفاعلاً عالياً لا تعني الكثير إن لم تقُد إلى رابط حجز أو دعوة واضحة للزيارة." },
      { title: "طلب موسمي ومرتبط بالفعاليات", desc: "القوائم الجديدة، رمضان، المواسم الاحتفالية والفعاليات، كل منها يحتاج توقيت حملة خاص به، لا خطة ثابتة تعمل طوال الوقت." },
      { title: "إدارة التقييمات على نطاق واسع", desc: "تقييم سلبي واحد قد يفوق أثره مئة تقييم إيجابي في نتائج البحث المحلي — سرعة الرد وحجمه كلاهما مهم." },
    ],
    challengesRu: [
      { title: "Победа в поиске «рядом со мной, сейчас»", desc: "Видимость в локальной выдаче и точный профиль Google Business решают, кто получит бронь, когда человек принимает решение в моменте." },
      { title: "Зависимость от агрегаторов доставки", desc: "Комиссия платформ быстро съедает маржу — защита прямых заказов и бронирований это задача маркетинга, а не только операций." },
      { title: "Контент, который приводит к бронированиям, а не только к лайкам", desc: "Даже эффектное фото блюда мало что значит, если оно не ведёт к ссылке на бронирование или чёткому призыву прийти." },
      { title: "Сезонный и событийный спрос", desc: "Новые меню, Рамадан, праздничные сезоны и мероприятия — каждому нужен собственный график кампаний, а не плоский постоянный план." },
      { title: "Управление отзывами в масштабе", desc: "Один плохой отзыв может перевесить сотню хороших в локальной выдаче — важны и скорость, и объём ответов." },
    ],
    services: [
      { slug: "digital-marketing", title: "Performance Marketing for F&B", desc: "Local and social campaigns timed to launches, seasons and events, measured against covers and direct orders." },
      { slug: "seo", title: "Restaurant SEO", desc: "Local search and Google Business Profile optimisation built to win the 'near me' moment against every nearby competitor." },
      { slug: "branding", title: "Restaurant & F&B Branding", desc: "A concept identity — from menu design to social tone — that carries across the physical space and every digital touchpoint." },
      { slug: "website-development", title: "Restaurant Websites & Ordering", desc: "Fast, mobile-first sites with reservation and direct-order flows built to reduce aggregator dependency." },
      { slug: "crm-marketing-automation", title: "Guest CRM & Loyalty", desc: "Automated re-engagement and loyalty sequences that turn a first visit into a regular one." },
    ],
    servicesAr: [
      { slug: "digital-marketing", title: "التسويق الأدائي لقطاع الأغذية والمشروبات", desc: "حملات محلية واجتماعية مُوقّتة مع الإطلاقات والمواسم والفعاليات، تُقاس بعدد الزبائن والطلبات المباشرة." },
      { slug: "seo", title: "تحسين محركات البحث للمطاعم", desc: "تحسين البحث المحلي وملف جوجل التجاري مصمم للفوز بلحظة \"بالقرب مني\" أمام كل منافس قريب." },
      { slug: "branding", title: "هوية العلامة التجارية للمطاعم والأغذية والمشروبات", desc: "هوية مفهوم متكاملة — من تصميم القائمة إلى أسلوب الحضور على وسائل التواصل الاجتماعي — تمتد عبر المساحة الفعلية وكل نقطة تواصل رقمية." },
      { slug: "website-development", title: "مواقع المطاعم وأنظمة الطلب", desc: "مواقع سريعة مصممة أولاً للهاتف المحمول بمسارات حجز وطلب مباشر تقلل الاعتماد على منصات التوصيل الوسيطة." },
      { slug: "crm-marketing-automation", title: "إدارة علاقات الضيوف وبرامج الولاء", desc: "سلاسل آلية لإعادة التفاعل والولاء تحوّل الزيارة الأولى إلى عادة متكررة." },
    ],
    servicesRu: [
      { slug: "digital-marketing", title: "Перформанс-маркетинг для F&B", desc: "Локальные и социальные кампании, приуроченные к запускам, сезонам и мероприятиям, с оценкой по числу гостей и прямым заказам." },
      { slug: "seo", title: "SEO для ресторанов", desc: "Оптимизация локального поиска и профиля Google Business, построенная на победу в моменте «рядом со мной» над каждым соседним конкурентом." },
      { slug: "branding", title: "Брендинг ресторанов и F&B", desc: "Идентичность концепции — от дизайна меню до тона в соцсетях — которая единообразна и в физическом пространстве, и в каждой цифровой точке контакта." },
      { slug: "website-development", title: "Сайты и заказы для ресторанов", desc: "Быстрые mobile-first сайты с бронированием и прямым заказом, снижающие зависимость от агрегаторов." },
      { slug: "crm-marketing-automation", title: "CRM гостей и программы лояльности", desc: "Автоматизированные цепочки повторного вовлечения и лояльности, превращающие первый визит в привычку возвращаться." },
    ],
    approach: [
      { step: "01", title: "Concept & Brand", desc: "Sharpen the concept's identity so it reads clearly across the space, the menu and every digital channel." },
      { step: "02", title: "Local Search", desc: "Build out Google Business Profile and local SEO so the concept wins the 'near me' moment." },
      { step: "03", title: "Social & Content", desc: "Produce content built to move a scroll into a booking, not just an impression." },
      { step: "04", title: "Performance", desc: "Time paid campaigns around launches, seasons and events rather than running a flat monthly budget." },
      { step: "05", title: "Direct Channels", desc: "Strengthen direct reservations and ordering to reduce aggregator commission dependency." },
      { step: "06", title: "Loyalty", desc: "Turn first-time guests into regulars with CRM-driven re-engagement." },
    ],
    approachAr: [
      { step: "01", title: "المفهوم والعلامة التجارية", desc: "شحذ هوية المفهوم لتكون واضحة عبر المساحة والقائمة وكل قناة رقمية." },
      { step: "02", title: "البحث المحلي", desc: "بناء ملف جوجل التجاري وتحسين محركات البحث المحلي بحيث يفوز المفهوم بلحظة \"بالقرب مني\"." },
      { step: "03", title: "وسائل التواصل والمحتوى", desc: "إنتاج محتوى مصمم لتحويل المشاهدة العابرة إلى حجز، لا مجرد ظهور." },
      { step: "04", title: "الأداء", desc: "توقيت الحملات المدفوعة مع الإطلاقات والمواسم والفعاليات بدلاً من ميزانية شهرية ثابتة." },
      { step: "05", title: "القنوات المباشرة", desc: "تعزيز الحجوزات والطلبات المباشرة لتقليل الاعتماد على عمولات منصات التوصيل." },
      { step: "06", title: "الولاء", desc: "تحويل الضيوف الجدد إلى زبائن دائمين عبر إعادة تفاعل مدفوعة بنظام إدارة علاقات العملاء." },
    ],
    approachRu: [
      { step: "01", title: "Концепция и бренд", desc: "Обостряем идентичность концепции, чтобы она читалась одинаково ясно в пространстве, меню и каждом цифровом канале." },
      { step: "02", title: "Локальный поиск", desc: "Выстраиваем профиль Google Business и локальное SEO так, чтобы концепция выигрывала момент «рядом со мной»." },
      { step: "03", title: "Соцсети и контент", desc: "Создаём контент, рассчитанный на то, чтобы превратить просмотр в бронирование, а не просто в показ." },
      { step: "04", title: "Перформанс", desc: "Приурочиваем платные кампании к запускам, сезонам и мероприятиям вместо плоского месячного бюджета." },
      { step: "05", title: "Прямые каналы", desc: "Укрепляем прямые бронирования и заказы, снижая зависимость от комиссии агрегаторов." },
      { step: "06", title: "Лояльность", desc: "Превращаем гостей, пришедших впервые, в постоянных через повторное вовлечение на основе CRM." },
    ],
    faqs: [
      { q: "How important is Google Business Profile for a restaurant?", a: "It's usually the single most important listing a restaurant has — hours, menu, photos and reviews there directly decide whether someone nearby chooses to visit." },
      { q: "Can marketing help reduce our dependency on delivery aggregators?", a: "Yes — strengthening direct ordering channels, SEO and CRM-driven repeat business reduces how much volume needs to come through commission-charging platforms." },
      { q: "Do you work with multi-outlet restaurant groups?", a: "Yes — each outlet needs its own accurate local listing and tracked performance, coordinated under one brand and one overall strategy." },
      { q: "How do you approach social media for restaurants specifically?", a: "Content is built to move a viewer toward an action — a booking, a visit, an order — rather than optimising purely for engagement metrics." },
    ],
    faqsAr: [
      { q: "ما مدى أهمية ملف جوجل التجاري بالنسبة للمطعم؟", a: "عادةً ما يكون أهم إدراج يمتلكه المطعم — فساعات العمل والقائمة والصور والتقييمات فيه تحدد مباشرة ما إذا كان شخص قريب سيختار الزيارة." },
      { q: "هل يمكن للتسويق أن يساعد في تقليل اعتمادنا على منصات التوصيل الوسيطة؟", a: "نعم — تعزيز قنوات الطلب المباشر، وتحسين محركات البحث، والعمل المتكرر المدفوع بنظام إدارة علاقات العملاء، كلها تقلل حجم الطلبات التي يجب أن تمر عبر منصات تفرض عمولة." },
      { q: "هل تعملون مع مجموعات مطاعم متعددة الفروع؟", a: "نعم — كل فرع يحتاج إلى إدراج محلي دقيق خاص به وأداء يُتابع بدقة، منسّق تحت علامة تجارية واحدة واستراتيجية شاملة واحدة." },
      { q: "كيف تتعاملون مع وسائل التواصل الاجتماعي للمطاعم تحديداً؟", a: "نبني المحتوى ليدفع المشاهد نحو إجراء فعلي — حجز، زيارة، طلب — بدلاً من التحسين لمقاييس التفاعل وحدها." },
    ],
    faqsRu: [
      { q: "Насколько важен профиль Google Business для ресторана?", a: "Обычно это самый важный элемент присутствия ресторана в сети — часы работы, меню, фото и отзывы в нём напрямую определяют, зайдёт ли к вам человек поблизости." },
      { q: "Может ли маркетинг снизить нашу зависимость от агрегаторов доставки?", a: "Да — укрепление каналов прямого заказа, SEO и повторных обращений на основе CRM снижает долю объёма, который должен проходить через платформы с комиссией." },
      { q: "Работаете ли вы с сетями ресторанов с несколькими точками?", a: "Да — каждой точке нужен собственный точный локальный листинг и отслеживаемые показатели, скоординированные под одним брендом и единой стратегией." },
      { q: "Как вы подходите к соцсетям именно для ресторанов?", a: "Мы строим контент так, чтобы он подталкивал зрителя к действию — бронированию, визиту, заказу, а не оптимировали его только под метрики вовлечённости." },
    ],
    ctaTitle: ["Let's fill more tables,", "more consistently."],
    ctaTitleAr: ["لنملأ المزيد من الطاولات،", "وبثبات أكبر."],
    ctaTitleRu: ["Наполним больше столиков", "и сделаем это стабильной практикой."],
    ctaMessage: "Hi, I'm interested in digital marketing for restaurants and F&B.",
    ctaMessageAr: "مرحباً، أنا مهتم بالتسويق الرقمي للمطاعم والأغذية والمشروبات.",
    ctaMessageRu: "Здравствуйте, меня интересует цифровой маркетинг для ресторанов и F&B.",
    metaDescription:
      "Restaurant and F&B marketing in Dubai — local SEO, performance marketing, branding and CRM built to grow covers, direct orders and repeat visits.",
    metaDescriptionAr:
      "تسويق المطاعم والأغذية والمشروبات في دبي — تحسين محركات بحث محلي، تسويق أدائي، هوية علامة تجارية وإدارة علاقات عملاء لزيادة الزبائن والطلبات المباشرة والزيارات المتكررة.",
    metaDescriptionRu:
      "Маркетинг ресторанов и F&B в Дубае — локальное SEO, перформанс-маркетинг, брендинг и CRM для роста числа гостей, прямых заказов и повторных визитов.",
    seoTitle: "Restaurant & F&B Marketing Agency — Dubai",
    seoTitleAr: "وكالة تسويق للمطاعم والأغذية والمشروبات — دبي",
    seoTitleRu: "Агентство маркетинга для ресторанов и F&B — Дубай",
    relatedIndustrySlug: "hospitality",
  },
  {
    slug: "professional-services",
    num: "09",
    name: "Professional Services",
    nameAr: "الخدمات المهنية",
    nameRu: "Профессиональные услуги",
    title: "Digital Marketing for Professional Services.",
    titleAr: "التسويق الرقمي للخدمات المهنية.",
    titleRu: "Цифровой маркетинг для профессиональных услуг.",
    heroImage: "/images/industries/professional-services.jpg",
    descriptor:
      "Authority-led B2B marketing for firms selling expertise, where the enquiry is the outcome of trust built long before contact.",
    descriptorAr:
      "تسويق B2B قائم على المرجعية والخبرة للشركات التي تبيع الخبرة، حيث يكون الاستفسار نتيجة ثقة بُنيت قبل التواصل بوقت طويل.",
    descriptorRu:
      "B2B-маркетинг, построенный на экспертном авторитете, — для компаний, которые продают знания, где обращение клиента становится результатом доверия, выстроенного задолго до первого контакта.",
    subhead: "Marketing built around expertise, not impressions.",
    subheadAr: "تسويق مبني حول الخبرة، لا مرات الظهور.",
    subheadRu: "Маркетинг, построенный на экспертизе, а не на показах.",
    lead:
      "Nobody hires a firm on the first click — professional services marketing is the work of staying credible until someone is ready to reach out.",
    leadAr:
      "لا أحد يوظّف شركة عند أول نقرة — تسويق الخدمات المهنية هو العمل على البقاء موثوقاً حتى يكون العميل المحتمل مستعداً للتواصل.",
    leadRu:
      "Компанию не нанимают по первому клику — маркетинг профессиональных услуг это работа по поддержанию доверия до момента, когда клиент готов обратиться сам.",
    intro: [
      "Professional services — legal, financial, consulting, advisory — sell judgment and expertise, which means the marketing has to demonstrate competence before it asks for a conversation. A polished ad with no substance behind it does the opposite of its job in this category; a prospective client is evaluating whether this firm actually understands their specific situation, and thin content reads as a warning sign rather than a hook.",
      "The buying decision is also usually considered and referral-influenced, so a firm's LinkedIn presence, published thinking and Google search visibility for its specialisms work together over months, not days, to build the credibility a lead eventually converts on. B2B lead generation here rewards patience and specificity — a broad 'we do everything' positioning converts worse than a narrow, clearly demonstrated specialism.",
    ],
    introAr: [
      "تبيع الخدمات المهنية — القانونية والمالية والاستشارية والاستشارات الإدارية — الحكمة والخبرة، ما يعني أن التسويق يجب أن يُثبت الكفاءة قبل أن يطلب محادثة. الإعلان اللامع دون مضمون حقيقي وراءه يحقق عكس الغرض منه في هذا القطاع تماماً؛ فالعميل المحتمل يقيّم ما إذا كانت هذه الشركة تفهم فعلاً وضعه الخاص، والمحتوى السطحي يُقرأ كإشارة تحذير لا كعامل جذب.",
      "كما أن قرار الشراء غالباً ما يكون متأنياً ومتأثراً بالإحالات، لذا فإن حضور الشركة على لينكدإن، والمحتوى الفكري المنشور، والظهور في نتائج بحث جوجل لتخصصاتها، تعمل معاً على مدى أشهر لا أيام لبناء المصداقية التي يتحول عندها العميل المحتمل فعلياً. توليد العملاء المحتملين لقطاع B2B هنا يكافئ الصبر والتحديد الدقيق — فالتموضع الواسع القائم على \"نحن نقدّم كل شيء\" يحقق تحويلاً أضعف من تخصص محدد وواضح.",
    ],
    introRu: [
      "Профессиональные услуги — юридические, финансовые, консалтинговые, консультационные — продают суждение и экспертизу, а значит, маркетинг обязан доказать компетентность прежде, чем просить о разговоре. Отполированная реклама без реального содержания за ней делает в этой категории обратное тому, что должна: потенциальный клиент оценивает, действительно ли компания понимает именно его ситуацию, и поверхностный контент читается как тревожный сигнал, а не как приманка.",
      "Решение о покупке здесь также обычно взвешенное и во многом опирается на рекомендации, поэтому присутствие компании в LinkedIn, публикуемая экспертная мысль и видимость в поиске Google по её специализациям работают вместе месяцами, а не днями, выстраивая доверие, на котором в итоге и конвертируется лид. Генерация B2B-лидов здесь вознаграждает терпение и конкретность — широкое позиционирование в духе «мы делаем всё» конвертирует хуже узкой, ясно продемонстрированной специализации.",
    ],
    bodyLinks: [
      { text: "That usually starts with " },
      { text: "SEO", href: "/services/seo" },
      { text: " and " },
      { text: "branding", href: "/services/branding" },
      { text: " built around a genuine specialism, backed by targeted " },
      { text: "B2B lead generation", href: "/services/digital-marketing" },
      { text: " and " },
      { text: "positioning strategy", href: "/services/marketing-consulting" },
      { text: " where the message needs sharpening. It overlaps closely with " },
      { text: "SaaS and technology marketing", href: "/industries/technology-saas" },
      { text: ", and " },
      { text: "get in touch", href: "/contact" },
      { text: " if you'd like a second opinion." },
    ],
    bodyLinksAr: [
      { text: "يبدأ ذلك عادة بـ" },
      { text: "تحسين محركات البحث", href: "/services/seo" },
      { text: " و" },
      { text: "العلامة التجارية", href: "/services/branding" },
      { text: " المبنيَّين حول تخصص حقيقي، مدعومَين بـ" },
      { text: "توليد عملاء محتملين لقطاع B2B", href: "/services/digital-marketing" },
      { text: " و" },
      { text: "استشارات تسويقية", href: "/services/marketing-consulting" },
      { text: " حيث تحتاج الرسالة إلى مزيد من الوضوح. يتقاطع هذا القطاع بشكل وثيق مع " },
      { text: "التكنولوجيا والبرمجيات كخدمة", href: "/industries/technology-saas" },
      { text: "، و" },
      { text: "تواصلوا معنا", href: "/contact" },
      { text: " إن أردتم رأياً ثانياً." },
    ],
    bodyLinksRu: [
      { text: "Обычно это начинается с " },
      { text: "SEO", href: "/services/seo" },
      { text: " и " },
      { text: "брендинга", href: "/services/branding" },
      { text: ", построенных вокруг реальной специализации, вместе с целевой " },
      { text: "B2B-лидогенерацией", href: "/services/digital-marketing" },
      { text: " и " },
      { text: "консалтингом по позиционированию", href: "/services/marketing-consulting" },
      { text: " там, где сообщение нужно заострить. Эта отрасль тесно пересекается с " },
      { text: "технологиями и SaaS", href: "/industries/technology-saas" },
      { text: " — " },
      { text: "свяжитесь с нами", href: "/contact" },
      { text: ", если хотите получить второе мнение." },
    ],
    whoWeWorkWith: [
      "Law firms and legal advisory practices",
      "Accounting, audit and financial advisory firms",
      "Management and strategy consultancies",
      "Corporate services and business setup firms",
      "Recruitment and HR advisory firms",
      "Architecture, engineering and specialist consultancies",
    ],
    whoWeWorkWithAr: [
      "مكاتب المحاماة وممارسات الاستشارات القانونية",
      "شركات المحاسبة والتدقيق والاستشارات المالية",
      "شركات الاستشارات الإدارية والاستراتيجية",
      "شركات الخدمات المؤسسية وتأسيس الأعمال",
      "شركات التوظيف والاستشارات في الموارد البشرية",
      "شركات الهندسة المعمارية والاستشارات الهندسية والمتخصصة",
    ],
    whoWeWorkWithRu: [
      "Юридические фирмы и практики правового консультирования",
      "Бухгалтерские, аудиторские и финансово-консультационные фирмы",
      "Управленческие и стратегические консалтинговые компании",
      "Корпоративные сервисы и фирмы по регистрации бизнеса",
      "Рекрутинговые и HR-консультационные фирмы",
      "Архитектурные, инженерные и узкоспециализированные консалтинговые компании",
    ],
    challenges: [
      { title: "Demonstrating expertise, not just claiming it", desc: "A generic services page doesn't convince a sophisticated buyer — content has to show genuine command of the subject." },
      { title: "Long, trust-dependent sales cycles", desc: "A prospective client often researches for weeks or months before ever making contact, which puts the weight on sustained visibility, not a single campaign." },
      { title: "Referral-driven growth that's hard to scale", desc: "Word of mouth is powerful but unpredictable — digital visibility gives referral-quality growth a repeatable channel." },
      { title: "Narrow positioning against a broad offering", desc: "Firms that try to market everything they do usually convert worse than firms that lead with a clear specialism." },
      { title: "B2B lead quality over volume", desc: "A form full of unqualified enquiries wastes senior time — targeting and content need to filter for genuine fit." },
    ],
    challengesAr: [
      { title: "إثبات الخبرة لا مجرد الادعاء بها", desc: "صفحة خدمات عامة لا تقنع مشترياً واعياً — يجب أن يُظهر المحتوى إلماماً حقيقياً بالموضوع." },
      { title: "دورات مبيعات طويلة تعتمد على الثقة", desc: "غالباً ما يبحث العميل المحتمل لأسابيع أو أشهر قبل التواصل، ما يضع الثقل على الحضور المستمر لا على حملة واحدة." },
      { title: "نمو قائم على الإحالات يصعب توسيعه", desc: "الكلمة المتناقلة قوية لكنها غير منتظمة — الحضور الرقمي يمنح نمواً بجودة الإحالات قناة يمكن تكرارها." },
      { title: "تموضع محدد مقابل عرض واسع", desc: "الشركات التي تحاول تسويق كل ما تقدمه تحقق عادةً تحويلاً أضعف من الشركات التي تتصدّر بتخصص واضح." },
      { title: "جودة عملاء B2B المحتملين لا عددهم", desc: "نموذج مليء باستفسارات غير مؤهلة يهدر وقت الإدارة العليا — يجب أن يُصمَّم الاستهداف والمحتوى لتصفية الملاءمة الحقيقية." },
    ],
    challengesRu: [
      { title: "Продемонстрировать экспертизу, а не просто заявить о ней", desc: "Обобщённая страница услуг не убеждает искушённого покупателя — контент должен показывать реальное владение темой." },
      { title: "Долгие циклы продаж, зависящие от доверия", desc: "Потенциальный клиент часто изучает вопрос неделями или месяцами до первого контакта, а значит, вес приходится не на одну кампанию, а на устойчивую видимость." },
      { title: "Рост за счёт рекомендаций, который трудно масштабировать", desc: "Сарафанное радио мощно, но непредсказуемо — цифровая видимость даёт росту качества рекомендаций повторяемый канал." },
      { title: "Узкое позиционирование против широкого предложения", desc: "Компании, пытающиеся продвигать всё, чем занимаются, обычно конвертируют хуже тех, кто выходит на рынок с чёткой специализацией." },
      { title: "Качество B2B-лидов важнее их объёма", desc: "Форма, забитая неквалифицированными обращениями, тратит время старших сотрудников — таргетинг и контент должны отсеивать реальное соответствие." },
    ],
    services: [
      { slug: "seo", title: "Professional Services SEO", desc: "Search visibility built around specific specialisms and the questions a sophisticated buyer actually searches." },
      { slug: "branding", title: "Professional Services Branding", desc: "A positioning and identity system that reads as credible and specific, not generic corporate polish." },
      { slug: "digital-marketing", title: "B2B Lead Generation", desc: "Search and LinkedIn campaigns targeted at genuine buying intent, filtered for fit before they reach a form." },
      { slug: "website-development", title: "Professional Services Websites", desc: "Websites built to demonstrate expertise clearly and convert a considered visitor into an enquiry." },
      { slug: "marketing-consulting", title: "Positioning & Go-to-Market Strategy", desc: "A clear specialism and message strategy for firms competing on judgment, not price." },
    ],
    servicesAr: [
      { slug: "seo", title: "تحسين محركات البحث للخدمات المهنية", desc: "ظهور في نتائج البحث مبني حول تخصصات محددة والأسئلة التي يبحث عنها فعلياً المشتري الواعي." },
      { slug: "branding", title: "هوية العلامة التجارية للخدمات المهنية", desc: "نظام تموضع وهوية بصرية يُقرأ كموثوق ومحدد، لا كلمعان مؤسسي عام." },
      { slug: "digital-marketing", title: "توليد العملاء المحتملين لقطاع B2B", desc: "حملات بحث ولينكدإن تستهدف نية شراء حقيقية، مُصفّاة للملاءمة قبل وصولها إلى النموذج." },
      { slug: "website-development", title: "مواقع الخدمات المهنية", desc: "مواقع مصممة لإظهار الخبرة بوضوح وتحويل الزائر المتأني إلى استفسار فعلي." },
      { slug: "marketing-consulting", title: "استراتيجية التموضع والدخول إلى السوق", desc: "تخصص واضح واستراتيجية رسائل للشركات التي تتنافس بالخبرة والحكمة، لا بالسعر." },
    ],
    servicesRu: [
      { slug: "seo", title: "SEO для профессиональных услуг", desc: "Видимость в поиске, построенная вокруг конкретных специализаций и вопросов, которые реально ищет искушённый покупатель." },
      { slug: "branding", title: "Брендинг профессиональных услуг", desc: "Система позиционирования и идентичности, которая читается как достоверная и конкретная, а не как обобщённый корпоративный лоск." },
      { slug: "digital-marketing", title: "Генерация B2B-лидов", desc: "Кампании в поиске и LinkedIn, нацеленные на реальное намерение купить и отфильтрованные по соответствию ещё до попадания в форму." },
      { slug: "website-development", title: "Сайты для профессиональных услуг", desc: "Сайты, созданные для ясной демонстрации экспертизы и конверсии вдумчивого посетителя в обращение." },
      { slug: "marketing-consulting", title: "Позиционирование и go-to-market стратегия", desc: "Чёткая специализация и стратегия сообщений для компаний, конкурирующих экспертизой, а не ценой." },
    ],
    approach: [
      { step: "01", title: "Positioning", desc: "Define the firm's clearest, most credible specialism — the thing it should be known for, not everything it can do." },
      { step: "02", title: "Content & Authority", desc: "Build published thinking that demonstrates real command of the subject, not generic service copy." },
      { step: "03", title: "Search Visibility", desc: "Strengthen SEO around the specific questions and specialisms a sophisticated buyer searches." },
      { step: "04", title: "Lead Generation", desc: "Run targeted B2B campaigns filtered for genuine fit rather than broad reach." },
      { step: "05", title: "Nurture", desc: "Sustain visibility and credibility over the long research window most professional services decisions take." },
      { step: "06", title: "Optimise", desc: "Review lead quality and conversion against actual client fit, not raw enquiry volume." },
    ],
    approachAr: [
      { step: "01", title: "التموضع", desc: "تحديد أوضح وأكثر تخصصات الشركة مصداقية — الشيء الذي يجب أن تُعرف به، لا كل ما تستطيع تقديمه." },
      { step: "02", title: "المحتوى والمرجعية", desc: "بناء محتوى فكري منشور يُظهر إلماماً حقيقياً بالموضوع، لا نصوص خدمات عامة." },
      { step: "03", title: "الظهور في نتائج البحث", desc: "تعزيز تحسين محركات البحث حول الأسئلة والتخصصات المحددة التي يبحث عنها المشتري الواعي." },
      { step: "04", title: "توليد العملاء المحتملين", desc: "تشغيل حملات B2B مستهدفة ومصفّاة للملاءمة الحقيقية بدلاً من الوصول الواسع." },
      { step: "05", title: "الرعاية", desc: "الحفاظ على الحضور والمصداقية طوال فترة البحث الطويلة التي تستغرقها معظم قرارات الخدمات المهنية." },
      { step: "06", title: "التحسين", desc: "مراجعة جودة العملاء المحتملين والتحويل مقارنةً بالملاءمة الفعلية للعميل، لا بعدد الاستفسارات الخام." },
    ],
    approachRu: [
      { step: "01", title: "Позиционирование", desc: "Определяем самую ясную и достоверную специализацию компании — то, чем она должна быть известна, а не всё, что она умеет." },
      { step: "02", title: "Контент и авторитет", desc: "Создаём публикуемую экспертную мысль, которая демонстрирует реальное владение темой, а не обобщённые тексты об услугах." },
      { step: "03", title: "Видимость в поиске", desc: "Укрепляем SEO вокруг конкретных вопросов и специализаций, которые ищет искушённый покупатель." },
      { step: "04", title: "Генерация лидов", desc: "Запускаем таргетированные B2B-кампании, отфильтрованные по реальному соответствию, а не по широкому охвату." },
      { step: "05", title: "Нёрчеринг", desc: "Поддерживаем видимость и доверие на протяжении долгого периода изучения, который занимает большинство решений в сфере профессиональных услуг." },
      { step: "06", title: "Оптимизация", desc: "Оцениваем качество лидов и конверсию по реальному соответствию клиента, а не по сырому объёму обращений." },
    ],
    faqs: [
      { q: "How is professional services marketing different from general B2B marketing?", a: "It leans more heavily on demonstrated expertise and credibility than most B2B categories — the content itself has to prove competence, not just describe a service." },
      { q: "Why does narrow positioning convert better than a broad service list?", a: "A specific, clearly demonstrated specialism gives a sophisticated buyer a reason to believe this firm is the right fit, where a generic 'we do everything' message rarely does." },
      { q: "Can digital marketing replace referral-based growth for a firm?", a: "It complements it — digital visibility gives referral-quality growth a repeatable channel, rather than leaving new business entirely dependent on existing relationships." },
      { q: "How do you generate qualified B2B leads without wasting senior time on unqualified enquiries?", a: "By targeting genuine buying intent and using content and forms that filter for fit before an enquiry ever reaches the team." },
    ],
    faqsAr: [
      { q: "كيف يختلف تسويق الخدمات المهنية عن تسويق B2B العام؟", a: "يعتمد بشكل أكبر على إثبات الخبرة والمصداقية مقارنة بمعظم قطاعات B2B — إذ يجب أن يُثبت المحتوى نفسه الكفاءة، لا أن يكتفي بوصف الخدمة." },
      { q: "لماذا يحقق التموضع المحدد تحويلاً أفضل من قائمة خدمات واسعة؟", a: "التخصص المحدد والواضح يمنح المشتري الواعي سبباً للاعتقاد بأن هذه الشركة هي الخيار المناسب، بينما نادراً ما تفعل ذلك رسالة عامة تقول \"نحن نقدّم كل شيء\"." },
      { q: "هل يمكن للتسويق الرقمي أن يحل محل النمو القائم على الإحالات لشركة ما؟", a: "إنه يكمّله — فالحضور الرقمي يمنح نمواً بجودة الإحالات قناة يمكن تكرارها، بدلاً من ترك الأعمال الجديدة معتمدة كلياً على العلاقات القائمة." },
      { q: "كيف تولّدون عملاء B2B محتملين مؤهلين دون إهدار وقت الإدارة العليا على استفسارات غير مؤهلة؟", a: "من خلال استهداف نية الشراء الحقيقية، واستخدام محتوى ونماذج تصفّي الملاءمة قبل وصول أي استفسار إلى الفريق." },
    ],
    faqsRu: [
      { q: "Чем маркетинг профессиональных услуг отличается от общего B2B-маркетинга?", a: "Он гораздо сильнее опирается на продемонстрированную экспертизу и доверие, чем большинство B2B-категорий — сам контент должен доказывать компетентность, а не просто описывать услугу." },
      { q: "Почему узкое позиционирование конвертирует лучше широкого списка услуг?", a: "Конкретная, ясно продемонстрированная специализация даёт искушённому покупателю основание поверить, что именно эта компания подходит, — обобщённое сообщение «мы делаем всё» почти никогда этого не даёт." },
      { q: "Может ли цифровой маркетинг заменить рост за счёт рекомендаций?", a: "Он его дополняет — цифровая видимость даёт росту качества рекомендаций повторяемый канал, вместо того чтобы новый бизнес полностью зависел от существующих связей." },
      { q: "Как вы генерируете качественные B2B-лиды, не тратя время старших сотрудников на неквалифицированные обращения?", a: "Через таргетинг на реальное намерение купить и использование контента и форм, которые отсеивают соответствие ещё до того, как обращение попадёт к команде." },
    ],
    ctaTitle: ["Let's build the authority", "your next client searches for."],
    ctaTitleAr: ["لنبني المرجعية", "التي يبحث عنها عميلك القادم."],
    ctaTitleRu: ["Построим авторитет,", "который ищет ваш следующий клиент."],
    ctaMessage: "Hi, I'm interested in digital marketing for professional services.",
    ctaMessageAr: "مرحباً، أنا مهتم بالتسويق الرقمي للخدمات المهنية.",
    ctaMessageRu: "Здравствуйте, меня интересует цифровой маркетинг для профессиональных услуг.",
    metaDescription:
      "Professional services marketing in Dubai — SEO, branding, B2B lead generation and positioning strategy for law, finance, consulting and advisory firms.",
    metaDescriptionAr:
      "تسويق الخدمات المهنية في دبي — تحسين محركات البحث، هوية العلامة التجارية، توليد عملاء B2B واستراتيجية التموضع لشركات القانون والمالية والاستشارات.",
    metaDescriptionRu:
      "Маркетинг профессиональных услуг в Дубае — SEO, брендинг, генерация B2B-лидов и стратегия позиционирования для юридических, финансовых и консалтинговых компаний.",
    seoTitle: "Professional Services & B2B Marketing Agency — Dubai",
    seoTitleAr: "وكالة تسويق الخدمات المهنية وB2B — دبي",
    seoTitleRu: "Агентство маркетинга для профессиональных услуг и B2B — Дубай",
    relatedIndustrySlug: "technology-saas",
  },
  {
    slug: "education",
    num: "10",
    name: "Education",
    nameAr: "التعليم",
    nameRu: "Образование",
    title: "Digital Marketing for Education.",
    titleAr: "التسويق الرقمي للتعليم.",
    titleRu: "Цифровой маркетинг для образования.",
    heroImage: "/images/industries/education.jpg",
    descriptor:
      "Enrolment-focused marketing for schools, universities and training providers, built around the decision journey parents and students actually take.",
    descriptorAr:
      "تسويق مركّز على التسجيل للمدارس والجامعات ومقدمي التدريب، مبني حول رحلة القرار الفعلية التي يخوضها أولياء الأمور والطلاب.",
    descriptorRu:
      "Маркетинг, ориентированный на набор учащихся, — для школ, университетов и учебных центров, построенный вокруг реального пути принятия решения, который проходят родители и студенты.",
    subhead: "Marketing built around the enrolment journey, not the academic calendar.",
    subheadAr: "تسويق مبني حول رحلة التسجيل، لا التقويم الأكاديمي.",
    subheadRu: "Маркетинг, построенный вокруг пути к зачислению, а не вокруг учебного календаря.",
    lead:
      "A parent doesn't choose a school on a single open day — they choose it over months of comparison, and most of that comparison happens before anyone calls the admissions office.",
    leadAr:
      "لا يختار ولي الأمر مدرسة في يوم مفتوح واحد — بل يختارها بعد أشهر من المقارنة، ومعظم تلك المقارنة تحدث قبل أن يتصل أحد بمكتب القبول.",
    leadRu:
      "Родитель не выбирает школу за один день открытых дверей — выбор складывается месяцами сравнения, и большая часть этого сравнения происходит ещё до звонка в приёмную комиссию.",
    intro: [
      "Education marketing serves two audiences making one decision together: the parent evaluating fit, cost and outcomes, and the student weighing a different set of priorities entirely. That dual audience, combined with an admissions cycle that runs on fixed intake dates, means the marketing calendar has to work backwards from enrolment deadlines rather than run on a flat always-on basis.",
      "Trust and credibility carry unusual weight here too — accreditation, outcomes, and what current parents or alumni actually say typically outweigh any single campaign message. A school, university or training provider that shows up consistently in local and course-specific search, and backs it with a genuinely responsive admissions journey, converts far more of that long research window into enrolments than one that relies on open-day marketing alone.",
    ],
    introAr: [
      "يخدم تسويق التعليم جمهورين يتخذان قراراً واحداً معاً: ولي الأمر الذي يقيّم الملاءمة والتكلفة والنتائج، والطالب الذي يزن مجموعة مختلفة تماماً من الأولويات. هذا الجمهور المزدوج، إلى جانب دورة قبول تعمل وفق مواعيد التحاق ثابتة، يعني أن التقويم التسويقي يجب أن يُبنى بالعكس بدءاً من مواعيد التسجيل النهائية، لا أن يعمل بشكل ثابت طوال الوقت.",
      "كما تحمل الثقة والمصداقية وزناً استثنائياً في هذا القطاع — فالاعتماد الأكاديمي، والنتائج، وما يقوله فعلياً أولياء الأمور الحاليون أو الخريجون، عادةً ما يفوق تأثيره أي رسالة حملة منفردة. المدرسة أو الجامعة أو مقدم التدريب الذي يظهر باستمرار في نتائج البحث المحلي والمرتبط بالبرامج تحديداً، ويدعم ذلك برحلة قبول سريعة الاستجابة فعلاً، يحوّل جزءاً أكبر بكثير من فترة البحث الطويلة إلى تسجيلات فعلية مقارنة بمن يعتمد على تسويق اليوم المفتوح وحده.",
    ],
    introRu: [
      "Маркетинг в образовании обслуживает две аудитории, принимающие одно решение вместе: родителя, оценивающего соответствие, стоимость и результаты, и студента, взвешивающего совершенно другой набор приоритетов. Эта двойная аудитория в сочетании с приёмной кампанией, привязанной к фиксированным датам набора, означает, что маркетинговый календарь нужно строить в обратном порядке от сроков зачисления, а не вести его в плоском постоянном режиме.",
      "Доверие и репутация здесь тоже несут необычный вес — аккредитация, реальные результаты и то, что действительно говорят нынешние родители или выпускники, как правило, перевешивают сообщение любой отдельной кампании. Школа, университет или учебный центр, стабильно присутствующие в локальном поиске и поиске по конкретным программам и подкреплённые по-настоящему отзывчивым процессом приёма, конвертируют в зачисления гораздо большую часть этого долгого периода изучения, чем те, кто полагается только на маркетинг дней открытых дверей.",
    ],
    bodyLinks: [
      { text: "That usually means " },
      { text: "performance marketing", href: "/services/digital-marketing" },
      { text: " and " },
      { text: "education SEO", href: "/services/seo" },
      { text: " feeding " },
      { text: "enquiry pages", href: "/services/website-development" },
      { text: " built to convert a long research visit, backed by " },
      { text: "admissions CRM", href: "/services/crm-marketing-automation" },
      { text: " that keeps a family engaged for months, not days. " },
      { text: "Get in touch", href: "/contact" },
      { text: " and we'll walk through where the biggest gap actually is." },
    ],
    bodyLinksAr: [
      { text: "يعني ذلك عادة " },
      { text: "التسويق الرقمي", href: "/services/digital-marketing" },
      { text: " و" },
      { text: "تحسين محركات البحث", href: "/services/seo" },
      { text: " اللذين يغذيان " },
      { text: "صفحات استفسار", href: "/services/website-development" },
      { text: " مصممة لتحويل زيارة بحث طويلة، مدعومَين بـ" },
      { text: "نظام إدارة علاقات عملاء للقبول", href: "/services/crm-marketing-automation" },
      { text: " يبقي الأسرة متفاعلة لأشهر لا لأيام. " },
      { text: "تواصلوا معنا", href: "/contact" },
      { text: " وسنستعرض معاً أين تكمن الفجوة الأكبر فعلياً." },
    ],
    bodyLinksRu: [
      { text: "Обычно это " },
      { text: "performance-маркетинг", href: "/services/digital-marketing" },
      { text: " и " },
      { text: "SEO для образования", href: "/services/seo" },
      { text: ", которые ведут на " },
      { text: "страницы заявок", href: "/services/website-development" },
      { text: ", созданные для конверсии долгого периода изучения, вместе с " },
      { text: "приёмной CRM", href: "/services/crm-marketing-automation" },
      { text: ", которая удерживает вовлечённость семьи месяцами, а не днями. " },
      { text: "Свяжитесь с нами", href: "/contact" },
      { text: " — и мы вместе разберём, где на самом деле самый большой разрыв." },
    ],
    whoWeWorkWith: [
      "K-12 schools and school groups",
      "Universities and higher education institutions",
      "Vocational and professional training institutes",
      "EdTech platforms and online learning providers",
      "Nurseries and early-years education providers",
      "Executive education and corporate training providers",
    ],
    whoWeWorkWithAr: [
      "المدارس من الروضة حتى الثانوية ومجموعات المدارس",
      "الجامعات ومؤسسات التعليم العالي",
      "معاهد التدريب المهني والاحترافي",
      "منصات التقنية التعليمية ومقدمو التعلم عبر الإنترنت",
      "الحضانات ومقدمو تعليم الطفولة المبكرة",
      "مقدمو التعليم التنفيذي والتدريب المؤسسي",
    ],
    whoWeWorkWithRu: [
      "Школы K-12 и группы школ",
      "Университеты и учреждения высшего образования",
      "Институты профессионального и специализированного обучения",
      "EdTech-платформы и провайдеры онлайн-обучения",
      "Детские сады и провайдеры раннего образования",
      "Провайдеры executive-образования и корпоративного обучения",
    ],
    challenges: [
      { title: "Long, dual-audience decision journeys", desc: "Parents and students often weigh different priorities on the same decision — messaging has to work for both without diluting either." },
      { title: "Admissions-cycle timing", desc: "Enquiries, tours and applications cluster around fixed intake windows, which means media spend has to peak with the calendar, not run flat." },
      { title: "Trust built on outcomes and accreditation", desc: "Claims about results and accreditation carry real scrutiny — the content has to substantiate them, not just assert them." },
      { title: "Course and programme discoverability", desc: "A large institution's individual programmes need their own search visibility, not just the institution's name." },
      { title: "Lead nurturing across a long enquiry-to-enrolment gap", desc: "An enquiry can sit for months before an application — the follow-up system has to sustain interest that long without becoming pressure." },
    ],
    challengesAr: [
      { title: "رحلات قرار طويلة بجمهور مزدوج", desc: "غالباً ما يزن أولياء الأمور والطلاب أولويات مختلفة في القرار نفسه — يجب أن تعمل الرسائل التسويقية للطرفين معاً دون إضعاف أي منهما." },
      { title: "توقيت دورة القبول", desc: "تتركز الاستفسارات والجولات والطلبات حول نوافذ التحاق ثابتة، ما يعني أن الإنفاق الإعلاني يجب أن يبلغ ذروته مع التقويم، لا أن يبقى ثابتاً." },
      { title: "ثقة مبنية على النتائج والاعتماد الأكاديمي", desc: "تخضع الادعاءات المتعلقة بالنتائج والاعتماد لتدقيق حقيقي — يجب أن يُثبتها المحتوى، لا أن يكتفي بذكرها." },
      { title: "إمكانية اكتشاف البرامج والمقررات", desc: "تحتاج البرامج الفردية في المؤسسة الكبيرة إلى ظهور خاص بها في نتائج البحث، لا الاعتماد على اسم المؤسسة وحده." },
      { title: "رعاية العملاء المحتملين عبر فجوة طويلة بين الاستفسار والتسجيل", desc: "قد يبقى الاستفسار دون طلب فعلي لأشهر — يجب أن يحافظ نظام المتابعة على الاهتمام طوال تلك الفترة دون أن يتحول إلى ضغط." },
    ],
    challengesRu: [
      { title: "Долгий путь решения с двумя аудиториями", desc: "Родители и студенты часто взвешивают разные приоритеты в одном и том же решении — сообщение должно работать для обоих, не размывая ни один из посылов." },
      { title: "Привязка к циклу приёма", desc: "Обращения, экскурсии и заявки концентрируются вокруг фиксированных окон набора, а значит, медиабюджет должен пиково расти вместе с календарём, а не идти ровно." },
      { title: "Доверие, построенное на результатах и аккредитации", desc: "Заявления о результатах и аккредитации проходят реальную проверку — контент должен их подтверждать, а не просто декларировать." },
      { title: "Обнаруживаемость курсов и программ", desc: "Отдельным программам крупного учреждения нужна собственная видимость в поиске, а не только имя самого учреждения." },
      { title: "Ведение лидов через долгий разрыв между обращением и зачислением", desc: "Обращение может «зависать» месяцами до подачи заявки — система follow-up должна поддерживать интерес всё это время, не превращаясь в давление." },
    ],
    services: [
      { slug: "digital-marketing", title: "Performance Marketing for Education", desc: "Search and social campaigns timed to admissions deadlines, targeted at genuine enquiry intent from parents and prospective students." },
      { slug: "seo", title: "Education SEO", desc: "Search visibility for the institution, its individual programmes and the comparison questions parents actually search." },
      { slug: "branding", title: "Education Branding", desc: "A credible, distinct identity that communicates outcomes and culture clearly across every touchpoint." },
      { slug: "website-development", title: "Education Websites & Enquiry Forms", desc: "Fast, informative websites with programme pages and enquiry flows built to convert a long research visit." },
      { slug: "crm-marketing-automation", title: "Admissions CRM & Nurturing", desc: "Automated nurture sequences that keep an enquiry warm across the months between first contact and enrolment." },
    ],
    servicesAr: [
      { slug: "digital-marketing", title: "التسويق الأدائي للتعليم", desc: "حملات بحث ووسائل تواصل اجتماعي مُوقّتة مع مواعيد القبول النهائية، تستهدف نية استفسار حقيقية من أولياء الأمور والطلاب المحتملين." },
      { slug: "seo", title: "تحسين محركات البحث للتعليم", desc: "ظهور في نتائج البحث للمؤسسة وبرامجها الفردية وأسئلة المقارنة التي يبحث عنها أولياء الأمور فعلياً." },
      { slug: "branding", title: "هوية العلامة التجارية للتعليم", desc: "هوية موثوقة ومميزة تنقل النتائج والثقافة بوضوح عبر كل نقطة تواصل." },
      { slug: "website-development", title: "مواقع التعليم ونماذج الاستفسار", desc: "مواقع سريعة وغنية بالمعلومات، بصفحات برامج ومسارات استفسار مصممة لتحويل زيارة بحث طويلة." },
      { slug: "crm-marketing-automation", title: "إدارة علاقات القبول ورعاية العملاء المحتملين", desc: "سلاسل رعاية آلية تُبقي الاستفسار متفاعلاً طوال الأشهر الفاصلة بين أول تواصل والتسجيل." },
    ],
    servicesRu: [
      { slug: "digital-marketing", title: "Перформанс-маркетинг для образования", desc: "Кампании в поиске и соцсетях, приуроченные к срокам приёма и нацеленные на реальное намерение обратиться со стороны родителей и абитуриентов." },
      { slug: "seo", title: "SEO для образовательных учреждений", desc: "Видимость в поиске для учреждения, его отдельных программ и сравнительных вопросов, которые реально задают родители." },
      { slug: "branding", title: "Брендинг в сфере образования", desc: "Достоверная, отличительная идентичность, которая ясно доносит результаты и культуру учреждения в каждой точке контакта." },
      { slug: "website-development", title: "Сайты и формы обращений для образования", desc: "Быстрые, информативные сайты со страницами программ и формами обращения, созданные для конверсии длительного визита изучения." },
      { slug: "crm-marketing-automation", title: "CRM приёмной комиссии и ведение лидов", desc: "Автоматизированные цепочки, которые поддерживают интерес обращения тёплым на протяжении месяцев между первым контактом и зачислением." },
    ],
    approach: [
      { step: "01", title: "Positioning", desc: "Define what the institution or programme is genuinely known for, in language a parent or student actually searches." },
      { step: "02", title: "Search Visibility", desc: "Build SEO around the institution, its programmes and the comparison questions its audience is asking." },
      { step: "03", title: "Content & Trust", desc: "Build outcomes-led content — results, accreditation, real testimonials — that substantiates the school or provider's claims." },
      { step: "04", title: "Enquiry Generation", desc: "Run admissions-timed campaigns measured against qualified enquiries, not raw traffic." },
      { step: "05", title: "Nurture", desc: "Keep enquiries warm across a long decision window with CRM-driven follow-up." },
      { step: "06", title: "Enrolment Conversion", desc: "Tighten the admissions journey itself so a nurtured enquiry converts into a confirmed enrolment." },
    ],
    approachAr: [
      { step: "01", title: "التموضع", desc: "تحديد ما تُعرف به المؤسسة أو البرنامج فعلياً، بلغة يبحث عنها ولي الأمر أو الطالب حقاً." },
      { step: "02", title: "الظهور في نتائج البحث", desc: "بناء تحسين محركات البحث حول المؤسسة وبرامجها وأسئلة المقارنة التي يطرحها جمهورها." },
      { step: "03", title: "المحتوى والثقة", desc: "بناء محتوى قائم على النتائج — الإنجازات، الاعتماد الأكاديمي، الشهادات الحقيقية — يثبت ادعاءات المدرسة أو الجهة التعليمية." },
      { step: "04", title: "توليد الاستفسارات", desc: "تشغيل حملات مُوقّتة مع القبول تُقاس بالاستفسارات المؤهلة، لا حجم الزيارات الخام." },
      { step: "05", title: "الرعاية", desc: "الحفاظ على تفاعل الاستفسارات طوال نافذة القرار الطويلة عبر متابعة مدفوعة بنظام إدارة علاقات العملاء." },
      { step: "06", title: "تحويل التسجيل", desc: "تحسين رحلة القبول نفسها بحيث يتحول الاستفسار المُرعى إلى تسجيل مؤكد." },
    ],
    approachRu: [
      { step: "01", title: "Позиционирование", desc: "Определяем, чем учреждение или программа действительно известны, — языком, которым реально пользуются родитель или студент при поиске." },
      { step: "02", title: "Видимость в поиске", desc: "Выстраиваем SEO вокруг учреждения, его программ и сравнительных вопросов, которые задаёт аудитория." },
      { step: "03", title: "Контент и доверие", desc: "Создаём контент на основе результатов — достижения, аккредитация, реальные отзывы — который подтверждает заявления школы или учреждения." },
      { step: "04", title: "Генерация обращений", desc: "Запускаем кампании, приуроченные к приёмной кампании, с оценкой по квалифицированным обращениям, а не сырому трафику." },
      { step: "05", title: "Ведение лидов", desc: "Поддерживаем интерес обращений на протяжении долгого окна принятия решения через follow-up на базе CRM." },
      { step: "06", title: "Конверсия в зачисление", desc: "Отлаживаем сам процесс приёма, чтобы «доведённое» обращение превращалось в подтверждённое зачисление." },
    ],
    faqs: [
      { q: "How can digital marketing help schools and education providers specifically?", a: "By building search visibility and content that reaches parents and students during their research phase, then nurturing that interest through to an application with CRM-driven follow-up." },
      { q: "What digital channels work best for student and parent acquisition?", a: "Usually a mix of search (for both the institution and specific programmes), social media aimed at the right audience segment, and email or CRM nurture across the admissions cycle." },
      { q: "How does SEO help schools and education brands specifically?", a: "It captures parents and students actively comparing options by search, which is typically where most serious enquiries start, well before an open day or a direct enquiry." },
      { q: "How can education businesses improve enquiry-to-enrolment conversion?", a: "By nurturing every enquiry consistently across the full decision window with CRM automation, rather than relying on a single follow-up call after an open day." },
    ],
    faqsAr: [
      { q: "كيف يمكن للتسويق الرقمي أن يساعد المدارس ومقدمي التعليم تحديداً؟", a: "من خلال بناء ظهور في نتائج البحث ومحتوى يصل إلى أولياء الأمور والطلاب خلال مرحلة بحثهم، ثم رعاية ذلك الاهتمام حتى الطلب الفعلي عبر متابعة مدفوعة بنظام إدارة علاقات العملاء." },
      { q: "ما القنوات الرقمية الأنسب لاستقطاب الطلاب وأولياء الأمور؟", a: "عادةً مزيج من البحث (للمؤسسة والبرامج المحددة معاً)، ووسائل التواصل الاجتماعي الموجهة للشريحة المناسبة من الجمهور، والرعاية عبر البريد الإلكتروني أو نظام إدارة علاقات العملاء طوال دورة القبول." },
      { q: "كيف يساعد تحسين محركات البحث المدارس والعلامات التعليمية تحديداً؟", a: "يجذب أولياء الأمور والطلاب الذين يقارنون الخيارات فعلياً عبر البحث، وهي عادةً النقطة التي تبدأ منها معظم الاستفسارات الجادة، قبل اليوم المفتوح أو الاستفسار المباشر بوقت طويل." },
      { q: "كيف يمكن للمؤسسات التعليمية تحسين تحويل الاستفسارات إلى تسجيلات؟", a: "من خلال رعاية كل استفسار باستمرار طوال نافذة القرار الكاملة عبر أتمتة إدارة علاقات العملاء، بدلاً من الاعتماد على مكالمة متابعة واحدة بعد اليوم المفتوح." },
    ],
    faqsRu: [
      { q: "Как именно цифровой маркетинг может помочь школам и образовательным учреждениям?", a: "За счёт видимости в поиске и контента, который доходит до родителей и студентов на этапе изучения вариантов, а затем поддерживает этот интерес до подачи заявки через follow-up на базе CRM." },
      { q: "Какие цифровые каналы лучше всего работают для привлечения студентов и родителей?", a: "Обычно это сочетание поиска (и по самому учреждению, и по конкретным программам), соцсетей, нацеленных на нужный сегмент аудитории, и email- или CRM-ведения на протяжении всего приёмного цикла." },
      { q: "Как именно SEO помогает школам и образовательным брендам?", a: "Оно захватывает родителей и студентов, которые активно сравнивают варианты через поиск, — а именно здесь обычно начинаются самые серьёзные обращения, задолго до дня открытых дверей или прямого запроса." },
      { q: "Как образовательные организации могут повысить конверсию обращений в зачисления?", a: "Последовательным ведением каждого обращения на протяжении всего окна принятия решения через автоматизацию CRM, а не одним звонком после дня открытых дверей." },
    ],
    ctaTitle: ["Let's turn enquiries", "into enrolments."],
    ctaTitleAr: ["لنحوّل الاستفسارات", "إلى تسجيلات."],
    ctaTitleRu: ["Превратим обращения", "в зачисления."],
    ctaMessage: "Hi, I'm interested in digital marketing for education.",
    ctaMessageAr: "مرحباً، أنا مهتم بالتسويق الرقمي للتعليم.",
    ctaMessageRu: "Здравствуйте, меня интересует цифровой маркетинг для образования.",
    metaDescription:
      "Education marketing in Dubai — SEO, performance marketing, branding and admissions CRM for schools, universities and training providers.",
    metaDescriptionAr:
      "تسويق التعليم في دبي — تحسين محركات البحث، تسويق أدائي، هوية علامة تجارية وإدارة علاقات قبول للمدارس والجامعات ومقدمي التدريب.",
    metaDescriptionRu:
      "Маркетинг для сферы образования в Дубае — SEO, перформанс-маркетинг, брендинг и CRM приёмной комиссии для школ, университетов и учебных центров.",
    seoTitle: "Education Marketing Agency — Schools & Institutions, Dubai",
    seoTitleAr: "وكالة تسويق التعليم — المدارس والمؤسسات، دبي",
    seoTitleRu: "Агентство маркетинга для образования — школы и учреждения, Дубай",
  },
];

export function getIndustry(slug: string): Industry | undefined {
  return industries.find((industry) => industry.slug === slug);
}

/**
 * The handful of fields a client-side nav/selector actually renders — same
 * reasoning as `NavService`/`navServices()`: `SiteHeader` is `"use client"`,
 * so whatever it imports ships to the browser on every page.
 */
export type NavIndustry = Pick<Industry, "slug" | "num" | "name" | "nameAr" | "nameRu">;

export function navIndustries(): NavIndustry[] {
  return industries.map(({ slug, num, name, nameAr, nameRu }) => ({
    slug,
    num,
    name,
    nameAr,
    nameRu,
  }));
}

/* -------------------------------------------------------------------------- */
/* Insights                                                                    */
/* -------------------------------------------------------------------------- */

export type InsightCategory = {
  slug: string;
  /** Two-digit index — shown beside the name in the category nav's source order. */
  num: string;
  name: string;
  nameAr: string;
  nameRu: string;
  /** Used as the category's H1/meta description on `/insights?category=`. */
  description: string;
  descriptionAr: string;
  descriptionRu: string;
};

/** The five sections the editorial hub is organised into. Every article belongs to exactly one. */
export const insightCategories: InsightCategory[] = [
  {
    slug: "market-news",
    num: "01",
    name: "Market News",
    nameAr: "أخبار السوق",
    nameRu: "Новости рынка",
    description:
      "Timely commentary on the platforms, auctions and budgets shaping digital marketing in Dubai and the UAE.",
    descriptionAr:
      "تعليقات آنية حول المنصات والمزادات والميزانيات التي تُشكّل التسويق الرقمي في دبي والإمارات.",
    descriptionRu:
      "Актуальные комментарии о платформах, аукционах и бюджетах, формирующих цифровой маркетинг в Дубае и ОАЭ.",
  },
  {
    slug: "articles",
    num: "02",
    name: "Articles",
    nameAr: "مقالات",
    nameRu: "Статьи",
    description:
      "In-depth pieces on digital marketing, websites and CRM — the mechanics behind marketing that actually converts.",
    descriptionAr:
      "مقالات معمّقة حول التسويق الرقمي والمواقع الإلكترونية وإدارة علاقات العملاء — آليات التسويق الذي يحقق تحويلات فعلية.",
    descriptionRu:
      "Глубокие материалы о цифровом маркетинге, сайтах и CRM — механика маркетинга, который действительно конвертирует.",
  },
  {
    slug: "case-studies",
    num: "03",
    name: "Case Studies",
    nameAr: "دراسات حالة",
    nameRu: "Кейсы",
    description:
      "Illustrative examples of how real marketing problems — lead quality, site conversion, full-funnel systems — get diagnosed and fixed.",
    descriptionAr:
      "أمثلة توضيحية حول كيفية تشخيص وحل مشكلات تسويقية حقيقية — جودة العملاء المحتملين، تحويل الموقع، أنظمة القمع التسويقي الكاملة.",
    descriptionRu:
      "Показательные примеры того, как диагностируются и решаются реальные маркетинговые проблемы — качество лидов, конверсия сайта, комплексные воронки.",
  },
  {
    slug: "trends-and-insights",
    num: "04",
    name: "Trends & Insights",
    nameAr: "الاتجاهات والرؤى",
    nameRu: "Тренды и инсайты",
    description:
      "Where digital marketing is headed next, and what it asks of your website, content and campaigns today.",
    descriptionAr:
      "إلى أين يتجه التسويق الرقمي، وما الذي يتطلبه ذلك من موقعكم الإلكتروني ومحتواكم وحملاتكم اليوم.",
    descriptionRu:
      "Куда движется цифровой маркетинг и что это уже сегодня требует от вашего сайта, контента и кампаний.",
  },
  {
    slug: "guides",
    num: "05",
    name: "Guides",
    nameAr: "أدلة إرشادية",
    nameRu: "Руководства",
    description:
      "Practical, step-by-step guides for founders and marketing leads running their own growth.",
    descriptionAr:
      "أدلة عملية خطوة بخطوة للمؤسسين ومسؤولي التسويق الذين يديرون نمو أعمالهم بأنفسهم.",
    descriptionRu:
      "Практические пошаговые руководства для основателей и руководителей маркетинга, которые самостоятельно управляют ростом своего бизнеса.",
  },
  // --- Topical categories, added alongside the five content-type sections
  // above rather than replacing them: every existing article keeps the
  // category it already has, and these give new subject-led pieces (starting
  // with the AEO pillar guide) a home organised by topic instead of format.
  {
    slug: "seo",
    num: "06",
    name: "SEO",
    nameAr: "تحسين محركات البحث",
    nameRu: "SEO",
    description:
      "Search engine optimization, technical SEO, keyword strategy, rankings and organic visibility.",
    descriptionAr:
      "تحسين محركات البحث، تحسين محركات البحث التقني، استراتيجية الكلمات المفتاحية، الترتيب والظهور العضوي.",
    descriptionRu:
      "Поисковая оптимизация, техническое SEO, стратегия ключевых слов, ранжирование и органическая видимость.",
  },
  {
    slug: "answer-engine-optimization",
    num: "07",
    name: "Answer Engine Optimization",
    nameAr: "تحسين محركات الإجابة",
    nameRu: "Оптимизация под поисковые ответы (AEO)",
    description:
      "AEO, AI search, answer engines, AI visibility and answer-focused search.",
    descriptionAr:
      "تحسين محركات الإجابة (AEO)، البحث بالذكاء الاصطناعي، محركات الإجابة، الظهور في الذكاء الاصطناعي والبحث المرتكز على الإجابات.",
    descriptionRu:
      "AEO, ИИ-поиск, системы ответов, видимость в ИИ и поиск, ориентированный на прямые ответы.",
  },
  {
    slug: "generative-engine-optimization",
    num: "08",
    name: "Generative Engine Optimization",
    nameAr: "تحسين المحركات التوليدية",
    nameRu: "Оптимизация под генеративные системы (GEO)",
    description:
      "GEO, generative search, AI platforms and visibility within generative answers.",
    descriptionAr:
      "تحسين المحركات التوليدية (GEO)، البحث التوليدي، منصات الذكاء الاصطناعي والظهور داخل الإجابات التوليدية.",
    descriptionRu:
      "GEO, генеративный поиск, ИИ-платформы и видимость внутри генеративных ответов.",
  },
  {
    slug: "digital-marketing",
    num: "09",
    name: "Digital Marketing",
    nameAr: "التسويق الرقمي",
    nameRu: "Цифровой маркетинг",
    description:
      "Digital marketing strategy, performance marketing, campaigns, analytics and growth.",
    descriptionAr:
      "استراتيجية التسويق الرقمي، التسويق القائم على الأداء، الحملات، التحليلات والنمو.",
    descriptionRu:
      "Стратегия цифрового маркетинга, перформанс-маркетинг, кампании, аналитика и рост.",
  },
  {
    slug: "branding",
    num: "10",
    name: "Branding",
    nameAr: "العلامة التجارية",
    nameRu: "Брендинг",
    description:
      "Brand strategy, positioning, identity, messaging and brand systems.",
    descriptionAr:
      "استراتيجية العلامة التجارية، التموضع، الهوية، الرسائل وأنظمة العلامة التجارية.",
    descriptionRu:
      "Стратегия бренда, позиционирование, айдентика, месседжинг и брендовые системы.",
  },
  {
    slug: "content-marketing",
    num: "11",
    name: "Content Marketing",
    nameAr: "التسويق بالمحتوى",
    nameRu: "Контент-маркетинг",
    description:
      "Content strategy, content creation, editorial strategy and content distribution.",
    descriptionAr:
      "استراتيجية المحتوى، إنشاء المحتوى، الاستراتيجية التحريرية وتوزيع المحتوى.",
    descriptionRu:
      "Контент-стратегия, создание контента, редакционная стратегия и дистрибуция контента.",
  },
  {
    slug: "website-design-and-development",
    num: "12",
    name: "Website Design & Development",
    nameAr: "تصميم وتطوير المواقع",
    nameRu: "Дизайн и разработка сайтов",
    description:
      "Websites, UX, UI, CRO, web development and digital experiences.",
    descriptionAr:
      "المواقع الإلكترونية، تجربة المستخدم، واجهة المستخدم، تحسين معدل التحويل، تطوير الويب والتجارب الرقمية.",
    descriptionRu:
      "Сайты, UX, UI, CRO, веб-разработка и цифровые продукты.",
  },
  {
    slug: "copywriting",
    num: "13",
    name: "Copywriting",
    nameAr: "كتابة المحتوى الإعلاني",
    nameRu: "Копирайтинг",
    description:
      "Copywriting, website copy, brand copy, conversion copy and persuasive writing.",
    descriptionAr:
      "كتابة المحتوى الإعلاني، نصوص المواقع، نصوص العلامة التجارية، النصوص التحويلية والكتابة الإقناعية.",
    descriptionRu:
      "Копирайтинг, тексты для сайтов, тексты бренда, конверсионные тексты и убедительное письмо.",
  },
  {
    slug: "business-communication",
    num: "14",
    name: "Business Communication",
    nameAr: "التواصل في بيئة الأعمال",
    nameRu: "Деловая коммуникация",
    description:
      "Professional communication, business writing, communication strategy and workplace writing.",
    descriptionAr:
      "التواصل المهني، الكتابة في بيئة الأعمال، استراتيجية التواصل والكتابة في مكان العمل.",
    descriptionRu:
      "Профессиональная коммуникация, деловое письмо, коммуникационная стратегия и рабочая переписка.",
  },
  {
    slug: "grammar-and-english",
    num: "15",
    name: "Grammar & English",
    nameAr: "القواعد واللغة الإنجليزية",
    nameRu: "Грамматика и английский язык",
    description:
      "Grammar, English usage, writing clarity and language education.",
    descriptionAr:
      "قواعد اللغة، استخدام اللغة الإنجليزية، وضوح الكتابة والتعليم اللغوي.",
    descriptionRu:
      "Грамматика, употребление английского языка, ясность письма и языковое образование.",
  },
  {
    slug: "confused-words",
    num: "16",
    name: "Confused Words",
    nameAr: "الكلمات الملتبسة",
    nameRu: "Слова-паронимы",
    description:
      "Commonly confused English words, word comparisons and usage distinctions.",
    descriptionAr:
      "الكلمات الإنجليزية الشائعة الالتباس، مقارنات الكلمات والفروق في الاستخدام.",
    descriptionRu:
      "Часто путаемые английские слова, сравнение слов и различия в употреблении.",
  },
];

export function getInsightCategory(slug: string): InsightCategory | undefined {
  return insightCategories.find((category) => category.slug === slug);
}

/**
 * One block of an article body. `p`, list items, blockquotes and table cells
 * all support inline Markdown-style `[label](/href)` links, `**bold**` and
 * `*italic*`, parsed at render time (`renderInline` in `components/
 * insights.tsx`) rather than storing JSX here, so this file stays plain data.
 */
export type ArticleBlock =
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "p"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "blockquote"; text: string }
  | { type: "table"; headers: string[]; rows: string[][] }
  | { type: "code"; text: string; language?: string }
  | { type: "image"; src: string; alt: string; caption?: string };

/**
 * Pillar-cluster content types (section 27 of the Insights brief). `pillar`
 * marks the one broad guide a topic cluster is organised around; the rest
 * describe the narrower pieces a future cluster links back to it. Optional —
 * every article predating this field is implicitly "informational".
 */
export type InsightContentType =
  | "pillar"
  | "supporting"
  | "comparison"
  | "how-to"
  | "informational"
  | "commercial";

export type InsightArticle = {
  slug: string;
  /** Primary category — matches an `insightCategories[].slug`. Drives breadcrumbs and the main category label. */
  category: string;
  /** Optional secondary categories — additional `insightCategories[].slug` values the article also belongs to, without duplicating it across category grids. */
  secondaryCategories?: string[];
  /** Freeform topical tags, distinct from categories — used for related-content matching, not for its own archive page. */
  tags?: string[];
  contentType?: InsightContentType;
  title: string;
  /** Localised variants fall back to the English value wherever they're rendered when omitted — see `?? article.title` at each read site. Articles that don't yet have an Arabic/Russian edition (`locales` below) can leave these unset rather than carry placeholder translations. */
  titleAr?: string;
  titleRu?: string;
  excerpt: string;
  excerptAr?: string;
  excerptRu?: string;
  date: string;
  readingTime: string;
  readingTimeAr?: string;
  readingTimeRu?: string;
  /** Shown in the Featured Content band. Exactly one article carries this. */
  featured?: boolean;
  /**
   * The <title> tag content, when it should differ from the on-page `title`
   * — usually because the H1 reads better short and the <title> has room for
   * the keyword phrase and the brand name. Falls back to `title`.
   */
  seoTitle?: string;
  seoTitleAr?: string;
  seoTitleRu?: string;
  /** Falls back to `excerpt` when omitted — the same pattern `services[].metaDescription` uses. */
  metaDescription?: string;
  metaDescriptionAr?: string;
  metaDescriptionRu?: string;
  /**
   * The card/hero photograph. Never used on more than one article — same
   * rule `check:images` enforces elsewhere — except Market News articles
   * without a dedicated photo of their own, which may intentionally share
   * `sharedImages.marketNewsBanner` instead (see its own comment).
   */
  image: string;
  /** Describes what's actually in the photograph, not the article topic. */
  imageAlt: string;
  imageAltAr?: string;
  imageAltRu?: string;
  /**
   * The short phrase set over the image itself — a topic, not the full
   * headline (e.g. "Dubai's Ad Auctions", not the full H1). Two to four
   * words, so it reads at a glance over a photograph rather than as a
   * second title competing with the real one underneath it.
   */
  imageTopic: string;
  imageTopicAr?: string;
  imageTopicRu?: string;
  body: ArticleBlock[];
  bodyAr?: ArticleBlock[];
  bodyRu?: ArticleBlock[];
  /** Rendered as a `<Faq>` accordion at the foot of the article, matched by a `FaqPage` schema — omit entirely rather than reusing an unrelated FAQ set. */
  faqs?: { q: string; a: string }[];
  /**
   * Which locales this article has a real, reviewed edition for. Omitted
   * (the default, and every article predating this field) means all three —
   * `en`, `ar` and `ru`. Set explicitly to a subset for an article published
   * in only some languages so the other locales' routes, sitemaps and
   * "related" rails 404/skip it cleanly instead of rendering an English
   * fallback dressed in Arabic or Russian typography.
   */
  locales?: readonly Locale[];
};

const h2 = (text: string): ArticleBlock => ({ type: "h2", text });
const h3 = (text: string): ArticleBlock => ({ type: "h3", text });
const p = (text: string): ArticleBlock => ({ type: "p", text });
const ul = (items: string[]): ArticleBlock => ({ type: "ul", items });
const ol = (items: string[]): ArticleBlock => ({ type: "ol", items });
const blockquote = (text: string): ArticleBlock => ({ type: "blockquote", text });
const table = (headers: string[], rows: string[][]): ArticleBlock => ({
  type: "table",
  headers,
  rows,
});

/**
 * Editorial hub content, written in Shario's voice. Market News, Articles,
 * Trends & Insights and Guides carry full, original pieces. Case Studies
 * carries illustrative example scenarios only, each explicitly labelled as
 * such in its own copy — no client work has a published, client-approved
 * write-up yet, and presenting an invented engagement as a real one would
 * misrepresent actual client work. Replace those three with real, reviewed
 * case studies as they become available; the anonymised-by-sector convention
 * they use matches `selectedWork`'s pattern on the About/homepage.
 */
export const insightArticles: InsightArticle[] = [
  {
    slug: "dubai-ad-auctions-getting-more-competitive",
    category: "market-news",
    title: "Why Dubai's Ad Auctions Keep Getting More Competitive",
    titleAr: "لماذا تزداد مزادات الإعلانات في دبي تنافسية باستمرار؟",
    titleRu: "Почему рекламные аукционы в Дубае становятся всё более конкурентными",
    seoTitle: "Why Dubai Ad Auctions Are More Competitive in 2026",
    seoTitleAr: "لماذا مزادات الإعلانات في دبي أكثر تنافسية في 2026؟",
    seoTitleRu: "Почему рекламные аукционы в Дубае дороже в 2026 году",
    excerpt:
      "Cost per click keeps climbing, and it isn't one platform update. Here's what's actually driving it.",
    excerptAr:
      "تكلفة النقرة تواصل الارتفاع، والسبب ليس تحديثاً واحداً في إحدى المنصات. إليكم ما يدفع هذا الارتفاع فعلاً.",
    excerptRu:
      "Цена за клик продолжает расти, и дело не в одном обновлении платформы. Рассказываем, что на самом деле стоит за этим ростом.",
    metaDescription:
      "Cost per click in Dubai keeps rising, and it isn't one platform update. Here's what's actually driving competitive ad auctions in the UAE, and how to keep your account ahead of it.",
    metaDescriptionAr:
      "تكلفة النقرة في دبي تواصل الارتفاع، والسبب ليس تحديثاً واحداً في إحدى المنصات. إليكم ما يدفع فعلياً تنافسية مزادات الإعلانات في الإمارات، وكيفية إبقاء حسابكم متقدماً عليها.",
    metaDescriptionRu:
      "Цена за клик в Дубае продолжает расти, и дело не в одном обновлении платформы. Рассказываем, что на самом деле разгоняет конкуренцию на рекламных аукционах в ОАЭ и как удержать свой аккаунт впереди рынка.",
    date: "3 Jul 2026",
    readingTime: "6 min read",
    readingTimeAr: "6 دقائق قراءة",
    readingTimeRu: "6 мин чтения",
    image: "/images/insights/dubai-ad-auctions-marble-books.jpg",
    imageAlt: "A small bronze figurine and a stack of designer coffee-table books on a dark marble table",
    imageAltAr: "تمثال برونزي صغير وكومة من كتب الطاولة الفاخرة على طاولة رخامية داكنة",
    imageAltRu: "Маленькая бронзовая статуэтка и стопка дизайнерских книг для журнального столика на тёмном мраморном столе",
    imageTopic: "Dubai's Ad Auctions",
    imageTopicAr: "مزادات إعلانات دبي",
    imageTopicRu: "Рекламные аукционы Дубая",
    body: [
      p(
        "Every quarter, the same conversation happens across marketing teams in Dubai: cost per click is up again, and nobody can point to a single reason why.",
      ),
      h2("There Isn't One Cause — There Are Three"),
      p(
        "The honest answer is that a single culprit rarely exists. Three separate pressures are compounding at once, and any one of them alone would be enough to push costs up.",
      ),
      h3("More Advertisers, the Same Finite Inventory"),
      p(
        "Google and Meta auctions allocate a fixed number of impressions among however many advertisers show up to bid for them. Dubai's advertiser base has grown faster than its pool of high-intent searchers and scrollers, so more budgets are chasing the same attention — and an auction, by design, prices that scarcity in.",
      ),
      h3("Platforms Reward the Accounts That Already Spend Well"),
      p(
        "Ad rank isn't just about bid size. Google Ads and Meta's delivery systems weight relevance and historical performance heavily, which means a well-optimised account effectively pays a lower real price than a poorly built one bidding the same amount. As more advertisers professionalise their accounts, the bar for \"well-optimised\" rises with them — and everyone below that bar pays more for the same result.",
      ),
      h3("Categories That Used to Be Easy Aren't Anymore"),
      p(
        "Real estate, hospitality and education were, five years ago, some of the more forgiving categories to advertise in. All three have since matured into genuinely competitive verticals, with larger developers, hotel groups and institutions running dedicated in-house performance teams rather than a single marketing generalist. That shift alone accounts for a meaningful share of the CPC increase inside those sectors specifically.",
      ),
      h2("What Rising Costs Actually Punish"),
      p(
        "None of this makes paid media a weaker channel. It makes the gap between a well-run account and a neglected one wider than it used to be. An account left on autopilot — generic keywords, unchanged creative, no [CRM feedback loop](/services/crm-marketing-automation) telling it which leads actually closed — pays full price for every pressure above. An account built and optimised properly absorbs them far better, because it's competing on relevance and conversion quality, not budget alone.",
      ),
      h2("The Accounts Winning Right Now Share Three Habits"),
      p(
        "They price a lead against its close rate, not just its cost. They feed sales outcomes back into the platform so it learns what a good lead actually looks like, rather than optimising for form fills alone. And they treat account structure and creative as things to keep improving weekly, not a campaign that was set up once and left running.",
      ),
      h2("What This Means for Your Budget"),
      p(
        "A rising market rate for clicks isn't a reason to panic or pull spend. It's a reason to check whether your account is still paying the old price in the new market, or has already adjusted. If [Digital Marketing](/services/digital-marketing) is a meaningful part of your growth plan for the year ahead, that's worth a proper look before the next budget cycle, not after it.",
      ),
      p(
        "If you want a second opinion on your account before then, [book a short call](/contact) — we'll tell you plainly whether the fix is budget, structure, or both. For a wider view of how platforms themselves are responding to advertiser demand, [Think with Google's marketing insights](https://www.thinkwithgoogle.com/intl/en-emea/) tracks regional shifts worth reading alongside your own account data.",
      ),
    ],
    bodyAr: [
      p(
        "في كل ربع سنة، يتكرر الحديث ذاته بين فرق التسويق في دبي: تكلفة النقرة ارتفعت مجدداً، ولا أحد يستطيع تحديد سبب واحد واضح لذلك.",
      ),
      h2("لا يوجد سبب واحد — بل ثلاثة أسباب"),
      p(
        "الإجابة الصادقة هي أن وجود سبب واحد أمر نادر الحدوث. فثلاثة ضغوط منفصلة تتراكم في آن واحد، وأي منها بمفرده كافٍ لرفع التكاليف.",
      ),
      h3("المزيد من المعلنين، ونفس المساحة الإعلانية المحدودة"),
      p(
        "توزّع مزادات جوجل وميتا عدداً ثابتاً من مرات الظهور بين عدد المعلنين الذين يتنافسون على المزايدة، مهما كان عددهم. وقد نما عدد المعلنين في دبي بوتيرة أسرع من نمو جمهور الباحثين والمتصفحين ذوي النية الشرائية العالية، ما يعني أن ميزانيات أكثر تتنافس على الانتباه نفسه — والمزاد، بحكم تصميمه، يسعّر هذه الندرة.",
      ),
      h3("المنصات تكافئ الحسابات التي تُدار بكفاءة بالفعل"),
      p(
        "ترتيب الإعلان لا يعتمد فقط على حجم المزايدة. فأنظمة عرض إعلانات جوجل وميتا تُعطي وزناً كبيراً للملاءمة والأداء التاريخي، ما يعني أن الحساب المُحسَّن جيداً يدفع فعلياً سعراً حقيقياً أقل من حساب سيئ البناء يزايد بالمبلغ نفسه. ومع ازدياد احترافية المعلنين في إدارة حساباتهم، يرتفع معهم معيار «الإدارة الجيدة» — وكل من هو دون ذلك المعيار يدفع أكثر مقابل النتيجة نفسها.",
      ),
      h3("القطاعات التي كانت سهلة لم تعد كذلك"),
      p(
        "كانت قطاعات العقارات والضيافة والتعليم، قبل خمس سنوات، من بين القطاعات الأكثر تسامحاً للإعلان فيها. لكن هذه القطاعات الثلاثة نضجت منذ ذلك الحين لتصبح قطاعات تنافسية حقيقية، حيث تدير كبرى شركات التطوير العقاري ومجموعات الفنادق والمؤسسات فرق تسويق أدائي داخلية متخصصة بدلاً من موظف تسويق عام واحد. هذا التحول وحده يفسر جزءاً كبيراً من ارتفاع تكلفة النقرة داخل هذه القطاعات تحديداً.",
      ),
      h2("ما الذي يعاقبه الارتفاع في التكاليف فعلياً؟"),
      p(
        "لا شيء من هذا يجعل الإعلانات المدفوعة قناة أضعف. بل يوسّع الفجوة بين الحساب المُدار جيداً والحساب المُهمَل أكثر من ذي قبل. فالحساب المتروك على الطيار الآلي — كلمات مفتاحية عامة، تصاميم إبداعية ثابتة، وبلا [حلقة تغذية راجعة من إدارة علاقات العملاء](/ar/services/crm-marketing-automation) تخبره أي العملاء المحتملين أُغلقوا فعلاً — يدفع السعر كاملاً مقابل كل ضغط من الضغوط السابقة. أما الحساب المبني والمُحسَّن بشكل صحيح فيمتص هذه الضغوط بشكل أفضل بكثير، لأنه يتنافس على الملاءمة وجودة التحويل، لا على الميزانية وحدها.",
      ),
      h2("الحسابات الرابحة حالياً تشترك في ثلاث عادات"),
      p(
        "تُسعِّر هذه الحسابات العميل المحتمل وفق معدل إغلاقه، لا وفق تكلفته فقط. وتُغذي المنصة بنتائج المبيعات الفعلية لتتعلم كيف يبدو العميل المحتمل الجيد فعلاً، بدلاً من التحسين لتعبئة النماذج فقط. كما تتعامل مع بنية الحساب والتصاميم الإبداعية كأمور يجب تحسينها أسبوعياً، لا كحملة أُعدت مرة واحدة وتُركت تعمل.",
      ),
      h2("ماذا يعني هذا لميزانيتكم؟"),
      p(
        "ارتفاع سعر السوق للنقرات ليس سبباً للذعر أو لسحب الإنفاق. بل سبب للتحقق مما إذا كان حسابكم لا يزال يدفع السعر القديم في سوق جديد، أم أنه تكيّف بالفعل. وإذا كان [التسويق الرقمي](/ar/services/digital-marketing) جزءاً مهماً من خطة نموكم للعام المقبل، فهذا يستحق مراجعة جادة قبل دورة الميزانية القادمة، لا بعدها.",
      ),
      p(
        "إذا كنتم ترغبون في رأي ثانٍ حول حسابكم قبل ذلك، [احجزوا مكالمة قصيرة](/ar/contact) — سنخبركم بصراحة ما إذا كان الحل يكمن في الميزانية أو البنية أو كليهما. ولرؤية أوسع حول كيفية استجابة المنصات نفسها لطلب المعلنين، تتابع [رؤى Think with Google التسويقية](https://www.thinkwithgoogle.com/intl/en-emea/) التحولات الإقليمية التي تستحق القراءة إلى جانب بيانات حسابكم الخاص.",
      ),
    ],
    bodyRu: [
      p(
        "Каждый квартал в маркетинговых командах Дубая повторяется один и тот же разговор: цена за клик снова выросла, а точную причину назвать никто не может.",
      ),
      h2("Причина не одна — их три"),
      p(
        "Честный ответ в том, что единственной причины почти никогда не бывает. Одновременно накладываются три отдельных фактора давления, и каждого из них по отдельности хватило бы, чтобы поднять стоимость.",
      ),
      h3("Больше рекламодателей — тот же ограниченный объём показов"),
      p(
        "Аукционы Google и Meta распределяют фиксированное количество показов между любым числом рекламодателей, готовых за них бороться. База рекламодателей в Дубае растёт быстрее, чем пул пользователей с высоким намерением к покупке, — значит, больше бюджетов конкурируют за то же внимание, а аукцион по своей природе закладывает эту нехватку в цену.",
      ),
      h3("Платформы вознаграждают аккаунты, которые уже расходуют бюджет эффективно"),
      p(
        "Позиция объявления зависит не только от размера ставки. Системы показа Google Ads и Meta сильно учитывают релевантность и историческую эффективность — значит, хорошо оптимизированный аккаунт фактически платит меньшую реальную цену, чем плохо выстроенный аккаунт с той же ставкой. По мере того как всё больше рекламодателей выводят свои аккаунты на профессиональный уровень, планка «хорошей оптимизации» растёт вместе с ними — и все, кто ниже этой планки, платят больше за тот же результат.",
      ),
      h3("Категории, которые раньше были простыми, такими больше не являются"),
      p(
        "Пять лет назад недвижимость, гостиничный бизнес и образование были одними из самых лояльных к рекламе категорий. С тех пор все три превратились в по-настоящему конкурентные вертикали: крупные девелоперы, гостиничные группы и учреждения теперь содержат собственные штатные performance-команды вместо одного универсального маркетолога. Один только этот сдвиг объясняет значительную долю роста цены за клик именно в этих отраслях.",
      ),
      h2("Что на самом деле наказывает рост стоимости"),
      p(
        "Ничего из этого не делает платную рекламу более слабым каналом. Это лишь расширяет разрыв между хорошо управляемым аккаунтом и заброшенным. Аккаунт, оставленный на автопилоте — общие ключевые слова, неизменные креативы, отсутствие [обратной связи от CRM](/ru/services/crm-marketing-automation) о том, какие лиды реально закрылись, — платит полную цену за каждый из перечисленных факторов. А аккаунт, выстроенный и оптимизированный правильно, переносит их гораздо легче, потому что конкурирует за счёт релевантности и качества конверсии, а не только бюджета.",
      ),
      h2("Аккаунты, которые побеждают прямо сейчас, объединяют три привычки"),
      p(
        "Они оценивают лид по конверсии в сделку, а не только по стоимости. Они передают результаты продаж обратно в платформу, чтобы та понимала, как на самом деле выглядит хороший лид, а не оптимизировалась только под заполнение форм. И они относятся к структуре аккаунта и креативам как к тому, что нужно улучшать каждую неделю, а не как к кампании, запущенной один раз и оставленной работать самостоятельно.",
      ),
      h2("Что это значит для вашего бюджета"),
      p(
        "Рост рыночной цены за клик — не повод для паники или сокращения расходов. Это повод проверить, платит ли ваш аккаунт всё ещё старую цену на новом рынке или уже адаптировался к нему. Если [цифровой маркетинг](/ru/services/digital-marketing) занимает важное место в вашем плане роста на предстоящий год, это стоит внимательно изучить до начала следующего бюджетного цикла, а не после.",
      ),
      p(
        "Если хотите получить независимое мнение о своём аккаунте до этого момента, [запишитесь на короткий звонок](/ru/contact) — мы прямо скажем, в чём дело: в бюджете, в структуре или в обоих факторах сразу. Для более широкого взгляда на то, как сами платформы реагируют на спрос рекламодателей, [маркетинговые инсайты Think with Google](https://www.thinkwithgoogle.com/intl/en-emea/) отслеживают региональные тренды, которые стоит изучать наряду с данными вашего собственного аккаунта.",
      ),
    ],
  },
  {
    slug: "rising-ad-costs-uae-marketing-budgets",
    category: "market-news",
    title: "What Rising Ad Costs Mean for UAE Marketing Budgets",
    titleAr: "ماذا يعني ارتفاع تكاليف الإعلانات لميزانيات التسويق في الإمارات؟",
    titleRu: "Что рост стоимости рекламы значит для маркетинговых бюджетов в ОАЭ",
    seoTitle: "Rising Ad Costs & UAE Marketing Budgets: What to Do",
    seoTitleAr: "ارتفاع تكاليف الإعلانات وميزانيات التسويق في الإمارات: ما الذي يجب فعله؟",
    seoTitleRu: "Рост стоимости рекламы и бюджеты в ОАЭ: что делать",
    excerpt:
      "Cost per lead isn't the number to panic over. Cost per qualified lead, measured against what a sale is worth, is.",
    excerptAr:
      "تكلفة العميل المحتمل ليست الرقم الذي يستدعي القلق. بل تكلفة العميل المحتمل المؤهَّل، مقاسة مقابل قيمة الصفقة، هي الرقم المهم.",
    excerptRu:
      "Стоимость лида — не тот показатель, из-за которого стоит паниковать. Важна стоимость квалифицированного лида, измеренная относительно ценности сделки.",
    metaDescription:
      "Rising ad costs don't have to shrink your results. Here's how UAE marketing teams should reprice, protect and reallocate their budget when cost per lead climbs.",
    metaDescriptionAr:
      "ارتفاع تكاليف الإعلانات لا يعني بالضرورة تراجع نتائجكم. إليكم كيف يجب على فرق التسويق في الإمارات إعادة تسعير وحماية وإعادة توزيع ميزانيتها عند ارتفاع تكلفة العميل المحتمل.",
    metaDescriptionRu:
      "Рост стоимости рекламы не обязательно означает падение результатов. Рассказываем, как маркетинговым командам в ОАЭ пересматривать цены, защищать и перераспределять бюджет при росте стоимости лида.",
    date: "22 May 2026",
    readingTime: "5 min read",
    readingTimeAr: "5 دقائق قراءة",
    readingTimeRu: "5 мин чтения",
    image: sharedImages.marketNewsBanner,
    imageAlt: "A lit candle, journal and coffee cup beside a chessboard mid-game on a desk",
    imageAltAr: "شمعة مضاءة ودفتر يوميات وفنجان قهوة بجانب رقعة شطرنج في منتصف اللعبة على مكتب",
    imageAltRu: "Горящая свеча, блокнот и чашка кофе рядом с шахматной доской в разгар партии на столе",
    imageTopic: "What Rising Costs Mean",
    imageTopicAr: "معنى ارتفاع التكاليف",
    imageTopicRu: "Что значит рост стоимости",
    body: [
      p(
        "When cost per lead rises, the instinct is to cut spend or chase a cheaper platform. Both usually make the underlying problem worse.",
      ),
      h2("Cost Per Lead Is the Wrong Number to Panic Over"),
      p(
        "A rising cost per lead only threatens a budget if the lead's value hasn't been priced in. Brands that know their close rate and their revenue per channel can absorb a higher cost per click without panic, because they're judging the number against what it returns, not against last quarter's average.",
      ),
      h2("The Number That Actually Matters: Cost Per Qualified Lead"),
      p(
        "Cost per qualified lead adjusts for the one variable a raw lead count ignores: whether the lead was ever going to buy. Two channels can produce leads at the same cost per lead and still be worlds apart in value, if one sends through people who match your ideal customer and the other sends through anyone who filled a form for a discount.",
      ),
      h3("A Simple Illustration"),
      p(
        "Say a channel's cost per lead rises from AED 150 to AED 190 over a quarter — a 27% jump that would alarm most budget owners on its own. If that channel's close rate is 18% and its average deal size is AED 12,000, cost per qualified lead only moves from roughly AED 833 to AED 1,056, against a return that dwarfs both. The number that looked alarming in isolation is still comfortably profitable once it's judged against what a sale is actually worth.",
      ),
      h2("How to Budget When Costs Are Rising"),
      p(
        "Three moves, in order. First, reprice every channel by its cost per qualified lead, not its raw cost per lead — this alone changes which channel looks \"expensive.\" Second, protect the highest-converting channel's budget before trimming anywhere else, even if it isn't the cheapest one on paper. Third, resist reallocating spend on instinct; move it only once the first two steps show, in the numbers, where it's actually earning a better return.",
      ),
      h2("The Brands Handling This Well"),
      p(
        "They treat their [CRM and their ad accounts as one connected system](/services/crm-marketing-automation), so cost per qualified lead is a number they can see weekly rather than reconstruct at quarter's end. That single change tends to matter more to a budget's resilience than any amount of platform-hopping.",
      ),
      p(
        "If your team can't currently answer \"what's our cost per qualified lead by channel\" in under a minute, that's the gap worth closing before the next budget review — [our marketing consulting work](/services/marketing-consulting) usually starts exactly there. For a broader framework on budgeting through cost inflation, [HubSpot's marketing planning resources](https://blog.hubspot.com/marketing) are a solid general reference alongside your own numbers.",
      ),
      p(
        "Want a second set of eyes on your channel mix before you touch next quarter's budget? [Get in touch](/contact) and we'll walk through it with you.",
      ),
    ],
    bodyAr: [
      p(
        "عندما ترتفع تكلفة العميل المحتمل، يكون الدافع الغريزي هو خفض الإنفاق أو البحث عن منصة أرخص. كلا الخيارين عادة ما يزيدان المشكلة الأساسية سوءاً.",
      ),
      h2("تكلفة العميل المحتمل ليست الرقم الذي يستدعي القلق"),
      p(
        "ارتفاع تكلفة العميل المحتمل لا يهدد الميزانية إلا إذا لم تُحتسب قيمة ذلك العميل. فالعلامات التجارية التي تعرف معدل إغلاقها وإيراداتها لكل قناة يمكنها استيعاب ارتفاع تكلفة النقرة دون قلق، لأنها تحكم على الرقم مقابل ما يعود به، لا مقابل متوسط الربع الماضي.",
      ),
      h2("الرقم الذي يهم فعلاً: تكلفة العميل المحتمل المؤهَّل"),
      p(
        "تكلفة العميل المحتمل المؤهَّل تعدّل المتغير الوحيد الذي يتجاهله العدد الخام للعملاء المحتملين: هل كان هذا العميل سيشتري أصلاً أم لا. يمكن لقناتين أن تنتجا عملاء محتملين بنفس التكلفة لكل عميل وتبقيا مختلفتين تماماً في القيمة، إذا كانت إحداهما تجلب أشخاصاً يطابقون عميلكم المثالي والأخرى تجلب أي شخص عبّأ نموذجاً مقابل خصم.",
      ),
      h3("مثال مبسّط"),
      p(
        "لنفترض أن تكلفة العميل المحتمل في إحدى القنوات ارتفعت من 150 درهماً إلى 190 درهماً خلال ربع سنة — قفزة بنسبة 27% كافية بمفردها لإقلاق معظم المسؤولين عن الميزانية. لكن إذا كان معدل إغلاق هذه القناة 18% ومتوسط حجم الصفقة 12,000 درهم، فإن تكلفة العميل المحتمل المؤهَّل لا تتحرك إلا من نحو 833 درهماً إلى 1,056 درهماً، مقابل عائد يفوق الرقمين بكثير. الرقم الذي بدا مقلقاً بمعزل عن السياق يبقى مربحاً بشكل مريح متى حُكم عليه مقابل قيمة الصفقة الفعلية.",
      ),
      h2("كيف تضعون الميزانية عندما ترتفع التكاليف؟"),
      p(
        "ثلاث خطوات، بالترتيب. أولاً، أعيدوا تسعير كل قناة وفق تكلفة العميل المحتمل المؤهَّل، لا تكلفة العميل المحتمل الخام — هذا وحده يغيّر أي قناة تبدو «مكلفة». ثانياً، احموا ميزانية القناة الأعلى تحويلاً قبل التقليص من أي مكان آخر، حتى لو لم تكن الأرخص على الورق. ثالثاً، قاوموا إعادة توزيع الإنفاق بدافع الحدس؛ لا تحركوه إلا بعد أن تُظهر الخطوتان الأوليان، بالأرقام، أين يحقق فعلاً عائداً أفضل.",
      ),
      h2("العلامات التجارية التي تتعامل مع هذا جيداً"),
      p(
        "تتعامل مع [إدارة علاقات العملاء وحسابات إعلاناتها كنظام واحد متصل](/ar/services/crm-marketing-automation)، بحيث تكون تكلفة العميل المحتمل المؤهَّل رقماً يمكنها رؤيته أسبوعياً بدلاً من إعادة بنائه في نهاية الربع. هذا التغيير وحده غالباً ما يهم لمرونة الميزانية أكثر من أي قدر من التنقل بين المنصات.",
      ),
      p(
        "إذا كان فريقكم غير قادر حالياً على الإجابة عن سؤال «ما تكلفة عميلنا المحتمل المؤهَّل لكل قناة» في أقل من دقيقة، فهذه هي الفجوة التي تستحق الإغلاق قبل مراجعة الميزانية القادمة — [عملنا في الاستشارات التسويقية](/ar/services/marketing-consulting) عادة ما يبدأ من هناك بالضبط. ولإطار عمل أوسع حول وضع الميزانية في ظل تضخم التكاليف، تُعد [موارد HubSpot للتخطيط التسويقي](https://blog.hubspot.com/marketing) مرجعاً عاماً جيداً إلى جانب أرقامكم الخاصة.",
      ),
      p(
        "تريدون رأياً إضافياً حول مزيج قنواتكم قبل أن تلمسوا ميزانية الربع القادم؟ [تواصلوا معنا](/ar/contact) وسنستعرضها معكم.",
      ),
    ],
    bodyRu: [
      p(
        "Когда стоимость лида растёт, инстинктивная реакция — сократить расходы или искать более дешёвую платформу. Оба варианта обычно только усугубляют исходную проблему.",
      ),
      h2("Стоимость лида — не тот показатель, из-за которого стоит паниковать"),
      p(
        "Рост стоимости лида угрожает бюджету только тогда, когда ценность лида не учтена в расчётах. Бренды, которые знают свою конверсию в сделку и выручку по каждому каналу, способны спокойно выдержать более высокую цену за клик, потому что оценивают показатель относительно отдачи, а не среднего значения прошлого квартала.",
      ),
      h2("Показатель, который действительно важен: стоимость квалифицированного лида"),
      p(
        "Стоимость квалифицированного лида учитывает единственную переменную, которую игнорирует простой подсчёт лидов: собирался ли этот человек вообще покупать. Два канала могут генерировать лиды по одинаковой цене и при этом кардинально различаться по ценности — если один приводит людей, соответствующих вашему идеальному клиенту, а другой приводит любого, кто заполнил форму ради скидки.",
      ),
      h3("Простой пример"),
      p(
        "Допустим, стоимость лида в одном канале выросла со 150 до 190 дирхамов за квартал — скачок на 27%, который сам по себе встревожил бы большинство ответственных за бюджет. Но если конверсия этого канала в сделку составляет 18%, а средний размер сделки — 12 000 дирхамов, стоимость квалифицированного лида смещается лишь с примерно 833 до 1 056 дирхамов — на фоне отдачи, которая многократно превышает обе эти цифры. Показатель, выглядевший тревожным сам по себе, остаётся вполне прибыльным, если оценивать его относительно реальной ценности сделки.",
      ),
      h2("Как планировать бюджет при росте стоимости"),
      p(
        "Три шага по порядку. Во-первых, пересчитайте каждый канал по стоимости квалифицированного лида, а не по обычной стоимости лида — уже это меняет представление о том, какой канал кажется «дорогим». Во-вторых, защитите бюджет канала с самой высокой конверсией прежде, чем урезать что-либо ещё, даже если на бумаге он не самый дешёвый. В-третьих, не поддавайтесь инстинктивному перераспределению расходов — переносите бюджет только после того, как первые два шага покажут в цифрах, где отдача действительно выше.",
      ),
      h2("Бренды, которые справляются с этим правильно"),
      p(
        "Они относятся к [CRM и рекламным аккаунтам как к единой связанной системе](/ru/services/crm-marketing-automation), поэтому видят стоимость квалифицированного лида еженедельно, а не восстанавливают её задним числом в конце квартала. Одно только это изменение обычно значит для устойчивости бюджета больше, чем любые метания между платформами.",
      ),
      p(
        "Если ваша команда сейчас не может ответить на вопрос «какова стоимость квалифицированного лида по каждому каналу» меньше чем за минуту — это та самая брешь, которую стоит закрыть до следующего пересмотра бюджета. Именно с этого обычно начинается [наша работа в области маркетингового консалтинга](/ru/services/marketing-consulting). Для более широкого понимания планирования бюджета в условиях роста цен хорошим общим ориентиром наряду с вашими собственными цифрами послужат [материалы HubSpot по маркетинговому планированию](https://blog.hubspot.com/marketing).",
      ),
      p(
        "Хотите получить независимый взгляд на свой медиамикс, прежде чем трогать бюджет следующего квартала? [Свяжитесь с нами](/ru/contact) — мы разберём его вместе с вами.",
      ),
    ],
  },
  {
    slug: "real-cost-of-a-slow-website",
    category: "articles",
    title: "The Real Cost of a Slow Website",
    titleAr: "التكلفة الحقيقية لموقع إلكتروني بطيء",
    titleRu: "Реальная стоимость медленного сайта",
    seoTitle: "The Real Cost of a Slow Website (And How to Fix It)",
    seoTitleAr: "التكلفة الحقيقية لموقع بطيء (وكيفية إصلاحه)",
    seoTitleRu: "Реальная стоимость медленного сайта (и как это исправить)",
    excerpt:
      "A site that loads a second slower doesn't just frustrate visitors — it quietly taxes every campaign pointed at it.",
    excerptAr:
      "الموقع الذي يستغرق تحميله ثانية إضافية لا يُحبط الزوار فحسب — بل يفرض ضريبة صامتة على كل حملة تُوجَّه إليه.",
    excerptRu:
      "Сайт, который загружается на секунду дольше, не просто раздражает посетителей — он незаметно облагает налогом каждую кампанию, направленную на него.",
    metaDescription:
      "A slow website taxes every campaign pointed at it. Here's how page speed quietly erodes conversion rate, what actually causes the delay, and how to fix it without a full rebuild.",
    metaDescriptionAr:
      "الموقع البطيء يفرض ضريبة على كل حملة تُوجَّه إليه. إليكم كيف تتآكل نسبة التحويل بصمت بسبب بطء تحميل الصفحة، وما الذي يسبب هذا البطء فعلياً، وكيفية إصلاحه دون إعادة بناء كاملة.",
    metaDescriptionRu:
      "Медленный сайт облагает налогом каждую кампанию, направленную на него. Рассказываем, как скорость страницы незаметно съедает конверсию, что на самом деле вызывает задержку и как это исправить без полной пересборки.",
    date: "14 Jun 2026",
    readingTime: "6 min read",
    readingTimeAr: "6 دقائق قراءة",
    readingTimeRu: "6 мин чтения",
    image: "/images/insights/real-cost-slow-website-door-handle.jpg",
    imageAlt: "A hand turning an ornate brass door handle, wearing a wristwatch",
    imageAltAr: "يد تدير مقبض باب نحاسي مزخرف، ترتدي ساعة يد",
    imageAltRu: "Рука поворачивает декоративную латунную дверную ручку, на запястье — наручные часы",
    imageTopic: "The Real Cost of Slow",
    imageTopicAr: "التكلفة الحقيقية للبطء",
    imageTopicRu: "Реальная цена медлительности",
    body: [
      p(
        "Page speed rarely makes the agenda in a marketing review, because it doesn't look like a marketing problem. It behaves like one anyway.",
      ),
      h2("Why Speed Is a Conversion Problem, Not a Technical One"),
      p(
        "Every campaign — search, social, email — spends money to bring a visitor to a page. If that page is slow, a share of those visitors leave before it finishes loading, and the spend that brought them is gone with them. Industry benchmarks from [Google's web.dev](https://web.dev/articles/vitals) consistently show conversion rate dropping as load time crosses roughly the two- to three-second mark, which is precisely where a large share of Dubai's mobile traffic sits on an average landing page.",
      ),
      h2("What's Actually Causing the Delay"),
      p(
        "It's rarely the whole site. In most audits, a small handful of culprits account for nearly all of the delay.",
      ),
      h3("Unoptimised Images"),
      p(
        "A single hero photograph exported at full camera resolution can outweigh every other asset on a page combined. Compressing and correctly sizing images is usually the single highest-leverage fix available, and often the fastest one to ship.",
      ),
      h3("Third-Party Scripts"),
      p(
        "Chat widgets, ad pixels, analytics tags and embedded fonts each add their own request and their own render-blocking delay. Most sites accumulate these one integration at a time until nobody remembers what half of them are still doing there.",
      ),
      h3("No Caching or CDN Strategy"),
      p(
        "A page rebuilt from scratch on every visit, served from a single server far from the visitor, adds latency that has nothing to do with the page's design and everything to do with its infrastructure.",
      ),
      h2("The Fix Isn't Usually a Rebuild"),
      p(
        "Addressing the handful of assets and scripts actually responsible for the delay is typically a matter of weeks, not a new site. That's the approach we take inside [Website Development](/services/website-development) — audit first, rebuild only the parts the audit actually points to.",
      ),
      h2("Treat Speed as a Multiplier, Not a Line Item"),
      p(
        "Treated as a conversion problem rather than a technical one, speed is one of the few improvements that makes every other channel look better without asking for more budget. A faster site doesn't just convert better on its own traffic — it lowers the effective cost per lead of every paid campaign pointed at it, because fewer of the visitors that campaign paid for are lost before the page even finishes rendering.",
      ),
      p(
        "Curious what your own site's speed is actually costing you in lost leads? [Talk to us](/contact) about a straightforward audit — no rebuild pitch attached until we know there's a case for one.",
      ),
    ],
    bodyAr: [
      p(
        "نادراً ما يجد بطء الصفحة مكانه على جدول أعمال مراجعة تسويقية، لأنه لا يبدو مشكلة تسويقية. لكنه يتصرف كواحدة رغم ذلك.",
      ),
      h2("لماذا السرعة مشكلة تحويل، لا مشكلة تقنية؟"),
      p(
        "كل حملة — بحث، سوشيال ميديا، بريد إلكتروني — تنفق مالاً لجلب زائر إلى صفحة. إذا كانت تلك الصفحة بطيئة، يغادر جزء من هؤلاء الزوار قبل اكتمال تحميلها، ويذهب معهم الإنفاق الذي جلبهم. تُظهر المعايير القياسية من [منصة web.dev التابعة لجوجل](https://web.dev/articles/vitals) باستمرار انخفاض نسبة التحويل عندما يتجاوز وقت التحميل حاجز الثانيتين إلى ثلاث ثوانٍ تقريباً — وهي بالضبط النقطة التي يقف عندها جزء كبير من حركة المرور عبر الجوّال في دبي على صفحة هبوط متوسطة.",
      ),
      h2("ما الذي يسبب البطء فعلياً؟"),
      p(
        "نادراً ما يكون الموقع بأكمله هو السبب. في معظم عمليات التدقيق، تفسّر حفنة صغيرة من الأسباب الجزء الأكبر من البطء.",
      ),
      h3("الصور غير المُحسَّنة"),
      p(
        "صورة رئيسية واحدة مُصدَّرة بدقة الكاميرا الكاملة يمكن أن تفوق وزناً كل عنصر آخر في الصفحة مجتمعاً. ضغط الصور وتحجيمها بشكل صحيح عادة ما يكون الإصلاح الأعلى تأثيراً المتاح، وغالباً الأسرع تنفيذاً.",
      ),
      h3("نصوص برمجية من أطراف ثالثة"),
      p(
        "أدوات الدردشة وبكسلات الإعلانات وعلامات التحليلات والخطوط المدمجة، كل منها يضيف طلبه الخاص وتأخيره الخاص في العرض. تتراكم هذه الأدوات في معظم المواقع تدريجياً مع كل تكامل جديد، حتى لا يعود أحد يتذكر ما تفعله نصفها هناك.",
      ),
      h3("غياب استراتيجية تخزين مؤقت أو شبكة توصيل محتوى"),
      p(
        "الصفحة التي تُعاد بناؤها من الصفر مع كل زيارة، وتُقدَّم من خادم واحد بعيد عن الزائر، تضيف تأخيراً لا علاقة له بتصميم الصفحة وكل العلاقة ببنيتها التحتية.",
      ),
      h2("الإصلاح ليس عادة إعادة بناء كاملة"),
      p(
        "معالجة الحفنة القليلة من العناصر والنصوص البرمجية المسؤولة فعلياً عن التأخير عادة ما تستغرق أسابيع، لا موقعاً جديداً بالكامل. هذا هو النهج الذي نتبعه ضمن [تطوير المواقع الإلكترونية](/ar/services/website-development) — تدقيق أولاً، وإعادة بناء الأجزاء التي يشير إليها التدقيق فعلياً فقط.",
      ),
      h2("عاملوا السرعة كمُضاعِف، لا كبند تكلفة"),
      p(
        "عندما تُعامل السرعة كمشكلة تحويل لا كمشكلة تقنية، تصبح واحدة من التحسينات القليلة التي تجعل كل قناة أخرى تبدو أفضل دون طلب ميزانية إضافية. الموقع الأسرع لا يحوّل بشكل أفضل من حركة المرور الخاصة به فحسب — بل يخفّض التكلفة الفعلية للعميل المحتمل لكل حملة مدفوعة تُوجَّه إليه، لأن عدداً أقل من الزوار الذين دفعت الحملة لجلبهم يُفقدون قبل أن تكتمل الصفحة حتى في العرض.",
      ),
      p(
        "تتساءلون كم تكلفكم سرعة موقعكم فعلياً من عملاء محتملين مفقودين؟ [تحدثوا معنا](/ar/contact) حول تدقيق مباشر — دون أي عرض لإعادة بناء قبل أن نتأكد من وجود مبرر لذلك.",
      ),
    ],
    bodyRu: [
      p(
        "Скорость загрузки страницы редко попадает в повестку маркетингового обзора, потому что не выглядит маркетинговой проблемой. Тем не менее ведёт себя именно как она.",
      ),
      h2("Почему скорость — это проблема конверсии, а не техническая проблема"),
      p(
        "Каждая кампания — поиск, соцсети, email — тратит деньги, чтобы привести посетителя на страницу. Если страница медленная, часть этих посетителей уходит, не дождавшись загрузки, — и вместе с ними уходит потраченный на их привлечение бюджет. Отраслевые данные от [Google web.dev](https://web.dev/articles/vitals) стабильно показывают падение конверсии, когда время загрузки превышает отметку в две-три секунды, — а именно на этой отметке находится значительная часть мобильного трафика Дубая на среднестатистической посадочной странице.",
      ),
      h2("Что на самом деле вызывает задержку"),
      p(
        "Причина редко кроется во всём сайте целиком. В большинстве аудитов почти всю задержку объясняет небольшая горстка виновников.",
      ),
      h3("Неоптимизированные изображения"),
      p(
        "Одна-единственная главная фотография, экспортированная в полном разрешении камеры, может весить больше, чем все остальные элементы страницы вместе взятые. Сжатие и корректное масштабирование изображений обычно даёт наибольший эффект среди всех доступных решений — и часто внедряется быстрее всего.",
      ),
      h3("Скрипты сторонних сервисов"),
      p(
        "Виджеты чата, рекламные пиксели, теги аналитики и встроенные шрифты — каждый добавляет свой собственный запрос и свою задержку, блокирующую отрисовку. Большинство сайтов накапливают их постепенно, интеграция за интеграцией, пока никто уже не помнит, зачем там осталась половина из них.",
      ),
      h3("Отсутствие стратегии кеширования и CDN"),
      p(
        "Страница, которая заново собирается с нуля при каждом посещении и отдаётся с единственного сервера, удалённого от посетителя, добавляет задержку, никак не связанную с дизайном страницы, но полностью зависящую от её инфраструктуры.",
      ),
      h2("Решение обычно не требует пересборки"),
      p(
        "Устранение той самой горстки файлов и скриптов, реально ответственных за задержку, обычно занимает недели, а не требует нового сайта. Именно такой подход мы применяем в рамках направления [«Веб-разработка»](/ru/services/website-development) — сначала аудит, и пересборка только тех частей, на которые он реально указывает.",
      ),
      h2("Относитесь к скорости как к множителю, а не как к строке бюджета"),
      p(
        "Если рассматривать скорость как проблему конверсии, а не техническую деталь, она становится одним из немногих улучшений, которое делает лучше вообще каждый канал — без запроса дополнительного бюджета. Более быстрый сайт не просто лучше конвертирует свой собственный трафик — он снижает фактическую стоимость лида для каждой платной кампании, направленной на него, потому что меньше оплаченных этой кампанией посетителей теряется ещё до того, как страница успевает полностью отрисоваться.",
      ),
      p(
        "Интересно, во сколько потерянных лидов реально обходится скорость вашего сайта? [Свяжитесь с нами](/ru/contact) — предложим честный аудит без навязывания пересборки, пока мы не убедимся, что для неё действительно есть основания.",
      ),
    ],
  },
  {
    slug: "why-crm-rollouts-fail-before-they-start",
    category: "articles",
    title: "Why Most CRM Rollouts Fail Before They Start",
    titleAr: "لماذا تفشل معظم عمليات نشر إدارة علاقات العملاء قبل أن تبدأ؟",
    titleRu: "Почему большинство внедрений CRM проваливаются, ещё не начавшись",
    seoTitle: "Why Most CRM Rollouts Fail (and How to Fix It)",
    seoTitleAr: "لماذا تفشل معظم عمليات نشر CRM؟ (وكيفية إصلاحها)",
    seoTitleRu: "Почему большинство внедрений CRM проваливаются (и как это исправить)",
    excerpt:
      "The software is rarely the problem. Routing, ownership and the first five minutes after a lead arrives usually are.",
    excerptAr:
      "البرمجية نادراً ما تكون المشكلة. التوجيه والملكية والدقائق الخمس الأولى بعد وصول العميل المحتمل هي المشكلة عادة.",
    excerptRu:
      "Программное обеспечение редко бывает проблемой. Обычно проблема — в маршрутизации, ответственности и первых пяти минутах после появления лида.",
    metaDescription:
      "Most CRM rollouts fail before they start — and it's rarely the software. Here's why routing, ownership and the first five minutes after a lead arrives matter more than the platform you choose.",
    metaDescriptionAr:
      "معظم عمليات نشر إدارة علاقات العملاء تفشل قبل أن تبدأ — ونادراً ما يكون السبب البرمجية. إليكم لماذا يهم التوجيه والملكية والدقائق الخمس الأولى بعد وصول العميل المحتمل أكثر من المنصة التي تختارونها.",
    metaDescriptionRu:
      "Большинство внедрений CRM проваливаются, ещё не начавшись, — и дело редко в софте. Рассказываем, почему маршрутизация, ответственность и первые пять минут после появления лида важнее выбранной платформы.",
    date: "9 Apr 2026",
    readingTime: "5 min read",
    readingTimeAr: "5 دقائق قراءة",
    readingTimeRu: "5 мин чтения",
    image: "/images/insights/crm-rollouts-fail-paintbrushes.jpg",
    imageAlt: "A hand reaching for a paintbrush among a jar of brushes, in black and white",
    imageAltAr: "يد تمتد نحو فرشاة رسم وسط وعاء من الفرش، بالأبيض والأسود",
    imageAltRu: "Рука тянется за кистью среди банки с кистями, чёрно-белое фото",
    imageTopic: "Why CRM Rollouts Fail",
    imageTopicAr: "أسباب فشل عمليات نشر CRM",
    imageTopicRu: "Почему проваливаются внедрения CRM",
    body: [
      p(
        "Ask a sales team why they don't use the CRM properly and the software is rarely the honest answer. The real answer is usually that nobody decided who owns a lead the moment it arrives.",
      ),
      h2("The Software Isn't the Problem"),
      p(
        "A CRM configured without clear routing and scoring becomes a place leads go to wait, not a system that moves them forward. That's a process gap dressed up as a technology complaint, and it survives every platform migration until someone fixes the process underneath it — which is why switching from one CRM to another rarely solves it on its own.",
      ),
      h2("The First Five Minutes Decide Almost Everything"),
      p(
        "Response time is the single biggest predictor of whether a lead ever becomes a conversation. A lead contacted within five minutes of arriving converts at multiples of the rate of one contacted an hour later, and by the next morning the odds have collapsed further still. Most CRM rollouts never set that clock explicitly — routing exists, but nothing enforces speed.",
      ),
      h3("What Good Routing Actually Looks Like"),
      p(
        "Ownership assigned automatically, by rule, the instant a lead arrives — not by whoever happens to check the inbox next. A visible timer on every unassigned lead. An escalation path when the first-line owner doesn't respond in the window that matters. None of this requires enterprise software; it requires someone to decide the rules before go-live, not after the first quarter of complaints.",
      ),
      h2("Scoring Comes Second, Not First"),
      p(
        "Teams often reach for lead scoring before routing is solid, hoping a score will fix a process that was never going to work regardless of which leads it prioritised. Scoring is genuinely useful once ownership and response time are settled — it tells a busy sales team which of their assigned leads to call first. Before that, it's polish on a system that isn't running yet.",
      ),
      h2("Where This Connects Back to Marketing"),
      p(
        "A CRM that captures ownership and response time correctly is also the only kind that can tell marketing which channels are producing leads that actually close, not just leads that arrive. That feedback loop is what [CRM & Marketing Automation](/services/crm-marketing-automation) is built to set up — not a bigger system, a better-run one, wired into the campaigns that feed it.",
      ),
      p(
        "Fix ownership and response time first. The system almost always looks fine once that's settled. If your team suspects the gap is process rather than platform, [we're happy to take a look](/contact) before recommending anything new.",
      ),
    ],
    bodyAr: [
      p(
        "اسألوا فريق مبيعات لماذا لا يستخدم إدارة علاقات العملاء بشكل صحيح، ونادراً ما تكون البرمجية الإجابة الصادقة. الإجابة الحقيقية عادة ما تكون أن لا أحد قرر من يملك العميل المحتمل لحظة وصوله.",
      ),
      h2("البرمجية ليست المشكلة"),
      p(
        "نظام إدارة علاقات عملاء مُهيَّأ دون توجيه وتقييم واضحين يصبح مكاناً ينتظر فيه العملاء المحتملون، لا نظاماً يدفعهم إلى الأمام. هذه فجوة في العملية متنكرة في هيئة شكوى تقنية، وتنجو من كل عملية ترحيل بين منصات حتى يصلح أحدهم العملية الكامنة تحتها — وهذا هو سبب ندرة حل المشكلة بمجرد الانتقال من نظام إلى آخر.",
      ),
      h2("الدقائق الخمس الأولى تحدد كل شيء تقريباً"),
      p(
        "زمن الاستجابة هو أكبر عامل منفرد يتنبأ بما إذا كان العميل المحتمل سيتحول يوماً إلى محادثة فعلية. العميل المحتمل الذي يُتواصل معه خلال خمس دقائق من وصوله يتحول بأضعاف معدل تحويل من يُتواصل معه بعد ساعة، وبحلول الصباح التالي تنهار الاحتمالات أكثر. معظم عمليات نشر إدارة علاقات العملاء لا تضبط هذه الساعة صراحة أبداً — فالتوجيه موجود، لكن لا شيء يفرض السرعة.",
      ),
      h3("كيف يبدو التوجيه الجيد فعلياً؟"),
      p(
        "ملكية تُسند تلقائياً، وفق قاعدة، لحظة وصول العميل المحتمل — لا لمن يصادف أن يتفقد صندوق الوارد لاحقاً. مؤقّت مرئي على كل عميل محتمل غير مُسنَد. مسار تصعيد عندما لا يستجيب المالك الأول خلال النافذة الزمنية المهمة. لا شيء من هذا يتطلب برمجيات مؤسسية؛ بل يتطلب أن يقرر أحدهم القواعد قبل الإطلاق، لا بعد أول ربع سنة من الشكاوى.",
      ),
      h2("التقييم يأتي ثانياً، لا أولاً"),
      p(
        "غالباً ما تلجأ الفرق إلى تقييم العملاء المحتملين قبل أن يكون التوجيه راسخاً، على أمل أن يصلح التقييم عملية لم تكن لتنجح أصلاً بغض النظر عن العملاء الذين تعطيهم الأولوية. التقييم مفيد فعلاً بمجرد استقرار الملكية وزمن الاستجابة — فهو يخبر فريق المبيعات المشغول بأي من عملائه المحتملين المُسندين يجب الاتصال أولاً. قبل ذلك، هو مجرد تجميل لنظام لم يبدأ العمل بعد.",
      ),
      h2("أين يتصل هذا بالتسويق مجدداً؟"),
      p(
        "نظام إدارة علاقات العملاء الذي يلتقط الملكية وزمن الاستجابة بشكل صحيح هو أيضاً النوع الوحيد القادر على إخبار التسويق بأي القنوات تنتج عملاء محتملين يُغلقون فعلاً، لا مجرد عملاء يصلون. حلقة التغذية الراجعة هذه هي ما بُنيت [إدارة علاقات العملاء وأتمتة التسويق](/ar/services/crm-marketing-automation) لإعدادها — ليس نظاماً أكبر، بل نظاماً يُدار بشكل أفضل، متصلاً بالحملات التي تغذيه.",
      ),
      p(
        "أصلحوا الملكية وزمن الاستجابة أولاً. يبدو النظام دائماً تقريباً بخير بمجرد استقرار ذلك. إذا كان فريقكم يشتبه في أن الفجوة عملية لا منصة، [يسعدنا إلقاء نظرة](/ar/contact) قبل التوصية بأي شيء جديد.",
      ),
    ],
    bodyRu: [
      p(
        "Спросите отдел продаж, почему они не пользуются CRM как следует, и софт редко окажется честным ответом. Настоящая причина обычно в том, что никто не определил, кто отвечает за лид в момент его появления.",
      ),
      h2("Проблема не в программном обеспечении"),
      p(
        "CRM, настроенная без чёткой маршрутизации и оценки, превращается в место, где лиды просто ждут, а не в систему, которая продвигает их вперёд. Это пробел в процессе, замаскированный под техническую претензию, — и он переживает любую миграцию между платформами, пока кто-то не исправит сам процесс. Именно поэтому переход с одной CRM на другую сам по себе редко решает проблему.",
      ),
      h2("Первые пять минут решают почти всё"),
      p(
        "Скорость ответа — самый весомый фактор, определяющий, превратится ли лид в разговор. Лид, с которым связались в течение пяти минут после появления, конвертируется в разы чаще, чем тот, с кем связались через час, а к следующему утру шансы падают ещё сильнее. В большинстве внедрений CRM этот отсчёт времени никогда не задаётся явно — маршрутизация существует, но скорость никак не контролируется.",
      ),
      h3("Как на самом деле выглядит хорошая маршрутизация"),
      p(
        "Ответственность назначается автоматически, по заданному правилу, в момент появления лида — а не тем, кто первым заглянул во входящие. Видимый таймер на каждом неназначенном лиде. Механизм эскалации, если первый ответственный не реагирует в критическое окно времени. Ничего из этого не требует корпоративного ПО — требуется лишь, чтобы кто-то определил правила до запуска, а не после первого квартала жалоб.",
      ),
      h2("Оценка лидов идёт второй, а не первой"),
      p(
        "Команды часто хватаются за оценку лидов ещё до того, как маршрутизация выстроена, надеясь, что оценка исправит процесс, который в любом случае не работал бы — независимо от того, каким лидам она отдаёт приоритет. Оценка становится по-настоящему полезной только после того, как определены ответственность и скорость реакции: она подсказывает загруженному отделу продаж, кому из назначенных лидов звонить в первую очередь. До этого момента это лишь полировка системы, которая ещё не работает.",
      ),
      h2("Где это снова связано с маркетингом"),
      p(
        "CRM, которая корректно фиксирует ответственность и скорость реакции, — единственная, способная сказать маркетингу, какие каналы приносят лиды, реально закрывающиеся в сделку, а не просто прибывающие. Именно эту петлю обратной связи выстраивает направление [«CRM и маркетинговая автоматизация»](/ru/services/crm-marketing-automation) — не более крупную систему, а более грамотно выстроенную, подключённую к питающим её кампаниям.",
      ),
      p(
        "Сначала наведите порядок с ответственностью и скоростью реакции. Как только это выстроено, система почти всегда оказывается в порядке. Если ваша команда подозревает, что дело в процессе, а не в платформе, [мы с удовольствием во всём разберёмся](/ru/contact), прежде чем рекомендовать что-либо новое.",
      ),
    ],
  },
  {
    slug: "ai-search-changing-what-ranking-means",
    category: "trends-and-insights",
    title: "AI Search Is Changing What 'Ranking' Means",
    titleAr: "البحث بالذكاء الاصطناعي يغيّر معنى «الترتيب»",
    titleRu: "ИИ-поиск меняет значение слова «ранжирование»",
    seoTitle: "AI Search & SEO: What 'Ranking' Means Now",
    seoTitleAr: "البحث بالذكاء الاصطناعي وتحسين محركات البحث: ماذا يعني «الترتيب» الآن؟",
    seoTitleRu: "ИИ-поиск и SEO: что теперь значит «ранжирование»",
    excerpt:
      "Being first on a results page matters less when the answer is assembled before the click. Here's what that shift asks of a website.",
    excerptAr:
      "أن تكون الأول في صفحة النتائج يهم أقل عندما تُجمَّع الإجابة قبل النقرة. إليكم ما يتطلبه هذا التحول من موقعكم.",
    excerptRu:
      "Быть первым на странице результатов значит меньше, когда ответ собирается ещё до клика. Рассказываем, чего этот сдвиг требует от сайта.",
    metaDescription:
      "AI-generated search answers are changing what SEO ranking means. Here's what the shift from position one to answer citation actually asks of your website's content and structure.",
    metaDescriptionAr:
      "الإجابات المُولَّدة بالذكاء الاصطناعي في البحث تغيّر معنى الترتيب في تحسين محركات البحث. إليكم ما يتطلبه فعلياً التحول من المرتبة الأولى إلى الاستشهاد داخل الإجابة من محتوى موقعكم وبنيته.",
    metaDescriptionRu:
      "Ответы, сгенерированные ИИ, меняют смысл ранжирования в SEO. Рассказываем, чего на самом деле требует переход от первой позиции к цитированию в ответе — от контента и структуры вашего сайта.",
    date: "28 Jul 2026",
    readingTime: "6 min read",
    readingTimeAr: "6 دقائق قراءة",
    readingTimeRu: "6 мин чтения",
    image: "/images/insights/ai-search-ranking-gallery-wall.jpg",
    imageAlt: "A wall of framed prints and drawings arranged in a considered gallery hang",
    imageAltAr: "جدار من اللوحات والرسومات المؤطرة، مُرتَّبة بعناية على طريقة صالات العرض",
    imageAltRu: "Стена с оформленными в рамы гравюрами и рисунками, размещёнными в продуманной галерейной развеске",
    imageTopic: "AI Search, Redefined",
    imageTopicAr: "البحث بالذكاء الاصطناعي، مُعاد تعريفه",
    imageTopicRu: "ИИ-поиск: новое определение",
    body: [
      p(
        "For twenty years, SEO has been a competition for position one. AI-generated answers change what's being competed for: not a spot on a page, but a mention inside an answer that may never lead to a click at all.",
      ),
      h2("From Ranking a Page to Being Cited in an Answer"),
      p(
        "A conventional results page still rewards the page that ranks first. An AI-generated answer instead assembles a response from several sources at once, citing the ones it judges most directly useful, and the searcher may read that answer without visiting any site at all. The competition has moved from \"who ranks first\" to \"who gets cited,\" and those are judged by different standards.",
      ),
      h2("The Technical Groundwork Barely Changes"),
      p(
        "Indexable pages, clear structure, content that actually answers the question asked — none of that disappears. [Google's own Search Central documentation](https://developers.google.com/search/docs/fundamentals/seo-starter-guide) still describes the same fundamentals that have applied for years: crawlable pages, descriptive headings, and content written for the reader first. What changes is the standard those fundamentals are held to.",
      ),
      h3("Thin Content No Longer Limps Into Position Five"),
      p(
        "A page that once ranked adequately by covering a topic in general terms, padded to a target word count, doesn't get cited by an answer engine built to be selective. The systems assembling answers are choosier than the search results they're replacing, because they're synthesising a single response rather than offering ten options and letting the searcher judge.",
      ),
      h3("Specificity Is the New Differentiator"),
      p(
        "Pages that answer one question precisely — with a real number, a clear structure, a directly stated conclusion — are easier for an answer engine to extract and trust than pages that hedge across several related topics at once. This rewards genuinely useful, specific content over broad, keyword-stuffed pages more decisively than classic SEO ever did.",
      ),
      h2("What This Asks of a Website"),
      p(
        "Structure content around the actual questions your customers ask, in the language they use to ask them. Use headings that state the answer, not just the topic. Back claims with real specifics rather than vague reassurance. This is, not coincidentally, close to what good [SEO](/services/seo) work has always aimed for — the shift raises the cost of doing it badly rather than inventing a new discipline.",
      ),
      h2("Who's Winning and Who's Losing"),
      p(
        "The brands that treated SEO as a checklist are the ones losing visibility. The brands that treated it as writing the clearest answer on the internet are, if anything, gaining it — their content was already built for a reader that wants a direct answer, which is exactly what an answer engine is built to extract.",
      ),
      p(
        "If your content strategy hasn't been reviewed since before AI-generated answers became common in search, that's worth revisiting now rather than after visibility has already slipped. [Talk to our team](/contact) about where your site currently stands.",
      ),
    ],
    bodyAr: [
      p(
        "لعشرين عاماً، كان تحسين محركات البحث سباقاً على المرتبة الأولى. الإجابات المُولَّدة بالذكاء الاصطناعي تغيّر موضوع التنافس: ليس مكاناً في صفحة، بل ذكراً داخل إجابة قد لا تؤدي أبداً إلى نقرة.",
      ),
      h2("من ترتيب صفحة إلى الاستشهاد داخل إجابة"),
      p(
        "لا تزال صفحة النتائج التقليدية تكافئ الصفحة التي تحتل المرتبة الأولى. أما الإجابة المُولَّدة بالذكاء الاصطناعي فتجمع رداً من عدة مصادر في آن واحد، وتستشهد بما تراه الأكثر فائدة مباشرة، وقد يقرأ الباحث تلك الإجابة دون زيارة أي موقع على الإطلاق. انتقل التنافس من «من يحتل المرتبة الأولى» إلى «من يُستشهد به»، وهذان معياران مختلفان تماماً.",
      ),
      h2("الأساس التقني بالكاد يتغيّر"),
      p(
        "الصفحات القابلة للفهرسة، والبنية الواضحة، والمحتوى الذي يجيب فعلاً عن السؤال المطروح — لا شيء من ذلك يختفي. لا تزال [وثائق Google Search Central](https://developers.google.com/search/docs/fundamentals/seo-starter-guide) تصف الأساسيات نفسها التي طُبِّقت لسنوات: صفحات قابلة للزحف، عناوين وصفية، ومحتوى مكتوب للقارئ أولاً. ما يتغيّر هو المعيار الذي تُقاس به هذه الأساسيات.",
      ),
      h3("المحتوى الضعيف لم يعد يتعثر إلى المرتبة الخامسة"),
      p(
        "الصفحة التي كانت تحتل مرتبة مقبولة سابقاً بتغطية موضوع بعبارات عامة، محشوة لبلوغ عدد كلمات مستهدف، لا يستشهد بها محرك إجابات مصمم ليكون انتقائياً. الأنظمة التي تجمع الإجابات أكثر انتقائية من نتائج البحث التي تحل محلها، لأنها تُركِّب رداً واحداً بدلاً من تقديم عشرة خيارات وترك الباحث يحكم.",
      ),
      h3("التحديد هو عامل التمايز الجديد"),
      p(
        "الصفحات التي تجيب عن سؤال واحد بدقة — برقم حقيقي، وبنية واضحة، واستنتاج مذكور مباشرة — أسهل على محرك الإجابات في استخلاصها والوثوق بها من الصفحات التي تراوغ بين عدة مواضيع مترابطة في آن واحد. هذا يكافئ المحتوى المفيد فعلاً والمحدد على حساب الصفحات العامة المحشوة بالكلمات المفتاحية بشكل أكثر حسماً من تحسين محركات البحث الكلاسيكي.",
      ),
      h2("ماذا يتطلب هذا من الموقع؟"),
      p(
        "نظّموا المحتوى حول الأسئلة الفعلية التي يطرحها عملاؤكم، باللغة التي يستخدمونها لطرحها. استخدموا عناوين تذكر الإجابة، لا الموضوع فقط. ادعموا الادعاءات بتفاصيل حقيقية بدلاً من طمأنة غامضة. هذا، وليس من قبيل الصدفة، قريب مما استهدفه دائماً عمل [تحسين محركات البحث](/ar/services/seo) الجيد — فالتحول يرفع تكلفة القيام بذلك بشكل سيئ بدلاً من ابتكار تخصص جديد.",
      ),
      h2("من يربح ومن يخسر"),
      p(
        "العلامات التجارية التي تعاملت مع تحسين محركات البحث كقائمة مهام هي التي تخسر الظهور. أما العلامات التجارية التي تعاملت معه ككتابة أوضح إجابة على الإنترنت فهي، إن حدث أي تغيير، تكسب المزيد منه — كان محتواها مبنياً بالفعل لقارئ يريد إجابة مباشرة، وهو بالضبط ما صُمم محرك الإجابات لاستخلاصه.",
      ),
      p(
        "إذا لم تُراجَع استراتيجية المحتوى لديكم منذ ما قبل أن تصبح الإجابات المُولَّدة بالذكاء الاصطناعي شائعة في البحث، فهذا يستحق المراجعة الآن بدلاً من بعد أن يتراجع الظهور فعلاً. [تحدثوا مع فريقنا](/ar/contact) حول أين يقف موقعكم حالياً.",
      ),
    ],
    bodyRu: [
      p(
        "Двадцать лет SEO было гонкой за первую позицию. Ответы, сгенерированные ИИ, меняют сам предмет борьбы: теперь важна не позиция на странице, а упоминание внутри ответа, которое, возможно, вообще никогда не приведёт к клику.",
      ),
      h2("От ранжирования страницы к цитированию в ответе"),
      p(
        "Классическая страница результатов по-прежнему вознаграждает страницу, занявшую первое место. Ответ, сгенерированный ИИ, вместо этого собирает результат сразу из нескольких источников, ссылаясь на те, что он считает наиболее полезными напрямую, — и пользователь может прочитать этот ответ, вообще не заходя ни на один сайт. Конкуренция сместилась от «кто первый в рейтинге» к «на кого сослались», а это оценивается по совершенно другим критериям.",
      ),
      h2("Техническая основа почти не меняется"),
      p(
        "Индексируемые страницы, понятная структура, контент, который действительно отвечает на заданный вопрос, — ничто из этого не исчезает. [Документация Google Search Central](https://developers.google.com/search/docs/fundamentals/seo-starter-guide) по-прежнему описывает те же базовые принципы, что действовали годами: страницы, доступные для сканирования, содержательные заголовки и контент, написанный в первую очередь для читателя. Меняется лишь планка, по которой оценивается соответствие этим принципам.",
      ),
      h3("Слабый контент больше не дотягивает даже до пятой позиции"),
      p(
        "Страница, которая раньше вполне неплохо ранжировалась за счёт общих формулировок и «разбавления» до нужного количества слов, не получает цитирования от ИИ-движка, изначально настроенного на избирательность. Системы, собирающие ответы, требовательнее, чем результаты поиска, которые они заменяют, — ведь они синтезируют один-единственный ответ, а не предлагают десять вариантов на выбор пользователя.",
      ),
      h3("Конкретика — новый фактор отличия"),
      p(
        "Страницы, которые точно отвечают на один вопрос — с реальной цифрой, чёткой структурой, прямо сформулированным выводом, — ИИ-движку проще извлечь и им проще довериться, чем страницам, которые размыто затрагивают сразу несколько смежных тем. Это вознаграждает по-настоящему полезный, конкретный контент в противовес широким, перегруженным ключевыми словами страницам гораздо решительнее, чем когда-либо делало классическое SEO.",
      ),
      h2("Чего это требует от сайта"),
      p(
        "Стройте контент вокруг реальных вопросов, которые задают ваши клиенты, — на том языке, каким они их задают. Используйте заголовки, которые формулируют ответ, а не просто обозначают тему. Подкрепляйте утверждения конкретными фактами, а не расплывчатыми заверениями. И это, что не случайно, очень близко к тому, к чему всегда стремилась качественная работа над [SEO](/ru/services/seo) — этот сдвиг лишь повышает цену плохого исполнения, а не создаёт новую дисциплину.",
      ),
      h2("Кто выигрывает, а кто проигрывает"),
      p(
        "Бренды, которые относились к SEO как к чек-листу, теряют видимость. Бренды, которые воспринимали его как написание самого понятного ответа в интернете, наоборот, только выигрывают — их контент изначально создавался для читателя, которому нужен прямой ответ, а именно это и призван извлекать ИИ-движок.",
      ),
      p(
        "Если ваша контент-стратегия не пересматривалась с тех пор, как сгенерированные ИИ ответы стали обычным явлением в поиске, стоит вернуться к ней сейчас, а не после того, как видимость уже упадёт. [Поговорите с нашей командой](/ru/contact) о том, в какой точке сейчас находится ваш сайт.",
      ),
    ],
  },
  {
    slug: "from-leads-to-pipeline",
    category: "trends-and-insights",
    title: "The Shift From Leads to Pipeline",
    titleAr: "التحول من العملاء المحتملين إلى خط الأنابيب",
    titleRu: "Переход от лидов к воронке продаж",
    seoTitle: "From Leads to Pipeline: A Better Marketing Metric",
    seoTitleAr: "من العملاء المحتملين إلى خط الأنابيب: مقياس تسويقي أفضل",
    seoTitleRu: "От лидов к воронке продаж: более точная маркетинговая метрика",
    excerpt:
      "More Dubai brands are judging marketing by what closes, not by what fills a spreadsheet. It changes what 'working' looks like.",
    excerptAr:
      "المزيد من العلامات التجارية في دبي تحكم على التسويق بما يُغلق فعلاً، لا بما يملأ جدول بيانات. هذا يغيّر معنى «النجاح».",
    excerptRu:
      "Всё больше брендов в Дубае оценивают маркетинг по тому, что реально закрывается в сделку, а не по тому, что заполняет таблицу. Это меняет само понятие «результата».",
    metaDescription:
      "More Dubai brands are judging marketing by pipeline, not lead count. Here's why the shift from leads to pipeline changes what a 'working' marketing channel actually looks like.",
    metaDescriptionAr:
      "المزيد من العلامات التجارية في دبي تحكم على التسويق بخط الأنابيب، لا بعدد العملاء المحتملين. إليكم لماذا يغيّر هذا التحول ما تبدو عليه القناة التسويقية «الناجحة» فعلاً.",
    metaDescriptionRu:
      "Всё больше брендов в Дубае оценивают маркетинг по воронке продаж, а не по количеству лидов. Рассказываем, почему этот сдвиг меняет представление о том, как выглядит по-настоящему «работающий» маркетинговый канал.",
    date: "11 Mar 2026",
    readingTime: "5 min read",
    readingTimeAr: "5 دقائق قراءة",
    readingTimeRu: "5 мин чтения",
    image: "/images/insights/leads-to-pipeline-travel-notebook.jpg",
    imageAlt: "A hand writing a route of destinations in a notebook beside a laptop and coffee",
    imageAltAr: "يد تكتب مسار وجهات في دفتر ملاحظات بجانب حاسوب محمول وفنجان قهوة",
    imageAltRu: "Рука записывает маршрут с пунктами назначения в блокноте рядом с ноутбуком и кофе",
    imageTopic: "Leads to Pipeline",
    imageTopicAr: "من العملاء المحتملين إلى خط الأنابيب",
    imageTopicRu: "От лидов к воронке продаж",
    body: [
      p(
        "A marketing report full of lead counts can look excellent and mean very little. Pipeline — leads a sales team actually wants to work — is a smaller, harder number, and a far more honest one.",
      ),
      h2("Why Lead Count Is an Easy Number to Fake"),
      p(
        "Lead count rewards volume above all else, and volume is the easiest metric in marketing to inflate — looser targeting, a bigger incentive on a form, a lower bar for what counts as a \"qualified\" click. None of that requires the lead to be worth anything to the business receiving it. A channel can hit every lead-count target on a dashboard while quietly producing nothing sales wants to touch.",
      ),
      h2("What Changes When CRM and Ad Data Connect"),
      p(
        "The shift toward pipeline as the headline metric isn't a fashion. It's what happens once a business connects its [CRM to its ad accounts](/services/crm-marketing-automation) and sees, for the first time, which channels bring leads that close and which just bring leads. That connection is usually the first moment a marketing report and a sales report agree with each other.",
      ),
      h3("A Case in Point"),
      p(
        "It's common for a channel producing the most leads on a monthly report to rank near the bottom on pipeline once sales outcomes are attached to each one — and for a smaller, quieter channel to rank near the top. Neither fact is visible from lead count alone; both only surface once the two systems are actually talking to each other.",
      ),
      h2("What 'Working' Starts to Mean"),
      p(
        "Once that connection exists, \"more leads\" stops being the goal on its own. \"More of the leads that closed last quarter\" becomes the brief — a smaller target, and a much better one. Budget decisions stop being a negotiation over which channel feels more active and start being a straightforward read of which channel management can already see driving revenue.",
      ),
      h2("How to Start Measuring This Way"),
      p(
        "Three prerequisites, roughly in order: a CRM that records where every lead came from, sales stages that map cleanly onto marketing's channel data, and a shared report both teams actually look at — not two separate dashboards that never get compared. None of these require new tooling so much as connecting what most businesses already have.",
      ),
      p(
        "If your marketing and sales numbers currently live in two systems that don't talk to each other, that's the gap worth closing first. [Get in touch](/contact) and we'll show you what connecting them tends to reveal.",
      ),
    ],
    bodyAr: [
      p(
        "تقرير تسويقي مليء بأعداد العملاء المحتملين قد يبدو ممتازاً ويعني القليل جداً. أما خط الأنابيب — العملاء المحتملون الذين يريد فريق المبيعات فعلاً العمل عليهم — فهو رقم أصغر وأصعب، وأكثر صدقاً بكثير.",
      ),
      h2("لماذا عدد العملاء المحتملين رقم سهل التزييف؟"),
      p(
        "يكافئ عدد العملاء المحتملين الحجم فوق كل شيء آخر، والحجم هو أسهل مقياس في التسويق يمكن تضخيمه — استهداف أقل دقة، حافز أكبر على نموذج، معيار أدنى لما يُحتسب نقرة «مؤهَّلة». لا شيء من هذا يتطلب أن يكون للعميل المحتمل أي قيمة للشركة المستقبِلة له. يمكن لقناة أن تحقق كل هدف لعدد العملاء المحتملين على لوحة بيانات بينما لا تنتج فعلياً شيئاً يريد المبيعات لمسه.",
      ),
      h2("ما الذي يتغيّر عند اتصال بيانات إدارة علاقات العملاء والإعلانات؟"),
      p(
        "التحول نحو خط الأنابيب كمقياس رئيسي ليس موضة عابرة. بل ما يحدث بمجرد أن تربط شركة [إدارة علاقات عملائها بحسابات إعلاناتها](/ar/services/crm-marketing-automation) وترى، للمرة الأولى، أي القنوات تجلب عملاء محتملين يُغلقون وأيها يجلب عملاء محتملين فقط. هذا الاتصال عادة ما يكون أول لحظة يتفق فيها تقرير تسويقي مع تقرير مبيعات.",
      ),
      h3("مثال توضيحي"),
      p(
        "من الشائع أن تحتل قناة تنتج أكبر عدد من العملاء المحتملين في تقرير شهري مرتبة قريبة من القاع في خط الأنابيب بمجرد ربط نتائج المبيعات بكل واحد منهم — وأن تحتل قناة أصغر وأقل ضجيجاً مرتبة قريبة من القمة. لا تظهر أي من الحقيقتين من عدد العملاء المحتملين وحده؛ تظهران فقط بمجرد أن يتحدث النظامان فعلياً مع بعضهما البعض.",
      ),
      h2("ما الذي يعنيه «النجاح» الآن؟"),
      p(
        "بمجرد وجود هذا الاتصال، يتوقف «المزيد من العملاء المحتملين» عن كونه الهدف بحد ذاته. ويصبح «المزيد من العملاء المحتملين الذين أُغلقوا الربع الماضي» هو الموجز — هدف أصغر، وأفضل بكثير. تتوقف قرارات الميزانية عن كونها مفاوضة حول أي قناة تبدو أكثر نشاطاً وتصبح قراءة مباشرة لأي قناة تستطيع الإدارة أن ترى بالفعل أنها تدفع الإيرادات.",
      ),
      h2("كيف تبدأون القياس بهذه الطريقة؟"),
      p(
        "ثلاثة متطلبات أساسية، بترتيب تقريبي: نظام إدارة علاقات عملاء يسجل من أين جاء كل عميل محتمل، مراحل مبيعات تتوافق بوضوح مع بيانات قنوات التسويق، وتقرير مشترك ينظر إليه الفريقان فعلياً — لا لوحتا بيانات منفصلتان لا تُقارَنان أبداً. لا يتطلب أي من هذا أدوات جديدة بقدر ما يتطلب ربط ما تملكه معظم الشركات بالفعل.",
      ),
      p(
        "إذا كانت أرقام التسويق والمبيعات لديكم تعيش حالياً في نظامين لا يتحدثان مع بعضهما البعض، فهذه هي الفجوة التي تستحق الإغلاق أولاً. [تواصلوا معنا](/ar/contact) وسنُريكم ما يكشفه عادة ربطهما.",
      ),
    ],
    bodyRu: [
      p(
        "Маркетинговый отчёт, полный количества лидов, может выглядеть отлично и при этом почти ничего не значить. Воронка продаж — лиды, с которыми отдел продаж реально хочет работать, — это меньшая, более сложная и куда более честная цифра.",
      ),
      h2("Почему количество лидов легко подделать"),
      p(
        "Количество лидов прежде всего вознаграждает объём, а объём — самая простая метрика в маркетинге, которую можно накрутить: более широкий таргетинг, более щедрый стимул на форме, более низкая планка того, что считается «квалифицированным» кликом. Ничего из этого не требует, чтобы лид представлял хоть какую-то ценность для бизнеса, который его получает. Канал может выполнять все цели по количеству лидов в дашборде, при этом тихо не производя ничего, к чему захочет прикоснуться отдел продаж.",
      ),
      h2("Что меняется, когда данные CRM и рекламы соединяются"),
      p(
        "Переход к воронке продаж как к главной метрике — не дань моде. Это то, что происходит, как только компания соединяет [CRM со своими рекламными аккаунтами](/ru/services/crm-marketing-automation) и впервые видит, какие каналы приносят лиды, реально закрывающиеся в сделку, а какие — просто лиды. Именно в этот момент маркетинговый отчёт и отчёт по продажам обычно впервые начинают сходиться друг с другом.",
      ),
      h3("Наглядный пример"),
      p(
        "Нередко канал, приносящий больше всего лидов в месячном отчёте, оказывается почти в самом низу рейтинга по воронке продаж, как только к каждому лиду привязывается результат сделки, — а более скромный и незаметный канал, наоборот, поднимается почти на самый верх. Ни один из этих фактов не виден при взгляде только на количество лидов — оба проявляются лишь тогда, когда две системы начинают реально «разговаривать» друг с другом.",
      ),
      h2("Что начинает означать «результат»"),
      p(
        "Как только эта связь установлена, «больше лидов» перестаёт быть самоцелью. Задачей становится «больше лидов, похожих на те, что закрылись в прошлом квартале» — меньшая цель, но гораздо более точная. Решения по бюджету перестают быть спором о том, какой канал выглядит активнее, и превращаются в прямое считывание того, какой канал руководство уже видит приносящим выручку.",
      ),
      h2("С чего начать такой подход к измерению"),
      p(
        "Три условия, примерно в таком порядке: CRM, которая фиксирует источник каждого лида; этапы продаж, чётко сопоставимые с данными маркетинговых каналов; и общий отчёт, в который реально заглядывают обе команды, — а не два отдельных дашборда, которые никогда не сравниваются. Ничего из этого не требует новых инструментов — требуется лишь соединить то, что у большинства компаний уже есть.",
      ),
      p(
        "Если ваши маркетинговые показатели и показатели продаж сейчас живут в двух системах, которые не общаются друг с другом, — это та самая брешь, которую стоит закрыть в первую очередь. [Свяжитесь с нами](/ru/contact), и мы покажем, что обычно раскрывается после их соединения.",
      ),
    ],
  },
  {
    slug: "founders-guide-to-briefing-a-performance-agency",
    category: "guides",
    title: "A Founder's Guide to Briefing a Digital Marketing Agency",
    titleAr: "دليل المؤسس لتوجيه إحاطة لوكالة تسويق رقمي",
    titleRu: "Гид основателя по составлению брифа для агентства цифрового маркетинга",
    seoTitle: "How to Brief a Digital Marketing Agency: Founder's Guide",
    seoTitleAr: "كيفية توجيه إحاطة لوكالة تسويق رقمي: دليل المؤسس",
    seoTitleRu: "Как составить бриф для агентства цифрового маркетинга: гид основателя",
    excerpt:
      "The brief that gets you a better proposal is shorter than you think, and asks for fewer promises.",
    excerptAr:
      "الإحاطة التي تمنحكم عرضاً أفضل أقصر مما تظنون، وتطلب وعوداً أقل.",
    excerptRu:
      "Бриф, который приносит вам более сильное предложение, короче, чем вы думаете, и требует меньше обещаний.",
    metaDescription:
      "A short, numbers-first brief gets a better proposal from any digital marketing agency than a long wish list. Here's exactly what to include, in what order, and why.",
    metaDescriptionAr:
      "إحاطة قصيرة تضع الأرقام أولاً تمنحكم عرضاً أفضل من أي وكالة تسويق رقمي مقارنة بقائمة أمنيات طويلة. إليكم بالضبط ما يجب تضمينه، بأي ترتيب، ولماذا.",
    metaDescriptionRu:
      "Короткий бриф, где на первом месте цифры, приносит от любого агентства цифрового маркетинга предложение лучше, чем длинный список пожеланий. Рассказываем, что именно включить, в каком порядке и почему.",
    date: "19 Feb 2026",
    readingTime: "7 min read",
    readingTimeAr: "7 دقائق قراءة",
    readingTimeRu: "7 мин чтения",
    image: "/images/insights/briefing-performance-agency-photo-stack.jpg",
    imageAlt: "A hand holding a fanned stack of black-and-white photographs",
    imageAltAr: "يد تحمل كومة من الصور بالأبيض والأسود مفرودة كالمروحة",
    imageAltRu: "Рука держит веером разложенную стопку чёрно-белых фотографий",
    imageTopic: "Briefing an Agency",
    imageTopicAr: "توجيه إحاطة لوكالة",
    imageTopicRu: "Бриф для агентства",
    body: [
      p(
        "Most briefs sent to agencies ask for a plan before sharing the numbers a plan depends on. Cost per lead, close rate, average deal size, current channel mix — an agency that doesn't ask for these before proposing anything is guessing, however confident the proposal sounds.",
      ),
      h2("Start With the Numbers, Not the Wish List"),
      p(
        "A stronger brief hands those numbers over first, states the actual constraint — budget, timeline, an internal team's bandwidth — and asks the agency to respond to that reality rather than to a template. The founders who get the best proposals are, almost without exception, the ones who made the numbers easy to find.",
      ),
      h2("The Five Things Worth Including"),
      h3("1. Current Cost Per Lead and Cost Per Qualified Lead"),
      p(
        "Not one number — both. The gap between them tells an agency more about your funnel than almost anything else you could share.",
      ),
      h3("2. Close Rate by Channel, If You Have It"),
      p(
        "Even a rough estimate is more useful than none. An agency that knows one channel closes at twice the rate of another can propose a budget shift that pays for itself before any new spend is added.",
      ),
      h3("3. Average Deal Size and Sales Cycle Length"),
      p(
        "These set the pace at which any new plan can reasonably prove itself. A 90-day pilot means something different for a business with a two-week sales cycle than one with a six-month cycle.",
      ),
      h3("4. The Real Constraint"),
      p(
        "Budget, timeline, or internal bandwidth — usually all three to some degree, but one is almost always the binding one. Naming it saves an agency from proposing something technically excellent and practically unworkable.",
      ),
      h3("5. What \"Success\" Actually Means to You"),
      p(
        "Not a KPI target pulled from a template, but the plain-language outcome that would make the engagement feel worthwhile in six months. Agencies build very different plans around \"more leads\" than around \"a repeatable system I can hand to a hire next year.\"",
      ),
      h2("What to Be Wary Of"),
      p(
        "Any proposal that arrives before those numbers were requested is usually a sign the plan was written before the business was understood — a template with your logo added, not a response to your situation specifically.",
      ),
      h2("Putting This Into Practice"),
      p(
        "If you're weighing whether to brief us or another team, [our marketing consulting work](/services/marketing-consulting) starts from exactly this list before a single recommendation gets made — whether the brief is for [digital marketing](/services/digital-marketing) specifically or a broader system. You're welcome to send the numbers first and see what comes back — [reach out here](/contact) whenever you're ready.",
      ),
    ],
    bodyAr: [
      p(
        "معظم الإحاطات المُرسَلة إلى الوكالات تطلب خطة قبل مشاركة الأرقام التي تعتمد عليها أي خطة. تكلفة العميل المحتمل، معدل الإغلاق، متوسط حجم الصفقة، مزيج القنوات الحالي — الوكالة التي لا تطلب هذه الأرقام قبل اقتراح أي شيء إنما تخمّن، مهما بدا العرض واثقاً.",
      ),
      h2("ابدؤوا بالأرقام، لا بقائمة الأمنيات"),
      p(
        "الإحاطة الأقوى تسلّم تلك الأرقام أولاً، وتذكر القيد الفعلي — الميزانية، الجدول الزمني، طاقة فريق داخلي — وتطلب من الوكالة الاستجابة لذلك الواقع بدلاً من قالب جاهز. المؤسسون الذين يحصلون على أفضل العروض هم، تقريباً دون استثناء، من جعلوا الأرقام سهلة الإيجاد.",
      ),
      h2("الأمور الخمسة التي تستحق التضمين"),
      h3("1. تكلفة العميل المحتمل الحالية وتكلفة العميل المحتمل المؤهَّل"),
      p(
        "ليس رقماً واحداً — بل كلاهما. الفجوة بينهما تخبر الوكالة عن قمعكم التسويقي أكثر من أي شيء آخر يمكنكم مشاركته تقريباً.",
      ),
      h3("2. معدل الإغلاق حسب القناة، إن توفر لديكم"),
      p(
        "حتى التقدير التقريبي أكثر فائدة من عدمه. الوكالة التي تعرف أن قناة ما تُغلق بضعف معدل قناة أخرى يمكنها اقتراح تحول في الميزانية يموّل نفسه قبل إضافة أي إنفاق جديد.",
      ),
      h3("3. متوسط حجم الصفقة ومدة دورة المبيعات"),
      p(
        "هذان يحددان الوتيرة التي يمكن لأي خطة جديدة أن تثبت جدواها بها بشكل معقول. تجربة مدتها 90 يوماً تعني شيئاً مختلفاً لشركة بدورة مبيعات أسبوعين عن شركة بدورة مبيعات ستة أشهر.",
      ),
      h3("4. القيد الحقيقي"),
      p(
        "الميزانية، أو الجدول الزمني، أو طاقة الفريق الداخلي — عادة ما تكون الثلاثة مؤثرة بدرجة ما، لكن واحداً منها يكاد يكون دائماً هو الملزم. تسميته يوفر على الوكالة اقتراح شيء ممتاز تقنياً وغير قابل للتنفيذ عملياً.",
      ),
      h3("5. ماذا يعني «النجاح» فعلياً بالنسبة لكم؟"),
      p(
        "ليس هدف مؤشر أداء مأخوذاً من قالب، بل النتيجة بلغة بسيطة التي تجعل التعاون يستحق العناء بعد ستة أشهر. تبني الوكالات خططاً مختلفة تماماً حول «المزيد من العملاء المحتملين» عن تلك التي تبنيها حول «نظام قابل للتكرار يمكنني تسليمه لموظف جديد العام المقبل».",
      ),
      h2("مما يجب الحذر"),
      p(
        "أي عرض يصل قبل طلب تلك الأرقام عادة ما يكون علامة على أن الخطة كُتبت قبل فهم العمل — قالب جاهز أُضيف إليه شعاركم، لا استجابة لموقفكم تحديداً.",
      ),
      h2("تطبيق هذا عملياً"),
      p(
        "إذا كنتم تفكرون في توجيه إحاطة لنا أو لفريق آخر، [عملنا في الاستشارات التسويقية](/ar/services/marketing-consulting) يبدأ من هذه القائمة بالضبط قبل تقديم أي توصية واحدة — سواء كانت الإحاطة لـ[التسويق الرقمي](/ar/services/digital-marketing) تحديداً أو لنظام أوسع. يسعدنا أن ترسلوا الأرقام أولاً وتروا ما سيصلكم — [تواصلوا معنا هنا](/ar/contact) متى كنتم مستعدين.",
      ),
    ],
    bodyRu: [
      p(
        "Большинство брифов, отправляемых агентствам, требуют план ещё до того, как поделятся цифрами, от которых этот план зависит. Стоимость лида, конверсия в сделку, средний размер сделки, текущий медиамикс — агентство, которое не запрашивает эти данные до того, как что-либо предложить, попросту гадает, каким бы уверенным ни казалось предложение.",
      ),
      h2("Начните с цифр, а не со списка пожеланий"),
      p(
        "Более сильный бриф сначала передаёт эти цифры, указывает реальное ограничение — бюджет, сроки, ресурс внутренней команды — и просит агентство ответить именно на эту реальность, а не на шаблон. Основатели, получающие лучшие предложения, почти без исключений — те, кто сделал цифры легко доступными.",
      ),
      h2("Пять вещей, которые стоит включить"),
      h3("1. Текущая стоимость лида и стоимость квалифицированного лида"),
      p(
        "Не одна цифра — обе. Разрыв между ними расскажет агентству о вашей воронке больше, чем почти всё остальное, чем вы могли бы поделиться.",
      ),
      h3("2. Конверсия в сделку по каналам, если она у вас есть"),
      p(
        "Даже приблизительная оценка полезнее, чем её полное отсутствие. Агентство, которое знает, что один канал закрывает сделки в два раза чаще другого, может предложить перераспределение бюджета, которое окупится ещё до добавления новых расходов.",
      ),
      h3("3. Средний размер сделки и длина цикла продаж"),
      p(
        "Эти показатели задают темп, в котором любой новый план может разумно доказать свою эффективность. Девяностодневный пилот означает разные вещи для бизнеса с двухнедельным циклом продаж и для бизнеса с шестимесячным циклом.",
      ),
      h3("4. Реальное ограничение"),
      p(
        "Бюджет, сроки или ресурс внутренней команды — обычно в той или иной степени присутствуют все три, но почти всегда именно одно из них становится определяющим. Если его назвать прямо, это убережёт агентство от предложения чего-то технически безупречного, но неработающего на практике.",
      ),
      h3("5. Что для вас на самом деле означает «успех»"),
      p(
        "Не показатель KPI, взятый из шаблона, а результат, сформулированный простыми словами, — тот, что сделает сотрудничество оправданным через полгода. Агентства выстраивают совершенно разные планы вокруг «больше лидов» и вокруг «повторяемой системы, которую я смогу передать новому сотруднику в следующем году».",
      ),
      h2("На что стоит обратить внимание"),
      p(
        "Любое предложение, которое приходит до того, как у вас запросили эти цифры, обычно означает, что план был написан ещё до понимания вашего бизнеса, — шаблон с добавленным логотипом, а не ответ именно на вашу ситуацию.",
      ),
      h2("Как применить это на практике"),
      p(
        "Если вы решаете, отправить бриф нам или другой команде: [наша работа в области маркетингового консалтинга](/ru/services/marketing-consulting) начинается именно с этого списка, прежде чем прозвучит хоть одна рекомендация — будь то бриф именно для [цифрового маркетинга](/ru/services/digital-marketing) или для более широкой системы. Присылайте цифры первыми и смотрите, что вернётся в ответ, — [обращайтесь сюда](/ru/contact), когда будете готовы.",
      ),
    ],
  },
  {
    slug: "audit-your-marketing-funnel-in-an-afternoon",
    category: "guides",
    title: "How to Audit Your Marketing Funnel in One Afternoon",
    titleAr: "كيفية تدقيق قمعكم التسويقي خلال بعد ظهر واحد",
    titleRu: "Как провести аудит маркетинговой воронки за полдня",
    seoTitle: "How to Audit Your Marketing Funnel in One Afternoon",
    seoTitleAr: "كيفية تدقيق قمعكم التسويقي خلال بعد ظهر واحد",
    seoTitleRu: "Как провести аудит маркетинговой воронки за полдня",
    excerpt:
      "You don't need a consultant to find the leak. You need forty-five minutes and the right four questions.",
    excerptAr:
      "لا تحتاجون إلى استشاري لإيجاد التسرب. تحتاجون إلى خمس وأربعين دقيقة والأسئلة الأربعة الصحيحة.",
    excerptRu:
      "Вам не нужен консультант, чтобы найти утечку. Нужны сорок пять минут и четыре правильных вопроса.",
    metaDescription:
      "A full funnel audit takes weeks — finding the stage that's actually costing you money takes an afternoon. Here are the four questions to ask, in order, and what the answers usually reveal.",
    metaDescriptionAr:
      "تدقيق القمع الكامل يستغرق أسابيع — أما إيجاد المرحلة التي تكلفكم المال فعلياً فيستغرق بعد ظهر واحد. إليكم الأسئلة الأربعة التي يجب طرحها، بالترتيب، وما تكشفه إجاباتها عادة.",
    metaDescriptionRu:
      "Полный аудит воронки занимает недели — а найти этап, который реально стоит вам денег, можно за полдня. Вот четыре вопроса, которые нужно задать по порядку, и что обычно показывают ответы.",
    date: "6 Jan 2026",
    readingTime: "6 min read",
    readingTimeAr: "6 دقائق قراءة",
    readingTimeRu: "6 мин чтения",
    image: "/images/book/photo-plinth.jpg",
    imageAlt: "A small ceramic bowl on a travertine plinth against a travertine wall",
    imageAltAr: "وعاء خزفي صغير على قاعدة من حجر الترافرتين أمام جدار من الترافرتين",
    imageAltRu: "Маленькая керамическая чаша на подставке из травертина на фоне травертиновой стены",
    imageTopic: "Audit Your Funnel",
    imageTopicAr: "دقّقوا في قمعكم",
    imageTopicRu: "Аудит вашей воронки",
    body: [
      p(
        "A full funnel audit takes weeks. Finding the one stage that's actually costing you money takes an afternoon, if you ask the right four questions in order.",
      ),
      h2("Question One: Where Do Visitors Actually Come From?"),
      p(
        "Pull channel-level traffic for the last ninety days before doing anything else. Most teams think they know their mix from memory; most are at least one channel off, usually because a campaign that used to matter is still getting credit it no longer earns.",
      ),
      h2("Question Two: Where Do They Drop Off?"),
      p(
        "Look at the page-to-page path from landing page to conversion, and find the single step with the steepest fall-off. It's almost always one step, not a gradual leak evenly spread across the whole funnel — which is good news, because one step is fixable in an afternoon and a gradual leak across ten steps isn't.",
      ),
      h2("Question Three: What Happens to a Lead in Its First Hour?"),
      p(
        "This is the step most audits skip, because it lives in a CRM rather than an analytics dashboard. Pull the last twenty leads and time how long each one waited for a first response. If the answer is inconsistent or slow, you've likely found a bigger leak than anything on the site itself — see [why response time decides almost everything](/insights/why-crm-rollouts-fail-before-they-start) for more on this specifically.",
      ),
      h2("Question Four: What Share of Leads Ever Reach a Closed Sale?"),
      p(
        "Close rate by channel, even estimated roughly, tells you which of the leaks above is actually worth fixing first. A channel with a bad landing page but a strong close rate is a smaller problem than a channel with a decent landing page and a close rate near zero.",
      ),
      h2("What Most Audits Find"),
      p(
        "Most funnels have one obvious leak once looked at directly — a form nobody follows up quickly, a landing page nobody has opened on a phone, a channel that brings volume but never revenue. It's rarely subtle once you're looking at the right four numbers side by side.",
      ),
      h2("Fix the Worst Stage First"),
      p(
        "Fix that one stage before touching anything else. A funnel improved at its worst point moves more than one improved everywhere by a little, and it's a faster way to prove a fix is working before committing to a bigger rebuild of [your website](/services/website-development) or [your CRM setup](/services/crm-marketing-automation).",
      ),
      p(
        "If an afternoon isn't enough time on your calendar this quarter, [we'll run this audit for you](/contact) and hand back the same four answers, plus what we'd fix first.",
      ),
    ],
    bodyAr: [
      p(
        "تدقيق قمع كامل يستغرق أسابيع. أما إيجاد المرحلة الوحيدة التي تكلفكم المال فعلياً فيستغرق بعد ظهر واحد، إذا طرحتم الأسئلة الأربعة الصحيحة بالترتيب.",
      ),
      h2("السؤال الأول: من أين يأتي الزوار فعلياً؟"),
      p(
        "اسحبوا بيانات حركة المرور على مستوى القناة لآخر تسعين يوماً قبل فعل أي شيء آخر. تظن معظم الفرق أنها تعرف مزيجها من الذاكرة؛ ومعظمها مخطئ بقناة واحدة على الأقل، عادة لأن حملة كانت مهمة سابقاً لا تزال تحصل على فضل لم تعد تستحقه.",
      ),
      h2("السؤال الثاني: أين يتوقفون؟"),
      p(
        "انظروا إلى المسار من صفحة إلى صفحة، من صفحة الهبوط إلى التحويل، وحددوا الخطوة الواحدة ذات التراجع الأكبر. تكون دائماً تقريباً خطوة واحدة، لا تسرباً تدريجياً موزعاً بالتساوي عبر القمع بأكمله — وهذا خبر جيد، لأن خطوة واحدة قابلة للإصلاح في بعد ظهر واحد بينما التسرب التدريجي عبر عشر خطوات ليس كذلك.",
      ),
      h2("السؤال الثالث: ماذا يحدث للعميل المحتمل في ساعته الأولى؟"),
      p(
        "هذه هي الخطوة التي تتخطاها معظم عمليات التدقيق، لأنها تعيش في نظام إدارة علاقات العملاء لا في لوحة بيانات تحليلية. اسحبوا آخر عشرين عميلاً محتملاً واحسبوا كم انتظر كل منهم لأول استجابة. إذا كانت الإجابة غير متسقة أو بطيئة، فمن المرجح أنكم وجدتم تسرباً أكبر من أي شيء على الموقع نفسه — راجعوا [لماذا يحدد زمن الاستجابة كل شيء تقريباً](/ar/insights/why-crm-rollouts-fail-before-they-start) لمزيد من التفاصيل حول هذا تحديداً.",
      ),
      h2("السؤال الرابع: أي نسبة من العملاء المحتملين تصل فعلاً إلى صفقة مُغلَقة؟"),
      p(
        "معدل الإغلاق حسب القناة، حتى لو قُدِّر بشكل تقريبي، يخبركم أي التسربات أعلاه يستحق الإصلاح أولاً فعلياً. القناة ذات صفحة الهبوط السيئة لكن معدل الإغلاق القوي مشكلة أصغر من قناة ذات صفحة هبوط مقبولة ومعدل إغلاق قريب من الصفر.",
      ),
      h2("ما تكشفه معظم عمليات التدقيق"),
      p(
        "لمعظم القموع تسرب واحد واضح بمجرد النظر إليه مباشرة — نموذج لا أحد يتابعه بسرعة، صفحة هبوط لم يفتحها أحد على الهاتف، قناة تجلب حجماً لكن أبداً إيرادات. نادراً ما يكون الأمر خفياً بمجرد النظر إلى الأرقام الأربعة الصحيحة جنباً إلى جنب.",
      ),
      h2("أصلحوا أسوأ مرحلة أولاً"),
      p(
        "أصلحوا تلك المرحلة الواحدة قبل لمس أي شيء آخر. القمع الذي يتحسن عند أسوأ نقطة فيه يتحرك أكثر من قمع تحسّن قليلاً في كل مكان، وهذه طريقة أسرع لإثبات أن الإصلاح يعمل قبل الالتزام بإعادة بناء أكبر لـ[موقعكم الإلكتروني](/ar/services/website-development) أو [إعداد إدارة علاقات عملائكم](/ar/services/crm-marketing-automation).",
      ),
      p(
        "إذا لم يتوفر لديكم بعد ظهر كافٍ في تقويمكم هذا الربع، [سنجري هذا التدقيق نيابة عنكم](/ar/contact) ونعيد إليكم الإجابات الأربعة نفسها، بالإضافة إلى ما كنا سنصلحه أولاً.",
      ),
    ],
    bodyRu: [
      p(
        "Полный аудит воронки занимает недели. Но найти тот единственный этап, который реально стоит вам денег, можно за полдня — если задать по порядку четыре правильных вопроса.",
      ),
      h2("Вопрос первый: откуда на самом деле приходят посетители?"),
      p(
        "Прежде чем делать что-либо ещё, выгрузите трафик по каналам за последние девяносто дней. Большинство команд думают, что помнят свой медиамикс наизусть, — и почти всегда ошибаются как минимум по одному каналу, обычно потому что кампания, которая раньше приносила результат, до сих пор получает заслугу, которую больше не заработала.",
      ),
      h2("Вопрос второй: на каком этапе они уходят?"),
      p(
        "Проследите путь от посадочной страницы до конверсии, шаг за шагом, и найдите тот единственный этап с самым резким падением. Почти всегда это один конкретный шаг, а не постепенная утечка, равномерно размазанная по всей воронке, — и это хорошая новость, потому что один шаг можно исправить за полдня, а постепенную утечку через десять этапов — нет.",
      ),
      h2("Вопрос третий: что происходит с лидом в первый час?"),
      p(
        "Именно этот этап пропускает большинство аудитов, потому что данные о нём живут в CRM, а не в дашборде аналитики. Возьмите последние двадцать лидов и замерьте, сколько каждый из них ждал первого ответа. Если результат нестабилен или слишком медленный, вы, скорее всего, нашли утечку крупнее любой другой на самом сайте — подробнее об этом читайте в материале [«Почему скорость ответа решает почти всё»](/ru/insights/why-crm-rollouts-fail-before-they-start).",
      ),
      h2("Вопрос четвёртый: какая доля лидов доходит до закрытой сделки?"),
      p(
        "Конверсия в сделку по каналам, даже приблизительная, подскажет, какую из перечисленных выше утечек стоит исправить в первую очередь. Канал с плохой посадочной страницей, но высокой конверсией в сделку — меньшая проблема, чем канал с приличной посадочной страницей и конверсией, близкой к нулю.",
      ),
      h2("Что чаще всего показывает аудит"),
      p(
        "У большинства воронок есть одна очевидная утечка, если посмотреть на них напрямую, — форма, по которой никто быстро не связывается, посадочная страница, которую никто ни разу не открыл с телефона, канал, приносящий объём, но никогда не приносящий выручку. Проблема редко бывает неочевидной, когда вы сравниваете четыре правильные цифры рядом друг с другом.",
      ),
      h2("Сначала исправьте худший этап"),
      p(
        "Исправьте именно этот этап, прежде чем трогать что-либо ещё. Воронка, улучшенная в своей самой слабой точке, даёт больше эффекта, чем воронка, чуть-чуть улучшенная везде, — и это более быстрый способ доказать, что решение работает, прежде чем браться за более масштабную пересборку [вашего сайта](/ru/services/website-development) или [настройки вашей CRM](/ru/services/crm-marketing-automation).",
      ),
      p(
        "Если в вашем календаре в этом квартале не найдётся даже полдня, [мы проведём этот аудит за вас](/ru/contact) и вернём вам те же четыре ответа — плюс то, что мы бы исправили в первую очередь.",
      ),
    ],
  },
  {
    slug: "real-estate-developer-lead-quality-case-study",
    category: "case-studies",
    title: "Fixing a Real Estate Developer's Lead Quality Problem",
    titleAr: "إصلاح مشكلة جودة العملاء المحتملين لدى مطوّر عقاري",
    titleRu: "Решение проблемы качества лидов у застройщика недвижимости",
    seoTitle: "Real Estate Lead Quality Case Study | Illustrative Example",
    seoTitleAr: "دراسة حالة جودة عملاء محتملين عقاريين | مثال توضيحي",
    seoTitleRu: "Кейс: качество лидов в недвижимости | Показательный пример",
    excerpt:
      "An illustrative example: a Dubai developer generating plenty of leads, few of them worth a sales call. Here's the kind of fix that closes that gap.",
    excerptAr:
      "مثال توضيحي: مطوّر في دبي يولّد الكثير من العملاء المحتملين، القليل منهم يستحق مكالمة مبيعات. إليكم نوع الإصلاح الذي يغلق تلك الفجوة.",
    excerptRu:
      "Показательный пример: застройщик в Дубае генерирует множество лидов, но лишь немногие из них стоят звонка от отдела продаж. Рассказываем, какое решение закрывает этот разрыв.",
    metaDescription:
      "An illustrative example scenario showing how a Dubai real estate developer's lead-quality problem gets diagnosed and fixed — from cost-per-lead vanity metrics to CRM-connected, close-rate-driven campaigns.",
    metaDescriptionAr:
      "سيناريو توضيحي يُظهر كيف تُشخَّص وتُحل مشكلة جودة العملاء المحتملين لدى مطوّر عقاري في دبي — من مقاييس تكلفة العميل المحتمل السطحية إلى حملات مرتبطة بإدارة علاقات العملاء ومدفوعة بمعدل الإغلاق.",
    metaDescriptionRu:
      "Показательный сценарий, демонстрирующий, как диагностируется и решается проблема качества лидов у застройщика недвижимости в Дубае — от поверхностных метрик стоимости лида до кампаний, связанных с CRM и ориентированных на конверсию в сделку.",
    date: "17 Aug 2026",
    readingTime: "6 min read",
    readingTimeAr: "6 دقائق قراءة",
    readingTimeRu: "6 мин чтения",
    image: "/images/insights/real-estate-case-study-ornate-ceiling.jpg",
    imageAlt: "An ornate gilded ceiling and archway inside a grand period interior",
    imageAltAr: "سقف مذهّب مزخرف وقنطرة داخل تصميم داخلي كلاسيكي فخم",
    imageAltRu: "Декоративный позолоченный потолок и арка внутри роскошного интерьера в классическом стиле",
    imageTopic: "Lead Quality, Fixed",
    imageTopicAr: "جودة العملاء المحتملين، بعد الإصلاح",
    imageTopicRu: "Качество лидов после исправления",
    body: [
      p(
        "This is an illustrative example, built to show how we approach a common problem — not a claim about a specific completed client engagement. No real client names, figures or results are attached to it; the scenario is representative of the kind of work described.",
      ),
      h2("The Scenario"),
      p(
        "A mid-sized Dubai real estate developer is running paid campaigns across Google and Meta ahead of a project launch. Cost per lead looks healthy on the monthly report. The sales team's experience is different: most of the leads arriving never pick up a follow-up call, and the ones who do rarely match the buyer profile the project was built for.",
      ),
      h2("Where the Diagnosis Usually Starts"),
      h3("Campaigns Optimised for Form Fills, Not Buyers"),
      p(
        "Ad platforms optimise toward whatever conversion event they're told to value. If that event is \"form submitted,\" the algorithm will happily find people who submit forms — including people with no real intent to buy a AED 2M apartment, drawn in by broad targeting and an incentive-led ad.",
      ),
      h3("No Feedback Loop Between Sales and Ads"),
      p(
        "Without a [CRM connected back to the ad accounts](/services/crm-marketing-automation), the platform never learns which of the leads it generated actually became a serious conversation. It keeps optimising for the event it can see — the form fill — because the event it can't see — the sale — was never fed back to it.",
      ),
      h2("The Kind of Fix That Closes This Gap"),
      p(
        "In a scenario like this, the fix generally has three parts. First, connect the CRM so every lead's outcome — contacted, qualified, viewed, offered, closed — flows back into the ad platform, not just the initial form fill. Second, shift the optimisation event itself from \"form submitted\" to a stage further down the funnel, such as \"qualified by sales,\" once enough data exists to support it. Third, tighten targeting and creative around the actual buyer profile the project needs, rather than the broadest possible audience a launch budget can reach.",
      ),
      h2("What Changes Once This Is in Place"),
      p(
        "Cost per lead on the report usually rises in a scenario like this — a tighter, better-qualified audience costs more to reach than a broad one. Cost per qualified lead, and close rate, move the other way, because the leads arriving are increasingly the ones sales actually wants. This is the same principle covered in [what rising ad costs mean for UAE marketing budgets](/insights/rising-ad-costs-uae-marketing-budgets): a channel is worth judging on what it returns, not on how cheap its raw leads look in isolation.",
      ),
      h2("Why This Approach Generalises"),
      p(
        "This pattern — vanity-metric-optimised campaigns disconnected from what sales actually needs — is common well beyond real estate, and the fix is rarely a bigger budget. It's [Digital Marketing](/services/digital-marketing) and [CRM & Marketing Automation](/services/crm-marketing-automation) built to talk to each other from day one.",
      ),
      p(
        "If this scenario sounds familiar for your own campaigns, [talk to us](/contact) about what a real audit of your account would look like.",
      ),
    ],
    bodyAr: [
      p(
        "هذا مثال توضيحي، بُني ليُظهر كيف نتعامل مع مشكلة شائعة — لا ادعاء بشأن تعاون فعلي مكتمل مع عميل محدد. لا أسماء عملاء حقيقية أو أرقام أو نتائج مرتبطة به؛ السيناريو تمثيلي لنوع العمل الموصوف.",
      ),
      h2("السيناريو"),
      p(
        "مطوّر عقاري متوسط الحجم في دبي يدير حملات مدفوعة عبر جوجل وميتا قبل إطلاق مشروع. تكلفة العميل المحتمل تبدو صحية في التقرير الشهري. لكن تجربة فريق المبيعات مختلفة: معظم العملاء المحتملين الواصلين لا يردون أبداً على مكالمة متابعة، ومن يرد منهم نادراً ما يطابق ملف المشتري الذي بُني المشروع من أجله.",
      ),
      h2("أين يبدأ التشخيص عادة؟"),
      h3("حملات مُحسَّنة لتعبئة النماذج، لا للمشترين"),
      p(
        "تُحسِّن منصات الإعلانات نحو أي حدث تحويل يُطلب منها إعطاؤه قيمة. إذا كان ذلك الحدث «تعبئة نموذج»، فسيجد الخوارزم بسعادة أشخاصاً يعبّئون النماذج — بمن فيهم أشخاص بلا نية حقيقية لشراء شقة بقيمة 2 مليون درهم، انجذبوا بفعل استهداف واسع وإعلان قائم على حوافز.",
      ),
      h3("غياب حلقة تغذية راجعة بين المبيعات والإعلانات"),
      p(
        "دون [نظام إدارة علاقات عملاء متصل بحسابات الإعلانات](/ar/services/crm-marketing-automation)، لا تتعلم المنصة أبداً أي العملاء المحتملين الذين ولّدتهم أصبحوا فعلاً محادثة جادة. تستمر في التحسين للحدث الذي تراه — تعبئة النموذج — لأن الحدث الذي لا تراه — البيع — لم تتم تغذيته إليها أبداً.",
      ),
      h2("نوع الإصلاح الذي يغلق هذه الفجوة"),
      p(
        "في سيناريو كهذا، يتكون الإصلاح عموماً من ثلاثة أجزاء. أولاً، ربط نظام إدارة علاقات العملاء بحيث تتدفق نتيجة كل عميل محتمل — تم التواصل، مؤهَّل، عاين، قُدِّم له عرض، أُغلق — إلى منصة الإعلانات، لا مجرد تعبئة النموذج الأولية. ثانياً، تحويل حدث التحسين نفسه من «تعبئة نموذج» إلى مرحلة أعمق في القمع، مثل «مؤهَّل من المبيعات»، بمجرد توفر بيانات كافية لدعم ذلك. ثالثاً، تضييق الاستهداف والتصاميم الإبداعية حول ملف المشتري الفعلي الذي يحتاجه المشروع، بدلاً من أوسع جمهور ممكن تصل إليه ميزانية الإطلاق.",
      ),
      h2("ما الذي يتغيّر بمجرد تطبيق هذا؟"),
      p(
        "تكلفة العميل المحتمل في التقرير ترتفع عادة في سيناريو كهذا — فالجمهور الأكثر تحديداً والتأهيل الأفضل يكلف أكثر للوصول إليه من جمهور واسع. أما تكلفة العميل المحتمل المؤهَّل، ومعدل الإغلاق، فيتحركان في الاتجاه المعاكس، لأن العملاء المحتملين الواصلين يصبحون بشكل متزايد من يريدهم المبيعات فعلاً. هذا هو نفس المبدأ الذي تناولناه في [ماذا يعني ارتفاع تكاليف الإعلانات لميزانيات التسويق في الإمارات](/ar/insights/rising-ad-costs-uae-marketing-budgets): تستحق القناة أن تُقيَّم وفق ما تعيده، لا وفق مدى رخص عملائها المحتملين الخام بمعزل عن السياق.",
      ),
      h2("لماذا يصلح هذا النهج بشكل عام؟"),
      p(
        "هذا النمط — حملات مُحسَّنة لمقاييس سطحية ومنفصلة عما يحتاجه المبيعات فعلاً — شائع إلى ما هو أبعد بكثير من العقارات، ونادراً ما يكون الإصلاح ميزانية أكبر. إنه [التسويق الرقمي](/ar/services/digital-marketing) و[إدارة علاقات العملاء وأتمتة التسويق](/ar/services/crm-marketing-automation) مبنيان للتحدث مع بعضهما البعض منذ اليوم الأول.",
      ),
      p(
        "إذا بدا هذا السيناريو مألوفاً بالنسبة لحملاتكم الخاصة، [تحدثوا معنا](/ar/contact) حول شكل تدقيق حقيقي لحسابكم.",
      ),
    ],
    bodyRu: [
      p(
        "Это показательный пример, созданный, чтобы продемонстрировать наш подход к распространённой проблеме, а не утверждение о конкретном завершённом проекте с клиентом. Здесь нет реальных имён клиентов, цифр или результатов — сценарий лишь иллюстрирует характер описываемой работы.",
      ),
      h2("Сценарий"),
      p(
        "Застройщик недвижимости среднего масштаба в Дубае ведёт платные кампании в Google и Meta перед запуском проекта. Стоимость лида в месячном отчёте выглядит вполне здоровой. Но опыт отдела продаж иной: большинство поступающих лидов никогда не берут трубку на повторный звонок, а те, кто берёт, редко соответствуют профилю покупателя, под который был задуман проект.",
      ),
      h2("С чего обычно начинается диагностика?"),
      h3("Кампании, оптимизированные под заполнение форм, а не под покупателей"),
      p(
        "Рекламные платформы оптимизируются под то событие конверсии, которое им указали как ценное. Если это событие — «форма отправлена», алгоритм с радостью найдёт людей, которые отправляют формы, — включая тех, у кого нет реального намерения покупать квартиру за 2 млн дирхамов, а есть лишь реакция на широкий таргетинг и рекламу с завлекающим стимулом.",
      ),
      h3("Отсутствие обратной связи между продажами и рекламой"),
      p(
        "Без [CRM, подключённой обратно к рекламным аккаунтам](/ru/services/crm-marketing-automation), платформа никогда не узнаёт, какие из сгенерированных ею лидов реально переросли в серьёзный разговор. Она продолжает оптимизироваться под то событие, которое видит, — заполнение формы, — потому что событие, которого она не видит, — продажу, — ей никогда не передавали обратно.",
      ),
      h2("Какое решение закрывает этот разрыв"),
      p(
        "В подобном сценарии решение обычно состоит из трёх частей. Во-первых, подключить CRM так, чтобы результат каждого лида — установлен контакт, квалифицирован, состоялся просмотр, сделано предложение, закрыто — передавался обратно в рекламную платформу, а не только изначальное заполнение формы. Во-вторых, сместить само событие оптимизации с «форма отправлена» на более глубокий этап воронки, например «квалифицирован отделом продаж», как только накопится достаточно данных для этого. В-третьих, сузить таргетинг и креативы вокруг реального профиля покупателя, нужного проекту, вместо максимально широкой аудитории, которую способен охватить бюджет запуска.",
      ),
      h2("Что меняется после внедрения этого решения?"),
      p(
        "Стоимость лида в отчёте в таком сценарии обычно растёт — более узкая, лучше квалифицированная аудитория обходится дороже, чем широкая. А стоимость квалифицированного лида и конверсия в сделку движутся в обратную сторону, потому что поступающие лиды всё больше соответствуют тому, что реально нужно отделу продаж. Это тот же принцип, что рассматривается в материале [«Что рост стоимости рекламы значит для маркетинговых бюджетов в ОАЭ»](/ru/insights/rising-ad-costs-uae-marketing-budgets): канал стоит оценивать по тому, что он приносит, а не по тому, насколько дёшево выглядят его сырые лиды сами по себе.",
      ),
      h2("Почему этот подход применим не только здесь"),
      p(
        "Эта модель — кампании, оптимизированные под показные метрики и оторванные от реальных потребностей продаж, — распространена далеко за пределами недвижимости, и решение редко заключается в увеличении бюджета. Это [цифровой маркетинг](/ru/services/digital-marketing) и [CRM и маркетинговая автоматизация](/ru/services/crm-marketing-automation), изначально выстроенные так, чтобы работать в связке с первого дня.",
      ),
      p(
        "Если этот сценарий кажется знакомым применительно к вашим собственным кампаниям, [поговорите с нами](/ru/contact) о том, как мог бы выглядеть реальный аудит вашего аккаунта.",
      ),
    ],
  },
  {
    slug: "hospitality-group-website-conversion-case-study",
    category: "case-studies",
    title: "Turning Website Traffic Into Direct Bookings for a Hospitality Group",
    titleAr: "تحويل حركة مرور الموقع إلى حجوزات مباشرة لمجموعة ضيافة",
    titleRu: "Превращаем трафик сайта в прямые бронирования для гостиничной группы",
    seoTitle: "Hospitality Website Conversion Case Study | Illustrative Example",
    seoTitleAr: "دراسة حالة تحويل موقع ضيافة | مثال توضيحي",
    seoTitleRu: "Кейс: конверсия сайта отеля | Показательный пример",
    excerpt:
      "An illustrative example: strong traffic, weak direct bookings, and heavy reliance on OTA commissions. Here's the kind of website fix that shifts that balance.",
    excerptAr:
      "مثال توضيحي: حركة مرور قوية، حجوزات مباشرة ضعيفة، واعتماد كبير على عمولات وكالات السفر الإلكترونية. إليكم نوع إصلاح الموقع الذي يغيّر ذلك التوازن.",
    excerptRu:
      "Показательный пример: сильный трафик, слабые прямые бронирования и высокая зависимость от комиссий OTA. Рассказываем, какое решение для сайта меняет этот баланс.",
    metaDescription:
      "An illustrative example scenario for a UAE hospitality group converting more website traffic into direct, commission-free bookings through CRO, page speed and a clearer booking path.",
    metaDescriptionAr:
      "سيناريو توضيحي لمجموعة ضيافة في الإمارات تحوّل المزيد من حركة مرور موقعها إلى حجوزات مباشرة بلا عمولة من خلال تحسين معدل التحويل وسرعة الصفحة ومسار حجز أوضح.",
    metaDescriptionRu:
      "Показательный сценарий для гостиничной группы в ОАЭ, которая превращает больше трафика сайта в прямые бронирования без комиссии — за счёт CRO, скорости страницы и более понятного пути бронирования.",
    date: "3 Aug 2026",
    readingTime: "5 min read",
    readingTimeAr: "5 دقائق قراءة",
    readingTimeRu: "5 мин чтения",
    image: "/images/insights/hospitality-case-study-bouquet-portrait.jpg",
    imageAlt: "A woman holding a dried flower bouquet in front of her face, lit in warm sunlight",
    imageAltAr: "امرأة تحمل باقة زهور مجففة أمام وجهها، بإضاءة دافئة",
    imageAltRu: "Женщина держит букет сухоцветов перед лицом, тёплое солнечное освещение",
    imageTopic: "Turning Traffic to Bookings",
    imageTopicAr: "تحويل حركة المرور إلى حجوزات",
    imageTopicRu: "От трафика к бронированиям",
    body: [
      p(
        "This is an illustrative example, built to show how we approach a common problem — not a claim about a specific completed client engagement. No real client names, figures or results are attached to it; the scenario is representative of the kind of work described.",
      ),
      h2("The Scenario"),
      p(
        "A UAE hospitality group with several properties is getting healthy organic and paid traffic to its website. Most bookings, though, still come through third-party OTAs paying out double-digit commissions, while the group's own site — which costs it nothing per booking — converts only a small fraction of its visitors.",
      ),
      h2("Where the Diagnosis Usually Starts"),
      h3("A Booking Path Built for Browsing, Not Booking"),
      p(
        "It's common to find a site where the booking widget is buried below several scrolls of brand photography, room availability takes multiple clicks to check, and the whole flow was clearly designed to look good in a pitch deck rather than to get a phone-in-hand visitor from \"interested\" to \"booked\" in under a minute.",
      ),
      h3("Page Speed Quietly Taxing Every Campaign"),
      p(
        "As covered in [the real cost of a slow website](/insights/real-cost-of-a-slow-website), a slow-loading site loses a share of every paid visitor before the page even renders. For a hospitality group already spending on OTAs and paid search to drive traffic, that's spend paying to lose a visitor the site never gets the chance to convert.",
      ),
      h3("No Reason Given to Book Direct"),
      p(
        "OTAs compete on price comparison and reviews; a hotel's own site has to compete on something else — but often gives the visitor no reason to book direct rather than through the familiar OTA interface they already trust.",
      ),
      h2("The Kind of Fix That Shifts the Balance"),
      p(
        "In a scenario like this, the work usually starts with [Website Development](/services/website-development): compress and restructure the page so speed stops being a silent tax, move the booking widget above the fold, cut the path from \"check availability\" to \"confirm\" down to the minimum number of steps, and give the direct channel a clear reason to choose — a best-rate guarantee, a small perk, transparent pricing without the OTA's added fees.",
      ),
      h2("Why Direct Bookings Are Worth the Effort"),
      p(
        "A booking made directly costs a hospitality brand a fraction of what the same booking costs through most OTA commission structures. Improving on-site conversion rate by even a few percentage points shifts a meaningful share of volume from commissioned to commission-free, without adding a single dirham of new marketing spend.",
      ),
      p(
        "If your own booking path hasn't been looked at with fresh eyes recently, [get in touch](/contact) — a CRO review is usually the fastest way to see where the biggest single opportunity is hiding.",
      ),
    ],
    bodyAr: [
      p(
        "هذا مثال توضيحي، بُني ليُظهر كيف نتعامل مع مشكلة شائعة — لا ادعاء بشأن تعاون فعلي مكتمل مع عميل محدد. لا أسماء عملاء حقيقية أو أرقام أو نتائج مرتبطة به؛ السيناريو تمثيلي لنوع العمل الموصوف.",
      ),
      h2("السيناريو"),
      p(
        "مجموعة ضيافة في الإمارات تضم عدة منشآت تحصل على حركة مرور عضوية ومدفوعة صحية إلى موقعها. لكن معظم الحجوزات لا تزال تأتي عبر وكالات سفر إلكترونية تدفع عمولات بخانتين رقميتين، بينما موقع المجموعة نفسه — الذي لا يكلفها شيئاً لكل حجز — لا يحوّل سوى جزء صغير من زواره.",
      ),
      h2("أين يبدأ التشخيص عادة؟"),
      h3("مسار حجز مبني للتصفح، لا للحجز"),
      p(
        "من الشائع إيجاد موقع تكون فيه أداة الحجز مدفونة تحت عدة شاشات من صور العلامة التجارية، والتحقق من توفر الغرف يتطلب نقرات متعددة، وكان التصميم بأكمله واضح أنه صُمم ليبدو جيداً في عرض تقديمي بدلاً من نقل زائر يحمل هاتفه من «مهتم» إلى «حجز» في أقل من دقيقة.",
      ),
      h3("سرعة الصفحة تفرض ضريبة صامتة على كل حملة"),
      p(
        "كما تناولنا في [التكلفة الحقيقية لموقع بطيء](/ar/insights/real-cost-of-a-slow-website)، الموقع البطيء التحميل يفقد نسبة من كل زائر مدفوع قبل أن تُعرض الصفحة حتى. بالنسبة لمجموعة ضيافة تنفق بالفعل على وكالات السفر الإلكترونية والبحث المدفوع لجلب حركة المرور، هذا إنفاق يدفع لخسارة زائر لم تحصل الصفحة على فرصة تحويله أبداً.",
      ),
      h3("لا سبب يُعطى للحجز المباشر"),
      p(
        "تتنافس وكالات السفر الإلكترونية على مقارنة الأسعار والتقييمات؛ ويتعين على موقع الفندق الخاص أن يتنافس على شيء آخر — لكنه غالباً لا يعطي الزائر أي سبب للحجز المباشر بدلاً من واجهة وكالة السفر المألوفة التي يثق بها بالفعل.",
      ),
      h2("نوع الإصلاح الذي يغيّر التوازن"),
      p(
        "في سيناريو كهذا، يبدأ العمل عادة بـ[تطوير المواقع الإلكترونية](/ar/services/website-development): ضغط الصفحة وإعادة هيكلتها بحيث تتوقف السرعة عن كونها ضريبة صامتة، نقل أداة الحجز إلى أعلى الصفحة، تقليص المسار من «تحقق من التوفر» إلى «تأكيد» إلى أقل عدد ممكن من الخطوات، ومنح القناة المباشرة سبباً واضحاً للاختيار — ضمان أفضل سعر، ميزة صغيرة، تسعير شفاف دون رسوم وكالة السفر الإضافية.",
      ),
      h2("لماذا تستحق الحجوزات المباشرة الجهد؟"),
      p(
        "الحجز المباشر يكلّف علامة الضيافة جزءاً بسيطاً مما يكلفه الحجز نفسه عبر معظم هياكل عمولات وكالات السفر الإلكترونية. تحسين معدل التحويل على الموقع بضع نقاط مئوية فقط يحوّل حصة معتبرة من الحجم من حجوزات بعمولة إلى حجوزات بلا عمولة، دون إضافة درهم واحد من الإنفاق التسويقي الجديد.",
      ),
      p(
        "إذا لم يُنظر إلى مسار الحجز لديكم بعين جديدة مؤخراً، [تواصلوا معنا](/ar/contact) — مراجعة تحسين معدل التحويل عادة ما تكون أسرع طريقة لرؤية أين تختبئ أكبر فرصة منفردة.",
      ),
    ],
    bodyRu: [
      p(
        "Это показательный пример, созданный, чтобы продемонстрировать наш подход к распространённой проблеме, а не утверждение о конкретном завершённом проекте с клиентом. Здесь нет реальных имён клиентов, цифр или результатов — сценарий лишь иллюстрирует характер описываемой работы.",
      ),
      h2("Сценарий"),
      p(
        "Гостиничная группа в ОАЭ с несколькими объектами получает хороший органический и платный трафик на свой сайт. Однако большинство бронирований по-прежнему проходят через сторонние OTA с двузначными комиссиями, а собственный сайт группы — не требующий никаких выплат за бронирование — конвертирует лишь малую долю посетителей.",
      ),
      h2("С чего обычно начинается диагностика?"),
      h3("Путь бронирования, созданный для просмотра, а не для бронирования"),
      p(
        "Часто встречается сайт, где виджет бронирования спрятан под несколькими экранами брендовых фотографий, проверка наличия номеров требует нескольких кликов, а весь сценарий явно создавался, чтобы хорошо смотреться в презентации, а не чтобы за минуту провести посетителя с телефоном в руках от «интересно» до «забронировано».",
      ),
      h3("Скорость страницы незаметно облагает налогом каждую кампанию"),
      p(
        "Как рассказывалось в материале [«Реальная стоимость медленного сайта»](/ru/insights/real-cost-of-a-slow-website), медленно загружающийся сайт теряет часть каждого платного посетителя ещё до отрисовки страницы. Для гостиничной группы, которая уже платит за OTA и платный поиск ради привлечения трафика, это означает, что бюджет тратится на потерю посетителя, которого сайт даже не успевает попытаться конвертировать.",
      ),
      h3("Отсутствие причины бронировать напрямую"),
      p(
        "OTA конкурируют за счёт сравнения цен и отзывов; собственному сайту отеля приходится конкурировать чем-то другим — но часто он не даёт посетителю ни одной причины бронировать напрямую, а не через привычный интерфейс OTA, которому тот уже доверяет.",
      ),
      h2("Какое решение меняет баланс"),
      p(
        "В подобном сценарии работа обычно начинается с направления [«Веб-разработка»](/ru/services/website-development): сжать и перестроить страницу так, чтобы скорость перестала быть скрытым налогом, поднять виджет бронирования выше линии сгиба, сократить путь от «проверить наличие» до «подтвердить» до минимального числа шагов и дать прямому каналу чёткую причину для выбора — гарантию лучшей цены, небольшой бонус, прозрачное ценообразование без дополнительных сборов OTA.",
      ),
      h2("Почему прямые бронирования стоят усилий?"),
      p(
        "Прямое бронирование обходится гостиничному бренду в разы дешевле, чем то же самое бронирование через большинство комиссионных схем OTA. Улучшение конверсии на сайте всего на несколько процентных пунктов переводит значительную долю объёма из комиссионных бронирований в бесплатные — без единого нового дирхама маркетинговых расходов.",
      ),
      p(
        "Если на ваш путь бронирования давно не смотрели свежим взглядом, [свяжитесь с нами](/ru/contact) — обзор CRO обычно оказывается самым быстрым способом увидеть, где скрывается самая крупная возможность.",
      ),
    ],
  },
  {
    slug: "b2b-technology-partner-full-funnel-case-study",
    category: "case-studies",
    title: "Building a Full-Funnel System for a B2B Technology Partner",
    titleAr: "بناء نظام قمع كامل لشريك تقني B2B",
    titleRu: "Создание комплексной системы полного цикла для B2B-технологического партнёра",
    seoTitle: "B2B Full-Funnel Marketing Case Study | Illustrative Example",
    seoTitleAr: "دراسة حالة تسويق قمع كامل لشركة B2B | مثال توضيحي",
    seoTitleRu: "Кейс: B2B-маркетинг полного цикла | Показательный пример",
    excerpt:
      "An illustrative example: strong product, disconnected marketing and sales, and a pipeline nobody could see clearly. Here's the kind of system that fixes that.",
    excerptAr:
      "مثال توضيحي: منتج قوي، تسويق ومبيعات منفصلان، وخط أنابيب لا يستطيع أحد رؤيته بوضوح. إليكم نوع النظام الذي يصلح ذلك.",
    excerptRu:
      "Показательный пример: сильный продукт, разрозненные маркетинг и продажи, и воронка, которую никто не мог увидеть чётко. Рассказываем, какая система это исправляет.",
    metaDescription:
      "An illustrative example scenario showing how a B2B technology partner connects SEO, paid search and CRM into one full-funnel system, replacing lead count with a pipeline both teams trust.",
    metaDescriptionAr:
      "سيناريو توضيحي يُظهر كيف يربط شريك تقني B2B تحسين محركات البحث والبحث المدفوع وإدارة علاقات العملاء في نظام قمع كامل واحد، مستبدلاً عدد العملاء المحتملين بخط أنابيب يثق به الفريقان.",
    metaDescriptionRu:
      "Показательный сценарий, демонстрирующий, как B2B-технологический партнёр объединяет SEO, платный поиск и CRM в единую систему полного цикла, заменяя количество лидов воронкой, которой доверяют обе команды.",
    date: "24 Jul 2026",
    readingTime: "6 min read",
    readingTimeAr: "6 دقائق قراءة",
    readingTimeRu: "6 мин чтения",
    image: "/images/insights/b2b-case-study-poppy-portrait.jpg",
    imageAlt: "A woman holding a single poppy flower in front of her eyes, lit in warm sunlight",
    imageAltAr: "امرأة تحمل زهرة شقائق نعمان واحدة أمام عينيها، بإضاءة دافئة",
    imageAltRu: "Женщина держит один цветок мака перед глазами, тёплое солнечное освещение",
    imageTopic: "A Full-Funnel System",
    imageTopicAr: "نظام قمع كامل",
    imageTopicRu: "Система полного цикла",
    body: [
      p(
        "This is an illustrative example, built to show how we approach a common problem — not a claim about a specific completed client engagement. No real client names, figures or results are attached to it; the scenario is representative of the kind of work described.",
      ),
      h2("The Scenario"),
      p(
        "A B2B technology partner selling into UAE enterprise accounts has a genuinely strong product and a marketing function producing a steady flow of leads. Sales sees it differently: most weeks bring a handful of leads worth a conversation, buried inside a much larger number that never should have reached a rep's inbox at all.",
      ),
      h2("Where the Diagnosis Usually Starts"),
      h3("Marketing and Sales Reporting Two Different Truths"),
      p(
        "Marketing's dashboard shows lead volume climbing steadily. Sales' pipeline shows something closer to flat. Neither team is wrong about their own numbers — they're simply measuring different things, and nobody has connected the two systems to reconcile them. This is the exact gap covered in [the shift from leads to pipeline](/insights/from-leads-to-pipeline).",
      ),
      h3("Content and SEO Not Tied to the Sales Cycle"),
      p(
        "Content is being produced, and organic traffic is growing — but much of it targets broad, top-of-funnel topics unlikely to reach anyone close to a buying decision within an enterprise sales cycle that can run six months or longer.",
      ),
      h3("No Shared Definition of \"Qualified\""),
      p(
        "Without a shared scoring model, marketing and sales quietly disagree on what a good lead looks like, and every handoff becomes a small negotiation instead of a settled process.",
      ),
      h2("The Kind of System That Fixes This"),
      p(
        "In a scenario like this, the work spans three of our services at once, because the problem doesn't sit neatly inside any one of them. [SEO](/services/seo) shifts toward the specific questions enterprise buyers ask mid-cycle, not just broad awareness topics. [CRM & Marketing Automation](/services/crm-marketing-automation) implements a shared lead-scoring model both teams agree to, plus routing that gets a qualified lead in front of the right rep within minutes rather than hours. And [Digital Marketing](/services/digital-marketing) campaigns get optimised toward the scored, sales-accepted stage rather than the raw form fill.",
      ),
      h2("What Full-Funnel Actually Means Here"),
      p(
        "Full-funnel doesn't mean touching every channel at once — it means every part of the system, from the first search query to the closed deal, is instrumented and connected, so a change made in one place is visible in the others. That's the standard our [marketing consulting work](/services/marketing-consulting) is built around from the first conversation.",
      ),
      p(
        "If your marketing and sales teams are quietly working from two different numbers, that's usually the first thing worth fixing. [Reach out](/contact) and we'll help you find where the disconnect actually is.",
      ),
    ],
    bodyAr: [
      p(
        "هذا مثال توضيحي، بُني ليُظهر كيف نتعامل مع مشكلة شائعة — لا ادعاء بشأن تعاون فعلي مكتمل مع عميل محدد. لا أسماء عملاء حقيقية أو أرقام أو نتائج مرتبطة به؛ السيناريو تمثيلي لنوع العمل الموصوف.",
      ),
      h2("السيناريو"),
      p(
        "شريك تقني B2B يبيع لحسابات مؤسسية في الإمارات لديه منتج قوي فعلاً ووظيفة تسويق تنتج تدفقاً ثابتاً من العملاء المحتملين. لكن المبيعات ترى الأمر بشكل مختلف: معظم الأسابيع تجلب حفنة من العملاء المحتملين تستحق محادثة، مدفونة وسط عدد أكبر بكثير لم يكن يجب أن يصل إلى صندوق وارد أي مندوب أصلاً.",
      ),
      h2("أين يبدأ التشخيص عادة؟"),
      h3("التسويق والمبيعات يبلّغان عن حقيقتين مختلفتين"),
      p(
        "تُظهر لوحة بيانات التسويق حجم العملاء المحتملين يرتفع باطراد. أما خط أنابيب المبيعات فيُظهر شيئاً أقرب إلى الثبات. لا فريق مخطئ بشأن أرقامه الخاصة — إنهما ببساطة يقيسان أشياء مختلفة، ولم يربط أحد النظامين لمطابقتهما. هذه هي بالضبط الفجوة التي تناولناها في [التحول من العملاء المحتملين إلى خط الأنابيب](/ar/insights/from-leads-to-pipeline).",
      ),
      h3("المحتوى وتحسين محركات البحث غير مرتبطين بدورة المبيعات"),
      p(
        "يُنتَج المحتوى، وتنمو حركة المرور العضوية — لكن الكثير منه يستهدف مواضيع عامة في أعلى القمع من غير المرجح أن تصل إلى أي شخص قريب من قرار شراء ضمن دورة مبيعات مؤسسية قد تمتد لستة أشهر أو أكثر.",
      ),
      h3("لا تعريف مشترك لـ«مؤهَّل»"),
      p(
        "دون نموذج تقييم مشترك، يختلف التسويق والمبيعات بصمت حول شكل العميل المحتمل الجيد، وتتحول كل عملية تسليم إلى مفاوضة صغيرة بدلاً من عملية مستقرة.",
      ),
      h2("نوع النظام الذي يصلح هذا"),
      p(
        "في سيناريو كهذا، يمتد العمل عبر ثلاث من خدماتنا في آن واحد، لأن المشكلة لا تقع بدقة ضمن واحدة منها فقط. [تحسين محركات البحث](/ar/services/seo) يتحول نحو الأسئلة المحددة التي يطرحها المشترون المؤسسيون في منتصف الدورة، لا مواضيع الوعي العامة فقط. [إدارة علاقات العملاء وأتمتة التسويق](/ar/services/crm-marketing-automation) تطبّق نموذج تقييم مشترك يتفق عليه الفريقان، بالإضافة إلى توجيه يضع العميل المحتمل المؤهَّل أمام المندوب المناسب خلال دقائق لا ساعات. أما حملات [التسويق الرقمي](/ar/services/digital-marketing) فتُحسَّن نحو المرحلة المُقيَّمة والمقبولة من المبيعات بدلاً من تعبئة النموذج الخام.",
      ),
      h2("ماذا يعني القمع الكامل فعلياً هنا؟"),
      p(
        "القمع الكامل لا يعني لمس كل قناة في آن واحد — بل يعني أن كل جزء من النظام، من استعلام البحث الأول إلى الصفقة المُغلَقة، مُجهَّز بأدوات القياس ومتصل، بحيث يكون التغيير الذي يُجرى في مكان واحد مرئياً في الأماكن الأخرى. هذا هو المعيار الذي يُبنى عليه [عملنا في الاستشارات التسويقية](/ar/services/marketing-consulting) منذ المحادثة الأولى.",
      ),
      p(
        "إذا كان فريقا التسويق والمبيعات لديكم يعملان بصمت من رقمين مختلفين، فهذا عادة أول شيء يستحق الإصلاح. [تواصلوا معنا](/ar/contact) وسنساعدكم في إيجاد مكان الانفصال فعلياً.",
      ),
    ],
    bodyRu: [
      p(
        "Это показательный пример, созданный, чтобы продемонстрировать наш подход к распространённой проблеме, а не утверждение о конкретном завершённом проекте с клиентом. Здесь нет реальных имён клиентов, цифр или результатов — сценарий лишь иллюстрирует характер описываемой работы.",
      ),
      h2("Сценарий"),
      p(
        "B2B-технологический партнёр, продающий крупным корпоративным клиентам в ОАЭ, обладает по-настоящему сильным продуктом и маркетинговой функцией, стабильно генерирующей поток лидов. Продажи видят ситуацию иначе: большинство недель приносят лишь горстку лидов, достойных разговора, погребённых среди гораздо большего числа тех, что вообще не должны были попадать во входящие менеджера.",
      ),
      h2("С чего обычно начинается диагностика?"),
      h3("Маркетинг и продажи отчитываются о двух разных реальностях"),
      p(
        "Дашборд маркетинга показывает устойчивый рост объёма лидов. Воронка продаж показывает нечто гораздо более плоское. Ни одна из команд не ошибается в своих собственных цифрах — они просто измеряют разные вещи, а никто не соединил две системы, чтобы их сверить. Это именно тот разрыв, который рассматривается в материале [«Переход от лидов к воронке продаж»](/ru/insights/from-leads-to-pipeline).",
      ),
      h3("Контент и SEO не привязаны к циклу продаж"),
      p(
        "Контент производится, органический трафик растёт, — но большая его часть нацелена на широкие темы верхней части воронки, которые вряд ли достигают кого-либо, близкого к решению о покупке в рамках корпоративного цикла продаж, способного тянуться шесть месяцев и дольше.",
      ),
      h3("Нет общего понимания слова «квалифицированный»"),
      p(
        "Без общей модели оценки маркетинг и продажи молча расходятся во мнении о том, как выглядит хороший лид, и каждая передача лида превращается в маленькие переговоры вместо отлаженного процесса.",
      ),
      h2("Какая система это исправляет"),
      p(
        "В подобном сценарии работа охватывает сразу три наших направления, потому что проблема не укладывается аккуратно в рамки одного из них. [SEO](/ru/services/seo) смещаются в сторону конкретных вопросов, которые корпоративные покупатели задают в середине цикла, а не только широких тем на этапе знакомства с брендом. [CRM и маркетинговая автоматизация](/ru/services/crm-marketing-automation) внедряет общую модель оценки лидов, согласованную обеими командами, а также маршрутизацию, которая доставляет квалифицированный лид нужному менеджеру за минуты, а не часы. А кампании [цифрового маркетинга](/ru/services/digital-marketing) оптимизируются под оценённый и принятый продажами этап, а не под сырое заполнение формы.",
      ),
      h2("Что здесь на самом деле значит «полный цикл»"),
      p(
        "Полный цикл не означает работу со всеми каналами одновременно — это означает, что каждая часть системы, от первого поискового запроса до закрытой сделки, оснащена измерением и связана друг с другом, поэтому изменение в одном месте видно во всех остальных. Именно на этом стандарте строится наша [работа в области маркетингового консалтинга](/ru/services/marketing-consulting) с самого первого разговора.",
      ),
      p(
        "Если ваши команды маркетинга и продаж молча работают с двумя разными наборами цифр, это обычно первое, что стоит исправить. [Свяжитесь с нами](/ru/contact), и мы поможем вам найти, где на самом деле кроется разрыв.",
      ),
    ],
  },
  {
    slug: "ai-search-optimization",
    category: "trends-and-insights",
    title: "Your Brand Is Being Searched by AI. Can It Be Found?",
    titleAr: "علامتك التجارية يبحث عنها الذكاء الاصطناعي… فهل يمكن العثور عليها؟",
    titleRu: "Ваш бренд уже ищут через ИИ. Может ли он быть найден?",
    seoTitle: "AI Search Optimization: How Brands Can Get Discovered Beyond Google",
    seoTitleAr: "تحسين البحث بالذكاء الاصطناعي: كيف تُكتشف العلامات التجارية بعيداً عن جوجل",
    seoTitleRu: "Оптимизация ИИ-поиска: как бренды становятся заметны за пределами Google",
    excerpt:
      "AI systems are answering questions before anyone clicks a search result. Here's what that shift means for brand visibility, and how AEO fits alongside SEO.",
    excerptAr:
      "أنظمة الذكاء الاصطناعي باتت تُجيب عن الأسئلة قبل أن ينقر أحد على أي نتيجة بحث. إليكم ما يعنيه هذا التحوّل لظهور علامتكم التجارية، وكيف يتكامل تحسين محركات الإجابة (AEO) مع تحسين محركات البحث.",
    excerptRu:
      "ИИ-системы отвечают на вопросы ещё до перехода по ссылке из поиска. Рассказываем, что этот сдвиг значит для видимости бренда и как AEO дополняет SEO.",
    metaDescription:
      "AI is changing how people discover brands. Learn how AI search optimization and AEO can help brands improve visibility across modern search and answer engines.",
    metaDescriptionAr:
      "الذكاء الاصطناعي يُغيّر طريقة اكتشاف الناس للعلامات التجارية. تعرّفوا كيف يساعد تحسين البحث بالذكاء الاصطناعي وتحسين محركات الإجابة (AEO) العلامات التجارية على تحسين ظهورها عبر محركات البحث والإجابة الحديثة.",
    metaDescriptionRu:
      "ИИ меняет то, как люди находят бренды. Узнайте, как оптимизация ИИ-поиска и AEO помогают брендам повышать видимость в современных поисковых системах и системах ответов.",
    date: "19 Aug 2026",
    readingTime: "6 min read",
    readingTimeAr: "6 دقائق قراءة",
    readingTimeRu: "6 мин чтения",
    image: "/images/insights/ai-search-optimization-framed-portrait.jpg",
    imageAlt: "AI search optimization and brand visibility",
    imageAltAr: "تحسين البحث بالذكاء الاصطناعي وظهور العلامة التجارية",
    imageAltRu: "Оптимизация ИИ-поиска и видимость бренда",
    imageTopic: "Becoming the Answer",
    imageTopicAr: "أن تُصبح الإجابة",
    imageTopicRu: "Стать ответом",
    body: [
      p("Search is changing."),
      p(
        "For years, brands competed for visibility on Google. Rankings, keywords, backlinks and clicks defined the game.",
      ),
      p(
        "Now, people are increasingly asking AI systems for answers. Instead of searching for ten websites, they ask:",
      ),
      p("“What is the best branding agency in Dubai?”"),
      p("“Which digital agency should I work with for a luxury brand?”"),
      p("“Who can help me build a performance-driven marketing strategy?”"),
      p(
        "The answer may come from an AI platform before a user ever visits a traditional search result. That changes what brand visibility means.",
      ),
      h2("SEO Is No Longer the Whole Search Strategy"),
      p(
        "SEO is still important. But search is becoming more conversational, contextual and answer-driven.",
      ),
      p(
        "AI systems don't simply look for pages containing a keyword. They attempt to understand entities, expertise, context, credibility and relevance.",
      ),
      p(
        "That means brands need to think beyond “How do I rank?” and start asking “How do I become the answer?”",
      ),
      p(
        "This is where Answer Engine Optimization — AEO — becomes increasingly relevant.",
      ),
      h2("What Is Answer Engine Optimization?"),
      p(
        "AEO is the practice of structuring a brand's digital presence so that answer engines and AI-powered search systems can better understand, evaluate and potentially reference its information.",
      ),
      p(
        "It doesn't replace SEO. It expands the objective. Traditional SEO often focuses on winning the click; AEO focuses on becoming a useful answer. The strongest strategy increasingly connects both.",
      ),
      h2("Your Website Is More Than a Digital Brochure"),
      p(
        "A website should not only explain what a company does. It should make the company's expertise understandable. That means creating clear signals around what the brand does, who it serves, where it operates, what it is known for, what problems it solves, what expertise it has, and what evidence supports that expertise.",
      ),
      p(
        "A beautifully designed website with vague content may look impressive while remaining difficult for both people and search systems to understand. Design creates perception. [Structure creates understanding](/services/website-development). You need both.",
      ),
      h2("Content Needs to Become More Useful"),
      p(
        "Publishing content simply because a website needs a blog is no longer enough. The better question is: what questions does our audience actually ask before making a decision?",
      ),
      p(
        "For a branding agency, that could include what makes a premium brand feel premium, how much branding costs in Dubai, what a brand strategy should include, the difference between branding and marketing, how AI search affects SEO, how a business can improve its digital presence, and when a company should rebrand.",
      ),
      p(
        "Each question represents an opportunity to demonstrate expertise. The goal isn't to produce more content — it is to produce more useful knowledge.",
      ),
      h2("Brand Authority Matters"),
      p(
        "AI visibility isn't only a technical SEO problem. It is also a brand authority problem. If a company has a consistent presence across its website, professional profiles, publications, case studies and other credible sources, it becomes easier to understand as an entity.",
      ),
      p(
        "That means your digital footprint needs consistency. Your [brand positioning](/services/branding) should not change from one platform to another. Your expertise should be clear, your services should be structured, your work should provide evidence, and your content should demonstrate that you understand the subjects you claim to specialise in.",
      ),
      h2("The Future of Search Is Multichannel"),
      p(
        "The customer journey is no longer Google → Website → Contact. It can now look more like: Social → Search → AI → Website → Review → LinkedIn → WhatsApp → Conversation.",
      ),
      p(
        "Every touchpoint contributes to the decision. This is why digital marketing can no longer be treated as isolated channels. SEO, content, social, branding, website experience and paid media need to reinforce the same positioning. The brand should feel like the same brand everywhere.",
      ),
      h2("What Brands Should Do Now"),
      p(
        "There is no need to abandon traditional SEO. Instead, build a broader [search strategy](/services/seo).",
      ),
      h3("01 — Build Clear Brand Entities"),
      p(
        "Make it obvious who you are, what you do, where you operate and what you specialise in.",
      ),
      h3("02 — Create Genuinely Useful Content"),
      p("Answer real customer questions with depth, clarity and a distinct point of view."),
      h3("03 — Strengthen Your Website Structure"),
      p("Use clear navigation, descriptive headings, internal linking and structured information."),
      h3("04 — Demonstrate Expertise"),
      p(
        "Use case studies, insights, original thinking, credentials and real experience to establish authority.",
      ),
      h3("05 — Keep Your Digital Identity Consistent"),
      p(
        "Your website, social profiles, directories and professional platforms should communicate the same core positioning.",
      ),
      h2("The New Question"),
      p("For years, marketers asked: “Are we ranking on Google?” That question still matters."),
      p(
        "But another question is becoming just as important: “When someone asks an AI system about our category, does our brand belong in the answer?” That is the shift.",
      ),
      p(
        "Search visibility is moving from simply owning a position on a page to becoming part of the information ecosystem that shapes the answer. Brands that understand this early will have an advantage — not because AI replaces search, but because search itself is evolving.",
      ),
      h2("Where SHARIO Comes In"),
      p(
        "At SHARIO, we think about digital presence as a connected system — where brand, content, design, technology and performance work together. Because visibility without meaning is temporary, and a brand that is understood is easier to discover, remember and choose.",
      ),
      p(
        "If you want to know whether your brand would be found by an AI system today, [talk to our team](/contact).",
      ),
    ],
    bodyAr: [
      p("البحث يتغيّر."),
      p(
        "لسنوات طويلة، تنافست العلامات التجارية على الظهور في نتائج جوجل. كانت الترتيبات والكلمات المفتاحية والروابط الخلفية والنقرات هي معايير اللعبة.",
      ),
      p(
        "أما اليوم، فيتزايد لجوء الناس إلى أنظمة الذكاء الاصطناعي للحصول على إجابات مباشرة، بدلاً من البحث بين عشرة مواقع إلكترونية مختلفة. يسألون مثلاً:",
      ),
      p("«ما هي أفضل وكالة لبناء العلامات التجارية في دبي؟»"),
      p("«مع أي وكالة رقمية يجب أن أعمل لبناء علامة تجارية فاخرة؟»"),
      p("«من يستطيع مساعدتي في بناء استراتيجية تسويقية قائمة على الأداء؟»"),
      p(
        "قد تصل الإجابة من منصة ذكاء اصطناعي قبل أن يزور المستخدم أي نتيجة بحث تقليدية على الإطلاق. وهذا يُغيّر المقصود فعلياً بظهور العلامة التجارية.",
      ),
      h2("تحسين محركات البحث لم يعد الاستراتيجية الوحيدة للبحث"),
      p(
        "لا يزال تحسين محركات البحث (SEO) مهماً. لكن البحث أصبح أكثر حوارية وسياقية، ويعتمد بشكل متزايد على تقديم إجابة مباشرة.",
      ),
      p(
        "أنظمة الذكاء الاصطناعي لا تكتفي بالبحث عن صفحات تحتوي على كلمة مفتاحية معينة، بل تحاول فهم الكيانات والخبرة والسياق والمصداقية ومدى الملاءمة.",
      ),
      p(
        "هذا يعني أن على العلامات التجارية أن تتجاوز سؤال «كيف أحقق ترتيباً أفضل؟» لتبدأ بطرح سؤال جديد: «كيف أصبح أنا الإجابة؟»",
      ),
      p(
        "وهنا يبرز دور تحسين محركات الإجابة — Answer Engine Optimization أو AEO — الذي بات ذا أهمية متزايدة.",
      ),
      h2("ما هو تحسين محركات الإجابة (AEO)؟"),
      p(
        "تحسين محركات الإجابة هو ممارسة تهدف إلى هيكلة الحضور الرقمي للعلامة التجارية بحيث تتمكن محركات الإجابة وأنظمة البحث المدعومة بالذكاء الاصطناعي من فهم معلوماتها وتقييمها، وربما الاستشهاد بها لاحقاً.",
      ),
      p(
        "هو لا يحل محل تحسين محركات البحث، بل يوسّع من هدفه. فتحسين محركات البحث التقليدي يركّز غالباً على الفوز بالنقرة، بينما يركّز تحسين محركات الإجابة على أن تصبح العلامة التجارية إجابة مفيدة فعلاً. والاستراتيجية الأقوى هي التي تجمع بين الاثنين بشكل متزايد.",
      ),
      h2("موقعكم الإلكتروني أكثر من مجرد بروشور رقمي"),
      p(
        "لا ينبغي أن يكتفي الموقع الإلكتروني بشرح ما تقوم به الشركة، بل يجب أن يجعل خبرتها مفهومة بوضوح. وهذا يعني بناء إشارات واضحة حول ماذا تفعل العلامة التجارية، ولمن تُقدّم خدماتها، وأين تعمل، وبماذا تشتهر، وما المشكلات التي تحلّها، وما خبرتها الفعلية، وما الأدلة التي تدعم هذه الخبرة.",
      ),
      p(
        "قد يبدو الموقع المصمم بعناية فائقة مبهراً حتى لو كان محتواه غامضاً، لكنه في الوقت ذاته يظل صعب الفهم على الزوار وعلى أنظمة البحث معاً. فالتصميم يخلق الانطباع، بينما [البنية هي ما يخلق الفهم](/ar/services/website-development). وأنتم بحاجة إلى الاثنين معاً.",
      ),
      h2("المحتوى يجب أن يصبح أكثر فائدة"),
      p(
        "لم يعد نشر المحتوى لمجرد أن الموقع «يحتاج إلى مدونة» أمراً كافياً. السؤال الأجدر بالطرح هو: ما الأسئلة التي يطرحها جمهورنا فعلياً قبل اتخاذ قرار الشراء؟",
      ),
      p(
        "بالنسبة لوكالة بناء العلامات التجارية، يمكن أن تشمل هذه الأسئلة: ما الذي يمنح العلامة الفاخرة إحساسها المميز؟ كم تبلغ تكلفة بناء علامة تجارية في دبي؟ ما الذي يجب أن تتضمنه استراتيجية العلامة التجارية؟ ما الفرق بين بناء العلامة التجارية والتسويق؟ كيف يؤثر البحث بالذكاء الاصطناعي على تحسين محركات البحث؟ كيف يمكن لشركة ما تحسين حضورها الرقمي؟ ومتى يجب على شركة إعادة صياغة علامتها التجارية؟",
      ),
      p(
        "كل سؤال من هذه الأسئلة يمثّل فرصة لإظهار الخبرة. فالهدف ليس إنتاج محتوى أكثر، بل إنتاج معرفة أكثر فائدة.",
      ),
      h2("سلطة العلامة التجارية تُحدث فرقاً حقيقياً"),
      p(
        "ظهور العلامة التجارية أمام الذكاء الاصطناعي ليس مجرد مسألة تقنية متعلقة بتحسين محركات البحث، بل هو أيضاً مسألة تتعلق بسلطة العلامة التجارية ومصداقيتها. فعندما يكون لشركة ما حضور متسق عبر موقعها الإلكتروني وملفاتها المهنية ومنشوراتها ودراسات حالتها ومصادرها الموثوقة الأخرى، يصبح من الأسهل على الأنظمة فهمها ككيان واضح المعالم.",
      ),
      p(
        "هذا يعني أن بصمتكم الرقمية تحتاج إلى الاتساق. يجب ألا [يتغيّر موقع علامتكم التجارية](/ar/services/branding) من منصة إلى أخرى. يجب أن تكون خبرتكم واضحة، وخدماتكم منظّمة، وأعمالكم مدعومة بأدلة فعلية، ومحتواكم يُظهر فهماً حقيقياً للمواضيع التي تدّعون التخصص فيها.",
      ),
      h2("مستقبل البحث أصبح متعدد القنوات"),
      p(
        "لم تعد رحلة العميل مجرد مسار خطي: جوجل ← الموقع الإلكتروني ← التواصل. بل أصبحت اليوم أقرب إلى: التواصل الاجتماعي ← البحث ← الذكاء الاصطناعي ← الموقع الإلكتروني ← التقييمات ← لينكدإن ← واتساب ← المحادثة.",
      ),
      p(
        "كل نقطة تواصل تُسهم في القرار النهائي. لهذا السبب لم يعد بالإمكان التعامل مع التسويق الرقمي كقنوات منفصلة عن بعضها. يجب أن يعزز تحسين محركات البحث والمحتوى والتواصل الاجتماعي وبناء العلامة التجارية وتجربة الموقع الإلكتروني والإعلانات المدفوعة الموقع نفسه من العلامة التجارية. يجب أن تشعروا أن العلامة التجارية واحدة أينما ظهرت.",
      ),
      h2("ما الذي يجب على العلامات التجارية فعله الآن"),
      p(
        "لا حاجة للتخلي عن تحسين محركات البحث التقليدي. بل يجب بناء [استراتيجية بحث أوسع](/ar/services/seo).",
      ),
      h3("01 — بناء كيانات واضحة للعلامة التجارية"),
      p("اجعلوا هويتكم واضحة تماماً: من أنتم، وماذا تفعلون، وأين تعملون، وما تخصصكم."),
      h3("02 — إنتاج محتوى مفيد فعلياً"),
      p("أجيبوا عن أسئلة العملاء الحقيقية بعمق ووضوح ووجهة نظر مميزة."),
      h3("03 — تعزيز بنية موقعكم الإلكتروني"),
      p("استخدموا تنقلاً واضحاً وعناوين وصفية وروابط داخلية ومعلومات منظّمة."),
      h3("04 — إظهار الخبرة الفعلية"),
      p(
        "استخدموا دراسات الحالة والرؤى والأفكار الأصلية والاعتمادات والخبرة الحقيقية لترسيخ المصداقية.",
      ),
      h3("05 — الحفاظ على اتساق هويتكم الرقمية"),
      p(
        "يجب أن يتحدث موقعكم الإلكتروني وملفاتكم على وسائل التواصل الاجتماعي والدلائل والمنصات المهنية بنفس الموقع الأساسي للعلامة التجارية.",
      ),
      h2("السؤال الجديد"),
      p("لسنوات طويلة، كان المسوّقون يسألون: «هل نحتل ترتيباً جيداً على جوجل؟» وهذا السؤال لا يزال مهماً."),
      p(
        "لكن سؤالاً آخر بات لا يقل أهمية: «عندما يسأل أحدهم نظام ذكاء اصطناعي عن مجال عملنا، هل تحضر علامتنا التجارية ضمن الإجابة؟» هذا هو التحول الحقيقي.",
      ),
      p(
        "فظهور العلامة في نتائج البحث لم يعد يقتصر على امتلاك موقع مرتفع في صفحة النتائج، بل أصبح جزءاً من المنظومة المعلوماتية الأوسع التي تُشكّل الإجابة نفسها. والعلامات التجارية التي تدرك هذا التحول مبكراً ستحظى بأفضلية حقيقية، ليس لأن الذكاء الاصطناعي يُلغي البحث، بل لأن البحث نفسه يتطور.",
      ),
      h2("أين يأتي دور SHARIO"),
      p(
        "في SHARIO، ننظر إلى الحضور الرقمي كمنظومة متكاملة، حيث تعمل العلامة التجارية والمحتوى والتصميم والتقنية والأداء معاً في انسجام تام. لأن الظهور بلا معنى حقيقي هو ظهور مؤقت، والعلامة التجارية المفهومة جيداً هي الأسهل اكتشافاً وتذكراً واختياراً.",
      ),
      p(
        "إذا كنتم ترغبون في معرفة ما إذا كانت علامتكم التجارية قابلة للاكتشاف اليوم عبر أنظمة الذكاء الاصطناعي، [تواصلوا مع فريقنا](/ar/contact).",
      ),
    ],
    bodyRu: [
      p("Поиск меняется."),
      p(
        "Годами бренды боролись за видимость в Google. Позиции в выдаче, ключевые слова, обратные ссылки и клики определяли правила игры.",
      ),
      p(
        "Сегодня всё больше людей обращаются за ответами напрямую к системам искусственного интеллекта — вместо того чтобы просматривать десяток сайтов, они спрашивают:",
      ),
      p("«Какое агентство брендинга в Дубае лучшее?»"),
      p("«С каким digital-агентством стоит работать над люксовым брендом?»"),
      p("«Кто поможет выстроить performance-ориентированную маркетинговую стратегию?»"),
      p(
        "Ответ может прийти от ИИ-платформы ещё до того, как пользователь вообще зайдёт на сайт из традиционной выдачи. Это меняет само понятие видимости бренда.",
      ),
      h2("SEO больше не вся поисковая стратегия"),
      p(
        "SEO по-прежнему важно. Но поиск становится всё более разговорным, контекстным и ориентированным на прямой ответ.",
      ),
      p(
        "Системы ИИ не просто ищут страницы с нужным ключевым словом — они пытаются понять сущности, экспертизу, контекст, доверие и релевантность.",
      ),
      p(
        "Это значит, что брендам пора выходить за рамки вопроса «Как мне подняться в рейтинге?» и начинать задавать другой: «Как мне стать самим ответом?»",
      ),
      p(
        "Именно здесь всё большую роль играет оптимизация под системы ответов — Answer Engine Optimization, или AEO.",
      ),
      h2("Что такое AEO — оптимизация под системы ответов"),
      p(
        "AEO — это практика выстраивания цифрового присутствия бренда таким образом, чтобы системы ответов и ИИ-поиск могли лучше понимать, оценивать и, возможно, цитировать его информацию.",
      ),
      p(
        "AEO не заменяет SEO — оно расширяет саму цель. Классическое SEO чаще всего нацелено на клик; AEO нацелено на то, чтобы стать по-настоящему полезным ответом. Самая сильная стратегия сегодня всё чаще объединяет и то, и другое.",
      ),
      h2("Ваш сайт — это больше, чем цифровая брошюра"),
      p(
        "Сайт не должен просто рассказывать, чем занимается компания, — он должен делать её экспертизу понятной. Это значит выстраивать чёткие сигналы вокруг того, чем занимается бренд, кому он служит, где он работает, чем он известен, какие проблемы решает, какой экспертизой обладает и какие доказательства эту экспертизу подтверждают.",
      ),
      p(
        "Красиво оформленный сайт с расплывчатым содержанием может производить впечатление, но при этом оставаться непонятным и людям, и поисковым системам. Дизайн создаёт восприятие. [Структура создаёт понимание](/ru/services/website-development). Нужно и то, и другое.",
      ),
      h2("Контент должен стать по-настоящему полезным"),
      p(
        "Публиковать контент просто потому, что у сайта «должен быть блог», уже недостаточно. Более верный вопрос звучит так: какие вопросы наша аудитория реально задаёт перед тем, как принять решение?",
      ),
      p(
        "Для агентства брендинга это могут быть вопросы вроде: что делает премиальный бренд премиальным? сколько стоит брендинг в Дубае? что должно входить в брендовую стратегию? в чём разница между брендингом и маркетингом? как ИИ-поиск влияет на SEO? как бизнесу улучшить своё цифровое присутствие? когда компании стоит проводить ребрендинг?",
      ),
      p(
        "Каждый такой вопрос — это возможность показать экспертизу. Цель не в том, чтобы производить больше контента, а в том, чтобы производить больше по-настоящему полезного знания.",
      ),
      h2("Авторитет бренда имеет значение"),
      p(
        "Видимость в ИИ-поиске — это не только техническая задача SEO. Это ещё и вопрос авторитета бренда. Если у компании последовательное присутствие на сайте, в профессиональных профилях, публикациях, кейсах и других надёжных источниках, системе становится проще распознать её как понятную сущность.",
      ),
      p(
        "Это значит, что ваш цифровой след должен быть последовательным. Ваше [позиционирование бренда](/ru/services/branding) не должно меняться от платформы к платформе. Экспертиза должна быть ясной, услуги — структурированными, работы — подтверждёнными доказательствами, а контент — показывать, что вы действительно разбираетесь в темах, в которых заявляете экспертизу.",
      ),
      h2("Будущее поиска — мультиканальное"),
      p(
        "Путь клиента больше не описывается формулой Google → сайт → обращение. Сегодня он выглядит скорее так: соцсети → поиск → ИИ → сайт → отзывы → LinkedIn → WhatsApp → разговор.",
      ),
      p(
        "Каждая точка контакта влияет на решение. Именно поэтому цифровой маркетинг больше нельзя рассматривать как набор изолированных каналов. SEO, контент, соцсети, брендинг, опыт взаимодействия с сайтом и платная реклама должны усиливать одно и то же позиционирование. Бренд должен ощущаться одним и тем же брендом везде.",
      ),
      h2("Что брендам стоит делать уже сейчас"),
      p(
        "Отказываться от классического SEO не нужно. Вместо этого стоит выстроить более широкую [поисковую стратегию](/ru/services/seo).",
      ),
      h3("01 — Выстроить понятные бренд-сущности"),
      p("Сделайте предельно ясным, кто вы, чем занимаетесь, где работаете и в чём ваша специализация."),
      h3("02 — Создавать по-настоящему полезный контент"),
      p("Отвечайте на реальные вопросы клиентов глубоко, ясно и с собственной точкой зрения."),
      h3("03 — Укрепить структуру сайта"),
      p(
        "Используйте понятную навигацию, содержательные заголовки, внутренние ссылки и структурированную информацию.",
      ),
      h3("04 — Демонстрировать экспертизу"),
      p(
        "Используйте кейсы, инсайты, оригинальные идеи, подтверждённый опыт и реальную практику, чтобы закрепить авторитет.",
      ),
      h3("05 — Сохранять последовательность цифровой идентичности"),
      p(
        "Сайт, профили в соцсетях, справочники и профессиональные платформы должны транслировать одно и то же ключевое позиционирование.",
      ),
      h2("Новый вопрос"),
      p("Годами маркетологи спрашивали: «Ранжируемся ли мы в Google?» Этот вопрос по-прежнему важен."),
      p(
        "Но всё более важным становится другой: «Когда кто-то спрашивает ИИ-систему о нашей категории, оказывается ли наш бренд внутри ответа?» Именно в этом суть сдвига.",
      ),
      p(
        "Видимость в поиске смещается от простого владения позицией на странице к тому, чтобы стать частью информационной экосистемы, формирующей сам ответ. Бренды, которые осознают это раньше других, получат реальное преимущество — не потому, что ИИ заменяет поиск, а потому, что сам поиск продолжает меняться.",
      ),
      h2("Где здесь место SHARIO"),
      p(
        "В SHARIO мы рассматриваем цифровое присутствие как единую связанную систему, в которой бренд, контент, дизайн, технологии и результативность работают вместе. Потому что видимость без смысла — временна, а бренд, который понятен, легче найти, запомнить и выбрать.",
      ),
      p(
        "Если хотите узнать, найдёт ли ИИ-система ваш бренд уже сегодня, [свяжитесь с нашей командой](/ru/contact).",
      ),
    ],
  },
  {
    slug: "answer-engine-optimization",
    category: "answer-engine-optimization",
    secondaryCategories: ["seo"],
    tags: ["AEO", "Answer Engine Optimization", "AI Search", "AI Search Optimization", "SEO", "GEO", "Generative Search"],
    contentType: "pillar",
    featured: true,
    locales: ["en"],
    title: "Answer Engine Optimization (AEO): What It Is, How It Works & How to Get Started",
    seoTitle: "Answer Engine Optimization: AEO Guide for 2026",
    excerpt:
      "Answer Engine Optimization (AEO) is the practice of making content easier for AI-powered search systems to discover, understand and cite. Here's what it is, how it works, and how to get started.",
    metaDescription:
      "Learn what answer engine optimization (AEO) is, how it works, how it differs from SEO and GEO, and practical ways to improve AI search visibility.",
    date: "26 Aug 2026",
    readingTime: "43 min read",
    image: "/images/insights/answer-engine-optimization-search-to-answer.jpg",
    imageAlt:
      "A softly lit editorial photograph of an open SHARIO brand lookbook, spread across a page reading 'Designed. Growth Delivered.' beside architectural and botanical brand imagery",
    imageTopic: "Answer Engine Optimization (AEO)",
    faqs: [
      {
        q: "What does AEO stand for?",
        a: "AEO stands for Answer Engine Optimization. It refers to practices intended to make content easier for answer engines and AI-powered search systems to understand, retrieve and potentially use when answering user questions.",
      },
      {
        q: "Is AEO replacing SEO?",
        a: "No. AEO does not replace SEO. Google states that its AI search features continue to rely on core Search systems and that existing SEO best practices remain relevant.",
      },
      {
        q: "Is AEO similar to SEO?",
        a: "Yes. They share many foundations, including technical accessibility, useful content, search intent, site structure and authority. The main difference is the search experience being emphasized: traditional search visibility versus visibility within direct or AI-generated answers.",
      },
      {
        q: "What is the difference between AEO and GEO?",
        a: "The terms overlap significantly. AEO is often used for answer-focused optimization, while GEO is sometimes used for broader visibility within generative AI systems. There is no universally accepted boundary between them.",
      },
      {
        q: "What is an example of AEO?",
        a: "A simple example is creating a page that directly answers a question such as “What is technical SEO?” The page gives a concise definition first, then explains the concept, provides examples, answers related questions and supports important claims.",
      },
      {
        q: "How do I start AEO?",
        a: "Start with real customer and search questions. Group them by intent, create direct answers, improve technical SEO and internal linking, strengthen topical authority, and monitor how AI search systems represent your content.",
      },
      {
        q: "What does an AEO audit include?",
        a: "An AEO audit can examine content quality, question coverage, entity clarity, technical SEO, structured content, internal linking, authority signals and visibility across relevant AI search experiences.",
      },
      {
        q: "Are there AEO tools?",
        a: "Yes. AEO workflows can use traditional SEO and analytics tools, search-console data, website crawlers, structured-data tools, content research platforms and AI visibility monitoring tools. No single tool covers every part of AEO.",
      },
      {
        q: "Can I do AEO myself?",
        a: "Yes. A business with a solid understanding of SEO, content strategy and its audience can implement many AEO practices internally. More complex programs may require technical, editorial and analytics expertise.",
      },
      {
        q: "Is there an AEO course or certification?",
        a: "There are courses and training resources covering AEO and AI search, but there is no single universally recognized AEO certification that defines the discipline. Evaluate training based on the quality of its methodology, evidence and practical guidance.",
      },
    ],
    body: [
      h2("Quick Answer"),
      p(
        "**Answer Engine Optimization (AEO)** is the practice of making digital content easier for answer engines and AI-powered search systems to discover, understand, retrieve, summarize and cite when responding to user questions. AEO builds on strong SEO fundamentals but places greater emphasis on clear answers, well-defined entities, useful structure, trustworthy information and content that directly addresses conversational queries. It is not a replacement for SEO; it is better understood as part of a broader approach to visibility across modern search and AI answer experiences.",
      ),

      h2("What Is Answer Engine Optimization?"),
      p(
        "**Answer Engine Optimization, or AEO, is the practice of optimizing content so that answer engines can understand it and potentially use it when generating answers to people's questions.**",
      ),
      p(
        "Traditional search is built around a results page: a person enters a query and receives a collection of links ranked by relevance and other signals.",
      ),
      p(
        "Answer-oriented search experiences increasingly do something different. They can interpret a question, retrieve information from multiple sources, synthesize that information and present an answer directly, sometimes with links or citations to supporting sources.",
      ),
      p(
        "Google's AI Overviews, for example, provide AI-generated snapshots with links to supporting web content, while Google AI Mode is designed for more conversational, multi-step exploration and can break a question into subtopics before searching for information.",
      ),
      p("This changes what visibility can mean."),
      p("Instead of asking only:"),
      blockquote("“How do I rank this page?”"),
      p("A modern search strategy may also ask:"),
      blockquote(
        "“Is this page clear, trustworthy and useful enough to be retrieved and represented accurately in an AI-generated answer?”",
      ),
      p("That is where AEO comes in."),
      p(
        "AEO is not a secret set of tags or a separate Google ranking system. Google explicitly says that its AI search features continue to rely on core Search ranking and quality systems and that there are **no additional technical requirements specifically required for appearing in AI Overviews or AI Mode** beyond being eligible for Google Search.",
      ),
      p("In practical terms, good AEO means creating content that is:"),
      ul([
        "Easy to discover",
        "Easy to understand",
        "Easy to extract accurately",
        "Clearly associated with the right entities",
        "Well supported by evidence where appropriate",
        "Structured around real questions",
        "Useful to people first",
      ]),

      h2("Why Does Answer Engine Optimization Matter?"),
      p("Search behaviour is becoming more conversational."),
      p(
        "People increasingly ask complete questions rather than entering short keyword combinations. AI-powered search experiences can then interpret those questions, explore related information and provide a synthesized response.",
      ),
      p(
        "Google describes AI Mode as an experience that can divide a question into subtopics and search for each one simultaneously, bringing information together into a response with links to supporting web content.",
      ),
      p("That creates several implications for content creators and businesses."),
      h3("1. Search visibility is becoming more than a ranking position"),
      p(
        "A page can still rank traditionally while another source is selected or cited within an AI-generated response.",
      ),
      p(
        "That means marketers need to think beyond rankings alone — see how [AI search is changing what 'ranking' means](/insights/ai-search-changing-what-ranking-means) for a closer look at that shift.",
      ),
      h3("2. Clear answers become increasingly valuable"),
      p(
        "If a page takes several paragraphs to eventually answer a simple question, it is harder for both humans and machines to understand its primary point.",
      ),
      p("AEO encourages a stronger answer-first approach:"),
      p(
        "**Question → direct answer → explanation → evidence → examples → deeper detail**",
      ),
      h3("3. Conversational queries require broader topical coverage"),
      p("Someone searching:"),
      blockquote("“What is AEO?”"),
      p("may later ask:"),
      blockquote("“Is AEO replacing SEO?”"),
      p("and then:"),
      blockquote("“How do I implement AEO?”"),
      p(
        "A strong resource anticipates those connected questions instead of treating each one as an isolated keyword.",
      ),
      h3("4. Accuracy matters"),
      p(
        "AI systems can make mistakes. Google itself warns that AI-generated search responses may contain errors and recommends checking important information against multiple sources.",
      ),
      p("For publishers, this makes clarity, evidence, attribution and factual accuracy more important—not less."),

      h2("The Core Rule of AEO"),
      blockquote(
        "Rule: Create content that answers a real question clearly enough for both people and search systems to understand, retrieve and verify.",
      ),
      p("AEO does **not** mean writing robotic content for AI."),
      p("It means removing ambiguity."),
      p("A strong AEO page should make it obvious:"),
      ul([
        "What the topic is",
        "Who or what the page is talking about",
        "What the answer is",
        "Why the answer is correct",
        "What evidence supports it",
        "What related questions naturally follow",
        "Where the reader should go next",
      ]),
      p(
        "The best AEO practices therefore overlap heavily with good SEO, good UX writing and good editorial work.",
      ),

      h2("How Does Answer Engine Optimization Work?"),
      p("There is no single universal AEO algorithm shared by every AI search product."),
      p(
        "Different systems use different models, indexes, retrieval systems and ranking processes.",
      ),
      p("However, a useful conceptual model looks like this:"),
      h3("1. The system interprets the question"),
      p("A user may ask:"),
      blockquote("“What is the difference between AEO and SEO?”"),
      p("The system has to understand the intent behind the question."),
      p("It may identify concepts such as:"),
      ul(["AEO", "SEO", "comparison", "definitions", "practical differences"]),
      p(
        "Modern AI search can also expand a complex question into related searches. Google says AI Mode uses a technique called **query fan-out**, where it breaks a question into subtopics and searches for them across multiple sources.",
      ),
      h3("2. Relevant information is retrieved"),
      p("The system looks for information that may help answer the query."),
      p(
        "For Google AI features, Google explains that its generative search experiences are rooted in Search systems and can use retrieval-augmented generation to ground responses in relevant web content.",
      ),
      p("This is why basic SEO still matters."),
      p(
        "If a page cannot be crawled, indexed or understood properly, there is less opportunity for it to become part of the retrieval process.",
      ),
      h3("3. Candidate information is evaluated"),
      p(
        "The system has to determine which information is relevant and useful enough to support the answer.",
      ),
      p(
        "This is where factors such as relevance, clarity, authority, freshness and supporting evidence can become important depending on the query and system.",
      ),
      h3("4. The answer is generated or displayed"),
      p("The system may then summarize information into a direct response."),
      p("Depending on the search experience, the source may be:"),
      ul(["Linked", "Cited", "Mentioned", "Used as supporting information", "Extracted into an answer", "Or not visibly referenced at all"]),
      p("This is one reason AEO should not be reduced to a single metric such as rankings."),
      h3("5. The user continues the search"),
      p("The first question may lead to another. For example:"),
      p(
        "**What is AEO?** → **How is AEO different from SEO?** → **How do I implement AEO?** → **What tools can I use to measure it?**",
      ),
      p("Good AEO content anticipates this journey."),

      h2("How to Do Answer Engine Optimization"),
      p("AEO is not one technical task. It is a content and search strategy built from several practices."),
      h3("1. Start with real questions"),
      p("Don't begin with:"),
      blockquote("“What keyword can we insert?”"),
      p("Begin with:"),
      blockquote("“What is the person actually trying to understand?”"),
      p("Build content around questions such as:"),
      ul([
        "What is answer engine optimization?",
        "How does AEO work?",
        "Is AEO replacing SEO?",
        "How is AEO different from GEO?",
        "How do I implement AEO?",
        "What does an AEO audit include?",
        "What are AEO tools?",
        "How can I improve AI search visibility?",
      ]),
      p("The keyword remains important, but the underlying question is more important."),
      h3("2. Give the answer early"),
      p("For definition searches, the first useful paragraph should answer the question directly. For example:"),
      p(
        "**Answer Engine Optimization (AEO) is the practice of structuring and improving content so AI-powered answer systems can discover, understand and potentially use it when responding to user questions.**",
      ),
      p("Then explain the concept."),
      p("Do not make the reader scroll through a long introduction before finding the definition."),
      h3("3. Structure content around questions"),
      p("Useful structures include:"),
      ul(["H2 questions", "H3 follow-up questions", "Short direct answers", "Bulleted explanations", "Numbered processes", "Comparison tables", "Examples", "FAQs"]),
      p("This helps readers scan the page and makes relationships between questions and answers clearer."),
      h3("4. Define important entities clearly"),
      p("If an article discusses a company, product, service, person, location or concept, make the identity clear."),
      p("For example, don't repeatedly use vague phrases such as:"),
      blockquote("the platform"),
      p("when several platforms have already been mentioned."),
      p("Instead, identify the entity precisely."),
      p("Clear entities help both readers and information systems understand what a statement refers to."),
      h3("5. Make claims easy to verify"),
      p("When making factual, statistical or technical claims, provide appropriate supporting evidence. For example:"),
      p("**Weak:**"),
      blockquote("AI search is changing everything."),
      p("**Stronger:**"),
      blockquote(
        "Google says its AI search features are built on its existing Search systems and continue to rely on core Search quality and ranking practices.",
      ),
      p("The second statement is specific and verifiable."),
      h3("6. Cover the topic comprehensively"),
      p("AEO does not mean making every article extremely long."),
      p("It means covering the questions that genuinely belong to the topic."),
      p("For an AEO guide, that may include:"),
      ol([
        "Definition",
        "How it works",
        "Why it matters",
        "AEO vs SEO",
        "AEO vs GEO",
        "Implementation",
        "Content structure",
        "Technical foundations",
        "Measurement",
        "Common mistakes",
      ]),
      p("The goal is completeness, not word count."),
      h3("7. Keep important answers self-contained"),
      p("If an answer depends on information scattered across five paragraphs, it becomes harder to understand."),
      p("Instead, make important passages self-contained. For example:"),
      blockquote(
        "**AEO does not replace SEO.** Google states that its AI search features rely on core Search systems and that existing SEO best practices remain relevant. AEO is better understood as a way of improving content for answer-oriented search experiences alongside traditional SEO.",
      ),
      p("That paragraph can stand on its own."),
      h3("8. Maintain strong technical SEO"),
      p("AEO does not eliminate technical SEO."),
      p(
        "Google states that pages need to meet normal Search technical requirements and be eligible to appear in Search in order to be considered as supporting links in AI Overviews or AI Mode.",
      ),
      p(
        "Continue to pay attention to the [technical foundations of your site](/services/website-development), including:",
      ),
      ul([
        "Crawlability",
        "Indexability",
        "[Page performance](/insights/real-cost-of-a-slow-website)",
        "Mobile usability",
        "Internal links",
        "Canonicalization",
        "Structured data where appropriate",
        "Clear site architecture",
        "Descriptive titles",
        "Useful headings",
      ]),
      h3("9. Use structured data accurately"),
      p("Structured data can help search systems understand what a page represents."),
      p("Depending on the content, appropriate schema may include:"),
      ul(["Article", "FAQPage", "BreadcrumbList", "Organization", "Product", "LocalBusiness"]),
      p(
        "But structured data should accurately describe visible page content. It should not be treated as a shortcut for obtaining AI visibility.",
      ),
      h3("10. Build authority beyond one page"),
      p("A strong answer does not exist in isolation."),
      p("A website with related, well-connected pages can provide clearer context around a subject."),
      p("For example, an AEO topic cluster could include:"),
      ul([
        "What Is Answer Engine Optimization?",
        "AEO vs SEO",
        "AEO vs GEO",
        "How to Do AEO",
        "AEO Content Strategy",
        "AEO Audit",
        "AEO Tools",
        "How to Measure AI Search Visibility",
      ]),
      p("The pillar page provides the broad explanation, while supporting pages answer narrower questions."),

      h2("Correct Examples of AEO in Practice"),
      p("Here are original examples of what an answer-focused content approach can look like."),
      h3("Example 1 — Definition"),
      p("**Question:** What is AEO?"),
      p(
        "**Answer:** Answer Engine Optimization is the practice of improving content so answer engines can understand, retrieve and potentially use it when responding to user questions.",
      ),
      h3("Example 2 — Comparison"),
      p("**Question:** Is AEO the same as SEO?"),
      p(
        "**Answer:** No. AEO and SEO overlap, but SEO primarily focuses on visibility in search results, while AEO emphasizes visibility within direct answers and AI-powered search experiences.",
      ),
      h3("Example 3 — Process"),
      p("**Question:** How do I start AEO?"),
      p(
        "**Answer:** Start by identifying the questions your audience asks, create direct answers to those questions, strengthen your site's technical SEO and authority, and monitor how AI search systems represent your content.",
      ),
      h3("Example 4 — Business"),
      p("A B2B company creates a page answering:"),
      blockquote("What does CRM automation do?"),
      p(
        "It provides a concise definition of [CRM automation](/services/crm-marketing-automation), examples, implementation considerations and links to related resources.",
      ),
      h3("Example 5 — Local Search"),
      p("A Dubai restaurant publishes a useful page explaining:"),
      blockquote("What is the difference between a business lunch and a private dining experience?"),
      p("The page clearly defines both concepts and provides relevant practical information."),
      h3("Example 6 — Product Research"),
      p("An electronics company creates a comparison explaining:"),
      blockquote("What is the difference between OLED and Mini-LED?"),
      p("The article defines both technologies before presenting a comparison table."),
      h3("Example 7 — Professional Communication"),
      p("A communication studio publishes:"),
      blockquote("How do you write a professional follow-up email?"),
      p("The answer appears immediately, followed by examples for different situations."),
      h3("Example 8 — Financial Education"),
      p("A financial publisher explains:"),
      blockquote("What is compound interest?"),
      p("The definition is followed by a simple example, formula and practical explanation."),
      h3("Example 9 — Service Research"),
      p("A marketing agency explains:"),
      blockquote("What does a technical SEO audit include?"),
      p("The page lists the major audit areas and explains what each one evaluates."),
      h3("Example 10 — Complex Question"),
      p("A real estate company answers:"),
      blockquote("What should investors consider before buying an off-plan property in Dubai?"),
      p(
        "Instead of providing a generic sales page, the content addresses the actual decision factors, terminology, risks and due-diligence considerations.",
      ),

      h2("Incorrect vs. Correct AEO Approaches"),
      table(
        ["❌ Incorrect", "✅ Correct", "Why"],
        [
          [
            "Stuff the page with the phrase “answer engine optimization”",
            "Use the term naturally where it helps the reader",
            "Keyword repetition does not create useful content",
          ],
          [
            "Write one giant paragraph answering everything",
            "Break information into logical sections",
            "Clear structure improves comprehension",
          ],
          [
            "Hide the definition halfway down the page",
            "Give the definition near the beginning",
            "Searchers often need an immediate answer",
          ],
          [
            "Create FAQ questions unrelated to the page",
            "Use genuine questions connected to the topic",
            "Relevance matters more than FAQ volume",
          ],
          ["Add unsupported statistics", "Cite or remove factual claims", "Accuracy strengthens trust"],
          [
            "Create separate pages for every tiny keyword variation",
            "Consolidate closely related intent when appropriate",
            "Prevents thin or repetitive content",
          ],
          [
            "Use schema to describe information not visible on the page",
            "Use accurate structured data",
            "Markup should represent the page correctly",
          ],
          [
            "Remove SEO because “AI search replaces Google”",
            "Continue strong technical and content SEO",
            "Google says core SEO practices remain relevant to AI features",
          ],
          ["Write only for AI systems", "Write for people first", "Useful human content remains the foundation"],
          [
            "Assume one AI answer represents permanent visibility",
            "Monitor multiple queries and systems",
            "AI outputs can vary",
          ],
        ],
      ),

      h2("Why People Get AEO Wrong"),
      p("AEO is still a relatively young and inconsistently defined marketing discipline."),
      p(
        "One source may use AEO to describe optimization for featured snippets and direct answers. Another may use it primarily for AI assistants and generative search.",
      ),
      p(
        "The terminology around **AEO and GEO is particularly inconsistent**. Current industry sources commonly treat the terms as overlapping, while some distinguish AEO as answer-focused optimization and GEO as broader generative-engine visibility.",
      ),
      p("That makes one principle especially important:"),
      p("**Focus on the underlying work, not the label.**"),
      p("If your strategy improves:"),
      ul([
        "Content clarity",
        "Search relevance",
        "Entity understanding",
        "Technical accessibility",
        "Evidence",
        "Authority",
        "Answer structure",
        "User experience",
      ]),
      p("you are building foundations that can support both traditional search and AI-powered search."),

      h2("Common AEO Mistakes Checklist"),
      h3("1. Treating AEO as a replacement for SEO"),
      p("**Why it happens:** AI search feels like a completely new search environment."),
      p("**How to avoid it:** Keep technical SEO, content quality, crawlability and indexing at the centre of the strategy."),
      h3("2. Writing for machines instead of people"),
      p("**Why it happens:** Marketers become obsessed with being “cited by AI.”"),
      p("**How to avoid it:** Write the clearest answer for the person first."),
      h3("3. Creating pages around every keyword variation"),
      p("**Why it happens:** Keyword tools produce hundreds of related queries."),
      p("**How to avoid it:** Group queries by search intent rather than creating a separate page for every variation."),
      h3("4. Publishing generic AI-generated content"),
      p("**Why it happens:** AI makes producing large amounts of content easy."),
      p("**How to avoid it:** Add original examples, first-hand knowledge, useful analysis, evidence and clear editorial judgment."),
      h3("5. Using unsupported claims"),
      p("**Why it happens:** AI-generated drafts often contain plausible-sounding statements."),
      p("**How to avoid it:** Verify factual claims before publication."),
      h3("6. Ignoring traditional search"),
      p("**Why it happens:** The phrase “answer engine” makes conventional SEO sound outdated."),
      p("**How to avoid it:** Treat AEO as an extension of modern search visibility, not a reason to abandon SEO."),
      h3("7. Measuring only rankings"),
      p("**Why it happens:** Rankings are familiar and easy to report."),
      p("**How to avoid it:** Also monitor AI mentions, citations, referral traffic, branded search and conversions where measurable."),
      h3("8. Assuming every AI answer can be optimized directly"),
      p("**Why it happens:** Marketers expect a controllable ranking position."),
      p(
        "**How to avoid it:** Understand that AI responses can vary by query, context, location, model and retrieval conditions.",
      ),

      h2("AEO in Real English: What the Term Actually Means"),
      h3("Grammatically correct"),
      blockquote("We are improving our website's answer engine optimization."),
      p("The phrase is grammatically valid and uses AEO as a noun phrase describing an optimization discipline."),
      h3("Grammatically possible but unnatural"),
      blockquote("We are doing an answer engine optimization for our website."),
      p("The meaning is understandable, but “doing an optimization” is less natural in professional English."),
      p("More natural alternatives include:"),
      ul([
        "We are implementing an AEO strategy.",
        "We are optimizing the site for AI search.",
        "We are improving our answer engine optimization.",
      ]),
      h3("Natural professional English"),
      p("In marketing and SEO contexts, these forms are generally more natural:"),
      ul([
        "**AEO strategy**",
        "**AEO audit**",
        "**AEO implementation**",
        "**AEO content**",
        "**AEO services**",
        "**AEO tools**",
        "**AEO best practices**",
        "**AI search optimization**",
      ]),
      p("The abbreviation **AEO** is especially useful after the full term has been introduced."),

      h2("AEO vs SEO"),
      p("AEO and SEO overlap substantially, but they emphasize different search experiences."),
      table(
        ["Feature", "SEO", "AEO"],
        [
          ["Full form", "Search Engine Optimization", "Answer Engine Optimization"],
          ["Primary focus", "Search visibility", "Answer visibility"],
          ["Typical surface", "Search results pages", "Direct answers and AI search experiences"],
          ["Core objective", "Earn visibility and clicks", "Help content become a useful answer or source"],
          ["Keyword research", "Important", "Important, with stronger emphasis on questions and intent"],
          ["Technical SEO", "Essential", "Still essential"],
          ["Content quality", "Essential", "Essential"],
          ["Structured content", "Useful", "Particularly valuable"],
          ["Entity clarity", "Important", "Particularly important"],
          [
            "Measurement",
            "Rankings, clicks, traffic, conversions",
            "AI visibility, mentions, citations, traffic and conversions where measurable",
          ],
        ],
      ),
      p("The distinction should not be exaggerated."),
      p(
        "Google explicitly says that its AI search features are rooted in its existing Search systems and that [SEO](/services/seo) remains relevant.",
      ),
      p("**The practical approach is not SEO versus AEO. It is SEO plus answer-oriented content.**"),

      h2("AEO vs GEO: What Is the Difference?"),
      p("This is one of the most common related searches in the current AEO landscape."),
      p(
        "**Answer Engine Optimization (AEO)** and **Generative Engine Optimization (GEO)** are often used interchangeably, but some practitioners make a distinction.",
      ),
      p("A useful working distinction is:"),
      ul([
        "**AEO:** focuses on making content suitable for direct answers, answer surfaces and retrieval.",
        "**GEO:** often focuses more broadly on visibility within generative AI systems and generated responses.",
      ]),
      p(
        "However, there is **no universally enforced industry boundary** between the two terms. Current specialist sources explicitly note substantial overlap.",
      ),
      p("For most businesses, the practical work overlaps:"),
      p("**Clear content + strong entities + useful answers + technical accessibility + authority + monitoring.**"),
      p("The terminology matters less than whether the strategy improves actual visibility and accuracy."),

      h2("How to Implement Answer Engine Optimization"),
      p("A practical implementation process can be organized into seven steps."),
      h3("Step 1: Identify your important questions"),
      p("Collect questions from:"),
      ul([
        "Search queries",
        "Search suggestions",
        "Customer conversations",
        "Sales calls",
        "Support questions",
        "Existing website content",
        "Competitor topic gaps",
        "AI search prompts",
        "Industry discussions",
      ]),
      h3("Step 2: Group questions by intent"),
      p("Create categories such as:"),
      ul(["Definition", "Comparison", "How-to", "Problem-solving", "Commercial investigation", "Local", "Transactional"]),
      h3("Step 3: Build answer-first pages"),
      p("For each important question:"),
      ol([
        "Answer it directly.",
        "Explain the answer.",
        "Provide evidence or examples.",
        "Address related questions.",
        "Link to deeper resources.",
      ]),
      h3("Step 4: Strengthen the site's information architecture"),
      p("Connect related pages logically."),
      p("A user reading **What Is AEO?** should naturally be able to reach **AEO vs SEO**, and then **How to Implement AEO**, and then **How to Measure AEO**."),
      h3("Step 5: Improve technical accessibility"),
      p("Check:"),
      ul([
        "Indexing",
        "Crawlability",
        "Rendering",
        "Internal links",
        "Page speed",
        "Mobile experience",
        "Canonicals",
        "Structured data",
        "XML sitemap",
        "Robots directives",
      ]),
      h3("Step 6: Strengthen authority"),
      p("Create content that demonstrates genuine expertise."),
      p("Useful signals may include:"),
      ul([
        "Original research",
        "First-hand experience",
        "Clear authorship",
        "Expert review",
        "Accurate citations",
        "Original data",
        "Reputable references",
        "Consistent brand/entity information",
      ]),
      h3("Step 7: Measure and refine"),
      p("Search your important questions regularly across relevant AI and search experiences."),
      p("Record:"),
      ul([
        "Whether the brand appears",
        "How it is described",
        "Which pages are cited",
        "Which competitors appear",
        "Whether information is accurate",
        "Whether visibility changes over time",
      ]),

      h2("What Are AEO Tools?"),
      p("There is no single tool that “does AEO” for a website."),
      p("A practical AEO toolkit can combine several categories."),
      h3("Search and technical tools"),
      p("Use tools such as:"),
      ul(["Google Search Console", "Google Analytics", "Bing Webmaster Tools", "Website crawlers", "Structured-data testing tools", "Page-performance tools"]),
      h3("Content research tools"),
      p("Useful for discovering:"),
      ul(["Questions", "Search intent", "Related topics", "Content gaps", "Search trends", "Existing rankings"]),
      h3("AI visibility monitoring"),
      p("Track selected prompts across relevant AI search experiences and record:"),
      ul(["Brand mentions", "Competitor mentions", "Citations", "Source pages", "Answer accuracy", "Changes over time"]),
      h3("Editorial tools"),
      p("Use them to improve:"),
      ul(["Clarity", "Grammar", "Readability", "Factual consistency", "Content structure"]),
      p("The important point is that **tools support an AEO strategy; they do not replace one**."),

      h2("What Is an AEO Audit?"),
      p(
        "An **AEO audit** evaluates how effectively a website's content and digital presence can support visibility in answer-oriented and AI-powered search experiences.",
      ),
      p("A useful audit can examine:"),
      h3("Content"),
      ul(["Are important questions answered?", "Are answers direct?", "Is content comprehensive?", "Are explanations clear?", "Are claims supported?"]),
      h3("Entity clarity"),
      ul([
        "Are companies, products and services clearly defined?",
        "Is brand information consistent?",
        "Are important entities connected logically?",
      ]),
      h3("Technical SEO"),
      ul(["Can pages be crawled?", "Are important pages indexed?", "Is the site technically accessible?", "Are internal links strong?"]),
      h3("Structure"),
      ul(["Are headings descriptive?", "Are key answers easy to locate?", "Are tables and lists used where helpful?"]),
      h3("Authority"),
      ul([
        "Does the site demonstrate expertise?",
        "Are important claims supported?",
        "Are reputable third-party references available where appropriate?",
      ]),
      h3("AI visibility"),
      ul([
        "Does the brand appear for relevant questions?",
        "Which pages are cited?",
        "Are descriptions accurate?",
        "Which competitors are being surfaced?",
      ]),
      p(
        "An audit should end with actionable priorities—not simply a score, the same standard that applies to any broader [marketing audit](/services/marketing-consulting).",
      ),

      h2("How Can You Improve Answer Engine Optimization?"),
      p(
        "If a website already has strong SEO foundations, the next improvements often come from improving **answer quality and topical clarity**.",
      ),
      p("Prioritize:"),
      ol([
        "**Answer important questions directly.**",
        "**Create stronger topic clusters.**",
        "**Improve entity clarity.**",
        "**Remove vague or unsupported claims.**",
        "**Add original examples and evidence.**",
        "**Strengthen internal linking.**",
        "**Keep important information current.**",
        "**Improve technical accessibility.**",
        "**Monitor AI search visibility.**",
        "**Update pages based on real user questions.**",
      ]),
      p("Do not respond to the rise of AI search by publishing hundreds of shallow pages."),
      p("A smaller number of genuinely useful resources can provide a stronger foundation."),

      h2("Real-Life Situations"),
      h3("A marketing manager"),
      p("A marketing manager wants to know:"),
      blockquote("What is the difference between AEO and SEO?"),
      p(
        "A strong page answers the distinction immediately, provides a comparison table and then explains how the strategies work together.",
      ),
      h3("A business owner"),
      p("A business owner asks:"),
      blockquote("How can my company appear in AI search?"),
      p(
        "A useful guide explains content, technical SEO, authority, entity clarity and measurement rather than promising a guaranteed ranking.",
      ),
      h3("A content writer"),
      p("A writer asks:"),
      blockquote("How should I structure content for AI search?"),
      p(
        "The answer should focus on user questions, direct answers, logical headings, evidence, context and comprehensive coverage.",
      ),
      h3("An SEO specialist"),
      p("An SEO specialist wants to conduct an AEO audit."),
      p(
        "The process should combine technical SEO, content analysis, entity review, question mapping and AI visibility monitoring.",
      ),
      h3("A brand strategist"),
      p("A brand strategist wants AI systems to describe a company accurately."),
      p(
        "The strategy should extend beyond one webpage and examine how the brand is represented consistently across its broader digital presence — the same shift explored in [how AI search is reshaping brand visibility](/insights/ai-search-optimization).",
      ),

      h2("Expert Tips"),
      h3("Don't chase an “AI-friendly writing style”"),
      p("There is no need to make content sound mechanical."),
      p("Write naturally."),
      p(
        "The objective is not to make a machine think the content was written for it. The objective is to make the information **clear enough that a machine can understand it without sacrificing human readability**.",
      ),
      h3("Don't confuse citations with guaranteed authority"),
      p("Being cited by an AI system can be useful, but one citation does not automatically prove that a business is authoritative."),
      p("Look at the wider picture:"),
      ul(["Accuracy", "Expertise", "Reputation", "Evidence", "Consistency", "Relevance"]),
      h3("Don't create an FAQ just because FAQ schema exists"),
      p("FAQ sections should answer real questions."),
      p("If the same question has already been answered clearly, adding another version merely for SEO creates repetition."),
      h3("Don't abandon long-form content"),
      p("Short answers are useful for direct questions."),
      p("But complex questions often require context, examples, comparisons and supporting evidence."),
      p("AEO is not synonymous with short content."),
      h3("Think in passages, not only pages"),
      p("A page can cover several questions."),
      p("But each important answer should still make sense independently."),
      p(
        "This creates content that is easier for a reader to scan and easier for a retrieval system to interpret.",
      ),
      h3("Build for the entire search journey"),
      p("The strongest content does not stop after answering the first question."),
      p("It anticipates the next useful question."),
      p("For AEO, that means thinking in connected question clusters rather than isolated keywords."),

      h2("FAQ"),
      h3("What does AEO stand for?"),
      p(
        "AEO stands for **Answer Engine Optimization**. It refers to practices intended to make content easier for answer engines and AI-powered search systems to understand, retrieve and potentially use when answering user questions.",
      ),
      h3("Is AEO replacing SEO?"),
      p(
        "No. AEO does not replace SEO. Google states that its AI search features continue to rely on core Search systems and that existing SEO best practices remain relevant.",
      ),
      h3("Is AEO similar to SEO?"),
      p(
        "Yes. They share many foundations, including technical accessibility, useful content, search intent, site structure and authority. The main difference is the search experience being emphasized: traditional search visibility versus visibility within direct or AI-generated answers.",
      ),
      h3("What is the difference between AEO and GEO?"),
      p(
        "The terms overlap significantly. AEO is often used for answer-focused optimization, while GEO is sometimes used for broader visibility within generative AI systems. There is no universally accepted boundary between them.",
      ),
      h3("What is an example of AEO?"),
      p(
        "A simple example is creating a page that directly answers a question such as “What is technical SEO?” The page gives a concise definition first, then explains the concept, provides examples, answers related questions and supports important claims.",
      ),
      h3("How do I start AEO?"),
      p(
        "Start with real customer and search questions. Group them by intent, create direct answers, improve technical SEO and internal linking, strengthen topical authority, and monitor how AI search systems represent your content.",
      ),
      h3("What does an AEO audit include?"),
      p(
        "An AEO audit can examine content quality, question coverage, entity clarity, technical SEO, structured content, internal linking, authority signals and visibility across relevant AI search experiences.",
      ),
      h3("Are there AEO tools?"),
      p(
        "Yes. AEO workflows can use traditional SEO and analytics tools, search-console data, website crawlers, structured-data tools, content research platforms and AI visibility monitoring tools. No single tool covers every part of AEO.",
      ),
      h3("Can I do AEO myself?"),
      p(
        "Yes. A business with a solid understanding of SEO, content strategy and its audience can implement many AEO practices internally. More complex programs may require technical, editorial and analytics expertise.",
      ),
      h3("Is there an AEO course or certification?"),
      p(
        "There are courses and training resources covering AEO and AI search, but there is no single universally recognized AEO certification that defines the discipline. Evaluate training based on the quality of its methodology, evidence and practical guidance.",
      ),

      h2("Quiz"),
      table(
        ["#", "Question", "Answer", "Explanation"],
        [
          ["1", "What does AEO stand for?", "Answer Engine Optimization", "AEO is the abbreviation for Answer Engine Optimization."],
          [
            "2",
            "What is the main focus of AEO?",
            "Improving visibility in answer-oriented search experiences",
            "AEO focuses on making content useful and understandable to answer engines and AI search systems.",
          ],
          ["3", "Does AEO replace SEO?", "No", "AEO builds on many SEO fundamentals rather than eliminating them."],
          [
            "4",
            "Which is better for a definition page: hiding the answer until the end or answering early?",
            "Answering early",
            "Direct answers make the page easier to understand and scan.",
          ],
          [
            "5",
            "True or false: AEO is a secret Google ranking factor.",
            "False",
            "Google describes its AI search features as relying on existing Search systems and SEO fundamentals.",
          ],
          [
            "6",
            "Complete the sentence: A strong AEO page should answer a real ______.",
            "Question",
            "AEO is closely connected to conversational and question-based search intent.",
          ],
          [
            "7",
            "Which is better: creating 100 shallow pages or fewer comprehensive resources?",
            "Fewer comprehensive resources when they better satisfy intent",
            "Content quality and usefulness matter more than publishing volume.",
          ],
          [
            "8",
            "What should an AEO audit examine first?",
            "The site's content, technical accessibility and important user questions",
            "A useful audit should evaluate the foundations that affect discoverability and answer quality.",
          ],
          [
            "9",
            "Are AEO and GEO universally defined as two completely separate disciplines?",
            "No",
            "Industry terminology varies and the two concepts overlap substantially.",
          ],
          [
            "10",
            "What is the best starting point for an AEO strategy?",
            "Understanding the questions your audience actually asks",
            "AEO works best when content is built around genuine user needs rather than keyword variations alone.",
          ],
        ],
      ),

      h2("Quick Summary"),
      p(
        "**Answer Engine Optimization (AEO)** is the practice of improving content so answer engines and AI-powered search systems can discover, understand, retrieve and potentially use it when responding to user questions. It does not replace SEO. Instead, it builds on SEO fundamentals such as crawlability, indexing, useful content, site structure and authority while placing greater emphasis on direct answers, question-based content, entity clarity and information that can be understood without ambiguity. AEO and GEO overlap considerably, so the terminology matters less than the underlying work. To get started, identify real audience questions, answer them clearly, build connected topic clusters, strengthen technical SEO, support important claims and monitor AI search visibility. The simplest rule is: **make the best answer easy to find, understand and verify.**",
      ),
    ],
  },
];

export function getInsightArticle(slug: string): InsightArticle | undefined {
  return insightArticles.find((article) => article.slug === slug);
}

/**
 * `insightArticles` filtered to the ones that actually have an edition in
 * `locale` — every article predating the `locales` field (i.e. every one
 * without it set) matches all three. Every /ar and /ru page that lists,
 * links to or statically generates articles reads through this rather than
 * the raw array, so an English-only piece never surfaces as a card, a
 * "related" suggestion or a static param on a locale it has no copy for.
 */
export function insightArticlesForLocale(locale: Locale): InsightArticle[] {
  return insightArticles.filter((article) => !article.locales || article.locales.includes(locale));
}

/**
 * The homepage's Insights band pulls from this rather than a hand-picked
 * list, so a new article added to `insightArticles` appears there on its
 * own the next time the homepage renders — no second place to remember to
 * update it.
 */
export function latestInsightArticles(count: number, locale: Locale = "en"): InsightArticle[] {
  return [...insightArticlesForLocale(locale)]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, count);
}

