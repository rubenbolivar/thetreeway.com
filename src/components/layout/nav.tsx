"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "../../i18n/navigation";
import { LocaleSwitcher } from "./locale-switcher";
import { BrandLogo } from "./brand-logo";
import { cn } from "../../lib/utils";

const ITEMS = [
  { key: "approach", href: "/enfoque" },
  { key: "model", href: "/modelo" },
  { key: "cases", href: "/casos" },
  { key: "insights", href: "/insights" },
  { key: "team", href: "/equipo" },
  { key: "contact", href: "/contacto" },
] as const;

export function Nav() {
  const t = useTranslations("nav");
  const [open, setOpen] = useState(false);

  return (
    <header className="border-hairline border-x-0 border-t-0 sticky top-0 z-50 bg-background/90 backdrop-blur">
      <nav
        className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4"
        aria-label="Primary"
      >
        <Link
          href="/"
          aria-label={t("brand")}
          className="inline-flex min-h-[32px] items-center text-foreground"
        >
          <BrandLogo variant="lockup" className="h-6 sm:h-7" />
        </Link>

        {/* Desktop */}
        <div className="hidden items-center gap-7 md:flex">
          <ul className="flex items-center gap-7">
            {ITEMS.map((item) => (
              <li key={item.key}>
                <Link
                  href={item.href}
                  className="inline-flex min-h-[24px] items-center text-sm text-muted transition-colors hover:text-foreground"
                >
                  {t(item.key)}
                </Link>
              </li>
            ))}
          </ul>
          <span className="h-4 w-px bg-border" aria-hidden />
          <LocaleSwitcher />
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          className="-mr-2 inline-flex min-h-[44px] min-w-[44px] items-center justify-end text-sm text-foreground md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? t("close") : t("menu")}
        </button>
      </nav>

      {/* Mobile panel. `inert` when collapsed so its links/controls
          can't receive keyboard focus even if a future style keeps it
          rendered (WCAG 2.4.3 / 2.4.11 — REFACTOR audit F1). */}
      <div
        id="mobile-menu"
        inert={!open}
        className={cn(
          "border-hairline border-x-0 border-b-0 md:hidden",
          open ? "block" : "hidden",
        )}
      >
        <ul className="mx-auto flex max-w-5xl flex-col gap-1 px-6 py-4">
          {ITEMS.map((item) => (
            <li key={item.key}>
              <Link
                href={item.href}
                className="block py-2 text-sm text-muted transition-colors hover:text-foreground"
                onClick={() => setOpen(false)}
              >
                {t(item.key)}
              </Link>
            </li>
          ))}
          <li className="mt-2 border-hairline border-x-0 border-b-0 pt-3">
            <LocaleSwitcher />
          </li>
        </ul>
      </div>
    </header>
  );
}
