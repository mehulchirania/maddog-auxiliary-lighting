import SpotlightCard from "@/components/animations/SpotlightCard";

export default function InstrumentStat({
  value,
  unit,
  label,
}: {
  value: string;
  unit?: string;
  label: string;
}) {
  return (
    <SpotlightCard
      spotlightColor="rgba(237, 29, 36, 0.14)"
      className="border hairline bg-ink-850 rounded-lg px-6 py-8 text-center"
    >
      <div
        className="tnum text-bone leading-none"
        style={{
          fontSize: "var(--text-stat)",
          fontWeight: "var(--fw-stat)",
          letterSpacing: "var(--ls-stat)",
        }}
      >
        {value}
        {unit && (
          <span
            className="text-fog-400 ml-1.5 align-super"
            style={{ fontSize: "0.4em" }}
          >
            {unit}
          </span>
        )}
      </div>
      <p
        className="text-fog-500 mt-4 tracking-wide uppercase"
        style={{ fontSize: "var(--text-micro)" }}
      >
        {label}
      </p>
    </SpotlightCard>
  );
}
