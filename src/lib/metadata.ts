import type { Metadata } from "next";
import { routing } from "../i18n/routing";

// SEO metadata builder (REFACTOR §6): absolute canonical, hreflang with
// x-default → /es, complete OpenGraph + Twitter.

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://thetreeway.com"
).replace(/\/$/, "");

const SITE_NAME = "TheTreeWay";

function abs(locale: string, path = "") {
  const clean = path.replace(/^\/|\/$/g, "");
  return `${SITE_URL}/${locale}${clean ? `/${clean}` : ""}`;
}

export function buildMetadata({
  locale,
  path = "",
  title,
  description,
  ogImage,
  type = "website",
}: {
  locale: string;
  path?: string;
  title: string;
  description: string;
  ogImage?: string;
  type?: "website" | "article" | "profile";
}): Metadata {
  const url = abs(locale, path);
  const languages: Record<string, string> = {};
  for (const l of routing.locales) languages[l] = abs(l, path);
  languages["x-default"] = abs(routing.defaultLocale, path);

  const images = ogImage
    ? [{ url: ogImage, width: 1200, height: 630, alt: title }]
    : undefined;

  return {
    metadataBase: new URL(SITE_URL),
    title,
    description,
    alternates: { canonical: url, languages },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      locale: locale === "es" ? "es_ES" : "en_US",
      type,
      images,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ogImage ? [ogImage] : undefined,
    },
  };
}
