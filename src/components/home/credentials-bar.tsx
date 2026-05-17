import { getTranslations } from "next-intl/server";

// 4-column credentials strip below the hero (REFACTOR §5).
// Labels render uppercase via CSS (eyebrow style); content is sentence case.
export async function CredentialsBar() {
  const t = await getTranslations("credentials");

  const cols = [
    { label: t("workWithLabel"), value: t("workWith") },
    { label: t("sectorsLabel"), value: t("sectors") },
    { label: t("marketsLabel"), value: t("markets") },
    { label: t("trackLabel"), value: t("track") },
  ];

  return (
    <section className="border-hairline border-x-0 mx-auto max-w-5xl">
      <dl className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {cols.map((c, i) => (
          <div
            key={c.label}
            className={cn_border(i)}
          >
            <dt className="font-sans text-[11px] font-medium uppercase tracking-[0.08em] text-subtle">
              {c.label}
            </dt>
            <dd className="mt-2 text-sm leading-relaxed text-foreground">
              {c.value}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

// Hairline dividers between columns (no last-border on the right).
function cn_border(i: number) {
  const base = "px-6 py-7";
  const left =
    i === 0
      ? ""
      : " border-hairline border-y-0 border-r-0 lg:border-l-[0.5px]";
  return base + left;
}
