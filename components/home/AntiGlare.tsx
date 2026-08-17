import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { cn } from "@/lib/cn";

/**
 * The anti-glare argument, told visually rather than asserted. Two panels:
 * the rider's own view of a controlled beam, and the oncoming view of the
 * same road under a typical reflector light versus a Maddog TIR optic.
 *
 * No photography exists for this yet, so both scenes are synthetic
 * SVG/gradient work, matching the treatment used in BeamCompare.
 */

function RiderView() {
  const nearY = 340;
  const horizonY = 128;
  const cx = 300;

  return (
    <svg
      viewBox="0 0 600 360"
      className="aspect-[5/3] w-full overflow-hidden rounded-md"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="rv-beam" gradientUnits="userSpaceOnUse" x1={cx} y1={nearY} x2={cx} y2={horizonY + 20}>
          <stop offset="0%" stopColor="var(--color-beam-300)" stopOpacity="0.55" />
          <stop offset="65%" stopColor="var(--color-beam-200)" stopOpacity="0.22" />
          <stop offset="100%" stopColor="var(--color-beam-200)" stopOpacity="0" />
        </linearGradient>
        <filter id="rv-blur" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="6" />
        </filter>
      </defs>

      <rect x="0" y="0" width="600" height="360" fill="var(--color-ink-950)" />
      <rect x="0" y="0" width="600" height={horizonY + 4} fill="var(--color-ink-900)" opacity="0.6" />

      <polygon
        points={`${cx - 260},${nearY} ${cx + 260},${nearY} ${cx + 14},${horizonY} ${cx - 14},${horizonY}`}
        fill="var(--color-ink-800)"
      />
      <line x1={cx - 258} y1={nearY} x2={cx - 13} y2={horizonY} stroke="var(--color-fog-600)" strokeWidth="1.2" opacity="0.3" />
      <line x1={cx + 258} y1={nearY} x2={cx + 13} y2={horizonY} stroke="var(--color-fog-600)" strokeWidth="1.2" opacity="0.3" />

      {/* eye-level reference */}
      <line x1="0" y1={horizonY} x2="600" y2={horizonY} stroke="var(--color-fog-600)" strokeWidth="1" strokeDasharray="3 5" opacity="0.5" />
      <text x="14" y={horizonY - 8} className="tnum" fill="var(--color-fog-500)" fontSize="10" letterSpacing="0.08em">
        EYE LEVEL
      </text>

      {/* contained beam — never crosses the eye-level line */}
      <path
        d={`M${cx - 30},${nearY} L${cx - 96},${horizonY + 34} L${cx + 96},${horizonY + 34} L${cx + 30},${nearY} Z`}
        fill="url(#rv-beam)"
        filter="url(#rv-blur)"
      />
      <ellipse cx={cx} cy={nearY - 4} rx="46" ry="10" fill="var(--color-beam-200)" opacity="0.4" filter="url(#rv-blur)" />
      <circle cx={cx} cy={nearY - 2} r="6" fill="var(--color-beam-100)" opacity="0.9" />
    </svg>
  );
}

function OncomingView({ variant }: { variant: "glare" | "cutoff" }) {
  const eyeY = 132;

  return (
    <svg viewBox="0 0 260 260" className="aspect-square w-full overflow-hidden rounded-md" aria-hidden="true">
      <defs>
        <radialGradient id="ov-glare" cx="50%" cy="68%" r="65%">
          <stop offset="0%" stopColor="var(--color-bone)" stopOpacity="0.95" />
          <stop offset="35%" stopColor="var(--color-beam-100)" stopOpacity="0.7" />
          <stop offset="70%" stopColor="var(--color-beam-200)" stopOpacity="0.28" />
          <stop offset="100%" stopColor="var(--color-beam-200)" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="ov-cutoff" gradientUnits="userSpaceOnUse" x1="130" y1={eyeY} x2="130" y2="260">
          <stop offset="0%" stopColor="var(--color-beam-200)" stopOpacity="0.65" />
          <stop offset="100%" stopColor="var(--color-beam-300)" stopOpacity="0.15" />
        </linearGradient>
        <filter id="ov-blur" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="9" />
        </filter>
      </defs>

      <rect x="0" y="0" width="260" height="260" fill="var(--color-ink-950)" />

      {variant === "glare" ? (
        <>
          <circle cx="130" cy="176" r="130" fill="url(#ov-glare)" filter="url(#ov-blur)" />
          <circle cx="130" cy="176" r="26" fill="var(--color-bone)" opacity="0.95" />
          {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
            <line
              key={deg}
              x1="130"
              y1="176"
              x2={130 + Math.cos((deg * Math.PI) / 180) * 60}
              y2={176 + Math.sin((deg * Math.PI) / 180) * 60}
              stroke="var(--color-bone)"
              strokeWidth="1.4"
              opacity="0.35"
              filter="url(#ov-blur)"
            />
          ))}
        </>
      ) : (
        <>
          <rect x="0" y={eyeY} width="260" height={260 - eyeY} fill="url(#ov-cutoff)" filter="url(#ov-blur)" />
          <ellipse cx="130" cy="200" rx="42" ry="14" fill="var(--color-beam-100)" opacity="0.6" />
          <circle cx="130" cy={eyeY + 44} r="9" fill="var(--color-beam-100)" opacity="0.85" />
        </>
      )}

      <line x1="0" y1={eyeY} x2="260" y2={eyeY} stroke="var(--color-fog-500)" strokeWidth="1" strokeDasharray="3 5" opacity="0.55" />
    </svg>
  );
}

export default function AntiGlare({ className }: { className?: string }) {
  return (
    <section className={cn("bg-ink-950", className)} style={{ paddingTop: "var(--section)", paddingBottom: "var(--section)" }}>
      <Container wide>
        <SectionHeading
          eyebrow="The anti-glare position"
          title="Engineered to be seen with, not seen through."
          lede="Maddog was the first aux-light maker in India to fit anti-glare TIR optics at 5000K as standard. The lens decides where the light goes — onto the road ahead, not into the eyes of whoever is coming the other way."
        />

        <div className="mt-14 grid gap-6 sm:mt-16 lg:grid-cols-2">
          <Reveal className="border hairline rounded-lg bg-ink-900 p-5 sm:p-7">
            <RiderView />
            <p className="eyebrow mt-5">What you see</p>
            <p className="text-fog-300 mt-2 leading-relaxed" style={{ fontSize: "var(--text-body)" }}>
              A controlled beam that lights the road ahead. The cutoff sits below eye
              level, so the full output goes to use instead of into the sky.
            </p>
          </Reveal>

          <Reveal delay={100} className="border hairline rounded-lg bg-ink-900 p-5 sm:p-7">
            <p className="eyebrow">What they see</p>
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div>
                <OncomingView variant="glare" />
                <p className="text-fog-400 mt-3" style={{ fontSize: "var(--text-caption)" }}>A typical aux light</p>
              </div>
              <div>
                <OncomingView variant="cutoff" />
                <p className="text-fog-400 mt-3" style={{ fontSize: "var(--text-caption)" }}>Maddog TIR optics</p>
              </div>
            </div>
            <p className="text-fog-300 mt-5 leading-relaxed" style={{ fontSize: "var(--text-body)" }}>
              Reflector-based lights scatter output above eye level. A TIR lens bends
              each LED&apos;s output through a single moulded optic instead of bouncing it
              off a bowl, holding a sharp cutoff at the source rather than relying on
              the driver squinting.
            </p>
          </Reveal>
        </div>

        <div className="hairline mt-10 grid gap-8 border-t pt-10 sm:mt-12 sm:grid-cols-2 sm:pt-12">
          <Reveal>
            <p className="eyebrow">Why TIR</p>
            <p className="text-fog-300 mt-3 leading-relaxed" style={{ fontSize: "var(--text-body)" }}>
              Total internal reflection optics route each LED&apos;s output through a
              precisely moulded lens rather than a reflector bowl. There is no
              stray light escaping around the edge of a reflector, so the beam
              edge is a line, not a fade.
            </p>
          </Reveal>
          <Reveal delay={80}>
            <p className="eyebrow">Why 5000K</p>
            <p className="text-fog-300 mt-3 leading-relaxed" style={{ fontSize: "var(--text-body)" }}>
              5000K sits close to daylight white. It renders the road surface and
              its markings accurately without pushing into the bluer, higher-Kelvin
              output that scatters more in rain, dust and fog.
            </p>
          </Reveal>
        </div>

        <p className="text-fog-500 mt-10" style={{ fontSize: "var(--text-caption)" }}>
          Illustrative — built with CSS and SVG, pending the reference night shoot.
        </p>
      </Container>
    </section>
  );
}
