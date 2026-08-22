import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import { testimonials } from "@/lib/proof";

function Stars() {
  return (
    <div
      className="flex items-center gap-1 text-[var(--color-beam)]"
      role="img"
      aria-label="Rated 5 out of 5"
    >
      {[0, 1, 2, 3, 4].map((i) => (
        <svg key={i} width="13" height="13" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function Testimonials() {
  return (
    <div className="grid gap-[18px] sm:grid-cols-2 lg:grid-cols-3">
      {testimonials.map((t, i) => (
        <Reveal key={`${t.name}-${t.date}`} delay={i * 80}>
          <figure className="m-0 flex h-full flex-col gap-4 rounded-[var(--radius-card)] border border-[var(--glass-stroke)] bg-[var(--color-night-900)] p-7 sm:p-8">
            <Stars />

            <blockquote className="m-0 flex-1 text-[var(--color-grey-300)] leading-[1.65]">
              &ldquo;{t.body}&rdquo;
            </blockquote>

            <figcaption className="mt-auto flex items-baseline justify-between gap-3 border-t border-[var(--glass-stroke)] pt-3.5">
              <span className="font-[560] text-[0.9375rem] text-[var(--color-white)]">
                {t.name}
              </span>
              <Link
                href={`/products/${t.productSlug}/`}
                className="readout inline-flex min-h-11 items-center shrink-0 tracking-[0.08em] text-[0.6875rem] text-[var(--color-grey-500)] transition-colors duration-[var(--dur-fast)] hover:text-[var(--color-white)]"
              >
                {t.product} · {t.date}
              </Link>
            </figcaption>
          </figure>
        </Reveal>
      ))}
    </div>
  );
}
