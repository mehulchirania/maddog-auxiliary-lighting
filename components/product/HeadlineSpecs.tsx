import { cn } from "@/lib/cn";
import type { Product } from "@/lib/products";

const HEADLINE_SPEC_LABELS: Record<string, string[]> = {
  "switch-pro": ["Wattage", "Fuse", "Voltage", "Relay"],
  dimmer: ["Dimming", "Pass function", "Beacon mode", "IP rating"],
  "claw-x": ["Phone charger", "Current", "Life-cycle", "IP rating"],
};

function isNumericish(value: string) {
  return /^\d/.test(value.trim());
}

export default function HeadlineSpecs({ product }: { product: Product }) {
  const light = product.light;

  if (light) {
    const beamSpec = product.specs.find((s) => s.label === "Beam distance")?.value;
    const tiles = [
      {
        label: "Lumens",
        value: light.lumens.toLocaleString("en-IN"),
        unit: "lm",
        accent: true,
      },
      {
        label: "Watts",
        value: String(light.wattsEach),
        unit: "W each",
        caption: `${light.wattsPair}W per pair`,
      },
      {
        label: "Beam distance",
        value: String(light.beamDistanceM),
        unit: "m",
        caption: beamSpec,
      },
      {
        label: "Optics",
        value: light.spot > 0 ? `${light.spot}/${light.flood}` : "100% flood",
        unit: light.spot > 0 ? "spot/flood" : undefined,
        caption: light.opticsLabel,
      },
    ];

    return (
      <dl className="grid grid-cols-2 gap-x-6 gap-y-8 lg:grid-cols-4">
        {tiles.map((t) => (
          <div key={t.label} className="min-w-0 border-l border-ink-900/10 pl-4 sm:pl-6 first:border-l-0 first:pl-0">
            <dt className="text-ink-500 font-mono tracking-wider uppercase" style={{ fontSize: "var(--text-micro)" }}>
              {t.label}
            </dt>
            <dd
              className={cn(
                "tnum font-display font-medium mt-1.5 leading-none",
                t.accent ? "text-signal-600" : "text-ink-950",
              )}
              style={{ fontSize: "var(--text-stat)" }}
            >
              {t.value}
              {t.unit && <span className="text-ink-500 ml-1.5 font-sans font-normal" style={{ fontSize: "var(--text-caption)" }}>{t.unit}</span>}
            </dd>
            {t.caption && (
              <p className="text-ink-600 mt-2 leading-snug" style={{ fontSize: "var(--text-micro)" }}>
                {t.caption}
              </p>
            )}
          </div>
        ))}
      </dl>
    );
  }

  const labels = HEADLINE_SPEC_LABELS[product.slug];
  const tiles = labels
    ? labels
        .map((label) => product.specs.find((s) => s.label === label))
        .filter((s): s is NonNullable<typeof s> => Boolean(s))
    : product.specs.slice(0, 4);

  return (
    <dl className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-4">
      {tiles.map((s) => (
        <div key={s.label} className="min-w-0 border-l border-ink-900/10 pl-4 sm:pl-6 first:border-l-0 first:pl-0">
          <dt className="text-ink-500 font-mono tracking-wider uppercase" style={{ fontSize: "var(--text-micro)" }}>
            {s.label}
          </dt>
          <dd
            className={cn(
              "text-ink-950 font-display font-medium mt-1.5 leading-snug",
              isNumericish(s.value) && "tnum",
            )}
            style={{ fontSize: "var(--text-h2)" }}
          >
            {s.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}

