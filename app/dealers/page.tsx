"use client";

import { useState } from "react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { cn } from "@/lib/cn";

interface Dealer {
  name: string;
  city: string;
  state: string;
  address: string;
  phone: string;
  verifiedInstaller: boolean;
  stockStatus: "Full Range Available" | "Select Lights in Stock";
}

const DEALERS: Dealer[] = [
  {
    name: "Biker's Hub Vizag",
    city: "Visakhapatnam",
    state: "Andhra Pradesh",
    address: "D.No 48-14-11, Rama Talkies Road, CBM Compound",
    phone: "+91 89125 67890",
    verifiedInstaller: true,
    stockStatus: "Full Range Available",
  },
  {
    name: "MotoCraft Customs Bengaluru",
    city: "Bengaluru",
    state: "Karnataka",
    address: "124, 100 Feet Road, Indiranagar",
    phone: "+91 80412 34567",
    verifiedInstaller: true,
    stockStatus: "Full Range Available",
  },
  {
    name: "Torque Moto World",
    city: "Bengaluru",
    state: "Karnataka",
    address: "45, Outer Ring Road, Marathahalli",
    phone: "+91 80284 91234",
    verifiedInstaller: true,
    stockStatus: "Full Range Available",
  },
  {
    name: "Throttle Zone Pune",
    city: "Pune",
    state: "Maharashtra",
    address: "Shop 12, FC Road, Shivajinagar",
    phone: "+91 20255 12345",
    verifiedInstaller: true,
    stockStatus: "Full Range Available",
  },
  {
    name: "Apex Riders Studio Mumbai",
    city: "Mumbai",
    state: "Maharashtra",
    address: "Plot 88, Link Road, Andheri West",
    phone: "+91 22263 98765",
    verifiedInstaller: true,
    stockStatus: "Full Range Available",
  },
  {
    name: "Redline Moto Delhi NCR",
    city: "New Delhi",
    state: "Delhi",
    address: "B-42, Ring Road, Lajpat Nagar IV",
    phone: "+91 11456 78901",
    verifiedInstaller: true,
    stockStatus: "Full Range Available",
  },
  {
    name: "GearUp Hyderabad",
    city: "Hyderabad",
    state: "Telangana",
    address: "Road No 36, Jubilee Hills",
    phone: "+91 40235 45678",
    verifiedInstaller: true,
    stockStatus: "Full Range Available",
  },
  {
    name: "Chennai Moto Depot",
    city: "Chennai",
    state: "Tamil Nadu",
    address: "22, Anna Salai, Thousand Lights",
    phone: "+91 44285 12345",
    verifiedInstaller: true,
    stockStatus: "Full Range Available",
  },
  {
    name: "Highland Moto Kochi",
    city: "Kochi",
    state: "Kerala",
    address: "NH 66 Bypass, Edappally",
    phone: "+91 48424 56789",
    verifiedInstaller: true,
    stockStatus: "Full Range Available",
  },
  {
    name: "Chandigarh Riders Lounge",
    city: "Chandigarh",
    state: "Punjab",
    address: "Sector 28-D, Motor Market",
    phone: "+91 17226 78901",
    verifiedInstaller: true,
    stockStatus: "Select Lights in Stock",
  },
  {
    name: "Jaipur Moto Garage",
    city: "Jaipur",
    state: "Rajasthan",
    address: "Tonk Road, Gopalpura Bypass",
    phone: "+91 14127 89012",
    verifiedInstaller: true,
    stockStatus: "Select Lights in Stock",
  },
];

const CITIES = ["All Cities", "Bengaluru", "Mumbai", "Pune", "New Delhi", "Hyderabad", "Chennai", "Visakhapatnam", "Kochi", "Chandigarh", "Jaipur"];

export default function DealersPage() {
  const [selectedCity, setSelectedCity] = useState("All Cities");

  const filteredDealers = selectedCity === "All Cities"
    ? DEALERS
    : DEALERS.filter((d) => d.city === selectedCity);

  return (
    <div className="bg-ink-950 text-bone min-h-screen py-16 sm:py-20">
      <Container>
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <span className="eyebrow text-signal-500 mb-2 block">National Installation Network</span>
          <h1
            className="font-display text-bone leading-[1.05]"
            style={{
              fontSize: "var(--text-display)",
              fontWeight: "var(--fw-display)",
            }}
          >
            Authorized Dealers &amp; Certified Installers
          </h1>
          <p className="text-fog-300 mt-4 leading-relaxed" style={{ fontSize: "var(--text-body-lg)" }}>
            Over 250+ certified motorcycle technicians across India trained in clean plug-and-play wiring, relay mounting, and precision optical beam leveling.
          </p>
        </div>

        {/* City Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-3 mb-8 border-b hairline">
          {CITIES.map((city) => {
            const isSel = city === selectedCity;
            return (
              <button
                key={city}
                type="button"
                onClick={() => setSelectedCity(city)}
                className={cn(
                  "px-4 py-2 rounded-lg font-medium text-xs font-mono tracking-wide whitespace-nowrap transition-all",
                  isSel
                    ? "bg-signal-600 text-bone shadow-md"
                    : "bg-ink-900 border hairline text-fog-400 hover:text-bone hover:border-ink-600",
                )}
              >
                {city}
              </button>
            );
          })}
        </div>

        {/* Dealers Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredDealers.map((dealer) => (
            <div
              key={dealer.name}
              className="border hairline bg-ink-900/80 rounded-xl p-6 flex flex-col justify-between hover:border-signal-500/40 transition-colors shadow-sm"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-[11px] text-signal-400 bg-signal-600/15 border border-signal-600/30 px-2 py-0.5 rounded font-medium">
                    ✓ Certified Partner
                  </span>
                  <span className="text-fog-500 font-mono text-[11px]">{dealer.city}</span>
                </div>

                <h3 className="font-display text-bone font-medium text-lg leading-snug">
                  {dealer.name}
                </h3>
                <p className="text-fog-400 text-xs mt-2 leading-relaxed">
                  {dealer.address}, {dealer.state}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t hairline space-y-3">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-fog-500">Stock Availability</span>
                  <span className="text-bone font-medium">{dealer.stockStatus}</span>
                </div>

                <a
                  href={`tel:${dealer.phone.replace(/\s+/g, "")}`}
                  className="w-full inline-flex items-center justify-center gap-2 bg-ink-950 hover:bg-ink-800 border hairline text-bone py-2.5 rounded-lg text-xs font-mono font-medium transition-colors"
                >
                  <span>Call Workshop: {dealer.phone}</span>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Factory Installation Notice */}
        <div className="mt-12 p-6 rounded-2xl border hairline bg-ink-900/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <span className="eyebrow text-signal-500">Bengaluru Factory Fitting</span>
            <p className="font-display text-bone font-medium text-base mt-1">Visiting our Bangalore HQ?</p>
            <p className="text-fog-400 text-xs mt-1 max-w-xl">
              Riders visiting Bangalore can schedule factory installation at Peenya 2nd Phase with our lead R&amp;D technicians.
            </p>
          </div>
          <a
            href="https://api.whatsapp.com/send/?phone=%2B7019130080&text=Hi%20Maddog,%20I%20would%20like%20to%20schedule%20factory%20installation%20in%20Bangalore."
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 inline-flex items-center gap-2 bg-signal-600 hover:bg-signal-700 text-bone px-5 py-2.5 rounded-lg text-xs font-medium tracking-wide transition-colors"
          >
            <span>Book Factory Slot (WhatsApp)</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </Container>
    </div>
  );
}
