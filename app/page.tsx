import Hero from "@/components/home/Hero";
import CompareRange from "@/components/home/CompareRange";
import ProofBand from "@/components/home/ProofBand";
import FitCta from "@/components/home/FitCta";

export default function Home() {
  return (
    <>
      {/* The anti-glare position — drag to compare your view vs. oncoming */}
      <Hero />

      {/* Compare the range */}
      <CompareRange />

      {/* Who trusts it — Ultraviolette */}
      <ProofBand />

      {/* Built for what you ride */}
      <FitCta />
    </>
  );
}
