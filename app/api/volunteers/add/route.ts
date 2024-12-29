// app/api/volunteers/route.ts (or your actual file path)
import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import Volunteer from "@/models/Volunteer";
import { cors } from "@/lib/cors";  // Importing the cors function

export async function POST(req: Request) {
  // Apply the CORS check before processing the request
  const corsResponse = cors(req);
  if (corsResponse) {
    return corsResponse; // If not allowed, return the response from CORS check
  }

  const { name, event, attendance } = await req.json();

  await dbConnect();

  const newVolunteer = new Volunteer({ name, event, attendance });
  await newVolunteer.save();

  return NextResponse.json({ message: "Volunteer added successfully", volunteer: newVolunteer });
}
