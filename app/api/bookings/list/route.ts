import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import Booking from "@/models/Booking";

export async function GET() {
  try {
    await dbConnect(); // Connect to the database

    // Fetch all bookings and populate the hall details
    const bookings = await Booking.find()
      .populate("hall_id", "name") // Populate hall details (name, location)
      .exec(); // Use exec() for better error handling

    return NextResponse.json(bookings);
  } catch (error) {
    console.error("Error fetching bookings:", error);
    return NextResponse.json({ message: "Failed to fetch bookings" }, { status: 500 });
  }
}
