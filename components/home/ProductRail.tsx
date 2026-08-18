"use client";

import { useRef } from "react";
import Link from "next/link";
import { useReducedMotion } from "motion/react";
import { products } from "@/lib/products";
import ProductCard from "@/components/product/ProductCard";

// The 6 aux-lights from Scout to Rage
const ORDERED_SLUGS = ["scout", "scout-x", "delta", "alpha", "lycan", "rage"];

export default function ProductRail() {
  const prefersReducedMotion = useReducedMotion();
  const resumeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const auxLights = ORDERED_SLUGS.map((slug) =>
    products.find((p) => p.slug === slug)
  ).filter((p): p is NonNullable<typeof p> => Boolean(p));

  const cards = (setKey: string, hidden: boolean) =>
    auxLights.map((prod) => (
      <div key={`${setKey}-${prod.slug}`} className="w-[min(72vw,380px)] shrink-0">
        <ProductCard product={prod} tabIndex={hidden ? -1 : undefined} ariaHidden={hidden} />
      </div>
    ));

  const pauseOnTouch = () => {
    const track = trackRef.current;
    if (!track) return;
    if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
    track.style.animationPlayState = "paused";
  };

  const resumeAfterDelay = () => {
    const track = trackRef.current;
    if (!track) return;
    resumeTimeoutRef.current = setTimeout(() => {
      track.style.animationPlayState = "running";
    }, 3000);
  };

  return (
    <section className="relative py-24 sm:py-32 bg-[var(--color-night-950)] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-12">
        {/* Intro */}
        <div className="reveal max-w-2xl mb-12 sm:mb-16">
          <h2
            className="text-[var(--color-white)] font-[520] tracking-tight"
            style={{ fontSize: "var(--text-statement)", letterSpacing: "var(--ls-statement)" }}
          >
            Six lights. One optical standard.
          </h2>
          <p
            className="text-[var(--color-grey-300)] mt-4 leading-relaxed max-w-xl"
            style={{ fontSize: "var(--text-body)" }}
          >
            From the 3,000-lumen Scout to the 11,600-lumen Rage — every light shares the same TIR lens and IP-67 housing.
          </p>
        </div>
      </div>

      {/* Rail — seamless marquee loop, pauses on hover/focus/touch */}
      <div className="w-full">
        {prefersReducedMotion ? (
          <div
            className="flex gap-6 overflow-x-auto px-6 sm:px-12 pb-6 snap-x snap-mandatory scrollbar-none"
            style={{ scrollbarWidth: "none" }}
          >
            {auxLights.map((prod) => (
              <div key={prod.slug} className="w-[min(72vw,400px)] shrink-0 snap-center">
                <ProductCard product={prod} />
              </div>
            ))}
          </div>
        ) : (
          <div className="rail-mask">
            <div
              ref={trackRef}
              className="rail-track flex gap-6 w-max px-6 sm:px-12"
              onPointerDown={pauseOnTouch}
              onPointerUp={resumeAfterDelay}
              onPointerCancel={resumeAfterDelay}
            >
              {cards("a", false)}
              {cards("b", true)}
            </div>
          </div>
        )}
      </div>

      {/* Footer Teaser Links */}
      <div className="max-w-7xl mx-auto px-6 sm:px-12 mt-12 flex flex-wrap items-center gap-x-8 gap-y-4">
        <Link
          href="/lights/"
          className="inline-flex items-center gap-1.5 text-[var(--color-white)] underline underline-offset-4 decoration-white/40 hover:decoration-[var(--color-beam)] hover:text-[var(--color-beam)] transition-colors duration-[var(--dur-fast)]"
        >
          <span>See the full range</span>
          <span aria-hidden="true">→</span>
        </Link>

        <Link
          href="#fit"
          className="inline-flex items-center gap-1.5 text-[var(--color-grey-300)] underline underline-offset-4 decoration-white/20 hover:decoration-white/60 hover:text-[var(--color-white)] transition-colors duration-[var(--dur-fast)] text-sm"
        >
          <span>Not sure which one? Find your fit</span>
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </section>
  );
}
