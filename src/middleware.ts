import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Match all paths except api, next internals, and static files.
  // /rubenbolivar stays outside the locale system (legacy route).
  matcher: ["/((?!api|_next|_vercel|rubenbolivar|.*\\..*).*)"],
};
