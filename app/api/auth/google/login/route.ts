import { proxyJson } from "@/app/api/_lib/proxy";
import type { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const search = req.nextUrl.search;
  return proxyJson(req, {
    path: `/auth/google/login${search}`,
    method: "GET",
    auth: false,
    forwardSetCookies: true,
  });
}
