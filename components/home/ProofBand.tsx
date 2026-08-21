import Image from "next/image";

export default function ProofBand() {
  return (
    <section className="py-24 sm:py-32 bg-[var(--color-night-900)] border-t border-[var(--glass-stroke)] overflow-x-clip">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        <div>
          <span className="readout tracking-[0.16em]">Who trusts it</span>
          <h2
            className="beam-lit mt-3 font-[560] tracking-tight leading-[1.2]"
            style={{ fontSize: "var(--text-statement)", letterSpacing: "var(--ls-statement)" }}
          >
            Chosen by Ultraviolette for the F77 Mach 2.
          </h2>
          <p className="mt-5 max-w-[48ch] text-[var(--color-grey-300)]" style={{ fontSize: "1.0625rem" }}>
            Factory-fit optics on India&apos;s fastest electric motorcycle. 82 verified reviews, 18 independent
            teardowns on YouTube, an 18-month replacement warranty on everything we sell.
          </p>
        </div>

        {/* lg+: this pair reorders so the large photo lands rightmost and can
            bleed to the viewport edge via .proof-bleed (see globals.css).
            Below lg the order/track sizing is untouched — large photo left,
            thumbnails right, both contained, exactly as before. */}
        <div className="grid grid-cols-[2fr_1fr] lg:grid-cols-[1fr_2fr] gap-4 h-80 w-full">
          <div className="relative lg:order-2 proof-bleed rounded-[var(--radius-card)] lg:rounded-r-none overflow-hidden border border-[var(--glass-stroke)] lg:border-r-0">
            <Image
              src="/media/images/maddog-uv-accessories-banner-02.webp"
              alt="Maddog auxiliary lights installed on an Ultraviolette F77 Mach 2 electric motorcycle"
              fill
              sizes="(max-width: 1024px) 60vw, 50vw"
              className="object-cover"
            />
          </div>
          <div className="grid grid-rows-2 gap-4 lg:order-1">
            <div className="relative rounded-[var(--radius-card)] overflow-hidden border border-[var(--glass-stroke)]">
              <Image
                src="/media/products/MDR/original/product_1752410419_3352346.webp"
                alt="Rage measured spot beam test"
                fill
                sizes="(max-width: 1024px) 30vw, 15vw"
                className="object-cover"
              />
            </div>
            <div className="relative rounded-[var(--radius-card)] overflow-hidden border border-[var(--glass-stroke)]">
              <Image
                src="/media/products/SC1/original/product_1752413246_6644867.webp"
                alt="Scout auxiliary light mounted"
                fill
                sizes="(max-width: 1024px) 30vw, 15vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
