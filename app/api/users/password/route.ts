import { proxyJson } from "@/app/api/_lib/proxy";
import type { NextRequest } from "next/server";

export async function PUT(req: NextRequest) {
  const body = await req.json();
  return proxyJson(req, {
    path: "/users/password",
    method: "PUT",
    body: JSON.stringify(body),
  });
}
