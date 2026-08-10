/**
 * Single source of truth for site content and contact details.
 *
 * Copy, section order and navigation follow the design handoff
 * (`design_handoff_shario_website`, five hifi HTML prototypes) which supersedes
 * the earlier Brand Book page structure. The Brand Book still governs tone and
 * palette: clear, precise, composed — never "game-changing" or "world-class".
 *
 * The handoff supplies finished copy for the homepage, About, Contact, the
 * Brand Identity service and the Meridian Residences case study. The remaining
 * five services and two case studies are written here to the same pattern.
 */

export const site = {
  name: "Shario",
  domain: "https://shario.ae",
  tagline: "A Symphony of Identity.",
  taglineAr: "الهوية سيمفونية",
  description:
    "Shario is a boutique creative studio in Dubai composing coherent brand identities across strategy, design and technology.",
  location: "Dubai, UAE",
  studio: "Dubai, United Arab Emirates",
  phone: "+971 50 467 9095",
  phoneHref: "+971504679095",
  email: "info@shario.ae",
  website: "www.shario.ae",
  linkedin: "https://linkedin.com/in/sharoonirfan",
  instagram: "https://instagram.com/shario.ae",
  founder: "Sharoon Irfan",
  founderRole: "Founder & Creative Director",
  founderQuote:
    "Independent thinking. Sharper execution. This is how SHARIO begins every engagement.",
  promise: "One vision. Every touchpoint.",
  vision:
    "To build identities recognised not by volume, but by clarity, character and coherence.",
  mission:
    "To unite strategy, design, communication and technology into complete brand systems that support meaningful growth.",
} as const;

/**
 * Primary navigation, exactly as the handoff sets it. Industries and Insights
 * are homepage sections rather than pages, so they resolve to anchors.
 */
export const nav = [
  { href: "/services", label: "Services" },
  { href: "/work", label: "Work" },
  { href: "/industries", label: "Industries" },
  { href: "/about", label: "About" },
  { href: "/#insights", label: "Insights" },
  { href: "/contact", label: "Contact" },
] as const;

/** Footer "Studio" column. */
export const footerLinks = [
  { href: "/services", label: "Services" },
  { href: "/work", label: "Work" },
  { href: "/industries", label: "Industries" },
  { href: "/about", label: "About" },
  { href: "/#insights", label: "Insights" },
] as const;

/* -------------------------------------------------------------------------- */
/* Industries                                                                  */
/* -------------------------------------------------------------------------- */

export type Industry = {
  slug: string;
  num: string;
  /** The label used in every pill row across the site. */
  name: string;
  /** Hero heading, with the closing full stop the handoff sets. */
  title: string;
  subhead: string;
  /** The large serif statement that opens the overview. */
  lead: string;
  body: string;
  /** "What this sector demands". */
  demands: string[];
  /** Service slugs, most relevant first. */
  capabilities: string[];
  ctaTitle: [string, string];
  metaDescription: string;
};

/**
 * The handoff renders industries as a pill row and nothing more. They are
 * pages here because the sector terms are what this studio's buyers actually
 * search for, and because the pills appeared in three places linking nowhere.
 */
export const industries: Industry[] = [
  {
    slug: "real-estate-development",
    num: "01",
    name: "Real Estate & Development",
    title: "Real Estate & Development.",
    subhead: "Sold on a name, a brochure and a sales gallery.",
    lead: "A development is sold long before it is built.",
    body: "Multi-phase projects carry an unusual burden: the brand has to hold across years, agencies and international buyer audiences while the product itself is still a render. We build identities that draw their palette and proportion from the site’s own materials, then document them tightly enough that a launch in phase four still reads as the same development as phase one.",
    demands: [
      "An identity that survives a multi-year sales cycle",
      "Collateral that performs in print and in a sales gallery",
      "Material and photographic direction drawn from the site itself",
      "Positioning that holds for an international buyer audience",
      "Lead journeys that connect campaign spend to closed units",
    ],
    capabilities: ["brand-identity", "digital-experiences", "growth-visibility"],
    ctaTitle: ["Let’s brand", "the development."],
    metaDescription:
      "Branding for real estate and development in Dubai — identity, collateral and digital experience built to hold across a multi-phase, multi-year sales cycle.",
  },
  {
    slug: "architecture-interiors",
    num: "02",
    name: "Architecture & Interiors",
    title: "Architecture & Interiors.",
    subhead: "A brand as disciplined as the practice behind it.",
    lead: "Practices whose work is disciplined, and whose brand is not.",
    body: "Architecture and interiors studios grow through referral and rarely stop to state a position. The result is a brand quieter and less certain than the buildings. We start with what the practice actually believes about material and restraint, then rebuild the identity and the website around the work rather than around a services list — so projects a decade apart sit on one page without arguing.",
    demands: [
      "A stated position on material, method and restraint",
      "Photography direction that unifies a long back catalogue",
      "A website built around projects, not service lists",
      "Typography and layout equal to the work they present",
      "Credentials and awards presented without noise",
    ],
    capabilities: ["brand-strategy", "brand-identity", "digital-experiences"],
    ctaTitle: ["Let’s give the practice", "a position."],
    metaDescription:
      "Branding for architecture and interiors practices in Dubai — positioning, identity and websites built around the work rather than the services list.",
  },
  {
    slug: "hospitality-lifestyle",
    num: "03",
    name: "Hospitality & Lifestyle",
    title: "Hospitality & Lifestyle.",
    subhead: "Recognised long before it can be named.",
    lead: "Guests recognise a group long before they can name it.",
    body: "Hospitality brands are judged in a hundred small places — signage, a menu, a confirmation email, the staff handbook. Where a group runs several venues, the harder question is architecture: how much each venue is allowed to differ before the group stops being visible at all. We set that boundary first, then rebuild every touchpoint against it.",
    demands: [
      "Brand architecture across multiple venues",
      "Signage, menus and print held to one standard",
      "A visual language that survives a hundred small applications",
      "Content and social direction that reads as one voice",
      "A digital presence that turns a browser into a booking",
    ],
    capabilities: [
      "brand-strategy",
      "brand-identity",
      "content-communication",
    ],
    ctaTitle: ["Let’s compose", "the guest experience."],
    metaDescription:
      "Branding for hospitality and lifestyle groups in Dubai — brand architecture, signage, menus and content held to one standard across every venue.",
  },
  {
    slug: "fashion-beauty",
    num: "04",
    name: "Fashion & Beauty",
    title: "Fashion & Beauty.",
    subhead: "Styled everywhere. Composed almost nowhere.",
    lead: "A category where everything is styled, and almost nothing is composed.",
    body: "Fashion and beauty brands rarely lack imagery — they lack a system that makes the imagery add up. We define the art direction, the typographic voice and the rules governing how a seasonal campaign relates to the house identity, so the work can move at the pace the category demands without the brand loosening underneath it.",
    demands: [
      "A house identity that seasonal campaigns can sit inside",
      "Art direction consistent across shoot, social and retail",
      "Packaging and collateral held to one system",
      "A voice distinctive enough to be recognised before the logo",
      "Commerce and content working from the same design language",
    ],
    capabilities: [
      "brand-identity",
      "content-communication",
      "digital-experiences",
    ],
    ctaTitle: ["Let’s build", "the house identity."],
    metaDescription:
      "Branding for fashion and beauty in Dubai — house identity, art direction and packaging systems that hold while seasonal campaigns move quickly.",
  },
  {
    slug: "professional-services",
    num: "05",
    name: "Professional Services",
    title: "Professional Services.",
    subhead: "Expertise is assumed. Composure is what gets judged.",
    lead: "Expertise is assumed. What is being judged is the composure around it.",
    body: "Law, finance, consulting and advisory firms compete on trust, and trust is read from small signals — a proposal template, a pitch deck, the way a partner’s profile is set. We build identities that carry seniority without stiffness, and the document systems that let every partner produce work looking like it came from one firm.",
    demands: [
      "An identity that signals seniority without corporate cliché",
      "Proposal, pitch and report templates the whole firm can use",
      "Partner and team profiles presented consistently",
      "Thought leadership with an editorial standard behind it",
      "A website that survives procurement and due diligence",
    ],
    capabilities: ["brand-strategy", "brand-identity", "growth-visibility"],
    ctaTitle: ["Let’s make the firm", "read as one."],
    metaDescription:
      "Branding for professional services firms in Dubai — identity, proposal and pitch systems that let every partner produce work from one firm.",
  },
  {
    slug: "founder-personal-brands",
    num: "06",
    name: "Founder & Personal Brands",
    title: "Founder & Personal Brands.",
    subhead: "Visible without being the only thing holding it together.",
    lead: "The founder is the brand — which is precisely why it needs a system.",
    body: "A personal brand built only on presence does not survive delegation. We separate what is genuinely the founder’s voice from what belongs to the business, then build the identity, the content system and the digital presence that let a founder stay visible without being the only thing keeping the brand upright.",
    demands: [
      "A clear line between the founder’s voice and the company’s",
      "An identity that works on stage, on social and in print",
      "A content system that does not depend on daily founder input",
      "Digital presence built on credibility, not vanity metrics",
      "Positioning that outlasts a change in the founder’s role",
    ],
    capabilities: [
      "brand-strategy",
      "content-communication",
      "creative-technology",
    ],
    ctaTitle: ["Let’s build it", "beyond the founder."],
    metaDescription:
      "Founder and personal brand building in Dubai — positioning, identity and content systems that let a founder stay visible without carrying the brand alone.",
  },
];

export function getIndustry(slug: string): Industry | undefined {
  return industries.find((industry) => industry.slug === slug);
}

/** The four-step engagement, repeated on the homepage and every service page. */
export const processSteps = [
  {
    num: "01",
    title: "Discover",
    desc: "Understanding the business, audience, market and ambition.",
  },
  {
    num: "02",
    title: "Define",
    desc: "Establishing positioning, strategy, voice and creative direction.",
  },
  {
    num: "03",
    title: "Design",
    desc: "Translating strategy into a coherent visual and digital identity.",
  },
  {
    num: "04",
    title: "Deliver",
    desc: "Launching, managing and continuously refining every touchpoint.",
  },
] as const;

/** Homepage — "What Defines Us". */
export const principles = [
  {
    num: "01",
    title: "Think With Precision",
    desc: "Every decision begins with understanding.",
  },
  {
    num: "02",
    title: "Design With Intention",
    desc: "Every visual element must serve a purpose.",
  },
  {
    num: "03",
    title: "Communicate With Clarity",
    desc: "Strong brands make their value easy to understand.",
  },
  {
    num: "04",
    title: "Execute With Consistency",
    desc: "Recognition is built through disciplined repetition.",
  },
  {
    num: "05",
    title: "Grow With Purpose",
    desc: "Creative work should support meaningful business outcomes.",
  },
] as const;

/** About — the five standards, applied without exception. */
export const values = [
  { num: "01", title: "Clarity", desc: "Nothing said that isn’t needed." },
  { num: "02", title: "Restraint", desc: "Confidence without excess." },
  { num: "03", title: "Relevance", desc: "Ideas suited to their moment." },
  { num: "04", title: "Consistency", desc: "The same standard, everywhere." },
  { num: "05", title: "Craft", desc: "Attention paid to every detail." },
] as const;

/** About — personality, set as two opposing pill lists. */
export const personality = {
  is: [
    "Intelligent",
    "Refined",
    "Distinctive",
    "Composed",
    "Contemporary",
    "Founder-led",
    "International",
    "Selective",
    "Quietly confident",
    "Detail-oriented",
    "Culturally sophisticated",
    "Commercially relevant",
  ],
  isNever: [
    "Loud",
    "Generic",
    "Trend-dependent",
    "Mass-market",
    "Overdecorated",
    "Playful",
    "Highly corporate",
    "Flashy",
    "Template-based",
    "Artificially luxurious",
    "Technology-heavy",
    "Excessively futuristic",
  ],
} as const;

/** Homepage — Creative Technology list. */
export const creativeTechnology = [
  "AI-powered creative production",
  "Creative workflow automation",
  "AI-generated visuals and video",
  "Digital prototyping and innovation",
] as const;

/** Shared across every service page. */
export const techStack = [
  "Figma",
  "Adobe Creative Cloud",
  "Webflow",
  "WordPress",
  "Shopify",
  "HubSpot",
  "OpenAI",
  "Notion",
] as const;

export const testimonial = {
  quote:
    "SHARIO gave our brand a language it didn’t have before — restrained, precise, and unmistakably ours across every touchpoint.",
  attribution: "Founder, Real Estate Development Group",
} as const;

/* -------------------------------------------------------------------------- */
/* Services                                                                    */
/* -------------------------------------------------------------------------- */

export type Service = {
  slug: string;
  /** Two-digit index — the capability grid and the service hero both show it. */
  num: string;
  /** Short name used in navigation, cards and the enquiry form. */
  name: string;
  /** Hero heading, with the handoff's closing full stop. */
  title: string;
  /** The one-line description shown in the homepage capability grid. */
  descriptor: string;
  /** Italic hero subhead. */
  subhead: string;
  hero: string;
  /** Object-position for the wide crop, keeping the wordmark clear of the type. */
  focus?: string;
  /** The large serif statement that opens "What We Do". */
  lead: string;
  whatWeDo: string[];
  benefits: { title: string; desc: string }[];
  deliverables: string[];
  faqs: { q: string; a: string }[];
  /**
   * The two case studies this capability is best evidenced by. Chosen per
   * service rather than derived — rotating by index paired Brand Identity with
   * studies that never mention identity work.
   */
  relatedWork: [string, string];
  /** Closing CTA heading, split across two lines on the design's break. */
  ctaTitle: [string, string];
  metaDescription: string;
};

export const services: Service[] = [
  {
    slug: "brand-strategy",
    num: "01",
    name: "Brand Strategy",
    title: "Brand Strategy.",
    descriptor:
      "Positioning and differentiation, tone of voice, brand architecture, creative direction, naming and messaging.",
    subhead: "Direction set before a single decision is made on taste.",
    hero: "/images/book/stat-proposal.jpg",
    focus: "object-[50%_35%]",
    lead: "Strategy is what makes every later decision defensible — the reason a brand looks and sounds the way it does.",
    whatWeDo: [
      "Positioning and differentiation",
      "Tone of voice",
      "Brand architecture",
      "Creative direction",
      "Naming and messaging",
    ],
    benefits: [
      {
        title: "Direction",
        desc: "A clear position that tells every team what to build and what to leave alone.",
      },
      {
        title: "Differentiation",
        desc: "A defensible place in the market rather than a variation on the category.",
      },
      {
        title: "Alignment",
        desc: "One agreed story, so leadership, sales and marketing say the same thing.",
      },
      {
        title: "Commercial relevance",
        desc: "Positioning grounded in the audience that actually buys, not the one that flatters.",
      },
    ],
    deliverables: [
      "Positioning statement",
      "Audience and market definition",
      "Brand architecture map",
      "Messaging framework",
      "Tone of voice guide",
      "Naming rationale",
    ],
    faqs: [
      {
        q: "How long does a brand strategy engagement take?",
        a: "Typically four to eight weeks, depending on how much research is required and how many stakeholders need to be interviewed.",
      },
      {
        q: "Do we need strategy if we already have a logo?",
        a: "Usually yes. A logo is an outcome, not a position — strategy is what tells you whether the identity you own is the one you need.",
      },
      {
        q: "Who from our side needs to be involved?",
        a: "Whoever holds the commercial ambition — normally the founder or managing director, plus whoever owns sales and marketing.",
      },
      {
        q: "Can strategy run alongside an existing campaign?",
        a: "Yes. We work in parallel with live activity and stage the changes so nothing in market has to stop while the work is done.",
      },
    ],
    relatedWork: ["aalto-house", "faro-hospitality-group"],
    ctaTitle: ["Let’s establish", "where the brand stands."],
    metaDescription:
      "Brand strategy in Dubai — positioning, differentiation, brand architecture, tone of voice and messaging frameworks that give every later decision a reason.",
  },
  {
    slug: "brand-identity",
    num: "02",
    name: "Brand Identity",
    title: "Brand Identity.",
    descriptor:
      "Visual identity systems, campaign identities, brand guidelines, marketing collateral, corporate profiles.",
    subhead: "Visual systems built for recognition, not decoration.",
    hero: "/images/book/stat-letterhead.jpg",
    focus: "object-[50%_30%]",
    lead: "A coherent visual identity gives a brand a language it can be recognised by — in any format, at any scale.",
    whatWeDo: [
      "Visual identity systems",
      "Campaign identities",
      "Brand guidelines",
      "Marketing collateral",
      "Corporate profiles",
    ],
    benefits: [
      {
        title: "Recognition",
        desc: "A distinctive visual language your audience remembers and identifies instantly.",
      },
      {
        title: "Consistency",
        desc: "A system that holds together across every application, team and touchpoint.",
      },
      {
        title: "Confidence",
        desc: "A composed identity that signals credibility to clients, partners and investors.",
      },
      {
        title: "Commercial relevance",
        desc: "Design decisions grounded in business outcomes, not decoration alone.",
      },
    ],
    deliverables: [
      "Logo suite & clear space guide",
      "Color & typography system",
      "Brand guidelines document",
      "Stationery & collateral templates",
      "Social & digital templates",
      "Presentation & proposal templates",
    ],
    faqs: [
      {
        q: "How long does a brand identity project take?",
        a: "Typically eight to twelve weeks from discovery through final delivery, depending on scope and the number of touchpoints involved.",
      },
      {
        q: "Do you design the guidelines as well as the logo?",
        a: "Yes. Every identity project includes a complete brand guidelines document covering usage, spacing, color and application.",
      },
      {
        q: "Can you work alongside our existing marketing team?",
        a: "Absolutely. We regularly collaborate with in-house teams, providing creative direction while your team executes day to day.",
      },
      {
        q: "What if we already have a logo we want to keep?",
        a: "We can build a full identity system around an existing mark, provided it’s structurally sound — or refine it as part of the engagement.",
      },
    ],
    relatedWork: ["meridian-residences", "faro-hospitality-group"],
    ctaTitle: ["Let’s talk about", "your brand identity."],
    metaDescription:
      "Brand identity design in Dubai — visual identity systems, campaign identities, brand guidelines and marketing collateral built to stay coherent in use.",
  },
  {
    slug: "digital-experiences",
    num: "03",
    name: "Digital Experiences",
    title: "Digital Experiences.",
    descriptor:
      "Website strategy and design, landing pages, website development and management, UI/UX direction.",
    subhead: "The identity, holding at every screen.",
    hero: "/images/book/digital-monitor.jpg",
    focus: "object-[50%_40%]",
    lead: "A website is where most people meet the brand first — and the only place the identity has to survive interaction.",
    whatWeDo: [
      "Website strategy and design",
      "Landing pages",
      "Website development and management",
      "UI/UX direction",
      "Design systems",
    ],
    benefits: [
      {
        title: "Credibility",
        desc: "A digital presence that matches the standard of the work it represents.",
      },
      {
        title: "Clarity",
        desc: "Structure and hierarchy that let a visitor understand the offer without effort.",
      },
      {
        title: "Conversion",
        desc: "Journeys designed around the enquiry, not around the sitemap.",
      },
      {
        title: "Longevity",
        desc: "A documented system your team can extend without the design drifting.",
      },
    ],
    deliverables: [
      "Sitemap & content structure",
      "UI design system",
      "Responsive page designs",
      "Built and deployed website",
      "CMS setup & handover",
      "Analytics & measurement setup",
    ],
    faqs: [
      {
        q: "How long does a website project take?",
        a: "Ten to sixteen weeks for a full marketing site, from structure through build and launch. Landing pages are considerably faster.",
      },
      {
        q: "Do you build the site or only design it?",
        a: "Both. We design and build, then hand over a documented system — or work to your development team’s stack if one is already in place.",
      },
      {
        q: "Can you work with our existing platform?",
        a: "Yes. We regularly work in WordPress, Webflow and Shopify, as well as custom builds where the requirements justify one.",
      },
      {
        q: "Who manages the site after launch?",
        a: "Either party. We offer ongoing management, or we train your team and step back — the handover documentation is the same in both cases.",
      },
    ],
    relatedWork: ["meridian-residences", "aalto-house"],
    ctaTitle: ["Let’s build the", "digital presence."],
    metaDescription:
      "Website design and development in Dubai — website strategy, landing pages, UI/UX direction and design systems that carry the brand identity into every screen.",
  },
  {
    slug: "content-communication",
    num: "04",
    name: "Content & Communication",
    title: "Content & Communication.",
    descriptor:
      "Social media strategy, copywriting, creative campaigns, video concepts and scripts, content direction.",
    subhead: "One voice, held across every channel.",
    hero: "/images/book/digital-instagram.jpg",
    focus: "object-[72%_35%]",
    lead: "Communication is where a brand is judged most often — and where consistency is hardest to hold.",
    whatWeDo: [
      "Social media strategy",
      "Copywriting",
      "Creative campaigns",
      "Video concepts and scripts",
      "Content direction",
    ],
    benefits: [
      {
        title: "Coherence",
        desc: "Every post, page and film reading as one brand rather than several.",
      },
      {
        title: "Relevance",
        desc: "Content built for the audience’s moment, not for the calendar’s convenience.",
      },
      {
        title: "Efficiency",
        desc: "A content system that makes the next month’s output faster to produce.",
      },
      {
        title: "Recall",
        desc: "A voice distinctive enough to be recognised before the logo appears.",
      },
    ],
    deliverables: [
      "Content strategy & pillars",
      "Editorial calendar",
      "Campaign concepts",
      "Copy for key touchpoints",
      "Video concepts & scripts",
      "Social templates & art direction",
    ],
    faqs: [
      {
        q: "Do you produce content or only direct it?",
        a: "Both. We set the direction and templates, and we produce where it matters — campaigns, launch films, flagship copy.",
      },
      {
        q: "Can you manage our social channels day to day?",
        a: "Yes, on a retained basis. Many clients prefer we hold the direction while their team handles daily publishing.",
      },
      {
        q: "How do you keep tone consistent across writers?",
        a: "A tone of voice guide with worked examples, plus review on the first cycles until the pattern holds without us.",
      },
      {
        q: "Do you work in Arabic as well as English?",
        a: "Yes, through trusted bilingual collaborators — with the same editorial review applied to both languages.",
      },
    ],
    relatedWork: ["faro-hospitality-group", "aalto-house"],
    ctaTitle: ["Let’s give the brand", "something to say."],
    metaDescription:
      "Content and communication in Dubai — social media strategy, copywriting, creative campaigns and video direction held to a single brand voice.",
  },
  {
    slug: "growth-visibility",
    num: "05",
    name: "Growth & Visibility",
    title: "Growth & Visibility.",
    descriptor:
      "Search engine optimization, CRM and lead journeys, performance marketing, analytics and reporting.",
    subhead: "Visibility earned by substance.",
    hero: "/images/book/invoice-desk.jpg",
    focus: "object-[50%_45%]",
    lead: "Growth work only compounds when the brand underneath it is already clear about what it offers and to whom.",
    whatWeDo: [
      "Search engine optimization",
      "CRM and lead journeys",
      "Performance marketing",
      "Analytics and reporting",
      "Conversion optimisation",
    ],
    benefits: [
      {
        title: "Qualified demand",
        desc: "Enquiries from the audience you want, not volume for its own sake.",
      },
      {
        title: "Attribution",
        desc: "A clear line from first click to closed sale, so spend can be judged honestly.",
      },
      {
        title: "Compounding",
        desc: "Organic foundations that keep returning after the campaign budget stops.",
      },
      {
        title: "Control",
        desc: "Reporting your team can read without a translator sitting next to them.",
      },
    ],
    deliverables: [
      "Technical & content SEO audit",
      "Keyword and content plan",
      "Campaign structure & setup",
      "CRM and lead journey mapping",
      "Conversion tracking & dashboards",
      "Monthly performance reporting",
    ],
    faqs: [
      {
        q: "How quickly does SEO show results?",
        a: "Technical fixes can move within weeks; content and authority typically take three to six months to compound meaningfully.",
      },
      {
        q: "Do you manage ad spend directly?",
        a: "Yes, across Search, Meta and LinkedIn. Media budget is billed at cost and reported separately from our fee.",
      },
      {
        q: "Can you work with our existing CRM?",
        a: "Yes. We regularly work in HubSpot and Salesforce, and will map the lead journey to whatever system is already in place.",
      },
      {
        q: "What do you report on?",
        a: "Qualified enquiries, cost per lead and attributed revenue — not impressions. Vanity metrics are available but never lead the report.",
      },
    ],
    relatedWork: ["meridian-residences", "faro-hospitality-group"],
    ctaTitle: ["Let’s make the brand", "easier to find."],
    metaDescription:
      "Growth and visibility in Dubai — SEO, CRM and lead journeys, performance marketing and honest attribution reporting for ambitious brands.",
  },
  {
    slug: "creative-technology",
    num: "06",
    name: "Creative Technology",
    title: "Creative Technology.",
    descriptor:
      "AI-powered creative production, workflow automation, AI-generated visuals and digital prototyping.",
    subhead: "AI as craft, not shortcut.",
    hero: "/images/book/digital-tablet.jpg",
    focus: "object-[70%_42%]",
    lead: "Technology should compress the distance between an idea and the thing itself — without loosening the standard applied to either.",
    whatWeDo: [
      "AI-powered creative production",
      "Creative workflow automation",
      "AI-generated visuals and video",
      "Digital prototyping and innovation",
    ],
    benefits: [
      {
        title: "Speed",
        desc: "More directions explored inside the same timeline, and rejected faster.",
      },
      {
        title: "Consistency",
        desc: "Automated production that applies the brand rules the same way every time.",
      },
      {
        title: "Scale",
        desc: "Variant-heavy campaigns produced without a proportional increase in cost.",
      },
      {
        title: "Judgement",
        desc: "Human direction over every output — the tools accelerate, they do not decide.",
      },
    ],
    deliverables: [
      "AI production workflow design",
      "Prompt and asset libraries",
      "Automated template systems",
      "Generated visual & video assets",
      "Interactive prototypes",
      "Team training & documentation",
    ],
    faqs: [
      {
        q: "Do you use AI to replace design work?",
        a: "No. It removes repetition and widens exploration. Direction, judgement and final craft stay human, and are reviewed the same way.",
      },
      {
        q: "Is AI-generated imagery safe to use commercially?",
        a: "We work only with tools whose licensing permits commercial use, and we document provenance for every asset we deliver.",
      },
      {
        q: "Can you automate our existing production process?",
        a: "Usually. We audit the current workflow first, then automate the steps that are genuinely repetitive rather than the ones that look it.",
      },
      {
        q: "Will our team be able to run it after handover?",
        a: "Yes. Every automation ships with documentation and a training session, and nothing depends on us to keep running.",
      },
    ],
    relatedWork: ["aalto-house", "meridian-residences"],
    ctaTitle: ["Let’s put the tools", "to proper use."],
    metaDescription:
      "Creative technology in Dubai — AI-powered creative production, workflow automation, AI-generated visuals and digital prototyping under human direction.",
  },
];

export function getService(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug);
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
/* Work                                                                        */
/* -------------------------------------------------------------------------- */

export type CaseStudy = {
  slug: string;
  category: string;
  title: string;
  /** Shown under the title on the Selected Work cards. */
  scope: string;
  client: string;
  industry: string;
  year: string;
  hero: string;
  /** Card image — the 4:5 crop used on the homepage and Work index. */
  card: string;
  /** The large serif statement that opens the overview. */
  lead: string;
  body: string;
  /** One wide frame, then a pair. */
  gallery: { wide: string; left: string; right: string };
  quote: string;
  metaDescription: string;
};

export const work: CaseStudy[] = [
  {
    slug: "meridian-residences",
    category: "Real Estate & Development",
    title: "Meridian Residences",
    scope: "Brand Identity & Digital Experience",
    client: "Meridian Residences",
    industry: "Real Estate & Development",
    year: "2026",
    hero: "/images/book/photo-aperture.jpg",
    card: "/images/book/materials-flatlay.jpg",
    lead: "A composed identity for a residential development where architecture, land and brand needed to speak the same language.",
    body: "Meridian approached SHARIO to establish a brand identity and digital presence capable of representing a multi-phase residential development to an international buyer audience. The resulting system draws its palette and proportion directly from the site’s materials — limestone, concrete and natural light — carried consistently from marketing collateral through to the sales website.",
    gallery: {
      wide: "/images/book/proposal-anthology.jpg",
      left: "/images/book/stat-card.jpg",
      right: "/images/book/stat-envelope.jpg",
    },
    quote:
      "The identity gave the sales gallery a single, confident voice — the same restraint clients now recognise across every phase of the development.",
    metaDescription:
      "Meridian Residences — brand identity and digital experience for a multi-phase residential development, composed by Shario in Dubai.",
  },
  {
    slug: "aalto-house",
    category: "Architecture & Interiors",
    title: "Aalto House",
    scope: "Brand Strategy & Website",
    client: "Aalto House",
    industry: "Architecture & Interiors",
    year: "2025",
    hero: "/images/book/photo-stair.jpg",
    card: "/images/book/photo-book.jpg",
    lead: "A studio whose work was quieter than its positioning — and a brand rebuilt to match the discipline of the practice.",
    body: "Aalto House had grown through referral without ever setting out what it stood for. We began with positioning, establishing the practice’s point of view on material and restraint, then rebuilt the website around the work rather than around the services list. Photography direction was tightened to a single, even register so that projects a decade apart now sit on the same page without argument.",
    gallery: {
      wide: "/images/book/photo-desk.jpg",
      left: "/images/book/proposal-cover.jpg",
      right: "/images/book/pen-cover.jpg",
    },
    quote:
      "For the first time the practice reads the way the buildings do — considered, unhurried, and completely sure of itself.",
    metaDescription:
      "Aalto House — brand strategy and website for an architecture and interiors practice, composed by Shario in Dubai.",
  },
  {
    slug: "faro-hospitality-group",
    category: "Hospitality & Lifestyle",
    title: "Faro Hospitality Group",
    scope: "Full Brand Ecosystem",
    client: "Faro Hospitality Group",
    industry: "Hospitality & Lifestyle",
    year: "2025",
    hero: "/images/book/photo-lounge.jpg",
    card: "/images/book/sign-glass.jpg",
    lead: "A group of venues that behaved like strangers to one another, resolved into a single brand architecture.",
    body: "Faro operates four venues under one ownership, each with its own following. Rather than flatten them into a house style, we set a brand architecture that gives the group a visible parent and each venue a defined amount of room to differ. Signage, menus, digital and staff-facing material were rebuilt against that architecture, so a guest recognises the group without any venue losing what made it work.",
    gallery: {
      wide: "/images/book/sign-tablet.jpg",
      left: "/images/book/cover-arabic.jpg",
      right: "/images/book/folder-copy.jpg",
    },
    quote:
      "Four venues that used to compete for attention now build the same reputation — and none of them had to give up their character to do it.",
    metaDescription:
      "Faro Hospitality Group — a complete brand ecosystem and brand architecture for a multi-venue hospitality group, composed by Shario in Dubai.",
  },
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return work.find((item) => item.slug === slug);
}

/** The following project, for the "Next Project" link at the foot of a study. */
export function nextCaseStudy(slug: string): CaseStudy {
  const i = work.findIndex((item) => item.slug === slug);
  return work[(i + 1) % work.length];
}

/**
 * Studies for an industry page. Three of the six sectors have a matching case
 * study; the rest fall back to two from the wider set rather than showing an
 * empty section.
 */
export function workForIndustry(name: string): CaseStudy[] {
  const matches = work.filter((item) => item.category === name);
  return matches.length > 0 ? matches : work.slice(0, 2);
}

/* -------------------------------------------------------------------------- */
/* Insights                                                                    */
/* -------------------------------------------------------------------------- */

/**
 * The handoff renders these as unlinked editorial cards in a homepage section.
 * They stay unlinked here until the articles themselves exist.
 */
export const insights = [
  {
    id: "coherence",
    category: "Brand Strategy",
    date: "Jul 2026",
    title: "On Coherence: Why Fragmented Brands Fail",
    image: "/images/book/emboss-monogram.jpg",
  },
  {
    id: "quiet-confidence",
    category: "Case Study",
    date: "Jun 2026",
    title: "Designing Quiet Confidence in Hospitality",
    image: "/images/book/brand-book-floor.jpg",
  },
  {
    id: "ai-as-craft",
    category: "Creative Technology",
    date: "May 2026",
    title: "AI as Craft, Not Shortcut",
    image: "/images/book/digital-laptop.jpg",
  },
] as const;
