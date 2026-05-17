import { cn } from "../../lib/utils";
import { Label } from "./label";

// Section H2 — serif 32-36px, weight 500, tracking -0.02em (REFACTOR §3).
// Optional eyebrow + subtitle for the editorial section pattern.
export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  as: Tag = "h2",
  className,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  as?: "h1" | "h2";
  className?: string;
}) {
  return (
    <div className={cn("max-w-2xl", className)}>
      {eyebrow ? <Label className="mb-3">{eyebrow}</Label> : null}
      <Tag className="font-display text-[2rem] leading-[1.15] font-medium tracking-[-0.02em] text-foreground sm:text-4xl">
        {title}
      </Tag>
      {subtitle ? (
        <p className="mt-4 text-[15px] leading-[1.65] text-muted sm:text-[17px] sm:leading-relaxed">
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}
