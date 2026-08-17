"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";
import SpotlightCard from "@/components/animations/SpotlightCard";
import DecryptedText from "@/components/animations/DecryptedText";

export default function EnvironmentalArmor() {
  const [selectedLayer, setSelectedLayer] = useState<number>(0);

  const layers = [
    {
      title: "Hard-Coated Bayer Polycarbonate Lens",
      metric: "UV400 & Impact Certified",
      summary:
        "High-transmission optical-grade polycarbonate outer shield with dual-sided silica hard-coating. Resists rock chips, grit abrasion, and UV yellowing from prolonged tropical sun exposure.",
      specs: [
        { label: "Impact Standard", value: "IK08 Shatterproof" },
        { label: "Light Transmittance", value: "> 94.8%" },
        { label: "Hardness Coating", value: "4H Scratch Resistance" },
      ],
    },
    {
      title: "Hermetic Fluorosilicone Compression O-Ring",
      metric: "IP-67 Submersion Sealed",
      summary:
        "Continuous custom-moulded fluorosilicone perimeter gasket seated inside precision CNC grooves. Maintains sealing elasticity between -40°C and +120°C, blocking high-pressure water jets and continuous submersion.",
      specs: [
        { label: "Submersion Depth", value: "1.0 metre / 30 mins" },
        { label: "Dust Protection", value: "IP6X Dust-tight vacuum seal" },
        { label: "Chemical Resistance", value: "Fuel, road salt & degreasers" },
      ],
    },
    {
      title: "A380 Die-Cast Aluminium Alloy Exoskeleton",
      metric: "Aero-Venturi Cooling",
      summary:
        "High-density structural aluminium housing with deep convective cooling fins. Acts as a high-surface-area heat exchanger that sheds thermal loads dynamically using the motorcycle's oncoming airflow.",
      specs: [
        { label: "Alloy Grade", value: "A380 Pressure Die-Cast" },
        { label: "Finish", value: "Hard-Anodized Satin Black" },
        { label: "Mounting Bracket", value: "304 Stainless Steel Hardware" },
      ],
    },
  ];

  return (
    <div className="border hairline bg-ink-900/70 rounded-2xl p-6 sm:p-8 shadow-xl">
      <div className="border-b hairline pb-6">
        <span className="eyebrow text-signal-500">Environmental Architecture</span>
        <h3 className="font-display text-bone text-xl sm:text-2xl mt-1">
          IP-67 Submersion &amp; Thermal Armor Systems
        </h3>
        <p className="text-fog-300 text-sm mt-2 max-w-2xl leading-relaxed">
          Maddog auxiliary lights are engineered for Indian monsoon conditions, river crossings, dusty trails, and high-ambient heat. Every component forms a layered barrier.
        </p>
      </div>

      {/* Layer Tabs */}
      <div className="grid sm:grid-cols-3 gap-3 mt-6">
        {layers.map((l, i) => {
          const isSelected = selectedLayer === i;
          return (
            <button
              key={l.title}
              type="button"
              onClick={() => setSelectedLayer(i)}
              className={cn(
                "p-4 rounded-xl border text-left transition-all duration-200",
                isSelected
                  ? "bg-ink-950 border-signal-500/80 shadow-md ring-1 ring-signal-500/50"
                  : "bg-ink-950/40 border-ink-800 hover:border-ink-700 hover:bg-ink-950/70",
              )}
            >
              <span className="font-mono text-[10px] uppercase text-signal-500 block mb-1">
                Armor Layer 0{i + 1}
              </span>
              <p className="font-display text-bone text-sm font-medium line-clamp-1">
                {l.title.split(" ")[0]} {l.title.split(" ")[1]}
              </p>
              <span className="font-mono text-fog-400 text-xs block mt-1">
                {l.metric}
              </span>
            </button>
          );
        })}
      </div>

      {/* Selected Layer Deep-Dive Display */}
      <SpotlightCard
        spotlightColor="rgba(237, 29, 36, 0.12)"
        className="mt-6 border hairline bg-ink-950 rounded-xl p-5 sm:p-6"
      >
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b hairline pb-4">
          <div>
            <span className="font-mono text-[11px] uppercase text-signal-400 tracking-wider">
              Layer 0{selectedLayer + 1} Telemetry
            </span>
            <h4 className="font-display text-bone text-lg sm:text-xl mt-0.5">
              {layers[selectedLayer].title}
            </h4>
          </div>
          <span className="px-3 py-1 rounded-full bg-signal-500/10 border border-signal-500/30 text-signal-400 font-mono text-xs self-start lg:self-auto">
            <DecryptedText text={layers[selectedLayer].metric} speed={25} />
          </span>
        </div>

        <p className="text-fog-300 text-sm leading-relaxed mt-4">
          {layers[selectedLayer].summary}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-5 pt-4 border-t hairline">
          {layers[selectedLayer].specs.map((s) => (
            <div key={s.label} className="border hairline bg-ink-900/60 p-3.5 rounded-lg">
              <span className="text-fog-500 font-mono text-[10px] uppercase block">
                {s.label}
              </span>
              <span className="text-bone font-mono text-sm font-semibold block mt-1">
                {s.value}
              </span>
            </div>
          ))}
        </div>
      </SpotlightCard>
    </div>
  );
}
