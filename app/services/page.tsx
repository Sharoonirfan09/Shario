import type { Metadata } from "next";
import Link from "next/link";
import { CallToAction, GridPlate, ImagePlate, Plate } from "@/components/ui";
import { services } from "@/lib/site";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Brand strategy, visual identity, creative direction and digital experience — the complete brand system, or any part of it.",
  alternates: { canonical: "/services" },
};

/** Brand Book p29 — the identity on screen. */
const digital = [
  { src: "/images/book/digital-laptop.jpg", caption: "Website" },
  { src: "/images/book/digital-monitor.jpg", caption: "Desktop" },
  { src: "/images/book/digital-tablet.jpg", caption: "Tablet" },
  { src: "/images/book/digital-phone.jpg", caption: "Mobile" },
  { src: "/images/book/digital-instagram.jpg", caption: "Instagram" },
  { src: "/images/book/digital-linkedin.jpg", caption: "LinkedIn" },
];

export default function ServicesPage() {
  return (
    <>
      <ImagePlate
        src="/images/travertine-wall.jpg"
        label="Capabilities"
        footnote="One connected system."
        index="Cover"
        title="The complete system, or any part of it."
        standfirst="Strategy, identity, creative direction and digital experience, as one connected system. Engage a single capability, or the whole of it."
      />

      <Plate
        label="The system"
        footnote="Purpose before decoration."
        index="01 / 02"
      >
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
      </Plate>

      <GridPlate
        label="Identity on screen"
        footnote="Seamless by design."
        index="02 / 02"
        frames={digital}
      />

      <CallToAction
        title="Tell us what the brand needs to become."
        body="We will say plainly which capabilities get it there, and which to leave alone."
      />
    </>
  );
}
