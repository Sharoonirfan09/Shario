import type { Metadata } from "next";
import { agentsPageMetadata, ClusterAgentsPageBody } from "@/components/cluster-page";

export const metadata: Metadata = agentsPageMetadata("ar");

export default function Page() {
  return <ClusterAgentsPageBody locale="ar" />;
}
