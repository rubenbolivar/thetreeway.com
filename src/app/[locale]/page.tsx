import { setRequestLocale } from "next-intl/server";
import { Hero } from "../../components/home/hero";
import { CredentialsBar } from "../../components/home/credentials-bar";
import { FilterSection } from "../../components/home/filter-section";
import { ModelDiagram } from "../../components/home/model-diagram";
import { CasesList } from "../../components/home/cases-list";
import { HowWeWork } from "../../components/home/how-we-work";
import { AuthorSection } from "../../components/home/author-section";
import { TechStack } from "../../components/home/tech-stack";
import { InsightsPreview } from "../../components/home/insights-preview";

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
      <HowWeWork />
      <AuthorSection />
      <TechStack />
      <InsightsPreview />
      {/* Sprint 4: internal pages (MDX cases/insights, enfoque, equipo) */}
    </>
  );
}
