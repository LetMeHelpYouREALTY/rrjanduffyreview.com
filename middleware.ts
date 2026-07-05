import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { CANONICAL_HOST, isApexHost } from "@/lib/canonical-host";
import { resolveLegacyProductRedirect } from "@/lib/legacy-product-redirects";

function requestHostname(request: NextRequest): string {
  const host =
    request.headers.get("x-forwarded-host") ??
    request.headers.get("host") ??
    "";
  return host.split(":")[0]!.toLowerCase();
}

/**
 * Edge redirects: apex → www (308), legacy demo slugs, garbage paths.
 */
export function middleware(request: NextRequest) {
  const hostname = requestHostname(request);

  if (isApexHost(hostname)) {
    const dest = request.nextUrl.clone();
    dest.hostname = CANONICAL_HOST;
    dest.protocol = "https:";
    return NextResponse.redirect(dest, 308);
  }

  const { pathname } = request.nextUrl;

  if (pathname === "/$" || pathname === "/%24") {
    const url = request.nextUrl.clone();
    url.pathname = "/";
    url.search = "";
    return NextResponse.redirect(url, 308);
  }

  const legacyTarget = resolveLegacyProductRedirect(pathname);
  if (legacyTarget) {
    const url = request.nextUrl.clone();
    url.pathname = legacyTarget;
    url.search = "";
    return NextResponse.redirect(url, 308);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * All paths except static assets — required so apex-host redirect runs on `/`.
     */
    "/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|woff2?)$).*)",
  ],
};
