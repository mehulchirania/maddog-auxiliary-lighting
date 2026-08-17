import Image from "next/image";
import Container from "@/components/ui/Container";

export default function BeamDiagrams({
  photometrics,
  dimensions,
  name,
}: {
  photometrics?: string;
  dimensions?: string;
  name: string;
}) {
  if (!photometrics && !dimensions) return null;

  return (
    <Container>
      <div className="grid gap-6 lg:grid-cols-2">
        {photometrics && (
          <figure className="border hairline panel-cad rounded-xl overflow-hidden p-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3 border-b hairline pb-2">
                <span className="font-mono text-fog-400 text-[11px] uppercase tracking-wider">
                  Exploded Assembly CAD
                </span>
                <span className="font-mono text-signal-400 text-[11px]">9 Sub-Assemblies</span>
              </div>
              <div className="relative aspect-[16/10] sm:aspect-[2/1] w-full">
                <Image
                  src={photometrics}
                  alt={`${name} exploded assembly render`}
                  fill
                  className="object-contain"
                  sizes="(min-width: 1024px) 50vw, 100vw"
                />
              </div>
            </div>
            <figcaption className="text-fog-500 mt-3 pt-2 border-t hairline font-mono text-[11px]">
              Front enclosure, IP-67 gasket, TIR optics, LED PCB & heatsink.
            </figcaption>
          </figure>
        )}

        {dimensions && (
          <figure className="border hairline panel-cad rounded-xl overflow-hidden p-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3 border-b hairline pb-2">
                <span className="font-mono text-fog-400 text-[11px] uppercase tracking-wider">
                  Dimension Line Blueprint
                </span>
                <span className="font-mono text-signal-400 text-[11px]">Millimetre Scale</span>
              </div>
              <div className="relative aspect-[16/10] sm:aspect-[2/1] w-full">
                <Image
                  src={dimensions}
                  alt={`${name} dimension line drawing`}
                  fill
                  className="object-contain"
                  sizes="(min-width: 1024px) 50vw, 100vw"
                />
              </div>
            </div>
            <figcaption className="text-fog-500 mt-3 pt-2 border-t hairline font-mono text-[11px]">
              Housing measurements and mounting bracket bolt hole tolerances.
            </figcaption>
          </figure>
        )}
      </div>
    </Container>
  );
}

