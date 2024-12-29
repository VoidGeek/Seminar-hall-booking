import { NextResponse } from "next/server";
import argon2 from "argon2";
import dbConnect from "@/utils/dbConnect";
import User from "@/models/User";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  await dbConnect();

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return NextResponse.json({ error: "User already exists." }, { status: 400 });
  }

  const hashedPassword = await argon2.hash(password);
  const user = new User({ email, password: hashedPassword });

  await user.save();
  return NextResponse.json({ message: "User registered successfully." });
}
