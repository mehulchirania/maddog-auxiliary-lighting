"use client";

import React from "react";
import { cn } from "@/lib/cn";

interface ShinyTextProps {
  text: string;
  disabled?: boolean;
  speed?: number;
  className?: string;
}

export default function ShinyText({
  text,
  disabled = false,
  speed = 4,
  className,
}: ShinyTextProps) {
  return (
    <span
      className={cn(
        "inline-block relative overflow-hidden bg-clip-text",
        !disabled && "animate-shimmer",
        className,
      )}
      style={{
        backgroundImage: disabled
          ? "none"
          : "linear-gradient(120deg, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 1) 50%, rgba(255, 255, 255, 0.4) 100%)",
        backgroundSize: "200% 100%",
        WebkitBackgroundClip: "text",
        animationDuration: `${speed}s`,
      }}
    >
      {text}
    </span>
  );
}
