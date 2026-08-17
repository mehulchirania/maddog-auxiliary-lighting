/**
 * Colour-temperature scale, 2700K–10000K, with Maddog's 5000K–5700K band
 * marked against it. Built from CSS gradient tokens only — no hardcoded hex.
 */

const marks = [
  { k: 2700, label: "2700K", note: "domestic halogen" },
  { k: 5000, label: "5000K", note: "Maddog spec starts" },
  { k: 5700, label: "5700K", note: "Maddog spec ends" },
  { k: 6500, label: "6500K", note: "typical white LED" },
  { k: 10000, label: "10000K+", note: "deep blue, grey-market" },
];

function pct(k: number) {
  return ((k - 2700) / (10000 - 2700)) * 100;
}

export default function ColorTempScale() {
  const bandStart = pct(5000);
  const bandEnd = pct(5700);

  return (
    <div className="w-full overflow-x-auto">
      <div className="min-w-[560px] pt-2 pb-10">
        <div
          className="relative h-4 rounded-full"
          style={{
            background:
              "linear-gradient(to right, var(--color-beam-400), var(--color-beam-200), var(--color-bone), var(--color-fog-300), var(--color-fog-600))",
          }}
        >
          <div
            className="border-signal-500 absolute -top-2 -bottom-2 rounded-md border-2"
            style={{ left: `${bandStart}%`, width: `${bandEnd - bandStart}%` }}
            aria-hidden="true"
          />
        </div>

        <div className="relative mt-3 h-16">
          {marks.map((m) => (
            <div
              key={m.k}
              className="absolute top-0 flex -translate-x-1/2 flex-col items-center"
              style={{ left: `${pct(m.k)}%` }}
            >
              <span className="bg-fog-600 mb-2 h-2 w-px" aria-hidden="true" />
              <span className="tnum text-bone text-[12px]">{m.label}</span>
              <span className="text-fog-500 mt-1 max-w-[9ch] text-center text-[10px] leading-tight">
                {m.note}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
