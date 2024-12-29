// app/api/volunteers/route.ts (or your actual file path)
import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import Volunteer from "@/models/Volunteer";

export async function POST(req: Request) {
  const { name, event, attendance } = await req.json();

  await dbConnect();

  const newVolunteer = new Volunteer({ name, event, attendance });
  await newVolunteer.save();

  return NextResponse.json({ message: "Volunteer added successfully", volunteer: newVolunteer });
}
