import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import Cta from "@/components/ui/Cta";
import AggregateStats from "@/components/proof/AggregateStats";
import CreatorWall from "@/components/proof/CreatorWall";
import Testimonials from "@/components/proof/Testimonials";
import { aggregate } from "@/lib/proof";

export const metadata: Metadata = {
  title: "Rider Proof & Reviews — Maddog Auxiliary Lighting",
  description:
    "18 independent motovlogging channels reviewed Maddog's Alpha and Scout-X lights unprompted. Real customer testimonials and aggregate figures.",
};

export default function ProofPage() {
  return (
    <div className="bg-ink-950 text-bone">
      {/* Header */}
      <Container style={{ paddingTop: "var(--section-lg)", paddingBottom: "var(--section)" }}>
        <p className="eyebrow text-signal-500 mb-4">Independent Track Record</p>
        <h1
          className="font-display max-w-3xl leading-[1.02]"
          style={{
            fontSize: "var(--text-display)",
            fontWeight: "var(--fw-display)",
            letterSpacing: "var(--ls-display)",
          }}
        >
          An independent review record, not a staged highlight reel.
        </h1>
        <p
          className="text-fog-300 mt-6 max-w-2xl leading-relaxed"
          style={{ fontSize: "var(--text-body-lg)" }}
        >
          {aggregate.creatorCount} motovlogging channels published extensive real-world reviews of Maddog auxiliary lights, and riders have logged {aggregate.totalReviews} verified reviews. Transparent track records across thousands of night miles.
        </p>
      </Container>

      {/* Aggregate Stats */}
      <Container style={{ paddingBottom: "var(--section)" }}>
        <Reveal>
          <div className="border hairline rounded-xl overflow-hidden shadow-sm">
            <AggregateStats />
          </div>
        </Reveal>
      </Container>

      {/* Creator Wall */}
      <div className="bg-ink-900/40 border-y hairline">
        <Container style={{ paddingTop: "var(--section)", paddingBottom: "var(--section)" }}>
          <Reveal>
            <SectionHeading
              eyebrow="Creator reviews"
              title="Eighteen Independent Motovloggers"
              lede="Unsponsored real-world reviews spanning thousands of highway, off-road, and night touring kilometres."
            />
          </Reveal>

          <Reveal delay={100} className="mt-10 sm:mt-12">
            <CreatorWall />
          </Reveal>
        </Container>
      </div>

      {/* Customer Testimonials */}
      <Container style={{ paddingTop: "var(--section)", paddingBottom: "var(--section)" }}>
        <Reveal>
          <SectionHeading
            eyebrow="Customer reviews"
            title="From Verified Maddog Riders"
            lede="Unfiltered telemetry and real feedback directly from the motorcycle community."
          />
        </Reveal>

        <Reveal delay={100} className="mt-10 sm:mt-12">
          <Testimonials />
        </Reveal>
      </Container>

      {/* Bottom CTA */}
      <div className="border-t hairline bg-ink-950">
        <Container style={{ paddingTop: "var(--section)", paddingBottom: "var(--section-lg)" }}>
          <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="font-display text-bone font-medium" style={{ fontSize: "var(--text-h2)" }}>
                Read the engineering behind what these riders are reviewing.
              </h3>
              <p className="text-fog-400 mt-2" style={{ fontSize: "var(--text-body)" }}>
                Explore the TIR optics, Nichia emitters, and IP-67 waterproofing.
              </p>
            </div>
            <div className="flex flex-wrap gap-4">
              <Cta href="/technology/">See the technology</Cta>
              <Cta href="/lights/" variant="outline">Explore the Range</Cta>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
}

