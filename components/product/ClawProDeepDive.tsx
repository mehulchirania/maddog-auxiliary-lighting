"use client";

import { useState } from "react";
import Image from "next/image";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import { cn } from "@/lib/cn";

import SpotlightCard from "@/components/animations/SpotlightCard";
import DecryptedText from "@/components/animations/DecryptedText";
import CountUp from "@/components/animations/CountUp";
import ShinyText from "@/components/animations/ShinyText";

export default function ClawProDeepDive() {
  const [chargingMode, setChargingMode] = useState<"both" | "wireless" | "usbc">("both");
  const [damperActive, setDamperActive] = useState<boolean>(true);
  const [phoneSize, setPhoneSize] = useState<number>(6.7);

  return (
    <div className="space-y-16 sm:space-y-24">
      {/* 01 — Harmonic Vibration Damper Section */}
      <div className="border-t hairline bg-ink-950 text-bone">
        <Container className="py-16 sm:py-20">
          <Reveal>
            <div className="flex items-center gap-2 mb-3">
              <span className="eyebrow text-signal-500">Camera Protection System</span>
              <span className="font-mono text-xs text-fog-500">/</span>
              <span className="font-mono text-xs text-signal-400">Harmonic Elastomer Core</span>
            </div>
            <h2 className="font-display text-2xl sm:text-4xl max-w-3xl font-medium leading-tight">
              <ShinyText text="Motorcycle engines destroy phone cameras." speed={6} /> <br className="hidden sm:inline" />
              The Claw Pro isolates the destructive harmonics.
            </h2>
            <p className="text-fog-300 mt-4 text-sm sm:text-base max-w-2xl leading-relaxed">
              Modern smartphones feature optical image stabilization (OIS) with microscopic gyroscopic floating magnets. High-frequency motorcycle engine resonance (between 40Hz and 250Hz) causes immediate gyroscope fracture and blurry cameras. The Claw Pro integrates a tuned silicone elastomer damper that cancels these frequencies before they reach your phone.
            </p>
          </Reveal>

          {/* Interactive Damper Simulator */}
          <Reveal delay={80} className="mt-10">
            <div className="border hairline bg-ink-900/70 rounded-2xl p-6 sm:p-8 shadow-xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b hairline pb-5">
                <div>
                  <span className="font-mono text-xs text-signal-400 uppercase">Live Resonance Simulator</span>
                  <p className="font-display text-bone text-lg mt-0.5">Engine Vibration Isolation Telemetry</p>
                </div>
                <div className="flex items-center gap-3 bg-ink-950 p-1.5 rounded-xl border hairline">
                  <span className="font-mono text-xs text-fog-400 pl-2">Maddog Damper:</span>
                  <button
                    type="button"
                    onClick={() => setDamperActive(!damperActive)}
                    className={cn(
                      "px-4 py-1.5 rounded-lg text-xs font-mono font-medium transition-all",
                      damperActive
                        ? "bg-signal-600 text-bone shadow-sm"
                        : "bg-red-950/80 text-red-400 border border-red-800",
                    )}
                  >
                    {damperActive ? "Active (Elastomer Engaged)" : "Disabled (Direct Mount Stress)"}
                  </button>
                </div>
              </div>

              {/* Graphic Waveform Visual */}
              <div className="grid lg:grid-cols-12 gap-8 items-center mt-6">
                <div className="lg:col-span-7 space-y-4">
                  <div className="border hairline bg-ink-950 rounded-xl p-5 relative overflow-hidden">
                    <div className="flex items-center justify-between font-mono text-xs text-fog-400 mb-3 border-b hairline pb-2">
                      <span>Vibration G-Force on Phone OIS Sensor</span>
                      <span className={damperActive ? "text-signal-400 font-bold" : "text-red-400 font-bold"}>
                        {damperActive ? (
                          <DecryptedText text="0.38 G (Safe Zone - 92% Damped)" speed={25} />
                        ) : (
                          <DecryptedText text="4.82 G (Camera Damage Alert)" speed={25} />
                        )}
                      </span>
                    </div>

                    {/* Animated oscillation wave simulation */}
                    <div className="h-28 flex items-center justify-center relative">
                      <div className="w-full flex items-center justify-between gap-1 h-20">
                        {Array.from({ length: 32 }).map((_, i) => {
                          const height = damperActive
                            ? Math.sin(i * 0.4) * 12 + 16
                            : Math.sin(i * 0.9) * 36 + 42;
                          return (
                            <div
                              key={i}
                              className={cn(
                                "flex-1 rounded-full transition-all duration-300",
                                damperActive
                                  ? "bg-gradient-to-t from-signal-600 to-signal-400"
                                  : "bg-gradient-to-t from-red-600 to-red-400 animate-pulse",
                              )}
                              style={{ height: `${height}px` }}
                            />
                          );
                        })}
                      </div>
                    </div>

                    <div className="flex justify-between font-mono text-[11px] text-fog-500 pt-2 border-t hairline">
                      <span>Engine RPM: 5,500 RPM (Single Cylinder / Twin)</span>
                      <span>Harmonic Attenuation: {damperActive ? "-92% Dampened" : "0% (Raw Transfer)"}</span>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-5 space-y-3 font-mono text-xs">
                  <div className="border hairline bg-ink-950 p-4 rounded-xl">
                    <span className="text-signal-500 text-[10px] uppercase block">Damping Material</span>
                    <span className="text-bone text-sm font-semibold block mt-0.5">High-Grade Fluorosilicone Polymer</span>
                    <p className="text-fog-400 text-xs mt-1">
                      Maintains calibrated rebound elasticity from -20°C high-altitude Ladakh rides to +50°C Rajasthan desert heat.
                    </p>
                  </div>
                  <div className="border hairline bg-ink-950 p-4 rounded-xl">
                    <span className="text-signal-500 text-[10px] uppercase block">Tested Smartphones</span>
                    <span className="text-bone text-sm font-semibold block mt-0.5">iPhone 12–16 Pro Max, Galaxy S21–S24 Ultra</span>
                    <p className="text-fog-400 text-xs mt-1">
                      100% verified camera sensor protection across 25,000+ test kilometers.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </Container>
      </div>

      {/* 02 — Dual Fast-Charging Power Station */}
      <div className="border-y hairline-ink bg-paper-1 text-ink-950">
        <Container className="py-16 sm:py-20">
          <Reveal>
            <div className="flex items-center gap-2 mb-3">
              <span className="eyebrow text-signal-600">Cockpit Power Architecture</span>
              <span className="font-mono text-xs text-ink-400">/</span>
              <span className="font-mono text-xs text-ink-600">Dual Simultaneous Output</span>
            </div>
            <h2 className="font-display text-2xl sm:text-4xl max-w-2xl font-medium leading-tight">
              15W Qi Wireless + 25W USB-C PD. <br />
              Power your navigation without battery drain.
            </h2>
            <p className="text-ink-600 mt-4 text-sm sm:text-base max-w-2xl leading-relaxed">
              Running GPS navigation with full screen brightness on a hot day drains batteries faster than standard chargers can replenish. Claw Pro features high-output dual charging with an intelligent thermal management microcontroller.
            </p>
          </Reveal>

          {/* Interactive Charging Control */}
          <Reveal delay={80}>
            {/* Triple Channel Architecture Cards */}
            <div className="grid md:grid-cols-3 gap-6 mt-10">
              {/* Channel 1: 15W Qi Wireless Fast Charging */}
              <SpotlightCard
                spotlightColor="rgba(237, 29, 36, 0.08)"
                className="border hairline-ink bg-paper-0 rounded-2xl p-6 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-xs px-2.5 py-1 rounded-full bg-signal-600 text-bone font-semibold">
                      Channel 01 · 15W Qi
                    </span>
                    <span className="font-mono text-signal-600 text-xs font-semibold">Wireless Inductive</span>
                  </div>
                  <h3 className="font-display text-ink-950 text-xl font-medium">15W Inductive Fast Coil</h3>
                  <p className="text-ink-600 text-xs sm:text-sm mt-3 leading-relaxed">
                    Drop your phone in and start charging instantly without plugging any cables. Thick case penetration up to 6mm with Foreign Object Detection (FOD) that auto-disables charging if metal keys or coins are detected.
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t hairline-ink grid grid-cols-2 gap-2 text-xs font-mono">
                  <div>
                    <span className="text-ink-400 text-[10px] uppercase block">Efficiency</span>
                    <span className="text-ink-900 font-semibold">&gt; 82% Magnetic</span>
                  </div>
                  <div>
                    <span className="text-ink-400 text-[10px] uppercase block">Thermal Cutoff</span>
                    <span className="text-signal-600 font-semibold">Auto 45°C</span>
                  </div>
                </div>
              </SpotlightCard>

              {/* Channel 2: 25W USB-C Power Delivery */}
              <SpotlightCard
                spotlightColor="rgba(255, 255, 255, 0.12)"
                className="border hairline-ink bg-paper-0 rounded-2xl p-6 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-xs px-2.5 py-1 rounded-full bg-ink-950 text-bone font-semibold">
                      Channel 02 · USB-C PD 3.0
                    </span>
                    <span className="font-mono text-ink-500 text-xs">Super Fast Charge</span>
                  </div>
                  <h3 className="font-display text-ink-950 text-xl font-medium">25W Type-C Direct Port</h3>
                  <p className="text-ink-600 text-xs sm:text-sm mt-3 leading-relaxed">
                    Dedicated waterproof USB-C port for rapid battery boosts or powering external action cameras and helmet intercoms simultaneously while your phone charges wirelessly.
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t hairline-ink grid grid-cols-2 gap-2 text-xs font-mono">
                  <div>
                    <span className="text-ink-400 text-[10px] uppercase block">Output Profiles</span>
                    <span className="text-ink-900 font-semibold">5V/3A, 9V/2.77A</span>
                  </div>
                  <div>
                    <span className="text-ink-400 text-[10px] uppercase block">Port Cap</span>
                    <span className="text-ink-900 font-semibold">IP-67 Silicone</span>
                  </div>
                </div>
              </SpotlightCard>

              {/* Channel 3: Direct Battery Harness Integration */}
              <SpotlightCard
                spotlightColor="rgba(245, 158, 11, 0.08)"
                className="border hairline-ink bg-paper-0 rounded-2xl p-6 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-xs px-2.5 py-1 rounded-full bg-paper-2 text-ink-700 font-semibold border hairline-ink">
                      Channel 03 · Harness
                    </span>
                    <span className="font-mono text-ink-500 text-xs">Zero Parasitic Draw</span>
                  </div>
                  <h3 className="font-display text-ink-950 text-xl font-medium">Smart Ignition Cutoff</h3>
                  <p className="text-ink-600 text-xs sm:text-sm mt-3 leading-relaxed">
                    Includes a heavy-duty fused wiring harness with integrated inline power switch. Draws zero standby battery current when your motorcycle is parked, preventing battery discharge.
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t hairline-ink grid grid-cols-2 gap-2 text-xs font-mono">
                  <div>
                    <span className="text-ink-400 text-[10px] uppercase block">Standby Draw</span>
                    <span className="text-ink-900 font-semibold">&lt; 0.001 mA</span>
                  </div>
                  <div>
                    <span className="text-ink-400 text-[10px] uppercase block">Fuse Rating</span>
                    <span className="text-signal-600 font-semibold">5A Waterproof</span>
                  </div>
                </div>
              </SpotlightCard>
            </div>
          </Reveal>
        </Container>
      </div>

      {/* 03 — Universal Ergonomic Fitment & Clamp Articulation */}
      <div className="bg-ink-950 text-bone">
        <Container className="py-16 sm:py-20">
          <Reveal>
            <div className="flex items-center gap-2 mb-3">
              <span className="eyebrow text-signal-500">Fitment &amp; Ergonomics</span>
              <span className="font-mono text-xs text-fog-500">/</span>
              <span className="font-mono text-xs text-bone">360° CNC Dual Ball-Joint</span>
            </div>
            <h2 className="font-display text-2xl sm:text-4xl max-w-2xl font-medium leading-tight">
              Fits any handlebar. <br />
              Holds any smartphone from 4.7&quot; to 7.2&quot;.
            </h2>
          </Reveal>

          <Reveal delay={80} className="mt-10 grid lg:grid-cols-12 gap-8 items-center">
            {/* Phone Size Interactive Tester */}
            <div className="lg:col-span-6 border hairline bg-ink-900/60 rounded-2xl p-6 sm:p-8 space-y-6">
              <div className="flex items-center justify-between border-b hairline pb-4">
                <span className="font-mono text-xs text-signal-400 uppercase">Interactive Grip Sizing</span>
                <span className="font-mono text-bone text-sm font-semibold">{phoneSize}&quot; Display Size</span>
              </div>

              <div>
                <label htmlFor="phone-size-range" className="text-xs text-fog-300 font-mono block mb-2">
                  Adjust Smartphone Diagonal Size:
                </label>
                <input
                  id="phone-size-range"
                  type="range"
                  min="4.7"
                  max="7.2"
                  step="0.1"
                  value={phoneSize}
                  onChange={(e) => setPhoneSize(parseFloat(e.target.value))}
                  className="w-full accent-signal-500 cursor-pointer h-2 bg-ink-800 rounded-lg"
                />
                <div className="flex justify-between font-mono text-[10px] text-fog-500 mt-1">
                  <span>4.7&quot; (iPhone SE)</span>
                  <span>6.1&quot; (iPhone 16)</span>
                  <span>6.7&quot; (Pro Max)</span>
                  <span>7.2&quot; (Fold / Tablet)</span>
                </div>
              </div>

              <div className="border hairline bg-ink-950 p-4 rounded-xl space-y-2 font-mono text-xs">
                <div className="flex justify-between">
                  <span className="text-fog-400">Spring Retention Grip:</span>
                  <span className="text-signal-400 font-semibold">Quad-Corner Stainless Lock</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-fog-400">Maximum Case Thickness:</span>
                  <span className="text-bone font-semibold">15mm (Otterbox / QuadLock Ready)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-fog-400">Grip Release Mechanism:</span>
                  <span className="text-bone font-semibold">Single-Hand Quick-Release</span>
                </div>
              </div>
            </div>

            {/* Included Mounting Kit Hardware */}
            <div className="lg:col-span-6 space-y-4">
              <div className="border hairline bg-ink-900/60 p-5 rounded-xl">
                <span className="font-mono text-signal-500 text-xs uppercase block mb-1">Included in Box</span>
                <h4 className="font-display text-bone text-lg font-medium">Handlebar Clamping Inserts (22mm to 32mm)</h4>
                <p className="text-fog-300 text-xs mt-1 leading-relaxed">
                  Precision CNC aluminum clamp with high-friction EPDM shims to fit 22mm (7/8&quot; standard), 25.4mm (1&quot; Cruiser), 28.6mm (Fatbar), and 32mm handlebars.
                </p>
              </div>

              <div className="border hairline bg-ink-900/60 p-5 rounded-xl">
                <span className="font-mono text-signal-500 text-xs uppercase block mb-1">Included in Box</span>
                <h4 className="font-display text-bone text-lg font-medium">Rearview Mirror Stalk Mount Adapter</h4>
                <p className="text-fog-300 text-xs mt-1 leading-relaxed">
                  For maxi-scooters, faired sportbikes, or motorcycles with crowded handlebars — mounts cleanly directly under the 8mm or 10mm rearview mirror thread.
                </p>
              </div>

              <div className="border hairline bg-ink-900/60 p-5 rounded-xl">
                <span className="font-mono text-signal-500 text-xs uppercase block mb-1">Hardware Guarantee</span>
                <h4 className="font-display text-bone text-lg font-medium">Grade 304 Stainless Steel Fasteners</h4>
                <p className="text-fog-300 text-xs mt-1 leading-relaxed">
                  Marine-grade corrosion-resistant stainless steel bolts with nylon locknuts that never vibrate loose.
                </p>
              </div>
            </div>
          </Reveal>
        </Container>
      </div>
    </div>
  );
}
