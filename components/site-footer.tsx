import Image from "next/image";
import Link from "next/link";
import { nav, services, site } from "@/lib/site";

export function SiteFooter() {
  return (
    <>
      {/*
       * The back cover — Brand Book p32. A full-bleed field, the mark centred
       * over it with the bilingual tagline, the location and the contact line.
       * The book closes on this, so the site does too.
       */}
      <section className="relative border-t border-rule">
        <Image
          src="/images/book/corridor-dusk.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-carbon/70" />

        <div className="relative mx-auto flex min-h-[78svh] max-w-[1440px] flex-col items-center justify-center px-gutter py-24 text-center text-porcelain">
          <Image
            src="/brand/wordmark.png"
            alt="Shario"
            width={1535}
            height={284}
            className="h-[26px] w-auto brightness-0 invert sm:h-[30px]"
          />
          <p className="title mt-8 text-[clamp(1.15rem,2.2vw,1.6rem)]">
            {site.tagline}
          </p>
          <p
            className="title mt-4 text-[clamp(1rem,1.9vw,1.35rem)] text-porcelain/70"
            dir="rtl"
            lang="ar"
          >
            {site.taglineAr}
          </p>

          <p className="label-sm mt-12 text-porcelain/60">
            Dubai · United Arab Emirates
          </p>
          <p className="label-sm mt-5 text-porcelain/50">
            {site.website} · {site.email} · {site.phone}
          </p>
        </div>
      </section>

      <footer className="border-t border-rule bg-limestone text-carbon">
      <div className="mx-auto max-w-[1440px] px-gutter py-20">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Image
              src="/brand/wordmark.png"
              alt="Shario"
              width={1535}
              height={284}
              className="h-[19px] w-auto"
            />
            <p className="title mt-7 max-w-sm text-[1.5rem] italic text-carbon">
              A Symphony of Identity.
            </p>
            <p className="mt-5 max-w-sm text-[0.95rem] leading-relaxed text-carbon-60">
              A boutique creative studio in Dubai, composing coherent brand
              identities across strategy, design and technology.
            </p>
          </div>

          <nav aria-label="Footer" className="lg:col-span-3">
            <h2 className="label-sm text-carbon-60">Pages</h2>
            <ul className="mt-6 space-y-3">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="inline-block py-1.5 text-[0.98rem] text-carbon transition-opacity duration-300 hover:opacity-55"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-2">
            <h2 className="label-sm text-carbon-60">Capabilities</h2>
            <ul className="mt-6 space-y-3">
              {services.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="inline-block py-1.5 text-[0.98rem] leading-snug text-carbon transition-opacity duration-300 hover:opacity-55"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h2 className="label-sm text-carbon-60">Get in touch</h2>
            <ul className="mt-6 space-y-3 text-[0.98rem]">
              <li>{site.location}</li>
              <li>
                <a
                  href={`tel:${site.phoneHref}`}
                  className="transition-opacity duration-300 hover:opacity-55"
                >
                  {site.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="break-all transition-opacity duration-300 hover:opacity-55"
                >
                  {site.email}
                </a>
              </li>
              <li>
                <a
                  href={site.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-opacity duration-300 hover:opacity-55"
                >
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-limestone-deep pt-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="label-sm text-carbon-60">
            © {new Date().getFullYear()} Shario · Dubai, UAE
          </p>
          <p className="label-sm text-carbon-60">
            Brand strategy · Digital experience · Creative direction
          </p>
          </div>
        </div>
      </footer>
    </>
  );
}
