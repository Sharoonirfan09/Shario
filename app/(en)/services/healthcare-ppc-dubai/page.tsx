import type { Metadata } from "next";
import { HealthcareServicePageBody, healthcareServiceMetadata } from "@/components/healthcare-cluster-page";

const SLUG = "healthcare-ppc-dubai";

export const metadata: Metadata = healthcareServiceMetadata(SLUG);

export default function HealthcarePpcPage() {
  return <HealthcareServicePageBody slug={SLUG} />;
}
