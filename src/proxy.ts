import { NextRequest, NextResponse } from "next/server";

export const proxy = (request: NextRequest) => {
  const session = request.cookies.get("session");

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
};

export const config = {
  matcher: ["/:path*", "/login"],
};
