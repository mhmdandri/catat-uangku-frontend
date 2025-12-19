import { proxyJson } from "../_lib/proxy";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  return proxyJson(req, {
    path: `/transactions`,
    method: "POST",
    body: JSON.stringify(body),
  });
}
