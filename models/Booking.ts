import mongoose, { Schema, Document } from "mongoose";

// Booking schema to store booking details for a specific hall and date
export interface IBooking extends Document {
  hall_id: mongoose.Types.ObjectId;  // Foreign key for Hall
  nameuser: string;  // Name of the user who booked the hall
  date: Date;        // Date of the booking
}

const BookingSchema: Schema = new Schema({
  hall_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Hall', required: true },  // Foreign key to Hall
  nameuser: { type: String, required: true },  // Name of the user who booked
  date: { type: Date, required: true },        // Date of booking
});

export default mongoose.models.Booking || mongoose.model<IBooking>("Booking", BookingSchema);
