import type { Metadata } from "next";
import { HealthcareServicePageBody, healthcareServiceMetadata } from "@/components/healthcare-cluster-page";

const SLUG = "healthcare-content-marketing-dubai";

export const metadata: Metadata = healthcareServiceMetadata(SLUG);

export default function HealthcareContentMarketingPage() {
  return <HealthcareServicePageBody slug={SLUG} />;
}
