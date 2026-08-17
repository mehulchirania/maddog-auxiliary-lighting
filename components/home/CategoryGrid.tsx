import Image from "next/image";
import Link from "next/link";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { getProduct } from "@/lib/products";
import { studioBackdrop } from "@/lib/media";

/**
 * Three category cards — primary navigation into the catalogue.
 *
 * Uses SectionHeading with tone="light" now that it supports ground-awareness.
 * Previously this component hand-rolled its own heading markup because
 * SectionHeading hardcoded fog-300 on its lede (invisible on paper). Fixed.
 *
 * Card improvements (§2.6):
 * - Replaced gap-px grid with real gap + rounded cards + shadow hover
 * - h3 at --text-h3 / --fw-h3 (550) instead of text-[19px] / default weight
 * - Body copy at --text-body (15px) instead of text-[13px]
 * - Hover: 2px lift (translate-y-[-2px]) + border signal accent
 */
const CATEGORIES = [
  {
    href: "/lights/",
    label: "Auxiliary lights",
    blurb: "Six lights, one ladder — climb it by output.",
    product: getProduct("rage"),
  },
  {
    href: "/products/switch-pro/",
    label: "Power & control",
    blurb: "Switches, harnesses and dimming, built to run the range.",
    product: getProduct("switch-pro"),
  },
  {
    href: "/products/claw-x/",
    label: "Mounts",
    blurb: "Phone holders built to survive vibration, not just weather.",
    product: getProduct("claw-x"),
  },
] as const;

export default function CategoryGrid() {
  return (
    <div className="bg-paper-1 relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <Image
          src={studioBackdrop.src}
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-[0.55]"
        />
      </div>

      <Container
        wide
        className="relative"
        style={{ paddingTop: "var(--section)", paddingBottom: "var(--section)" }}
      >
        <Reveal>
          <SectionHeading
            eyebrow="The catalogue"
            title="Everything you need. Nothing you don't."
            lede="Three groups, not thirty. Every part is built to work with the others."
            tone="light"
          />
        </Reveal>

        <Reveal className="mt-12 sm:mt-14">
          <div className="grid gap-4 sm:grid-cols-3">
            {CATEGORIES.map((cat) => {
              const p = cat.product;
              if (!p) return null;
              return (
                <Link
                  key={cat.href}
                  href={cat.href}
                  className="border-ink-900/10 bg-paper-0 hover:border-signal-600/40 group flex flex-col rounded-lg border p-7 outline-none shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-signal-500 sm:p-8"
                >
                  <div className="relative aspect-square w-full overflow-hidden">
                    <Image
                      src={p.hero}
                      alt={`${p.name} — ${cat.label.toLowerCase()}`}
                      fill
                      sizes="(min-width: 640px) 33vw, 100vw"
                      className="object-contain p-4 transition-transform duration-300 ease-out group-hover:scale-[1.04]"
                    />
                  </div>
                  <div className="mt-6">
                    <h3
                      className="font-display text-ink-900 group-hover:text-signal-600 transition-colors"
                      style={{
                        fontSize: "var(--text-h3)",
                        fontWeight: "var(--fw-h3)",
                        letterSpacing: "var(--ls-h3)",
                      }}
                    >
                      {cat.label}
                    </h3>
                    <p
                      className="text-ink-600 mt-2 leading-relaxed"
                      style={{ fontSize: "var(--text-body)" }}
                    >
                      {cat.blurb}
                    </p>
                    <span
                      className="text-ink-500 group-hover:text-signal-600 mt-4 inline-flex items-center gap-1.5 tracking-wide transition-colors"
                      style={{ fontSize: "var(--text-caption)" }}
                    >
                      Shop {cat.label.toLowerCase()}
                      <svg
                        width="13"
                        height="13"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        aria-hidden="true"
                        className="transition-transform duration-200 ease-out group-hover:translate-x-1"
                      >
                        <path d="M5 12h13M12 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </Reveal>
      </Container>
    </div>
  );
}
