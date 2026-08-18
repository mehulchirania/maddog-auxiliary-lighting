import type { Metadata } from "next";
import Image from "next/image";
import { fieldMedia } from "@/lib/fieldMedia";
import CreatorWall from "@/components/proof/CreatorWall";
import Testimonials from "@/components/proof/Testimonials";
import Lightbox from "@/components/ui/Lightbox";

export const metadata: Metadata = {
  title: "Proof & Reviews — Maddog Auxiliary Lighting",
  description:
    "82+ verified reviews and 18 independent motovlogging teardowns across India with an 18-month replacement warranty.",
};

export default function ProofPage() {
  return (
    <article className="bg-[var(--color-night-950)] text-[var(--color-white)] min-h-screen">
      {/* 40svh Dark Hero with Real Mounted-Rage Photo */}
      <section className="relative h-[40svh] min-h-[300px] w-full flex items-center overflow-hidden border-b border-[var(--glass-stroke)]">
        <div className="absolute inset-0 z-0">
          <Image
            src="/media/products/MDR/original/product_1752410420_2104310.webp"
            alt="Maddog Rage mounted field test"
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
            Independent proof.
          </h1>
          <p
            className="mt-3 text-[var(--color-grey-300)] max-w-2xl leading-relaxed"
            style={{ fontSize: "var(--text-body)" }}
          >
            82+ verified reviews and 18 independent teardowns on YouTube — every product under an 18-month replacement warranty.
          </p>
        </div>
      </section>

      {/* Field Conditions: Real Measurement & Mounting Photography Grid */}
      <section className="max-w-7xl mx-auto px-6 sm:px-12 py-16 sm:py-24">
        <div className="mb-8">
          <span className="readout text-xs text-[var(--color-beam)]">Field Documentation</span>
          <h2
            className="font-[520] text-[var(--color-white)] tracking-tight mt-1"
            style={{ fontSize: "var(--text-statement)", letterSpacing: "var(--ls-statement)" }}
          >
            Field conditions &amp; measured throw.
          </h2>
          <p className="text-[var(--color-grey-300)] text-sm max-w-xl mt-2">
            Unfiltered night road beam measurements and real motorcycle mounting setups. Click any frame to inspect full resolution.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {fieldMedia.map((item) => (
            <div key={item.src} className="flex flex-col gap-3">
              <Lightbox src={item.src} alt={item.caption}>
                <div className="relative aspect-[16/11] w-full rounded-[var(--radius-card)] overflow-hidden bg-[var(--color-night-900)] border border-[var(--glass-stroke)] shadow-xl">
                  <Image
                    src={item.src}
                    alt={item.caption}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
              </Lightbox>
              <div className="flex items-baseline justify-between gap-2 px-1">
                <p className="text-sm font-medium text-white">
                  {item.caption}
                </p>
                <span className="readout text-xs uppercase shrink-0">
                  {item.sku}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Creator Wall */}
      <section className="py-24 sm:py-32 bg-[var(--color-night-900)] border-y border-[var(--glass-stroke)]">
        <div className="max-w-7xl mx-auto px-6 sm:px-12">
          <h2
            className="font-[520] text-[var(--color-white)] tracking-tight mb-4"
            style={{ fontSize: "var(--text-statement)", letterSpacing: "var(--ls-statement)" }}
          >
            Eighteen independent motovloggers.
          </h2>
          <p className="text-[var(--color-grey-300)] max-w-xl mb-12" style={{ fontSize: "var(--text-body)" }}>
            Real-world road testing across thousands of touring kilometres throughout India.
          </p>
          <CreatorWall />
        </div>
      </section>

      {/* Testimonials */}
      <section className="max-w-7xl mx-auto px-6 sm:px-12 py-24 sm:py-32">
        <h2
          className="font-[520] text-[var(--color-white)] tracking-tight mb-12"
          style={{ fontSize: "var(--text-statement)", letterSpacing: "var(--ls-statement)" }}
        >
          Verified rider feedback.
        </h2>
        <Testimonials />
      </section>
    </article>
  );
}
