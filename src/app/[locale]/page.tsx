import { setRequestLocale } from "next-intl/server";
import { Hero } from "../../components/home/hero";
import { CredentialsBar } from "../../components/home/credentials-bar";
import { FilterSection } from "../../components/home/filter-section";
import { ModelDiagram } from "../../components/home/model-diagram";
import { CasesList } from "../../components/home/cases-list";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Hero />
      <CredentialsBar />
      <FilterSection />
      <ModelDiagram />
      <CasesList />
      {/* Sprint 3: how-we-work + author + tech-stack + insights-preview */}
    </>
  );
}
