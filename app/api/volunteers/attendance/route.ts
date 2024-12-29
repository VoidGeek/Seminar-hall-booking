import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import Volunteer from "@/models/Volunteer";
import { ObjectId } from "mongodb"; // Make sure you have mongodb installed

// Helper to validate MongoDB ObjectId
const isValidObjectId = (id: string): boolean => ObjectId.isValid(id);

// Helper function to handle CORS, adjusting for Vercel's environment
const handleCors = (req: Request): Headers => {
  const headers = new Headers();
  const origin = req.headers.get('origin') || '*'; // Get the origin from the request

  headers.set("Access-Control-Allow-Origin", origin); // Allow the origin of the request
  headers.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS"); // Add OPTIONS for preflight
  headers.set("Access-Control-Allow-Headers", "Content-Type");

  return headers;
};

// GET: Fetch all volunteers and their attendance status
export async function GET(req: Request) {
  try {
    const headers = handleCors(req); // Apply CORS settings

    await dbConnect();
    const volunteers = await Volunteer.find(); // Fetch all volunteers

    return NextResponse.json(volunteers, { headers });
  } catch (error) {
    // Log error for debugging purposes
    console.error("Error fetching volunteers:", error);
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

    const headers = handleCors(req); // Apply CORS settings

    await dbConnect();

    const volunteer = await Volunteer.findById(volunteerId);
    if (!volunteer) {
      return NextResponse.json({ error: "Volunteer not found" }, { status: 404 });
    }

    // Mark attendance as present
    volunteer.attendance = true;
    await volunteer.save();

    return NextResponse.json({ message: "Attendance marked successfully" }, { headers });
  } catch (error) {
    // Log error for debugging purposes
    console.error("Error updating attendance:", error);
    return NextResponse.json({ error: "Failed to update attendance" }, { status: 500 });
  }
}
