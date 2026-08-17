"use client";

import { bikesForBrand, type Bike } from "@/lib/fitment";
import { cn } from "@/lib/cn";

const FOCUS_RING =
  "outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-signal-500)]";

const kindLabel: Record<Bike["kind"], string> = {
  adventure: "Adventure",
  tourer: "Tourer",
  street: "Street",
  cruiser: "Cruiser",
};

export default function ModelGrid({
  brand,
  value,
  onSelect,
}: {
  brand: string;
  value: string | null;
  onSelect: (bikeId: string) => void;
}) {
  const bikes = bikesForBrand(brand);

  return (
    <div role="group" aria-label={`${brand} models`} className="grid gap-3 sm:grid-cols-2">
      {bikes.map((bike) => {
        const active = value === bike.id;
        return (
          <button
            key={bike.id}
            type="button"
            onClick={() => onSelect(bike.id)}
            aria-pressed={active}
            className={cn(
              "flex items-center justify-between gap-3 rounded-xl border px-5 py-4 text-left transition-all duration-200 shadow-sm",
              FOCUS_RING,
              active
                ? "border-signal-500 bg-ink-800 ring-1 ring-signal-500"
                : "hairline border bg-ink-900 hover:border-ink-500 hover:bg-ink-850 hover:-translate-y-0.5",
            )}
          >
            <span
              className={cn("font-display font-medium", active ? "text-bone" : "text-bone")}
              style={{ fontSize: "var(--text-body)" }}
            >
              {bike.model}
            </span>
            <span className="eyebrow shrink-0 bg-ink-950 px-2.5 py-0.5 rounded border hairline font-mono text-[10px] text-signal-400">
              {kindLabel[bike.kind]}
            </span>
          </button>
        );
      })}
    </div>
  );
}

