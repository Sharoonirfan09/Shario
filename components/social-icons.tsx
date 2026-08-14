/**
 * Hand-drawn, single-weight line glyphs rather than each platform's full
 * colour mark — a set of flat brand badges would fight the site's own
 * hairline-and-type visual language far more than a plain-text "Instagram"
 * link would. Every icon shares one viewBox, stroke width and cap style so
 * the row reads as one family regardless of how different the source marks
 * are.
 */
const strokeProps = {
  fill: "none" as const,
  stroke: "currentColor" as const,
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const icons = {
  facebook: (
    <svg viewBox="0 0 24 24" {...strokeProps}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M13.6 9.3h-1.1c-.8 0-1.2.4-1.2 1.2V12h2.2l-.3 2.1h-1.9v5.4" />
    </svg>
  ),
  instagram: (
    <svg viewBox="0 0 24 24" {...strokeProps}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.2" cy="6.8" r="0.6" fill="currentColor" stroke="none" />
    </svg>
  ),
  threads: (
    <svg viewBox="0 0 24 24" {...strokeProps}>
      <path d="M8.7 15.3c0 2 1.5 3.2 3.5 3.2 2.9 0 5.3-2 5.3-5.6v-1.8c0-4-2.4-6.4-5.9-6.4-3.2 0-5.6 2-6.1 4.9" />
      <circle cx="12.4" cy="12.1" r="2.5" />
    </svg>
  ),
  x: (
    <svg viewBox="0 0 24 24" {...strokeProps}>
      <path d="M5 5l14 14M19 5L5 19" />
    </svg>
  ),
  youtube: (
    <svg viewBox="0 0 24 24" {...strokeProps}>
      <rect x="2.5" y="6" width="19" height="12" rx="4" />
      <path d="M10.3 9.6l5 2.4-5 2.4z" fill="currentColor" stroke="none" />
    </svg>
  ),
  tiktok: (
    <svg viewBox="0 0 24 24" {...strokeProps}>
      <path d="M13.8 3.5v11.2a3.3 3.3 0 1 1-3.3-3.3" />
      <path d="M13.8 3.5c0 2.6 2 4.6 4.6 4.7" />
    </svg>
  ),
  snapchat: (
    <svg viewBox="0 0 24 24" {...strokeProps}>
      <path d="M12 4c-3 0-5 2.2-5 5.3 0 1 .1 2.3.3 3.2-1 .3-2.1.9-2.1 1.5 0 .5.7.8 1.5 1-.1.4-.4.9-1 1.3-.3.2-.1.6.3.7.6.2 1.2.2 1.6.5.5.4.4 1.2 1.4 1.5.8.2 1.5-.2 2-.2s1.2.4 2 .2c1-.3.9-1.1 1.4-1.5.4-.3 1-.3 1.6-.5.4-.1.6-.5.3-.7-.6-.4-.9-.9-1-1.3.8-.2 1.5-.5 1.5-1 0-.6-1.1-1.2-2.1-1.5.2-.9.3-2.2.3-3.2C17 6.2 15 4 12 4z" />
      <circle cx="9.6" cy="9.9" r="0.4" fill="currentColor" stroke="none" />
      <circle cx="14.4" cy="9.9" r="0.4" fill="currentColor" stroke="none" />
    </svg>
  ),
  linkedin: (
    <svg viewBox="0 0 24 24" {...strokeProps}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="4" />
      <line x1="7.6" y1="10.2" x2="7.6" y2="16.8" />
      <circle cx="7.6" cy="7.1" r="0.9" fill="currentColor" stroke="none" />
      <path d="M11.4 16.8v-4.3c0-1.4.9-2.4 2.2-2.4s2.1 1 2.1 2.4v4.3" />
    </svg>
  ),
};

export type SocialPlatform = keyof typeof icons;

export function SocialIcon({ platform }: { platform: SocialPlatform }) {
  return icons[platform];
}
