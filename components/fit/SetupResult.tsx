"use client";

import { useState, type Ref } from "react";
import type { Bike } from "@/lib/fitment";
import { getProduct, formatPrice, ladder, type Product } from "@/lib/products";
import { useCart } from "@/lib/cart";
import ProductRoleCard from "./ProductRoleCard";
import { cn } from "@/lib/cn";

import SpotlightCard from "@/components/animations/SpotlightCard";
import MagneticButton from "@/components/animations/MagneticButton";
import CountUp from "@/components/animations/CountUp";

const FOCUS_RING =
  "outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-signal-500)]";

export default function SetupResult({
  bike,
  headingRef,
  onChangeModel,
  onStartOver,
}: {
  bike: Bike;
  headingRef: Ref<HTMLHeadingElement>;
  onChangeModel: () => void;
  onStartOver: () => void;
}) {
  const { addBundle } = useCart();
  const [selectedLightSlug, setSelectedLightSlug] = useState<string>(bike.recommended.light || "scout");
  const [added, setAdded] = useState(false);

  const light = getProduct(selectedLightSlug) || getProduct(bike.recommended.light) || ladder[0];
  const power = getProduct(bike.recommended.power) || getProduct("switch-pro")!;
  const mount = bike.recommended.mount ? getProduct(bike.recommended.mount) : undefined;

  const total = light.price + power.price + (mount ? mount.price : 0);

  const handleAddBundle = () => {
    const bundleItems = [light, power, mount].filter((p): p is Product => Boolean(p));
    addBundle(bundleItems);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <section aria-labelledby="setup-heading" className="border-t hairline pt-8 sm:pt-10">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <span className="eyebrow text-signal-500">Maddog Certified Fitment</span>
          <span className="font-mono text-[11px] text-fog-400 bg-ink-900 border hairline px-2 py-0.5 rounded capitalize">
            {bike.kind}
          </span>
        </div>
        <h2
          id="setup-heading"
          ref={headingRef}
          tabIndex={-1}
          className="font-display text-bone leading-[1.08] outline-none"
          style={{
            fontSize: "var(--text-h1)",
            fontWeight: "var(--fw-h1)",
          }}
        >
          Your setup for the {bike.brand} {bike.model}
        </h2>
      </div>

      <p className="text-fog-300 mt-4 max-w-3xl leading-relaxed" style={{ fontSize: "var(--text-body-lg)" }}>
        {bike.rationale}
      </p>

      {/* Interactive Light Model Customizer Bar */}
      <div className="mt-8 border hairline bg-ink-950/90 rounded-xl p-4 sm:p-5 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
          <div>
            <p className="eyebrow text-signal-500">Customize Auxiliary Light</p>
            <p className="text-fog-300 text-xs mt-0.5">
              Select your desired beam output (defaulting to {getProduct(bike.recommended.light)?.name || "Scout"}):
            </p>
          </div>
          <span className="font-mono text-fog-400 text-xs">
            Selected: <strong className="text-bone">{light.name}</strong> ({light.light?.lumens.toLocaleString("en-IN")} lm)
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2" role="group" aria-label="Choose light model">
          {ladder.map((l) => {
            const isSelected = l.slug === light.slug;
            const isDefault = l.slug === bike.recommended.light;
            return (
              <button
                key={l.slug}
                type="button"
                aria-pressed={isSelected}
                onClick={() => setSelectedLightSlug(l.slug)}
                className={cn(
                  "relative flex flex-col items-start justify-between p-2.5 rounded-lg border text-left transition-all",
                  isSelected
                    ? "bg-signal-600/15 border-signal-500 shadow-sm text-bone ring-1 ring-signal-500/50"
                    : "bg-ink-900/80 border-ink-700/60 text-fog-300 hover:border-ink-500 hover:text-bone hover:bg-ink-900",
                )}
              >
                <div className="flex items-center justify-between w-full">
                  <span className="font-medium text-xs truncate">{l.name}</span>
                  {isDefault && (
                    <span className="text-[9px] font-mono text-signal-400 bg-signal-600/20 px-1 rounded">
                      Rec
                    </span>
                  )}
                </div>
                <div className="mt-1 flex items-baseline justify-between w-full font-mono text-[10px] text-fog-400">
                  <span className="tnum">{l.light?.lumens.toLocaleString("en-IN")} lm</span>
                  <span className="tnum text-bone">{formatPrice(l.price)}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3-Component System Breakdown Grid */}
      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <ProductRoleCard role="light" product={light} />
        <ProductRoleCard role="power" product={power} />
        {mount && <ProductRoleCard role="mount" product={mount} />}
      </div>

      {/* System Total & Add to Cart Panel */}
      <SpotlightCard
        spotlightColor="rgba(237, 29, 36, 0.15)"
        className="hairline border bg-ink-900 mt-8 flex flex-col gap-6 rounded-xl p-5 sm:p-7 sm:flex-row sm:items-center sm:justify-between shadow-md"
      >
        <div>
          <span className="eyebrow text-signal-500">Certified System Total</span>
          <p className="tnum text-bone font-semibold mt-1" style={{ fontSize: "var(--text-stat)", fontWeight: "var(--fw-stat)" }}>
            ₹<CountUp to={total} duration={1.2} />
          </p>
          <p className="text-fog-400 mt-1 max-w-md leading-relaxed text-xs sm:text-sm">
            Includes {light.name} + {power.name} {mount ? `+ ${mount.name}` : ""} · 18-month warranty replacement programme.
          </p>
        </div>

        <MagneticButton strength={0.25}>
          <button
            type="button"
            onClick={handleAddBundle}
            className={`inline-flex items-center justify-center gap-2.5 rounded-md bg-signal-600 hover:bg-signal-700 active:bg-signal-800 border border-signal-600 px-8 py-3.5 font-medium tracking-wide text-bone transition-all shadow-md hover:shadow-lg ${FOCUS_RING}`}
            style={{ fontSize: "var(--text-caption)" }}
          >
            <span>{added ? "Added System Setup to Cart ✓" : "Add System Setup to Cart"}</span>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </MagneticButton>
      </SpotlightCard>

      {/* Navigation Buttons */}
      <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-xs sm:text-sm">
        <button
          type="button"
          onClick={onChangeModel}
          className={`text-fog-300 underline underline-offset-4 hover:text-bone ${FOCUS_RING}`}
        >
          ← Choose different motorcycle model
        </button>
        <button
          type="button"
          onClick={onStartOver}
          className={`text-fog-300 underline underline-offset-4 hover:text-bone ${FOCUS_RING}`}
        >
          Start over from brand selection
        </button>
      </div>
    </section>
  );
}
