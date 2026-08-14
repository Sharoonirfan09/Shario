/**
 * Single source of truth for site content and contact details.
 *
 * Copy follows `Shario content (1).pdf` — the client's content document, which
 * positions Shario as a founder-led *performance marketing* company: "A Dubai
 * Digital Marketing Company That Turns Spend Into Revenue". That document
 * supersedes the earlier Brand Book positioning ("A Symphony of Identity", a
 * boutique creative studio), and the tagline, the Arabic lockup and the six
 * creative-studio capabilities retired with it.
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
  domain: "https://shario.ae",
  tagline: "Marketing that turns spend into revenue.",
  description:
    "Shario is a founder-led digital marketing company in Dubai building marketing systems that produce sales — performance marketing, SEO, websites and CRM attribution.",
  location: "Dubai, UAE",
  studio: "Dubai, United Arab Emirates",
  phone: "+971 50 467 9095",
  phoneHref: "+971504679095",
  /** wa.me's click-to-chat format: country code + number, no "+", no spaces. */
  whatsapp: "https://wa.me/971504679095",
  email: "info@shario.ae",
  website: "www.shario.ae",
  linkedin: "https://linkedin.com/in/sharoonirfan",
  founder: "Sharoon Irfan",
  founderRole: "Founder & Digital Growth Strategist",
  /** The headline claim, cited on Home and About. */
  revenue: "AED 35M+",
  experience: "6+ years",
} as const;

/** Primary navigation. The CTA button beside it is not a nav item. */
export const nav = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/insights", label: "Insights" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
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
    a: "SHARIO brings strategy, digital, creative and growth together to build clearer brands and stronger marketing systems.",
  },
  {
    q: "What services do you offer?",
    a: "Our core services include Performance Marketing, SEO & Content, Websites & CRO, CRM & Automation, Brand & Creative, and Strategy & Consulting.",
  },
  {
    q: "Do you work with businesses in Dubai only?",
    a: "SHARIO is based in Dubai and works with brands across the UAE and beyond.",
  },
  {
    q: "How do we start working with SHARIO?",
    a: "Every engagement starts with a conversation. We first understand your goals, challenges and current marketing setup, then recommend the right direction.",
  },
  {
    q: "Do you offer individual services or complete marketing systems?",
    a: "Both. We can support a specific need or bring multiple disciplines together into one connected system.",
  },
  {
    q: "How long does an engagement typically take?",
    a: "It depends on the scope. After understanding your requirements, we define the appropriate timeline and deliverables before work begins.",
  },
  {
    q: "Do you work with existing brands?",
    a: "Yes. We work with brands that need clearer positioning, stronger digital experiences, better performance or a more connected marketing system.",
  },
  {
    q: "Can SHARIO build and manage our website?",
    a: "Yes. Website work can cover strategy, structure, design, development, SEO-ready architecture, conversion and ongoing optimisation.",
  },
  {
    q: "Do you provide ongoing marketing support?",
    a: "Yes. Depending on the engagement, SHARIO can support ongoing strategy, performance, SEO, creative, CRM and digital growth.",
  },
  {
    q: "How do I know which service I need?",
    a: "You don't have to figure it out alone. Tell us what you're trying to achieve, and we'll identify the most relevant starting point.",
  },
  {
    q: "What industries does SHARIO work with?",
    a: "We work with ambitious businesses and brands across sectors where positioning, digital presence and measurable growth matter.",
  },
  {
    q: "Can you work with our existing marketing team?",
    a: "Yes. SHARIO can work alongside internal teams, existing partners or specialist suppliers.",
  },
  {
    q: "Do you provide strategy before execution?",
    a: "Yes. We believe execution is stronger when it is built around a clear strategic direction.",
  },
  {
    q: "Can you help reposition an existing brand?",
    a: "Yes. We can help clarify positioning, refine messaging and create a stronger expression of the brand.",
  },
  {
    q: "Can you improve an existing website rather than build a new one?",
    a: "Yes. We can assess the existing experience and identify opportunities across structure, UX, SEO, conversion and performance.",
  },
  {
    q: "Do you provide SEO as a standalone service?",
    a: "Yes. SEO can be approached as a standalone engagement or integrated with content, website and broader digital strategy.",
  },
  {
    q: "Do you manage paid advertising?",
    a: "Yes. Performance Marketing covers paid media across relevant platforms, with a focus on qualified demand and measurable outcomes.",
  },
  {
    q: "Can you create content for our brand?",
    a: "Yes. Content can include strategic messaging, social content, campaign creative and marketing collateral.",
  },
  {
    q: "Do you offer CRM and marketing automation?",
    a: "Yes. We can help connect marketing activity, CRM and automation so leads and customer journeys are managed more effectively.",
  },
  {
    q: "What happens after the initial strategy?",
    a: "The strategy becomes the foundation for the next stage — whether that means brand work, digital execution, performance marketing, website development or ongoing growth support.",
  },
  {
    q: "Do you offer custom solutions?",
    a: "Yes. We build the scope around the problem that needs solving.",
  },
  {
    q: "Can SHARIO work on a project basis?",
    a: "Yes. Specific projects can be scoped around defined objectives, deliverables and timelines.",
  },
  {
    q: "Can we start with just one service?",
    a: "Yes. You can begin with a specific requirement and expand into other areas as your needs evolve.",
  },
  {
    q: "How do you measure success?",
    a: "Success depends on the objective. We focus on meaningful business and marketing outcomes rather than vanity metrics alone.",
  },
  {
    q: "What makes SHARIO different?",
    a: "We connect strategy, identity, digital and growth instead of treating them as isolated pieces.",
  },
  {
    q: "How can I speak with SHARIO?",
    a: "Let's connect — tell us what you're trying to achieve and we'll take it from there.",
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
    desc: "Start with the business, audience, numbers and opportunity.",
  },
  {
    num: "02",
    title: "Build",
    desc: "Create the strategy, digital infrastructure, content and creative system.",
  },
  {
    num: "03",
    title: "Measure",
    desc: "Track the metrics that connect marketing activity to meaningful business outcomes.",
  },
  {
    num: "04",
    title: "Refine",
    desc: "Continuously improve what works and remove what does not.",
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
    desc: "Cost per lead, close rate and revenue per channel, before anything is built.",
  },
  {
    num: "02",
    title: "Build the system",
    desc: "Ads, SEO, website and CRM working together rather than in separate silos.",
  },
  {
    num: "03",
    title: "Track everything",
    desc: "Every campaign tied back to attributable revenue, not to impressions.",
  },
  {
    num: "04",
    title: "Optimise relentlessly",
    desc: "Every week, against the metrics that move money.",
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
    desc: "We schedule fifteen minutes to understand your goals and current numbers.",
  },
  {
    num: "02",
    title: "We map the funnel",
    desc: "We identify where the leverage is and which wins come first.",
  },
  {
    num: "03",
    title: "A clear proposal",
    desc: "Scope, timeline and expected outcomes, written down.",
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
  /**
   * The group this service belongs to. The reference site organises its
   * catalogue into four such groups and labels each service page with its
   * group rather than repeating the service name under the breadcrumb.
   */
  category: string;
  /** Hero heading. */
  title: string;
  /** The banner photograph behind the hero. Never used anywhere else on the site. */
  heroImage: string;
  /** The one-line description shown in the services grid. */
  descriptor: string;
  /** Italic hero subhead. */
  subhead: string;
  /** The large serif statement that opens "What We Do". */
  lead: string;
  whatWeDo: string[];
  benefits: { title: string; desc: string }[];
  deliverables: string[];
  faqs: { q: string; a: string }[];
  /**
   * The page's two photographs, shown side by side. Each carries its own
   * pixel dimensions so the frame takes the picture's real proportion and
   * nothing is cropped, and both in a pair share a ratio so the row is even.
   * No image appears on more than one page — `check:images` enforces it.
   */
  images: {
    src: string;
    label: string;
    caption: string;
    width: number;
    height: number;
  }[];
  /** Closing CTA heading, split across two lines. */
  ctaTitle: [string, string];
  metaDescription: string;
};

export const services: Service[] = [
  {
    slug: "performance-marketing",
    num: "01",
    name: "Performance Marketing",
    category: "Reach & Performance",
    title: "Performance Marketing.",
    heroImage: "/images/book/hero-performance.jpg",
    descriptor:
      "Google Ads and Meta Ads engineered for qualified leads at below-target cost per lead.",
    subhead: "Paid media judged on pipeline, not impressions.",
    lead: "Performance marketing is digital advertising bought and measured against a specific outcome — a lead, a sale — rather than an impression. Paid media works when every dirham can be traced to a lead the sales team actually wants.",
    whatWeDo: [
      "Google Search, Display and Performance Max",
      "Meta campaigns across Facebook and Instagram",
      "YouTube and video demand generation",
      "Audience, offer and creative testing",
      "Budget pacing and bid strategy",
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
    deliverables: [
      "Account audit and restructure",
      "Campaign build and conversion tracking",
      "Ad creative and copy",
      "Audience and remarketing strategy",
      "Weekly optimisation cycle",
      "Spend-to-revenue reporting",
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
    images: [
      {
        src: "/images/detail/performance-1.jpg",
        label: "The account room",
        caption: "Campaigns are reviewed weekly against pipeline, not monthly against impressions.",
        width: 933,
        height: 1400,
      },
      {
        src: "/images/detail/performance-2.jpg",
        label: "Held to a number",
        caption: "Every campaign carries a target cost per lead, agreed before it goes live.",
        width: 933,
        height: 1400,
      },
    ],
    ctaTitle: ["Let's put the spend", "where it returns."],
    metaDescription:
      "Performance marketing in Dubai — Google Ads and Meta Ads managed for qualified leads at below-target cost per lead, reported against pipeline and closed revenue.",
  },
  {
    slug: "seo-and-content",
    num: "02",
    name: "SEO & Content",
    category: "Reach & Performance",
    title: "SEO & Content.",
    heroImage: "/images/book/hero-seo.jpg",
    descriptor:
      "Technical SEO, on-page optimisation and content built to rank in Dubai search and win AI-driven results.",
    subhead: "Demand that keeps arriving after the budget stops.",
    lead: "Organic is the only channel that compounds — every month of work keeps paying after it is done. Done well, SEO and performance marketing reinforce each other rather than compete for the same budget.",
    whatWeDo: [
      "Technical SEO and indexing fixes",
      "On-page and site architecture optimisation",
      "Content clusters built around buyer intent",
      "Local and Dubai-specific search",
      "Visibility in AI-driven search results",
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
    deliverables: [
      "Technical and content SEO audit",
      "Keyword and intent mapping",
      "On-page optimisation",
      "Content plan and production",
      "Internal linking and site structure",
      "Monthly ranking and traffic reporting",
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
    images: [
      {
        src: "/images/detail/seo-1.jpg",
        label: "Structure first",
        caption: "Indexing, architecture and internal linking are planned before a word is written.",
        width: 933,
        height: 1400,
      },
      {
        src: "/images/detail/seo-2.jpg",
        label: "Written to be read",
        caption: "Content is commissioned against what buyers actually search, not against a volume list.",
        width: 1120,
        height: 1400,
      },
    ],
    ctaTitle: ["Let's make the brand", "easier to find."],
    metaDescription:
      "SEO and content marketing in Dubai — technical SEO, on-page optimisation and content clusters built to rank in Dubai search and win AI-driven results.",
  },
  {
    slug: "websites-and-cro",
    num: "03",
    name: "Websites & CRO",
    category: "Web & Build",
    title: "Websites & CRO.",
    heroImage: "/images/book/hero-web.jpg",
    descriptor:
      "High-converting websites with SEO-ready architecture, custom landing pages and CRM-integrated funnels.",
    subhead: "Built around the sales process, not the sitemap.",
    lead: "A website earns its cost at one moment — when a visitor who was going to leave decides to enquire instead.",
    whatWeDo: [
      "Website design and development",
      "Campaign and project landing pages",
      "SEO-ready site architecture",
      "CRM-integrated enquiry funnels",
      "Conversion rate optimisation and testing",
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
    deliverables: [
      "Sitemap and content structure",
      "Responsive design system",
      "Built and deployed website",
      "Landing page templates",
      "CRM and form integration",
      "Analytics, tracking and A/B testing setup",
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
    images: [
      {
        src: "/images/detail/web-1.jpg",
        label: "Built around the sale",
        caption: "Every build starts from how your sales team actually closes, not from the sitemap.",
        width: 1050,
        height: 1400,
      },
      {
        src: "/images/detail/web-2.jpg",
        label: "Tested, then kept",
        caption: "Layout and copy changes ship behind measurement, so a win can be told from a hunch.",
        width: 933,
        height: 1400,
      },
    ],
    ctaTitle: ["Let's build the site", "that actually converts."],
    metaDescription:
      "Website development and conversion rate optimisation in Dubai — high-converting websites with SEO-ready architecture, landing pages and CRM-integrated funnels.",
  },
  {
    slug: "crm-and-automation",
    num: "04",
    name: "CRM & Automation",
    category: "Data & Systems",
    title: "CRM & Automation.",
    heroImage: "/images/book/hero-crm.jpg",
    descriptor:
      "Attribution tracking and marketing automation that tie every dirham of spend to pipeline and closed revenue.",
    subhead: "Every dirham of spend, traced to a closed sale.",
    lead: "Marketing stops being an argument the moment the pipeline can be read back to the campaign that filled it. That's what turns a dashboard of digital marketing metrics into an honest read on marketing performance, not a vanity report.",
    whatWeDo: [
      "CRM setup, migration and configuration",
      "End-to-end attribution tracking",
      "Lead capture, scoring and routing",
      "Automated nurture and follow-up",
      "Pipeline and revenue reporting",
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
    deliverables: [
      "CRM audit and configuration",
      "Conversion and offline tracking setup",
      "Lead scoring and routing rules",
      "Automated nurture sequences",
      "Pipeline and attribution dashboards",
      "Team training and documentation",
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
    images: [
      {
        src: "/images/detail/crm-1.jpg",
        label: "Documented, then handed over",
        caption: "The configuration is built in your account and written down, so nothing depends on us.",
        width: 1056,
        height: 1400,
      },
      {
        src: "/images/detail/crm-2.jpg",
        label: "One record per lead",
        caption: "Source, score and outcome held in one place — which is what makes attribution possible.",
        width: 934,
        height: 1400,
      },
    ],
    ctaTitle: ["Let's connect the spend", "to the pipeline."],
    metaDescription:
      "CRM integration and marketing automation in Dubai — attribution tracking, lead scoring and automated follow-up that tie marketing spend to closed revenue.",
  },
  {
    slug: "brand-and-creative",
    num: "05",
    name: "Brand & Creative",
    category: "Brand & Creative",
    title: "Brand & Creative.",
    heroImage: "/images/book/hero-brand.jpg",
    descriptor:
      "Brand identity, campaign visuals, social creative and marketing collateral produced to a launch standard.",
    subhead: "Creative held to the standard the campaign is spending at.",
    lead: "Creative is the variable with the widest range in paid media — the same budget behind better work buys a different result.",
    whatWeDo: [
      "Brand identity and visual systems",
      "Campaign concepts and key visuals",
      "Social and paid ad creative",
      "Marketing collateral and brochures",
      "Launch and project branding",
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
    deliverables: [
      "Brand identity and guidelines",
      "Campaign key visuals",
      "Paid and social ad creative sets",
      "Brochures and sales collateral",
      "Presentation and proposal templates",
      "Asset library and handover",
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
    images: [
      {
        src: "/images/detail/brand-1.jpg",
        label: "Direction before production",
        caption: "Material, colour and typographic direction are set before a single asset is made.",
        width: 1001,
        height: 1400,
      },
      {
        src: "/images/detail/brand-2.jpg",
        label: "Made to be tested",
        caption: "Creative ships in variants, because the winning execution is rarely the first one.",
        width: 788,
        height: 1400,
      },
    ],
    ctaTitle: ["Let's make the creative", "worth the spend."],
    metaDescription:
      "Brand and creative in Dubai — brand identity, campaign visuals, social and paid ad creative and marketing collateral produced to a launch standard.",
  },
  {
    slug: "strategy-consulting",
    num: "06",
    name: "Strategy & Consulting",
    category: "Strategy & Growth",
    title: "Strategy & Consulting.",
    heroImage: "/images/insights/strategy-consulting-chess-board.jpg",
    descriptor:
      "Go-to-market strategy, marketing audits and channel planning that turn a fragmented budget into one coherent plan.",
    subhead: "A plan before the spend, not instead of it.",
    lead: "Most marketing budgets are not underfunded — they are unplanned, spread across channels that were never asked to work together. A performance marketing consultant's job is to find that plan before adding a single dirham of new spend.",
    whatWeDo: [
      "Go-to-market and channel strategy",
      "Marketing audits and diagnostics",
      "Budget planning and channel mix",
      "Quarterly roadmaps and OKRs",
      "Leadership reporting and advisory",
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
    deliverables: [
      "Marketing and channel audit",
      "Go-to-market strategy document",
      "Budget and channel allocation plan",
      "Quarterly roadmap and OKRs",
      "Monthly strategy and performance review",
      "Leadership-ready reporting",
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
    images: [
      {
        src: "/images/detail/strategy-1.jpg",
        label: "Where the plan gets made",
        caption: "Strategy is set at a desk, then handed to the channels built to run it.",
        width: 934,
        height: 1400,
      },
      {
        src: "/images/detail/strategy-2.jpg",
        label: "Written down, not assumed",
        caption: "Every roadmap is documented, so the plan survives past whoever is in the room.",
        width: 1120,
        height: 1400,
      },
    ],
    ctaTitle: ["Let's build the plan", "the spend can follow."],
    metaDescription:
      "Marketing strategy and consulting in Dubai — go-to-market strategy, marketing audits and channel planning that turn a fragmented budget into one coherent plan.",
  },
];

export function getService(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug);
}

/**
 * The catalogue grouped by category, in first-appearance order — the shape the
 * navigation dropdown renders.
 */
export function servicesByCategory(): { category: string; items: Service[] }[] {
  const groups: { category: string; items: Service[] }[] = [];

  for (const service of services) {
    const group = groups.find((g) => g.category === service.category);
    if (group) group.items.push(service);
    else groups.push({ category: service.category, items: [service] });
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
  /** Used as the category's H1/meta description on `/insights?category=`. */
  description: string;
};

/** The five sections the editorial hub is organised into. Every article belongs to exactly one. */
export const insightCategories: InsightCategory[] = [
  {
    slug: "market-news",
    num: "01",
    name: "Market News",
    description:
      "Timely commentary on the platforms, auctions and budgets shaping digital marketing in Dubai and the UAE.",
  },
  {
    slug: "articles",
    num: "02",
    name: "Articles",
    description:
      "In-depth pieces on performance marketing, websites and CRM — the mechanics behind marketing that actually converts.",
  },
  {
    slug: "case-studies",
    num: "03",
    name: "Case Studies",
    description:
      "Illustrative examples of how real marketing problems — lead quality, site conversion, full-funnel systems — get diagnosed and fixed.",
  },
  {
    slug: "trends-and-insights",
    num: "04",
    name: "Trends & Insights",
    description:
      "Where digital marketing is headed next, and what it asks of your website, content and campaigns today.",
  },
  {
    slug: "guides",
    num: "05",
    name: "Guides",
    description:
      "Practical, step-by-step guides for founders and marketing leads running their own growth.",
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
  excerpt: string;
  date: string;
  readingTime: string;
  /** Shown in the Featured Content band. Exactly one article carries this. */
  featured?: boolean;
  /**
   * The <title> tag content, when it should differ from the on-page `title`
   * — usually because the H1 reads better short and the <title> has room for
   * the keyword phrase and the brand name. Falls back to `title`.
   */
  seoTitle?: string;
  /** Falls back to `excerpt` when omitted — the same pattern `services[].metaDescription` uses. */
  metaDescription?: string;
  /** The card/hero photograph. Never used on more than one article — same rule `check:images` enforces elsewhere. */
  image: string;
  /** Describes what's actually in the photograph, not the article topic. */
  imageAlt: string;
  /**
   * The short phrase set over the image itself — a topic, not the full
   * headline (e.g. "Dubai's Ad Auctions", not the full H1). Two to four
   * words, so it reads at a glance over a photograph rather than as a
   * second title competing with the real one underneath it.
   */
  imageTopic: string;
  body: ArticleBlock[];
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
    seoTitle: "Why Dubai Ad Auctions Are More Competitive in 2026",
    excerpt:
      "Cost per click keeps climbing, and it isn't one platform update. Here's what's actually driving it.",
    metaDescription:
      "Cost per click in Dubai keeps rising, and it isn't one platform update. Here's what's actually driving competitive ad auctions in the UAE, and how to keep your account ahead of it.",
    date: "3 Jul 2026",
    readingTime: "6 min read",
    image: "/images/insights/dubai-ad-auctions-clock-detail.jpg",
    imageAlt: "Close-up of a clock face with its hands crossed, lit at a low angle",
    imageTopic: "Dubai's Ad Auctions",
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
  },
  {
    slug: "rising-ad-costs-uae-marketing-budgets",
    category: "market-news",
    title: "What Rising Ad Costs Mean for UAE Marketing Budgets",
    seoTitle: "Rising Ad Costs & UAE Marketing Budgets: What to Do",
    excerpt:
      "Cost per lead isn't the number to panic over. Cost per qualified lead, measured against what a sale is worth, is.",
    metaDescription:
      "Rising ad costs don't have to shrink your results. Here's how UAE marketing teams should reprice, protect and reallocate their budget when cost per lead climbs.",
    date: "22 May 2026",
    readingTime: "5 min read",
    image: "/images/insights/rising-ad-costs-budget-watch.jpg",
    imageAlt: "A crossed wrist wearing a watch, cuffed in a tailored white shirt",
    imageTopic: "What Rising Costs Mean",
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
  },
  {
    slug: "real-cost-of-a-slow-website",
    category: "articles",
    title: "The Real Cost of a Slow Website",
    seoTitle: "The Real Cost of a Slow Website (And How to Fix It)",
    excerpt:
      "A site that loads a second slower doesn't just frustrate visitors — it quietly taxes every campaign pointed at it.",
    metaDescription:
      "A slow website taxes every campaign pointed at it. Here's how page speed quietly erodes conversion rate, what actually causes the delay, and how to fix it without a full rebuild.",
    date: "14 Jun 2026",
    readingTime: "6 min read",
    image: "/images/insights/real-cost-slow-website-door-handle.jpg",
    imageAlt: "A hand turning an ornate brass door handle, wearing a wristwatch",
    imageTopic: "The Real Cost of Slow",
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
  },
  {
    slug: "why-crm-rollouts-fail-before-they-start",
    category: "articles",
    title: "Why Most CRM Rollouts Fail Before They Start",
    seoTitle: "Why Most CRM Rollouts Fail (and How to Fix It)",
    excerpt:
      "The software is rarely the problem. Routing, ownership and the first five minutes after a lead arrives usually are.",
    metaDescription:
      "Most CRM rollouts fail before they start — and it's rarely the software. Here's why routing, ownership and the first five minutes after a lead arrives matter more than the platform you choose.",
    date: "9 Apr 2026",
    readingTime: "5 min read",
    image: "/images/insights/crm-rollouts-fail-paintbrushes.jpg",
    imageAlt: "A hand reaching for a paintbrush among a jar of brushes, in black and white",
    imageTopic: "Why CRM Rollouts Fail",
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
  },
  {
    slug: "ai-search-changing-what-ranking-means",
    category: "trends-and-insights",
    title: "AI Search Is Changing What 'Ranking' Means",
    seoTitle: "AI Search & SEO: What 'Ranking' Means Now",
    excerpt:
      "Being first on a results page matters less when the answer is assembled before the click. Here's what that shift asks of a website.",
    metaDescription:
      "AI-generated search answers are changing what SEO ranking means. Here's what the shift from position one to answer citation actually asks of your website's content and structure.",
    date: "28 Jul 2026",
    readingTime: "6 min read",
    featured: true,
    image: "/images/insights/ai-search-ranking-gallery-wall.jpg",
    imageAlt: "A wall of framed prints and drawings arranged in a considered gallery hang",
    imageTopic: "AI Search, Redefined",
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
  },
  {
    slug: "from-leads-to-pipeline",
    category: "trends-and-insights",
    title: "The Shift From Leads to Pipeline",
    seoTitle: "From Leads to Pipeline: A Better Marketing Metric",
    excerpt:
      "More Dubai brands are judging marketing by what closes, not by what fills a spreadsheet. It changes what 'working' looks like.",
    metaDescription:
      "More Dubai brands are judging marketing by pipeline, not lead count. Here's why the shift from leads to pipeline changes what a 'working' marketing channel actually looks like.",
    date: "11 Mar 2026",
    readingTime: "5 min read",
    image: "/images/insights/leads-to-pipeline-travel-notebook.jpg",
    imageAlt: "A hand writing a route of destinations in a notebook beside a laptop and coffee",
    imageTopic: "Leads to Pipeline",
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
  },
  {
    slug: "founders-guide-to-briefing-a-performance-agency",
    category: "guides",
    title: "A Founder's Guide to Briefing a Performance Marketing Agency",
    seoTitle: "How to Brief a Performance Marketing Agency: Founder's Guide",
    excerpt:
      "The brief that gets you a better proposal is shorter than you think, and asks for fewer promises.",
    metaDescription:
      "A short, numbers-first brief gets a better proposal from any performance marketing agency than a long wish list. Here's exactly what to include, in what order, and why.",
    date: "19 Feb 2026",
    readingTime: "7 min read",
    image: "/images/insights/briefing-performance-agency-photo-stack.jpg",
    imageAlt: "A hand holding a fanned stack of black-and-white photographs",
    imageTopic: "Briefing an Agency",
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
        "If you're weighing whether to brief us or another team, [our strategy and consulting work](/services/strategy-consulting) starts from exactly this list before a single recommendation gets made. You're welcome to send the numbers first and see what comes back — [reach out here](/contact) whenever you're ready.",
      ),
    ],
  },
  {
    slug: "audit-your-marketing-funnel-in-an-afternoon",
    category: "guides",
    title: "How to Audit Your Marketing Funnel in One Afternoon",
    seoTitle: "How to Audit Your Marketing Funnel in One Afternoon",
    excerpt:
      "You don't need a consultant to find the leak. You need forty-five minutes and the right four questions.",
    metaDescription:
      "A full funnel audit takes weeks — finding the stage that's actually costing you money takes an afternoon. Here are the four questions to ask, in order, and what the answers usually reveal.",
    date: "6 Jan 2026",
    readingTime: "6 min read",
    image: "/images/book/photo-plinth.jpg",
    imageAlt: "A small ceramic bowl on a travertine plinth against a travertine wall",
    imageTopic: "Audit Your Funnel",
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
  },
  {
    slug: "real-estate-developer-lead-quality-case-study",
    category: "case-studies",
    title: "Fixing a Real Estate Developer's Lead Quality Problem",
    seoTitle: "Real Estate Lead Quality Case Study | Illustrative Example",
    excerpt:
      "An illustrative example: a Dubai developer generating plenty of leads, few of them worth a sales call. Here's the kind of fix that closes that gap.",
    metaDescription:
      "An illustrative example scenario showing how a Dubai real estate developer's lead-quality problem gets diagnosed and fixed — from cost-per-lead vanity metrics to CRM-connected, close-rate-driven campaigns.",
    date: "17 Aug 2026",
    readingTime: "6 min read",
    image: "/images/insights/real-estate-case-study-ornate-ceiling.jpg",
    imageAlt: "An ornate gilded ceiling and archway inside a grand period interior",
    imageTopic: "Lead Quality, Fixed",
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
  },
  {
    slug: "hospitality-group-website-conversion-case-study",
    category: "case-studies",
    title: "Turning Website Traffic Into Direct Bookings for a Hospitality Group",
    seoTitle: "Hospitality Website Conversion Case Study | Illustrative Example",
    excerpt:
      "An illustrative example: strong traffic, weak direct bookings, and heavy reliance on OTA commissions. Here's the kind of website fix that shifts that balance.",
    metaDescription:
      "An illustrative example scenario for a UAE hospitality group converting more website traffic into direct, commission-free bookings through CRO, page speed and a clearer booking path.",
    date: "3 Aug 2026",
    readingTime: "5 min read",
    image: "/images/insights/hospitality-case-study-bouquet-portrait.jpg",
    imageAlt: "A woman holding a dried flower bouquet in front of her face, lit in warm sunlight",
    imageTopic: "Turning Traffic to Bookings",
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
  },
  {
    slug: "b2b-technology-partner-full-funnel-case-study",
    category: "case-studies",
    title: "Building a Full-Funnel System for a B2B Technology Partner",
    seoTitle: "B2B Full-Funnel Marketing Case Study | Illustrative Example",
    excerpt:
      "An illustrative example: strong product, disconnected marketing and sales, and a pipeline nobody could see clearly. Here's the kind of system that fixes that.",
    metaDescription:
      "An illustrative example scenario showing how a B2B technology partner connects SEO, paid search and CRM into one full-funnel system, replacing lead count with a pipeline both teams trust.",
    date: "24 Jul 2026",
    readingTime: "6 min read",
    image: "/images/insights/b2b-case-study-poppy-portrait.jpg",
    imageAlt: "A woman holding a single poppy flower in front of her eyes, lit in warm sunlight",
    imageTopic: "A Full-Funnel System",
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

