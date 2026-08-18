import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import RangeCatalogue from "@/components/range/RangeCatalogue";

export const metadata: Metadata = {
  title: "The Range — Maddog Auxiliary Lighting & Systems",
  description:
    "Explore the complete Maddog motorcycle ecosystem: auxiliary lighting ladder, Claw smartphone mounts, CNC billet clamps, and solid-state harnesses.",
};

export default function LightsPage() {
  return (
    <>
      {/* 40svh Dark Hero */}
      <section className="relative h-[40svh] min-h-[300px] w-full flex items-center bg-[var(--color-night-950)] overflow-hidden border-b border-[var(--glass-stroke)]">
        <div className="absolute inset-0 z-0">
          <Image
            src="/media/derived/hero-hardware-wide.webp"
            alt="Maddog TIR optic assembly"
            fill
            sizes="100vw"
            priority
            className="object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-night-950)] via-[var(--color-night-950)]/70 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-12 w-full">
          <h1
            className="font-[520] text-[var(--color-white)] tracking-tight"
            style={{ fontSize: "var(--text-statement)", letterSpacing: "var(--ls-statement)" }}
          >
            The range.
          </h1>
          <p
            className="mt-3 text-[var(--color-grey-300)] max-w-lg leading-relaxed"
            style={{ fontSize: "var(--text-body)" }}
          >
            From the 3,000-lumen Scout to the 11,600-lumen Rage — every light shares the same calibrated 5000K TIR optics and IP-67 sealed billet chassis.
          </p>
        </div>
      </section>

      {/* Catalogue */}
      <RangeCatalogue />

      {/* Fitment teaser shortcut */}
      <div className="border-t border-[var(--glass-stroke)] bg-[var(--color-night-900)] py-12">
        <div className="max-w-7xl mx-auto px-6 sm:px-12 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <p className="text-[var(--color-grey-300)] text-sm sm:text-base">
            Not sure which light and mount fit your motorcycle?
          </p>
          <Link
            href="/fit/"
            className="inline-flex items-center gap-1.5 text-[var(--color-white)] underline underline-offset-4 decoration-white/40 hover:decoration-[var(--color-beam)] hover:text-[var(--color-beam)] transition-colors font-medium text-sm sm:text-base"
          >
            <span>Launch Bike Finder</span>
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </>
  );
}
