"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "motion/react";
import { useCart } from "@/lib/cart";

const NAV_LINKS = [
  { href: "/lights/", label: "Range" },
  { href: "/technology/", label: "Technology" },
  { href: "/fit/", label: "Fitment" },
  { href: "/proof/", label: "Reviews" },
  { href: "/register-product/", label: "Register" },
];

const SOCIAL_LINKS = [
  { href: "https://www.instagram.com/maddoglights/", label: "Instagram" },
  { href: "https://www.facebook.com/maddoglights/", label: "Facebook" },
  { href: "https://www.youtube.com/@maddoglights", label: "YouTube" },
  { href: "https://in.pinterest.com/maddoglights/", label: "Pinterest" },
];

const MOBILE_SHEET_ID = "mobile-nav-sheet";

export default function Nav() {
  const [hidden, setHidden] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { setIsCartOpen, cartCount } = useCart();
  const { scrollY } = useScroll();
  const sheetRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > 120 && latest > previous) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // While the sheet is open: lock body scroll, close on Escape, and keep Tab
  // inside the sheet. Matches what CartDrawer and Lightbox already do.
  useEffect(() => {
    if (!mobileMenuOpen) return;

    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileMenuOpen(false);
        return;
      }
      if (e.key !== "Tab") return;

      const focusables = sheetRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (!focusables?.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = overflow;
      // Hand focus back to the button that opened the sheet.
      toggleRef.current?.focus();
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <motion.header
        className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none"
        animate={{ y: hidden ? -80 : 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <div className="glass glass-pill h-14 px-3 flex items-center justify-between gap-4 sm:gap-6 pointer-events-auto shadow-2xl">
          {/* Logo */}
          <Link href="/" className="flex min-h-11 items-center pl-2 pr-1" aria-label="Maddog Home">
            <Image
              src="/media/derived/maddog-logo-white-360.webp"
              alt="Maddog"
              width={360}
              height={71}
              priority
              className="h-[22px] w-auto object-contain"
            />
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-6" aria-label="Main Navigation">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href || (link.href !== "/" && pathname?.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative py-1 text-[0.9375rem] transition-colors duration-[var(--dur-fast)] ${
                    isActive ? "text-[var(--color-white)] font-medium" : "text-[var(--color-grey-300)] hover:text-[var(--color-white)]"
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <motion.span
                      layoutId="activeNavDot"
                      className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-[3px] h-[3px] rounded-full bg-[var(--color-beam)]"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Divider */}
          <div className="hidden md:block w-[1px] h-5 bg-[var(--glass-stroke)]" />

          {/* Actions: Cart & Mobile Toggle */}
          <div className="flex items-center gap-1 sm:gap-2 pr-1">
            {/* Cart Icon Button */}
            <button
              type="button"
              onClick={() => setIsCartOpen(true)}
              aria-label={`Shopping cart with ${cartCount} items`}
              className="relative flex min-h-11 min-w-11 items-center justify-center text-[var(--color-grey-300)] hover:text-[var(--color-white)] transition-colors cursor-pointer rounded-full"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="9" cy="21" r="1" />
                <circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-[var(--color-signal)] px-1 font-mono text-[10px] font-bold text-white">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-label="Toggle navigation menu"
              className="md:hidden flex min-h-11 min-w-11 items-center justify-center text-[var(--color-grey-300)] hover:text-[var(--color-white)] transition-colors cursor-pointer"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                {mobileMenuOpen ? (
                  <path d="M18 6 6 18M6 6l12 12" />
                ) : (
                  <path d="M4 8h16M4 16h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Full-Screen Glass Sheet */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-[#0a0a0b]/92 backdrop-blur-2xl flex flex-col justify-center px-8 md:hidden"
          >
            <nav className="flex flex-col gap-6" aria-label="Mobile Navigation">
              {NAV_LINKS.map((link, i) => {
                const isActive = pathname === link.href || (link.href !== "/" && pathname?.startsWith(link.href));
                return (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.06, duration: 0.3 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`text-[clamp(1.75rem,5vw,2.5rem)] font-[520] tracking-tight block ${
                        isActive ? "text-[var(--color-white)]" : "text-[var(--color-grey-500)] hover:text-[var(--color-white)]"
                      }`}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                );
              })}
            </nav>

            <div className="mt-10 flex flex-col gap-4">
              <a
                href="tel:+917019130080"
                className="readout text-[var(--color-grey-300)] hover:text-white transition-colors"
              >
                +91 70191 30080
              </a>
              <a
                href="https://wa.me/917019130080"
                target="_blank"
                rel="noopener noreferrer"
                className="readout text-[var(--color-grey-300)] hover:text-white transition-colors"
              >
                WhatsApp
              </a>
              <div className="flex items-center gap-5">
                {SOCIAL_LINKS.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="readout text-[var(--color-grey-500)] hover:text-white transition-colors"
                  >
                    {s.label}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
