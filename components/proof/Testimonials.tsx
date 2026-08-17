"use client";

import Link from "next/link";
import { testimonials } from "@/lib/proof";
import SpotlightCard from "@/components/animations/SpotlightCard";

export default function Testimonials() {
  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {testimonials.map((t) => (
        <SpotlightCard
          key={`${t.name}-${t.date}`}
          spotlightColor="rgba(237, 29, 36, 0.08)"
          className="border hairline bg-ink-900/80 hover:bg-ink-850 hover:border-ink-500 flex flex-col rounded-xl p-6 sm:p-7 transition-all duration-200 shadow-sm hover:-translate-y-1"
        >
          <div className="flex items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-1 text-signal-500" aria-label="5 out of 5 stars">
              {[...Array(5)].map((_, i) => (
                <svg key={i} width="14" height="14" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="eyebrow text-fog-500 font-mono text-[10px]">Verified Rider</span>
          </div>

          <blockquote className="flex-1">
            <p
              className="font-display text-bone font-medium leading-snug"
              style={{ fontSize: "var(--text-h3)" }}
            >
              &ldquo;{t.headline}&rdquo;
            </p>
            <p className="text-fog-300 mt-3 leading-relaxed" style={{ fontSize: "var(--text-caption)" }}>
              {t.body}
            </p>
          </blockquote>

          <figcaption className="border-t hairline mt-6 flex items-center justify-between pt-4">
            <div>
              <p className="text-bone font-medium" style={{ fontSize: "var(--text-caption)" }}>{t.name}</p>
              <p className="text-fog-500 font-mono text-[11px]">{t.date}</p>
            </div>
            <Link
              href={`/products/${t.productSlug}/`}
              className="text-signal-400 hover:text-signal-300 font-mono text-[11px] uppercase tracking-wider transition-colors"
            >
              {t.product} →
            </Link>
          </figcaption>
        </SpotlightCard>
      ))}
    </div>
  );
}

