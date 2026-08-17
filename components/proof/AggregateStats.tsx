"use client";

import { aggregate } from "@/lib/proof";
import CountUp from "@/components/animations/CountUp";
import SpotlightCard from "@/components/animations/SpotlightCard";

const stats: { numericValue: number; unit?: string; label: string; formatted?: boolean }[] = [
  { numericValue: aggregate.totalReviews, label: "Customer reviews" },
  { numericValue: aggregate.creatorCount, label: "Independent creator reviews" },
  { numericValue: aggregate.warrantyMonths, unit: "mo", label: "Replacement warranty" },
  { numericValue: aggregate.lifespanHours, unit: "hrs", label: "Rated LED life" },
];

export default function AggregateStats() {
  return (
    <div className="grid grid-cols-2 gap-px sm:grid-cols-4 bg-ink-900/60">
      {stats.map((s) => (
        <SpotlightCard
          key={s.label}
          spotlightColor="rgba(237, 29, 36, 0.12)"
          className="bg-ink-850 border hairline flex flex-col items-center justify-center gap-3 px-4 py-9 text-center"
        >
          <div
            className="tnum text-bone leading-none"
            style={{
              fontSize: "var(--text-stat)",
              fontWeight: "var(--fw-stat)",
              letterSpacing: "var(--ls-stat)",
            }}
          >
            <CountUp to={s.numericValue} duration={2.2} />
            {s.unit && (
              <span
                className="text-fog-400 ml-1 align-super"
                style={{ fontSize: "0.4em" }}
              >
                {s.unit}
              </span>
            )}
          </div>
          <p
            className="text-fog-500 tracking-wide uppercase"
            style={{ fontSize: "var(--text-micro)" }}
          >
            {s.label}
          </p>
        </SpotlightCard>
      ))}
    </div>
  );
}
