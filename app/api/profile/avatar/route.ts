import { proxyJson } from "@/app/api/_lib/proxy";
import type { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  return proxyJson(req, {
    path: "/profile/avatar",
    method: "POST",
    body: formData,
    contentType: null,
  });
}
