"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Scroll parallax, ported from the design system's `[data-parallax]`.
 *
 * The outer element is the clipping frame (it should be positioned and the
 * ancestor should clip); the inner element is what actually moves, so give the
 * outer a vertical overscan (`-inset-y-[8%]`) or the translate will reveal an
 * edge. Progress is measured off the frame, exactly as the mockups do:
 *
 *     progress = (top + height / 2 - vh / 2) / vh    // -1 .. 1
 *     translateY(-progress * speed * 100) scale(1 + speed * 0.15)
 *
 * Listener is passive and never calls preventDefault, so this cannot reproduce
 * the scroll-trap regression the technology page used to have. Inert under
 * prefers-reduced-motion.
 */
export default function Parallax({
  speed = 0.15,
  className = "",
  children,
}: {
  speed?: number;
  className?: string;
  children: ReactNode;
}) {
  const frameRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const frame = frameRef.current;
    const inner = innerRef.current;
    if (!frame || !inner) return;

    let raf: number | null = null;

    const update = () => {
      raf = null;
      const vh = window.innerHeight;
      const r = frame.getBoundingClientRect();
      if (r.bottom < 0 || r.top > vh) return;
      const progress = (r.top + r.height / 2 - vh / 2) / vh;
      inner.style.transform = `translateY(${(-progress * speed * 100).toFixed(2)}px) scale(${
        1 + speed * 0.15
      })`;
    };

    const onScroll = () => {
      if (raf === null) raf = requestAnimationFrame(update);
    };

    inner.style.willChange = "transform";
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    update();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf !== null) cancelAnimationFrame(raf);
    };
  }, [speed]);

  return (
    <div ref={frameRef} className={className}>
      <div ref={innerRef} className="h-full w-full">
        {children}
      </div>
    </div>
  );
}
