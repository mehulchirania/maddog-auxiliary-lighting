"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/lib/cart";
import { formatPrice } from "@/lib/products";
import { cn } from "@/lib/cn";

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
        className="fixed inset-0 bg-ink-950/80 backdrop-blur-sm transition-opacity duration-300"
        onClick={() => setIsCartOpen(false)}
        aria-hidden="true"
      />

      <div className="fixed inset-y-0 right-0 flex max-w-full pl-6 sm:pl-10">
        <div
          ref={drawerRef}
          className="bg-paper-0 text-ink-900 border-ink-900/10 flex w-screen max-w-md flex-col border-l shadow-2xl transition-transform duration-300 ease-in-out"
        >
          {/* Drawer Header */}
          <div className="border-ink-900/10 bg-paper-1 flex items-center justify-between border-b px-5 py-4 sm:px-6">
            <div className="flex items-center gap-2.5">
              <h2 className="font-display font-medium text-lg text-ink-950">Your Cart</h2>
              <span className="bg-signal-600/10 text-signal-700 font-mono tnum text-xs font-semibold px-2 py-0.5 rounded-full border border-signal-600/20">
                {cartCount} item{cartCount === 1 ? "" : "s"}
              </span>
            </div>
            <button
              type="button"
              onClick={() => setIsCartOpen(false)}
              className="text-ink-600 hover:text-ink-950 p-1.5 rounded-md hover:bg-paper-2 transition-colors"
              aria-label="Close cart"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Drawer Body: Items list */}
          <div className="flex-1 overflow-y-auto px-5 py-5 sm:px-6 divide-y divide-ink-900/10">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full py-16 text-center">
                <div className="w-16 h-16 rounded-full bg-paper-2 border border-ink-900/10 flex items-center justify-center text-ink-400 mb-4">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
                    <circle cx="9" cy="21" r="1" />
                    <circle cx="20" cy="21" r="1" />
                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                  </svg>
                </div>
                <h3 className="font-display text-ink-900 font-medium text-base">Your cart is currently empty</h3>
                <p className="text-ink-600 text-sm mt-1 max-w-xs">
                  Add an auxiliary light or configure a certified setup for your motorcycle.
                </p>
                <div className="mt-6 flex flex-col gap-2.5 w-full max-w-xs">
                  <Link
                    href="/lights/"
                    onClick={() => setIsCartOpen(false)}
                    className="inline-flex items-center justify-center gap-2 rounded-md bg-ink-900 hover:bg-ink-800 text-bone px-5 py-2.5 text-sm font-medium transition-colors shadow-sm"
                  >
                    <span>Explore Auxiliary Range</span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </Link>
                  <Link
                    href="/fit/"
                    onClick={() => setIsCartOpen(false)}
                    className="inline-flex items-center justify-center gap-2 rounded-md border border-ink-900/15 bg-paper-1 hover:bg-paper-2 text-ink-900 px-5 py-2.5 text-sm font-medium transition-colors"
                  >
                    <span>Open Bike Finder</span>
                  </Link>
                </div>
              </div>
            ) : (
              <div className="space-y-4 divide-y divide-ink-900/10">
                {items.map(({ product, quantity }) => (
                  <div key={product.slug} className="flex gap-4 pt-4 first:pt-0">
                    <div className="relative aspect-square h-20 w-20 shrink-0 overflow-hidden rounded-lg border border-ink-900/10 bg-paper-1 p-2">
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
                            className="font-display font-medium text-ink-950 hover:text-signal-600 text-sm truncate leading-tight transition-colors"
                          >
                            {product.name}
                          </Link>
                          <button
                            type="button"
                            onClick={() => removeItem(product.slug)}
                            className="text-ink-400 hover:text-signal-600 p-0.5 transition-colors"
                            aria-label={`Remove ${product.name} from cart`}
                          >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M18 6L6 18M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                        <p className="text-ink-500 font-mono text-[11px] uppercase mt-0.5">
                          SKU: {product.code}
                        </p>
                      </div>

                      <div className="flex items-center justify-between mt-3 pt-2">
                        {/* Quantity Controls */}
                        <div className="flex items-center border border-ink-900/15 rounded-md bg-paper-1">
                          <button
                            type="button"
                            onClick={() => updateQuantity(product.slug, quantity - 1)}
                            className="h-7 w-7 flex items-center justify-center text-ink-600 hover:text-ink-950 hover:bg-paper-2 rounded-l-md transition-colors"
                            aria-label="Decrease quantity"
                          >
                            −
                          </button>
                          <span className="h-7 px-2.5 flex items-center justify-center font-mono tnum text-xs font-semibold text-ink-900">
                            {quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(product.slug, quantity + 1)}
                            className="h-7 w-7 flex items-center justify-center text-ink-600 hover:text-ink-950 hover:bg-paper-2 rounded-r-md transition-colors"
                            aria-label="Increase quantity"
                          >
                            +
                          </button>
                        </div>

                        {/* Line Item Price */}
                        <div className="text-right">
                          <span className="font-semibold text-ink-950 tnum text-sm">
                            {formatPrice(product.price * quantity)}
                          </span>
                          {quantity > 1 && (
                            <span className="block text-[11px] text-ink-500 font-mono tnum">
                              {formatPrice(product.price)} ea
                            </span>
                          )}
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
            <div className="border-t border-ink-900/10 bg-paper-1 p-5 sm:p-6 space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm text-ink-600">
                  <span>Subtotal</span>
                  <span className="font-medium text-ink-900 tnum">{formatPrice(cartTotal)}</span>
                </div>
                <div className="flex justify-between text-sm text-ink-600">
                  <span>Express Shipping</span>
                  <span className="text-signal-700 font-medium text-xs bg-signal-600/10 px-2 py-0.5 rounded border border-signal-600/20">
                    Complimentary Free
                  </span>
                </div>
                <div className="flex justify-between text-base font-semibold text-ink-950 border-t border-ink-900/10 pt-2">
                  <span>Total Due</span>
                  <span className="tnum text-lg text-signal-700">{formatPrice(cartTotal)}</span>
                </div>
              </div>

              <div className="space-y-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsCartOpen(false);
                    setIsDemoModalOpen(true);
                  }}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-md bg-signal-600 hover:bg-signal-700 text-bone py-3 px-6 font-medium text-sm transition-colors shadow-md hover:shadow-lg"
                >
                  <span>Proceed to Checkout</span>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </button>

                <div className="flex items-center justify-between pt-1 text-xs">
                  <button
                    type="button"
                    onClick={clearCart}
                    className="text-ink-500 hover:text-ink-900 underline underline-offset-2 transition-colors"
                  >
                    Clear cart
                  </button>
                  <span className="text-ink-500 font-mono text-[11px]">
                    18-Mo Direct Warranty Included
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
