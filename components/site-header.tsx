"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { nav, services } from "@/lib/site";

export function SiteHeader() {
  const pathname = usePathname();
  const [servicesOpen, setServicesOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const servicesRef = useRef<HTMLLIElement>(null);

  // Close both menus whenever the route changes. Adjusting state during render
  // is the supported way to reset on a changed input — an effect here would
  // cause a cascading render, and this also covers browser back/forward.
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setServicesOpen(false);
    setMenuOpen(false);
  }

  // Dismiss the services dropdown on outside click or Escape.
  useEffect(() => {
    if (!servicesOpen) return;

    function onPointerDown(event: PointerEvent) {
      if (!servicesRef.current?.contains(event.target as Node)) {
        setServicesOpen(false);
      }
    }
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setServicesOpen(false);
    }

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [servicesOpen]);

  return (
    <header className="sticky top-0 z-50 border-b border-rule bg-porcelain/92 backdrop-blur-sm">
      <a
        href="#main"
        className="label sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:bg-carbon focus:px-4 focus:py-2 focus:text-porcelain"
      >
        Skip to content
      </a>

      <div className="mx-auto flex max-w-[1440px] items-center justify-between px-gutter py-5">
        <Link
          href="/"
          aria-label="Shario — home"
          className="shrink-0 transition-opacity duration-500 hover:opacity-60"
        >
          <Image
            src="/brand/wordmark.png"
            alt="Shario"
            width={1535}
            height={284}
            priority
            className="h-[15px] w-auto sm:h-[17px]"
          />
        </Link>

        {/* Desktop navigation */}
        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-10">
            {nav.slice(1).map((item) => {
              // Services stays marked while you are on any of its sub-pages.
              const active =
                item.href === "/services"
                  ? pathname.startsWith("/services")
                  : pathname === item.href;

              if (item.href === "/services") {
                return (
                  <li key={item.href} ref={servicesRef} className="relative">
                    <div className="flex items-center gap-1.5">
                      <Link
                        href={item.href}
                        className={`label transition-colors duration-300 hover:text-carbon ${
                          active ? "text-carbon" : "text-carbon-60"
                        }`}
                      >
                        {item.label}
                      </Link>
                      <button
                        type="button"
                        aria-expanded={servicesOpen}
                        aria-controls="services-menu"
                        aria-label="Show all services"
                        onClick={() => setServicesOpen((open) => !open)}
                        className="grid h-4 w-4 place-items-center text-carbon-40 transition-colors duration-300 hover:text-carbon"
                      >
                        <svg
                          viewBox="0 0 10 6"
                          className={`h-[6px] w-[10px] transition-transform duration-300 ${
                            servicesOpen ? "rotate-180" : ""
                          }`}
                          fill="none"
                          aria-hidden="true"
                        >
                          <path
                            d="M1 1l4 4 4-4"
                            stroke="currentColor"
                            strokeWidth="1"
                          />
                        </svg>
                      </button>
                    </div>

                    {servicesOpen && (
                      <div
                        id="services-menu"
                        className="absolute right-0 top-[calc(100%+1.35rem)] w-[22rem] border border-rule bg-porcelain p-7 shadow-[0_1px_40px_rgba(37,37,37,0.06)]"
                      >
                        <p className="label-sm mb-5 text-carbon-40">
                          The full funnel
                        </p>
                        <ul className="space-y-4">
                          {services.map((service) => (
                            <li key={service.slug}>
                              <Link
                                href={`/services/${service.slug}`}
                                className="group block"
                              >
                                <span className="title block text-[1.2rem] transition-colors duration-300 group-hover:text-carbon-60">
                                  {service.name}
                                </span>
                                <span className="mt-0.5 block text-[0.9rem] leading-snug text-carbon-60">
                                  {service.summary}
                                </span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </li>
                );
              }

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`label transition-colors duration-300 hover:text-carbon ${
                      active ? "text-carbon" : "text-carbon-60"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
            <li>
              <Link
                href="/contact"
                className="label border border-carbon px-5 py-2.5 text-carbon transition-colors duration-500 hover:bg-carbon hover:text-porcelain"
              >
                Book a call
              </Link>
            </li>
          </ul>
        </nav>

        {/* Mobile trigger */}
        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          className="label text-carbon lg:hidden"
        >
          {menuOpen ? "Close" : "Menu"}
        </button>
      </div>

      {/* Mobile navigation */}
      {menuOpen && (
        <nav
          id="mobile-menu"
          aria-label="Primary"
          className="border-t border-rule bg-porcelain px-gutter py-8 lg:hidden"
        >
          <ul className="space-y-5">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="title block text-[1.9rem] text-carbon"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <ul className="mt-8 space-y-3 border-t border-rule pt-7">
            {services.map((service) => (
              <li key={service.slug}>
                <Link
                  href={`/services/${service.slug}`}
                  className="label text-carbon-60"
                >
                  {service.name}
                </Link>
              </li>
            ))}
          </ul>

          <Link
            href="/contact"
            className="label mt-8 inline-block border border-carbon px-6 py-3 text-carbon"
          >
            Book a strategy call
          </Link>
        </nav>
      )}
    </header>
  );
}
