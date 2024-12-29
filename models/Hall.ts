import mongoose, { Schema, Document } from "mongoose";

export interface IHall extends Document {
  name: string;
}

const HallSchema: Schema = new Schema({
  name: { type: String, required: true },
});

// Explicitly specify the collection name as 'halls'
export default mongoose.models.Hall || mongoose.model<IHall>("Hall", HallSchema, "halls");

