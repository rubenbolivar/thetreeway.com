import { NextResponse, type NextRequest } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

// Explicit 301s from old URLs. The previous site used
// `trailingSlash: true`; the new one does not — old indexed URLs like
// /es/ or /en/casos/ must 301 to the non-slash form. Specific path
// renames go in REDIRECTS (extend from Search Console export when
// available — REFACTOR §7.5; not improvised).
const REDIRECTS: Record<string, string> = {
  // "/old-path": "/es/new-path",
};

export default function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // 1. Exact legacy renames.
  if (REDIRECTS[pathname]) {
    const url = req.nextUrl.clone();
    url.pathname = REDIRECTS[pathname];
    return NextResponse.redirect(url, 301);
  }

  // 2. Legacy trailing slash → canonical no-slash (301).
  if (pathname.length > 1 && pathname.endsWith("/")) {
    const url = req.nextUrl.clone();
    url.pathname = pathname.replace(/\/+$/, "");
    return NextResponse.redirect(url, 301);
  }

  // 3. Locale routing (next-intl).
  return intlMiddleware(req);
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|rubenbolivar|.*\\..*).*)"],
};
