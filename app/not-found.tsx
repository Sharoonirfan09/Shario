import type { Metadata } from "next";
import { Container, Heading, PillLink } from "@/components/ui";

/**
 * Next's own 404 is unstyled — no header, no footer, no SHARIO type. This is
 * the one page on the site every broken or mistyped link can land on, so it
 * gets the same voice as everywhere else rather than a bare browser default.
 */
export const metadata: Metadata = {
  title: "Page Not Found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <Container className="flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
      <p className="eyebrow flex items-center gap-3 text-carbon/55">
        <span aria-hidden="true" className="h-px w-6 bg-mist" />
        404
      </p>
      <Heading as="h1" scale="md" className="mt-5">
        This page moved, or never existed.
      </Heading>
      <p className="mt-6 max-w-[480px] text-[1.0625rem] leading-[1.7] text-carbon/70">
        Check the address, or pick up from one of these instead.
      </p>
      <div className="mt-9 flex flex-wrap items-center justify-center gap-3.5">
        <PillLink href="/" tone="solid" size="lg">
          Back to Home
        </PillLink>
        <PillLink href="/services" tone="outline" size="lg">
          Our Services
        </PillLink>
        <PillLink href="/contact" tone="outline" size="lg">
          Contact
        </PillLink>
      </div>
    </Container>
  );
}
