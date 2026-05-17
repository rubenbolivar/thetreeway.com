import { cn } from "../../lib/utils";

// Stack tag — mono, hairline border. Used for tech tags in cases.
export function Tag({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center border-hairline rounded-none px-2 py-0.5",
        "font-mono text-[11px] leading-5 text-muted",
        className,
      )}
    >
      {children}
    </span>
  );
}
