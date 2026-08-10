import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

/**
 * Layout and display primitives for the design handoff
 * (`design_handoff_shario_website`).
 *
 * Two notes on fidelity, both deliberate:
 *
 *  - The prototypes put the 1400px cap *outside* the 48px gutter on light
 *    sections and *inside* it on dark ones, so on a viewport wider than
 *    ~1500px the dark bands run 96px wider than the light ones and the section
 *    edges stop lining up. Here the gutter always sits inside the cap, so every
 *    band shares one content column.
 *  - The prototypes drive layout from a `window.innerWidth < 880` boolean.
 *    That is reproduced as the `wide:` breakpoint (55rem) in CSS, so the
 *    layout is correct in the served HTML rather than after hydration.
 */

/** The content column — 1400px including its gutter, centred. */
export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto max-w-[1400px] px-6 wide:px-12 ${className}`}>
      {children}
    </div>
  );
}

type Tone = "porcelain" | "carbon" | "limestone";

const toneField: Record<Tone, string> = {
  porcelain: "",
  carbon: "bg-carbon text-porcelain",
  limestone: "bg-limestone",
};

/** Hairline colour for the ground a section sits on. */
export function hairline(tone: Tone) {
  return tone === "carbon" ? "border-porcelain/15" : "border-carbon/12";
}

/** Muted ink for the ground a section sits on. */
export function muted(tone: Tone) {
  return tone === "carbon" ? "text-porcelain/55" : "text-carbon/55";
}

/**
 * A full-width band of one section. Vertical rhythm is the handoff's
 * `clamp(80px,9vw,140px)` desktop / `64px` mobile.
 */
export function Band({
  children,
  tone = "porcelain",
  id,
  className = "",
}: {
  children: ReactNode;
  tone?: Tone;
  id?: string;
  className?: string;
}) {
  return (
    <section id={id} className={`${toneField[tone]} ${className} scroll-mt-24`}>
      <Container className="py-16 wide:py-[clamp(5rem,9vw,8.75rem)]">
        {children}
      </Container>
    </section>
  );
}

/** The hairline the handoff sets between two light sections. */
export function Divider() {
  return (
    <Container>
      <div className="h-px bg-carbon/10" />
    </Container>
  );
}

/** "01 / Introduction" — the recurring section marker. */
export function Eyebrow({
  children,
  tone = "porcelain",
  className = "",
}: {
  children: ReactNode;
  tone?: Tone;
  className?: string;
}) {
  return (
    <p className={`eyebrow ${muted(tone)} ${className}`}>{children}</p>
  );
}

const h2Scale = {
  lg: "text-[2.5rem] wide:text-[clamp(2.5rem,4.5vw,4rem)]",
  md: "text-[2.375rem] wide:text-[clamp(2.375rem,4.2vw,3.75rem)]",
  sm: "text-[2rem] wide:text-[2.75rem]",
};

/** Display serif heading at the handoff's three section scales. */
export function Heading({
  children,
  scale = "lg",
  as: Tag = "h2",
  className = "",
}: {
  children: ReactNode;
  scale?: keyof typeof h2Scale;
  as?: "h1" | "h2" | "p";
  className?: string;
}) {
  return (
    <Tag
      className={`font-display text-balance font-normal leading-[1.1] ${h2Scale[scale]} ${className}`}
    >
      {children}
    </Tag>
  );
}

/** Heading left, section marker right — the handoff's standard section header. */
export function SectionHead({
  title,
  marker,
  scale = "lg",
  tone = "porcelain",
}: {
  title: ReactNode;
  marker: string;
  scale?: keyof typeof h2Scale;
  tone?: Tone;
}) {
  return (
    <div className="mb-10 flex flex-wrap items-end justify-between gap-6 wide:mb-16">
      <Heading scale={scale}>{title}</Heading>
      <Eyebrow tone={tone} className="wide:text-right">
        {marker}
      </Eyebrow>
    </div>
  );
}

/**
 * Two-column section: marker in a fixed 260px rail, content beside it.
 * Collapses to a single column below the breakpoint.
 */
export function MarkerColumns({
  marker,
  heading,
  children,
  tone = "porcelain",
}: {
  marker: string;
  /** @see SectionLabel — names the section for assistive tech and crawlers. */
  heading?: string;
  children: ReactNode;
  tone?: Tone;
}) {
  return (
    <div className="grid gap-6 wide:grid-cols-[260px_1fr] wide:gap-[60px]">
      <div>
        {heading && <SectionLabel>{heading}</SectionLabel>}
        <Eyebrow tone={tone}>{marker}</Eyebrow>
      </div>
      <div>{children}</div>
    </div>
  );
}

/**
 * A heading that exists only in the accessibility tree.
 *
 * Most sections in the design are labelled by an eyebrow marker alone —
 * "04 / Deliverables" set as body text. That reads fine, but it leaves the
 * document outline with an `h1` and then nothing, so a screen reader cannot
 * navigate the page by section and a crawler sees most of it as unlabelled.
 * This restores the outline without altering a pixel.
 */
export function SectionLabel({ children }: { children: ReactNode }) {
  return <h2 className="sr-only">{children}</h2>;
}

/* -------------------------------------------------------------------------- */
/* Pills                                                                       */
/* -------------------------------------------------------------------------- */

const pillTone = {
  /** Outlined dark — the nav CTA and light-ground tags. */
  outline:
    "border-carbon text-carbon hover:bg-carbon hover:text-porcelain",
  /** Outlined light — over photography and on carbon. */
  outlineLight:
    "border-porcelain/40 text-porcelain hover:border-porcelain hover:bg-porcelain hover:text-carbon",
  /** Solid carbon — the closing action on every page. */
  solid: "border-carbon bg-carbon text-porcelain hover:bg-black",
};

/** A pill link. `999px` is the only radius in the system. */
export function PillLink({
  href,
  children,
  tone = "outline",
  size = "md",
  className = "",
}: {
  href: string;
  children: ReactNode;
  tone?: keyof typeof pillTone;
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const sizes = {
    sm: "px-[22px] py-3 text-[11px]",
    md: "px-8 py-3.5 text-[11px]",
    lg: "px-11 py-[18px] text-xs",
  };

  return (
    <Link
      href={href}
      className={`inline-block rounded-full border uppercase tracking-[0.08em] transition-colors duration-500 ${sizes[size]} ${pillTone[tone]} ${className}`}
    >
      {children}
    </Link>
  );
}

/**
 * A pill tag. Static by default — the personality lists on About are not
 * navigation — and a link when given an `href`, which is how every industry
 * pill reaches its sector page.
 */
export function Pill({
  children,
  href,
  tone = "porcelain",
  dim = false,
}: {
  children: ReactNode;
  href?: string;
  tone?: Tone;
  dim?: boolean;
}) {
  const className = `inline-block rounded-full border px-[22px] py-3 text-sm ${
    tone === "carbon" ? "border-porcelain/25" : "border-carbon/20"
  } ${dim ? "border-carbon/12 text-carbon/50" : ""}`;

  if (!href) return <span className={className}>{children}</span>;

  return (
    <Link
      href={href}
      className={`${className} transition-colors duration-500 ${
        tone === "carbon"
          ? "hover:bg-porcelain hover:text-carbon"
          : "hover:bg-carbon hover:text-porcelain"
      }`}
    >
      {children}
    </Link>
  );
}

/* -------------------------------------------------------------------------- */
/* Heroes                                                                      */
/* -------------------------------------------------------------------------- */

const heroScale = {
  /** Homepage. */
  home: {
    box: "h-[80vh] min-h-[560px] wide:h-[92vh]",
    title: "text-[3.25rem] wide:text-[clamp(4rem,8.5vw,8rem)]",
  },
  /** About. */
  page: {
    box: "h-[70vh] min-h-[480px] wide:h-[78vh]",
    title: "text-[2.875rem] wide:text-[clamp(3.5rem,7vw,6.25rem)]",
  },
  /** Service template. */
  service: {
    box: "h-[64vh] min-h-[460px] wide:h-[74vh]",
    title: "text-[2.625rem] wide:text-[clamp(3.25rem,6.5vw,5.625rem)]",
  },
  /** Case study template. */
  study: {
    box: "h-[64vh] min-h-[480px] wide:h-[76vh]",
    title: "text-[2.875rem] wide:text-[clamp(3.5rem,7vw,6rem)]",
  },
};

/**
 * Full-bleed photographic hero. Type sits bottom-left over a downward
 * gradient — the handoff never centres a hero.
 */
export function Hero({
  src,
  eyebrow,
  title,
  subhead,
  scale = "page",
  focus,
  priority = false,
  children,
}: {
  src: string;
  eyebrow: string;
  /** Line breaks are the design's; pass a fragment with `<br />`. */
  title: ReactNode;
  subhead?: string;
  scale?: keyof typeof heroScale;
  /**
   * Focal point for the crop, as Tailwind object-position classes. Every
   * photograph in the library is 4:5, so a wide hero keeps only a horizontal
   * band of it — set this where the band worth keeping is not the middle.
   */
  focus?: string;
  priority?: boolean;
  /** Optional action beneath the subhead. */
  children?: ReactNode;
}) {
  const s = heroScale[scale];

  return (
    <section className={`relative flex items-end ${s.box}`}>
      <Image
        src={src}
        alt=""
        fill
        sizes="100vw"
        priority={priority}
        className={`settle object-cover ${focus ?? ""}`}
      />
      {/*
       * Two scrims, not one. The design's vertical gradient assumes calm
       * architectural photography; several heroes now carry collateral and
       * screen mockups whose own type sits exactly where the headline goes.
       * The horizontal scrim guarantees a dark ground under the type block on
       * the left while leaving the right of the frame readable.
       */}
      <div className="absolute inset-0 bg-gradient-to-b from-carbon/15 to-carbon/55" />
      <div className="absolute inset-0 bg-gradient-to-r from-carbon/75 via-carbon/25 to-transparent" />

      <Container className="relative z-10 w-full pb-12 pt-12 text-porcelain wide:pb-24 wide:pt-0">
        <p className="eyebrow eyebrow-hero rise text-porcelain/85">{eyebrow}</p>
        <h1
          className={`rise mt-6 max-w-[1000px] font-display font-normal leading-[1.03] ${s.title}`}
          style={{ animationDelay: "140ms" }}
        >
          {title}
        </h1>
        {subhead && (
          <p
            className="rise mt-7 max-w-[560px] font-body text-lg italic leading-[1.5] text-porcelain/90 wide:text-[1.375rem]"
            style={{ animationDelay: "280ms" }}
          >
            {subhead}
          </p>
        )}
        {children && (
          <div className="rise mt-9" style={{ animationDelay: "400ms" }}>
            {children}
          </div>
        )}
      </Container>
    </section>
  );
}

/**
 * A hero with no photograph — the treatment the handoff already uses on
 * Contact, extended to the service and industry templates.
 *
 * Those twelve pages had photographic heroes, but the only images available
 * for them are brand-collateral mockups with the SHARIO wordmark in frame,
 * which collided with the headline on every one. Type on porcelain is both
 * legible and honest about what photography exists.
 */
export function TypeHero({
  eyebrow,
  title,
  subhead,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  subhead?: string;
  children?: ReactNode;
}) {
  return (
    <section className="border-b border-carbon/12">
      <Container className="pb-14 pt-12 wide:pb-24 wide:pt-20">
        <p className="eyebrow eyebrow-hero rise text-carbon/60">{eyebrow}</p>
        <h1
          className="rise mt-6 max-w-[900px] font-display text-[2.625rem] font-normal leading-[1.05] wide:text-[clamp(3.25rem,6vw,5.25rem)]"
          style={{ animationDelay: "140ms" }}
        >
          {title}
        </h1>
        {subhead && (
          <p
            className="rise mt-7 max-w-[560px] font-body text-lg italic leading-[1.5] text-carbon/80 wide:text-[1.3125rem]"
            style={{ animationDelay: "280ms" }}
          >
            {subhead}
          </p>
        )}
        {children && (
          <div className="rise mt-9" style={{ animationDelay: "400ms" }}>
            {children}
          </div>
        )}
      </Container>
    </section>
  );
}

/**
 * A full-bleed photograph with one centred serif line over it — the handoff's
 * punctuation between sections.
 */
export function StatementImage({
  src,
  children,
}: {
  src: string;
  children: ReactNode;
}) {
  return (
    <section className="relative flex h-[46vh] items-center justify-center wide:h-[60vh]">
      <Image src={src} alt="" fill sizes="100vw" className="object-cover" />
      <div className="absolute inset-0 bg-carbon/40" />
      <p className="reveal relative z-10 max-w-[900px] px-6 text-center font-display text-[1.875rem] font-normal leading-[1.15] text-porcelain wide:text-[clamp(1.875rem,4vw,3.25rem)]">
        {children}
      </p>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Repeating blocks                                                            */
/* -------------------------------------------------------------------------- */

/** A photograph in a fixed ratio, with the frame's slow settle on reveal. */
export function Frame({
  src,
  ratio,
  sizes = "(min-width: 880px) 33vw, 100vw",
  tone = "porcelain",
}: {
  src: string;
  /** Tailwind aspect class, e.g. `aspect-[4/5]`. */
  ratio: string;
  sizes?: string;
  tone?: Tone;
}) {
  return (
    <div
      className={`frame relative w-full ${ratio} ${
        tone === "carbon" ? "bg-porcelain/10" : "bg-limestone/60"
      }`}
    >
      <Image src={src} alt="" fill sizes={sizes} className="object-cover" />
    </div>
  );
}

/**
 * Numbered rows over hairlines — "What Defines Us" on the homepage and
 * "Values" on About share this exactly.
 */
export function NumberedRows({
  rows,
  tone = "porcelain",
}: {
  rows: readonly { num: string; title: string; desc: string }[];
  tone?: Tone;
}) {
  const rule = hairline(tone);

  return (
    <div className="flex flex-col">
      {rows.map((row, i) => (
        <div
          key={row.num}
          className={`reveal grid grid-cols-[40px_1fr] items-baseline gap-4 border-t py-7 wide:grid-cols-[80px_320px_1fr] wide:gap-10 wide:py-9 ${rule}`}
          data-delay={i * 70}
        >
          <span
            className={`font-display text-[1.75rem] font-light wide:text-4xl ${
              tone === "carbon" ? "text-porcelain/35" : "text-carbon/35"
            }`}
          >
            {row.num}
          </span>
          <span className="font-display text-xl font-medium wide:text-[1.75rem]">
            {row.title}
          </span>
          {/* On one column the number occupies the first cell, so the
              description starts in the second and spans to the edge. */}
          <span
            className={`col-start-2 max-w-[340px] text-[0.9375rem] leading-[1.6] wide:col-start-3 ${
              tone === "carbon" ? "text-porcelain/70" : "text-carbon/70"
            }`}
          >
            {row.desc}
          </span>
        </div>
      ))}
      <div className={`border-t ${rule}`} />
    </div>
  );
}

/** The four-step process row — horizontal on desktop, stacked below. */
export function ProcessSteps({
  steps,
  tone = "porcelain",
}: {
  steps: readonly { num: string; title: string; desc: string }[];
  tone?: Tone;
}) {
  return (
    <div className="flex flex-col gap-8 wide:flex-row wide:gap-10">
      {steps.map((step, i) => (
        <div
          key={step.num}
          className={`reveal flex flex-1 flex-col gap-3.5 border-t pt-6 ${
            tone === "carbon" ? "border-porcelain/30" : "border-carbon"
          }`}
          data-delay={i * 80}
        >
          <span
            className={`font-display text-sm ${
              tone === "carbon" ? "text-porcelain/50" : "text-carbon/50"
            }`}
          >
            {step.num}
          </span>
          <span className="font-display text-2xl font-medium">
            {step.title}
          </span>
          <span
            className={`text-sm leading-[1.6] ${
              tone === "carbon" ? "text-porcelain/70" : "text-carbon/70"
            }`}
          >
            {step.desc}
          </span>
        </div>
      ))}
    </div>
  );
}

/** Dot-bulleted list over hairlines. Two columns on desktop. */
export function DotList({
  items,
  tone = "porcelain",
  accent = true,
  columns = 2,
}: {
  items: readonly string[];
  tone?: Tone;
  /** Mist dot for capability lists; a dimmed dot for deliverables. */
  accent?: boolean;
  columns?: 1 | 2;
}) {
  const rule = hairline(tone);

  return (
    <div
      className={`grid gap-x-10 ${columns === 2 ? "wide:grid-cols-2" : ""}`}
    >
      {items.map((item, i) => (
        <div
          key={item}
          className={`reveal flex items-baseline gap-3.5 border-t py-3.5 ${rule}`}
          data-delay={i * 50}
        >
          <span
            aria-hidden="true"
            className={`h-1.5 w-1.5 shrink-0 rounded-full ${
              accent
                ? "bg-mist"
                : tone === "carbon"
                  ? "bg-porcelain/30"
                  : "bg-carbon/30"
            }`}
          />
          <span
            className={`text-[0.9375rem] ${
              tone === "carbon" ? "text-porcelain/85" : "text-carbon/85"
            }`}
          >
            {item}
          </span>
        </div>
      ))}
    </div>
  );
}

/** A project card — 4:5 frame over category, title and scope. */
export function WorkCard({
  href,
  image,
  category,
  title,
  scope,
  tone = "carbon",
  delay = 0,
  ratio = "aspect-[4/5]",
}: {
  href: string;
  image: string;
  category: string;
  title: string;
  scope?: string;
  tone?: Tone;
  delay?: number;
  ratio?: string;
}) {
  return (
    <Link href={href} className="reveal group block" data-delay={delay}>
      <Frame src={image} ratio={ratio} tone={tone} />
      <p className={`eyebrow mt-5 ${muted(tone)}`}>{category}</p>
      <p className="mt-2.5 font-display text-2xl font-medium transition-opacity duration-500 group-hover:opacity-70 wide:text-[1.625rem]">
        {title}
      </p>
      {scope && (
        <p
          className={`mt-2 text-[0.8125rem] ${
            tone === "carbon" ? "text-porcelain/60" : "text-carbon/60"
          }`}
        >
          {scope}
        </p>
      )}
    </Link>
  );
}

/**
 * The closing call to action, repeated at the foot of every page.
 * Limestone on the homepage and service pages; porcelain on About.
 */
export function FinalCta({
  lines,
  tone = "limestone",
  action = "Start a Conversation",
}: {
  lines: readonly [string, string];
  tone?: "limestone" | "porcelain";
  action?: string;
}) {
  return (
    <section className={tone === "limestone" ? "bg-limestone" : ""}>
      <Container className="py-16 text-center wide:py-[clamp(5rem,9vw,8.75rem)]">
        <Heading as="p" className="mb-10">
          {lines[0]}
          <br />
          {lines[1]}
        </Heading>
        <PillLink href="/contact" tone="solid" size="lg">
          {action}
        </PillLink>
      </Container>
    </section>
  );
}
