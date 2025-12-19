import { NextResponse, type NextRequest } from "next/server";
import { cookies } from "next/headers";

const BACKEND_BASE = process.env.NEXT_PUBLIC_API_URL!;
const USE_SECURE = process.env.NEXT_PUBLIC_USE_SECURE_COOKIE === "true";
const COOKIE_DOMAIN = process.env.NEXT_PUBLIC_COOKIE_DOMAIN || undefined;

const ACCESS_MAX_AGE = 15 * 60;

const redirectWithError = (origin: string, message: string) => {
  const target = new URL("/auth", origin);
  target.searchParams.set("sign", "login");
  target.searchParams.set("error", message);
  return NextResponse.redirect(target);
};

export async function GET(req: NextRequest) {
  const url = req.nextUrl;
  const err = url.searchParams.get("error");
  if (err) return redirectWithError(url.origin, err);

  // Backend OAuth callback sudah set refresh_token cookie dan return access_token di response
  // Kita tidak perlu memanggil /auth/refresh lagi, cukup redirect ke dashboard
  // Cookie refresh_token sudah di-set oleh backend via Set-Cookie header

  const out = NextResponse.redirect(new URL("/dashboard", url.origin));

  // Cookie refresh_token sudah di-set oleh backend, tidak perlu set ulang di sini
  // Browser akan otomatis menyimpan cookie dari Set-Cookie header backend

  return out;
}
