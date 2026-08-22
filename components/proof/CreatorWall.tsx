import { creators, type Creator } from "@/lib/proof";

function youtubeUrl(c: Creator) {
  return (
    c.url ||
    `https://www.youtube.com/results?search_query=${encodeURIComponent(
      `${c.channel} Maddog ${c.product}`,
    )}`
  );
}

function Chip({ c, duplicate }: { c: Creator; duplicate?: boolean }) {
  return (
    <a
      href={youtubeUrl(c)}
      target="_blank"
      rel="noopener noreferrer"
      tabIndex={duplicate ? -1 : undefined}
      aria-hidden={duplicate || undefined}
      aria-label={`Watch ${c.channel}'s review of the Maddog ${c.product} on YouTube`}
      className="group flex shrink-0 items-center gap-3.5 rounded-[var(--radius-pill)] border border-[var(--glass-stroke)] bg-[var(--color-night-900)]/80 px-[22px] py-3 transition-colors duration-[var(--dur-fast)] hover:border-[var(--color-beam)]/40"
    >
      <span
        className="h-2 w-2 shrink-0 rounded-[var(--radius-pill)] bg-[var(--color-signal)]"
        aria-hidden
      />
      <span className="whitespace-nowrap font-[560] text-[0.9375rem] text-[var(--color-white)] transition-colors duration-[var(--dur-fast)] group-hover:text-[var(--color-beam)]">
        {c.channel}
      </span>
      <span className="readout whitespace-nowrap text-[0.6875rem] uppercase tracking-[0.1em]">
        reviewed {c.product}
      </span>
    </a>
  );
}

export default function CreatorWall() {
  return (
    <div className="rail-mask overflow-hidden">
      {/* Two identical sets — .rail-track loops by exactly -50% minus half the
          gap, so gap-6 here is load-bearing. The second set is inert to
          assistive tech and to the tab order. */}
      <div className="rail-track flex w-max gap-6 px-6 py-2 sm:px-12">
        {creators.map((c) => (
          <Chip key={c.channel} c={c} />
        ))}
        {creators.map((c) => (
          <Chip key={`dup-${c.channel}`} c={c} duplicate />
        ))}
      </div>
    </div>
  );
}
