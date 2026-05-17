import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Link } from "../../i18n/navigation";
import { getDoc } from "../../lib/content";

// Shared renderer for the three legal routes (privacidad / terminos /
// atribuciones). Content lives in src/content/legal/{locale}/{slug}.mdx
// — single source of truth, same MDX pipeline as insights.
export async function LegalArticle({
  locale,
  slug,
}: {
  locale: string;
  slug: string;
}) {
  setRequestLocale(locale);
  const doc = getDoc("legal", locale, slug);
  if (!doc) notFound();

  // gray-matter parses an unquoted YAML `date:` into a JS Date; coerce
  // to a YYYY-MM-DD string (a Date can't be a React child).
  const dateStr = doc.meta.date
    ? new Date(doc.meta.date as unknown as string).toISOString().slice(0, 10)
    : null;

  return (
    <article className="mx-auto max-w-3xl px-6 py-20 sm:py-28">
      <Link
        href="/"
        className="font-mono text-[11px] uppercase tracking-[0.08em] text-subtle hover:text-foreground"
      >
        ← TheTreeWay
      </Link>
      <h1 className="mt-10 font-display text-[2rem] leading-[1.15] font-medium tracking-[-0.02em] text-foreground sm:text-4xl">
        {doc.meta.title}
      </h1>
      {dateStr ? (
        <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.08em] text-subtle">
          {String(doc.meta.updatedLabel ?? "")} {dateStr}
        </p>
      ) : null}
      <div className="mt-8 [&>h2]:mt-12 [&>h2]:font-display [&>h2]:text-xl [&>h2]:font-medium [&>h2]:text-foreground [&>p]:mt-5 [&>p]:text-[15px] [&>p]:leading-[1.7] [&>p]:text-muted sm:[&>p]:text-[17px] [&>ul]:mt-4 [&>ul]:list-disc [&>ul]:space-y-1.5 [&>ul]:pl-5 [&>ul>li]:text-[15px] [&>ul>li]:leading-[1.7] [&>ul>li]:text-muted sm:[&>ul>li]:text-[17px] [&_a]:text-accent [&_a]:underline [&_a]:underline-offset-4">
        <MDXRemote source={doc.body} />
      </div>
    </article>
  );
}
