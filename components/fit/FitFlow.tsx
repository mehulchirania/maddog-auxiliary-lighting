"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { brands, bikesForBrand, type Bike } from "@/lib/fitment";
import { getProduct, products, type Product } from "@/lib/products";
import { useCart } from "@/lib/cart";
import SpecularButton from "@/components/ui/SpecularButton";
import BrandMark from "@/components/ui/BrandMark";

// Available alternate lights
const AVAILABLE_LIGHT_SLUGS = ["scout", "scout-x", "delta", "alpha", "lycan", "rage"];
// Available alternate harnesses / switches
const AVAILABLE_POWER_SLUGS = ["switch-pro", "dimmer", "switch-easy"];
// Available alternate mounts
const AVAILABLE_MOUNT_SLUGS = ["claw-x", "claw-pro", "clamp-22-25", "clamp-50-52"];

interface PillOption {
  slug: string;
  name: string;
  meta: string;
}

/**
 * Segmented pill radio-group — replaces native <select>s for the kit
 * customizer (3–6 options each). Roving-tabindex + arrow-key navigation,
 * matching native <input type="radio"> group behavior: an arrow key both
 * moves focus and changes the selection.
 */
function KitPillGroup({
  labelledBy,
  options,
  value,
  onChange,
}: {
  labelledBy: string;
  options: PillOption[];
  value: string;
  onChange: (slug: string) => void;
}) {
  const groupRef = useRef<HTMLDivElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>, idx: number) => {
    const move = (nextIdx: number) => {
      e.preventDefault();
      const clamped = (nextIdx + options.length) % options.length;
      const nextSlug = options[clamped].slug;
      onChange(nextSlug);
      const buttons = groupRef.current?.querySelectorAll<HTMLButtonElement>('[role="radio"]');
      buttons?.[clamped]?.focus();
    };
    switch (e.key) {
      case "ArrowDown":
      case "ArrowRight":
        move(idx + 1);
        break;
      case "ArrowUp":
      case "ArrowLeft":
        move(idx - 1);
        break;
      case "Home":
        move(0);
        break;
      case "End":
        move(options.length - 1);
        break;
      default:
        break;
    }
  };

  return (
    <div ref={groupRef} role="radiogroup" aria-labelledby={labelledBy} className="flex flex-col gap-2">
      {options.map((opt, idx) => {
        const isSelected = opt.slug === value;
        return (
          <button
            key={opt.slug}
            type="button"
            role="radio"
            aria-checked={isSelected}
            tabIndex={isSelected ? 0 : -1}
            onClick={() => onChange(opt.slug)}
            onKeyDown={(e) => handleKeyDown(e, idx)}
            className={`w-full h-11 px-4 flex items-center justify-between gap-3 rounded-[var(--radius-pill)] text-left text-sm transition-[background-color,color,border-color,transform] duration-[var(--dur-fast)] ease-[var(--ease-out)] cursor-pointer border motion-safe:active:scale-[0.96] ${
              isSelected
                ? "bg-[var(--color-white)] text-[var(--color-night-950)] border-[var(--color-white)] font-[560]"
                : "bg-transparent text-[var(--color-grey-300)] border-[var(--glass-stroke)] hover:border-white/20 hover:text-white"
            }`}
          >
            <span className="truncate">{opt.name}</span>
            <span
              className={`readout text-xs shrink-0 ${
                isSelected ? "text-[var(--color-night-950)]" : "text-[var(--color-grey-500)]"
              }`}
            >
              {opt.meta}
            </span>
          </button>
        );
      })}
    </div>
  );
}

export default function FitFlow() {
  const searchParams = useSearchParams();
  const { addBundle } = useCart();
  const modelSectionRef = useRef<HTMLDivElement>(null);
  const recommendedRef = useRef<HTMLDivElement>(null);

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

  const lightOptions: PillOption[] = useMemo(
    () =>
      AVAILABLE_LIGHT_SLUGS.map((slug) => getProduct(slug))
        .filter((p): p is Product => Boolean(p))
        .map((p) => ({
          slug: p.slug,
          name: p.name,
          meta: `₹${p.price.toLocaleString("en-IN")}${p.light?.lumens ? ` · ${p.light.lumens.toLocaleString()} lm` : ""}`,
        })),
    [],
  );

  const powerOptions: PillOption[] = useMemo(
    () =>
      AVAILABLE_POWER_SLUGS.map((slug) => getProduct(slug))
        .filter((p): p is Product => Boolean(p))
        .map((p) => ({
          slug: p.slug,
          name: p.name,
          meta: `₹${p.price.toLocaleString("en-IN")}`,
        })),
    [],
  );

  const mountOptions: PillOption[] = useMemo(
    () =>
      AVAILABLE_MOUNT_SLUGS.map((slug) => getProduct(slug))
        .filter((p): p is Product => Boolean(p))
        .map((p) => ({
          slug: p.slug,
          name: p.name,
          meta: `₹${p.price.toLocaleString("en-IN")}`,
        })),
    [],
  );

  // Picking a bike swaps the whole flow to the recommended-setup view. Without
  // this, the browser keeps whatever scroll position it had over the (now
  // replaced) brand/model grid, which usually lands mid- or below-fold on the
  // new content instead of at its top.
  useEffect(() => {
    if (selectedBike) {
      recommendedRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [selectedBike]);

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
        <div
          ref={recommendedRef}
          role="region"
          aria-label={`Your ${selectedBike.brand} ${selectedBike.model} setup`}
          className="w-full flex flex-col gap-10 animate-in fade-in duration-300 scroll-mt-24"
        >
          {/* Status Header */}
          <div className="glass p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xl">
            <div>
              <span className="readout text-xs text-[var(--color-beam)]">
                Recommended setup
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
              Change bike
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

                <div id="light-group-label" className="text-xs text-[var(--color-grey-500)] mb-2 font-medium">
                  Switch light model
                </div>
                <KitPillGroup
                  labelledBy="light-group-label"
                  options={lightOptions}
                  value={selectedLightSlug}
                  onChange={setSelectedLightSlug}
                />
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
                    <div id="power-group-label" className="text-xs text-[var(--color-grey-500)] mb-2 font-medium">
                      Select harness model
                    </div>
                    <KitPillGroup
                      labelledBy="power-group-label"
                      options={powerOptions}
                      value={selectedPowerSlug}
                      onChange={setSelectedPowerSlug}
                    />
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
                    <div id="mount-group-label" className="text-xs text-[var(--color-grey-500)] mb-2 font-medium">
                      Select mount type
                    </div>
                    <KitPillGroup
                      labelledBy="mount-group-label"
                      options={mountOptions}
                      value={selectedMountSlug}
                      onChange={setSelectedMountSlug}
                    />
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

          {/* Brand Grid (Solid Cards) — flex-wrap + justify-center instead of a
              fixed-column grid, so an incomplete trailing row (14 brands
              doesn't divide evenly into 3 or 4 columns) centers itself
              instead of a "12 then 2 stuck on the left" dangling row. */}
          <div className="flex flex-wrap justify-center gap-3.5">
            {brands.map((b) => {
              const isSelected = selectedBrand === b;
              return (
                <button
                  key={b}
                  type="button"
                  aria-pressed={isSelected}
                  onClick={() => handleBrandSelect(b)}
                  className={`group flex flex-col items-center gap-3 p-5 rounded-xl transition-[background-color,border-color,box-shadow,transform] duration-[var(--dur-fast)] ease-[var(--ease-out)] cursor-pointer text-center basis-[calc(50%-0.4375rem)] sm:basis-[calc(33.333%-0.584rem)] lg:basis-[calc(25%-0.657rem)] ${
                    isSelected
                      ? "bg-[var(--color-night-700)] border-2 border-[var(--color-beam)] shadow-lg scale-[1.02]"
                      : "bg-[var(--color-night-800)] border border-[var(--glass-stroke)] hover:border-white/20 hover:-translate-y-0.5"
                  }`}
                >
                  <div
                    className={`h-12 flex items-center justify-center transition-colors duration-[var(--dur-fast)] ease-[var(--ease-out)] ${
                      isSelected ? "text-[var(--color-beam)]" : "text-[var(--color-grey-300)] group-hover:text-white"
                    }`}
                  >
                    <BrandMark brand={b} size={48} />
                  </div>
                  <span
                    className={`text-sm font-medium transition-colors duration-[var(--dur-fast)] ease-[var(--ease-out)] ${
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
                  {availableBikes.length} {availableBikes.length === 1 ? "model" : "models"}
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
                  <p>No models listed for this brand yet.</p>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
