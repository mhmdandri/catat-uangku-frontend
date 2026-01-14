import { NextRequest } from "next/server";
import { proxyJson } from "@/app/api/_lib/proxy";

export async function POST(req: NextRequest) {
  const body = await req.json();
  return proxyJson(req, {
    path: "/invitations",
    method: "POST",
    body: JSON.stringify(body),
  });
}
