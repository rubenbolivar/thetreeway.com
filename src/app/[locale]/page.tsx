import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";

// Sprint 0 placeholder. Sprint 1 replaces this with Hero + CredentialsBar
// (see REFACTOR-STRATEGY.md §5 / §7).
export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("common");

  return (
    <main className="mx-auto flex min-h-screen max-w-2xl flex-col justify-center px-6">
      <p className="font-mono text-xs uppercase tracking-[0.08em] text-subtle">
        {t("scaffold")}
      </p>
      <h1 className="mt-4 font-display text-4xl font-medium tracking-[-0.02em] text-foreground">
        TheTreeWay
      </h1>
      <p className="mt-3 text-muted">
        {t("locale")}: {locale}
      </p>
    </main>
  );
}
