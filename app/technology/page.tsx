import type { Metadata } from "next";
import Image from "next/image";
import CadExplodedScene from "@/components/tech/CadExplodedScene";
import Lightbox from "@/components/ui/Lightbox";

export const metadata: Metadata = {
  title: "Technology & Engineering — Maddog",
  description:
    "TIR optics, 5000K daylight color science, 6063-T6 CNC billet housings, and IP67 weather sealing.",
};

const PHOTOMETRIC_DIAGRAMS = [
  {
    title: "Iso-Lux Beam Profile",
    sku: "OPTICAL BENCHMARK",
    src: "/diagrams/isolux-profile.svg",
    caption: "Collimated optical throw distribution focusing 80% luminous intensity onto the road surface.",
    isLightDiagram: true,
  },
  {
    title: "Dual-Mode Beam Separation",
    sku: "LYCAN · dual-mode array",
    src: "/media/photometrics_images/MDL/photometrics_1786283198_6222650.webp",
    caption: "Independent electronic optical gating for 3000K selective yellow fog and 5000K high-beam projection.",
    isLightDiagram: false,
  },
];

export default function TechnologyPage() {
  return (
    <article className="bg-[var(--color-night-950)] text-[var(--color-white)] min-h-screen">
      {/* Typographic hero — the 8K exploded render gets its due prominence in the
          Centerpiece section below at full scale; reusing it here as a small
          object-contain crop only made its content unreadable, so this band
          stays type-only, matching the /fit/ page's hero pattern. */}
      <section className="border-b border-[var(--glass-stroke)] bg-[var(--color-night-950)] py-14 sm:py-20">
        <div className="max-w-7xl mx-auto px-6 sm:px-12 w-full">
          <h1
            className="text-[var(--color-white)] tracking-tight"
            style={{
              fontSize: "var(--text-page-title)",
              fontWeight: "var(--fw-page-title)",
              letterSpacing: "var(--ls-page-title)",
            }}
          >
            Under the housing.
          </h1>
          <p
            className="mt-3 text-[var(--color-grey-300)] max-w-lg leading-relaxed"
            style={{ fontSize: "var(--text-body)" }}
          >
            Every Maddog auxiliary light is precision CNC machined from aerospace billet aluminum and engineered around true 5000K TIR optics.
          </p>
        </div>
      </section>

      {/* CAD Exploded Assembly — static annotated diagram + callout cards */}
      <section className="border-b border-[var(--glass-stroke)]">
        <div className="max-w-7xl mx-auto px-6 sm:px-12 pt-16 pb-6">
          <h2
            className="font-[520] text-[var(--color-white)] tracking-tight"
            style={{ fontSize: "var(--text-statement)", letterSpacing: "var(--ls-statement)" }}
          >
            Exploded CAD architecture.
          </h2>
        </div>
        <CadExplodedScene />
      </section>

      {/* Centerpiece: Full-Width 8000x4000 Exploded Rage Render */}
      <section className="py-20 sm:py-28 bg-[var(--color-night-950)] border-b border-[var(--glass-stroke)]">
        <div className="max-w-7xl mx-auto px-6 sm:px-12">
          <div className="mb-6 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
            <div>
              <span className="readout text-xs text-[var(--color-beam)]">RAGE · 9-emitter array</span>
              <h2
                className="font-[520] text-[var(--color-white)] tracking-tight mt-1"
                style={{ fontSize: "var(--text-statement)", letterSpacing: "var(--ls-statement)" }}
              >
                Optical sub-assembly architecture.
              </h2>
            </div>
            <span className="readout text-xs text-[var(--color-grey-500)]">Click to zoom full 8K schematic ↗</span>
          </div>

          <Lightbox
            src="/media/photometrics_images/MDR/photometrics_1752757254_8652497.webp"
            alt="Maddog Rage 8K Exploded Photometric Schematic"
          >
            <div className="relative aspect-[2/1] w-full rounded-[var(--radius-card)] overflow-hidden bg-[var(--color-night-900)] border border-[var(--glass-stroke)] shadow-2xl">
              <Image
                src="/media/photometrics_images/MDR/photometrics_1752757254_8652497.webp"
                alt="Maddog Rage Exploded Architecture"
                fill
                sizes="100vw"
                quality={90}
                className="object-cover object-center"
              />
            </div>
          </Lightbox>
        </div>
      </section>

      {/* Photometrics Diagrams (2-Up Grid with correct background plates) */}
      <section className="py-20 sm:py-28 bg-[var(--color-night-900)] border-b border-[var(--glass-stroke)]">
        <div className="max-w-7xl mx-auto px-6 sm:px-12">
          <h2
            className="font-[520] text-[var(--color-white)] tracking-tight mb-4"
            style={{ fontSize: "var(--text-statement)", letterSpacing: "var(--ls-statement)" }}
          >
            Photometric distribution.
          </h2>
          <p className="text-[var(--color-grey-300)] max-w-xl mb-12" style={{ fontSize: "var(--text-body)" }}>
            Calibrated beam profiles engineered for long-distance punch without scattering glare into oncoming drivers.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12">
            {PHOTOMETRIC_DIAGRAMS.map((item) => (
              <div key={item.title} className="flex flex-col gap-4">
                <Lightbox src={item.src} alt={item.title}>
                  <div
                    className={`relative aspect-[16/10] rounded-[var(--radius-card)] overflow-hidden border border-[var(--glass-stroke)] shadow-lg flex items-center justify-center ${
                      item.isLightDiagram ? "bg-[var(--color-plate)] p-6" : "bg-[var(--color-night-950)]"
                    }`}
                  >
                    <Image
                      src={item.src}
                      alt={item.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className={item.isLightDiagram ? "object-contain p-4" : "object-cover"}
                    />
                  </div>
                </Lightbox>
                <div>
                  <span className="readout text-xs text-[var(--color-beam)]">{item.sku}</span>
                  <h3 className="text-base font-semibold text-white mt-1">{item.title}</h3>
                  <p className="text-xs text-[var(--color-grey-500)] mt-1.5 leading-relaxed">
                    {item.caption}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </article>
  );
}
