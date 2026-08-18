"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { formatPrice, type Product } from "@/lib/products";
import { useCart } from "@/lib/cart";
import SpecularButton from "@/components/ui/SpecularButton";

export default function ProductBuySection({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [selectedImage, setSelectedImage] = useState(0);
  const [added, setAdded] = useState(false);

  const images = product.gallery.length > 0 ? product.gallery : [product.hero];

  const handleAddToCart = () => {
    addItem(product, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
      {/* Left: Full-width Studio Plate Hero with Large Render */}
      <div className="lg:col-span-7 flex flex-col gap-6">
        <div className="relative w-full aspect-square sm:aspect-[4/3] rounded-[var(--radius-card)] bg-[var(--color-plate)] p-[12%] overflow-hidden border border-white/5 shadow-2xl flex items-center justify-center">
          <Image
            src={images[selectedImage] || product.hero}
            alt={product.name}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 60vw"
            className="object-contain p-[8%]"
          />
        </div>

        {/* Thumbnail selector if multiple images */}
        {images.length > 1 && (
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none">
            {images.slice(0, 5).map((img, idx) => (
              <button
                key={img}
                type="button"
                onClick={() => setSelectedImage(idx)}
                className={`relative w-20 h-20 rounded-xl bg-[var(--color-plate)] p-2 overflow-hidden border transition-all cursor-pointer shrink-0 ${
                  selectedImage === idx
                    ? "border-[var(--color-white)] ring-2 ring-white/30 scale-105"
                    : "border-transparent opacity-60 hover:opacity-100"
                }`}
              >
                <Image
                  src={img}
                  alt={`${product.name} thumbnail ${idx + 1}`}
                  fill
                  sizes="80px"
                  className="object-contain p-1"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Right: Sticky Buy Column */}
      <div className="lg:col-span-5 lg:sticky lg:top-24 flex flex-col gap-6">
        <div>
          <span className="readout text-xs text-[var(--color-grey-500)]">
            SKU: {product.code}
          </span>
          <h1
            className="mt-2 font-[560] text-[var(--color-white)] tracking-tight leading-[1.08]"
            style={{ fontSize: "var(--text-statement)", letterSpacing: "var(--ls-statement)" }}
          >
            {product.name}
          </h1>
          <p className="mt-4 text-[var(--color-grey-300)] text-base sm:text-lg leading-relaxed font-normal">
            {product.tagline || product.description}
          </p>
        </div>

        {/* Price */}
        <div className="pt-2">
          <p className="text-3xl font-medium text-[var(--color-white)]">
            {formatPrice(product.price)}
          </p>
          <p className="readout text-xs text-[var(--color-grey-500)] mt-1">
            Standard factory pricing · 18-month direct warranty
          </p>
        </div>

        {/* Add to Cart button (SpecularButton) */}
        <div className="flex flex-col gap-3 pt-2">
          <SpecularButton
            size="lg"
            tint="#ffffff"
            tintOpacity={1}
            textColor="#0a0a0b"
            lineColor="#ffffff"
            baseColor="#a3a3a3"
            intensity={1.3}
            onClick={handleAddToCart}
            className="w-full"
          >
            <span>{added ? "Added to Cart ✓" : "Add to Cart"}</span>
          </SpecularButton>

          {/* Fitment note link */}
          <Link
            href="/fit/"
            className="inline-flex items-center justify-center gap-1.5 text-sm text-[var(--color-grey-300)] hover:text-[var(--color-white)] underline underline-offset-4 decoration-white/20 transition-colors pt-2"
          >
            <span>Check motorcycle chassis compatibility</span>
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
