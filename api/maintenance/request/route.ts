// app/api/maintenance/route.ts (or your actual file path)
import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import Maintenance from "@/models/Maintenance";
import { cors } from "@/lib/cors"; // Importing the cors function

export async function POST(req: Request) {
  // Apply the CORS check before processing the request
  const corsResponse = cors(req);
  if (corsResponse) {
    return corsResponse; // If not allowed, return the response from CORS check
  }

  const { requestDetails } = await req.json();

  await dbConnect();
  const maintenance = new Maintenance({ requestDetails });
  await maintenance.save();

  return NextResponse.json({ message: "Maintenance request created" });
}
