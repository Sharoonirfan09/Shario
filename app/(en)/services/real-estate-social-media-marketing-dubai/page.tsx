import type { Metadata } from "next";
import { ClusterServicePageBody, servicePageMetadata } from "@/components/cluster-page";
import { getServicePage } from "@/lib/real-estate-cluster";

const SLUG = "real-estate-social-media-marketing-dubai";

export const metadata: Metadata = servicePageMetadata(SLUG, "en");

export default function RealEstateSocialMediaPage() {
  return <ClusterServicePageBody page={getServicePage(SLUG)!} locale="en" />;
}
