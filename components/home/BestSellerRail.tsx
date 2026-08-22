import { products } from "@/lib/products";
import ProductCard from "@/components/product/ProductCard";

// Mirrors the original site's "Best Seller" rail order. Filtered against the
// live catalog so a renamed/removed slug can't blank out a card.
const SEED_SLUGS = ["rage", "lycan", "claw-x", "alpha", "switch-pro-and-wire-harness-pro", "scout-x"];

const RAIL_PRODUCTS = SEED_SLUGS.map((slug) => products.find((p) => p.slug === slug)).filter(
  (p): p is NonNullable<typeof p> => Boolean(p),
);

export default function BestSellerRail() {
  return (
    <section
      className="bg-[var(--color-night-950)] border-t border-[var(--glass-stroke)]"
      style={{ paddingTop: "var(--section)", paddingBottom: "var(--section)" }}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-12 mb-10 flex flex-wrap items-end justify-between gap-x-8 gap-y-5">
        <div>
          <span className="readout uppercase tracking-[0.28em]">03 / Best sellers</span>
          <h2
            className="mt-4 uppercase leading-[1.02] tracking-tight text-[var(--color-white)]"
            style={{ fontSize: "var(--text-statement)", fontWeight: "var(--fw-statement)", letterSpacing: "var(--ls-statement)" }}
          >
            <span className="block">What riders</span>{" "}
            <span className="block">reach for first</span>
          </h2>
        </div>
        <p className="readout tracking-[0.08em]">One price, all year. Never discounted.</p>
      </div>

      <div className="rail-mask overflow-hidden">
        <div className="rail-track flex w-max gap-6 px-6 sm:px-12">
          {[...RAIL_PRODUCTS, ...RAIL_PRODUCTS].map((product, i) => {
            const isDuplicate = i >= RAIL_PRODUCTS.length;
            return (
              <ProductCard
                key={`${product.slug}-${i}`}
                product={product}
                className="w-[240px] sm:w-[280px] shrink-0"
                tabIndex={isDuplicate ? -1 : undefined}
                ariaHidden={isDuplicate}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
