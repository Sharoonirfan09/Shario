/**
 * The whole EN/AR system in one fact: Arabic routes live under `/ar`,
 * English is everything else (unprefixed — see `app/(en)` for why). Every
 * other locale-aware piece (header, footer, language switcher, hreflang)
 * derives from these two functions rather than re-deriving the `/ar` prefix
 * check itself.
 */
export type Locale = "en" | "ar";

export function localeFromPathname(pathname: string): Locale {
  return pathname === "/ar" || pathname.startsWith("/ar/") ? "ar" : "en";
}

/** Strips a leading `/ar` segment, if present. `/ar` itself (no trailing path) becomes `/`. */
function withoutLocale(pathname: string): string {
  if (pathname === "/ar") return "/";
  if (pathname.startsWith("/ar/")) return pathname.slice(3);
  return pathname;
}

/**
 * The equivalent URL for the same page in `target`'s language — what the
 * header's EN|AR switcher links to, and what each page's `alternates.languages`
 * point at. Query strings (the Insights `?category=` filter) are preserved.
 */
export function localizedPath(pathname: string, target: Locale): string {
  const [path, search] = pathname.split("?");
  const bare = withoutLocale(path);
  const localized = target === "ar" ? (bare === "/" ? "/ar" : `/ar${bare}`) : bare;
  return search ? `${localized}?${search}` : localized;
}
