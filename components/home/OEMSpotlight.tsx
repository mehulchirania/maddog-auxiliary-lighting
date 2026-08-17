import Image from "next/image";
import Link from "next/link";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import { getProduct } from "@/lib/products";

export default function OEMSpotlight() {
  const terra = getProduct("terra-vision-f77") || getProduct("rage");

  return (
    <section className="bg-ink-950 text-bone border-t hairline relative overflow-hidden py-18 sm:py-24">
      <Container wide>
        <Reveal>
          <div className="border hairline bg-gradient-to-br from-ink-900 via-ink-900/90 to-ink-950 rounded-3xl p-6 sm:p-10 lg:p-12 shadow-2xl relative overflow-hidden">
            {/* Subtle glow accent */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-signal-600/10 rounded-full blur-3xl pointer-events-none" />

            <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
              {/* Left Column: Story & Specs */}
              <div className="lg:col-span-7">
                <div className="flex items-center gap-3 mb-4">
                  <span className="eyebrow text-signal-500 font-mono text-xs">Official OEM Partnership</span>
                  <span className="font-mono text-[10px] text-fog-300 bg-ink-950 border hairline px-2 py-0.5 rounded">
                    Ultraviolette × Maddog
                  </span>
                </div>

                <h2
                  className="font-display text-bone leading-[1.05]"
                  style={{
                    fontSize: "var(--text-h1)",
                    fontWeight: "var(--fw-h1)",
                  }}
                >
                  Terra Vision — Co-Engineered for Electric Hyper-Mobility
                </h2>

                <p className="text-fog-300 mt-4 leading-relaxed max-w-xl text-sm sm:text-base">
                  When Ultraviolette sought dedicated auxiliary lighting for the F77 Mach 2, they chose Maddog’s precision optics. Engineered with wide-voltage DC-DC step-down controllers and aerodynamic CNC mounting brackets that contour perfectly to EV chassis lines.
                </p>

                {/* Spec Badges */}
                <div className="grid grid-cols-3 gap-3 my-6 pt-2 border-t hairline max-w-lg">
                  <div>
                    <span className="text-fog-500 font-mono text-[10px] uppercase block">Output</span>
                    <span className="tnum font-mono font-semibold text-bone text-base">10,800 lm</span>
                  </div>
                  <div>
                    <span className="text-fog-500 font-mono text-[10px] uppercase block">Voltage</span>
                    <span className="tnum font-mono font-semibold text-bone text-base">9V – 32V DC</span>
                  </div>
                  <div>
                    <span className="text-fog-500 font-mono text-[10px] uppercase block">Chassis Fit</span>
                    <span className="tnum font-mono font-semibold text-signal-400 text-base">F77 Mach 2</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4 pt-2">
                  <Link
                    href="/fit/"
                    className="inline-flex items-center justify-center gap-2 bg-signal-600 hover:bg-signal-700 text-bone px-6 py-3 rounded-lg text-xs font-medium uppercase tracking-wider transition-colors shadow-sm"
                  >
                    <span>Configure EV Fitment</span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </Link>

                  <Link
                    href="/technology/"
                    className="inline-flex items-center justify-center gap-2 bg-ink-950 hover:bg-ink-800 border hairline text-fog-200 hover:text-bone px-5 py-3 rounded-lg text-xs font-medium uppercase tracking-wider transition-colors"
                  >
                    <span>Inspect EV Power Architecture</span>
                  </Link>
                </div>
              </div>

              {/* Right Column: Visual Product Box */}
              <div className="lg:col-span-5 flex items-center justify-center">
                <div className="relative aspect-square w-full max-w-md rounded-2xl bg-ink-950/90 border hairline p-8 flex items-center justify-center shadow-inner group">
                  <div className="absolute top-4 left-4 font-mono text-[10px] text-fog-500 uppercase tracking-wider">
                    Chassis Architecture / F77
                  </div>
                  <div className="absolute bottom-4 right-4 font-mono text-[10px] text-signal-400">
                    Nichia TIR Pods
                  </div>
                  {terra && (
                    <Image
                      src={terra.hero}
                      alt="Terra Vision F77 Auxiliary Lighting"
                      fill
                      className="object-contain p-8 transition-transform duration-500 group-hover:scale-105"
                      sizes="(min-width: 1024px) 380px, 90vw"
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
