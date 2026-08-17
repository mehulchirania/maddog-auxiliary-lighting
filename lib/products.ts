/**
 * Mock product catalogue for the redesign demo.
 *
 * Every spec, price, rating and review count here was taken from the live
 * maddog.co.in product pages on 2026-08-16. Nothing is invented — the demo has
 * to survive the client reading it closely.
 *
 * In production this module gets replaced by a fetch against the existing PHP
 * backend. The shapes below are the proposed API contract.
 */

/**
 * Images are downloaded into public/media by scripts/fetch-assets.mjs, keeping
 * the CDN's own path structure. Serving locally means the demo doesn't depend
 * on Maddog's CDN staying reachable, and it survives static export anywhere.
 */
const CDN = "/media";

export type Category = "aux-light" | "power" | "mount";

export interface SpecRow {
  label: string;
  value: string;
}

export interface Product {
  slug: string;
  name: string;
  code: string;
  category: Category;
  price: number;
  rating: number;
  reviewCount: number;
  /** Short line used on cards and in the ladder. */
  tagline: string;
  /** The long-form copy from the live product page. */
  description: string;
  hero: string;
  gallery: string[];
  kitContents: string[];
  specs: SpecRow[];
  /** Aux lights only — drives the spec ladder and beam comparison. */
  light?: {
    lumens: number;
    wattsEach: number;
    wattsPair: number;
    beamDistanceM: number;
    /** Percentage split. Flood-only lights are spot: 0. */
    spot: number;
    flood: number;
    opticsLabel: string;
    /** Independent spot/flood switching (Lycan only). */
    dualMode?: boolean;
  };
  photometrics?: string;
  dimensions?: string;
  features?: string[];
}

export const products: Product[] = [
  {
    slug: "scout",
    name: "Scout",
    code: "SC1",
    category: "aux-light",
    price: 4250,
    rating: 4.9,
    reviewCount: 7,
    tagline: "Pure flood. The one you start with.",
    description:
      "The Scout Edition is packed with 2800 lumens per pair at just 10 watts each. A sleek black gloss aluminium housing that outshines the competition on both appearance and performance, backed by an exclusive 18-month warranty replacement programme.",
    hero: `${CDN}/products/SC1/medium/product_1752413246_5777416.webp`,
    gallery: [
      `${CDN}/products/SC1/original/product_1752413245_2479757.webp`,
      `${CDN}/products/SC1/original/product_1752413246_4131135.webp`,
      `${CDN}/products/SC1/original/product_1752413246_6644867.webp`,
      `${CDN}/products/SC1/original/product_1752413247_5788398.webp`,
      `${CDN}/products/SC1/original/product_1752413247_1086994.webp`,
    ],
    kitContents: [
      "A pair of lights",
      "A pair of basic SS clamps",
      "Warranty card",
      "Screw kit",
      "Tail connectors",
    ],
    light: {
      lumens: 2800,
      wattsEach: 10,
      wattsPair: 20,
      beamDistanceM: 100,
      spot: 0,
      flood: 100,
      opticsLabel: "100% flood",
    },
    specs: [
      { label: "LED type", value: "Nichia LED" },
      { label: "IP rating", value: "IP-67 — water and dust proof" },
      { label: "Materials", value: "Polycarbonate and aluminium" },
      { label: "Warranty period", value: "18 months" },
      { label: "Colour temp", value: "5000K – 5700K" },
      { label: "Watt and volt", value: "20W · DC 12V – 14.5V" },
      { label: "Current", value: "2A per pair" },
      { label: "Life-span", value: "Up to 50,000 hours" },
      { label: "Lumens", value: "2800 raw lumens" },
      { label: "Beam distance", value: "100 m" },
      { label: "Optics", value: "100% flood" },
    ],
  },
  {
    slug: "scout-x",
    name: "Scout-X",
    code: "SCX-1",
    category: "aux-light",
    price: 6250,
    rating: 4.8,
    reviewCount: 40,
    tagline: "Even spot and flood. The all-rounder.",
    description:
      "The Scout-X Edition is packed with 4800 lumens per pair at just 20 watts each, in a sleek black gloss aluminium housing. An exclusive 18-month warranty replacement programme dictates the quality and guarantee on the product.",
    hero: `${CDN}/products/SCX-1/medium/product_1752415144_4889185.webp`,
    gallery: [
      `${CDN}/products/SCX-1/original/product_1752415144_7809344.webp`,
      `${CDN}/products/SCX-1/original/product_1752415144_1467183.webp`,
      `${CDN}/products/SCX-1/original/product_1752415144_9570307.webp`,
      `${CDN}/products/SCX-1/original/product_1752415145_7747571.webp`,
      `${CDN}/products/SCX-1/original/product_1752415145_2847027.webp`,
      `${CDN}/products/SCX-1/original/product_1752415145_1363549.webp`,
    ],
    kitContents: [
      "A pair of lights",
      "Basic SS-clamps",
      "Warranty card",
      "Screw kit",
      "Tail connectors",
    ],
    light: {
      lumens: 4800,
      wattsEach: 20,
      wattsPair: 40,
      beamDistanceM: 200,
      spot: 50,
      flood: 50,
      opticsLabel: "Spot 50% · flood 50% combo",
    },
    specs: [
      { label: "LED type", value: "Nichia LED" },
      { label: "IP rating", value: "IP-67 — water and dust proof" },
      { label: "Materials", value: "Polycarbonate and aluminium" },
      { label: "Warranty period", value: "18 months" },
      { label: "Colour temp", value: "5000K – 5700K" },
      { label: "Watt and volt", value: "40W · DC 12V – 14.5V" },
      { label: "Life-span", value: "Up to 50,000 hours" },
      { label: "Lumens", value: "4800 raw lumens" },
      { label: "Beam distance", value: "200 m" },
      { label: "Optics", value: "Spot 50% and flood 50% (combo beam)" },
    ],
  },
  {
    slug: "delta",
    name: "Delta",
    code: "MADDL",
    category: "aux-light",
    price: 8249,
    rating: 0,
    reviewCount: 0,
    tagline: "Spot-biased reach at 30 watts.",
    description:
      "The Delta Edition is packed with 6400 lumens per pair at just 30 watts each. A sleek black gloss aluminium housing that outshines the competition through both appearance and performance, with an exclusive 18-month warranty replacement programme.",
    hero: `${CDN}/products/MADDL/medium/product_1752410793_7612647.webp`,
    gallery: [
      `${CDN}/products/MADDL/original/product_1752410793_3455551.webp`,
      `${CDN}/products/MADDL/original/product_1752410793_2735299.webp`,
      `${CDN}/products/MADDL/original/product_1752410794_2236518.webp`,
      `${CDN}/products/MADDL/original/product_1752410794_1811226.webp`,
      `${CDN}/products/MADDL/original/product_1752410794_2585359.webp`,
      `${CDN}/products/MADDL/original/product_1752410795_7862650.webp`,
    ],
    kitContents: [
      "A pair of lights",
      "Basic SS clamps",
      "Warranty card",
      "Screw kit",
      "Tail connectors",
    ],
    light: {
      lumens: 6400,
      wattsEach: 30,
      wattsPair: 60,
      beamDistanceM: 250,
      spot: 70,
      flood: 30,
      opticsLabel: "Spot 70% · flood 30% combo",
    },
    specs: [
      { label: "LED type", value: "Nichia LED (Japanese tech)" },
      { label: "IP rating", value: "IP-67 — water and dust proof" },
      { label: "Materials", value: "Polycarbonate and aluminium" },
      { label: "Warranty period", value: "18 months" },
      { label: "Colour temp", value: "5000K – 5700K" },
      { label: "Watt and volt", value: "60W · DC 12V – 14.5V" },
      { label: "Current", value: "3.8A per pair" },
      { label: "Life-span", value: "Up to 50,000 hours" },
      { label: "Lumens", value: "6400 raw lumens" },
      { label: "Beam distance", value: "250 m" },
      { label: "Optics", value: "Spot 70% and flood 30% (combo beam)" },
    ],
  },
  {
    slug: "alpha",
    name: "Alpha",
    code: "MDA",
    category: "aux-light",
    price: 10249,
    rating: 4.8,
    reviewCount: 19,
    tagline: "300 metres of reach. The proven one.",
    description:
      "Alpha Edition is packed with 9600 lumens per pair at just 40 watts each that will truly annihilate the night. A sleek black gloss aluminium housing, an exclusive 18-month warranty replacement programme, and the most-reviewed light in the range.",
    hero: `${CDN}/products/MDA/medium/product_1752413036_4119529.webp`,
    gallery: [
      `${CDN}/products/MDA/original/product_1752413036_5662487.webp`,
      `${CDN}/products/MDA/original/product_1752413036_4038295.webp`,
      `${CDN}/products/MDA/original/product_1752413036_1629982.webp`,
      `${CDN}/products/MDA/original/product_1752413036_5474041.webp`,
      `${CDN}/products/MDA/original/product_1752413037_2350673.webp`,
      `${CDN}/products/MDA/original/product_1752413037_6179597.webp`,
    ],
    kitContents: [
      "A pair of lights",
      "A pair of basic stainless steel clamps",
      "Warranty card",
      "Screw kit",
      "Tail connectors",
    ],
    light: {
      lumens: 9600,
      wattsEach: 40,
      wattsPair: 80,
      beamDistanceM: 300,
      spot: 70,
      flood: 30,
      opticsLabel: "Spot 70% · flood 30% combo",
    },
    specs: [
      { label: "LED type", value: "Nichia LED (Japanese tech)" },
      { label: "IP rating", value: "IP-67 — water and dust proof" },
      { label: "Materials", value: "Polycarbonate and aluminium" },
      { label: "Warranty period", value: "18 months" },
      { label: "Colour temp", value: "5000K – 5700K" },
      { label: "Watt and volt", value: "80W · DC 12V – 14.5V" },
      { label: "Life-span", value: "Up to 50,000 hours" },
      { label: "Lumens", value: "9600 raw lumens" },
      { label: "Beam distance", value: "300 m" },
      { label: "Optics", value: "Spot 70% and flood 30% (combo beam)" },
    ],
  },
  {
    slug: "lycan",
    name: "Lycan",
    code: "MDL",
    category: "aux-light",
    price: 14750,
    rating: 4.9,
    reviewCount: 7,
    tagline: "Spot and flood on separate switches.",
    description:
      "The Lycan Edition features a dual-mode design, allowing independent control of the spot and flood beams. Ships complete with the Lycan Wire Harness Pro and Dual Switch Pro — the only light in the range that arrives as a finished system.",
    hero: `${CDN}/products/MDL/medium/product_1752410035_8967370.webp`,
    gallery: [
      `${CDN}/products/MDL/original/product_1752410035_4467479.webp`,
      `${CDN}/products/MDL/original/product_1752410035_6210319.webp`,
      `${CDN}/products/MDL/original/product_1752410036_3538879.webp`,
      `${CDN}/products/MDL/original/product_1752410036_7927038.webp`,
      `${CDN}/products/MDL/original/product_1752410036_5694137.webp`,
      `${CDN}/products/MDL/original/product_1752410037_2496670.webp`,
    ],
    kitContents: [
      "A pair of lights",
      "Pair of basic SS-clamps",
      "Lycan Wire Harness Pro",
      "Dual Switch Pro",
      "Warranty card",
      "Screw kit",
      "Tail connectors",
    ],
    light: {
      lumens: 10800,
      wattsEach: 40,
      wattsPair: 80,
      beamDistanceM: 250,
      spot: 60,
      flood: 40,
      opticsLabel: "Spot 60% · flood 40%, independently switchable",
      dualMode: true,
    },
    photometrics: `${CDN}/photometrics_images/MDL/photometrics_1786283198_6222650.webp`,
    dimensions: `${CDN}/dimensions_images/MDL/dimensions_1786286005_4601769.webp`,
    features: [
      `${CDN}/product_features/product_feature_1768301008_6534632.webp`,
      `${CDN}/product_features/product_feature_1768301041_7696008.webp`,
      `${CDN}/product_features/product_feature_1768301094_8982945.webp`,
      `${CDN}/product_features/product_feature_1768301176_8221433.webp`,
      `${CDN}/product_features/product_feature_1768302084_4044801.webp`,
    ],
    specs: [
      { label: "LED type", value: "Nichia" },
      { label: "IP rating", value: "IP-67 — water and dust proof" },
      { label: "Warranty period", value: "18 months" },
      { label: "Colour temp", value: "5000K – 5700K (warm white)" },
      { label: "Watt and volt", value: "80W per pair · DC 12V – 14.5V" },
      { label: "Life-span", value: "Up to 50,000 hours" },
      { label: "Lumens", value: "10,800 raw lumens" },
      { label: "Beam distance", value: "250 m spot · 150 m flood" },
      { label: "Optics", value: "60% spot and 40% flood, independently switchable" },
    ],
  },
  {
    slug: "rage",
    name: "Rage",
    code: "MDR",
    category: "aux-light",
    price: 12750,
    rating: 5,
    reviewCount: 3,
    tagline: "380 metres. The longest throw we make.",
    description:
      "Raw power, pure light. Rage unleashes uncompromising brightness — 11,600 lumens per pair at 45 watts each, with a 90% spot and 10% flood pattern that reaches 380 metres on high beam and opens to a 180° flood on low.",
    hero: `${CDN}/products/MDR/medium/product_1752410418_8281751.webp`,
    gallery: [
      `${CDN}/products/MDR/original/product_1752410418_9244111.webp`,
      `${CDN}/products/MDR/original/product_1752410419_3352346.webp`,
      `${CDN}/products/MDR/original/product_1752410418_8808744.webp`,
      `${CDN}/products/MDR/original/product_1752410419_2267757.webp`,
      `${CDN}/products/MDR/original/product_1752410419_7539001.webp`,
      `${CDN}/products/MDR/original/product_1752410420_2104310.webp`,
    ],
    kitContents: [
      "A pair of lights",
      "A pair of basic stainless steel clamps",
      "Warranty card",
      "Screw kit",
      "Tail connectors",
    ],
    light: {
      lumens: 11600,
      wattsEach: 45,
      wattsPair: 90,
      beamDistanceM: 380,
      spot: 90,
      flood: 10,
      opticsLabel: "Spot 90% · flood 10% combo",
    },
    photometrics: `${CDN}/photometrics_images/MDR/photometrics_1752757254_8652497.webp`,
    dimensions: `${CDN}/dimensions_images/MDR/dimensions_1752755580_2314061.webp`,
    features: [
      `${CDN}/product_features/product_feature_1761106540_3650052.webp`,
      `${CDN}/product_features/product_feature_1761106579_6115866.webp`,
      `${CDN}/product_features/product_feature_1758899367_4126444.webp`,
      `${CDN}/product_features/product_feature_1761108764_3509845.webp`,
    ],
    specs: [
      { label: "LED type", value: "Nichia" },
      { label: "IP rating", value: "IP-67 — water and dust proof" },
      { label: "Warranty period", value: "18 months" },
      { label: "Colour temp", value: "5000K – 5700K (warm white)" },
      { label: "Watt and volt", value: "90W per pair · DC 12V – 14.5V" },
      { label: "Life-span", value: "Up to 50,000 hours" },
      { label: "Lumens", value: "11,600 raw lumens" },
      { label: "Beam distance", value: "380 m spot · 50 m and 180° flood" },
      { label: "Optics", value: "90% spot and 10% flood (combo beam)" },
    ],
  },
  {
    slug: "switch-pro",
    name: "Switch Pro with Wire Harness Pro",
    code: "MSWPWP",
    category: "power",
    price: 2999,
    rating: 4.7,
    reviewCount: 3,
    tagline: "Plug-and-play control. Solid-state protected.",
    description:
      "The all-new Switch Pro combines pass function, on/off control and beacon mode in one sealed unit, and for the first time ships pre-equipped with the Wire Harness Pro — plug-and-play convenience with a solid-state relay protected circuit.",
    hero: `${CDN}/products/MSWPWP/medium/product_1756551578_9505484.webp`,
    gallery: [`${CDN}/kit_images/MSWPWP/kit_image_1756551577_5396032.webp`],
    kitContents: [
      "Switch Pro",
      "Wire Harness Pro",
      "1x handlebar clamp",
      "2x mirror mounting clamp",
      "Warranty card",
      "Screw set",
      "4x silicon belts",
    ],
    specs: [
      { label: "Body type", value: "Acrylonitrile butadiene styrene" },
      { label: "Wire thickness", value: "1 sq mm" },
      { label: "Wattage", value: "140W" },
      { label: "Fuse", value: "15A" },
      { label: "Relay", value: "Solid-state relay protected circuit" },
      { label: "Voltage", value: "9 – 24V" },
      { label: "Working temp", value: "-10°C to +50°C" },
    ],
  },
  {
    slug: "dimmer",
    name: "Maddog Dimmer",
    code: "MDDIM",
    category: "power",
    price: 3999,
    rating: 5,
    reviewCount: 1,
    tagline: "Four brightness levels. Pass and beacon.",
    description:
      "Quad-level dimming at 100%, 75%, 50% and 25%, plus pass function for signalling and beacon mode for emergencies. Ships with its own dedicated harness — it does not require an additional switch.",
    hero: `${CDN}/products/MDDIM/medium/product_1752415773_6116715.webp`,
    gallery: [`${CDN}/kit_images/MDDIM/kit_image_1752415773_6098489.webp`],
    kitContents: ["Maddog Dimmer", "Dedicated wire harness", "Warranty card", "Screw set"],
    features: [
      `${CDN}/product_features/product_feature_1768309049_3486861.webp`,
      `${CDN}/product_features/product_feature_1768309110_2849831.webp`,
      `${CDN}/product_features/product_feature_1768309259_5380281.webp`,
      `${CDN}/product_features/product_feature_1768310025_8589266.webp`,
    ],
    specs: [
      { label: "Dimming", value: "Quad level — 100%, 75%, 50%, 25%" },
      { label: "Pass function", value: "Yes" },
      { label: "Beacon mode", value: "Yes" },
      { label: "IP rating", value: "IP-67 — water and dust resistant" },
      { label: "Warranty period", value: "18 months" },
      {
        label: "Compatibility",
        value: "Includes its own harness. Not compatible with Wire Harness, Wire Harness Pro or Dual Wire Harness Pro.",
      },
    ],
  },
  {
    slug: "claw-x",
    name: "Claw X",
    code: "MCLX",
    category: "mount",
    price: 4499,
    rating: 4.5,
    reviewCount: 2,
    tagline: "25W charging. Vibration damped.",
    description:
      "The Claw X is the pinnacle of secure and adjustable phone holders for bikes. Engineered for versatility and durability, it keeps your phone firmly in place whether you are navigating city streets or cruising the highway.",
    hero: `${CDN}/products/MCLX/medium/product_1752422899_4061837.webp`,
    gallery: [`${CDN}/kit_images/MCLX/kit_image_1752422898_9895567.webp`],
    kitContents: [
      "Phone holder",
      "25W fast charger",
      "Handlebar clamp",
      "Vibration damper",
      "Screw set",
    ],
    specs: [
      { label: "Phone charger", value: "25W adaptive super-fast charger" },
      { label: "Warranty", value: "18 months (on charger)" },
      { label: "Voltage", value: "2V – 12V (adaptable)" },
      { label: "Current", value: "0.25A – 4A (adaptable)" },
      { label: "Life-cycle", value: "100,000 charge cycles" },
      { label: "Spring life", value: "200,000 push/pull cycles" },
      { label: "Materials", value: "Nylon, ABS, EPDM, silicone, coated steel" },
      { label: "Fasteners", value: "Stainless steel" },
      { label: "IP rating", value: "IP-67 certified" },
      { label: "USB type", value: "Type C" },
      { label: "Anti-vibration damper", value: "Yes" },
    ],
  },
];

/** Aux lights ordered by output — this is the spec ladder. */
export const ladder = products
  .filter((p) => p.category === "aux-light")
  .sort((a, b) => a.light!.lumens - b.light!.lumens);

export const lights = ladder;

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function formatPrice(paise: number): string {
  return `₹${paise.toLocaleString("en-IN")}`;
}
