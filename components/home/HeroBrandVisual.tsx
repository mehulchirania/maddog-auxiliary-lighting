"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/cn";

import MagneticButton from "@/components/animations/MagneticButton";
import DecryptedText from "@/components/animations/DecryptedText";

interface Hotspot {
  id: string;
  x: number; // percentage
  y: number; // percentage
  title: string;
  tag: string;
  description: string;
}

const HOTSPOTS: Hotspot[] = [
  {
    id: "tir-optics",
    x: 64,
    y: 42,
    title: "Anti-Glare TIR Optics",
    tag: "5000K Daylight",
    description: "Total internal reflection lens creates a razor-sharp horizontal cut-off to prevent oncoming glare.",
  },
  {
    id: "nichia-diode",
    x: 76,
    y: 52,
    title: "Nichia Japanese Emitter",
    tag: "50,000h Rating",
    description: "High-density surface mount LED binned for exact chromaticity consistency and minimal lumen decay.",
  },
  {
    id: "cnc-housing",
    x: 88,
    y: 38,
    title: "A380 Die-Cast Aluminium",
    tag: "Aero-Venturi Fins",
    description: "Convective heat sink shedding thermal load directly into the oncoming slipstream.",
  },
  {
    id: "ip67-seal",
    x: 52,
    y: 62,
    title: "Hermetic O-Ring Barrier",
    tag: "IP-67 Submersion",
    description: "Fluorosilicone compression gasket sealed to 1.0m continuous water depth.",
  },
];

export default function HeroBrandVisual() {
  const [activeMode, setActiveMode] = useState<"daylight" | "boost" | "amber">("daylight");
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative w-full rounded-2xl overflow-hidden border hairline bg-ink-950 shadow-2xl group select-none transition-all duration-300"
    >
      {/* Background Cinematic Banner Image */}
      <div className="relative aspect-[16/9] sm:aspect-[21/9] min-h-[320px] sm:min-h-[420px] w-full overflow-hidden">
        <Image
          src="/media/banners/background_1777985582_4572315.webp"
          alt="Maddog Range on Dark Ridge"
          fill
          priority
          sizes="(max-width: 1280px) 100vw, 1200px"
          className={cn(
            "object-cover object-center transition-all duration-700 ease-out",
            activeMode === "boost" && "scale-105 brightness-110",
            activeMode === "amber" && "sepia-[0.35] hue-rotate-[-10deg]",
          )}
        />

        {/* Dynamic Illumination & Beam Lighting Atmosphere */}
        <div
          className={cn(
            "absolute inset-0 pointer-events-none transition-opacity duration-500",
            activeMode === "daylight" && "opacity-40",
            activeMode === "boost" && "opacity-80",
            activeMode === "amber" && "opacity-60",
          )}
          style={{
            background:
              activeMode === "amber"
                ? `radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, rgba(245, 158, 11, 0.4) 0%, rgba(217, 119, 6, 0.15) 45%, transparent 70%)`
                : activeMode === "boost"
                ? `radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, rgba(255, 255, 255, 0.5) 0%, rgba(249, 115, 22, 0.25) 40%, transparent 75%)`
                : `radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, rgba(255, 248, 230, 0.25) 0%, rgba(249, 115, 22, 0.1) 40%, transparent 70%)`,
          }}
        />

        {/* Vignette Overlay & Bottom Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/40 to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink-950/80 via-transparent to-ink-950/40 pointer-events-none" />

        {/* Top Floating Telemetry HUD */}
        <div className="absolute top-4 left-4 right-4 flex flex-wrap items-center justify-between gap-3 pointer-events-auto">
          <div className="flex items-center gap-2 bg-ink-950/85 backdrop-blur-md px-3 py-1.5 rounded-full border hairline shadow-sm">
            <span className="w-2 h-2 rounded-full bg-signal-500 animate-pulse" />
            <span className="font-mono text-bone text-xs font-medium">Interactive Optical Stage</span>
            <span className="text-fog-500 font-mono text-[10px] hidden sm:inline">| Hover hotspots to inspect</span>
          </div>

          {/* Interactive Beam Mode Controller */}
          <div className="flex items-center gap-1 bg-ink-950/90 backdrop-blur-md p-1 rounded-xl border hairline shadow-sm">
            <button
              type="button"
              onClick={() => setActiveMode("daylight")}
              className={cn(
                "px-2.5 sm:px-3 py-1 rounded-lg text-xs font-mono transition-all",
                activeMode === "daylight"
                  ? "bg-signal-600 text-bone shadow-sm font-semibold"
                  : "text-fog-400 hover:text-bone",
              )}
            >
              5000K Standard
            </button>
            <button
              type="button"
              onClick={() => setActiveMode("boost")}
              className={cn(
                "px-2.5 sm:px-3 py-1 rounded-lg text-xs font-mono transition-all",
                activeMode === "boost"
                  ? "bg-bone text-ink-950 shadow-sm font-bold"
                  : "text-fog-400 hover:text-bone",
              )}
            >
              11,600 LM Boost
            </button>
            <button
              type="button"
              onClick={() => setActiveMode("amber")}
              className={cn(
                "px-2.5 sm:px-3 py-1 rounded-lg text-xs font-mono transition-all",
                activeMode === "amber"
                  ? "bg-amber-500 text-ink-950 shadow-sm font-bold"
                  : "text-fog-400 hover:text-bone",
              )}
            >
              3000K Amber Fog
            </button>
          </div>
        </div>

        {/* Interactive Hotspots on the Pods */}
        {HOTSPOTS.map((spot) => {
          const isActive = activeHotspot === spot.id;
          return (
            <div
              key={spot.id}
              className="absolute pointer-events-auto"
              style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
            >
              <button
                type="button"
                onMouseEnter={() => setActiveHotspot(spot.id)}
                onMouseLeave={() => setActiveHotspot(null)}
                onClick={() => setActiveHotspot(isActive ? null : spot.id)}
                className="relative -translate-x-1/2 -translate-y-1/2 group/btn focus:outline-none"
                aria-label={`Inspect ${spot.title}`}
              >
                {/* Ripple ring */}
                <span className="absolute -inset-2 rounded-full bg-signal-500/30 animate-ping opacity-75" />
                <span
                  className={cn(
                    "relative flex h-6 w-6 items-center justify-center rounded-full border font-mono text-[10px] font-bold shadow-lg transition-all",
                    isActive
                      ? "bg-signal-500 text-bone border-bone scale-125"
                      : "bg-ink-950/90 text-signal-400 border-signal-500/70 hover:scale-110",
                  )}
                >
                  +
                </span>
              </button>

              {/* Tooltip Card */}
              {isActive && (
                <div className="absolute left-1/2 bottom-full mb-3 -translate-x-1/2 w-60 sm:w-68 bg-ink-950/95 backdrop-blur-md border hairline-signal p-3.5 rounded-xl shadow-2xl z-40 pointer-events-none animate-in fade-in zoom-in-95 duration-200">
                  <div className="flex items-center justify-between text-[10px] font-mono mb-1">
                    <span className="text-signal-400 uppercase">
                      <DecryptedText text={spot.tag} speed={30} />
                    </span>
                    <span className="text-fog-500">Maddog Spec</span>
                  </div>
                  <h4 className="font-display text-bone font-medium text-sm">{spot.title}</h4>
                  <p className="text-fog-300 text-xs mt-1 leading-relaxed">{spot.description}</p>
                </div>
              )}
            </div>
          );
        })}

        {/* Bottom Headline & Direct Navigation Strip */}
        <div className="absolute bottom-4 left-4 right-4 flex flex-col sm:flex-row sm:items-end justify-between gap-4 pointer-events-auto">
          <div className="max-w-lg">
            <p className="eyebrow text-signal-500 text-xs">Maddog Precision Systems</p>
            <h3 className="font-display text-bone text-lg sm:text-2xl font-medium leading-snug drop-shadow-md">
              Engineered for extreme night miles and zero oncoming scatter.
            </h3>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <MagneticButton strength={0.2}>
              <Link
                href="/lights/"
                className="px-4 py-2 rounded-lg bg-signal-600 hover:bg-signal-500 text-bone font-mono text-xs font-semibold transition-all shadow-md flex items-center gap-1.5"
              >
                <span>Explore All Products</span>
                <span>→</span>
              </Link>
            </MagneticButton>
            <MagneticButton strength={0.2}>
              <Link
                href="/fit/"
                className="px-4 py-2 rounded-lg bg-ink-900/90 hover:bg-ink-800 border hairline text-bone font-mono text-xs font-medium transition-all shadow-sm"
              >
                Bike Finder
              </Link>
            </MagneticButton>
          </div>
        </div>
      </div>
    </div>
  );
}
