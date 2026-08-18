import Image from "next/image";
import Link from "next/link";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { getProduct } from "@/lib/products";

const ECOSYSTEM_PILLARS = [
  {
    href: "/lights/",
    tag: "01 / LIGHTING",
    label: "Auxiliary Lights Ladder",
    blurb: "Six lights, one ladder. From 3,000 lm Scout to 11,600 lm Rage with 5000K anti-glare TIR optics.",
    product: getProduct("rage"),
    stat: "11,600 lm Peak",
  },
  {
    href: "/products/switch-pro-and-wire-harness-pro/",
    tag: "02 / CONTROL",
    label: "Power & Dimming Systems",
    blurb: "Switch Pro, Wire Harness Pro & Quad Dimmer. Solid-state relay protected, true plug & play.",
    product: getProduct("switch-pro-and-wire-harness-pro") || getProduct("dimmer"),
    stat: "Zero Wire Slicing",
  },
  {
    href: "/products/claw-x/",
    tag: "03 / COCKPIT",
    label: "Claw Vibration Mounts",
    blurb: "Engineered with internal silicone harmonic dampers to shield smartphone OIS cameras from high-RPM vibration.",
    product: getProduct("claw-x") || getProduct("claw-pro"),
    stat: "25W Qi + USB-C",
  },
  {
    href: "/lights/",
    tag: "04 / OPTICS",
    label: "Amber & Fog Filters",
    blurb: "Optical-grade 3000K selective yellow polycarbonate covers for rain, dense fog, and monsoon storm penetration.",
    product: getProduct("rage-lycan-filters") || getProduct("alpha-auxiliary-light-filters"),
    stat: "3000K Selective",
  },
];

export default function CategoryGrid() {
  return (
    <section className="bg-ink-950 text-bone border-t hairline relative overflow-hidden py-20 sm:py-24">
      {/* Background CAD grid accent */}
      <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#ea580c_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

      <Container wide className="relative">
        <Reveal>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12 sm:mb-14">
            <div className="max-w-2xl">
              <span className="eyebrow text-signal-500 mb-2 block">The Maddog Ecosystem</span>
              <h2
                className="font-display text-bone leading-[1.05]"
                style={{
                  fontSize: "var(--text-h1)",
                  fontWeight: "var(--fw-h1)",
                  letterSpacing: "var(--ls-h1)",
                }}
              >
                Engineered in Bengaluru. Built to connect.
              </h2>
              <p className="text-fog-400 mt-4 leading-relaxed" style={{ fontSize: "var(--text-body-lg)" }}>
                Four core categories designed to integrate seamlessly without wire splicing, frame drilling, or battery drain.
              </p>
            </div>

            <Link
              href="/lights/"
              className="inline-flex items-center gap-2 text-signal-400 hover:text-signal-300 font-mono text-xs uppercase tracking-wider transition-colors pb-1"
            >
              <span>Explore Complete Range</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </Reveal>

        <Reveal>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {ECOSYSTEM_PILLARS.map((cat) => {
              const p = cat.product;
              if (!p) return null;
              return (
                <Link
                  key={cat.tag}
                  href={cat.href}
                  className="group relative flex flex-col justify-between border hairline bg-ink-900/80 hover:bg-ink-900 rounded-2xl p-6 transition-all duration-300 hover:border-signal-500/50 hover:glow-orange hover:-translate-y-1"
                >
                  <div>
                    {/* Top Tag & Stat */}
                    <div className="flex items-center justify-between font-mono text-[11px] mb-4 pb-3 border-b hairline">
                      <span className="text-fog-500">{cat.tag}</span>
                      <span className="text-signal-400 bg-signal-600/10 px-2 py-0.5 rounded border border-signal-500/20 font-medium">
                        {cat.stat}
                      </span>
                    </div>

                    {/* Image Preview Container */}
                    <div className="relative aspect-square w-full rounded-xl bg-ink-950/80 border hairline overflow-hidden mb-5 flex items-center justify-center">
                      <Image
                        src={p.hero}
                        alt={`${p.name} — ${cat.label}`}
                        fill
                        sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                        className="object-contain p-5 transition-transform duration-300 ease-out group-hover:scale-105"
                      />
                    </div>

                    {/* Content */}
                    <h3 className="font-display text-bone font-medium text-lg leading-snug group-hover:text-signal-400 transition-colors">
                      {cat.label}
                    </h3>
                    <p className="text-fog-400 text-xs mt-2 leading-relaxed">
                      {cat.blurb}
                    </p>
                  </div>

                  <div className="mt-6 pt-3 border-t hairline flex items-center justify-between text-xs font-mono text-fog-500 group-hover:text-bone transition-colors">
                    <span>Inspect Category</span>
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      aria-hidden="true"
                      className="transition-transform duration-200 group-hover:translate-x-1"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </div>
                </Link>
              );
            })}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
