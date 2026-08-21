"use client";

import { useState, useEffect, useRef, useCallback, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { brands } from "@/lib/fitment";
import SpecularButton from "@/components/ui/SpecularButton";
import BrandMark from "@/components/ui/BrandMark";

const LISTBOX_ID = "brand-picker-listbox";
const TILE_TRANSITION_MS = 260;
const TILE_STAGGER_CAP_MS = 200;

interface BrandPickerProps {
  value: string;
  onChange: (brand: string) => void;
}

function BrandPicker({ value, onChange }: BrandPickerProps) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const optionRefs = useRef<Array<HTMLDivElement | null>>([]);
  const prefersReducedMotion = useReducedMotion();

  const selectedIndex = brands.indexOf(value as (typeof brands)[number]);

  const closePanel = useCallback((focusTrigger: boolean) => {
    setOpen(false);
    if (focusTrigger) triggerRef.current?.focus();
  }, []);

  const selectBrand = useCallback(
    (brand: string) => {
      onChange(brand);
      closePanel(true);
    },
    [onChange, closePanel],
  );

  // Move focus into the grid, onto the active brand, as soon as it opens.
  useEffect(() => {
    if (!open) return;
    const idx = selectedIndex >= 0 ? selectedIndex : 0;
    optionRefs.current[idx]?.focus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  // Click (or tap) outside closes without stealing focus.
  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: PointerEvent) => {
      const target = e.target as Node;
      if (panelRef.current?.contains(target) || triggerRef.current?.contains(target)) return;
      setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open]);

  const getColumns = () => {
    const grid = gridRef.current;
    if (!grid) return 3;
    return getComputedStyle(grid).gridTemplateColumns.split(" ").length || 3;
  };

  const focusOption = (idx: number) => {
    const clamped = Math.max(0, Math.min(brands.length - 1, idx));
    optionRefs.current[clamped]?.focus();
  };

  const handleOptionKeyDown = (e: React.KeyboardEvent, idx: number) => {
    switch (e.key) {
      case "ArrowRight":
        e.preventDefault();
        focusOption(idx + 1);
        break;
      case "ArrowLeft":
        e.preventDefault();
        focusOption(idx - 1);
        break;
      case "ArrowDown":
        e.preventDefault();
        focusOption(idx + getColumns());
        break;
      case "ArrowUp":
        e.preventDefault();
        focusOption(idx - getColumns());
        break;
      case "Enter":
      case " ":
        e.preventDefault();
        selectBrand(brands[idx]);
        break;
      case "Escape":
        e.preventDefault();
        closePanel(true);
        break;
      case "Tab":
        setOpen(false);
        break;
      default:
        break;
    }
  };

  const handleTriggerKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " " || e.key === "ArrowDown") {
      e.preventDefault();
      setOpen(true);
    } else if (e.key === "Escape" && open) {
      e.preventDefault();
      closePanel(true);
    }
  };

  return (
    <div className="relative w-full sm:w-64">
      <button
        ref={triggerRef}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={LISTBOX_ID}
        aria-label="Select motorcycle brand"
        onClick={() => (open ? closePanel(false) : setOpen(true))}
        onKeyDown={handleTriggerKeyDown}
        className="glass h-12 w-full px-4 rounded-full text-[var(--color-white)] bg-[rgba(23,23,26,0.7)] border border-[var(--glass-stroke)] flex items-center justify-between gap-3 text-base cursor-pointer"
      >
        <span className="truncate">{value}</span>
        <svg
          aria-hidden="true"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="shrink-0 transition-transform duration-[var(--dur-fast)] ease-[var(--ease-out)]"
          style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            ref={panelRef}
            initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96, y: -4 }}
            animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, scale: 1, y: 0 }}
            exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96, y: -4 }}
            transition={{ duration: prefersReducedMotion ? 0.1 : 0.18, ease: [0.22, 1, 0.36, 1] }}
            style={{ transformOrigin: "top center" }}
            className="glass absolute left-0 top-[calc(100%+0.5rem)] z-30 w-full sm:w-80 p-3 max-h-[19rem] overflow-y-auto scrollbar-none shadow-2xl"
          >
            <div
              ref={gridRef}
              role="listbox"
              id={LISTBOX_ID}
              aria-label="Motorcycle brand"
              className="grid grid-cols-3 sm:grid-cols-4 gap-2"
            >
              {brands.map((b, i) => {
                const isSelected = b === value;
                return (
                  <motion.div
                    key={b}
                    ref={(el) => {
                      optionRefs.current[i] = el;
                    }}
                    role="option"
                    aria-selected={isSelected}
                    tabIndex={-1}
                    onKeyDown={(e) => handleOptionKeyDown(e, i)}
                    onClick={() => selectBrand(b)}
                    whileTap={prefersReducedMotion ? undefined : { scale: 0.97 }}
                    initial={prefersReducedMotion ? undefined : { opacity: 0, y: 6 }}
                    animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
                    transition={
                      prefersReducedMotion
                        ? { duration: 0 }
                        : {
                            duration: TILE_TRANSITION_MS / 1000,
                            delay: Math.min(i * 25, TILE_STAGGER_CAP_MS) / 1000,
                            ease: [0.22, 1, 0.36, 1],
                          }
                    }
                    className={`flex flex-col items-center gap-2 rounded-2xl border p-3 cursor-pointer select-none transition-colors duration-[var(--dur-fast)] ease-[var(--ease-out)] ${
                      isSelected
                        ? "border-[var(--color-beam)]"
                        : "border-transparent hover:border-[var(--glass-stroke)] hover:bg-[var(--color-night-700)]"
                    }`}
                  >
                    <span
                      className={isSelected ? "text-[var(--color-beam)]" : "text-[var(--color-grey-300)]"}
                    >
                      <BrandMark brand={b} size={30} />
                    </span>
                    <span
                      className={`text-[0.75rem] text-center leading-tight ${
                        isSelected ? "text-[var(--color-white)]" : "text-[var(--color-grey-300)]"
                      }`}
                    >
                      {b}
                    </span>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function FitForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedBrand, setSelectedBrand] = useState<string>(brands[0]);

  useEffect(() => {
    const brandParam = searchParams.get("brand");
    if (brandParam && brands.includes(brandParam as (typeof brands)[number])) {
      setSelectedBrand(brandParam);
    }
  }, [searchParams]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/fit/?brand=${encodeURIComponent(selectedBrand)}`);
  };

  return (
    <form onSubmit={handleSubmit} className="mt-8 flex flex-col sm:flex-row gap-3 items-center justify-center">
      <BrandPicker value={selectedBrand} onChange={setSelectedBrand} />

      <SpecularButton
        type="submit"
        size="md"
        tint="#ffffff"
        tintOpacity={1}
        textColor="#0a0a0b"
        lineColor="#ffffff"
        baseColor="#a3a3a3"
        intensity={1.2}
        className="w-full sm:w-auto shrink-0 group"
      >
        <span>Show my fits</span>
        <span
          aria-hidden="true"
          className="ml-1 flex h-[34px] w-[34px] items-center justify-center rounded-full bg-[rgba(10,10,11,0.08)] transition-transform duration-[220ms] ease-[var(--ease-out)] motion-safe:group-hover:translate-x-[2px] motion-safe:group-hover:-translate-y-[1px] motion-safe:group-hover:scale-105"
        >
          →
        </span>
      </SpecularButton>
    </form>
  );
}

export default function FitCta() {
  return (
    <section id="fit" className="py-24 sm:py-32 border-t border-[var(--glass-stroke)] text-center">
      <div className="max-w-7xl mx-auto px-6 sm:px-12">
        <h2
          className="text-[var(--color-white)] font-[560] tracking-tight"
          style={{ fontSize: "var(--text-statement)", letterSpacing: "var(--ls-statement)" }}
        >
          Built for what you ride.
        </h2>

        <div className="flex justify-center">
          <Suspense fallback={<div className="h-12 mt-8 flex items-center justify-center text-sm text-[var(--color-grey-500)]">Loading finder...</div>}>
            <FitForm />
          </Suspense>
        </div>

        <p className="readout mt-7 text-center">
          One price, all year. Never discounted, never inflated.
        </p>
      </div>
    </section>
  );
}
