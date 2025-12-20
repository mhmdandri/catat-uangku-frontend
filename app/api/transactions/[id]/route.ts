import { NextRequest } from "next/server";
import { proxyJson } from "../../_lib/proxy";

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  return proxyJson(req, { path: `/transactions/${id}`, method: "DELETE" });
}
