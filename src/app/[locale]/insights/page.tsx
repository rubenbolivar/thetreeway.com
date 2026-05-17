import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { routing } from "../../../i18n/routing";
import { buildMetadata } from "../../../lib/metadata";
import { getAll } from "../../../lib/content";
import { SectionHeading } from "../../../components/ui/section-heading";
import { Link } from "../../../i18n/navigation";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "insightsPreview" });
  return buildMetadata({
    locale,
    path: "insights",
    title: `${t("title")} · TheTreeWay`,
    description: t("subtitle"),
  });
}

export default async function InsightsIndex({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("insightsPreview");
  const articles = getAll("insights", locale);

  return (
    <section className="mx-auto max-w-5xl px-6 py-20 sm:py-28">
      <SectionHeading title={t("title")} subtitle={t("subtitle")} as="h1" />

      {articles.length === 0 ? (
        <div className="mt-12 border-hairline px-6 py-16">
          <p className="text-sm text-subtle">{t("empty")}</p>
        </div>
      ) : (
        <ul className="mt-12">
          {articles.map((a, i) => (
            <li
              key={a.slug}
              className="border-hairline border-x-0 border-b-0 py-8 first:border-t-0 first:pt-0"
            >
              <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-subtle">
                {`0${i + 1}`}
                {a.date ? ` · ${a.date}` : ""}
              </p>
              <h2 className="mt-2 font-display text-xl font-medium text-foreground">
                <Link
                  href={`/insights/${a.slug}`}
                  className="transition-colors hover:text-accent"
                >
                  {a.title}
                </Link>
              </h2>
              {a.summary ? (
                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">
                  {a.summary}
                </p>
              ) : null}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
