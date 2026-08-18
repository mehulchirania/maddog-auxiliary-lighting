"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/products";

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

  const primaryImage = product.gallery[0] || product.hero;
  const secondaryImage = product.gallery[1] || primaryImage;

  // Format lumens string
  const lumensFormatted = product.light?.lumens
    ? `${product.light.lumens.toLocaleString()} lm`
    : product.specs.find((s) => s.label.toLowerCase().includes("lumen"))?.value.split(" ")[0] || "";

  return (
    <Link
      href={`/products/${product.slug}/`}
      tabIndex={tabIndex}
      aria-hidden={ariaHidden}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`group flex flex-col block select-none ${className}`}
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
  );
}
