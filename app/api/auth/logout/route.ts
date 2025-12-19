import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const BACKEND_BASE = process.env.NEXT_PUBLIC_API_URL!;
const USE_SECURE = process.env.NEXT_PUBLIC_USE_SECURE_COOKIE === "true";
const COOKIE_DOMAIN = process.env.NEXT_PUBLIC_COOKIE_DOMAIN || undefined;

export async function POST() {
  const cookieStore = await cookies();
  const rt = cookieStore.get("refresh_token")?.value;

  if (rt) {
    await fetch(`${BACKEND_BASE}/auth/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: `refresh_token=${rt}`,
      },
      cache: "no-store",
    }).catch(() => null);
  }

  const out = NextResponse.json({ ok: true });

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
