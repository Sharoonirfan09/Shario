import { services, site } from "@/lib/site";

/**
 * Organization + LocalBusiness markup. Shario competes on Dubai-local search,
 * so the address, service catalogue and founder are all worth declaring.
 */
export function StructuredData() {
  const data = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: site.name,
    description: site.description,
    url: site.domain,
    email: site.email,
    telephone: site.phone,
    founder: { "@type": "Person", name: site.founder },
    areaServed: [
      { "@type": "City", name: "Dubai" },
      { "@type": "Country", name: "United Arab Emirates" },
    ],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Dubai",
      addressCountry: "AE",
    },
    sameAs: [site.linkedin, site.instagram],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Creative studio services",
      itemListElement: services.map((service) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: service.name,
          description: service.descriptor,
          url: `${site.domain}/services/${service.slug}`,
        },
      })),
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
