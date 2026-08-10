import Link from "next/link";
import { footerLinks, site } from "@/lib/site";

/** Dark four-column footer, shared by every page in the design handoff. */
export function SiteFooter() {
  return (
    <footer className="bg-carbon text-porcelain">
      <div className="mx-auto max-w-[1400px] px-6 pb-8 pt-14 wide:px-12 wide:pb-10 wide:pt-[90px]">
        <div className="grid gap-10 pb-14 wide:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <p className="font-display text-[1.625rem] tracking-[0.14em]">
              SHARIO
            </p>
            <p className="mt-4 max-w-[220px] font-body text-base italic text-porcelain/70">
              {site.tagline}
            </p>
            {/*
             * The Arabic lockup. `dir` is set explicitly so the phrase renders
             * right-to-left inside an `lang="en"` document rather than relying
             * on the bidi algorithm's first-strong character alone.
             */}
            <p
              lang="ar"
              dir="rtl"
              className="mt-5 text-[1.375rem] text-porcelain/30"
            >
              {site.taglineAr}
            </p>
          </div>

          <FooterColumn title="Studio">
            {footerLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm text-porcelain/80 transition-opacity duration-300 hover:opacity-100"
              >
                {item.label}
              </Link>
            ))}
          </FooterColumn>

          <FooterColumn title="Contact">
            <a
              href={`mailto:${site.email}`}
              className="text-sm text-porcelain/80 transition-opacity duration-300 hover:opacity-100"
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
          </FooterColumn>

          <FooterColumn title="Follow">
            <a
              href={site.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-porcelain/80 transition-opacity duration-300 hover:opacity-100"
            >
              Instagram
            </a>
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

        {/* The handoff's bottom bar also carries Privacy and Terms. Those pages
            do not exist, so the links are omitted rather than shipped as 404s. */}
        <div className="border-t border-porcelain/15 pt-6 text-xs text-porcelain/50">
          <p>© {new Date().getFullYear()} SHARIO. All rights reserved.</p>
        </div>
      </div>
    </footer>
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
