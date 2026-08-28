import { Band, Card, CardGrid, SectionIntro } from "@/components/ui";
import type { Locale } from "@/lib/locale";
import { localizedPath } from "@/lib/locale";
import { industries } from "@/lib/site";

/**
 * The ten-industry grid — the Industries counterpart to `SixServices`.
 *
 * Unlike `SixServices`, cards here carry no `image` prop: a tenth distinct,
 * non-duplicate photograph per card (on top of each industry's own hero) is
 * a real asset-sourcing cost this section doesn't need to pay to be useful.
 * `CardGrid`'s automatic Limestone/Porcelain/Carbon rhythm is left to assign
 * tone on its own rather than cycling an explicit sequence, since there's no
 * shared photograph set here to keep in step with.
 *
 * Rendered on `/industries` (all ten) — nowhere else, so the grid and its
 * copy never drift from what the overview page actually shows.
 */
export function IndustriesGrid({ locale = "en" }: { locale?: Locale }) {
  const isAr = locale === "ar";
  const isRu = locale === "ru";

  return (
    <Band>
      <SectionIntro
        eyebrow={isAr ? "القطاعات" : isRu ? "Отрасли" : "Industries"}
        title={
          isAr ? (
            "عشرة قطاعات، نظام تسويقي واحد."
          ) : isRu ? (
            "Десять отраслей, одна маркетинговая система."
          ) : (
            <>
              Ten sectors, one marketing
              <br className="hidden wide:block" /> system underneath.
            </>
          )
        }
        sub={
          isAr
            ? "من العقارات إلى التعليم، نبني نفس الانضباط التسويقي — التموضع، الأداء، وتحسين محركات البحث، والأنظمة — حول ما يهم فعلياً في كل قطاع."
            : isRu
              ? "От недвижимости до образования — мы применяем одну и ту же маркетинговую дисциплину: позиционирование, performance-маркетинг, SEO и системы — вокруг того, что действительно важно в каждой отрасли."
              : "From real estate to education, the same marketing discipline — positioning, performance, search and systems — built around what actually matters in each sector."
        }
      />
      <CardGrid columns={4}>
        {industries.map((industry, i) => (
          <Card
            key={industry.slug}
            href={
              isAr || isRu
                ? localizedPath(`/industries/${industry.slug}`, locale)
                : `/industries/${industry.slug}`
            }
            badge={industry.num}
            title={isAr ? industry.nameAr : isRu ? industry.nameRu : industry.name}
            titleAs="h3"
            desc={isAr ? industry.descriptorAr : isRu ? industry.descriptorRu : industry.descriptor}
            action={isAr ? "اعرف المزيد" : isRu ? "Узнать больше" : "Learn more"}
            delay={i * 50}
            locale={locale}
          />
        ))}
      </CardGrid>
    </Band>
  );
}
