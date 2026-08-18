import { creators } from "@/lib/proof";

export default function CreatorWall() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      {creators.map((c) => {
        const youtubeUrl =
          c.url ||
          `https://www.youtube.com/results?search_query=${encodeURIComponent(
            `${c.channel} Maddog ${c.product}`
          )}`;

        return (
          <a
            key={c.channel}
            href={youtubeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col justify-between p-5 rounded-[var(--radius-card)] bg-[var(--color-night-900)] border border-[var(--glass-stroke)] hover:border-white/20 transition-all duration-[var(--dur-fast)]"
            aria-label={`Watch ${c.channel}'s review of Maddog ${c.product} on YouTube`}
          >
            <div className="flex items-center justify-between gap-2 mb-4">
              <span className="text-[var(--color-signal)] flex items-center gap-1.5 font-mono text-[11px]">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
                <span>YouTube</span>
              </span>
              <span className="readout text-[11px]">
                {c.product}
              </span>
            </div>

            <div>
              <p className="text-white font-medium group-hover:text-[var(--color-beam)] transition-colors line-clamp-1 text-sm sm:text-base">
                {c.channel}
              </p>
              <p className="readout text-xs text-[var(--color-grey-500)] mt-2">
                Watch review ↗
              </p>
            </div>
          </a>
        );
      })}
    </div>
  );
}
