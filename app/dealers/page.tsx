import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Dealers & Workshop Network — Maddog",
  description: "Authorized installation partners and direct factory service across India.",
};

const HUBS = [
  { city: "Bengaluru", count: "48 certified workshops", state: "Karnataka" },
  { city: "Mumbai & Pune", count: "36 certified workshops", state: "Maharashtra" },
  { city: "Delhi NCR", count: "32 certified workshops", state: "Delhi / Haryana" },
  { city: "Hyderabad", count: "24 certified workshops", state: "Telangana" },
  { city: "Chennai", count: "20 certified workshops", state: "Tamil Nadu" },
  { city: "Kochi & Calicut", count: "18 certified workshops", state: "Kerala" },
];

export default function DealersPage() {
  return (
    <article className="bg-[var(--color-night-950)] text-[var(--color-white)] min-h-screen">
      {/* 40svh Dark Hero */}
      <section className="relative h-[40svh] min-h-[300px] w-full flex items-center overflow-hidden border-b border-[var(--glass-stroke)]">
        <div className="absolute inset-0 z-0">
          <Image
            src="/media/derived/hero-hardware-wide.webp"
            alt="Dealers Network"
            fill
            sizes="100vw"
            priority
            className="object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-night-950)] via-[var(--color-night-950)]/70 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-12 w-full">
          <h1
            className="font-[520] text-[var(--color-white)] tracking-tight"
            style={{ fontSize: "var(--text-statement)", letterSpacing: "var(--ls-statement)" }}
          >
            Authorized dealers.
          </h1>
          <p
            className="mt-3 text-[var(--color-grey-300)] max-w-lg leading-relaxed"
            style={{ fontSize: "var(--text-body)" }}
          >
            Over 250+ verified motorcycle workshops across India equipped with genuine Maddog wiring harnesses and leveling rigs.
          </p>
        </div>
      </section>

      {/* Single 34rem column */}
      <section className="max-w-[34rem] mx-auto px-6 py-16 sm:py-24 space-y-12">
        <div>
          <span className="readout block mb-2">Network Presence</span>
          <h2 className="text-xl font-semibold text-white mb-4">
            Certified Installation Centers
          </h2>
          <p className="text-[var(--color-grey-300)] leading-relaxed text-base">
            Maddog works directly with vetted motorcycle performance garages across all major Indian states. Every certified partner is trained in our clean routing standards, torque ratings, and optical leveling protocol.
          </p>
        </div>

        <div>
          <span className="readout block mb-2">Regional Hubs</span>
          <h2 className="text-xl font-semibold text-white mb-4">
            Primary Service Locations
          </h2>
          <div className="space-y-4 pt-2">
            {HUBS.map((hub) => (
              <div
                key={hub.city}
                className="flex items-center justify-between py-3 border-b border-[var(--glass-stroke)]"
              >
                <div>
                  <p className="text-white font-medium text-base">{hub.city}</p>
                  <p className="text-xs text-[var(--color-grey-500)]">{hub.state}</p>
                </div>
                <span className="readout text-xs text-[var(--color-grey-300)]">
                  {hub.count}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <span className="readout block mb-2">Factory Service</span>
          <h2 className="text-xl font-semibold text-white mb-4">
            Bengaluru HQ Fitting
          </h2>
          <p className="text-[var(--color-grey-300)] leading-relaxed text-base">
            Riders traveling through or based in Bengaluru can schedule direct factory installation at our Peenya 2nd Phase facility with our engineering team by contacting support@maddog.co.in or via WhatsApp (+91 7019130080).
          </p>
        </div>
      </section>
    </article>
  );
}
