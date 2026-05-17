'use client';

import Image from 'next/image';

// Author contact card. Reworked to TheTreeWay's editorial identity
// (REFACTOR audit F1): the old build presented Rubén as a generic
// "Software Developer" with freelance styling, contradicting the
// boutique-firm-with-an-author positioning. Same design tokens as the
// main site (hairlines, serif display, mono accents, no rounded/glow).

const PHONE = '+584121010744';
const PHONE_DISPLAY = '+58 412-101-0744';
const WHATSAPP_URL = 'https://wa.me/584121010744';
const EMAIL = 'hola@thetreeway.com';

const SOCIALS = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/rubenbolivar/' },
  { label: 'GitHub', href: 'https://github.com/rubenbolivar' },
  { label: 'X', href: 'https://x.com/RubenBolivar' },
  { label: 'Instagram', href: 'https://www.instagram.com/rubenbolivar/' },
];

const SITE_LINKS = [
  { label: 'Inicio', href: '/es' },
  { label: 'Enfoque', href: '/es/enfoque' },
  { label: 'Equipo', href: '/es/equipo' },
  { label: 'Agendar', href: '/es/contacto' },
];

const VCARD = `BEGIN:VCARD
VERSION:3.0
N:Bolívar;Rubén;;;
FN:Rubén Bolívar
ORG:TheTreeWay
TITLE:Fundador y arquitecto principal
TEL;TYPE=CELL:${PHONE}
EMAIL;TYPE=WORK:${EMAIL}
URL:https://thetreeway.com
URL:https://www.linkedin.com/in/rubenbolivar/
URL:https://github.com/rubenbolivar
URL:https://x.com/RubenBolivar
URL:https://www.instagram.com/rubenbolivar/
NOTE:Firma boutique de arquitectura digital e IA aplicada para grupos empresariales en LatAm.
END:VCARD`;

export default function RubenBolivarCard() {
  const handleDownloadVCard = () => {
    const blob = new Blob([VCARD], { type: 'text/vcard;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'ruben-bolivar.vcf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const linkCls =
    'font-mono text-xs uppercase tracking-[0.08em] text-accent hover:underline underline-offset-4';

  return (
    <main className="min-h-screen bg-background px-6 py-16 text-foreground sm:py-24">
      <div className="mx-auto w-full max-w-xl border-hairline p-8 sm:p-12">
        <a
          href="/es"
          className="font-display text-lg font-medium tracking-[-0.01em] text-foreground"
        >
          TheTreeWay
        </a>
        <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.08em] text-subtle">
          Tarjeta de contacto
        </p>

        <header className="mt-10">
          <h1 className="font-display text-[2.25rem] leading-[1.1] font-medium tracking-[-0.02em] text-foreground sm:text-5xl">
            Rubén Bolívar
          </h1>
          <p className="mt-2 text-sm text-muted">
            Fundador y arquitecto principal
          </p>
          <p className="mt-5 max-w-md text-[15px] leading-[1.7] text-muted">
            Firma boutique de arquitectura digital e IA aplicada para grupos
            empresariales en Latinoamérica. Una sola arquitectura, una sola
            hoja de ruta, un solo responsable.
          </p>
        </header>

        <div className="mt-8 flex flex-col gap-1.5 font-mono text-sm">
          <a
            href={`tel:${PHONE}`}
            className="text-accent hover:underline underline-offset-4"
          >
            {PHONE_DISPLAY}
          </a>
          <a
            href={`mailto:${EMAIL}`}
            className="text-accent hover:underline underline-offset-4"
          >
            {EMAIL}
          </a>
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={handleDownloadVCard}
            className="bg-foreground px-5 py-3 text-center text-sm font-medium text-background transition-opacity hover:opacity-90"
          >
            Añadir a contactos
          </button>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="border-hairline px-5 py-3 text-center text-sm font-medium text-foreground transition-colors hover:border-accent"
          >
            Escribir por WhatsApp
          </a>
        </div>

        <div className="mt-10 border-hairline border-x-0 border-b-0 pt-8">
          <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-subtle">
            Escanee para guardar el contacto
          </p>
          <div className="mt-4 inline-block bg-white p-3">
            <Image
              src="/images/qr-code.png"
              alt="Código QR con los datos de contacto de Rubén Bolívar"
              width={180}
              height={180}
              className="object-contain"
            />
          </div>
        </div>

        <div className="mt-10 flex flex-wrap gap-x-6 gap-y-2">
          {SOCIALS.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className={linkCls}
            >
              {s.label}
            </a>
          ))}
        </div>

        <nav
          aria-label="TheTreeWay"
          className="mt-10 flex flex-wrap gap-x-6 gap-y-2 border-hairline border-x-0 border-b-0 pt-8"
        >
          {SITE_LINKS.map((l) => (
            <a key={l.href} href={l.href} className={linkCls}>
              {l.label}
            </a>
          ))}
        </nav>

        <p className="mt-10 text-xs text-subtle">
          © 2026 TheTreeWay. Hecho con cuidado en LatAm.
        </p>
      </div>
    </main>
  );
}
