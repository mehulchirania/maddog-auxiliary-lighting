"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { products, ladder, type Product, type Category } from "@/lib/products";
import { cn } from "@/lib/cn";
import RangeLadder from "@/components/range/RangeLadder";
import CompareTable from "@/components/range/CompareTable";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";

import SpotlightCard from "@/components/animations/SpotlightCard";
import TiltedCard from "@/components/animations/TiltedCard";
import ShinyText from "@/components/animations/ShinyText";
import DecryptedText from "@/components/animations/DecryptedText";

type FilterTab = "all" | Category;

const TAB_CONFIG: { id: FilterTab; label: string }[] = [
  { id: "all", label: "All Systems" },
  { id: "aux-light", label: "Auxiliary Lights" },
  { id: "car-fog-lamp", label: "Car Fog Lamps" },
  { id: "mount", label: "Claw & Phone Mounts" },
  { id: "clamp", label: "Clamps & Brackets" },
  { id: "power", label: "Power & Switches" },
  { id: "filter", label: "Amber Filters" },
  { id: "ev-edition", label: "EV Editions" },
];

export default function RangeCatalogue() {
  const [activeTab, setActiveTab] = useState<FilterTab>("all");
  const [viewMode, setViewMode] = useState<"grid" | "ladder">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"default" | "price-asc" | "price-desc" | "rating">("default");

  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        const matchesTab = activeTab === "all" || p.category === activeTab;
        const matchesQuery =
          !searchQuery.trim() ||
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.category.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesTab && matchesQuery;
      })
      .sort((a, b) => {
        if (sortBy === "price-asc") return a.price - b.price;
        if (sortBy === "price-desc") return b.price - a.price;
        if (sortBy === "rating") return b.rating - a.rating;
        return 0;
      });
  }, [activeTab, searchQuery, sortBy]);

  const counts = useMemo(() => {
    const map: Record<string, number> = { all: products.length };
    TAB_CONFIG.forEach((tab) => {
      if (tab.id !== "all") {
        map[tab.id] = products.filter((p) => p.category === tab.id).length;
      }
    });
    return map;
  }, []);

  return (
    <div className="bg-paper-0 text-ink-950">
      {/* Claw Spotlight Hero Card */}
      <Container wide className="pt-8 sm:pt-10">
        <Reveal>
          <TiltedCard maxAngle={6} scale={1.01} className="rounded-2xl">
            <div className="border hairline-ink bg-ink-950 text-bone rounded-2xl overflow-hidden shadow-xl grid lg:grid-cols-12 items-stretch">
              <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="eyebrow text-signal-500">Cockpit Instrument</span>
                    <span className="font-mono text-[11px] px-2.5 py-0.5 rounded-full bg-signal-500/10 text-signal-400 border border-signal-500/30">
                      OIS Vibration Damped
                    </span>
                  </div>
                  <h2 className="font-display text-2xl sm:text-4xl leading-tight font-medium">
                    <ShinyText text="Maddog Claw Series — Smartphone Mounts" speed={5} />
                  </h2>
                  <p className="text-fog-300 mt-3 text-sm sm:text-base leading-relaxed max-w-xl">
                    Built to survive high-frequency motorcycle engine vibrations. Featuring internal silicone harmonic dampening to protect sensitive smartphone camera optical image stabilization (OIS), with up to 25W Type-C Power Delivery &amp; 15W Qi Wireless charging.
                  </p>
                </div>

                <div className="mt-6 pt-6 border-t hairline grid grid-cols-2 sm:grid-cols-3 gap-4">
                  <div>
                    <span className="font-mono text-fog-400 text-[10px] uppercase block">Claw X Fast Charge</span>
                    <span className="font-mono text-bone text-base sm:text-lg font-semibold">25W Adaptive</span>
                    <span className="text-fog-500 text-xs block">₹4,499</span>
                  </div>
                  <div>
                    <span className="font-mono text-fog-400 text-[10px] uppercase block">Claw Pro Wireless</span>
                    <span className="font-mono text-signal-400 text-base sm:text-lg font-semibold">15W Qi + 25W PD</span>
                    <span className="text-fog-500 text-xs block">₹5,499</span>
                  </div>
                  <div className="col-span-2 sm:col-span-1 flex items-center">
                    <button
                      type="button"
                      onClick={() => {
                        setActiveTab("mount");
                        setViewMode("grid");
                      }}
                      className="w-full sm:w-auto px-4 py-2.5 rounded-lg bg-signal-600 hover:bg-signal-500 text-bone text-xs font-mono font-medium transition-colors text-center"
                    >
                      View Claw Mounts →
                    </button>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5 bg-paper-1 p-6 sm:p-8 flex items-center justify-center border-t lg:border-t-0 lg:border-l hairline-ink relative min-h-[260px]">
                <div className="relative w-full h-56 sm:h-64">
                  <Image
                    src="https://d32yu5nuptb5qv.cloudfront.net/products/MCLX/medium/product_1752422899_4061837.webp"
                    alt="Maddog Claw Series Phone Mount"
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-contain"
                  />
                </div>
              </div>
            </div>
          </TiltedCard>
        </Reveal>
      </Container>

      {/* Filter Toolbar & Category Navigation */}
      <div className="sticky top-16 z-30 bg-paper-0/95 backdrop-blur-md border-y hairline-ink mt-10">
        <Container wide className="py-3.5">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            {/* Category Scrollable Tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0 scrollbar-none">
              {TAB_CONFIG.map((tab) => {
                const isSelected = activeTab === tab.id;
                const count = counts[tab.id] ?? 0;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => {
                      setActiveTab(tab.id);
                      if (tab.id !== "aux-light" && tab.id !== "all" && viewMode === "ladder") {
                        setViewMode("grid");
                      }
                    }}
                    className={cn(
                      "shrink-0 px-3.5 py-1.5 rounded-full text-xs font-mono font-medium transition-all flex items-center gap-1.5",
                      isSelected
                        ? "bg-ink-950 text-bone shadow-sm"
                        : "bg-paper-1 hover:bg-paper-2 text-ink-700 border hairline-ink",
                    )}
                  >
                    <span>{tab.label}</span>
                    <span
                      className={cn(
                        "text-[10px] px-1.5 py-0.2 rounded-full",
                        isSelected ? "bg-signal-500 text-bone font-bold" : "text-ink-500 bg-paper-2",
                      )}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Controls: Search, Sort, View Toggle */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              {/* Search Box */}
              <div className="relative flex-1 sm:flex-initial">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Filter products..."
                  className="w-full sm:w-44 pl-8 pr-3 py-1.5 rounded-lg bg-paper-1 border hairline-ink text-xs text-ink-900 placeholder:text-ink-400 focus:outline-none focus:ring-1 focus:ring-signal-500"
                />
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="absolute left-2.5 top-1/2 -translate-y-1/2 text-ink-400"
                >
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
              </div>

              {/* Sort Selector */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-2.5 py-1.5 rounded-lg bg-paper-1 border hairline-ink text-xs font-mono text-ink-800 focus:outline-none focus:ring-1 focus:ring-signal-500"
              >
                <option value="default">Sort: Default</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>

              {/* View Switcher (for aux-lights/all) */}
              {(activeTab === "all" || activeTab === "aux-light") && (
                <div className="flex rounded-lg border hairline-ink p-0.5 bg-paper-1">
                  <button
                    type="button"
                    onClick={() => setViewMode("grid")}
                    title="Grid Catalogue View"
                    className={cn(
                      "px-2.5 py-1 rounded text-xs font-mono font-medium transition-all",
                      viewMode === "grid" ? "bg-ink-950 text-bone shadow-sm" : "text-ink-600 hover:text-ink-950",
                    )}
                  >
                    Grid
                  </button>
                  <button
                    type="button"
                    onClick={() => setViewMode("ladder")}
                    title="Aux Lights Spec Ladder"
                    className={cn(
                      "px-2.5 py-1 rounded text-xs font-mono font-medium transition-all",
                      viewMode === "ladder" ? "bg-ink-950 text-bone shadow-sm" : "text-ink-600 hover:text-ink-950",
                    )}
                  >
                    Ladder
                  </button>
                </div>
              )}
            </div>
          </div>
        </Container>
      </div>

      {/* Render Main Content based on View Mode */}
      {viewMode === "ladder" && (activeTab === "all" || activeTab === "aux-light") ? (
        <div className="py-10">
          <RangeLadder ladder={ladder} />
        </div>
      ) : (
        <Container wide className="py-10 sm:py-14">
          {filteredProducts.length === 0 ? (
            <div className="py-16 text-center border hairline-ink rounded-2xl bg-paper-1 p-8">
              <p className="font-display text-lg text-ink-800 font-medium">No products match your filter.</p>
              <button
                type="button"
                onClick={() => {
                  setActiveTab("all");
                  setSearchQuery("");
                }}
                className="mt-4 px-4 py-2 rounded-lg bg-ink-950 text-bone text-xs font-mono"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
              {filteredProducts.map((product) => (
                <Reveal key={product.slug}>
                  <SpotlightCard
                    spotlightColor="rgba(237, 29, 36, 0.08)"
                    className="rounded-xl border hairline-ink bg-paper-1 hover:bg-paper-0 hover:border-signal-500/60 transition-all duration-200 hover:-translate-y-1 shadow-sm hover:shadow-md h-full flex flex-col justify-between overflow-hidden"
                  >
                    <Link
                      href={`/products/${product.slug}/`}
                      className="group flex flex-col justify-between h-full"
                    >
                      {/* Image Area */}
                      <div className="relative aspect-[4/3] bg-paper-2 p-6 flex items-center justify-center overflow-hidden border-b hairline-ink">
                        <Image
                          src={product.hero}
                          alt={product.name}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                          className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                        />
                        <span className="absolute top-3 left-3 px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-ink-950 text-bone shadow-sm">
                          {product.category === "aux-light"
                            ? "Aux Light"
                            : product.category === "car-fog-lamp"
                            ? "Car Fog"
                            : product.category === "mount"
                            ? "Mount & Claw"
                            : product.category === "clamp"
                            ? "Clamp & Bracket"
                            : product.category === "power"
                            ? "Power & Wire"
                            : product.category === "filter"
                            ? "Optics Filter"
                            : "EV Edition"}
                        </span>

                        {product.light && (
                          <span className="absolute bottom-3 right-3 px-2 py-0.5 rounded text-[10px] font-mono bg-signal-600 text-bone font-semibold shadow-sm">
                            {product.light.lumens.toLocaleString("en-IN")} LM
                          </span>
                        )}
                      </div>

                      {/* Card Body */}
                      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center justify-between gap-2 mb-1.5">
                            <h3 className="font-display text-ink-950 group-hover:text-signal-600 text-base sm:text-lg font-medium transition-colors line-clamp-1">
                              {product.name}
                            </h3>
                            <span className="tnum font-mono text-ink-950 font-semibold text-sm sm:text-base shrink-0">
                              ₹{product.price.toLocaleString("en-IN")}
                            </span>
                          </div>

                          <p className="text-ink-600 text-xs line-clamp-2 leading-relaxed">
                            {product.tagline}
                          </p>
                        </div>

                        {/* Card Footer Specifications */}
                        <div className="mt-4 pt-3 border-t hairline-ink flex items-center justify-between text-[11px] font-mono text-ink-500">
                          <span className="flex items-center gap-1">
                            {product.rating > 0 ? (
                              <>
                                <span className="text-amber-500">★</span>
                                <span className="text-ink-800 font-medium">{product.rating}</span>
                                <span className="text-ink-400">({product.reviewCount})</span>
                              </>
                            ) : (
                              <span>18-Mo Warranty</span>
                            )}
                          </span>
                          <span className="text-signal-600 group-hover:translate-x-0.5 transition-transform font-medium">
                            Inspect Specs →
                          </span>
                        </div>
                      </div>
                    </Link>
                  </SpotlightCard>
                </Reveal>
              ))}
            </div>
          )}
        </Container>
      )}

      {/* Full Spec Matrix comparison */}
      <div className="bg-paper-1 border-t hairline-ink">
        <Container wide className="py-16 sm:py-20">
          <Reveal>
            <div className="max-w-2xl mb-8">
              <p className="eyebrow text-signal-600 mb-1">Telemetry Table</p>
              <h2 className="font-display text-ink-950 text-2xl sm:text-3xl font-medium">
                Auxiliary Lighting Spec Matrix
              </h2>
              <p className="text-ink-600 text-sm mt-2">
                Side-by-side comparison of lumens, power draw, beam distance, and spot/flood percentages.
              </p>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <CompareTable />
          </Reveal>
        </Container>
      </div>
    </div>
  );
}
