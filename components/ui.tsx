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

/** Masthead for inner pages: asymmetric, headline left, standfirst right. */
export function PageHeader({
  eyebrow,
  title,
  standfirst,
}: {
  eyebrow: string;
  title: string;
  standfirst: string;
}) {
  return (
    <section className="border-b border-rule">
      <Container className="py-20 md:py-28">
        <div className="rise">
          <Eyebrow>{eyebrow}</Eyebrow>
        </div>
        <div className="mt-12 grid gap-10 lg:grid-cols-12 lg:gap-12">
          <h1
            className="display rise text-balance text-[clamp(2.6rem,6vw,5rem)] lg:col-span-7"
            style={{ animationDelay: "120ms" }}
          >
            {title}
          </h1>
          <div className="lg:col-span-4 lg:col-start-9 lg:pt-3">
            <p
              className="lede rise max-w-xl text-carbon-60"
              style={{ animationDelay: "240ms" }}
            >
              {standfirst}
            </p>
          </div>
        </div>
      </Container>
    </section>
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
  const className =
    "label group inline-flex items-center gap-3 text-carbon transition-opacity duration-300 hover:opacity-65";
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
    <div className="ledger reveal" data-delay={delay}>
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
  );
}

/** Closing call to action, repeated at the foot of every page. */
export function CallToAction({
  title,
  body,
  action = "Book a strategy call",
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
