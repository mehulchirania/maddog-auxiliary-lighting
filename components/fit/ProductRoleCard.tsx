"use client";

import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/products";
import { formatPrice } from "@/lib/products";
import SpotlightCard from "@/components/animations/SpotlightCard";

type Role = "light" | "power" | "mount";

const roleLabel: Record<Role, string> = {
  light: "Primary Aux Light",
  power: "Power & Switching",
  mount: "Mounting Solution",
};

export default function ProductRoleCard({ role, product }: { role: Role; product: Product }) {
  return (
    <SpotlightCard
      spotlightColor="rgba(237, 29, 36, 0.12)"
      className="hairline border bg-ink-900 flex flex-col overflow-hidden rounded-xl shadow-sm transition-all duration-200 hover:border-ink-500 hover:shadow-md h-full"
    >
      <div className="relative aspect-[4/3] bg-ink-950 p-6 flex items-center justify-center border-b hairline">
        <Image
          src={product.hero}
          alt={product.name}
          fill
          sizes="(min-width: 1024px) 320px, (min-width: 640px) 45vw, 90vw"
          className="object-contain p-6 transition-transform duration-300 hover:scale-[1.04]"
        />
        <div className="absolute top-3 left-3">
          <span className="eyebrow bg-ink-900/90 border hairline px-2.5 py-1 rounded text-signal-500 font-mono text-[10px]">
            {roleLabel[role]}
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="min-h-[3rem]">
          <Link
            href={`/products/${product.slug}/`}
            className="font-display text-bone hover:text-signal-400 font-medium leading-snug transition-colors"
            style={{ fontSize: "var(--text-h3)" }}
          >
            {product.name}
          </Link>
          <p className="text-fog-400 mt-1 line-clamp-1" style={{ fontSize: "var(--text-caption)" }}>
            {product.tagline}
          </p>
        </div>

        <div className="my-4 border-y hairline py-3">
          {product.light ? (
            <dl className="grid grid-cols-3 gap-2">
              <div>
                <dt className="text-fog-500 text-[10px] uppercase font-mono">Lumens</dt>
                <dd className="tnum text-bone font-medium" style={{ fontSize: "var(--text-caption)" }}>
                  {product.light.lumens.toLocaleString("en-IN")} lm
                </dd>
              </div>
              <div>
                <dt className="text-fog-500 text-[10px] uppercase font-mono">Beam</dt>
                <dd className="tnum text-bone font-medium" style={{ fontSize: "var(--text-caption)" }}>
                  {product.light.beamDistanceM} m
                </dd>
              </div>
              <div>
                <dt className="text-fog-500 text-[10px] uppercase font-mono">Optics</dt>
                <dd className="tnum text-bone font-medium" style={{ fontSize: "var(--text-caption)" }}>
                  {product.light.spot}/{product.light.flood}
                </dd>
              </div>
            </dl>
          ) : product.category === "power" ? (
            <dl className="grid grid-cols-2 gap-2">
              <div>
                <dt className="text-fog-500 text-[10px] uppercase font-mono">Harness</dt>
                <dd className="text-bone font-medium text-[12px] truncate">
                  {product.slug === "dimmer" ? "Pro Dimming" : "Waterproof Pro"}
                </dd>
              </div>
              <div>
                <dt className="text-fog-500 text-[10px] uppercase font-mono">Compatibility</dt>
                <dd className="text-bone font-medium text-[12px]">All Maddog Lights</dd>
              </div>
            </dl>
          ) : (
            <dl className="grid grid-cols-2 gap-2">
              <div>
                <dt className="text-fog-500 text-[10px] uppercase font-mono">Mount Spec</dt>
                <dd className="text-bone font-medium text-[12px] truncate">Anti-Vibration</dd>
              </div>
              <div>
                <dt className="text-fog-500 text-[10px] uppercase font-mono">Fasteners</dt>
                <dd className="text-bone font-medium text-[12px]">SS 304 Grade</dd>
              </div>
            </dl>
          )}
        </div>

        <div className="mt-auto flex items-baseline justify-between pt-1">
          <span className="text-fog-500 font-mono text-[11px] uppercase">Unit Price</span>
          <span className="tnum text-bone font-semibold" style={{ fontSize: "var(--text-h3)" }}>
            {formatPrice(product.price)}
          </span>
        </div>
      </div>
    </SpotlightCard>
  );
}

