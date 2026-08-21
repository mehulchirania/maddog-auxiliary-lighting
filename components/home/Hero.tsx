"use client";

import { useCallback, useRef, useState } from "react";
import Image from "next/image";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const [x, setX] = useState(0.5);

  const updateFromClientX = useCallback((clientX: number) => {
    const el = sectionRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    setX(Math.min(1, Math.max(0, (clientX - r.left) / r.width)));
  }, []);

  const handlePointerMove = (e: React.PointerEvent<HTMLElement>) => {
    updateFromClientX(e.clientX);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLElement>) => {
    const touch = e.touches[0];
    if (touch) updateFromClientX(touch.clientX);
  };

  return (
    <section
      ref={sectionRef}
      onPointerMove={handlePointerMove}
      onTouchMove={handleTouchMove}
      className="relative w-full overflow-hidden bg-[var(--color-night-950)] select-none cursor-ew-resize"
      style={{ height: "min(88vh, 760px)", minHeight: 560, touchAction: "pan-y" }}
    >
      {/* Base layer — your view, the Maddog beam */}
      <Image
        src="/media/derived/road-strip-rage.webp"
        alt="What the rider sees"
        fill
        loading="eager"
        fetchPriority="high"
        sizes="100vw"
        className="object-cover object-center"
      />

      {/* Revealed layer — what oncoming traffic sees, clipped to the drag position */}
      <div
        className="absolute inset-0"
        style={{ clipPath: `inset(0 0 0 ${x * 100}%)` }}
      >
        <Image
          src="/media/derived/road-strip-lycan.webp"
          alt="What oncoming traffic sees"
          fill
          loading="eager"
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

      {/* Legibility scrim */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, rgba(8,8,10,0.86) 0%, rgba(8,8,10,0.2) 45%, rgba(8,8,10,0.7) 100%)",
        }}
      />

      {/* Seam */}
      <div
        className="absolute inset-y-0 pointer-events-none"
        style={{
          left: `${x * 100}%`,
          width: 1,
          background: "var(--color-beam)",
          boxShadow: "0 0 20px rgba(255,237,201,0.65)",
        }}
      />

      {/* Headline */}
      <div className="absolute left-0 right-0 top-[14%] text-center px-6 sm:px-14 pointer-events-none">
        <span className="readout text-[var(--color-beam)] tracking-[0.16em]">
          The anti-glare position
        </span>
        <h1
          className="mx-auto mt-[18px] max-w-[20ch] font-[650] leading-[1.05] tracking-[-0.03em] text-[var(--color-white)]"
          style={{ fontSize: "clamp(2.75rem, 6vw, 4.5rem)" }}
        >
          Engineered to be seen with.
        </h1>
        <p className="mx-auto mt-5 max-w-[52ch] text-[var(--color-grey-300)] text-[1.0625rem]">
          Move across the frame: your view on the left, what oncoming traffic sees on the right. Same light, same road.
        </p>
      </div>

      {/* Left readout — your view */}
      <div className="absolute left-6 sm:left-14 bottom-[10%] pointer-events-none">
        <div className="readout tracking-[0.16em]">Your view</div>
        <div
          className="mt-1.5 font-[500] tabular-nums tracking-[-0.02em] text-[var(--color-white)]"
          style={{ fontFamily: "var(--font-mono)", fontSize: "clamp(1.75rem, 3vw, 2.5rem)" }}
        >
          400
          <span className="ml-1 text-[0.4em] text-[var(--color-grey-500)]">m lit</span>
        </div>
      </div>

      {/* Right readout — oncoming view */}
      <div className="absolute right-6 sm:right-14 bottom-[10%] text-right pointer-events-none">
        <div className="readout tracking-[0.16em]">Oncoming view</div>
        <div
          className="mt-2 max-w-[16ch] font-[500] leading-[1.25] tracking-[-0.01em] text-[var(--color-white)]"
          style={{ fontFamily: "var(--font-mono)", fontSize: "clamp(1.1rem, 2vw, 1.5rem)" }}
        >
          Hard cutoff above the beam
        </div>
      </div>
    </section>
  );
}
