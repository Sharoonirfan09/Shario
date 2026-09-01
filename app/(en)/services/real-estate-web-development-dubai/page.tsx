import type { Metadata } from "next";
import { ClusterServicePageBody, servicePageMetadata } from "@/components/cluster-page";
import { getServicePage } from "@/lib/real-estate-cluster";

const SLUG = "real-estate-web-development-dubai";

export const metadata: Metadata = servicePageMetadata(SLUG, "en");

export default function RealEstateWebDevelopmentPage() {
  return <ClusterServicePageBody page={getServicePage(SLUG)!} locale="en" />;
}
