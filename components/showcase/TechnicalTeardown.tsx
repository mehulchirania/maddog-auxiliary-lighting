import Image from "next/image";
import Link from "next/link";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import { getProduct } from "@/lib/products";

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
          <p className="eyebrow text-signal-500">Under the housing</p>
          <h2
            className="font-display text-bone mt-3 max-w-2xl leading-[1.05]"
            style={{
              fontSize: "var(--text-h1)",
              fontWeight: "var(--fw-h1)",
              letterSpacing: "var(--ls-h1)",
            }}
          >
            Nine parts, one IP-67 seal.
          </h2>
          <p
            className="text-fog-300 mt-4 max-w-xl leading-relaxed"
            style={{ fontSize: "var(--text-body-lg)" }}
          >
            Front enclosure, IP-67 silicone gasket, optical TIR lens, Nichia LED PCB, thermal
            paste and die-cast aluminium housing — taken apart. The same instrument standard
            runs through the entire range.
          </p>
        </Reveal>

        {/* Full-bleed exploded blueprint render */}
        <Reveal className="mt-10 sm:mt-12 reveal-image">
          <div className="border hairline panel-cad relative rounded-xl overflow-hidden p-4 sm:p-8">
            <div className="flex items-center justify-between mb-4 pb-3 border-b hairline">
              <span className="font-mono text-fog-500 tracking-wider text-[11px] uppercase">
                Schematic: Maddog Rage · 9-Emitter Architecture
              </span>
              <span className="tnum text-fog-400 font-mono text-[11px] bg-ink-800 px-2.5 py-0.5 rounded border hairline">
                TIR OPTIC / IP-67
              </span>
            </div>
            <div className="relative aspect-[2.2/1] w-full">
              <Image
                src={rage.photometrics}
                alt="Rage exploded assembly — front enclosure, IP-67 rated gasket, optical lens, LED PCB, thermal paste, aluminium housing, and stainless steel clamp"
                fill
                sizes="(min-width: 1280px) 1400px, 100vw"
                className="object-contain"
              />
            </div>
            <div className="mt-4 pt-3 border-t hairline flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <p className="text-fog-400" style={{ fontSize: "var(--text-caption)" }}>
                Exploded assembly — every sub-assembly serviceable with standard shop tools.
              </p>
              <Link
                href="/products/rage/"
                className="text-signal-400 hover:text-signal-300 group inline-flex items-center gap-1.5 font-medium tracking-wide transition-colors"
                style={{ fontSize: "var(--text-caption)" }}
              >
                <span>Inspect Rage Specifications</span>
                <Arrow className="transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </Reveal>

        {/* Side-by-side dimension drawings */}
        <Reveal className="mt-8 sm:mt-10">
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="border hairline bg-ink-900 rounded-xl p-5">
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-fog-400 text-[11px] uppercase tracking-wider">Housing Dimensions: Rage</span>
                <span className="font-mono text-bone text-[11px]">100mm ⌀ × 65mm D</span>
              </div>
              <div className="relative aspect-[2/1] w-full bg-ink-950 rounded-lg p-2">
                <Image
                  src={rage.dimensions}
                  alt="Rage dimensions — 65 mm depth, 100 mm face diameter"
                  fill
                  sizes="(min-width: 640px) 50vw, 100vw"
                  className="object-contain p-2"
                />
              </div>
              <div className="mt-3 flex items-center justify-between">
                <p className="text-fog-400" style={{ fontSize: "var(--text-caption)" }}>90% Spot / 10% Flood combo</p>
                <Link
                  href="/products/rage/"
                  className="text-bone hover:text-signal-400 group inline-flex items-center gap-1.5 transition-colors"
                  style={{ fontSize: "var(--text-caption)" }}
                >
                  View Rage
                  <Arrow className="transition-transform duration-200 group-hover:translate-x-1" />
                </Link>
              </div>
            </div>

            <div className="border hairline bg-ink-900 rounded-xl p-5">
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-fog-400 text-[11px] uppercase tracking-wider">Housing Dimensions: Lycan</span>
                <span className="font-mono text-bone text-[11px]">100×112mm × 65mm D</span>
              </div>
              <div className="relative aspect-[2/1] w-full bg-ink-950 rounded-lg p-2">
                <Image
                  src={lycan.dimensions}
                  alt="Lycan dimensions — 65 mm depth, 100 by 112 mm face"
                  fill
                  sizes="(min-width: 640px) 50vw, 100vw"
                  className="object-contain p-2"
                />
              </div>
              <div className="mt-3 flex items-center justify-between">
                <p className="text-fog-400" style={{ fontSize: "var(--text-caption)" }}>Dual-mode independent switching</p>
                <Link
                  href="/products/lycan/"
                  className="text-bone hover:text-signal-400 group inline-flex items-center gap-1.5 transition-colors"
                  style={{ fontSize: "var(--text-caption)" }}
                >
                  View Lycan
                  <Arrow className="transition-transform duration-200 group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

