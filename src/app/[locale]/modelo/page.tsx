import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { routing } from "../../../i18n/routing";
import { buildMetadata } from "../../../lib/metadata";
import { ModelDiagram } from "../../../components/home/model-diagram";
import { Link } from "../../../i18n/navigation";

const LAYERS = [1, 2, 3, 4, 5, 6] as const;

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "model" });
  return buildMetadata({
    locale,
    path: "modelo",
    title: `${t("title")} · TheTreeWay`,
    description: t("subtitle"),
  });
}

// /modelo — dedicated page for the six-layer model. Reuses the
// interactive diagram (single source of truth) and develops each layer
// as its own readable block so it works without JS and as a standalone
// SEO target (REFACTOR audit F2). Copy is the already-approved `model`
// namespace — no improvised content.
export default async function ModeloPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "model" });

  return (
    <>
      <ModelDiagram />

      <section className="mx-auto max-w-3xl px-6 pb-24">
        <ol>
          {LAYERS.map((n) => (
            <li
              key={n}
              className="border-hairline border-x-0 border-b-0 flex items-baseline gap-6 py-9 first:border-t-0 first:pt-0"
            >
              <span
                className="font-mono text-xs text-subtle"
                aria-hidden
              >
                {String(n).padStart(2, "0")}
              </span>
              <div>
                <h2 className="font-display text-xl font-medium text-foreground">
                  {t(`layer${n}Name`)}
                </h2>
                <p className="mt-2 text-[15px] leading-[1.7] text-muted sm:text-[17px]">
                  {t(`layer${n}Desc`)}
                </p>
              </div>
            </li>
          ))}
        </ol>

        <p className="mt-12 text-[15px] leading-[1.7] text-muted sm:text-[17px]">
          {t("close")}
        </p>

        <div className="mt-10 flex flex-wrap gap-x-6 gap-y-2 text-sm">
          <Link
            href="/casos"
            className="text-accent hover:underline underline-offset-4"
          >
            {t("ctaCase")}
          </Link>
          <Link
            href="/contacto"
            className="text-accent hover:underline underline-offset-4"
          >
            {t("ctaTalk")}
          </Link>
        </div>
      </section>
    </>
  );
}
