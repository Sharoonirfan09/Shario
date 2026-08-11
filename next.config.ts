import type { NextConfig } from "next";

/**
 * The site has been through three structures. Every retired URL is mapped to
 * its closest equivalent rather than left to 404, including slugs that have
 * already been redirected once — a chain that ends in a 404 is no better than
 * the 404.
 */
const nextConfig: NextConfig = {
  async redirects() {
    return [
      // --- Pages retired when the site returned to the content document's
      // five-page structure. Work and Industries restated the service pages;
      // the case studies on /work were written for clients that do not exist.
      { source: "/work", destination: "/results", permanent: true },
      { source: "/work/:slug", destination: "/results", permanent: true },
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
