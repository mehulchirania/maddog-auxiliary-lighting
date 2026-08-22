"use client";

import { useState, useMemo } from "react";
import { products, type Category } from "@/lib/products";
import ProductCard from "@/components/product/ProductCard";

interface FilterTab {
  label: string;
  category: Category | "all";
}

/** Order and short labels follow the catalogue mockup's taxonomy. */
const FILTER_TABS: FilterTab[] = [
  { label: "All", category: "all" },
  { label: "Aux lights", category: "aux-light" },
  { label: "Car fog lamps", category: "car-fog-lamp" },
  { label: "Phone holders", category: "mount" },
  { label: "Switches & power", category: "power" },
  { label: "Filters", category: "filter" },
  { label: "Mounts & clamps", category: "clamp" },
  { label: "EV edition", category: "ev-edition" },
];

const CATEGORY_LABEL: Record<Category, string> = {
  "aux-light": "Aux lights",
  "car-fog-lamp": "Car fog lamps",
  mount: "Phone holders",
  power: "Switches & power",
  filter: "Filters",
  clamp: "Mounts & clamps",
  "ev-edition": "EV edition",
};

export default function RangeCatalogue() {
  const [activeTab, setActiveTab] = useState<Category | "all">("all");

  const counts = useMemo(() => {
    const map = new Map<Category | "all", number>([["all", products.length]]);
    for (const tab of FILTER_TABS) {
      if (tab.category === "all") continue;
      map.set(tab.category, products.filter((p) => p.category === tab.category).length);
    }
    return map;
  }, []);

  const filteredProducts = useMemo(
    () => (activeTab === "all" ? products : products.filter((p) => p.category === activeTab)),
    [activeTab]
  );

  return (
    <div className="max-w-7xl mx-auto px-6 sm:px-12 pt-14 pb-[var(--section)]">
      {/* Filter chips + result counter */}
      <div className="flex flex-wrap items-center justify-between gap-6">
        <div className="flex flex-wrap gap-2">
          {FILTER_TABS.map((tab) => {
            const isActive = activeTab === tab.category;
            const count = counts.get(tab.category) ?? 0;

            return (
              <button
                key={tab.label}
                type="button"
                onClick={() => setActiveTab(tab.category)}
                aria-pressed={isActive}
                className={`inline-flex min-h-11 cursor-pointer items-center rounded-[var(--radius-pill)] border px-[18px] font-mono text-xs uppercase tracking-[0.06em] transition-colors duration-[var(--dur-fast)] ease-[var(--ease-out)] ${
                  isActive
                    ? "border-[var(--color-white)] bg-[var(--color-white)] text-[var(--color-night-950)]"
                    : "border-[var(--glass-stroke)] bg-[var(--color-night-800)]/60 text-[var(--color-grey-300)] hover:border-[var(--color-beam)]/50"
                }`}
              >
                {tab.label}
                <span className="ml-2 tabular-nums opacity-55">
                  {String(count).padStart(2, "0")}
                </span>
              </button>
            );
          })}
        </div>

        <span className="font-mono text-xs tabular-nums tracking-[0.08em] text-[var(--color-grey-500)]">
          {filteredProducts.length} of {products.length} shown
        </span>
      </div>

      {/* Catalogue grid */}
      <div
        key={activeTab}
        className="mt-7 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-[18px] animate-in fade-in duration-200"
      >
        {filteredProducts.map((prod, i) => (
          <ProductCard
            key={prod.slug}
            product={prod}
            variant="catalogue"
            index={i + 1}
            categoryLabel={CATEGORY_LABEL[prod.category]}
            showQuickSpecs
          />
        ))}
      </div>

      {/* Closing pricing note */}
      <p className="mt-10 text-center font-mono text-xs tracking-[0.08em] text-[var(--color-grey-500)]">
        Every price shown is the price, all year — never discounted, never inflated.
      </p>
    </div>
  );
}
