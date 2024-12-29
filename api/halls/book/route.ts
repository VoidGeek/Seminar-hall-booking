import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import Hall from "@/models/Hall";

export async function POST(req: Request) {
  const { hallId } = await req.json();

  await dbConnect();
  const hall = await Hall.findById(hallId);
  if (!hall || hall.status !== "Available") {
    return NextResponse.json({ error: "Hall not available" }, { status: 400 });
  }

  hall.status = "Booked";
  await hall.save();
  return NextResponse.json({ message: "Hall booked successfully" });
}
