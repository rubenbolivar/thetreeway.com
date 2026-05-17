"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

// Editorial share row (mono text links, no brand-color icons — coherent
// with §3). Plain <a> for network shares (work without JS); copy-link
// is progressive enhancement. Native share sheet used when available.
export function ShareLinks({
  url,
  title,
}: {
  url: string;
  title: string;
}) {
  const t = useTranslations("share");
  const [copied, setCopied] = useState(false);

  const u = encodeURIComponent(url);
  const tt = encodeURIComponent(title);

  const links = [
    {
      label: "LinkedIn",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${u}`,
    },
    {
      label: "X",
      href: `https://twitter.com/intent/tweet?url=${u}&text=${tt}`,
    },
    {
      label: "WhatsApp",
      href: `https://wa.me/?text=${tt}%20${u}`,
    },
  ];

  async function onCopy() {
    try {
      // Native share sheet on supporting devices (mostly mobile).
      if (typeof navigator !== "undefined" && navigator.share) {
        await navigator.share({ title, url });
        return;
      }
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* user cancelled the share sheet — no-op */
    }
  }

  const itemCls =
    "font-mono text-[11px] uppercase tracking-[0.08em] text-subtle transition-colors hover:text-foreground";

  return (
    <div className="mt-12 flex flex-wrap items-center gap-x-6 gap-y-2 border-hairline border-x-0 border-b-0 pt-8">
      <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-subtle">
        {t("label")}
      </span>
      {links.map((l) => (
        <a
          key={l.label}
          href={l.href}
          target="_blank"
          rel="noopener noreferrer"
          className={itemCls}
        >
          {l.label}
        </a>
      ))}
      <button type="button" onClick={onCopy} className={itemCls}>
        {copied ? t("copied") : t("copy")}
      </button>
    </div>
  );
}
