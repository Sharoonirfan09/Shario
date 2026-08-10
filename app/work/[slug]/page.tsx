import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Band,
  Container,
  Eyebrow,
  Frame,
  Hero,
  MarkerColumns,
} from "@/components/ui";
import { getCaseStudy, nextCaseStudy, site, work } from "@/lib/site";

export function generateStaticParams() {
  return work.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) return {};

  return {
    title: study.title,
    description: study.metaDescription,
    alternates: { canonical: `/work/${study.slug}` },
    openGraph: {
      title: `${study.title} — ${site.name}`,
      description: study.metaDescription,
    },
  };
}

export default async function CaseStudyPage({
  params,
}: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) notFound();

  const next = nextCaseStudy(study.slug);

  const meta = [
    { label: "Client", value: study.client },
    { label: "Industry", value: study.industry },
    { label: "Scope", value: study.scope },
    { label: "Year", value: study.year },
  ];

  return (
    <>
      <Hero
        src={study.hero}
        eyebrow={study.category}
        title={`${study.title}.`}
        scale="study"
        priority
      />

      {/* Meta row */}
      <Container className="border-b border-carbon/12 py-9 wide:py-12">
        <dl className="grid grid-cols-2 gap-6 wide:grid-cols-4">
          {meta.map((item) => (
            <div key={item.label}>
              <dt className="mb-2.5 text-[11px] uppercase tracking-[0.1em] text-carbon/50">
                {item.label}
              </dt>
              <dd className="text-[0.9375rem]">{item.value}</dd>
            </div>
          ))}
        </dl>
      </Container>

      {/* Overview */}
      <Band>
        <MarkerColumns marker="Overview" heading="Project overview">
          <p className="reveal mb-7 max-w-[780px] font-display text-[1.75rem] font-normal leading-[1.35] wide:text-[clamp(1.75rem,3vw,2.5rem)]">
            {study.lead}
          </p>
          <p
            className="reveal max-w-[680px] font-body text-[1.1875rem] leading-[1.75] text-carbon/80"
            data-delay="120"
          >
            {study.body}
          </p>
        </MarkerColumns>
      </Band>

      {/* Gallery — one wide frame over a pair */}
      <Container className="flex flex-col gap-5 pb-16 wide:gap-7 wide:pb-[clamp(5rem,9vw,8.75rem)]">
        <div className="reveal">
          <Frame
            src={study.gallery.wide}
            ratio="aspect-[4/3] wide:aspect-[21/9]"
            sizes="100vw"
          />
        </div>
        <div className="grid gap-5 wide:grid-cols-2 wide:gap-7">
          <div className="reveal">
            <Frame
              src={study.gallery.left}
              ratio="aspect-[4/5]"
              sizes="(min-width: 880px) 50vw, 100vw"
            />
          </div>
          <div className="reveal" data-delay="120">
            <Frame
              src={study.gallery.right}
              ratio="aspect-[4/5]"
              sizes="(min-width: 880px) 50vw, 100vw"
            />
          </div>
        </div>
      </Container>

      {/* Approach & Outcome */}
      <Band tone="carbon">
        <div className="grid gap-6 wide:grid-cols-[260px_1fr] wide:gap-[60px]">
          <Eyebrow tone="carbon">Approach &amp; Outcome</Eyebrow>
          <blockquote className="reveal max-w-[780px] font-body text-2xl italic leading-[1.5] wide:text-[2rem]">
            “{study.quote}”
          </blockquote>
        </div>
      </Band>

      {/* Next project */}
      <section>
        <Container className="py-16 text-center wide:py-[clamp(5rem,9vw,8.75rem)]">
          <Eyebrow className="mb-5">Next Project</Eyebrow>
          <Link
            href={`/work/${next.slug}`}
            className="font-display text-[2rem] font-normal transition-opacity duration-500 hover:opacity-60 wide:text-[2.75rem]"
          >
            {next.title} <span aria-hidden="true">→</span>
          </Link>
        </Container>
      </section>
    </>
  );
}
