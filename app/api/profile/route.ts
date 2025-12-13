import { proxyJson } from "@/app/api/_lib/proxy";
import type { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  return proxyJson(req, { path: "/profile" });
}

export async function PUT(req: NextRequest) {
  const body = await req.json();
  return proxyJson(req, {
    path: "/profile",
    method: "PUT",
    body: JSON.stringify(body),
  });
}
