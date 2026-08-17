/**
 * Inline SVG diagram comparing a plain reflector against Maddog's anti-glare
 * TIR (total internal reflection) lens optics. Two panels, each a self
 * contained <figure> so it stacks on narrow screens without any horizontal
 * page scroll.
 */
export default function TirDiagram() {
  return (
    <div className="grid gap-5 sm:grid-cols-2">
      <style>{`
        @media (prefers-reduced-motion: no-preference) {
          .tir-beam { animation: tir-flow 2.6s linear infinite; }
        }
        @keyframes tir-flow {
          to { stroke-dashoffset: -20; }
        }
      `}</style>

      {/* Panel A — plain reflector */}
      <figure className="border hairline bg-ink-850 rounded-lg p-4 sm:p-6">
        <svg
          viewBox="0 0 400 300"
          className="h-auto w-full"
          role="img"
          aria-labelledby="tir-reflector-title"
        >
          <title id="tir-reflector-title">
            A plain reflector bowl scatters LED light in many directions at
            once, including upward toward oncoming riders&apos; eyes.
          </title>

          <line x1="16" y1="264" x2="384" y2="264" className="stroke-fog-600" strokeWidth="2" />

          {/* housing */}
          <rect x="34" y="128" width="34" height="44" rx="4" className="fill-ink-600" />
          <circle cx="58" cy="150" r="5" className="fill-beam-200" />

          {/* scattered rays */}
          <g className="stroke-fog-500" strokeWidth="1.5" strokeLinecap="round">
            <line x1="58" y1="150" x2="376" y2="96" />
            <line x1="58" y1="150" x2="376" y2="140" />
            <line x1="58" y1="150" x2="376" y2="180" />
            <line x1="58" y1="150" x2="376" y2="220" />
            <line x1="58" y1="150" x2="330" y2="258" />
          </g>

          {/* glare rays reaching the oncoming rider */}
          <g className="stroke-signal-500" strokeWidth="1.75" strokeLinecap="round">
            <line x1="58" y1="150" x2="344" y2="40" />
            <line x1="58" y1="150" x2="352" y2="66" />
          </g>

          {/* oncoming rider glyph */}
          <circle cx="352" cy="50" r="7" className="fill-ink-900 stroke-signal-500" strokeWidth="1.5" />
          <text x="352" y="26" textAnchor="middle" className="fill-signal-400" fontSize="10" fontFamily="var(--font-mono)">
            glare
          </text>

          <text x="20" y="284" className="fill-fog-600" fontSize="9" fontFamily="var(--font-mono)">
            road
          </text>
        </svg>
        <figcaption className="mt-4 text-[13px] leading-relaxed">
          <span className="text-bone font-medium">Plain reflector.</span>{" "}
          <span className="text-fog-400">
            A bowl behind the LED bounces light forward, but it cannot aim
            individual rays. Some spill upward and land directly in the eyes
            of whoever is riding toward you.
          </span>
        </figcaption>
      </figure>

      {/* Panel B — TIR lens */}
      <figure className="border hairline bg-ink-850 rounded-lg p-4 sm:p-6">
        <svg
          viewBox="0 0 400 300"
          className="h-auto w-full"
          role="img"
          aria-labelledby="tir-lens-title"
        >
          <title id="tir-lens-title">
            Maddog&apos;s TIR lens redirects LED light into a controlled beam
            that stays below a hard cutoff line, so it lights the road
            without reaching oncoming eyes.
          </title>

          <line x1="16" y1="264" x2="384" y2="264" className="stroke-fog-600" strokeWidth="2" />

          {/* housing */}
          <rect x="34" y="128" width="34" height="44" rx="4" className="fill-ink-600" />
          <circle cx="58" cy="150" r="5" className="fill-beam-200" />

          {/* TIR lens block with internal facets */}
          <rect x="78" y="118" width="30" height="64" rx="3" className="fill-ink-700 stroke-ink-400" strokeWidth="1" />
          <g className="stroke-ink-400" strokeWidth="1">
            <line x1="82" y1="128" x2="104" y2="134" />
            <line x1="82" y1="150" x2="104" y2="150" />
            <line x1="82" y1="172" x2="104" y2="166" />
          </g>

          {/* cutoff line */}
          <line
            x1="108"
            y1="150"
            x2="384"
            y2="204"
            className="stroke-signal-500"
            strokeWidth="1.5"
            strokeDasharray="4 4"
          />
          <text x="230" y="182" className="fill-signal-400" fontSize="9" fontFamily="var(--font-mono)">
            cutoff line
          </text>

          {/* controlled beam, redirected downward, below the cutoff */}
          <g className="stroke-beam-200 tir-beam" strokeWidth="1.75" strokeLinecap="round" strokeDasharray="8 6">
            <line x1="58" y1="150" x2="108" y2="150" />
            <line x1="108" y1="150" x2="196" y2="264" />
            <line x1="108" y1="150" x2="252" y2="264" />
            <line x1="108" y1="150" x2="308" y2="264" />
            <line x1="108" y1="150" x2="356" y2="248" />
          </g>

          {/* oncoming rider glyph — unaffected */}
          <circle cx="352" cy="50" r="7" className="fill-ink-900 stroke-fog-500" strokeWidth="1.5" />
          <text x="352" y="26" textAnchor="middle" className="fill-fog-500" fontSize="10" fontFamily="var(--font-mono)">
            unaffected
          </text>

          <text x="20" y="284" className="fill-fog-600" fontSize="9" fontFamily="var(--font-mono)">
            road
          </text>
        </svg>
        <figcaption className="mt-4 text-[13px] leading-relaxed">
          <span className="text-bone font-medium">Maddog TIR lens.</span>{" "}
          <span className="text-fog-400">
            Total internal reflection bends every ray inside the lens body
            itself, so the beam is shaped before it ever leaves the housing.
            It stays under a hard cutoff — onto the road, not into anyone&apos;s
            eyes.
          </span>
        </figcaption>
      </figure>
    </div>
  );
}
