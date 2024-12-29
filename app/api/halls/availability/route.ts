import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import Availability from "@/models/Availability";

export async function POST(req: Request) {
  const { hallId, selectedDate } = await req.json(); // Extract hallId and selectedDate

  await dbConnect(); // Connect to the database

  // Check if the hall is available on the selected date
  const availability = await Availability.findOne({ hall_id: hallId, date: new Date(selectedDate) });

  if (availability && availability.status === "Booked") {
    return NextResponse.json({ error: "Hall already booked for this date" }, { status: 400 });
  }

  return NextResponse.json({ message: "Hall is available" });
}
