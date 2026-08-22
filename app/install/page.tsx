import type { Metadata } from "next";
import Image from "next/image";
import Parallax from "@/components/animations/Parallax";
import Reveal from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Installation & Aiming Guide — Maddog",
  description: "Plug-and-play wiring instructions, harness routing, and 1.5-degree optical aiming protocol.",
};

const beamLine: React.CSSProperties = {
  background:
    "linear-gradient(180deg, var(--color-beam-bright) 0%, var(--color-beam) 45%, color-mix(in srgb, var(--color-beam) 30%, transparent) 100%)",
  WebkitBackgroundClip: "text",
  backgroundClip: "text",
  color: "transparent",
};

const AIM_READOUT = [
  { value: "5 m", label: "from wall" },
  { value: "−7.5 cm", label: "cutoff below lens height" },
  { value: "1.5°", label: "downward tilt" },
];

export default function InstallPage() {
  return (
    <article className="bg-[var(--color-night-950)] text-[var(--color-white)] min-h-screen">
      {/* Hero — real mounted-light photo, full opacity, localized left scrim */}
      <section className="relative min-h-[46svh] w-full flex items-end overflow-hidden border-b border-[var(--glass-stroke)] pt-28 pb-14 sm:pt-32 sm:pb-16">
        <div className="absolute inset-0 z-0">
          {/* Mockup drifts this behind the copy at 0.12; the frame is overscanned
              vertically so the translate never exposes an edge. */}
          <Parallax speed={0.12} className="absolute inset-x-0 -inset-y-[8%]">
            <Image
              src="/media/products/MDR/original/product_1752410420_2104310.webp"
              alt="Maddog Rage light clamp-mounted to a motorcycle fork tube, cable routed down the yoke"
              fill
              sizes="100vw"
              priority
              className="object-cover object-[62%_42%]"
            />
          </Parallax>
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(90deg, rgba(10,10,11,0.94) 0%, rgba(10,10,11,0.55) 40%, transparent 75%)",
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(10,10,11,0.5) 0%, transparent 40%, var(--color-night-950) 100%)",
            }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-12 w-full">
          <p className="readout uppercase tracking-[0.28em] text-[0.6875rem]">Installation guide</p>
          <h1
            className="mt-4 text-[var(--color-white)] leading-[1.02]"
            style={{
              fontSize: "var(--text-subpage-title)",
              fontWeight: "var(--fw-subpage-title)",
              letterSpacing: "var(--ls-subpage-title)",
            }}
          >
            Installation &amp;
            <br />
            <span style={beamLine}>aiming protocol.</span>
          </h1>
          <p
            className="mt-5 text-[var(--color-grey-300)] max-w-[52ch] leading-relaxed"
            style={{ fontSize: "var(--text-body)" }}
          >
            Plug-and-play solid-state wiring harnesses with zero wire splicing, paired with precision beam leveling guidelines.
          </p>
        </div>
      </section>

      {/* Narrow single-column protocol stack */}
      <section className="max-w-[36rem] mx-auto px-6 py-16 sm:py-24 flex flex-col gap-14">
        <Reveal>
          <span className="readout block uppercase tracking-[0.22em] text-[0.6875rem] sm:text-[0.625rem] text-[var(--color-beam)]">
            Protocol 01
          </span>
          <h2 className="mt-2.5 text-[1.375rem] font-semibold tracking-[-0.01em] text-[var(--color-white)]">
            Wiring Harness Pro integration
          </h2>
          <p
            className="mt-3.5 text-[var(--color-grey-300)] leading-relaxed"
            style={{ fontSize: "var(--text-body)" }}
          >
            Mount the solid-state relay securely under the motorcycle seat or behind the chassis side panel. Connect the fused red eyelet directly to the battery positive (+12V) and black eyelet to battery ground (−). Route the waterproof switch loom along the frame spine to the handlebars without pinching.
          </p>
        </Reveal>

        <Reveal>
          <span className="readout block uppercase tracking-[0.22em] text-[0.6875rem] sm:text-[0.625rem] text-[var(--color-beam)]">
            Protocol 02
          </span>
          <h2 className="mt-2.5 text-[1.375rem] font-semibold tracking-[-0.01em] text-[var(--color-white)]">
            Delphi weatherproof connections
          </h2>
          <p
            className="mt-3.5 text-[var(--color-grey-300)] leading-relaxed"
            style={{ fontSize: "var(--text-body)" }}
          >
            Route the twin output leads to your left and right crash guard clamps. Push the Delphi connectors into each light pod until the internal locking tab snaps firmly. Secure all free cabling with UV-stabilized zip ties away from direct exhaust heat.
          </p>
        </Reveal>

        <Reveal>
          <span className="readout block uppercase tracking-[0.22em] text-[0.6875rem] sm:text-[0.625rem] text-[var(--color-beam)]">
            Protocol 03
          </span>
          <h2 className="mt-2.5 text-[1.375rem] font-semibold tracking-[-0.01em] text-[var(--color-white)]">
            1.5° downward optical aiming
          </h2>
          <p
            className="mt-3.5 text-[var(--color-grey-300)] leading-relaxed"
            style={{ fontSize: "var(--text-body)" }}
          >
            Position the motorcycle on level ground exactly 5 metres from a vertical wall. Measure the height from ground to the center of your light lens (H). Mark this line on the wall with tape, then place a second mark 7.5 cm below it. Tilt the light pod so the upper cutoff edge of the 5000K beam stays strictly at or below the lower tape mark.
          </p>
          <div className="mt-5 flex flex-wrap gap-x-8 gap-y-5 rounded-[var(--radius-card)] border border-[var(--glass-stroke)] bg-[var(--color-night-900)] px-6 py-5">
            {AIM_READOUT.map((item) => (
              <div key={item.label}>
                <div className="readout text-[1.25rem] leading-none text-[var(--color-beam)]">
                  {item.value}
                </div>
                <div className="readout mt-2 uppercase tracking-[0.18em] text-[0.5625rem] leading-tight">
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal>
          <span className="readout block uppercase tracking-[0.22em] text-[0.6875rem] sm:text-[0.625rem] text-[var(--color-beam)]">
            Torque specification
          </span>
          <h2 className="mt-2.5 text-[1.375rem] font-semibold tracking-[-0.01em] text-[var(--color-white)]">
            Fastener security
          </h2>
          <p
            className="mt-3.5 text-[var(--color-grey-300)] leading-relaxed"
            style={{ fontSize: "var(--text-body)" }}
          >
            Tighten the stainless steel 304 bracket pivot bolts to 18 Nm using a calibrated hex key. Re-check clamp tightness after the first 100 km of road vibration.
          </p>
        </Reveal>
      </section>
    </article>
  );
}
