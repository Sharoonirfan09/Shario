"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { cta, nav, services, servicesByCategory, site } from "@/lib/site";

/**
 * Sticky nav with a Services dropdown, and the full-screen overlay it
 * collapses to below 880px.
 *
 * The dropdown follows the reference site the client supplied: the service
 * catalogue is the thing visitors navigate by, so it is reachable from every
 * page rather than only from the index. It opens on hover for pointers and on
 * click for keyboard and touch, and closes on Escape or focus leaving it.
 */
export function SiteHeader() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const servicesRef = useRef<HTMLDivElement>(null);

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
   * `SplitHero`.
   */
  const lightHero = pathname === "/";
  const lightInk = overHero && !lightHero;

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

  return (
    <>
      <header
        className={`sticky top-0 z-50 border-b transition-colors duration-500 ${
          overHero
            ? `border-transparent bg-transparent ${
                lightHero ? "text-carbon" : "text-porcelain"
              }`
            : "border-carbon/10 bg-porcelain/92 text-carbon backdrop-blur-[14px]"
        }`}
      >
        <a
          href="#main"
          className="label sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:bg-carbon focus:px-4 focus:py-2 focus:text-porcelain"
        >
          Skip to content
        </a>

        <div className="mx-auto flex h-[var(--header-h)] max-w-[1400px] items-center justify-between gap-8 px-6 wide:px-12">
          <Link
            href="/"
            aria-label={`${site.name} — home`}
            className="shrink-0 transition-opacity duration-500 hover:opacity-70"
          >
            <span aria-hidden="true" className="wordmark w-[116px]" />
          </Link>

          {/* Desktop navigation */}
          <nav
            aria-label="Primary"
            className="hidden items-center gap-[clamp(20px,3vw,40px)] wide:flex"
          >
            {nav.map((item) => {
              const active = pathname.startsWith(item.href);

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
                    <span
                      className={`flex items-center gap-1.5 whitespace-nowrap text-xs uppercase tracking-[0.08em] ${
                        active ? "opacity-100" : "opacity-80"
                      }`}
                    >
                      {/* The label navigates — the reference's "click Services,
                          land on the index" — while the arrow stays a separate
                          toggle so touch and keyboard can still open the
                          dropdown without leaving the page. */}
                      <Link
                        href="/services"
                        aria-current={active ? "page" : undefined}
                        className="transition-opacity duration-300 hover:opacity-100"
                      >
                        {item.label}
                      </Link>
                      <button
                        type="button"
                        onClick={() => setServicesOpen((open) => !open)}
                        aria-expanded={servicesOpen}
                        aria-label="Toggle services menu"
                        className="cursor-pointer p-1 transition-opacity duration-300 hover:opacity-100"
                      >
                        <span
                          aria-hidden="true"
                          className={`block text-[9px] transition-transform duration-300 ${
                            servicesOpen ? "rotate-180" : ""
                          }`}
                        >
                          ▾
                        </span>
                      </button>
                    </span>

                    {servicesOpen && (
                      <div className="absolute left-1/2 top-full w-[620px] -translate-x-1/2 pt-5">
                        {/* Grouped by category, as the reference's mega menu
                            sets it — two columns of labelled groups. */}
                        {/*
                         * `text-carbon` is not optional: the bar sets
                         * `text-porcelain` while it overlays the hero, and this
                         * panel paints its own Porcelain ground — without an
                         * explicit ink the service names inherit Porcelain and
                         * disappear into it.
                         */}
                        <div className="border border-carbon/12 bg-porcelain p-7 text-carbon shadow-[0_24px_60px_-24px_rgba(37,37,37,0.35)]">
                          <div className="grid grid-cols-2 gap-x-8 gap-y-7">
                            {servicesByCategory().map((group) => (
                              <div key={group.category}>
                                <p className="eyebrow mb-3 flex items-center gap-2.5 text-carbon/50">
                                  <span
                                    aria-hidden="true"
                                    className="h-px w-4 bg-mist"
                                  />
                                  {group.category}
                                </p>
                                {group.items.map((service) => (
                                  <Link
                                    key={service.slug}
                                    href={`/services/${service.slug}`}
                                    className="-mx-3 flex items-baseline gap-3 px-3 py-2 transition-colors duration-300 hover:bg-limestone/40"
                                  >
                                    <span className="font-display text-[0.8125rem] text-carbon/40">
                                      {service.num}
                                    </span>
                                    <span className="font-display text-[1.0625rem]">
                                      {service.name}
                                    </span>
                                  </Link>
                                ))}
                              </div>
                            ))}
                          </div>

                          <div className="mt-6 flex items-center justify-between gap-6 border-t border-carbon/12 pt-5">
                            <p className="text-[0.8125rem] text-carbon/60">
                              Full-funnel marketing, end to end.
                            </p>
                            <Link
                              href="/services"
                              className="eyebrow flex shrink-0 items-center gap-2 text-carbon/70 transition-colors duration-300 hover:text-carbon"
                            >
                              See all services
                              <span aria-hidden="true">→</span>
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
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`whitespace-nowrap text-xs uppercase tracking-[0.08em] transition-opacity duration-300 hover:opacity-100 ${
                    active ? "opacity-100" : "opacity-80"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}

            <Link
              href={cta.href}
              className={`shrink-0 whitespace-nowrap rounded-full border px-[22px] py-3 text-[11px] uppercase tracking-[0.08em] transition-colors duration-500 ${
                lightInk
                  ? "border-porcelain bg-porcelain text-carbon hover:border-mist hover:bg-mist"
                  : "border-carbon bg-carbon text-porcelain hover:bg-black"
              }`}
            >
              {cta.label}
            </Link>
          </nav>

          {/* Mobile trigger */}
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label="Open menu"
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
          className="fixed inset-0 z-[200] flex flex-col bg-carbon text-porcelain wide:hidden"
        >
          <div className="flex shrink-0 items-center justify-between px-6 py-5">
            <Link
              href="/"
              onClick={() => setMenuOpen(false)}
              aria-label={`${site.name} — home`}
              className="text-porcelain"
            >
              <span aria-hidden="true" className="wordmark w-[116px]" />
            </Link>
            <button
              type="button"
              onClick={() => setMenuOpen(false)}
              className="-my-2 cursor-pointer p-2 text-sm tracking-[0.1em] text-porcelain"
            >
              CLOSE
            </button>
          </div>

          <div className="flex flex-1 flex-col gap-8 overflow-y-auto px-8 pb-16 pt-6">
            <nav aria-label="Primary" className="flex flex-col gap-6">
              {nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="font-display text-[2.125rem] leading-none text-porcelain"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* The catalogue, so a phone reaches a service in one tap too. */}
            <div className="border-t border-porcelain/20 pt-6">
              <p className="label-sm mb-4 text-porcelain/50">The Services</p>
              <div className="flex flex-col gap-3.5">
                {services.map((service) => (
                  <Link
                    key={service.slug}
                    href={`/services/${service.slug}`}
                    onClick={() => setMenuOpen(false)}
                    className="flex items-baseline gap-3 text-[0.9375rem] text-porcelain/80"
                  >
                    <span className="font-display text-xs text-porcelain/40">
                      {service.num}
                    </span>
                    {service.name}
                  </Link>
                ))}
              </div>
            </div>

            <Link
              href={cta.href}
              onClick={() => setMenuOpen(false)}
              className="mt-auto rounded-full border border-porcelain bg-porcelain px-8 py-4 text-center text-[11px] uppercase tracking-[0.08em] text-carbon"
            >
              {cta.label}
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
