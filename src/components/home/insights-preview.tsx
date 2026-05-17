import { getTranslations } from "next-intl/server";
import { Link } from "../../i18n/navigation";
import { SectionHeading } from "../ui/section-heading";

// Insights teaser. Articles are MDX (Sprint 4); until then this renders
// a sober empty state — no improvised article titles (REFACTOR §8).
export async function InsightsPreview() {
  const t = await getTranslations("insightsPreview");

  return (
    <section id="insights" className="mx-auto max-w-5xl px-6 py-20 sm:py-28">
      <SectionHeading
        title={t("title")}
        subtitle={t("subtitle")}
        as="h2"
      />

      <div className="mt-12 border-hairline px-6 py-12">
        <p className="text-sm text-subtle">{t("empty")}</p>
      </div>

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
