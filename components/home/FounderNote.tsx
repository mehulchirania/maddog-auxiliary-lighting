import Image from "next/image";

export default function FounderNote() {
  return (
    <section
      className="bg-[var(--color-night-950)] border-t border-[var(--glass-stroke)]"
      style={{ paddingBlock: "calc(var(--section) * 0.6)" }}
    >
      <div className="max-w-[40rem] mx-auto px-6 text-center flex flex-col items-center">
        {/* Brand Mark */}
        <div className="relative w-16 h-16 mb-8 opacity-80">
          <Image
            src="/media/brand/maddog-mark.png"
            alt="Maddog"
            fill
            className="object-contain"
          />
        </div>

        {/* Founder paragraph */}
        <p
          className="text-[var(--color-grey-300)] leading-relaxed font-normal"
          style={{ fontSize: "var(--text-body)" }}
        >
          We started Maddog because grey-market LEDs were blinding oncoming riders on the same roads we ride. Every light we sell carries one price, one warranty, and the same optics we&apos;d put on our own bikes.
        </p>
      </div>
    </section>
  );
}
