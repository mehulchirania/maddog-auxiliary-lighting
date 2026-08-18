"use client";

import Image from "next/image";
import Link from "next/link";
import CountUp from "@/components/animations/CountUp";

export default function ProofBand() {
  return (
    <section className="py-24 sm:py-32 bg-[var(--color-night-950)] border-t border-[var(--glass-stroke)]">
      <div className="max-w-7xl mx-auto px-6 sm:px-12">
        {/* Part A: Ultraviolette Partnership */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left: UV photo inside --radius-card frame */}
          <div className="relative aspect-[16/10] w-full rounded-[var(--radius-card)] overflow-hidden bg-[var(--color-night-900)] border border-white/5">
            <Image
              src="/media/images/maddog-uv-accessories-banner-02.webp"
              alt="Maddog and Ultraviolette F77 Mach 2 partnership"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>

          {/* Right: Statement + Body */}
          <div className="flex flex-col justify-center">
            <h2
              className="text-[var(--color-white)] font-[520] tracking-tight leading-[1.15]"
              style={{ fontSize: "var(--text-statement)", letterSpacing: "var(--ls-statement)" }}
            >
              Chosen by Ultraviolette for the F77 Mach 2.
            </h2>
            <p
              className="mt-5 text-[var(--color-grey-300)] leading-relaxed max-w-lg"
              style={{ fontSize: "var(--text-body)" }}
            >
              When India&apos;s fastest electric motorcycle needed auxiliary lighting, Ultraviolette co-engineered it with Maddog — factory-fit optics, not an aftermarket compromise.
            </p>
          </div>
        </div>

        {/* Part B: Rider Strip (4 real-rider photos, unequal widths) */}
        <div className="mt-16 sm:mt-20">
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
            {/* Image 1: Wide — Mounted Triumph setup */}
            <div className="sm:col-span-5 relative h-64 sm:h-72 rounded-[var(--radius-card)] overflow-hidden bg-[var(--color-night-900)] border border-white/5">
              <Image
                src="/media/products/MDR/original/product_1752410420_2104310.webp"
                alt="Maddog Rage mounted on motorcycle fork"
                fill
                sizes="(max-width: 640px) 100vw, 42vw"
                className="object-cover"
              />
            </div>

            {/* Image 2: Narrow — Rage 400m night test */}
            <div className="sm:col-span-2 relative h-64 sm:h-72 rounded-[var(--radius-card)] overflow-hidden bg-[var(--color-night-900)] border border-white/5">
              <Image
                src="/media/products/MDR/original/product_1752410419_3352346.webp"
                alt="Rage measured spot beam test"
                fill
                sizes="(max-width: 640px) 100vw, 17vw"
                className="object-cover"
              />
            </div>

            {/* Image 3: Narrow — Lycan 250m night test */}
            <div className="sm:col-span-2 relative h-64 sm:h-72 rounded-[var(--radius-card)] overflow-hidden bg-[var(--color-night-900)] border border-white/5">
              <Image
                src="/media/products/MDL/original/product_1752410035_6210319.webp"
                alt="Lycan dual beam road test"
                fill
                sizes="(max-width: 640px) 100vw, 17vw"
                className="object-cover"
              />
            </div>

            {/* Image 4: Medium — Scout fork mounted */}
            <div className="sm:col-span-3 relative h-64 sm:h-72 rounded-[var(--radius-card)] overflow-hidden bg-[var(--color-night-900)] border border-white/5">
              <Image
                src="/media/products/SC1/original/product_1752413246_6644867.webp"
                alt="Scout auxiliary light mounted"
                fill
                sizes="(max-width: 640px) 100vw, 25vw"
                className="object-cover"
              />
            </div>
          </div>

          {/* Proof Sentence + Reviews Link */}
          <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
            <p className="text-[var(--color-grey-300)] text-sm sm:text-base max-w-2xl leading-relaxed">
              <span className="text-[var(--color-white)] font-medium">
                <CountUp to={82} duration={1.5} suffix="+" /> verified reviews
              </span>{" "}
              and 18 independent teardowns on YouTube — every product under an 18-month replacement warranty.
            </p>

            <Link
              href="/proof/"
              className="inline-flex items-center gap-1.5 text-[var(--color-white)] underline underline-offset-4 decoration-white/40 hover:decoration-[var(--color-beam)] hover:text-[var(--color-beam)] text-sm sm:text-base font-normal transition-colors"
            >
              <span>Read the reviews</span>
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
