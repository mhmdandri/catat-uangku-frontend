import { NextRequest } from "next/server";
import { proxyJson } from "@/app/api/_lib/proxy";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const query = req.nextUrl.search;
  return proxyJson(req, { path: `/transactions/user/${id}${query}` });
}
