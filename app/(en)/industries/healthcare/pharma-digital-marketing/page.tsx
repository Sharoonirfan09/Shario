import type { Metadata } from "next";
import { HealthcareVerticalPageBody, healthcareVerticalMetadata } from "@/components/healthcare-cluster-page";

const SLUG = "pharma-digital-marketing";

export const metadata: Metadata = healthcareVerticalMetadata(SLUG);

export default function PharmaDigitalMarketingPage() {
  return <HealthcareVerticalPageBody slug={SLUG} />;
}
