import type { Metadata } from "next";
import Image from "next/image";
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
      {/* 40svh Dark Hero */}
      <section className="relative h-[40svh] min-h-[300px] w-full flex items-center overflow-hidden border-b border-[var(--glass-stroke)]">
        <div className="absolute inset-0 z-0">
          <Image
            src="/media/derived/hero-hardware-wide.webp"
            alt="Maddog Fitment Studio"
            fill
            sizes="100vw"
            priority
            className="object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-night-950)] via-[var(--color-night-950)]/70 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-12 w-full">
          <h1
            className="font-[520] text-[var(--color-white)] tracking-tight"
            style={{ fontSize: "var(--text-statement)", letterSpacing: "var(--ls-statement)" }}
          >
            Built for what you ride.
          </h1>
          <p
            className="mt-3 text-[var(--color-grey-300)] max-w-lg leading-relaxed"
            style={{ fontSize: "var(--text-body)" }}
          >
            Select your motorcycle manufacturer and model to get the exact optical throw, harness wiring, and mounting clamps your chassis requires.
          </p>
        </div>
      </section>

      {/* Progressive Flow */}
      <section className="max-w-7xl mx-auto px-6 sm:px-12 py-16 sm:py-24">
        <Suspense fallback={<div className="text-center text-sm text-[var(--color-grey-500)]">Loading fitment database...</div>}>
          <FitFlow />
        </Suspense>
      </section>
    </article>
  );
}
