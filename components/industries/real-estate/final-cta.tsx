import type { Industry } from "@/lib/site";
import { Container } from "@/components/ui";
import { cta } from "@/lib/site";

/**
 * The closing band — a dramatic full-width Carbon section standing in for
 * the generic template's Limestone `CtaBand`. Copy is `industry.ctaTitle`
 * and the existing "book a free call" sub-line, unchanged; the CTA label
 * matches the hero's for consistency, still pointed at the same WhatsApp
 * link carrying `industry.ctaMessage`.
 *
 * The only new motion is `.cta-glow` (`globals.css`) — a slow radial drift
 * plus a static grain layer, both opacity/transform, both stripped under
 * `prefers-reduced-motion`.
 */
export function FinalCta({ industry }: { industry: Industry }) {
  return (
    <section className="relative overflow-hidden bg-carbon text-porcelain">
      <div aria-hidden="true" className="cta-glow" />
      <div aria-hidden="true" className="cta-grain" />

      <Container className="relative z-10 py-20 text-center wide:py-[clamp(6rem,11vw,10rem)]">
        <p className="reveal eyebrow re-label flex items-center justify-center gap-3 text-porcelain/80">
          <span aria-hidden="true" className="h-px w-6 bg-mist" />
          Let&apos;s Talk
        </p>
        <h2 className="reveal mx-auto mt-7 max-w-[820px] font-display text-[2.5rem] font-normal leading-[1.08] wide:text-[clamp(3rem,6vw,5.5rem)]">
          {industry.ctaTitle[0]}
          <br />
          {industry.ctaTitle[1]}
        </h2>
        <p className="reveal mx-auto mt-7 max-w-[540px] text-[1.0625rem] font-normal leading-[1.7] text-porcelain/85">
          Book a free call and we will come back with a clear, no-obligation
          plan for a system mapped to your pipeline.
        </p>
        <div className="reveal mt-11">
          <a
            href={`${cta.href}?text=${encodeURIComponent(industry.ctaMessage)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block rounded-full border border-porcelain bg-porcelain px-11 py-[18px] text-xs uppercase tracking-[0.08em] text-carbon transition-colors duration-500 hover:border-mist hover:bg-mist"
          >
            Book a launch strategy call
          </a>
        </div>
      </Container>
    </section>
  );
}
