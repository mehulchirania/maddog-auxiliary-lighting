/**
 * Editorial and brand imagery beyond the product catalogue.
 *
 * IMPORTANT — every one of these was opened and looked at before being listed
 * here. The `nature` field describes what the file ACTUALLY contains, because
 * several are not what their filename suggests. Read it before using anything.
 *
 * All files live in public/media (see scripts/fetch-assets.mjs).
 */

export interface MediaAsset {
  src: string;
  width: number;
  height: number;
  /** What the image actually depicts, verified by eye. */
  nature: string;
  /** Whether it sits on a dark or light ground. Drives which panel it can go on. */
  ground: "dark" | "light";
  /** True if headline text, logos, phone numbers or handles are baked into the pixels. */
  hasBakedText: boolean;
  alt: string;
}

/**
 * The single genuinely cinematic asset Maddog owns: the full light range
 * arranged on a dark stormy mountain ridge. Headline and feature icons are
 * burned into the left third, so it can only be used whole (as a designed
 * banner) or cropped hard to the right to isolate the product row.
 */
export const heroBanner: MediaAsset = {
  src: "/media/banners/background_1777985582_4572315.webp",
  width: 1920,
  height: 772,
  nature:
    "Finished marketing banner. Alpha, Lycan, Rage, Delta and Scout-X lined up on a dark mountain ridge under storm cloud. 'BUILT TO LEAD. BORN TO PERFORM.' set in the left third with IP-67 / 18 months / Nichia / Made for extremes icons beneath.",
  ground: "dark",
  hasBakedText: true,
  alt: "The Maddog range — Alpha, Lycan, Rage, Delta and Scout-X — on a mountain ridge at dusk",
};

/** Light studio sweep. Pairs with the white-ground product shots. */
export const studioBackdrop: MediaAsset = {
  src: "/media/banners/background_1777815489_6903210.webp",
  width: 1920,
  height: 772,
  nature:
    "Abstract light-grey studio sweep — soft floor, faint diagonal geometry, warm light streaks lower left. No product, no text. Clean enough to sit behind anything.",
  ground: "light",
  hasBakedText: false,
  alt: "Studio backdrop",
};

/**
 * Large white-ground product posters with the red wolf mark and the model
 * wordmark locked up above the product. Genuinely handsome; use them as whole
 * posters rather than trying to extract the product.
 */
export const productPosters: MediaAsset[] = [
  {
    src: "/media/images/about-us-poster-1.webp",
    width: 1050,
    height: 1458,
    nature:
      "Alpha poster on white. Red wolf mark and 'ALPHA — PERFORMANCE AUXILIARY LIGHTS' wordmark above two Alpha units, one face-on and one edge-on, with cable.",
    ground: "light",
    hasBakedText: true,
    alt: "Alpha auxiliary light poster",
  },
  {
    src: "/media/images/about-us-poster-2.webp",
    width: 1050,
    height: 1458,
    nature: "Companion poster to the Alpha poster, same white studio treatment.",
    ground: "light",
    hasBakedText: true,
    alt: "Maddog auxiliary light poster",
  },
];

/**
 * Social-media advertisements, NOT clean photography. Each has the Maddog
 * phone number, website and Instagram handle burned along the bottom edge and
 * red ring callouts drawn over the mounted lights. Only usable if you are
 * deliberately presenting them as "our ads" — never as editorial imagery.
 */
export const socialPosters: MediaAsset[] = [
  {
    src: "/media/gallery/2838023a778dfaecdc212708f721b7881630846672himalayan 2_022_7_11zon.jpg",
    width: 3000,
    height: 3750,
    nature:
      "Scout X advertisement. Royal Enfield Himalayan with panniers and helmet against a Himalayan pass, Scout X units ringed in red, product pair inset lower left, contact details along the bottom.",
    ground: "dark",
    hasBakedText: true,
    alt: "Scout X fitted to a Royal Enfield Himalayan",
  },
  {
    src: "/media/gallery/f9028faec74be6ec9b852b0a542e2f39163084658211_31_11zon.jpg",
    width: 1440,
    height: 1036,
    nature: "Customer-submitted gallery image.",
    ground: "dark",
    hasBakedText: false,
    alt: "Maddog lights fitted to a motorcycle",
  },
  {
    src: "/media/gallery/d61e4bbd6393c9111e6526ea173a7c8b1630846556011_24_11zon.jpg",
    width: 1080,
    height: 1264,
    nature: "Customer-submitted gallery image.",
    ground: "dark",
    hasBakedText: false,
    alt: "Maddog lights fitted to a motorcycle",
  },
];

/**
 * NOT photography. The `product_features/*` files are flat black pictogram
 * glyphs on white — a lightbulb, and similar. Treat them as icons: small,
 * recoloured via CSS, never as a hero image.
 */
export const featureGlyphsAreIcons = true;

/**
 * Maddog's real logo, in the three variants they publish. All transparent PNG.
 */
export const logo = {
  /** Red "MAD" + black "DOG" wordmark with the fang mark. Light grounds only —
   *  the black half disappears on a dark panel. Used in Nav and Footer. */
  onLight: "/media/brand/maddog-logo.png",
  /** Red fang mark + WHITE "MADDOG" wordmark. Use this on any dark panel. */
  onDark: "/media/brand/maddog-logo-white.png",
  /** The fang mark alone, red, no wordmark. Square-ish (2825x1951). Works on
   *  either ground since it has no black or white fill — useful small, or as
   *  a watermark. */
  markOnly: "/media/brand/maddog-mark.png",
  /** All three share this pixel aspect ratio for the wordmark variants. */
  wordmarkAspect: [2547, 501] as const,
};

/**
 * The hard constraint for this design.
 *
 * Every product photograph in lib/products.ts sits on PURE WHITE. There is no
 * transparency and no dark-ground product photography. Dropping one onto a
 * dark panel produces a glaring white rectangle, and no blend mode fixes it —
 * `multiply` destroys the product (it is nearly black), `screen` keeps the
 * white ground.
 *
 * So product panels are LIGHT panels. The design alternates dark editorial
 * panels against bright studio panels, and that alternation is what carries
 * the cinematic rhythm.
 */
export const PRODUCT_PHOTOS_ARE_ON_WHITE = true;
