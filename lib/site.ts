/**
 * Single source of truth for site content and contact details.
 *
 * Copy and navigation follow "Shario Creative Studio Brand Book" (2026) and the
 * client mockups. The Brand Book's tone rules govern every line here: clear,
 * precise, composed — never "game-changing", "world-class" or "best-in-class".
 */

export const site = {
  name: "Shario",
  domain: "https://shario.ae",
  tagline: "A Symphony of Identity.",
  taglineAr: "سيمفونية الهوية",
  /** Brand Book p27, "Company introduction". */
  description:
    "Shario is a boutique creative studio in Dubai composing coherent brand identities across strategy, design and technology.",
  location: "Dubai, UAE",
  // Brand Book closing page (p32) and the invoice, letterhead and folder
  // mockups all carry these. They supersede the content document's details.
  phone: "+971 50 467 9095",
  phoneHref: "+971504679095",
  email: "info@shario.ae",
  website: "www.shario.ae",
  linkedin: "https://linkedin.com/in/sharoonirfan",
  linkedinLabel: "linkedin.com/in/sharoonirfan",
  founder: "Sharoon Irfan",
  /** Brand Book p06. */
  promise: "One vision. Every touchpoint.",
  vision:
    "To build identities recognised not by volume, but by clarity, character and coherence.",
  mission:
    "To unite strategy, design, communication and technology into complete brand systems that support meaningful growth.",
} as const;

/** Navigation as the client mockups set it (assets/mockups/m08.jpg). */
export const nav = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/work", label: "Work" },
  { href: "/approach", label: "Approach" },
  { href: "/journal", label: "Journal" },
  { href: "/contact", label: "Contact" },
] as const;

/**
 * Brand Book p03 — the five elements that make a brand coherent. The Approach
 * page is built on these; the order is the Brand Book's.
 */
export const essence = [
  { name: "Strategy", note: "Provides direction." },
  { name: "Design", note: "Creates recognition." },
  { name: "Communication", note: "Builds connection." },
  { name: "Technology", note: "Enables experience." },
  { name: "Growth", note: "Gives momentum." },
] as const;

/** Brand Book p07 — the five standards, applied without exception. */
export const values = [
  { numeral: "I", name: "Clarity", note: "Nothing said that isn’t needed." },
  { numeral: "II", name: "Restraint", note: "Confidence without excess." },
  { numeral: "III", name: "Relevance", note: "Ideas suited to their moment." },
  { numeral: "IV", name: "Consistency", note: "The same standard, everywhere." },
  { numeral: "V", name: "Craft", note: "Attention paid to every detail." },
] as const;

export type Service = {
  slug: string;
  /** Short name used in navigation and the enquiry form. */
  name: string;
  /** Full heading. */
  title: string;
  /** The one-line descriptor the mockups set beneath each capability. */
  descriptor: string;
  /** Opening image for the capability's own page. */
  hero: string;
  summary: string;
  body: string;
  /** What the engagement covers. */
  includes: string[];
  /** Search description for the service's own page. */
  metaDescription: string;
};

export const services: Service[] = [
  {
    slug: "brand-strategy",
    name: "Brand Strategy",
    title: "Brand Strategy",
    descriptor: "Meaningful foundations",
    hero: "/images/book/photo-desk.jpg",
    summary:
      "Positioning, architecture and messaging that give every later decision a reason.",
    body: "Strategy provides direction. We establish what a brand stands for, who it speaks to and where it sits against everyone else — then write the positioning and messaging that hold that in place. Nothing downstream is decided by taste alone.",
    includes: [
      "Positioning",
      "Brand architecture",
      "Audience definition",
      "Messaging framework",
      "Naming",
      "Tone of voice",
    ],
    metaDescription:
      "Brand strategy in Dubai — positioning, brand architecture, audience definition and messaging frameworks that give every later decision a reason.",
  },
  {
    slug: "visual-identity",
    name: "Visual Identity",
    title: "Visual Identity",
    descriptor: "Distinct by intention",
    hero: "/images/book/stat-card.jpg",
    summary:
      "A complete identity system — mark, palette, typography and the rules that keep them coherent.",
    body: "Design creates recognition. We build the logo system, colour palette, typographic hierarchy and layout grid as one set of rules, documented so the identity survives contact with every team that has to use it.",
    includes: [
      "Logo system",
      "Colour palette",
      "Typographic hierarchy",
      "Grid and layout",
      "Brand guidelines",
      "Collateral and stationery",
    ],
    metaDescription:
      "Visual identity design in Dubai — logo systems, colour palettes, typographic hierarchy and complete brand guidelines built to stay coherent in use.",
  },
  {
    slug: "creative-direction",
    name: "Creative Direction",
    title: "Creative Direction",
    descriptor: "Thoughtful storytelling",
    hero: "/images/book/photo-shelf.jpg",
    summary:
      "Art direction, photography and campaign work held to one standard across every channel.",
    body: "Communication builds connection. We set the visual language — photography direction, art direction, campaign concepts — and hold every piece of output to it, so the brand reads as one voice rather than a series of unrelated executions.",
    includes: [
      "Art direction",
      "Photography direction",
      "Campaign concepts",
      "Content direction",
      "Social systems",
      "Launch collateral",
    ],
    metaDescription:
      "Creative direction in Dubai — art direction, photography direction and campaign concepts held to a single standard across every channel.",
  },
  {
    slug: "digital-experience",
    name: "Digital Experience",
    title: "Digital Experience",
    descriptor: "Seamless by design",
    hero: "/images/book/digital-laptop.jpg",
    summary:
      "Websites and digital products where the identity holds at every screen.",
    body: "Technology enables experience. We design and build the digital surfaces a brand is judged on — websites, landing pages, digital products — carrying the identity into interface, motion and performance rather than leaving it at the logo.",
    includes: [
      "Website design",
      "Website development",
      "Design systems",
      "Interface and motion",
      "Performance and accessibility",
      "Analytics and measurement",
    ],
    metaDescription:
      "Digital experience design and development in Dubai — websites, design systems and digital products that carry the brand identity into every screen.",
  },
];

/** Look up a service by its URL slug. */
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

/**
 * The ledger — proof figures, set as a measure rather than as stat cards.
 * The first four are the set the home page carries; Work shows all five.
 */
export const proof = [
  {
    figure: "AED 35M+",
    label: "CRM-attributed revenue",
    note: "Multi-channel campaigns across Google Ads, Meta Ads, and SEO, tracked from first click to closed sale for Dubai real estate.",
  },
  {
    figure: "Award",
    label: "Marketing Excellence",
    note: "Earned for campaign ROI on flagship developer-led projects.",
  },
  {
    figure: "40%+",
    label: "Organic traffic growth",
    note: "Delivered in a single quarter through a structured SEO and content overhaul.",
  },
  {
    figure: "Zero to launch",
    label: "Marketing systems",
    note: "Full-stack builds for developer-led real estate projects, including CRM integration, campaign infrastructure, websites, and attribution.",
  },
  {
    figure: "Below target",
    label: "Cost per lead",
    note: "Delivered consistently across Search, Display, YouTube, Facebook, and Instagram for high-value real estate and B2B clients.",
  },
] as const;

export const industries = [
  "Real estate development",
  "Hospitality",
  "B2B and SaaS",
  "Professional services",
  "E-commerce",
  "Healthcare",
  "Retail",
  "Education",
] as const;
