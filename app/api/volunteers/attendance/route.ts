import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import Volunteer from "@/models/Volunteer";

export async function GET() {
  await dbConnect();
  const volunteers = await Volunteer.find(); // Fetch all volunteers
  return NextResponse.json(volunteers);
}

export async function POST(req: Request) {
  const { volunteerId } = await req.json();
  await dbConnect();

  const volunteer = await Volunteer.findById(volunteerId);
  if (!volunteer) {
    return NextResponse.json({ error: "Volunteer not found" }, { status: 404 });
  }

  volunteer.attendance = true; // Mark attendance as present
  await volunteer.save();

  return NextResponse.json({ message: "Attendance marked successfully" });
}
