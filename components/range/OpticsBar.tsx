/**
 * Segmented spot/flood readout. Flood-only lights (Scout) render as a
 * single unbroken segment; combo-beam lights show the split; Lycan gets an
 * extra note that the split is independently switchable rather than fixed.
 * Light-panel tokens throughout — see SpecBar for why the eyebrow style is
 * reproduced inline rather than using the shared `.eyebrow` class.
 */
export default function OpticsBar({
  spot,
  flood,
  dualMode,
}: {
  spot: number;
  flood: number;
  dualMode?: boolean;
}) {
  return (
    <div>
      <div className="flex items-baseline justify-between gap-3">
        <span className="font-mono text-[0.6875rem] tracking-[0.18em] text-ink-600 uppercase">
          Optics split
        </span>
        <span className="tnum text-ink-900 text-[15px] sm:text-[16px]">
          {spot > 0 ? (
            <>
              {spot}
              <span className="text-ink-600 text-[11px]">% spot</span> · {flood}
              <span className="text-ink-600 text-[11px]">% flood</span>
            </>
          ) : (
            <>
              100<span className="text-ink-600 text-[11px]">% flood</span>
            </>
          )}
        </span>
      </div>
      <div className="border-ink-900/15 mt-2.5 flex h-[5px] w-full overflow-hidden rounded-full border">
        {spot > 0 && <div className="bg-signal-600 h-full" style={{ width: `${spot}%` }} />}
        <div className="bg-ink-900/20 h-full" style={{ width: `${flood > 0 ? flood : 100}%` }} />
      </div>
      {dualMode && (
        <p className="text-ink-700 mt-2 text-[11.5px] leading-snug">
          Independently switchable — not a fixed combo beam.
        </p>
      )}
    </div>
  );
}
