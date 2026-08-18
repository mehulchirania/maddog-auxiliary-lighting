"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { brands, bikesForBrand, type Bike } from "@/lib/fitment";
import { getProduct, products, type Product } from "@/lib/products";
import { useCart } from "@/lib/cart";
import SpecularButton from "@/components/ui/SpecularButton";

const BRAND_INITIALS: Record<string, string> = {
  "Royal Enfield": "RE",
  KTM: "KTM",
  BMW: "BMW",
  Ultraviolette: "UV",
  Honda: "HON",
  Yamaha: "YAM",
  Kawasaki: "KAW",
  Triumph: "TRI",
  Bajaj: "BAJ",
  Suzuki: "SUZ",
  Hero: "HERO",
  JAWA: "JAWA",
  "Harley Davidson": "HD",
  Benelli: "BEN",
};

// Available alternate lights
const AVAILABLE_LIGHT_SLUGS = ["scout", "scout-x", "delta", "alpha", "lycan", "rage"];
// Available alternate harnesses / switches
const AVAILABLE_POWER_SLUGS = ["switch-pro", "dimmer", "switch-easy"];
// Available alternate mounts
const AVAILABLE_MOUNT_SLUGS = ["claw-x", "claw-pro", "clamp-22-25", "clamp-50-52"];

function BrandBadge({ name }: { name: string }) {
  const initials = BRAND_INITIALS[name] || name.slice(0, 2).toUpperCase();
  return (
    <div className="w-12 h-12 rounded-full bg-white/8 border border-[var(--glass-stroke)] flex items-center justify-center text-xs font-[560] text-white tracking-wider">
      {initials}
    </div>
  );
}

export default function FitFlow() {
  const searchParams = useSearchParams();
  const { addBundle } = useCart();
  const modelSectionRef = useRef<HTMLDivElement>(null);

  const [selectedBrand, setSelectedBrand] = useState<string>("");
  const [selectedBike, setSelectedBike] = useState<Bike | null>(null);

  // Selected customizable items in kit
  const [selectedLightSlug, setSelectedLightSlug] = useState<string>("");
  const [selectedPowerSlug, setSelectedPowerSlug] = useState<string>("");
  const [selectedMountSlug, setSelectedMountSlug] = useState<string>("");
  const [includePower, setIncludePower] = useState(true);
  const [includeMount, setIncludeMount] = useState(true);

  const [bundleAdded, setBundleAdded] = useState(false);

  // Handle URL query param for brand
  useEffect(() => {
    const brandParam = searchParams.get("brand");
    if (brandParam && brands.includes(brandParam as (typeof brands)[number])) {
      setSelectedBrand(brandParam);
    }
  }, [searchParams]);

  // When bike changes, initialize kit with bike defaults
  useEffect(() => {
    if (selectedBike) {
      setSelectedLightSlug(selectedBike.recommended.light || "alpha");
      setSelectedPowerSlug(selectedBike.recommended.power || "switch-pro");
      setSelectedMountSlug(selectedBike.recommended.mount || "claw-x");
      setIncludePower(Boolean(selectedBike.recommended.power));
      setIncludeMount(Boolean(selectedBike.recommended.mount));
    }
  }, [selectedBike]);

  const availableBikes = useMemo(() => {
    return selectedBrand ? bikesForBrand(selectedBrand) : [];
  }, [selectedBrand]);

  // Resolve products for custom kit
  const currentLight = useMemo(() => getProduct(selectedLightSlug), [selectedLightSlug]);
  const currentPower = useMemo(() => (includePower ? getProduct(selectedPowerSlug) : null), [includePower, selectedPowerSlug]);
  const currentMount = useMemo(() => (includeMount ? getProduct(selectedMountSlug) : null), [includeMount, selectedMountSlug]);

  const configuredKitItems = useMemo(() => {
    const items: Product[] = [];
    if (currentLight) items.push(currentLight);
    if (currentPower) items.push(currentPower);
    if (currentMount) items.push(currentMount);
    return items;
  }, [currentLight, currentPower, currentMount]);

  const kitTotalPrice = useMemo(() => {
    return configuredKitItems.reduce((sum, item) => sum + item.price, 0);
  }, [configuredKitItems]);

  const handleBrandSelect = (b: string) => {
    setSelectedBrand(b);
    setSelectedBike(null);
    setTimeout(() => {
      modelSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }, 50);
  };

  const handleAddBundle = () => {
    if (configuredKitItems.length > 0) {
      addBundle(configuredKitItems);
      setBundleAdded(true);
      setTimeout(() => setBundleAdded(false), 2200);
    }
  };

  const resetFlow = () => {
    setSelectedBrand("");
    setSelectedBike(null);
  };

  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col items-center gap-12">
      {/* Recommended & Customizable Setup View */}
      {selectedBike ? (
        <div className="w-full flex flex-col gap-10 animate-in fade-in duration-300">
          {/* Status Header */}
          <div className="glass p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xl">
            <div>
              <span className="readout text-xs text-[var(--color-beam)]">
                Configured Certified Setup
              </span>
              <h2 className="text-2xl sm:text-3xl font-semibold text-white mt-1">
                {selectedBike.brand} {selectedBike.model}
              </h2>
              <p className="mt-2 text-sm text-[var(--color-grey-300)] max-w-xl leading-relaxed">
                {selectedBike.rationale}
              </p>
            </div>

            <button
              type="button"
              onClick={resetFlow}
              className="text-xs text-[var(--color-grey-300)] hover:text-white underline shrink-0 self-start sm:self-center cursor-pointer"
            >
              Change Motorcycle
            </button>
          </div>

          {/* Kit Item Customizer Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* 1. Auxiliary Light Customizer */}
            <div className="rounded-[var(--radius-card)] bg-[var(--color-night-900)] border border-[var(--glass-stroke)] p-6 flex flex-col justify-between gap-6 shadow-xl">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="readout text-xs text-[var(--color-beam)]">1. Auxiliary Light</span>
                  <span className="text-xs text-white/50">Required</span>
                </div>

                {currentLight && (
                  <div className="flex items-center gap-4 mb-6">
                    <div className="relative w-16 h-16 rounded-xl bg-[var(--color-plate)] p-2 shrink-0 overflow-hidden">
                      <Image
                        src={currentLight.hero}
                        alt={currentLight.name}
                        fill
                        className="object-contain p-1"
                      />
                    </div>
                    <div>
                      <h4 className="text-base font-semibold text-white">{currentLight.name}</h4>
                      <p className="readout text-xs mt-0.5">
                        {currentLight.light?.lumens?.toLocaleString() || ""} lm · {currentLight.specs.find(s => s.label.includes("Power"))?.value || "5000K"}
                      </p>
                      <p className="text-sm font-medium text-white mt-1">
                        ₹{currentLight.price.toLocaleString("en-IN")}
                      </p>
                    </div>
                  </div>
                )}

                <label htmlFor="light-select" className="text-xs text-[var(--color-grey-500)] block mb-2 font-medium">
                  Switch Light Model:
                </label>
                <select
                  id="light-select"
                  value={selectedLightSlug}
                  onChange={(e) => setSelectedLightSlug(e.target.value)}
                  className="w-full h-11 px-3.5 rounded-xl bg-[var(--color-night-800)] text-white border border-[var(--glass-stroke)] text-sm focus:outline-none focus:border-[var(--color-beam)] cursor-pointer"
                >
                  {AVAILABLE_LIGHT_SLUGS.map((slug) => {
                    const p = getProduct(slug);
                    if (!p) return null;
                    return (
                      <option key={slug} value={slug} className="bg-[var(--color-night-900)] text-white">
                        {p.name} — ₹{p.price.toLocaleString("en-IN")} ({p.light?.lumens || ""} lm)
                      </option>
                    );
                  })}
                </select>
              </div>

              <p className="readout text-[11px] text-[var(--color-grey-500)]">
                All models share IP-67 waterproofing and 5000K Nichia LEDs.
              </p>
            </div>

            {/* 2. Wiring Harness / Power Control */}
            <div className="rounded-[var(--radius-card)] bg-[var(--color-night-900)] border border-[var(--glass-stroke)] p-6 flex flex-col justify-between gap-6 shadow-xl">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="readout text-xs text-[var(--color-beam)]">2. Harness &amp; Switch</span>
                  <label className="flex items-center gap-1.5 cursor-pointer text-xs text-white/70">
                    <input
                      type="checkbox"
                      checked={includePower}
                      onChange={(e) => setIncludePower(e.target.checked)}
                      className="rounded border-white/20 accent-[var(--color-beam)] cursor-pointer"
                    />
                    <span>Include</span>
                  </label>
                </div>

                {includePower && currentPower ? (
                  <div className="flex items-center gap-4 mb-6">
                    <div className="relative w-16 h-16 rounded-xl bg-[var(--color-plate)] p-2 shrink-0 overflow-hidden">
                      <Image
                        src={currentPower.hero}
                        alt={currentPower.name}
                        fill
                        className="object-contain p-1"
                      />
                    </div>
                    <div>
                      <h4 className="text-base font-semibold text-white">{currentPower.name}</h4>
                      <p className="readout text-xs mt-0.5">Solid-State Relay Harness</p>
                      <p className="text-sm font-medium text-white mt-1">
                        ₹{currentPower.price.toLocaleString("en-IN")}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="py-6 text-center text-xs text-[var(--color-grey-500)] border border-dashed border-white/10 rounded-xl mb-6">
                    No harness included in kit
                  </div>
                )}

                {includePower && (
                  <>
                    <label htmlFor="power-select" className="text-xs text-[var(--color-grey-500)] block mb-2 font-medium">
                      Select Harness Model:
                    </label>
                    <select
                      id="power-select"
                      value={selectedPowerSlug}
                      onChange={(e) => setSelectedPowerSlug(e.target.value)}
                      className="w-full h-11 px-3.5 rounded-xl bg-[var(--color-night-800)] text-white border border-[var(--glass-stroke)] text-sm focus:outline-none focus:border-[var(--color-beam)] cursor-pointer"
                    >
                      {AVAILABLE_POWER_SLUGS.map((slug) => {
                        const p = getProduct(slug);
                        if (!p) return null;
                        return (
                          <option key={slug} value={slug} className="bg-[var(--color-night-900)] text-white">
                            {p.name} — ₹{p.price.toLocaleString("en-IN")}
                          </option>
                        );
                      })}
                    </select>
                  </>
                )}
              </div>

              <p className="readout text-[11px] text-[var(--color-grey-500)]">
                Silicon insulated, waterproof inline fuse, OEM plug-and-play.
              </p>
            </div>

            {/* 3. Mounting Clamp */}
            <div className="rounded-[var(--radius-card)] bg-[var(--color-night-900)] border border-[var(--glass-stroke)] p-6 flex flex-col justify-between gap-6 shadow-xl">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="readout text-xs text-[var(--color-beam)]">3. Mounting Clamp</span>
                  <label className="flex items-center gap-1.5 cursor-pointer text-xs text-white/70">
                    <input
                      type="checkbox"
                      checked={includeMount}
                      onChange={(e) => setIncludeMount(e.target.checked)}
                      className="rounded border-white/20 accent-[var(--color-beam)] cursor-pointer"
                    />
                    <span>Include</span>
                  </label>
                </div>

                {includeMount && currentMount ? (
                  <div className="flex items-center gap-4 mb-6">
                    <div className="relative w-16 h-16 rounded-xl bg-[var(--color-plate)] p-2 shrink-0 overflow-hidden">
                      <Image
                        src={currentMount.hero}
                        alt={currentMount.name}
                        fill
                        className="object-contain p-1"
                      />
                    </div>
                    <div>
                      <h4 className="text-base font-semibold text-white">{currentMount.name}</h4>
                      <p className="readout text-xs mt-0.5">CNC Billet 6063-T6</p>
                      <p className="text-sm font-medium text-white mt-1">
                        ₹{currentMount.price.toLocaleString("en-IN")}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="py-6 text-center text-xs text-[var(--color-grey-500)] border border-dashed border-white/10 rounded-xl mb-6">
                    No mount clamp included in kit
                  </div>
                )}

                {includeMount && (
                  <>
                    <label htmlFor="mount-select" className="text-xs text-[var(--color-grey-500)] block mb-2 font-medium">
                      Select Mount Type:
                    </label>
                    <select
                      id="mount-select"
                      value={selectedMountSlug}
                      onChange={(e) => setSelectedMountSlug(e.target.value)}
                      className="w-full h-11 px-3.5 rounded-xl bg-[var(--color-night-800)] text-white border border-[var(--glass-stroke)] text-sm focus:outline-none focus:border-[var(--color-beam)] cursor-pointer"
                    >
                      {AVAILABLE_MOUNT_SLUGS.map((slug) => {
                        const p = getProduct(slug);
                        if (!p) return null;
                        return (
                          <option key={slug} value={slug} className="bg-[var(--color-night-900)] text-white">
                            {p.name} — ₹{p.price.toLocaleString("en-IN")}
                          </option>
                        );
                      })}
                    </select>
                  </>
                )}
              </div>

              <p className="readout text-[11px] text-[var(--color-grey-500)]">
                Vibration dampened with rubber inserts to protect fork tubes.
              </p>
            </div>
          </div>

          {/* Kit Summary and Specular Button */}
          <div className="glass p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6 shadow-2xl">
            <div>
              <span className="readout text-xs text-[var(--color-beam)]">
                {configuredKitItems.length} items configured
              </span>
              <div className="flex items-baseline gap-3 mt-1">
                <span className="text-2xl sm:text-3xl font-semibold text-white">
                  ₹{kitTotalPrice.toLocaleString("en-IN")}
                </span>
                <span className="readout text-xs text-[var(--color-grey-500)]">
                  Includes 18-Mo Warranty &amp; Express Shipping
                </span>
              </div>
            </div>

            <SpecularButton
              size="lg"
              tint="#ffffff"
              tintOpacity={1}
              textColor="#0a0a0b"
              lineColor="#ffffff"
              baseColor="#a3a3a3"
              intensity={1.3}
              onClick={handleAddBundle}
              className="w-full sm:w-auto"
            >
              <span>{bundleAdded ? "Kit Added to Cart ✓" : "Add Configured Kit to Cart"}</span>
            </SpecularButton>
          </div>
        </div>
      ) : (
        /* Brand Grid + Dynamic Model Selection */
        <div className="w-full max-w-4xl flex flex-col gap-8">
          <div className="text-center max-w-xl mx-auto mb-2">
            <h2 className="text-xl sm:text-2xl font-semibold text-white">
              Select motorcycle brand
            </h2>
            <p className="text-xs text-[var(--color-grey-500)] mt-1.5">
              Choose your manufacturer to view compatible lighting, wiring harnesses, and mounts.
            </p>
          </div>

          {/* Brand Grid (Solid Cards) */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3.5">
            {brands.map((b) => {
              const isSelected = selectedBrand === b;
              return (
                <button
                  key={b}
                  type="button"
                  aria-pressed={isSelected}
                  onClick={() => handleBrandSelect(b)}
                  className={`group flex flex-col items-center gap-3 p-5 rounded-xl transition-all duration-[var(--dur-fast)] cursor-pointer text-center ${
                    isSelected
                      ? "bg-[var(--color-night-700)] border-2 border-[var(--color-beam)] shadow-lg scale-[1.02]"
                      : "bg-[var(--color-night-800)] border border-[var(--glass-stroke)] hover:border-white/20 hover:-translate-y-0.5"
                  }`}
                >
                  <div className="h-12 flex items-center justify-center">
                    <BrandBadge name={b} />
                  </div>
                  <span
                    className={`text-sm font-medium transition-colors ${
                      isSelected ? "text-white font-semibold" : "text-[var(--color-grey-300)] group-hover:text-white"
                    }`}
                  >
                    {b}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Model Selection Panel */}
          {selectedBrand && (
            <div
              ref={modelSectionRef}
              className="mt-6 p-6 sm:p-8 rounded-[var(--radius-card)] bg-[var(--color-night-900)] border border-[var(--glass-stroke)] shadow-2xl animate-in fade-in slide-in-from-top-4 duration-300"
            >
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-[var(--glass-stroke)]">
                <div>
                  <span className="readout text-xs text-[var(--color-beam)]">Step 2: Choose Model</span>
                  <h3 className="text-lg sm:text-xl font-semibold text-white mt-1">
                    {selectedBrand} Models
                  </h3>
                </div>
                <span className="readout text-xs text-[var(--color-grey-500)]">
                  {availableBikes.length} {availableBikes.length === 1 ? "profile" : "profiles"} found
                </span>
              </div>

              {availableBikes.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {availableBikes.map((bike) => (
                    <button
                      key={bike.id}
                      type="button"
                      onClick={() => setSelectedBike(bike)}
                      className="p-4 text-left rounded-xl bg-[var(--color-night-800)] border border-[var(--glass-stroke)] hover:border-[var(--color-beam)] hover:bg-white/5 transition-all cursor-pointer group flex items-center justify-between"
                    >
                      <div>
                        <p className="text-sm font-medium text-white group-hover:text-[var(--color-beam)] transition-colors">
                          {bike.model}
                        </p>
                        <p className="readout text-[11px] text-[var(--color-grey-500)] mt-0.5 capitalize">
                          {bike.kind} chassis
                        </p>
                      </div>
                      <span className="text-white/40 group-hover:text-[var(--color-beam)] transition-colors">
                        →
                      </span>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-sm text-[var(--color-grey-500)]">
                  <p>No model profiles mapped for this brand yet.</p>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
