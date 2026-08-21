import type { brands } from "@/lib/fitment";

type Brand = (typeof brands)[number];

/**
 * Brands with a sourced monochrome mark under public/media/brands. Sourced
 * from the simple-icons CDN (single-path, currentColor-ready SVGs) — only
 * brands with a real official mark available get an entry here. Everything
 * else falls back to initials; we do not hand-draw or fabricate logos.
 */
const BRAND_ASSET_SLUGS: Partial<Record<Brand, string>> = {
  KTM: "ktm",
  BMW: "bmw",
  Honda: "honda",
  Yamaha: "yamaha",
  Suzuki: "suzuki",
};

/** Two-letter-ish initials for brands with no sourced mark. */
const BRAND_INITIALS: Record<string, string> = {
  "Royal Enfield": "RE",
  KTM: "KTM",
  BMW: "BMW",
  Ultraviolette: "UV",
  Honda: "HO",
  Yamaha: "YA",
  Kawasaki: "KA",
  Triumph: "TR",
  Bajaj: "BJ",
  Suzuki: "SZ",
  Hero: "HE",
  JAWA: "JW",
  "Harley Davidson": "HD",
  Benelli: "BN",
};

interface BrandMarkProps {
  brand: string;
  /** Overall square footprint in px. Default matches the picker tile scale. */
  size?: number;
}

/**
 * One shared brand mark, used by both the fit-page brand grid and the
 * homepage picker. Renders the brand's monochrome SVG tinted via CSS mask —
 * `mask-image` turns the SVG into a stencil and `background-color:
 * currentColor` paints it, so the mark always matches whatever text color
 * the consuming tile sets (grey-300 default, white on hover, beam when
 * selected) without inlining SVG markup or a build-time SVGR loader. That
 * keeps it trivially static-export-safe: it's just a `public/` asset
 * referenced by URL.
 *
 * Falls back to a two-letter initials roundel (30px circle, night-700 bg,
 * mono initials) for any brand without a sourced asset — never fabricated
 * artwork.
 */
export default function BrandMark({ brand, size = 30 }: BrandMarkProps) {
  const slug = BRAND_ASSET_SLUGS[brand as Brand];

  if (slug) {
    // Optically cap the mark at ~26–28px regardless of the container size so
    // mixed logo aspect ratios (a square BMW roundel vs. a wide Honda
    // wordmark) still align on the same visual weight.
    const capSize = Math.min(size - 4, 28);
    const maskUrl = `url(/media/brands/${slug}.svg)`;
    return (
      <span
        aria-hidden="true"
        style={{ width: size, height: size }}
        className="inline-flex shrink-0 items-center justify-center"
      >
        <span
          style={{
            width: capSize,
            height: capSize,
            backgroundColor: "currentColor",
            WebkitMaskImage: maskUrl,
            maskImage: maskUrl,
            WebkitMaskSize: "contain",
            maskSize: "contain",
            WebkitMaskRepeat: "no-repeat",
            maskRepeat: "no-repeat",
            WebkitMaskPosition: "center",
            maskPosition: "center",
          }}
          className="block"
        />
      </span>
    );
  }

  const initials = BRAND_INITIALS[brand] ?? brand.slice(0, 2).toUpperCase();
  return (
    <span
      aria-hidden="true"
      style={{ width: size, height: size }}
      className="inline-flex shrink-0 items-center justify-center rounded-full bg-[var(--color-night-700)] font-mono text-[0.625rem] tracking-tight"
    >
      {initials}
    </span>
  );
}
