import type { Metadata } from "next";
import { HealthcareServicePageBody, healthcareServiceMetadata } from "@/components/healthcare-cluster-page";

const SLUG = "healthcare-email-marketing-dubai";

export const metadata: Metadata = healthcareServiceMetadata(SLUG);

export default function HealthcareEmailMarketingPage() {
  return <HealthcareServicePageBody slug={SLUG} />;
}
