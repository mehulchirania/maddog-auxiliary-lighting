"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { products, type Product } from "@/lib/products";

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

type SpecKey = "throw" | "lumens" | "draw" | "rating";

interface SpecDef {
  key: SpecKey;
  label: string;
  better: "higher" | "lower";
  value: (l: Product) => number;
  format: (n: number) => string;
}

const SPEC_DEFS: SpecDef[] = [
  {
    key: "throw",
    label: "Throw",
    better: "higher",
    value: (l) => l.light?.beamDistanceM ?? 0,
    format: (n) => `${Math.round(n)} m`,
  },
  {
    key: "lumens",
    label: "Lumens",
    better: "higher",
    value: (l) => l.light?.lumens ?? 0,
    format: (n) => Math.round(n).toLocaleString(),
  },
  {
    key: "draw",
    label: "Draw",
    better: "lower",
    value: (l) => l.light?.wattsPair ?? 0,
    format: (n) => `${Math.round(n)} W`,
  },
  {
    key: "rating",
    label: "Rating",
    better: "higher",
    value: (l) => l.rating,
    format: (n) => n.toFixed(1),
  },
];

// Scale every bullet-graph row to the max value of that spec across the
// whole range, not just the two picked lights — computed once from data.
const SPEC_MAX: Record<SpecKey, number> = SPEC_DEFS.reduce((acc, s) => {
  acc[s.key] = Math.max(...LIGHTS.map(s.value));
  return acc;
}, {} as Record<SpecKey, number>);

// Small inline rAF count-up. CountUp.tsx animates once from a fixed `from`
// on scroll-into-view; here the target changes on every pick and needs to
// animate from whatever value is currently on screen, so a scroll-triggered
// entrance component doesn't fit — this hook always eases from the last
// rendered value toward the new target.
function useCountUp(target: number, duration = 400) {
  const [display, setDisplay] = useState(target);
  const displayRef = useRef(target);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion) {
      displayRef.current = target;
      setDisplay(target);
      return;
    }

    const start = displayRef.current;
    const delta = target - start;
    if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    if (delta === 0) return;

    let startTime: number | null = null;
    const step = (ts: number) => {
      if (startTime === null) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const next = start + delta * eased;
      displayRef.current = next;
      setDisplay(next);
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(step);
      }
    };
    rafRef.current = requestAnimationFrame(step);
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [target, duration]);

  return display;
}

function SpecRow({ def, index, a, b }: { def: SpecDef; index: number; a: Product; b?: Product }) {
  const rawA = def.value(a);
  const rawB = b ? def.value(b) : 0;
  const displayA = useCountUp(rawA);

  const max = SPEC_MAX[def.key] || 1;
  const fillPct = Math.max(0, Math.min(100, (rawA / max) * 100));
  const tickPct = b ? Math.max(0, Math.min(100, (rawB / max) * 100)) : 0;
  const aBetter = !!b && (def.better === "higher" ? rawA > rawB : rawA < rawB);
  const delay = `${index * 40}ms`;

  return (
    <div className="py-4">
      <div className="flex items-baseline justify-between gap-4">
        <span className="readout tracking-[0.14em]">{def.label}</span>
        <span className="flex items-baseline gap-2">
          <span
            className="readout font-[500]"
            style={{
              fontSize: "0.9375rem",
              color: aBetter ? "var(--color-beam)" : "var(--color-white)",
            }}
          >
            {def.format(displayA)}
          </span>
          {b && (
            <>
              <span className="readout">vs</span>
              <span className="readout">{def.format(rawB)}</span>
            </>
          )}
        </span>
      </div>
      <div className="relative mt-2.5 h-[6px] rounded-full bg-[var(--color-night-700)]">
        <div
          className="absolute inset-y-0 left-0 rounded-full motion-safe:transition-[width,background-color] motion-safe:duration-[480ms] motion-safe:ease-[var(--ease-out)]"
          style={{
            width: `${fillPct}%`,
            backgroundColor: aBetter ? "var(--color-beam)" : "var(--color-grey-500)",
            transitionDelay: delay,
          }}
        />
        {b && (
          <div
            className="absolute w-[2px] bg-white/45 motion-safe:transition-[left] motion-safe:duration-[480ms] motion-safe:ease-[var(--ease-out)]"
            style={{ left: `calc(${tickPct}% - 1px)`, top: "-3px", bottom: "-3px", transitionDelay: delay }}
          />
        )}
      </div>
    </div>
  );
}

export default function CompareRange() {
  const [cmp, setCmp] = useState<string[]>(["lycan", "rage"]);

  const pick = (slug: string) => {
    if (cmp.includes(slug)) return;
    setCmp([cmp[1], slug]);
  };

  const picked = cmp.map((slug) => LIGHTS.find((l) => l.slug === slug)).filter(Boolean) as typeof LIGHTS;

  return (
    <section className="py-24 sm:py-32 bg-[var(--color-night-950)]">
      <style>{`
        @keyframes card-in {
          from { opacity: 0; transform: scale(0.98); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
      <div className="max-w-7xl mx-auto px-6 sm:px-12">
        <div className="max-w-xl mb-11">
          <span className="readout tracking-[0.16em]">Compare the range</span>
          <h2
            className="beam-lit mt-3 tracking-tight"
            style={{ fontSize: "var(--text-statement)", fontWeight: "var(--fw-statement)", letterSpacing: "var(--ls-statement)" }}
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
                className={`h-10 px-[18px] rounded-full text-[0.9375rem] transition-[background-color,color,border-color,transform] duration-[var(--dur-fast)] cursor-pointer border motion-safe:active:scale-[0.96] ${
                  on
                    ? "bg-[var(--color-white)] text-[var(--color-night-950)] border-[var(--color-white)]"
                    : "bg-transparent text-[var(--color-grey-300)] border-white/16"
                }`}
              >
                {l.name}
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-[var(--glass-stroke)] border border-[var(--glass-stroke)] rounded-[var(--radius-card)] overflow-hidden">
          {picked.map((l) => (
            <div
              key={l.slug}
              className="bg-[var(--color-night-950)] p-8 motion-safe:animate-[card-in_200ms_var(--ease-out)]"
            >
              <div className="machined mb-6">
                <div className="machined-core relative aspect-[4/3] bg-[var(--color-plate)] p-[6%]">
                  <Image
                    src={l.hero}
                    alt={l.name}
                    fill
                    sizes="(max-width: 640px) 88vw, 44vw"
                    className="object-contain"
                  />
                </div>
              </div>
              <div className="flex items-baseline justify-between gap-4">
                <span className="text-2xl font-[600] tracking-[-0.015em] text-[var(--color-white)]">{l.name}</span>
                <span className="readout text-[1.125rem] font-[500] text-[var(--color-white)]">{inr(l.price)}</span>
              </div>
              <p className="mt-2.5 text-[0.9375rem] text-[var(--color-grey-300)]">{NOTES[l.slug]}</p>
            </div>
          ))}
        </div>

        {picked.length === 2 && (
          <div className="mt-8 rounded-[var(--radius-card)] border border-[var(--glass-stroke)] bg-[var(--color-night-900)] px-8 py-7">
            <div className="flex items-center gap-5 mb-5">
              <span
                className="readout tracking-[0.14em] flex items-center gap-2"
                style={{ color: "var(--color-beam)" }}
              >
                <span className="inline-block h-[3px] w-4 rounded-full" style={{ background: "var(--color-beam)" }} aria-hidden="true" />
                {picked[0].name}
              </span>
              <span className="readout tracking-[0.14em] flex items-center gap-2">
                <span className="inline-block w-[2px] h-[9px] bg-white/45" aria-hidden="true" />
                {picked[1].name}
              </span>
            </div>
            <div className="divide-y divide-[var(--glass-stroke)]">
              {SPEC_DEFS.map((def, i) => (
                <SpecRow key={def.key} def={def} index={i} a={picked[0]} b={picked[1]} />
              ))}
            </div>
          </div>
        )}

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
