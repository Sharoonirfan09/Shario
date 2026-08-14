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
      // five marketing services the content document sets.
      {
        source: "/services/growth-visibility",
        destination: "/services/performance-marketing",
        permanent: true,
      },
      {
        source: "/services/digital-experiences",
        destination: "/services/websites-and-cro",
        permanent: true,
      },
      {
        source: "/services/digital-experience",
        destination: "/services/websites-and-cro",
        permanent: true,
      },
      {
        source: "/services/brand-identity",
        destination: "/services/brand-and-creative",
        permanent: true,
      },
      {
        source: "/services/brand-strategy",
        destination: "/services/brand-and-creative",
        permanent: true,
      },
      {
        source: "/services/visual-identity",
        destination: "/services/brand-and-creative",
        permanent: true,
      },
      {
        source: "/services/creative-direction",
        destination: "/services/brand-and-creative",
        permanent: true,
      },
      {
        source: "/services/content-communication",
        destination: "/services/seo-and-content",
        permanent: true,
      },
      {
        source: "/services/creative-technology",
        destination: "/services/crm-and-automation",
        permanent: true,
      },
      {
        source: "/services/websites-and-conversion",
        destination: "/services/websites-and-cro",
        permanent: true,
      },
      {
        source: "/services/crm-and-attribution",
        destination: "/services/crm-and-automation",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
