import Hero from "@/components/home/Hero";
import BeamCompare from "@/components/home/BeamCompare";
import MeasuredProof from "@/components/home/MeasuredProof";
import ProductRail from "@/components/home/ProductRail";
import ProofBand from "@/components/home/ProofBand";
import FounderNote from "@/components/home/FounderNote";
import FitCta from "@/components/home/FitCta";

export default function Home() {
  return (
    <>
      {/* ACT 1 — The Master Switch */}
      <Hero />

      {/* ACT 2 — See the difference */}
      <BeamCompare />

      {/* ACT 2.5 — Measured, not marketed (restored MVP: drag slider + anti-glare diagram) */}
      <MeasuredProof />

      {/* ACT 3 — The range */}
      <ProductRail />

      {/* ACT 4 — Proof, quietly */}
      <ProofBand />

      {/* ACT 5 — Why Maddog (founder note) */}
      <FounderNote />

      {/* ACT 6 — Find your fit + pricing line */}
      <FitCta />
    </>
  );
}
