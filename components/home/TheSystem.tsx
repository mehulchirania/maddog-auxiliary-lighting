import Link from "next/link";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { getProduct, formatPrice } from "@/lib/products";
import { cn } from "@/lib/cn";

function Connector() {
  return (
    <div className="flex h-10 justify-center sm:h-12" aria-hidden="true">
      <svg width="16" height="100%" viewBox="0 0 16 40" preserveAspectRatio="none" className="text-ink-500">
        <line x1="8" y1="0" x2="8" y2="30" stroke="currentColor" strokeWidth="1.5" />
        <path d="M2 26 L8 34 L14 26" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

function Node({
  eyebrow,
  name,
  detail,
  price,
  href,
  accent = false,
}: {
  eyebrow: string;
  name: string;
  detail: string;
  price: number;
  href: string;
  accent?: boolean;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "block rounded-lg border px-5 py-5 outline-none transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal-500",
        accent
          ? "border-signal-500/60 bg-ink-850 hover:border-signal-500"
          : "hairline bg-ink-850 hover:border-ink-400 border",
      )}
    >
      <p className="text-fog-500 tracking-wide uppercase" style={{ fontSize: "var(--text-micro)" }}>{eyebrow}</p>
      <p className="font-display text-bone mt-1.5" style={{ fontSize: "var(--text-body-lg)", fontWeight: "var(--fw-h3)" }}>{name}</p>
      <p className="text-fog-400 mt-1 leading-snug" style={{ fontSize: "var(--text-body)" }}>{detail}</p>
      <p className="tnum text-fog-300 mt-2.5" style={{ fontSize: "var(--text-caption)" }}>{formatPrice(price)}</p>
    </Link>
  );
}

export default function TheSystem() {
  const light = getProduct("alpha");
  const switchPro = getProduct("switch-pro");
  const dimmer = getProduct("dimmer");
  const mount = getProduct("claw-x");

  if (!light || !switchPro || !dimmer || !mount) return null;

  return (
    <section style={{ paddingTop: "var(--section)", paddingBottom: "var(--section)" }}>
      <Container wide>
        <SectionHeading
          eyebrow="The system"
          title="A light doesn't run itself."
          lede="Every aux light needs power, a switch, and somewhere to mount the phone that's navigating you there. Maddog builds all four pieces to work together — including the one incompatibility worth knowing about before you order."
        />

        <div className="mt-16 overflow-x-auto">
          <div className="mx-auto flex min-w-[300px] max-w-xl flex-col items-stretch">
            <Reveal>
              <Node
                eyebrow="1. Light"
                name={light.name}
                detail={light.tagline}
                price={light.price}
                href={`/products/${light.slug}/`}
              />
            </Reveal>

            <Connector />

            <Reveal delay={80}>
              <p className="text-fog-500 mb-3 text-center tracking-wide uppercase" style={{ fontSize: "var(--text-micro)" }}>
                2. Choose one control path
              </p>
              <div className="grid gap-4 sm:grid-cols-2">
                <Node
                  eyebrow="Switch Pro"
                  name={switchPro.name}
                  detail="Ships pre-fitted with Wire Harness Pro — plug and play."
                  price={switchPro.price}
                  href={`/products/${switchPro.slug}/`}
                />
                <Node
                  eyebrow="Or: Dimmer"
                  name={dimmer.name}
                  detail="Ships with its own dedicated harness — not compatible with Wire Harness Pro."
                  price={dimmer.price}
                  href={`/products/${dimmer.slug}/`}
                  accent
                />
              </div>
            </Reveal>

            <Connector />

            <Reveal delay={160}>
              <Node
                eyebrow="3. Mount"
                name={mount.name}
                detail={mount.tagline}
                price={mount.price}
                href={`/products/${mount.slug}/`}
              />
            </Reveal>
          </div>
        </div>

        <Reveal delay={200}>
          <p className="text-fog-500 mx-auto mt-10 max-w-xl text-center leading-relaxed" style={{ fontSize: "var(--text-caption)" }}>
            Switch Pro and Dimmer are alternatives, not add-ons to each other
            — the Dimmer&apos;s harness replaces the Wire Harness Pro rather
            than pairing with it. Pick the control path that matches how you
            actually want to run the lights, once.
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
