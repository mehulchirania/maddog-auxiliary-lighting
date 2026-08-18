import Link from "next/link";
import { testimonials } from "@/lib/proof";

export default function Testimonials() {
  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {testimonials.map((t) => (
        <div
          key={`${t.name}-${t.date}`}
          className="flex flex-col rounded-[var(--radius-card)] p-6 sm:p-8 bg-[var(--color-night-900)] border border-[var(--glass-stroke)] shadow-sm"
        >
          <div className="flex items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-1 text-[var(--color-beam)]" aria-label="5 out of 5 stars">
              {[...Array(5)].map((_, i) => (
                <svg key={i} width="14" height="14" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="readout text-xs text-[var(--color-grey-500)]">Verified Rider</span>
          </div>

          <blockquote className="flex-1">
            <p className="text-white font-medium text-base sm:text-lg leading-snug">
              &ldquo;{t.headline}&rdquo;
            </p>
            <p className="text-[var(--color-grey-300)] mt-3 text-sm leading-relaxed">
              {t.body}
            </p>
          </blockquote>

          <figcaption className="border-t border-[var(--glass-stroke)] mt-6 flex items-center justify-between pt-4">
            <div>
              <p className="text-white font-medium text-sm">{t.name}</p>
              <p className="readout text-xs text-[var(--color-grey-500)]">{t.date}</p>
            </div>
            <Link
              href={`/products/${t.productSlug}/`}
              className="readout text-xs text-[var(--color-grey-300)] hover:text-white transition-colors"
            >
              {t.product} →
            </Link>
          </figcaption>
        </div>
      ))}
    </div>
  );
}
