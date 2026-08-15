"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import type { Locale } from "@/lib/locale";
import { localizedPath } from "@/lib/locale";
import { cta, nav, services, servicesByCategory, site } from "@/lib/site";

/**
 * Sticky nav with a Services dropdown, and the full-screen overlay it
 * collapses to below 880px.
 *
 * The dropdown follows the reference site the client supplied: the service
 * catalogue is the thing visitors navigate by, so it is reachable from every
 * page rather than only from the index. It opens on hover for pointers and on
 * click for keyboard and touch, and closes on Escape or focus leaving it.
 *
 * `locale` (default `"en"`) is the one addition for the Arabic site:
 * `app/(en)/layout.tsx` renders this with no prop, so English is byte-for-
 * byte what it was before this existed. `app/ar/layout.tsx` passes
 * `locale="ar"`, which swaps nav labels/hrefs, drops the Latin-only
 * `uppercase`/`tracking-` treatment (a no-op-but-still-wrong thing to leave
 * on Arabic script — letter-spacing above zero visibly breaks Arabic's
 * contextual glyph joining, the same reason `ArabicStatement` avoids it),
 * and adds the EN↔AR switcher.
 */
export function SiteHeader({ locale = "en" }: { locale?: Locale }) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const servicesRef = useRef<HTMLDivElement>(null);
  const isAr = locale === "ar";

  /*
   * Every page opens on a dark hero — a photograph or a carbon type band — and
   * the bar overlays it, so at the top of the page it carries no ground of its
   * own and sets its type in Porcelain. Past the fold it takes the Porcelain
   * ground and Carbon type it needs to stay legible over the body.
   *
   * Without this the bar rendered as a cream slab above the hero, which read as
   * a gap in the page rather than as navigation.
   */
  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 24);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // The overlay menu paints its own carbon ground, so the bar behind it must
  // not also be transparent or the wordmark doubles up.
  const overHero = !scrolled && !menuOpen;

  /*
   * Home opens on a light Limestone split hero; the rest open dark. Derived
   * from the route rather than measured from the DOM so the server and the
   * first client paint agree — reading it after mount made the bar flip colour
   * a frame late on every navigation. Add a route here whenever a page moves to
   * `SplitHero`. `/ar` is Arabic's Home — same `SplitHero`, same reasoning.
   */
  const lightHero = pathname === "/" || pathname === "/ar";

  /**
   * Three states, matching what a visitor actually sees behind the bar:
   *
   * - "transparent-light": at the top of a page whose hero sits on a flat
   *   light ground the bar never leaves — currently only Home's `SplitHero`,
   *   whose photo panel starts below the bar rather than under it (see
   *   `components/ui.tsx`). Carbon ink reads correctly with no backing
   *   colour at all.
   * - "transparent-dark": at the top of every other page, whose hero
   *   (`Hero`/`TypeHero`) fills the whole section with a photograph,
   *   including the strip directly behind the bar. Porcelain ink here
   *   depends on that photo being dark enough right at the top — which is
   *   not guaranteed by the photo itself (a bright wall, direct sun), so
   *   `Hero`/`TypeHero` paint a scrim scoped to the bar's own height,
   *   independent of the wider scrim their own type sits on lower down.
   *   Changing this state's ink without keeping that scrim is what breaks
   *   contrast — the two are one fix, not two.
   * - "scrolled": past the hero, at any scroll depth on any page. A solid,
   *   blurred, near-opaque Porcelain bar with Carbon ink — safe regardless
   *   of whatever is beneath it, so it never needs a per-page or per-section
   *   decision the way the transparent states do.
   */
  const headerState: "transparent-light" | "transparent-dark" | "scrolled" =
    !overHero ? "scrolled" : lightHero ? "transparent-light" : "transparent-dark";
  const lightInk = headerState === "transparent-dark";

  // Reset on navigation. Adjusting state during render is the supported way to
  // respond to a changed input, and it also covers browser back/forward.
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setMenuOpen(false);
    setServicesOpen(false);
  }

  // The overlay covers the document, so the page behind it must not scroll.
  useEffect(() => {
    if (!menuOpen) return;

    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setMenuOpen(false);
    }
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = overflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen]);

  // Escape closes the dropdown and returns focus to its trigger.
  useEffect(() => {
    if (!servicesOpen) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key !== "Escape") return;
      setServicesOpen(false);
      servicesRef.current?.querySelector("button")?.focus();
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [servicesOpen]);

  /**
   * Every string this file owns outright (not sourced from `lib/site.ts`),
   * in one place rather than scattered ternaries through the JSX below.
   * Arabic drops `uppercase tracking-[0.08em]` wherever English nav/label
   * text carries it: `uppercase` is a silent no-op on Arabic script (it has
   * no case), but positive letter-spacing is not — it visibly severs
   * Arabic's contextual glyph joining, so the class has to actually change,
   * not just render harmlessly.
   */
  const copy = isAr
    ? {
        skipToContent: "التخطي إلى المحتوى",
        homeAriaSuffix: "الرئيسية",
        primaryNavLabel: "التنقل الرئيسي",
        servicesFooterNote: "تسويق متكامل، من أول خطوة حتى آخرها.",
        seeAllServices: "عرض جميع الخدمات",
        openMenuAriaLabel: "فتح القائمة",
        closeLabel: "إغلاق",
        theServicesLabel: "الخدمات",
        navLinkClass: "whitespace-nowrap text-sm transition-opacity duration-300 hover:opacity-100",
      }
    : {
        skipToContent: "Skip to content",
        homeAriaSuffix: "home",
        primaryNavLabel: "Primary",
        servicesFooterNote: "Full-funnel marketing, end to end.",
        seeAllServices: "See all services",
        openMenuAriaLabel: "Open menu",
        closeLabel: "CLOSE",
        theServicesLabel: "The Services",
        navLinkClass:
          "whitespace-nowrap text-xs uppercase tracking-[0.08em] transition-opacity duration-300 hover:opacity-100",
      };

  /** `/services` → `/ar/services` etc. — every nav href goes through this in Arabic mode. */
  const href = (path: string) => (isAr ? localizedPath(path, "ar") : path);

  return (
    <>
      <header
        className={`sticky top-0 z-50 border-b transition-colors duration-500 ${
          headerState === "scrolled"
            ? "border-carbon/10 bg-porcelain/92 text-carbon backdrop-blur-[14px]"
            : `border-transparent bg-transparent ${
                headerState === "transparent-light" ? "text-carbon" : "text-porcelain"
              }`
        }`}
      >
        <a
          href="#main"
          className="label sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:bg-carbon focus:px-4 focus:py-2 focus:text-porcelain"
        >
          {copy.skipToContent}
        </a>

        <div className="mx-auto flex h-[var(--header-h)] max-w-[1400px] items-center justify-between gap-8 px-6 wide:px-12">
          <Link
            href={href("/")}
            aria-label={`${site.name} — ${copy.homeAriaSuffix}`}
            className="shrink-0 transition-opacity duration-500 hover:opacity-70"
          >
            <span aria-hidden="true" className="wordmark w-[96px] wide:w-[116px]" />
          </Link>

          {/* Desktop navigation */}
          <nav
            aria-label={copy.primaryNavLabel}
            className="hidden items-center gap-[clamp(20px,3vw,40px)] wide:flex"
          >
            {nav.map((item) => {
              // "/" would `startsWith` on every route, so Home needs an exact
              // match rather than the prefix check the other pages use.
              // Arabic paths carry the `/ar` prefix, so the comparison runs
              // against `href(item.href)`, not the bare English path.
              const itemHref = href(item.href);
              const active =
                item.href === "/"
                  ? pathname === itemHref
                  : pathname.startsWith(itemHref);
              const label = isAr ? item.labelAr : item.label;

              if (item.href === "/services") {
                return (
                  <div
                    key={item.href}
                    ref={servicesRef}
                    className="relative"
                    onMouseEnter={() => setServicesOpen(true)}
                    onMouseLeave={() => setServicesOpen(false)}
                    onBlur={(event) => {
                      if (!event.currentTarget.contains(event.relatedTarget)) {
                        setServicesOpen(false);
                      }
                    }}
                  >
                    {/* Plain text link, matching every other nav item — no
                        toggle glyph beside it. The dropdown still opens on
                        hover (the wrapping div above) for pointers; `onFocus`
                        here is what replaces the old toggle button for
                        keyboard users tabbing through, so removing the icon
                        doesn't cost keyboard access to the menu. */}
                    <Link
                      href={itemHref}
                      aria-current={active ? "page" : undefined}
                      aria-expanded={servicesOpen}
                      onFocus={() => setServicesOpen(true)}
                      className={`${copy.navLinkClass} ${active ? "opacity-100" : "opacity-80"}`}
                    >
                      {label}
                    </Link>

                    {servicesOpen && (
                      <div className="absolute left-1/2 top-full w-[640px] -translate-x-1/2 pt-5">
                        {/* Grouped by category, as the reference's mega menu
                            sets it — two columns of labelled groups. */}
                        {/*
                         * `text-carbon` is not optional: the bar sets
                         * `text-porcelain` while it overlays the hero, and this
                         * panel paints its own Porcelain ground — without an
                         * explicit ink the service names inherit Porcelain and
                         * disappear into it.
                         */}
                        <div className="border border-carbon/12 bg-porcelain p-8 text-carbon shadow-[0_28px_70px_-24px_rgba(37,37,37,0.4)]">
                          <div className="grid grid-cols-2 gap-x-10 gap-y-8">
                            {servicesByCategory().map((group) => (
                              <div key={group.category}>
                                <p
                                  className={`mb-3 flex items-center gap-2.5 text-carbon/50 ${isAr ? "font-arabic text-[0.8125rem]" : "eyebrow"}`}
                                >
                                  <span
                                    aria-hidden="true"
                                    className="h-px w-4 bg-mist"
                                  />
                                  {isAr ? group.categoryAr : group.category}
                                </p>
                                <div className="flex flex-col">
                                  {group.items.map((service) => (
                                    <Link
                                      key={service.slug}
                                      href={href(`/services/${service.slug}`)}
                                      className="group/item -mx-3 flex items-baseline gap-3 border-l-2 border-transparent px-3 py-2.5 transition-colors duration-300 hover:border-mist hover:bg-mist/15"
                                    >
                                      <span className="font-display text-[0.8125rem] text-carbon/40 transition-colors duration-300 group-hover/item:text-carbon/70">
                                        {service.num}
                                      </span>
                                      <span
                                        className={`text-[1.0625rem] text-carbon ${isAr ? "font-arabic" : "font-display"}`}
                                      >
                                        {isAr ? service.nameAr : service.name}
                                      </span>
                                    </Link>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>

                          <div className="mt-7 flex items-center justify-between gap-6 border-t border-carbon/12 pt-6">
                            <p className="text-[0.8125rem] text-carbon/60">
                              {copy.servicesFooterNote}
                            </p>
                            <Link
                              href={itemHref}
                              className={`group/all flex shrink-0 items-center gap-2 text-carbon/70 transition-colors duration-300 hover:text-carbon ${isAr ? "font-arabic text-[0.8125rem]" : "eyebrow"}`}
                            >
                              {copy.seeAllServices}
                              <span
                                aria-hidden="true"
                                className={`transition-transform duration-300 ${isAr ? "group-hover/all:-translate-x-1" : "group-hover/all:translate-x-1"}`}
                              >
                                {isAr ? "←" : "→"}
                              </span>
                            </Link>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <Link
                  key={item.href}
                  href={itemHref}
                  aria-current={active ? "page" : undefined}
                  className={`${copy.navLinkClass} ${active ? "opacity-100" : "opacity-80"}`}
                >
                  {label}
                </Link>
              );
            })}

            {/* Language switcher — one more nav item, not a separate UI
                element, so it inherits the same opacity/hover treatment
                rather than competing for attention. Links to this exact
                page's equivalent in the other language, not always Home. */}
            <div className="flex shrink-0 items-center gap-1.5 text-xs">
              <Link
                href={localizedPath(pathname, "en")}
                aria-current={!isAr ? "page" : undefined}
                className={`transition-opacity duration-300 hover:opacity-100 ${!isAr ? "opacity-100" : "opacity-60"}`}
              >
                EN
              </Link>
              <span aria-hidden="true" className="opacity-40">
                |
              </span>
              <Link
                href={localizedPath(pathname, "ar")}
                aria-current={isAr ? "page" : undefined}
                className={`transition-opacity duration-300 hover:opacity-100 ${isAr ? "opacity-100" : "opacity-60"}`}
              >
                AR
              </Link>
            </div>

            <a
              href={cta.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`shrink-0 whitespace-nowrap rounded-full border px-[22px] py-3 text-[11px] transition-colors duration-500 ${isAr ? "" : "uppercase tracking-[0.08em]"} ${
                lightInk
                  ? "border-porcelain bg-porcelain text-carbon hover:border-mist hover:bg-mist"
                  : "border-carbon bg-carbon text-porcelain hover:bg-black"
              }`}
            >
              {isAr ? cta.labelAr : cta.label}
            </a>
          </nav>

          {/* Mobile trigger */}
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={copy.openMenuAriaLabel}
            className="flex cursor-pointer flex-col gap-[5px] p-2 wide:hidden"
          >
            <span
              className={`block h-px w-[26px] transition-colors duration-500 ${
                lightInk ? "bg-porcelain" : "bg-carbon"
              }`}
            />
            <span
              className={`block h-px w-[26px] transition-colors duration-500 ${
                lightInk ? "bg-porcelain" : "bg-carbon"
              }`}
            />
          </button>
        </div>
      </header>

      {/* Full-screen overlay menu */}
      {menuOpen && (
        <div
          id="mobile-menu"
          dir={isAr ? "rtl" : "ltr"}
          className={`fixed inset-0 z-[200] flex flex-col bg-carbon text-porcelain wide:hidden ${isAr ? "font-arabic" : ""}`}
        >
          <div className="flex shrink-0 items-center justify-between px-6 py-5">
            <Link
              href={href("/")}
              onClick={() => setMenuOpen(false)}
              aria-label={`${site.name} — ${copy.homeAriaSuffix}`}
              className="text-porcelain"
            >
              <span aria-hidden="true" className="wordmark w-[96px] wide:w-[116px]" />
            </Link>
            <div className="flex items-center gap-5">
              {/* Same switcher as desktop, relocated here rather than
                  crowding the collapsed mobile bar — the current page's
                  equivalent in the other language, not always Home. */}
              <div className="flex items-center gap-1.5 text-xs">
                <Link
                  href={localizedPath(pathname, "en")}
                  onClick={() => setMenuOpen(false)}
                  aria-current={!isAr ? "page" : undefined}
                  className={!isAr ? "opacity-100" : "opacity-60"}
                >
                  EN
                </Link>
                <span aria-hidden="true" className="opacity-40">
                  |
                </span>
                <Link
                  href={localizedPath(pathname, "ar")}
                  onClick={() => setMenuOpen(false)}
                  aria-current={isAr ? "page" : undefined}
                  className={isAr ? "opacity-100" : "opacity-60"}
                >
                  AR
                </Link>
              </div>
              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                className="-my-2 cursor-pointer p-2 text-sm tracking-[0.1em] text-porcelain"
              >
                {copy.closeLabel}
              </button>
            </div>
          </div>

          <div className="flex flex-1 flex-col gap-8 overflow-y-auto px-8 pb-16 pt-6">
            <nav aria-label={copy.primaryNavLabel} className="flex flex-col gap-6">
              {nav.map((item) => (
                <Link
                  key={item.href}
                  href={href(item.href)}
                  onClick={() => setMenuOpen(false)}
                  className={`text-[2.125rem] leading-none text-porcelain ${isAr ? "font-arabic font-bold" : "font-display"}`}
                >
                  {isAr ? item.labelAr : item.label}
                </Link>
              ))}
            </nav>

            {/* The catalogue, so a phone reaches a service in one tap too. */}
            <div className="border-t border-porcelain/20 pt-6">
              <p className={`mb-4 text-porcelain/50 ${isAr ? "font-arabic text-[0.8125rem]" : "label-sm"}`}>
                {copy.theServicesLabel}
              </p>
              <div className="flex flex-col gap-3.5">
                {services.map((service) => (
                  <Link
                    key={service.slug}
                    href={href(`/services/${service.slug}`)}
                    onClick={() => setMenuOpen(false)}
                    className="flex items-baseline gap-3 text-[0.9375rem] text-porcelain/80"
                  >
                    <span className="font-display text-xs text-porcelain/40">
                      {service.num}
                    </span>
                    <span className={isAr ? "font-arabic" : ""}>
                      {isAr ? service.nameAr : service.name}
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            <a
              href={cta.href}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMenuOpen(false)}
              className={`mt-auto rounded-full border border-porcelain bg-porcelain px-8 py-4 text-center text-[11px] text-carbon ${isAr ? "" : "uppercase tracking-[0.08em]"}`}
            >
              {isAr ? cta.labelAr : cta.label}
            </a>
          </div>
        </div>
      )}
    </>
  );
}
