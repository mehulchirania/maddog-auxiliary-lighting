import Link from "next/link";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { FitStrip } from "@/components/fit/FitStrip";

const POPULAR_BRANDS = [
  { name: "Royal Enfield", models: "Himalayan 450, Hunter 350, Classic 350" },
  { name: "KTM", models: "390 Adventure, Duke 390, 250 Adventure" },
  { name: "BMW", models: "G 310 GS, R 1250 GS, F 850 GS" },
  { name: "Ultraviolette", models: "F77 Mach 2, X47" },
  { name: "Triumph", models: "Scrambler 400X, Speed 400, Tiger 900" },
  { name: "Honda", models: "Transalp 750, CB500X, H'ness CB350" },
];

export default function BikeFinderSection() {
  return (
    <section className="bg-ink-950 text-bone border-t hairline py-20 sm:py-24 relative overflow-hidden">
      <Container>
        <Reveal>
          <div className="max-w-3xl mb-10">
            <span className="eyebrow text-signal-500 mb-2 block">Chassis Fitment Engine</span>
            <h2
              className="font-display text-bone leading-[1.05]"
              style={{
                fontSize: "var(--text-h1)",
                fontWeight: "var(--fw-h1)",
                letterSpacing: "var(--ls-h1)",
              }}
            >
              Tell us what you ride.
            </h2>
            <p className="text-fog-300 mt-4 leading-relaxed" style={{ fontSize: "var(--text-body-lg)" }}>
              Pick your motorcycle manufacturer and chassis. Our fitment engine returns the exact auxiliary light, wiring harness, and anti-vibration mount engineered for your bike.
            </p>
          </div>
        </Reveal>

        <Reveal className="max-w-3xl">
          <FitStrip />
        </Reveal>

        {/* Quick Brand Badges */}
        <Reveal className="mt-8 pt-6 border-t hairline max-w-4xl">
          <span className="eyebrow text-fog-500 text-xs block mb-3">Popular Motorcycle Quick-Select:</span>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
            {POPULAR_BRANDS.map((b) => (
              <Link
                key={b.name}
                href={`/fit/`}
                className="p-3 rounded-xl border hairline bg-ink-900/80 hover:bg-ink-900 hover:border-signal-500/50 flex flex-col justify-between transition-all group shadow-sm hover:-translate-y-0.5"
              >
                <span className="font-display font-medium text-xs text-bone group-hover:text-signal-400 transition-colors">
                  {b.name}
                </span>
                <span className="text-[10px] text-fog-500 font-mono truncate mt-1">
                  Fit Setup →
                </span>
              </Link>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
