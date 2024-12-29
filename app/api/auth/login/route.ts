import { NextResponse } from "next/server";
import argon2 from "argon2";
import dbConnect from "@/utils/dbConnect";
import User from "@/models/User";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  await dbConnect();

  const user = await User.findOne({ email });
  if (!user) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  // Verify the password using Argon2
  const isValid = await argon2.verify(user.password, password);
  if (!isValid) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  // Set the cookie for authentication
  return NextResponse.json(
    { message: "Login successful" },
    {
      headers: {
        "Set-Cookie": `auth=true; Path=/; HttpOnly; Secure; SameSite=Strict`,
      },
    }
  );
}
