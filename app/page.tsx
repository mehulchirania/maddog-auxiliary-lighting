import HeroOpening from "@/components/home/HeroOpening";
import AntiGlareCompare from "@/components/home/AntiGlareCompare";
import RangeGrid from "@/components/home/RangeGrid";
import BestSellerRail from "@/components/home/BestSellerRail";
import ProofBand from "@/components/home/ProofBand";
import FitCta from "@/components/home/FitCta";

export default function Home() {
  return (
    <>
      {/* The opening frame — brand statement over the beam */}
      <HeroOpening />

      {/* 01 — the anti-glare position, drag to compare both sides of the beam */}
      <AntiGlareCompare />

      {/* 02 — the range, category merchandising */}
      <RangeGrid />

      {/* 03 — best sellers, marquee rail */}
      <BestSellerRail />

      {/* 04 — who trusts it, Ultraviolette */}
      <ProofBand />

      {/* 05 — built for what you ride */}
      <FitCta />
    </>
  );
}
