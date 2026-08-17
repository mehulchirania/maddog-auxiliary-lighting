"use client";

import { useState } from "react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { cn } from "@/lib/cn";

type TabId = "harness-pro" | "dimmer" | "optical-aiming" | "dual-mode";

interface InstallationGuide {
  id: TabId;
  title: string;
  subtitle: string;
  duration: string;
  difficulty: "Beginner" | "Intermediate";
  toolsRequired: string[];
  steps: {
    number: string;
    heading: string;
    instruction: string;
    warning?: string;
  }[];
}

const GUIDES: InstallationGuide[] = [
  {
    id: "harness-pro",
    title: "Wire Harness Pro & Switch Pro",
    subtitle: "Complete plug-and-play wiring with solid-state relay and 15A fuse.",
    duration: "25 – 35 mins",
    difficulty: "Beginner",
    toolsRequired: ["10mm Socket Wrench", "Allen Key Set (4mm & 5mm)", "Zip Ties", "Electrical Tape"],
    steps: [
      {
        number: "01",
        heading: "Battery Terminal & Relay Placement",
        instruction: "Mount the solid-state relay securely under the seat or behind the side cowl using the provided zip ties. Connect the red ring terminal with the 15A fuse directly to the battery positive (+12V) and black ring terminal to battery ground (-).",
        warning: "Never connect positive terminal before mounting all lights and switches to avoid accidental shorting.",
      },
      {
        number: "02",
        heading: "Handlebar Switch Cockpit Routing",
        instruction: "Route the waterproof switch harness along the motorcycle frame spine under the fuel tank up to the handlebar. Clamp the Switch Pro bracket to your handlebar (22mm or 28mm) using the stainless hex bolt.",
      },
      {
        number: "03",
        heading: "Auxiliary Pod Delphi Connectors",
        instruction: "Route the twin output cables to your left and right auxiliary light crash guard mounts. Click the waterproof Delphi connectors into both light pods until the locking tab audibly snaps into place.",
      },
      {
        number: "04",
        heading: "System Diagnostic & Test",
        instruction: "Turn on the motorcycle ignition. Press the Switch Pro push button to test steady ON. Double tap for beacon mode. Long press for momentary high-beam pass flash.",
      },
    ],
  },
  {
    id: "dimmer",
    title: "Maddog Quad-Level Dimmer Module",
    subtitle: "PWM solid-state dimming with automatic 100% pass flash override.",
    duration: "30 – 40 mins",
    difficulty: "Intermediate",
    toolsRequired: ["10mm Socket", "Multimeter (optional)", "Allen Keys", "Wire Cutters"],
    steps: [
      {
        number: "01",
        heading: "Dedicated Dimmer Harness Integration",
        instruction: "The Dimmer module includes its own integrated controller harness. Note: Do not chain with standard Wire Harness Pro as the Dimmer contains an integrated solid-state MOSFET controller.",
      },
      {
        number: "02",
        heading: "Auxiliary High-Beam Trigger Tap (Optional)",
        instruction: "Tap the yellow auxiliary trigger wire into your motorcycle OEM high-beam positive wire using a pos-tap connector. This enables automatic instant 100% burst when flashing OEM pass switch.",
      },
      {
        number: "03",
        heading: "Brightness Profile Calibration",
        instruction: "Cycle the Dimmer rotary toggle: Level 1 (25% city commute), Level 2 (50% suburban street), Level 3 (75% highway cruising), Level 4 (100% high-speed unlit tarmac).",
      },
    ],
  },
  {
    id: "optical-aiming",
    title: "5000K Optical Cutoff & Beam Leveling",
    subtitle: "Achieving 300m+ tarmac reach with zero glare into oncoming riders.",
    duration: "15 mins",
    difficulty: "Beginner",
    toolsRequired: ["Tape Measure", "Masking Tape", "5mm Allen Key", "Vertical Wall"],
    steps: [
      {
        number: "01",
        heading: "Setup Test Position",
        instruction: "Park your motorcycle on level ground exactly 5 metres (16.4 feet) perpendicular to a flat vertical wall or garage door. Ensure standard rider weight is on the bike.",
      },
      {
        number: "02",
        heading: "Measure Centerline Height",
        instruction: "Measure the distance from the ground to the center of your auxiliary light lens. Mark this exact height (H) on the wall with masking tape.",
      },
      {
        number: "03",
        heading: "Set 1.5° Downward Horizon Cutoff",
        instruction: "Place a second horizontal tape mark 7.5 cm (3 inches) BELOW the center line mark. Loosen the mount bracket bolt and tilt the light until the sharp TIR horizontal cutoff aligns directly at or below the lower tape mark.",
        warning: "A beam aimed above horizontal wastes light into the sky and blinds oncoming traffic.",
      },
      {
        number: "04",
        heading: "Lock Stainless Fasteners to Torque Spec",
        instruction: "Tighten the SS 304 bracket bolts to 18 Nm torque. Take a night test ride to verify optical throw.",
      },
    ],
  },
  {
    id: "dual-mode",
    title: "Lycan Dual-Mode Independent Switching",
    subtitle: "Wiring independent spot and flood control circuits.",
    duration: "30 mins",
    difficulty: "Intermediate",
    toolsRequired: ["Dual Switch Pro", "10mm Wrench", "Allen Key Set", "Cable Ties"],
    steps: [
      {
        number: "01",
        heading: "Dual Harness Channel Mapping",
        instruction: "Lycan utilizes 2 independent power channels: Channel A (Yellow wire) powers the wide flood optics; Channel B (White wire) powers the long-range spot beam.",
      },
      {
        number: "02",
        heading: "Independent Switching Modes",
        instruction: "Connect Channel A to Button 1 for wide cornering illumination; connect Channel B to Button 2 for long-range high-speed piercing throw.",
      },
    ],
  },
];

export default function InstallPage() {
  const [activeTab, setActiveTab] = useState<TabId>("harness-pro");
  const guide = GUIDES.find((g) => g.id === activeTab) || GUIDES[0];

  return (
    <div className="bg-ink-950 text-bone min-h-screen py-16 sm:py-20">
      <Container>
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <span className="eyebrow text-signal-500 mb-2 block">Engineering Reference</span>
          <h1
            className="font-display text-bone leading-[1.05]"
            style={{
              fontSize: "var(--text-display)",
              fontWeight: "var(--fw-display)",
            }}
          >
            Installation &amp; Wiring Schematics Hub
          </h1>
          <p className="text-fog-300 mt-4 leading-relaxed" style={{ fontSize: "var(--text-body-lg)" }}>
            True plug-and-play architecture with zero wire slicing. Follow our factory engineering guides to wire, mount, and align your auxiliary lighting system.
          </p>
        </div>

        {/* Interactive Guide Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-3 mb-8 border-b hairline">
          {GUIDES.map((g) => {
            const isSel = g.id === activeTab;
            return (
              <button
                key={g.id}
                type="button"
                onClick={() => setActiveTab(g.id)}
                className={cn(
                  "px-4 py-2 rounded-lg font-medium text-xs font-mono tracking-wide whitespace-nowrap transition-all",
                  isSel
                    ? "bg-signal-600 text-bone shadow-md"
                    : "bg-ink-900 border hairline text-fog-400 hover:text-bone hover:border-ink-600",
                )}
              >
                {g.title}
              </button>
            );
          })}
        </div>

        {/* Selected Guide Detail Card */}
        <div className="border hairline bg-ink-900/80 rounded-2xl p-6 sm:p-8 shadow-xl">
          {/* Guide Header HUD */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b hairline pb-6 mb-8">
            <div>
              <span className="eyebrow text-signal-500 font-mono text-xs">Standard Operating Procedure</span>
              <h2 className="font-display text-2xl text-bone font-medium mt-1">{guide.title}</h2>
              <p className="text-fog-400 text-xs mt-1">{guide.subtitle}</p>
            </div>

            <div className="flex items-center gap-4 text-xs font-mono bg-ink-950 p-3 rounded-xl border hairline">
              <div>
                <span className="text-fog-500 block text-[10px] uppercase">Duration</span>
                <span className="text-bone font-medium">{guide.duration}</span>
              </div>
              <div className="border-l hairline pl-4">
                <span className="text-fog-500 block text-[10px] uppercase">Difficulty</span>
                <span className="text-signal-400 font-medium">{guide.difficulty}</span>
              </div>
            </div>
          </div>

          {/* Tools Required */}
          <div className="mb-8 p-4 rounded-xl bg-ink-950/70 border hairline">
            <span className="eyebrow text-fog-400 text-xs block mb-2">Tools &amp; Materials Required:</span>
            <div className="flex flex-wrap gap-2">
              {guide.toolsRequired.map((t) => (
                <span key={t} className="font-mono text-xs bg-ink-900 border hairline px-2.5 py-1 rounded text-fog-300">
                  🔧 {t}
                </span>
              ))}
            </div>
          </div>

          {/* Step-by-Step Instructions */}
          <div className="space-y-6">
            {guide.steps.map((step) => (
              <div key={step.number} className="flex gap-4 sm:gap-6 border-b hairline pb-6 last:border-b-0 last:pb-0">
                <span className="font-mono text-lg sm:text-xl font-bold text-signal-500 shrink-0 w-8 pt-0.5">
                  {step.number}
                </span>
                <div className="flex-1">
                  <h3 className="font-display text-bone font-medium text-base sm:text-lg mb-2">
                    {step.heading}
                  </h3>
                  <p className="text-fog-300 text-xs sm:text-sm leading-relaxed">
                    {step.instruction}
                  </p>
                  {step.warning && (
                    <div className="mt-3 p-3 rounded-lg bg-amber-950/40 border border-amber-800/50 text-amber-300 text-xs font-mono flex items-start gap-2">
                      <span>⚠️</span>
                      <span>{step.warning}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Technical Safety Pillars */}
        <div className="grid sm:grid-cols-3 gap-6 mt-12">
          <div className="p-6 rounded-xl border hairline bg-ink-900/50">
            <span className="font-mono text-signal-400 text-sm font-semibold">1.0 sq mm</span>
            <h3 className="font-display text-bone font-medium text-base mt-2">Pure Copper Core</h3>
            <p className="text-fog-400 text-xs mt-2 leading-relaxed">
              Industrial grade automotive wiring rated up to 140W with heavy silicone heat sleeves resisting engine case temperatures up to 180°C.
            </p>
          </div>

          <div className="p-6 rounded-xl border hairline bg-ink-900/50">
            <span className="font-mono text-signal-400 text-sm font-semibold">IP-67</span>
            <h3 className="font-display text-bone font-medium text-base mt-2">Delphi Snap Connectors</h3>
            <p className="text-fog-400 text-xs mt-2 leading-relaxed">
              Automotive weatherproof sealed plug connections prevent pin oxidation, water ingress, and vibration-induced disconnections.
            </p>
          </div>

          <div className="p-6 rounded-xl border hairline bg-ink-900/50">
            <span className="font-mono text-signal-400 text-sm font-semibold">15A Fuse</span>
            <h3 className="font-display text-bone font-medium text-base mt-2">Isolated Circuit Safety</h3>
            <p className="text-fog-400 text-xs mt-2 leading-relaxed">
              Direct battery isolation protects delicate ECU and CAN-bus motorcycle electrical architectures from current surges.
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
}
