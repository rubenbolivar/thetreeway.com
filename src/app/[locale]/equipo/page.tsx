import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { routing } from "../../../i18n/routing";
import { AuthorSection } from "../../../components/home/author-section";
import { socialList } from "../../../content/config/social";
import { JsonLd } from "../../../components/seo/json-ld";
import { personSchema } from "../../../lib/schema";
import { buildMetadata } from "../../../lib/metadata";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "author" });
  return buildMetadata({
    locale,
    path: "equipo",
    title: `${t("title")} · TheTreeWay`,
    description: t("bio1"),
    type: "profile",
  });
}

// /equipo — expanded author. Reuses AuthorSection (single source of
// truth) + full social list from the central config.
export default async function EquipoPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "author" });

  return (
    <>
      <JsonLd data={personSchema(t("role"), t("bio1"))} />
      <AuthorSection />
      <section className="mx-auto max-w-5xl px-6 pb-24">
        <ul className="flex flex-wrap gap-x-6 gap-y-2">
          {socialList.map((s) => (
            <li key={s.key}>
              <a
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-xs text-accent hover:underline underline-offset-4"
              >
                {s.label}
              </a>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
