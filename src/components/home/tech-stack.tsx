import { getTranslations } from "next-intl/server";
import { SectionHeading } from "../ui/section-heading";

// "Sobre qué construimos." Grouped by category. Implemented as grayscale
// type wordmarks (not brand-image logos): coherent with §3 (white/black/
// greys, editorial), no third-party asset/copyright dependency. If Rubén
// prefers real SVG brand logos, swap is trivial — flagged at checkpoint.
export async function TechStack() {
  const t = await getTranslations("techStack");
  const cats = [1, 2, 3, 4, 5].map((n) => ({
    label: t(`cat${n}`),
    items: t(`cat${n}Items`)
      .split(",")
      .map((s) => s.trim()),
  }));

  return (
    <section className="mx-auto max-w-5xl px-6 py-20 sm:py-28">
      <SectionHeading title={t("title")} as="h2" />

      <dl className="mt-12 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
        {cats.map((c) => (
          <div
            key={c.label}
            className="border-hairline border-x-0 border-b-0 pt-5"
          >
            <dt className="font-sans text-[11px] font-medium uppercase tracking-[0.08em] text-subtle">
              {c.label}
            </dt>
            <dd className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5">
              {c.items.map((it) => (
                <span
                  key={it}
                  className="font-mono text-sm text-muted"
                >
                  {it}
                </span>
              ))}
            </dd>
          </div>
        ))}
      </dl>

      <p className="mt-12 max-w-2xl text-[15px] leading-[1.7] text-muted sm:text-base">
        {t("close")}
      </p>
    </section>
  );
}
