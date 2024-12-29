import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import Hall from "@/models/Hall";

export async function POST(req: Request) {
  const { name, capacity, status } = await req.json();

  await dbConnect();

  const existingHall = await Hall.findOne({ name });
  if (existingHall) {
    return NextResponse.json({ error: "Hall already exists." }, { status: 400 });
  }

  const hall = new Hall({ name, capacity, status });
  await hall.save();

  return NextResponse.json({ message: "Hall created successfully.", hall });
}
