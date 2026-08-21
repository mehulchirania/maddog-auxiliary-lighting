import Hero from "@/components/home/Hero";
import RangeGrid from "@/components/home/RangeGrid";
import BestSellerRail from "@/components/home/BestSellerRail";
import ProofBand from "@/components/home/ProofBand";
import FitCta from "@/components/home/FitCta";

export default function Home() {
  return (
    <>
      {/* The anti-glare position — drag to compare your view vs. oncoming */}
      <Hero />

      {/* The range — category merchandising, replaces the old CompareRange */}
      <RangeGrid />

      {/* Best sellers — marquee rail */}
      <BestSellerRail />

      {/* Who trusts it — Ultraviolette */}
      <ProofBand />

      {/* Built for what you ride */}
      <FitCta />
    </>
  );
}
