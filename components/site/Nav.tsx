"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { usePathname } from "next/navigation";
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

  return (
    <header className="bg-paper-0/90 border-ink-900/10 sticky top-0 z-50 border-b backdrop-blur-md transition-colors duration-200">
      <div className="mx-auto flex h-16 max-w-[1600px] items-center justify-between gap-6 px-5 sm:px-8">
        <div className="flex items-center gap-8 lg:gap-12">
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

        <div className="flex items-center gap-4">
          <Link
            href="/fit/"
            className="hidden sm:inline-flex items-center gap-2 rounded-md bg-ink-900 hover:bg-ink-800 text-bone px-4 py-2 text-[12px] font-medium tracking-wide transition-colors shadow-sm"
          >
            <span>Configure Fitment</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label="Toggle menu"
            className="text-ink-600 hover:text-ink-900 p-1.5 rounded-md hover:bg-paper-2 md:hidden transition-colors"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              {open ? (
                <path d="M18 6 6 18M6 6l12 12" />
              ) : (
                <path d="M3 7h18M3 12h18M3 17h18" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <div className="bg-paper-0 border-ink-900/10 border-t md:hidden shadow-lg animate-in fade-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col px-5 py-3 gap-1">
            {links.map((l) => {
              const isActive = pathname === l.href || (l.href !== "/" && pathname?.startsWith(l.href));
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "flex items-center justify-between rounded-md px-3 py-2.5 font-medium transition-colors",
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
            <div className="pt-2 mt-2 border-t border-ink-900/10">
              <Link
                href="/fit/"
                onClick={() => setOpen(false)}
                className="flex items-center justify-center gap-2 rounded-md bg-signal-600 text-bone py-2.5 text-[14px] font-medium"
              >
                Configure Your Bike
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

