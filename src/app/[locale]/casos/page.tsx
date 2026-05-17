import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { routing } from "../../../i18n/routing";
import { buildMetadata } from "../../../lib/metadata";
import { getAll } from "../../../lib/content";
import { SectionHeading } from "../../../components/ui/section-heading";
import { CaseRow } from "../../../components/cases/case-row";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "cases" });
  return buildMetadata({
    locale,
    path: "casos",
    title: `${t("title")} · TheTreeWay`,
    description: t("subtitle"),
  });
}

export default async function CasesIndex({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("cases");
  const cases = getAll("cases", locale);

  return (
    <section className="mx-auto max-w-5xl px-6 py-20 sm:py-28">
      <SectionHeading title={t("title")} subtitle={t("subtitle")} as="h1" />
      <div className="mt-14">
        {cases.map((c, i) => (
          <CaseRow
            key={c.slug}
            index={`0${i + 1}`}
            label={c.label ?? ""}
            title={c.title}
            body={c.summary ?? ""}
            stack={c.stack ?? ""}
            status={c.status ?? ""}
            href={`/casos/${c.slug}`}
          />
        ))}
      </div>
    </section>
  );
}
