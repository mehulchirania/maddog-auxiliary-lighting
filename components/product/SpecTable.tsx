import { cn } from "@/lib/cn";
import type { SpecRow } from "@/lib/products";

function isNumericish(value: string) {
  return /^\d/.test(value.trim());
}

export default function SpecTable({ specs }: { specs: SpecRow[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[480px] border-collapse text-left">
        <tbody>
          {specs.map((row) => (
            <tr key={row.label} className="border-ink-900/10 border-b">
              <th
                scope="row"
                className="text-ink-600 w-[38%] py-3.5 pr-4 text-[13px] font-normal align-top sm:w-[30%]"
              >
                {row.label}
              </th>
              <td
                className={cn(
                  "text-ink-900 py-3.5 text-[14px] leading-relaxed",
                  isNumericish(row.value) && "tnum",
                )}
              >
                {row.value}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
