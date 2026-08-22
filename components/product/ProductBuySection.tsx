"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { formatPrice, type Category, type Product } from "@/lib/products";
import type { FieldMedia } from "@/lib/fieldMedia";
import { useCart } from "@/lib/cart";
import SpecularButton from "@/components/ui/SpecularButton";
import SpecTable from "@/components/product/SpecTable";
import CountUp from "@/components/animations/CountUp";
import Tilt from "@/components/animations/Tilt";
import Lightbox from "@/components/ui/Lightbox";

/* Singular, breadcrumb-friendly category names. */
const CATEGORY_LABEL: Record<Category, string> = {
  "aux-light": "Aux light",
  "car-fog-lamp": "Car fog lamp",
  mount: "Mount",
  power: "Power & wiring",
  filter: "Filter",
  clamp: "Clamp",
  "ev-edition": "EV edition",
};

export function categoryLabel(category: Category): string {
  return CATEGORY_LABEL[category] ?? "Product";
}

function galleryOf(product: Product): string[] {
  const list = product.gallery.length > 0 ? product.gallery : [product.hero];
  return list.filter(Boolean);
}

/* ------------------------------------------------------------------ */
/* 1. Buy section                                                      */
/* ------------------------------------------------------------------ */

export default function ProductBuySection({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [selectedImage, setSelectedImage] = useState(0);
  const [added, setAdded] = useState(false);

  const images = galleryOf(product);
  const thumbs = images.slice(0, 6);

  const handleAddToCart = () => {
    addItem(product, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
      {/* Left — plate-background main render + thumbnail strip */}
      <div className="lg:col-span-7">
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[var(--radius-card)] border border-[var(--glass-stroke)] bg-[var(--color-plate)]">
          <Image
            src={images[selectedImage] || product.hero}
            alt={product.name}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 58vw"
            className="object-contain p-[6%]"
          />
        </div>

        {thumbs.length > 1 && (
          <div className="mt-3 grid grid-cols-6 gap-2.5">
            {thumbs.map((img, idx) => (
              <button
                key={img}
                type="button"
                onClick={() => setSelectedImage(idx)}
                aria-label={`View ${product.name} image ${idx + 1}`}
                aria-current={selectedImage === idx}
                className={`relative aspect-square cursor-pointer overflow-hidden rounded-xl bg-[var(--color-plate)] border transition-colors duration-[var(--dur-fast)] ${
                  selectedImage === idx
                    ? "border-[var(--color-beam)]"
                    : "border-[var(--glass-stroke)] hover:border-white/25"
                }`}
              >
                <Image
                  src={img}
                  alt={`${product.name} thumbnail ${idx + 1}`}
                  fill
                  sizes="120px"
                  className="object-contain p-[8%]"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Right — identity, price, buy */}
      <div className="lg:col-span-5">
        <span className="readout uppercase tracking-[0.28em] text-[0.6875rem] text-[var(--color-grey-500)]">
          {categoryLabel(product.category)} · {product.code}
        </span>

        <h1
          className="mt-3.5 mb-0 font-[750] uppercase leading-[0.95] text-[var(--color-white)]"
          style={{
            fontSize: "var(--text-page-title)",
            letterSpacing: "var(--ls-page-title)",
            fontStretch: "120%",
          }}
        >
          {product.name}
        </h1>

        <p className="mt-4 max-w-[44ch] text-[1.0625rem] leading-relaxed text-[var(--color-grey-300)]">
          {product.tagline || product.description}
        </p>

        <div className="mt-6 flex flex-wrap items-baseline gap-4">
          <span className="readout text-[1.75rem] sm:text-[2rem] tabular-nums text-[var(--color-beam)]">
            {formatPrice(product.price)}
          </span>
          {product.reviewCount > 0 && (
            <span className="readout tracking-[0.08em] text-[var(--color-grey-500)]">
              ★ {product.rating.toFixed(1)} · {product.reviewCount}{" "}
              {product.reviewCount === 1 ? "review" : "reviews"}
            </span>
          )}
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <SpecularButton
            size="lg"
            tint="#ffffff"
            tintOpacity={1}
            textColor="#0a0a0b"
            lineColor="#ffffff"
            baseColor="#a3a3a3"
            intensity={1.3}
            onClick={handleAddToCart}
          >
            <span>{added ? "Added to cart ✓" : "Add to cart"}</span>
          </SpecularButton>

          <Link
            href="/fit/"
            className="inline-flex h-[52px] items-center rounded-[var(--radius-pill)] border border-white/20 px-7 text-base text-[var(--color-white)] no-underline transition-colors duration-[var(--dur-fast)] hover:border-[var(--color-beam)]/50 hover:text-[var(--color-beam)]"
          >
            Check my fit
          </Link>
        </div>

        <p className="readout mt-5 uppercase tracking-[0.14em] text-[0.6875rem] text-[var(--color-grey-500)]">
          One price, all year · never discounted
        </p>

        {product.kitContents.length > 0 && (
          <div className="mt-7 border-t border-[var(--glass-stroke)] pt-6">
            <div className="readout uppercase tracking-[0.22em] text-[0.625rem] text-[var(--color-grey-500)]">
              In the box
            </div>
            <ul className="mt-3 flex list-none flex-col gap-2 p-0">
              {product.kitContents.map((item) => (
                <li
                  key={item}
                  className="flex gap-2.5 text-[0.9375rem] text-[var(--color-grey-300)]"
                >
                  <span aria-hidden="true" className="text-[var(--color-beam)]">
                    ·
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 2. Sticky scroll scene — driven by `product.light`                  */
/* ------------------------------------------------------------------ */

interface Scene {
  count: number;
  suffix: string;
  title: string;
  body: string;
  image: string;
  caption: string;
}

/**
 * Optics labels are Title Case ("80% Spot / 20% Flood Hybrid TIR") but read as
 * prose mid-sentence. Lowercase the words, keeping all-caps acronyms intact —
 * "hybrid tir optics" is wrong, TIR is total internal reflection.
 */
function lowerKeepingAcronyms(label: string): string {
  return label
    .split(" ")
    .map((word) => (/^[A-Z]{2,}$/.test(word) ? word : word.toLowerCase()))
    .join(" ");
}

function buildScenes(product: Product): Scene[] {
  const light = product.light;
  if (!light) return [];

  const images = galleryOf(product);
  const pick = (i: number) => images[i % images.length] || product.hero;
  const scenes: Scene[] = [];

  if (light.lumens > 0) {
    scenes.push({
      count: light.lumens,
      suffix: "",
      title: "Raw lumens, per pair",
      body: `Measured output, not marketing output — ${light.wattsEach}W per pod driving the emitter array behind ${lowerKeepingAcronyms(light.opticsLabel)} optics.`,
      image: pick(1),
      caption: "Emitter array",
    });
  }

  if (light.beamDistanceM > 0) {
    scenes.push({
      count: light.beamDistanceM,
      suffix: " m",
      title: "Peak beam distance @ 1 lux",
      body: `${light.spot}% spot / ${light.flood}% flood pushes a collimated core ${light.beamDistanceM} metres down the road while the shoulders stay lit.`,
      image: pick(2),
      caption: "Measured spot beam",
    });
  }

  if (light.wattsPair > 0) {
    scenes.push({
      count: light.wattsPair,
      suffix: " W",
      title: "Total draw, per pair",
      body: `${light.wattsPair} watts across both pods — ${light.wattsEach}W each${
        light.dualMode ? ", with a dual-mode low setting for town riding" : ""
      }. Sized for a stock motorcycle charging circuit.`,
      image: pick(3),
      caption: `${light.wattsEach}W per pod`,
    });
  }

  if (light.spot > 0) {
    scenes.push({
      count: light.spot,
      suffix: "%",
      title: "Spot in the beam blend",
      body: `${light.opticsLabel}. The spot core carries distance, the flood share fills the verge so the road does not tunnel.`,
      image: pick(4),
      caption: light.opticsLabel,
    });
  }

  return scenes;
}

export function ProductScenes({ product }: { product: Product }) {
  const scenes = useMemo(() => buildScenes(product), [product]);
  const [active, setActive] = useState(0);
  const sceneRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (scenes.length === 0) return;
    if (typeof IntersectionObserver === "undefined") return;
    if (
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
    ) {
      // No-op under reduced motion: the first scene image simply stays put.
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const idx = Number((entry.target as HTMLElement).dataset.scene);
          if (!Number.isNaN(idx)) setActive(idx);
        });
      },
      // A zero-height band across the viewport midpoint.
      { rootMargin: "-50% 0px -50% 0px", threshold: 0 },
    );

    sceneRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, [scenes.length]);

  if (scenes.length === 0) return null;

  const current = scenes[active] ?? scenes[0];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
      {/* Sticky image panel */}
      <div className="lg:sticky lg:top-24">
        <div className="relative aspect-square w-full overflow-hidden rounded-[var(--radius-card)] border border-[var(--glass-stroke)] bg-[var(--color-night-800)]">
          {scenes.map((scene, i) => (
            <Image
              key={`${scene.image}-${i}`}
              src={scene.image}
              alt={`${product.name} — ${scene.title}`}
              fill
              sizes="(max-width: 1024px) 100vw, 46vw"
              className="object-cover transition-opacity duration-[var(--dur-base)] ease-[var(--ease-out)]"
              style={{ opacity: i === active ? 1 : 0 }}
            />
          ))}
          <div className="readout absolute bottom-4 left-5 rounded-[var(--radius-pill)] border border-[var(--glass-stroke)] bg-[var(--color-night-950)]/70 px-3.5 py-1.5 uppercase tracking-[0.18em] text-[0.6875rem] text-[var(--color-grey-300)] backdrop-blur-md">
            {current.caption}
          </div>
        </div>
      </div>

      {/* Scene blocks */}
      <div>
        <span className="readout uppercase tracking-[0.28em] text-[0.6875rem] text-[var(--color-grey-500)]">
          01 / Engineering
        </span>
        <h2
          className="mt-4 mb-0 font-[700] uppercase leading-none text-[var(--color-white)]"
          style={{
            fontSize: "var(--text-statement)",
            fontWeight: "var(--fw-statement)",
            letterSpacing: "var(--ls-statement)",
            fontStretch: "116%",
          }}
        >
          Numbers first
        </h2>

        {scenes.map((scene, i) => (
          <div
            key={scene.title}
            data-scene={i}
            ref={(el) => {
              sceneRefs.current[i] = el;
            }}
            className="flex min-h-[60vh] flex-col justify-center border-b border-white/[0.08]"
          >
            <CountUp
              to={scene.count}
              suffix={scene.suffix}
              className="readout text-[clamp(2.5rem,4.5vw,4rem)] leading-none tabular-nums text-[var(--color-beam)]"
            />
            <h3 className="mt-2.5 mb-0 text-[1.375rem] font-[600] tracking-tight text-[var(--color-white)]">
              {scene.title}
            </h3>
            <p className="mt-3 max-w-[46ch] text-[var(--color-grey-300)]">{scene.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 3. Tabs — highlights & gallery / full spec sheet                    */
/* ------------------------------------------------------------------ */

export function ProductTabs({
  product,
  fieldMedia = [],
}: {
  product: Product;
  fieldMedia?: FieldMedia[];
}) {
  const images = galleryOf(product);
  const galleryCards: { src: string; caption?: string }[] = [
    ...(images.length > 1 ? images.slice(1) : images).map((src) => ({ src })),
    ...fieldMedia.map((m) => ({ src: m.src, caption: m.caption })),
  ];

  const beamProfile = product.photometrics?.beamProfile;
  const hasGalleryTab = galleryCards.length > 0 || Boolean(beamProfile);
  const hasSpecs = product.specs.length > 0;
  const sideImages = Boolean(product.photometrics?.diagram || product.dimensions?.blueprint);

  const [tab, setTab] = useState<"gallery" | "specs">(
    hasGalleryTab ? "gallery" : "specs",
  );

  if (!hasGalleryTab && !hasSpecs) return null;

  const showGallery = hasGalleryTab && tab === "gallery";
  const showSpecs = hasSpecs && (tab === "specs" || !hasGalleryTab);

  const pill = (active: boolean) =>
    `readout cursor-pointer rounded-[var(--radius-pill)] border-0 px-5 py-2.5 uppercase tracking-[0.06em] transition-colors duration-[var(--dur-fast)] ${
      active
        ? "bg-[var(--color-white)] text-[var(--color-night-950)]"
        : "bg-transparent text-[var(--color-grey-300)] hover:text-[var(--color-white)]"
    }`;

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-6">
        <div>
          <span className="readout uppercase tracking-[0.28em] text-[0.6875rem] text-[var(--color-grey-500)]">
            02 / The data
          </span>
          <h2
            className="mt-4 mb-0 font-[700] uppercase leading-none text-[var(--color-white)]"
            style={{
              fontSize: "var(--text-statement)",
              fontWeight: "var(--fw-statement)",
              letterSpacing: "var(--ls-statement)",
              fontStretch: "116%",
            }}
          >
            Read it like a datasheet
          </h2>
        </div>

        {hasGalleryTab && hasSpecs && (
          <div
            role="tablist"
            aria-label={`${product.name} detail views`}
            className="flex gap-1.5 rounded-[var(--radius-pill)] border border-[var(--glass-stroke)] bg-[var(--color-night-800)]/60 p-1"
          >
            <button
              type="button"
              role="tab"
              aria-selected={tab === "gallery"}
              onClick={() => setTab("gallery")}
              className={pill(tab === "gallery")}
            >
              Highlights &amp; gallery
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={tab === "specs"}
              onClick={() => setTab("specs")}
              className={pill(tab === "specs")}
            >
              Full spec sheet
            </button>
          </div>
        )}
      </div>

      {showGallery && (
        <div className="mt-8">
          {galleryCards.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {galleryCards.map((card, i) => (
                <figure key={`${card.src}-${i}`} className="m-0">
                  <Tilt className="relative aspect-[4/3] w-full overflow-hidden rounded-[var(--radius-card)] border border-[var(--glass-stroke)] bg-[var(--color-plate)]">
                    <Image
                      src={card.src}
                      alt={card.caption || `${product.name} gallery image ${i + 1}`}
                      fill
                      loading="lazy"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 30vw"
                      className="object-cover"
                    />
                  </Tilt>
                  {card.caption && (
                    <figcaption className="readout mt-2 px-1 text-[var(--color-grey-500)]">
                      {card.caption}
                    </figcaption>
                  )}
                </figure>
              ))}
            </div>
          )}

          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            {beamProfile && (
              <div className="rounded-[var(--radius-card)] border border-[var(--glass-stroke)] bg-[var(--color-night-900)] p-7">
                <div className="readout uppercase tracking-[0.22em] text-[0.625rem] text-[var(--color-grey-500)]">
                  Beam profile
                </div>
                <p className="mt-3 text-[var(--color-grey-300)]">
                  {beamProfile}. {product.photometrics?.description}
                </p>
              </div>
            )}
            <div className="rounded-[var(--radius-card)] border border-[var(--glass-stroke)] bg-[var(--color-night-900)] p-7">
              <div className="readout uppercase tracking-[0.22em] text-[0.625rem] text-[var(--color-grey-500)]">
                Built for
              </div>
              <p className="mt-3 text-[var(--color-grey-300)]">{product.description}</p>
            </div>
          </div>
        </div>
      )}

      {showSpecs && (
        <div
          className={`mt-8 grid grid-cols-1 gap-4 items-start ${
            sideImages ? "lg:grid-cols-[7fr_5fr]" : ""
          }`}
        >
          <SpecTable specs={product.specs} />

          {sideImages && (
            <div className="flex flex-col gap-4">
              {product.photometrics?.diagram && (
                <figure className="m-0 overflow-hidden rounded-[var(--radius-card)] border border-[var(--glass-stroke)] bg-[var(--color-night-900)]">
                  <Lightbox
                    src={product.photometrics.diagram}
                    alt={`${product.name} exploded CAD schematic`}
                  >
                    <Image
                      src={product.photometrics.diagram}
                      alt={`${product.name} exploded CAD schematic`}
                      width={800}
                      height={600}
                      className="block h-auto w-full"
                    />
                  </Lightbox>
                  <figcaption className="readout px-5 py-3.5 uppercase tracking-[0.12em] text-[0.6875rem] text-[var(--color-grey-500)]">
                    {product.photometrics.description}
                  </figcaption>
                </figure>
              )}

              {product.dimensions?.blueprint && (
                <figure className="m-0 overflow-hidden rounded-[var(--radius-card)] border border-[var(--glass-stroke)] bg-[var(--color-night-900)]">
                  <Lightbox
                    src={product.dimensions.blueprint}
                    alt={`${product.name} dimensional blueprint`}
                  >
                    <Image
                      src={product.dimensions.blueprint}
                      alt={`${product.name} dimensional blueprint`}
                      width={800}
                      height={600}
                      className="block h-auto w-full"
                    />
                  </Lightbox>
                  <figcaption className="readout px-5 py-3.5 uppercase tracking-[0.12em] text-[0.6875rem] text-[var(--color-grey-500)]">
                    {product.dimensions.widthMm} × {product.dimensions.heightMm} ×{" "}
                    {product.dimensions.depthMm} mm · {product.dimensions.weightGrams} g per pod
                  </figcaption>
                </figure>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
