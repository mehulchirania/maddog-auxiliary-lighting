import Hero from "@/components/home/Hero";
import CategoryGrid from "@/components/home/CategoryGrid";
import TechnicalTeardown from "@/components/showcase/TechnicalTeardown";
import OEMSpotlight from "@/components/home/OEMSpotlight";
import BikeFinderSection from "@/components/home/BikeFinderSection";
import NoDiscounts from "@/components/home/NoDiscounts";
import AggregateStats from "@/components/proof/AggregateStats";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import Cta from "@/components/ui/Cta";

export default function Home() {
  return (
    <>
      {/* Band 1 — Hero with signature Bento Grid & Interactive Beam Simulator */}
      <Hero />

      {/* Band 2 — 4-Pillar Instrument Ecosystem */}
      <CategoryGrid />

      {/* Band 3 — Technical Teardown & CAD Exploded Assembly */}
      <TechnicalTeardown />

      {/* Band 4 — OEM Spotlight: Ultraviolette Automotive EV Partnership */}
      <OEMSpotlight />

      {/* Band 5 — Bike Finder & Motorcycle Chassis Matcher */}
      <BikeFinderSection />

      {/* Band 6 — Proof & Rider Records */}
      <div className="bg-ink-950 text-bone border-t hairline">
        <Container style={{ paddingTop: "var(--section)", paddingBottom: "var(--section-sm)" }}>
          <Reveal>
            <SectionHeading
              eyebrow="Independent proof"
              title="Eighteen channels took these apart before you did."
              lede="Maddog has been reviewed on its own merits by independent motovloggers across India, and carries an 18-month replacement warranty on every product."
            />
          </Reveal>

          <Reveal className="mt-12">
            <AggregateStats />
          </Reveal>

          <Reveal className="mt-8 flex flex-wrap items-center gap-4">
            <Cta href="/proof/" variant="secondary">
              Read 82+ Verified Reviews
            </Cta>
            <Cta href="/warranty/" variant="outline">
              Check 18-Mo Warranty
            </Cta>
          </Reveal>
        </Container>
      </div>

      {/* Band 7 — Pricing Manifesto */}
      <NoDiscounts />
    </>
  );
}
