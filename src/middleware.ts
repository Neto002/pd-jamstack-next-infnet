import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const session = request.cookies.get("session")?.value;

  const publicPaths = ["/login", "/api", "/_next", "/static"];

  // allow requests to public assets and API to proceed
  if (publicPaths.some((p) => request.nextUrl.pathname.startsWith(p))) {
    return NextResponse.next();
  }

  if (
    !session &&
    (request.nextUrl.pathname === "/" ||
      request.nextUrl.pathname === "/carros" ||
      request.nextUrl.pathname === "/sobre" ||
      request.nextUrl.pathname === "/contato")
  ) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (session && request.nextUrl.pathname === "/login") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/carros", "/sobre", "/contato", "/login"],
};
