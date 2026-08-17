import { cn } from "@/lib/cn";

/**
 * Ground-aware section heading.
 *
 * `tone="dark"` (default) — tuned for dark panels (ink-*). The h2 inherits
 * whatever text colour the section sets; the lede uses fog-300.
 *
 * `tone="light"` — tuned for light paper panels. The h2 renders ink-900; the
 * lede renders ink-600. Eyebrow uses `.eyebrow-ink` instead of `.eyebrow`.
 *
 * Every light-panel caller (CategoryGrid, etc.) previously avoided this
 * component entirely because it hardcoded fog-300 on its lede and had no
 * colour on its h2 — both invisible on paper. This fixes that.
 */
export default function SectionHeading({
  eyebrow,
  title,
  lede,
  className,
  align = "left",
  tone = "dark",
}: {
  eyebrow?: string;
  title: React.ReactNode;
  lede?: React.ReactNode;
  className?: string;
  align?: "left" | "center";
  tone?: "dark" | "light";
}) {
  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow && (
        <p className={cn("mb-4", tone === "light" ? "eyebrow-ink" : "eyebrow")}>
          {eyebrow}
        </p>
      )}
      <h2
        style={{
          fontSize: "var(--text-h2)",
          fontWeight: "var(--fw-h2)",
          letterSpacing: "var(--ls-h2)",
          lineHeight: 1.08,
        }}
        className={cn(
          "font-display",
          tone === "light" ? "text-ink-900" : undefined,
        )}
      >
        {title}
      </h2>
      {lede && (
        <p
          style={{ fontSize: "var(--text-body-lg)" }}
          className={cn(
            "mt-5 leading-relaxed",
            tone === "light" ? "text-ink-600" : "text-fog-300",
          )}
        >
          {lede}
        </p>
      )}
    </div>
  );
}
