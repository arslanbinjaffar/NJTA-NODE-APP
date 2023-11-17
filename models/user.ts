import mongoose from "mongoose";

export type roles = "admin" | "manager" | "user"
// Interface representing a document in MongoDB.
interface IUser {
  firstName: string;
  lastName: string;
  gender: string;
  traningGoals: string[];
  birthday: Date;
  bodyType: BodyType;
  phoneNumber: string;
  referCode: string;
  email: string;
  password: string;
  role: roles;
}

type BodyType = {
  height: string
  weight: string
}

// User Schema
const userSchema = new mongoose.Schema<IUser>(
  {
    firstName: { type: String, default: null },
    lastName: { type: String, default: null },
    phoneNumber: String,
    gender: { type: String, default: null },
    traningGoals: { type: [String], default: [] },
    birthday: { type: Date, default: null },
    bodyType: {
      height: { type: String, default: null },
      weight: { type: String, default: null },
    },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, default: "user" },
    referCode: String
  },
  { timestamps: true }
);

// User model
const User = mongoose.model<IUser>("user", userSchema);

export default User;
