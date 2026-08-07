/**
 * Single source of truth for site content and contact details.
 * Copy is taken from the client-supplied "Shario content" document.
 */

export const site = {
  name: "Shario",
  domain: "https://shario.ae",
  tagline: "A Symphony of Identity.",
  description:
    "Shario is a founder-led digital marketing company in Dubai that turns spend into revenue — performance marketing, SEO, websites and CRM attribution.",
  location: "Dubai, UAE",
  phone: "+971 56 121 7647",
  phoneHref: "+971561217647",
  email: "sharoon.irfan99@gmail.com",
  linkedin: "https://linkedin.com/in/sharoonirfan",
  linkedinLabel: "linkedin.com/in/sharoonirfan",
  founder: "Sharoon Irfan",
} as const;

export const nav = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/results", label: "Results" },
  { href: "/contact", label: "Contact" },
] as const;

export type Service = {
  slug: string;
  /** Short name used in navigation and the enquiry form. */
  name: string;
  /** Full heading as written in the content document. */
  title: string;
  summary: string;
  body: string;
  /**
   * What the engagement covers. Every entry is lifted from the sentences in
   * the client's content document — nothing here is invented.
   */
  includes: string[];
  /** Search description for the service's own page. */
  metaDescription: string;
};

export const services: Service[] = [
  {
    slug: "performance-marketing",
    name: "Performance Marketing",
    title: "Performance Marketing (Google Ads and Meta Ads)",
    summary:
      "Google Ads and Meta Ads engineered for qualified leads at below-target cost per lead.",
    body: "We manage paid media across Google Search, Display, YouTube, Facebook, and Instagram, engineered for qualified leads at below-target cost per lead. We run multi-million AED budgets with above-benchmark ROAS in Dubai's most competitive verticals.",
    includes: [
      "Google Search",
      "Google Display",
      "YouTube",
      "Facebook",
      "Instagram",
      "Multi-million AED budget management",
    ],
    metaDescription:
      "Google Ads and Meta Ads management in Dubai, engineered for qualified leads at below-target cost per lead, with above-benchmark ROAS.",
  },
  {
    slug: "seo-and-content",
    name: "SEO and Content",
    title: "SEO and Content Marketing",
    summary:
      "Technical SEO, on-page optimization, and content that ranks and converts across Dubai search.",
    body: "We deliver technical SEO, on-page optimization, and content built to rank in Dubai search and win AI-driven results. We fix what blocks indexing and build content clusters that pull qualified organic traffic month after month.",
    includes: [
      "Technical SEO",
      "On-page optimization",
      "Indexing fixes",
      "Content clusters",
      "AI search visibility",
    ],
    metaDescription:
      "Technical SEO, on-page optimization and content built to rank in Dubai search and win AI-driven results, pulling qualified organic traffic month after month.",
  },
  {
    slug: "websites-and-conversion",
    name: "Websites and Conversion",
    title: "Website Development and Conversion Rate Optimization",
    summary:
      "High-converting websites with SEO-ready architecture and CRM-integrated funnels.",
    body: "We build high-converting websites with SEO-ready architecture, custom landing pages, and CRM-integrated funnels designed around your sales process.",
    includes: [
      "SEO-ready architecture",
      "Custom landing pages",
      "CRM-integrated funnels",
      "Conversion rate optimization",
    ],
    metaDescription:
      "High-converting website development and CRO in Dubai — SEO-ready architecture, custom landing pages and CRM-integrated funnels built around your sales process.",
  },
  {
    slug: "crm-and-attribution",
    name: "CRM and Attribution",
    title: "CRM Integration and Marketing Automation",
    summary:
      "Tracking that ties every dirham of spend to pipeline and closed revenue.",
    body: "We connect your marketing to your pipeline with attribution tracking and automation, so every lead is captured, scored, and followed up.",
    includes: [
      "Attribution tracking",
      "Marketing automation",
      "Lead capture",
      "Lead scoring",
      "Follow-up workflows",
    ],
    metaDescription:
      "CRM integration and marketing automation in Dubai — attribution tracking that connects marketing to pipeline, so every lead is captured, scored and followed up.",
  },
  {
    slug: "brand-and-creative",
    name: "Brand and Creative",
    title: "Brand and Creative",
    summary:
      "Brand identity, campaign visuals and collateral held to a launch standard.",
    body: "We produce brand identity, campaign visuals, social creative, and marketing collateral to a launch standard, keeping your brand consistent and credible across every channel.",
    includes: [
      "Brand identity",
      "Campaign visuals",
      "Social creative",
      "Marketing collateral",
    ],
    metaDescription:
      "Brand identity, campaign visuals, social creative and marketing collateral produced to a launch standard, keeping your brand consistent across every channel.",
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
 * The first four are the set the home page carries; Results shows all five.
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
