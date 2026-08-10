import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // /results became /work when the site moved to the Brand Book's
      // navigation. Permanent, so the old URL keeps whatever equity it has.
      { source: "/results", destination: "/work", permanent: true },

      // The design handoff drops Approach and Journal as pages. Approach is
      // now the process row inside About and the service pages; Journal is the
      // Insights section on the homepage.
      { source: "/approach", destination: "/about", permanent: true },
      { source: "/journal", destination: "/#insights", permanent: true },

      // The four Brand Book capabilities became the handoff's six. Map every
      // retired slug — including the earlier set already redirected once — to
      // its closest equivalent rather than dropping visitors on a 404.
      {
        source: "/services/visual-identity",
        destination: "/services/brand-identity",
        permanent: true,
      },
      {
        source: "/services/creative-direction",
        destination: "/services/content-communication",
        permanent: true,
      },
      {
        source: "/services/digital-experience",
        destination: "/services/digital-experiences",
        permanent: true,
      },
      {
        source: "/services/brand-and-creative",
        destination: "/services/brand-identity",
        permanent: true,
      },
      {
        source: "/services/websites-and-conversion",
        destination: "/services/digital-experiences",
        permanent: true,
      },
      {
        source: "/services/performance-marketing",
        destination: "/services/growth-visibility",
        permanent: true,
      },
      {
        source: "/services/seo-and-content",
        destination: "/services/growth-visibility",
        permanent: true,
      },
      {
        source: "/services/crm-and-attribution",
        destination: "/services/growth-visibility",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
