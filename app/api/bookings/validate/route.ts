// app/api/bookings/validate/route.ts
import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import Booking from "@/models/Booking";

// Handle POST request for validating booking ID
export async function POST(req: Request) {
  const { bookingId } = await req.json(); // Extract bookingId from the body of the request

  if (!bookingId) {
    return NextResponse.json({ error: "Booking ID is required" }, { status: 400 });
  }

  await dbConnect(); // Connect to the database

  // Check if the booking ID exists in the database
  const booking = await Booking.findById(bookingId);

  if (!booking) {
    return NextResponse.json({ error: "Booking not found" }, { status: 404 });
  }

  return NextResponse.json({ message: "Booking found", booking });
}
