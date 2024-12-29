import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import Booking from "@/models/Booking";

export async function GET() {
  await dbConnect(); // Connect to the database

  // Fetch all bookings
  const bookings = await Booking.find().populate("hall_id", "name"); // Populate hall details

  return NextResponse.json(bookings);
}
