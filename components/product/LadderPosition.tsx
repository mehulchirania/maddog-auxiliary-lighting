import Link from "next/link";
import { ladder, type Product } from "@/lib/products";
import { cn } from "@/lib/cn";

/**
 * Compact "this one sits here" indicator — the full range as a horizontally
 * scrollable stepper, current model highlighted. Aux lights only; returns
 * null for power/mount accessories that aren't part of the ladder.
 */
export default function LadderPosition({ product }: { product: Product }) {
  if (!product.light) return null;

  const rank = ladder.findIndex((p) => p.slug === product.slug) + 1;

  return (
    <div className="min-w-0">
      <p className="text-ink-600 mb-5 font-mono text-[0.6875rem] tracking-[0.18em] uppercase">
        Where this sits in the range — {rank} of {ladder.length} by output
      </p>
      {/* min-w-0 on both this ol and its wrapper above: inside a flex/grid
          ancestor, items default to min-width:auto, which lets a scrollable
          row grow past its container instead of clipping — overflow-x-auto
          alone doesn't fix that, min-w-0 does. */}
      <ol className="flex min-w-0 items-stretch gap-2.5 overflow-x-auto pb-2 sm:gap-3">
        {ladder.map((p, i) => {
          const isCurrent = p.slug === product.slug;
          return (
            <li key={p.slug} className="shrink-0">
              <Link
                href={`/products/${p.slug}/`}
                aria-current={isCurrent ? "page" : undefined}
                className={cn(
                  "flex min-w-[108px] flex-col gap-1 rounded-md border px-3.5 py-3 transition-colors",
                  isCurrent
                    ? "border-ink-900 bg-paper-2"
                    : "border-ink-900/15 hover:border-ink-900/40 bg-paper-0",
                )}
              >
                <span className="tnum text-ink-500 text-[10px]">{String(i + 1).padStart(2, "0")}</span>
                <span className={cn("text-[13px]", isCurrent ? "text-ink-900" : "text-ink-700")}>
                  {p.name}
                </span>
                <span className="tnum text-ink-600 text-[11px]">
                  {p.light!.lumens.toLocaleString("en-IN")} lm
                </span>
              </Link>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
