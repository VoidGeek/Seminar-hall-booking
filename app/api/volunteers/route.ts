import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import Volunteer from "@/models/Volunteer";

// Handle POST request for adding a new volunteer
export async function POST(req: Request) {
  const { name, event, attendance, usn } = await req.json(); // Destructure the USN from the request body

  if (!name || !event || !usn) {
    return NextResponse.json({ error: "Missing required fields (name, event, usn)" }, { status: 400 });
  }

  await dbConnect();

  const newVolunteer = new Volunteer({ name, event, attendance, usn });
  await newVolunteer.save();

  return NextResponse.json({ message: "Volunteer added successfully", volunteer: newVolunteer });
}

// Handle PATCH request for updating volunteer details (name, event, attendance, usn)
export async function PATCH(req: Request) {
  const { volunteerId, name, event, usn, attendance } = await req.json();

  if (!volunteerId || !name || !event || !usn) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  await dbConnect();

  const updatedVolunteer = await Volunteer.findByIdAndUpdate(
    volunteerId,
    { name, event, usn, attendance },
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

  if (!volunteerId) {
    return NextResponse.json({ error: "Volunteer ID is required" }, { status: 400 });
  }

  await dbConnect();

  const deletedVolunteer = await Volunteer.findByIdAndDelete(volunteerId);

  if (!deletedVolunteer) {
    return NextResponse.json({ message: "Volunteer not found" }, { status: 404 });
  }

  return NextResponse.json({ message: "Volunteer deleted successfully", volunteer: deletedVolunteer });
}
