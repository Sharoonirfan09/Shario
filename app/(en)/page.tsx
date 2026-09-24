import type { Metadata } from "next";
import { Faq } from "@/components/faq";
import { InsightCard } from "@/components/insights";
import { SixServices } from "@/components/six-services";
import {
  FaqStructuredData,
  PersonStructuredData,
} from "@/components/structured-data";
import {
  ArabicStatement,
  Band,
  Card,
  CardGrid,
  CtaBand,
  Heading,
  PillLink,
  SectionIntro,
  SplitHero,
  TestimonialCard,
  WorkTile,
} from "@/components/ui";
import {
  cta,
  heroImages,
  homeFaqs,
  howWeWork,
  insightCategories,
  latestInsightArticles,
  ogDefaults,
  resources,
  sharedImages,
  site,
  testimonials,
  transparencyBlocks,
  trustStrip,
  workWall,
} from "@/lib/site";

/**
 * SEO-specific description, distinct from `site.description` (which also
 * feeds the root layout fallback, `llms.txt` and the Organization structured
 * data) so the homepage's own title/description can target "digital
 * marketing agency in Dubai" without rewriting that shared string — and,
 * per this SEO pass's brief, without touching any page outside the homepage.
 */
const HOME_META_DESCRIPTION =
  "Founder-led digital marketing agency in Dubai. Performance marketing, SEO, websites, CRM and branding built as one system — measured on qualified leads that convert into revenue.";

export const metadata: Metadata = {
  // Written out in full rather than relying on the layout's
  // `title.template`: per Next's own docs, a template defined in a layout
  // does not apply to a page in that *same* route segment, and this page is
  // the index of `app/(en)` — the same segment as `app/(en)/layout.tsx`.
  // (Verified: leaving just the bare phrase here rendered with no suffix at
  // all once the old root-level template — which did apply, being higher up
  // the tree — was removed.)
  title: "Digital Marketing Agency in Dubai | Shario",
  description: HOME_META_DESCRIPTION,
  alternates: {
    canonical: "/",
    languages: { en: "/", ar: "/ar", ru: "/ru", "x-default": "/" },
  },
  openGraph: {
    ...ogDefaults,
    url: "/",
    type: "website",
    title: "Shario — Digital Marketing Agency in Dubai",
    description: HOME_META_DESCRIPTION,
  },
};

/** Path/crop live in `lib/site.ts` as `heroImages.home`, shared with the Arabic homepage and both locales' `opengraph-image.tsx`. Alt text stays here since it's translated content, not a shared fact. */
export const HERO_IMAGE = heroImages.home.src;
export const HERO_IMAGE_ALT = `${site.founder}, founder of Shario, a digital marketing agency in Dubai`;

/** Card grounds for "How We Work" — shared with the Arabic homepage via `lib/site.ts`'s `sharedImages.homeStepTextures`. */
const stepTextures = sharedImages.homeStepTextures;

export default function HomePage() {
  return (
    <>
      <FaqStructuredData items={homeFaqs} />
      <PersonStructuredData />

      {/*
       * The client's own hero photograph, supplied with the reference layout —
       * the only portrait on the site, and the reason this hero runs the image
       * full height rather than panelled.
       *
       * The file is cut in `scripts`-style prep from the landscape original to
       * roughly the hero column's own proportion, framing head to shoulder at
       * the reference's scale. Because it so nearly matches the column, `focus`
       * only places a few percent of crop either way — holding it high keeps
       * the whole paint gesture in shot when the viewport is short.
       *
       * `focus` stays centred. Anchoring X to the right looks tempting — it
       * protects her hair from the crop — but she faces left, so her face sits
       * in the left half of the frame and holding the right edge is what
       * removes it: at 1000px the column falls to about 0.74, the crop takes
       * 26%, and all of it comes off her nose and mouth. Centred, the same crop
       * splits either side and clears both her face and her hair down to ~0.74,
       * which is the narrowest the column gets on a real window.
       *
       * Not `reception-wall.jpg`, which was the hero two structures ago: it has
       * "SHARIO — A Symphony of Identity" and the Arabic lockup painted across
       * the wall. Four photographs in the library carry the retired tagline —
       * that one, `sign-exterior`, `sign-glass` and `photo-lounge`. None are
       * used anywhere on the site.
       */}
      <SplitHero
        src={HERO_IMAGE}
        alt={HERO_IMAGE_ALT}
        focus="object-[50%_28%]"
        title={
          <>
            <span className="block">Digital Marketing</span>
            <span className="block">Agency in Dubai</span>
          </>
        }
        subhead={<em className="italic">A Symphony of Identity</em>}
        lead="A founder-led digital marketing agency in Dubai running paid media, SEO, websites and CRM as one connected system, under one accountable team."
        href="/about"
        linkLabel="Inside Shario"
      >
        <PillLink href={cta.href} tone="solid" size="lg">
          {cta.label}
        </PillLink>
        <PillLink href="/services" tone="outline" size="lg">
          Our Services
        </PillLink>
      </SplitHero>

      {/* Trust strip — a slim band under the hero, "·" separators rather than
          Tailwind's `divide-x` (which breaks across a flex-wrap boundary on
          narrow screens) — the same separator convention Insights already
          uses for "{date} · {readingTime}". */}
      <Band compact>
        <p className="eyebrow flex flex-wrap items-center justify-center gap-x-2.5 gap-y-2 text-center text-carbon/60">
          {trustStrip.map((item, i) => (
            <span key={i} className="flex items-center gap-2.5">
              {i > 0 && <span aria-hidden="true">·</span>}
              {item.text}
            </span>
          ))}
        </p>
      </Band>

      {/* Services — directly after the hero, so the page opens on what we
          do. No tint here: two Limestone grounds back to back (this section's old wash sitting
          right under the hero's own solid Limestone) read as one section
          failing to end, not two.

          `SixServices` is shared with `/services`, which renders this exact
          same section rather than its own copy — the homepage is the master
          reference; changing this section here changes it there too. */}
      <SixServices />

      {/* Work wall — most tiles carry a real screenshot of the live
          homepage; a working outbound link to a real business is still the
          proof point underneath it. */}
      <Band className="bg-limestone/30">
        <SectionIntro
          eyebrow="Selected Work"
          title="Work you can click."
          sub="Twenty-plus websites designed, built, ranked and run — across Dubai real estate, e-commerce, hospitality, SaaS and B2B. Real, live businesses you can open in a new tab."
        />
        <CardGrid columns={3}>
          {workWall.map((item, i) => (
            <WorkTile
              key={item.domain}
              sector={item.sector}
              brand={item.brand}
              line={item.line}
              domain={item.domain}
              cover={item.cover}
              coverPriority={i === 0}
              tone={i % 2 === 0 ? "limestone" : "porcelain"}
              delay={i * 60}
            />
          ))}
        </CardGrid>
        <div className="mt-12 text-center wide:mt-16">
          <PillLink href="/work">See the full portfolio →</PillLink>
        </div>
      </Band>

      {/* Testimonials — client quotes given directly to Shario, each linking
          out to the reviewer's own LinkedIn profile. Separate from Sharoon's
          personal Google reviews, so no aggregateRating/Review schema is
          attached to the Organization for them. */}
      <Band className="bg-limestone/30">
        <SectionIntro eyebrow="Client Reviews" title="What clients say." />
        <CardGrid columns={2}>
          {testimonials.map((item, i) => (
            <TestimonialCard
              key={item.name}
              quote={item.quote}
              name={item.name}
              role={item.role}
              linkedin={item.linkedin}
              photo={item.photo}
              tone={i % 2 === 0 ? "limestone" : "porcelain"}
              delay={i * 60}
            />
          ))}
        </CardGrid>
      </Band>

      {/* The Arabic brand accent — a quiet full-width pause between the
          Testimonials above and What Makes Us Different below, on the one
          section of the page that spends Mist as a ground rather than a
          hairline or hover state. See `ArabicStatement` for why. */}
      <ArabicStatement />

      {/* What makes us different — the engagement, as the reference frames it.
          Carries the Arabic lockup as a large, very quiet watermark — Carbon
          at 6% rather than Mist, so it reads as a shadow in the ground, not
          a coloured accent competing with the cards in front of it. One of
          only two places this mark appears on the site (the other is small
          and Mist-toned, on About's "Where We Work"); it isn't meant to
          repeat everywhere the Latin wordmark does. */}
      <Band className="relative overflow-hidden">
        <span
          aria-hidden="true"
          className="wordmark-ar pointer-events-none absolute right-[4%] top-6 z-0 w-[46%] text-carbon/[0.07] wide:right-[6%] wide:top-10 wide:w-[26%]"
        />
        <div className="relative z-10">
          <SectionIntro
            eyebrow="What Makes Us Different"
            title="This is how we work."
            sub="Four steps, run every week rather than every quarter — the process behind Shario, a creative digital marketing agency in Dubai."
          />
          {/*
           * One texture per card, each used nowhere else on the site — crops of
           * material (stone, paper, an interior, a desk) shown at full clarity
           * in their own block, the type held in a clean ground below rather
           * than washed over the photograph.
           */}
          <CardGrid columns={4}>
            {howWeWork.map((step, i) => (
              <Card
                key={step.num}
                badge={step.num}
                title={step.title}
                titleAs="h3"
                desc={step.desc}
                image={stepTextures[i]}
                delay={i * 60}
              />
            ))}
          </CardGrid>
        </div>
      </Band>

      {/* Insights — the Insights page's own "Featured" and Archive cards,
          reused at a larger size rather than a bespoke blog teaser, so this
          reads as an extension of that page and not a second design. Pulled
          from `insightArticles` via `latestInsightArticles`, so a new piece
          published there appears here on its own. Limestone, the same way
          Services' own grid sits on Limestone against Porcelain bands either
          side of it, so this reads as its own section rather than a
          continuation of How We Work above it. */}
      <Band className="bg-limestone/30">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6 wide:mb-16">
          <div>
            <p className="eyebrow flex items-center gap-3 text-carbon/55">
              <span aria-hidden="true" className="h-px w-6 bg-mist" />
              From The Journal
            </p>
            <Heading scale="md" className="mt-5">
              Ideas worth your time.
            </Heading>
          </div>
          <PillLink href="/insights">View all insights →</PillLink>
        </div>

        <div className="grid gap-x-8 gap-y-14 wide:grid-cols-3">
          {latestInsightArticles(3).map((article, i) => (
            <InsightCard
              key={article.slug}
              article={article}
              categories={insightCategories}
              size="large"
              delay={i * 60}
            />
          ))}
        </div>
      </Band>

      {/* FAQ */}
      <Band>
        <SectionIntro
          eyebrow="FAQ"
          title="Frequently asked questions."
          sub="Answers about working with Shario, a digital marketing agency in Dubai, UAE."
        />
        <div className="mx-auto max-w-[880px]">
          <Faq items={homeFaqs} answerClassName="font-body" />
        </div>
      </Band>

      {/* Resources — two ungated downloads, no email gate. The audit is the
          asset that does the real work: giving the method away is the most
          credible way to show there is one. */}
      <Band className="bg-limestone/30">
        <SectionIntro eyebrow="Resources" title="Take something useful with you." />
        <div className="grid gap-6 wide:grid-cols-2 wide:gap-8">
          {resources.map((resource) => (
            <a
              key={resource.href}
              href={resource.href}
              download
              className="reveal group flex flex-col border border-platinum/50 bg-porcelain p-8 transition-colors duration-500 hover:border-mist hover:bg-mist/[0.06] wide:p-10"
            >
              <h3 className="font-display text-[1.375rem] font-medium leading-[1.25] text-carbon">
                {resource.title}
              </h3>
              <p className="mt-3.5 flex-1 text-[0.9375rem] leading-[1.75] text-carbon/72">
                {resource.desc}
              </p>
              <span className="eyebrow mt-7 flex items-center gap-2 border-t border-carbon/12 pt-6 text-carbon">
                Download
                <span aria-hidden="true" className="text-carbon/50">
                  · {resource.fileSize}
                </span>
                <span
                  aria-hidden="true"
                  className="ml-auto transition-transform duration-500 group-hover:translate-x-1.5"
                >
                  →
                </span>
              </span>
            </a>
          ))}
        </div>
      </Band>

      {/* How we work together — three short transparency blocks. Costs
          nothing to publish, almost no competitor does it, and the
          disqualification block reads as confidence, not sales copy. */}
      <Band>
        <SectionIntro eyebrow="How We Work Together" title="Before you enquire." />
        <div className="mx-auto grid max-w-[820px] gap-10 wide:gap-12">
          {transparencyBlocks.map((block, i) => (
            <div key={block.title} className="reveal" data-delay={i * 60}>
              <Heading as="h3" scale="sm" className="text-[1.125rem]">
                {block.title}
              </Heading>
              <p className="mt-3 text-[0.9375rem] leading-[1.75] text-carbon/72">
                {block.body}
              </p>
            </div>
          ))}
        </div>
      </Band>

      <CtaBand title="Have a question we haven't answered?">
        <PillLink href={cta.href} tone="solid" size="lg">
          {cta.label}
        </PillLink>
      </CtaBand>
    </>
  );
}
