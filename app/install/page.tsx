import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Installation & Aiming Guide — Maddog",
  description: "Plug-and-play wiring instructions, harness routing, and 1.5-degree optical aiming protocol.",
};

export default function InstallPage() {
  return (
    <article className="bg-[var(--color-night-950)] text-[var(--color-white)] min-h-screen">
      {/* 40svh Dark Hero */}
      <section className="relative h-[40svh] min-h-[300px] w-full flex items-center overflow-hidden border-b border-[var(--glass-stroke)]">
        <div className="absolute inset-0 z-0">
          <Image
            src="/media/derived/hero-hardware-wide.webp"
            alt="Maddog Rage — CNC clamp, bolt and cable connector detail"
            fill
            sizes="100vw"
            priority
            className="object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-night-950)] via-[var(--color-night-950)]/70 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-12 w-full">
          <h1
            className="font-[520] text-[var(--color-white)] tracking-tight"
            style={{ fontSize: "var(--text-statement)", letterSpacing: "var(--ls-statement)" }}
          >
            Installation &amp; aiming protocol.
          </h1>
          <p
            className="mt-3 text-[var(--color-grey-300)] max-w-lg leading-relaxed"
            style={{ fontSize: "var(--text-body)" }}
          >
            Plug-and-play solid-state wiring harnesses with zero wire slicing, paired with precision beam leveling guidelines.
          </p>
        </div>
      </section>

      {/* Single 34rem column */}
      <section className="max-w-[34rem] mx-auto px-6 py-16 sm:py-24 space-y-12">
        <div>
          <span className="readout block mb-2">Protocol 01</span>
          <h2 className="text-xl font-semibold text-white mb-4">
            Wiring Harness Pro Integration
          </h2>
          <p className="text-[var(--color-grey-300)] leading-relaxed text-base">
            Mount the solid-state relay securely under the motorcycle seat or behind the chassis side panel. Connect the fused red eyelet directly to the battery positive (+12V) and black eyelet to battery ground (-). Route the waterproof switch loom along the frame spine to the handlebars without pinching.
          </p>
        </div>

        <div>
          <span className="readout block mb-2">Protocol 02</span>
          <h2 className="text-xl font-semibold text-white mb-4">
            Delphi Weatherproof Connections
          </h2>
          <p className="text-[var(--color-grey-300)] leading-relaxed text-base">
            Route the twin output leads to your left and right crash guard clamps. Push the Delphi connectors into each light pod until the internal locking tab snaps firmly. Secure all free cabling with UV-stabilized zip ties away from direct exhaust heat.
          </p>
        </div>

        <div>
          <span className="readout block mb-2">Protocol 03</span>
          <h2 className="text-xl font-semibold text-white mb-4">
            1.5° Downward Optical Aiming
          </h2>
          <p className="text-[var(--color-grey-300)] leading-relaxed text-base">
            Position the motorcycle on level ground exactly 5 metres from a vertical wall. Measure the height from ground to the center of your light lens (H). Mark this line on the wall with tape, then place a second mark 7.5 cm below it. Tilt the light pod so the upper cutoff edge of the 5000K beam stays strictly at or below the lower tape mark.
          </p>
        </div>

        <div>
          <span className="readout block mb-2">Torque Specification</span>
          <h2 className="text-xl font-semibold text-white mb-4">
            Fastener Security
          </h2>
          <p className="text-[var(--color-grey-300)] leading-relaxed text-base">
            Tighten the stainless steel 304 bracket pivot bolts to 18 Nm using a calibrated hex key. Re-check clamp tightness after the first 100 km of road vibration.
          </p>
        </div>
      </section>
    </article>
  );
}
