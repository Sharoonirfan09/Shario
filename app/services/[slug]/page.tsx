import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CallToAction, Container, PageHeader } from "@/components/ui";
import { adjacentServices, getService, services, site } from "@/lib/site";

/** All five service pages are known at build time, so prerender them. */
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

  const { previous, next } = adjacentServices(service.slug);
  const others = services.filter((s) => s.slug !== service.slug);

  return (
    <>
      <PageHeader
        eyebrow="Services"
        title={service.title}
        standfirst={service.summary}
      />

      {/* The service itself */}
      <section className="border-b border-rule">
        <Container className="py-24 md:py-32">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-4">
              <p className="label-sm text-carbon-40">What this covers</p>
              <ul className="mt-8">
                {service.includes.map((item, i) => (
                  <li
                    key={item}
                    className="reveal title border-t border-rule py-4 text-[1.3rem]"
                    data-delay={i * 60}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-7 lg:col-start-6">
              <p className="display reveal text-[clamp(1.7rem,3.4vw,2.6rem)]">
                {service.body}
              </p>

              <div className="reveal mt-14 border-t border-rule pt-8" data-delay="120">
                <p className="label-sm text-carbon-40">Engagement</p>
                <p className="lede mt-5 max-w-xl text-carbon-60">
                  Engage this on its own, or as one part of the full funnel.
                  Either way it is measured against pipeline and closed revenue,
                  not activity.
                </p>
                <div className="mt-8">
                  <Link
                    href="/contact"
                    className="label inline-block border border-carbon bg-carbon px-8 py-4 text-porcelain transition-colors duration-500 hover:bg-transparent hover:text-carbon"
                  >
                    Discuss this service
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Walk to the neighbouring services */}
      <section className="border-b border-rule">
        <Container className="py-14">
          <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
            <Link href={`/services/${previous.slug}`} className="group max-w-xs">
              <span className="label-sm text-carbon-40">Previous</span>
              <span className="title mt-3 block text-[1.4rem] transition-opacity duration-300 group-hover:opacity-60">
                <span aria-hidden="true">← </span>
                {previous.name}
              </span>
            </Link>
            <Link
              href={`/services/${next.slug}`}
              className="group max-w-xs sm:text-right"
            >
              <span className="label-sm text-carbon-40">Next</span>
              <span className="title mt-3 block text-[1.4rem] transition-opacity duration-300 group-hover:opacity-60">
                {next.name}
                <span aria-hidden="true"> →</span>
              </span>
            </Link>
          </div>
        </Container>
      </section>

      {/* The rest of the system */}
      <section className="border-b border-rule bg-limestone">
        <Container className="py-24 md:py-28">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-4">
              <p className="label-sm text-carbon-60">The rest of the system</p>
              <h2 className="title reveal mt-7 text-[clamp(1.8rem,3.6vw,2.75rem)]">
                One service, or the entire funnel.
              </h2>
            </div>

            <ul className="lg:col-span-7 lg:col-start-6">
              {others.map((other, i) => (
                <li key={other.slug}>
                  <Link
                    href={`/services/${other.slug}`}
                    className="reveal group flex flex-col gap-1.5 border-t border-limestone-deep py-6 sm:flex-row sm:items-baseline sm:gap-10"
                    data-delay={i * 70}
                  >
                    <span className="title shrink-0 text-[1.4rem] sm:w-[12rem]">
                      {other.name}
                    </span>
                    <span className="text-[0.98rem] text-carbon-60">
                      {other.summary}
                    </span>
                    <span
                      aria-hidden="true"
                      className="label hidden shrink-0 self-center text-carbon-60 transition-transform duration-500 group-hover:translate-x-1.5 sm:block"
                    >
                      →
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      <CallToAction
        title="Tell us your goal and we will tell you which services get you there."
        body="Bring the number you need to hit. We will map the shortest route to it and say plainly what we would not bother doing."
      />
    </>
  );
}
