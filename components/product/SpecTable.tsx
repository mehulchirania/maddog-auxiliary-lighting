import type { SpecRow } from "@/lib/products";

/**
 * Zebra-striped datasheet rows — mono label on the left, mono tabular value
 * right-aligned. Matches the "Full spec sheet" tab of the Product mockup.
 */
export default function SpecTable({ specs }: { specs: SpecRow[] }) {
  if (!specs || specs.length === 0) return null;

  return (
    <div className="w-full overflow-hidden rounded-[var(--radius-card)] border border-[var(--glass-stroke)]">
      <dl className="m-0">
        {specs.map((row, i) => (
          <div
            key={row.label}
            className={`flex items-baseline justify-between gap-6 px-5 py-4 sm:px-6 ${
              i === specs.length - 1 ? "" : "border-b border-white/[0.07]"
            } ${i % 2 === 0 ? "bg-white/[0.02]" : "bg-transparent"}`}
          >
            <dt className="readout shrink-0 tracking-[0.1em] uppercase text-[var(--color-grey-500)]">
              {row.label}
            </dt>
            <dd className="readout m-0 max-w-[32ch] text-right text-sm tabular-nums text-[var(--color-white)]">
              {row.value}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
