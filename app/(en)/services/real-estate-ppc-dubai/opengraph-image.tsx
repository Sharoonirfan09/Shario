import { clusterOgEyebrow } from "@/components/cluster-page";
import { buildTypeOgImage, ogContentType, ogSize } from "@/lib/og";
import { getServicePage, servicePageContent } from "@/lib/real-estate-cluster";
import { site } from "@/lib/site";

export const size = ogSize;
export const contentType = ogContentType;

const content = servicePageContent(getServicePage("real-estate-ppc-dubai")!, "en");
export const alt = `${content.h1} — ${site.name}`;

export default async function Image() {
  return buildTypeOgImage({ eyebrow: clusterOgEyebrow("en"), title: content.h1 });
}
