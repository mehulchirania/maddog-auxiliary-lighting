import { ladder } from "@/lib/products";
import { cn } from "@/lib/cn";

/**
 * Pulls a named spec row out of every light in the ladder and lines the
 * values up in a table, so a claim like "every light in the range is
 * IP-67" is shown, not just asserted.
 */
export default function RangeSpecTable({ label }: { label: string }) {
  const rows = ladder.map((p) => ({
    name: p.name,
    value: p.specs.find((s) => s.label === label)?.value ?? "—",
  }));

  return (
    <div className="border hairline overflow-hidden rounded-lg">
      <table className="w-full border-collapse text-left text-[13px]">
        <thead>
          <tr className="bg-ink-800 border-b hairline">
            <th className="text-fog-500 px-4 py-3 font-normal">Light</th>
            <th className="text-fog-500 px-4 py-3 font-normal">{label}</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr
              key={r.name}
              className={cn(
                "hover:bg-ink-800/60 transition-colors",
                i !== rows.length - 1 && "border-b hairline",
              )}
            >
              <td className="text-bone px-4 py-3">{r.name}</td>
              <td className="tnum text-fog-300 px-4 py-3">{r.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
