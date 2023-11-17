import mongoose, { Document } from "mongoose";

// Interface representing a document in MongoDB.
interface IQrCode extends Document {
  styleInfo: [{}];
  userId: { type: string };
}

// User Schema
const qrCodeSchema = new mongoose.Schema<IQrCode>({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  styleInfo: { type: [mongoose.Schema.Types.Mixed], required: true },
});

// User model
const qrCodeStyle = mongoose.model<IQrCode>("qrCodeStyle", qrCodeSchema);

export default qrCodeStyle;
