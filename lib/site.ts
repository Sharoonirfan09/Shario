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

export const site = {
  name: "Shario",
  /**
   * The apex domain 308-redirects here at the Vercel edge (domain-alias
   * config, not this app) — every route, verified. `metadataBase` and every
   * canonical/og:url/og:image/sitemap URL derive from this one constant, so
   * it has to be the host that serves directly with zero redirect hops.
   * Pointing it at the apex instead is what broke WhatsApp/Facebook link
   * previews: their crawlers fetch og:image once and don't reliably follow
   * a redirect to get there. If the Vercel domain config ever flips which
   * host is primary, this is the one line to change back.
   */
  domain: "https://www.shario.ae",
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
    "Shario is a founder-led digital marketing company in Dubai building marketing systems — performance marketing, SEO, websites and CRM — that produce sales.",
  descriptionAr:
    "شاريو شركة تسويق رقمي في دبي يقودها مؤسسها، تبني أنظمة تسويقية تحقق مبيعات: التسويق الأدائي، تحسين محركات البحث، المواقع الإلكترونية، وإدارة علاقات العملاء.",
  descriptionRu:
    "SHARIO — агентство цифрового маркетинга в Дубае под руководством основателя. Строим системы, которые приносят продажи: performance-маркетинг, SEO, сайты, CRM.",
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
  website: "www.shario.ae",
  linkedin: "https://linkedin.com/in/sharoonirfan",
  founder: "Sharoon Irfan",
  founderAr: "شارون عرفان",
  /** Personal name, transliterated — not the SHARIO brand name, which stays in Latin script everywhere, including inside Russian copy. */
  founderRu: "Шарун Ирфан",
  founderRole: "Founder & Digital Growth Strategist",
  founderRoleAr: "المؤسس واستراتيجي النمو الرقمي",
  founderRoleRu: "Основатель и стратег цифрового роста",
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
   * The fixed banner every Market News article uses for its card/hero
   * `image`, by deliberate editorial choice — Market News is the one
   * category where the same photograph is the point (a consistent, recognisable
   * banner for the category) rather than a mistake `check:images` should catch.
   * New Market News articles should set `image: sharedImages.marketNewsBanner`
   * too, the same way this constant keeps every existing one in sync.
   */
  marketNewsBanner: "/images/insights/market-news-banner-leopard-corridor.jpg",
} as const;

/** Primary navigation. The CTA button beside it is not a nav item. */
export const nav = [
  { href: "/", label: "Home", labelAr: "الرئيسية", labelRu: "Главная" },
  { href: "/services", label: "Services", labelAr: "الخدمات", labelRu: "Услуги" },
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
    a: "Our core services include Performance Marketing, SEO & Content, Websites & CRO, CRM & Automation, Brand & Creative, and Strategy & Consulting.",
    aAr: "تشمل خدماتنا الأساسية التسويق الأدائي، تحسين محركات البحث والمحتوى، المواقع الإلكترونية وتحسين معدل التحويل، إدارة علاقات العملاء والأتمتة، العلامة التجارية والإبداع، والاستراتيجية والاستشارات.",
    aRu: "Наши ключевые направления — performance-маркетинг, SEO и контент, веб-сайты и CRO, CRM и автоматизация, бренд и креатив, а также стратегия и консалтинг.",
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
    aRu: "Да. В зависимости от формата сотрудничества SHARIO может постоянно вести стратегию, performance-маркетинг, SEO, креатив, CRM и цифровой рост.",
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
    a: "Yes. Performance Marketing covers paid media across relevant platforms, with a focus on qualified demand and measurable outcomes.",
    aAr: "نعم. يغطي التسويق الأدائي الإعلانات المدفوعة عبر المنصات ذات الصلة، مع التركيز على الطلب المؤهَّل والنتائج القابلة للقياس.",
    aRu: "Да. Performance-маркетинг охватывает платное продвижение на нужных площадках с акцентом на квалифицированный спрос и измеримые результаты.",
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
    a: "The strategy becomes the foundation for the next stage — whether that means brand work, digital execution, performance marketing, website development or ongoing growth support.",
    aAr: "تصبح الاستراتيجية الأساس للمرحلة التالية — سواء كان ذلك عمل العلامة التجارية، أو التنفيذ الرقمي، أو التسويق الأدائي، أو تطوير الموقع الإلكتروني، أو دعم النمو المستمر.",
    aRu: "Стратегия становится основой для следующего этапа — будь то работа над брендом, digital-реализация, performance-маркетинг, разработка сайта или постоянная поддержка роста.",
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
};

export const services: Service[] = [
  {
    slug: "performance-marketing",
    num: "01",
    name: "Performance Marketing",
    nameAr: "التسويق الأدائي",
    nameRu: "Performance-маркетинг",
    category: "Reach & Performance",
    categoryAr: "الوصول والأداء",
    categoryRu: "Охват и эффективность",
    title: "Performance Marketing.",
    titleAr: "التسويق الأدائي.",
    titleRu: "Performance-маркетинг.",
    heroImage: "/images/book/hero-performance.jpg",
    descriptor:
      "Google Ads and Meta Ads engineered for qualified leads at below-target cost per lead.",
    descriptorAr:
      "حملات إعلانية على جوجل وميتا مصممة لجذب عملاء محتملين مؤهلين بتكلفة أقل من المستهدف لكل عميل محتمل.",
    descriptorRu:
      "Google Ads и Meta Ads, настроенные на привлечение квалифицированных лидов по цене ниже целевой.",
    subhead: "Paid media judged on pipeline, not impressions.",
    subheadAr: "إعلانات مدفوعة تُقاس بمسار المبيعات، لا بعدد المشاهدات.",
    subheadRu: "Платная реклама, которую оценивают по воронке продаж, а не по показам.",
    lead: "Performance marketing is digital advertising bought and measured against a specific outcome — a lead, a sale — rather than an impression. Paid media works when every dirham can be traced to a lead the sales team actually wants.",
    leadAr:
      "التسويق الأدائي هو إعلان رقمي يُشترى ويُقاس مقابل نتيجة محددة — عميل محتمل، عملية بيع — لا مجرد ظهور. تنجح الإعلانات المدفوعة عندما يمكن تتبع كل درهم يُنفق وصولاً إلى عميل محتمل يريده فريق المبيعات فعلاً.",
    leadRu:
      "Performance-маркетинг — это цифровая реклама, которую покупают и оценивают относительно конкретного результата — лида, продажи, — а не показа. Платное продвижение работает тогда, когда каждый потраченный дирхам можно проследить до лида, который действительно нужен отделу продаж.",
    whatWeDo: [
      "Google Search, Display and Performance Max",
      "Meta campaigns across Facebook and Instagram",
      "YouTube and video demand generation",
      "Audience, offer and creative testing",
      "Budget pacing and bid strategy",
    ],
    whatWeDoAr: [
      "إعلانات البحث والعرض والأداء الأقصى على جوجل",
      "حملات ميتا عبر فيسبوك وإنستغرام",
      "يوتيوب وتوليد الطلب عبر الفيديو",
      "اختبار الجمهور والعروض والتصاميم الإبداعية",
      "إدارة وتيرة الإنفاق واستراتيجية المزايدة",
    ],
    whatWeDoRu: [
      "Поиск, медийная реклама и Performance Max в Google",
      "Кампании Meta в Facebook и Instagram",
      "YouTube и генерация спроса через видео",
      "Тестирование аудиторий, офферов и креативов",
      "Управление темпом расходования бюджета и стратегией ставок",
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
      "Performance marketing in Dubai — Google Ads and Meta Ads managed for qualified leads at below-target cost per lead, reported against pipeline and closed revenue.",
    metaDescriptionAr:
      "التسويق الأدائي في دبي — إدارة إعلانات جوجل وميتا لجذب عملاء محتملين مؤهلين بتكلفة أقل من المستهدف، مع تقارير مقابل مسار المبيعات والإيرادات المحققة.",
    metaDescriptionRu:
      "Performance-маркетинг в Дубае — управление Google Ads и Meta Ads для привлечения квалифицированных лидов по цене ниже целевой, с отчётностью по воронке продаж и закрытой выручке.",
  },
  {
    slug: "seo-and-content",
    num: "02",
    name: "SEO & Content",
    nameAr: "تحسين محركات البحث والمحتوى",
    nameRu: "SEO и контент",
    category: "Reach & Performance",
    categoryAr: "الوصول والأداء",
    categoryRu: "Охват и эффективность",
    title: "SEO & Content.",
    titleAr: "تحسين محركات البحث والمحتوى.",
    titleRu: "SEO и контент.",
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
    lead: "Organic is the only channel that compounds — every month of work keeps paying after it is done. Done well, SEO and performance marketing reinforce each other rather than compete for the same budget.",
    leadAr:
      "النتائج العضوية هي القناة الوحيدة التي تتراكم قيمتها — إذ يستمر كل شهر من العمل في تحقيق العائد بعد انتهائه. وعند تنفيذه بإتقان، يعزز تحسين محركات البحث والتسويق الأدائي أحدهما الآخر بدلاً من التنافس على الميزانية نفسها.",
    leadRu:
      "Органика — единственный канал, эффект от которого накапливается: каждый месяц работы продолжает приносить результат и после своего завершения. При грамотном подходе SEO и performance-маркетинг усиливают друг друга, а не конкурируют за один и тот же бюджет.",
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
      "SEO and content marketing in Dubai — technical SEO, on-page optimisation and content clusters built to rank in Dubai search and win AI-driven results.",
    metaDescriptionAr:
      "تحسين محركات البحث والتسويق بالمحتوى في دبي — تحسين تقني، وتحسين داخل الصفحات، ومجموعات محتوى مصممة للترتب في نتائج البحث بدبي والفوز بنتائج الذكاء الاصطناعي.",
    metaDescriptionRu:
      "SEO и контент-маркетинг в Дубае — техническое SEO, оптимизация страниц и контентные кластеры, созданные для попадания в топ поиска в Дубае и в ответы ИИ-поисковиков.",
  },
  {
    slug: "websites-and-cro",
    num: "03",
    name: "Websites & CRO",
    nameAr: "المواقع الإلكترونية وتحسين التحويل",
    nameRu: "Веб-сайты и CRO",
    category: "Web & Build",
    categoryAr: "الويب والبناء",
    categoryRu: "Веб-разработка",
    title: "Websites & CRO.",
    titleAr: "المواقع الإلكترونية وتحسين التحويل.",
    titleRu: "Веб-сайты и CRO.",
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
      "Website development and conversion rate optimisation in Dubai — high-converting websites with SEO-ready architecture, landing pages and CRM-integrated funnels.",
    metaDescriptionAr:
      "تطوير المواقع الإلكترونية وتحسين معدل التحويل في دبي — مواقع عالية التحويل ببنية جاهزة لمحركات البحث، وصفحات هبوط، ومسارات متكاملة مع إدارة علاقات العملاء.",
    metaDescriptionRu:
      "Разработка сайтов и оптимизация конверсии в Дубае — высококонверсионные сайты с готовой к SEO архитектурой, посадочными страницами и воронками, интегрированными с CRM.",
  },
  {
    slug: "crm-and-automation",
    num: "04",
    name: "CRM & Automation",
    nameAr: "إدارة علاقات العملاء والأتمتة",
    nameRu: "CRM и автоматизация",
    category: "Data & Systems",
    categoryAr: "البيانات والأنظمة",
    categoryRu: "Данные и системы",
    title: "CRM & Automation.",
    titleAr: "إدارة علاقات العملاء والأتمتة.",
    titleRu: "CRM и автоматизация.",
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
      "CRM integration and marketing automation in Dubai — attribution tracking, lead scoring and automated follow-up that tie marketing spend to closed revenue.",
    metaDescriptionAr:
      "دمج إدارة علاقات العملاء وأتمتة التسويق في دبي — تتبع إسناد النتائج وتقييم العملاء المحتملين ومتابعة آلية تربط الإنفاق التسويقي بالإيرادات المحققة.",
    metaDescriptionRu:
      "Интеграция CRM и автоматизация маркетинга в Дубае — отслеживание атрибуции, оценка лидов и автоматизированный follow-up, которые привязывают маркетинговые расходы к закрытой выручке.",
  },
  {
    slug: "brand-and-creative",
    num: "05",
    name: "Brand & Creative",
    nameAr: "العلامة التجارية والإبداع",
    nameRu: "Бренд и креатив",
    category: "Brand & Creative",
    categoryAr: "العلامة التجارية والإبداع",
    categoryRu: "Бренд и креатив",
    title: "Brand & Creative.",
    titleAr: "العلامة التجارية والإبداع.",
    titleRu: "Бренд и креатив.",
    heroImage: "/images/book/hero-brand.jpg",
    descriptor:
      "Brand identity, campaign visuals, social creative and marketing collateral produced to a launch standard.",
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
      "Brand identity and visual systems",
      "Campaign concepts and key visuals",
      "Social and paid ad creative",
      "Marketing collateral and brochures",
      "Launch and project branding",
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
      "Brand and creative in Dubai — brand identity, campaign visuals, social and paid ad creative and marketing collateral produced to a launch standard.",
    metaDescriptionAr:
      "العلامة التجارية والإبداع في دبي — هوية بصرية، ومرئيات حملات، ومحتوى إبداعي لمنصات التواصل والإعلانات المدفوعة، ومواد تسويقية بجودة تليق بإطلاق العلامة التجارية.",
    metaDescriptionRu:
      "Бренд и креатив в Дубае — айдентика бренда, визуалы для кампаний, креатив для соцсетей и платной рекламы, маркетинговые материалы, созданные на уровне готовности к запуску.",
  },
  {
    slug: "strategy-consulting",
    num: "06",
    name: "Strategy & Consulting",
    nameAr: "الاستراتيجية والاستشارات",
    nameRu: "Стратегия и консалтинг",
    category: "Strategy & Growth",
    categoryAr: "الاستراتيجية والنمو",
    categoryRu: "Стратегия и рост",
    title: "Strategy & Consulting.",
    titleAr: "الاستراتيجية والاستشارات.",
    titleRu: "Стратегия и консалтинг.",
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
    lead: "Most marketing budgets are not underfunded — they are unplanned, spread across channels that were never asked to work together. A performance marketing consultant's job is to find that plan before adding a single dirham of new spend.",
    leadAr:
      "معظم الميزانيات التسويقية ليست ناقصة التمويل — بل غير مخطَّطة، موزعة على قنوات لم يُطلب منها العمل معاً يوماً. مهمة استشاري التسويق الأدائي هي إيجاد تلك الخطة قبل إضافة درهم واحد من إنفاق جديد.",
    leadRu:
      "Большинство маркетинговых бюджетов страдают не от нехватки средств, а от отсутствия плана — они распределены по каналам, которых никогда не просили работать вместе. Задача консультанта по performance-маркетингу — найти этот план ещё до того, как будет добавлен хотя бы один новый дирхам расходов.",
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
      "Marketing strategy and consulting in Dubai — go-to-market strategy, marketing audits and channel planning that turn a fragmented budget into one coherent plan.",
    metaDescriptionAr:
      "الاستراتيجية والاستشارات التسويقية في دبي — استراتيجية دخول السوق، وتدقيق تسويقي، وتخطيط للقنوات يحوّل ميزانية مبعثرة إلى خطة واحدة متماسكة.",
    metaDescriptionRu:
      "Маркетинговая стратегия и консалтинг в Дубае — стратегия выхода на рынок, маркетинговые аудиты и планирование каналов, которые превращают разрозненный бюджет в единый связный план.",
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

/** Previous and next service, for walking the set from any one page. */
export function adjacentServices(slug: string) {
  const i = services.findIndex((service) => service.slug === slug);
  return {
    previous: i > 0 ? services[i - 1] : services[services.length - 1],
    next: i < services.length - 1 ? services[i + 1] : services[0],
  };
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
      "In-depth pieces on performance marketing, websites and CRM — the mechanics behind marketing that actually converts.",
    descriptionAr:
      "مقالات معمّقة حول التسويق الأدائي والمواقع الإلكترونية وإدارة علاقات العملاء — آليات التسويق الذي يحقق تحويلات فعلية.",
    descriptionRu:
      "Глубокие материалы о performance-маркетинге, сайтах и CRM — механика маркетинга, который действительно конвертирует.",
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
];

export function getInsightCategory(slug: string): InsightCategory | undefined {
  return insightCategories.find((category) => category.slug === slug);
}

/**
 * One block of an article body. `p` supports inline links in Markdown-style
 * `[label](/href)` syntax, parsed at render time (see `app/insights/[slug]/
 * page.tsx`) rather than storing JSX here, so this file stays plain data.
 */
export type ArticleBlock =
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "p"; text: string };

export type InsightArticle = {
  slug: string;
  /** Matches an `insightCategories[].slug`. */
  category: string;
  title: string;
  titleAr: string;
  titleRu: string;
  excerpt: string;
  excerptAr: string;
  excerptRu: string;
  date: string;
  readingTime: string;
  readingTimeAr: string;
  readingTimeRu: string;
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
   * rule `check:images` enforces elsewhere — except every Market News
   * article, which intentionally shares `sharedImages.marketNewsBanner` as
   * its fixed category banner.
   */
  image: string;
  /** Describes what's actually in the photograph, not the article topic. */
  imageAlt: string;
  imageAltAr: string;
  imageAltRu: string;
  /**
   * The short phrase set over the image itself — a topic, not the full
   * headline (e.g. "Dubai's Ad Auctions", not the full H1). Two to four
   * words, so it reads at a glance over a photograph rather than as a
   * second title competing with the real one underneath it.
   */
  imageTopic: string;
  imageTopicAr: string;
  imageTopicRu: string;
  body: ArticleBlock[];
  bodyAr: ArticleBlock[];
  bodyRu: ArticleBlock[];
};

const h2 = (text: string): ArticleBlock => ({ type: "h2", text });
const h3 = (text: string): ArticleBlock => ({ type: "h3", text });
const p = (text: string): ArticleBlock => ({ type: "p", text });

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
    image: sharedImages.marketNewsBanner,
    imageAlt: "A leopard's face in profile, lit dramatically within a dark architectural corridor",
    imageAltAr: "وجه نمر مصوَّر من الجانب، مضاء بشكل درامي داخل ممر معماري داكن",
    imageAltRu: "Профиль морды леопарда, драматично освещённой в тёмном архитектурном коридоре",
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
        "None of this makes paid media a weaker channel. It makes the gap between a well-run account and a neglected one wider than it used to be. An account left on autopilot — generic keywords, unchanged creative, no [CRM feedback loop](/services/crm-and-automation) telling it which leads actually closed — pays full price for every pressure above. An account built and optimised properly absorbs them far better, because it's competing on relevance and conversion quality, not budget alone.",
      ),
      h2("The Accounts Winning Right Now Share Three Habits"),
      p(
        "They price a lead against its close rate, not just its cost. They feed sales outcomes back into the platform so it learns what a good lead actually looks like, rather than optimising for form fills alone. And they treat account structure and creative as things to keep improving weekly, not a campaign that was set up once and left running.",
      ),
      h2("What This Means for Your Budget"),
      p(
        "A rising market rate for clicks isn't a reason to panic or pull spend. It's a reason to check whether your account is still paying the old price in the new market, or has already adjusted. If [performance marketing](/services/performance-marketing) is a meaningful part of your growth plan for the year ahead, that's worth a proper look before the next budget cycle, not after it.",
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
        "لا شيء من هذا يجعل الإعلانات المدفوعة قناة أضعف. بل يوسّع الفجوة بين الحساب المُدار جيداً والحساب المُهمَل أكثر من ذي قبل. فالحساب المتروك على الطيار الآلي — كلمات مفتاحية عامة، تصاميم إبداعية ثابتة، وبلا [حلقة تغذية راجعة من إدارة علاقات العملاء](/ar/services/crm-and-automation) تخبره أي العملاء المحتملين أُغلقوا فعلاً — يدفع السعر كاملاً مقابل كل ضغط من الضغوط السابقة. أما الحساب المبني والمُحسَّن بشكل صحيح فيمتص هذه الضغوط بشكل أفضل بكثير، لأنه يتنافس على الملاءمة وجودة التحويل، لا على الميزانية وحدها.",
      ),
      h2("الحسابات الرابحة حالياً تشترك في ثلاث عادات"),
      p(
        "تُسعِّر هذه الحسابات العميل المحتمل وفق معدل إغلاقه، لا وفق تكلفته فقط. وتُغذي المنصة بنتائج المبيعات الفعلية لتتعلم كيف يبدو العميل المحتمل الجيد فعلاً، بدلاً من التحسين لتعبئة النماذج فقط. كما تتعامل مع بنية الحساب والتصاميم الإبداعية كأمور يجب تحسينها أسبوعياً، لا كحملة أُعدت مرة واحدة وتُركت تعمل.",
      ),
      h2("ماذا يعني هذا لميزانيتكم؟"),
      p(
        "ارتفاع سعر السوق للنقرات ليس سبباً للذعر أو لسحب الإنفاق. بل سبب للتحقق مما إذا كان حسابكم لا يزال يدفع السعر القديم في سوق جديد، أم أنه تكيّف بالفعل. وإذا كان [التسويق الأدائي](/ar/services/performance-marketing) جزءاً مهماً من خطة نموكم للعام المقبل، فهذا يستحق مراجعة جادة قبل دورة الميزانية القادمة، لا بعدها.",
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
        "Ничего из этого не делает платную рекламу более слабым каналом. Это лишь расширяет разрыв между хорошо управляемым аккаунтом и заброшенным. Аккаунт, оставленный на автопилоте — общие ключевые слова, неизменные креативы, отсутствие [обратной связи от CRM](/ru/services/crm-and-automation) о том, какие лиды реально закрылись, — платит полную цену за каждый из перечисленных факторов. А аккаунт, выстроенный и оптимизированный правильно, переносит их гораздо легче, потому что конкурирует за счёт релевантности и качества конверсии, а не только бюджета.",
      ),
      h2("Аккаунты, которые побеждают прямо сейчас, объединяют три привычки"),
      p(
        "Они оценивают лид по конверсии в сделку, а не только по стоимости. Они передают результаты продаж обратно в платформу, чтобы та понимала, как на самом деле выглядит хороший лид, а не оптимизировалась только под заполнение форм. И они относятся к структуре аккаунта и креативам как к тому, что нужно улучшать каждую неделю, а не как к кампании, запущенной один раз и оставленной работать самостоятельно.",
      ),
      h2("Что это значит для вашего бюджета"),
      p(
        "Рост рыночной цены за клик — не повод для паники или сокращения расходов. Это повод проверить, платит ли ваш аккаунт всё ещё старую цену на новом рынке или уже адаптировался к нему. Если [performance-маркетинг](/ru/services/performance-marketing) занимает важное место в вашем плане роста на предстоящий год, это стоит внимательно изучить до начала следующего бюджетного цикла, а не после.",
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
    imageAlt: "A leopard's face in profile, lit dramatically within a dark architectural corridor",
    imageAltAr: "وجه نمر مصوَّر من الجانب، مضاء بشكل درامي داخل ممر معماري داكن",
    imageAltRu: "Профиль морды леопарда, драматично освещённой в тёмном архитектурном коридоре",
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
        "They treat their [CRM and their ad accounts as one connected system](/services/crm-and-automation), so cost per qualified lead is a number they can see weekly rather than reconstruct at quarter's end. That single change tends to matter more to a budget's resilience than any amount of platform-hopping.",
      ),
      p(
        "If your team can't currently answer \"what's our cost per qualified lead by channel\" in under a minute, that's the gap worth closing before the next budget review — [our strategy and consulting work](/services/strategy-consulting) usually starts exactly there. For a broader framework on budgeting through cost inflation, [HubSpot's marketing planning resources](https://blog.hubspot.com/marketing) are a solid general reference alongside your own numbers.",
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
        "تتعامل مع [إدارة علاقات العملاء وحسابات إعلاناتها كنظام واحد متصل](/ar/services/crm-and-automation)، بحيث تكون تكلفة العميل المحتمل المؤهَّل رقماً يمكنها رؤيته أسبوعياً بدلاً من إعادة بنائه في نهاية الربع. هذا التغيير وحده غالباً ما يهم لمرونة الميزانية أكثر من أي قدر من التنقل بين المنصات.",
      ),
      p(
        "إذا كان فريقكم غير قادر حالياً على الإجابة عن سؤال «ما تكلفة عميلنا المحتمل المؤهَّل لكل قناة» في أقل من دقيقة، فهذه هي الفجوة التي تستحق الإغلاق قبل مراجعة الميزانية القادمة — [عملنا في الاستراتيجية والاستشارات](/ar/services/strategy-consulting) عادة ما يبدأ من هناك بالضبط. ولإطار عمل أوسع حول وضع الميزانية في ظل تضخم التكاليف، تُعد [موارد HubSpot للتخطيط التسويقي](https://blog.hubspot.com/marketing) مرجعاً عاماً جيداً إلى جانب أرقامكم الخاصة.",
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
        "Они относятся к [CRM и рекламным аккаунтам как к единой связанной системе](/ru/services/crm-and-automation), поэтому видят стоимость квалифицированного лида еженедельно, а не восстанавливают её задним числом в конце квартала. Одно только это изменение обычно значит для устойчивости бюджета больше, чем любые метания между платформами.",
      ),
      p(
        "Если ваша команда сейчас не может ответить на вопрос «какова стоимость квалифицированного лида по каждому каналу» меньше чем за минуту — это та самая брешь, которую стоит закрыть до следующего пересмотра бюджета. Именно с этого обычно начинается [наша работа в области стратегии и консалтинга](/ru/services/strategy-consulting). Для более широкого понимания планирования бюджета в условиях роста цен хорошим общим ориентиром наряду с вашими собственными цифрами послужат [материалы HubSpot по маркетинговому планированию](https://blog.hubspot.com/marketing).",
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
        "Addressing the handful of assets and scripts actually responsible for the delay is typically a matter of weeks, not a new site. That's the approach we take inside [Websites & CRO](/services/websites-and-cro) — audit first, rebuild only the parts the audit actually points to.",
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
        "معالجة الحفنة القليلة من العناصر والنصوص البرمجية المسؤولة فعلياً عن التأخير عادة ما تستغرق أسابيع، لا موقعاً جديداً بالكامل. هذا هو النهج الذي نتبعه ضمن [المواقع الإلكترونية وتحسين معدل التحويل](/ar/services/websites-and-cro) — تدقيق أولاً، وإعادة بناء الأجزاء التي يشير إليها التدقيق فعلياً فقط.",
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
        "Устранение той самой горстки файлов и скриптов, реально ответственных за задержку, обычно занимает недели, а не требует нового сайта. Именно такой подход мы применяем в рамках направления [«Веб-сайты и CRO»](/ru/services/websites-and-cro) — сначала аудит, и пересборка только тех частей, на которые он реально указывает.",
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
        "A CRM that captures ownership and response time correctly is also the only kind that can tell marketing which channels are producing leads that actually close, not just leads that arrive. That feedback loop is what [CRM & Automation](/services/crm-and-automation) is built to set up — not a bigger system, a better-run one, wired into the campaigns that feed it.",
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
        "نظام إدارة علاقات العملاء الذي يلتقط الملكية وزمن الاستجابة بشكل صحيح هو أيضاً النوع الوحيد القادر على إخبار التسويق بأي القنوات تنتج عملاء محتملين يُغلقون فعلاً، لا مجرد عملاء يصلون. حلقة التغذية الراجعة هذه هي ما بُنيت [إدارة علاقات العملاء والأتمتة](/ar/services/crm-and-automation) لإعدادها — ليس نظاماً أكبر، بل نظاماً يُدار بشكل أفضل، متصلاً بالحملات التي تغذيه.",
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
        "CRM, которая корректно фиксирует ответственность и скорость реакции, — единственная, способная сказать маркетингу, какие каналы приносят лиды, реально закрывающиеся в сделку, а не просто прибывающие. Именно эту петлю обратной связи выстраивает направление [«CRM и автоматизация»](/ru/services/crm-and-automation) — не более крупную систему, а более грамотно выстроенную, подключённую к питающим её кампаниям.",
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
    featured: true,
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
        "Structure content around the actual questions your customers ask, in the language they use to ask them. Use headings that state the answer, not just the topic. Back claims with real specifics rather than vague reassurance. This is, not coincidentally, close to what good [SEO & Content](/services/seo-and-content) work has always aimed for — the shift raises the cost of doing it badly rather than inventing a new discipline.",
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
        "نظّموا المحتوى حول الأسئلة الفعلية التي يطرحها عملاؤكم، باللغة التي يستخدمونها لطرحها. استخدموا عناوين تذكر الإجابة، لا الموضوع فقط. ادعموا الادعاءات بتفاصيل حقيقية بدلاً من طمأنة غامضة. هذا، وليس من قبيل الصدفة، قريب مما استهدفه دائماً عمل [تحسين محركات البحث والمحتوى](/ar/services/seo-and-content) الجيد — فالتحول يرفع تكلفة القيام بذلك بشكل سيئ بدلاً من ابتكار تخصص جديد.",
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
        "Стройте контент вокруг реальных вопросов, которые задают ваши клиенты, — на том языке, каким они их задают. Используйте заголовки, которые формулируют ответ, а не просто обозначают тему. Подкрепляйте утверждения конкретными фактами, а не расплывчатыми заверениями. И это, что не случайно, очень близко к тому, к чему всегда стремилась качественная работа над [SEO и контентом](/ru/services/seo-and-content) — этот сдвиг лишь повышает цену плохого исполнения, а не создаёт новую дисциплину.",
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
        "The shift toward pipeline as the headline metric isn't a fashion. It's what happens once a business connects its [CRM to its ad accounts](/services/crm-and-automation) and sees, for the first time, which channels bring leads that close and which just bring leads. That connection is usually the first moment a marketing report and a sales report agree with each other.",
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
        "التحول نحو خط الأنابيب كمقياس رئيسي ليس موضة عابرة. بل ما يحدث بمجرد أن تربط شركة [إدارة علاقات عملائها بحسابات إعلاناتها](/ar/services/crm-and-automation) وترى، للمرة الأولى، أي القنوات تجلب عملاء محتملين يُغلقون وأيها يجلب عملاء محتملين فقط. هذا الاتصال عادة ما يكون أول لحظة يتفق فيها تقرير تسويقي مع تقرير مبيعات.",
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
        "Переход к воронке продаж как к главной метрике — не дань моде. Это то, что происходит, как только компания соединяет [CRM со своими рекламными аккаунтами](/ru/services/crm-and-automation) и впервые видит, какие каналы приносят лиды, реально закрывающиеся в сделку, а какие — просто лиды. Именно в этот момент маркетинговый отчёт и отчёт по продажам обычно впервые начинают сходиться друг с другом.",
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
    title: "A Founder's Guide to Briefing a Performance Marketing Agency",
    titleAr: "دليل المؤسس لتوجيه إحاطة لوكالة تسويق أدائي",
    titleRu: "Гид основателя по составлению брифа для агентства performance-маркетинга",
    seoTitle: "How to Brief a Performance Marketing Agency: Founder's Guide",
    seoTitleAr: "كيفية توجيه إحاطة لوكالة تسويق أدائي: دليل المؤسس",
    seoTitleRu: "Как составить бриф для агентства performance-маркетинга: гид основателя",
    excerpt:
      "The brief that gets you a better proposal is shorter than you think, and asks for fewer promises.",
    excerptAr:
      "الإحاطة التي تمنحكم عرضاً أفضل أقصر مما تظنون، وتطلب وعوداً أقل.",
    excerptRu:
      "Бриф, который приносит вам более сильное предложение, короче, чем вы думаете, и требует меньше обещаний.",
    metaDescription:
      "A short, numbers-first brief gets a better proposal from any performance marketing agency than a long wish list. Here's exactly what to include, in what order, and why.",
    metaDescriptionAr:
      "إحاطة قصيرة تضع الأرقام أولاً تمنحكم عرضاً أفضل من أي وكالة تسويق أدائي مقارنة بقائمة أمنيات طويلة. إليكم بالضبط ما يجب تضمينه، بأي ترتيب، ولماذا.",
    metaDescriptionRu:
      "Короткий бриф, где на первом месте цифры, приносит от любого агентства performance-маркетинга предложение лучше, чем длинный список пожеланий. Рассказываем, что именно включить, в каком порядке и почему.",
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
        "If you're weighing whether to brief us or another team, [our strategy and consulting work](/services/strategy-consulting) starts from exactly this list before a single recommendation gets made — whether the brief is for [performance marketing](/services/performance-marketing) specifically or a broader system. You're welcome to send the numbers first and see what comes back — [reach out here](/contact) whenever you're ready.",
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
        "إذا كنتم تفكرون في توجيه إحاطة لنا أو لفريق آخر، [عملنا في الاستراتيجية والاستشارات](/ar/services/strategy-consulting) يبدأ من هذه القائمة بالضبط قبل تقديم أي توصية واحدة — سواء كانت الإحاطة لـ[التسويق الأدائي](/ar/services/performance-marketing) تحديداً أو لنظام أوسع. يسعدنا أن ترسلوا الأرقام أولاً وتروا ما سيصلكم — [تواصلوا معنا هنا](/ar/contact) متى كنتم مستعدين.",
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
        "Если вы решаете, отправить бриф нам или другой команде: [наша работа в области стратегии и консалтинга](/ru/services/strategy-consulting) начинается именно с этого списка, прежде чем прозвучит хоть одна рекомендация — будь то бриф именно для [performance-маркетинга](/ru/services/performance-marketing) или для более широкой системы. Присылайте цифры первыми и смотрите, что вернётся в ответ, — [обращайтесь сюда](/ru/contact), когда будете готовы.",
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
        "Fix that one stage before touching anything else. A funnel improved at its worst point moves more than one improved everywhere by a little, and it's a faster way to prove a fix is working before committing to a bigger rebuild of [your website](/services/websites-and-cro) or [your CRM setup](/services/crm-and-automation).",
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
        "أصلحوا تلك المرحلة الواحدة قبل لمس أي شيء آخر. القمع الذي يتحسن عند أسوأ نقطة فيه يتحرك أكثر من قمع تحسّن قليلاً في كل مكان، وهذه طريقة أسرع لإثبات أن الإصلاح يعمل قبل الالتزام بإعادة بناء أكبر لـ[موقعكم الإلكتروني](/ar/services/websites-and-cro) أو [إعداد إدارة علاقات عملائكم](/ar/services/crm-and-automation).",
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
        "Исправьте именно этот этап, прежде чем трогать что-либо ещё. Воронка, улучшенная в своей самой слабой точке, даёт больше эффекта, чем воронка, чуть-чуть улучшенная везде, — и это более быстрый способ доказать, что решение работает, прежде чем браться за более масштабную пересборку [вашего сайта](/ru/services/websites-and-cro) или [настройки вашей CRM](/ru/services/crm-and-automation).",
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
        "Without a [CRM connected back to the ad accounts](/services/crm-and-automation), the platform never learns which of the leads it generated actually became a serious conversation. It keeps optimising for the event it can see — the form fill — because the event it can't see — the sale — was never fed back to it.",
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
        "This pattern — vanity-metric-optimised campaigns disconnected from what sales actually needs — is common well beyond real estate, and the fix is rarely a bigger budget. It's [performance marketing](/services/performance-marketing) and [CRM & Automation](/services/crm-and-automation) built to talk to each other from day one.",
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
        "دون [نظام إدارة علاقات عملاء متصل بحسابات الإعلانات](/ar/services/crm-and-automation)، لا تتعلم المنصة أبداً أي العملاء المحتملين الذين ولّدتهم أصبحوا فعلاً محادثة جادة. تستمر في التحسين للحدث الذي تراه — تعبئة النموذج — لأن الحدث الذي لا تراه — البيع — لم تتم تغذيته إليها أبداً.",
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
        "هذا النمط — حملات مُحسَّنة لمقاييس سطحية ومنفصلة عما يحتاجه المبيعات فعلاً — شائع إلى ما هو أبعد بكثير من العقارات، ونادراً ما يكون الإصلاح ميزانية أكبر. إنه [التسويق الأدائي](/ar/services/performance-marketing) و[إدارة علاقات العملاء والأتمتة](/ar/services/crm-and-automation) مبنيان للتحدث مع بعضهما البعض منذ اليوم الأول.",
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
        "Без [CRM, подключённой обратно к рекламным аккаунтам](/ru/services/crm-and-automation), платформа никогда не узнаёт, какие из сгенерированных ею лидов реально переросли в серьёзный разговор. Она продолжает оптимизироваться под то событие, которое видит, — заполнение формы, — потому что событие, которого она не видит, — продажу, — ей никогда не передавали обратно.",
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
        "Эта модель — кампании, оптимизированные под показные метрики и оторванные от реальных потребностей продаж, — распространена далеко за пределами недвижимости, и решение редко заключается в увеличении бюджета. Это [performance-маркетинг](/ru/services/performance-marketing) и [CRM и автоматизация](/ru/services/crm-and-automation), изначально выстроенные так, чтобы работать в связке с первого дня.",
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
        "In a scenario like this, the work usually starts with [Websites & CRO](/services/websites-and-cro): compress and restructure the page so speed stops being a silent tax, move the booking widget above the fold, cut the path from \"check availability\" to \"confirm\" down to the minimum number of steps, and give the direct channel a clear reason to choose — a best-rate guarantee, a small perk, transparent pricing without the OTA's added fees.",
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
        "في سيناريو كهذا، يبدأ العمل عادة بـ[المواقع الإلكترونية وتحسين معدل التحويل](/ar/services/websites-and-cro): ضغط الصفحة وإعادة هيكلتها بحيث تتوقف السرعة عن كونها ضريبة صامتة، نقل أداة الحجز إلى أعلى الصفحة، تقليص المسار من «تحقق من التوفر» إلى «تأكيد» إلى أقل عدد ممكن من الخطوات، ومنح القناة المباشرة سبباً واضحاً للاختيار — ضمان أفضل سعر، ميزة صغيرة، تسعير شفاف دون رسوم وكالة السفر الإضافية.",
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
        "В подобном сценарии работа обычно начинается с направления [«Веб-сайты и CRO»](/ru/services/websites-and-cro): сжать и перестроить страницу так, чтобы скорость перестала быть скрытым налогом, поднять виджет бронирования выше линии сгиба, сократить путь от «проверить наличие» до «подтвердить» до минимального числа шагов и дать прямому каналу чёткую причину для выбора — гарантию лучшей цены, небольшой бонус, прозрачное ценообразование без дополнительных сборов OTA.",
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
        "In a scenario like this, the work spans three of our services at once, because the problem doesn't sit neatly inside any one of them. [SEO & Content](/services/seo-and-content) shifts toward the specific questions enterprise buyers ask mid-cycle, not just broad awareness topics. [CRM & Automation](/services/crm-and-automation) implements a shared lead-scoring model both teams agree to, plus routing that gets a qualified lead in front of the right rep within minutes rather than hours. And [Performance Marketing](/services/performance-marketing) campaigns get optimised toward the scored, sales-accepted stage rather than the raw form fill.",
      ),
      h2("What Full-Funnel Actually Means Here"),
      p(
        "Full-funnel doesn't mean touching every channel at once — it means every part of the system, from the first search query to the closed deal, is instrumented and connected, so a change made in one place is visible in the others. That's the standard our [strategy and consulting work](/services/strategy-consulting) is built around from the first conversation.",
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
        "في سيناريو كهذا، يمتد العمل عبر ثلاث من خدماتنا في آن واحد، لأن المشكلة لا تقع بدقة ضمن واحدة منها فقط. [تحسين محركات البحث والمحتوى](/ar/services/seo-and-content) يتحول نحو الأسئلة المحددة التي يطرحها المشترون المؤسسيون في منتصف الدورة، لا مواضيع الوعي العامة فقط. [إدارة علاقات العملاء والأتمتة](/ar/services/crm-and-automation) تطبّق نموذج تقييم مشترك يتفق عليه الفريقان، بالإضافة إلى توجيه يضع العميل المحتمل المؤهَّل أمام المندوب المناسب خلال دقائق لا ساعات. أما حملات [التسويق الأدائي](/ar/services/performance-marketing) فتُحسَّن نحو المرحلة المُقيَّمة والمقبولة من المبيعات بدلاً من تعبئة النموذج الخام.",
      ),
      h2("ماذا يعني القمع الكامل فعلياً هنا؟"),
      p(
        "القمع الكامل لا يعني لمس كل قناة في آن واحد — بل يعني أن كل جزء من النظام، من استعلام البحث الأول إلى الصفقة المُغلَقة، مُجهَّز بأدوات القياس ومتصل، بحيث يكون التغيير الذي يُجرى في مكان واحد مرئياً في الأماكن الأخرى. هذا هو المعيار الذي يُبنى عليه [عملنا في الاستراتيجية والاستشارات](/ar/services/strategy-consulting) منذ المحادثة الأولى.",
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
        "В подобном сценарии работа охватывает сразу три наших направления, потому что проблема не укладывается аккуратно в рамки одного из них. [SEO и контент](/ru/services/seo-and-content) смещаются в сторону конкретных вопросов, которые корпоративные покупатели задают в середине цикла, а не только широких тем на этапе знакомства с брендом. [CRM и автоматизация](/ru/services/crm-and-automation) внедряет общую модель оценки лидов, согласованную обеими командами, а также маршрутизацию, которая доставляет квалифицированный лид нужному менеджеру за минуты, а не часы. А кампании [performance-маркетинга](/ru/services/performance-marketing) оптимизируются под оценённый и принятый продажами этап, а не под сырое заполнение формы.",
      ),
      h2("Что здесь на самом деле значит «полный цикл»"),
      p(
        "Полный цикл не означает работу со всеми каналами одновременно — это означает, что каждая часть системы, от первого поискового запроса до закрытой сделки, оснащена измерением и связана друг с другом, поэтому изменение в одном месте видно во всех остальных. Именно на этом стандарте строится наша [работа в области стратегии и консалтинга](/ru/services/strategy-consulting) с самого первого разговора.",
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
    image: "/images/insights/ai-search-optimization-candlelit-desk.jpg",
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
        "A beautifully designed website with vague content may look impressive while remaining difficult for both people and search systems to understand. Design creates perception. [Structure creates understanding](/services/websites-and-cro). You need both.",
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
        "That means your digital footprint needs consistency. Your [brand positioning](/services/brand-and-creative) should not change from one platform to another. Your expertise should be clear, your services should be structured, your work should provide evidence, and your content should demonstrate that you understand the subjects you claim to specialise in.",
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
        "There is no need to abandon traditional SEO. Instead, build a broader [search strategy](/services/seo-and-content).",
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
        "قد يبدو الموقع المصمم بعناية فائقة مبهراً حتى لو كان محتواه غامضاً، لكنه في الوقت ذاته يظل صعب الفهم على الزوار وعلى أنظمة البحث معاً. فالتصميم يخلق الانطباع، بينما [البنية هي ما يخلق الفهم](/ar/services/websites-and-cro). وأنتم بحاجة إلى الاثنين معاً.",
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
        "هذا يعني أن بصمتكم الرقمية تحتاج إلى الاتساق. يجب ألا [يتغيّر موقع علامتكم التجارية](/ar/services/brand-and-creative) من منصة إلى أخرى. يجب أن تكون خبرتكم واضحة، وخدماتكم منظّمة، وأعمالكم مدعومة بأدلة فعلية، ومحتواكم يُظهر فهماً حقيقياً للمواضيع التي تدّعون التخصص فيها.",
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
        "لا حاجة للتخلي عن تحسين محركات البحث التقليدي. بل يجب بناء [استراتيجية بحث أوسع](/ar/services/seo-and-content).",
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
        "Красиво оформленный сайт с расплывчатым содержанием может производить впечатление, но при этом оставаться непонятным и людям, и поисковым системам. Дизайн создаёт восприятие. [Структура создаёт понимание](/ru/services/websites-and-cro). Нужно и то, и другое.",
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
        "Это значит, что ваш цифровой след должен быть последовательным. Ваше [позиционирование бренда](/ru/services/brand-and-creative) не должно меняться от платформы к платформе. Экспертиза должна быть ясной, услуги — структурированными, работы — подтверждёнными доказательствами, а контент — показывать, что вы действительно разбираетесь в темах, в которых заявляете экспертизу.",
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
        "Отказываться от классического SEO не нужно. Вместо этого стоит выстроить более широкую [поисковую стратегию](/ru/services/seo-and-content).",
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
];

export function getInsightArticle(slug: string): InsightArticle | undefined {
  return insightArticles.find((article) => article.slug === slug);
}

/**
 * The homepage's Insights band pulls from this rather than a hand-picked
 * list, so a new article added to `insightArticles` appears there on its
 * own the next time the homepage renders — no second place to remember to
 * update it.
 */
export function latestInsightArticles(count: number): InsightArticle[] {
  return [...insightArticles]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, count);
}

