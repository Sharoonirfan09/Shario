import type { Metadata } from "next";
import { Faq } from "@/components/faq";
import {
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
import { cta, homeFaqs, howWeWork, services, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Shario — Digital Marketing Company in Dubai",
  description: site.description,
  alternates: { canonical: "/" },
};

/**
 * Card grounds. Every one is a distinct photograph used nowhere else on the
 * site — `npm run check:images` fails the build if any of them repeats.
 *
 * They live here rather than in `lib/site.ts` because the services grid also
 * renders on `/services`, and giving both pages the same backgrounds would
 * break that rule — that page carries its own set, cut from different
 * originals.
 */
const stepTextures = [
  "/images/texture/stone.jpg",
  "/images/texture/build.jpg",
  "/images/texture/interior.jpg",
  "/images/texture/desk.jpg",
];

const serviceImages: Record<string, string> = {
  "performance-marketing": "/images/texture/svc-performance.jpg",
  "seo-and-content": "/images/texture/svc-seo.jpg",
  "websites-and-cro": "/images/texture/svc-web.jpg",
  "crm-and-automation": "/images/texture/svc-crm.jpg",
  "brand-and-creative": "/images/texture/svc-brand.jpg",
  "strategy-consulting": "/images/texture/svc-strategy.jpg",
};

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
        src="/images/hero/portrait.jpg"
        focus="object-[50%_28%]"
        title={
          <>
            A Dubai Digital
            <br />
            Marketing Company
            <br />
            That Turns Spend
            <br />
            Into Revenue
          </>
        }
        subhead={<em className="italic">A Symphony of Identity.</em>}
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

      {/* About — image beside text, as the reference sets it */}
      <Band>
        <div className="grid items-center gap-12 wide:grid-cols-[1fr_1.05fr] wide:gap-20">
          {/*
           * Cut to 4:3 in prep rather than left to `object-cover`: the original
           * is a 4:5 portrait, so the frame throws away a third of its height,
           * and a centred crop takes the top off the figure's head. Anchored to
           * hold the horizon and the whole seated figure.
           */}
          <Frame src="/images/about/horizon.jpg" ratio="aspect-[4/3]" />
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

      {/* Services */}
      <Band className="bg-limestone/30">
        <SectionIntro
          eyebrow="Our Services"
          title={
            <>
              Everything you need to grow,
              <br className="hidden wide:block" /> handled by one team.
            </>
          }
          sub="From paid media and search to websites, CRM and creative — the full marketing system a Dubai brand needs to generate demand and convert it into revenue."
        />
        <CardGrid columns={3}>
          {services.map((service, i) => (
            <Card
              key={service.slug}
              href={`/services/${service.slug}`}
              badge={service.num}
              title={service.name}
              titleAs="h3"
              desc={service.descriptor}
              action="Learn more"
              image={serviceImages[service.slug]}
              delay={i * 60}
            />
          ))}
        </CardGrid>
      </Band>

      {/* What makes us different — the engagement, as the reference frames it */}
      <Band>
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
