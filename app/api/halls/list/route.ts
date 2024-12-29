import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import Hall from "@/models/Hall";

export async function GET() {
  await dbConnect();
  const halls = await Hall.find();
  return NextResponse.json(halls);
}
