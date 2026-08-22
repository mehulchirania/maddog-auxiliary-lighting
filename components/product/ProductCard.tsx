"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/products";
import { useCart } from "@/lib/cart";

interface ProductCardProps {
  product: Product;
  className?: string;
  tabIndex?: number;
  ariaHidden?: boolean;
  /**
   * "plate" (default) is the square studio-plate card used by the home rail.
   * "catalogue" is the /lights/ grid card: mono header row, 4:3 plate, and a
   * name/price footer with a mono meta line.
   */
  variant?: "plate" | "catalogue";
  /** 1-based catalogue position — rendered zero-padded in the card header row. */
  index?: number;
  /** Category label shown at the left of the catalogue header row. */
  categoryLabel?: string;
  /** Fades a full-card blurred overlay of dense spec rows in on hover. */
  showQuickSpecs?: boolean;
}

/**
 * Specs in lib/products.ts are written for the product detail page and run
 * long ("11,600 Raw Lumens (Pair)", "6063-T6 Aerospace Billet Aluminium").
 * The hover overlay only has room for a short line, so trim at the first
 * parenthetical/comma aside and hard-cap the rest.
 */
function shortenSpecValue(value: string): string {
  const withoutParenthetical = value.replace(/\s*\([^)]*\)\s*$/, "").trim();
  const withoutTrailingClause = withoutParenthetical.split(",")[0].trim();
  const source = withoutTrailingClause || withoutParenthetical;
  return source.length > 30 ? `${source.slice(0, 29).trimEnd()}…` : source;
}

/**
 * "80% Spot / 20% Flood Hybrid TIR" → "80/20 hybrid TIR".
 * "Ultraviolette F77 Dedicated Integration" → "F77 dedicated".
 * Only the phrasing is compressed — the numbers stay exactly as published.
 */
function shortenOptics(opticsLabel: string, dualMode?: boolean): string {
  if (/^Ultraviolette/i.test(opticsLabel)) {
    return opticsLabel
      .replace(/^Ultraviolette\s+/i, "")
      .replace(/\s+Dedicated Integration$/i, " dedicated")
      .replace(/\s+Dual-Mode EV Edition$/i, " dual-mode");
  }
  const split = opticsLabel.match(/^(\d+)%\s*Spot\s*\/\s*(\d+)%\s*Flood\s*(.*)$/i);
  if (split) {
    const [, spot, flood, rest] = split;
    const descriptor = rest.trim().replace(/\b(?!TIR\b)[A-Z][a-z]+/g, (w) => w.toLowerCase());
    return `${spot}/${flood} ${descriptor}`.trim();
  }
  if (dualMode) return opticsLabel.replace(/^Dual-Mode\s+/i, "dual ").replace(/\s+Amber \/ /i, "/").replace(/\s+White$/i, "");
  return shortenSpecValue(opticsLabel);
}

/**
 * 3–4 dense rows for the hover overlay. Lights get the photometric readout
 * built from the structured `light` block; everything else falls back to the
 * first three published detail specs.
 */
function quickSpecRows(product: Product): { label: string; value: string }[] {
  const l = product.light;
  if (l) {
    const isEv = /^Ultraviolette/i.test(l.opticsLabel);
    return [
      ...(isEv ? [] : [{ label: "Lumens", value: l.lumens.toLocaleString("en-IN") }]),
      { label: "Throw", value: `${l.beamDistanceM} m` },
      { label: "Power", value: `${l.wattsPair} W` },
      {
        label: isEv ? "Integration" : "Optics",
        value: shortenOptics(l.opticsLabel, l.dualMode),
      },
    ];
  }
  return product.specs.slice(0, 3).map((s) => ({
    label: s.label,
    value: shortenSpecValue(s.value),
  }));
}

/**
 * What a non-light product is, in two words. Only the lighting categories have
 * a photometric readout to show, and most of the catalogue isn't a light.
 */
const CATEGORY_META: Record<Product["category"], string> = {
  "aux-light": "Auxiliary light",
  "car-fog-lamp": "OEM fog lamp",
  mount: "Phone mount",
  power: "Switch & harness",
  filter: "Snap-on filter",
  clamp: "Mount & clamp",
  "ev-edition": "EV edition",
};

/**
 * Mono meta line under the card name. Products with a `light` block get their
 * published photometric readout; everything else gets its category. A phone
 * mount has no colour temperature and a clamp has no beam, so this line must
 * never assert "5000K · IP-67" for them.
 */
function metaLine(product: Product): string {
  const l = product.light;
  if (!l) return CATEGORY_META[product.category] ?? "";
  const mode = l.dualMode ? "dual mode" : `${l.beamDistanceM} m`;
  return `${l.lumens.toLocaleString("en-IN")} lm · ${mode} · IP-67`;
}

export default function ProductCard({
  product,
  className = "",
  tabIndex,
  ariaHidden,
  variant = "plate",
  index,
  categoryLabel,
  showQuickSpecs = false,
}: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const { addItem } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    // The card body is a Link — stop this button's click from also
    // triggering navigation to the product page. Confirmation is the cart
    // drawer itself opening (addItem sets isCartOpen) — a local "Added ✓"
    // button-text swap was tried and dropped: addItem's setIsCartOpen
    // triggers a context-wide re-render that reliably discarded the local
    // state in the same tick under React 19's dev-mode double-render, so it
    // never stayed on screen. The drawer opening doesn't have that problem.
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
  };

  const primaryImage = product.gallery[0] || product.hero;
  const secondaryImage = product.gallery[1] || primaryImage;

  const addToCartButton = (
    <button
      type="button"
      tabIndex={tabIndex}
      onClick={handleAddToCart}
      className="mt-3 h-11 rounded-full text-sm font-medium border transition-colors duration-[var(--dur-fast)] ease-[var(--ease-out)] cursor-pointer bg-transparent text-[var(--color-white)] border-white/16 hover:border-white/32 hover:bg-white/5 active:scale-[0.97]"
    >
      Add to cart
    </button>
  );

  if (variant === "catalogue") {
    const rows = showQuickSpecs ? quickSpecRows(product) : [];
    const meta = metaLine(product);

    return (
      <div className={`flex flex-col ${className}`} aria-hidden={ariaHidden}>
        <Link
          href={`/products/${product.slug}/`}
          tabIndex={tabIndex}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onFocus={() => setIsHovered(true)}
          onBlur={() => setIsHovered(false)}
          className="group relative block select-none overflow-hidden rounded-[var(--radius-card)] border border-[var(--glass-stroke)] bg-[var(--color-night-900)] transition-[border-color,transform] duration-[var(--dur-fast)] ease-[var(--ease-out)] hover:-translate-y-1 hover:border-[var(--color-beam)]/35"
        >
          {/* Header row — category left, catalogue index right */}
          <div className="flex items-center justify-between gap-3 px-4 py-3">
            <span className="font-mono text-[0.6875rem] sm:text-[0.625rem] uppercase tracking-[0.18em] text-[var(--color-grey-500)] truncate">
              {categoryLabel}
            </span>
            {typeof index === "number" && (
              <span className="font-mono text-[0.6875rem] sm:text-[0.625rem] tabular-nums text-[var(--color-grey-500)]">
                {String(index).padStart(2, "0")}
              </span>
            )}
          </div>

          {/* Plate */}
          <div className="relative mx-1.5 aspect-[4/3] overflow-hidden rounded-[calc(var(--radius-card)-0.625rem)] bg-[var(--color-plate)]">
            <Image
              src={primaryImage}
              alt={product.name}
              fill
              sizes="(max-width: 640px) 88vw, (max-width: 1024px) 44vw, 22vw"
              className="object-contain p-[10%]"
            />
          </div>

          {/* Footer */}
          <div className="px-4 pt-3.5 pb-4">
            <div className="flex items-baseline justify-between gap-2.5">
              <h3
                className="m-0 truncate font-[560] text-[var(--color-white)]"
                style={{ fontSize: "1rem" }}
              >
                {product.name}
              </h3>
              {product.price > 0 && (
                <span className="font-mono text-sm tabular-nums text-[var(--color-beam)]">
                  ₹{product.price.toLocaleString("en-IN")}
                </span>
              )}
            </div>
            <p className="mt-1 min-h-[1em] font-mono text-[0.6875rem] tracking-[0.04em] text-[var(--color-grey-500)]">
              {meta}
            </p>
          </div>

          {/* Hover quick-spec overlay — covers the whole card */}
          {rows.length > 0 && (
            <div
              className="pointer-events-none absolute inset-0 z-[2] flex flex-col justify-center gap-2.5 rounded-[var(--radius-card)] bg-[var(--color-night-950)]/95 px-5 py-4 backdrop-blur-[10px] transition-opacity duration-[var(--dur-fast)] ease-[var(--ease-out)] motion-reduce:transition-none"
              style={{ opacity: isHovered ? 1 : 0 }}
              aria-hidden={!isHovered}
            >
              {rows.map((row) => (
                <div key={row.label} className="flex items-baseline justify-between gap-3.5">
                  <span className="shrink-0 font-mono text-[0.6875rem] sm:text-[0.625rem] uppercase tracking-[0.14em] text-[var(--color-grey-500)]">
                    {row.label}
                  </span>
                  <span className="min-w-0 break-words text-right font-mono text-xs leading-[1.4] tabular-nums text-[var(--color-beam)]">
                    {row.value}
                  </span>
                </div>
              ))}
            </div>
          )}
        </Link>

        {addToCartButton}
      </div>
    );
  }

  return (
    <div className={`flex flex-col ${className}`} aria-hidden={ariaHidden}>
      <Link
        href={`/products/${product.slug}/`}
        tabIndex={tabIndex}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="group flex flex-col block select-none"
        style={{ perspective: 1000 }}
      >
        {/* Studio Plate Frame */}
        <div
          className="relative w-full aspect-square rounded-[var(--radius-card)] bg-[var(--color-plate)] p-[12%] overflow-hidden transition-all duration-[var(--dur-fast)] ease-out border border-white/5"
          style={{
            transform: isHovered ? "translateY(-6px) rotateY(-4deg)" : "none",
            transformStyle: "preserve-3d",
            boxShadow: isHovered ? "0 20px 30px -10px rgba(0,0,0,0.5)" : "none",
          }}
        >
          <Image
            src={isHovered ? secondaryImage : primaryImage}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 72vw, (max-width: 1200px) 33vw, 420px"
            className="object-contain p-[10%] transition-opacity duration-200"
          />
        </div>

        {/* Info Below Plate */}
        <div className="mt-4">
          {/* Name and price share a baseline row, meta sits under them. */}
          <div className="flex items-baseline justify-between gap-3">
            <h3
              className="min-w-0 truncate font-[560] text-[var(--color-white)] transition-colors duration-[var(--dur-fast)] group-hover:text-[var(--color-beam)]"
              style={{ fontSize: "var(--text-title)" }}
            >
              {product.name}
            </h3>
            {product.price > 0 && (
              <span className="readout shrink-0 tabular-nums text-[0.9375rem] text-[var(--color-beam)]">
                {"₹"}{product.price.toLocaleString("en-IN")}
              </span>
            )}
          </div>
          <p className="readout mt-1">{metaLine(product)}</p>
        </div>
      </Link>

      {addToCartButton}
    </div>
  );
}
