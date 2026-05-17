"use client";

import { useLocale } from "next-intl";
import { usePathname } from "../../i18n/navigation";
import { Link } from "../../i18n/navigation";
import { routing } from "../../i18n/routing";
import { cn } from "../../lib/utils";

// Switches locale while preserving the current path (next-intl navigation).
export function LocaleSwitcher() {
  const active = useLocale();
  const pathname = usePathname();

  return (
    <div className="flex items-center gap-1 font-mono text-xs">
      {routing.locales.map((locale, i) => (
        <span key={locale} className="flex items-center gap-1">
          {i > 0 ? <span className="text-subtle">/</span> : null}
          <Link
            href={pathname}
            locale={locale}
            aria-current={locale === active ? "true" : undefined}
            className={cn(
              "inline-flex min-h-[24px] min-w-[24px] items-center justify-center uppercase transition-colors",
              locale === active
                ? "text-foreground"
                : "text-subtle hover:text-foreground",
            )}
          >
            {locale}
          </Link>
        </span>
      ))}
    </div>
  );
}
