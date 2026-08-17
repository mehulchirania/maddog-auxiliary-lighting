"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { brands } from "@/lib/fitment";
import { cn } from "@/lib/cn";

export const FIT_BRAND_HINT_KEY = "maddog:fit:brand";

const FOCUS_RING =
  "outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-signal-500)]";

export function FitStrip({ className }: { className?: string }) {
  const router = useRouter();
  const [brand, setBrand] = useState("");

  function go() {
    try {
      if (brand) window.sessionStorage.setItem(FIT_BRAND_HINT_KEY, brand);
      else window.sessionStorage.removeItem(FIT_BRAND_HINT_KEY);
    } catch {
      // sessionStorage unavailable
    }
    router.push("/fit/");
  }

  return (
    <div
      className={cn(
        "hairline border bg-ink-850 flex flex-col gap-3 rounded-xl p-4 sm:flex-row sm:items-center sm:gap-4 sm:p-5 shadow-sm",
        className,
      )}
    >
      <div className="shrink-0">
        <p className="font-display text-bone font-medium" style={{ fontSize: "var(--text-body)" }}>
          What do you ride?
        </p>
        <p className="text-fog-400" style={{ fontSize: "var(--text-micro)" }}>
          Pick a brand for mapped fitment
        </p>
      </div>

      <label className="sr-only" htmlFor="fit-strip-brand">
        Motorcycle brand
      </label>
      <select
        id="fit-strip-brand"
        value={brand}
        onChange={(e) => setBrand(e.target.value)}
        className={cn(
          "border-ink-600 bg-ink-900 text-bone hover:border-ink-400 min-w-0 flex-1 rounded-md border px-3.5 py-2.5 font-medium transition-colors cursor-pointer",
          FOCUS_RING,
        )}
        style={{ fontSize: "var(--text-caption)" }}
      >
        <option value="">Choose a manufacturer (e.g. Royal Enfield, KTM)</option>
        {brands.map((b) => (
          <option key={b} value={b}>
            {b}
          </option>
        ))}
      </select>

      <button
        type="button"
        onClick={go}
        className={cn(
          "inline-flex shrink-0 items-center justify-center gap-2 rounded-md border bg-signal-600 hover:bg-signal-700 border-signal-600 px-5 py-2.5 font-medium tracking-wide text-bone transition-all shadow-sm hover:shadow",
          FOCUS_RING,
        )}
        style={{ fontSize: "var(--text-caption)" }}
      >
        <span>Configure Setup</span>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
}

export default FitStrip;

