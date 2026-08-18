import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { products, getProduct } from "@/lib/products";
import { fieldMediaForSlug } from "@/lib/fieldMedia";
import ProductBuySection from "@/components/product/ProductBuySection";
import SpecTable from "@/components/product/SpecTable";
import Lightbox from "@/components/ui/Lightbox";

export async function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};

  return {
    title: `${product.name} — Maddog`,
    description: product.tagline || product.description,
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const realMedia = fieldMediaForSlug(product.slug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    sku: product.code,
    image: product.gallery,
    description: product.description,
    offers: {
      "@type": "Offer",
      priceCurrency: "INR",
      price: product.price,
      availability: "https://schema.org/InStock",
    },
    ...(product.reviewCount > 0
      ? {
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: product.rating,
            reviewCount: product.reviewCount,
          },
        }
      : {}),
  };

  return (
    <article className="bg-[var(--color-night-950)] text-[var(--color-white)] min-h-screen">
      {/* eslint-disable-next-line react/no-danger */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />

      {/* 1. Breadcrumb */}
      <div className="max-w-7xl mx-auto px-6 sm:px-12 pt-8 sm:pt-12">
        <div className="flex items-center gap-2 text-xs text-[var(--color-grey-500)] font-mono">
          <Link href="/lights/" className="hover:text-white transition-colors">
            Range
          </Link>
          <span>/</span>
          <span className="text-white">{product.name}</span>
        </div>
      </div>

      {/* 2. Main Buy Section (Studio Plate + Sticky Buy Column) */}
      <section className="max-w-7xl mx-auto px-6 sm:px-12 py-10 sm:py-16">
        <ProductBuySection product={product} />
      </section>

      {/* 3. Combined Performance & Specifications Section */}
      <section className="py-20 sm:py-28 border-t border-[var(--glass-stroke)] bg-[var(--color-night-900)]">
        <div className="max-w-7xl mx-auto px-6 sm:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-12 lg:gap-16 items-start">
            {/* Left Column: Sticky Performance Headline + Full SpecTable */}
            <div className="lg:sticky lg:top-28 self-start flex flex-col gap-6">
              <div>
                <h2
                  className="font-[520] text-[var(--color-white)] tracking-tight"
                  style={{ fontSize: "var(--text-statement)", letterSpacing: "var(--ls-statement)" }}
                >
                  Performance.
                </h2>
                <p className="mt-3 text-[var(--color-grey-300)] text-base leading-relaxed max-w-lg">
                  {product.tagline || product.description}
                </p>
              </div>

              <div className="pt-4">
                <SpecTable specs={product.specs} />
              </div>
            </div>

            {/* Right Column: Real Field Photography or Feature Icon Card */}
            <div className="flex flex-col gap-6">
              {realMedia.length > 0 ? (
                realMedia.map((media) => (
                  <div key={media.src} className="flex flex-col gap-2">
                    <Lightbox src={media.src} alt={media.caption}>
                      <div className="relative aspect-[16/10] w-full rounded-[var(--radius-card)] overflow-hidden bg-[var(--color-night-950)] border border-[var(--glass-stroke)] shadow-lg">
                        <Image
                          src={media.src}
                          alt={media.caption}
                          fill
                          sizes="(max-width: 1024px) 100vw, 50vw"
                          className="object-cover"
                        />
                      </div>
                    </Lightbox>
                    <p className="readout text-xs text-[var(--color-grey-500)] px-1">
                      {media.caption}
                    </p>
                  </div>
                ))
              ) : (
                <Lightbox
                  src="/media/product_features/product_feature_1768301041_7696008.webp"
                  alt={`${product.name} optical feature`}
                >
                  <div className="relative aspect-[16/10] w-full rounded-[var(--radius-card)] overflow-hidden bg-[var(--color-night-800)] border border-[var(--glass-stroke)] p-10 flex items-center justify-center">
                    <Image
                      src="/media/product_features/product_feature_1768301041_7696008.webp"
                      alt="Optical feature graphic"
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-contain p-8"
                    />
                  </div>
                </Lightbox>
              )}

              {/* Feature Icon Glyphs Row */}
              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-[var(--glass-stroke)]">
                <div className="flex items-center gap-3">
                  <Image
                    src="/media/product_features/product_feature_1758899367_4126444.webp"
                    alt=""
                    width={36}
                    height={36}
                    className="shrink-0"
                  />
                  <div>
                    <span className="text-xs font-medium text-white block">5000K CCT</span>
                    <span className="readout text-[11px]">TIR Optics</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Image
                    src="/media/product_features/product_feature_1761106540_3650052.webp"
                    alt=""
                    width={36}
                    height={36}
                    className="shrink-0"
                  />
                  <div>
                    <span className="text-xs font-medium text-white block">IP-67 Seal</span>
                    <span className="readout text-[11px]">Submersion</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Image
                    src="/media/product_features/product_feature_1768301008_6534632.webp"
                    alt=""
                    width={36}
                    height={36}
                    className="shrink-0"
                  />
                  <div>
                    <span className="text-xs font-medium text-white block">6063-T6</span>
                    <span className="readout text-[11px]">CNC Billet</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Dimensions & CAD Blueprint Section */}
      {product.dimensions?.blueprint && (
        <section className="py-20 sm:py-28 border-t border-[var(--glass-stroke)]">
          <div className="max-w-4xl mx-auto px-6 sm:px-12">
            <h2
              className="font-[520] text-[var(--color-white)] tracking-tight mb-3"
              style={{ fontSize: "var(--text-statement)", letterSpacing: "var(--ls-statement)" }}
            >
              Dimensions &amp; fitment geometry.
            </h2>
            <p className="text-[var(--color-grey-300)] mb-10 text-sm max-w-lg">
              CNC machined aerospace aluminum housing blueprints. Click to enlarge.
            </p>

            <Lightbox src={product.dimensions.blueprint} alt={`${product.name} dimensional blueprint`}>
              <div className="relative aspect-[16/9] w-full rounded-[var(--radius-card)] overflow-hidden bg-[var(--color-plate)] p-8 border border-white/10 shadow-lg flex items-center justify-center">
                <Image
                  src={product.dimensions.blueprint}
                  alt={`${product.name} dimensional blueprint`}
                  fill
                  sizes="100vw"
                  className="object-contain p-6"
                />
              </div>
            </Lightbox>
          </div>
        </section>
      )}
    </article>
  );
}
