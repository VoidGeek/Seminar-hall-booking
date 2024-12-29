import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import Hall from "@/models/Hall";
import Booking from "@/models/Booking";

export async function POST(req: Request) {
  const { hallId, nameuser, selectedDate } = await req.json();  // Extract hallId, nameuser, and selectedDate from the request body

  await dbConnect(); // Connect to the database

  // Check if the hall exists
  const hall = await Hall.findById(hallId);
  if (!hall) {
    return NextResponse.json({ error: "Hall not found" }, { status: 404 });
  }

  // Check if the hall is already booked on the selected date
  const existingBooking = await Booking.findOne({
    hall_id: hallId,
    date: new Date(selectedDate),
  });

  if (existingBooking) {
    return NextResponse.json({ error: "Hall is already booked for this date" }, { status: 400 });
  }

  // Create a new booking
  const booking = new Booking({
    hall_id: hallId,
    nameuser,
    date: new Date(selectedDate),
  });

  await booking.save();

  // Return the success message along with the booking ID
  return NextResponse.json({
    message: `Hall ${hall.name} successfully booked for ${selectedDate}`,
    bookingId: booking._id,  // Send the booking ID (MongoDB _id)
  });
}
