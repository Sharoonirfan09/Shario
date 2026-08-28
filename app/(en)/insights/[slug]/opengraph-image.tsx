import { buildPageOgImage, ogContentType, ogSize } from "@/lib/og";
import { getInsightArticle, getInsightCategory, insightArticles } from "@/lib/site";
import { HERO_IMAGE } from "../page";

export const size = ogSize;
export const contentType = ogContentType;

/** Every article's own featured image and topic — never the site-wide default, and never another article's image. */
export function generateStaticParams() {
  return insightArticles.map((article) => ({ slug: article.slug }));
}

export async function generateImageMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getInsightArticle(slug);
  return article ? [{ id: 0, alt: article.imageAlt, contentType: ogContentType }] : [];
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getInsightArticle(slug);
  if (!article) {
    return buildPageOgImage({
      photo: HERO_IMAGE,
      eyebrow: "Insights",
      title: "Insights",
    });
  }

  return buildPageOgImage({
    photo: article.image,
    eyebrow: getInsightCategory(article.category)?.name ?? "Insights",
    title: article.title,
  });
}
