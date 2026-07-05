import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Redirect garbage paths like `/$` that surface in GSC as 404s.
 * Often from regex-anchor typos or crawlers misparsing RSC flight `$` markers.
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (pathname === "/$" || pathname === "/%24") {
    const url = request.nextUrl.clone();
    url.pathname = "/";
    url.search = "";
    return NextResponse.redirect(url, 308);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/\\$", "/%24"],
};
