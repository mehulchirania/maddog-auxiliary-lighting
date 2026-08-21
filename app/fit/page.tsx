import type { Metadata } from "next";
import { Suspense } from "react";
import FitFlow from "@/components/fit/FitFlow";

export const metadata: Metadata = {
  title: "Fitment & Bike Finder — Maddog",
  description:
    "Match the exact auxiliary light, wiring harness, and mount clamp engineered for your motorcycle chassis.",
};

export default function FitPage() {
  return (
    <article className="bg-[var(--color-night-950)] text-[var(--color-white)] min-h-screen">
      {/* Compact typographic hero — this page is a tool, not a landing. No image. */}
      <section className="w-full border-b border-[var(--glass-stroke)] py-14 sm:py-20">
        <div className="max-w-7xl mx-auto px-6 sm:px-12 w-full">
          <h1
            className="text-[var(--color-white)] tracking-tight"
            style={{
              fontSize: "var(--text-page-title)",
              fontWeight: "var(--fw-page-title)",
              letterSpacing: "var(--ls-page-title)",
            }}
          >
            Find your fit.
          </h1>
          <p
            className="mt-3 text-[var(--color-grey-300)] max-w-lg leading-relaxed"
            style={{ fontSize: "var(--text-body)" }}
          >
            Select your manufacturer and model for the exact optical throw, harness wiring, and mounting clamps your chassis requires.
          </p>
        </div>
      </section>

      {/* Progressive Flow */}
      <section className="max-w-7xl mx-auto px-6 sm:px-12 py-12 sm:py-16">
        <Suspense fallback={<div className="text-center text-sm text-[var(--color-grey-500)]">Loading fitment database...</div>}>
          <FitFlow />
        </Suspense>
      </section>
    </article>
  );
}
