import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import Hall from "@/models/Hall";

export async function DELETE(req: Request) {
  const { hallId } = await req.json();  // Extract hallId from the request body

  await dbConnect();  // Connect to the database

  // Check if the hall exists
  const hall = await Hall.findById(hallId);
  if (!hall) {
    return NextResponse.json({ error: "Hall not found" }, { status: 404 });
  }

  // Delete the hall
  await Hall.findByIdAndDelete(hallId);

  return NextResponse.json({ message: `Hall "${hall.name}" has been deleted successfully.` });
}
