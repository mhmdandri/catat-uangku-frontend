import { NextRequest } from "next/server";
import { proxyJson } from "../../_lib/proxy";

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  return proxyJson(req, { path: `/transactions/${id}`, method: "DELETE" });
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await req.json();
  return proxyJson(req, {
    path: `/transactions/${id}`,
    method: "PUT",
    body: JSON.stringify(body),
  });
}
