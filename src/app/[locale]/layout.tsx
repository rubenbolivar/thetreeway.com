import { NextIntlClientProvider, hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "../../i18n/routing";
import { fontVariables } from "../../lib/fonts";
import { Nav } from "../../components/layout/nav";
import { Footer } from "../../components/layout/footer";
import { JsonLd } from "../../components/seo/json-ld";
import { organizationSchema } from "../../lib/schema";
import "../globals.css";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  // Enable static rendering for this locale.
  setRequestLocale(locale);
  const t = await getTranslations("common");

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`${fontVariables} font-sans antialiased`}>
        <JsonLd data={organizationSchema()} />
        <NextIntlClientProvider>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:bg-foreground focus:px-4 focus:py-2 focus:text-background"
          >
            {t("skipToContent")}
          </a>
          <Nav />
          <main id="main">{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
