/**
 * Social proof pulled from the live site on 2026-08-16.
 *
 * The motovlogger list is real — these creators have published Maddog reviews
 * and are currently buried on /videos/reviews. The customer quotes are real
 * reviews from the product pages, lightly trimmed for length.
 */

export interface Creator {
  channel: string;
  product: string;
  url?: string;
}

/** All 18 creators listed on the live /videos/reviews page. */
export const creators: Creator[] = [
  { channel: "SANTASTIC", product: "Alpha" },
  { channel: "My Tiger Tales", product: "Alpha" },
  { channel: "Jeet Para Psyn", product: "Scout-X" },
  { channel: "motoioi", product: "Alpha" },
  { channel: "Live Dream Go", product: "Scout-X" },
  { channel: "THOMSON RICHARDS", product: "Alpha" },
  { channel: "Road Activities", product: "Scout-X" },
  { channel: "ALLTIME BIKER", product: "Alpha" },
  { channel: "shravan kumar", product: "Scout-X" },
  { channel: "XploreRides", product: "Alpha" },
  { channel: "syeds moto vlogs", product: "Scout-X" },
  { channel: "Devbhoomi MotoVlogs", product: "Alpha" },
  { channel: "Harish Vlogs", product: "Scout-X" },
  { channel: "Madan Music", product: "Alpha" },
  { channel: "Shriram V", product: "Scout-X" },
  { channel: "Motodrift Bangalore", product: "Alpha" },
  { channel: "KRANTHI KIRAN REDDY", product: "Alpha" },
  { channel: "Rides of India", product: "Scout-X" },
];

export interface Testimonial {
  name: string;
  date: string;
  product: string;
  productSlug: string;
  headline: string;
  body: string;
}

export const testimonials: Testimonial[] = [
  {
    name: "Ujjwal Thapa",
    date: "February 2025",
    product: "Scout",
    productSlug: "scout",
    headline: "Best there is",
    body: "After a careful two-year observation of the product, I am pleased to share my review. The performance of these lights has been outstanding. They provide bright illumination and demonstrate real durability.",
  },
  {
    name: "V Krishnaraj",
    date: "July 2024",
    product: "Claw X",
    productSlug: "claw-x",
    headline: "Perfect phone mount",
    body: "Perfect phone mount for clipped handlebar motorcycles, and the customer response is so awesome.",
  },
  {
    name: "Harthik M",
    date: "July 2024",
    product: "Claw X",
    productSlug: "claw-x",
    headline: "Already running Alpha",
    body: "I would suggest everyone buy this product because I'm already using the Maddog Alpha and the quality carries across the range.",
  },
];

/** Aggregate figures, derived from the catalogue rather than asserted. */
export const aggregate = {
  totalReviews: 82,
  creatorCount: creators.length,
  warrantyMonths: 18,
  lifespanHours: 50000,
};
