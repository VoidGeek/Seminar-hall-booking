// app/api/maintenance/route.ts (or your actual file path)
import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import Booking from "@/models/Booking";
import Maintenance from "@/models/Maintenance";

export async function POST(req: Request) {
  const { bookingId, requestDetails, options } = await req.json(); // Extract request data

  // Connect to the database
  await dbConnect();
  //TODO: Add error handling for invalid bookingId
  // Check if the bookingId exists in the Booking collection
  const booking = await Booking.findById(bookingId);
  if (!booking) {
    return NextResponse.json({ error: "Booking not found" }, { status: 404 });
  }

  // Check if a maintenance request already exists for this bookingId
  const existingMaintenance = await Maintenance.findOne({
    booking_id: bookingId,
  });
  if (existingMaintenance) {
    return NextResponse.json(
      { error: "A maintenance request for this booking already exists" },
      { status: 400 }
    );
  }

  // Create a new maintenance request
  const maintenance = new Maintenance({
    booking_id: bookingId, // Link to the bookingId
    requestDetails,
    options, // Seminar options like mic, projector, etc.
  });

  // Save the maintenance request to the database
  await maintenance.save();

  return NextResponse.json({
    message: "Maintenance request created successfully",
    maintenance,
  });
}
