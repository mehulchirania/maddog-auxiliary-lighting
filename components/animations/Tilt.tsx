"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Pointer-tracked 3D tilt, ported from the design system's `[data-tilt]`:
 * ±7deg on both axes plus a 4px lift, 120ms tracking in and a 500ms settle out.
 *
 * Pointer-driven only — it never runs on touch scroll and is inert under
 * prefers-reduced-motion, so it adds no scroll cost on mobile.
 */
export default function Tilt({
  className = "",
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = ref.current;
    if (!el) return;
    // Coarse pointers get no hover state to track.
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    el.style.transformStyle = "preserve-3d";
    el.style.willChange = "transform";

    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const nx = (e.clientX - r.left) / r.width - 0.5;
      const ny = (e.clientY - r.top) / r.height - 0.5;
      el.style.transition = "transform 120ms ease-out";
      el.style.transform = `perspective(900px) rotateY(${(nx * 7).toFixed(2)}deg) rotateX(${(
        -ny * 7
      ).toFixed(2)}deg) translateY(-4px)`;
    };

    const leave = () => {
      el.style.transition = "transform 500ms var(--ease-out)";
      el.style.transform = "none";
    };

    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", leave);
    return () => {
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", leave);
    };
  }, []);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
