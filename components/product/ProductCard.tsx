"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/products";
import { useCart } from "@/lib/cart";

interface ProductCardProps {
  product: Product;
  className?: string;
  tabIndex?: number;
  ariaHidden?: boolean;
}

export default function ProductCard({
  product,
  className = "",
  tabIndex,
  ariaHidden,
}: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const { addItem } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    // The card body is a Link — stop this button's click from also
    // triggering navigation to the product page. Confirmation is the cart
    // drawer itself opening (addItem sets isCartOpen) — a local "Added ✓"
    // button-text swap was tried and dropped: addItem's setIsCartOpen
    // triggers a context-wide re-render that reliably discarded the local
    // state in the same tick under React 19's dev-mode double-render, so it
    // never stayed on screen. The drawer opening doesn't have that problem.
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
  };

  const primaryImage = product.gallery[0] || product.hero;
  const secondaryImage = product.gallery[1] || primaryImage;

  // Format lumens string
  const lumensFormatted = product.light?.lumens
    ? `${product.light.lumens.toLocaleString()} lm`
    : product.specs.find((s) => s.label.toLowerCase().includes("lumen"))?.value.split(" ")[0] || "";

  return (
    <div className={`flex flex-col ${className}`} aria-hidden={ariaHidden}>
      <Link
        href={`/products/${product.slug}/`}
        tabIndex={tabIndex}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="group flex flex-col block select-none"
        style={{ perspective: 1000 }}
      >
        {/* Studio Plate Frame */}
        <div
          className="relative w-full aspect-square rounded-[var(--radius-card)] bg-[var(--color-plate)] p-[12%] overflow-hidden transition-all duration-[var(--dur-fast)] ease-out border border-white/5"
          style={{
            transform: isHovered ? "translateY(-6px) rotateY(-4deg)" : "none",
            transformStyle: "preserve-3d",
            boxShadow: isHovered ? "0 20px 30px -10px rgba(0,0,0,0.5)" : "none",
          }}
        >
          <Image
            src={isHovered ? secondaryImage : primaryImage}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 72vw, (max-width: 1200px) 33vw, 420px"
            className="object-contain p-[10%] transition-opacity duration-200"
          />
        </div>

        {/* Info Below Plate */}
        <div className="mt-4 flex flex-col gap-1">
          <h3
            className="font-[560] text-[var(--color-white)] group-hover:text-[var(--color-beam)] transition-colors duration-[var(--dur-fast)]"
            style={{ fontSize: "var(--text-title)" }}
          >
            {product.name}
          </h3>

          <p className="readout">
            {lumensFormatted ? `${lumensFormatted} · ` : ""}5000K · IP-67
          </p>

          {product.price > 0 && (
            <p className="text-sm font-medium text-[var(--color-white)] mt-0.5">
              ₹{product.price.toLocaleString("en-IN")}
            </p>
          )}
        </div>
      </Link>

      <button
        type="button"
        tabIndex={tabIndex}
        onClick={handleAddToCart}
        className="mt-3 h-10 rounded-full text-sm font-medium border transition-colors duration-[var(--dur-fast)] ease-[var(--ease-out)] cursor-pointer bg-transparent text-[var(--color-white)] border-white/16 hover:border-white/32 hover:bg-white/5 active:scale-[0.97]"
      >
        Add to cart
      </button>
    </div>
  );
}
