# SHARIO — Keyword-to-Page Map

Generated as part of the SEO service-page enrichment pass. Every URL, H1, title and
meta description below is pulled live from `lib/site.ts` at the time of writing —
not invented — so this should be re-checked if that file changes.

No new URLs were created. SHARIO's catalogue is six deliberately broad service
pages; supporting keywords are covered as named subsections, FAQ content and
metadata inside the relevant page rather than as separate near-duplicate pages,
per the standard rule against keyword-cannibalising pages that target the same
search intent.

Canonical/hreflang pattern for every row below (unchanged, already correct):
`/services/{slug}` (en, x-default) · `/ar/services/{slug}` (ar) · `/ru/services/{slug}` (ru).

## 1. Digital Marketing — `/services/digital-marketing`

- **Primary keyword:** Digital Marketing
- **Supporting keywords covered on this page:** Performance Marketing, Google Ads
  Management Services, PPC Services, Email Marketing, Video Marketing, Search
  Everywhere, Social Media Marketing (Facebook Marketing, Instagram Marketing —
  see note below)
- **H1:** "Digital Marketing."
- **Title tag:** "Digital & Performance Marketing Agency in Dubai — Google & Meta Ads"
- **Meta description:** "Digital marketing agency in Dubai — performance marketing
  across Google Ads, Meta Ads, PPC and email, engineered for qualified leads at
  below-target cost per lead."
- **AR name / RU name:** التسويق الرقمي / Цифровой маркетинг
- **Note:** Twitter, Pinterest and TikTok marketing are not currently a SHARIO
  offering anywhere in the site content — no page or FAQ claims them, so none was
  added here. Only Facebook and Instagram (via Meta) are genuinely covered.

## 2. SEO — `/services/seo`

- **Primary keyword:** SEO Services
- **Supporting keywords covered on this page:** Technical SEO, On-Page SEO,
  Off-Page SEO, Keyword Research, Local SEO Services, SEO Audit Services (via
  the "Technical and content SEO audit" deliverable)
- **H1:** "SEO (Search Engine Optimization)."
- **Title tag:** "SEO Agency in Dubai — Technical SEO & Content Strategy"
- **Meta description:** "SEO company in Dubai — technical SEO, on-page
  optimisation and content clusters built to rank in Dubai search and win
  AI-driven results."
- **AR name / RU name:** تحسين محركات البحث (SEO) / SEO (поисковая оптимизация)
- **Note:** The site's existing AEO/GEO article cluster (`/insights` — see the
  Answer Engine Optimization pillar guide) is the deeper home for AI-search
  content; this page links to it via `relatedInsightSlug`.

## 3. Website Development — `/services/website-development`

- **Primary keyword:** Website Development
- **Supporting keywords covered on this page:** Website Design, WordPress
  Development, E-commerce Development, Custom Web Development Services, B2B Web
  and Portal Development, Website Maintenance and Support Services, Automation
  Services, API Integration Services
- **H1:** "Website Development."
- **Title tag:** "Website Development Agency in Dubai — WordPress, E-commerce &
  Custom Builds"
- **Meta description:** "Website development agency in Dubai — WordPress,
  e-commerce and custom-built websites with SEO-ready architecture,
  CRM-integrated funnels and ongoing maintenance."
- **AR name / RU name:** تطوير المواقع الإلكترونية / Веб-разработка

## 4. CRM & Marketing Automation — `/services/crm-marketing-automation`

- Not one of the brief's named clusters directly, but the genuine home for two
  of its keywords once a real product (a CRM, a lead flow) is on the other end
  of the integration.
- **Supporting keywords covered on this page:** Automation Services, API
  Integration Services (the marketing-operations angle — nurture sequences, lead
  routing, CRM-to-tool integration — complementing, not duplicating, Website
  Development's site-to-system integration angle above)
- **H1:** "CRM & Marketing Automation."
- **Title tag:** "CRM & Marketing Automation Agency in Dubai — API Integration"
- **Meta description:** "CRM integration, marketing automation and API
  integration services in Dubai — attribution tracking, lead scoring and
  automated follow-up that tie marketing spend to closed revenue."
- **AR name / RU name:** إدارة علاقات العملاء وأتمتة التسويق / CRM и
  маркетинговая автоматизация

## 5. Branding — `/services/branding`

- **Primary keyword:** Branding Services
- **Supporting keywords covered on this page:** Graphic Design Services, UI/UX
  Design, Logo Design, Creative Advertising
- **H1:** "Branding."
- **Title tag:** "Branding Agency in Dubai — Logo, Identity & UI/UX Design"
- **Meta description:** "Branding agency in Dubai — logo design, graphic design,
  UI/UX and brand identity, with campaign visuals and creative advertising
  produced to a launch standard."
- **AR name / RU name:** العلامة التجارية / Брендинг

## 6. Marketing Consulting — `/services/marketing-consulting`

- **Primary keyword:** Marketing Consultation (SHARIO's own established name for
  this service is "Marketing Consulting" — used as the page's name/H1/URL;
  "consultation" is woven into the meta description as the natural search
  synonym rather than renaming the page)
- **H1:** "Marketing Consulting."
- **Title tag:** "Marketing Consulting Agency in Dubai"
- **Meta description:** "Marketing consulting and consultation in Dubai —
  go-to-market strategy, marketing audits and channel planning that turn a
  fragmented budget into one coherent plan."
- **AR name / RU name:** الاستشارات التسويقية / Маркетинговый консалтинг

## Keyword clusters with no dedicated page (by design)

Per the brief's own rule against creating a page for every keyword variation,
these live as content inside the pages above rather than as their own URLs:

- **Social Media** (as a standalone concept) → folded into Digital Marketing.
- **Search Everywhere** → folded into Digital Marketing (paid presence beyond
  Google) — deliberately not framed as an SEO/organic concept, matching the
  brief's own instruction not to force it into traditional SEO terminology.
