import "server-only";
import { cookies } from "next/headers";

const BACKEND_BASE = process.env.NEXT_PUBLIC_API_URL!;
const APP_URL = process.env.NEXT_PUBLIC_APP_URL!;

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

export class ServerApiError extends Error {
  status: number;
  data?: unknown;
  constructor(status: number, message: string, data?: unknown) {
    super(message);
    this.status = status;
    this.data = data;
  }
}

async function getAccessToken() {
  const cookieStore = await cookies();
  return cookieStore.get("access_token")?.value ?? null;
}

async function parseError(res: Response) {
  let data: unknown = undefined;
  try {
    data = await res.json();
  } catch {}
  const msg =
    (data as { error?: string; message?: string })?.error ||
    (data as { error?: string; message?: string })?.message ||
    res.statusText ||
    "Error";
  throw new ServerApiError(res.status, String(msg), data);
}

async function refresh() {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore
    .getAll()
    .map((c) => {
      const raw = c.value;
      let val = raw;
      try {
        val = decodeURIComponent(raw);
      } catch {
        val = raw;
      }
      return `${c.name}=${val}`;
    })
    .join("; ");

  const res = await fetch(`${APP_URL}/api/auth/refresh`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Cookie: cookieHeader,
    },
    cache: "no-store",
  });

  return res.ok;
}

async function doFetch(method: HttpMethod, path: string, body?: unknown) {
  const token = await getAccessToken();
  return fetch(`${BACKEND_BASE}${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: body === undefined ? undefined : JSON.stringify(body),
    cache: "no-store",
  });
}

async function serverRequest<T>(
  method: HttpMethod,
  path: string,
  body?: unknown
) {
  let res = await doFetch(method, path, body);

  if (res.status === 401) {
    const ok = await refresh();
    if (ok) {
      res = await doFetch(method, path, body);
    }
  }

  if (!res.ok) await parseError(res);
  if (res.status === 204) return undefined as unknown as T;
  return (await res.json()) as T;
}

export const serverGet = <T>(path: string) => serverRequest<T>("GET", path);
export const serverPost = <T, B = unknown>(path: string, body?: B) =>
  serverRequest<T>("POST", path, body);
export const serverPut = <T, B = unknown>(path: string, body?: B) =>
  serverRequest<T>("PUT", path, body);
export const serverDel = <T>(path: string) => serverRequest<T>("DELETE", path);
