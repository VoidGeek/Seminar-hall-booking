import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import Volunteer from "@/models/Volunteer";

// Handle POST request for adding a new volunteer
export async function POST(req: Request) {
  const { name, event, attendance } = await req.json();

  await dbConnect();

  const newVolunteer = new Volunteer({ name, event, attendance });
  await newVolunteer.save();

  return NextResponse.json({ message: "Volunteer added successfully", volunteer: newVolunteer });
}

// Handle PATCH request for updating volunteer details (name, event, and attendance)

// Handle PATCH request for updating volunteer details
export async function PATCH(req: Request) {
  const { volunteerId, name, event } = await req.json();

  await dbConnect();

  // Check if all necessary fields are provided
  if (!volunteerId || !name || !event) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const updatedVolunteer = await Volunteer.findByIdAndUpdate(
    volunteerId,
    { name, event },
    { new: true }
  );

  if (!updatedVolunteer) {
    return NextResponse.json({ message: "Volunteer not found" }, { status: 404 });
  }

  return NextResponse.json({ message: "Volunteer updated successfully", volunteer: updatedVolunteer });
}

// Handle DELETE request for deleting a volunteer
export async function DELETE(req: Request) {
  const { volunteerId } = await req.json();

  await dbConnect();

  const deletedVolunteer = await Volunteer.findByIdAndDelete(volunteerId);

  if (!deletedVolunteer) {
    return NextResponse.json({ message: "Volunteer not found" }, { status: 404 });
  }

  return NextResponse.json({ message: "Volunteer deleted successfully", volunteer: deletedVolunteer });
}
