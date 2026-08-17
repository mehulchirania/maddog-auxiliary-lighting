import { creators } from "@/lib/proof";

export default function CreatorWall() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
      {creators.map((c) => (
        <div
          key={c.channel}
          className="border hairline bg-ink-900/60 hover:bg-ink-850 hover:border-signal-500/50 group flex flex-col justify-between rounded-xl p-4 transition-all duration-200 shadow-sm hover:-translate-y-0.5"
        >
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="text-signal-500 flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
              <span>Field Tested</span>
            </span>
            <span className="text-fog-500 font-mono text-[10px] uppercase">
              {c.product}
            </span>
          </div>

          <p
            className="font-display text-bone group-hover:text-signal-400 font-medium leading-snug transition-colors line-clamp-1"
            style={{ fontSize: "var(--text-body)" }}
          >
            {c.channel}
          </p>
        </div>
      ))}
    </div>
  );
}

