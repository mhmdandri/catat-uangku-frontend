import { proxyJson } from "@/app/api/_lib/proxy";
import type { NextRequest } from "next/server";

const getCookieFromHeader = (cookieHeader: string, name: string) => {
  const pattern = new RegExp(`(?:^|;\\s*)${name}=([^;]+)`);
  const match = cookieHeader.match(pattern);
  return match?.[1] ?? null;
};

const decodeUserIdFromToken = (token?: string | null) => {
  if (!token) return null;
  const parts = token.split(".");
  if (parts.length < 2) return null;
  try {
    const payload = JSON.parse(
      Buffer.from(parts[1], "base64").toString("utf8")
    ) as { sub?: string };
    return payload.sub ?? null;
  } catch {
    return null;
  }
};

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const cookieHeader = req.headers.get("cookie") ?? "";
  const accessToken =
    req.cookies.get("access_token")?.value ??
    getCookieFromHeader(cookieHeader, "access_token");

  const userIdFromToken = decodeUserIdFromToken(accessToken);
  const effectiveUserId = userIdFromToken ?? id;

  return proxyJson(req, { path: `/accounts/user/${effectiveUserId}` });
}
