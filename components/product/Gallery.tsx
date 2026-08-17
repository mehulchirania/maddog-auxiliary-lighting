"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/cn";

/**
 * The gallery leads the product page. Every source photograph sits on pure
 * white, so the viewer itself uses `paper-0` — literally the same white the
 * photograph already sits on — so the image reads as resting directly on
 * the page rather than boxed in a frame.
 */
export default function Gallery({ images, alt }: { images: string[]; alt: string }) {
  const [active, setActive] = useState(0);
  const src = images[active] ?? images[0];

  return (
    <div>
      <div className="bg-paper-0 border-ink-900/8 relative aspect-square w-full overflow-hidden rounded-lg border sm:aspect-[4/3] lg:aspect-[16/9]">
        <Image
          key={src}
          src={src}
          alt={`${alt} — photo ${active + 1} of ${images.length}`}
          fill
          sizes="(min-width: 1280px) 1400px, 100vw"
          className="object-contain p-10 sm:p-14 lg:p-20"
          priority={active === 0}
        />
      </div>

      {images.length > 1 && (
        <div className="mt-5 flex gap-3 overflow-x-auto pb-1">
          {images.map((img, i) => (
            <button
              key={img}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Show photo ${i + 1} of ${images.length}`}
              aria-current={i === active}
              className={cn(
                "bg-paper-0 relative h-16 w-16 shrink-0 overflow-hidden rounded-md border transition-all sm:h-20 sm:w-20",
                i === active
                  ? "border-ink-900 ring-ink-900 ring-1"
                  : "border-ink-900/15 opacity-70 hover:opacity-100",
              )}
            >
              <Image src={img} alt="" fill sizes="80px" className="object-contain p-1.5" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
