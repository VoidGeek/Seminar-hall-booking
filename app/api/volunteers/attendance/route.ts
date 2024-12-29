import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import Volunteer from "@/models/Volunteer";
import { ObjectId } from "mongodb"; // Make sure you have mongodb installed

// Helper to validate MongoDB ObjectId
const isValidObjectId = (id: string): boolean => ObjectId.isValid(id);

// GET: Fetch all volunteers and their attendance status
export async function GET() {
  try {
    console.log("Starting to fetch volunteers...");

    await dbConnect();
    console.log("Database connected successfully.");

    const volunteers = await Volunteer.find();
    console.log("Fetched volunteers:", volunteers);  // Log the fetched data

    return NextResponse.json(volunteers);
  } catch (error) {
    // Log the error details for debugging purposes
    console.error("Error fetching volunteers:", error);

    // If the error has a specific message, log it
    if (error instanceof Error) {
      console.error("Error message:", error.message);
    }

    // Return a response with a 500 status code
    return NextResponse.json({ error: "Failed to fetch volunteers" }, { status: 500 });
  }
}


// POST: Mark attendance for a specific volunteer
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { volunteerId } = body;

    if (!volunteerId || !isValidObjectId(volunteerId)) {
      return NextResponse.json({ error: "Invalid or missing volunteer ID" }, { status: 400 });
    }

    await dbConnect();

    const volunteer = await Volunteer.findById(volunteerId);
    if (!volunteer) {
      return NextResponse.json({ error: "Volunteer not found" }, { status: 404 });
    }

    // Mark attendance as present
    volunteer.attendance = true;
    await volunteer.save();

    return NextResponse.json({ message: "Attendance marked successfully" });
  } catch (error) {
    // Log error for debugging purposes
    console.error("Error updating attendance:", error);
    return NextResponse.json({ error: "Failed to update attendance" }, { status: 500 });
  }
}
