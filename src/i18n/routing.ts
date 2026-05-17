import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["es", "en"],
  defaultLocale: "es",
  // /es and /en are always in the path; no hidden default.
  // x-default → /es is handled in metadata (see lib/metadata).
  localePrefix: "always",
});

export type Locale = (typeof routing.locales)[number];
