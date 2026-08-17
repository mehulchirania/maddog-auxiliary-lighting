import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { ladder } from "@/lib/products";
import { heroBanner } from "@/lib/media";
import RangeLadder from "@/components/range/RangeLadder";
import CompareTable from "@/components/range/CompareTable";

export const metadata: Metadata = {
  title: "The Range — Maddog Auxiliary Lighting",
  description:
    "Six auxiliary lights, laid out by output. Lumens, watts, beam distance and spot/flood split, compared side by side.",
};

export default function LightsPage() {
  return (
    <>
      {/* Hero Header */}
      <div className="bg-ink-950 text-bone">
        <div className="relative aspect-[3/1] min-h-[260px] w-full overflow-hidden sm:aspect-[3.5/1]">
          <Image
            src={heroBanner.src}
            alt={heroBanner.alt}
            fill
            sizes="100vw"
            priority
            className="object-cover object-right opacity-85"
          />
          <div
            aria-hidden="true"
            className="from-ink-950 via-ink-950/60 absolute inset-0 bg-gradient-to-t to-transparent"
          />
        </div>

        <Container className="pt-8 pb-14 sm:pt-10 sm:pb-16">
          <Reveal>
            <p className="eyebrow text-signal-500 mb-3">Auxiliary Lighting Catalogue</p>
            <h1
              className="font-display max-w-2xl leading-[1.03]"
              style={{
                fontSize: "var(--text-display)",
                fontWeight: "var(--fw-display)",
                letterSpacing: "var(--ls-display)",
              }}
            >
              Six lights. One ladder.
            </h1>
            <p
              className="text-fog-300 mt-5 max-w-2xl leading-relaxed"
              style={{ fontSize: "var(--text-body-lg)" }}
            >
              Climb it by output, not by price. Every model runs the same 5000K anti-glare TIR
              optics — engineered to be seen with, not seen through. What changes rung to rung is
              how far the beam reaches, how it is shaped, and how much control you get over it.
            </p>
          </Reveal>
        </Container>
      </div>

      {/* The Interactive Filterable Ladder */}
      <RangeLadder ladder={ladder} />

      {/* Side by side full specs comparison */}
      <div className="bg-paper-1 border-t border-ink-900/10">
        <Container wide className="py-16 sm:py-24">
          <Reveal>
            <SectionHeading
              eyebrow="Side by side telemetry"
              title="Every specification, every model."
              lede="Scroll to compare all six auxiliary lights on one row per metric."
              tone="light"
            />
          </Reveal>
          <Reveal className="mt-10 sm:mt-12">
            <CompareTable />
          </Reveal>
        </Container>
      </div>

      {/* Fitment conversion bar */}
      <div className="bg-paper-0 border-t border-ink-900/10">
        <Container className="py-12 sm:py-16">
          <Reveal className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div>
              <p className="font-display text-ink-950 font-semibold" style={{ fontSize: "var(--text-h3)" }}>
                Need help picking the exact setup for your motorcycle?
              </p>
              <p className="text-ink-600 mt-1" style={{ fontSize: "var(--text-body)" }}>
                Our fitment engine recommends the exact light, control switch and mount for your bike.
              </p>
            </div>
            <Link
              href="/fit/"
              className="inline-flex shrink-0 items-center gap-2 rounded-md bg-signal-600 hover:bg-signal-700 text-bone px-6 py-3 font-medium transition-colors shadow-sm"
              style={{ fontSize: "var(--text-caption)" }}
            >
              <span>Launch Bike Finder</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </Reveal>
        </Container>
      </div>
    </>
  );
}

