import Link from "next/link";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import BeamCompare from "./BeamCompare";
import HeroBrandVisual from "./HeroBrandVisual";
import ShinyText from "@/components/animations/ShinyText";
import SpotlightCard from "@/components/animations/SpotlightCard";
import CountUp from "@/components/animations/CountUp";

export default function Hero() {
  return (
    <section
      className="bg-ink-900 text-bone relative flex flex-col justify-center overflow-hidden pt-16 pb-16 sm:pt-20 sm:pb-20"
      style={{ paddingBottom: "var(--section)" }}
    >
      <Container wide>
        {/* Above-fold Header */}
        <div className="max-w-4xl mb-8 sm:mb-10">
          <Reveal>
            <div className="flex items-center gap-2 mb-3">
              <span className="eyebrow text-signal-500">Maddog Industries — Bengaluru</span>
              <span className="text-fog-500 font-mono text-xs">/</span>
              <span className="font-mono text-fog-400 text-xs uppercase tracking-wider">Auxiliary Lighting &amp; Cockpit Systems</span>
            </div>
            <h1
              className="font-display leading-[1.02]"
              style={{
                fontSize: "var(--text-display)",
                fontWeight: "var(--fw-display)",
                letterSpacing: "var(--ls-display)",
              }}
            >
              <ShinyText text="You see it before you feel it." speed={5} />
            </h1>
            <p
              className="text-fog-300 mt-4 leading-relaxed max-w-3xl"
              style={{ fontSize: "var(--text-body-lg)" }}
            >
              First in India to fit calibrated 5000K anti-glare TIR optics as standard. Engineered so the beam projects on the road ahead with zero scatter into oncoming traffic.
            </p>
          </Reveal>
        </div>

        {/* Interactive Brand Showcase Visual */}
        <Reveal className="mb-10 sm:mb-14">
          <HeroBrandVisual />
        </Reveal>

        {/* Hero Bento Grid */}
        <div className="grid gap-5 lg:grid-cols-12 items-stretch">
          {/* Main Bento Card: Interactive Beam Telemetry Simulator */}
          <div className="lg:col-span-8 border hairline bg-ink-950/80 rounded-2xl p-4 sm:p-6 shadow-xl flex flex-col justify-between">
            <BeamCompare />
          </div>

          {/* Right Bento Column: 3 Structured Engineering & Assurance Cards */}
          <div className="lg:col-span-4 grid sm:grid-cols-2 lg:grid-cols-1 gap-4 sm:gap-5">
            {/* Card 1: 5000K Anti-Glare TIR Optics */}
            <SpotlightCard
              spotlightColor="rgba(255, 255, 255, 0.08)"
              className="border hairline bg-ink-950/60 hover:bg-ink-950/90 rounded-2xl p-5 flex flex-col justify-between shadow-sm"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="eyebrow text-signal-500">Optical Standard</span>
                  <span className="font-mono text-fog-400 text-[11px] px-2 py-0.5 rounded bg-ink-900 border hairline">5000K</span>
                </div>
                <h3 className="font-display text-bone font-medium" style={{ fontSize: "var(--text-h3)" }}>
                  Anti-Glare TIR Optics
                </h3>
                <p className="text-fog-400 mt-2 leading-relaxed" style={{ fontSize: "var(--text-caption)" }}>
                  Total internal reflection creates a hard horizontal cutoff: full output on the tarmac, zero blinding scatter into oncoming riders.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t hairline flex items-center justify-between font-mono text-[11px] text-fog-500">
                <span>Rain &amp; Mist Penetration</span>
                <span className="text-signal-400 font-medium">Zero Scatter</span>
              </div>
            </SpotlightCard>

            {/* Card 2: 50,000h Nichia + IP67 Submersion */}
            <SpotlightCard
              spotlightColor="rgba(237, 29, 36, 0.12)"
              className="border hairline bg-ink-950/60 hover:bg-ink-950/90 rounded-2xl p-5 flex flex-col justify-between shadow-sm"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="eyebrow text-signal-500">Durability Telemetry</span>
                  <span className="font-mono text-fog-400 text-[11px] px-2 py-0.5 rounded bg-ink-900 border hairline">IP-67</span>
                </div>
                <div className="grid grid-cols-2 gap-3 my-2">
                  <div>
                    <p className="tnum text-bone font-semibold font-mono" style={{ fontSize: "var(--text-h2)" }}>
                      <CountUp to={50000} duration={2.5} suffix="h" />
                    </p>
                    <p className="text-fog-500 font-mono text-[10px] uppercase">Nichia LED Life</p>
                  </div>
                  <div>
                    <p className="tnum text-bone font-semibold font-mono" style={{ fontSize: "var(--text-h2)" }}>1m / 30m</p>
                    <p className="text-fog-500 font-mono text-[10px] uppercase">Water Immersion</p>
                  </div>
                </div>
                <p className="text-fog-400 leading-relaxed" style={{ fontSize: "var(--text-caption)" }}>
                  Japanese Nichia diodes housed in CNC-machined die-cast aluminium with silicone O-ring gaskets.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t hairline flex items-center justify-between font-mono text-[11px] text-fog-500">
                <span>Bangalore Factory</span>
                <span className="text-bone font-medium">18mo Warranty</span>
              </div>
            </SpotlightCard>

            {/* Card 3: Direct Transparent Pricing */}
            <SpotlightCard
              spotlightColor="rgba(255, 255, 255, 0.08)"
              className="border hairline bg-ink-950/60 hover:bg-ink-950/90 rounded-2xl p-5 flex flex-col justify-between shadow-sm sm:col-span-2 lg:col-span-1"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="eyebrow text-signal-500">Integrity Policy</span>
                  <span className="font-mono text-signal-400 text-[11px] px-2 py-0.5 rounded bg-signal-600/10 border border-signal-600/30">Never Discounted</span>
                </div>
                <h3 className="font-display text-bone font-medium" style={{ fontSize: "var(--text-h3)" }}>
                  Transparent Direct Value
                </h3>
                <p className="text-fog-400 mt-2 leading-relaxed" style={{ fontSize: "var(--text-caption)" }}>
                  No inflated MSRPs or fake countdown timers. One honest factory price, backed by full replacement warranty.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t hairline flex items-center justify-between font-mono text-[11px] text-fog-500">
                <Link href="/technology/" className="text-fog-300 hover:text-bone underline underline-offset-2 transition-colors">
                  Explore Technology →
                </Link>
                <span className="text-fog-400">Fixed Fair Pricing</span>
              </div>
            </SpotlightCard>
          </div>
        </div>
      </Container>
    </section>
  );
}

