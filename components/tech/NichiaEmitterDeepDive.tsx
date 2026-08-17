"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";
import CountUp from "@/components/animations/CountUp";
import DecryptedText from "@/components/animations/DecryptedText";
import SpotlightCard from "@/components/animations/SpotlightCard";

export default function NichiaEmitterDeepDive() {
  const [activeTab, setActiveTab] = useState<"longevity" | "thermal" | "binning">("longevity");

  return (
    <div className="border hairline bg-ink-900/70 rounded-2xl p-6 sm:p-8 shadow-xl">
      {/* Top Selector Strip */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b hairline pb-6">
        <div>
          <span className="eyebrow text-signal-500">Solid-State Physics</span>
          <h3 className="font-display text-bone text-xl sm:text-2xl mt-1">
            Nichia Japanese Emitter Architecture
          </h3>
        </div>

        <div className="flex flex-wrap gap-2 p-1 bg-ink-950/80 rounded-xl border hairline">
          <button
            type="button"
            onClick={() => setActiveTab("longevity")}
            className={cn(
              "px-3.5 py-1.5 rounded-lg text-xs font-mono font-medium transition-all",
              activeTab === "longevity"
                ? "bg-signal-600 text-bone shadow-sm"
                : "text-fog-400 hover:text-bone",
            )}
          >
            L70 Longevity Curve
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("thermal")}
            className={cn(
              "px-3.5 py-1.5 rounded-lg text-xs font-mono font-medium transition-all",
              activeTab === "thermal"
                ? "bg-signal-600 text-bone shadow-sm"
                : "text-fog-400 hover:text-bone",
            )}
          >
            Direct-Bond Copper
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("binning")}
            className={cn(
              "px-3.5 py-1.5 rounded-lg text-xs font-mono font-medium transition-all",
              activeTab === "binning"
                ? "bg-signal-600 text-bone shadow-sm"
                : "text-fog-400 hover:text-bone",
            )}
          >
            Chromaticity Binning
          </button>
        </div>
      </div>

      {/* Interactive Telemetry Canvas */}
      <div className="mt-6">
        {activeTab === "longevity" && (
          <div className="grid gap-6 lg:grid-cols-12 items-center">
            <div className="lg:col-span-7 space-y-4">
              <p className="text-fog-300 leading-relaxed text-sm sm:text-base">
                Cheap auxiliary lights push counterfeit or unbinned diodes past their thermal thresholds, causing phosphor degradation and irreversible lumen drop within 500 hours. Maddog integrates genuine <strong className="text-bone">Nichia Japanese high-density surface-mount emitters</strong> tested to rigorous IESNA LM-80 telemetry standards.
              </p>

              <div className="grid grid-cols-3 gap-3 pt-2">
                <SpotlightCard spotlightColor="rgba(237, 29, 36, 0.12)" className="border hairline bg-ink-950/60 rounded-xl p-3.5">
                  <span className="text-fog-500 font-mono text-[10px] uppercase block">At 10,000 Hours</span>
                  <span className="tnum text-signal-400 font-mono text-lg font-semibold">
                    <CountUp to={96.4} decimals={1} suffix="%" />
                  </span>
                  <span className="text-fog-400 text-xs block mt-0.5">Lumen retention</span>
                </SpotlightCard>
                <SpotlightCard spotlightColor="rgba(237, 29, 36, 0.12)" className="border hairline bg-ink-950/60 rounded-xl p-3.5">
                  <span className="text-fog-500 font-mono text-[10px] uppercase block">At 30,000 Hours</span>
                  <span className="tnum text-signal-400 font-mono text-lg font-semibold">
                    <CountUp to={89.2} decimals={1} suffix="%" />
                  </span>
                  <span className="text-fog-400 text-xs block mt-0.5">Lumen retention</span>
                </SpotlightCard>
                <SpotlightCard spotlightColor="rgba(255, 255, 255, 0.08)" className="border hairline bg-ink-950/60 rounded-xl p-3.5">
                  <span className="text-fog-500 font-mono text-[10px] uppercase block">At 50,000 Hours</span>
                  <span className="tnum text-bone font-mono text-lg font-semibold">
                    <CountUp to={82.1} decimals={1} suffix="%" />
                  </span>
                  <span className="text-fog-400 text-xs block mt-0.5">L70 threshold</span>
                </SpotlightCard>
              </div>
            </div>

            <div className="lg:col-span-5 border hairline bg-ink-950 rounded-xl p-5">
              <div className="flex items-center justify-between text-xs font-mono mb-4 text-fog-400 border-b hairline pb-2">
                <span>Output Flux vs Burn Hours</span>
                <span className="text-signal-400">LM-80 Certified</span>
              </div>
              <div className="space-y-3 font-mono text-xs">
                <div>
                  <div className="flex justify-between text-[11px] mb-1">
                    <span className="text-signal-400">Maddog Nichia (50,000h Rating)</span>
                    <span className="text-bone font-semibold">82% at 50k hrs</span>
                  </div>
                  <div className="h-2.5 rounded-full bg-ink-800 overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-signal-500 to-signal-400 rounded-full" style={{ width: "82%" }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-[11px] mb-1">
                    <span className="text-fog-400">Standard Automotive LED (15,000h)</span>
                    <span className="text-fog-400">70% at 15k hrs</span>
                  </div>
                  <div className="h-2.5 rounded-full bg-ink-800 overflow-hidden">
                    <div className="h-full bg-fog-600 rounded-full" style={{ width: "48%" }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-[11px] mb-1">
                    <span className="text-fog-500">Unbranded Grey-Market Imports</span>
                    <span className="text-fog-500">Burnout &lt; 2,000 hrs</span>
                  </div>
                  <div className="h-2.5 rounded-full bg-ink-800 overflow-hidden">
                    <div className="h-full bg-ink-600 rounded-full" style={{ width: "12%" }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "thermal" && (
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="border hairline bg-ink-950/70 rounded-xl p-5">
              <div className="text-signal-500 font-mono text-xs uppercase mb-2">01 · Substrate</div>
              <h4 className="font-display text-bone text-base mb-2">Direct-Bond Copper PCB</h4>
              <p className="text-fog-400 text-xs leading-relaxed">
                Eliminates dielectric insulating barriers. Thermal conductivity exceeds 385 W/m·K, routing junction heat instantly from the diode core directly into the rear casing.
              </p>
            </div>
            <div className="border hairline bg-ink-950/70 rounded-xl p-5">
              <div className="text-signal-500 font-mono text-xs uppercase mb-2">02 · Junction Temp</div>
              <h4 className="font-display text-bone text-base mb-2">Tj &lt; 85°C Regulated</h4>
              <p className="text-fog-400 text-xs leading-relaxed">
                Operates far below the 150°C maximum junction limit of Nichia diodes, preventing thermal throttle even during stationary idle on hot summer tarmac.
              </p>
            </div>
            <div className="border hairline bg-ink-950/70 rounded-xl p-5">
              <div className="text-signal-500 font-mono text-xs uppercase mb-2">03 · Surge Shield</div>
              <h4 className="font-display text-bone text-base mb-2">Dual Solid-State Regulators</h4>
              <p className="text-fog-400 text-xs leading-relaxed">
                Internal constant-current buck drivers handle 9V–16V alternator spikes and inductive stator back-EMF without diode flicker or stress.
              </p>
            </div>
          </div>
        )}

        {activeTab === "binning" && (
          <div className="grid gap-6 lg:grid-cols-2 items-center">
            <div className="space-y-3">
              <h4 className="font-display text-bone text-lg">
                Tight MacAdam 3-Step Ellipse Consistency
              </h4>
              <p className="text-fog-300 text-sm leading-relaxed">
                Human eyes notice even slight chromatic shifts between left and right pods. Maddog procures only single-bin Nichia emitters to guarantee that both left and right beams emit identical 5000K–5700K Daylight White color coordinates without yellow-green or bluish cast.
              </p>
              <div className="flex flex-wrap gap-4 font-mono text-xs pt-2">
                <span className="text-signal-400 bg-signal-500/10 border border-signal-500/30 px-3 py-1.5 rounded-md">
                  CRI Rating: &gt; 80 Ra
                </span>
                <span className="text-bone bg-ink-950 border hairline px-3 py-1.5 rounded-md">
                  Correlated Color Temp: 5000K ± 150K
                </span>
              </div>
            </div>

            <div className="border hairline bg-ink-950 rounded-xl p-5 space-y-4">
              <div className="flex items-center justify-between text-xs font-mono text-fog-400 border-b hairline pb-2">
                <span>Visual Road Definition</span>
                <span className="text-signal-400">High Contrast CRI</span>
              </div>
              <p className="text-xs text-fog-300 leading-relaxed">
                High Color Rendering Index (CRI &gt; 80) ensures potholes, gravel patches, livestock, and road debris are immediately distinguishable against black asphalt at speed.
              </p>
              <div className="grid grid-cols-2 gap-3 text-center font-mono text-xs pt-2">
                <div className="border hairline bg-ink-900/60 p-2.5 rounded-lg">
                  <span className="text-signal-400 text-base font-bold block">5000K</span>
                  <span className="text-fog-500 text-[10px]">Optimal Tarmac Tint</span>
                </div>
                <div className="border hairline bg-ink-900/60 p-2.5 rounded-lg">
                  <span className="text-bone text-base font-bold block">18 Months</span>
                  <span className="text-fog-500 text-[10px]">Direct Replacement</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
