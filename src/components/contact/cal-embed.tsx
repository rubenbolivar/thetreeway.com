"use client";

import { useEffect } from "react";
import Cal, { getCalApi } from "@calcom/embed-react";

// Official Cal.com inline embed. theme "auto" → respects
// prefers-color-scheme (§3). Only loaded on /contacto (client).
const NS = "diagnostico";
const CAL_LINK = "ruben-bolivar/diagnostico";

export function CalEmbed() {
  useEffect(() => {
    (async () => {
      const cal = await getCalApi({ namespace: NS });
      cal("ui", {
        hideEventTypeDetails: false,
        layout: "month_view",
        theme: "auto",
      });
    })();
  }, []);

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
