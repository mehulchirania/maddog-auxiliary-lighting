import Link from "next/link";
import { cn } from "@/lib/cn";

type Variant = "solid" | "outline" | "quiet" | "secondary";
type Tone = "dark" | "light";

export default function Cta({
  href,
  children,
  variant = "solid",
  tone = "dark",
  className,
}: {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  tone?: Tone;
  className?: string;
}) {
  const styles: Record<Variant, string> = {
    solid:
      "bg-signal-600 text-bone hover:bg-signal-700 border-signal-600 hover:border-signal-700 shadow-sm",
    secondary:
      tone === "dark"
        ? "bg-ink-800 text-bone hover:bg-ink-700 border-ink-600 hover:border-ink-500"
        : "bg-paper-2 text-ink-950 hover:bg-paper-3 border-ink-900/15 hover:border-ink-900/30",
    outline:
      tone === "dark"
        ? "border-ink-500 text-bone hover:border-bone hover:bg-white/[0.04]"
        : "border-ink-900/20 text-ink-900 hover:border-ink-900 hover:bg-black/[0.03]",
    quiet:
      tone === "dark"
        ? "border-transparent text-fog-300 hover:text-bone underline-offset-4 hover:underline"
        : "border-transparent text-ink-600 hover:text-ink-950 underline-offset-4 hover:underline",
  };

  return (
    <Link
      href={href}
      style={{ fontSize: "var(--text-caption)" }}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-md border px-6 py-3 font-medium tracking-wide transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal-500",
        styles[variant],
        className,
      )}
    >
      <span>{children}</span>
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        aria-hidden="true"
        className="transition-transform duration-200 group-hover:translate-x-0.5"
      >
        <path d="M5 12h14M12 5l7 7-7 7" />
      </svg>
    </Link>
  );
}

