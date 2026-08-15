import type { Metadata } from "next";
import { Container, Heading, PillLink } from "@/components/ui";

export const metadata: Metadata = {
  title: "Страница не найдена",
  robots: { index: false, follow: true },
};

export default function RussianNotFound() {
  return (
    <Container className="flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
      <p className="eyebrow flex items-center gap-3 text-carbon/55">
        <span aria-hidden="true" className="h-px w-6 bg-mist" />
        404
      </p>
      <Heading as="h1" scale="md" className="mt-5">
        Эта страница переехала — или никогда не существовала.
      </Heading>
      <p className="mt-6 max-w-[480px] text-[1.0625rem] leading-[1.7] text-carbon/70">
        Проверьте адрес или начните с одной из этих ссылок.
      </p>
      <div className="mt-9 flex flex-wrap items-center justify-center gap-3.5">
        <PillLink href="/ru" tone="solid" size="lg">
          На главную
        </PillLink>
        <PillLink href="/ru/services" tone="outline" size="lg">
          Наши услуги
        </PillLink>
        <PillLink href="/ru/contact" tone="outline" size="lg">
          Контакты
        </PillLink>
      </div>
    </Container>
  );
}
