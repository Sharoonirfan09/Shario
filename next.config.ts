import type { NextConfig } from "next";

/**
 * The site has been through three structures. Every retired URL is mapped to
 * its closest equivalent rather than left to 404, including slugs that have
 * already been redirected once — a chain that ends in a 404 is no better than
 * the 404.
 */
const nextConfig: NextConfig = {
  /**
   * Every image on the site already goes through `next/image` (no raw
   * `<img>` anywhere — checked). The optimizer only serves WebP by default;
   * adding AVIF lets it serve the smaller format first to browsers that
   * support it, falling back to WebP then the original, all via content
   * negotiation. No source assets change.
   */
  images: {
    formats: ["image/avif", "image/webp"],
  },
  /**
   * The project sits inside a parent folder that also holds a stray
   * package-lock.json (not this repo, not a workspace). Without this,
   * Turbopack walks up looking for a workspace root, finds that lockfile
   * first, and warns on every build; pinning the root to this directory
   * stops the misdetection.
   */
  turbopack: {
    root: __dirname,
  },
  async redirects() {
    return [
      // --- Pages retired as the structure narrowed. Work and Industries
      // restated the service pages; the case studies on /work were written for
      // clients that do not exist. Results went last — /work and /work/:slug
      // pointed at it, and are repointed here so neither chain ends in a 404.
      { source: "/results", destination: "/about", permanent: true },
      { source: "/work", destination: "/about", permanent: true },
      { source: "/work/:slug", destination: "/about", permanent: true },
      { source: "/industries", destination: "/services", permanent: true },
      { source: "/industries/:slug", destination: "/services", permanent: true },

      // Approach and Journal predate that, and Insights was the homepage
      // section Journal became. There is no journal now.
      { source: "/approach", destination: "/about", permanent: true },
      { source: "/journal", destination: "/about", permanent: true },

      // --- Service slugs. The six creative-studio capabilities map onto the
      // five marketing services the content document sets. Destinations point
      // straight at the current (renamed) slugs below rather than at the
      // slugs those services used before the rename, so none of these chain
      // through a second redirect.
      {
        source: "/services/growth-visibility",
        destination: "/services/digital-marketing",
        permanent: true,
      },
      {
        source: "/services/digital-experiences",
        destination: "/services/website-development",
        permanent: true,
      },
      {
        source: "/services/digital-experience",
        destination: "/services/website-development",
        permanent: true,
      },
      {
        source: "/services/brand-identity",
        destination: "/services/branding",
        permanent: true,
      },
      {
        source: "/services/brand-strategy",
        destination: "/services/branding",
        permanent: true,
      },
      {
        source: "/services/visual-identity",
        destination: "/services/branding",
        permanent: true,
      },
      {
        source: "/services/creative-direction",
        destination: "/services/branding",
        permanent: true,
      },
      {
        source: "/services/content-communication",
        destination: "/services/seo",
        permanent: true,
      },
      {
        source: "/services/creative-technology",
        destination: "/services/crm-marketing-automation",
        permanent: true,
      },
      {
        source: "/services/websites-and-conversion",
        destination: "/services/website-development",
        permanent: true,
      },
      {
        source: "/services/crm-and-attribution",
        destination: "/services/crm-marketing-automation",
        permanent: true,
      },

      // --- 2026-08-26 service rename. Names changed (Performance Marketing
      // -> Digital Marketing, SEO & Content -> SEO (Search Engine
      // Optimization), Websites & CRO -> Website Development, CRM &
      // Automation -> CRM & Marketing Automation, Brand & Creative ->
      // Branding, Strategy & Consulting -> Marketing Consulting) but slugs
      // were deliberately left as-is at the time. This closes that gap: the
      // slugs below now match the approved names, and every previously
      // published URL redirects straight to its new home in one hop, across
      // all three locales.
      {
        source: "/services/performance-marketing",
        destination: "/services/digital-marketing",
        permanent: true,
      },
      {
        source: "/:locale(ar|ru)/services/performance-marketing",
        destination: "/:locale/services/digital-marketing",
        permanent: true,
      },
      {
        source: "/services/seo-and-content",
        destination: "/services/seo",
        permanent: true,
      },
      {
        source: "/:locale(ar|ru)/services/seo-and-content",
        destination: "/:locale/services/seo",
        permanent: true,
      },
      {
        source: "/services/websites-and-cro",
        destination: "/services/website-development",
        permanent: true,
      },
      {
        source: "/:locale(ar|ru)/services/websites-and-cro",
        destination: "/:locale/services/website-development",
        permanent: true,
      },
      {
        source: "/services/crm-and-automation",
        destination: "/services/crm-marketing-automation",
        permanent: true,
      },
      {
        source: "/:locale(ar|ru)/services/crm-and-automation",
        destination: "/:locale/services/crm-marketing-automation",
        permanent: true,
      },
      {
        source: "/services/brand-and-creative",
        destination: "/services/branding",
        permanent: true,
      },
      {
        source: "/:locale(ar|ru)/services/brand-and-creative",
        destination: "/:locale/services/branding",
        permanent: true,
      },
      {
        source: "/services/strategy-consulting",
        destination: "/services/marketing-consulting",
        permanent: true,
      },
      {
        source: "/:locale(ar|ru)/services/strategy-consulting",
        destination: "/:locale/services/marketing-consulting",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
