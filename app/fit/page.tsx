import type { Metadata } from "next";
import { Suspense } from "react";
import FitFlow from "@/components/fit/FitFlow";
import { brands, bikes } from "@/lib/fitment";

export const metadata: Metadata = {
  title: "Fitment & Bike Finder — Maddog",
  description:
    "Match the exact auxiliary light, wiring harness, and mount clamp engineered for your motorcycle chassis.",
};

export default function FitPage() {
  return (
    <article className="bg-[var(--color-night-950)] text-[var(--color-white)] min-h-screen">
      {/* Typographic hero — this page is a tool, not a landing. No image; the
          only ambient element is a token-coloured beam wash behind the type. */}
      <section className="relative w-full overflow-hidden border-b border-[var(--glass-stroke)] py-16 sm:py-24">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-[10%] -right-[10%] -top-[45%] h-[80%]"
          style={{
            background:
              "radial-gradient(50% 60% at 50% 0%, color-mix(in srgb, var(--color-beam) 13%, transparent) 0%, transparent 65%)",
          }}
        />
        <div className="relative max-w-7xl mx-auto px-6 sm:px-12 w-full">
          <div className="flex items-center gap-4">
            <span className="h-px w-7 bg-[var(--glass-stroke)]" />
            <span className="readout text-[0.6875rem] uppercase tracking-[0.28em] text-[var(--color-grey-500)]">
              Fitment · {brands.length} brands · {bikes.length} models mapped
            </span>
          </div>
          <h1
            className="text-[var(--color-white)] mt-6 uppercase leading-[0.92]"
            style={{
              fontSize: "var(--text-page-title)",
              fontWeight: "var(--fw-page-title)",
              letterSpacing: "var(--ls-page-title)",
            }}
          >
            Built for what
            <br />
            <span
              style={{
                backgroundImage:
                  "linear-gradient(180deg, var(--color-beam-bright) 0%, var(--color-beam) 45%, color-mix(in srgb, var(--color-beam) 30%, transparent) 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              you ride.
            </span>
          </h1>
          <p
            className="mt-7 text-[var(--color-grey-300)] max-w-[52ch] leading-relaxed"
            style={{ fontSize: "var(--text-body)" }}
          >
            Pick your brand. Each recommendation is sized to the bike&rsquo;s charging system and
            riding character — never more light than the electricals can carry.
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
