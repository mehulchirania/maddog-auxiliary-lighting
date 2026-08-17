import { formatPrice } from "@/lib/products";

export default function PurchasePanel({ price }: { price: number }) {
  return (
    <div className="border-ink-900/10 bg-paper-2 flex flex-col gap-6 rounded-xl border p-6 sm:p-8 sm:flex-row sm:items-center sm:justify-between shadow-sm">
      <div>
        <p className="text-ink-500 font-mono tracking-wider uppercase mb-1" style={{ fontSize: "var(--text-micro)" }}>
          Transparent Direct Price
        </p>
        <p className="tnum text-ink-950 font-semibold" style={{ fontSize: "var(--text-stat)", fontWeight: "var(--fw-stat)" }}>
          {formatPrice(price)}
        </p>
        <p className="text-ink-600 mt-1" style={{ fontSize: "var(--text-caption)" }}>
          Pair included · 18-month warranty replacement programme.
        </p>
      </div>
      <button
        type="button"
        className="bg-signal-600 hover:bg-signal-700 border-signal-600 text-bone inline-flex items-center justify-center gap-2.5 rounded-md border px-8 py-3.5 font-medium tracking-wide whitespace-nowrap transition-all shadow-md hover:shadow-lg"
        style={{ fontSize: "var(--text-caption)" }}
      >
        <span>Add to Cart</span>
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
}

