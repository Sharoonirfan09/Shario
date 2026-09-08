import type { Metadata } from "next";
import { HealthcareServicePageBody, healthcareServiceMetadata } from "@/components/healthcare-cluster-page";

const SLUG = "healthcare-seo-dubai";

export const metadata: Metadata = healthcareServiceMetadata(SLUG);

export default function HealthcareSeoPage() {
  return <HealthcareServicePageBody slug={SLUG} />;
}
