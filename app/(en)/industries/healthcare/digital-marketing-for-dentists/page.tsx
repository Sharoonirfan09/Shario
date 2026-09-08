import type { Metadata } from "next";
import { HealthcareVerticalPageBody, healthcareVerticalMetadata } from "@/components/healthcare-cluster-page";

const SLUG = "digital-marketing-for-dentists";

export const metadata: Metadata = healthcareVerticalMetadata(SLUG);

export default function DigitalMarketingForDentistsPage() {
  return <HealthcareVerticalPageBody slug={SLUG} />;
}
