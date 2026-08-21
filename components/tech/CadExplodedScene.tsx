import Image from "next/image";

const CALLOUTS = [
  {
    step: 1,
    title: "6063-T6 Billet Aluminum Chassis",
    description: "CNC machined from solid aerospace-grade alloy with integrated convective cooling fins.",
  },
  {
    step: 2,
    title: "Nichia Automotive Emitters",
    description: "High-CRI Japanese emitters delivering true 5000K pure daylight white for 50,000+ hours.",
  },
  {
    step: 3,
    title: "Bayer Polycarbonate TIR Lens",
    description: "Total Internal Reflection optics with 96% transmittance for collimated long-throw beam.",
  },
  {
    step: 4,
    title: "Fluorosilicone Ingress Seal",
    description: "Dual-lip compression gasket ensuring complete IP-67 dust and high-pressure submersion sealing.",
  },
  {
    step: 5,
    title: "Grade 304 Stainless Hardware",
    description: "Vibration-damped stainless mounting brackets engineered for harsh adventure terrain.",
  },
];

const STAGGER_STEP_MS = 60;
const STAGGER_CAP_MS = 240;

export default function CadExplodedScene() {
  return (
    <div className="max-w-7xl mx-auto px-6 sm:px-12 pb-16 space-y-12">
      <div className="relative aspect-[16/9] w-full rounded-[var(--radius-card)] overflow-hidden bg-[var(--color-night-900)] border border-white/10 p-8 flex items-center justify-center">
        <Image
          src="/diagrams/cad-exploded.svg"
          alt="Exploded CAD assembly schematic"
          fill
          sizes="100vw"
          className="object-contain p-6"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {CALLOUTS.map((item, index) => (
          <div
            key={item.title}
            className="glass p-6 reveal"
            style={{ transitionDelay: `${Math.min(index * STAGGER_STEP_MS, STAGGER_CAP_MS)}ms` }}
          >
            <span className="readout text-xs text-[var(--color-beam)]">0{item.step}</span>
            <h3 className="text-white font-medium mt-2">{item.title}</h3>
            <p className="text-sm text-[var(--color-grey-300)] mt-2 leading-relaxed">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
