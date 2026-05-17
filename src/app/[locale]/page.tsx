import { setRequestLocale } from "next-intl/server";
import { Hero } from "../../components/home/hero";
import { CredentialsBar } from "../../components/home/credentials-bar";

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
      {/* Sprint 2: filter-section + model-diagram + cases-list */}
    </>
  );
}
