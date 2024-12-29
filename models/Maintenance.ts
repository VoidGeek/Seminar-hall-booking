import mongoose, { Schema, Document } from "mongoose";

export interface IMaintenance extends Document {
  requestDetails: string;
  status: string;
}

const MaintenanceSchema: Schema = new Schema({
  requestDetails: { type: String, required: true },
  status: { type: String, default: "Pending" },
});

export default mongoose.models.Maintenance || mongoose.model<IMaintenance>("Maintenance", MaintenanceSchema);
