/**
 * Renders stars only when there is something to show. Delta has zero
 * reviews on the live site — rendering "0.0 stars" there would read as
 * broken, so it gets a plain, honest line instead.
 */
export default function RatingBadge({
  rating,
  reviewCount,
}: {
  rating: number;
  reviewCount: number;
}) {
  if (reviewCount === 0) {
    return <p className="text-ink-600 text-[13px]">New — no reviews yet.</p>;
  }

  const stars = Array.from({ length: 5 }, (_, i) => i < Math.round(rating));

  return (
    <div className="flex flex-wrap items-center gap-2.5">
      <div className="flex gap-0.5" aria-hidden="true">
        {stars.map((filled, i) => (
          <svg
            key={i}
            width="14"
            height="14"
            viewBox="0 0 24 24"
            className={filled ? "fill-ink-900" : "fill-ink-900/15"}
          >
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.27 5.82 21 7 14.14l-5-4.87 6.91-1.01z" />
          </svg>
        ))}
      </div>
      <span className="tnum text-ink-900 text-[13px]">{rating.toFixed(1)}</span>
      <span className="text-ink-600 text-[13px]">
        ({reviewCount} review{reviewCount === 1 ? "" : "s"})
      </span>
    </div>
  );
}
