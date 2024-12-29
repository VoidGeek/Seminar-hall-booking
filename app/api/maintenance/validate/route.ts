// app/api/maintenance/validate/route.ts
import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import Maintenance from "@/models/Maintenance";

// Handle POST request to validate maintenance request for bookingId
export async function POST(req: Request) {
  const { bookingId } = await req.json();

  await dbConnect();

  // Check if a maintenance request has already been sent for this bookingId
  const existingRequest = await Maintenance.findOne({ booking_id: bookingId });

  if (existingRequest) {
    return NextResponse.json({ message: "Maintenance request already exists" });
  }

  return NextResponse.json({ message: "No existing request found" });
}
