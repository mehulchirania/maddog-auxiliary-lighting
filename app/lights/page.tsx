import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import { heroBanner } from "@/lib/media";
import RangeCatalogue from "@/components/range/RangeCatalogue";

export const metadata: Metadata = {
  title: "The Range & Products — Maddog Auxiliary Lighting, Claw Mounts & Systems",
  description:
    "Explore the complete Maddog motorcycle ecosystem: 6-light output ladder, Claw smartphone mounts, CNC billet clamps, solid-state wiring harnesses, dimmers, and amber fog filters.",
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
            <p className="eyebrow text-signal-500 mb-3">Maddog Product Ecosystem</p>
            <h1
              className="font-display max-w-3xl leading-[1.03]"
              style={{
                fontSize: "var(--text-display)",
                fontWeight: "var(--fw-display)",
                letterSpacing: "var(--ls-display)",
              }}
            >
              Lights, Cockpit Mounts &amp; Power Systems.
            </h1>
            <p
              className="text-fog-300 mt-5 max-w-2xl leading-relaxed"
              style={{ fontSize: "var(--text-body-lg)" }}
            >
              Explore our complete motorcycle performance ecosystem. From the 6-light output ladder and Claw vibration-damped phone mounts to CNC billet clamps, solid-state wiring harnesses, and selective amber fog filters.
            </p>
          </Reveal>
        </Container>
      </div>

      {/* The Unified Ecosystem Catalogue with Claw Spotlight & Category Filters */}
      <RangeCatalogue />

      {/* Fitment conversion bar */}
      <div className="bg-paper-0 border-t hairline-ink">
        <Container className="py-12 sm:py-16">
          <Reveal className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div>
              <p className="font-display text-ink-950 font-semibold" style={{ fontSize: "var(--text-h3)" }}>
                Need help picking the exact setup for your motorcycle?
              </p>
              <p className="text-ink-600 mt-1" style={{ fontSize: "var(--text-body)" }}>
                Our fitment engine matches the exact light, control switch, and clamp diameter for your bike chassis.
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

