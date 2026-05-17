import { cn } from "../../lib/utils";

// Eyebrow / overline label. REFACTOR-STRATEGY §3:
// 11-12px sans, weight 500, letter-spacing 0.08em, uppercase (presentational).
export function Label({
  children,
  className,
  as: Tag = "p",
}: {
  children: React.ReactNode;
  className?: string;
  as?: "p" | "span" | "div";
}) {
  return (
    <Tag
      className={cn(
        "font-sans text-[11px] sm:text-xs font-medium uppercase tracking-[0.08em] text-subtle",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
