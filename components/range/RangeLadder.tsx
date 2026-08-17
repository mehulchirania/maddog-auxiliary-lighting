"use client";

import { useState } from "react";
import type { Product } from "@/lib/products";
import LadderRow from "@/components/range/LadderRow";
import ValueNote from "@/components/range/ValueNote";
import { cn } from "@/lib/cn";

type FilterId = "all" | "touring" | "mixed" | "compact";

interface FilterOption {
  id: FilterId;
  label: string;
  count: number;
  description: string;
  slugs: string[];
}

const FILTERS: FilterOption[] = [
  {
    id: "all",
    label: "All 6 Lights",
    count: 6,
    description: "The complete auxiliary ladder, sorted ascending by lumens.",
    slugs: ["scout", "scout-x", "delta", "alpha", "lycan", "rage"],
  },
  {
    id: "touring",
    label: "Long-Range Highway",
    count: 2,
    description: "Maximum beam reach (280m–320m) for high-speed highway touring.",
    slugs: ["lycan", "rage"],
  },
  {
    id: "mixed",
    label: "Dual-Sport & Trail",
    count: 2,
    description: "Balanced spot/flood split (200m–250m) for varied terrain & trails.",
    slugs: ["delta", "alpha"],
  },
  {
    id: "compact",
    label: "City & Fog Commute",
    count: 2,
    description: "Wide flood beam (100m–150m) with lower power draw for urban & city rides.",
    slugs: ["scout", "scout-x"],
  },
];

export default function RangeLadder({ ladder }: { ladder: Product[] }) {
  const [activeFilter, setActiveFilter] = useState<FilterId>("all");

  const currentFilter = FILTERS.find((f) => f.id === activeFilter) ?? FILTERS[0];
  const filteredProducts = ladder.filter((p) => currentFilter.slugs.includes(p.slug));

  const maxLumens = Math.max(...ladder.map((p) => p.light!.lumens));
  const maxBeam = Math.max(...ladder.map((p) => p.light!.beamDistanceM));
  const lycanIndex = ladder.findIndex((p) => p.slug === "lycan");

  return (
    <div>
      {/* Interactive Filter Pills */}
      <div className="bg-paper-1 border-b border-ink-900/10 py-5">
        <div className="mx-auto max-w-[1600px] px-5 sm:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2" role="tablist" aria-label="Filter lights by riding category">
              {FILTERS.map((f) => {
                const active = f.id === activeFilter;
                return (
                  <button
                    key={f.id}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => setActiveFilter(f.id)}
                    className={cn(
                      "inline-flex items-center gap-2 rounded-full px-4 py-2 font-medium tracking-wide transition-all text-[13px]",
                      active
                        ? "bg-ink-900 text-bone shadow-sm"
                        : "bg-paper-0 text-ink-700 hover:text-ink-950 border border-ink-900/10 hover:border-ink-900/25",
                    )}
                  >
                    <span>{f.label}</span>
                    <span
                      className={cn(
                        "tnum inline-flex h-4 w-4 items-center justify-center rounded-full text-[10px]",
                        active ? "bg-signal-600 text-bone" : "bg-ink-900/10 text-ink-600",
                      )}
                    >
                      {f.count}
                    </span>
                  </button>
                );
              })}
            </div>
            <p className="text-ink-500 hidden lg:block text-[13px]">
              {currentFilter.description}
            </p>
          </div>
        </div>
      </div>

      {/* The ladder items */}
      <ol>
        {filteredProducts.map((p, i) => {
          const rank = ladder.findIndex((item) => item.slug === p.slug) + 1;
          const showValueNote = activeFilter === "all" && p.slug === "lycan" && ladder[lycanIndex + 1];

          return (
            <div key={p.slug}>
              <LadderRow
                product={p}
                rank={rank}
                maxLumens={maxLumens}
                maxBeam={maxBeam}
                shade={i % 2 === 0 ? "base" : "alt"}
              />
              {showValueNote && (
                <ValueNote lycan={ladder[lycanIndex]} rage={ladder[lycanIndex + 1]} />
              )}
            </div>
          );
        })}
      </ol>
    </div>
  );
}
