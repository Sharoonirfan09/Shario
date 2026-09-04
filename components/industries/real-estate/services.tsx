import Link from "next/link";
import type { Industry } from "@/lib/site";
import { Band } from "@/components/ui";

type Tone = "carbon" | "porcelain" | "limestone";

const toneClass: Record<Tone, string> = {
  carbon: "border-carbon bg-carbon text-porcelain hover:bg-black",
  porcelain: "border-platinum/60 bg-porcelain text-carbon hover:border-mist hover:bg-mist/[0.07]",
  limestone: "border-platinum/55 bg-limestone/45 text-carbon hover:border-mist hover:bg-limestone/70",
};

/** Grid placement per index — the feature card spans two rows on the left;
 *  the next two stack in the narrower column beside it; the last three run
 *  full-width across a third row. Six distinct shapes, not six rectangles. */
const layoutClass = [
  "wide:col-span-4 wide:row-span-2",
  "wide:col-span-2 wide:row-start-1",
  "wide:col-span-2 wide:row-start-2",
  "wide:col-span-2",
  "wide:col-span-2",
  "wide:col-span-2",
];

const tones: Tone[] = ["carbon", "porcelain", "limestone", "limestone", "porcelain", "limestone"];

/**
 * "Where We Help" as a magazine grid — the six real `industry.services`,
 * unchanged, arranged asymmetrically instead of the generic template's
 * uniform three-column `CardGrid`. The feature card (index 0) is
 * typography-led rather than image-led: the library holds no second,
 * distinct real-estate photograph to give it without repeating one already
 * spent on the hero, insight or audience sections.
 */
export function Services({ industry }: { industry: Industry }) {
  return (
    <Band>
      <div className="reveal mb-14 max-w-[720px] wide:mb-16">
        <p className="eyebrow re-label flex items-center gap-3 text-carbon/70">
          <span aria-hidden="true" className="h-px w-6 bg-mist" />
          Where We Help
        </p>
        <h2 className="mt-5 font-display text-[2.25rem] font-normal leading-[1.12] wide:text-[2.75rem]">
          {industry.name} marketing services.
        </h2>
      </div>

      <div className="grid gap-5 wide:grid-cols-6 wide:grid-rows-[minmax(200px,auto)_minmax(200px,auto)_auto] wide:gap-6">
        {industry.services.map((service, i) => {
          const tone = tones[i];
          const isFeature = i === 0;
          return (
            <Link
              key={service.slug}
              href={`/services/${service.slug}`}
              data-delay={i * 70}
              className={`reveal group relative flex min-h-[220px] flex-col justify-between overflow-hidden border p-8 transition-colors duration-500 wide:p-9 ${toneClass[tone]} ${layoutClass[i]}`}
            >
              <div className="flex items-start justify-between gap-4">
                <span
                  className={`font-display text-[0.9375rem] ${
                    tone === "carbon" ? "text-porcelain/65" : "text-carbon/60"
                  }`}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span
                  aria-hidden="true"
                  className={`transition-transform duration-500 group-hover:translate-x-1.5 ${
                    tone === "carbon" ? "text-mist" : "text-carbon/60 group-hover:text-carbon"
                  }`}
                >
                  →
                </span>
              </div>

              <div>
                <h3
                  className={`font-display font-medium leading-[1.16] transition-transform duration-500 group-hover:-translate-y-0.5 ${
                    isFeature
                      ? "text-[1.875rem] wide:text-[2.5rem]"
                      : "text-[1.375rem] wide:text-[1.625rem]"
                  }`}
                >
                  {service.title}
                </h3>
                <p
                  className={`mt-3.5 text-[0.9375rem] font-normal leading-[1.7] ${
                    tone === "carbon" ? "text-porcelain/85" : "text-carbon/82"
                  } ${isFeature ? "max-w-[420px]" : "max-w-[320px]"}`}
                >
                  {service.desc}
                </p>
              </div>

              {/* A hairline that draws in from the left on hover — the one
                  border animation this grid uses, on every card regardless
                  of tone. */}
              <span
                aria-hidden="true"
                className={`absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100 ${
                  tone === "carbon" ? "bg-mist" : "bg-carbon"
                }`}
              />
            </Link>
          );
        })}
      </div>
    </Band>
  );
}
