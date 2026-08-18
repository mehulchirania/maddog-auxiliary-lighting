"use client";

import { useState, useEffect, Suspense } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { brands } from "@/lib/fitment";
import SpecularButton from "@/components/ui/SpecularButton";

function FitForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedBrand, setSelectedBrand] = useState<string>(brands[0]);

  useEffect(() => {
    const brandParam = searchParams.get("brand");
    if (brandParam && brands.includes(brandParam as (typeof brands)[number])) {
      setSelectedBrand(brandParam);
    }
  }, [searchParams]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/fit/?brand=${encodeURIComponent(selectedBrand)}`);
  };

  return (
    <form onSubmit={handleSubmit} className="mt-8 flex flex-col sm:flex-row gap-3 items-center justify-center">
      <select
        value={selectedBrand}
        onChange={(e) => setSelectedBrand(e.target.value)}
        className="glass h-12 px-4 rounded-full text-[var(--color-white)] bg-[rgba(23,23,26,0.7)] border border-[var(--glass-stroke)] flex-1 text-base focus:outline-none focus:border-[var(--color-beam)] cursor-pointer w-full sm:w-auto"
        aria-label="Select motorcycle brand"
      >
        {brands.map((b) => (
          <option key={b} value={b} className="bg-[var(--color-night-900)] text-white">
            {b}
          </option>
        ))}
      </select>

      <SpecularButton
        type="submit"
        size="md"
        tint="#ffffff"
        tintOpacity={1}
        textColor="#0a0a0b"
        lineColor="#ffffff"
        baseColor="#a3a3a3"
        intensity={1.2}
        className="w-full sm:w-auto shrink-0"
      >
        <span>Find your fit</span>
        <span aria-hidden="true">→</span>
      </SpecularButton>
    </form>
  );
}

export default function FitCta() {
  return (
    <section id="fit" className="relative py-28 sm:py-36 bg-[var(--color-night-950)] overflow-hidden">
      {/* Full-Bleed Background Photo — Clean lineup backdrop */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/media/derived/hero-lineup-wide.webp"
          alt="Maddog precision engineered lighting"
          fill
          sizes="100vw"
          className="object-cover object-center opacity-30"
        />
        {/* Scrim */}
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(rgba(10, 10, 11, 0.75), rgba(10, 10, 11, 0.92))",
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-12 flex flex-col items-center">
        {/* Centered Glass Card */}
        <div className="glass max-w-[560px] w-full p-8 sm:p-12 text-center shadow-2xl">
          <h2
            className="text-[var(--color-white)] font-[520] tracking-tight"
            style={{ fontSize: "var(--text-statement)", letterSpacing: "var(--ls-statement)" }}
          >
            Built for what you ride.
          </h2>

          <Suspense fallback={<div className="h-12 mt-8 flex items-center justify-center text-sm text-[var(--color-grey-500)]">Loading finder...</div>}>
            <FitForm />
          </Suspense>
        </div>

        {/* Pricing line below the card */}
        <p className="readout mt-8 text-center text-sm text-[var(--color-grey-500)]">
          One price, all year. Never discounted, never inflated.
        </p>
      </div>
    </section>
  );
}
