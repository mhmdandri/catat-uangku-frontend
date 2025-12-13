import { proxyJson } from "@/app/api/_lib/proxy";
import type { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ accountId: string }> }
) {
  const { accountId } = await params;
  return proxyJson(req, { path: `/transactions/account/${accountId}` });
}
