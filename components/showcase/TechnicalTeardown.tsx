import Image from "next/image";
import Link from "next/link";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import { getProduct } from "@/lib/products";
import SpotlightCard from "@/components/animations/SpotlightCard";
import ShinyText from "@/components/animations/ShinyText";

function Arrow({ className }: { className?: string }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      aria-hidden="true"
      className={className}
    >
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  );
}

export default function TechnicalTeardown() {
  const rage = getProduct("rage");
  const lycan = getProduct("lycan");
  if (!rage?.photometrics || !rage.dimensions || !lycan?.photometrics || !lycan.dimensions) return null;

  return (
    <section
      className="bg-ink-950 text-bone border-y hairline relative overflow-hidden"
      style={{ paddingTop: "var(--section)", paddingBottom: "var(--section)" }}
    >
      <Container wide>
        <Reveal>
          <div className="flex items-center gap-2 mb-3">
            <span className="eyebrow text-signal-500">Under the housing</span>
            <span className="text-fog-600 font-mono text-xs">/</span>
            <span className="font-mono text-fog-400 text-xs uppercase tracking-wider">CAD Architecture &amp; Tolerances</span>
          </div>
          <h2
            className="font-display text-bone leading-[1.05]"
            style={{
              fontSize: "var(--text-h1)",
              fontWeight: "var(--fw-h1)",
              letterSpacing: "var(--ls-h1)",
            }}
          >
            <ShinyText text="Nine parts, one IP-67 hermetic seal." speed={5} />
          </h2>
          <p
            className="text-fog-300 mt-4 max-w-xl leading-relaxed"
            style={{ fontSize: "var(--text-body-lg)" }}
          >
            Front CNC bezel, IP-67 silicone gasket, optical TIR lens, Nichia LED PCB, phase-change thermal interface, and die-cast aluminium housing — taken apart. The same instrument standard runs through the entire range.
          </p>
        </Reveal>

        {/* Full-bleed exploded blueprint render */}
        <Reveal className="mt-10 sm:mt-12 reveal-image">
          <SpotlightCard
            spotlightColor="rgba(0, 240, 255, 0.08)"
            className="border hairline panel-cad relative rounded-2xl overflow-hidden p-5 sm:p-8 shadow-2xl bg-ink-900/60"
          >
            <div className="flex items-center justify-between mb-4 pb-3 border-b hairline">
              <span className="font-mono text-fog-400 tracking-wider text-[11px] uppercase flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-signal-500 animate-pulse" />
                Schematic: Maddog Rage · 9-Emitter Architecture
              </span>
              <span className="tnum text-fog-300 font-mono text-[11px] bg-ink-800 px-3 py-1 rounded border hairline">
                TIR OPTIC / IP-67
              </span>
            </div>
            <div className="relative aspect-[16/10] sm:aspect-[2.2/1] w-full bg-ink-950/70 rounded-xl overflow-hidden p-4">
              <Image
                src={rage.photometrics?.diagram || "/diagrams/cad-exploded.svg"}
                alt="Rage exploded assembly — front enclosure, IP-67 rated gasket, optical lens, LED PCB, thermal paste, aluminium housing, and stainless steel clamp"
                fill
                sizes="(min-width: 1280px) 1400px, 100vw"
                className="object-contain p-2"
              />
            </div>
            <div className="mt-4 pt-3 border-t hairline flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <p className="text-fog-400 font-mono text-xs">
                Exploded assembly — every sub-assembly serviceable with standard shop tools.
              </p>
              <Link
                href="/products/rage/"
                className="text-signal-400 hover:text-signal-300 group inline-flex items-center gap-1.5 font-medium tracking-wide transition-colors text-xs font-mono"
              >
                <span>Inspect Rage Specifications</span>
                <Arrow className="transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
            </div>
          </SpotlightCard>
        </Reveal>

        {/* Side-by-side dimension drawings */}
        <Reveal className="mt-8 sm:mt-10">
          <div className="grid gap-6 sm:grid-cols-2">
            <SpotlightCard
              spotlightColor="rgba(255, 255, 255, 0.06)"
              className="border hairline bg-ink-900/80 rounded-2xl p-5 sm:p-6 shadow-xl flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3 pb-2 border-b hairline">
                  <span className="font-mono text-fog-400 text-[11px] uppercase tracking-wider">Housing Dimensions: Rage</span>
                  <span className="font-mono text-signal-400 text-[11px] bg-signal-500/10 px-2 py-0.5 rounded border border-signal-500/20">
                    100mm ⌀ × 65mm D
                  </span>
                </div>
                <div className="relative aspect-[16/9] w-full bg-ink-950 rounded-xl p-3 overflow-hidden border hairline flex items-center justify-center">
                  <Image
                    src={rage.dimensions?.blueprint || "/diagrams/cad-blueprint.svg"}
                    alt="Rage dimensions — 65 mm depth, 100 mm face diameter"
                    fill
                    sizes="(min-width: 640px) 50vw, 100vw"
                    className="object-contain p-2"
                  />
                </div>
              </div>
              <div className="mt-4 pt-3 border-t hairline flex items-center justify-between">
                <p className="text-fog-400 text-xs font-mono">80% Spot / 20% Flood Collimated</p>
                <Link
                  href="/products/rage/"
                  className="text-bone hover:text-signal-400 group inline-flex items-center gap-1.5 transition-colors text-xs font-mono"
                >
                  View Rage
                  <Arrow className="transition-transform duration-200 group-hover:translate-x-1" />
                </Link>
              </div>
            </SpotlightCard>

            <SpotlightCard
              spotlightColor="rgba(255, 255, 255, 0.06)"
              className="border hairline bg-ink-900/80 rounded-2xl p-5 sm:p-6 shadow-xl flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3 pb-2 border-b hairline">
                  <span className="font-mono text-fog-400 text-[11px] uppercase tracking-wider">Housing Dimensions: Lycan</span>
                  <span className="font-mono text-amber-400 text-[11px] bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                    100×112mm × 65mm D
                  </span>
                </div>
                <div className="relative aspect-[16/9] w-full bg-ink-950 rounded-xl p-3 overflow-hidden border hairline flex items-center justify-center">
                  <Image
                    src={lycan.dimensions?.blueprint || "/diagrams/cad-blueprint.svg"}
                    alt="Lycan dimensions — 65 mm depth, 100 by 112 mm face"
                    fill
                    sizes="(min-width: 640px) 50vw, 100vw"
                    className="object-contain p-2"
                  />
                </div>
              </div>
              <div className="mt-4 pt-3 border-t hairline flex items-center justify-between">
                <p className="text-fog-400 text-xs font-mono">Dual-Mode Amber &amp; White</p>
                <Link
                  href="/products/lycan/"
                  className="text-bone hover:text-signal-400 group inline-flex items-center gap-1.5 transition-colors text-xs font-mono"
                >
                  View Lycan
                  <Arrow className="transition-transform duration-200 group-hover:translate-x-1" />
                </Link>
              </div>
            </SpotlightCard>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}


