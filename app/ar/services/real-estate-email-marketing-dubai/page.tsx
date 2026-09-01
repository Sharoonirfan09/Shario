import type { Metadata } from "next";
import { ClusterServicePageBody, servicePageMetadata } from "@/components/cluster-page";
import { getServicePage } from "@/lib/real-estate-cluster";

const SLUG = "real-estate-email-marketing-dubai";

export const metadata: Metadata = servicePageMetadata(SLUG, "ar");

export default function Page() {
  return <ClusterServicePageBody page={getServicePage(SLUG)!} locale="ar" />;
}
