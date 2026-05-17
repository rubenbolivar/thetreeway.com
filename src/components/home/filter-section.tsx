import { getTranslations } from "next-intl/server";
import { SectionHeading } from "../ui/section-heading";

// "Para quién trabajamos" — editorial bullets, not cards (REFACTOR §5).
export async function FilterSection({
  headingAs = "h2",
}: {
  // /enfoque renders this as the page's sole H1 (a11y + SEO); on the
  // home page it stays an H2 under the hero's H1.
  headingAs?: "h1" | "h2";
} = {}) {
  const t = await getTranslations("filter");
  const bullets = [t("bullet1"), t("bullet2"), t("bullet3")];

  return (
    <section
      id="filter"
      className="mx-auto max-w-5xl px-6 py-20 sm:py-28"
    >
      <SectionHeading title={t("title")} as={headingAs} />

      <ol className="mt-12 max-w-3xl">
        {bullets.map((b, i) => (
          <li
            key={i}
            className="border-hairline border-x-0 border-b-0 flex items-baseline gap-6 py-9 first:border-t-0 first:pt-0"
          >
            <span
              className="font-mono text-xs text-subtle"
              aria-hidden
            >
              0{i + 1}
            </span>
            <p className="text-[15px] leading-[1.7] text-foreground sm:text-[17px]">
              {b}
            </p>
          </li>
        ))}
      </ol>

      <p className="mt-12 max-w-2xl text-[15px] leading-[1.7] text-muted sm:text-base">
        {t("close")}
      </p>
    </section>
  );
}
