import { getTranslations } from "next-intl/server";
import { SectionHeading } from "../ui/section-heading";
import { CaseRow } from "../cases/case-row";

// Three cases hard-coded from messages (Sprint 2). Migrates to MDX in
// Sprint 4 (REFACTOR §7).
export async function CasesList() {
  const t = await getTranslations("cases");

  const cases = [1, 2, 3].map((n) => ({
    index: `0${n}`,
    label: t(`case${n}Label`),
    title: t(`case${n}Title`),
    body: t(`case${n}Body`),
    stack: t(`case${n}Stack`),
    status: t(`case${n}Status`),
  }));

  return (
    <section id="casos" className="mx-auto max-w-5xl px-6 py-20 sm:py-28">
      <SectionHeading title={t("title")} subtitle={t("subtitle")} as="h2" />
      <div className="mt-14">
        {cases.map((c) => (
          <CaseRow key={c.index} {...c} />
        ))}
      </div>
    </section>
  );
}
