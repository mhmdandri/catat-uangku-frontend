import { NextResponse } from "next/server";

const BACKEND_BASE = process.env.NEXT_PUBLIC_API_URL!;
const USE_SECURE = process.env.NEXT_PUBLIC_USE_SECURE_COOKIE === "true";
const COOKIE_DOMAIN = process.env.NEXT_PUBLIC_COOKIE_DOMAIN || undefined;

export async function POST(req: Request) {
  const body = await req.json();

  const res = await fetch(`${BACKEND_BASE}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    cache: "no-store",
    credentials: "include",
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    return NextResponse.json(
      { error: data?.error ?? "login gagal" },
      { status: res.status }
    );
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
    const valueMatch = refreshSetCookie.match(/refresh_token=([^;]+)/);
    const maxAgeMatch = refreshSetCookie.match(/(?:^|;)\s*max-age=(\d+)/i);
    const rt = valueMatch?.[1];
    const maxAgeSeconds = maxAgeMatch ? Number(maxAgeMatch[1]) : 4 * 60 * 60;

    if (rt) {
      out.cookies.set("refresh_token", rt, {
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
