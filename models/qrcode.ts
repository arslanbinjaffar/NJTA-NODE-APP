import mongoose, { Document } from "mongoose";

// Interface representing a document in MongoDB.
interface IQrCode extends Document {
  userId: { type: string };
  qrCodes: [
    {
      name: string;
      image: string;
      style: {};
      qubUrl: string;
      destinationUrl: string;
      unNamed: boolean;
    }
  ];
  qrStyles: [{}];
}

// User Schema
const qrCodeSchema = new mongoose.Schema<IQrCode>({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  qrCodes: [
    {
      name: String,
      qrCodeImage: { type: String, required: true },
      style: { type: mongoose.Schema.Types.Mixed, default: null },
      destinationUrl: { type: String, required: true },
      qubUrl: { type: String, required: true },
    },
  ],
  qrStyles: [
    {
      name: String,
      bodyColor: String,
      bodyStyle: String,
      eyeColor: String,
      eyeStyle: String,
      frame: String,
      frameColor: String,
      frameIcon: String,
      frameText: String,
      frameTextColor: String,
      logo: String,
      thumbnail: String,
    },
  ],
});

// User model
const QrCode = mongoose.model<IQrCode>("qrCode", qrCodeSchema);

export default QrCode;
