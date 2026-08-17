"use client";

import React, { useEffect, useState, useRef } from "react";
import { cn } from "@/lib/cn";

interface DecryptedTextProps {
  text: string;
  speed?: number;
  maxIterations?: number;
  sequential?: boolean;
  revealDirection?: "start" | "end" | "center";
  useOriginalCharsOnly?: boolean;
  characters?: string;
  className?: string;
  animateOn?: "view" | "hover";
}

const DEFAULT_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?";

export default function DecryptedText({
  text,
  speed = 50,
  maxIterations = 10,
  sequential = true,
  characters = DEFAULT_CHARS,
  className,
  animateOn = "view",
}: DecryptedTextProps) {
  const [displayText, setDisplayText] = useState(text);
  const [isHovered, setIsHovered] = useState(false);
  const elementRef = useRef<HTMLSpanElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    let iteration = 0;

    const startAnimation = () => {
      iteration = 0;
      clearInterval(interval);

      interval = setInterval(() => {
        setDisplayText((prev) =>
          text
            .split("")
            .map((char, index) => {
              if (char === " ") return " ";
              if (sequential) {
                if (index < iteration) {
                  return text[index];
                }
              } else {
                if (iteration >= maxIterations) {
                  return text[index];
                }
              }
              return characters[Math.floor(Math.random() * characters.length)];
            })
            .join(""),
        );

        if (iteration >= (sequential ? text.length : maxIterations)) {
          setDisplayText(text);
          clearInterval(interval);
        }

        iteration += 1 / 2;
      }, speed);
    };

    if (animateOn === "view") {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            startAnimation();
          }
        },
        { threshold: 0.2 },
      );

      if (elementRef.current) {
        observer.observe(elementRef.current);
      }

      return () => {
        clearInterval(interval);
        observer.disconnect();
      };
    } else if (animateOn === "hover" && isHovered) {
      startAnimation();
      return () => clearInterval(interval);
    }
  }, [text, speed, maxIterations, sequential, characters, animateOn, hasAnimated, isHovered]);

  return (
    <span
      ref={elementRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn("inline-block font-mono", className)}
    >
      {displayText}
    </span>
  );
}
