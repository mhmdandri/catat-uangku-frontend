import { proxyJson } from "@/app/api/_lib/proxy";
import type { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  return proxyJson(req, {
    path: "/accounts",
    method: "POST",
    body: JSON.stringify(body),
  });
}
