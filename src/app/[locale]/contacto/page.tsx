import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { routing } from "../../../i18n/routing";
import { buildMetadata } from "../../../lib/metadata";
import { SectionHeading } from "../../../components/ui/section-heading";
import { CalEmbed } from "../../../components/contact/cal-embed";
import { ContactForm } from "../../../components/contact/contact-form";
import { social } from "../../../content/config/social";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact" });
  return buildMetadata({
    locale,
    path: "contacto",
    title: `${t("title")} · TheTreeWay`,
    description: t("card1Body"),
  });
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("contact");

  return (
    <section className="mx-auto max-w-5xl px-6 py-20 sm:py-28">
      <SectionHeading title={t("title")} as="h1" />

      <div className="mt-14 grid gap-14 lg:grid-cols-2">
        {/* Path 1 — diagnostic (Cal.com embed) */}
        <div>
          <h2 className="font-display text-xl font-medium text-foreground">
            {t("card1Title")}
          </h2>
          <p className="mt-3 text-[15px] leading-[1.65] text-muted">
            {t("card1Body")}
          </p>
          <div className="mt-6 border-hairline">
            <CalEmbed />
          </div>
        </div>

        {/* Path 2 — specific question (form → WhatsApp) */}
        <div>
          <h2 className="font-display text-xl font-medium text-foreground">
            {t("card2Title")}
          </h2>
          <p className="mt-3 text-[15px] leading-[1.65] text-muted">
            {t("card2Body")}
          </p>
          <div className="mt-6">
            <ContactForm />
          </div>
        </div>
      </div>

      {/* Email directo del autor — vía discreta debajo del grid principal. */}
      <p className="mt-16 border-hairline border-x-0 border-b-0 pt-8 text-sm text-muted">
        {t("directEmailLabel")}{" "}
        <a
          href={`mailto:${social.email}`}
          className="font-mono text-xs text-accent hover:underline underline-offset-4"
        >
          {social.email}
        </a>
      </p>
    </section>
  );
}
