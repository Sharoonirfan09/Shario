/**
 * Every photograph this page's own components use, in one place — the same
 * reasoning as `heroImages`/`sharedImages` in `lib/site.ts`: `npm run
 * check:images` fails the build the moment a literal `/images/...` string
 * appears twice in source, and this page's hero is also read by
 * `opengraph-image.tsx`, a second file that needs the identical path.
 * Importing the constant from here keeps that one literal in one place
 * instead of two copies drifting apart.
 */
export const realEstateImages = {
  hero: "/images/industries/real-estate/hero.jpg",
  insight: "/images/industries/real-estate/insight.jpg",
  audienceDevelopers: "/images/industries/real-estate/audience-developers.jpg",
  audienceBrokerages: "/images/industries/real-estate/audience-brokerages.jpg",
  audienceProperty: "/images/industries/real-estate/audience-property.jpg",
} as const;
