import Link from "next/link";
import { ObfuscatedEmail } from "@/components/obfuscated-email";
import { SocialIcon } from "@/components/social-icons";
import type { Locale } from "@/lib/locale";
import { localizedPath } from "@/lib/locale";
import { nav, services, site, social } from "@/lib/site";

/**
 * Dark four-column footer.
 *
 * The tagline ("A Symphony of Identity", `site.tagline`) leads the first
 * column as the primary brand line, set larger and italic; the descriptor
 * beneath it is deliberately smaller and lower-opacity so it reads as
 * secondary. Neither carries a trailing period — the tagline never does,
 * anywhere on the site. The Studio column is split in two — the services,
 * which is what visitors navigate to from a footer, and the pages. The
 * Arabic lockup is the site's closing signature — large, Mist-toned and bled
 * off the bottom-right corner — large and in Porcelain rather than Mist, a
 * lighter touch than a saturated colour needs at this size, and sized to
 * actually read rather than disappear into the Carbon ground the way a
 * near-invisible watermark would.
 *
 * `locale` (default `"en"`) mirrors `SiteHeader`'s: `app/(en)/layout.tsx`
 * renders this with no prop (unchanged English output), `app/ar/layout.tsx`
 * passes `locale="ar"`.
 */
export function SiteFooter({ locale = "en" }: { locale?: Locale }) {
  const isAr = locale === "ar";
  const isRu = locale === "ru";
  const href = (path: string) => (isAr || isRu ? localizedPath(path, locale) : path);

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
            <p
              className={`mt-4 max-w-[240px] text-base italic text-porcelain/70 ${isAr ? "font-arabic" : "font-body"}`}
            >
              {isAr ? site.taglineAr : isRu ? site.taglineRu : site.tagline}
            </p>
            <p
              className={`mt-5 max-w-[240px] text-[0.8125rem] leading-[1.7] text-porcelain/50 ${isAr ? "font-arabic" : ""}`}
            >
              {isAr
                ? "تسويق رقمي واستوديو إبداعي في دبي."
                : isRu
                  ? "Цифровой маркетинг и креативная студия в Дубае."
                  : "Digital marketing and creative studio in Dubai."}
            </p>
          </div>

          <FooterColumn title={isAr ? "الخدمات" : isRu ? "Услуги" : "Services"} isAr={isAr}>
            {services.map((service) => (
              <FooterLink
                key={service.slug}
                href={href(`/services/${service.slug}`)}
                label={isAr ? service.nameAr : isRu ? service.nameRu : service.name}
                isAr={isAr}
              />
            ))}
          </FooterColumn>

          <FooterColumn title={isAr ? "الشركة" : isRu ? "Компания" : "Company"} isAr={isAr}>
            {nav.map((item) => (
              <FooterLink
                key={item.href}
                href={href(item.href)}
                label={isAr ? item.labelAr : isRu ? item.labelRu : item.label}
                isAr={isAr}
              />
            ))}
          </FooterColumn>

          <FooterColumn title={isAr ? "تواصل" : isRu ? "Контакты" : "Contact"} isAr={isAr}>
            <ObfuscatedEmail
              user={site.emailUser}
              domain={site.emailDomain}
              className="break-all text-sm text-porcelain/80 transition-opacity duration-300 hover:opacity-100"
            />
            <a
              href={`tel:${site.phoneHref}`}
              className="text-sm text-porcelain/80 transition-opacity duration-300 hover:opacity-100"
              dir="ltr"
            >
              {site.phone}
            </a>
            <span className={`text-sm text-porcelain/80 ${isAr ? "font-arabic" : ""}`}>
              {isAr ? site.locationAr : isRu ? site.locationRu : site.location}
            </span>
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
          <p className={isAr ? "font-arabic" : ""}>
            {isAr
              ? `© ${new Date().getFullYear()} SHARIO. جميع الحقوق محفوظة.`
              : isRu
                ? `© ${new Date().getFullYear()} SHARIO. Все права защищены.`
                : `© ${new Date().getFullYear()} SHARIO. All rights reserved.`}
          </p>

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

function FooterLink({
  href,
  label,
  isAr,
}: {
  href: string;
  label: string;
  isAr?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`text-sm text-porcelain/80 transition-opacity duration-300 hover:opacity-100 ${isAr ? "font-arabic" : ""}`}
    >
      {label}
    </Link>
  );
}

function FooterColumn({
  title,
  isAr,
  children,
}: {
  title: string;
  isAr?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-3">
      <p
        className={`mb-2 text-[11px] text-porcelain/50 ${isAr ? "font-arabic" : "uppercase tracking-[0.1em]"}`}
      >
        {title}
      </p>
      {children}
    </div>
  );
}
