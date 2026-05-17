import { getTranslations, getLocale } from "next-intl/server";
import { Link } from "../../i18n/navigation";
import { SectionHeading } from "../ui/section-heading";
import { getAll } from "../../lib/content";

// Insights teaser. Lists the latest articles from MDX; falls back to a
// sober empty state when there are none (no improvised titles, §8).
export async function InsightsPreview() {
  const t = await getTranslations("insightsPreview");
  const locale = await getLocale();
  const articles = getAll("insights", locale).slice(0, 3);

  return (
    <section id="insights" className="mx-auto max-w-5xl px-6 py-20 sm:py-28">
      <SectionHeading title={t("title")} subtitle={t("subtitle")} as="h2" />

      {articles.length === 0 ? (
        <div className="mt-12 border-hairline px-6 py-12">
          <p className="text-sm text-subtle">{t("empty")}</p>
        </div>
      ) : (
        <ul className="mt-12">
          {articles.map((a, i) => (
            <li
              key={a.slug}
              className="border-hairline border-x-0 border-b-0 flex items-baseline gap-6 py-7 first:border-t-0 first:pt-0"
            >
              <span
                className="font-mono text-xs text-subtle"
                aria-hidden
              >
                {`0${i + 1}`}
              </span>
              <div>
                <h3 className="font-display text-lg font-medium text-foreground">
                  <Link
                    href={`/insights/${a.slug}`}
                    className="transition-colors hover:text-accent"
                  >
                    {a.title}
                  </Link>
                </h3>
                {a.summary ? (
                  <p className="mt-1 max-w-2xl text-sm leading-relaxed text-muted">
                    {a.summary}
                  </p>
                ) : null}
              </div>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-8">
        <Link
          href="/insights"
          className="font-mono text-xs uppercase tracking-[0.08em] text-accent hover:underline underline-offset-4"
        >
          {t("viewAll")}
        </Link>
      </div>
    </section>
  );
}
