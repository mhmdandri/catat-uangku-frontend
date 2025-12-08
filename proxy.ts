// proxy.ts
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const DASHBOARD_ROUTE = "/dashboard";
const LOGIN_ROUTE = "/auth";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const refreshToken = request.cookies.get("refresh_token")?.value;

  // If there is no refresh token cookie, block dashboard access and send to login
  if (!refreshToken && pathname.startsWith(DASHBOARD_ROUTE)) {
    const loginUrl = new URL(LOGIN_ROUTE, request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // If already authenticated, skip the login page
  if (refreshToken && pathname.startsWith(LOGIN_ROUTE)) {
    return NextResponse.redirect(new URL(DASHBOARD_ROUTE, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/auth/:path*"],
};
