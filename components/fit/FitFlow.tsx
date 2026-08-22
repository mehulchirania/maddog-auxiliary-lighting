"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { brands, bikesForBrand, type Bike } from "@/lib/fitment";
import { getProduct, type Product } from "@/lib/products";
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
                ? "bg-[var(--color-white)] text-[var(--color-night-950)] border-[var(--color-white)]"
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
    <div className="w-full mx-auto flex flex-col items-center gap-12">
      {/* Recommended & Customizable Setup View */}
      {selectedBike ? (
        <div
          ref={recommendedRef}
          role="region"
          aria-label={`Your ${selectedBike.brand} ${selectedBike.model} setup`}
          className="w-full max-w-5xl flex flex-col gap-10 animate-in fade-in duration-300 scroll-mt-24"
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
        /* Brand tiles + mapped-model results */
        <div className="w-full flex flex-col gap-10">
          {/* Brand tiles. The mockup draws a rigid 7-column grid; 14 brands
              divides evenly there but not at narrower breakpoints, so this
              keeps flex-wrap + justify-center (an incomplete trailing row
              centres itself instead of dangling left) and treats "7 across"
              as a basis target at lg. */}
          <div className="flex flex-wrap justify-center gap-2.5">
            {brands.map((b) => {
              const isSelected = selectedBrand === b;
              return (
                <button
                  key={b}
                  type="button"
                  aria-pressed={isSelected}
                  onClick={() => handleBrandSelect(b)}
                  className={`group flex flex-col items-center gap-2.5 px-2 pt-[18px] pb-3.5 rounded-[var(--radius-card)] transition-[background-color,border-color,color] duration-[var(--dur-fast)] ease-[var(--ease-out)] cursor-pointer text-center basis-[calc(33.333%-0.417rem)] sm:basis-[calc(25%-0.469rem)] lg:basis-[calc(14.2857%-0.536rem)] border ${
                    isSelected
                      ? "border-[var(--color-beam)]/50 text-[var(--color-beam)]"
                      : "bg-[var(--color-night-900)]/80 border-[var(--glass-stroke)] text-[var(--color-grey-300)] hover:border-[var(--color-beam)]/40"
                  }`}
                  style={
                    isSelected
                      ? {
                          backgroundColor:
                            "color-mix(in srgb, var(--color-beam) 7%, transparent)",
                        }
                      : undefined
                  }
                >
                  <BrandMark brand={b} size={30} />
                  <span
                    className={`readout text-xs leading-tight tracking-[0.04em] transition-colors duration-[var(--dur-fast)] ease-[var(--ease-out)] ${
                      isSelected
                        ? "text-[var(--color-white)]"
                        : "text-[var(--color-grey-500)] group-hover:text-[var(--color-white)]"
                    }`}
                  >
                    {b}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Mapped models for the selected brand */}
          {selectedBrand && (
            <div ref={modelSectionRef} className="animate-in fade-in duration-300 scroll-mt-24">
              <div className="flex items-baseline justify-between gap-6 flex-wrap mb-6">
                <h2
                  className="text-[var(--color-white)] uppercase m-0"
                  style={{
                    fontSize: "var(--text-statement)",
                    fontWeight: "var(--fw-statement)",
                    letterSpacing: "var(--ls-statement)",
                  }}
                >
                  {selectedBrand}
                </h2>
                <span className="readout text-xs text-[var(--color-grey-500)]">
                  {availableBikes.length} {availableBikes.length === 1 ? "model" : "models"} mapped
                </span>
              </div>

              {availableBikes.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-[18px]">
                  {availableBikes.map((bike) => {
                    const light = getProduct(bike.recommended.light);
                    const power = getProduct(bike.recommended.power);
                    const mount = bike.recommended.mount
                      ? getProduct(bike.recommended.mount)
                      : null;
                    const beamMeta = light?.light
                      ? `${light.light.lumens.toLocaleString()} lm · ${light.light.wattsPair}W · ${light.light.beamDistanceM} m`
                      : light?.tagline ?? "";
                    return (
                      <button
                        key={bike.id}
                        type="button"
                        onClick={() => setSelectedBike(bike)}
                        className="group text-left border border-[var(--glass-stroke)] rounded-[var(--radius-card)] p-7 bg-[var(--color-night-900)] flex flex-col gap-4 cursor-pointer transition-colors duration-[var(--dur-fast)] ease-[var(--ease-out)] hover:border-[var(--color-beam)]/40"
                      >
                        <div className="flex items-baseline justify-between gap-4">
                          <h3
                            className="m-0 text-[var(--color-white)] tracking-tight"
                            style={{ fontSize: "var(--text-title)", fontWeight: 560 }}
                          >
                            {bike.model}
                          </h3>
                          <span className="readout text-[0.625rem] uppercase tracking-[0.18em] text-[var(--color-grey-500)] border border-[var(--glass-stroke)] rounded-[var(--radius-pill)] px-3 py-1 shrink-0 capitalize">
                            {bike.kind}
                          </span>
                        </div>

                        <p className="m-0 text-[var(--color-grey-300)] text-[0.9375rem] leading-relaxed">
                          {bike.rationale}
                        </p>

                        <div className="border-t border-[var(--glass-stroke)] pt-4 flex flex-col gap-2.5">
                          <div className="flex justify-between gap-3 items-baseline">
                            <span className="readout text-[0.625rem] uppercase tracking-[0.18em] text-[var(--color-grey-500)]">
                              Light
                            </span>
                            <span className="text-[0.9375rem] text-[var(--color-white)] text-right">
                              {light?.name ?? bike.recommended.light}{" "}
                              {light ? (
                                <span className="readout text-xs text-[var(--color-beam)]">
                                  ₹{light.price.toLocaleString("en-IN")}
                                </span>
                              ) : null}
                            </span>
                          </div>
                          {beamMeta && (
                            <div className="flex justify-between gap-3 items-baseline">
                              <span className="readout text-[0.625rem] uppercase tracking-[0.18em] text-[var(--color-grey-500)]">
                                Beam
                              </span>
                              <span className="readout text-xs text-[var(--color-grey-300)] text-right">
                                {beamMeta}
                              </span>
                            </div>
                          )}
                          <div className="flex justify-between gap-3 items-baseline">
                            <span className="readout text-[0.625rem] uppercase tracking-[0.18em] text-[var(--color-grey-500)]">
                              Power
                            </span>
                            <span className="text-[0.9375rem] text-[var(--color-grey-300)] text-right">
                              {power?.name ?? bike.recommended.power}
                            </span>
                          </div>
                          {mount && (
                            <div className="flex justify-between gap-3 items-baseline">
                              <span className="readout text-[0.625rem] uppercase tracking-[0.18em] text-[var(--color-grey-500)]">
                                Mount
                              </span>
                              <span className="text-[0.9375rem] text-[var(--color-grey-300)] text-right">
                                {mount.name}
                              </span>
                            </div>
                          )}
                        </div>

                        <span className="mt-auto self-start readout text-xs uppercase tracking-[0.1em] text-[var(--color-grey-300)] border-b border-[var(--glass-stroke)] pb-[3px] transition-colors duration-[var(--dur-fast)] ease-[var(--ease-out)] group-hover:text-[var(--color-beam)] group-hover:border-[var(--color-beam)]">
                          Configure this kit →
                        </span>
                      </button>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-8 text-sm text-[var(--color-grey-500)]">
                  <p>No models listed for this brand yet.</p>
                </div>
              )}
            </div>
          )}

          <p className="readout text-xs tracking-[0.08em] text-[var(--color-grey-500)] text-center">
            Don&rsquo;t see your bike? WhatsApp us on +91 70191 30080 — fitment advice is free.
          </p>
        </div>
      )}
    </div>
  );
}
