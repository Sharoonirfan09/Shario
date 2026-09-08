import type { Metadata } from "next";
import { HealthcareHubPageBody, healthcareHubMetadata } from "@/components/healthcare-cluster-page";

/**
 * The bespoke Healthcare industry hub — a literal sibling of `../[slug]/page.tsx`
 * that Next's router resolves ahead of the dynamic route for this exact path
 * (excluded there alongside "real-estate"), so every other Industries page
 * (and the AR/RU Healthcare page, which still uses the generic template) is
 * untouched. See the equivalent note on `../real-estate/page.tsx` and the
 * scope note at the top of `lib/healthcare-cluster.ts`.
 */
export const metadata: Metadata = healthcareHubMetadata();

export default function HealthcareIndustryPage() {
  return <HealthcareHubPageBody />;
}
