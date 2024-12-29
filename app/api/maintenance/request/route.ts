// app/api/maintenance/route.ts (or your actual file path)
import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import Maintenance from "@/models/Maintenance";

export async function POST(req: Request) {
  const { requestDetails } = await req.json();

  await dbConnect();
  const maintenance = new Maintenance({ requestDetails });
  await maintenance.save();

  return NextResponse.json({ message: "Maintenance request created" });
}
