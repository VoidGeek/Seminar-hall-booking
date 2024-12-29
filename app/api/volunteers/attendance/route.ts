import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import Volunteer from "@/models/Volunteer";

// GET: Fetch all volunteers and their attendance status
export async function GET() {
  try {
    console.log("Starting to fetch volunteers...");

    await dbConnect();
    console.log("Database connected successfully.");

    const volunteers = await Volunteer.find(); // Fetch all volunteers
    console.log("Fetched volunteers:", volunteers);  // Log the fetched data

    return NextResponse.json(volunteers);
  } catch (error) {
    // Log the error details for debugging purposes
    console.error("Error fetching volunteers:", error);
    return NextResponse.json({ error: "Failed to fetch volunteers" }, { status: 500 });
  }
}

// PATCH: Update attendance status for a volunteer
export async function PATCH(req: Request) {
  try {
    const { volunteerId, attendance } = await req.json(); // Extract volunteer ID and attendance status from the request body

    if (typeof volunteerId !== 'string' || typeof attendance !== 'boolean') {
      return NextResponse.json({ error: "Invalid input data" }, { status: 400 });
    }

    console.log(`Updating attendance for volunteer ${volunteerId} to ${attendance ? 'Present' : 'Absent'}...`);

    await dbConnect();
    console.log("Database connected successfully.");

    const volunteer = await Volunteer.findById(volunteerId);

    if (!volunteer) {
      return NextResponse.json({ error: "Volunteer not found" }, { status: 404 });
    }

    volunteer.attendance = attendance; // Update attendance status
    await volunteer.save(); // Save the updated volunteer document

    return NextResponse.json({ message: "Attendance updated successfully" });
  } catch (error) {
    console.error("Error updating attendance:", error);
    return NextResponse.json({ error: "Failed to update attendance" }, { status: 500 });
  }
}
