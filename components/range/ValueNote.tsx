import type { Product } from "@/lib/products";
import { formatPrice } from "@/lib/products";
import Container from "@/components/ui/Container";

/**
 * The ladder is sorted by lumens, so Rage's row lands after Lycan's — right
 * where a reader would notice price does not keep climbing with output and
 * assume a mistake. This note sits between the two rows and explains the
 * trade explicitly: Lycan's premium buys control (independent switching,
 * an included harness and switch), not more raw light.
 *
 * Its own full-width `<li>` so the ladder's light-panel background never
 * gaps to the dark page body between rows; the callout card itself uses the
 * signal accent at low opacity so it reads as a flag, not another rung.
 */
export default function ValueNote({ lycan, rage }: { lycan: Product; rage: Product }) {
  const lycanLight = lycan.light!;
  const rageLight = rage.light!;

  return (
    <li className="bg-paper-2 w-full">
      <Container className="py-8 sm:py-10">
        <div className="border-signal-600/35 bg-signal-600/[0.07] rounded-lg border px-5 py-6 sm:px-7">
          <p className="text-signal-600 mb-3 font-mono text-[0.6875rem] tracking-[0.18em] uppercase">
            Not a pricing error
          </p>
          <p className="text-ink-700 max-w-[64ch] text-[14px] leading-relaxed sm:text-[15px]">
            <strong className="text-ink-900">{rage.name}</strong> puts out more raw light than{" "}
            <strong className="text-ink-900">{lycan.name}</strong> —{" "}
            <span className="tnum">{rageLight.lumens.toLocaleString("en-IN")} lm</span> against{" "}
            <span className="tnum">{lycanLight.lumens.toLocaleString("en-IN")} lm</span> — for{" "}
            <span className="tnum">{formatPrice(rage.price)}</span>, less than {lycan.name}&apos;s{" "}
            <span className="tnum">{formatPrice(lycan.price)}</span>. {lycan.name}&apos;s premium buys
            independent spot/flood switching plus an included Wire Harness Pro and Dual Switch Pro —{" "}
            {rage.name} ships as a single fixed combo beam with neither included. Buy {rage.name} for
            the longest throw. Buy {lycan.name} to control the beam.
          </p>
        </div>
      </Container>
    </li>
  );
}
