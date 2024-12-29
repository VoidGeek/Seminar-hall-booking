import mongoose, { Schema, Document } from "mongoose";

export interface IVolunteer extends Document {
  name: string;
  event: string;
  attendance: boolean;
}

const VolunteerSchema: Schema = new Schema({
  name: { type: String, required: true },
  event: { type: String, required: true },
  attendance: { type: Boolean, default: false },
});

export default mongoose.models.Volunteer ||
  mongoose.model<IVolunteer>("Volunteer", VolunteerSchema);