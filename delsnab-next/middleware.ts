import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import redirects from "./data/redirects.json";

type RedirectRule = {
  from: string;
  to: string;
  permanent?: boolean;
};

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Trailing slash enforcement (backup for next.config trailingSlash)
  if (
    pathname.length > 1 &&
    !pathname.endsWith("/") &&
    !pathname.includes(".")
  ) {
    const url = request.nextUrl.clone();
    url.pathname = `${pathname}/`;
    return NextResponse.redirect(url, 301);
  }

  const rules = redirects as RedirectRule[];
  const rule = rules.find((r) => r.from === pathname);
  if (rule) {
    return NextResponse.redirect(new URL(rule.to, request.url), rule.permanent ? 301 : 302);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
