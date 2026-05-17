import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { MDXRemote } from "next-mdx-remote/rsc";
import { routing } from "../../../../i18n/routing";
import { getDoc, getStaticPairs } from "../../../../lib/content";
import { Tag } from "../../../../components/ui/tag";
import { Link } from "../../../../i18n/navigation";
import { JsonLd } from "../../../../components/seo/json-ld";
import { articleSchema } from "../../../../lib/schema";
import { SITE_URL, buildMetadata } from "../../../../lib/metadata";

export function generateStaticParams() {
  return getStaticPairs("cases", [...routing.locales]);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const doc = getDoc("cases", locale, slug);
  if (!doc) return {};
  return buildMetadata({
    locale,
    path: `casos/${slug}`,
    title: `${doc.meta.title} · TheTreeWay`,
    description: doc.meta.summary ?? doc.meta.title,
    type: "article",
  });
}

export default async function CasePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const doc = getDoc("cases", locale, slug);
  if (!doc) notFound();

  const tags = (doc.meta.stack ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  const pageUrl = `${SITE_URL}/${locale}/casos/${slug}`;

  return (
    <article className="mx-auto max-w-3xl px-6 py-20 sm:py-28">
      <JsonLd
        data={articleSchema({
          headline: doc.meta.title,
          description: doc.meta.summary,
          url: pageUrl,
          image: `${pageUrl}/opengraph-image`,
          datePublished: doc.meta.date,
          section: "Case Study",
        })}
      />
      <Link
        href="/casos"
        className="font-mono text-[11px] uppercase tracking-[0.08em] text-subtle hover:text-foreground"
      >
        ← {locale === "es" ? "Casos" : "Cases"}
      </Link>

      <p className="mt-10 text-xs leading-relaxed text-muted">
        {doc.meta.label}
      </p>
      <h1 className="mt-3 font-display text-[2rem] leading-[1.15] font-medium tracking-[-0.02em] text-foreground sm:text-4xl">
        {doc.meta.title}
      </h1>

      <div className="mt-8 [&>p]:mt-5 [&>p]:text-[17px] [&>p]:leading-[1.7] [&>p]:text-muted">
        <MDXRemote source={doc.body} />
      </div>

      <div className="mt-10 flex flex-wrap gap-1.5">
        {tags.map((tg) => (
          <Tag key={tg}>{tg}</Tag>
        ))}
      </div>
      <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.08em] text-subtle">
        {doc.meta.status}
      </p>
    </article>
  );
}
