import { getTranslations } from "next-intl/server";
import { SectionHeading } from "../ui/section-heading";

// Four phases, editorial vertical timeline. Numbered, hairline-separated;
// phase time in mono. Mirrors the filter-section editorial pattern.
export async function HowWeWork() {
  const t = await getTranslations("howWeWork");
  const phases = [1, 2, 3, 4].map((n) => ({
    n: `0${n}`,
    name: t(`phase${n}Name`),
    time: t(`phase${n}Time`),
    body: t(`phase${n}Body`),
  }));

  return (
    <section id="enfoque" className="mx-auto max-w-5xl px-6 py-20 sm:py-28">
      <SectionHeading title={t("title")} as="h2" />

      <ol className="mt-14">
        {phases.map((p) => (
          <li
            key={p.n}
            className="border-hairline border-x-0 border-b-0 grid gap-4 py-9 first:border-t-0 first:pt-0 lg:grid-cols-[200px_1fr] lg:gap-10"
          >
            <div>
              <div className="flex items-baseline gap-3">
                <span
                  className="font-mono text-xs text-subtle"
                  aria-hidden
                >
                  {p.n}
                </span>
                <h3 className="font-display text-xl font-medium text-foreground">
                  {p.name}
                </h3>
              </div>
              <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.08em] text-subtle">
                {p.time}
              </p>
            </div>
            <p className="max-w-2xl text-[15px] leading-[1.7] text-muted sm:text-base">
              {p.body}
            </p>
          </li>
        ))}
      </ol>
    </section>
  );
}
