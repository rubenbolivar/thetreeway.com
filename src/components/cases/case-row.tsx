import { Tag } from "../ui/tag";

// Editorial 3-column row (REFACTOR §5): 140px label · 1fr content · 160px meta.
// Stacks on mobile. Hairline divider between rows.
export function CaseRow({
  index,
  label,
  title,
  body,
  stack,
  status,
}: {
  index: string;
  label: string;
  title: string;
  body: string;
  stack: string;
  status: string;
}) {
  const tags = stack.split(",").map((s) => s.trim());

  return (
    <article className="border-hairline border-x-0 border-b-0 grid gap-6 py-12 first:border-t-0 first:pt-0 lg:grid-cols-[140px_1fr_160px] lg:gap-10">
      <div>
        <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-subtle">
          {index}
        </p>
        <p className="mt-2 text-xs leading-relaxed text-muted">{label}</p>
      </div>

      <div>
        <h3 className="font-display text-[1.375rem] leading-snug font-medium text-foreground sm:text-2xl">
          {title}
        </h3>
        <p className="mt-3 max-w-2xl text-[15px] leading-[1.65] text-muted">
          {body}
        </p>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {tags.map((tg) => (
            <Tag key={tg}>{tg}</Tag>
          ))}
        </div>
      </div>

      <div className="lg:text-right">
        <p className="font-mono text-[11px] leading-relaxed text-subtle">
          {status}
        </p>
      </div>
    </article>
  );
}
