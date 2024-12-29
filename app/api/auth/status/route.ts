import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const cookies = req.headers.get("cookie");
  const isAuthenticated = cookies?.includes("auth=true");

  if (isAuthenticated) {
    return NextResponse.json({ authenticated: true });
  } else {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }
}
