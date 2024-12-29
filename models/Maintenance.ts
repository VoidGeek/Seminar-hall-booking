import mongoose from "mongoose";

const maintenanceSchema = new mongoose.Schema({
  booking_id: { type: mongoose.Schema.Types.ObjectId, ref: "Booking", required: true }, // Reference to Booking
  requestDetails: { type: String, required: true },
  options: { type: Object, required: true },
});

const Maintenance = mongoose.models.Maintenance || mongoose.model("Maintenance", maintenanceSchema);

export default Maintenance;

// import mongoose from "mongoose";

// const maintenanceSchema = new mongoose.Schema({
//   booking_id: { type: mongoose.Schema.Types.ObjectId, ref: "Booking", required: true },
//   requestDetails: { type: String, required: true },
//   options: { type: Object, required: true },
// });

// const Maintenance = mongoose.models.Maintenance || mongoose.model("Maintenance", maintenanceSchema);

// export default Maintenance;
