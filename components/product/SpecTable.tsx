import type { SpecRow } from "@/lib/products";

export default function SpecTable({ specs }: { specs: SpecRow[] }) {
  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full border-collapse text-left">
        <tbody>
          {specs.map((row) => (
            <tr key={row.label} className="border-b border-[var(--glass-stroke)]">
              <th
                scope="row"
                className="w-1/3 py-3.5 pr-4 text-sm font-normal text-[var(--color-grey-500)] align-top"
              >
                {row.label}
              </th>
              <td className="readout py-3.5 text-sm text-[var(--color-white)]">
                {row.value}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
