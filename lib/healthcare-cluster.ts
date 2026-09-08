/**
 * The Healthcare pillar → cluster (English only — mirrors the structure of
 * `lib/real-estate-cluster.ts`, generalised from one "hub + agents" pairing
 * to one "hub + several verticals" pillar).
 *
 * `/industries/healthcare` (the hub) and every other industry page stay
 * data-driven from `industries` in `lib/site.ts` for nav/footer/sitemap
 * metadata; the body copy for the hub and every cluster page below lives
 * here. Rendered by `components/healthcare-cluster-page.tsx`, itself built
 * from the same `Band`/`SectionIntro`/`CardGrid`/`Card`/`Faq`/`CtaBand`
 * primitives (and the `ListBand`/`ExpertiseBand`/`ClosingCta`/`CardBand`
 * helpers) the Real Estate cluster pages already use — no new components.
 *
 * Scope note: the brief's sixth vertical ("Aesthetic & Med-Spa" at a new
 * `/industries/healthcare/aesthetic-clinic-digital-marketing` URL) is
 * deliberately not built here — `/industries/aesthetic-wellness` already
 * exists, live, targeting the same audience and a near-identical primary
 * keyword ("Digital Marketing for Aesthetic Clinics"). Building a second,
 * new page would cannibalise it, which is exactly what this cluster's own
 * anti-cannibalisation rule (one page per primary keyword) exists to avoid.
 * Every place the brief would have linked to the new aesthetic vertical
 * instead links to the existing page — see `aestheticWellnessLink` below.
 *
 * E-E-A-T / YMYL note: the agency has no healthcare-specific case studies
 * yet. Every "Why work with us" paragraph below uses Sharoon Irfan Khan's
 * real cross-industry figures exactly as given (AED 35M+, 20+ websites,
 * 8+ brand accounts, the #1 ranking and 0→1,000-users results) and labels
 * them cross-industry — never restated as a healthcare result. No health
 * outcome, treatment or "best doctor" claim is made anywhere in this file.
 */

/** A titled list — an intro line over dot-bulleted items. */
export type ClusterList = {
  heading: string;
  lead?: string;
  items: string[];
};

/** A short eyebrow + heading + single paragraph — used for the audience
 *  ("for whom") and approach/compliance sections, all written in Part 2 as
 *  flowing paragraphs rather than bullet lists. */
export type ClusterNote = {
  eyebrow: string;
  heading: string;
  body: string;
};

export type ClusterFaq = { q: string; a: string };

/** The E-E-A-T "Why work with us" band — always cross-industry here. */
export type ClusterExpertise = { heading: string; body: string[] };

/** A card that links to another page — the pillar↔cluster wiring unit. */
export type LinkCard = { href: string; title: string; desc: string };

/* -------------------------------------------------------------------------- */
/* Cross-page constants                                                       */
/* -------------------------------------------------------------------------- */

export const healthcareCtaHref = "/contact";

/** The existing, separately-owned page standing in for an "Aesthetic &
 *  Med-Spa" vertical — see the scope note above. Anchor and description are
 *  that page's own already-approved copy (`lib/site.ts`, slug
 *  "aesthetic-wellness"), reused verbatim rather than restated. */
export const aestheticWellnessLink: LinkCard = {
  href: "/industries/aesthetic-wellness",
  title: "Digital Marketing for Aesthetic Clinics",
  desc: "Trust-led marketing for aesthetic clinics and medical spas, where a booked consultation depends on visible proof, not a discount.",
};

/* -------------------------------------------------------------------------- */
/* PAGE 1 — Healthcare (Hub) — /industries/healthcare                         */
/* -------------------------------------------------------------------------- */

export type HubContent = {
  metaTitle: string;
  metaDescription: string;
  h1: string;
  heroLede: string;
  ctaLabel: string;
  ctaSub: string;
  whatsIncluded: ClusterList;
  whoWeHelp: { heading: string; cards: LinkCard[] };
  builtForRegulated: ClusterNote;
  expertise: ClusterExpertise;
  faqs: ClusterFaq[];
  closingTitle: string;
};

export const healthcareHub: HubContent = {
  metaTitle: "Healthcare Digital Marketing Agency in Dubai",
  metaDescription:
    "Healthcare digital marketing in Dubai for doctors, dentists, hospitals, clinics & pharma — SEO, ads, content, social, email & websites, built DHA-compliant.",
  h1: "Healthcare Digital Marketing in Dubai",
  heroLede:
    "Patients choose a clinic the way they choose everything else now — they search, they read reviews, they compare. Healthcare digital marketing in Dubai turns that search into booked appointments — ethically and within DHA advertising rules — for doctors, dentists, hospitals, clinics and pharma brands.",
  ctaLabel: "Book a growth call",
  ctaSub: "A clear, compliant plan to reach more of the right patients.",
  whatsIncluded: {
    heading: "What a healthcare digital marketing agency does",
    lead: "Full-funnel growth built for medical audiences and regulated markets:",
    items: [
      "SEO so your practice ranks when patients search a symptom, treatment or “near me”",
      "Paid search & social that reach in-market patients at a controlled cost per booking",
      "Content and reviews that build the trust a health decision needs",
      "Social media that humanises your clinic and your clinicians",
      "Email & CRM that follow up enquiries and recall patients",
      "Fast, accessible, DHA-appropriate websites that convert visits into appointments",
    ],
  },
  whoWeHelp: {
    heading: "Who we help",
    cards: [
      {
        href: "/industries/healthcare/digital-marketing-for-doctors",
        title: "Digital Marketing for Doctors",
        desc: "Your next patients are searching for your specialty right now — the question is whether they find you or the clinic down the road.",
      },
      {
        href: "/industries/healthcare/digital-marketing-for-dentists",
        title: "Digital Marketing for Dentists",
        desc: "Dubai has a dentist on every other street — patients pick the one they find first and trust most.",
      },
      {
        href: "/industries/healthcare/digital-marketing-for-hospitals",
        title: "Digital Marketing for Hospitals",
        desc: "A hospital isn't one service — it's dozens of departments competing for attention and referrals.",
      },
      {
        href: "/industries/healthcare/pharma-digital-marketing",
        title: "Pharma Digital Marketing",
        desc: "Pharma marketing lives or dies on compliance and credibility.",
      },
      aestheticWellnessLink,
    ],
  },
  builtForRegulated: {
    eyebrow: "Compliance",
    heading: "Built for a regulated market",
    body: "Healthcare marketing in the UAE isn't like selling a product. It has to respect DHA advertising rules, patient privacy and the longer, more careful way people decide on care. We build campaigns that are compliant by design — no guaranteed-outcome claims, no misleading before/afters — because trust is the whole funnel in healthcare.",
  },
  expertise: {
    heading: "Why work with us",
    body: [
      "Sharoon Irfan Khan — performance marketer & brand strategist based in Dubai, Head of Marketing at MSN Developments. Five years and AED 35M+ in lead-attributed revenue across Google, Meta and paid search, and 20+ websites launched and optimised (cross-industry). The same full-funnel system — brand, web, SEO, paid and CRM — applied to healthcare's trust cycle and the UAE's medical-advertising rules.",
      "(Cross-industry track record; healthcare case studies added as engagements complete.)",
    ],
  },
  faqs: [
    { q: "What is healthcare digital marketing?", a: "It's the mix of SEO, paid media, content, social, email and web that helps a medical provider reach and book the right patients — done within advertising and privacy rules." },
    { q: "Is medical advertising allowed in Dubai?", a: "Yes, within DHA rules: health facilities need the right permits and claims are restricted. We build every campaign to be compliant by design." },
    { q: "How do patients find a clinic online?", a: "Mostly through Google search, maps, reviews and social — which is exactly where a healthcare digital marketing agency focuses your presence." },
  ],
  closingTitle: "Ready to reach more of the right patients? Book a compliant growth call.",
};

/* -------------------------------------------------------------------------- */
/* PAGES 2–5 — the four vertical pages                                        */
/* -------------------------------------------------------------------------- */

export type VerticalPage = {
  slug: string;
  label: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  heroLede: string;
  ctaLabel: string;
  ctaSub: string;
  whatsIncluded: ClusterList;
  forWhom: ClusterNote;
  howWeGrow: ClusterNote;
  expertise: ClusterExpertise;
  faqs: ClusterFaq[];
  closingTitle: string;
  /** Sibling verticals ("we also help…") — the fourth slot on Doctors,
   *  Dentists and Pharma is the existing Aesthetic & Wellness page, standing
   *  in for the dropped vertical (see the file-level scope note). */
  siblings: LinkCard[];
};

export const healthcareVerticals: VerticalPage[] = [
  {
    slug: "digital-marketing-for-doctors",
    label: "Doctors",
    metaTitle: "Digital Marketing for Doctors in Dubai",
    metaDescription:
      "Digital marketing for doctors in Dubai — help patients find and book your practice with SEO, Google Ads, reviews and content, all DHA-compliant. Book a call.",
    h1: "Digital Marketing for Doctors in Dubai",
    heroLede:
      "Your next patients are searching for your specialty right now — the question is whether they find you or the clinic down the road. Digital marketing for doctors in Dubai puts your practice in front of in-market patients and turns the visit into a booking, within DHA rules.",
    ctaLabel: "Get my practice growth plan",
    ctaSub: "A compliant plan to fill your appointment book with the right patients.",
    whatsIncluded: {
      heading: "What digital marketing for doctors includes",
      items: [
        "Local & specialty SEO so you rank for “[specialty] in Dubai” and “near me”",
        "Google Ads for the treatments you want more of, at a controlled cost per booking",
        "Reviews and reputation — the single biggest driver of a patient's choice",
        "Profile and content that establish you as the credible expert",
        "Online booking, WhatsApp and reminders that reduce no-shows",
      ],
    },
    forWhom: {
      eyebrow: "Who It's For",
      heading: "For private practices & specialists",
      body: "Whether you're a GP, a specialist or a small group practice, this is marketing built around your appointment book and your specialty — not generic ads. We prioritise the treatments with the best margin and demand, and keep every claim DHA-appropriate.",
    },
    howWeGrow: {
      eyebrow: "The Approach",
      heading: "How we'd grow your practice",
      body: "Position your specialty & catchment → build a fast, accessible booking-ready site → rank locally and run targeted ads → gather reviews and recall patients with CRM → review monthly on cost per booked appointment, not clicks.",
    },
    expertise: {
      heading: "Why work with us",
      body: [
        "Sharoon Irfan Khan — Dubai-based performance marketer, Head of Marketing at MSN Developments. AED 35M+ in lead-attributed revenue and 20+ websites across Google, Meta and paid search (cross-industry), applied to healthcare's trust cycle and DHA rules — a compliant, measurable approach, not guesswork.",
      ],
    },
    faqs: [
      { q: "What does digital marketing for doctors include?", a: "Local/specialty SEO, Google Ads, reviews, expert content and booking/CRM follow-up — measured on booked appointments, all within DHA rules." },
      { q: "Can doctors advertise in Dubai?", a: "Yes, with the correct DHA permits and compliant messaging — no guaranteed outcomes or misleading claims. We build to that standard." },
      { q: "How do you measure results?", a: "On cost per qualified enquiry and booked appointment, not impressions or likes." },
    ],
    closingTitle: "Want a fuller appointment book? Book a call for a digital marketing for doctors plan.",
    siblings: [], // filled below, after all four are declared
  },
  {
    slug: "digital-marketing-for-dentists",
    label: "Dentists",
    metaTitle: "Digital Marketing for Dentists in Dubai",
    metaDescription:
      "Digital marketing for dentists in Dubai — fill your chairs with SEO, Google Ads, reviews and social for implants, ortho, whitening and more. DHA-compliant. Book a call.",
    h1: "Digital Marketing for Dentists in Dubai",
    heroLede:
      "Dubai has a dentist on every other street — patients pick the one they find first and trust most. Digital marketing for dentists in Dubai wins that choice: ranking for the treatments that pay, proving your quality with reviews, and turning enquiries into booked chairs.",
    ctaLabel: "Get my dental clinic plan",
    ctaSub: "A compliant plan to fill your chairs with high-value treatments.",
    whatsIncluded: {
      heading: "What digital marketing for dentists includes",
      items: [
        "SEO for high-value treatments — implants, orthodontics, veneers, whitening, “dentist near me”",
        "Google & Meta ads targeting patients actively researching those treatments",
        "Reviews and before/after (compliant) that build treatment confidence",
        "Social content that shows your clinic, team and results",
        "Online booking, WhatsApp and recall so chairs stay full",
      ],
    },
    forWhom: {
      eyebrow: "Who It's For",
      heading: "For dental clinics & practices",
      body: "From a single-chair practice to a multi-branch dental group, we focus on the treatments with the best return and the patients most likely to book — with every claim kept within DHA advertising rules.",
    },
    howWeGrow: {
      eyebrow: "The Approach",
      heading: "How we'd grow your clinic",
      body: "Position your signature treatments → build a fast, booking-ready site → rank and run treatment-specific ads → collect reviews and recall patients → review monthly on cost per booked treatment.",
    },
    expertise: {
      heading: "Why work with us",
      body: [
        "Sharoon Irfan Khan — Dubai-based performance marketer, Head of Marketing at MSN Developments. AED 35M+ in lead-attributed revenue and 20+ websites (cross-industry) across Google, Meta and paid search — a measurable, DHA-aware method applied to dental growth.",
      ],
    },
    faqs: [
      { q: "What does digital marketing for dentists include?", a: "Treatment-focused SEO and ads, reviews, social and booking/recall — measured on booked treatments, within DHA rules." },
      { q: "Which treatments are worth advertising?", a: "Usually the high-value, high-demand ones — implants, ortho, veneers, whitening — where a single booking pays back the spend." },
      { q: "Are before/after photos allowed?", a: "Only within DHA rules and with consent — we keep creative compliant." },
    ],
    closingTitle: "Want fuller chairs and higher-value cases? Book a call for a digital marketing for dentists plan.",
    siblings: [],
  },
  {
    slug: "digital-marketing-for-hospitals",
    label: "Hospitals",
    metaTitle: "Digital Marketing for Hospitals in Dubai",
    metaDescription:
      "Digital marketing for hospitals & clinics in Dubai — grow department volumes and patient trust with SEO, paid media, content and CRM, built DHA-compliant.",
    h1: "Digital Marketing for Hospitals in Dubai",
    heroLede:
      "A hospital isn't one service — it's dozens of departments competing for attention and referrals. Digital marketing for hospitals in Dubai grows the departments you want to fill, builds institutional trust, and connects it all to a measurable patient pipeline.",
    ctaLabel: "Book a hospital strategy call",
    ctaSub: "A department-level growth and compliance plan for your facility.",
    whatsIncluded: {
      heading: "What digital marketing for hospitals includes",
      items: [
        "Department- and service-line SEO (cardiology, ortho, maternity, diagnostics…)",
        "Paid media for priority service lines and seasonal campaigns",
        "Doctor-profile and condition content that earns trust and referrals",
        "Reputation and review management across facilities",
        "CRM and analytics that tie enquiries to service lines — not vanity metrics",
      ],
    },
    forWhom: {
      eyebrow: "Who It's For",
      heading: "For hospitals, clinics & medical groups",
      body: "We work at the service-line level — prioritising the departments with the best demand and capacity — and coordinate brand, web and campaigns across a multi-department, multi-location facility, within DHA rules.",
    },
    howWeGrow: {
      eyebrow: "The Approach",
      heading: "How we'd approach it",
      body: "Map priority service lines → build/optimise department and doctor pages → rank and run service-line campaigns → manage reputation → report by department on enquiries and bookings.",
    },
    expertise: {
      heading: "Why work with us",
      body: [
        "Sharoon Irfan Khan — Dubai-based performance & brand lead, Head of Marketing at MSN Developments. AED 35M+ in lead-attributed revenue and 20+ websites (cross-industry) — full-funnel systems experience applied to a hospital's departments, trust requirements and DHA compliance.",
      ],
    },
    faqs: [
      { q: "What does digital marketing for hospitals include?", a: "Service-line SEO and paid media, doctor/condition content, reputation management and CRM — reported by department, within DHA rules." },
      { q: "How do you handle many departments?", a: "We prioritise by demand and capacity, then build and measure each service line separately." },
      { q: "Is hospital advertising regulated in Dubai?", a: "Yes — DHA permits and claim restrictions apply; we build campaigns to be compliant by design." },
    ],
    closingTitle: "Want to grow your priority departments? Book a hospital strategy call.",
    siblings: [],
  },
  {
    slug: "pharma-digital-marketing",
    label: "Pharma",
    metaTitle: "Pharma Digital Marketing in Dubai",
    metaDescription:
      "Pharma digital marketing in Dubai — compliant HCP and brand campaigns, content and data for pharmaceutical companies across the UAE and GCC.",
    h1: "Pharma Digital Marketing in Dubai",
    heroLede:
      "Pharma marketing lives or dies on compliance and credibility. Pharma digital marketing in Dubai reaches healthcare professionals and the right audiences with content and campaigns that respect the rules — and still move brand awareness and demand.",
    ctaLabel: "Book a pharma strategy call",
    ctaSub: "A compliant digital plan for your brand or portfolio in the UAE/GCC.",
    whatsIncluded: {
      heading: "What pharma digital marketing includes",
      items: [
        "HCP-focused content and channels (compliant, evidence-led)",
        "Brand and disease-awareness campaigns within regulatory limits",
        "Search and professional-network presence for your brands",
        "Data, analytics and CRM for measurable engagement",
        "Congress, KOL and omnichannel support",
      ],
    },
    forWhom: {
      eyebrow: "Who It's For",
      heading: "For pharmaceutical companies & brands",
      body: "B2B and HCP-facing by nature — longer cycles, strict compliance, multiple stakeholders. We build digital that clears regulatory review and still performs, across the UAE and wider GCC.",
    },
    howWeGrow: {
      eyebrow: "The Approach",
      heading: "How we'd approach it",
      body: "Define audience & compliance guardrails → build compliant content and channels → run measured awareness/engagement campaigns → report on qualified engagement, not reach.",
    },
    expertise: {
      heading: "Why work with us",
      body: [
        "Sharoon Irfan Khan — Dubai-based performance & brand strategist, Head of Marketing at MSN Developments. AED 35M+ in lead-attributed revenue and 20+ websites (cross-industry), with a data-led, compliance-first method suited to regulated pharma marketing.",
      ],
    },
    faqs: [
      { q: "What does pharma digital marketing include?", a: "Compliant HCP content, brand/disease-awareness campaigns, search and professional channels, plus analytics — built to clear regulatory review." },
      { q: "Can pharma advertise to the public in the UAE?", a: "Prescription products face strict limits; much pharma marketing is HCP-facing or disease-awareness. We work within those rules." },
      { q: "B2B or B2C?", a: "Mostly B2B/HCP — we build for that longer, compliance-heavy cycle." },
    ],
    closingTitle: "Need compliant pharma digital that performs? Book a strategy call.",
    siblings: [],
  },
];

// Sibling ("we also help…") cards per Part 2, with the dropped Aesthetic
// vertical substituted by the existing `/industries/aesthetic-wellness` page.
const verticalBySlug = (slug: string): LinkCard => {
  const v = healthcareVerticals.find((x) => x.slug === slug)!;
  return { href: `/industries/healthcare/${v.slug}`, title: v.label, desc: v.heroLede.split(". ")[0] + "." };
};
healthcareVerticals[0].siblings = [verticalBySlug("digital-marketing-for-dentists"), verticalBySlug("digital-marketing-for-hospitals"), aestheticWellnessLink]; // Doctors
healthcareVerticals[1].siblings = [verticalBySlug("digital-marketing-for-doctors"), verticalBySlug("digital-marketing-for-hospitals"), aestheticWellnessLink]; // Dentists
healthcareVerticals[2].siblings = [verticalBySlug("digital-marketing-for-doctors"), verticalBySlug("digital-marketing-for-dentists"), verticalBySlug("pharma-digital-marketing")]; // Hospitals
healthcareVerticals[3].siblings = [verticalBySlug("digital-marketing-for-hospitals"), verticalBySlug("digital-marketing-for-doctors"), aestheticWellnessLink]; // Pharma

export function getHealthcareVertical(slug: string): VerticalPage | undefined {
  return healthcareVerticals.find((v) => v.slug === slug);
}

/* -------------------------------------------------------------------------- */
/* PAGES 6–11 — the six service (cluster) pages                               */
/* -------------------------------------------------------------------------- */

export type ServicePage = {
  slug: string;
  label: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  heroLede: string;
  ctaLabel: string;
  ctaSub: string;
  whatsIncluded: ClusterList;
  sectionA: ClusterNote;
  sectionB: ClusterNote;
  howWeApproach: ClusterNote;
  expertise: ClusterExpertise;
  faqs: ClusterFaq[];
  closingTitle: string;
  /** 2–3 sibling service slugs for "Related services". */
  related: string[];
};

export const healthcareServices: ServicePage[] = [
  {
    slug: "healthcare-seo-dubai",
    label: "Healthcare SEO",
    metaTitle: "Healthcare SEO Dubai | Rank for Patient Searches",
    metaDescription:
      "Healthcare SEO in Dubai — rank for the symptoms, treatments and “near me” searches patients make, for clinics, hospitals and practices. DHA-compliant.",
    h1: "Healthcare SEO in Dubai",
    heroLede:
      "Most patients start with a search — a symptom, a treatment, a “near me”. Healthcare SEO in Dubai puts your clinic, hospital or practice at the top of those results, so demand you'd otherwise pay for arrives organically.",
    ctaLabel: "Get my healthcare SEO plan",
    ctaSub: "A free audit and a compliant ranking plan for your practice.",
    whatsIncluded: {
      heading: "What healthcare SEO in Dubai includes",
      items: [
        "Symptom, treatment and “near me” keyword mapping",
        "Treatment/service and condition pages built to rank and reassure",
        "Local SEO — Google Business Profile, maps and reviews",
        "Technical SEO — speed, mobile, accessibility, medical schema",
        "Content that earns trust (see Content Marketing), kept DHA-appropriate",
      ],
    },
    sectionA: { eyebrow: "For Hospitals & Clinics", heading: "SEO for hospitals & clinics", body: "Service-line and department pages, doctor profiles and condition guides that rank across a large facility and tie organic traffic to the right department." },
    sectionB: { eyebrow: "For Practices & Clinics", heading: "SEO for doctors, dentists & aesthetic clinics", body: "Local, treatment-focused SEO for a single practice — “[treatment] in [area]”, Google Business Profile and reviews — so a smaller clinic outranks bigger names in its catchment." },
    howWeApproach: { eyebrow: "The Approach", heading: "How we'd approach it", body: "Audit & map patient searches → build/optimise treatment and local pages → earn reviews and authority → measure rankings, traffic and enquiries." },
    expertise: {
      heading: "Why work with us",
      body: [
        "Sharoon Irfan Khan — Dubai-based SEO & performance specialist, Head of Marketing at MSN Developments. Cross-industry: ranked competitive Dubai terms #1 and grew a blog 0→1,000 users in three months on pure on-page SEO — the same technical method applied to healthcare, within DHA rules.",
      ],
    },
    faqs: [
      { q: "How long does healthcare SEO take?", a: "Local and long-tail treatment terms often move in 2–3 months and compound; competitive head terms take longer." },
      { q: "Can a small clinic outrank a hospital?", a: "Yes — local and treatment-specific SEO lets a focused practice win its catchment." },
      { q: "Is medical SEO content regulated?", a: "Yes — we keep condition/treatment content accurate and DHA-compliant." },
    ],
    closingTitle: "Want to rank for the searches your patients make? Book a free healthcare SEO audit.",
    related: ["healthcare-ppc-dubai", "healthcare-content-marketing-dubai", "healthcare-web-development-dubai"],
  },
  {
    slug: "healthcare-ppc-dubai",
    label: "Healthcare PPC",
    metaTitle: "Healthcare PPC Dubai | Patient Lead Ads",
    metaDescription:
      "Healthcare PPC in Dubai — Google and Meta ads that book patients at a controlled cost per appointment, for clinics, hospitals and practices. DHA-compliant.",
    h1: "Healthcare PPC in Dubai",
    heroLede:
      "When someone searches a treatment today, you want to be the clinic they call. Healthcare PPC in Dubai runs Google and Meta campaigns that reach in-market patients and are measured on cost per booked appointment — not clicks — all within DHA rules.",
    ctaLabel: "Get my healthcare PPC plan",
    ctaSub: "A compliant ad plan with a cost-per-appointment target.",
    whatsIncluded: {
      heading: "What healthcare PPC in Dubai includes",
      items: [
        "Google Search for high-intent treatment queries",
        "Meta & TikTok for awareness and aesthetics demand",
        "Compliant ad copy and landing pages that qualify patients",
        "Call, WhatsApp and booking tracking so leads are attributed",
        "Budget pacing to capacity and seasonality",
      ],
    },
    sectionA: { eyebrow: "For Hospitals & Clinics", heading: "PPC for hospitals & clinics", body: "Service-line campaigns with budgets matched to department capacity, and qualification so the enquiries fit the service." },
    sectionB: { eyebrow: "For Practices & Clinics", heading: "PPC for doctors, dentists & aesthetic clinics", body: "Efficient, treatment-focused campaigns on a controlled budget, with retargeting and click-to-WhatsApp for fast booking." },
    howWeApproach: { eyebrow: "The Approach", heading: "How we'd approach it", body: "Set a cost-per-appointment target → build compliant ads & landing pages → launch search + social → track calls/bookings → optimise weekly to the target." },
    expertise: {
      heading: "Why work with us",
      body: [
        "Sharoon Irfan Khan — Dubai-based performance marketer, Head of Marketing at MSN Developments. AED 35M+ in lead-attributed revenue across Google and Meta and 8+ ad accounts (cross-industry) — a measurable, compliance-aware method applied to patient acquisition.",
      ],
    },
    faqs: [
      { q: "What should a clinic budget for PPC?", a: "Enough to hit a target cost per booked appointment; we pace budget to capacity, not a flat monthly figure." },
      { q: "Are healthcare ads restricted in Dubai?", a: "Yes — DHA rules limit claims and require permits for facilities; we build compliant campaigns." },
      { q: "Google or Meta?", a: "Search captures intent; social builds demand (especially aesthetics). Most clinics need a measured mix." },
    ],
    closingTitle: "Want patients booking at a predictable cost? Book a healthcare PPC call.",
    related: ["healthcare-seo-dubai", "healthcare-social-media-marketing-dubai", "healthcare-web-development-dubai"],
  },
  {
    slug: "healthcare-content-marketing-dubai",
    label: "Healthcare Content Marketing",
    metaTitle: "Healthcare Content Marketing Dubai | Trust & SEO",
    metaDescription:
      "Healthcare content marketing in Dubai — condition guides, treatment content and doctor expertise that rank, reassure patients and earn trust. DHA-compliant.",
    h1: "Healthcare Content Marketing in Dubai",
    heroLede:
      "In health, trust is the whole funnel — and content is how you earn it. Healthcare content marketing in Dubai turns accurate condition, treatment and doctor-expertise content into rankings, reassurance and booked patients.",
    ctaLabel: "Get my content plan",
    ctaSub: "A content strategy that ranks and builds patient trust.",
    whatsIncluded: {
      heading: "What healthcare content marketing includes",
      items: [
        "Condition and treatment guides that answer real patient questions",
        "Doctor-authored / doctor-reviewed expertise content (E-E-A-T)",
        "FAQ, cost and “what to expect” pages that pre-empt objections",
        "Content wired to SEO and email/CRM",
        "Accurate, DHA-compliant claims throughout",
      ],
    },
    sectionA: { eyebrow: "For Hospitals & Clinics", heading: "Content for hospitals & clinics", body: "Condition libraries, service-line and doctor-profile content that build institutional authority and support every department." },
    sectionB: { eyebrow: "For Practices & Clinics", heading: "Content for doctors, dentists & aesthetic clinics", body: "Treatment explainers, before-and-after (compliant) stories and local authority content that make a smaller practice the trusted choice." },
    howWeApproach: { eyebrow: "The Approach", heading: "How we'd approach it", body: "Map patient questions by stage → produce accurate, expert-reviewed content → optimise for search → distribute via social and email → measure rankings and enquiries." },
    expertise: {
      heading: "Why work with us",
      body: [
        "Sharoon Irfan Khan — Dubai-based brand & content strategist, Head of Marketing at MSN Developments. Cross-industry: ranked a Dubai guide #1 and grew a blog 0→1,000 users in three months — content written to rank and convert, applied to healthcare with medical accuracy and DHA compliance.",
      ],
    },
    faqs: [
      { q: "What content works for healthcare?", a: "Accurate condition/treatment guides, “what to expect” and cost pages, and doctor-expertise content — the topics patients actually search." },
      { q: "Does content need medical review?", a: "Yes — we keep it accurate, expert-reviewed and DHA-compliant; trust depends on it." },
      { q: "Content or ads?", a: "Both — ads capture now-demand; content compounds and builds the trust health decisions require." },
    ],
    closingTitle: "Want to be the practice patients trust? Book a content strategy call.",
    related: ["healthcare-seo-dubai", "healthcare-social-media-marketing-dubai", "healthcare-email-marketing-dubai"],
  },
  {
    slug: "healthcare-social-media-marketing-dubai",
    label: "Healthcare Social Media",
    metaTitle: "Healthcare Social Media Marketing Dubai | Clinics",
    metaDescription:
      "Healthcare social media marketing in Dubai — Instagram, TikTok and content that build trust and book patients for clinics, dentists and aesthetic practices.",
    h1: "Healthcare Social Media Marketing in Dubai",
    heroLede:
      "Patients check your feed before they book. Healthcare social media marketing in Dubai turns your clinic, clinicians and results into content that builds trust — and trust into consultations — for medical, dental and aesthetic practices.",
    ctaLabel: "Get my social plan",
    ctaSub: "Creative and a calendar that turn followers into patients.",
    whatsIncluded: {
      heading: "What healthcare social media marketing includes",
      items: [
        "Content and creative direction — treatment explainers, team, patient education",
        "Instagram & TikTok, plus reels and short video",
        "Compliant results/testimonial content with consent",
        "Community and DM/enquiry handling",
        "Paid social to amplify the best content (pairs with PPC)",
      ],
    },
    sectionA: { eyebrow: "For Aesthetic & Dental", heading: "Social for aesthetic, dental & clinic brands", body: "Visual, high-competition niches where social decides the booking — we build a consistent, on-brand presence and turn engagement into consultations." },
    sectionB: { eyebrow: "For Hospitals & Groups", heading: "Social for hospitals & medical groups", body: "Brand trust, health-awareness content and doctor features across facilities, with governance that keeps everything DHA-compliant." },
    howWeApproach: { eyebrow: "The Approach", heading: "How we'd approach it", body: "Set brand and content pillars → produce a consistent, compliant calendar → grow and engage the community → convert via DMs and booking → measure engagement and consultations." },
    expertise: {
      heading: "Why work with us",
      body: [
        "Sharoon Irfan Khan — Dubai-based brand & social lead, Head of Marketing at MSN Developments. End-to-end social across 8+ brand accounts (cross-industry) — creative, content, campaigns and community — applied to healthcare within DHA rules.",
      ],
    },
    faqs: [
      { q: "Which platform is best for healthcare?", a: "Instagram and TikTok for aesthetics and clinics; all channels benefit from education and trust content." },
      { q: "Can we post patient results?", a: "Only with consent and within DHA rules — we keep creative compliant." },
      { q: "Does social book patients or just build brand?", a: "Both — the feed builds trust; DMs and click-to-book convert it." },
    ],
    closingTitle: "Want your feed to book patients? Book a social strategy call.",
    related: ["healthcare-content-marketing-dubai", "healthcare-ppc-dubai", "healthcare-web-development-dubai"],
  },
  {
    slug: "healthcare-email-marketing-dubai",
    label: "Healthcare Email Marketing",
    metaTitle: "Healthcare Email Marketing Dubai | Recall & CRM",
    metaDescription:
      "Healthcare email marketing in Dubai — CRM, recall and nurture that follow up enquiries and bring patients back, for clinics, dentists and practices.",
    h1: "Healthcare Email Marketing in Dubai",
    heroLede:
      "An enquiry that isn't followed up and a patient who never rebooks are the quiet leaks in every clinic. Healthcare email marketing in Dubai uses CRM, recall and nurture to follow up leads and bring patients back — with privacy respected.",
    ctaLabel: "Get my recall & CRM plan",
    ctaSub: "Follow-up and recall that turn enquiries into repeat patients.",
    whatsIncluded: {
      heading: "What healthcare email marketing includes",
      items: [
        "CRM setup and patient segmentation",
        "Enquiry follow-up and nurture sequences",
        "Recall and reactivation (check-ups, repeat treatments)",
        "Newsletters — health tips, offers, new services",
        "Email + WhatsApp automation, with consent and privacy respected",
      ],
    },
    sectionA: { eyebrow: "For Clinics & Practices", heading: "For clinics, dentists & aesthetic practices", body: "Recall is where clinics win — a patient base is an asset. We automate follow-up and recall so chairs and calendars stay full without manual chasing." },
    sectionB: { eyebrow: "For Hospitals & Groups", heading: "For hospitals & medical groups", body: "Segmented communication across service lines and locations, with governance and privacy controls." },
    howWeApproach: { eyebrow: "The Approach", heading: "How we'd approach it", body: "Set up CRM & consent → segment patients → build follow-up, recall and newsletter flows → automate email + WhatsApp → measure rebookings and reactivations." },
    expertise: {
      heading: "Why work with us",
      body: [
        "Sharoon Irfan Khan — Dubai-based performance & CRM lead, Head of Marketing at MSN Developments. CRM and automation experience (HubSpot, Zoho, ActiveCampaign, WhatsApp Business) across the funnel (cross-industry) — applied to patient follow-up and recall, with privacy respected.",
      ],
    },
    faqs: [
      { q: "Does email work for clinics?", a: "Yes — recall and follow-up are where clinics recover the most revenue from an existing patient base." },
      { q: "Email or WhatsApp?", a: "Both — WhatsApp for immediacy, email for depth; we automate them together, with consent." },
      { q: "Is patient data handled properly?", a: "Yes — consent-based, privacy-respecting, and compliant." },
    ],
    closingTitle: "Losing enquiries and repeat patients? Book a recall & CRM call.",
    related: ["healthcare-content-marketing-dubai", "healthcare-ppc-dubai", "healthcare-seo-dubai"],
  },
  {
    slug: "healthcare-web-development-dubai",
    label: "Healthcare Web Development",
    metaTitle: "Healthcare Web Development Dubai | Clinic Websites",
    metaDescription:
      "Healthcare web development in Dubai — fast, accessible, bookable clinic and hospital websites that convert visits into appointments. SEO-ready, DHA-appropriate.",
    h1: "Healthcare Web Development in Dubai",
    heroLede:
      "A patient decides whether to trust your clinic in seconds — on their phone. Healthcare web development in Dubai builds fast, accessible, bookable websites for clinics and hospitals that convert a visit into an appointment.",
    ctaLabel: "Get my website plan",
    ctaSub: "A fast, bookable, SEO-ready medical website.",
    whatsIncluded: {
      heading: "What medical website development includes",
      items: [
        "Strategy and UX around the patient journey to a booking",
        "Fast, mobile-first, accessible build (WCAG-aware)",
        "Treatment/service and doctor-profile pages",
        "Online booking, WhatsApp and enquiry forms that qualify",
        "SEO-ready structure, medical schema and CRM integration",
        "DHA-appropriate content and privacy basics",
      ],
    },
    sectionA: { eyebrow: "For Hospitals & Groups", heading: "Websites for hospitals & medical groups", body: "Multi-department, multi-location platforms with service-line and doctor directories, booking and analytics tied to each department." },
    sectionB: { eyebrow: "For Practices & Clinics", heading: "Websites for doctors, dentists & aesthetic clinics", body: "A fast, credible, booking-first site for a single practice — mobile-first, with click-to-WhatsApp and treatment pages built to rank." },
    howWeApproach: { eyebrow: "The Approach", heading: "How we'd approach it", body: "Plan the journey to booking → design a credible, accessible UI → build fast and SEO-ready → integrate booking/CRM → launch and measure conversions." },
    expertise: {
      heading: "Why work with us",
      body: [
        "Sharoon Irfan Khan — Dubai-based web & performance lead, Head of Marketing at MSN Developments. 20+ websites launched and optimised (WordPress, Elementor, custom; cross-industry) — sites designed, built and ranked, applied to bookable, accessible medical websites.",
      ],
    },
    faqs: [
      { q: "How long does a clinic website take?", a: "Typically a few weeks depending on services and integrations; we prioritise a fast, bookable launch." },
      { q: "What makes a medical website convert?", a: "Speed, accessibility, trust signals and easy booking — plus an SEO-ready build so patients find it." },
      { q: "Is it DHA/privacy-appropriate?", a: "Yes — compliant content and privacy basics built in." },
    ],
    closingTitle: "Need a website that books patients? Book a web development call.",
    related: ["healthcare-seo-dubai", "healthcare-ppc-dubai", "healthcare-social-media-marketing-dubai"],
  },
];

export function getHealthcareService(slug: string): ServicePage | undefined {
  return healthcareServices.find((s) => s.slug === slug);
}

/* -------------------------------------------------------------------------- */
/* Shared pillar↔cluster link sets                                            */
/* -------------------------------------------------------------------------- */

/** The hub card, reused wherever a vertical/service page links up to it. */
export const healthcareHubLink: LinkCard = {
  href: "/industries/healthcare",
  title: "Healthcare Digital Marketing",
  desc: "The full picture — SEO, ads, content, social, email and web for doctors, dentists, hospitals, clinics and pharma, one connected system.",
};

/** The six-card services grid — shared by the hub and every vertical page
 *  ("down to all 6 service pages"). */
export const healthcareServiceCards: LinkCard[] = healthcareServices.map((s) => ({
  href: `/services/${s.slug}`,
  title: s.label,
  desc: s.heroLede.split(". ").slice(-1)[0],
}));

/** "Who this is for" — hub + all four verticals + the Aesthetic stand-in —
 *  the card row every service page links up through. */
export const healthcareAudienceCards: LinkCard[] = [
  healthcareHubLink,
  ...healthcareVerticals.map((v) => ({
    href: `/industries/healthcare/${v.slug}`,
    title: v.label,
    desc: v.heroLede.split(". ")[0] + ".",
  })),
  aestheticWellnessLink,
];
