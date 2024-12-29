import mongoose, { Schema, Document } from "mongoose";

export interface IHall extends Document {
  name: string;
  capacity: number;
  status: string;
}

const HallSchema: Schema = new Schema({
  name: { type: String, required: true },
  capacity: { type: Number, required: true },
  status: { type: String, default: "Available" },
});

export default mongoose.models.Hall || mongoose.model<IHall>("Hall", HallSchema);
