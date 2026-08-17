"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { useCart } from "@/lib/cart";
import { cn } from "@/lib/cn";

const links = [
  { href: "/lights/", label: "Lights & Range" },
  { href: "/technology/", label: "Technology" },
  { href: "/fit/", label: "Bike Finder" },
  { href: "/proof/", label: "Proof & Reviews" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { setIsCartOpen, cartCount } = useCart();

  return (
    <header className="bg-paper-0/90 border-ink-900/10 sticky top-0 z-50 border-b backdrop-blur-md transition-colors duration-200">
      <div className="mx-auto flex h-16 max-w-[1600px] items-center justify-between gap-4 px-4 sm:px-8">
        <div className="flex items-center gap-6 lg:gap-12">
          <Link href="/" className="shrink-0 group" aria-label="Maddog home">
            <Image
              src="/media/brand/maddog-logo.png"
              alt="Maddog"
              width={2547}
              height={501}
              priority
              className="h-6 w-auto sm:h-7 transition-opacity group-hover:opacity-85"
            />
          </Link>

          <nav className="hidden items-center gap-1 md:flex" aria-label="Main Navigation">
            {links.map((l) => {
              const isActive = pathname === l.href || (l.href !== "/" && pathname?.startsWith(l.href));
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  className={cn(
                    "relative px-3.5 py-1.5 rounded-md font-medium tracking-wide transition-all duration-200",
                    isActive
                      ? "text-ink-950 font-semibold bg-paper-2/70"
                      : "text-ink-600 hover:text-ink-950 hover:bg-paper-1",
                  )}
                  style={{ fontSize: "var(--text-caption)" }}
                >
                  {l.label}
                  {isActive && (
                    <span className="bg-signal-600 absolute bottom-0 left-3.5 right-3.5 h-[2px] rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          {/* Cart Trigger Button */}
          <button
            type="button"
            onClick={() => setIsCartOpen(true)}
            aria-label={`Shopping cart with ${cartCount} items`}
            className="relative inline-flex items-center justify-center p-2 sm:px-3 sm:py-2 rounded-md text-ink-700 hover:text-ink-950 hover:bg-paper-1 border border-ink-900/10 transition-colors"
          >
            <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
            <span className="hidden sm:inline-block ml-1.5 text-xs font-medium font-mono uppercase">
              Cart
            </span>
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4.5 min-w-[1.125rem] items-center justify-center rounded-full bg-signal-600 px-1 font-mono tnum text-[10px] font-bold text-bone shadow-sm">
                {cartCount}
              </span>
            )}
          </button>

          {/* Desktop Configure Fitment CTA */}
          <Link
            href="/fit/"
            className="hidden sm:inline-flex items-center gap-2 rounded-md bg-ink-900 hover:bg-ink-800 text-bone px-3.5 py-2 text-[12px] font-medium tracking-wide transition-colors shadow-sm"
          >
            <span>Bike Finder</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>

          {/* Mobile Drawer Hamburger Button */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label="Toggle menu"
            className="text-ink-600 hover:text-ink-900 p-2 rounded-md hover:bg-paper-2 md:hidden transition-colors border border-ink-900/10"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {open ? (
                <path d="M18 6 6 18M6 6l12 12" />
              ) : (
                <path d="M3 7h18M3 12h18M3 17h18" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {open && (
        <div className="bg-paper-0 border-ink-900/10 border-t md:hidden shadow-xl animate-in fade-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col px-4 py-3 gap-1">
            {links.map((l) => {
              const isActive = pathname === l.href || (l.href !== "/" && pathname?.startsWith(l.href));
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "flex items-center justify-between rounded-lg px-3.5 py-2.5 font-medium transition-colors",
                    isActive
                      ? "text-signal-600 bg-paper-2 font-semibold"
                      : "text-ink-700 hover:text-ink-950 hover:bg-paper-1",
                  )}
                  style={{ fontSize: "var(--text-body)" }}
                >
                  <span>{l.label}</span>
                  {isActive && <span className="h-1.5 w-1.5 rounded-full bg-signal-600" />}
                </Link>
              );
            })}
            <div className="pt-2 mt-2 border-t border-ink-900/10 flex flex-col gap-2">
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  setIsCartOpen(true);
                }}
                className="flex items-center justify-center gap-2 rounded-lg border border-ink-900/15 bg-paper-1 text-ink-900 py-2.5 text-sm font-medium"
              >
                <span>View Cart ({cartCount} items)</span>
              </button>
              <Link
                href="/fit/"
                onClick={() => setOpen(false)}
                className="flex items-center justify-center gap-2 rounded-lg bg-signal-600 hover:bg-signal-700 text-bone py-2.5 text-sm font-medium transition-colors"
              >
                Launch Bike Finder
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}


