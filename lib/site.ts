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
  phone: "+971 56 121 7647",
  phoneHref: "+971561217647",
  email: "sharoon.irfan99@gmail.com",
  website: "www.shario.ae",
  linkedin: "https://linkedin.com/in/sharoonirfan",
  founder: "Sharoon Irfan",
  founderRole: "Founder & Digital Growth Strategist",
  /** The headline claim, cited on Home and About. */
  revenue: "AED 35M+",
  experience: "6+ years",
} as const;

/** Primary navigation. Three pages; the CTA button beside them is not a nav item. */
export const nav = [
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

/** The action repeated in the header, every hero and every closing band. */
export const cta = {
  label: "Book a Strategy Call",
  href: "/contact",
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
 * The homepage FAQ. The reference site answers the four questions a buyer asks
 * before enquiring; these are the Dubai equivalents. Kept distinct from the
 * per-service FAQs — those answer "how does this service work", these answer
 * "should I talk to you at all".
 */
export const homeFaqs = [
  {
    q: "How long until I see results?",
    a: "Paid campaigns produce leads in the first fortnight, and the first six to eight weeks are spent finding what holds up at volume. SEO and content compound over three to six months. Anyone promising faster on organic is guessing.",
  },
  {
    q: "Do you actually know the Dubai market?",
    a: "The AED 35M+ was generated here, in developer-led real estate — the most contested advertising auction in the region. That is the market this company was built in, not one it expanded into.",
  },
  {
    q: "How do you report on performance?",
    a: "Weekly, against pipeline and closed revenue rather than impressions. Every campaign is tied back to attributable revenue through the CRM, so you can see what each dirham bought.",
  },
  {
    q: "Can we start with one service?",
    a: "Yes. Most engagements start with the single channel where the leverage is clearest, then extend once it is returning. You are not asked to buy the whole funnel to begin.",
  },
] as const;

/* -------------------------------------------------------------------------- */
/* About                                                                       */
/* -------------------------------------------------------------------------- */

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
    descriptor:
      "Google Ads and Meta Ads engineered for qualified leads at below-target cost per lead.",
    subhead: "Paid media judged on pipeline, not impressions.",
    lead: "Paid media works when every dirham can be traced to a lead the sales team actually wants.",
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
        src: "/images/book/desk-shelving.jpg",
        label: "The account room",
        caption: "Campaigns are reviewed weekly against pipeline, not monthly against impressions.",
        width: 1122,
        height: 1402,
      },
      {
        src: "/images/detail/pair-performance.jpg",
        label: "Held to a number",
        caption: "Every campaign carries a target cost per lead, agreed before it goes live.",
        width: 314,
        height: 392,
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
    descriptor:
      "Technical SEO, on-page optimisation and content built to rank in Dubai search and win AI-driven results.",
    subhead: "Demand that keeps arriving after the budget stops.",
    lead: "Organic is the only channel that compounds — every month of work keeps paying after it is done.",
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
        src: "/images/detail/sketches.jpg",
        label: "Structure first",
        caption: "Indexing, architecture and internal linking are planned before a word is written.",
        width: 651,
        height: 631,
      },
      {
        src: "/images/detail/pair-seo.jpg",
        label: "Written to be read",
        caption: "Content is commissioned against what buyers actually search, not against a volume list.",
        width: 505,
        height: 489,
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
        src: "/images/detail/workspace.jpg",
        label: "Built around the sale",
        caption: "Every build starts from how your sales team actually closes, not from the sitemap.",
        width: 785,
        height: 771,
      },
      {
        src: "/images/detail/pair-web.jpg",
        label: "Tested, then kept",
        caption: "Layout and copy changes ship behind measurement, so a win can be told from a hunch.",
        width: 426,
        height: 418,
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
    descriptor:
      "Attribution tracking and marketing automation that tie every dirham of spend to pipeline and closed revenue.",
    subhead: "Every dirham of spend, traced to a closed sale.",
    lead: "Marketing stops being an argument the moment the pipeline can be read back to the campaign that filled it.",
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
        src: "/images/book/stat-letterhead.jpg",
        label: "Documented, then handed over",
        caption: "The configuration is built in your account and written down, so nothing depends on us.",
        width: 1086,
        height: 1448,
      },
      {
        src: "/images/detail/pair-crm.jpg",
        label: "One record per lead",
        caption: "Source, score and outcome held in one place — which is what makes attribution possible.",
        width: 449,
        height: 599,
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
        src: "/images/detail/materials.jpg",
        label: "Direction before production",
        caption: "Material, colour and typographic direction are set before a single asset is made.",
        width: 583,
        height: 771,
      },
      {
        src: "/images/detail/pair-brand.jpg",
        label: "Made to be tested",
        caption: "Creative ships in variants, because the winning execution is rarely the first one.",
        width: 292,
        height: 386,
      },
    ],
    ctaTitle: ["Let's make the creative", "worth the spend."],
    metaDescription:
      "Brand and creative in Dubai — brand identity, campaign visuals, social and paid ad creative and marketing collateral produced to a launch standard.",
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
