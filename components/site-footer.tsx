import Link from "next/link";
import { SocialIcon } from "@/components/social-icons";
import { nav, services, site, social } from "@/lib/site";

/**
 * Dark four-column footer.
 *
 * The "Symphony of Identity" line that used to sit here belonged to the
 * creative-studio positioning and retired with it. The Studio column is now
 * split in two — the services, which is what visitors navigate to from a
 * footer, and the pages. The Arabic lockup is back, though, as the site's
 * closing signature — large, Mist-toned and bled off the bottom-right
 * corner — large and in Porcelain rather than Mist, a lighter touch than a
 * saturated colour needs at this size, and sized to actually read rather
 * than disappear into the Carbon ground the way a near-invisible watermark
 * would.
 */
export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden bg-carbon text-porcelain">
      <span
        aria-hidden="true"
        className="wordmark-ar pointer-events-none absolute -bottom-10 -right-8 z-0 w-64 text-porcelain/[0.14] wide:-bottom-16 wide:-right-10 wide:w-[26rem]"
      />
      <div className="relative z-10 mx-auto max-w-[1400px] px-6 pb-8 pt-14 wide:px-12 wide:pb-10 wide:pt-[90px]">
        <div className="grid gap-10 pb-14 wide:grid-cols-[1.4fr_1fr_1fr_1.1fr]">
          <div>
            {/* No surrounding link to carry an `aria-label` here, so the name
                stays in the markup for screen readers behind the mark. */}
            <p>
              <span className="sr-only">SHARIO</span>
              <span aria-hidden="true" className="wordmark w-[126px]" />
            </p>
            <p className="mt-4 max-w-[240px] font-body text-base italic text-porcelain/70">
              {site.tagline}
            </p>
            <p className="mt-5 max-w-[240px] text-[0.8125rem] leading-[1.7] text-porcelain/50">
              Founder-led digital marketing in Dubai.
            </p>
          </div>

          <FooterColumn title="Services">
            {services.map((service) => (
              <FooterLink
                key={service.slug}
                href={`/services/${service.slug}`}
                label={service.name}
              />
            ))}
          </FooterColumn>

          <FooterColumn title="Company">
            {nav.map((item) => (
              <FooterLink key={item.href} href={item.href} label={item.label} />
            ))}
          </FooterColumn>

          <FooterColumn title="Contact">
            <a
              href={`mailto:${site.email}`}
              className="break-all text-sm text-porcelain/80 transition-opacity duration-300 hover:opacity-100"
            >
              {site.email}
            </a>
            <a
              href={`tel:${site.phoneHref}`}
              className="text-sm text-porcelain/80 transition-opacity duration-300 hover:opacity-100"
            >
              {site.phone}
            </a>
            <span className="text-sm text-porcelain/80">{site.location}</span>
            <a
              href={site.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-porcelain/80 transition-opacity duration-300 hover:opacity-100"
            >
              LinkedIn
            </a>
          </FooterColumn>
        </div>

        <div className="flex flex-col-reverse items-center gap-6 border-t border-porcelain/15 pt-6 text-xs text-porcelain/50 wide:flex-row wide:justify-between">
          <p>© {new Date().getFullYear()} SHARIO. All rights reserved.</p>

          <div className="flex items-center gap-4">
            {social.map((item) => (
              <a
                key={item.platform}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={item.label}
                className="text-porcelain/60 transition-colors duration-300 hover:text-porcelain"
              >
                <span className="block h-[18px] w-[18px]">
                  <SocialIcon platform={item.platform} />
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="text-sm text-porcelain/80 transition-opacity duration-300 hover:opacity-100"
    >
      {label}
    </Link>
  );
}

function FooterColumn({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-3">
      <p className="mb-2 text-[11px] uppercase tracking-[0.1em] text-porcelain/50">
        {title}
      </p>
      {children}
    </div>
  );
}
