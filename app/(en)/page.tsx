import type { Metadata } from "next";
import { Faq } from "@/components/faq";
import { InsightCard } from "@/components/insights";
import { SixServices } from "@/components/six-services";
import {
  ArabicStatement,
  Band,
  Card,
  CardGrid,
  CtaBand,
  Frame,
  Heading,
  PillLink,
  SectionIntro,
  SplitHero,
} from "@/components/ui";
import {
  cta,
  heroImages,
  homeFaqs,
  howWeWork,
  insightCategories,
  latestInsightArticles,
  ogDefaults,
  sharedImages,
  site,
} from "@/lib/site";

export const metadata: Metadata = {
  title: "Shario — Digital Marketing Company in Dubai",
  description: site.description,
  alternates: {
    canonical: "/",
    languages: { en: "/", ar: "/ar", ru: "/ru", "x-default": "/" },
  },
  openGraph: {
    ...ogDefaults,
    url: "/",
    type: "website",
    title: "Shario — Digital Marketing Company in Dubai",
    description: site.description,
  },
};

/** Path/crop live in `lib/site.ts` as `heroImages.home`, shared with the Arabic homepage and both locales' `opengraph-image.tsx`. Alt text stays here since it's translated content, not a shared fact. */
export const HERO_IMAGE = heroImages.home.src;
export const HERO_IMAGE_ALT = `${site.founder}, founder of Shario`;

/** Card grounds for "How We Work" — shared with the Arabic homepage via `lib/site.ts`'s `sharedImages.homeStepTextures`. */
const stepTextures = sharedImages.homeStepTextures;

export default function HomePage() {
  return (
    <>
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
            {/* Flush `block` spans, no per-line offsets: measured against the
                rendered glyph ink (canvas actualBoundingBoxLeft, not just
                each span's box edge), "D", "T" and "I" in Cormorant Garamond
                already land within half a pixel of one another at every
                hero size. A manual nudge used to sit on this second line on
                the assumption that "T"'s serif overhangs further left than
                "D" or "I"'s stems — measurement shows the opposite: "T"'s
                ink starts very slightly further right, so the nudge was
                pushing this line visibly right of the other two instead of
                correcting it. */}
            <span className="block">Digital Marketing</span>
            <span className="block">That Turns Spend</span>
            <span className="block">Into Revenue</span>
          </>
        }
        subhead={<em className="italic">A Symphony of Identity</em>}
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

      {/* Services — moved directly after the hero, ahead of the Founder
          band below, so the page reads hero → what we do → who's behind it.
          The tint moved with the Founder band rather than staying here: two
          Limestone grounds back to back (this section's old wash sitting
          right under the hero's own solid Limestone) read as one section
          failing to end, not two.

          `SixServices` is shared with `/services`, which renders this exact
          same section rather than its own copy — the homepage is the master
          reference; changing this section here changes it there too. */}
      <SixServices />

      {/* About — image beside text, as the reference sets it */}
      <Band className="bg-limestone/30">
        <div className="grid items-center gap-12 wide:grid-cols-[1fr_1.05fr] wide:gap-20">
          {/*
           * Cut to 4:3 in prep rather than left to `object-cover`: the original
           * is a 4:5 portrait, so the frame throws away a third of its height,
           * and a centred crop takes the top off the figure's head. Anchored to
           * hold the horizon and the whole seated figure.
           */}
          <Frame
            src={sharedImages.homeAboutHorizon}
            ratio="aspect-[4/3]"
            alt={`${site.founder}, founder of Shario`}
          />
          <div>
            <p className="eyebrow flex items-center gap-3 text-carbon/55">
              <span aria-hidden="true" className="h-px w-6 bg-mist" />
              About Shario
            </p>
            <Heading scale="md" className="mt-5">
              Founder-led from day one.
            </Heading>
            <p className="reveal mt-6 max-w-[560px] text-[1.0625rem] leading-[1.7] text-carbon/75">
              Shario runs on a senior model. Every strategy is set to the
              standard of a founder who has personally built and launched
              full-funnel marketing systems for developer-led projects in Dubai.
            </p>
            <p
              className="reveal mt-4 max-w-[560px] text-[1.0625rem] leading-[1.7] text-carbon/75"
              data-delay="90"
            >
              You get senior thinking on every campaign, from a team that stays
              with your account.
            </p>
            <div className="reveal mt-9" data-delay="160">
              <PillLink href="/about">Learn More</PillLink>
            </div>
          </div>
        </div>
      </Band>

      {/* The Arabic brand accent — a quiet full-width pause between the
          Founder band above and What Makes Us Different below, on the one
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
            sub="Four steps, run every week rather than every quarter."
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
        />
        <div className="mx-auto max-w-[880px]">
          <Faq items={homeFaqs} answerClassName="font-body" />
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
