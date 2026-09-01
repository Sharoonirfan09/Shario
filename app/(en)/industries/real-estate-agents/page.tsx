import type { Metadata } from "next";
import { agentsPageMetadata, ClusterAgentsPageBody } from "@/components/cluster-page";

export const metadata: Metadata = agentsPageMetadata("en");

export default function RealEstateAgentsPage() {
  return <ClusterAgentsPageBody locale="en" />;
}
