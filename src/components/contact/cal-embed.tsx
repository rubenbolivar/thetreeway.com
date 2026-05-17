"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import Cal, { getCalApi } from "@calcom/embed-react";

// Cal.com inline embed, loaded ON CLICK (not on mount). The Cal iframe
// pulls heavy third-party JS + sets third-party cookies; deferring it
// keeps /contacto's Core Web Vitals clean (REFACTOR §6/§7) while still
// offering the embed the doc asks for (§5). theme "auto" → §3.
const NS = "diagnostico";
const CAL_LINK = "ruben-bolivar/diagnostico";

export function CalEmbed() {
  const t = useTranslations("contact");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!loaded) return;
    (async () => {
      const cal = await getCalApi({ namespace: NS });
      cal("ui", {
        hideEventTypeDetails: false,
        layout: "month_view",
        theme: "auto",
      });
    })();
  }, [loaded]);

  if (!loaded) {
    return (
      <button
        type="button"
        onClick={() => setLoaded(true)}
        className="flex min-h-[200px] w-full flex-col items-center justify-center gap-3 border-hairline px-6 py-12 text-center transition-colors hover:border-accent"
      >
        <span className="bg-foreground px-5 py-3 text-sm font-medium text-background">
          {t("card1Cta")}
        </span>
        <span className="text-xs text-subtle">cal.com/ruben-bolivar</span>
      </button>
    );
  }

  return (
    <Cal
      namespace={NS}
      calLink={CAL_LINK}
      style={{ width: "100%", height: "100%", overflow: "scroll" }}
      config={{ layout: "month_view" }}
      className="min-h-[560px] w-full"
    />
  );
}
