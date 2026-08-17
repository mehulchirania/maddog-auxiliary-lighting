import type { Ref } from "react";
import type { Bike } from "@/lib/fitment";
import { getProduct, formatPrice } from "@/lib/products";
import ProductRoleCard from "./ProductRoleCard";

const FOCUS_RING =
  "outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-signal-500)]";

export default function SetupResult({
  bike,
  headingRef,
  onChangeModel,
  onStartOver,
}: {
  bike: Bike;
  headingRef: Ref<HTMLHeadingElement>;
  onChangeModel: () => void;
  onStartOver: () => void;
}) {
  const light = getProduct(bike.recommended.light);
  const power = getProduct(bike.recommended.power);
  const mount = bike.recommended.mount ? getProduct(bike.recommended.mount) : undefined;

  if (!light || !power) {
    return (
      <section className="hairline border bg-ink-850 rounded-lg p-6">
        <p className="text-fog-300" style={{ fontSize: "var(--text-body)" }}>
          Something in the fitment data doesn&apos;t line up for this bike. Try another model.
        </p>
      </section>
    );
  }

  const total = light.price + power.price + (mount ? mount.price : 0);

  return (
    <section aria-labelledby="setup-heading" className="border-t hairline pt-10">
      <div className="flex flex-col gap-2">
        <span className="eyebrow text-signal-500">Maddog Certified Fitment</span>
        <h2
          id="setup-heading"
          ref={headingRef}
          tabIndex={-1}
          className="font-display text-bone leading-[1.08] outline-none"
          style={{
            fontSize: "var(--text-h1)",
            fontWeight: "var(--fw-h1)",
          }}
        >
          Your setup for the {bike.brand} {bike.model}
        </h2>
      </div>

      <p className="text-fog-300 mt-4 max-w-2xl leading-relaxed" style={{ fontSize: "var(--text-body-lg)" }}>
        {bike.rationale}
      </p>

      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <ProductRoleCard role="light" product={light} />
        <ProductRoleCard role="power" product={power} />
        {mount && <ProductRoleCard role="mount" product={mount} />}
      </div>

      <div className="hairline border bg-ink-900 mt-8 flex flex-col gap-6 rounded-xl p-6 sm:flex-row sm:items-center sm:justify-between shadow-md">
        <div>
          <p className="eyebrow">Direct System Total</p>
          <p className="tnum text-bone font-semibold mt-1" style={{ fontSize: "var(--text-stat)", fontWeight: "var(--fw-stat)" }}>
            {formatPrice(total)}
          </p>
          <p className="text-fog-400 mt-2 max-w-md leading-relaxed" style={{ fontSize: "var(--text-caption)" }}>
            The sum of all three components — transparent direct pricing, never inflated or discounted.
          </p>
        </div>

        <button
          type="button"
          className={`inline-flex items-center justify-center gap-2 rounded-md bg-signal-600 hover:bg-signal-700 border border-signal-600 px-8 py-3.5 font-medium tracking-wide text-bone transition-all shadow-md hover:shadow-lg ${FOCUS_RING}`}
          style={{ fontSize: "var(--text-caption)" }}
        >
          <span>Add System Setup to Cart</span>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2" style={{ fontSize: "var(--text-caption)" }}>
        <button
          type="button"
          onClick={onChangeModel}
          className={`text-fog-300 underline underline-offset-4 hover:text-bone ${FOCUS_RING}`}
        >
          Change model
        </button>
        <button
          type="button"
          onClick={onStartOver}
          className={`text-fog-300 underline underline-offset-4 hover:text-bone ${FOCUS_RING}`}
        >
          Start over from brand selection
        </button>
      </div>
    </section>
  );
}

