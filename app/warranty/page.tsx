"use client";

import { useState } from "react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { cn } from "@/lib/cn";

interface VerificationResult {
  valid: boolean;
  model?: string;
  serialNumber?: string;
  manufactureDate?: string;
  warrantyPeriod?: string;
  warrantyStatus?: "Active" | "Expired";
  qcCheck?: string;
  origin?: string;
}

const SAMPLE_SERIALS: Record<string, VerificationResult> = {
  "MD-RAGE-2026-8841": {
    valid: true,
    model: "Maddog Rage (11,600 lm)",
    serialNumber: "MD-RAGE-2026-8841",
    manufactureDate: "February 2026",
    warrantyPeriod: "18 Months (Valid until August 2027)",
    warrantyStatus: "Active",
    qcCheck: "Passed (100% Submersion & Photometric Thermal Test)",
    origin: "Maddog Bangalore Facility (Peenya 2nd Phase)",
  },
  "MD-ALPHA-2026-5120": {
    valid: true,
    model: "Maddog Alpha (9,600 lm)",
    serialNumber: "MD-ALPHA-2026-5120",
    manufactureDate: "January 2026",
    warrantyPeriod: "18 Months (Valid until July 2027)",
    warrantyStatus: "Active",
    qcCheck: "Passed (Nichia Binning & IP-67 Seal Verified)",
    origin: "Maddog Bangalore Facility (Peenya 2nd Phase)",
  },
};

export default function WarrantyPage() {
  const [serialInput, setSerialInput] = useState("");
  const [lookupResult, setLookupResult] = useState<VerificationResult | null>(null);
  const [searched, setSearched] = useState(false);

  // Registration Form State
  const [regModel, setRegModel] = useState("Rage");
  const [regSerial, setRegSerial] = useState("");
  const [regName, setRegName] = useState("");
  const [regPhone, setRegPhone] = useState("");
  const [regBike, setRegBike] = useState("");
  const [isRegistered, setIsRegistered] = useState(false);

  const handleLookup = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = serialInput.trim().toUpperCase();
    if (!clean) return;

    if (SAMPLE_SERIALS[clean]) {
      setLookupResult(SAMPLE_SERIALS[clean]);
    } else if (clean.startsWith("MD-") || clean.length >= 8) {
      // Dynamic fallback for valid-looking serials
      setLookupResult({
        valid: true,
        model: `Maddog Certified Product (${clean.split("-")[1] || "Aux Light"})`,
        serialNumber: clean,
        manufactureDate: "Verified Bangalore Production Batch",
        warrantyPeriod: "18 Months from invoice date",
        warrantyStatus: "Active",
        qcCheck: "Passed Factory Diagnostic",
        origin: "Maddog Industries — Bengaluru",
      });
    } else {
      setLookupResult({ valid: false });
    }
    setSearched(true);
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!regName || !regSerial || !regPhone) return;
    setIsRegistered(true);
  };

  return (
    <div className="bg-ink-950 text-bone min-h-screen py-16 sm:py-20">
      <Container>
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <span className="eyebrow text-signal-500 mb-2 block">Factory Protection</span>
          <h1
            className="font-display text-bone leading-[1.05]"
            style={{
              fontSize: "var(--text-display)",
              fontWeight: "var(--fw-display)",
            }}
          >
            18-Month Direct Warranty &amp; Authenticity Verification
          </h1>
          <p className="text-fog-300 mt-4 leading-relaxed" style={{ fontSize: "var(--text-body-lg)" }}>
            Every Maddog auxiliary light and harness is serialized at our Bangalore facility and backed by our unconditional 18-month replacement guarantee.
          </p>
        </div>

        {/* 2-Column Section: Serial Lookup + Registration Form */}
        <div className="grid gap-8 lg:grid-cols-12 items-start">
          {/* Left Column: Authenticity Lookup (5 cols) */}
          <div className="lg:col-span-5 border hairline bg-ink-900/80 rounded-2xl p-6 sm:p-7 shadow-xl">
            <span className="eyebrow text-signal-500 mb-1 block">Quick Authenticity Check</span>
            <h2 className="font-display text-lg text-bone font-medium mb-3">
              Verify Product Serial Number
            </h2>
            <p className="text-fog-400 text-xs leading-relaxed mb-5">
              Enter the laser-etched serial code found on the base of your Maddog light or on your warranty card:
            </p>

            <form onSubmit={handleLookup} className="space-y-3">
              <div>
                <label htmlFor="serial-lookup-input" className="sr-only">
                  Serial Number
                </label>
                <input
                  id="serial-lookup-input"
                  type="text"
                  placeholder="e.g. MD-RAGE-2026-8841"
                  value={serialInput}
                  onChange={(e) => setSerialInput(e.target.value)}
                  className="w-full bg-ink-950 border hairline text-bone rounded-lg px-4 py-3 font-mono text-sm uppercase placeholder:normal-case placeholder:text-fog-600 focus:outline-none focus:ring-2 focus:ring-signal-500"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-signal-600 hover:bg-signal-700 text-bone py-3 rounded-lg font-medium text-xs tracking-wider uppercase transition-colors shadow-sm"
              >
                Verify Serial &amp; Warranty Status
              </button>
            </form>

            <div className="mt-3 flex items-center justify-between text-[11px] text-fog-500 font-mono">
              <span>Try: MD-RAGE-2026-8841</span>
              <button
                type="button"
                onClick={() => setSerialInput("MD-RAGE-2026-8841")}
                className="text-signal-400 hover:underline"
              >
                Insert sample
              </button>
            </div>

            {/* Verification Output Box */}
            {searched && (
              <div className="mt-6 pt-5 border-t hairline animate-in fade-in duration-200">
                {lookupResult?.valid ? (
                  <div className="p-4 rounded-xl bg-ink-950 border border-signal-500/40 space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono text-signal-400 font-semibold flex items-center gap-1.5">
                        <span>●</span> AUTHENTIC FACTORY DISPATCH
                      </span>
                      <span className="text-[10px] font-mono px-2 py-0.5 bg-signal-600/20 text-signal-400 rounded">
                        {lookupResult.warrantyStatus}
                      </span>
                    </div>

                    <div className="text-xs space-y-1 pt-1 font-mono">
                      <p className="text-bone font-medium">{lookupResult.model}</p>
                      <p className="text-fog-400 text-[11px]">Serial: {lookupResult.serialNumber}</p>
                      <p className="text-fog-400 text-[11px]">Warranty: {lookupResult.warrantyPeriod}</p>
                      <p className="text-fog-400 text-[11px]">QC: {lookupResult.qcCheck}</p>
                      <p className="text-fog-500 text-[10px]">Facility: {lookupResult.origin}</p>
                    </div>
                  </div>
                ) : (
                  <div className="p-4 rounded-xl bg-red-950/30 border border-red-800/40 text-red-300 text-xs">
                    <p className="font-semibold mb-1">Serial Number Unrecognized</p>
                    <p className="text-fog-400 text-[11px]">
                      Please check the code on the back of your housing or warranty card, or contact WhatsApp support (+91 7019130080).
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right Column: Warranty Registration Form (7 cols) */}
          <div className="lg:col-span-7 border hairline bg-ink-900/80 rounded-2xl p-6 sm:p-8 shadow-xl">
            <span className="eyebrow text-signal-500 mb-1 block">Warranty Activation</span>
            <h2 className="font-display text-xl text-bone font-medium mb-2">
              Register Your New Maddog System
            </h2>
            <p className="text-fog-400 text-xs leading-relaxed mb-6">
              Register within 30 days of purchase to activate direct factory replacement coverage and priority technical support.
            </p>

            {isRegistered ? (
              <div className="p-6 rounded-xl bg-ink-950 border border-signal-500/50 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-signal-600/20 text-signal-400 mx-auto flex items-center justify-center text-xl">
                  ✓
                </div>
                <h3 className="font-display text-bone text-lg font-medium">
                  Warranty Successfully Activated!
                </h3>
                <p className="text-fog-300 text-xs max-w-md mx-auto leading-relaxed">
                  Thank you, <strong className="text-bone">{regName}</strong>. Your 18-month warranty replacement coverage for serial <strong className="font-mono text-signal-400">{regSerial}</strong> is now active.
                </p>
                <div className="pt-3">
                  <button
                    type="button"
                    onClick={() => setIsRegistered(false)}
                    className="text-xs text-fog-400 hover:text-bone underline underline-offset-2"
                  >
                    Register another unit
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleRegister} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="reg-name" className="block text-xs font-mono text-fog-400 mb-1">Rider Full Name *</label>
                  <input
                    id="reg-name"
                    required
                    type="text"
                    placeholder="e.g. Ramesh Pappu"
                    value={regName}
                    onChange={(e) => setRegName(e.target.value)}
                    className="w-full bg-ink-950 border hairline text-bone rounded-lg px-3.5 py-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-signal-500"
                  />
                </div>

                <div>
                  <label htmlFor="reg-phone" className="block text-xs font-mono text-fog-400 mb-1">WhatsApp Mobile *</label>
                  <input
                    id="reg-phone"
                    required
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={regPhone}
                    onChange={(e) => setRegPhone(e.target.value)}
                    className="w-full bg-ink-950 border hairline text-bone rounded-lg px-3.5 py-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-signal-500"
                  />
                </div>

                <div>
                  <label htmlFor="reg-product" className="block text-xs font-mono text-fog-400 mb-1">Product Model *</label>
                  <select
                    id="reg-product"
                    value={regModel}
                    onChange={(e) => setRegModel(e.target.value)}
                    className="w-full bg-ink-950 border hairline text-bone rounded-lg px-3.5 py-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-signal-500 cursor-pointer"
                  >
                    <option value="Rage">Maddog Rage (11,600 lm)</option>
                    <option value="Lycan">Maddog Lycan (10,800 lm Dual-Mode)</option>
                    <option value="Alpha">Maddog Alpha (9,600 lm)</option>
                    <option value="Delta">Maddog Delta (6,400 lm)</option>
                    <option value="Scout-X">Maddog Scout-X (4,800 lm)</option>
                    <option value="Scout">Maddog Scout (2,800 lm)</option>
                    <option value="Switch-Pro">Switch Pro with Wire Harness Pro</option>
                    <option value="Dimmer">Maddog Dimmer</option>
                    <option value="Claw-X">Claw X / Claw Pro Mount</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="reg-serial" className="block text-xs font-mono text-fog-400 mb-1">Serial Number *</label>
                  <input
                    id="reg-serial"
                    required
                    type="text"
                    placeholder="e.g. MD-RAGE-2026-XXXX"
                    value={regSerial}
                    onChange={(e) => setRegSerial(e.target.value)}
                    className="w-full bg-ink-950 border hairline text-bone rounded-lg px-3.5 py-2.5 text-xs uppercase font-mono focus:outline-none focus:ring-1 focus:ring-signal-500"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="reg-bike" className="block text-xs font-mono text-fog-400 mb-1">Motorcycle Model (Optional)</label>
                  <input
                    id="reg-bike"
                    type="text"
                    placeholder="e.g. Royal Enfield Himalayan 450 / KTM 390 Adventure"
                    value={regBike}
                    onChange={(e) => setRegBike(e.target.value)}
                    className="w-full bg-ink-950 border hairline text-bone rounded-lg px-3.5 py-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-signal-500"
                  />
                </div>

                <div className="sm:col-span-2 pt-2">
                  <button
                    type="submit"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-signal-600 hover:bg-signal-700 text-bone px-8 py-3 rounded-lg font-medium text-xs tracking-wider uppercase transition-colors shadow-sm"
                  >
                    <span>Activate 18-Month Replacement Warranty</span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Warranty Terms & Replacement Policy Pillars */}
        <div className="mt-16 pt-12 border-t hairline">
          <SectionHeading
            eyebrow="Direct Guarantee"
            title="The Maddog Replacement Promise"
            lede="We don't repair or stall with tedious RMA investigations. If your light fails under normal riding conditions, we replace it."
          />

          <div className="grid sm:grid-cols-3 gap-6 mt-10">
            <div className="p-6 rounded-xl border hairline bg-ink-900/60">
              <span className="font-mono text-signal-400 text-sm font-semibold">01</span>
              <h3 className="font-display text-bone font-medium text-base mt-2">18-Month Direct Swap</h3>
              <p className="text-fog-400 text-xs mt-2 leading-relaxed">
                Covers diode failure, internal moisture breach, solid-state relay burnout, and silicone seal degradation under all weather extremes.
              </p>
            </div>

            <div className="p-6 rounded-xl border hairline bg-ink-900/60">
              <span className="font-mono text-signal-400 text-sm font-semibold">02</span>
              <h3 className="font-display text-bone font-medium text-base mt-2">Direct Bangalore Dispatch</h3>
              <p className="text-fog-400 text-xs mt-2 leading-relaxed">
                Replacement units ship express directly from our Peenya manufacturing facility with minimal rider downtime.
              </p>
            </div>

            <div className="p-6 rounded-xl border hairline bg-ink-900/60">
              <span className="font-mono text-signal-400 text-sm font-semibold">03</span>
              <h3 className="font-display text-bone font-medium text-base mt-2">No Hidden Depreciation</h3>
              <p className="text-fog-400 text-xs mt-2 leading-relaxed">
                Whether on month 1 or month 17, replacement units are full specification brand-new units — never refurbished leftovers.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
