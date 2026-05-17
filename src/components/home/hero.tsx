import { getTranslations } from "next-intl/server";
import { Link } from "../../i18n/navigation";
import { Button, buttonVariants } from "../ui/button";
import { Label } from "../ui/label";
import { cn } from "../../lib/utils";

import { calUrl } from "../../content/config/social";

// CTA primary → Cal.com (external; embed comes in Sprint 5).
// CTA secondary → /enfoque (locale-aware; page lands in Sprint 4).

export async function Hero() {
  const t = await getTranslations("hero");

  return (
    <section className="mx-auto max-w-5xl px-6 pt-20 pb-16 sm:pt-28 sm:pb-24">
      <Label className="mb-5">{t("eyebrow")}</Label>

      <h1 className="max-w-3xl font-display text-[2.75rem] leading-[1.1] font-medium tracking-[-0.02em] text-foreground sm:text-[3.5rem]">
        {t("title")}
      </h1>

      <p className="mt-6 max-w-2xl text-[17px] leading-[1.6] text-muted">
        {t("subtitle")}
      </p>

      <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
        <Button href={calUrl} external variant="primary">
          {t("ctaPrimary")}
        </Button>
        <Link
          href="/enfoque"
          className={cn(buttonVariants({ variant: "secondary" }))}
        >
          {t("ctaSecondary")}
        </Link>
      </div>
    </section>
  );
}
