import { getTranslations } from "next-intl/server";
import { Link } from "../../i18n/navigation";
import { SectionHeading } from "../ui/section-heading";
import { social, calUrl } from "../../content/config/social";

// "La firma tiene un autor." 220px photo (placeholder) · 1fr content.
// Closing pull-quote in serif italic. Links from central social config.

export async function AuthorSection({
  headingAs = "h2",
}: {
  // /equipo renders this as the page's sole H1 (a11y + SEO); on the
  // home page it stays an H2 under the hero's H1.
  headingAs?: "h1" | "h2";
} = {}) {
  const t = await getTranslations("author");

  return (
    <section
      id="autor"
      className="border-hairline border-x-0 border-b-0"
    >
      <div className="mx-auto max-w-5xl px-6 py-20 sm:py-28">
        <SectionHeading title={t("title")} as={headingAs} />

        <div className="mt-12 grid gap-10 lg:grid-cols-[220px_1fr] lg:gap-14">
          {/* Photo placeholder (REFACTOR §5: professional photo TBD) */}
          <div
            className="border-hairline flex aspect-[3/4] w-full max-w-[220px] items-center justify-center"
            role="img"
            aria-label={t("photoAlt")}
          >
            <span className="font-display text-3xl font-medium text-subtle">
              RB
            </span>
          </div>

          <div>
            <h3 className="font-display text-2xl font-medium text-foreground">
              {t("name")}
            </h3>
            <p className="mt-1 text-sm text-muted">{t("role")}</p>

            <p className="mt-6 max-w-2xl text-[15px] leading-[1.7] text-muted sm:text-[17px]">
              {t("bio1")}
            </p>
            <p className="mt-4 max-w-2xl text-[15px] leading-[1.7] text-muted sm:text-[17px]">
              {t("bio2")}
            </p>

            <div className="mt-7 flex flex-wrap gap-x-6 gap-y-2 text-sm">
              <a
                href={social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:underline underline-offset-4"
              >
                {t("linkedin")}
              </a>
              <Link
                href="/insights"
                className="text-accent hover:underline underline-offset-4"
              >
                {t("writes")}
              </Link>
              <a
                href={calUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:underline underline-offset-4"
              >
                {t("contactDirect")}
              </a>
            </div>
          </div>
        </div>

        <blockquote className="mt-16 max-w-3xl border-hairline border-y-0 border-r-0 border-l-2 pl-6">
          <p className="font-display text-xl italic leading-relaxed text-foreground sm:text-2xl">
            {t("quote")}
          </p>
          <cite className="mt-4 block not-italic font-mono text-[11px] uppercase tracking-[0.08em] text-subtle">
            — {t("name")}
          </cite>
        </blockquote>
      </div>
    </section>
  );
}
