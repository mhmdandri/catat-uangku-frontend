import { proxyJson } from "../_lib/proxy";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  return proxyJson(req, {
    path: "/categories",
  });
}
