"use client";

import { useCallback, useId, useMemo, useRef, useState, useEffect } from "react";
import { ladder, type Product } from "@/lib/products";
import { cn } from "@/lib/cn";

/**
 * The signature interactive element: a before/after beam comparison over a
 * synthetic night road scene. Split by a draggable divider — mouse, touch
 * (via the Pointer Events API) and keyboard (arrow keys on a slider handle)
 * all move the same value.
 *
 * The road scene has no photography backing it yet, so it is built entirely
 * from SVG gradients/shapes. Geometry uses a simple perspective model: a
 * near edge and a vanishing point, with beam reach mapped onto that axis via
 * a hyperbolic ease so real metre figures translate into visibly different,
 * non-linear screen positions (the way distance actually reads to an eye).
 */

const SELECTABLE_SLUGS = ["scout-x", "alpha", "lycan", "rage"] as const;

// --- scene geometry (SVG viewBox units, 800x500) ------------------------
const VB_W = 800;
const VB_H = 500;
const NEAR_Y = 482;
const HORIZON_Y = 168;
const CX = 400;

// How far (in the hyperbolic sense) a beam distance "feels" — larger H
// compresses far distances more, which is what a receding road does.
const DISTANCE_EASE = 140;

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function roadHalfWidth(y: number) {
  const t = Math.min(1, Math.max(0, (NEAR_Y - y) / (NEAR_Y - HORIZON_Y)));
  return lerp(18, 360, t);
}

/** Builds a closed cone polygon from the near edge out to `reachY`. */
function beamPolygon(reachY: number, sourceHalf: number, endHalf: number, curvePow: number) {
  const steps = 22;
  const left: string[] = [];
  const right: string[] = [];
  for (let i = 0; i <= steps; i++) {
    const s = i / steps;
    const y = NEAR_Y - s * (NEAR_Y - reachY);
    const grow = Math.pow(s, 1 / curvePow);
    const hw = Math.min(sourceHalf + (endHalf - sourceHalf) * grow, roadHalfWidth(y) * 1.1);
    left.push(`${(CX - hw).toFixed(1)},${y.toFixed(1)}`);
    right.push(`${(CX + hw).toFixed(1)},${y.toFixed(1)}`);
  }
  right.reverse();
  return `M${left.join(" L")} L${right.join(" L")} Z`;
}

interface BeamInput {
  distanceM: number;
  lumens: number;
  floodPct: number;
}

interface BeamRender {
  reachY: number;
  glowD: string;
  coreD: string;
  fadeY2: number;
  intensity: number;
  puddleRx: number;
}

function computeBeam({ distanceM, lumens, floodPct }: BeamInput): BeamRender {
  const t = distanceM / (distanceM + DISTANCE_EASE);
  const reachY = NEAR_Y - t * (NEAR_Y - HORIZON_Y);
  const floodFrac = floodPct / 100;
  const glowEndHalf = lerp(30, 170, floodFrac);
  const coreEndHalf = lerp(12, 62, floodFrac);
  const glowD = beamPolygon(reachY, 30, glowEndHalf, 1.7);
  const coreReachY = NEAR_Y - (NEAR_Y - reachY) * 0.82;
  const coreD = beamPolygon(coreReachY, 12, coreEndHalf, 1.15);
  // Floor lifted from 0.35 so the stock headlamp reads as weak-but-present
  // light rather than an empty frame next to the Maddog side.
  const intensity = Math.min(1, Math.max(0.5, lumens / 12000));
  return {
    reachY,
    glowD,
    coreD,
    fadeY2: reachY,
    intensity,
    puddleRx: lerp(40, 78, floodFrac),
  };
}

// A handful of fixed star positions — deterministic so server/client markup
// always match (no Math.random at render time).
const STARS = [
  [70, 40, 1.2, 0.5],
  [140, 90, 0.9, 0.35],
  [230, 30, 1.1, 0.4],
  [310, 70, 0.8, 0.3],
  [470, 50, 1, 0.4],
  [560, 95, 0.9, 0.3],
  [640, 35, 1.2, 0.5],
  [710, 80, 0.8, 0.3],
  [400, 20, 1, 0.35],
  [180, 130, 0.7, 0.25],
  [610, 130, 0.7, 0.25],
] as const;

function RoadScene({ idPrefix, beam }: { idPrefix: string; beam: BeamRender }) {
  const fadeId = `${idPrefix}-fade`;
  const coreFadeId = `${idPrefix}-core-fade`;
  const blurId = `${idPrefix}-blur`;

  return (
    <svg
      viewBox={`0 0 ${VB_W} ${VB_H}`}
      preserveAspectRatio="xMidYMax slice"
      className="h-full w-full"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={fadeId} gradientUnits="userSpaceOnUse" x1={CX} y1={NEAR_Y} x2={CX} y2={beam.fadeY2}>
          <stop offset="0%" stopColor="var(--color-beam-300)" stopOpacity={0.32 * beam.intensity} />
          <stop offset="55%" stopColor="var(--color-beam-200)" stopOpacity={0.16 * beam.intensity} />
          <stop offset="100%" stopColor="var(--color-beam-200)" stopOpacity={0} />
        </linearGradient>
        <linearGradient id={coreFadeId} gradientUnits="userSpaceOnUse" x1={CX} y1={NEAR_Y} x2={CX} y2={beam.fadeY2}>
          <stop offset="0%" stopColor="var(--color-beam-100)" stopOpacity={0.85 * beam.intensity} />
          <stop offset="60%" stopColor="var(--color-beam-200)" stopOpacity={0.5 * beam.intensity} />
          <stop offset="100%" stopColor="var(--color-beam-200)" stopOpacity={0} />
        </linearGradient>
        <filter id={blurId} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="7" />
        </filter>
      </defs>

      {/* base */}
      <rect x={0} y={0} width={VB_W} height={VB_H} fill="var(--color-ink-950)" />
      <rect x={0} y={0} width={VB_W} height={HORIZON_Y + 6} fill="var(--color-ink-900)" opacity={0.6} />

      {STARS.map(([x, y, r, o], i) => (
        <circle key={i} cx={x} cy={y} r={r} fill="var(--color-fog-400)" opacity={o} />
      ))}

      {/* low hill silhouette for depth */}
      <path
        d={`M0,${HORIZON_Y + 4} L60,${HORIZON_Y - 6} L150,${HORIZON_Y + 2} L260,${HORIZON_Y - 10} L400,${HORIZON_Y - 2} L540,${HORIZON_Y - 12} L650,${HORIZON_Y} L800,${HORIZON_Y - 6} L800,${HORIZON_Y + 20} L0,${HORIZON_Y + 20} Z`}
        fill="var(--color-ink-950)"
      />

      {/* road */}
      <polygon
        points={`${CX - 360},${NEAR_Y} ${CX + 360},${NEAR_Y} ${CX + 18},${HORIZON_Y} ${CX - 18},${HORIZON_Y}`}
        fill="var(--color-ink-800)"
      />
      <polygon
        points={`${CX - 360},${NEAR_Y} ${CX + 360},${NEAR_Y} ${CX + 18},${HORIZON_Y} ${CX - 18},${HORIZON_Y}`}
        fill="var(--color-ink-950)"
        opacity={0.35}
      />

      {/* road edge lines */}
      <line x1={CX - 358} y1={NEAR_Y} x2={CX - 17} y2={HORIZON_Y} stroke="var(--color-fog-600)" strokeWidth={1.5} opacity={0.3} />
      <line x1={CX + 358} y1={NEAR_Y} x2={CX + 17} y2={HORIZON_Y} stroke="var(--color-fog-600)" strokeWidth={1.5} opacity={0.3} />

      {/* perspective centre-line dashes, clustering toward the horizon */}
      {Array.from({ length: 9 }).map((_, i) => {
        const t0 = Math.pow(i / 9, 1.4);
        const t1 = Math.pow((i + 0.5) / 9, 1.4);
        const y1 = NEAR_Y - t0 * (NEAR_Y - HORIZON_Y);
        const y2 = NEAR_Y - t1 * (NEAR_Y - HORIZON_Y);
        const w = lerp(6, 1, i / 9);
        return (
          <line
            key={i}
            x1={CX}
            y1={y1}
            x2={CX}
            y2={y2}
            stroke="var(--color-fog-500)"
            strokeWidth={w}
            opacity={0.45}
          />
        );
      })}

      {/* beam glow + core */}
      <path d={beam.glowD} fill={`url(#${fadeId})`} filter={`url(#${blurId})`} />
      <path d={beam.coreD} fill={`url(#${coreFadeId})`} />

      {/* near-field ground puddle at the source */}
      <ellipse
        cx={CX}
        cy={NEAR_Y - 4}
        rx={beam.puddleRx}
        ry={11}
        fill="var(--color-beam-200)"
        opacity={0.4 * beam.intensity}
        filter={`url(#${blurId})`}
      />

      {/* lamp hotspot */}
      <circle cx={CX} cy={NEAR_Y - 2} r={7} fill="var(--color-beam-100)" opacity={0.9 * beam.intensity} />
    </svg>
  );
}

function SceneLabel({
  side,
  title,
  subtitle,
}: {
  side: "left" | "right";
  title: string;
  subtitle: string;
}) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute top-4 max-w-[65%] sm:top-6",
        side === "left" ? "left-4 sm:left-6" : "right-4 text-right sm:right-6",
      )}
    >
      <p className="eyebrow text-fog-400">{title}</p>
      <p className="text-fog-500 mt-1 leading-snug" style={{ fontSize: "var(--text-caption)" }}>{subtitle}</p>
    </div>
  );
}

export default function BeamCompare({ className }: { className?: string }) {
  const rawId = useId().replace(/[:]/g, "-");
  const [pct, setPct] = useState(54);
  const [dragging, setDragging] = useState(false);
  const frameRef = useRef<HTMLDivElement>(null);
  // Scroll-linked beam reach multiplier (§2.4 signature interaction).
  // As the hero scrolls down, the selected beam extends further into the scene.
  // Gated behind prefers-reduced-motion and ≥768px viewport.
  const [scrollReach, setScrollReach] = useState(1);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px) and (prefers-reduced-motion: no-preference)");
    if (!mq.matches) return;

    const hero = frameRef.current?.closest("section");
    if (!hero) return;

    const onScroll = () => {
      const rect = hero.getBoundingClientRect();
      const progress = Math.min(1, Math.max(0, -rect.top / (rect.height * 0.6)));
      // Reach multiplier: 1 at top of scroll → 1.4 when hero is 60% scrolled
      setScrollReach(1 + progress * 0.4);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const options = useMemo<Product[]>(
    () => SELECTABLE_SLUGS.map((slug) => ladder.find((p) => p.slug === slug)).filter((p): p is Product => Boolean(p)),
    [],
  );
  const [selectedSlug, setSelectedSlug] = useState<string>(options[1]?.slug ?? options[0]?.slug ?? "alpha");
  const selected = options.find((p) => p.slug === selectedSlug) ?? options[0];

  const stockBeam = useMemo(
    () => computeBeam({ distanceM: 35, lumens: 700, floodPct: 85 }),
    [],
  );
  const selectedBeam = useMemo(
    () => {
      const base = computeBeam({
        distanceM: selected.light!.beamDistanceM * scrollReach,
        lumens: selected.light!.lumens,
        floodPct: selected.light!.flood,
      });
      return base;
    },
    [selected, scrollReach],
  );

  const updateFromClientX = useCallback((clientX: number) => {
    const el = frameRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const raw = ((clientX - rect.left) / rect.width) * 100;
    setPct(Math.min(100, Math.max(0, raw)));
  }, []);

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    setDragging(true);
    e.currentTarget.setPointerCapture(e.pointerId);
    updateFromClientX(e.clientX);
  };
  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragging) return;
    updateFromClientX(e.clientX);
  };
  const endDrag = () => setDragging(false);

  const onKeyDown = (e: React.KeyboardEvent) => {
    const step = e.shiftKey ? 10 : 4;
    if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
      setPct((p) => Math.max(0, p - step));
      e.preventDefault();
    } else if (e.key === "ArrowRight" || e.key === "ArrowUp") {
      setPct((p) => Math.min(100, p + step));
      e.preventDefault();
    } else if (e.key === "Home") {
      setPct(0);
      e.preventDefault();
    } else if (e.key === "End") {
      setPct(100);
      e.preventDefault();
    }
  };

  const roundedPct = Math.round(pct);
  const transitionClass = !dragging && "motion-safe:transition-[left,clip-path] motion-safe:duration-150";

  return (
    <div className={className}>
      <div
        ref={frameRef}
        className="hairline relative aspect-[4/3] w-full touch-none select-none overflow-hidden rounded-lg border bg-ink-950 cursor-ew-resize sm:aspect-[3/2] lg:aspect-[16/10]"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onPointerLeave={endDrag}
      >
        <div
          className={cn("absolute inset-0", transitionClass)}
          style={{ clipPath: `inset(0 ${100 - pct}% 0 0)` }}
        >
          <RoadScene idPrefix={`${rawId}-a`} beam={stockBeam} />
          <SceneLabel side="left" title="Stock headlamp" subtitle="Typical halogen low beam" />
        </div>
        <div
          className={cn("absolute inset-0", transitionClass)}
          style={{ clipPath: `inset(0 0 0 ${pct}%)` }}
        >
          <RoadScene idPrefix={`${rawId}-b`} beam={selectedBeam} />
          <SceneLabel side="right" title={`Maddog ${selected.name}`} subtitle={selected.light!.opticsLabel} />
        </div>

        <div
          aria-hidden="true"
          className={cn("bg-bone/50 absolute inset-y-0 z-10 w-px", transitionClass)}
          style={{ left: `${pct}%` }}
        />
        <div
          role="slider"
          tabIndex={0}
          aria-label="Drag to compare the stock headlamp with the selected Maddog light"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={roundedPct}
          aria-valuetext={`${roundedPct} percent toward ${selected.name}`}
          onKeyDown={onKeyDown}
          className={cn(
            "border-ink-400 bg-bone text-ink-900 absolute top-1/2 z-20 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal-500",
            transitionClass,
          )}
          style={{ left: `${pct}%` }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M8 6l-6 6 6 6M16 6l6 6-6 6" />
          </svg>
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex flex-wrap gap-2" role="group" aria-label="Choose a Maddog light to compare">
          {options.map((p) => (
            <button
              key={p.slug}
              type="button"
              aria-pressed={p.slug === selectedSlug}
              onClick={() => setSelectedSlug(p.slug)}
              className={cn(
                "rounded-full border px-4 py-2 tracking-wide motion-safe:transition-colors",
                p.slug === selectedSlug
                  ? "border-signal-500 bg-signal-500/10 text-bone"
                  : "border-ink-500 text-fog-400 hover:border-ink-400 hover:text-fog-200",
              )}
              style={{ fontSize: "var(--text-caption)" }}
            >
              {p.name}
            </button>
          ))}
        </div>

        <div className="flex items-baseline gap-8">
          <div>
            <p className="eyebrow">Beam distance</p>
          <p className="tnum text-bone mt-1 leading-none" style={{ fontSize: "var(--text-stat)", fontWeight: "var(--fw-stat)" }}>
              {Math.round(selected.light!.beamDistanceM)}
              <span className="text-fog-500 ml-1" style={{ fontSize: "var(--text-caption)" }}>m</span>
            </p>
          </div>
          <div>
            <p className="eyebrow">Output</p>
          <p className="tnum text-bone mt-1 leading-none" style={{ fontSize: "var(--text-stat)", fontWeight: "var(--fw-stat)" }}>
              {Math.round(selected.light!.lumens).toLocaleString("en-IN")}
              <span className="text-fog-500 ml-1" style={{ fontSize: "var(--text-caption)" }}>lm</span>
            </p>
          </div>
        </div>
      </div>

      <p className="text-fog-500 mt-4" style={{ fontSize: "var(--text-caption)" }}>
        Illustrative render, built with CSS and SVG — actual beam photography from the reference night shoot is pending.
      </p>
    </div>
  );
}
