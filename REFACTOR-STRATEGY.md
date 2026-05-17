# TheTreeWay — Refactor estratégico del sitio web

> **FUENTE ÚNICA DE VERDAD.** Antes de cada cambio estructural, volver a este
> archivo. Si el código existente contradice esto, gana este documento.
> (Documento entregado por Rubén Bolívar el 2026-05-17. No editar el contenido
> estratégico sin su confirmación; este archivo es copia de trabajo en el repo.)

## Estado de sprints (actualizar al cerrar cada uno)

- [ ] Sprint 0 — Auditoría y setup (EN CURSO)
- [ ] Sprint 1 — Cimientos visibles
- [ ] Sprint 2 — Secciones que cierran ventas (filter + model-diagram + casos)
- [ ] Sprint 3 — Profundidad (how-we-work, author, tech-stack, insights-preview)
- [ ] Sprint 4 — Páginas internas (MDX, casos, insights, enfoque, equipo)
- [ ] Sprint 5 — Conversión y SEO (contacto, API, OG, sitemap, JSON-LD, middleware)
- [ ] Sprint 6 — Calidad final (Lighthouse, a11y, schema, hreflang)

---

## 1. Posicionamiento

Firma boutique de arquitectura digital + IA aplicada para grupos empresariales
multimarca en LatAm. Autor visible (Rubén Bolívar). Caracas + NYC cross-border.
Tono editorial, consultor senior, sin sales-speak. Mercados complejos = activo.

**Audiencia:** C-level de conglomerados 3+ verticales; CTOs/Dir. Innovación de
empresas tradicionales (automotriz, agro, energía, retail, servicios); equipos
buscando segunda opinión sobre hojas de ruta fragmentadas.

**No-objetivos:** freelancers, pymes con landings baratas, "agencia de
desarrollo web".

## 2. Stack objetivo

next@15.x · react@19.x · typescript@5.x · tailwindcss@4.x · @next/mdx ·
contentlayer2 (o next-mdx-remote si falla con Next 15) · next-intl · zod ·
react-hook-form · resend · @vercel/og · schema-dts · lucide-react

**NO agregar:** Google Analytics (usar Plausible/Umami), chat widgets,
shadcn/ui completo, librerías de animación pesadas.

## 3. Sistema de diseño

- **font-display:** Source Serif 4 / Newsreader (hero, H1, H2, títulos caso)
- **font-sans:** Inter / General Sans (body, nav, UI)
- **font-mono:** JetBrains Mono / Geist Mono (stack tags, código)
- Escala: Hero H1 44-56px serif 500 tracking -0.02em lh 1.1 · H2 32-36px ·
  H3 22-24px · body grande 17px · body 14-15px lh 1.65 · eyebrow 11-12px
  500 ls 0.08em uppercase
- **Paleta:** blanco/negro/grises. Fondo #FFFFFF / #0A0A0A. Texto primario
  #171717 / #F5F5F4. Secundario #525252 / #A3A3A3. Terciario #A3A3A3 /
  #737373. Bordes #E5E5E5 / #262626 (0.5px SIEMPRE). Acento único verde
  botánico #1F4D3A (solo enlaces y CTA secundario; CTA primario negro).
- **Dark mode obligatorio** vía prefers-color-scheme. Toggle opcional,
  persistir en localStorage sin FOUC.
- Borders 0.5px siempre. Sin gradientes/shadows/glow. Whitespace generoso,
  densidad editorial. Sentence case siempre. Sin emojis en UI.

## 4. Estructura objetivo

```
app/[locale]/{layout,page}.tsx · enfoque · casos/{,[slug]} ·
insights/{,[slug]} · equipo · contacto · not-found
app/api/contact/route.ts · opengraph-image.tsx · sitemap.ts · robots.ts · globals.css
components/{layout,home,cases,insights,ui,seo}/
content/{cases,insights}/{es,en}/*.mdx · content/config/
lib/{content,i18n,utils}.ts · messages/{es,en}.json · middleware.ts
```

## 5. Copy maestro

Ver documento completo en el chat / pedir a Rubén si falta. Puntos clave:

- **Nav:** TheTreeWay | Enfoque · Casos · Insights · Equipo · Contacto · ES/EN
  (NUNCA "Servicios").
- **Hero ES:** eyebrow "Firma boutique · Caracas · Nueva York" / H1
  "Arquitectura digital para empresas que no caben en un template." /
  subtítulo + CTA primario "Solicitar diagnóstico" (negro→Cal.com) +
  secundario "Ver cómo trabajamos" (outline→/enfoque).
- **Hero EN:** "Boutique firm · Caracas · New York" / "Digital architecture
  for organizations that don't fit a template." / subtítulo equivalente.
- Credentials bar (4 col): Trabajamos con / Sectores / Mercados / Trayectoria.
- Filter section: "No somos para todo el mundo. Y eso es deliberado." (3 bullets).
- **Modelo 6 capas** (pieza central): "Una arquitectura, seis capas, una sola
  responsabilidad." SVG inline interactivo, click expande, keyboard a11y.
  Capas bottom-up: 1 Captura datos (gray) · 2 CRM golden record (teal) ·
  3 Contact center/comercial (teal) · 4 Data lake (blue) · 5 BI (blue) ·
  6 Capa agéntica (purple).
- Casos: layout editorial 3 filas (140px label · 1fr · 160px meta). 3 casos:
  01 Grupo multimarca Venezuela · 02 Fintech crédito vehicular · 03 Cross-border
  NYC↔LatAm aceite usado. Sin métricas infladas.
- Cómo trabajamos: 4 fases (Diagnóstico 2-4sem · Arquitectura 4-6sem ·
  Implementación 3-12m/capa · Operación continua).
- Sección autor: "La firma tiene un autor." Rubén Bolívar, fundador. 2 párrafos
  bio + cita blockquote serif italic.
- Tech stack: grid logos grayscale por categoría (Cloud/Datos/App/Plataformas/IA).
- Contacto: 2 caminos (diagnóstico Cal.com embed · consulta puntual form→Resend).
- Footer: copy definido, hola@thetreeway.com, "© 2026 TheTreeWay. Hecho con
  cuidado en LatAm."

## 6. SEO no negociable

- `generateMetadata` por ruta: title/description locale, canonical absoluto,
  alternates.languages (es/en/x-default→/es), OG completo, twitter card.
- JSON-LD: Organization (layout), Person (equipo), Article (casos/insights).
  Usar schema-dts.
- hreflang con x-default→/es obligatorio.
- sitemap.ts dinámico leyendo /content. robots.ts.
- @vercel/og dinámica por caso/artículo.
- Core Web Vitals: LCP<1.5s, INP<200ms, CLS<0.05. next/font, next/image
  priority hero, SVG+CSS+JS plain.

## 8. Principios de trabajo

- Antes de commit grande: plan en prosa, esperar confirmación. Reversible y
  pequeño → proceder.
- TS estricto, Server Components default, 'use client' solo con estado/eventos.
  Sin `any` sin razón. Commits semánticos.
- Texto largo en MDX /content; strings UI en /messages; un solo source of truth.
- Si librería falla → proponer alternativa razonada. Si diseño no encaja mobile
  → avisar. Incoherencia doc vs chat → preguntar.
- NO: "Servicios" en nav, "agencia" en copy, métricas infladas, emojis UI,
  GA, chat widgets, Title Case/ALL CAPS, shadows/gradientes, improvisar copy.

## 9. Variables de entorno

```
NEXT_PUBLIC_SITE_URL=https://thetreeway.com
RESEND_API_KEY=re_...
RESEND_FROM=hola@thetreeway.com
RESEND_TO=hola@thetreeway.com
CAL_COM_USERNAME=ruben-bolivar
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=thetreeway.com
```

---

## Notas de auditoría y decisiones (Sprint 0 — cerrado 2026-05-17)

### Decisiones confirmadas con Rubén

1. **Despliegue: Node server + PM2 + nginx** (no static export). Mismo patrón
   que theblacklion.fit (pm2 en puerto propio, nginx proxy). Habilita API
   routes, OG dinámico, SSR. → `next.config.ts` usa `output: "standalone"`.
2. **/rubenbolivar/**: se mantiene como ruta legacy fuera del sistema
   `[locale]` (vCard con QR ya distribuido). Excluida en `middleware.ts`,
   con su propio `src/app/rubenbolivar/layout.tsx` (html/body propio).
3. **Estructura `src/`**: se mantiene `src/app/` (no se migra a `app/` raíz).
   El doc §4 es guía conceptual; Next soporta ambos. Desviación anotada.

### Desviaciones técnicas vs §2 (razonadas)

- **@vercel/og NO se instala**: Next 15 incluye `next/og` (ImageResponse),
  mismo motor mantenido por Vercel, sin dependencia extra. Se usará en Sprint 5.
- **@next/mdx + contentlayer2/next-mdx-remote**: se instalan en Sprint 4
  (al configurar MDX), no en Sprint 0, para evitar dependencias huérfanas.
  Decisión contentlayer2 vs next-mdx-remote se toma en Sprint 4 (contentlayer2
  tiene fricción conocida con Next 15 — probable next-mdx-remote).
- **next-intl**: estructura oficial v4 en `src/i18n/{routing,request,navigation}.ts`
  + `src/middleware.ts`, en vez de `lib/i18n.ts` del doc §4. Es la convención
  soportada de la librería; equivalente funcional.
- **class-variance-authority**: se mantiene (ligero, para variantes de Button
  en Sprint 1). No contradice §2 (no es shadcn completo).

### Tabla rescata / reescribe / borra

- **Rescata**: stack base (ya en versión objetivo), `src/lib/utils.ts`,
  `src/app/rubenbolivar/*`, `favicon.ico`, `.github/workflows/deploy.yml`
  (se ADAPTA al lanzar).
- **Reescribe**: rutas → `src/app/[locale]/`, `layout.tsx` (root passthrough +
  [locale] con fonts/provider), `globals.css` (design tokens), `messages/*`
  (copy maestro nuevo — Sprint 1+), `lib/metadata.ts`, `sitemap.ts`, `robots.ts`.
- **Borrado en este branch**: `src/app/{es,en}/`, `page-original-backup.tsx`,
  `MaintenancePage.tsx`, `ParticleBackground.tsx`, deps framer-motion /
  negotiator / @formatjs/intl-localematcher.

### Plan de cambio de CI/CD (ejecutar SOLO al lanzar, post Sprint 6)

Actual: `.github/workflows/deploy.yml` hace `next build` (static export) →
sube `out/` a `/var/www/thetreeway.com/` → nginx sirve estático.

Objetivo (patrón theblacklion.fit):
1. `npm ci && npm run build` (genera `.next/standalone`).
2. Empaquetar y `scp` al VPS; extraer en `/var/www/thetreeway.com/` (o
   `/opt/thetreeway`).
3. `pm2 reload` de un proceso `thetreeway` en un **puerto propio libre**
   (3000=restaurant-scraper, 3002=black-lion-empire → usar p.ej. **3003**).
4. nginx: cambiar el `server` de `thetreeway.com` de `root` estático a
   `proxy_pass http://127.0.0.1:3003` (como rest-data / theblacklion).
5. Smoke test con rollback atómico (mismo esquema que el deploy actual).

**No se toca producción hasta el lanzamiento.** `main` sigue en modo
mantenimiento (static). El branch `refactor-2026` no se despliega
(CI/CD solo despliega `main`).

### Activos extraídos de la página de mantenimiento (para Sprint 1/3)

- **Logo**: `/images/tree-logo.png` (PNG 5000×5000, 596 KB — pesado;
  conseguir/optimizar SVG para LCP). Fallback placeholder existe en el CSS viejo.
- **Redes (cuentas PERSONALES de Rubén, decidir uso firma vs autor en Sprint 1/3)**:
  - GitHub: https://github.com/rubenbolivar
  - LinkedIn: https://www.linkedin.com/in/rubenbolivar/
  - Twitter/X: https://x.com/RubenBolivar
  - Instagram: https://www.instagram.com/rubenbolivar/
  - WhatsApp: https://wa.me/584121010744 (+58 412-101-0744)
  - Pendiente preguntar a Rubén: ¿la firma usa cuentas propias + correo
    `hola@thetreeway.com`, y estas quedan solo en sección autor/equipo?

### Copy viejo respaldado

`_legacy-content/{es,en}.legacy.json` (gitignored) — namespaces viejos
(nav/hero/about/services/process/portfolio/technologies/testimonials/
contact/footer/common). Referencia histórica; el copy nuevo viene del §5.

### Estado de archivos creados en Sprint 0

`next.config.ts` (standalone+intl) · `src/i18n/{routing,request,navigation}.ts`
· `src/middleware.ts` · `src/lib/fonts.ts` · `src/app/globals.css` (tokens) ·
`src/app/layout.tsx` (passthrough) · `src/app/[locale]/{layout,page}.tsx`
(placeholder) · `src/app/rubenbolivar/layout.tsx` · `src/messages/{es,en}.json`
(mínimos) · `.env.example` + `.env.local`.
