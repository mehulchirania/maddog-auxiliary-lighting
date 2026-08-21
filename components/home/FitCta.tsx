"use client";

import { useState, useEffect, Suspense } from "react";
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
        <span>Show my fits</span>
        <span aria-hidden="true">→</span>
      </SpecularButton>
    </form>
  );
}

export default function FitCta() {
  return (
    <section id="fit" className="py-24 sm:py-32 border-t border-[var(--glass-stroke)] text-center">
      <div className="max-w-7xl mx-auto px-6 sm:px-12">
        <h2
          className="text-[var(--color-white)] font-[560] tracking-tight"
          style={{ fontSize: "var(--text-statement)", letterSpacing: "var(--ls-statement)" }}
        >
          Built for what you ride.
        </h2>

        <div className="flex justify-center">
          <Suspense fallback={<div className="h-12 mt-8 flex items-center justify-center text-sm text-[var(--color-grey-500)]">Loading finder...</div>}>
            <FitForm />
          </Suspense>
        </div>

        <p className="readout mt-7 text-center">
          One price, all year. Never discounted, never inflated.
        </p>
      </div>
    </section>
  );
}
