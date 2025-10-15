# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

TheTreeWay Website - A bilingual (Spanish/English) portfolio and landing page built with Next.js 15, TypeScript, and Tailwind CSS. The project uses static site generation for VPS deployment and features a maintenance mode toggle.

**Primary working directory:** `thetreeway-website/`

**Repository:** https://github.com/rubenbolivar/thetreeway.com.git

## Common Commands

### Development
```bash
cd thetreeway-website
npm run dev          # Start development server at http://localhost:3000
npm run build        # Build for production (generates static export in out/)
npm run start        # Start production server (not used for static export)
npm run lint         # Run ESLint
```

### Git Operations
```bash
cd thetreeway-website
git status           # Check repository status
git add .            # Stage all changes
git commit -m "..."  # Commit with message
git push             # Push to GitHub
git pull             # Pull latest changes
```

### Deployment
```bash
# Build and deploy (use the provided deploy.sh script)
cd thetreeway-website
./deploy.sh          # Creates thetreeway-website.tar.gz for VPS upload

# Manual deployment via SSH (credentials in MAINTENANCE_MODE.md)
npm run build
sshpass -p 'PASSWORD' scp -o StrictHostKeyChecking=no -r out/* root@66.29.133.107:/var/www/thetreeway.com/
```

### Build Output
- Static export configured (`output: 'export'` in next.config.ts)
- Build output directory: `out/`
- Images are unoptimized for static compatibility
- Trailing slashes enabled for better static hosting

## Architecture

### Internationalization (i18n)
- **Locales:** Spanish (default, `/`) and English (`/en/`)
- **Structure:** Route-based localization using Next.js App Router
  - `src/app/es/page.tsx` - Spanish homepage
  - `src/app/en/page.tsx` - English homepage
- **Translation files:** `src/messages/es.json` and `src/messages/en.json`
- **Library:** next-intl (v4.3.4)
- **Metadata:** Localized SEO metadata generated via `src/lib/metadata.ts`
  - Includes OpenGraph, Twitter cards, and hreflang tags
  - Automatic canonical URLs for each locale

### Maintenance Mode System
A toggleable maintenance page that preserves the original site content:

**How it works:**
1. Set `MAINTENANCE_MODE: 'true'` or `'false'` in `next.config.ts` env section
2. Both `src/app/es/page.tsx` and `src/app/en/page.tsx` check this flag
3. If true, renders `MaintenancePage.tsx` component; otherwise shows full site
4. Original site content remains intact in the page files (never delete it)

**Key files:**
- `src/components/MaintenancePage.tsx` - Animated maintenance page with particle background
- `src/components/ParticleBackground.tsx` - Canvas animation component
- `MAINTENANCE_MODE.md` - Detailed documentation on maintenance mode
- `MAINTENANCE_QUICK_GUIDE.md` - Quick reference guide

**To toggle:**
```typescript
// In next.config.ts
env: {
  MAINTENANCE_MODE: 'true',  // Show maintenance page
  // or
  MAINTENANCE_MODE: 'false', // Show full website
}
```

### Styling System
- **Framework:** Tailwind CSS v4 with PostCSS
- **Custom theme:** Extended in `tailwind.config.ts`
  - Primary color: Green (#22c55e) representing growth
  - Custom animations: fade-in, slide-up, slide-in-left/right, scale-in, float
  - Extended spacing, shadows, and border-radius utilities
- **Global styles:** `src/app/globals.css`
- **Animations:** Framer Motion (v12.23.6) for advanced animations

### Project Structure
```
thetreeway-website/
├── src/
│   ├── app/
│   │   ├── es/           # Spanish route
│   │   ├── en/           # English route
│   │   ├── layout.tsx    # Root layout
│   │   ├── globals.css   # Global styles
│   │   ├── robots.ts     # Dynamic robots.txt
│   │   └── sitemap.ts    # Dynamic sitemap
│   ├── components/
│   │   ├── MaintenancePage.tsx       # Maintenance mode page
│   │   └── ParticleBackground.tsx    # Canvas particle animation
│   ├── lib/
│   │   ├── metadata.ts   # SEO metadata generator
│   │   └── utils.ts      # Utility functions (cn for className merging)
│   ├── messages/
│   │   ├── es.json       # Spanish translations
│   │   └── en.json       # English translations
│   └── hooks/            # React hooks directory
├── public/
│   └── images/
│       └── tree-logo.png # Company logo (5000x5000px)
├── .github/
│   └── workflows/
│       └── deploy.yml    # CI/CD workflow (builds artifacts, runs Lighthouse)
├── next.config.ts        # Next.js config (static export, maintenance mode flag)
├── tailwind.config.ts    # Tailwind theme customization
└── tsconfig.json         # TypeScript configuration
```

## Key Technical Details

### Static Export Configuration
The site is configured for static HTML export:
- `output: 'export'` in next.config.ts
- `trailingSlash: true` for consistent URLs
- `images.unoptimized: true` (Next.js Image optimization disabled)
- No server-side features (API routes, ISR, SSR)

### Form Validation
- **Library:** React Hook Form (v7.60.0) with Zod validation (v4.0.5)
- **Resolver:** @hookform/resolvers for Zod integration
- Contact forms use schema validation (implementation in messages/*.json)

### Environment Variables
Set in `next.config.ts` env block:
- `SITE_URL`: https://thetreeway.com
- `DEFAULT_LOCALE`: es
- `MAINTENANCE_MODE`: 'true' | 'false'

### CI/CD Pipeline
GitHub Actions workflow (`.github/workflows/deploy.yml`):
1. Runs on push/PR to main/master
2. Installs dependencies with `npm ci`
3. Builds production bundle
4. Creates deployment tarball
5. Uploads artifacts (30 day retention)
6. Runs Lighthouse CI on PRs
7. Optional VPS deployment (commented out, manual deployment preferred)

### SEO Features
- Dynamic robots.txt and sitemap generation
- Comprehensive metadata with OpenGraph and Twitter cards
- Hreflang tags for language alternatives
- Optimized for Lighthouse scores (95+ target)
- WCAG accessibility compliance

## Development Guidelines

### When Modifying Pages
- **Never delete** original site content from `src/app/es/page.tsx` or `src/app/en/page.tsx`
- Keep the maintenance mode conditional check at the top of page components
- Both language versions should have feature parity

### When Working with Translations
- Update both `es.json` and `en.json` simultaneously
- Maintain identical JSON structure across locales
- Translation keys are nested by section (nav, hero, about, services, etc.)

### When Changing Styles
- Prefer Tailwind utilities over custom CSS
- Use custom animations defined in tailwind.config.ts
- Primary brand color is green-600, use consistently
- Test responsive breakpoints (mobile-first approach)

### When Deploying
1. Always run `npm run build` locally first to check for errors
2. Test the build in `out/` directory
3. Use the deploy script or manual SCP command
4. Server details in MAINTENANCE_MODE.md (sensitive info)
5. Backups are stored on VPS at `/root/backups/`

### TypeScript Configuration
- Strict mode enabled
- ES2022 target
- Path aliases configured for `@/` imports
- Build errors are NOT ignored (`typescript.ignoreBuildErrors: false`)
- ESLint errors ARE ignored during builds (`eslint.ignoreDuringBuilds: true`)

## Component Patterns

### Maintenance Page
- Self-contained with all styles and logic
- Includes animated particle background (canvas-based)
- WhatsApp floating button preserved (+584121010744)
- Handles logo loading errors with fallback placeholder

### Metadata Generation
Use the `generateMetadata()` function from `src/lib/metadata.ts`:
```typescript
import { generateMetadata } from '@/lib/metadata';

export const metadata = generateMetadata('es'); // or 'en'
```

### Utility Functions
- `cn()` from `src/lib/utils.ts` - Merges Tailwind classes with clsx and tailwind-merge
- Use for conditional className application

## Important Notes

- Node.js 18+ required
- Package manager: npm (package-lock.json present)
- No test suite configured (tests are skipped in CI)
- Images must be in public/images/ directory
- WhatsApp contact number: +584121010744
- VPS IP: 66.29.133.107 (do not commit credentials)
- Production URL: https://thetreeway.com
- Other sites on same VPS: admin.rogers-green.us, queenr.net, rogers-green.us (do not modify)
