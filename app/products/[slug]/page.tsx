import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { products, getProduct, type Category } from "@/lib/products";
import { fieldMediaForSlug } from "@/lib/fieldMedia";
import ProductBuySection, {
  ProductScenes,
  ProductTabs,
} from "@/components/product/ProductBuySection";

/* Singular breadcrumb names. Duplicated from the client module on purpose:
   values exported from a "use client" file are client references and cannot
   be invoked during the server render. */
const CATEGORY_LABEL: Record<Category, string> = {
  "aux-light": "Aux light",
  "car-fog-lamp": "Car fog lamp",
  mount: "Mount",
  power: "Power & wiring",
  filter: "Filter",
  clamp: "Clamp",
  "ev-edition": "EV edition",
};

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

      {/* 1. Buy section — breadcrumb, gallery, identity, price */}
      <section className="relative overflow-hidden pt-10 sm:pt-16">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-[10%] -right-[10%] -top-[45%] h-[80%]"
          style={{
            background:
              "radial-gradient(50% 60% at 50% 0%, color-mix(in srgb, var(--color-beam) 12%, transparent) 0%, transparent 65%)",
          }}
        />
        <div className="relative max-w-7xl mx-auto px-6 sm:px-12">
          <nav
            aria-label="Breadcrumb"
            className="readout flex flex-wrap items-center gap-2 uppercase tracking-[0.2em] text-[0.6875rem] text-[var(--color-grey-500)]"
          >
            <Link
              href="/lights/"
              className="text-[var(--color-grey-500)] no-underline transition-colors duration-[var(--dur-fast)] hover:text-[var(--color-beam)]"
            >
              Range
            </Link>
            <span aria-hidden="true">/</span>
            <span>{CATEGORY_LABEL[product.category] ?? "Product"}</span>
            <span aria-hidden="true">/</span>
            <span className="text-[var(--color-beam)]">{product.name}</span>
          </nav>

          <div className="mt-7">
            <ProductBuySection product={product} />
          </div>
        </div>
      </section>

      {/* 2. Sticky scroll scene — only for products with measured light data */}
      {product.light && (
        <section className="pt-[var(--section)]">
          <div className="max-w-7xl mx-auto px-6 sm:px-12">
            <ProductScenes product={product} />
          </div>
        </section>
      )}

      {/* 3. Tabs — highlights & gallery / full spec sheet */}
      <section className="py-[var(--section)]">
        <div className="max-w-7xl mx-auto px-6 sm:px-12">
          <ProductTabs product={product} fieldMedia={realMedia} />
        </div>
      </section>
    </article>
  );
}
