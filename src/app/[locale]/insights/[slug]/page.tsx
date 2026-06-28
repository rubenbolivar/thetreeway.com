import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { MDXRemote } from "next-mdx-remote/rsc";
import { routing } from "../../../../i18n/routing";
import { getDoc, getStaticPairs } from "../../../../lib/content";
import { Link } from "../../../../i18n/navigation";
import { JsonLd } from "../../../../components/seo/json-ld";
import { articleSchema } from "../../../../lib/schema";
import { SITE_URL, buildMetadata } from "../../../../lib/metadata";
import { ShareLinks } from "../../../../components/share/share-links";
import { formatDate } from "../../../../lib/utils";

// No articles yet (Sprint 4 decision). Infra is ready: when MDX files
// land in src/content/insights/{locale}/, pages are generated here.
export function generateStaticParams() {
  return getStaticPairs("insights", [...routing.locales]);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const doc = getDoc("insights", locale, slug);
  if (!doc) return {};
  return buildMetadata({
    locale,
    path: `insights/${slug}`,
    title: `${doc.meta.title} · TheTreeWay`,
    description: doc.meta.summary ?? doc.meta.title,
    type: "article",
  });
}

export default async function InsightPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const doc = getDoc("insights", locale, slug);
  if (!doc) notFound();

  const pageUrl = `${SITE_URL}/${locale}/insights/${slug}`;

  return (
    <article className="mx-auto max-w-3xl px-6 py-20 sm:py-28">
      <JsonLd
        data={articleSchema({
          headline: doc.meta.title,
          description: doc.meta.summary,
          url: pageUrl,
          image: `${pageUrl}/opengraph-image`,
          datePublished: doc.meta.date,
          dateModified: doc.meta.date,
          section: "Insight",
        })}
      />
      <Link
        href="/insights"
        className="font-mono text-[11px] uppercase tracking-[0.08em] text-subtle hover:text-foreground"
      >
        ← Insights
      </Link>
      <h1 className="mt-10 font-display text-[2rem] leading-[1.15] font-medium tracking-[-0.02em] text-foreground sm:text-4xl">
        {doc.meta.title}
      </h1>
      {doc.meta.date ? (
        <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.08em] text-subtle">
          {formatDate(doc.meta.date, locale)}
        </p>
      ) : null}
      <div className="mt-8 [&>p]:mt-5 [&>p]:text-[17px] [&>p]:leading-[1.7] [&>p]:text-muted [&>h2]:mt-10 [&>h2]:font-display [&>h2]:text-2xl [&>h2]:font-medium [&>h2]:text-foreground [&>ul]:mt-4 [&>ul]:list-disc [&>ul]:space-y-1.5 [&>ul]:pl-5 [&>ul>li]:text-[17px] [&>ul>li]:leading-[1.7] [&>ul>li]:text-muted [&_strong]:font-medium [&_strong]:text-foreground [&_a]:text-accent [&_a]:underline [&_a]:underline-offset-4">
        <MDXRemote source={doc.body} />
      </div>

      <ShareLinks url={pageUrl} title={doc.meta.title} />
    </article>
  );
}
