/**
 * The whole EN/AR/RU system in one fact: Arabic routes live under `/ar`,
 * Russian routes live under `/ru`, English is everything else (unprefixed —
 * see `app/(en)` for why). Every other locale-aware piece (header, footer,
 * language switcher, hreflang) derives from these two functions rather than
 * re-deriving the prefix check itself.
 */
export type Locale = "en" | "ar" | "ru";

/** Every non-English locale's URL prefix, keyed by `Locale`. */
const PREFIXES: Partial<Record<Locale, string>> = { ar: "/ar", ru: "/ru" };

export function localeFromPathname(pathname: string): Locale {
  for (const [locale, prefix] of Object.entries(PREFIXES) as [Locale, string][]) {
    if (pathname === prefix || pathname.startsWith(`${prefix}/`)) return locale;
  }
  return "en";
}

/** Strips a leading locale prefix, if present. The bare prefix (no trailing path) becomes `/`. */
function withoutLocale(pathname: string): string {
  for (const prefix of Object.values(PREFIXES)) {
    if (pathname === prefix) return "/";
    if (pathname.startsWith(`${prefix}/`)) return pathname.slice(prefix.length);
  }
  return pathname;
}

/**
 * The equivalent URL for the same page in `target`'s language — what the
 * header's EN|AR|RU switcher links to, and what each page's
 * `alternates.languages` point at. Query strings (the Insights `?category=`
 * filter) are preserved.
 */
export function localizedPath(pathname: string, target: Locale): string {
  const [path, search] = pathname.split("?");
  const bare = withoutLocale(path);
  const prefix = PREFIXES[target];
  const localized = prefix ? (bare === "/" ? prefix : `${prefix}${bare}`) : bare;
  return search ? `${localized}?${search}` : localized;
}
