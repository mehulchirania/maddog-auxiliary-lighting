import Link from "next/link";
import Image from "next/image";
import type { Product } from "@/lib/products";
import { formatPrice } from "@/lib/products";
import Container from "@/components/ui/Container";
import SpecBar from "./SpecBar";
import OpticsBar from "./OpticsBar";
import { cn } from "@/lib/cn";

export default function LadderRow({
  product,
  rank,
  maxLumens,
  maxBeam,
  shade,
}: {
  product: Product;
  rank: number;
  maxLumens: number;
  maxBeam: number;
  shade: "base" | "alt";
}) {
  const light = product.light!;

  return (
    <li className={cn("w-full transition-colors", shade === "alt" ? "bg-paper-1" : "bg-paper-0")}>
      <Container>
        <Link
          href={`/products/${product.slug}/`}
          className="group grid gap-6 py-10 sm:grid-cols-[220px_1fr] sm:gap-8 sm:py-12 lg:grid-cols-[260px_1fr] lg:items-center lg:gap-12"
        >
          <div className="border-ink-900/10 bg-paper-0 relative aspect-square w-full shrink-0 overflow-hidden rounded-xl border shadow-sm transition-all duration-300 group-hover:border-signal-600/30 group-hover:shadow-md">
            <Image
              src={product.hero}
              alt={`${product.name} auxiliary light, studio photograph`}
              fill
              sizes="(min-width: 1024px) 260px, (min-width: 640px) 220px, 70vw"
              className="object-contain p-6 sm:p-7 transition-transform duration-300 group-hover:scale-[1.04]"
            />
            <div className="absolute top-3 left-3 flex items-center gap-1.5">
              <span className="border-ink-900/15 bg-paper-0/90 text-ink-800 tnum inline-flex h-6 w-6 items-center justify-center rounded-full border text-[11px] font-semibold">
                {rank}
              </span>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-3">
              <span className="text-ink-500 font-mono tracking-wider uppercase" style={{ fontSize: "var(--text-micro)" }}>
                SKU: {product.code}
              </span>
              {light.dualMode && (
                <span className="border-signal-600/30 bg-signal-600/10 text-signal-700 rounded-full border px-2.5 py-0.5 font-medium tracking-wide uppercase" style={{ fontSize: "var(--text-micro)" }}>
                  Dual-Mode Control
                </span>
              )}
            </div>

            <h3
              className="font-display text-ink-950 group-hover:text-signal-600 mt-2 leading-tight transition-colors"
              style={{
                fontSize: "var(--text-h2)",
                fontWeight: "var(--fw-h2)",
                letterSpacing: "var(--ls-h2)",
              }}
            >
              {product.name}
            </h3>

            <p className="text-ink-600 mt-2 max-w-[48ch] leading-relaxed" style={{ fontSize: "var(--text-body)" }}>
              {product.tagline}
            </p>

            <div className="mt-4 flex flex-wrap items-center gap-4">
              <span className="tnum text-ink-950 font-semibold" style={{ fontSize: "var(--text-h3)" }}>
                {formatPrice(product.price)}
              </span>
              <span className="text-ink-500" style={{ fontSize: "var(--text-caption)" }}>
                Pair · 18mo Warranty
              </span>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-5 border-t border-ink-900/10 pt-6 lg:grid-cols-3 lg:gap-8">
              <SpecBar
                label="Lumens"
                value={light.lumens.toLocaleString("en-IN")}
                unit="lm"
                percent={(light.lumens / maxLumens) * 100}
              />
              <SpecBar
                label="Beam distance"
                value={String(light.beamDistanceM)}
                unit="m"
                percent={(light.beamDistanceM / maxBeam) * 100}
                fillClassName="bg-ink-800"
              />
              <div className="col-span-2 lg:col-span-1">
                <OpticsBar spot={light.spot} flood={light.flood} dualMode={light.dualMode} />
                <p className="tnum text-ink-500 mt-2" style={{ fontSize: "var(--text-micro)" }}>
                  {light.wattsEach}W each · {light.wattsPair}W pair
                </p>
              </div>
            </div>
          </div>
        </Link>
      </Container>
    </li>
  );
}

