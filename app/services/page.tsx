import type { Metadata } from "next";
import Link from "next/link";
import { CallToAction, Container, PageHeader } from "@/components/ui";
import { services } from "@/lib/site";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Performance marketing, SEO and content, website development and CRO, CRM integration, and brand and creative — the full marketing system for Dubai brands.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Digital marketing services in Dubai"
        title="The full marketing system, or any part of it."
        standfirst="Shario delivers the full marketing system a Dubai brand needs to generate demand and convert it into revenue. You can engage one service or the entire funnel."
      />

      <section className="border-b border-rule">
        <Container>
          {services.map((service, i) => (
            <Link
              key={service.slug}
              href={`/services/${service.slug}`}
              className="group block border-b border-rule py-14 transition-colors duration-500 last:border-b-0 hover:bg-limestone/35 md:py-16"
            >
              <div className="grid gap-6 lg:grid-cols-12 lg:gap-12">
                <div className="lg:col-span-5">
                  <p className="label-sm text-carbon-40" aria-hidden="true">
                    {String(i + 1).padStart(2, "0")} /{" "}
                    {String(services.length).padStart(2, "0")}
                  </p>
                  <h2 className="title reveal mt-6 text-[clamp(1.9rem,3.6vw,2.9rem)]">
                    {service.title}
                  </h2>
                </div>

                <div className="lg:col-span-6 lg:col-start-7">
                  <p className="lede reveal text-carbon" data-delay="70">
                    {service.summary}
                  </p>
                  <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2">
                    {service.includes.map((item) => (
                      <li key={item} className="label-sm text-carbon-40">
                        {item}
                      </li>
                    ))}
                  </ul>
                  <span className="label mt-8 inline-flex items-center gap-3 text-carbon">
                    Read more
                    <span
                      aria-hidden="true"
                      className="inline-block transition-transform duration-500 group-hover:translate-x-1.5"
                    >
                      →
                    </span>
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </Container>
      </section>

      <CallToAction
        title="Tell us your goal and we will tell you which services get you there."
        body="Bring the number you need to hit. We will map the shortest route to it and say plainly what we would not bother doing."
      />
    </>
  );
}
