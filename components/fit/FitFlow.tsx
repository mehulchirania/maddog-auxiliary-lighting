"use client";

import { useEffect, useRef, useState } from "react";
import { bikesForBrand, getBike } from "@/lib/fitment";
import { cn } from "@/lib/cn";
import BrandGrid from "./BrandGrid";
import ModelGrid from "./ModelGrid";
import SetupResult from "./SetupResult";
import { FIT_BRAND_HINT_KEY } from "./FitStrip";

type Step = 1 | 2 | 3;

const stepLabel: Record<Step, string> = {
  1: "Manufacturer Brand",
  2: "Motorcycle Model",
  3: "System Setup",
};

const FOCUS_RING =
  "outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-signal-500)]";

export default function FitFlow() {
  const [step, setStep] = useState<Step>(1);
  const [brand, setBrand] = useState<string | null>(null);
  const [bikeId, setBikeId] = useState<string | null>(null);
  const [announceReady, setAnnounceReady] = useState(false);

  const brandHeadingRef = useRef<HTMLHeadingElement>(null);
  const modelHeadingRef = useRef<HTMLHeadingElement>(null);
  const resultHeadingRef = useRef<HTMLHeadingElement>(null);
  const isFirstRender = useRef(true);

  useEffect(() => {
    try {
      const hint = window.sessionStorage.getItem(FIT_BRAND_HINT_KEY);
      if (hint && bikesForBrand(hint).length > 0) {
        window.sessionStorage.removeItem(FIT_BRAND_HINT_KEY);
        setBrand(hint);
        setStep(2);
      }
    } catch {
      // sessionStorage unavailable
    }
    setAnnounceReady(true);
  }, []);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    const target =
      step === 1 ? brandHeadingRef.current : step === 2 ? modelHeadingRef.current : resultHeadingRef.current;
    target?.focus();
  }, [step]);

  const bike = bikeId ? getBike(bikeId) : undefined;

  function selectBrand(next: string) {
    setBrand(next);
    setBikeId(null);
    setStep(2);
  }

  function selectBike(id: string) {
    setBikeId(id);
    setStep(3);
  }

  function startOver() {
    setBrand(null);
    setBikeId(null);
    setStep(1);
  }

  return (
    <div>
      <div aria-live="polite" className="sr-only">
        {announceReady ? `Step ${step} of 3. ${stepLabel[step]}.` : ""}
      </div>

      {/* Progress Bar & Stepper */}
      <div className="mb-10 sm:mb-12 border-b hairline pb-6">
        <ol className="flex flex-wrap items-center gap-3 sm:gap-6" aria-label="Fit flow progress">
          {([1, 2, 3] as Step[]).map((n) => {
            const reached = n === 1 || (n === 2 && !!brand) || (n === 3 && !!bike);
            const isCurrent = n === step;
            return (
              <li key={n} className="flex items-center gap-3">
                <button
                  type="button"
                  disabled={!reached}
                  onClick={() => reached && setStep(n)}
                  aria-current={isCurrent ? "step" : undefined}
                  className={cn(
                    "flex items-center gap-2.5 rounded-full px-3.5 py-1.5 font-medium transition-all",
                    FOCUS_RING,
                    isCurrent
                      ? "bg-ink-800 text-bone border border-signal-500 shadow-sm"
                      : reached
                        ? "bg-ink-900/60 text-fog-200 hover:text-bone border hairline"
                        : "text-fog-600 border border-transparent",
                    !reached && "cursor-default opacity-50",
                  )}
                  style={{ fontSize: "var(--text-caption)" }}
                >
                  <span
                    className={cn(
                      "tnum flex h-5 w-5 items-center justify-center rounded-full text-[11px] font-semibold",
                      isCurrent
                        ? "bg-signal-600 text-bone"
                        : reached
                          ? "bg-ink-700 text-bone"
                          : "bg-ink-900 text-fog-600",
                    )}
                  >
                    {n}
                  </span>
                  <span>{stepLabel[n]}</span>
                </button>
                {n < 3 && <span className="text-fog-600 text-xs hidden sm:inline">→</span>}
              </li>
            );
          })}
        </ol>
      </div>

      <div className="space-y-8 sm:space-y-12">
        {step === 1 ? (
          <section aria-labelledby="brand-heading" className="grid gap-8 lg:grid-cols-[1fr_300px]">
            <div>
              <h2
                id="brand-heading"
                ref={brandHeadingRef}
                tabIndex={-1}
                className="font-display text-bone outline-none"
                style={{
                  fontSize: "var(--text-h2)",
                  fontWeight: "var(--fw-h2)",
                }}
              >
                Step 1: Choose Your Motorcycle Manufacturer
              </h2>
              <p className="text-fog-400 mt-2" style={{ fontSize: "var(--text-body)" }}>
                Select your bike brand to see available mapped configurations.
              </p>
              <div className="mt-6">
                <BrandGrid value={brand} onSelect={selectBrand} />
              </div>
            </div>

            <aside className="hairline border bg-ink-900 h-fit rounded-xl p-5 shadow-sm">
              <p className="eyebrow text-signal-500">Maddog System Standard</p>
              <ul className="text-fog-300 mt-4 space-y-4 leading-relaxed" style={{ fontSize: "var(--text-caption)" }}>
                <li className="flex flex-col gap-1 border-b hairline pb-3">
                  <span className="text-bone font-medium">1. Matched Beam</span>
                  <span>Optics & lumens matched for electrical headroom and chassis speed.</span>
                </li>
                <li className="flex flex-col gap-1 border-b hairline pb-3">
                  <span className="text-bone font-medium">2. Plug & Play Control</span>
                  <span>Dedicated waterproof wire harness and handlebar switch.</span>
                </li>
                <li className="flex flex-col gap-1">
                  <span className="text-bone font-medium">3. Precision Mount</span>
                  <span>Vibration-isolated clamps machined for your bike&apos;s crash guards or fork.</span>
                </li>
              </ul>
            </aside>
          </section>
        ) : (
          brand && <SummaryRow label="Selected Brand" value={brand} onChange={() => setStep(1)} />
        )}

        {step === 2 && brand ? (
          <section aria-labelledby="model-heading">
            <h2
              id="model-heading"
              ref={modelHeadingRef}
              tabIndex={-1}
              className="font-display text-bone outline-none"
              style={{
                fontSize: "var(--text-h2)",
                fontWeight: "var(--fw-h2)",
              }}
            >
              Step 2: Which {brand} Model?
            </h2>
            <p className="text-fog-400 mt-2" style={{ fontSize: "var(--text-body)" }}>
              <span className="tnum font-medium text-bone">{bikesForBrand(brand).length}</span> model
              {bikesForBrand(brand).length === 1 ? "" : "s"} mapped to a certified auxiliary setup.
            </p>
            <div className="mt-6">
              <ModelGrid brand={brand} value={bikeId} onSelect={selectBike} />
            </div>
          </section>
        ) : (
          step === 3 &&
          bike && (
            <SummaryRow
              label="Selected Motorcycle"
              value={`${bike.brand} ${bike.model} (${bike.kind.toUpperCase()})`}
              onChange={() => setStep(2)}
            />
          )
        )}

        {step === 3 && bike && (
          <SetupResult
            bike={bike}
            headingRef={resultHeadingRef}
            onChangeModel={() => setStep(2)}
            onStartOver={startOver}
          />
        )}
      </div>
    </div>
  );
}

function SummaryRow({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: () => void;
}) {
  return (
    <div className="hairline border bg-ink-900 flex items-center justify-between gap-4 rounded-xl px-5 py-3.5 shadow-sm">
      <p className="min-w-0 truncate" style={{ fontSize: "var(--text-body)" }}>
        <span className="text-fog-500 font-mono text-[11px] uppercase tracking-wider">{label}: </span>
        <span className="text-bone font-medium ml-1">{value}</span>
      </p>
      <button
        type="button"
        onClick={onChange}
        className={`text-signal-400 font-medium shrink-0 underline underline-offset-4 hover:text-signal-300 transition-colors ${FOCUS_RING}`}
        style={{ fontSize: "var(--text-caption)" }}
      >
        Change
      </button>
    </div>
  );
}

