import { NextResponse, type NextRequest } from "next/server";

const redirectWithError = (origin: string, message: string) => {
  const target = new URL("/auth", origin);
  target.searchParams.set("sign", "login");
  target.searchParams.set("error", message);
  return NextResponse.redirect(target);
};

export async function GET(req: NextRequest) {
  const url = req.nextUrl;
  const err = url.searchParams.get("error");
  if (err) return redirectWithError(url.origin, err);
  const out = NextResponse.redirect(new URL("/dashboard", url.origin));
  return out;
}
