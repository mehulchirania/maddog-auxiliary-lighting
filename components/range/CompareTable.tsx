import Link from "next/link";
import { ladder, formatPrice, type Product } from "@/lib/products";

const rows: { label: string; render: (p: Product) => React.ReactNode }[] = [
  { label: "Lumens", render: (p) => `${p.light!.lumens.toLocaleString("en-IN")} lm` },
  { label: "Watts each", render: (p) => `${p.light!.wattsEach}W` },
  { label: "Watts / pair", render: (p) => `${p.light!.wattsPair}W` },
  { label: "Beam distance", render: (p) => `${p.light!.beamDistanceM} m` },
  { label: "Optics", render: (p) => p.light!.opticsLabel },
  { label: "Dual-mode switching", render: (p) => (p.light!.dualMode ? "Yes" : "—") },
  { label: "Price", render: (p) => formatPrice(p.price) },
  {
    label: "Rating",
    render: (p) => (p.reviewCount > 0 ? `${p.rating.toFixed(1)} (${p.reviewCount})` : "No reviews yet"),
  },
];

/**
 * Every light, side by side. Scrolls horizontally inside its own bordered
 * container — the page body never scrolls sideways. First column is sticky
 * so the metric label stays legible while scrolling through six models.
 *
 * Light-panel tokens: `hairline` is a white-based border tuned for a dark
 * background and disappears here, so every divider uses `border-ink-900/10`
 * instead.
 */
export default function CompareTable() {
  return (
    <div className="border-ink-900/10 overflow-x-auto rounded-lg border">
      <table className="w-full min-w-[760px] border-collapse text-left text-[13px]">
        <thead>
          <tr className="border-ink-900/10 border-b">
            <th
              scope="col"
              className="bg-paper-2 sticky left-0 z-10 w-[168px] p-4 align-bottom font-normal"
            >
              <span className="text-ink-600 font-mono text-[0.6875rem] tracking-[0.18em] uppercase">
                Spec
              </span>
            </th>
            {ladder.map((p) => (
              <th key={p.slug} scope="col" className="bg-paper-2 min-w-[128px] p-4 align-bottom font-normal">
                <Link
                  href={`/products/${p.slug}/`}
                  className="text-ink-900 hover:text-signal-600 block text-[14px] transition-colors"
                >
                  {p.name}
                </Link>
                <span className="text-ink-600 mt-1 block font-mono text-[10px] uppercase">{p.code}</span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.label} className="border-ink-900/10 last:border-b-0 border-b">
              <th
                scope="row"
                className="bg-paper-2 text-ink-600 sticky left-0 z-10 p-4 text-left text-[13px] font-normal"
              >
                {row.label}
              </th>
              {ladder.map((p) => (
                <td key={p.slug} className="tnum text-ink-900 bg-paper-0 p-4">
                  {row.render(p)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
