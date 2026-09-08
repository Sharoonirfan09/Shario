import type { Metadata } from "next";
import { HealthcareServicePageBody, healthcareServiceMetadata } from "@/components/healthcare-cluster-page";

const SLUG = "healthcare-social-media-marketing-dubai";

export const metadata: Metadata = healthcareServiceMetadata(SLUG);

export default function HealthcareSocialMediaMarketingPage() {
  return <HealthcareServicePageBody slug={SLUG} />;
}
