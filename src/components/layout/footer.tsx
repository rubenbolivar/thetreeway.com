import { getTranslations } from "next-intl/server";
import { Link } from "../../i18n/navigation";
import { socialList } from "../../content/config/social";
import { BrandLogo } from "./brand-logo";

const NAV_ITEMS = [
  { key: "approach", href: "/enfoque" },
  { key: "model", href: "/modelo" },
  { key: "cases", href: "/casos" },
  { key: "insights", href: "/insights" },
  { key: "team", href: "/equipo" },
  { key: "contact", href: "/contacto" },
] as const;

const LEGAL_ITEMS = [
  { key: "privacy", href: "/privacidad" },
  { key: "terms", href: "/terminos" },
  { key: "attributions", href: "/atribuciones" },
] as const;

export async function Footer() {
  const tf = await getTranslations("footer");
  const tn = await getTranslations("nav");
  const ts = await getTranslations("footer_social");

  return (
    <footer className="border-hairline border-x-0 border-b-0 mt-24">
      <div className="mx-auto grid max-w-5xl gap-10 px-6 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-2">
          <BrandLogo
            variant="wordmark"
            label={tn("brand")}
            className="h-10 text-foreground"
          />
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted">
            {tf("tagline")}
          </p>
          <p className="mt-1 text-sm text-muted">{tf("location")}</p>
          <a
            href={`mailto:${tf("email")}`}
            className="mt-4 inline-block font-mono text-xs text-accent hover:underline underline-offset-4"
          >
            {tf("email")}
          </a>

          <p className="mt-8 font-sans text-[11px] font-medium uppercase tracking-[0.08em] text-subtle">
            {ts("title")}
          </p>
          <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-2">
            {socialList.map((s) => (
              <li key={s.key}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-xs text-muted transition-colors hover:text-foreground"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <nav aria-label="Footer">
          <p className="font-sans text-[11px] font-medium uppercase tracking-[0.08em] text-subtle">
            {tf("navTitle")}
          </p>
          <ul className="mt-4 space-y-2">
            {NAV_ITEMS.map((i) => (
              <li key={i.key}>
                <Link
                  href={i.href}
                  className="text-sm text-muted transition-colors hover:text-foreground"
                >
                  {tn(i.key)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Legal">
          <p className="font-sans text-[11px] font-medium uppercase tracking-[0.08em] text-subtle">
            {tf("legalTitle")}
          </p>
          <ul className="mt-4 space-y-2">
            {LEGAL_ITEMS.map((i) => (
              <li key={i.key}>
                <Link
                  href={i.href}
                  className="text-sm text-muted transition-colors hover:text-foreground"
                >
                  {tf(i.key)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="border-hairline border-x-0 border-b-0">
        <p className="mx-auto max-w-5xl px-6 py-6 text-xs text-subtle">
          {tf("rights")}
        </p>
      </div>
    </footer>
  );
}
