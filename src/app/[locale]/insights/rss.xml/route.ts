import { routing } from "../../../../i18n/routing";
import { getAll } from "../../../../lib/content";
import { SITE_URL } from "../../../../lib/metadata";

// Per-locale RSS 2.0 feed for the Insights blog (audit F2 / blog
// sprint). Filesystem MDX → built at deploy time, no DB.
export const dynamic = "force-static";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

const esc = (s: string) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");

function rfc822(date?: string) {
  const d = date ? new Date(date) : new Date();
  return (isNaN(d.getTime()) ? new Date() : d).toUTCString();
}

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ locale: string }> },
) {
  const { locale } = await params;
  const loc = routing.locales.includes(
    locale as (typeof routing.locales)[number],
  )
    ? locale
    : routing.defaultLocale;

  const isEs = loc === "es";
  const feedUrl = `${SITE_URL}/${loc}/insights/rss.xml`;
  const indexUrl = `${SITE_URL}/${loc}/insights`;
  const channelTitle = isEs
    ? "TheTreeWay — Insights"
    : "TheTreeWay — Insights";
  const channelDesc = isEs
    ? "Arquitectura digital e IA aplicada para grupos empresariales. Ensayos de TheTreeWay."
    : "Digital architecture and applied AI for enterprise groups. Essays from TheTreeWay.";

  const items = getAll("insights", loc)
    .map((a) => {
      const link = `${SITE_URL}/${loc}/insights/${a.slug}`;
      return [
        "    <item>",
        `      <title>${esc(a.title)}</title>`,
        `      <link>${link}</link>`,
        `      <guid isPermaLink="true">${link}</guid>`,
        `      <pubDate>${rfc822(a.date)}</pubDate>`,
        a.summary ? `      <description>${esc(a.summary)}</description>` : "",
        "    </item>",
      ]
        .filter(Boolean)
        .join("\n");
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${esc(channelTitle)}</title>
    <link>${indexUrl}</link>
    <description>${esc(channelDesc)}</description>
    <language>${loc}</language>
    <atom:link href="${feedUrl}" rel="self" type="application/rss+xml" />
    <lastBuildDate>${rfc822()}</lastBuildDate>
${items}
  </channel>
</rss>
`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
