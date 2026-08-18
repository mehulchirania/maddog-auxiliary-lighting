// Hand-verified image classification (redesign-audit-fix-1.md §0).
// Every entry here was opened and visually confirmed — do not add a path
// without opening the file first. High-KB files in products/*/original are
// usually real photos; low-KB files are white-background studio renders.
//
// Classification pass covered MDR (Rage), MDL (Lycan), MDA (Alpha), SC1
// (Scout), MADDL (Delta) and SCX-1 (Scout-X). Delta and Scout-X yielded only
// studio renders in the files checked — they may still have real photos
// among unchecked files; add them here once verified, don't guess.

export type FieldMediaKind = "beam-photo" | "mounted-photo";

export interface FieldMedia {
  src: string;
  kind: FieldMediaKind;
  sku: string;
  productSlug: string;
  caption: string;
}

export const fieldMedia: FieldMedia[] = [
  {
    src: "/media/products/MDR/original/product_1752410419_3352346.webp",
    kind: "beam-photo",
    sku: "MDR",
    productSlug: "rage",
    caption: "Rage — 400 m measured spot beam, distance-board test",
  },
  {
    src: "/media/products/MDR/original/product_1752410420_2104310.webp",
    kind: "mounted-photo",
    sku: "MDR",
    productSlug: "rage",
    caption: "Rage — clamp-mounted, Triumph fork",
  },
  {
    src: "/media/products/MDL/original/product_1752410035_6210319.webp",
    kind: "beam-photo",
    sku: "MDL",
    productSlug: "lycan",
    caption: "Lycan — 250 m measured spot beam, same road as the Rage test",
  },
  {
    src: "/media/products/MDA/original/product_1752413037_2350673.webp",
    kind: "beam-photo",
    sku: "MDA",
    productSlug: "alpha",
    caption: "Alpha — 300 m measured spot beam, distance-board test",
  },
  {
    src: "/media/products/SC1/original/product_1752413246_6644867.webp",
    kind: "mounted-photo",
    sku: "SC1",
    productSlug: "scout",
    caption: "Scout — fork-mounted, front suspension detail",
  },
];

export function fieldMediaForSlug(slug: string): FieldMedia[] {
  return fieldMedia.filter((m) => m.productSlug === slug);
}

export function fieldMediaForSku(sku: string): FieldMedia[] {
  return fieldMedia.filter((m) => m.sku === sku);
}
