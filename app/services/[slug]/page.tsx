import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Faq } from "@/components/faq";
import {
  Band,
  Breadcrumb,
  Card,
  CardGrid,
  CtaBand,
  DotList,
  Figure,
  Heading,
  PillLink,
  SectionIntro,
  TypeHero,
} from "@/components/ui";
import { cta, getService, homeFaqs, services, site } from "@/lib/site";

/** Every service page is known at build time, so prerender them. */
export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/services/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};

  return {
    title: service.name,
    description: service.metaDescription,
    alternates: { canonical: `/services/${service.slug}` },
    openGraph: {
      title: `${service.name} — ${site.name}`,
      description: service.metaDescription,
    },
  };
}

export default async function ServicePage({
  params,
}: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const related = services.filter((s) => s.slug !== service.slug).slice(0, 3);

  return (
    <>
      <TypeHero
        src={service.heroImage}
        tone="carbon"
        eyebrow={service.category}
        title={service.title}
        subhead={service.lead}
        breadcrumb={
          <Breadcrumb
            items={[
              { href: "/", label: "Home" },
              { href: "/services", label: "Services" },
              { label: service.name },
            ]}
          />
        }
      />

      {/* What you get. The heading takes the service name unchanged —
          lower-casing it turns "SEO & Content" into "seo & content". */}
      <Band>
        <SectionIntro
          eyebrow="What You Get"
          title={`How we deliver ${service.name}.`}
          sub={service.subhead}
        />
        <CardGrid columns={4}>
          {service.benefits.map((benefit, i) => (
            <Card
              key={benefit.title}
              badge={String(i + 1).padStart(2, "0")}
              title={benefit.title}
              titleAs="h3"
              desc={benefit.desc}
              delay={i * 60}
            />
          ))}
        </CardGrid>
      </Band>

      {/* Scope and deliverables, opened by this page's one photograph */}
      <Band className="bg-limestone/30">
        {/*
         * A pair, never a single full-width band. Each is rendered at its own
         * pixel dimensions so nothing is cropped, and the two in a row share a
         * ratio so their bottoms line up.
         */}
        <div className="mb-14 grid gap-8 wide:mb-20 wide:grid-cols-2 wide:gap-10">
          {service.images.map((image) => (
            <Figure
              key={image.src}
              src={image.src}
              width={image.width}
              height={image.height}
              label={image.label}
              caption={image.caption}
              sizes="(min-width: 880px) 46vw, 100vw"
            />
          ))}
        </div>
        <div className="grid gap-14 wide:grid-cols-2 wide:gap-20">
          <div>
            <p className="eyebrow flex items-center gap-3 text-carbon/55">
              <span aria-hidden="true" className="h-px w-6 bg-mist" />
              The Work
            </p>
            <Heading scale="sm" className="mb-8 mt-5">
              What we do.
            </Heading>
            <DotList items={service.whatWeDo} columns={1} />
          </div>
          <div>
            <p className="eyebrow flex items-center gap-3 text-carbon/55">
              <span aria-hidden="true" className="h-px w-6 bg-mist" />
              Deliverables
            </p>
            <Heading scale="sm" className="mb-8 mt-5">
              What you receive.
            </Heading>
            <DotList
              items={service.deliverables}
              columns={1}
              accent={false}
            />
          </div>
        </div>
      </Band>

      {/* Related services */}
      <Band>
        <SectionIntro
          eyebrow="Keep Going"
          title="Related services."
          align="left"
          scale="sm"
        />
        <CardGrid columns={3}>
          {related.map((item, i) => (
            <Card
              key={item.slug}
              href={`/services/${item.slug}`}
              badge={item.num}
              title={item.name}
              titleAs="h3"
              desc={item.descriptor}
              action="Explore"
              delay={i * 60}
            />
          ))}
        </CardGrid>
      </Band>

      {/* FAQ — the same 26 questions as the homepage, not this service's own
          four, so every service page shares one FAQ source and one set of
          answers rather than each carrying a different subset. */}
      <Band className="bg-limestone/30">
        <SectionIntro eyebrow="FAQ" title="Questions, answered." />
        <div className="mx-auto max-w-[880px]">
          <Faq items={homeFaqs} answerClassName="font-body" />
        </div>
      </Band>

      <CtaBand
        title={`${service.ctaTitle[0]} ${service.ctaTitle[1]}`}
        sub="Book a free call and we will come back with a clear, no-obligation plan."
      >
        <PillLink
          href={`${cta.href}?service=${encodeURIComponent(service.name)}`}
          tone="solid"
          size="lg"
        >
          {cta.label}
        </PillLink>
      </CtaBand>
    </>
  );
}
