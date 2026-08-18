"use client";

import React, { useEffect, useRef } from "react";

/**
 * Ambient dark backdrop — slow-drifting radial gradients, no external assets.
 * Purely decorative; disables the drift under prefers-reduced-motion.
 */
export default function DarkVeil({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame: number;
    const start = performance.now();
    const tick = (now: number) => {
      const t = (now - start) / 1000;
      const x1 = 50 + Math.sin(t * 0.05) * 20;
      const y1 = 30 + Math.cos(t * 0.04) * 15;
      const x2 = 70 + Math.cos(t * 0.03) * 18;
      const y2 = 70 + Math.sin(t * 0.06) * 12;
      el.style.setProperty("--veil-x1", `${x1}%`);
      el.style.setProperty("--veil-y1", `${y1}%`);
      el.style.setProperty("--veil-x2", `${x2}%`);
      el.style.setProperty("--veil-y2", `${y2}%`);
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className={className}
      style={{
        position: "absolute",
        inset: 0,
        opacity: 0.7,
        background: `
          radial-gradient(55% 45% at var(--veil-x1, 50%) var(--veil-y1, 30%), color-mix(in srgb, var(--color-signal-700) 16%, transparent), transparent 70%),
          radial-gradient(50% 40% at var(--veil-x2, 70%) var(--veil-y2, 70%), color-mix(in srgb, var(--color-ink-700) 55%, transparent), transparent 70%)
        `,
      }}
    />
  );
}
