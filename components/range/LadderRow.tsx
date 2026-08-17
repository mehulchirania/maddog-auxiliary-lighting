"use client";

import Link from "next/link";
import Image from "next/image";
import type { Product } from "@/lib/products";
import { formatPrice } from "@/lib/products";
import Container from "@/components/ui/Container";
import SpecBar from "./SpecBar";
import OpticsBar from "./OpticsBar";
import { useCart } from "@/lib/cart";
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
  const { addItem } = useCart();

  return (
    <li className={cn("w-full transition-colors", shade === "alt" ? "bg-paper-1" : "bg-paper-0")}>
      <Container>
        <div className="group grid gap-6 py-8 sm:py-10 sm:grid-cols-[200px_1fr] sm:gap-8 lg:grid-cols-[240px_1fr] lg:items-center lg:gap-10">
          <Link
            href={`/products/${product.slug}/`}
            className="border-ink-900/10 bg-paper-0 relative aspect-square w-full shrink-0 overflow-hidden rounded-xl border shadow-sm transition-all duration-300 group-hover:border-signal-600/30 group-hover:shadow-md"
          >
            <Image
              src={product.hero}
              alt={`${product.name} auxiliary light, studio photograph`}
              fill
              sizes="(min-width: 1024px) 240px, (min-width: 640px) 200px, 70vw"
              className="object-contain p-5 sm:p-6 transition-transform duration-300 group-hover:scale-[1.04]"
            />
            <div className="absolute top-3 left-3 flex items-center gap-1.5">
              <span className="border-ink-900/15 bg-paper-0/90 text-ink-800 tnum inline-flex h-6 w-6 items-center justify-center rounded-full border text-[11px] font-semibold">
                {rank}
              </span>
            </div>
          </Link>

          <div>
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="text-ink-500 font-mono tracking-wider uppercase text-[11px]">
                  SKU: {product.code}
                </span>
                {light.dualMode && (
                  <span className="border-signal-600/30 bg-signal-600/10 text-signal-700 rounded-full border px-2 py-0.5 font-medium tracking-wide uppercase text-[10px]">
                    Dual-Mode Control
                  </span>
                )}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2 mt-1">
              <Link
                href={`/products/${product.slug}/`}
                className="font-display text-ink-950 hover:text-signal-600 leading-tight transition-colors"
                style={{
                  fontSize: "var(--text-h2)",
                  fontWeight: "var(--fw-h2)",
                  letterSpacing: "var(--ls-h2)",
                }}
              >
                {product.name}
              </Link>
              <div className="flex items-baseline gap-2">
                <span className="tnum text-ink-950 font-semibold" style={{ fontSize: "var(--text-h3)" }}>
                  {formatPrice(product.price)}
                </span>
                <span className="text-ink-500 text-xs font-mono">/ pair</span>
              </div>
            </div>

            <p className="text-ink-600 mt-2 max-w-[48ch] leading-relaxed" style={{ fontSize: "var(--text-body)" }}>
              {product.tagline}
            </p>

            <div className="mt-5 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-ink-900/10 pt-4 lg:grid-cols-3 lg:gap-6">
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
                <p className="tnum text-ink-500 mt-1.5" style={{ fontSize: "var(--text-micro)" }}>
                  {light.wattsEach}W each · {light.wattsPair}W pair
                </p>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-ink-900/10 flex flex-wrap items-center justify-between gap-3">
              <Link
                href={`/products/${product.slug}/`}
                className="text-ink-700 hover:text-signal-600 inline-flex items-center gap-1.5 text-xs font-medium transition-colors"
              >
                <span>Inspect Full Telemetry &amp; CAD Blueprints</span>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>

              <button
                type="button"
                onClick={() => addItem(product, 1)}
                className="inline-flex items-center justify-center gap-1.5 rounded-md bg-ink-900 hover:bg-signal-600 text-bone px-4 py-2 text-xs font-medium tracking-wide transition-colors shadow-sm"
              >
                <span>Add to Cart</span>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </Container>
    </li>
  );
}
