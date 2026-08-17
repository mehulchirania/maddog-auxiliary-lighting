// Complete live Maddog catalog — verified & crawled from maddog.co.in

export type Category = "aux-light" | "car-fog-lamp" | "mount" | "power" | "filter" | "clamp" | "ev-edition";

export interface LightSpecs {
  lumens: number;
  wattsEach: number;
  wattsPair: number;
  beamDistanceM: number;
  spot: number;
  flood: number;
  opticsLabel: string;
  dualMode?: boolean;
}

export interface ProductSpec {
  label: string;
  value: string;
}

export type SpecRow = ProductSpec;

export interface Product {
  slug: string;
  name: string;
  code: string;
  category: Category;
  price: number;
  rating: number;
  reviewCount: number;
  tagline: string;
  description: string;
  hero: string;
  gallery: string[];
  kitContents: string[];
  specs: ProductSpec[];
  light?: LightSpecs;
  photometrics?: {
    diagram: string;
    description: string;
    beamProfile: string;
    isoLuxChart: string;
  };
  dimensions?: {
    blueprint: string;
    widthMm: number;
    heightMm: number;
    depthMm: number;
    weightGrams: number;
  };
}

export const products: Product[] = [
  {
    "slug": "rage",
    "name": "Rage",
    "code": "MDR",
    "category": "aux-light",
    "price": 12750,
    "rating": 5.0,
    "reviewCount": 3,
    "tagline": "11,600 Lumens · 80W · 400m Throw. 9-Emitter CNC Auxiliary Light.",
    "description": "Engineered for desert rallies and unrestricted highway touring. The Maddog Rage packs 9 Nichia automotive emitters behind precision collimator lenses to project a 400-metre piercing beam with wide shoulder illumination.",
    "hero": "https://d32yu5nuptb5qv.cloudfront.net/products/MDR/medium/product_1752410418_8281751.webp",
    "gallery": [
      "https://d32yu5nuptb5qv.cloudfront.net/products/MDR/medium/product_1752410418_8281751.webp",
      "https://d32yu5nuptb5qv.cloudfront.net/products/MDR/original/product_1752410418_9244111.webp",
      "https://d32yu5nuptb5qv.cloudfront.net/products/MDR/original/product_1752410419_3352346.webp",
      "https://d32yu5nuptb5qv.cloudfront.net/products/MDR/original/product_1752410418_8808744.webp",
      "https://d32yu5nuptb5qv.cloudfront.net/products/MDR/original/product_1752410419_2267757.webp",
      "https://d32yu5nuptb5qv.cloudfront.net/products/MDR/original/product_1752410419_7539001.webp"
    ],
    "kitContents": [
      "2× Maddog Rage Auxiliary Light Pods",
      "Stainless Steel Mounting Hardware & Hex Bolts",
      "Maddog Laser-Marked Authentic Warranty Card"
    ],
    "specs": [
      {
        "label": "LED Configuration",
        "value": "9× Nichia Automotive Emitters (Japan)"
      },
      {
        "label": "Lumen Output",
        "value": "11,600 Raw Lumens (Pair)"
      },
      {
        "label": "Power Consumption",
        "value": "80 Watts Pair / 40W per pod"
      },
      {
        "label": "Peak Beam Distance",
        "value": "400 Metres @ 1 Lux"
      },
      {
        "label": "Color Temperature",
        "value": "5000K Pure Daylight White"
      },
      {
        "label": "Chassis Construction",
        "value": "6063-T6 Aerospace Billet Aluminium"
      },
      {
        "label": "Lens Material",
        "value": "Bayer Optical Polycarbonate (96% Transmittance)"
      },
      {
        "label": "Ingress Protection",
        "value": "IP-67 Submersion & Dust Sealed"
      },
      {
        "label": "Operating Lifespan",
        "value": "50,000+ Operating Hours"
      },
      {
        "label": "Warranty",
        "value": "18 Months Replacement Warranty"
      }
    ],
    "light": {
      "lumens": 11600,
      "wattsEach": 40,
      "wattsPair": 80,
      "beamDistanceM": 400,
      "spot": 80,
      "flood": 20,
      "opticsLabel": "80% Spot / 20% Flood Hybrid TIR",
      "dualMode": false
    },
    "photometrics": {
      "diagram": "/media/photometrics_images/MDR/photometrics_1752757254_8652497.webp",
      "description": "Exploded CAD schematic of Rage chassis, silicone IP-67 gasket, TIR lens & LED PCB.",
      "beamProfile": "80% Spot / 20% Flood Collimated Beam",
      "isoLuxChart": "/diagrams/isolux-profile.svg"
    },
    "dimensions": {
      "blueprint": "/media/dimensions_images/MDR/dimensions_1752755580_2314061.webp",
      "widthMm": 100,
      "heightMm": 100,
      "depthMm": 65,
      "weightGrams": 450
    }
  },
  {
    "slug": "lycan",
    "name": "Lycan",
    "code": "MDL",
    "category": "aux-light",
    "price": 14750,
    "rating": 4.9,
    "reviewCount": 7,
    "tagline": "10,800 Lumens · 75W · 380m Throw. Dual-Spectrum Amber & White Pod.",
    "description": "Dual-spectrum optical powerhouse. Lycan provides instant electronic switching between penetrating 3000K golden amber fog penetration and 5000K pure white highway high-beam illumination without needing physical snap-on filters.",
    "hero": "https://d32yu5nuptb5qv.cloudfront.net/products/MDL/medium/product_1752410035_8967370.webp",
    "gallery": [
      "https://d32yu5nuptb5qv.cloudfront.net/products/MDL/medium/product_1752410035_8967370.webp",
      "https://d32yu5nuptb5qv.cloudfront.net/products/MDL/original/product_1752410035_4467479.webp",
      "https://d32yu5nuptb5qv.cloudfront.net/products/MDL/original/product_1752410035_6210319.webp",
      "https://d32yu5nuptb5qv.cloudfront.net/products/MDL/original/product_1752410036_3538879.webp",
      "https://d32yu5nuptb5qv.cloudfront.net/products/MDL/original/product_1752410036_7927038.webp",
      "https://d32yu5nuptb5qv.cloudfront.net/products/MDL/original/product_1752410036_5694137.webp"
    ],
    "kitContents": [
      "2× Maddog Lycan Dual-Mode Auxiliary Light Pods",
      "Multi-channel mounting brackets & stainless hex hardware",
      "Maddog Authenticity & Serial Warranty Card"
    ],
    "specs": [
      {
        "label": "LED Configuration",
        "value": "8× Dual-Core Nichia Automotive LEDs"
      },
      {
        "label": "Lumen Output",
        "value": "10,800 Raw Lumens (Pair)"
      },
      {
        "label": "Power Consumption",
        "value": "75 Watts Pair / 37.5W per pod"
      },
      {
        "label": "Beam Distance",
        "value": "380 Metres @ 1 Lux"
      },
      {
        "label": "Color Modes",
        "value": "3000K Amber (Fog) + 5000K White (High-Beam)"
      },
      {
        "label": "Housing",
        "value": "CNC Machined 6063-T6 Hard Anodized Aluminium"
      },
      {
        "label": "Ingress Protection",
        "value": "IP-67 Sealed with Fluorosilicone O-rings"
      },
      {
        "label": "Thermal Management",
        "value": "Integrated Aero-Cooling Fin Radiator"
      },
      {
        "label": "Operating Lifespan",
        "value": "50,000+ Operating Hours"
      },
      {
        "label": "Warranty",
        "value": "18 Months Replacement Warranty"
      }
    ],
    "light": {
      "lumens": 10800,
      "wattsEach": 37.5,
      "wattsPair": 75,
      "beamDistanceM": 380,
      "spot": 70,
      "flood": 30,
      "opticsLabel": "Dual-Mode 3000K Amber / 5000K White",
      "dualMode": true
    },
    "photometrics": {
      "diagram": "/media/photometrics_images/MDL/photometrics_1786283198_6222650.webp",
      "description": "Exploded CAD schematic of Lycan chassis, silicone IP-67 gasket, TIR lens & LED PCB.",
      "beamProfile": "70% Spot / 30% Flood Collimated Beam",
      "isoLuxChart": "/diagrams/isolux-profile.svg"
    },
    "dimensions": {
      "blueprint": "/media/dimensions_images/MDL/dimensions_1786286005_4601769.webp",
      "widthMm": 100,
      "heightMm": 112,
      "depthMm": 65,
      "weightGrams": 460
    }
  },
  {
    "slug": "alpha",
    "name": "Alpha",
    "code": "MDA",
    "category": "aux-light",
    "price": 10249,
    "rating": 4.8,
    "reviewCount": 19,
    "tagline": "9,600 Lumens · 64W · 350m Throw. The Ultimate Adventure Light Pod.",
    "description": "The benchmark of adventure touring. The Maddog Alpha delivers a hyper-focused 350m spot beam paired with peripheral flood spread, ideal for high-speed night runs across unpredictable terrain.",
    "hero": "https://d32yu5nuptb5qv.cloudfront.net/products/MDA/medium/product_1752413036_4119529.webp",
    "gallery": [
      "https://d32yu5nuptb5qv.cloudfront.net/products/MDA/medium/product_1752413036_4119529.webp",
      "https://d32yu5nuptb5qv.cloudfront.net/products/MDA/original/product_1752413036_5662487.webp",
      "https://d32yu5nuptb5qv.cloudfront.net/products/MDA/original/product_1752413036_4038295.webp",
      "https://d32yu5nuptb5qv.cloudfront.net/products/MDA/original/product_1752413036_1629982.webp",
      "https://d32yu5nuptb5qv.cloudfront.net/products/MDA/original/product_1752413036_5474041.webp",
      "https://d32yu5nuptb5qv.cloudfront.net/products/MDA/original/product_1752413037_2350673.webp"
    ],
    "kitContents": [
      "2× Maddog Alpha Auxiliary Light Pods",
      "Anti-vibration mount hardware & hex bolts",
      "Maddog Serialized Warranty Card"
    ],
    "specs": [
      {
        "label": "LED Configuration",
        "value": "6× High-Intensity Nichia Emitters"
      },
      {
        "label": "Lumen Output",
        "value": "9,600 Raw Lumens (Pair)"
      },
      {
        "label": "Power Consumption",
        "value": "64 Watts Pair / 32W per pod"
      },
      {
        "label": "Beam Distance",
        "value": "350 Metres @ 1 Lux"
      },
      {
        "label": "Color Temperature",
        "value": "5000K Natural White"
      },
      {
        "label": "Chassis",
        "value": "Aircraft Billet Aluminium with Thermal Coating"
      },
      {
        "label": "IP Rating",
        "value": "IP-67 Ingress Submersion Protection"
      },
      {
        "label": "Warranty",
        "value": "18 Months Replacement Warranty"
      }
    ],
    "light": {
      "lumens": 9600,
      "wattsEach": 32,
      "wattsPair": 64,
      "beamDistanceM": 350,
      "spot": 80,
      "flood": 20,
      "opticsLabel": "80% Spot / 20% Flood Precision TIR",
      "dualMode": false
    },
    "photometrics": {
      "diagram": "/diagrams/cad-exploded.svg",
      "description": "Exploded CAD schematic of Alpha chassis, silicone IP-67 gasket, TIR lens & LED PCB.",
      "beamProfile": "80% Spot / 20% Flood Collimated Beam",
      "isoLuxChart": "/diagrams/isolux-profile.svg"
    },
    "dimensions": {
      "blueprint": "/diagrams/cad-blueprint.svg",
      "widthMm": 90,
      "heightMm": 90,
      "depthMm": 65,
      "weightGrams": 420
    }
  },
  {
    "slug": "delta",
    "name": "Delta",
    "code": "MADDL",
    "category": "aux-light",
    "price": 8249,
    "rating": 4.8,
    "reviewCount": 14,
    "tagline": "6,400 Lumens · 50W · 280m Throw. Compact High-Performance Auxiliary Light.",
    "description": "Compact footprint with massive photometric output. The Maddog Delta produces 6,400 lumens in an ultra-compact chassis, perfect for middleweight ADV and scrambler motorcycles.",
    "hero": "https://d32yu5nuptb5qv.cloudfront.net/products/MADDL/medium/product_1752410793_7612647.webp",
    "gallery": [
      "https://d32yu5nuptb5qv.cloudfront.net/products/MADDL/medium/product_1752410793_7612647.webp",
      "https://d32yu5nuptb5qv.cloudfront.net/products/MADDL/original/product_1752410793_3455551.webp",
      "https://d32yu5nuptb5qv.cloudfront.net/products/MADDL/original/product_1752410793_2735299.webp",
      "https://d32yu5nuptb5qv.cloudfront.net/products/MADDL/original/product_1752410794_2236518.webp",
      "https://d32yu5nuptb5qv.cloudfront.net/products/MADDL/original/product_1752410794_1811226.webp",
      "https://d32yu5nuptb5qv.cloudfront.net/products/MADDL/original/product_1752410794_2585359.webp"
    ],
    "kitContents": [
      "2× Maddog Delta Auxiliary Light Pods",
      "Universal stainless mounting brackets & bolts",
      "Maddog Official Warranty Card"
    ],
    "specs": [
      {
        "label": "LED Configuration",
        "value": "4× Premium Nichia Emitters"
      },
      {
        "label": "Lumen Output",
        "value": "6,400 Raw Lumens (Pair)"
      },
      {
        "label": "Power Consumption",
        "value": "50 Watts Pair / 25W per pod"
      },
      {
        "label": "Beam Distance",
        "value": "280 Metres @ 1 Lux"
      },
      {
        "label": "Color Temperature",
        "value": "5000K Pure Daylight White"
      },
      {
        "label": "Chassis",
        "value": "Heavy-Duty Die-Cast Aluminium Alloy"
      },
      {
        "label": "IP Rating",
        "value": "IP-67 Water & Dust Sealed"
      },
      {
        "label": "Warranty",
        "value": "18 Months Replacement Warranty"
      }
    ],
    "light": {
      "lumens": 6400,
      "wattsEach": 25,
      "wattsPair": 50,
      "beamDistanceM": 280,
      "spot": 70,
      "flood": 30,
      "opticsLabel": "70% Spot / 30% Flood Wide Hybrid",
      "dualMode": false
    },
    "photometrics": {
      "diagram": "/diagrams/cad-exploded.svg",
      "description": "Exploded CAD schematic of Delta chassis, silicone IP-67 gasket, TIR lens & LED PCB.",
      "beamProfile": "70% Spot / 30% Flood Collimated Beam",
      "isoLuxChart": "/diagrams/isolux-profile.svg"
    },
    "dimensions": {
      "blueprint": "/diagrams/cad-blueprint.svg",
      "widthMm": 90,
      "heightMm": 90,
      "depthMm": 65,
      "weightGrams": 420
    }
  },
  {
    "slug": "scout-x",
    "name": "Scout-X",
    "code": "SCX-1",
    "category": "aux-light",
    "price": 6250,
    "rating": 4.8,
    "reviewCount": 40,
    "tagline": "4,800 Lumens · 40W · 220m Throw. Ultra-Compact High-Efficiency Pod.",
    "description": "The next-generation Scout-X delivers 4,800 lumens in a featherweight 210g pod. Engineered for single-cylinder bikes, scooters, and lightweight adventure machines.",
    "hero": "https://d32yu5nuptb5qv.cloudfront.net/products/SCX-1/medium/product_1752415144_4889185.webp",
    "gallery": [
      "https://d32yu5nuptb5qv.cloudfront.net/products/SCX-1/medium/product_1752415144_4889185.webp",
      "https://d32yu5nuptb5qv.cloudfront.net/products/SCX-1/original/product_1752415144_7809344.webp",
      "https://d32yu5nuptb5qv.cloudfront.net/products/SCX-1/original/product_1752415144_1467183.webp",
      "https://d32yu5nuptb5qv.cloudfront.net/products/SCX-1/original/product_1752415144_9570307.webp",
      "https://d32yu5nuptb5qv.cloudfront.net/products/SCX-1/original/product_1752415145_7747571.webp",
      "https://d32yu5nuptb5qv.cloudfront.net/products/SCX-1/original/product_1752415145_2847027.webp"
    ],
    "kitContents": [
      "2× Maddog Scout-X Auxiliary Light Pods",
      "Universal crash guard mounting bolts & brackets",
      "Maddog 18-Month Warranty Card"
    ],
    "specs": [
      {
        "label": "LED Configuration",
        "value": "4× Nichia Micro-Collimator LEDs"
      },
      {
        "label": "Lumen Output",
        "value": "4,800 Raw Lumens (Pair)"
      },
      {
        "label": "Power Consumption",
        "value": "40 Watts Pair / 20W per pod"
      },
      {
        "label": "Beam Distance",
        "value": "220 Metres"
      },
      {
        "label": "Weight per Pod",
        "value": "210 Grams"
      },
      {
        "label": "Chassis",
        "value": "Corrosion-Resistant Powder-Coated Aluminium"
      },
      {
        "label": "IP Rating",
        "value": "IP-67 Sealed"
      },
      {
        "label": "Warranty",
        "value": "18 Months Replacement Warranty"
      }
    ],
    "light": {
      "lumens": 4800,
      "wattsEach": 20,
      "wattsPair": 40,
      "beamDistanceM": 220,
      "spot": 60,
      "flood": 40,
      "opticsLabel": "60% Spot / 40% Flood Ultra-Wide Spread",
      "dualMode": false
    },
    "photometrics": {
      "diagram": "/diagrams/cad-exploded.svg",
      "description": "Exploded CAD schematic of Scout-X chassis, silicone IP-67 gasket, TIR lens & LED PCB.",
      "beamProfile": "60% Spot / 40% Flood Collimated Beam",
      "isoLuxChart": "/diagrams/isolux-profile.svg"
    },
    "dimensions": {
      "blueprint": "/diagrams/cad-blueprint.svg",
      "widthMm": 90,
      "heightMm": 90,
      "depthMm": 65,
      "weightGrams": 420
    }
  },
  {
    "slug": "scout",
    "name": "Scout",
    "code": "SC1",
    "category": "aux-light",
    "price": 4250,
    "rating": 4.9,
    "reviewCount": 7,
    "tagline": "3,000 Lumens · 30W · 180m Throw. Essential Auxiliary Lighting.",
    "description": "The entry point to Maddog auxiliary lighting. Reliable, robust, and power-efficient with 3,000 lumens output, compatible with all stock 12V electrical systems.",
    "hero": "https://d32yu5nuptb5qv.cloudfront.net/products/SC1/medium/product_1752413246_5777416.webp",
    "gallery": [
      "https://d32yu5nuptb5qv.cloudfront.net/products/SC1/medium/product_1752413246_5777416.webp",
      "https://d32yu5nuptb5qv.cloudfront.net/products/SC1/original/product_1752413245_2479757.webp",
      "https://d32yu5nuptb5qv.cloudfront.net/products/SC1/original/product_1752413246_4131135.webp",
      "https://d32yu5nuptb5qv.cloudfront.net/products/SC1/original/product_1752413246_6644867.webp",
      "https://d32yu5nuptb5qv.cloudfront.net/products/SC1/original/product_1752413247_5788398.webp",
      "https://d32yu5nuptb5qv.cloudfront.net/products/SC1/original/product_1752413247_1086994.webp"
    ],
    "kitContents": [
      "2× Maddog Scout Auxiliary Light Pods",
      "Mounting hardware & screws",
      "Warranty card"
    ],
    "specs": [
      {
        "label": "LED Configuration",
        "value": "3× Nichia High-Efficiency LEDs"
      },
      {
        "label": "Lumen Output",
        "value": "3,000 Raw Lumens (Pair)"
      },
      {
        "label": "Power Consumption",
        "value": "30 Watts Pair / 15W per pod"
      },
      {
        "label": "Beam Distance",
        "value": "180 Metres"
      },
      {
        "label": "IP Rating",
        "value": "IP-67 Sealed"
      },
      {
        "label": "Warranty",
        "value": "18 Months Replacement Warranty"
      }
    ],
    "light": {
      "lumens": 3000,
      "wattsEach": 15,
      "wattsPair": 30,
      "beamDistanceM": 180,
      "spot": 50,
      "flood": 50,
      "opticsLabel": "50% Spot / 50% Flood Balanced Beam",
      "dualMode": false
    },
    "photometrics": {
      "diagram": "/diagrams/cad-exploded.svg",
      "description": "Exploded CAD schematic of Scout chassis, silicone IP-67 gasket, TIR lens & LED PCB.",
      "beamProfile": "50% Spot / 50% Flood Collimated Beam",
      "isoLuxChart": "/diagrams/isolux-profile.svg"
    },
    "dimensions": {
      "blueprint": "/diagrams/cad-blueprint.svg",
      "widthMm": 90,
      "heightMm": 90,
      "depthMm": 65,
      "weightGrams": 420
    }
  },
  {
    "slug": "alpha-thar",
    "name": "Alpha - Thar",
    "code": "A-T",
    "category": "car-fog-lamp",
    "price": 11250,
    "rating": 5.0,
    "reviewCount": 1,
    "tagline": "Direct OEM Fog Lamp Replacement Projector Kit · A-T",
    "description": "The Alpha - Thar delivers 9,600 raw lumens in a direct bolt-on OEM fog lamp bracket assembly, engineered with a sharp cutoff line that provides massive road illumination without blinding oncoming traffic.",
    "hero": "https://d32yu5nuptb5qv.cloudfront.net/products/A-T/medium/product_1752429626_5323213.webp",
    "gallery": [
      "https://d32yu5nuptb5qv.cloudfront.net/products/A-T/medium/product_1752429626_5323213.webp",
      "https://d32yu5nuptb5qv.cloudfront.net/products/A-T/original/product_1752429625_4726325.webp",
      "https://d32yu5nuptb5qv.cloudfront.net/products/A-T/original/product_1752429626_4117580.webp",
      "https://d32yu5nuptb5qv.cloudfront.net/products/A-T/original/product_1752429626_3934972.webp",
      "https://d32yu5nuptb5qv.cloudfront.net/products/A-T/original/product_1752429626_9950339.webp",
      "https://d32yu5nuptb5qv.cloudfront.net/products/A-T/original/product_1752429627_8041317.webp"
    ],
    "kitContents": [
      "2× Alpha - Thar Projector Light Pods",
      "Vehicle-specific OEM replacement brackets",
      "Plug & play OEM adapter wire harness"
    ],
    "specs": [
      {
        "label": "Lumen Output",
        "value": "9,600 Lumens (Pair)"
      },
      {
        "label": "Power Consumption",
        "value": "64 Watts Pair / 32W per pod"
      },
      {
        "label": "Beam Pattern",
        "value": "ECE R19 Fog Pattern with Razor Cutoff"
      },
      {
        "label": "Housing",
        "value": "Die-Cast Heavy-Duty Aero Aluminium"
      },
      {
        "label": "IP Rating",
        "value": "IP-67 Submersion Sealed"
      },
      {
        "label": "Origin",
        "value": "Bengaluru, India"
      }
    ]
  },
  {
    "slug": "alpha-nexon-harrier-safari",
    "name": "Alpha - Nexon / Harrier / Safari",
    "code": "A-NHS",
    "category": "car-fog-lamp",
    "price": 11250,
    "rating": 4.8,
    "reviewCount": 14,
    "tagline": "Direct OEM Fog Lamp Replacement Projector Kit · A-NHS",
    "description": "The Alpha - Nexon / Harrier / Safari delivers 9,600 raw lumens in a direct bolt-on OEM fog lamp bracket assembly, engineered with a sharp cutoff line that provides massive road illumination without blinding oncoming traffic.",
    "hero": "https://d32yu5nuptb5qv.cloudfront.net/products/A-NHS/medium/product_1752429560_8459097.webp",
    "gallery": [
      "https://d32yu5nuptb5qv.cloudfront.net/products/A-NHS/medium/product_1752429560_8459097.webp",
      "https://d32yu5nuptb5qv.cloudfront.net/products/A-NHS/original/product_1752429560_6891590.webp",
      "https://d32yu5nuptb5qv.cloudfront.net/products/A-NHS/original/product_1752429560_7414844.webp",
      "https://d32yu5nuptb5qv.cloudfront.net/products/A-NHS/original/product_1752429561_4765854.webp",
      "https://d32yu5nuptb5qv.cloudfront.net/products/A-NHS/original/product_1752429561_2668301.webp",
      "https://d32yu5nuptb5qv.cloudfront.net/products/A-NHS/small/product_1752429560_3540757.webp"
    ],
    "kitContents": [
      "2× Alpha - Nexon / Harrier / Safari Projector Light Pods",
      "Vehicle-specific OEM replacement brackets",
      "Plug & play OEM adapter wire harness"
    ],
    "specs": [
      {
        "label": "Lumen Output",
        "value": "9,600 Lumens (Pair)"
      },
      {
        "label": "Power Consumption",
        "value": "64 Watts Pair / 32W per pod"
      },
      {
        "label": "Beam Pattern",
        "value": "ECE R19 Fog Pattern with Razor Cutoff"
      },
      {
        "label": "Housing",
        "value": "Die-Cast Heavy-Duty Aero Aluminium"
      },
      {
        "label": "IP Rating",
        "value": "IP-67 Submersion Sealed"
      },
      {
        "label": "Origin",
        "value": "Bengaluru, India"
      }
    ]
  },
  {
    "slug": "alpha-swift-baleno-ciaz-ertiga-swift-dzire-ignis-xl6",
    "name": "Alpha - Swift, Baleno, Ciaz, Ertiga, Swift Dzire, Ignis and XL6",
    "code": "MMS",
    "category": "car-fog-lamp",
    "price": 11250,
    "rating": 4.0,
    "reviewCount": 1,
    "tagline": "Direct OEM Fog Lamp Replacement Projector Kit · MMS",
    "description": "The Alpha - Swift, Baleno, Ciaz, Ertiga, Swift Dzire, Ignis and XL6 delivers 9,600 raw lumens in a direct bolt-on OEM fog lamp bracket assembly, engineered with a sharp cutoff line that provides massive road illumination without blinding oncoming traffic.",
    "hero": "https://d32yu5nuptb5qv.cloudfront.net/products/MMS/medium/product_1752427725_8099007.webp",
    "gallery": [
      "https://d32yu5nuptb5qv.cloudfront.net/products/MMS/medium/product_1752427725_8099007.webp",
      "https://d32yu5nuptb5qv.cloudfront.net/products/MMS/original/product_1752427725_1357922.webp",
      "https://d32yu5nuptb5qv.cloudfront.net/products/MMS/original/product_1752427725_5765327.webp",
      "https://d32yu5nuptb5qv.cloudfront.net/products/MMS/original/product_1752427725_1182044.webp",
      "https://d32yu5nuptb5qv.cloudfront.net/products/MMS/original/product_1752427726_1651505.webp",
      "https://d32yu5nuptb5qv.cloudfront.net/products/MMS/original/product_1752427726_8396020.webp"
    ],
    "kitContents": [
      "2× Alpha - Swift, Baleno, Ciaz, Ertiga, Swift Dzire, Ignis and XL6 Projector Light Pods",
      "Vehicle-specific OEM replacement brackets",
      "Plug & play OEM adapter wire harness"
    ],
    "specs": [
      {
        "label": "Lumen Output",
        "value": "9,600 Lumens (Pair)"
      },
      {
        "label": "Power Consumption",
        "value": "64 Watts Pair / 32W per pod"
      },
      {
        "label": "Beam Pattern",
        "value": "ECE R19 Fog Pattern with Razor Cutoff"
      },
      {
        "label": "Housing",
        "value": "Die-Cast Heavy-Duty Aero Aluminium"
      },
      {
        "label": "IP Rating",
        "value": "IP-67 Submersion Sealed"
      },
      {
        "label": "Origin",
        "value": "Bengaluru, India"
      }
    ]
  },
  {
    "slug": "claw-x",
    "name": "MADDOG Claw X",
    "code": "MCLX",
    "category": "mount",
    "price": 4499,
    "rating": 4.5,
    "reviewCount": 2,
    "tagline": "CNC Machined Vibration-Damped Phone Mount · MCLX",
    "description": "The MADDOG Claw X is precision engineered from aerospace aluminium alloy with 4-corner silicone dampening matrix to protect smartphone Optical Image Stabilization (OIS) sensors from high-frequency motorcycle engine harmonics.",
    "hero": "https://d32yu5nuptb5qv.cloudfront.net/products/MCLX/medium/product_1752422899_4061837.webp",
    "gallery": [
      "https://d32yu5nuptb5qv.cloudfront.net/products/MCLX/medium/product_1752422899_4061837.webp",
      "https://d32yu5nuptb5qv.cloudfront.net/products/MCLX/original/product_1752422899_1571602.webp",
      "https://d32yu5nuptb5qv.cloudfront.net/products/MCLX/original/product_1752422899_2221212.webp",
      "https://d32yu5nuptb5qv.cloudfront.net/products/MCLX/original/product_1752422899_9690981.webp",
      "https://d32yu5nuptb5qv.cloudfront.net/products/MCLX/original/product_1752422900_4382781.webp",
      "https://d32yu5nuptb5qv.cloudfront.net/products/MCLX/original/product_1752422900_5071215.webp"
    ],
    "kitContents": [
      "1× MADDOG Claw X CNC Mount Assembly",
      "Handlebar clamp inserts (22mm, 28mm, 32mm)",
      "Anti-theft hex wrench & security bolts",
      "Maddog Authenticity Card"
    ],
    "specs": [
      {
        "label": "Material",
        "value": "6063-T6 CNC Billet Aluminium Alloy"
      },
      {
        "label": "Vibration Dampening",
        "value": "Multi-Axis Silicone Harmonic Isolators"
      },
      {
        "label": "Phone Size Range",
        "value": "4.7 inch to 7.2 inch devices"
      },
      {
        "label": "Handlebar Compatibility",
        "value": "22mm (7/8\"), 28mm (1-1/8\"), 32mm (1-1/4\")"
      },
      {
        "label": "Rotation",
        "value": "360-Degree Ball Joint Articulation"
      },
      {
        "label": "Origin",
        "value": "Bengaluru, India"
      }
    ]
  },
  {
    "slug": "claw-pro",
    "name": "MADDOG Claw Pro",
    "code": "MCLP",
    "category": "mount",
    "price": 3399,
    "rating": 4.8,
    "reviewCount": 14,
    "tagline": "CNC Machined Vibration-Damped Phone Mount · MCLP",
    "description": "The MADDOG Claw Pro is precision engineered from aerospace aluminium alloy with 4-corner silicone dampening matrix to protect smartphone Optical Image Stabilization (OIS) sensors from high-frequency motorcycle engine harmonics.",
    "hero": "https://d32yu5nuptb5qv.cloudfront.net/products/MCLP/medium/product_1752422750_4541734.webp",
    "gallery": [
      "https://d32yu5nuptb5qv.cloudfront.net/products/MCLP/medium/product_1752422750_4541734.webp",
      "https://d32yu5nuptb5qv.cloudfront.net/products/MCLP/original/product_1752422750_6336968.webp",
      "https://d32yu5nuptb5qv.cloudfront.net/products/MCLP/original/product_1752422750_7924531.webp",
      "https://d32yu5nuptb5qv.cloudfront.net/products/MCLP/original/product_1752422751_8190366.webp",
      "https://d32yu5nuptb5qv.cloudfront.net/products/MCLP/original/product_1752422751_5163415.webp",
      "https://d32yu5nuptb5qv.cloudfront.net/products/MCLP/original/product_1752422751_9495375.webp"
    ],
    "kitContents": [
      "1× MADDOG Claw Pro CNC Mount Assembly",
      "Handlebar clamp inserts (22mm, 28mm, 32mm)",
      "Anti-theft hex wrench & security bolts",
      "Maddog Authenticity Card"
    ],
    "specs": [
      {
        "label": "Material",
        "value": "6063-T6 CNC Billet Aluminium Alloy"
      },
      {
        "label": "Vibration Dampening",
        "value": "Multi-Axis Silicone Harmonic Isolators"
      },
      {
        "label": "Phone Size Range",
        "value": "4.7 inch to 7.2 inch devices"
      },
      {
        "label": "Handlebar Compatibility",
        "value": "22mm (7/8\"), 28mm (1-1/8\"), 32mm (1-1/4\")"
      },
      {
        "label": "Rotation",
        "value": "360-Degree Ball Joint Articulation"
      },
      {
        "label": "Origin",
        "value": "Bengaluru, India"
      }
    ]
  },
  {
    "slug": "claw",
    "name": "MADDOG Claw",
    "code": "MCL",
    "category": "mount",
    "price": 2299,
    "rating": 4.8,
    "reviewCount": 14,
    "tagline": "CNC Machined Vibration-Damped Phone Mount · MCL",
    "description": "The MADDOG Claw is precision engineered from aerospace aluminium alloy with 4-corner silicone dampening matrix to protect smartphone Optical Image Stabilization (OIS) sensors from high-frequency motorcycle engine harmonics.",
    "hero": "https://d32yu5nuptb5qv.cloudfront.net/products/MCL/medium/product_1752419540_9241517.webp",
    "gallery": [
      "https://d32yu5nuptb5qv.cloudfront.net/products/MCL/medium/product_1752419540_9241517.webp",
      "https://d32yu5nuptb5qv.cloudfront.net/products/MCL/original/product_1752419540_2891882.webp",
      "https://d32yu5nuptb5qv.cloudfront.net/products/MCL/original/product_1752419540_8381912.webp",
      "https://d32yu5nuptb5qv.cloudfront.net/products/MCL/original/product_1752419541_1361204.webp",
      "https://d32yu5nuptb5qv.cloudfront.net/products/MCL/original/product_1752419541_8738759.webp",
      "https://d32yu5nuptb5qv.cloudfront.net/products/MCL/small/product_1752419540_8792072.webp"
    ],
    "kitContents": [
      "1× MADDOG Claw CNC Mount Assembly",
      "Handlebar clamp inserts (22mm, 28mm, 32mm)",
      "Anti-theft hex wrench & security bolts",
      "Maddog Authenticity Card"
    ],
    "specs": [
      {
        "label": "Material",
        "value": "6063-T6 CNC Billet Aluminium Alloy"
      },
      {
        "label": "Vibration Dampening",
        "value": "Multi-Axis Silicone Harmonic Isolators"
      },
      {
        "label": "Phone Size Range",
        "value": "4.7 inch to 7.2 inch devices"
      },
      {
        "label": "Handlebar Compatibility",
        "value": "22mm (7/8\"), 28mm (1-1/8\"), 32mm (1-1/4\")"
      },
      {
        "label": "Rotation",
        "value": "360-Degree Ball Joint Articulation"
      },
      {
        "label": "Origin",
        "value": "Bengaluru, India"
      }
    ]
  },
  {
    "slug": "claw-lite",
    "name": "MADDOG Claw Lite",
    "code": "MCLL",
    "category": "mount",
    "price": 1199,
    "rating": 5.0,
    "reviewCount": 1,
    "tagline": "CNC Machined Vibration-Damped Phone Mount · MCLL",
    "description": "The MADDOG Claw Lite is precision engineered from aerospace aluminium alloy with 4-corner silicone dampening matrix to protect smartphone Optical Image Stabilization (OIS) sensors from high-frequency motorcycle engine harmonics.",
    "hero": "https://d32yu5nuptb5qv.cloudfront.net/products/MCLL/medium/product_1752419191_6369535.webp",
    "gallery": [
      "https://d32yu5nuptb5qv.cloudfront.net/products/MCLL/medium/product_1752419191_6369535.webp",
      "https://d32yu5nuptb5qv.cloudfront.net/products/MCLL/original/product_1752419191_7644844.webp",
      "https://d32yu5nuptb5qv.cloudfront.net/products/MCLL/original/product_1752419191_8916830.webp",
      "https://d32yu5nuptb5qv.cloudfront.net/products/MCLL/original/product_1752419192_5069147.webp",
      "https://d32yu5nuptb5qv.cloudfront.net/products/MCLL/original/product_1752419192_2876225.webp",
      "https://d32yu5nuptb5qv.cloudfront.net/products/MCLL/small/product_1752419191_9994605.webp"
    ],
    "kitContents": [
      "1× MADDOG Claw Lite CNC Mount Assembly",
      "Handlebar clamp inserts (22mm, 28mm, 32mm)",
      "Anti-theft hex wrench & security bolts",
      "Maddog Authenticity Card"
    ],
    "specs": [
      {
        "label": "Material",
        "value": "6063-T6 CNC Billet Aluminium Alloy"
      },
      {
        "label": "Vibration Dampening",
        "value": "Multi-Axis Silicone Harmonic Isolators"
      },
      {
        "label": "Phone Size Range",
        "value": "4.7 inch to 7.2 inch devices"
      },
      {
        "label": "Handlebar Compatibility",
        "value": "22mm (7/8\"), 28mm (1-1/8\"), 32mm (1-1/4\")"
      },
      {
        "label": "Rotation",
        "value": "360-Degree Ball Joint Articulation"
      },
      {
        "label": "Origin",
        "value": "Bengaluru, India"
      }
    ]
  },
  {
    "slug": "vibration-damper-x",
    "name": "Maddog Vibration Damper X",
    "code": "MVDX",
    "category": "mount",
    "price": 1699,
    "rating": 4.8,
    "reviewCount": 14,
    "tagline": "CNC Machined Vibration-Damped Phone Mount · MVDX",
    "description": "The Maddog Vibration Damper X is precision engineered from aerospace aluminium alloy with 4-corner silicone dampening matrix to protect smartphone Optical Image Stabilization (OIS) sensors from high-frequency motorcycle engine harmonics.",
    "hero": "https://d32yu5nuptb5qv.cloudfront.net/products/MVDX/medium/product_1752417357_1895053.webp",
    "gallery": [
      "https://d32yu5nuptb5qv.cloudfront.net/products/MVDX/medium/product_1752417357_1895053.webp",
      "https://d32yu5nuptb5qv.cloudfront.net/products/MVDX/original/product_1752417357_8247149.webp",
      "https://d32yu5nuptb5qv.cloudfront.net/products/MVDX/original/product_1752417357_8559079.webp",
      "https://d32yu5nuptb5qv.cloudfront.net/products/MVDX/original/product_1752417358_3707850.webp",
      "https://d32yu5nuptb5qv.cloudfront.net/products/MVDX/original/product_1752417358_1298562.webp",
      "https://d32yu5nuptb5qv.cloudfront.net/products/MVDX/small/product_1752417357_1954955.webp"
    ],
    "kitContents": [
      "1× Maddog Vibration Damper X CNC Mount Assembly",
      "Handlebar clamp inserts (22mm, 28mm, 32mm)",
      "Anti-theft hex wrench & security bolts",
      "Maddog Authenticity Card"
    ],
    "specs": [
      {
        "label": "Material",
        "value": "6063-T6 CNC Billet Aluminium Alloy"
      },
      {
        "label": "Vibration Dampening",
        "value": "Multi-Axis Silicone Harmonic Isolators"
      },
      {
        "label": "Phone Size Range",
        "value": "4.7 inch to 7.2 inch devices"
      },
      {
        "label": "Handlebar Compatibility",
        "value": "22mm (7/8\"), 28mm (1-1/8\"), 32mm (1-1/4\")"
      },
      {
        "label": "Rotation",
        "value": "360-Degree Ball Joint Articulation"
      },
      {
        "label": "Origin",
        "value": "Bengaluru, India"
      }
    ]
  },
  {
    "slug": "vibration-damper-pro",
    "name": "Maddog Vibration Damper Pro",
    "code": "MVDP",
    "category": "mount",
    "price": 999,
    "rating": 4.8,
    "reviewCount": 14,
    "tagline": "CNC Machined Vibration-Damped Phone Mount · MVDP",
    "description": "The Maddog Vibration Damper Pro is precision engineered from aerospace aluminium alloy with 4-corner silicone dampening matrix to protect smartphone Optical Image Stabilization (OIS) sensors from high-frequency motorcycle engine harmonics.",
    "hero": "https://d32yu5nuptb5qv.cloudfront.net/products/MVDP/medium/product_1752417082_4703916.webp",
    "gallery": [
      "https://d32yu5nuptb5qv.cloudfront.net/products/MVDP/medium/product_1752417082_4703916.webp",
      "https://d32yu5nuptb5qv.cloudfront.net/products/MVDP/original/product_1752417082_8477150.webp",
      "https://d32yu5nuptb5qv.cloudfront.net/products/MVDP/original/product_1752417082_9123351.webp",
      "https://d32yu5nuptb5qv.cloudfront.net/products/MVDP/original/product_1752417083_6074524.webp",
      "https://d32yu5nuptb5qv.cloudfront.net/products/MVDP/original/product_1752417083_9962049.webp",
      "https://d32yu5nuptb5qv.cloudfront.net/products/MVDP/original/product_1752417083_3686540.webp"
    ],
    "kitContents": [
      "1× Maddog Vibration Damper Pro CNC Mount Assembly",
      "Handlebar clamp inserts (22mm, 28mm, 32mm)",
      "Anti-theft hex wrench & security bolts",
      "Maddog Authenticity Card"
    ],
    "specs": [
      {
        "label": "Material",
        "value": "6063-T6 CNC Billet Aluminium Alloy"
      },
      {
        "label": "Vibration Dampening",
        "value": "Multi-Axis Silicone Harmonic Isolators"
      },
      {
        "label": "Phone Size Range",
        "value": "4.7 inch to 7.2 inch devices"
      },
      {
        "label": "Handlebar Compatibility",
        "value": "22mm (7/8\"), 28mm (1-1/8\"), 32mm (1-1/4\")"
      },
      {
        "label": "Rotation",
        "value": "360-Degree Ball Joint Articulation"
      },
      {
        "label": "Origin",
        "value": "Bengaluru, India"
      }
    ]
  },
  {
    "slug": "switch-pro-and-wire-harness-pro",
    "name": "Maddog Switch and Wire harness Pro",
    "code": "MSWPWP",
    "category": "power",
    "price": 2999,
    "rating": 4.7,
    "reviewCount": 3,
    "tagline": "Heavy-Duty Automotive Electrical Architecture · MSWPWP",
    "description": "The Maddog Switch and Wire harness Pro features tin-plated copper automotive wiring, waterproof relays, sealed in-line fuses, and IP-67 sealed tactile switches designed to handle up to 20A continuous load safely.",
    "hero": "https://d32yu5nuptb5qv.cloudfront.net/products/MSWPWP/medium/product_1756551578_9505484.webp",
    "gallery": [
      "https://d32yu5nuptb5qv.cloudfront.net/products/MSWPWP/medium/product_1756551578_9505484.webp",
      "https://d32yu5nuptb5qv.cloudfront.net/products/MSWPWP/original/product_1756551577_5691712.webp",
      "https://d32yu5nuptb5qv.cloudfront.net/products/MSWPWP/original/product_1756551578_5686051.webp",
      "https://d32yu5nuptb5qv.cloudfront.net/products/MSWPWP/original/product_1756551578_9785797.webp",
      "https://d32yu5nuptb5qv.cloudfront.net/products/MSWPWP/original/product_1756551578_3084708.webp",
      "https://d32yu5nuptb5qv.cloudfront.net/products/MSWPWP/original/product_1756551579_4985029.webp"
    ],
    "kitContents": [
      "1× Maddog Switch and Wire harness Pro",
      "Waterproof relay & 20A inline fuse harness",
      "Handlebar switch mounting brackets",
      "Zip-ties & heat-shrink sleeves"
    ],
    "specs": [
      {
        "label": "Max Continuous Current",
        "value": "20 Amperes (240W @ 12V)"
      },
      {
        "label": "Wire Gauge",
        "value": "14 AWG Tin-Plated Automotive Grade Copper"
      },
      {
        "label": "Relay",
        "value": "40A Sealed Automotive Waterproof Relay"
      },
      {
        "label": "Switch Ingress",
        "value": "IP-67 Waterproof Tactile Switch with LED Indicator"
      },
      {
        "label": "Fuse",
        "value": "20A Ceramic In-Line Fuse Holder"
      },
      {
        "label": "Origin",
        "value": "Bengaluru, India"
      }
    ]
  },
  {
    "slug": "dimmer",
    "name": "Maddog Dimmer",
    "code": "MDDIM",
    "category": "power",
    "price": 3999,
    "rating": 5.0,
    "reviewCount": 1,
    "tagline": "Heavy-Duty Automotive Electrical Architecture · MDDIM",
    "description": "The Maddog Dimmer features tin-plated copper automotive wiring, waterproof relays, sealed in-line fuses, and IP-67 sealed tactile switches designed to handle up to 20A continuous load safely.",
    "hero": "https://d32yu5nuptb5qv.cloudfront.net/products/MDDIM/medium/product_1752415773_6116715.webp",
    "gallery": [
      "https://d32yu5nuptb5qv.cloudfront.net/products/MDDIM/medium/product_1752415773_6116715.webp",
      "https://d32yu5nuptb5qv.cloudfront.net/products/MDDIM/original/product_1752415773_9257121.webp",
      "https://d32yu5nuptb5qv.cloudfront.net/products/MDDIM/original/product_1752415774_9195717.webp",
      "https://d32yu5nuptb5qv.cloudfront.net/products/MDDIM/original/product_1752415774_5518942.webp",
      "https://d32yu5nuptb5qv.cloudfront.net/products/MDDIM/original/product_1752415774_4596988.webp",
      "https://d32yu5nuptb5qv.cloudfront.net/products/MDDIM/original/product_1752415775_4925066.webp"
    ],
    "kitContents": [
      "1× Maddog Dimmer",
      "Waterproof relay & 20A inline fuse harness",
      "Handlebar switch mounting brackets",
      "Zip-ties & heat-shrink sleeves"
    ],
    "specs": [
      {
        "label": "Max Continuous Current",
        "value": "20 Amperes (240W @ 12V)"
      },
      {
        "label": "Wire Gauge",
        "value": "14 AWG Tin-Plated Automotive Grade Copper"
      },
      {
        "label": "Relay",
        "value": "40A Sealed Automotive Waterproof Relay"
      },
      {
        "label": "Switch Ingress",
        "value": "IP-67 Waterproof Tactile Switch with LED Indicator"
      },
      {
        "label": "Fuse",
        "value": "20A Ceramic In-Line Fuse Holder"
      },
      {
        "label": "Origin",
        "value": "Bengaluru, India"
      }
    ]
  },
  {
    "slug": "dual-switch-pro",
    "name": "Dual Switch Pro",
    "code": "MDDSP",
    "category": "power",
    "price": 2499,
    "rating": 4.8,
    "reviewCount": 14,
    "tagline": "Heavy-Duty Automotive Electrical Architecture · MDDSP",
    "description": "The Dual Switch Pro features tin-plated copper automotive wiring, waterproof relays, sealed in-line fuses, and IP-67 sealed tactile switches designed to handle up to 20A continuous load safely.",
    "hero": "https://d32yu5nuptb5qv.cloudfront.net/products/MDDSP/medium/product_1752416117_9896942.webp",
    "gallery": [
      "https://d32yu5nuptb5qv.cloudfront.net/products/MDDSP/medium/product_1752416117_9896942.webp",
      "https://d32yu5nuptb5qv.cloudfront.net/products/MDDSP/original/product_1752416117_6135949.webp",
      "https://d32yu5nuptb5qv.cloudfront.net/products/MDDSP/original/product_1752416117_9323974.webp",
      "https://d32yu5nuptb5qv.cloudfront.net/products/MDDSP/original/product_1752416117_4582831.webp",
      "https://d32yu5nuptb5qv.cloudfront.net/products/MDDSP/original/product_1752416117_4008189.webp",
      "https://d32yu5nuptb5qv.cloudfront.net/products/MDDSP/original/product_1752416118_4769214.webp"
    ],
    "kitContents": [
      "1× Dual Switch Pro",
      "Waterproof relay & 20A inline fuse harness",
      "Handlebar switch mounting brackets",
      "Zip-ties & heat-shrink sleeves"
    ],
    "specs": [
      {
        "label": "Max Continuous Current",
        "value": "20 Amperes (240W @ 12V)"
      },
      {
        "label": "Wire Gauge",
        "value": "14 AWG Tin-Plated Automotive Grade Copper"
      },
      {
        "label": "Relay",
        "value": "40A Sealed Automotive Waterproof Relay"
      },
      {
        "label": "Switch Ingress",
        "value": "IP-67 Waterproof Tactile Switch with LED Indicator"
      },
      {
        "label": "Fuse",
        "value": "20A Ceramic In-Line Fuse Holder"
      },
      {
        "label": "Origin",
        "value": "Bengaluru, India"
      }
    ]
  },
  {
    "slug": "switch",
    "name": "MADDOG Switch",
    "code": "SW",
    "category": "power",
    "price": 599,
    "rating": 4.7,
    "reviewCount": 10,
    "tagline": "Heavy-Duty Automotive Electrical Architecture · SW",
    "description": "The MADDOG Switch features tin-plated copper automotive wiring, waterproof relays, sealed in-line fuses, and IP-67 sealed tactile switches designed to handle up to 20A continuous load safely.",
    "hero": "https://d32yu5nuptb5qv.cloudfront.net/products/SW/medium/product_1752430007_1898541.webp",
    "gallery": [
      "https://d32yu5nuptb5qv.cloudfront.net/products/SW/medium/product_1752430007_1898541.webp",
      "https://d32yu5nuptb5qv.cloudfront.net/products/SW/original/product_1752430007_4455406.webp",
      "https://d32yu5nuptb5qv.cloudfront.net/products/SW/original/product_1752430007_9102296.webp",
      "https://d32yu5nuptb5qv.cloudfront.net/products/SW/original/product_1752430008_2849781.webp",
      "https://d32yu5nuptb5qv.cloudfront.net/products/SW/small/product_1752430007_8160842.webp",
      "https://d32yu5nuptb5qv.cloudfront.net/products/SW/small/product_1752430008_5756278.webp"
    ],
    "kitContents": [
      "1× MADDOG Switch",
      "Waterproof relay & 20A inline fuse harness",
      "Handlebar switch mounting brackets",
      "Zip-ties & heat-shrink sleeves"
    ],
    "specs": [
      {
        "label": "Max Continuous Current",
        "value": "20 Amperes (240W @ 12V)"
      },
      {
        "label": "Wire Gauge",
        "value": "14 AWG Tin-Plated Automotive Grade Copper"
      },
      {
        "label": "Relay",
        "value": "40A Sealed Automotive Waterproof Relay"
      },
      {
        "label": "Switch Ingress",
        "value": "IP-67 Waterproof Tactile Switch with LED Indicator"
      },
      {
        "label": "Fuse",
        "value": "20A Ceramic In-Line Fuse Holder"
      },
      {
        "label": "Origin",
        "value": "Bengaluru, India"
      }
    ]
  },
  {
    "slug": "dual-wire-harness-pro",
    "name": "Dual Wireharness Pro",
    "code": "DWHP",
    "category": "power",
    "price": 2499,
    "rating": 4.8,
    "reviewCount": 14,
    "tagline": "Heavy-Duty Automotive Electrical Architecture · DWHP",
    "description": "The Dual Wireharness Pro features tin-plated copper automotive wiring, waterproof relays, sealed in-line fuses, and IP-67 sealed tactile switches designed to handle up to 20A continuous load safely.",
    "hero": "https://d32yu5nuptb5qv.cloudfront.net/products/DWHP/medium/product_1752416466_5814695.webp",
    "gallery": [
      "https://d32yu5nuptb5qv.cloudfront.net/products/DWHP/medium/product_1752416466_5814695.webp",
      "https://d32yu5nuptb5qv.cloudfront.net/products/DWHP/original/product_1752416466_8276702.webp",
      "https://d32yu5nuptb5qv.cloudfront.net/products/DWHP/original/product_1752416466_1292715.webp",
      "https://d32yu5nuptb5qv.cloudfront.net/products/DWHP/original/product_1752416467_9395770.webp",
      "https://d32yu5nuptb5qv.cloudfront.net/products/DWHP/original/product_1752416467_5276523.webp",
      "https://d32yu5nuptb5qv.cloudfront.net/products/DWHP/small/product_1752416466_3668892.webp"
    ],
    "kitContents": [
      "1× Dual Wireharness Pro",
      "Waterproof relay & 20A inline fuse harness",
      "Handlebar switch mounting brackets",
      "Zip-ties & heat-shrink sleeves"
    ],
    "specs": [
      {
        "label": "Max Continuous Current",
        "value": "20 Amperes (240W @ 12V)"
      },
      {
        "label": "Wire Gauge",
        "value": "14 AWG Tin-Plated Automotive Grade Copper"
      },
      {
        "label": "Relay",
        "value": "40A Sealed Automotive Waterproof Relay"
      },
      {
        "label": "Switch Ingress",
        "value": "IP-67 Waterproof Tactile Switch with LED Indicator"
      },
      {
        "label": "Fuse",
        "value": "20A Ceramic In-Line Fuse Holder"
      },
      {
        "label": "Origin",
        "value": "Bengaluru, India"
      }
    ]
  },
  {
    "slug": "4-wheeler-wireharness-with-switch",
    "name": "4-Wheeler Wireharness (with switch)",
    "code": "4WH",
    "category": "power",
    "price": 2999,
    "rating": 5.0,
    "reviewCount": 2,
    "tagline": "Heavy-Duty Automotive Electrical Architecture · 4WH",
    "description": "The 4-Wheeler Wireharness (with switch) features tin-plated copper automotive wiring, waterproof relays, sealed in-line fuses, and IP-67 sealed tactile switches designed to handle up to 20A continuous load safely.",
    "hero": "https://d32yu5nuptb5qv.cloudfront.net/products/4WH/medium/product_1752429751_3201429.webp",
    "gallery": [
      "https://d32yu5nuptb5qv.cloudfront.net/products/4WH/medium/product_1752429751_3201429.webp",
      "https://d32yu5nuptb5qv.cloudfront.net/products/4WH/original/product_1752429751_7837355.webp",
      "https://d32yu5nuptb5qv.cloudfront.net/products/4WH/original/product_1752429751_7509101.webp",
      "https://d32yu5nuptb5qv.cloudfront.net/products/4WH/original/product_1752429752_8472834.webp",
      "https://d32yu5nuptb5qv.cloudfront.net/products/4WH/small/product_1752429751_6615356.webp",
      "https://d32yu5nuptb5qv.cloudfront.net/products/4WH/small/product_1752429752_4917016.webp"
    ],
    "kitContents": [
      "1× 4-Wheeler Wireharness (with switch)",
      "Waterproof relay & 20A inline fuse harness",
      "Handlebar switch mounting brackets",
      "Zip-ties & heat-shrink sleeves"
    ],
    "specs": [
      {
        "label": "Max Continuous Current",
        "value": "20 Amperes (240W @ 12V)"
      },
      {
        "label": "Wire Gauge",
        "value": "14 AWG Tin-Plated Automotive Grade Copper"
      },
      {
        "label": "Relay",
        "value": "40A Sealed Automotive Waterproof Relay"
      },
      {
        "label": "Switch Ingress",
        "value": "IP-67 Waterproof Tactile Switch with LED Indicator"
      },
      {
        "label": "Fuse",
        "value": "20A Ceramic In-Line Fuse Holder"
      },
      {
        "label": "Origin",
        "value": "Bengaluru, India"
      }
    ]
  },
  {
    "slug": "wire-harness",
    "name": "Wireharness",
    "code": "WH",
    "category": "power",
    "price": 999,
    "rating": 4.7,
    "reviewCount": 12,
    "tagline": "Heavy-Duty Automotive Electrical Architecture · WH",
    "description": "The Wireharness features tin-plated copper automotive wiring, waterproof relays, sealed in-line fuses, and IP-67 sealed tactile switches designed to handle up to 20A continuous load safely.",
    "hero": "https://d32yu5nuptb5qv.cloudfront.net/products/WH/medium/product_1752429835_9556451.webp",
    "gallery": [
      "https://d32yu5nuptb5qv.cloudfront.net/products/WH/medium/product_1752429835_9556451.webp",
      "https://d32yu5nuptb5qv.cloudfront.net/products/WH/original/product_1752429835_7428800.webp",
      "https://d32yu5nuptb5qv.cloudfront.net/products/WH/original/product_1752429835_4214915.webp",
      "https://d32yu5nuptb5qv.cloudfront.net/products/WH/original/product_1752429835_6457215.webp",
      "https://d32yu5nuptb5qv.cloudfront.net/products/WH/original/product_1752429836_9215584.webp",
      "https://d32yu5nuptb5qv.cloudfront.net/products/WH/original/product_1752429836_8615567.webp"
    ],
    "kitContents": [
      "1× Wireharness",
      "Waterproof relay & 20A inline fuse harness",
      "Handlebar switch mounting brackets",
      "Zip-ties & heat-shrink sleeves"
    ],
    "specs": [
      {
        "label": "Max Continuous Current",
        "value": "20 Amperes (240W @ 12V)"
      },
      {
        "label": "Wire Gauge",
        "value": "14 AWG Tin-Plated Automotive Grade Copper"
      },
      {
        "label": "Relay",
        "value": "40A Sealed Automotive Waterproof Relay"
      },
      {
        "label": "Switch Ingress",
        "value": "IP-67 Waterproof Tactile Switch with LED Indicator"
      },
      {
        "label": "Fuse",
        "value": "20A Ceramic In-Line Fuse Holder"
      },
      {
        "label": "Origin",
        "value": "Bengaluru, India"
      }
    ]
  },
  {
    "slug": "rage-lycan-filters",
    "name": "Rage / Lycan Auxiliary light filters",
    "code": "MDRL",
    "category": "filter",
    "price": 1699,
    "rating": 4.8,
    "reviewCount": 14,
    "tagline": "Bayer Optical Polycarbonate Snap-On Lens Cover · MDRL",
    "description": "The Rage / Lycan Auxiliary light filters provides instant 3000K selective yellow / amber fog dispersion and gravel chip protection for Maddog auxiliary light pods without optical distortion.",
    "hero": "https://d32yu5nuptb5qv.cloudfront.net/products/MDRL/medium/product_1752409323_6804545.webp",
    "gallery": [
      "https://d32yu5nuptb5qv.cloudfront.net/products/MDRL/medium/product_1752409323_6804545.webp",
      "https://d32yu5nuptb5qv.cloudfront.net/products/MDRL/original/product_1752409323_2744143.webp",
      "https://d32yu5nuptb5qv.cloudfront.net/products/MDRL/original/product_1752409323_5984016.webp",
      "https://d32yu5nuptb5qv.cloudfront.net/products/MDRL/original/product_1752409323_9996786.webp",
      "https://d32yu5nuptb5qv.cloudfront.net/products/MDRL/original/product_1752409324_4884483.webp",
      "https://d32yu5nuptb5qv.cloudfront.net/products/MDRL/original/product_1752409324_1483214.webp"
    ],
    "kitContents": [
      "2× Rage / Lycan Auxiliary light filters (Pair)",
      "Protective microfiber storage pouch"
    ],
    "specs": [
      {
        "label": "Material",
        "value": "Bayer High-Impact Optical Polycarbonate"
      },
      {
        "label": "Color Spectrum",
        "value": "3000K Amber / Selective Yellow"
      },
      {
        "label": "Impact Resistance",
        "value": "IK-08 Shatterproof Gravel Protection"
      },
      {
        "label": "Mounting Style",
        "value": "Precision Snap-Fit Friction Lock"
      },
      {
        "label": "Origin",
        "value": "Bengaluru, India"
      }
    ]
  },
  {
    "slug": "alpha-auxiliary-light-filters",
    "name": "Alpha Auxiliary Light Filters",
    "code": "AAP",
    "category": "filter",
    "price": 1699,
    "rating": 4.8,
    "reviewCount": 5,
    "tagline": "Bayer Optical Polycarbonate Snap-On Lens Cover · AAP",
    "description": "The Alpha Auxiliary Light Filters provides instant 3000K selective yellow / amber fog dispersion and gravel chip protection for Maddog auxiliary light pods without optical distortion.",
    "hero": "https://d32yu5nuptb5qv.cloudfront.net/products/AAP/medium/product_1752430176_4361530.webp",
    "gallery": [
      "https://d32yu5nuptb5qv.cloudfront.net/products/AAP/medium/product_1752430176_4361530.webp",
      "https://d32yu5nuptb5qv.cloudfront.net/products/AAP/original/product_1752430175_1177353.webp",
      "https://d32yu5nuptb5qv.cloudfront.net/products/AAP/original/product_1752430176_6536941.webp",
      "https://d32yu5nuptb5qv.cloudfront.net/products/AAP/original/product_1752430176_4188393.webp",
      "https://d32yu5nuptb5qv.cloudfront.net/products/AAP/original/product_1752430176_3098678.webp",
      "https://d32yu5nuptb5qv.cloudfront.net/products/AAP/original/product_1752430177_7597142.webp"
    ],
    "kitContents": [
      "2× Alpha Auxiliary Light Filters (Pair)",
      "Protective microfiber storage pouch"
    ],
    "specs": [
      {
        "label": "Material",
        "value": "Bayer High-Impact Optical Polycarbonate"
      },
      {
        "label": "Color Spectrum",
        "value": "3000K Amber / Selective Yellow"
      },
      {
        "label": "Impact Resistance",
        "value": "IK-08 Shatterproof Gravel Protection"
      },
      {
        "label": "Mounting Style",
        "value": "Precision Snap-Fit Friction Lock"
      },
      {
        "label": "Origin",
        "value": "Bengaluru, India"
      }
    ]
  },
  {
    "slug": "delta-auxiliary-light-flters",
    "name": "Delta Auxiliary Light Filters",
    "code": "DAF",
    "category": "filter",
    "price": 999,
    "rating": 4.8,
    "reviewCount": 14,
    "tagline": "Bayer Optical Polycarbonate Snap-On Lens Cover · DAF",
    "description": "The Delta Auxiliary Light Filters provides instant 3000K selective yellow / amber fog dispersion and gravel chip protection for Maddog auxiliary light pods without optical distortion.",
    "hero": "https://d32yu5nuptb5qv.cloudfront.net/products/DAF/medium/product_1752430279_9889117.webp",
    "gallery": [
      "https://d32yu5nuptb5qv.cloudfront.net/products/DAF/medium/product_1752430279_9889117.webp",
      "https://d32yu5nuptb5qv.cloudfront.net/products/DAF/original/product_1752430279_3474468.webp",
      "https://d32yu5nuptb5qv.cloudfront.net/products/DAF/original/product_1752430279_8613693.webp",
      "https://d32yu5nuptb5qv.cloudfront.net/products/DAF/original/product_1752430279_2129290.webp",
      "https://d32yu5nuptb5qv.cloudfront.net/products/DAF/original/product_1752430280_3214027.webp",
      "https://d32yu5nuptb5qv.cloudfront.net/products/DAF/small/product_1752430279_6236393.webp"
    ],
    "kitContents": [
      "2× Delta Auxiliary Light Filters (Pair)",
      "Protective microfiber storage pouch"
    ],
    "specs": [
      {
        "label": "Material",
        "value": "Bayer High-Impact Optical Polycarbonate"
      },
      {
        "label": "Color Spectrum",
        "value": "3000K Amber / Selective Yellow"
      },
      {
        "label": "Impact Resistance",
        "value": "IK-08 Shatterproof Gravel Protection"
      },
      {
        "label": "Mounting Style",
        "value": "Precision Snap-Fit Friction Lock"
      },
      {
        "label": "Origin",
        "value": "Bengaluru, India"
      }
    ]
  },
  {
    "slug": "scout-x-filters",
    "name": "New Scout / Scout-X Auxiliary light filters",
    "code": "NSCXAF",
    "category": "filter",
    "price": 799,
    "rating": 5.0,
    "reviewCount": 2,
    "tagline": "Bayer Optical Polycarbonate Snap-On Lens Cover · NSCXAF",
    "description": "The New Scout / Scout-X Auxiliary light filters provides instant 3000K selective yellow / amber fog dispersion and gravel chip protection for Maddog auxiliary light pods without optical distortion.",
    "hero": "https://d32yu5nuptb5qv.cloudfront.net/products/NSCXAF/medium/product_1752418301_7577456.webp",
    "gallery": [
      "https://d32yu5nuptb5qv.cloudfront.net/products/NSCXAF/medium/product_1752418301_7577456.webp",
      "https://d32yu5nuptb5qv.cloudfront.net/products/NSCXAF/original/product_1752418301_7357617.webp",
      "https://d32yu5nuptb5qv.cloudfront.net/products/NSCXAF/original/product_1752418302_6542318.webp",
      "https://d32yu5nuptb5qv.cloudfront.net/products/NSCXAF/original/product_1752418302_3195611.webp",
      "https://d32yu5nuptb5qv.cloudfront.net/products/NSCXAF/original/product_1752418302_7871381.webp",
      "https://d32yu5nuptb5qv.cloudfront.net/products/NSCXAF/original/product_1752418303_8956350.webp"
    ],
    "kitContents": [
      "2× New Scout / Scout-X Auxiliary light filters (Pair)",
      "Protective microfiber storage pouch"
    ],
    "specs": [
      {
        "label": "Material",
        "value": "Bayer High-Impact Optical Polycarbonate"
      },
      {
        "label": "Color Spectrum",
        "value": "3000K Amber / Selective Yellow"
      },
      {
        "label": "Impact Resistance",
        "value": "IK-08 Shatterproof Gravel Protection"
      },
      {
        "label": "Mounting Style",
        "value": "Precision Snap-Fit Friction Lock"
      },
      {
        "label": "Origin",
        "value": "Bengaluru, India"
      }
    ]
  },
  {
    "slug": "scout-x-filter",
    "name": "Scout / Scout-X Auxiliary light filters",
    "code": "SCXAF",
    "category": "filter",
    "price": 599,
    "rating": 4.8,
    "reviewCount": 20,
    "tagline": "Bayer Optical Polycarbonate Snap-On Lens Cover · SCXAF",
    "description": "The Scout / Scout-X Auxiliary light filters provides instant 3000K selective yellow / amber fog dispersion and gravel chip protection for Maddog auxiliary light pods without optical distortion.",
    "hero": "https://d32yu5nuptb5qv.cloudfront.net/products/SCXAF/medium/product_1752422722_3503331.webp",
    "gallery": [
      "https://d32yu5nuptb5qv.cloudfront.net/products/SCXAF/medium/product_1752422722_3503331.webp",
      "https://d32yu5nuptb5qv.cloudfront.net/products/SCXAF/original/product_1752422722_1212409.webp",
      "https://d32yu5nuptb5qv.cloudfront.net/products/SCXAF/original/product_1752422722_8899902.webp",
      "https://d32yu5nuptb5qv.cloudfront.net/products/SCXAF/original/product_1752422722_9856192.webp",
      "https://d32yu5nuptb5qv.cloudfront.net/products/SCXAF/original/product_1752422723_7825470.webp",
      "https://d32yu5nuptb5qv.cloudfront.net/products/SCXAF/small/product_1752422722_3546586.webp"
    ],
    "kitContents": [
      "2× Scout / Scout-X Auxiliary light filters (Pair)",
      "Protective microfiber storage pouch"
    ],
    "specs": [
      {
        "label": "Material",
        "value": "Bayer High-Impact Optical Polycarbonate"
      },
      {
        "label": "Color Spectrum",
        "value": "3000K Amber / Selective Yellow"
      },
      {
        "label": "Impact Resistance",
        "value": "IK-08 Shatterproof Gravel Protection"
      },
      {
        "label": "Mounting Style",
        "value": "Precision Snap-Fit Friction Lock"
      },
      {
        "label": "Origin",
        "value": "Bengaluru, India"
      }
    ]
  },
  {
    "slug": "light-mounts",
    "name": "Light Mounts",
    "code": "LM1",
    "category": "clamp",
    "price": 1199,
    "rating": 4.9,
    "reviewCount": 11,
    "tagline": "CNC Machined Aircraft Aluminium Mount · LM1",
    "description": "The Light Mounts is CNC machined from aircraft-grade solid aluminium billet, engineered specifically for motorcycle crash guards, fork tubes, and frame tubes with zero slip under heavy off-road vibration.",
    "hero": "https://d32yu5nuptb5qv.cloudfront.net/products/LM1/medium/product_1752430453_5137053.webp",
    "gallery": [
      "https://d32yu5nuptb5qv.cloudfront.net/products/LM1/medium/product_1752430453_5137053.webp",
      "https://d32yu5nuptb5qv.cloudfront.net/products/LM1/original/product_1752430453_9193469.webp",
      "https://d32yu5nuptb5qv.cloudfront.net/products/LM1/original/product_1752430453_4591092.webp",
      "https://d32yu5nuptb5qv.cloudfront.net/products/LM1/original/product_1752430454_7583151.webp",
      "https://d32yu5nuptb5qv.cloudfront.net/products/LM1/original/product_1752430454_8375087.webp",
      "https://d32yu5nuptb5qv.cloudfront.net/products/LM1/small/product_1752430453_9911405.webp"
    ],
    "kitContents": [
      "2× Light Mounts (Pair)",
      "High-tensile Grade 8.8 Stainless Steel Bolts",
      "Anti-slip silicone protective inner liners"
    ],
    "specs": [
      {
        "label": "Material",
        "value": "6063-T6 CNC Machined Billet Aluminium"
      },
      {
        "label": "Hardware",
        "value": "Grade 8.8 Stainless Steel Hex Hardware"
      },
      {
        "label": "Finish",
        "value": "Type III Hard Anodized Matte Black"
      },
      {
        "label": "Vibration Resistance",
        "value": "Knurled Internal Grip Ring"
      },
      {
        "label": "Origin",
        "value": "Bengaluru, India"
      }
    ]
  },
  {
    "slug": "fork-clamps",
    "name": "Fork Clamp",
    "code": "FC",
    "category": "clamp",
    "price": 1699,
    "rating": 5.0,
    "reviewCount": 2,
    "tagline": "CNC Machined Aircraft Aluminium Mount · FC",
    "description": "The Fork Clamp is CNC machined from aircraft-grade solid aluminium billet, engineered specifically for motorcycle crash guards, fork tubes, and frame tubes with zero slip under heavy off-road vibration.",
    "hero": "https://d32yu5nuptb5qv.cloudfront.net/products/FC/medium/product_1752430382_9907490.webp",
    "gallery": [
      "https://d32yu5nuptb5qv.cloudfront.net/products/FC/medium/product_1752430382_9907490.webp",
      "https://d32yu5nuptb5qv.cloudfront.net/products/FC/original/product_1752430381_3190835.webp",
      "https://d32yu5nuptb5qv.cloudfront.net/products/FC/original/product_1752430382_1703732.webp",
      "https://d32yu5nuptb5qv.cloudfront.net/products/FC/original/product_1752430382_5740734.webp",
      "https://d32yu5nuptb5qv.cloudfront.net/products/FC/original/product_1752430383_5918049.webp",
      "https://d32yu5nuptb5qv.cloudfront.net/products/FC/small/product_1752430382_8767508.webp"
    ],
    "kitContents": [
      "2× Fork Clamp (Pair)",
      "High-tensile Grade 8.8 Stainless Steel Bolts",
      "Anti-slip silicone protective inner liners"
    ],
    "specs": [
      {
        "label": "Material",
        "value": "6063-T6 CNC Machined Billet Aluminium"
      },
      {
        "label": "Hardware",
        "value": "Grade 8.8 Stainless Steel Hex Hardware"
      },
      {
        "label": "Finish",
        "value": "Type III Hard Anodized Matte Black"
      },
      {
        "label": "Vibration Resistance",
        "value": "Knurled Internal Grip Ring"
      },
      {
        "label": "Origin",
        "value": "Bengaluru, India"
      }
    ]
  },
  {
    "slug": "universal-headlight-clamp",
    "name": "Universal Headlight Clamp",
    "code": "THI",
    "category": "clamp",
    "price": 249,
    "rating": 4.8,
    "reviewCount": 12,
    "tagline": "CNC Machined Aircraft Aluminium Mount · THI",
    "description": "The Universal Headlight Clamp is CNC machined from aircraft-grade solid aluminium billet, engineered specifically for motorcycle crash guards, fork tubes, and frame tubes with zero slip under heavy off-road vibration.",
    "hero": "https://d32yu5nuptb5qv.cloudfront.net/products/THI/medium/product_1752430555_4110920.webp",
    "gallery": [
      "https://d32yu5nuptb5qv.cloudfront.net/products/THI/medium/product_1752430555_4110920.webp",
      "https://d32yu5nuptb5qv.cloudfront.net/products/THI/original/product_1752430554_3635474.webp",
      "https://d32yu5nuptb5qv.cloudfront.net/products/THI/original/product_1752430555_7981764.webp",
      "https://d32yu5nuptb5qv.cloudfront.net/products/THI/original/product_1752430555_7919486.webp",
      "https://d32yu5nuptb5qv.cloudfront.net/products/THI/original/product_1752430556_1928416.webp",
      "https://d32yu5nuptb5qv.cloudfront.net/products/THI/original/product_1752430556_7800962.webp"
    ],
    "kitContents": [
      "2× Universal Headlight Clamp (Pair)",
      "High-tensile Grade 8.8 Stainless Steel Bolts",
      "Anti-slip silicone protective inner liners"
    ],
    "specs": [
      {
        "label": "Material",
        "value": "6063-T6 CNC Machined Billet Aluminium"
      },
      {
        "label": "Hardware",
        "value": "Grade 8.8 Stainless Steel Hex Hardware"
      },
      {
        "label": "Finish",
        "value": "Type III Hard Anodized Matte Black"
      },
      {
        "label": "Vibration Resistance",
        "value": "Knurled Internal Grip Ring"
      },
      {
        "label": "Origin",
        "value": "Bengaluru, India"
      }
    ]
  },
  {
    "slug": "interceptor-himalayan-clamps",
    "name": "Interceptor & Himalayan Clamps",
    "code": "MIHC",
    "category": "clamp",
    "price": 899,
    "rating": 5.0,
    "reviewCount": 3,
    "tagline": "CNC Machined Aircraft Aluminium Mount · MIHC",
    "description": "The Interceptor & Himalayan Clamps is CNC machined from aircraft-grade solid aluminium billet, engineered specifically for motorcycle crash guards, fork tubes, and frame tubes with zero slip under heavy off-road vibration.",
    "hero": "https://d32yu5nuptb5qv.cloudfront.net/products/MIHC/medium/product_1752430764_9086249.webp",
    "gallery": [
      "https://d32yu5nuptb5qv.cloudfront.net/products/MIHC/medium/product_1752430764_9086249.webp",
      "https://d32yu5nuptb5qv.cloudfront.net/products/MIHC/original/product_1752430764_4875981.webp",
      "https://d32yu5nuptb5qv.cloudfront.net/products/MIHC/original/product_1752430764_3196805.webp",
      "https://d32yu5nuptb5qv.cloudfront.net/products/MIHC/original/product_1752430764_2964553.webp",
      "https://d32yu5nuptb5qv.cloudfront.net/products/MIHC/original/product_1752430765_3441456.webp",
      "https://d32yu5nuptb5qv.cloudfront.net/products/MIHC/small/product_1752430764_2292080.webp"
    ],
    "kitContents": [
      "2× Interceptor & Himalayan Clamps (Pair)",
      "High-tensile Grade 8.8 Stainless Steel Bolts",
      "Anti-slip silicone protective inner liners"
    ],
    "specs": [
      {
        "label": "Material",
        "value": "6063-T6 CNC Machined Billet Aluminium"
      },
      {
        "label": "Hardware",
        "value": "Grade 8.8 Stainless Steel Hex Hardware"
      },
      {
        "label": "Finish",
        "value": "Type III Hard Anodized Matte Black"
      },
      {
        "label": "Vibration Resistance",
        "value": "Knurled Internal Grip Ring"
      },
      {
        "label": "Origin",
        "value": "Bengaluru, India"
      }
    ]
  },
  {
    "slug": "classic-and-bullet-clamps",
    "name": "Classic and Bullet Clamps",
    "code": "CB",
    "category": "clamp",
    "price": 899,
    "rating": 5.0,
    "reviewCount": 2,
    "tagline": "CNC Machined Aircraft Aluminium Mount · CB",
    "description": "The Classic and Bullet Clamps is CNC machined from aircraft-grade solid aluminium billet, engineered specifically for motorcycle crash guards, fork tubes, and frame tubes with zero slip under heavy off-road vibration.",
    "hero": "https://d32yu5nuptb5qv.cloudfront.net/products/CB/medium/product_1752431221_3004435.webp",
    "gallery": [
      "https://d32yu5nuptb5qv.cloudfront.net/products/CB/medium/product_1752431221_3004435.webp",
      "https://d32yu5nuptb5qv.cloudfront.net/products/CB/original/product_1752431220_5317393.webp",
      "https://d32yu5nuptb5qv.cloudfront.net/products/CB/original/product_1752431221_4976296.webp",
      "https://d32yu5nuptb5qv.cloudfront.net/products/CB/original/product_1752431221_9717930.webp",
      "https://d32yu5nuptb5qv.cloudfront.net/products/CB/original/product_1752431222_3280519.webp",
      "https://d32yu5nuptb5qv.cloudfront.net/products/CB/original/product_1752431222_9909984.webp"
    ],
    "kitContents": [
      "2× Classic and Bullet Clamps (Pair)",
      "High-tensile Grade 8.8 Stainless Steel Bolts",
      "Anti-slip silicone protective inner liners"
    ],
    "specs": [
      {
        "label": "Material",
        "value": "6063-T6 CNC Machined Billet Aluminium"
      },
      {
        "label": "Hardware",
        "value": "Grade 8.8 Stainless Steel Hex Hardware"
      },
      {
        "label": "Finish",
        "value": "Type III Hard Anodized Matte Black"
      },
      {
        "label": "Vibration Resistance",
        "value": "Knurled Internal Grip Ring"
      },
      {
        "label": "Origin",
        "value": "Bengaluru, India"
      }
    ]
  },
  {
    "slug": "ktm-390-adventure-clamp-sx",
    "name": "KTM 390 Adventure clamp for scout and scoutx",
    "code": "390ADV",
    "category": "clamp",
    "price": 799,
    "rating": 5.0,
    "reviewCount": 2,
    "tagline": "CNC Machined Aircraft Aluminium Mount · 390ADV",
    "description": "The KTM 390 Adventure clamp for scout and scoutx is CNC machined from aircraft-grade solid aluminium billet, engineered specifically for motorcycle crash guards, fork tubes, and frame tubes with zero slip under heavy off-road vibration.",
    "hero": "https://d32yu5nuptb5qv.cloudfront.net/products/390ADV/medium/product_1752431091_2551885.webp",
    "gallery": [
      "https://d32yu5nuptb5qv.cloudfront.net/products/390ADV/medium/product_1752431091_2551885.webp",
      "https://d32yu5nuptb5qv.cloudfront.net/products/390ADV/original/product_1752431091_6015024.webp",
      "https://d32yu5nuptb5qv.cloudfront.net/products/390ADV/original/product_1752431091_6360545.webp",
      "https://d32yu5nuptb5qv.cloudfront.net/products/390ADV/original/product_1752431091_6886711.webp",
      "https://d32yu5nuptb5qv.cloudfront.net/products/390ADV/original/product_1752431092_5128997.webp",
      "https://d32yu5nuptb5qv.cloudfront.net/products/390ADV/original/product_1752431092_9031992.webp"
    ],
    "kitContents": [
      "2× KTM 390 Adventure clamp for scout and scoutx (Pair)",
      "High-tensile Grade 8.8 Stainless Steel Bolts",
      "Anti-slip silicone protective inner liners"
    ],
    "specs": [
      {
        "label": "Material",
        "value": "6063-T6 CNC Machined Billet Aluminium"
      },
      {
        "label": "Hardware",
        "value": "Grade 8.8 Stainless Steel Hex Hardware"
      },
      {
        "label": "Finish",
        "value": "Type III Hard Anodized Matte Black"
      },
      {
        "label": "Vibration Resistance",
        "value": "Knurled Internal Grip Ring"
      },
      {
        "label": "Origin",
        "value": "Bengaluru, India"
      }
    ]
  },
  {
    "slug": "ktm-390-adventure-clamp",
    "name": "KTM 390 Adventure clamp for Alpha & Delta",
    "code": "390ADVAD",
    "category": "clamp",
    "price": 1099,
    "rating": 4.5,
    "reviewCount": 2,
    "tagline": "CNC Machined Aircraft Aluminium Mount · 390ADVAD",
    "description": "The KTM 390 Adventure clamp for Alpha & Delta is CNC machined from aircraft-grade solid aluminium billet, engineered specifically for motorcycle crash guards, fork tubes, and frame tubes with zero slip under heavy off-road vibration.",
    "hero": "https://d32yu5nuptb5qv.cloudfront.net/products/390ADVAD/medium/product_1752430667_1105931.webp",
    "gallery": [
      "https://d32yu5nuptb5qv.cloudfront.net/products/390ADVAD/medium/product_1752430667_1105931.webp",
      "https://d32yu5nuptb5qv.cloudfront.net/products/390ADVAD/original/product_1752430667_1626349.webp",
      "https://d32yu5nuptb5qv.cloudfront.net/products/390ADVAD/original/product_1752430667_1935621.webp",
      "https://d32yu5nuptb5qv.cloudfront.net/products/390ADVAD/original/product_1752430667_6182650.webp",
      "https://d32yu5nuptb5qv.cloudfront.net/products/390ADVAD/original/product_1752430668_8265673.webp",
      "https://d32yu5nuptb5qv.cloudfront.net/products/390ADVAD/small/product_1752430667_1369088.webp"
    ],
    "kitContents": [
      "2× KTM 390 Adventure clamp for Alpha & Delta (Pair)",
      "High-tensile Grade 8.8 Stainless Steel Bolts",
      "Anti-slip silicone protective inner liners"
    ],
    "specs": [
      {
        "label": "Material",
        "value": "6063-T6 CNC Machined Billet Aluminium"
      },
      {
        "label": "Hardware",
        "value": "Grade 8.8 Stainless Steel Hex Hardware"
      },
      {
        "label": "Finish",
        "value": "Type III Hard Anodized Matte Black"
      },
      {
        "label": "Vibration Resistance",
        "value": "Knurled Internal Grip Ring"
      },
      {
        "label": "Origin",
        "value": "Bengaluru, India"
      }
    ]
  },
  {
    "slug": "hero-xpluse-clamp",
    "name": "Hero Xpluse 200 Clamp",
    "code": "HXC",
    "category": "clamp",
    "price": 899,
    "rating": 4.8,
    "reviewCount": 14,
    "tagline": "CNC Machined Aircraft Aluminium Mount · HXC",
    "description": "The Hero Xpluse 200 Clamp is CNC machined from aircraft-grade solid aluminium billet, engineered specifically for motorcycle crash guards, fork tubes, and frame tubes with zero slip under heavy off-road vibration.",
    "hero": "https://d32yu5nuptb5qv.cloudfront.net/products/HXC/medium/product_1752430966_7306928.webp",
    "gallery": [
      "https://d32yu5nuptb5qv.cloudfront.net/products/HXC/medium/product_1752430966_7306928.webp",
      "https://d32yu5nuptb5qv.cloudfront.net/products/HXC/original/product_1752430966_2865103.webp",
      "https://d32yu5nuptb5qv.cloudfront.net/products/HXC/original/product_1752430967_5545762.webp",
      "https://d32yu5nuptb5qv.cloudfront.net/products/HXC/original/product_1752430967_4696371.webp",
      "https://d32yu5nuptb5qv.cloudfront.net/products/HXC/original/product_1752430967_9924424.webp",
      "https://d32yu5nuptb5qv.cloudfront.net/products/HXC/small/product_1752430967_7743002.webp"
    ],
    "kitContents": [
      "2× Hero Xpluse 200 Clamp (Pair)",
      "High-tensile Grade 8.8 Stainless Steel Bolts",
      "Anti-slip silicone protective inner liners"
    ],
    "specs": [
      {
        "label": "Material",
        "value": "6063-T6 CNC Machined Billet Aluminium"
      },
      {
        "label": "Hardware",
        "value": "Grade 8.8 Stainless Steel Hex Hardware"
      },
      {
        "label": "Finish",
        "value": "Type III Hard Anodized Matte Black"
      },
      {
        "label": "Vibration Resistance",
        "value": "Knurled Internal Grip Ring"
      },
      {
        "label": "Origin",
        "value": "Bengaluru, India"
      }
    ]
  },
  {
    "slug": "duke-390-clamps",
    "name": "DUKE 390 Clamps 2017+ For Scout and Scoutx",
    "code": "D17",
    "category": "clamp",
    "price": 499,
    "rating": 4.8,
    "reviewCount": 14,
    "tagline": "CNC Machined Aircraft Aluminium Mount · D17",
    "description": "The DUKE 390 Clamps 2017+ For Scout and Scoutx is CNC machined from aircraft-grade solid aluminium billet, engineered specifically for motorcycle crash guards, fork tubes, and frame tubes with zero slip under heavy off-road vibration.",
    "hero": "https://d32yu5nuptb5qv.cloudfront.net/products/D17/medium/product_1752431156_6280015.webp",
    "gallery": [
      "https://d32yu5nuptb5qv.cloudfront.net/products/D17/medium/product_1752431156_6280015.webp",
      "https://d32yu5nuptb5qv.cloudfront.net/products/D17/original/product_1752431156_1789478.webp",
      "https://d32yu5nuptb5qv.cloudfront.net/products/D17/original/product_1752431156_8220795.webp",
      "https://d32yu5nuptb5qv.cloudfront.net/products/D17/original/product_1752431156_4900088.webp",
      "https://d32yu5nuptb5qv.cloudfront.net/products/D17/original/product_1752431157_4430228.webp",
      "https://d32yu5nuptb5qv.cloudfront.net/products/D17/small/product_1752431156_3454649.webp"
    ],
    "kitContents": [
      "2× DUKE 390 Clamps 2017+ For Scout and Scoutx (Pair)",
      "High-tensile Grade 8.8 Stainless Steel Bolts",
      "Anti-slip silicone protective inner liners"
    ],
    "specs": [
      {
        "label": "Material",
        "value": "6063-T6 CNC Machined Billet Aluminium"
      },
      {
        "label": "Hardware",
        "value": "Grade 8.8 Stainless Steel Hex Hardware"
      },
      {
        "label": "Finish",
        "value": "Type III Hard Anodized Matte Black"
      },
      {
        "label": "Vibration Resistance",
        "value": "Knurled Internal Grip Ring"
      },
      {
        "label": "Origin",
        "value": "Bengaluru, India"
      }
    ]
  },
  {
    "slug": "thar-bonnet-clamp",
    "name": "Thar Bonnet Clamp",
    "code": "TC",
    "category": "clamp",
    "price": 1499,
    "rating": 5.0,
    "reviewCount": 1,
    "tagline": "CNC Machined Aircraft Aluminium Mount · TC",
    "description": "The Thar Bonnet Clamp is CNC machined from aircraft-grade solid aluminium billet, engineered specifically for motorcycle crash guards, fork tubes, and frame tubes with zero slip under heavy off-road vibration.",
    "hero": "https://d32yu5nuptb5qv.cloudfront.net/products/TC/medium/product_1752430811_8766213.webp",
    "gallery": [
      "https://d32yu5nuptb5qv.cloudfront.net/products/TC/medium/product_1752430811_8766213.webp",
      "https://d32yu5nuptb5qv.cloudfront.net/products/TC/original/product_1752430810_8414959.webp",
      "https://d32yu5nuptb5qv.cloudfront.net/products/TC/original/product_1752430811_8327173.webp",
      "https://d32yu5nuptb5qv.cloudfront.net/products/TC/original/product_1752430811_1037936.webp",
      "https://d32yu5nuptb5qv.cloudfront.net/products/TC/original/product_1752430811_5439726.webp",
      "https://d32yu5nuptb5qv.cloudfront.net/products/TC/original/product_1752430812_3312616.webp"
    ],
    "kitContents": [
      "2× Thar Bonnet Clamp (Pair)",
      "High-tensile Grade 8.8 Stainless Steel Bolts",
      "Anti-slip silicone protective inner liners"
    ],
    "specs": [
      {
        "label": "Material",
        "value": "6063-T6 CNC Machined Billet Aluminium"
      },
      {
        "label": "Hardware",
        "value": "Grade 8.8 Stainless Steel Hex Hardware"
      },
      {
        "label": "Finish",
        "value": "Type III Hard Anodized Matte Black"
      },
      {
        "label": "Vibration Resistance",
        "value": "Knurled Internal Grip Ring"
      },
      {
        "label": "Origin",
        "value": "Bengaluru, India"
      }
    ]
  },
  {
    "slug": "4-wheeler-number-plate-clamp-for-2-lights",
    "name": "4 wheeler Number Plate Clamp for 2 Lights",
    "code": "CNPC",
    "category": "clamp",
    "price": 1299,
    "rating": 4.8,
    "reviewCount": 14,
    "tagline": "CNC Machined Aircraft Aluminium Mount · CNPC",
    "description": "The 4 wheeler Number Plate Clamp for 2 Lights is CNC machined from aircraft-grade solid aluminium billet, engineered specifically for motorcycle crash guards, fork tubes, and frame tubes with zero slip under heavy off-road vibration.",
    "hero": "https://d32yu5nuptb5qv.cloudfront.net/products/CNPC/medium/product_1752423148_6931708.webp",
    "gallery": [
      "https://d32yu5nuptb5qv.cloudfront.net/products/CNPC/medium/product_1752423148_6931708.webp",
      "https://d32yu5nuptb5qv.cloudfront.net/products/CNPC/original/product_1752423148_5661633.webp",
      "https://d32yu5nuptb5qv.cloudfront.net/products/CNPC/original/product_1752423148_9213194.webp",
      "https://d32yu5nuptb5qv.cloudfront.net/products/CNPC/original/product_1752423148_2447242.webp",
      "https://d32yu5nuptb5qv.cloudfront.net/products/CNPC/small/product_1752423148_2157401.webp",
      "https://d32yu5nuptb5qv.cloudfront.net/products/CNPC/small/product_1752423148_3075291.webp"
    ],
    "kitContents": [
      "2× 4 wheeler Number Plate Clamp for 2 Lights (Pair)",
      "High-tensile Grade 8.8 Stainless Steel Bolts",
      "Anti-slip silicone protective inner liners"
    ],
    "specs": [
      {
        "label": "Material",
        "value": "6063-T6 CNC Machined Billet Aluminium"
      },
      {
        "label": "Hardware",
        "value": "Grade 8.8 Stainless Steel Hex Hardware"
      },
      {
        "label": "Finish",
        "value": "Type III Hard Anodized Matte Black"
      },
      {
        "label": "Vibration Resistance",
        "value": "Knurled Internal Grip Ring"
      },
      {
        "label": "Origin",
        "value": "Bengaluru, India"
      }
    ]
  },
  {
    "slug": "4-wheeler-number-plate-clamp-for-4-lights",
    "name": "4 wheeler Number Plate Clamp for 4 Lights",
    "code": "4CNPC",
    "category": "clamp",
    "price": 1499,
    "rating": 4.7,
    "reviewCount": 3,
    "tagline": "CNC Machined Aircraft Aluminium Mount · 4CNPC",
    "description": "The 4 wheeler Number Plate Clamp for 4 Lights is CNC machined from aircraft-grade solid aluminium billet, engineered specifically for motorcycle crash guards, fork tubes, and frame tubes with zero slip under heavy off-road vibration.",
    "hero": "https://d32yu5nuptb5qv.cloudfront.net/products/4CNPC/medium/product_1752423075_1763491.webp",
    "gallery": [
      "https://d32yu5nuptb5qv.cloudfront.net/products/4CNPC/medium/product_1752423075_1763491.webp",
      "https://d32yu5nuptb5qv.cloudfront.net/products/4CNPC/original/product_1752423075_6968907.webp",
      "https://d32yu5nuptb5qv.cloudfront.net/products/4CNPC/original/product_1752423075_7275634.webp",
      "https://d32yu5nuptb5qv.cloudfront.net/products/4CNPC/original/product_1752423075_6899483.webp",
      "https://d32yu5nuptb5qv.cloudfront.net/products/4CNPC/small/product_1752423075_6545098.webp",
      "https://d32yu5nuptb5qv.cloudfront.net/products/4CNPC/small/product_1752423075_6459757.webp"
    ],
    "kitContents": [
      "2× 4 wheeler Number Plate Clamp for 4 Lights (Pair)",
      "High-tensile Grade 8.8 Stainless Steel Bolts",
      "Anti-slip silicone protective inner liners"
    ],
    "specs": [
      {
        "label": "Material",
        "value": "6063-T6 CNC Machined Billet Aluminium"
      },
      {
        "label": "Hardware",
        "value": "Grade 8.8 Stainless Steel Hex Hardware"
      },
      {
        "label": "Finish",
        "value": "Type III Hard Anodized Matte Black"
      },
      {
        "label": "Vibration Resistance",
        "value": "Knurled Internal Grip Ring"
      },
      {
        "label": "Origin",
        "value": "Bengaluru, India"
      }
    ]
  },
  {
    "slug": "terra-vision-f77",
    "name": "TERRA VISION - F77",
    "code": "TVF77",
    "category": "ev-edition",
    "price": 9500,
    "rating": 5.0,
    "reviewCount": 1,
    "tagline": "9,600 Lumens · UV F77 EV Direct Integration Kit.",
    "description": "Co-engineered with Ultraviolette Automotive for the F77 high-performance electric motorcycle. Plugs directly into the F77 auxiliary bus with zero wire splicing.",
    "hero": "https://d32yu5nuptb5qv.cloudfront.net/products/TVF77/medium/product_1761105381_5386254.webp",
    "gallery": [
      "https://d32yu5nuptb5qv.cloudfront.net/products/TVF77/medium/product_1761105381_5386254.webp",
      "https://d32yu5nuptb5qv.cloudfront.net/products/TVF77/original/product_1761105380_8262420.webp",
      "https://d32yu5nuptb5qv.cloudfront.net/products/TVF77/original/product_1761105381_2552502.webp",
      "https://d32yu5nuptb5qv.cloudfront.net/products/TVF77/original/product_1761105381_3326046.webp",
      "https://d32yu5nuptb5qv.cloudfront.net/products/TVF77/original/product_1761105381_9819201.webp",
      "https://d32yu5nuptb5qv.cloudfront.net/products/TVF77/small/product_1761105381_2302645.webp"
    ],
    "kitContents": [
      "2× Maddog Terra Vision F77 Light Pods",
      "CNC Machined F77 Direct Chassis Mounting Brackets",
      "UV OEM Plug & Play Harness with CAN-bus isolation"
    ],
    "specs": [
      {
        "label": "Compatibility",
        "value": "Ultraviolette F77 Mach 2 & Recon"
      },
      {
        "label": "Lumen Output",
        "value": "9,600 Lumens (Pair)"
      },
      {
        "label": "Voltage Range",
        "value": "12V - 60V DC EV Compatible"
      },
      {
        "label": "Finish",
        "value": "Matte Stealth Black Anodized"
      },
      {
        "label": "IP Rating",
        "value": "IP-67 Submersion Sealed"
      }
    ],
    "light": {
      "lumens": 9600,
      "wattsEach": 32,
      "wattsPair": 64,
      "beamDistanceM": 350,
      "spot": 80,
      "flood": 20,
      "opticsLabel": "Ultraviolette F77 Dedicated Integration",
      "dualMode": false
    },
    "photometrics": {
      "diagram": "/diagrams/cad-exploded.svg",
      "description": "Exploded CAD schematic of TERRA VISION - F77 chassis, silicone IP-67 gasket, TIR lens & LED PCB.",
      "beamProfile": "80% Spot / 20% Flood Collimated Beam",
      "isoLuxChart": "/diagrams/isolux-profile.svg"
    },
    "dimensions": {
      "blueprint": "/diagrams/cad-blueprint.svg",
      "widthMm": 90,
      "heightMm": 90,
      "depthMm": 65,
      "weightGrams": 420
    }
  },
  {
    "slug": "terra-vision-x47",
    "name": "TERRA VISION - X47",
    "code": "TVX47",
    "category": "ev-edition",
    "price": 10000,
    "rating": 4.5,
    "reviewCount": 2,
    "tagline": "10,800 Lumens · Dual-Mode Amber/White for Ultraviolette X47.",
    "description": "Flagship EV lighting package for the Ultraviolette X47 platform. Dual-spectrum amber and white output with proprietary EV voltage isolation.",
    "hero": "https://d32yu5nuptb5qv.cloudfront.net/products/TVX47/medium/product_1761106058_9426148.webp",
    "gallery": [
      "https://d32yu5nuptb5qv.cloudfront.net/products/TVX47/medium/product_1761106058_9426148.webp",
      "https://d32yu5nuptb5qv.cloudfront.net/products/TVX47/original/product_1761106058_8722281.webp",
      "https://d32yu5nuptb5qv.cloudfront.net/products/TVX47/original/product_1761106057_5794224.webp",
      "https://d32yu5nuptb5qv.cloudfront.net/products/TVX47/original/product_1761106058_7785042.webp",
      "https://d32yu5nuptb5qv.cloudfront.net/products/TVX47/original/product_1761106058_1503763.webp",
      "https://d32yu5nuptb5qv.cloudfront.net/products/TVX47/small/product_1761106059_4574133.webp"
    ],
    "kitContents": [
      "2× Terra Vision X47 Dual-Mode Pods",
      "X47 CNC Billet Aero Brackets",
      "CAN-bus compatible isolated wire harness"
    ],
    "specs": [
      {
        "label": "Compatibility",
        "value": "Ultraviolette X47 Platform"
      },
      {
        "label": "Lumen Output",
        "value": "10,800 Lumens (Pair)"
      },
      {
        "label": "Color Spectrum",
        "value": "3000K Fog Amber / 5000K Daylight"
      },
      {
        "label": "IP Rating",
        "value": "IP-67 Sealed"
      }
    ],
    "light": {
      "lumens": 10800,
      "wattsEach": 37.5,
      "wattsPair": 75,
      "beamDistanceM": 380,
      "spot": 70,
      "flood": 30,
      "opticsLabel": "Ultraviolette X47 Dual-Mode EV Edition",
      "dualMode": true
    },
    "photometrics": {
      "diagram": "/diagrams/cad-exploded.svg",
      "description": "Exploded CAD schematic of TERRA VISION - X47 chassis, silicone IP-67 gasket, TIR lens & LED PCB.",
      "beamProfile": "70% Spot / 30% Flood Collimated Beam",
      "isoLuxChart": "/diagrams/isolux-profile.svg"
    },
    "dimensions": {
      "blueprint": "/diagrams/cad-blueprint.svg",
      "widthMm": 90,
      "heightMm": 90,
      "depthMm": 65,
      "weightGrams": 420
    }
  }
];

export const ladder: Product[] = products
  .filter((p) => p.category === "aux-light" && p.light)
  .sort((a, b) => (a.light?.lumens ?? 0) - (b.light?.lumens ?? 0));

export const lights: Product[] = ladder;

export const categories: { key: Category; label: string; count: number }[] = [
  { key: "aux-light", label: "Auxiliary Lights", count: products.filter(p => p.category === "aux-light").length },
  { key: "car-fog-lamp", label: "Car Fog Lamps", count: products.filter(p => p.category === "car-fog-lamp").length },
  { key: "mount", label: "Phone Mounts & Dampers", count: products.filter(p => p.category === "mount").length },
  { key: "power", label: "Wire Harness & Switches", count: products.filter(p => p.category === "power").length },
  { key: "filter", label: "Color & Fog Filters", count: products.filter(p => p.category === "filter").length },
  { key: "clamp", label: "Vehicle-Specific Clamps", count: products.filter(p => p.category === "clamp").length },
  { key: "ev-edition", label: "Ultraviolette EV Editions", count: products.filter(p => p.category === "ev-edition").length },
];

const ALIASES: Record<string, string> = {
  "switch-pro": "switch-pro-and-wire-harness-pro",
  "wireharness": "wire-harness",
  "switch-and-wire-harness-pro": "switch-pro-and-wire-harness-pro",
  "maddog-rage": "rage",
  "maddog-lycan": "lycan",
  "maddog-alpha": "alpha",
  "maddog-delta": "delta",
  "maddog-scout-x": "scout-x",
  "maddog-scout": "scout",
  "maddog-claw-x": "claw-x",
  "maddog-claw-pro": "claw-pro",
  "maddog-claw": "claw",
  "maddog-claw-lite": "claw-lite",
  "maddog-dimmer": "dimmer",
  "maddog-switch": "switch",
};

export function getProduct(slug: string): Product | undefined {
  if (!slug) return undefined;
  const raw = slug.toLowerCase();
  const alias = ALIASES[raw] || raw.replace(/^maddog-/, "");
  return products.find(
    (p) =>
      p.slug === raw ||
      p.slug === alias ||
      p.code.toLowerCase() === raw ||
      p.code.toLowerCase() === alias
  );
}

export function getProductsByCategory(category: Category): Product[] {
  return products.filter((p) => p.category === category);
}

export function formatPrice(inr: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(inr);
}

