import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const BACKEND_BASE = process.env.NEXT_PUBLIC_API_URL!;
const USE_SECURE = process.env.NEXT_PUBLIC_USE_SECURE_COOKIE === "true";
const COOKIE_DOMAIN = process.env.NEXT_PUBLIC_COOKIE_DOMAIN || undefined;

export async function POST(request: Request) {
  const cookieStore = await cookies();
  const rtRaw = cookieStore.get("refresh_token")?.value;

  if (!rtRaw) {
    return NextResponse.json(
      { error: "refresh token tidak ada" },
      { status: 401 }
    );
  }

  // Jangan decode - kirim langsung seperti yang ada di cookie
  const res = await fetch(`${BACKEND_BASE}/auth/refresh`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Cookie: `refresh_token=${rtRaw}`,
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

  // Refresh token TIDAK berubah (no rotation), tidak perlu di-set ulang
  console.log(
    "DEBUG [refresh/route.ts]: Access token baru di-set, refresh token tetap sama"
  );

  return out;
}
