import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  hall_id: { type: mongoose.Schema.Types.ObjectId, ref: "Hall" },
  nameuser: { type: String, required: true },
  date: { type: Date, required: true },
  maintenance_id: { type: mongoose.Schema.Types.ObjectId, ref: "Maintenance" }, // Add reference to Maintenance
});

const Booking = mongoose.models.Booking || mongoose.model("Booking", bookingSchema);

export default Booking;
