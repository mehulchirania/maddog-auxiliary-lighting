import { cn } from "@/lib/cn";

export default function Container({
  children,
  className,
  wide = false,
  style,
}: {
  children: React.ReactNode;
  className?: string;
  wide?: boolean;
  style?: React.CSSProperties;
}) {
  return (
    <div
      style={style}
      className={cn(
        "mx-auto w-full px-5 sm:px-8",
        wide ? "max-w-[1600px]" : "max-w-[1240px]",
        className,
      )}
    >
      {children}
    </div>
  );
}
