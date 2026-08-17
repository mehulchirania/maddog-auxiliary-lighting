/** Minimal class joiner — no dependency needed for this project's needs. */
export function cn(...parts: (string | false | null | undefined)[]): string {
  return parts.filter(Boolean).join(" ");
}
