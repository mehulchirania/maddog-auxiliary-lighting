"use client";

import { useCallback, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const MIN_PCT = 2;
const MAX_PCT = 98;
const STEP_PCT = 5;

function DragCompareSlider() {
  const frameRef = useRef<HTMLDivElement>(null);
  const [pct, setPct] = useState(50);
  const draggingRef = useRef(false);

  const setFromClientX = useCallback((clientX: number) => {
    const frame = frameRef.current;
    if (!frame) return;
    const rect = frame.getBoundingClientRect();
    const raw = ((clientX - rect.left) / rect.width) * 100;
    setPct(Math.min(MAX_PCT, Math.max(MIN_PCT, raw)));
  }, []);

  const onPointerDown = (e: React.PointerEvent) => {
    draggingRef.current = true;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    setFromClientX(e.clientX);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!draggingRef.current) return;
    setFromClientX(e.clientX);
  };

  const onPointerUp = (e: React.PointerEvent) => {
    draggingRef.current = false;
    (e.target as HTMLElement).releasePointerCapture(e.pointerId);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      setPct((p) => Math.max(MIN_PCT, p - STEP_PCT));
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      setPct((p) => Math.min(MAX_PCT, p + STEP_PCT));
    } else if (e.key === "Home") {
      e.preventDefault();
      setPct(MIN_PCT);
    } else if (e.key === "End") {
      e.preventDefault();
      setPct(MAX_PCT);
    }
  };

  return (
    <div
      ref={frameRef}
      className="relative w-full select-none rounded-[var(--radius-card)] overflow-hidden border border-[var(--glass-stroke)] touch-none shadow-2xl"
      style={{ aspectRatio: "1200 / 470" }}
      onPointerMove={onPointerMove}
    >
      {/* Right side — Rage, clean */}
      <div className="absolute inset-0">
        <Image
          src="/media/derived/road-strip-rage.webp"
          alt="Maddog Rage — 400 m measured beam"
          fill
          sizes="(max-width: 1160px) 92vw, 1160px"
          className="object-cover"
        />
      </div>

      {/* Left side — stock, darkened, clipped to pct */}
      <div
        className="absolute inset-0"
        style={{ clipPath: `inset(0 ${100 - pct}% 0 0)` }}
      >
        <Image
          src="/media/derived/road-strip-lycan.webp"
          alt="Stock halogen — 35 m usable light"
          fill
          sizes="(max-width: 1160px) 92vw, 1160px"
          className="object-cover"
          style={{ filter: "brightness(0.4) sepia(0.35) saturate(0.65)" }}
        />
      </div>

      {/* Corner captions */}
      <div className="absolute top-3 left-3 z-10">
        <span className="glass-deep px-2.5 py-1 text-xs font-medium">STOCK 35 m</span>
      </div>
      <div className="absolute top-3 right-3 z-10">
        <span className="glass-deep px-2.5 py-1 text-xs font-medium">RAGE 400 m</span>
      </div>

      {/* Divider + handle */}
      <div
        className="absolute top-0 bottom-0 z-20 pointer-events-none"
        style={{ left: `${pct}%` }}
      >
        <div className="absolute top-0 bottom-0 w-[2px] -translate-x-1/2 bg-white shadow-lg" />
      </div>
      <button
        type="button"
        role="slider"
        aria-label="Drag to compare stock and Maddog beam"
        aria-valuemin={MIN_PCT}
        aria-valuemax={MAX_PCT}
        aria-valuenow={Math.round(pct)}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onKeyDown={onKeyDown}
        className="absolute top-1/2 z-30 w-11 h-11 -translate-x-1/2 -translate-y-1/2 rounded-full glass flex items-center justify-center cursor-ew-resize text-[var(--color-white)] active:scale-95 transition-transform shadow-xl"
        style={{ left: `${pct}%` }}
      >
        <span aria-hidden="true" className="flex items-center gap-0.5 text-xs font-bold">
          <span>‹</span>
          <span>›</span>
        </span>
      </button>
    </div>
  );
}

function GlareCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 md:relative">
      {/* Card A */}
      <div className="flex flex-col gap-3">
        <div className="relative aspect-[16/9] rounded-[var(--radius-card)] overflow-hidden bg-[var(--color-night-800)] border border-[var(--glass-stroke)] shadow-lg">
          <Image
            src="/media/derived/road-strip-rage.webp"
            alt="What you see — full 5000K beam on the tarmac"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
        <div className="flex items-center gap-3 px-1">
          <Image
            src="/media/product_features/product_feature_1758899367_4126444.webp"
            alt=""
            width={32}
            height={32}
            className="rounded-md shrink-0"
          />
          <div>
            <h3 className="text-base font-semibold text-[var(--color-white)]">What you see</h3>
            <p className="readout mt-0.5">5000K · full beam on the tarmac</p>
          </div>
        </div>
      </div>

      {/* Center annotation chip (desktop) */}
      <div className="hidden md:flex absolute left-1/2 top-[38%] -translate-x-1/2 -translate-y-1/2 z-10 justify-center pointer-events-none">
        <span className="glass-deep px-3 py-1.5 text-xs text-center max-w-[180px] leading-snug shadow-xl">
          Total-internal-reflection optics — the difference is the cutoff.
        </span>
      </div>

      {/* Card B */}
      <div className="flex flex-col gap-3">
        <div className="relative aspect-[16/9] rounded-[var(--radius-card)] overflow-hidden bg-[var(--color-night-800)] border border-[var(--glass-stroke)] shadow-lg">
          <Image
            src="/media/derived/road-strip-rage.webp"
            alt="What oncoming riders see — hard cutoff above the beam"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
            style={{ transform: "scaleX(-1)" }}
          />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(to top, transparent 0%, transparent 55%, rgba(10,10,11,0.92) 58%, rgba(10,10,11,0.92) 100%)",
            }}
          />
          <div
            className="absolute left-0 right-0 pointer-events-none"
            style={{
              bottom: "42%",
              height: "1px",
              background: "var(--color-beam)",
              opacity: 0.4,
            }}
          />
        </div>
        <div className="px-1">
          <h3 className="text-base font-semibold text-[var(--color-white)]">What oncoming riders see</h3>
          <p className="readout mt-0.5">hard horizontal cutoff · zero scatter above the beam</p>
        </div>
      </div>

      {/* Mobile annotation chip */}
      <div className="md:hidden flex justify-center">
        <span className="glass-deep px-3 py-1.5 text-xs text-center max-w-[260px] leading-snug">
          Total-internal-reflection optics — the difference is the cutoff.
        </span>
      </div>
    </div>
  );
}

export default function MeasuredProof() {
  return (
    <section className="relative py-20 sm:py-28 bg-[var(--color-night-950)] border-b border-[var(--glass-stroke)]">
      <div className="max-w-7xl mx-auto px-6 sm:px-12">
        <div className="max-w-2xl mb-12 sm:mb-16">
          <h2
            className="text-[var(--color-white)] font-[520] tracking-tight"
            style={{ fontSize: "var(--text-statement)", letterSpacing: "var(--ls-statement)" }}
          >
            Measured, not marketed.
          </h2>
          <p
            className="text-[var(--color-grey-300)] mt-4 leading-relaxed max-w-xl"
            style={{ fontSize: "var(--text-body)" }}
          >
            The numbers on every spec sheet were shot on a real road with distance boards. Drag to compare.
          </p>
        </div>

        <div className="w-full mx-auto mb-16 sm:mb-20" style={{ maxWidth: "1160px" }}>
          <DragCompareSlider />
        </div>

        <div>
          <GlareCards />
        </div>

        <div className="mt-12">
          <Link
            href="/technology/"
            className="inline-flex items-center gap-1.5 text-[var(--color-white)] underline underline-offset-4 decoration-white/40 hover:decoration-[var(--color-beam)] hover:text-[var(--color-beam)] transition-colors duration-[var(--dur-fast)]"
          >
            <span>How TIR optics work</span>
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
