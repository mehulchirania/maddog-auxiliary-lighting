import Image from "next/image";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import type { MediaAsset } from "@/lib/media";

/**
 * Shows one of Maddog's own finished studio posters (see `productPosters` in
 * lib/media.ts) next to a short line of copy. Both posters are genuinely
 * handsome white-ground photography with the wolf mark and a product
 * wordmark baked into the pixels — so this is only ever rendered on the one
 * product page it actually depicts (gated by slug in the caller), never as
 * generic decoration on a product it doesn't match.
 */
export default function BrandPoster({
  poster,
  eyebrow,
  heading,
  copy,
}: {
  poster: MediaAsset;
  eyebrow: string;
  heading: string;
  copy: string;
}) {
  return (
    <div className="bg-paper-1 border-ink-900/10 border-t">
      <Container className="py-16 sm:py-20">
        <Reveal>
          <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,340px)_1fr] lg:gap-16">
            <div className="bg-paper-0 border-ink-900/8 relative mx-auto aspect-[1050/1458] w-full max-w-[300px] overflow-hidden rounded-lg border shadow-[0_1px_2px_rgba(20,20,20,0.04)] sm:max-w-[340px]">
              <Image
                src={poster.src}
                alt={poster.alt}
                fill
                sizes="(min-width: 1024px) 340px, 60vw"
                className="object-contain p-3"
              />
            </div>
            <div className="min-w-0">
              <p className="text-ink-600 mb-4 font-mono text-[0.6875rem] tracking-[0.18em] uppercase">
                {eyebrow}
              </p>
              <h2 className="font-display text-ink-900 text-[clamp(1.7rem,3.6vw,2.7rem)] leading-[1.08] tracking-[-0.02em]">
                {heading}
              </h2>
              <p className="text-ink-700 mt-5 max-w-md text-[15px] leading-relaxed sm:text-[16px]">
                {copy}
              </p>
            </div>
          </div>
        </Reveal>
      </Container>
    </div>
  );
}
