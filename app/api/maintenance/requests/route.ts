// app/api/maintenance/requests/route.ts
import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";  // Assuming you have dbConnect utility
import Maintenance from "@/models/Maintenance";  // Assuming Maintenance model

export async function GET() {
  try {
    // Connect to the database
    await dbConnect();

    // Fetch all maintenance requests from the database
    const maintenanceRequests = await Maintenance.find();

    // Return the maintenance requests as a JSON response
    return NextResponse.json(maintenanceRequests);
  } catch (error) {
    console.error("Error fetching maintenance requests:", error);
    return NextResponse.json({ error: "Failed to fetch maintenance requests" }, { status: 500 });
  }
}
