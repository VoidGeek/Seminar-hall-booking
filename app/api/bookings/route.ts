import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import Booking from "@/models/Booking";
import Maintenance from "@/models/Maintenance";

export async function DELETE(req: Request) {
  // Extract bookingId from the request body
  const { bookingId } = await req.json(); // Parse the JSON body to get the bookingId

  // Check if bookingId is provided
  if (!bookingId) {
    return NextResponse.json({ error: "Booking ID is required" }, { status: 400 });
  }

  await dbConnect(); // Connect to the database

  // First, delete the maintenance records associated with the booking
  await Maintenance.deleteMany({ booking_id: bookingId });

  // Then, delete the booking itself
  const deletedBooking = await Booking.findByIdAndDelete(bookingId);

  // If the booking is not found, return a 404 response
  if (!deletedBooking) {
    return NextResponse.json({ message: "Booking not found" }, { status: 404 });
  }

  // Return a success response after successfully deleting the booking and related maintenance requests
  return NextResponse.json({ message: "Booking and its maintenance requests deleted successfully" });
}
