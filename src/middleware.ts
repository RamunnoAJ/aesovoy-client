import { auth } from "@/auth";
import { NextResponse } from "next/server";

const PUBLIC_ROUTES = ["/login", "/google-login"];

export default auth((req) => {
  if (!req.auth && !PUBLIC_ROUTES.includes(req.nextUrl.pathname)) {
    const loginUrl = new URL("/login", req.nextUrl.origin);
    return Response.redirect(loginUrl);
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
