import Image from "next/image";
import clientLogos from "@/lib/client-logos.json";

type Logo = (typeof clientLogos)[number];

/**
 * Optical sizing: every mark gets roughly the same *area* rather than the same
 * height, so a long wordmark (Khayal, LumaSleep) and a square crest (Paasand,
 * Al Basit) read at equal weight. Then each is capped so tall marks don't tower
 * and wide ones don't touch the card edge.
 *
 * Sizes are desktop CSS px; `--logo-scale` shrinks them on phones. Dimensions
 * come from `lib/client-logos.json`, written by `scripts/prepare-client-logos.mjs`.
 */
const AREA = 5600;
const MAX_W = 140;
const MAX_H = 60;

function displayWidth(width: number, height: number) {
  const ratio = width / height;
  let w = Math.sqrt(AREA * ratio);
  if (w / ratio > MAX_H) w = MAX_H * ratio;
  if (w > MAX_W) w = MAX_W;
  return Math.round(w);
}

/** Split the logos into two rows, alternating so neither row clusters one sector. */
const rows: Logo[][] = [
  clientLogos.filter((_, i) => i % 2 === 0),
  clientLogos.filter((_, i) => i % 2 === 1),
];

function LogoCard({ logo, hidden }: { logo: Logo; hidden?: boolean }) {
  return (
    <li
      aria-hidden={hidden || undefined}
      className="mr-4 flex h-24 w-40 shrink-0 items-center justify-center rounded-2xl border border-mist/70 bg-white/70 px-5 shadow-[0_6px_24px_-12px_rgba(37,37,37,0.18)] transition-[border-color,box-shadow] duration-500 hover:border-mist hover:shadow-[0_10px_30px_-12px_rgba(37,37,37,0.28)] wide:mr-5 wide:h-32 wide:w-56"
    >
      <Image
        src={logo.src}
        alt={hidden ? "" : logo.name}
        title={logo.name}
        width={logo.width}
        height={logo.height}
        sizes="160px"
        className="h-auto max-w-full"
        style={{ width: `calc(${displayWidth(logo.width, logo.height)}px * var(--logo-scale))` }}
      />
    </li>
  );
}

/**
 * "Brands we've worked with": two slow, endless rows of client marks moving in
 * opposite directions. Every logo is shown in its own full colour on a raised
 * white card; hovering a row pauses it. The marquee CSS lives in
 * `app/globals.css`.
 */
export function ClientLogos() {
  return (
    <div
      className="reveal flex flex-col gap-4 [--logo-scale:0.7] wide:gap-5 wide:[--logo-scale:1]"
      role="region"
      aria-label="Brands we've worked with"
    >
      {rows.map((row, r) => (
        <div
          key={r}
          className={`marquee ${r === 1 ? "marquee-reverse" : ""}`}
          style={{ ["--marquee-duration" as string]: r === 0 ? "55s" : "65s" }}
        >
          {/* The set twice: the copy is decorative (aria-hidden, empty alt) so
              screen readers hear each client once. */}
          <ul className="marquee-track py-1">
            {row.map((logo) => (
              <LogoCard key={logo.slug} logo={logo} />
            ))}
            {row.map((logo) => (
              <LogoCard key={`${logo.slug}-copy`} logo={logo} hidden />
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
