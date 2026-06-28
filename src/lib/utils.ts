import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Localized long date ("12 de mayo de 2026" / "May 12, 2026"). Falls back
// to the raw ISO string if it can't parse. Used for Insights listings &
// article headers (QA: ISO crudo no es presentación final).
export function formatDate(iso: string | undefined, locale: string): string {
  if (!iso) return '';
  const d = new Date(iso);
  if (isNaN(d.getTime())) return iso;
  const tag = locale === 'es' ? 'es-VE' : 'en-US';
  return new Intl.DateTimeFormat(tag, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  }).format(d);
}