import type { Metadata } from "next";
import { HealthcareVerticalPageBody, healthcareVerticalMetadata } from "@/components/healthcare-cluster-page";

const SLUG = "digital-marketing-for-doctors";

export const metadata: Metadata = healthcareVerticalMetadata(SLUG);

export default function DigitalMarketingForDoctorsPage() {
  return <HealthcareVerticalPageBody slug={SLUG} />;
}
