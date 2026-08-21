"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { products } from "@/lib/products";

const ORDERED_SLUGS = ["scout", "scout-x", "delta", "alpha", "lycan", "rage"];

const NOTES: Record<string, string> = {
  scout: "Essential auxiliary lighting.",
  "scout-x": "Ultra-compact high-efficiency pod.",
  delta: "Compact high-performance auxiliary light.",
  alpha: "The adventure light pod.",
  lycan: "Dual-spectrum amber & white. Harness and switch included.",
  rage: "9-emitter CNC. The longest throw we make.",
};

const LIGHTS = ORDERED_SLUGS.map((slug) => products.find((p) => p.slug === slug)!).filter(Boolean);

const inr = (n: number) => "₹" + n.toLocaleString("en-IN");

export default function CompareRange() {
  const [cmp, setCmp] = useState<string[]>(["lycan", "rage"]);

  const pick = (slug: string) => {
    if (cmp.includes(slug)) return;
    setCmp([cmp[1], slug]);
  };

  const picked = cmp.map((slug) => LIGHTS.find((l) => l.slug === slug)).filter(Boolean) as typeof LIGHTS;

  return (
    <section className="py-24 sm:py-32 bg-[var(--color-night-950)]">
      <div className="max-w-7xl mx-auto px-6 sm:px-12">
        <div className="max-w-xl mb-11">
          <span className="readout tracking-[0.16em]">Compare the range</span>
          <h2
            className="mt-3 text-[var(--color-white)] font-[560] tracking-tight"
            style={{ fontSize: "var(--text-statement)", letterSpacing: "var(--ls-statement)" }}
          >
            Two at a time, side by side.
          </h2>
          <p className="mt-3.5 text-[var(--color-grey-300)]" style={{ fontSize: "var(--text-body)" }}>
            Pick any two. Every spec is measured the same way, so the difference is the only thing you read.
          </p>
        </div>

        <div className="flex flex-wrap gap-2 mb-7">
          {LIGHTS.map((l) => {
            const on = cmp.includes(l.slug);
            return (
              <button
                key={l.slug}
                type="button"
                onClick={() => pick(l.slug)}
                className={`h-10 px-[18px] rounded-full text-[0.9375rem] transition-all duration-[var(--dur-fast)] cursor-pointer border ${
                  on
                    ? "bg-[var(--color-white)] text-[var(--color-night-950)] border-[var(--color-white)] font-[560]"
                    : "bg-transparent text-[var(--color-grey-300)] border-white/16"
                }`}
              >
                {l.name}
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-[var(--glass-stroke)] border border-[var(--glass-stroke)] rounded-[var(--radius-card)] overflow-hidden">
          {picked.map((l) => {
            const other = picked.find((o) => o.slug !== l.slug);
            const rows: { k: string; v: string; better: boolean }[] = [
              { k: "Throw", v: `${l.light?.beamDistanceM} m`, better: !!other && !!l.light && !!other.light && l.light.beamDistanceM > other.light.beamDistanceM },
              { k: "Lumens", v: (l.light?.lumens ?? 0).toLocaleString(), better: !!other && !!l.light && !!other.light && l.light.lumens > other.light.lumens },
              { k: "Draw", v: `${l.light?.wattsPair} W`, better: false },
              { k: "Colour", v: "5000K", better: false },
              { k: "Rating", v: `${l.rating.toFixed(1)} / ${l.reviewCount} reviews`, better: !!other && l.rating > other.rating },
            ];
            return (
              <div key={l.slug} className="bg-[var(--color-night-950)] p-8">
                <div className="relative aspect-[4/3] rounded-[var(--radius-card)] bg-[var(--color-plate)] p-[6%] mb-6">
                  <Image
                    src={l.hero}
                    alt={l.name}
                    fill
                    sizes="(max-width: 640px) 88vw, 44vw"
                    className="object-contain"
                  />
                </div>
                <div className="flex items-baseline justify-between gap-4">
                  <span className="text-2xl font-[600] tracking-[-0.015em] text-[var(--color-white)]">{l.name}</span>
                  <span className="readout text-[1.125rem] font-[500] text-[var(--color-white)]">{inr(l.price)}</span>
                </div>
                <p className="mt-2.5 mb-6 text-[0.9375rem] text-[var(--color-grey-300)]">{NOTES[l.slug]}</p>
                {rows.map((r) => (
                  <div key={r.k} className="flex items-baseline justify-between gap-4 py-3 border-t border-[var(--glass-stroke)]">
                    <span className="readout tracking-[0.14em]">{r.k}</span>
                    <span
                      className="tabular-nums text-[1rem] font-[500]"
                      style={{ fontFamily: "var(--font-mono)", color: r.better ? "var(--color-beam)" : "var(--color-white)" }}
                    >
                      {r.v}
                    </span>
                  </div>
                ))}
              </div>
            );
          })}
        </div>

        <div className="mt-8">
          <Link href="/lights/" className="cta-link">
            <span>See the full range</span>
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
