import { Band } from "@/components/ui";
import { CountUp } from "@/components/count-up";
import { stats } from "@/lib/site";

/**
 * "Why Partner With a Dubai Real Estate Marketing Specialist" — a
 * typographic authority band rather than a stock portrait. The library has
 * no approved editorial photograph of the founder or team for this slot, so
 * the brief's fallback applies: composition carries it instead of an image.
 *
 * Figures are the sitewide `stats` (`lib/site.ts`) — the same four proof
 * points Home uses — not new, industry-specific numbers. Nothing here is
 * invented.
 */
export function Authority() {
  return (
    <Band tone="carbon">
      <div className="grid gap-14 wide:grid-cols-[1.05fr_1fr] wide:items-end wide:gap-24">
        <div className="reveal">
          <p className="eyebrow flex items-center gap-3 text-porcelain/70">
            <span aria-hidden="true" className="h-px w-6 bg-mist" />
            Why SHARIO
          </p>
          <h2 className="mt-6 font-display text-[2.5rem] font-normal leading-[1.1] wide:text-[clamp(3rem,5vw,4.5rem)]">
            Why partner with a Dubai real estate marketing specialist.
          </h2>
          <p className="mt-7 max-w-[480px] text-[1.0625rem] leading-[1.75] text-porcelain/75">
            One senior, founder-led team running paid, SEO, websites and CRM
            as one system — not an account handed between departments that
            never talk to each other.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-x-8 gap-y-12 wide:gap-x-10">
          {stats.map((stat, i) => (
            <div key={stat.label} className="reveal ledger" data-delay={i * 90}>
              <p className="ledger-figure">
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
