"use client";

import Image from "next/image";
import { cn } from "@/lib/cn";

interface GalleryItem {
  src: string;
  alt: string;
  tall?: boolean;
}

export default function MasonryGallery({ items }: { items: GalleryItem[] }) {
  return (
    <div className="columns-2 sm:columns-3 gap-4 [column-fill:balance]">
      {items.map((item, i) => (
        <div
          key={item.src + i}
          className={cn(
            "group relative mb-4 break-inside-avoid overflow-hidden rounded-xl border hairline bg-ink-900",
            item.tall ? "aspect-[3/4]" : "aspect-square",
          )}
        >
          <Image
            src={item.src}
            alt={item.alt}
            fill
            sizes="(min-width: 640px) 33vw, 50vw"
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-950/70 via-transparent to-transparent" />
          <p className="absolute bottom-2 left-3 right-3 font-mono text-[10px] uppercase tracking-wider text-fog-300 opacity-0 group-hover:opacity-100 transition-opacity">
            {item.alt}
          </p>
        </div>
      ))}
    </div>
  );
}
