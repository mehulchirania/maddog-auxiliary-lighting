import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { FitStrip } from "@/components/fit/FitStrip";

/**
 * A dark section around the existing FitStrip entry point. No lifestyle photo
 * of a bike sits behind this — the reference layouts that inspired the visual
 * direction show one, but Maddog has no clean shot like that (their only
 * near-Himalayan asset is a social-media ad with a phone number and red
 * circles burned into the pixels). The real fitment logic underneath is
 * accurate; a fabricated photo behind it would not be.
 */
export default function BikeFinderSection() {
  return (
    <div className="bg-ink-950 text-bone">
      <Container style={{ paddingTop: "var(--section)", paddingBottom: "var(--section)" }}>
        <Reveal>
          <SectionHeading
            eyebrow="Bike finder"
            title="Tell us what you ride."
            lede="Pick a brand and model — we'll return the light, control and mount your bike actually needs, priced as one honest total."
          />
        </Reveal>

        <Reveal className="mt-10 max-w-2xl">
          <FitStrip />
        </Reveal>
      </Container>
    </div>
  );
}
