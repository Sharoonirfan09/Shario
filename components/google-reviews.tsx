import { googleReviews } from "@/lib/google-reviews";

type Review = (typeof googleReviews)[number];

function Stars({ rating }: { rating: number }) {
  return (
    <span className="flex gap-0.5" role="img" aria-label={`${rating} out of 5 stars`}>
      {[0, 1, 2, 3, 4].map((i) => (
        <svg
          key={i}
          aria-hidden="true"
          viewBox="0 0 20 20"
          className={`h-4 w-4 ${i < rating ? "fill-[#f5b400]" : "fill-carbon/15"}`}
        >
          <path d="M10 1.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L10 14.9l-5.2 2.7 1-5.8L1.5 7.7l5.9-.9z" />
        </svg>
      ))}
    </span>
  );
}

function ReviewCard({ review, hidden }: { review: Review; hidden?: boolean }) {
  return (
    <li
      aria-hidden={hidden || undefined}
      className="mr-4 flex w-72 shrink-0 flex-col rounded-2xl border border-mist/70 bg-white/70 p-6 shadow-[0_6px_24px_-12px_rgba(37,37,37,0.18)] wide:mr-5 wide:w-80 wide:p-7"
    >
      <div className="flex items-center gap-3">
        <span
          aria-hidden="true"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-mist/40 font-display text-lg text-carbon"
        >
          {review.name.charAt(0).toUpperCase()}
        </span>
        <div className="min-w-0">
          <p className="truncate text-[0.9375rem] font-medium text-carbon">{review.name}</p>
          <p className="text-[0.75rem] text-carbon/55">{review.date}</p>
        </div>
      </div>
      <div className="mt-4">
        <Stars rating={review.rating} />
      </div>
      <p className="mt-3 flex-1 text-[0.9375rem] leading-[1.7] text-carbon/80">
        &ldquo;{review.text}&rdquo;
      </p>
    </li>
  );
}

/**
 * Google reviews of Sharoon Digital (the founder's practice before Shario), as
 * one slow, endless row that pauses on hover. Reuses the `.marquee` CSS from
 * `app/globals.css`. Data and the rules for what's included: `lib/google-reviews.ts`.
 */
export function GoogleReviews() {
  return (
    <div className="reveal" role="region" aria-label="Google reviews">
      <div className="marquee" style={{ ["--marquee-duration" as string]: "90s" }}>
        <ul className="marquee-track items-stretch py-2">
          {googleReviews.map((review) => (
            <ReviewCard key={review.name} review={review} />
          ))}
          {googleReviews.map((review) => (
            <ReviewCard key={`${review.name}-copy`} review={review} hidden />
          ))}
        </ul>
      </div>
    </div>
  );
}
