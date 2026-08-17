import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import Cta from "@/components/ui/Cta";
import TirDiagram from "@/components/tech/TirDiagram";
import ColorTempScale from "@/components/tech/ColorTempScale";
import NichiaEmitterDeepDive from "@/components/tech/NichiaEmitterDeepDive";
import EnvironmentalArmor from "@/components/tech/EnvironmentalArmor";
import InstrumentStat from "@/components/tech/InstrumentStat";
import PhotometricShowcase from "@/components/tech/PhotometricShowcase";
import AntiGlare from "@/components/home/AntiGlare";
import TheSystem from "@/components/home/TheSystem";

export const metadata: Metadata = {
  title: "Engineering & Technology — Maddog",
  description:
    "Anti-glare TIR lens optics, 5000K–5700K colour temperature, Nichia emitters rated to 50,000 hours, and IP-67 sealed polycarbonate-and-aluminium housings. How Maddog aux lights are actually engineered.",
};

export default function TechnologyPage() {
  return (
    <div className="bg-ink-950 text-bone">
      {/* Dossier Header */}
      <Container style={{ paddingTop: "var(--section-lg)", paddingBottom: "var(--section-sm)" }}>
        <p className="eyebrow text-signal-500 mb-4">Engineering Dossier</p>
        <h1
          className="font-display max-w-3xl leading-[1.02]"
          style={{
            fontSize: "var(--text-display)",
            fontWeight: "var(--fw-display)",
            letterSpacing: "var(--ls-display)",
          }}
        >
          Six systems decide whether a light is any good after dark.
        </h1>
        <p
          className="text-fog-300 mt-6 max-w-2xl leading-relaxed"
          style={{ fontSize: "var(--text-body-lg)" }}
        >
          Not marketing adjectives. How it shapes the beam, the colour temperature it renders in,
          how long the emitter holds output under heat, and whether the system survives Indian monsoons.
          This is the telemetry and engineering behind every Maddog light.
        </p>
      </Container>

      {/* 01 — Anti-Glare & TIR Optics (Integrated) */}
      <div className="border-t hairline">
        <AntiGlare />
        <Container style={{ paddingBottom: "var(--section)" }}>
          <Reveal>
            <div className="border hairline bg-ink-900/60 rounded-xl p-6 sm:p-8">
              <p className="eyebrow mb-2">Optical Physics</p>
              <h3 className="font-display text-bone mb-6" style={{ fontSize: "var(--text-h3)" }}>
                Total Internal Reflection vs Reflector Scattering
              </h3>
              <TirDiagram />
            </div>
          </Reveal>
        </Container>
      </div>

      {/* 02 — Colour Temperature & Contrast Spectrum */}
      <div className="border-t hairline bg-ink-900/40">
        <Container style={{ paddingTop: "var(--section)", paddingBottom: "var(--section)" }}>
          <Reveal>
            <SectionHeading
              eyebrow="02 — Photometry & Spectrum"
              title="5000K–5700K Daylight White"
              lede="Every light in the range operates within the calibrated 5000K–5700K spectrum — warm enough to hold contrast in rain, fog and dust, and short of the harsh blue-white glare that cheap grey-import LEDs project."
            />
          </Reveal>

          <Reveal delay={80} className="mt-12">
            <ColorTempScale />
          </Reveal>

          <Reveal delay={120} className="mt-8 max-w-2xl">
            <p className="text-fog-300 leading-relaxed" style={{ fontSize: "var(--text-body)" }}>
              Push colour temperature higher and light scatters off ambient moisture and suspended dust.
              Maddog holds all emitters to 5000K–5700K for maximum road-surface definition and minimal eye fatigue on multi-hour rides.
            </p>
          </Reveal>
        </Container>
      </div>

      {/* 03 — Nichia Japanese Emitters & 50,000h Life */}
      <div className="border-t hairline">
        <Container style={{ paddingTop: "var(--section)", paddingBottom: "var(--section)" }}>
          <Reveal>
            <SectionHeading
              eyebrow="03 — Solid-State Emitters"
              title="Nichia LEDs, rated to 50,000 hours"
              lede="Japanese Nichia emitters, binned for lumen output consistency and thermal stability across decades of riding."
            />
          </Reveal>

          <Reveal delay={80} className="mt-10 grid gap-4 sm:grid-cols-3">
            <InstrumentStat value="50,000" unit="hrs" label="Rated emitter life" />
            <InstrumentStat value="6" label="Lights running Nichia LEDs" />
            <InstrumentStat value="18" unit="mo" label="Replacement warranty" />
          </Reveal>

          <Reveal delay={120} className="mt-10">
            <NichiaEmitterDeepDive />
          </Reveal>
        </Container>
      </div>

      {/* 04 — IP67 Weatherproofing & Thermal Housing */}
      <div className="border-t hairline bg-ink-900/40">
        <Container style={{ paddingTop: "var(--section)", paddingBottom: "var(--section)" }}>
          <Reveal>
            <SectionHeading
              eyebrow="04 — Environmental Rating"
              title="IP-67 Submersion Sealed, Die-Cast Aluminium"
              lede="Hard-coated polycarbonate lens covers seated against precision silicone O-rings and die-cast aluminium heat sinks — rated to IEC 60529 standards."
            />
          </Reveal>

          <Reveal delay={80} className="mt-10">
            <EnvironmentalArmor />
          </Reveal>
        </Container>
      </div>

      {/* 05 — The Complete Wiring & Power System */}
      <div className="border-t hairline">
        <TheSystem />
      </div>

      {/* 06 — CAD Schematics & Dimension Blueprints */}
      <div className="border-t hairline bg-ink-900/40">
        <Container style={{ paddingTop: "var(--section)", paddingBottom: "var(--section)" }}>
          <Reveal>
            <SectionHeading
              eyebrow="06 — Measured CAD Blueprints"
              title="Published Dimensional Telemetry"
              lede="Exploded sub-assemblies and tolerance drawings for the flagship Rage and Lycan platforms."
            />
          </Reveal>

          <Reveal delay={80} className="mt-10">
            <PhotometricShowcase />
          </Reveal>
        </Container>
      </div>

      {/* Closing CTA */}
      <div className="border-t hairline bg-ink-950">
        <Container style={{ paddingTop: "var(--section)", paddingBottom: "var(--section)" }}>
          <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="font-display text-bone font-medium" style={{ fontSize: "var(--text-h2)" }}>
                Ready to match these systems to your motorcycle?
              </h3>
              <p className="text-fog-400 mt-2" style={{ fontSize: "var(--text-body)" }}>
                Explore the auxiliary light ladder or run the fitment selector.
              </p>
            </div>
            <div className="flex flex-wrap gap-4">
              <Cta href="/lights/">View The Range</Cta>
              <Cta href="/fit/" variant="outline">Run Bike Finder</Cta>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
}

