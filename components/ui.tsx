import Image from "next/image";
import Link from "next/link";
import {
  Children,
  cloneElement,
  isValidElement,
  type CSSProperties,
  type ReactElement,
  type ReactNode,
} from "react";
import type { Locale } from "@/lib/locale";
import { site } from "@/lib/site";
import { CountUp } from "@/components/count-up";

/**
 * Layout and display primitives.
 *
 * Composition follows the reference the client supplied
 * (`upscale-digital.com`): a centred eyebrow over a centred heading on every
 * section, hairline card grids with numbered badges, dark bands of figures
 * breaking up the light ones, and an accent band carrying the call to action
 * immediately before the footer.
 *
 * The material is Shario's own, not the reference's — Porcelain ground,
 * Limestone cards, Carbon dark bands, Mist where the reference uses purple,
 * Cormorant Garamond for headings and figures, Jost for labels and body.
 *
 * One deliberate divergence: the reference's cards are soft-rounded. This
 * system declares 999px as its only radius, reserved for pills, so cards take
 * their definition from hairlines and padding and stay square. A borrowed
 * corner radius would read as borrowed.
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
  return tone === "carbon" ? "border-porcelain/20" : "border-carbon/15";
}

/** Muted ink for the ground a section sits on. */
export function muted(tone: Tone) {
  return tone === "carbon" ? "text-porcelain/60" : "text-carbon/60";
}

/** A full-width band of one section. */
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

/** A hairline between two sections on the same ground. */
export function Divider() {
  return (
    <Container>
      <div className="h-px bg-carbon/10" />
    </Container>
  );
}

const h2Scale = {
  lg: "text-[2.5rem] wide:text-[clamp(2.5rem,4.5vw,4rem)]",
  md: "text-[2.25rem] wide:text-[clamp(2.25rem,3.8vw,3.375rem)]",
  sm: "text-[1.875rem] wide:text-[2.5rem]",
};

/** Display serif heading at the three section scales. */
export function Heading({
  children,
  scale = "md",
  as: Tag = "h2",
  className = "",
}: {
  children: ReactNode;
  scale?: keyof typeof h2Scale;
  as?: "h1" | "h2" | "h3" | "p";
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

/**
 * The section opener the reference repeats on every band: a short label above
 * a heading, both centred, with an optional supporting line beneath.
 *
 * The label is set in Mist rather than the reference's purple. On Porcelain
 * that is too pale to read as text at 11px, so it carries a Carbon tint and
 * uses Mist only for the rule beside it.
 */
export function SectionIntro({
  eyebrow,
  title,
  sub,
  align = "center",
  tone = "porcelain",
  scale = "md",
}: {
  eyebrow: string;
  title: ReactNode;
  sub?: string;
  align?: "center" | "left";
  tone?: Tone;
  scale?: keyof typeof h2Scale;
}) {
  const centred = align === "center";

  return (
    <div
      className={`mb-12 wide:mb-16 ${centred ? "mx-auto max-w-[820px] text-center" : "max-w-[820px]"}`}
    >
      <p
        className={`eyebrow flex items-center gap-3 ${
          tone === "carbon" ? "text-porcelain/70" : "text-carbon/55"
        } ${centred ? "justify-center" : ""}`}
      >
        <span aria-hidden="true" className="h-px w-6 bg-mist" />
        {eyebrow}
      </p>
      <Heading scale={scale} className="mt-5">
        {title}
      </Heading>
      {sub && (
        <p
          className={`mt-6 text-[1.0625rem] leading-[1.7] ${
            tone === "carbon" ? "text-porcelain/70" : "text-carbon/70"
          } ${centred ? "mx-auto max-w-[640px]" : "max-w-[640px]"}`}
        >
          {sub}
        </p>
      )}
    </div>
  );
}

/**
 * A heading that exists only in the accessibility tree, for sections whose
 * visible label is set as body text.
 */
export function SectionLabel({ children }: { children: ReactNode }) {
  return <h2 className="sr-only">{children}</h2>;
}

/* -------------------------------------------------------------------------- */
/* Pills                                                                       */
/* -------------------------------------------------------------------------- */

const pillTone = {
  outline: "border-carbon text-carbon hover:bg-carbon hover:text-porcelain",
  outlineLight:
    "border-porcelain/45 text-porcelain hover:border-porcelain hover:bg-porcelain hover:text-carbon",
  solid: "border-carbon bg-carbon text-porcelain hover:bg-black",
  /** Solid light — the action on a carbon band. */
  solidLight:
    "border-porcelain bg-porcelain text-carbon hover:border-mist hover:bg-mist",
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

  const classes = `inline-block rounded-full border uppercase tracking-[0.08em] transition-colors duration-500 ${sizes[size]} ${pillTone[tone]} ${className}`;

  // `mailto:` and `tel:` are not routes — Link would prefetch them. A real
  // `http(s)` URL is a link off the site (WhatsApp, LinkedIn), so it opens
  // in a new tab rather than navigating the visitor away from SHARIO;
  // `mailto:`/`tel:` hand off to a native app instead and don't need that.
  if (/^https?:/.test(href)) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {children}
      </a>
    );
  }
  if (/^(mailto:|tel:)/.test(href)) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}

/** A pill tag — static, or a link when given an `href`. */
export function Pill({
  children,
  href,
  tone = "porcelain",
}: {
  children: ReactNode;
  href?: string;
  tone?: Tone;
}) {
  const className = `inline-block rounded-full border px-[22px] py-3 text-sm ${
    tone === "carbon" ? "border-porcelain/25" : "border-carbon/20"
  }`;

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
/* Cards                                                                       */
/* -------------------------------------------------------------------------- */

const gridCols = {
  2: "wide:grid-cols-2",
  3: "sm:grid-cols-2 wide:grid-cols-3",
  4: "sm:grid-cols-2 wide:grid-cols-4",
};

/**
 * The reference's card grid — separate cards with their own edges, not a
 * ruled table.
 *
 * Assigns each `Card` child its tone automatically — Limestone and Porcelain
 * alternating, Carbon reserved for the set's closing card — so every grid on
 * the site gets the same controlled rhythm without each call site choosing
 * colours by hand. A card that sets its own `tone` keeps it; this only fills
 * in the ones that don't. Non-`Card` children (the Insights grid renders its
 * own `InsightCard`) pass through untouched.
 */
export function CardGrid({
  children,
  columns = 3,
}: {
  children: ReactNode;
  columns?: 2 | 3 | 4;
}) {
  const items = Children.toArray(children);
  const total = items.length;

  return (
    <div className={`grid gap-6 wide:gap-8 ${gridCols[columns]}`}>
      {items.map((child, i) => {
        if (!isValidElement(child) || child.type !== Card) return child;
        const element = child as ReactElement<CardProps>;
        const isLast = i === total - 1 && total > 1;
        const tone = element.props.tone ?? (isLast ? "carbon" : i % 2 === 0 ? "limestone" : "porcelain");
        return cloneElement(element, { tone });
      })}
    </div>
  );
}

/** Per-tone surface, badge, text and hover treatment — the one place a Card's colour is decided. */
const cardTone: Record<
  Tone,
  {
    surface: string;
    hover: string;
    badge: string;
    badgeHover: string;
    desc: string;
    divider: string;
    action: string;
    /** Foot-of-image fade, into this tone's own ground. */
    fade: string;
    /** Full-bleed scrim for the `background` texture variant. */
    scrim: string;
  }
> = {
  porcelain: {
    surface: "border-platinum/50 bg-porcelain text-carbon",
    hover: "hover:border-mist hover:bg-mist/[0.06]",
    badge: "bg-mist/35 text-carbon",
    badgeHover: "group-hover:bg-mist/60",
    desc: "text-carbon/72",
    divider: "border-carbon/12",
    action: "text-carbon",
    fade: "from-porcelain",
    scrim: "bg-gradient-to-t from-porcelain from-50% via-porcelain/95 to-porcelain/35",
  },
  limestone: {
    surface: "border-carbon/12 bg-limestone/40 text-carbon",
    hover: "hover:border-mist hover:bg-limestone/65",
    badge: "bg-mist/40 text-carbon",
    badgeHover: "group-hover:bg-mist/65",
    desc: "text-carbon/72",
    divider: "border-carbon/15",
    action: "text-carbon",
    fade: "from-limestone",
    scrim: "bg-gradient-to-t from-limestone from-50% via-limestone/95 to-limestone/35",
  },
  carbon: {
    surface: "border-porcelain/15 bg-carbon text-porcelain",
    hover: "hover:border-mist/60 hover:bg-black",
    badge: "bg-mist/25 text-porcelain",
    badgeHover: "group-hover:bg-mist/45",
    desc: "text-porcelain/72",
    divider: "border-porcelain/15",
    action: "text-porcelain",
    fade: "from-carbon",
    scrim: "bg-gradient-to-t from-carbon from-50% via-carbon/95 to-carbon/35",
  },
};

type CardProps = {
  badge?: string;
  title: string;
  desc: string;
  href?: string;
  /** Link text, e.g. "Learn more". */
  action?: string;
  /**
   * A texture held behind the card at low opacity, under a scrim that keeps
   * the ink at full contrast. Material, not imagery — a photograph with a
   * subject would compete with the text sitting on it.
   */
  background?: string;
  /**
   * An editorial photograph in its own bounded block at the card's head,
   * full clarity rather than washed behind a scrim — for sets where the
   * image is the subject, not the ground. Mutually exclusive with
   * `background`.
   */
  image?: string;
  titleAs?: "p" | "h3";
  /** Set explicitly to opt out of `CardGrid`'s automatic Limestone/Porcelain/Carbon rhythm. */
  tone?: Tone;
  delay?: number;
  /** Flips the action row's arrow and drops the Latin-only `eyebrow` (uppercase/tracking) treatment for Arabic callers. Default `"en"`. */
  locale?: Locale;
};

/**
 * A card: hairline edge, numbered badge, title, description, optional action.
 *
 * The badge carries the item's real index. The reference uses decorative
 * icons; a number is honest here because these sets are genuinely ordered —
 * the service catalogue and the engagement steps both have a fixed sequence.
 *
 * Colour is assigned by the parent `CardGrid`, not chosen here — this
 * component only renders whichever `Tone` it is given.
 */
export function Card({
  badge,
  title,
  desc,
  href,
  action,
  background,
  image,
  titleAs: Title = "p",
  tone = "porcelain",
  delay = 0,
  locale = "en",
}: CardProps) {
  const t = cardTone[tone];
  const isAr = locale === "ar";

  const body = (
    <>
      {image && (
        <div className="frame relative -mx-8 -mt-8 mb-7 aspect-[4/3] overflow-hidden wide:-mx-10 wide:-mt-10 wide:mb-8">
          <Image
            src={image}
            alt={title}
            fill
            sizes="(min-width: 880px) 33vw, 100vw"
            className="object-cover"
          />
          {badge && (
            <span
              aria-hidden="true"
              className="absolute left-8 top-8 flex h-11 w-11 shrink-0 items-center justify-center bg-porcelain/80 font-display text-[1.0625rem] text-carbon backdrop-blur-sm wide:left-10 wide:top-10"
            >
              {badge}
            </span>
          )}
          {/*
           * Only the seam gets an overlay — a short fade at the image's foot
           * so it meets the card's ground on a soft edge rather than a hard
           * line. The photograph itself stays at full clarity; nothing washes
           * over the subject.
           */}
          <div
            aria-hidden="true"
            className={`pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t ${t.fade} to-transparent`}
          />
        </div>
      )}
      {background && (
        <>
          <Image
            src={background}
            alt=""
            fill
            sizes="(min-width: 880px) 25vw, 100vw"
            className="pointer-events-none -z-10 object-cover"
          />
          {/*
           * The scrim goes fully solid halfway up the card and clears towards
           * the head, so the photograph reads at close to full strength behind
           * the badge and has faded out before any text reaches it. An evenly
           * scrimmed card turns the image into a tonal wash; a weaker one puts
           * the title on top of the photograph.
           */}
          <div
            aria-hidden="true"
            className={`pointer-events-none absolute inset-0 -z-10 ${t.scrim}`}
          />
        </>
      )}
      {/*
       * A card with a photograph but no badge — the closing action card —
       * would otherwise start its title where the badge cards start their
       * number, which is the one part of the card the image still occupies.
       * This holds the same opening space so every card in the row aligns.
       */}
      {background && !badge && (
        <>
          <span aria-hidden="true" className="mb-7 block h-11" />
        </>
      )}
      {badge && !image && (
        <span
          aria-hidden="true"
          className={`mb-7 flex h-11 w-11 shrink-0 items-center justify-center font-display text-[1.0625rem] transition-colors duration-500 ${t.badge} ${t.badgeHover}`}
        >
          {badge}
        </span>
      )}
      <Title
        className={`text-[1.5rem] leading-[1.22] wide:text-[1.625rem] ${isAr ? "font-arabic font-bold" : "font-display font-medium"}`}
      >
        {title}
      </Title>
      <p className={`mt-3.5 flex-1 text-[0.9375rem] leading-[1.75] ${isAr ? "font-arabic" : ""} ${t.desc}`}>
        {desc}
      </p>
      {action && (
        <span
          className={`mt-7 flex items-center gap-2 border-t pt-6 ${t.divider} ${t.action} ${isAr ? "font-arabic text-[0.75rem]" : "eyebrow"}`}
        >
          {action}
          <span
            aria-hidden="true"
            className={`transition-transform duration-500 group-hover:text-mist ${isAr ? "group-hover:-translate-x-1.5" : "group-hover:translate-x-1.5"}`}
          >
            {isAr ? "←" : "→"}
          </span>
        </span>
      )}
    </>
  );

  // `relative` and `isolate` so the texture and its scrim clip to the card and
  // stay behind the content rather than escaping into the grid gap. The
  // hover lift and its soft shadow are the one piece of motion every card
  // shares, whether or not it links anywhere.
  const className = `reveal group relative isolate flex h-full flex-col overflow-hidden border p-8 wide:p-10 transition-[background-color,border-color,box-shadow,transform] duration-500 hover:-translate-y-1 hover:shadow-[0_24px_48px_-32px_rgba(37,37,37,0.35)] ${t.surface} ${t.hover}`;

  if (!href) {
    return (
      <div className={className} data-delay={delay}>
        {body}
      </div>
    );
  }

  return (
    <Link href={href} className={className} data-delay={delay}>
      {body}
    </Link>
  );
}

/* -------------------------------------------------------------------------- */
/* Heroes                                                                      */
/* -------------------------------------------------------------------------- */

const heroScale = {
  home: {
    box: "min-h-[620px] wide:min-h-[86vh]",
    title: "text-[2.875rem] wide:text-[clamp(3.5rem,6.4vw,5.75rem)]",
  },
  page: {
    box: "min-h-[440px] wide:min-h-[60vh]",
    title: "text-[2.5rem] wide:text-[clamp(3rem,5.4vw,4.75rem)]",
  },
};

/**
 * Full-bleed photographic hero, type bottom-left over a scrim.
 *
 * The reference sets its hero on a flat dark ground with an image floated to
 * one side. Here the photograph *is* the ground — the library is the strongest
 * asset this site has, and reducing it to a floated thumbnail would waste it.
 */
export function Hero({
  src,
  alt = "",
  eyebrow,
  title,
  subhead,
  scale = "page",
  focus,
  priority = false,
  breadcrumb,
  children,
}: {
  /** Optional — pages without dedicated photography (e.g. Insights) still get
   *  the same box height, padding and text-reveal treatment on a flat Carbon
   *  ground, rather than forcing a photograph onto a page that has none. */
  src?: string;
  /** Empty by default. Every Hero photograph is real editorial content, not
   *  a texture, so callers should pass a real description of it. */
  alt?: string;
  eyebrow: string;
  title?: ReactNode;
  subhead?: string;
  scale?: keyof typeof heroScale;
  focus?: string;
  priority?: boolean;
  breadcrumb?: ReactNode;
  children?: ReactNode;
}) {
  const s = heroScale[scale];

  return (
    // Pulled up by the header's height so the bar overlays the photograph
    // rather than sitting on a cream slab above it. The container below pads
    // the type back down past the bar.
    <section
      className={`relative flex items-end mt-[calc(-1*var(--header-h))] ${s.box} ${src ? "" : "bg-carbon"}`}
    >
      {src && (
        <>
          <Image
            src={src}
            alt={alt}
            fill
            sizes="100vw"
            priority={priority}
            className={`settle object-cover ${focus ?? ""}`}
          />
          {/* One gentle bottom scrim, not the two stacked full-bleed gradients
              this used to carry — those compounded (each covers most of the
              frame) to darken the whole photograph, not just the corner the
              type sits over. This clears through the top and middle of every
              banner photo and only deepens toward the bottom edge, just
              enough to hold the porcelain type legible. */}
          <div className="absolute inset-0 bg-gradient-to-t from-carbon/65 via-carbon/10 via-45% to-transparent" />
          {/* A second, separate scrim scoped to the header's own strip.
              `SiteHeader` decides its ink (Porcelain vs Carbon) per route,
              trusting that every non-home hero photo is dark enough right
              behind the bar to hold Porcelain legible — true of the bottom
              scrim's own corner, but the bottom scrim clears completely well
              before it reaches the top edge, so without this a bright photo
              (a pale wall, direct sun) sits directly behind the header with
              nothing darkening it. Sized to the bar's own height plus a
              short fade, not the whole photograph, so it reads as the bar's
              shadow rather than reintroducing the haze the bottom scrim
              replaced. */}
          <div className="absolute inset-x-0 top-0 h-[calc(var(--header-h)+64px)] bg-gradient-to-b from-carbon/70 via-carbon/25 to-transparent" />
        </>
      )}

      <Container className="relative z-10 w-full pb-14 pt-[calc(var(--header-h)+3.5rem)] text-porcelain wide:pb-20 wide:pt-[calc(var(--header-h)+5rem)]">
        {breadcrumb}
        <p className="eyebrow eyebrow-hero rise mt-1 flex items-center gap-3 text-porcelain/85">
          <span aria-hidden="true" className="h-px w-7 bg-mist" />
          {eyebrow}
        </p>
        {title && (
          <h1
            className={`rise mt-6 max-w-[1000px] font-display font-normal leading-[1.04] ${s.title}`}
            style={{ animationDelay: "140ms" }}
          >
            {title}
          </h1>
        )}
        {subhead && (
          <p
            className="rise mt-7 max-w-[600px] text-[1.0625rem] leading-[1.7] text-porcelain/85 wide:text-[1.1875rem]"
            style={{ animationDelay: "280ms" }}
          >
            {subhead}
          </p>
        )}
        {children && (
          <div
            className="rise mt-10 flex flex-wrap gap-3.5"
            style={{ animationDelay: "400ms" }}
          >
            {children}
          </div>
        )}
      </Container>
    </section>
  );
}

/**
 * The split hero: type on the left, one photograph filling the right, over a
 * flat ground.
 *
 * This is the client's reference opening. The photograph is not a panel floated
 * beside the headline — it covers the whole right side of the section, flush to
 * the right edge and running the full height between the header and the
 * section's bottom, which is what makes the hero read as one image rather than
 * a picture placed on a page. Limestone runs up behind the header, which is why
 * the section pulls itself up by the bar's height and pads its content back
 * down; the image starts *below* the bar so the wordmark and nav keep a flat
 * ground, as the reference sets it.
 *
 * Below `wide` the same photograph stacks under the type at 4:5. One DOM node,
 * repositioned at the breakpoint rather than rendered twice — two copies would
 * put two links to the same page in the markup and fetch the image twice.
 */
export function SplitHero({
  src,
  alt = "",
  eyebrow,
  title,
  subhead,
  focus,
  shift,
  href,
  linkLabel,
  children,
  locale = "en",
}: {
  src: string;
  /** Empty by default, but this is the homepage's single most prominent
   *  photograph — callers should always pass a real description. */
  alt?: string;
  /** Optional: the reference opens straight on the headline, with nothing above it. */
  eyebrow?: string;
  title: ReactNode;
  /** Takes a node, not a string: the reference sets it on two lines. */
  subhead?: ReactNode;
  focus?: string;
  /**
   * How far the figure is nudged inside the frame. Any CSS length; negative
   * moves her left, which is the direction the client wanted.
   *
   * A negative value slides the image off its own right edge, and on a wide
   * window it fills the column exactly, so there is nothing behind it — hence
   * the mask fades the right edge as well as the left. Keep the offset smaller
   * than that right fade or the photograph ends on a hard vertical line
   * against the limestone.
   */
  shift?: string;
  /** Where the panel leads. */
  href: string;
  /** Names the destination — the panel's accessible name and its visible label. */
  linkLabel: string;
  children?: ReactNode;
  /**
   * The text column is the sole child of a `flex` container, so its cross-axis
   * position (which physical side it starts on) flips with the ambient `dir`
   * the same way any flex child does — but the photograph beside it is a
   * separate, absolutely positioned sibling pinned to the physical right via
   * `right-0`, which never flips. Left un-forced, the Arabic homepage's RTL
   * context would slide the text column onto the same right-hand side as the
   * photograph, burying it underneath. Hardcoding `dir="ltr"` on the section
   * keeps the two-panel composition identical in both languages (photo right,
   * text left — the brief's own "images stay put" guidance), while the text
   * column re-declares `dir="rtl"` on itself so Arabic content still reads
   * and aligns correctly within its slot.
   */
  locale?: Locale;
}) {
  const isAr = locale === "ar";

  return (
    <section className="relative bg-limestone mt-[calc(-1*var(--header-h))]" dir="ltr">
      {/*
       * `min-h` rather than a fixed height: the type sets the floor on a phone,
       * and on a laptop the section fills the viewport so the photograph has
       * the full height the reference gives it. `svh` because `vh` measures the
       * chrome-less viewport on mobile Safari and leaves the hero taller than
       * the screen.
       */}
      <Container className="relative flex flex-col justify-center pb-16 pt-[calc(var(--header-h)+3rem)] wide:min-h-[100svh] wide:pb-24 wide:pt-[calc(var(--header-h)+2rem)]">
        {/* Half the section, so the statement never runs under the image. */}
        <div
          className={`wide:w-[52%] wide:pr-10 ${isAr ? "text-right" : ""}`}
          dir={isAr ? "rtl" : undefined}
          lang={isAr ? "ar" : undefined}
        >
          {eyebrow && (
            <p className="eyebrow eyebrow-hero rise flex items-center gap-3 text-carbon/60">
              <span aria-hidden="true" className="h-px w-7 bg-carbon/40" />
              {eyebrow}
            </p>
          )}
          {/*
           * `hero-display`, not `font-display` — the SHARIO type system's
           * editorial serif headline treatment, scoped to this one hero.
           * Lines are broken on sense in the `title` itself rather than left
           * to wrap: no character-measure cap here, since one was tuned to a
           * previous headline's width and just forces an extra, unwanted
           * break on any other copy. The column (`wide:w-[52%]` above) is
           * what actually bounds the width once past mobile.
           *
           * The top margin belongs to the eyebrow above it, so it goes when the
           * eyebrow does — otherwise the headline sits low in a hero that is
           * meant to open on it.
           */}
          <h1
            className={`hero-display rise text-[2.25rem] wide:text-[clamp(2.625rem,3.125vw,3rem)] ${
              eyebrow ? "mt-7" : ""
            }`}
            style={{ animationDelay: "140ms" }}
          >
            {title}
          </h1>
          {subhead && (
            <p
              className={`rise mt-7 max-w-[440px] text-[1.1875rem] leading-[1.55] text-carbon/65 wide:text-[1.3125rem] ${isAr ? "font-arabic" : "font-body"}`}
              style={{ animationDelay: "280ms" }}
            >
              {subhead}
            </p>
          )}
          {children && (
            <div
              className="rise mt-10 flex flex-wrap gap-3.5"
              style={{ animationDelay: "400ms" }}
            >
              {children}
            </div>
          )}
        </div>
      </Container>

      {/*
       * The photograph. Absolute and full-height from `wide` up, stacked and
       * 4:5 below it. `focus` anchors the crop — a landscape original cropped
       * to a tall column loses the subject if it is centred.
       *
       * Both edges are masked to transparent so the photograph dissolves into
       * the limestone instead of butting against it on a hard vertical seam.
       * The left fade is the one that matters compositionally; the right fade
       * exists so `--hero-shift` can pull the figure left — it covers the band
       * the image vacates at the screen edge, which would otherwise read as a
       * mistake rather than as the same dissolve. Both live in `.hero-shift` in
       * `globals.css`, not here, because the stops have to be computed against
       * the offset.
       *
       * The reference reads as one image because its photograph is shot on the
       * same cream as the page; ours is not, and the fade is what buys the same
       * read without repainting the section. It runs only from `wide` up —
       * stacked under the type on a phone the image is full-bleed, and a fade
       * there would only look like a printing fault.
       *
       * The image is a link, so it carries a standing label rather than only a
       * hover state: an image that does something has to look like it does.
       */}
      <div className="relative aspect-[4/5] w-full wide:absolute wide:bottom-0 wide:right-0 wide:top-[var(--header-h)] wide:aspect-auto wide:w-[46%]">
        <Link
          href={href}
          aria-label={linkLabel}
          className="group frame relative block h-full w-full"
        >
          <Image
            src={src}
            alt={alt}
            fill
            sizes="(min-width: 880px) 46vw, 100vw"
            priority
            className={`hero-shift object-cover ${focus ?? ""}`}
            style={{ "--hero-shift": shift ?? "-6%" } as CSSProperties}
          />
          <span
            aria-hidden="true"
            dir={isAr ? "rtl" : undefined}
            className={`absolute bottom-5 right-5 inline-flex items-center gap-2.5 rounded-full bg-porcelain/92 px-5 py-3 text-carbon backdrop-blur-[6px] transition-colors duration-500 group-hover:bg-carbon group-hover:text-porcelain ${isAr ? "font-arabic text-[0.75rem]" : "text-[11px] uppercase tracking-[0.08em]"}`}
          >
            {linkLabel}
            <span
              className={`transition-transform duration-500 ${isAr ? "group-hover:-translate-x-1" : "group-hover:translate-x-1"}`}
            >
              {isAr ? "←" : "→"}
            </span>
          </span>
        </Link>
      </div>
    </section>
  );
}

/** Breadcrumb trail, as the reference sets it above an inner-page headline. */
export function Breadcrumb({
  items,
  locale = "en",
}: {
  items: readonly { href?: string; label: string }[];
  locale?: Locale;
}) {
  const isAr = locale === "ar";

  return (
    <nav aria-label={isAr ? "مسار التصفح" : "Breadcrumb"} className="rise">
      <ol
        className={`flex flex-wrap items-center gap-2 text-porcelain/60 ${isAr ? "font-arabic text-[0.6875rem]" : "eyebrow"}`}
      >
        {items.map((item, i) => (
          <li key={item.label} className="flex items-center gap-2">
            {i > 0 && <span aria-hidden="true">/</span>}
            {item.href ? (
              <Link
                href={item.href}
                className="transition-colors duration-300 hover:text-porcelain"
              >
                {item.label}
              </Link>
            ) : (
              <span className="text-porcelain/85">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

/**
 * A hero with no photograph.
 *
 * The reference opens inner pages on a flat dark ground. That is what
 * `tone="carbon"` gives, and it is what the twelve service pages use — the
 * only images left in the library for them are collateral mockups carrying the
 * wordmark, or worse the retired tagline, and both collide with a headline
 * laid over them. Type on a dark ground is honest about what photography
 * exists and matches the reference besides.
 */
const typeHeroTitleScale = {
  /** The service detail pages — a heading, not the hero's whole statement. */
  md: "text-[2.25rem] font-normal leading-[1.08] wide:text-[clamp(2.5rem,3.8vw,3.5rem)]",
  /** Contact — the one TypeHero page still carrying the hero's full statement. */
  lg: "text-[2.5rem] font-normal leading-[1.05] wide:text-[clamp(3rem,5.4vw,4.75rem)]",
};

export function TypeHero({
  src,
  focus,
  eyebrow,
  title,
  titleScale = "md",
  subhead,
  tone = "porcelain",
  size = "auto",
  breadcrumb,
  children,
}: {
  /** An optional photograph behind the band, dark carbon text always wins over it. */
  src?: string;
  focus?: string;
  eyebrow: string;
  /** Omit on pages whose hero should show only the page name — About's pattern. */
  title?: ReactNode;
  titleScale?: keyof typeof typeHeroTitleScale;
  subhead?: string;
  tone?: "porcelain" | "carbon";
  /**
   * `tall` matches the photographic `Hero`'s minimum height, for the one
   * TypeHero page whose statement needs to read as a full editorial hero
   * rather than a page-title band — everywhere else the section still sizes
   * to its content, unchanged.
   */
  size?: "auto" | "tall";
  breadcrumb?: ReactNode;
  children?: ReactNode;
}) {
  const dark = tone === "carbon" || Boolean(src);
  const tall = size === "tall";

  return (
    // The carbon variant carries the header the same way a photographic hero
    // does — pulled up under the bar, then padded back down.
    <section
      className={`relative ${tall ? "flex min-h-[440px] items-end wide:min-h-[60vh]" : ""} ${
        dark
          ? "bg-carbon text-porcelain mt-[calc(-1*var(--header-h))]"
          : "border-b border-carbon/12"
      }`}
    >
      {src && (
        <>
          <Image
            src={src}
            alt=""
            fill
            sizes="100vw"
            priority={tall}
            className={`${tall ? "settle" : ""} object-cover ${focus ?? ""}`}
          />
          {/* Same bottom scrim as `Hero`, plus the same header-strip scrim — see the comments there. Currently no caller passes `src` here, but keeping the two components symmetric means a future photo TypeHero doesn't quietly reintroduce the header-contrast bug the strip scrim exists to prevent. */}
          <div className="absolute inset-0 bg-gradient-to-t from-carbon/65 via-carbon/10 via-45% to-transparent" />
          <div className="absolute inset-x-0 top-0 h-[calc(var(--header-h)+64px)] bg-gradient-to-b from-carbon/70 via-carbon/25 to-transparent" />
        </>
      )}
      <Container
        className={`relative z-10 w-full ${
          dark
            ? "pb-14 pt-[calc(var(--header-h)+3rem)] wide:pb-24 wide:pt-[calc(var(--header-h)+4.5rem)]"
            : "pb-14 pt-12 wide:pb-24 wide:pt-20"
        }`}
      >
        {breadcrumb}
        <p
          className={`eyebrow eyebrow-hero rise mt-1 flex items-center gap-3 ${
            dark ? "text-porcelain/80" : "text-carbon/60"
          }`}
        >
          <span aria-hidden="true" className="h-px w-7 bg-mist" />
          {eyebrow}
        </p>
        {title && (
          <h1
            className={`rise mt-6 max-w-[900px] font-display ${typeHeroTitleScale[titleScale]}`}
            style={{ animationDelay: "140ms" }}
          >
            {title}
          </h1>
        )}
        {subhead && (
          <p
            className={`rise mt-7 max-w-[620px] text-[1.0625rem] leading-[1.7] wide:text-[1.1875rem] ${
              dark ? "text-porcelain/80" : "text-carbon/75"
            }`}
            style={{ animationDelay: "280ms" }}
          >
            {subhead}
          </p>
        )}
        {children && (
          <div
            className="rise mt-10 flex flex-wrap gap-3.5"
            style={{ animationDelay: "400ms" }}
          >
            {children}
          </div>
        )}
      </Container>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Bands                                                                       */
/* -------------------------------------------------------------------------- */

/**
 * The dark figures band — the reference's stat block, set in this system's
 * ledger measure: Cormorant numerals over a hairline with a Jost micro-label,
 * rather than the reference's bordered tiles.
 *
 * This is the page's signature. It is the one place figures are allowed to run
 * large, and it is why the surrounding sections stay quiet.
 */
export function StatBand({
  eyebrow,
  title,
  body,
  stats,
  action,
}: {
  eyebrow: string;
  title: ReactNode;
  body?: string;
  stats: readonly { figure: string; label: string }[];
  action?: ReactNode;
}) {
  return (
    <Band tone="carbon">
      <div className="grid gap-12 wide:grid-cols-[1fr_1.15fr] wide:items-center wide:gap-24">
        <div>
          <p className="eyebrow flex items-center gap-3 text-porcelain/70">
            <span aria-hidden="true" className="h-px w-6 bg-mist" />
            {eyebrow}
          </p>
          <Heading scale="md" className="mt-5">
            {title}
          </Heading>
          {body && (
            <p className="mt-6 max-w-[480px] text-[0.9375rem] leading-[1.7] text-porcelain/70">
              {body}
            </p>
          )}
          {action && <div className="mt-9">{action}</div>}
        </div>

        <div className="grid grid-cols-2 gap-x-8 gap-y-10 wide:gap-x-12">
          {stats.map((stat, i) => (
            <div key={stat.label} className="reveal ledger" data-delay={i * 70}>
              <p className="ledger-figure ledger-figure-sm">
                <CountUp value={stat.figure} />
              </p>
              <p className="label-sm mt-4 text-porcelain/60">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </Band>
  );
}

/**
 * The closing band. The reference puts a saturated accent field here; Limestone
 * is this palette's equivalent weight against Porcelain, and Carbon is already
 * spent on the figures band above it.
 */
export function CtaBand({
  title,
  sub,
  children,
  arabicAccent = false,
}: {
  title: ReactNode;
  sub?: string;
  children: ReactNode;
  /**
   * Opt-in only. `CtaBand` closes nearly every page on the site, so the
   * Arabic mark recurring here by default would make it the opposite of
   * selective — each caller that wants it turns it on for that one page.
   */
  arabicAccent?: boolean;
}) {
  return (
    <section
      className={`relative bg-limestone ${arabicAccent ? "overflow-hidden" : ""}`}
    >
      {arabicAccent && (
        <span
          aria-hidden="true"
          className="wordmark-ar pointer-events-none absolute -right-[6%] top-1/2 z-0 w-[38%] -translate-y-1/2 text-carbon/[0.05] wide:-right-[2%] wide:w-[20%]"
        />
      )}
      <Container className="relative z-10 py-16 text-center wide:py-[clamp(4.5rem,8vw,7.5rem)]">
        <Heading as="p" scale="md" className="mx-auto max-w-[820px]">
          {title}
        </Heading>
        {sub && (
          <p className="mx-auto mt-6 max-w-[560px] text-[1.0625rem] leading-[1.7] text-carbon/75">
            {sub}
          </p>
        )}
        <div className="mt-10 flex flex-wrap justify-center gap-3.5">
          {children}
        </div>
      </Container>
    </section>
  );
}

/**
 * The Arabic brand accent: "سيمفونية الهوية" — the exact Arabic rendering of
 * the site's own tagline, "A Symphony of Identity" — set alone, large, on
 * the one field in the palette built for exactly this. The Brand Book calls
 * Mist a "selective accent"; it's spent nowhere else as a full section
 * ground, which is what keeps this reading as a deliberate pause rather than
 * a colour the site happens to reach for again.
 *
 * No translation sits beside it, the same way the Arabic wordmark elsewhere
 * on the site carries no gloss — it's a mark of the brand's bilingual
 * identity, not a caption asking to be read.
 *
 * `dir="rtl"` and no `letter-spacing`: Arabic letterforms join contextually
 * (initial/medial/final/isolated), so any positive tracking severs those
 * connections and reads as visibly broken, not just loose — never add it
 * here even to match another line's rhythm.
 */
export function ArabicStatement() {
  return (
    <Band className="bg-mist">
      <p
        dir="rtl"
        lang="ar"
        className="reveal mx-auto max-w-[900px] text-center font-arabic text-[2.25rem] leading-[1.9] text-carbon wide:text-[clamp(2.75rem,5.4vw,4.75rem)] wide:leading-[1.7]"
      >
        {site.taglineAr}
      </p>
    </Band>
  );
}

/** A full-bleed photograph with one centred serif line over it. */
export function StatementImage({
  src,
  children,
}: {
  src: string;
  children: ReactNode;
}) {
  return (
    <section className="relative flex h-[46vh] items-center justify-center wide:h-[58vh]">
      <Image src={src} alt="" fill sizes="100vw" className="object-cover" />
      <div className="absolute inset-0 bg-carbon/45" />
      <p className="reveal relative z-10 max-w-[900px] px-6 text-center font-display text-[1.875rem] font-normal leading-[1.2] text-porcelain wide:text-[clamp(1.875rem,3.6vw,3rem)]">
        {children}
      </p>
    </section>
  );
}

/**
 * A photograph with a caption — the only way an image is allowed onto a page
 * that is not a hero or a full-bleed statement.
 *
 * The rule this enforces: no picture stands bare. Each one carries a label
 * naming what it shows and a line saying why it is there, so the imagery reads
 * as evidence rather than decoration. Combined with `npm run check:images`,
 * which forbids any photograph appearing in two places, that keeps a small
 * library working hard without repeating itself.
 */
export function Figure({
  src,
  label,
  caption,
  ratio = "aspect-[16/9]",
  width,
  height,
  sizes = "(min-width: 880px) 60vw, 100vw",
  tone = "porcelain",
}: {
  src: string;
  /** What the photograph is. */
  label: string;
  /** Why it is on this page. */
  caption: string;
  ratio?: string;
  /**
   * The photograph's own pixel dimensions. Supply both and the frame takes the
   * picture's real proportion instead of a fixed ratio — nothing is cropped,
   * which is what a photograph chosen for its composition needs.
   */
  width?: number;
  height?: number;
  sizes?: string;
  tone?: Tone;
}) {
  const natural = width !== undefined && height !== undefined;

  return (
    <figure className="reveal flex flex-col gap-4">
      {natural ? (
        <div className="frame relative w-full">
          <Image
            src={src}
            alt={label}
            width={width}
            height={height}
            sizes={sizes}
            className="h-auto w-full"
          />
        </div>
      ) : (
        <Frame src={src} alt={label} ratio={ratio} sizes={sizes} tone={tone} />
      )}
      <figcaption
        className={`flex flex-col gap-1.5 border-l-2 pl-4 ${
          tone === "carbon" ? "border-mist/60" : "border-mist"
        }`}
      >
        <span
          className={`eyebrow ${tone === "carbon" ? "text-porcelain/70" : "text-carbon/55"}`}
        >
          {label}
        </span>
        <span
          className={`max-w-[46ch] text-[0.9375rem] leading-[1.6] ${
            tone === "carbon" ? "text-porcelain/80" : "text-carbon/75"
          }`}
        >
          {caption}
        </span>
      </figcaption>
    </figure>
  );
}

/** A photograph in a fixed ratio, with the frame's slow settle on reveal. */
export function Frame({
  src,
  ratio,
  sizes = "(min-width: 880px) 50vw, 100vw",
  tone = "porcelain",
  /**
   * Empty by default — most `Frame` usages are the site's own material
   * "grounds" (texture crops, card backgrounds) rather than photographs with
   * content of their own, and an empty alt is the correct call for those.
   * Callers showing an actual subject (a portrait, a real interior) should
   * pass a real description instead.
   */
  alt = "",
}: {
  src: string;
  ratio: string;
  sizes?: string;
  tone?: Tone;
  alt?: string;
}) {
  return (
    <div
      className={`frame relative w-full ${ratio} ${
        tone === "carbon" ? "bg-porcelain/10" : "bg-limestone/60"
      }`}
    >
      <Image src={src} alt={alt} fill sizes={sizes} className="object-cover" />
    </div>
  );
}

/**
 * A toned placeholder panel for slots awaiting real photography — Insights
 * cards, shipped before dedicated imagery exists for them. Carries the same
 * numbered-badge motif the rest of the site uses (`Card`, `StatBand`) rather
 * than a blank grey box, so an empty slot still reads as part of this design
 * system and not as a broken image.
 */
export function TonePanel({
  index,
  ratio = "aspect-[4/3]",
  tone = "limestone",
  className = "",
}: {
  index: string;
  ratio?: string;
  tone?: "limestone" | "carbon";
  className?: string;
}) {
  const dark = tone === "carbon";

  return (
    <div
      className={`relative flex w-full items-center justify-center overflow-hidden ${ratio} ${
        dark ? "bg-carbon" : "bg-limestone/50"
      } ${className}`}
    >
      <span
        aria-hidden="true"
        className={`font-display text-[4.5rem] leading-none wide:text-[6.5rem] ${
          dark ? "text-porcelain/10" : "text-carbon/10"
        }`}
      >
        {index}
      </span>
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
  accent?: boolean;
  columns?: 1 | 2;
}) {
  const rule = hairline(tone);

  return (
    <div className={`grid gap-x-10 ${columns === 2 ? "wide:grid-cols-2" : ""}`}>
      {items.map((item, i) => (
        <div
          key={item}
          className={`reveal flex items-baseline gap-3.5 border-t py-4 ${rule}`}
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
