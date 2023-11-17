import mongoose, { Document } from "mongoose";

// Interface representing a document in MongoDB.
interface IGlobal extends Document {
  userId: { type: string };
  globals: [
    {
      blockType: string;
      data: {};
      _id: any;
    }
  ];
}

// User Schema
const globalSchema = new mongoose.Schema<IGlobal>({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  globals: [
    {
      blockType: { type: String },
      data: { type: mongoose.Schema.Types.Mixed },
    },
  ],
});

// User model
const Global = mongoose.model<IGlobal>("global", globalSchema);

export default Global;
