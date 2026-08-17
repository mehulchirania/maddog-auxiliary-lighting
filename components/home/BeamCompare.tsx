"use client";

import { useCallback, useId, useMemo, useRef, useState, useEffect } from "react";
import { ladder, type Product } from "@/lib/products";
import { cn } from "@/lib/cn";

const SELECTABLE_SLUGS = ["alpha", "lycan", "rage", "scout-x"] as const;

// --- scene geometry (SVG viewBox units, 800x500) ------------------------
const VB_W = 800;
const VB_H = 500;
const NEAR_Y = 482;
const HORIZON_Y = 168;
const CX = 400;

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

      {/* low hill silhouette */}
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

      {/* perspective dashes */}
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

      {/* puddle */}
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
        "pointer-events-none absolute top-3 max-w-[65%] sm:top-4",
        side === "left" ? "left-3 sm:left-4" : "right-3 text-right sm:right-4",
      )}
    >
      <p className="eyebrow text-fog-300 font-mono text-[10px] sm:text-[11px]">{title}</p>
      <p className="text-fog-400 mt-0.5 leading-tight font-mono text-[10px] sm:text-[11px]">{subtitle}</p>
    </div>
  );
}

export default function BeamCompare({ className }: { className?: string }) {
  const rawId = useId().replace(/[:]/g, "-");
  const [pct, setPct] = useState(50);
  const [dragging, setDragging] = useState(false);
  const frameRef = useRef<HTMLDivElement>(null);
  const [scrollReach, setScrollReach] = useState(1);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px) and (prefers-reduced-motion: no-preference)");
    if (!mq.matches) return;

    const hero = frameRef.current?.closest("section");
    if (!hero) return;

    const onScroll = () => {
      const rect = hero.getBoundingClientRect();
      const progress = Math.min(1, Math.max(0, -rect.top / (rect.height * 0.6)));
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
  const [selectedSlug, setSelectedSlug] = useState<string>("alpha");
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
    <div className={cn("flex flex-col justify-between h-full gap-4", className)}>
      {/* Top Bar inside Card: Title + Model Pills */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b hairline pb-3">
        <div>
          <span className="eyebrow text-signal-500">Beam Telemetry Simulator</span>
          <p className="text-bone font-medium text-sm">Stock Halogen vs Maddog 5000K TIR</p>
        </div>

        <div className="flex flex-wrap gap-1.5" role="group" aria-label="Choose a Maddog light to compare">
          {options.map((p) => {
            const isSel = p.slug === selectedSlug;
            return (
              <button
                key={p.slug}
                type="button"
                aria-pressed={isSel}
                onClick={() => setSelectedSlug(p.slug)}
                className={cn(
                  "rounded-full px-3 py-1 text-xs font-mono font-medium tracking-wide transition-all",
                  isSel
                    ? "bg-signal-600 text-bone shadow-sm"
                    : "bg-ink-900/80 border hairline text-fog-400 hover:text-bone hover:border-ink-500",
                )}
              >
                {p.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* The Draggable Viewport Canvas */}
      <div
        ref={frameRef}
        className="hairline relative aspect-[16/10] sm:aspect-[16/9] lg:aspect-[2/1] min-h-[220px] max-h-[340px] w-full touch-none select-none overflow-hidden rounded-xl border bg-ink-950 cursor-ew-resize shadow-inner"
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
          <SceneLabel side="left" title="Stock OEM" subtitle="35m Low-Beam" />
        </div>
        <div
          className={cn("absolute inset-0", transitionClass)}
          style={{ clipPath: `inset(0 0 0 ${pct}%)` }}
        >
          <RoadScene idPrefix={`${rawId}-b`} beam={selectedBeam} />
          <SceneLabel side="right" title={`Maddog ${selected.name}`} subtitle={`${selected.light!.beamDistanceM}m Throw · 5000K`} />
        </div>

        {/* Vertical Divider Line */}
        <div
          aria-hidden="true"
          className={cn("bg-signal-500/80 shadow-[0_0_8px_rgba(249,115,22,0.8)] absolute inset-y-0 z-10 w-0.5", transitionClass)}
          style={{ left: `${pct}%` }}
        />

        {/* Central Slider Knob */}
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
            "bg-ink-900 text-signal-400 border border-signal-500/70 absolute top-1/2 z-20 flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal-500 backdrop-blur-sm",
            transitionClass,
          )}
          style={{ left: `${pct}%` }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
            <path d="M8 7l-5 5 5 5M16 7l5 5-5 5" />
          </svg>
        </div>
      </div>

      {/* Bottom Telemetry HUD */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-t hairline pt-3">
        <div className="flex items-center gap-6">
          <div>
            <p className="eyebrow text-fog-500 text-[10px]">Optical Reach</p>
            <p className="tnum text-bone font-medium font-mono text-sm sm:text-base">
              {Math.round(selected.light!.beamDistanceM)}
              <span className="text-fog-500 text-xs ml-0.5">m</span>
            </p>
          </div>

          <div>
            <p className="eyebrow text-fog-500 text-[10px]">Output</p>
            <p className="tnum text-signal-400 font-semibold font-mono text-sm sm:text-base">
              {Math.round(selected.light!.lumens).toLocaleString("en-IN")}
              <span className="text-fog-500 text-xs ml-0.5 font-normal">lm</span>
            </p>
          </div>

          <div>
            <p className="eyebrow text-fog-500 text-[10px]">Pattern Split</p>
            <p className="tnum text-bone font-mono text-xs sm:text-sm">
              {selected.light!.opticsLabel}
            </p>
          </div>
        </div>

        <p className="text-fog-500 font-mono text-[10px] hidden sm:block">
          ◄ Drag slider to compare ►
        </p>
      </div>
    </div>
  );
}

