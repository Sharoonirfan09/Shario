import type { Metadata } from "next";
import { HealthcareServicePageBody, healthcareServiceMetadata } from "@/components/healthcare-cluster-page";

const SLUG = "healthcare-web-development-dubai";

export const metadata: Metadata = healthcareServiceMetadata(SLUG);

export default function HealthcareWebDevelopmentPage() {
  return <HealthcareServicePageBody slug={SLUG} />;
}
