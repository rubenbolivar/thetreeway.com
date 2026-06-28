import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { routing } from "../../../i18n/routing";
import { buildMetadata } from "../../../lib/metadata";
import { FilterSection } from "../../../components/home/filter-section";
import { ModelDiagram } from "../../../components/home/model-diagram";
import { HowWeWork } from "../../../components/home/how-we-work";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "enfoque" });
  return buildMetadata({
    locale,
    path: "enfoque",
    title: `${t("title")} · TheTreeWay`,
    description: t("subtitle"),
  });
}

// /enfoque — expanded model: for whom + six-layer model + how we work.
// Reuses home sections (single source of truth, no copy duplication).
export default async function EnfoquePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <>
      <FilterSection headingAs="h1" />
      <ModelDiagram />
      <HowWeWork />
    </>
  );
}
