import { cn } from "@/lib/cn";

/**
 * A single proportional readout — a label, a big tabular figure, and a bar
 * sized relative to the highest value in the range. The ladder now lives on
 * light paper panels, so every token here is tuned for dark-on-light: the
 * eyebrow label can't use the shared `.eyebrow` class (it hardcodes a
 * mid-grey tuned for a dark background), so its look is reproduced inline
 * with `text-ink-600`.
 */
export default function SpecBar({
  label,
  value,
  unit,
  percent,
  fillClassName = "bg-signal-600",
}: {
  label: string;
  value: string;
  unit?: string;
  percent: number;
  fillClassName?: string;
}) {
  return (
    <div>
      <div className="flex items-baseline justify-between gap-3">
        <span className="font-mono text-[0.6875rem] tracking-[0.18em] text-ink-600 uppercase">
          {label}
        </span>
        <span className="tnum text-ink-900 text-[15px] sm:text-[16px]">
          {value}
          {unit && <span className="text-ink-600 ml-1 text-[11px]">{unit}</span>}
        </span>
      </div>
      <div className="bg-ink-900/8 mt-2.5 h-[5px] w-full overflow-hidden rounded-full">
        <div
          className={cn("h-full rounded-full", fillClassName)}
          style={{ width: `${Math.min(100, Math.max(percent, 3))}%` }}
        />
      </div>
    </div>
  );
}
