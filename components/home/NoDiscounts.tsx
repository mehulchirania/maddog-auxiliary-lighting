import Image from "next/image";
import Container from "@/components/ui/Container";
import { logo } from "@/lib/media";

export default function NoDiscounts() {
  return (
    <section className="bg-ink-950 border-y hairline" style={{ paddingTop: "var(--section-lg)", paddingBottom: "var(--section-lg)" }}>
      <Container className="max-w-3xl text-center">
        <Image
          src={logo.markOnly}
          alt=""
          width={2825}
          height={1951}
          aria-hidden="true"
          className="mx-auto mb-8 h-9 w-auto opacity-90 sm:h-10"
        />
        <p className="eyebrow mb-8">Pricing policy</p>

        <p
          className="font-display text-bone leading-[1.12]"
          style={{
            fontSize: "var(--text-display)",
            fontWeight: "var(--fw-display)",
            letterSpacing: "var(--ls-display)",
          }}
        >
          Never overpriced. Never discounted.
          <br />
          No compromise on quality.
        </p>

        <p
          className="text-fog-400 mx-auto mt-8 max-w-lg leading-relaxed"
          style={{ fontSize: "var(--text-body-lg)" }}
        >
          One price, set once, for the right product. No countdown timers,
          no strikethrough prices, no seasonal sale that somehow runs all
          year. If a light costs {"₹"}12,750 today, it cost the same last
          month and it will cost the same next month.
        </p>

        <p
          className="text-fog-600 mt-10 tracking-wide uppercase"
          style={{ fontSize: "var(--text-micro)" }}
        >
          The right price for the right product — every time
        </p>
      </Container>
    </section>
  );
}
