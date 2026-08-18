import Link from "next/link";
import React from "react";

interface CtaProps {
  href?: string;
  onClick?: () => void;
  variant?: "link" | "button";
  children: React.ReactNode;
  className?: string;
  type?: "button" | "submit" | "reset";
  ariaLabel?: string;
}

export default function Cta({
  href,
  onClick,
  variant = "link",
  children,
  className = "",
  type = "button",
  ariaLabel,
}: CtaProps) {
  if (variant === "button") {
    const buttonClasses = `inline-flex items-center justify-center font-medium bg-[var(--color-white)] text-[var(--color-night-950)] px-6 py-3 rounded-full hover:scale-[1.02] active:scale-[0.98] transition-transform duration-[var(--dur-fast)] cursor-pointer text-base shadow-sm ${className}`;
    
    if (href) {
      return (
        <Link href={href} className={buttonClasses} aria-label={ariaLabel}>
          {children}
        </Link>
      );
    }
    return (
      <button type={type} onClick={onClick} className={buttonClasses} aria-label={ariaLabel}>
        {children}
      </button>
    );
  }

  // variant === "link"
  const linkClasses = `inline-flex items-center gap-1.5 text-[var(--color-white)] underline underline-offset-4 decoration-white/40 hover:decoration-[var(--color-beam)] hover:text-[var(--color-beam)] transition-colors duration-[var(--dur-fast)] text-base font-normal group ${className}`;

  if (href) {
    return (
      <Link href={href} className={linkClasses} aria-label={ariaLabel}>
        <span>{children}</span>
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={linkClasses} aria-label={ariaLabel}>
      <span>{children}</span>
    </button>
  );
}
