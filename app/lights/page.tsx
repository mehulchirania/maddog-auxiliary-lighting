import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import RangeCatalogue from "@/components/range/RangeCatalogue";
import { products } from "@/lib/products";

export const metadata: Metadata = {
  title: "The Range — Maddog Auxiliary Lighting & Systems",
  description:
    "Explore the complete Maddog motorcycle ecosystem: auxiliary lighting ladder, Claw smartphone mounts, CNC billet clamps, and solid-state harnesses.",
};

export default function LightsPage() {
  return (
    <>
      {/* Page head — mono eyebrow, two-line title, lede. Night-road beam photo
          holds the right third at full opacity behind a left-weighted scrim. */}
      <section className="relative flex items-end w-full min-h-[46svh] pt-32 pb-14 bg-[var(--color-night-950)] overflow-hidden border-b border-[var(--glass-stroke)]">
        <div className="absolute inset-0 z-0">
          <Image
            src="/media/products/MDL/original/product_1752410035_6210319.webp"
            alt="Lycan 250-metre measured spot beam on a night road, distance-board annotation overlay"
            fill
            sizes="100vw"
            priority
            className="object-cover object-[center_76%]"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(90deg, rgba(10,10,11,0.94) 0%, rgba(10,10,11,0.72) 48%, rgba(10,10,11,0.35) 100%)",
            }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-12 w-full">
          <div className="flex items-center gap-4 readout uppercase tracking-[0.28em] text-[0.6875rem]">
            <span className="h-px w-7 bg-[var(--glass-stroke)]" aria-hidden="true" />
            <span>The catalogue · {products.length} products · one price all year</span>
          </div>

          <h1
            className="mt-6 text-[var(--color-white)] uppercase leading-[0.92]"
            style={{
              fontSize: "var(--text-page-title)",
              fontWeight: "var(--fw-page-title)",
              letterSpacing: "var(--ls-page-title)",
            }}
          >
            Every part,
            <br />
            <span
              style={{
                background:
                  "linear-gradient(180deg, var(--color-beam-bright) 0%, var(--color-beam) 45%, color-mix(in srgb, var(--color-beam) 30%, transparent) 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              one place.
            </span>
          </h1>

          <p
            className="mt-7 max-w-[52ch] text-[var(--color-grey-300)] leading-relaxed"
            style={{ fontSize: "var(--text-body)" }}
          >
            Lights, mounts, harnesses, filters and clamps — all IP-67 sealed where it matters, all
            warrantied the same 18 months. Hover any card for the numbers.
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
