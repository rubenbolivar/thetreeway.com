import type { MetadataRoute } from "next";
import { routing } from "../i18n/routing";
import { getSlugs } from "../lib/content";
import { SITE_URL } from "../lib/metadata";

// Dynamic sitemap (REFACTOR §6): reads /content, one entry per locale
// with hreflang alternates. No hard-coded URLs.
const STATIC_PATHS = [
  "",
  "enfoque",
  "modelo",
  "casos",
  "insights",
  "equipo",
  "contacto",
  "privacidad",
  "terminos",
  "atribuciones",
];

function url(locale: string, p = "") {
  return `${SITE_URL}/${locale}${p ? `/${p}` : ""}`;
}

function alternates(p = "") {
  const languages: Record<string, string> = {};
  for (const l of routing.locales) languages[l] = url(l, p);
  languages["x-default"] = url(routing.defaultLocale, p);
  return { languages };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const p of STATIC_PATHS) {
    for (const l of routing.locales) {
      entries.push({
        url: url(l, p),
        lastModified: new Date(),
        alternates: alternates(p),
      });
    }
  }

  for (const type of ["cases", "insights"] as const) {
    const seg = type === "cases" ? "casos" : "insights";
    for (const l of routing.locales) {
      for (const slug of getSlugs(type, l)) {
        const path = `${seg}/${slug}`;
        entries.push({
          url: url(l, path),
          lastModified: new Date(),
          alternates: alternates(path),
        });
      }
    }
  }

  // Legacy route, outside the locale system.
  entries.push({ url: `${SITE_URL}/rubenbolivar`, lastModified: new Date() });

  return entries;
}
