import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import FitFlow from "@/components/fit/FitFlow";

export const metadata: Metadata = {
  title: "Bike Finder & Fitment Studio — Maddog",
  description:
    "Pick your bike and get the light, control and mount Maddog recommends for it, with the reason for each.",
};

export default function FitPage() {
  return (
    <div className="bg-ink-950 text-bone min-h-[calc(100svh-4rem)]">
      <Container style={{ paddingTop: "var(--section)", paddingBottom: "var(--section-lg)" }}>
        <p className="eyebrow text-signal-500 mb-3">Motorcycle Compatibility Engine</p>
        <h1
          className="font-display max-w-2xl leading-[1.04]"
          style={{
            fontSize: "var(--text-display)",
            fontWeight: "var(--fw-display)",
            letterSpacing: "var(--ls-display)",
          }}
        >
          What do you ride?
        </h1>
        <p
          className="text-fog-300 mt-5 max-w-2xl leading-relaxed"
          style={{ fontSize: "var(--text-body-lg)" }}
        >
          Maddog sells lights, controls and mounts as an integrated electrical system, not an unverified parts bin.
          Select your manufacturer and model — our engine returns the exact optical throw, harness wiring, and mounting clamps your chassis requires.
        </p>

        <div className="mt-10 sm:mt-14">
          <FitFlow />
        </div>
      </Container>
    </div>
  );
}

