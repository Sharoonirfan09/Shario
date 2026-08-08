import type { Metadata } from "next";
import { CallToAction, GridPlate, ImagePlate, Plate } from "@/components/ui";
import { essence, site, values } from "@/lib/site";

export const metadata: Metadata = {
  title: "Approach",
  description:
    "How Shario works — five elements held in harmony, five standards applied without exception, and a sequence that turns them into a complete brand system.",
  alternates: { canonical: "/approach" },
};

/** Brand Book p24 — image composition, shown as a pair with the caption
 *  set over each frame. */
const composition = [
  { src: "/images/book/photo-stair.jpg", caption: "Clean crop, negative space" },
  { src: "/images/book/photo-aperture.jpg", caption: "Light carries the frame" },
];

/** The engagement, in order. The sequence is the point, so it is numbered. */
const sequence = [
  {
    title: "We start with meaning",
    body: "What the brand stands for, who it is for, and where it sits against everyone else.",
  },
  {
    title: "We build the system",
    body: "Identity, language and digital surfaces designed as one set of rules rather than separate deliverables.",
  },
  {
    title: "We document the standard",
    body: "Guidelines precise enough that the identity survives every team that has to use it.",
  },
  {
    title: "We hold it in place",
    body: "Every new touchpoint is composed against the system, not alongside it.",
  },
];

export default function ApproachPage() {
  return (
    <>
      <ImagePlate
        src="/images/pedestal.jpg"
        label="Approach"
        footnote="Our standard is coherence."
        index="Cover"
        title="Harmony is a discipline, not an accident."
        standfirst="Brands fragment when strategy, design, communication and technology are decided separately. Shario composes them together."
      />

      {/* The five elements — Brand Book p03 */}
      <Plate
        label="Brand essence"
        footnote="Purpose before decoration."
        index="01 / 04"
      >
        <div className="max-w-2xl">
          <p className="label-sm text-carbon-40">Brand essence</p>
          <h2 className="title reveal mt-7 text-[clamp(2rem,4.4vw,3.25rem)]">
            Five elements, working as one.
          </h2>
        </div>

        <div className="mt-16 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-5">
          {essence.map((element, i) => (
            <div
              key={element.name}
              className="reveal border-t border-rule pt-6"
              data-delay={i * 70}
            >
              <h3 className="label text-carbon">{element.name}</h3>
              <p className="mt-4 text-carbon-60">{element.note}</p>
            </div>
          ))}
        </div>

        <p className="lede reveal mt-16 max-w-2xl text-carbon-60" data-delay="400">
          Working in harmony, a brand becomes more than visible — it becomes
          distinctive and memorable.
        </p>
      </Plate>

      {/* The five standards — Brand Book p07 */}
      <Plate
        label="Standards"
        footnote="Our standard is coherence."
        index="02 / 04"
        tone="limestone"
      >
        <div className="max-w-2xl">
          <p className="label-sm text-carbon-60">Standards</p>
          <h2 className="title reveal mt-7 text-[clamp(2rem,4.4vw,3.25rem)]">
            Applied without exception.
          </h2>
        </div>

        <div className="mt-16 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-5">
          {values.map((value, i) => (
            <div
              key={value.name}
              className="reveal border-t border-limestone-deep pt-6"
              data-delay={i * 70}
            >
              <p className="label-sm text-carbon-60" aria-hidden="true">
                {value.numeral}
              </p>
              <h3 className="title mt-5 text-[1.5rem]">{value.name}</h3>
              <p className="mt-3 text-carbon-60">{value.note}</p>
            </div>
          ))}
        </div>
      </Plate>

      <GridPlate
        label="Image composition"
        footnote="Text sits in quiet, uncluttered zones."
        index="03 / 04"
        columns={2}
        captions="chip"
        tone="porcelain"
        frames={composition}
      />

      {/* The engagement */}
      <Plate
        label="The engagement"
        footnote={site.promise}
        index="04 / 04"
      >
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <p className="label-sm text-carbon-40">How we work</p>
            <h2 className="title reveal mt-7 text-[clamp(2rem,4.4vw,3.25rem)]">
              A sequence, not a menu.
            </h2>
          </div>

          <ol className="lg:col-span-7 lg:col-start-6">
            {sequence.map((step, i) => (
              <li
                key={step.title}
                className="reveal flex gap-8 border-t border-rule py-8"
                data-delay={i * 90}
              >
                <span
                  className="label-sm shrink-0 pt-2 text-carbon-40"
                  aria-hidden="true"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="title text-[1.65rem]">{step.title}</h3>
                  <p className="mt-2 text-carbon-60">{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </Plate>

      <CallToAction
        title="Independent thinking. Sharper execution."
        body="Bring the brand as it stands. We will show you where it breaks."
        action="Let’s connect"
      />
    </>
  );
}
