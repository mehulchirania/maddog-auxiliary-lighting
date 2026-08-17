"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/cn";

/**
 * Fades and lifts its children into view once.
 *
 * The hidden start state lives in CSS behind `@media (scripting: enabled)`, so
 * anything that stops this component from running would otherwise leave content
 * invisible. Three guards prevent that: no IntersectionObserver support reveals
 * immediately, a failed observer construction reveals immediately, and a
 * timeout reveals regardless if the observer never fires. Content being visible
 * is always the correct failure mode.
 */
export default function Reveal({
  children,
  className,
  delay = 0,
  as: Tag = "div",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "section" | "li" | "article";
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const show = () => el.classList.add("is-visible");

    if (typeof IntersectionObserver === "undefined") {
      show();
      return;
    }

    let io: IntersectionObserver;
    try {
      io = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              show();
              io.disconnect();
            }
          }
        },
        { rootMargin: "0px 0px -12% 0px", threshold: 0.05 },
      );
      io.observe(el);
    } catch {
      show();
      return;
    }

    // Safety net: never leave content hidden if the observer never fires.
    const failsafe = window.setTimeout(() => {
      show();
      io.disconnect();
    }, 2500);

    return () => {
      window.clearTimeout(failsafe);
      io.disconnect();
    };
  }, []);

  // Widening to ElementType avoids TS intersecting the ref types of every tag
  // in the union (which would demand an impossible HTMLDivElement & HTMLLIElement).
  const Component = Tag as React.ElementType;

  return (
    <Component
      ref={ref}
      className={cn("reveal", className)}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Component>
  );
}
