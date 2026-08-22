"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";

/**
 * Act 01 — the anti-glare position.
 *
 * A drag-compare between the two sides of the same beam: what the rider sees,
 * and what oncoming traffic sees. This used to double as the landing hero,
 * which meant the brand headline sat on top of an interactive control and the
 * page had no opening frame of its own. It is now a proper section with its
 * own heading, below HeroOpening.
 */
export default function AntiGlareCompare() {
  const frameRef = useRef<HTMLDivElement>(null);
  const [x, setX] = useState(0.5);
  const sweepingRef = useRef(true);
  const rafRef = useRef<number | null>(null);

  const updateFromClientX = useCallback((clientX: number) => {
    const el = frameRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    setX(Math.min(1, Math.max(0, (clientX - r.left) / r.width)));
  }, []);

  const cancelSweep = useCallback(() => {
    sweepingRef.current = false;
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
  }, []);

  // One-time load sweep: demonstrate the drag-compare by tweening x from
  // 0.95 -> 0.5 on mount, unless the user prefers reduced motion or
  // interrupts with a real pointer/touch interaction.
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const from = 0.95;
    const to = 0.5;
    const duration = 1100;
    let start: number | null = null;

    setX(from);

    const tick = (now: number) => {
      if (!sweepingRef.current) return;
      if (start === null) start = now;
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 4);
      setX(from + (to - from) * eased);
      if (t < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        rafRef.current = null;
      }
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, []);

  const handlePointerDown = () => cancelSweep();

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    cancelSweep();
    updateFromClientX(e.clientX);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    cancelSweep();
    const touch = e.touches[0];
    if (touch) updateFromClientX(touch.clientX);
  };

  return (
    <section style={{ paddingTop: "var(--section)" }}>
      <div className="mx-auto max-w-7xl px-6 sm:px-12">
        {/* Section header — headline left, instruction right */}
        <div className="mb-9 flex flex-wrap items-end justify-between gap-8">
          <div>
            <span className="readout uppercase text-[0.6875rem] tracking-[0.28em]">
              01 / The anti-glare position
            </span>
            <h2
              className="mt-4 uppercase leading-[1] text-[var(--color-white)]"
              style={{
                fontSize: "var(--text-statement)",
                fontWeight: "var(--fw-statement)",
                letterSpacing: "var(--ls-statement)",
              }}
            >
              Same light.
              <br />
              Both sides of it.
            </h2>
          </div>
          <p className="max-w-[38ch] text-[var(--color-grey-300)]">
            Drag across the frame — your view against what oncoming traffic sees.
          </p>
        </div>

        {/* Compare frame */}
        <div
          ref={frameRef}
          data-testid="anti-glare-frame"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onTouchMove={handleTouchMove}
          className="relative w-full cursor-ew-resize select-none overflow-hidden rounded-[1.5rem] border border-[var(--glass-stroke)] bg-[var(--color-night-950)]"
          style={{ height: "min(72vh, 640px)", minHeight: 440, touchAction: "pan-y" }}
        >
          {/* Base layer — your view, the Maddog beam */}
          <Image
            src="/media/derived/road-strip-rage.webp"
            alt="What the rider sees"
            fill
            sizes="100vw"
            className="object-cover object-center"
          />

          {/* Revealed layer — what oncoming traffic sees, clipped to the drag position */}
          <div className="absolute inset-0" style={{ clipPath: `inset(0 0 0 ${x * 100}%)` }}>
            <Image
              src="/media/derived/road-strip-lycan.webp"
              alt="What oncoming traffic sees"
              fill
              sizes="100vw"
              className="object-cover object-center"
              style={{ filter: "brightness(0.34) saturate(0.55)" }}
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to top, transparent 0%, transparent 48%, rgba(8,8,10,0.95) 53%)",
              }}
            />
          </div>

          {/* Foot scrim — keeps the readouts legible over the bright base layer */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, transparent 0%, transparent 55%, rgba(8,8,10,0.7) 100%)",
            }}
          />

          {/* Seam */}
          <div
            className="pointer-events-none absolute inset-y-0"
            style={{
              left: `${x * 100}%`,
              width: 1,
              background: "var(--color-beam)",
              boxShadow: "0 0 20px rgba(255,237,201,0.65)",
            }}
          />

          {/* Left readout — your view. glass-deep backs it so it stays legible
              regardless of drag position; the base layer underneath is a bright
              photo with no darkening of its own. */}
          <div className="pointer-events-none absolute bottom-6 left-6">
            <div className="glass-deep px-4 py-3">
              <div className="readout tracking-[0.16em]">Your view</div>
              <div
                className="mt-1.5 font-[500] tabular-nums tracking-[-0.02em] text-[var(--color-white)]"
                style={{ fontFamily: "var(--font-mono)", fontSize: "clamp(1.75rem, 3vw, 2.5rem)" }}
              >
                {Math.round(140 + x * 260)}
                <span className="ml-1 text-[0.4em] text-[var(--color-grey-500)]">m lit</span>
              </div>
            </div>
          </div>

          {/* Right readout — oncoming view. Same backing: once the drag passes
              this readout's horizontal spot, the dark oncoming layer no longer
              covers it and the bright base layer would show through. */}
          <div className="pointer-events-none absolute right-6 bottom-6 text-right">
            <div className="glass-deep px-4 py-3">
              <div className="readout tracking-[0.16em]">Oncoming view</div>
              <div
                className="mt-2 max-w-[16ch] font-[500] leading-[1.25] tracking-[-0.01em] text-[var(--color-white)]"
                style={{ fontFamily: "var(--font-mono)", fontSize: "clamp(1.1rem, 2vw, 1.5rem)" }}
              >
                Hard cutoff above the beam
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
