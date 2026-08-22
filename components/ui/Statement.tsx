import React from "react";

interface StatementProps {
  children: React.ReactNode;
  lead?: string;
  body?: string;
  className?: string;
  align?: "left" | "center";
}

export default function Statement({
  children,
  lead,
  body,
  className = "",
  align = "left",
}: StatementProps) {
  return (
    <div className={`${align === "center" ? "text-center mx-auto" : "text-left"} ${className}`}>
      <h2
        className="text-[var(--color-white)] tracking-tight"
        style={{
          fontSize: "var(--text-statement)",
          fontWeight: "var(--fw-statement)",
          letterSpacing: "var(--ls-statement)",
        }}
      >
        {lead && <span className="text-[var(--color-grey-500)]">{lead} </span>}
        {children}
      </h2>
      {body && (
        <p
          className={`text-[var(--color-grey-300)] max-w-[34rem] mt-5 leading-relaxed ${align === "center" ? "mx-auto" : ""}`}
          style={{ fontSize: "var(--text-body)" }}
        >
          {body}
        </p>
      )}
    </div>
  );
}
