import type { Metadata } from "next";
import RegisterForm from "@/components/register/RegisterForm";

export const metadata: Metadata = {
  title: "Register Your Product — Maddog",
  description: "Activate the 18-month replacement warranty on your Maddog auxiliary light.",
};

export default function RegisterProductPage() {
  return (
    <article className="bg-[var(--color-night-950)] text-[var(--color-white)] min-h-screen">
      <section className="border-b border-[var(--glass-stroke)] bg-[var(--color-night-950)] py-14 sm:py-20">
        <div className="max-w-7xl mx-auto px-6 sm:px-12 w-full">
          <h1
            className="text-[var(--color-white)] tracking-tight"
            style={{
              fontSize: "var(--text-page-title)",
              fontWeight: "var(--fw-page-title)",
              letterSpacing: "var(--ls-page-title)",
            }}
          >
            Register your product.
          </h1>
          <p
            className="mt-3 text-[var(--color-grey-300)] max-w-lg leading-relaxed"
            style={{ fontSize: "var(--text-body)" }}
          >
            Activate the 18-month replacement warranty and get priority support if you ever need it.
          </p>
        </div>
      </section>

      <section className="max-w-[34rem] mx-auto px-6 py-16 sm:py-24">
        <RegisterForm />
      </section>
    </article>
  );
}
