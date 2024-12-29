import mongoose, { Schema, Document } from "mongoose";

// Hall schema to store hall details
export interface IHall extends Document {
  name: string;  // Hall name
}

const HallSchema: Schema = new Schema({
  name: { type: String, required: true }, // Hall name
});

export default mongoose.models.Hall || mongoose.model<IHall>("Hall", HallSchema);
