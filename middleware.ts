import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { resolveLegacyProductRedirect } from "@/lib/legacy-product-redirects";

/**
 * Redirect garbage paths like `/$` and legacy e-commerce demo slugs.
 */
export function middleware(request: NextRequest) {
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
    "/\\$",
    "/%24",
    "/mower",
    "/ecoBright",
    "/ecoSmart",
    "/ecobright",
    "/ecosmart",
    "/Mower",
  ],
};
