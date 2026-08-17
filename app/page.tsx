import Hero from "@/components/home/Hero";
import CategoryGrid from "@/components/home/CategoryGrid";
import TechnicalTeardown from "@/components/showcase/TechnicalTeardown";
import BikeFinderSection from "@/components/home/BikeFinderSection";
import NoDiscounts from "@/components/home/NoDiscounts";
import AggregateStats from "@/components/proof/AggregateStats";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import Cta from "@/components/ui/Cta";

/**
 * Homepage: 9 bands → 5 per §2.5.
 *
 * Band 1: Hero + beam comparison      (keep — signature full-height moment)
 * Band 2: CategoryGrid                (keep — primary navigation into catalogue)
 * Band 3: TechnicalTeardown (condensed) (cut 2,567px → ~900px — one render, not four)
 * Band 4: BikeFinderSection           (conversion tool, given real weight)
 * Band 5: Closing — proof stats + NoDiscounts manifesto
 *
 * Removed from homepage:
 * - RangeBanner: 720px, zero words — cannot justify itself (§1.4)
 * - AntiGlare: moved to /technology/ (§2.5 — duplicate content)
 * - TheSystem: moved to /technology/ (§2.5 — duplicate content)
 * - Standalone proof section (AggregateStats + CreatorWall) — absorbed into
 *   closing band below NoDiscounts, as a small inline stat row
 *
 * Page rhythm: dark hero → light catalogue → dark technical → dark finder
 * → dark closing. Every dark section wraps its own bg-ink-* explicitly.
 */
export default function Home() {
  return (
    <>
      {/* Band 1 — Hero */}
      <Hero />

      {/* Band 2 — Three categories (light panel) */}
      <CategoryGrid />

      {/* Band 3 — Technical teardown, condensed */}
      <TechnicalTeardown />

      {/* Band 4 — Bike finder (conversion) */}
      <BikeFinderSection />

      {/* Band 5 — Closing: proof stats + pricing manifesto */}
      <div className="bg-ink-950 text-bone">
        <Container style={{ paddingTop: "var(--section)", paddingBottom: "var(--section-sm)" }}>
          <Reveal>
            <SectionHeading
              eyebrow="Independent review"
              title="Eighteen channels took these apart before you did."
              lede="Maddog has been reviewed on its own merits by independent motovloggers across India, and carries an 18-month replacement warranty on every product."
            />
          </Reveal>

          <Reveal className="mt-12">
            <AggregateStats />
          </Reveal>

          <Reveal className="mt-8">
            <Cta href="/proof/" variant="quiet">
              Read the reviews
            </Cta>
          </Reveal>
        </Container>
      </div>

      <NoDiscounts />
    </>
  );
}
