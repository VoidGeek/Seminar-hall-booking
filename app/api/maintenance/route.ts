import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import Maintenance from "@/models/Maintenance";


export async function GET() {
  await dbConnect(); // Connect to the database

  // Fetch all maintenance requests and join them with the related Booking details
  const maintenanceRequests = await Maintenance.find()
    .populate("booking_id", "nameuser date hall_id") // Populate the booking details
    .populate("booking_id.hall_id", "name"); // Populate the hall name from the related Booking

  return NextResponse.json(maintenanceRequests);
}

