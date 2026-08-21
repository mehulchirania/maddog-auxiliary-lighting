import Image from "next/image";
import Link from "next/link";
import { products, type Category } from "@/lib/products";

const inr = (n: number) => "₹" + n.toLocaleString("en-IN");

// Count + starting price are always derived from lib/products.ts at build
// time — never hardcoded, so the tile stays honest as the catalog changes.
function categoryStats(category: Category) {
  const list = products.filter((p) => p.category === category);
  const count = list.length;
  const minPrice = list.reduce(
    (min, p) => (p.price > 0 && p.price < min ? p.price : min),
    Infinity,
  );
  return { count, minPrice: minPrice === Infinity ? 0 : minPrice };
}

const productBySlug = (slug: string) => products.find((p) => p.slug === slug)!;

interface RangeTile {
  key: string;
  name: string;
  category: Category;
  href: string;
  image: string;
  imageAlt: string;
  /** True for the Ultraviolette tile — a real photo, not a plate render. */
  photo?: boolean;
  span: string;
}

const TILES: RangeTile[] = [
  {
    key: "aux-lights",
    name: "Aux lights",
    category: "aux-light",
    href: "/lights/",
    image: productBySlug("rage").hero,
    imageAlt: "Maddog Rage auxiliary light on a studio plate",
    span: "sm:col-span-2 lg:col-span-2",
  },
  {
    key: "phone-holders",
    name: "Phone holders",
    category: "mount",
    // No dedicated holders category page exists yet — the flagship product
    // page is the least-wrong existing target.
    href: "/products/claw-x/",
    image: productBySlug("claw-x").hero,
    imageAlt: "Maddog Claw X vibration-damped phone mount on a studio plate",
    span: "sm:col-span-1 lg:col-span-1",
  },
  {
    key: "switches-harness",
    name: "Switches & harness",
    category: "power",
    href: "/products/switch-pro-and-wire-harness-pro/",
    image: productBySlug("switch-pro-and-wire-harness-pro").hero,
    imageAlt: "Maddog Switch and Wire Harness Pro on a studio plate",
    span: "sm:col-span-1 lg:col-span-1",
  },
  {
    key: "mounts-clamps",
    name: "Mounts & clamps",
    category: "clamp",
    href: "/products/light-mounts/",
    image: productBySlug("light-mounts").hero,
    imageAlt: "Maddog CNC billet light mount on a studio plate",
    span: "sm:col-span-2 lg:col-span-2",
  },
  {
    key: "ultraviolette",
    name: "Ultraviolette line",
    category: "ev-edition",
    href: "/products/terra-vision-f77/",
    image: "/media/images/maddog-uv-accessories-banner-02.webp",
    imageAlt: "Maddog auxiliary lights installed on an Ultraviolette F77 Mach 2 electric motorcycle",
    photo: true,
    span: "sm:col-span-2 lg:col-span-2",
  },
];

const TILE_MEDIA_HEIGHT = "min-h-[190px] sm:min-h-[210px] lg:min-h-[250px]";

function RangeTileCard({ tile }: { tile: RangeTile }) {
  const { count, minPrice } = categoryStats(tile.category);

  return (
    <Link href={tile.href} className={`reveal group block h-full ${tile.span}`}>
      <div className="machined h-full transition-colors duration-[var(--dur-fast)] ease-[var(--ease-out)] group-hover:bg-[rgba(255,237,201,0.06)]">
        <div className="machined-core relative flex h-full flex-col overflow-hidden bg-[var(--color-night-900)]">
          {tile.photo ? (
            // Radial fallback ground behind the image — if a network hiccup ever
            // fails the fetch, the tile reads as a dim plate, never a black void.
            <div
              className={`relative ${TILE_MEDIA_HEIGHT} flex-1`}
              style={{
                background:
                  "radial-gradient(120% 100% at 30% 20%, var(--color-night-700) 0%, var(--color-night-900) 70%)",
              }}
            >
              <Image
                src={tile.image}
                alt={tile.imageAlt}
                fill
                sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 30vw"
                className="object-cover transition-transform duration-[var(--dur-slow)] ease-[var(--ease-out)] group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-night-950)] via-[var(--color-night-950)]/10 to-transparent" />
            </div>
          ) : (
            <div className={`relative ${TILE_MEDIA_HEIGHT} flex-1 bg-[var(--color-plate)]`}>
              <Image
                src={tile.image}
                alt={tile.imageAlt}
                fill
                sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 30vw"
                className="object-contain p-[12%] transition-transform duration-[var(--dur-slow)] ease-[var(--ease-out)] group-hover:scale-[1.04]"
              />
            </div>
          )}

          <div className="flex items-baseline justify-between gap-4 px-6 pt-5">
            <h3
              className="font-[560] tracking-tight text-[var(--color-white)] transition-colors duration-[var(--dur-fast)] group-hover:text-[var(--color-beam)]"
              style={{ fontSize: "var(--text-title)" }}
            >
              {tile.name}
            </h3>
            <span
              aria-hidden="true"
              className="text-[var(--color-grey-500)] transition-transform duration-[var(--dur-fast)] ease-[var(--ease-out)] group-hover:translate-x-[3px] group-hover:text-[var(--color-beam)]"
            >
              →
            </span>
          </div>
          <p className="readout px-6 pb-6 pt-1.5">
            {count} product{count === 1 ? "" : "s"} · from {inr(minPrice)}
          </p>
        </div>
      </div>
    </Link>
  );
}

export default function RangeGrid() {
  return (
    <section className="py-24 sm:py-32 bg-[var(--color-night-950)] border-t border-[var(--glass-stroke)]">
      <div className="max-w-7xl mx-auto px-6 sm:px-12">
        <div className="max-w-xl mb-11">
          <span className="readout tracking-[0.16em]">The range</span>
          <h2
            className="beam-lit mt-3 font-[560] tracking-tight"
            style={{ fontSize: "var(--text-statement)", letterSpacing: "var(--ls-statement)" }}
          >
            Everything the bike needs.
          </h2>
          <p className="mt-3.5 text-[var(--color-grey-300)]" style={{ fontSize: "var(--text-body)" }}>
            Five categories, one billet standard — lights, mounts, harnesses and clamps, all IP-67 sealed
            and warrantied the same way.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4 lg:gap-6">
          {TILES.map((tile) => (
            <RangeTileCard key={tile.key} tile={tile} />
          ))}
        </div>

        <div className="mt-10">
          <Link href="/lights/" className="cta-link-quiet">
            <span>Compare the full range</span>
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
