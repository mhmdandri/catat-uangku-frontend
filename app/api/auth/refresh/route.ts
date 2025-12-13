import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const BACKEND_BASE = process.env.NEXT_PUBLIC_API_URL!;
const USE_SECURE = process.env.NEXT_PUBLIC_USE_SECURE_COOKIE === "true";
const COOKIE_DOMAIN = process.env.NEXT_PUBLIC_COOKIE_DOMAIN || undefined;

export async function POST() {
  const cookieStore = await cookies();
  const rtRaw = cookieStore.get("refresh_token")?.value;
  const rt = rtRaw
    ? (() => {
        try {
          return decodeURIComponent(rtRaw);
        } catch {
          return rtRaw;
        }
      })()
    : null;
  if (!rt) {
    return NextResponse.json(
      { error: "refresh token tidak ada" },
      { status: 401 }
    );
  }
  const res = await fetch(`${BACKEND_BASE}/auth/refresh`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Cookie: `refresh_token=${rt}`,
    },
    cache: "no-store",
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    const out = NextResponse.json(
      { error: data?.error ?? "refresh gagal" },
      { status: res.status }
    );
    out.cookies.set("access_token", "", {
      httpOnly: true,
      sameSite: USE_SECURE ? "none" : "lax",
      secure: USE_SECURE,
      path: "/",
      maxAge: 0,
    });
    out.cookies.set("refresh_token", "", {
      httpOnly: true,
      sameSite: USE_SECURE ? "none" : "lax",
      secure: USE_SECURE,
      path: "/",
      domain: COOKIE_DOMAIN,
      maxAge: 0,
    });
    return out;
  }

  const out = NextResponse.json({ ok: true });
  out.cookies.set("access_token", data.access_token, {
    httpOnly: true,
    sameSite: USE_SECURE ? "none" : "lax",
    secure: USE_SECURE,
    path: "/",
    maxAge: 15 * 60,
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

  if (refreshSetCookie) {
    const m = refreshSetCookie.match(/refresh_token=([^;]+)/);
    const maxAgeMatch = refreshSetCookie.match(/(?:^|;)\s*max-age=(\d+)/i);
    const newRt = m?.[1];
    const maxAgeSeconds = maxAgeMatch ? Number(maxAgeMatch[1]) : 4 * 60 * 60;

    if (newRt) {
      out.cookies.set("refresh_token", newRt, {
        httpOnly: true,
        sameSite: USE_SECURE ? "none" : "lax",
        secure: USE_SECURE,
        path: "/",
        domain: COOKIE_DOMAIN,
        maxAge: maxAgeSeconds,
      });
    }
  }

  return out;
}
