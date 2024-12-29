import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import Hall from "@/models/Hall";

export async function POST(req: Request) {
  const { name } = await req.json(); // Extract the hall name from the request body

  await dbConnect(); // Connect to the database

  // Check if the hall already exists
  const existingHall = await Hall.findOne({ name });
  if (existingHall) {
    return NextResponse.json({ error: "Hall already exists." }, { status: 400 });
  }

  // Create a new hall
  const hall = new Hall({
    name,
  });

  await hall.save();

  return NextResponse.json({ message: "Hall created successfully.", hall });
}
