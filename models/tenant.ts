import mongoose from "mongoose";

// Interface representing a documents in MongoDB.
interface ITenant {
  email: string;
  password:string;
}

// Tenant Schema
const tenantSchema = new mongoose.Schema<ITenant>(
  {
    email: { type: String, required: true },
    password:{ type: String, required: true }
  },
  { timestamps: true }
);

// Tenant model
const Tenant = mongoose.model<ITenant>("tenant", tenantSchema);

export default Tenant;
