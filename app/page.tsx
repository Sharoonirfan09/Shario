import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLink,
  Button,
  CallToAction,
  GridPlate,
  ImagePlate,
  LedgerEntry,
  Plate,
  SplitPlate,
} from "@/components/ui";
import { industries, proof, services, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Shario — A Symphony of Identity",
  description:
    "Shario is a boutique creative studio in Dubai composing coherent brand identities across strategy, design and technology.",
  alternates: { canonical: "/" },
};

/** Brand Book p23 — the photographic language, in the book's own frames. */
const direction = [
  { src: "/images/book/photo-plinth.jpg", caption: "Clean crop, negative space" },
  { src: "/images/book/photo-lounge.jpg", caption: "Calm, even tone" },
  { src: "/images/book/photo-desk.jpg", caption: "Material, close" },
  { src: "/images/book/photo-book.jpg", caption: "The mark, in hand" },
  { src: "/images/book/photo-shelf.jpg", caption: "Text sits in quiet zones" },
  { src: "/images/book/digital-tablet.jpg", caption: "Identity on screen" },
];

/** The four capabilities named on the home page, in the order the brief sets them. */
const homeServices = services.slice(0, 4);

export default function HomePage() {
  return (
    <>
      {/*
       * Cover — the Brand Book opens on a full-bleed field with the statement
       * centred over it (p01, p32). The site opens the same way.
       */}
      <ImagePlate
        src="/images/reception.jpg"
        focus="object-[72%_78%] sm:object-center"
        label={`${site.location} · Creative studio`}
        footnote="Independent thinking. Sharper execution."
        index="Cover"
        title="A Symphony of Identity."
        standfirst="One vision, composed across every touchpoint. A boutique creative studio in Dubai."
      >
        <Button href="/contact">Let’s connect</Button>
        <ArrowLink href="/work">Explore our work</ArrowLink>
      </ImagePlate>

      {/* The ledger — its own plate, the way the book gives one idea one page. */}
      <Plate
        label="The measure"
        footnote="Clarity before expression."
        index="01 / 06"
      >
        <div className="grid gap-x-12 gap-y-16 sm:grid-cols-2 lg:grid-cols-4">
          {proof.slice(0, 4).map((entry, i) => (
            <LedgerEntry
              key={entry.label}
              figure={entry.figure}
              label={entry.label}
              delay={i * 110}
              size="sm"
            />
          ))}
        </div>
      </Plate>

      {/*
       * Positioning — the Brand Book's split spread (p02): the frame narrows
       * into a column on the left, the photograph takes the rest.
       */}
      <SplitPlate
        src="/images/book/photo-stair.jpg"
        label="Introduction"
        footnote="Clarity before expression."
        index="02 / 06"
        title="A system for coherence."
      >
        <p className="text-carbon-60">
          Positioning, identity and digital presence, composed as one
          system — so every expression carries the same intent.
        </p>
        <div className="mt-10">
          <ArrowLink href="/about">About the studio</ArrowLink>
        </div>
      </SplitPlate>

      {/* Capabilities */}
      <Plate
        label="Capabilities"
        footnote="One connected system."
        index="03 / 06"
      >
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4">
              <p className="label-sm text-carbon-40">Capabilities</p>
              <h2 className="title reveal mt-7 text-[clamp(2rem,4.4vw,3.25rem)]">
                One connected system.
              </h2>
              <p className="reveal mt-7 max-w-sm text-carbon-60" data-delay="90">
                Strategy, design, communication and technology, handled
                together — never as separate pieces.
              </p>
            </div>

            <div className="lg:col-span-7 lg:col-start-6">
              <ul>
                {homeServices.map((service, i) => (
                  <li key={service.slug}>
                    <Link
                      href={`/services/${service.slug}`}
                      className="reveal group flex flex-col gap-2 border-t border-rule py-8 transition-colors duration-500 hover:bg-limestone/40 sm:flex-row sm:items-baseline sm:gap-10"
                      data-delay={i * 80}
                    >
                      <h3 className="title shrink-0 text-[1.5rem] sm:w-[13rem]">
                        {service.name}
                      </h3>
                      <p className="text-carbon-60">{service.descriptor}</p>
                      <span
                        aria-hidden="true"
                        className="label hidden shrink-0 self-center text-carbon-40 transition-transform duration-500 group-hover:translate-x-1.5 sm:block"
                      >
                        →
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="reveal mt-10 border-t border-rule pt-8">
                <ArrowLink href="/services">All capabilities</ArrowLink>
              </div>
            </div>
          </div>
      </Plate>

      <GridPlate
        label="Photographic direction"
        footnote="Warm, cinematic, quietly international."
        index="04 / 06"
        frames={direction}
      />

      {/* Standards, in full */}
      <Plate
        label="Standards"
        footnote="Purpose before decoration."
        index="05 / 06"
      >
          <div className="max-w-2xl">
            <p className="label-sm text-carbon-40">Standards</p>
            <h2 className="title reveal mt-7 text-[clamp(2rem,4.4vw,3.25rem)]">
              Harmony is a discipline, not an accident.
            </h2>
          </div>

          <div className="mt-16 grid gap-x-12 gap-y-14 sm:grid-cols-2">
            {proof.slice(0, 4).map((entry, i) => (
              <LedgerEntry
                key={entry.label}
                figure={entry.figure}
                label={entry.label}
                note={entry.note}
                delay={i * 90}
              />
            ))}
          </div>
      </Plate>

      {/* Sectors */}
      <Plate
        label="Sectors"
        footnote="Across Dubai and the wider UAE."
        index="06 / 06"
        tone="limestone"
      >
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4">
              <p className="label-sm text-carbon-60">Sectors</p>
              <h2 className="title reveal mt-7 text-[clamp(2rem,4.4vw,3.25rem)]">
                Across Dubai and the wider UAE.
              </h2>
            </div>
            <ul className="lg:col-span-7 lg:col-start-6">
              {industries.slice(0, 7).map((industry, i) => (
                <li key={industry}>
                  <Link
                    href={`/contact?sector=${encodeURIComponent(industry)}`}
                    className="reveal title group flex items-baseline justify-between gap-6 border-t border-limestone-deep py-5 text-[clamp(1.35rem,2.6vw,1.9rem)] transition-colors duration-500 hover:text-carbon-60"
                    data-delay={i * 60}
                  >
                    {industry}
                    <span
                      aria-hidden="true"
                      className="label shrink-0 self-center opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100 sm:-translate-x-2"
                    >
                      →
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
      </Plate>

      <CallToAction
        title="Begin a conversation."
        body="Independent thinking. Sharper execution. How every engagement begins."
      />
    </>
  );
}
