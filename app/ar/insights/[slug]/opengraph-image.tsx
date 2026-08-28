import { buildPageOgImage, ogContentType, ogSize } from "@/lib/og";
import { getInsightArticle, getInsightCategory, heroImages, insightArticlesForLocale } from "@/lib/site";

export const size = ogSize;
export const contentType = ogContentType;

/** Every article's own featured image and topic — never the site-wide default, and never another article's image. Limited to articles with an Arabic edition, matching the page route this image belongs to. */
export function generateStaticParams() {
  return insightArticlesForLocale("ar").map((article) => ({ slug: article.slug }));
}

export async function generateImageMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getInsightArticle(slug);
  return article ? [{ id: 0, alt: article.imageAltAr ?? article.imageAlt, contentType: ogContentType }] : [];
}

/** Same rendered card as the matching English article page's — reused as-is (Cormorant Garamond can't set Arabic glyphs). */
export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getInsightArticle(slug);
  if (!article) {
    return buildPageOgImage({
      photo: heroImages.insights.src,
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
