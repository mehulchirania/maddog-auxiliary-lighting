"use client";

import { brands, bikesForBrand } from "@/lib/fitment";
import { cn } from "@/lib/cn";

const FOCUS_RING =
  "outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-signal-500)]";

export default function BrandGrid({
  value,
  onSelect,
}: {
  value: string | null;
  onSelect: (brand: string) => void;
}) {
  return (
    <div
      role="group"
      aria-label="Motorcycle brand"
      className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4"
    >
      {brands.map((brand) => {
        const active = value === brand;
        const count = bikesForBrand(brand).length;
        return (
          <button
            key={brand}
            type="button"
            onClick={() => onSelect(brand)}
            aria-pressed={active}
            className={cn(
              "group flex min-h-[84px] flex-col items-start justify-center gap-1 rounded-xl border px-4 py-3.5 text-left transition-all duration-200 shadow-sm",
              FOCUS_RING,
              active
                ? "border-signal-500 bg-ink-800 ring-1 ring-signal-500"
                : "hairline border bg-ink-900 hover:border-ink-500 hover:bg-ink-850 hover:-translate-y-0.5",
            )}
          >
            <span
              className={cn(
                "font-display font-medium leading-snug",
                active ? "text-bone" : "text-fog-200 group-hover:text-bone",
              )}
              style={{ fontSize: "var(--text-body)" }}
            >
              {brand}
            </span>
            <span className="text-fog-500 font-mono text-[11px]">
              <span className="tnum font-medium text-fog-400">{count}</span> model{count === 1 ? "" : "s"}
            </span>
          </button>
        );
      })}
    </div>
  );
}

