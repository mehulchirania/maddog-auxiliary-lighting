"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/lib/cart";
import { formatPrice } from "@/lib/products";
import SpecularButton from "@/components/ui/SpecularButton";

export default function CartDrawer() {
  const {
    items,
    removeItem,
    updateQuantity,
    clearCart,
    isCartOpen,
    setIsCartOpen,
    setIsDemoModalOpen,
    cartCount,
    cartTotal,
  } = useCart();

  const drawerRef = useRef<HTMLDivElement>(null);

  // Close on Escape key
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isCartOpen) {
        setIsCartOpen(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isCartOpen, setIsCartOpen]);

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isCartOpen]);

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden" role="dialog" aria-modal="true" aria-label="Shopping Cart">
      {/* Dimmed backdrop */}
      <div
        className="fixed inset-0 bg-[#0a0a0b]/80 backdrop-blur-md transition-opacity duration-300"
        onClick={() => setIsCartOpen(false)}
        aria-hidden="true"
      />

      <div className="fixed inset-y-0 right-0 flex max-w-full pl-6 sm:pl-10">
        <div
          ref={drawerRef}
          className="bg-[var(--color-night-900)] text-[var(--color-white)] border-l border-[var(--glass-stroke)] flex w-screen max-w-md flex-col shadow-2xl transition-transform duration-300 ease-in-out"
        >
          {/* Drawer Header */}
          <div className="border-b border-[var(--glass-stroke)] bg-[var(--color-night-950)] flex items-center justify-between px-6 py-4">
            <div className="flex items-center gap-3">
              <h2 className="font-semibold text-lg text-white">Your Cart</h2>
              <span className="readout text-xs bg-white/10 px-2 py-0.5 rounded-full text-[var(--color-beam)]">
                {cartCount} item{cartCount === 1 ? "" : "s"}
              </span>
            </div>
            <button
              type="button"
              onClick={() => setIsCartOpen(false)}
              className="text-[var(--color-grey-300)] hover:text-white p-1.5 rounded-md hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Close cart"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Drawer Body: Items list */}
          <div className="flex-1 overflow-y-auto px-6 py-6 divide-y divide-[var(--glass-stroke)]">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full py-16 text-center">
                <div className="w-16 h-16 rounded-full bg-white/5 border border-[var(--glass-stroke)] flex items-center justify-center text-[var(--color-grey-500)] mb-4">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
                    <circle cx="9" cy="21" r="1" />
                    <circle cx="20" cy="21" r="1" />
                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                  </svg>
                </div>
                <h3 className="text-white font-medium text-base">Your cart is currently empty</h3>
                <p className="text-[var(--color-grey-500)] text-sm mt-1 max-w-xs">
                  Add an auxiliary light or find the certified setup for your motorcycle.
                </p>
                <div className="mt-8 flex flex-col gap-3 w-full max-w-xs">
                  <Link
                    href="/lights/"
                    onClick={() => setIsCartOpen(false)}
                    className="w-full py-3 px-6 rounded-full bg-white text-[var(--color-night-950)] text-sm font-medium text-center hover:scale-[1.02] transition-transform shadow-md"
                  >
                    Explore Range
                  </Link>
                  <Link
                    href="/fit/"
                    onClick={() => setIsCartOpen(false)}
                    className="w-full py-3 px-6 rounded-full glass text-white text-sm font-medium text-center hover:border-white/40 transition-colors"
                  >
                    Open Bike Finder
                  </Link>
                </div>
              </div>
            ) : (
              <div className="space-y-4 divide-y divide-[var(--glass-stroke)]">
                {items.map(({ product, quantity }) => (
                  <div key={product.slug} className="flex gap-4 pt-4 first:pt-0">
                    <div className="relative aspect-square h-20 w-20 shrink-0 overflow-hidden rounded-[var(--radius-card)] bg-[var(--color-plate)] p-2">
                      <Image
                        src={product.hero}
                        alt={product.name}
                        fill
                        className="object-contain p-1"
                        sizes="80px"
                      />
                    </div>

                    <div className="flex flex-1 flex-col justify-between min-w-0">
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <Link
                            href={`/products/${product.slug}/`}
                            onClick={() => setIsCartOpen(false)}
                            className="font-medium text-white hover:text-[var(--color-beam)] text-sm truncate leading-tight transition-colors"
                          >
                            {product.name}
                          </Link>
                          <button
                            type="button"
                            onClick={() => removeItem(product.slug)}
                            className="text-[var(--color-grey-500)] hover:text-white p-0.5 transition-colors cursor-pointer"
                            aria-label={`Remove ${product.name} from cart`}
                          >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M18 6L6 18M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                        <p className="readout text-[11px] mt-0.5">
                          SKU: {product.code}
                        </p>
                      </div>

                      <div className="flex items-center justify-between mt-3 pt-2">
                        {/* Quantity Controls */}
                        <div className="flex items-center border border-[var(--glass-stroke)] rounded-lg bg-black/40">
                          <button
                            type="button"
                            onClick={() => updateQuantity(product.slug, quantity - 1)}
                            className="h-7 w-7 flex items-center justify-center text-[var(--color-grey-300)] hover:text-white transition-colors cursor-pointer"
                            aria-label="Decrease quantity"
                          >
                            −
                          </button>
                          <span className="readout h-7 px-2.5 flex items-center justify-center text-xs font-semibold text-white">
                            {quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(product.slug, quantity + 1)}
                            className="h-7 w-7 flex items-center justify-center text-[var(--color-grey-300)] hover:text-white transition-colors cursor-pointer"
                            aria-label="Increase quantity"
                          >
                            +
                          </button>
                        </div>

                        {/* Price */}
                        <div className="text-right">
                          <span className="font-medium text-white text-sm">
                            {formatPrice(product.price * quantity)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Drawer Footer */}
          {items.length > 0 && (
            <div className="border-t border-[var(--glass-stroke)] bg-[var(--color-night-950)] p-6 space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm text-[var(--color-grey-300)]">
                  <span>Subtotal</span>
                  <span className="font-medium text-white">{formatPrice(cartTotal)}</span>
                </div>
                <div className="flex justify-between text-sm text-[var(--color-grey-300)]">
                  <span>Shipping</span>
                  <span className="readout text-xs text-[var(--color-beam)]">
                    Complimentary
                  </span>
                </div>
                <div className="flex justify-between text-base font-semibold text-white border-t border-[var(--glass-stroke)] pt-2">
                  <span>Total</span>
                  <span className="text-lg text-[var(--color-white)]">{formatPrice(cartTotal)}</span>
                </div>
              </div>

              <div className="space-y-3 pt-2">
                <SpecularButton
                  size="lg"
                  tint="#ffffff"
                  tintOpacity={1}
                  textColor="#0a0a0b"
                  lineColor="#ffffff"
                  baseColor="#a3a3a3"
                  intensity={1.3}
                  onClick={() => {
                    setIsCartOpen(false);
                    setIsDemoModalOpen(true);
                  }}
                  className="w-full"
                >
                  <span>Proceed to Checkout</span>
                </SpecularButton>

                <div className="flex items-center justify-between text-xs pt-1">
                  <button
                    type="button"
                    onClick={clearCart}
                    className="text-[var(--color-grey-500)] hover:text-white underline cursor-pointer"
                  >
                    Clear cart
                  </button>
                  <span className="readout text-[11px] text-[var(--color-grey-500)]">
                    18-Mo Warranty Included
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
