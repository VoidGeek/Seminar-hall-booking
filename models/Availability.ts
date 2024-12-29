import mongoose, { Schema, Document } from "mongoose";

// Availability schema to store availability details for a specific date
export interface IAvailability extends Document {
  hall_id: mongoose.Types.ObjectId;  // Foreign key for Hall
  date: Date;
  status: string; // "Available" or "Booked"
}

const AvailabilitySchema: Schema = new Schema({
  hall_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Hall', required: true }, // Foreign key to Hall
  date: { type: Date, required: true }, // Date of availability
  status: { type: String, default: 'Available' }, // Default status is 'Available'
});

export default mongoose.models.Availability || mongoose.model<IAvailability>('Availability', AvailabilitySchema);
