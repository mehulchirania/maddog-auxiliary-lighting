import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import MasonryGallery from "@/components/animations/MasonryGallery";

const GALLERY = [
  { src: "/media/gallery/2838023a778dfaecdc212708f721b7881630846672himalayan 2_022_7_11zon.jpg", alt: "Himalayan pass", tall: true },
  { src: "/media/gallery/d61e4bbd6393c9111e6526ea173a7c8b1630846556011_24_11zon.jpg", alt: "Mountain touring road" },
  { src: "/media/gallery/f9028faec74be6ec9b852b0a542e2f39163084658211_31_11zon.jpg", alt: "High-altitude riding", tall: true },
];

export default function RiderGallery() {
  return (
    <section className="bg-ink-900 border-t hairline">
      <Container style={{ paddingTop: "var(--section)", paddingBottom: "var(--section)" }}>
        <Reveal>
          <SectionHeading
            eyebrow="Field conditions"
            title="Where the range actually gets used"
            lede="Documented on high-altitude touring routes, not staged in a studio."
          />
        </Reveal>
        <Reveal className="mt-10">
          <MasonryGallery items={GALLERY} />
        </Reveal>
      </Container>
    </section>
  );
}
