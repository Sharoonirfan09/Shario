import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // /results became /work when the site moved to the Brand Book's
      // navigation. Permanent, so the old URL keeps whatever equity it has.
      { source: "/results", destination: "/work", permanent: true },
      // The service set was replaced with the studio capabilities; map the
      // closest equivalent rather than dropping visitors on a 404.
      {
        source: "/services/brand-and-creative",
        destination: "/services/creative-direction",
        permanent: true,
      },
      {
        source: "/services/websites-and-conversion",
        destination: "/services/digital-experience",
        permanent: true,
      },
      {
        source: "/services/performance-marketing",
        destination: "/services/brand-strategy",
        permanent: true,
      },
      {
        source: "/services/seo-and-content",
        destination: "/services/brand-strategy",
        permanent: true,
      },
      {
        source: "/services/crm-and-attribution",
        destination: "/services/digital-experience",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
