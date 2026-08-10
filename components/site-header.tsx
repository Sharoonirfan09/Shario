"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { nav, site } from "@/lib/site";

/**
 * Sticky translucent nav, and the full-screen overlay it collapses to below
 * 880px — both exactly as the design handoff sets them.
 *
 * The wordmark is typeset in Cormorant Garamond rather than served as an
 * image, which is what the handoff specifies (`README.md` — "Logo is
 * wordmark-only, no logomark/icon file provided"). `public/brand/wordmark.png`
 * remains available if the printed lockup is preferred later.
 */
export function SiteHeader() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  // Reset on navigation. Adjusting state during render is the supported way to
  // respond to a changed input, and it also covers browser back/forward.
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setMenuOpen(false);
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

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-carbon/10 bg-porcelain/92 backdrop-blur-[14px]">
        <a
          href="#main"
          className="label sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:bg-carbon focus:px-4 focus:py-2 focus:text-porcelain"
        >
          Skip to content
        </a>

        <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-8 px-6 py-5 wide:px-12 wide:py-[22px]">
          <Link
            href="/"
            aria-label={`${site.name} — home`}
            className="shrink-0 whitespace-nowrap font-display text-2xl font-medium tracking-[0.14em] transition-opacity duration-500 hover:opacity-70"
          >
            SHARIO
          </Link>

          {/* Desktop navigation */}
          <nav
            aria-label="Primary"
            className="hidden items-center gap-[clamp(20px,3vw,40px)] wide:flex"
          >
            {nav.map((item) => {
              // Industries and Insights are homepage anchors, never a route.
              // Services and Work stay marked across their detail pages.
              const active =
                !item.href.startsWith("/#") && pathname.startsWith(item.href);

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
              href="/contact"
              className="shrink-0 whitespace-nowrap rounded-full border border-carbon px-[22px] py-3 text-[11px] uppercase tracking-[0.08em] transition-colors duration-500 hover:bg-carbon hover:text-porcelain"
            >
              Start a Conversation
            </Link>
          </nav>

          {/* Mobile trigger — the handoff's two-rule mark */}
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label="Open menu"
            className="flex cursor-pointer flex-col gap-[5px] p-2 wide:hidden"
          >
            <span className="block h-px w-[26px] bg-carbon" />
            <span className="block h-px w-[26px] bg-carbon" />
          </button>
        </div>
      </header>

      {/* Full-screen overlay menu */}
      {menuOpen && (
        <div
          id="mobile-menu"
          className="fixed inset-0 z-[200] flex flex-col bg-carbon text-porcelain wide:hidden"
        >
          {/*
           * The wordmark and the close control sit on the same padding as the
           * header bar behind them, so opening the menu does not make the logo
           * disappear or jump — it simply changes ground.
           */}
          <div className="flex shrink-0 items-center justify-between px-6 py-5">
            <Link
              href="/"
              onClick={() => setMenuOpen(false)}
              aria-label={`${site.name} — home`}
              className="font-display text-2xl font-medium tracking-[0.14em] text-porcelain"
            >
              SHARIO
            </Link>
            <button
              type="button"
              onClick={() => setMenuOpen(false)}
              // Padded for the touch target, pulled back by an equal negative
              // margin so it cannot grow the row and nudge the wordmark down.
              className="-my-2 cursor-pointer p-2 text-sm tracking-[0.1em] text-porcelain"
            >
              CLOSE
            </button>
          </div>

          <div className="flex flex-1 flex-col justify-center gap-7 overflow-y-auto px-10 pb-16">
            <nav aria-label="Primary" className="flex flex-col gap-7">
              {nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="font-display text-[2.375rem] leading-none text-porcelain"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <Link
              href="/contact"
              onClick={() => setMenuOpen(false)}
              className="mt-5 border-t border-porcelain/25 py-3.5 text-xs uppercase tracking-[0.1em] text-mist"
            >
              Start a Conversation →
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
