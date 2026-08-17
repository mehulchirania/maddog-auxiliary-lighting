import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { products, getProduct } from "@/lib/products";
import { productPosters } from "@/lib/media";
import Gallery from "@/components/product/Gallery";
import HeadlineSpecs from "@/components/product/HeadlineSpecs";
import LadderPosition from "@/components/product/LadderPosition";
import SpecTable from "@/components/product/SpecTable";
import KitContents from "@/components/product/KitContents";
import BeamDiagrams from "@/components/product/BeamDiagrams";
import RatingBadge from "@/components/product/RatingBadge";
import PurchasePanel from "@/components/product/PurchasePanel";
import BrandPoster from "@/components/product/BrandPoster";

import ClawProDeepDive from "@/components/product/ClawProDeepDive";

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
    description: product.tagline,
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

  const isClawProduct =
    product.slug === "claw-pro" ||
    product.slug === "claw-x" ||
    product.slug === "claw" ||
    product.slug === "claw-lite" ||
    product.category === "mount";

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
    <>
      {/* eslint-disable-next-line react/no-danger */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />

      {/* Product Title Header */}
      <div className="bg-paper-1 border-b border-ink-900/10">
        <Container className="pt-10 pb-8 sm:pt-14 sm:pb-10">
          <Reveal>
            <div className="flex items-center gap-2 mb-3 font-mono text-[12px] uppercase text-ink-500">
              <Link
                href={product.category === "aux-light" ? "/lights/" : "/"}
                className="hover:text-ink-950 transition-colors"
              >
                {product.category === "aux-light" ? "Auxiliary Range" : "Home"}
              </Link>
              <span>/</span>
              <span className="text-signal-600 font-semibold">{product.name}</span>
            </div>
            <div className="flex flex-wrap items-baseline justify-between gap-4">
              <h1
                className="font-display text-ink-950 leading-[1.04]"
                style={{
                  fontSize: "var(--text-display)",
                  fontWeight: "var(--fw-display)",
                  letterSpacing: "var(--ls-display)",
                }}
              >
                {product.name}
              </h1>
              <span className="text-ink-500 font-mono text-[13px] uppercase tracking-wider bg-paper-2 px-3 py-1 rounded border border-ink-900/10">
                SKU: {product.code}
              </span>
            </div>
          </Reveal>
        </Container>
      </div>

      {/* Gallery Showcase */}
      <div className="bg-paper-0">
        <Container wide className="py-10 sm:py-14">
          <Reveal>
            <Gallery images={product.gallery} alt={product.name} />
          </Reveal>
        </Container>
      </div>

      {/* Headline Telemetry Specs */}
      <div className="bg-paper-1 border-y border-ink-900/10">
        <Container className="py-10 sm:py-14">
          <Reveal>
            <HeadlineSpecs product={product} />
          </Reveal>
        </Container>
      </div>

      {/* Product Description & Ladder Position */}
      <div className="bg-paper-0">
        <Container className="py-12 sm:py-16">
          <Reveal className="max-w-3xl">
            <p className="text-ink-700 leading-relaxed" style={{ fontSize: "var(--text-body-lg)" }}>
              {product.description}
            </p>
          </Reveal>

          {product.light && (
            <Reveal className="mt-12 sm:mt-16">
              <LadderPosition product={product} />
            </Reveal>
          )}
        </Container>
      </div>

      {/* Cockpit Mount Pro Engineering Section */}
      {isClawProduct && (
        <ClawProDeepDive />
      )}

      {/* Full Spec Table */}
      <div className="bg-paper-1 border-t border-ink-900/10">
        <Container className="py-14 sm:py-20">
          <Reveal>
            <SectionHeading
              eyebrow="Full specification"
              title="Every number, as measured."
              lede="Instrument telemetry and physical tolerances for this model."
              tone="light"
            />
            <div className="mt-8">
              <SpecTable specs={product.specs} />
            </div>
          </Reveal>
        </Container>
      </div>

      {/* In the Box */}
      <div className="bg-paper-0 border-t border-ink-900/10">
        <Container className="py-14 sm:py-20">
          <Reveal>
            <SectionHeading
              eyebrow="In the box"
              title="What ships with your order."
              lede="Every component included in the retail package."
              tone="light"
            />
            <div className="mt-8">
              <KitContents items={product.kitContents} />
            </div>
          </Reveal>
        </Container>
      </div>

      {/* Studio Poster if available */}
      {product.slug === "alpha" && (
        <BrandPoster
          poster={productPosters[0]}
          eyebrow="From the studio"
          heading="The flagship rider benchmark."
          copy="Alpha is the most rider-proven light in the range. Fitted with precision TIR optics and the signature red wolf mark cast into the aerospace-grade housing."
        />
      )}
      {product.slug === "claw-x" && (
        <BrandPoster
          poster={productPosters[1]}
          eyebrow="From the studio"
          heading="Every part, machined for vibration dampening."
          copy="Maddog's studio blueprint for the Claw mount platform — the handlebar clamp, ball joint, cradle and 25W charger, exploded."
        />
      )}

      {/* CAD Blueprints */}
      {(product.photometrics || product.dimensions) && (
        <div className="bg-ink-950 text-bone border-t hairline">
          <Container className="pt-14 sm:pt-20">
            <Reveal>
              <SectionHeading
                eyebrow="Under the hood"
                title="Construction and CAD Dimensions"
                lede="Exploded sub-assemblies and dimensional blueprints — pure engineering transparency."
              />
            </Reveal>
          </Container>
          <Reveal className="mt-8 pb-14 sm:pb-20">
            <BeamDiagrams
              photometrics={product.photometrics?.diagram}
              dimensions={product.dimensions?.blueprint}
              name={product.name}
            />
          </Reveal>
        </div>
      )}

      {/* Purchase Panel */}
      <div className="bg-paper-1 border-t border-ink-900/10">
        <Container className="py-14 pb-20 sm:py-18">
          <Reveal>
            <RatingBadge rating={product.rating} reviewCount={product.reviewCount} />
            <div className="mt-8">
              <PurchasePanel product={product} />
            </div>
          </Reveal>
        </Container>
      </div>
    </>
  );
}

