import type { Metadata } from "next";
import { HealthcareVerticalPageBody, healthcareVerticalMetadata } from "@/components/healthcare-cluster-page";

const SLUG = "digital-marketing-for-hospitals";

export const metadata: Metadata = healthcareVerticalMetadata(SLUG);

export default function DigitalMarketingForHospitalsPage() {
  return <HealthcareVerticalPageBody slug={SLUG} />;
}
