// app/api/volunteers/attendance/route.ts
import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import Volunteer from "@/models/Volunteer";
import { cors } from "@/lib/cors";  // Import CORS function

// Allow CORS handling before processing the request
export async function GET(req: Request) {
  const response = cors(req); // Check CORS before processing
  if (response) return response; // If there's a CORS error, return early

  await dbConnect();
  const volunteers = await Volunteer.find(); // Fetch all volunteers
  return NextResponse.json(volunteers);
}

export async function POST(req: Request) {
  const response = cors(req); // Check CORS before processing
  if (response) return response; // If there's a CORS error, return early

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