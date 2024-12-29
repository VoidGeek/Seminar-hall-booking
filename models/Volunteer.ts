import mongoose, { Schema, Document } from "mongoose";

export interface IVolunteer extends Document {
  name: string;
  event: string;
  attendance: boolean;
  usn: string; // Added USN field
}

const VolunteerSchema: Schema = new Schema({
  name: { type: String, required: true },
  event: { type: String, required: true },
  attendance: { type: Boolean, default: false },
  usn: { type: String, required: true }, // Added USN field
});

export default mongoose.models.Volunteer ||
  mongoose.model<IVolunteer>("Volunteer", VolunteerSchema);
