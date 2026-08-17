import Image from "next/image";
import { heroBanner, logo } from "@/lib/media";

/**
 * A short dark band between the light product panels and the technical
 * teardown panel. Deliberately NOT a standalone dark island — it exists to
 * lead into the teardown, so the two form one continuous dark passage rather
 * than two separate dark moments.
 *
 * heroBanner has "BUILT TO LEAD. BORN TO PERFORM." and feature icons burned
 * into the left third of the pixels (see lib/media.ts). Cropping hard to the
 * right with object-right keeps that baked headline out of frame at every
 * viewport width — including tall narrow mobile crops, where a centred crop
 * would otherwise slice the text in half. No competing headline is added on
 * top; the product row is left to read as pure imagery.
 */
export default function RangeBanner() {
  return (
    <section className="bg-ink-950 relative min-h-[65svh] w-full overflow-hidden sm:min-h-[80svh]">
      <Image
        src={heroBanner.src}
        alt={heroBanner.alt}
        fill
        priority
        sizes="100vw"
        className="object-cover object-right"
      />

      {/* Scrim just for the logo mark's legibility, not for any body copy. */}
      <div className="from-ink-950/70 pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b to-transparent" />

      <div className="absolute top-6 left-5 sm:top-8 sm:left-8">
        <Image
          src={logo.onDark}
          alt="Maddog"
          width={logo.wordmarkAspect[0]}
          height={logo.wordmarkAspect[1]}
          className="h-6 w-auto sm:h-7"
        />
      </div>
    </section>
  );
}
