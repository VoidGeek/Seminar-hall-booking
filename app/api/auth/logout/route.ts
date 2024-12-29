import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json(
    { message: "Logged out successfully" },
    {
      headers: {
        "Set-Cookie": "auth=; Path=/; Max-Age=0; HttpOnly; Secure; SameSite=Strict",
      },
    }
  );
}
