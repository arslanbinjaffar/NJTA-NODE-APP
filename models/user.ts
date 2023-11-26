import mongoose from "mongoose";
import jwt from 'jsonwebtoken';

export type roles = "admin" | "manager" | "user"
// Interface representing a document in MongoDB.
export interface IUser {
  firstName: string;
  lastName: string;
  gender: string;
  traningGoals: string[];
  birthday: string;
  bodyType: BodyType;
  phoneNumber: string;
  referCode: string;
  email: string;
  password?: string;
  role: roles;
}

type BodyType = {
  height: string
  heightUnit: string
  weight: string
  weightUnit: string
}

// User Schema
const userSchema = new mongoose.Schema<IUser>(
  {
    firstName: { type: String, default: null },
    lastName: { type: String, default: null },
    phoneNumber: String,
    gender: { type: String, default: null },
    traningGoals: { type: [String], default: [] },
    birthday: { type: String, default: null },
    bodyType: {
      height: { type: String, default: null },
      heightUnit: { type: String, default: null },
      weight: { type: String, default: null },
      weightUnit: { type: String, default: null },
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
