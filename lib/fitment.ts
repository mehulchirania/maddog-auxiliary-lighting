/**
 * Mock fitment data for the "What do you ride?" flow.
 *
 * The live site already has this data in a real database (Classification →
 * Brand → Vehicle). This module mirrors that shape so the demo behaves like
 * the finished thing; in production it becomes a call to the PHP backend.
 *
 * Bike list is representative of the brands the live filter exposes.
 */

export interface Bike {
  id: string;
  brand: string;
  model: string;
  /** Rough riding character, used to pick a beam pattern. */
  kind: "adventure" | "tourer" | "street" | "cruiser";
  /** Product slugs, in fitting order. */
  recommended: {
    light: string;
    power: string;
    mount?: string;
  };
  /** Why this combination, in one line. */
  rationale: string;
}

export const brands = [
  "Royal Enfield",
  "KTM",
  "BMW",
  "Honda",
  "Yamaha",
  "Kawasaki",
  "Triumph",
  "Bajaj",
  "Suzuki",
  "Hero",
  "JAWA",
  "Harley Davidson",
  "Benelli",
] as const;

export const bikes: Bike[] = [
  // Royal Enfield
  {
    id: "re-himalayan-450",
    brand: "Royal Enfield",
    model: "Himalayan 450",
    kind: "adventure",
    recommended: { light: "rage", power: "switch-pro", mount: "claw-x" },
    rationale:
      "Long unlit stretches and real off-road use. The 90% spot pattern gives you reach at speed, and the flood opens up for technical sections.",
  },
  {
    id: "re-scram-411",
    brand: "Royal Enfield",
    model: "Scram 411",
    kind: "adventure",
    recommended: { light: "alpha", power: "switch-pro", mount: "claw-x" },
    rationale:
      "Alpha's 300 m throw suits mixed highway and trail without over-drawing the charging system.",
  },
  {
    id: "re-interceptor-650",
    brand: "Royal Enfield",
    model: "Interceptor 650",
    kind: "street",
    recommended: { light: "scout-x", power: "switch-pro", mount: "claw-x" },
    rationale:
      "An even 50/50 spot and flood is the right call for road riding — enough reach without throwing light where it isn't wanted.",
  },
  {
    id: "re-continental-gt-650",
    brand: "Royal Enfield",
    model: "Continental GT 650",
    kind: "street",
    recommended: { light: "scout-x", power: "switch-pro" },
    rationale: "Compact housings that sit cleanly on a café-styled front end.",
  },
  {
    id: "re-classic-350",
    brand: "Royal Enfield",
    model: "Classic 350",
    kind: "cruiser",
    recommended: { light: "scout", power: "switch-pro", mount: "claw-x" },
    rationale:
      "A 20W pair the stock alternator is comfortable with, in pure flood for city and near-field visibility.",
  },
  {
    id: "re-hunter-350",
    brand: "Royal Enfield",
    model: "Hunter 350",
    kind: "street",
    recommended: { light: "scout", power: "switch-pro", mount: "claw-x" },
    rationale: "Lightest draw in the range — the right match for a small-capacity commuter.",
  },

  // KTM
  {
    id: "ktm-390-adventure",
    brand: "KTM",
    model: "390 Adventure",
    kind: "adventure",
    recommended: { light: "lycan", power: "switch-pro", mount: "claw-x" },
    rationale:
      "Independent spot and flood switching earns its keep here — flood alone for trails, both for open highway.",
  },
  {
    id: "ktm-250-adventure",
    brand: "KTM",
    model: "250 Adventure",
    kind: "adventure",
    recommended: { light: "delta", power: "switch-pro", mount: "claw-x" },
    rationale: "Spot-biased 250 m reach at a 60W draw the electricals can carry.",
  },
  {
    id: "ktm-duke-390",
    brand: "KTM",
    model: "Duke 390",
    kind: "street",
    recommended: { light: "scout-x", power: "dimmer", mount: "claw-x" },
    rationale:
      "Pair with the Dimmer rather than a switch — drop to 25% in traffic, full power once the road opens.",
  },

  // BMW
  {
    id: "bmw-g310gs",
    brand: "BMW",
    model: "G 310 GS",
    kind: "adventure",
    recommended: { light: "alpha", power: "switch-pro", mount: "claw-x" },
    rationale: "300 m of throw without the current draw of the 90W pair.",
  },
  {
    id: "bmw-r1250gs",
    brand: "BMW",
    model: "R 1250 GS",
    kind: "adventure",
    recommended: { light: "rage", power: "switch-pro", mount: "claw-x" },
    rationale:
      "A big touring alternator can carry the 90W pair comfortably — take the full 380 m.",
  },

  // Honda
  {
    id: "honda-nx500",
    brand: "Honda",
    model: "NX500",
    kind: "adventure",
    recommended: { light: "rage", power: "switch-pro", mount: "claw-x" },
    rationale: "Highway-biased adventure riding rewards the longest throw in the range.",
  },
  {
    id: "honda-cb350",
    brand: "Honda",
    model: "CB350",
    kind: "cruiser",
    recommended: { light: "scout", power: "switch-pro", mount: "claw-x" },
    rationale: "Low draw, flood pattern, no glare into oncoming traffic.",
  },
  {
    id: "honda-hornet-160r",
    brand: "Honda",
    model: "Hornet 160R",
    kind: "street",
    recommended: { light: "scout", power: "switch-pro", mount: "claw-x" },
    rationale: "A 20W pair is the sensible ceiling on a 160cc charging system.",
  },

  // Yamaha
  {
    id: "yamaha-mt15",
    brand: "Yamaha",
    model: "MT-15",
    kind: "street",
    recommended: { light: "scout", power: "dimmer", mount: "claw-x" },
    rationale: "Dimmer keeps you legal and courteous in city traffic.",
  },
  {
    id: "yamaha-r15",
    brand: "Yamaha",
    model: "R15 V4",
    kind: "street",
    recommended: { light: "scout", power: "dimmer" },
    rationale: "Compact housings that clear a full fairing.",
  },

  // Kawasaki
  {
    id: "kawasaki-versys-650",
    brand: "Kawasaki",
    model: "Versys 650",
    kind: "tourer",
    recommended: { light: "lycan", power: "switch-pro", mount: "claw-x" },
    rationale:
      "Long-distance touring is exactly where separate spot and flood control pays off.",
  },
  {
    id: "kawasaki-z900",
    brand: "Kawasaki",
    model: "Z900",
    kind: "street",
    recommended: { light: "scout-x", power: "dimmer", mount: "claw-x" },
    rationale: "Even beam split, dimmable, no glare complaints.",
  },

  // Triumph
  {
    id: "triumph-scrambler-400x",
    brand: "Triumph",
    model: "Scrambler 400 X",
    kind: "adventure",
    recommended: { light: "delta", power: "switch-pro", mount: "claw-x" },
    rationale: "Spot-biased combo for mixed surfaces, at a moderate 60W draw.",
  },
  {
    id: "triumph-tiger-900",
    brand: "Triumph",
    model: "Tiger 900",
    kind: "adventure",
    recommended: { light: "rage", power: "switch-pro", mount: "claw-x" },
    rationale: "Full-size adventure electricals, full-size beam.",
  },

  // Bajaj
  {
    id: "bajaj-dominar-400",
    brand: "Bajaj",
    model: "Dominar 400",
    kind: "tourer",
    recommended: { light: "alpha", power: "switch-pro", mount: "claw-x" },
    rationale: "A highway tourer that can carry 80W — 300 m of usable reach.",
  },
  {
    id: "bajaj-pulsar-ns200",
    brand: "Bajaj",
    model: "Pulsar NS200",
    kind: "street",
    recommended: { light: "scout", power: "dimmer", mount: "claw-x" },
    rationale: "Modest draw with four-level dimming for mixed city and highway use.",
  },

  // Suzuki
  {
    id: "suzuki-vstrom-250",
    brand: "Suzuki",
    model: "V-Strom SX 250",
    kind: "adventure",
    recommended: { light: "delta", power: "switch-pro", mount: "claw-x" },
    rationale: "Spot-biased reach sized to a 250 adventure tourer.",
  },
  {
    id: "suzuki-gixxer-250",
    brand: "Suzuki",
    model: "Gixxer SF 250",
    kind: "street",
    recommended: { light: "scout-x", power: "dimmer" },
    rationale: "Even split, dimmable, fairing-friendly.",
  },

  // Hero
  {
    id: "hero-xpulse-200",
    brand: "Hero",
    model: "XPulse 200 4V",
    kind: "adventure",
    recommended: { light: "scout-x", power: "switch-pro", mount: "claw-x" },
    rationale:
      "A light off-roader with a small alternator — 40W of even spot and flood is the sweet spot.",
  },

  // JAWA
  {
    id: "jawa-42",
    brand: "JAWA",
    model: "42",
    kind: "street",
    recommended: { light: "scout", power: "switch-pro", mount: "claw-x" },
    rationale: "Low draw and a clean flood pattern that suits the classic front end.",
  },
  {
    id: "jawa-perak",
    brand: "JAWA",
    model: "Perak",
    kind: "cruiser",
    recommended: { light: "scout", power: "switch-pro" },
    rationale: "Compact, low-draw, and visually unobtrusive on a bobber.",
  },

  // Harley Davidson
  {
    id: "hd-x440",
    brand: "Harley Davidson",
    model: "X440",
    kind: "cruiser",
    recommended: { light: "scout-x", power: "switch-pro", mount: "claw-x" },
    rationale: "Even beam split for highway cruising without dazzling oncoming traffic.",
  },

  // Benelli
  {
    id: "benelli-trk-502",
    brand: "Benelli",
    model: "TRK 502",
    kind: "adventure",
    recommended: { light: "lycan", power: "switch-pro", mount: "claw-x" },
    rationale: "A heavy tourer with the electrical headroom for dual-mode control.",
  },
];

export function bikesForBrand(brand: string): Bike[] {
  return bikes.filter((b) => b.brand === brand);
}

export function getBike(id: string): Bike | undefined {
  return bikes.find((b) => b.id === id);
}
