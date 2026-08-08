import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

/** Standard page container. Generous margins are part of the identity. */
export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto max-w-[1440px] px-gutter ${className}`}>
      {children}
    </div>
  );
}

/** Jost eyebrow over a hairline — the recurring structural marker. */
export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="label border-t border-rule pt-3 text-carbon-40">{children}</p>
  );
}

/**
 * The Brand Book plate — the editorial frame used on every page of
 * "Shario Creative Studio Brand Book" (assets/brand-book/).
 *
 * A hairline under a pair of Jost corner labels, a deep field of white space,
 * then a closing hairline over an aphorism and a page index. Reproducing it on
 * the site is what carries the printed identity onto the screen.
 */
export function Plate({
  label,
  footnote,
  index,
  tone = "porcelain",
  children,
}: {
  /** Section name, set in the top-right corner. */
  label: string;
  /** The closing aphorism, bottom-left. Brand Book sets one per page. */
  footnote: string;
  /** Page index, bottom-right — e.g. "03 / 07". */
  index: string;
  tone?: "porcelain" | "limestone" | "carbon";
  children: ReactNode;
}) {
  const tones = {
    porcelain: { field: "", rule: "border-rule", ink: "text-carbon-40" },
    limestone: {
      field: "bg-limestone",
      rule: "border-limestone-deep",
      ink: "text-carbon-60",
    },
    carbon: {
      field: "bg-carbon text-porcelain",
      rule: "border-porcelain/25",
      ink: "text-porcelain/50",
    },
  }[tone];

  return (
    <section className={`border-b border-rule ${tones.field}`}>
      {/*
       * A full viewport height, so one plate fills the screen the way one
       * spread fills the book. Content sits centred in the field between the
       * two hairlines; a long plate simply grows past the minimum.
       */}
      <Container className="flex min-h-svh flex-col py-8 md:py-10">
        <header
          className={`flex items-baseline justify-between gap-6 border-b pb-4 ${tones.rule}`}
        >
          <p className={`label-plate ${tones.ink}`}>Shario</p>
          <p className={`label-plate ${tones.ink}`}>{label}</p>
        </header>

        <div className="flex flex-1 flex-col justify-center py-24 md:py-32">
          {children}
        </div>

        <footer
          className={`flex items-baseline justify-between gap-6 border-t pt-4 ${tones.rule}`}
        >
          <p className={`label-plate ${tones.ink}`}>{footnote}</p>
          <p className={`label-plate ${tones.ink}`} aria-hidden="true">
            {index}
          </p>
        </footer>
      </Container>
    </section>
  );
}

/**
 * A full-bleed photographic plate — the Brand Book's image pages (p23, p32),
 * where a single frame carries the spread and the type sits over it.
 */
export function ImagePlate({
  src,
  label,
  footnote,
  index,
  title,
  standfirst,
  focus,
  children,
}: {
  src: string;
  label: string;
  footnote: string;
  index: string;
  /**
   * Focal point for the crop, as Tailwind object-position classes. A phone
   * crops a wide photograph hard from both sides, which can cut the subject
   * in half — set this where the subject is not centred.
   */
  focus?: string;
  /** Optional overlay title, set in the display serif. */
  title?: string;
  standfirst?: string;
  /** Actions or extra matter, centred beneath the standfirst. */
  children?: ReactNode;
}) {
  return (
    <section className="relative min-h-svh overflow-hidden border-b border-rule">
      <Image
        src={src}
        alt=""
        fill
        sizes="100vw"
        className={`settle object-cover ${focus ?? ""}`}
        priority
      />
      {/* Carbon veil — the Brand Book only sets type on calm, even fields. */}
      <div className="absolute inset-0 bg-carbon/45" />

      <Container className="relative flex min-h-svh flex-col py-8 text-porcelain md:py-10">
        <header className="flex items-baseline justify-between gap-6 border-b border-porcelain/25 pb-4">
          <p className="label-plate text-porcelain/60">Shario</p>
          <p className="label-plate text-porcelain/60">{label}</p>
        </header>

        <div className="flex flex-1 flex-col justify-end pb-10 pt-24 text-center sm:justify-center sm:py-24 md:py-32">
          {title && (
            <h1 className="display rise text-balance text-[clamp(2.6rem,7vw,6rem)]">
              {title}
            </h1>
          )}
          {standfirst && (
            <p
              className="lede rise mx-auto mt-10 max-w-xl text-porcelain/75"
              style={{ animationDelay: "220ms" }}
            >
              {standfirst}
            </p>
          )}
          {children && (
            <div
              className="rise mt-10 flex flex-col items-center justify-center gap-5 sm:mt-12 sm:flex-row sm:gap-x-8"
              style={{ animationDelay: "360ms" }}
            >
              {children}
            </div>
          )}
        </div>

        <footer className="flex items-baseline justify-between gap-6 border-t border-porcelain/25 pt-4">
          <p className="label-plate text-porcelain/60">{footnote}</p>
          <p className="label-plate text-porcelain/60" aria-hidden="true">
            {index}
          </p>
        </footer>
      </Container>
    </section>
  );
}

/**
 * The split plate — Brand Book p02. The frame contracts into a narrow column
 * on the left (labels, hairline, headline, body, closing aphorism and index)
 * while a single photograph fills the rest of the spread edge to edge.
 */
export function SplitPlate({
  src,
  label,
  footnote,
  index,
  title,
  tone = "porcelain",
  children,
}: {
  src: string;
  label: string;
  footnote: string;
  index: string;
  title: string;
  tone?: "porcelain" | "limestone";
  children?: ReactNode;
}) {
  const tones = {
    porcelain: { field: "", rule: "border-rule", ink: "text-carbon-40" },
    limestone: {
      field: "bg-limestone",
      rule: "border-limestone-deep",
      ink: "text-carbon-60",
    },
  }[tone];

  return (
    <section className={`border-b border-rule ${tones.field}`}>
      <div className="mx-auto grid max-w-[1440px] lg:grid-cols-12">
        <div className="flex min-h-svh flex-col px-gutter py-8 md:py-10 lg:col-span-4 lg:pe-12">
          <header
            className={`flex items-baseline justify-between gap-4 border-b pb-4 ${tones.rule}`}
          >
            <p className={`label-plate ${tones.ink}`}>Shario</p>
            <p className={`label-plate ${tones.ink}`}>{label}</p>
          </header>

          <div className="flex flex-1 flex-col justify-center py-16">
            <h2 className="display text-balance text-[clamp(2rem,3.4vw,3rem)]">
              {title}
            </h2>
            {children && <div className="mt-10">{children}</div>}
          </div>

          <footer
            className={`flex items-baseline justify-between gap-4 border-t pt-4 ${tones.rule}`}
          >
            <p className={`label-plate ${tones.ink}`}>{footnote}</p>
            <p className={`label-plate ${tones.ink}`} aria-hidden="true">
              {index}
            </p>
          </footer>
        </div>

        {/* The photograph runs to the plate's own edges, as it does in print. */}
        <div className="frame relative min-h-[72vw] sm:min-h-[56vw] lg:col-span-8 lg:min-h-svh">
          <Image
            src={src}
            alt=""
            fill
            sizes="(min-width: 1024px) 66vw, 100vw"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}

/**
 * A photographic grid plate — the Brand Book's recurring image spread
 * (p23 photography direction, p28 stationery, p29 digital, p30 collateral):
 * a three-across grid of frames, each under a small Jost caption.
 */
export function GridPlate({
  label,
  footnote,
  index,
  tone = "carbon",
  columns = 3,
  captions = "below",
  frames,
}: {
  label: string;
  footnote: string;
  index: string;
  tone?: "porcelain" | "limestone" | "carbon";
  /** 4 reproduces the Brand Book's collateral row (p30); 2 its composition
   *  pair (p24); 3 is the standard spread. */
  columns?: 2 | 3 | 4;
  /** "chip" sets the caption over the frame, as p24 does. */
  captions?: "below" | "chip";
  frames: { src: string; caption: string }[];
}) {
  const onCarbon = tone === "carbon";
  const cols = {
    2: "sm:grid-cols-2",
    3: "sm:grid-cols-2 lg:grid-cols-3",
    4: "sm:grid-cols-2 lg:grid-cols-4",
  }[columns];
  // A pair gets taller frames; a row of four gets shorter ones.
  const ratio = {
    2: "aspect-[3/2] sm:aspect-[5/6]",
    3: "aspect-[3/2] sm:aspect-[4/5]",
    4: "aspect-[3/2] sm:aspect-[3/4]",
  }[columns];

  if (captions === "chip") {
    return (
      <Plate label={label} footnote={footnote} index={index} tone={tone}>
        <div className={`grid gap-5 ${cols}`}>
          {frames.map((frame, i) => (
            <figure key={frame.src} className="reveal" data-delay={i * 70}>
              <div className={`frame relative ${ratio}`}>
                <Image
                  src={frame.src}
                  alt=""
                  fill
                  loading="eager"
                  sizes="(min-width: 640px) 46vw, 100vw"
                  className="object-cover"
                />
                <figcaption className="label-sm absolute left-4 top-4 bg-carbon/85 px-3 py-2 text-porcelain backdrop-blur-sm">
                  {frame.caption}
                </figcaption>
              </div>
            </figure>
          ))}
        </div>
      </Plate>
    );
  }

  return (
    <Plate label={label} footnote={footnote} index={index} tone={tone}>
      <div className={`grid gap-5 ${cols}`}>
        {frames.map((frame, i) => (
          <figure key={frame.src} className="reveal" data-delay={i * 70}>
            {/*
             * The frames are the plate. Load them eagerly — six images at
             * ~35KB each — rather than letting a lazy fetch leave the spread
             * empty while a caption sits under nothing. The tinted ground
             * means a frame still reads as a frame before its pixels arrive.
             */}
            <div
              className={`frame relative ${ratio} ${
                onCarbon ? "bg-porcelain/10" : "bg-limestone-deep/40"
              }`}
            >
              <Image
                src={frame.src}
                alt=""
                fill
                loading="eager"
                sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
                className="object-cover"
              />
            </div>
            <figcaption
              className={`label-sm mt-4 ${
                onCarbon ? "text-porcelain/50" : "text-carbon-40"
              }`}
            >
              {frame.caption}
            </figcaption>
          </figure>
        ))}
      </div>
    </Plate>
  );
}

/** Text link with a rule that extends on hover. */
export function ArrowLink({
  href,
  children,
  external = false,
}: {
  href: string;
  children: ReactNode;
  external?: boolean;
}) {
  // Padded to a comfortable touch target, pulled back by an equal negative
  // margin so the link still sits on its own baseline in the layout.
  const className =
    "label group -my-2 inline-flex items-center gap-3 py-2 transition-opacity duration-300 hover:opacity-65";
  const content = (
    <>
      {children}
      <span
        aria-hidden="true"
        className="inline-block transition-transform duration-500 group-hover:translate-x-1.5"
      >
        →
      </span>
    </>
  );

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {content}
    </Link>
  );
}

/** Solid Carbon button. Used once per view, for the primary action. */
export function Button({
  href,
  children,
  tone = "carbon",
}: {
  href: string;
  children: ReactNode;
  tone?: "carbon" | "outline";
}) {
  const tones = {
    carbon:
      "border-carbon bg-carbon text-porcelain hover:bg-transparent hover:text-carbon",
    outline: "border-carbon text-carbon hover:bg-carbon hover:text-porcelain",
  };

  return (
    <Link
      href={href}
      className={`label inline-block border px-8 py-4 transition-colors duration-500 ${tones[tone]}`}
    >
      {children}
    </Link>
  );
}

/**
 * The ledger measure — the site's signature.
 * A figure in the display serif, sitting on a hairline under a Jost micro-label.
 */
export function LedgerEntry({
  figure,
  label,
  note,
  delay = 0,
  size = "lg",
}: {
  figure: string;
  label: string;
  note?: string;
  delay?: number;
  /** "sm" for the tight four-across summary row, "lg" for the full measure. */
  size?: "lg" | "sm";
}) {
  return (
    /*
     * The measure arrives in the order it is read: the rule draws itself left
     * to right, then the label, then the figure. The border has become its own
     * element so it can be animated — a border cannot be drawn, only faded.
     */
    <div className="pt-0">
      <span
        aria-hidden="true"
        className="reveal rule-draw block h-px w-full bg-rule"
        data-delay={delay}
      />
      <div className="reveal pt-[1.125rem]" data-delay={delay + 160}>
        <p className="label-sm text-carbon-40">{label}</p>
        <p
          className={`ledger-figure mt-5 text-balance text-carbon ${
            size === "sm" ? "ledger-figure-sm" : ""
          }`}
        >
          {figure}
        </p>
        {note && (
          <p className="mt-5 text-[0.95rem] leading-relaxed text-carbon-60">
            {note}
          </p>
        )}
      </div>
    </div>
  );
}

/** Closing call to action, repeated at the foot of every page. */
export function CallToAction({
  title,
  body,
  action = "Let’s connect",
}: {
  title: string;
  body: string;
  action?: string;
}) {
  return (
    <section className="border-t border-rule bg-carbon text-porcelain">
      <Container className="py-24 md:py-32">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <p className="label-sm text-porcelain/50">Next step</p>
            <h2 className="display reveal mt-7 text-[clamp(2.25rem,5.2vw,4rem)]">
              {title}
            </h2>
          </div>
          <div className="flex flex-col justify-end lg:col-span-5">
            <p className="lede max-w-md text-porcelain/70">{body}</p>
            <div className="mt-9">
              <Link
                href="/contact"
                className="label inline-block border border-porcelain px-8 py-4 text-porcelain transition-colors duration-500 hover:bg-porcelain hover:text-carbon"
              >
                {action}
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
