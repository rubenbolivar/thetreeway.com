import type { Metadata } from "next";
import { routing } from "../../../i18n/routing";
import { getDoc } from "../../../lib/content";
import { buildMetadata } from "../../../lib/metadata";
import { LegalArticle } from "../../../components/legal/legal-page";

const SLUG = "privacidad";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const doc = getDoc("legal", locale, SLUG);
  return buildMetadata({
    locale,
    path: SLUG,
    title: `${doc?.meta.title ?? "Privacidad"} · TheTreeWay`,
    description: doc?.meta.summary ?? "",
  });
}

export default async function PrivacidadPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return <LegalArticle locale={locale} slug={SLUG} />;
}
