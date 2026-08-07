import Image from "next/image";
import Link from "next/link";
import { nav, services, site } from "@/lib/site";

export function SiteFooter() {
  return (
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
              A founder-led digital marketing company in Dubai, building
              marketing systems that produce sales.
            </p>
          </div>

          <nav aria-label="Footer" className="lg:col-span-3">
            <h2 className="label-sm text-carbon-60">Pages</h2>
            <ul className="mt-6 space-y-3">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-[0.98rem] text-carbon transition-opacity duration-300 hover:opacity-55"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-2">
            <h2 className="label-sm text-carbon-60">Services</h2>
            <ul className="mt-6 space-y-3">
              {services.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="text-[0.98rem] leading-snug text-carbon transition-opacity duration-300 hover:opacity-55"
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
  );
}
