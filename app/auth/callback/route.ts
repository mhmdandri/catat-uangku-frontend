import { NextResponse, type NextRequest } from "next/server";

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

  const cookieHeader = req.headers.get("cookie") ?? "";
  const refreshMatch = cookieHeader.match(
    /(?:^|;\s*)refresh_token=([^;]+)/
  );
  const refreshTokenRaw = refreshMatch?.[1] ?? null;
  const refreshToken = refreshTokenRaw
    ? (() => {
        try {
          return decodeURIComponent(refreshTokenRaw);
        } catch {
          return refreshTokenRaw;
        }
      })()
    : null;

  if (!refreshToken) {
    return redirectWithError(url.origin, "refresh token tidak ada");
  }

  const res = await fetch(`${BACKEND_BASE}/auth/refresh`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Cookie: `refresh_token=${refreshToken}`,
    },
    cache: "no-store",
  });

  const data = (await res.json().catch(() => ({}))) as {
    access_token?: string;
    error?: string;
  };

  if (!res.ok || !data?.access_token) {
    const message = data?.error ?? "Login Google gagal";
    return redirectWithError(url.origin, message);
  }

  const out = NextResponse.redirect(new URL("/dashboard", url.origin));

  out.cookies.set("access_token", data.access_token, {
    httpOnly: true,
    sameSite: USE_SECURE ? "none" : "lax",
    secure: USE_SECURE,
    path: "/",
    maxAge: ACCESS_MAX_AGE,
  });

  const setCookies =
    (
      res.headers as Headers & { getSetCookie?: () => string[] }
    ).getSetCookie?.() ??
    (res.headers.get("set-cookie")
      ? [res.headers.get("set-cookie") as string]
      : []);

  const refreshSetCookie = setCookies.find((c) =>
    c.toLowerCase().includes("refresh_token=")
  );

  const valueMatch = refreshSetCookie?.match(/refresh_token=([^;]+)/);
  const maxAgeMatch = refreshSetCookie?.match(/(?:^|;)\s*max-age=(\d+)/i);
  const rotatedRefreshRaw =
    valueMatch?.[1] ?? req.cookies.get("refresh_token")?.value ?? null;
  const refreshMaxAge = maxAgeMatch ? Number(maxAgeMatch[1]) : 4 * 60 * 60;

  const rotatedRefresh = rotatedRefreshRaw
    ? (() => {
        try {
          return decodeURIComponent(rotatedRefreshRaw);
        } catch {
          return rotatedRefreshRaw;
        }
      })()
    : null;

  if (rotatedRefresh) {
    out.cookies.set("refresh_token", rotatedRefresh, {
      httpOnly: true,
      sameSite: USE_SECURE ? "none" : "lax",
      secure: USE_SECURE,
      path: "/",
      domain: COOKIE_DOMAIN,
      maxAge: refreshMaxAge,
    });
  }

  return out;
}
