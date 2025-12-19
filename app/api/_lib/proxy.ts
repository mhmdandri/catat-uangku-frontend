import "server-only";
import { NextRequest, NextResponse } from "next/server";
import type { ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies";

const BACKEND_BASE = process.env.NEXT_PUBLIC_API_URL!;
const USE_SECURE = process.env.NEXT_PUBLIC_USE_SECURE_COOKIE === "true";
const COOKIE_DOMAIN = process.env.NEXT_PUBLIC_COOKIE_DOMAIN || undefined;

const ACCESS_MAX_AGE = 15 * 60;
//const REFRESH_MAX_AGE = 7 * 24 * 60 * 60;

type CookieMutation = {
  name: string;
  value: string;
  options: Omit<ResponseCookie, "name" | "value">;
};

type ProxyOptions = {
  path: string;
  method?: "GET" | "POST" | "PUT" | "DELETE";
  body?: BodyInit | null;
  headers?: HeadersInit;
  auth?: boolean;
  contentType?: string | null;
  forwardSetCookies?: boolean;
};

const getCookieFromHeader = (cookieHeader: string, name: string) => {
  const pattern = new RegExp(`(?:^|;\\s*)${name}=([^;]+)`);
  const match = cookieHeader.match(pattern);
  return match?.[1] ?? null;
};

// const decodeCookieValue = (val: string | null | undefined) => {
//   if (!val) return null;
//   try {
//     return decodeURIComponent(val);
//   } catch {
//     return val;
//   }
// };

const getCookieValue = (req: NextRequest, cookieHeader: string, name: string) =>
  req.cookies.get(name)?.value ?? getCookieFromHeader(cookieHeader, name);

const baseCookieOptions: Omit<ResponseCookie, "name" | "value"> = {
  httpOnly: true,
  sameSite: USE_SECURE ? "none" : "lax",
  secure: USE_SECURE,
  path: "/",
  ...(COOKIE_DOMAIN ? { domain: COOKIE_DOMAIN } : {}),
};

const tokenCookie = (
  maxAge: number
): Omit<ResponseCookie, "name" | "value"> => ({
  ...baseCookieOptions,
  maxAge,
});

const clearTokenCookie = (name: string): CookieMutation => ({
  name,
  value: "",
  options: { ...baseCookieOptions, maxAge: 0 },
});

// const extractCookie = (setCookieHeader: string, name: string) => {
//   const m = setCookieHeader.match(new RegExp(`${name}=([^;]+)`));
//   return m?.[1] ?? null;
// };

const getSetCookieHeaders = (headers: Headers) => {
  const h = headers as Headers & { getSetCookie?: () => string[] };
  const cookies = h.getSetCookie?.();
  if (cookies?.length) return cookies;
  const raw = headers.get("set-cookie");
  return raw ? [raw] : [];
};

async function refreshTokens(
  req: NextRequest,
  cookieHeader: string
): Promise<{
  ok: boolean;
  accessToken?: string;
  cookies: CookieMutation[];
}> {
  const refreshToken = getCookieValue(req, cookieHeader, "refresh_token");
  if (!refreshToken) {
    return {
      ok: false,
      cookies: [
        clearTokenCookie("access_token"),
        clearTokenCookie("refresh_token"),
      ],
    };
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
  };

  if (!res.ok || !data?.access_token) {
    return {
      ok: false,
      cookies: [
        clearTokenCookie("access_token"),
        clearTokenCookie("refresh_token"),
      ],
    };
  }

  // Refresh token TIDAK di-rotate, jadi hanya set access token baru
  const cookiesToSet: CookieMutation[] = [
    {
      name: "access_token",
      value: data.access_token,
      options: tokenCookie(ACCESS_MAX_AGE),
    },
  ];

  return { ok: true, accessToken: data.access_token, cookies: cookiesToSet };
}

export async function proxyJson(req: NextRequest, opts: ProxyOptions) {
  const {
    path,
    method = req.method as ProxyOptions["method"],
    body,
    headers: headerInit,
    auth = true,
    contentType,
    forwardSetCookies = false,
  } = opts;

  if (!BACKEND_BASE) {
    return NextResponse.json(
      { error: "BACKEND_BASE belum diset" },
      { status: 500 }
    );
  }

  const headers = new Headers(headerInit);
  const shouldSetContentType =
    contentType !== null &&
    body !== undefined &&
    !(body instanceof FormData) &&
    !headers.has("Content-Type");

  if (shouldSetContentType) {
    headers.set("Content-Type", contentType ?? "application/json");
  } else if (typeof contentType === "string") {
    headers.set("Content-Type", contentType);
  }

  const cookieHeader = req.headers.get("cookie") ?? "";
  const accessToken = auth
    ? getCookieValue(req, cookieHeader, "access_token")
    : null;

  const doFetch = async (token?: string | null) => {
    const h = new Headers(headers);
    if (auth && token) h.set("Authorization", `Bearer ${token}`);
    return fetch(`${BACKEND_BASE}${path}`, {
      method,
      headers: h,
      body: body ?? null,
      cache: "no-store",
    });
  };

  let backendRes: Response;
  try {
    backendRes = await doFetch(accessToken);
  } catch (err) {
    return NextResponse.json(
      { error: "gagal menghubungi backend", detail: String(err) },
      { status: 502 }
    );
  }
  const cookieMutations: CookieMutation[] = [];

  if (auth && backendRes.status === 401) {
    const refreshed = await refreshTokens(req, cookieHeader);
    cookieMutations.push(...refreshed.cookies);
    if (refreshed.ok && refreshed.accessToken) {
      backendRes = await doFetch(refreshed.accessToken);
    } else if (!backendRes.ok) {
      const out = NextResponse.json(
        { error: "Unauthorized" },
        { status: backendRes.status }
      );
      cookieMutations.forEach((c) =>
        out.cookies.set(c.name, c.value, c.options)
      );
      return out;
    }
  }

  if (backendRes.status === 204) {
    const out = new NextResponse(null, { status: backendRes.status });
    cookieMutations.forEach((c) => out.cookies.set(c.name, c.value, c.options));
    if (forwardSetCookies) {
      getSetCookieHeaders(backendRes.headers).forEach((c) =>
        out.headers.append("set-cookie", c)
      );
    }
    return out;
  }

  const text = await backendRes.text();
  let data: unknown = {};
  if (text) {
    try {
      data = JSON.parse(text) as unknown;
    } catch {
      data = text;
    }
  }

  const out = NextResponse.json(data, { status: backendRes.status });
  cookieMutations.forEach((c) => out.cookies.set(c.name, c.value, c.options));
  if (forwardSetCookies) {
    getSetCookieHeaders(backendRes.headers).forEach((c) =>
      out.headers.append("set-cookie", c)
    );
  }

  return out;
}
