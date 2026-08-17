import { aggregate } from "@/lib/proof";

const stats: { value: string; unit?: string; label: string }[] = [
  { value: String(aggregate.totalReviews), label: "Customer reviews" },
  { value: String(aggregate.creatorCount), label: "Independent creator reviews" },
  { value: String(aggregate.warrantyMonths), unit: "mo", label: "Replacement warranty" },
  { value: aggregate.lifespanHours.toLocaleString("en-IN"), unit: "hrs", label: "Rated LED life" },
];

export default function AggregateStats() {
  return (
    <div className="grid grid-cols-2 gap-px sm:grid-cols-4">
      {stats.map((s) => (
        <div
          key={s.label}
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
            {s.value}
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
        </div>
      ))}
    </div>
  );
}
