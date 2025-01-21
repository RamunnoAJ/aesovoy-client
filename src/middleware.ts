import { auth } from "@/auth";
import { NextResponse } from "next/server";

const PUBLIC_ROUTES = ["/login", "/google-login", "/api/auth/set-token"];

export default auth((req) => {
  if (!req.auth && !PUBLIC_ROUTES.includes(req.nextUrl.pathname)) {
    const loginUrl = new URL("/login", req.nextUrl.origin);
    return Response.redirect(loginUrl);
  }

  if (req.auth && PUBLIC_ROUTES.includes(req.nextUrl.pathname)) {
    const dashboardUrl = new URL("/", req.nextUrl.origin);
    return Response.redirect(dashboardUrl);
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
  api: {
    bodyParser: true,
  },
};
