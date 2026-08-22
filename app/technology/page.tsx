import type { Metadata } from "next";
import Image from "next/image";
import CountUp from "@/components/animations/CountUp";
import Parallax from "@/components/animations/Parallax";
import Tilt from "@/components/animations/Tilt";
import Reveal from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Technology & Engineering — Maddog",
  description:
    "TIR optics, 5000K daylight color science, 6063-T6 CNC billet housings, and IP67 weather sealing.",
};

/* Beam-gradient headline line — the mockup's second hero line. */
const beamLine: React.CSSProperties = {
  backgroundImage:
    "linear-gradient(180deg, var(--color-beam-bright) 0%, var(--color-beam) 45%, color-mix(in srgb, var(--color-beam) 30%, transparent) 100%)",
  WebkitBackgroundClip: "text",
  backgroundClip: "text",
  color: "transparent",
};

const PILLARS: {
  figure: string;
  count?: number;
  suffix?: string;
  title: string;
  body: string;
}[] = [
  {
    figure: "5000K",
    count: 5000,
    suffix: "K",
    title: "True daylight colour",
    body: "Pure daylight white — not the blue-cast 6500K of grey-import LEDs. Colour your eyes resolve texture in.",
  },
  {
    figure: "TIR",
    title: "Anti-glare optics",
    body: "Total-internal-reflection collimators put light on the road with a hard cutoff — first in India engineered not to blind oncoming traffic.",
  },
  {
    figure: "6063-T6",
    title: "Billet CNC chassis",
    body: "Machined from aerospace billet aluminium, not cast — the housing is the heatsink.",
  },
  {
    figure: "IP-67",
    title: "Submersion sealed",
    body: "Silicone-gasketed against dust and submersion. 50,000+ operating hours, 18-month replacement warranty.",
  },
];

const PHOTOMETRICS = [
  {
    eyebrow: "Optical benchmark",
    title: "Iso-Lux beam profile",
    src: "/diagrams/isolux-profile.svg",
    alt: "Iso-lux beam profile",
    caption:
      "Collimated optical throw distribution focusing 80% luminous intensity onto the road surface.",
    lightPlate: true,
  },
  {
    eyebrow: "Lycan · dual-mode array",
    title: "Dual-mode beam separation",
    src: "/media/photometrics_images/MDL/photometrics_1786283198_6222650.webp",
    alt: "Lycan dual-mode beam separation",
    caption:
      "Independent electronic optical gating for 3000K selective yellow fog and 5000K high-beam projection.",
    lightPlate: false,
  },
];

export default function TechnologyPage() {
  return (
    <article className="min-h-screen overflow-x-clip bg-[var(--color-night-950)] text-[var(--color-white)]">
      {/* ── Act 1 · typographic hero (no image, by design) ── */}
      <section className="relative overflow-hidden pt-32 sm:pt-44">
        <div
          aria-hidden
          className="pointer-events-none absolute -left-[10%] -right-[10%] -top-[45%] h-[80%]"
          style={{
            background:
              "radial-gradient(50% 60% at 50% 0%, color-mix(in srgb, var(--color-beam) 13%, transparent) 0%, transparent 65%)",
          }}
        />
        <div className="relative mx-auto w-full max-w-7xl px-6 sm:px-12">
          <Reveal className="flex items-center gap-4">
            <span className="h-px w-7 bg-[var(--glass-stroke)]" aria-hidden />
            <span className="readout text-[0.6875rem] uppercase tracking-[0.28em]">
              Technology &amp; engineering
            </span>
          </Reveal>

          <h1
            className="mt-6 uppercase text-[var(--color-white)]"
            style={{
              fontSize: "var(--text-page-title)",
              fontWeight: "var(--fw-page-title)",
              letterSpacing: "var(--ls-page-title)",
              lineHeight: 0.92,
            }}
          >
            Under the
            <br />
            <span style={beamLine}>housing.</span>
          </h1>

          <Reveal>
            <p
              className="mt-7 max-w-[52ch] text-[var(--color-grey-300)] leading-relaxed"
              style={{ fontSize: "var(--text-body)" }}
            >
              Every Maddog auxiliary light is precision CNC machined from aerospace billet
              aluminium and engineered around true 5000K TIR optics.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── Act 2 · four engineering pillars ── */}
      <section className="pt-[var(--section)]">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-[18px] px-6 sm:grid-cols-2 sm:px-12 lg:grid-cols-4">
          {PILLARS.map((p, i) => (
            <Reveal key={p.figure} delay={i * 60} className="h-full">
              <div className="h-full rounded-[var(--radius-card)] border border-[var(--glass-stroke)] bg-[var(--color-night-900)] p-7">
                <div className="readout text-[2rem] leading-none text-[var(--color-beam)]">
                  {p.count ? (
                    <CountUp to={p.count} suffix={p.suffix} separator="" />
                  ) : (
                    p.figure
                  )}
                </div>
                <h3
                  className="mt-3 text-[var(--color-white)]"
                  style={{ fontSize: "var(--text-title)", fontWeight: 560 }}
                >
                  {p.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--color-grey-500)]">
                  {p.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── Act 3 · exploded render ── */}
      <section className="pt-[var(--section)]">
        <div className="mx-auto max-w-7xl px-6 sm:px-12">
          <Reveal className="mb-7 flex flex-wrap items-baseline justify-between gap-6">
            <div>
              <span className="readout text-[0.6875rem] uppercase tracking-[0.28em] text-[var(--color-beam)]">
                Rage · 9-emitter array
              </span>
              <h2
                className="mt-3.5 uppercase text-[var(--color-white)]"
                style={{
                  fontSize: "var(--text-statement)",
                  fontWeight: "var(--fw-statement)",
                  letterSpacing: "var(--ls-statement)",
                  lineHeight: 1,
                }}
              >
                Optical sub-assembly architecture
              </h2>
            </div>
            <span className="readout text-[0.6875rem] tracking-[0.1em]">
              8000 × 4000 schematic
            </span>
          </Reveal>

          <Reveal>
            <div className="relative aspect-[2/1] w-full overflow-hidden rounded-[var(--radius-card)] border border-[var(--glass-stroke)] bg-[var(--color-night-900)]">
              <Parallax speed={0.1} className="absolute inset-x-0 -inset-y-[8%]">
                <div className="relative h-full w-full">
                  <Image
                    src="/media/photometrics_images/MDR/photometrics_1752757254_8652497.webp"
                    alt="Maddog Rage exploded photometric schematic"
                    fill
                    sizes="100vw"
                    quality={90}
                    className="object-cover object-center"
                  />
                </div>
              </Parallax>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Act 4 · photometric distribution ── */}
      <section className="pt-[var(--section)] pb-[var(--section)]">
        <div className="mx-auto max-w-7xl px-6 sm:px-12">
          <Reveal className="mb-9">
            <span className="readout text-[0.6875rem] uppercase tracking-[0.28em]">
              Photometrics
            </span>
            <h2
              className="mt-4 uppercase text-[var(--color-white)]"
              style={{
                fontSize: "var(--text-statement)",
                fontWeight: "var(--fw-statement)",
                letterSpacing: "var(--ls-statement)",
                lineHeight: 1,
              }}
            >
              Photometric distribution
            </h2>
            <p
              className="mt-4 max-w-[52ch] text-[var(--color-grey-300)] leading-relaxed"
              style={{ fontSize: "var(--text-body)" }}
            >
              Calibrated beam profiles engineered for long-distance punch without scattering glare
              into oncoming drivers.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 gap-[18px] md:grid-cols-2">
            {PHOTOMETRICS.map((item, i) => (
              <Reveal key={item.title} delay={i * 80}>
                <Tilt
                  className={`relative flex aspect-[16/10] items-center justify-center overflow-hidden rounded-[var(--radius-card)] border border-[var(--glass-stroke)] ${
                    item.lightPlate
                      ? "bg-[var(--color-plate)]"
                      : "bg-[var(--color-night-950)]"
                  }`}
                >
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className={item.lightPlate ? "object-contain p-[5%]" : "object-cover"}
                  />
                </Tilt>
                <div className="mt-3.5">
                  <span className="readout text-[0.625rem] uppercase tracking-[0.22em] text-[var(--color-beam)]">
                    {item.eyebrow}
                  </span>
                  <h3
                    className="mt-1.5 text-[var(--color-white)]"
                    style={{ fontSize: "var(--text-title)", fontWeight: 560 }}
                  >
                    {item.title}
                  </h3>
                  <p className="mt-1.5 text-[var(--text-meta)] leading-relaxed text-[var(--color-grey-500)]">
                    {item.caption}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </article>
  );
}
