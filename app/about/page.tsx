import type { Metadata } from "next";
import Image from "next/image";
import {
  Band,
  Divider,
  Eyebrow,
  FinalCta,
  Hero,
  MarkerColumns,
  NumberedRows,
  Pill,
  SectionHead,
  SectionLabel,
  StatementImage,
} from "@/components/ui";
import { personality, site, values } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "SHARIO is a boutique, founder-led creative studio in Dubai at the intersection of strategy, creativity and technology.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <Hero
        src="/images/book/corridor-dusk.jpg"
        eyebrow="Shario — About"
        title={
          <>
            Personal in vision.
            <br />
            Intelligent in process.
          </>
        }
        subhead="Distinctive in expression."
        priority
      />

      {/* 01 — The Meaning Behind Shario */}
      <Band>
        <SectionLabel>The meaning behind Shario</SectionLabel>
        <Eyebrow className="mb-10 wide:mb-16">
          01 / The Meaning Behind Shario
        </Eyebrow>
        {/* The rail is narrow by design — SHAR sits in the 260px column the
            handoff gives every marker rail, IO takes the remainder. */}
        <div className="grid gap-6 wide:grid-cols-[260px_1fr] wide:gap-[60px]">
          <div className="reveal">
            <p className="mb-4 font-display text-[1.75rem] font-medium wide:text-[clamp(1.75rem,3.2vw,2.625rem)]">
              SHAR
            </p>
            <p className="max-w-[380px] text-[0.9375rem] leading-[1.7] text-carbon/75">
              Derived from Sharoon — the name and perspective behind the studio.
              It represents personal vision, creative ownership and founder-led
              direction.
            </p>
          </div>
          <div className="reveal" data-delay="120">
            <p className="mb-4 font-display text-[1.75rem] font-medium wide:text-[clamp(1.75rem,3.2vw,2.625rem)]">
              IO
            </p>
            <p className="max-w-[380px] text-[0.9375rem] leading-[1.7] text-carbon/75">
              Inspired by input and output — the fundamental exchange through
              which information, ideas and intention are transformed into
              meaningful results.
            </p>
          </div>
        </div>
        <p className="reveal mt-10 max-w-[760px] font-body text-xl italic leading-[1.6] text-carbon/85 wide:mt-16">
          Together, SHARIO represents the relationship between individual vision
          and intelligent execution — where ideas enter, creativity intervenes
          and distinctive identities emerge.
        </p>
      </Band>

      <Divider />

      {/* 02 — Who We Are */}
      <Band>
        <MarkerColumns marker="02 / Who We Are" heading="Who we are">
          <p className="reveal max-w-[820px] font-display text-[1.75rem] font-normal leading-[1.3] wide:text-[clamp(1.75rem,3.2vw,2.625rem)]">
            A boutique, founder-led studio at the intersection of strategy,
            creativity and technology.
          </p>
          <p
            className="reveal mt-8 max-w-[640px] font-body text-[1.1875rem] leading-[1.7] text-carbon/80"
            data-delay="120"
          >
            SHARIO creates coherent brand ecosystems in which positioning,
            identity, digital presence, content, communication, creative
            technology and growth work together as one connected system.
            Independent in structure. International in outlook. Selective by
            choice.
          </p>
        </MarkerColumns>
      </Band>

      {/* Vision / Mission */}
      <Band tone="carbon">
        <div className="grid gap-10 wide:grid-cols-2 wide:gap-16">
          <div className="reveal">
            <Eyebrow tone="carbon" className="mb-5">
              Vision
            </Eyebrow>
            <p className="font-display text-[1.625rem] font-normal leading-[1.3] wide:text-[2.125rem]">
              {site.vision}
            </p>
          </div>
          <div className="reveal" data-delay="120">
            <Eyebrow tone="carbon" className="mb-5">
              Mission
            </Eyebrow>
            <p className="font-display text-[1.625rem] font-normal leading-[1.3] wide:text-[2.125rem]">
              {site.mission}
            </p>
          </div>
        </div>
      </Band>

      {/* 03 — Values */}
      <Band>
        <SectionHead
          title={
            <>
              Our Standard
              <br />
              Is Coherence.
            </>
          }
          marker="03 / Values"
          scale="md"
        />
        <NumberedRows rows={values} />
      </Band>

      {/* 04 — Personality */}
      <Band>
        <SectionLabel>Personality</SectionLabel>
        <Eyebrow className="mb-10 wide:mb-16">04 / Personality</Eyebrow>
        <div className="grid gap-6 wide:grid-cols-[260px_1fr] wide:gap-[60px]">
          <PersonalityList title="SHARIO Is" words={personality.is} />
          <PersonalityList
            title="SHARIO Is Never"
            words={personality.isNever}
            dim
          />
        </div>
      </Band>

      {/* 05 — Leadership */}
      <Band tone="limestone">
        <SectionLabel>Leadership</SectionLabel>
        <Eyebrow className="mb-10 wide:mb-16">05 / Leadership</Eyebrow>
        <div className="grid items-center gap-6 wide:grid-cols-[220px_1fr] wide:gap-[60px]">
          {/*
           * No founder portrait has been supplied — the handoff leaves this as
           * a drop-zone. The monogram stands in on the brand's own ground so
           * the section reads as finished rather than broken; swap the Image
           * for the portrait when it arrives.
           */}
          <div className="reveal relative h-[140px] w-[140px] overflow-hidden rounded-full bg-limestone-deep wide:h-[220px] wide:w-[220px]">
            <Image
              src="/brand/monogram.png"
              alt=""
              fill
              sizes="220px"
              className="scale-[0.45] object-contain"
            />
          </div>
          <div className="reveal" data-delay="120">
            <p className="mb-2 font-display text-[2rem] font-medium">
              {site.founder}
            </p>
            <p className="mb-6 text-[0.8125rem] uppercase tracking-[0.08em] text-carbon/60">
              {site.founderRole}
            </p>
            <p className="max-w-[560px] font-body text-xl italic leading-[1.6]">
              “{site.founderQuote}”
            </p>
          </div>
        </div>
      </Band>

      <StatementImage src="/images/book/photo-plinth.jpg">
        Clarity before expression. Purpose before decoration.
      </StatementImage>

      <FinalCta
        lines={["Let’s compose", "something distinctive."]}
        tone="porcelain"
      />
    </>
  );
}

function PersonalityList({
  title,
  words,
  dim = false,
}: {
  title: string;
  words: readonly string[];
  dim?: boolean;
}) {
  return (
    <div>
      <p className="mb-5 text-[0.8125rem] uppercase tracking-[0.1em] text-carbon/60">
        {title}
      </p>
      <div className="flex flex-wrap gap-3">
        {words.map((word) => (
          <Pill key={word} dim={dim}>
            {word}
          </Pill>
        ))}
      </div>
    </div>
  );
}
