import { clusterOgEyebrow } from "@/components/cluster-page";
import { buildTypeOgImage, ogContentType, ogSize } from "@/lib/og";
import { agentsPageContent } from "@/lib/real-estate-cluster";
import { site } from "@/lib/site";

export const size = ogSize;
export const contentType = ogContentType;

const content = agentsPageContent("en");
export const alt = `${content.h1} — ${site.name}`;

export default async function Image() {
  return buildTypeOgImage({ eyebrow: clusterOgEyebrow("en"), title: content.h1 });
}
