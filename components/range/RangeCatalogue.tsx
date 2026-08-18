"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import { products, type Category } from "@/lib/products";
import ProductCard from "@/components/product/ProductCard";

interface FilterTab {
  label: string;
  category: Category | "all";
}

const FILTER_TABS: FilterTab[] = [
  { label: "All", category: "all" },
  { label: "Aux Lights", category: "aux-light" },
  { label: "Car Fog Lamps", category: "car-fog-lamp" },
  { label: "Phone Mounts", category: "mount" },
  { label: "Power & Switches", category: "power" },
  { label: "Filters & Clamps", category: "filter" },
];

export default function RangeCatalogue() {
  const [activeTab, setActiveTab] = useState<Category | "all">("all");
  const [isStuck, setIsStuck] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);

  // IntersectionObserver to detect when the filter bar becomes sticky
  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsStuck(!entry.isIntersecting);
      },
      { threshold: 0 }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  // Compute item counts per tab
  const counts = useMemo(() => {
    return {
      all: products.length,
      "aux-light": products.filter((p) => p.category === "aux-light").length,
      "car-fog-lamp": products.filter((p) => p.category === "car-fog-lamp").length,
      mount: products.filter((p) => p.category === "mount").length,
      power: products.filter((p) => p.category === "power").length,
      filter: products.filter((p) => p.category === "filter" || p.category === "clamp").length,
    };
  }, []);

  const filteredProducts = useMemo(() => {
    if (activeTab === "all") return products;
    if (activeTab === "filter") {
      return products.filter((p) => p.category === "filter" || p.category === "clamp");
    }
    return products.filter((p) => p.category === activeTab);
  }, [activeTab]);

  return (
    <div className="max-w-7xl mx-auto px-6 sm:px-12 py-8 sm:py-12">
      {/* 1px Sentinel to track sticky state */}
      <div ref={sentinelRef} className="h-px -mt-px" />

      {/* Sticky Filter Bar */}
      <div className="sticky top-20 z-30 pb-6 mb-8 pointer-events-none">
        <div className="overflow-x-auto scrollbar-none py-1 pointer-events-auto [mask-image:linear-gradient(90deg,transparent,black_4%,black_96%,transparent)] sm:[mask-image:none]">
          <div
            className={`inline-flex items-center gap-1.5 p-1.5 rounded-full border transition-all duration-200 ${
              isStuck
                ? "glass-deep shadow-2xl"
                : "bg-[#17171a] border-[var(--glass-stroke)]"
            }`}
          >
            {FILTER_TABS.map((tab) => {
              const isActive = activeTab === tab.category;
              const count = counts[tab.category as keyof typeof counts] || 0;

              return (
                <button
                  key={tab.label}
                  type="button"
                  onClick={() => setActiveTab(tab.category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-[var(--dur-fast)] shrink-0 cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
                    isActive
                      ? "bg-white text-[#0a0a0b] font-semibold shadow-md"
                      : "text-[#b6b6b1] hover:text-white hover:bg-white/10"
                  }`}
                >
                  <span className={isActive ? "text-[#0a0a0b]" : ""}>{tab.label}</span>
                  <span
                    className={`text-xs font-mono ${
                      isActive ? "text-[#0a0a0b]/70" : "text-[#82827c]"
                    }`}
                  >
                    · {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 2-col (desktop 3-col) Grid with fade transition */}
      <div
        key={activeTab}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 animate-in fade-in duration-200"
      >
        {filteredProducts.map((prod) => (
          <ProductCard key={prod.slug} product={prod} />
        ))}
      </div>
    </div>
  );
}
