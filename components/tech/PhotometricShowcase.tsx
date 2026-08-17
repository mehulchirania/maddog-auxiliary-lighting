import Image from "next/image";
import { getProduct, formatPrice } from "@/lib/products";

export default function PhotometricShowcase() {
  const slugs = ["rage", "lycan"] as const;

  return (
    <div className="flex flex-col gap-12 sm:gap-16">
      {slugs.map((slug) => {
        const p = getProduct(slug);
        if (!p || !p.photometrics || !p.dimensions || !p.light) return null;

        return (
          <div key={slug} className="border hairline rounded-xl bg-ink-900/60 p-5 sm:p-7">
            <div className="mb-6 flex flex-wrap items-baseline justify-between gap-4 border-b hairline pb-4">
              <div>
                <span className="text-signal-500 font-mono text-[11px] uppercase tracking-wider">
                  Model: {p.code}
                </span>
                <h3
                  className="font-display text-bone mt-1"
                  style={{
                    fontSize: "var(--text-h2)",
                    fontWeight: "var(--fw-h2)",
                  }}
                >
                  {p.name}
                </h3>
              </div>
              <div className="text-fog-300 tnum flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-[13px]">
                <span className="bg-ink-800 px-3 py-1 rounded border hairline text-bone font-medium">
                  {p.light.lumens.toLocaleString("en-IN")} lm
                </span>
                <span className="bg-ink-800 px-3 py-1 rounded border hairline text-bone font-medium">
                  {p.light.beamDistanceM}m throw
                </span>
                <span className="text-signal-400 font-semibold">{formatPrice(p.price)}</span>
              </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <figure className="border hairline panel-cad overflow-hidden rounded-lg">
                <div className="relative aspect-[2/1] w-full p-2">
                  <Image
                    src={p.photometrics.diagram}
                    alt={`${p.name} exploded assembly CAD diagram`}
                    fill
                    className="object-contain p-2"
                    sizes="(min-width: 640px) 50vw, 100vw"
                  />
                </div>
                <figcaption className="text-fog-400 border-t hairline px-4 py-2.5 font-mono text-[11px] tracking-wide uppercase flex items-center justify-between">
                  <span>Exploded Architecture</span>
                  <span className="text-fog-600">CAD Ref: MD-{slug.toUpperCase()}</span>
                </figcaption>
              </figure>

              <figure className="border hairline panel-cad overflow-hidden rounded-lg">
                <div className="relative aspect-[2/1] w-full p-2">
                  <Image
                    src={p.dimensions.blueprint}
                    alt={`${p.name} housing dimensions CAD line drawing`}
                    fill
                    className="object-contain p-2"
                    sizes="(min-width: 640px) 50vw, 100vw"
                  />
                </div>
                <figcaption className="text-fog-400 border-t hairline px-4 py-2.5 font-mono text-[11px] tracking-wide uppercase flex items-center justify-between">
                  <span>Dimension Blueprint</span>
                  <span className="text-fog-600">IEC 60529 Tolerances</span>
                </figcaption>
              </figure>
            </div>
          </div>
        );
      })}
    </div>
  );
}

