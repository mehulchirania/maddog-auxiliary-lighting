import Link from "next/link";
import Image from "next/image";
import Container from "@/components/ui/Container";

const columns = [
  {
    title: "Lights & Optics",
    links: [
      { href: "/lights/", label: "The Range Ladder" },
      { href: "/products/rage/", label: "Rage (11,600 lm)" },
      { href: "/products/lycan/", label: "Lycan (Dual-Mode)" },
      { href: "/products/alpha/", label: "Alpha (9,600 lm)" },
      { href: "/products/delta/", label: "Delta (6,400 lm)" },
      { href: "/products/scout-x/", label: "Scout-X (4,800 lm)" },
      { href: "/products/scout/", label: "Scout (2,800 lm)" },
    ],
  },
  {
    title: "Engineering",
    links: [
      { href: "/technology/", label: "TIR Optics & Anti-Glare" },
      { href: "/technology/", label: "5000K Colour Science" },
      { href: "/technology/", label: "Nichia 50,000h Life" },
      { href: "/install/", label: "Installation & Wiring Hub" },
      { href: "/fit/", label: "Bike Fitment Studio" },
      { href: "/proof/", label: "Independent Proof & Reviews" },
    ],
  },
  {
    title: "Standards & Support",
    links: [
      { href: "/warranty/", label: "18-Mo Warranty Registration" },
      { href: "/warranty/", label: "Serial Authenticity Check" },
      { href: "/dealers/", label: "Authorized Dealers Locator" },
      { href: "/install/", label: "RTO Compliance & Leveling" },
      { href: "/technology/", label: "IP67 Weatherproofing" },
      { href: "/lights/", label: "Direct Pricing Policy" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-paper-2 border-ink-900/10 mt-16 sm:mt-24 border-t">
      <Container className="py-14 sm:py-16">
        <div className="grid gap-10 md:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div>
            <Image
              src="/media/brand/maddog-logo.png"
              alt="Maddog"
              width={2547}
              height={501}
              className="h-6 w-auto"
            />
            <p className="text-ink-700 mt-4 max-w-xs leading-relaxed" style={{ fontSize: "var(--text-body)" }}>
              Auxiliary motorcycle lighting designed, developed and manufactured in India.
              Engineered to be seen with, not seen through.
            </p>
            <div className="text-ink-600 mt-6 leading-relaxed" style={{ fontSize: "var(--text-caption)" }}>
              <p className="font-medium text-ink-900">Maddog Industries</p>
              <p>Peenya 2nd Phase, Bangalore 560058</p>
              <p className="mt-1 text-signal-700 font-medium">Karnataka, India</p>
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="eyebrow-ink mb-4">{col.title}</h3>
              <ul className="space-y-2.5">
                {col.links.map((l, i) => (
                  <li key={`${l.href}-${l.label}-${i}`}>
                    <Link
                      href={l.href}
                      className="text-ink-600 hover:text-ink-950 transition-colors"
                      style={{ fontSize: "var(--text-caption)" }}
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-ink-900/10 mt-12 flex flex-col gap-4 border-t pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-ink-500" style={{ fontSize: "var(--text-micro)" }}>
            © {new Date().getFullYear()} Maddog Industries. All rights reserved.
          </p>
          <p className="text-ink-600 tnum tracking-wide" style={{ fontSize: "var(--text-micro)" }}>
            18-month replacement warranty · 5000K TIR Optics · Never discounted
          </p>
        </div>
      </Container>
    </footer>
  );
}

