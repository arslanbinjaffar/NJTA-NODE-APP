import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

// Models
import User from "../../models/user.js";

interface DecodedPayload {
  email: string;
}

//Verify JWT
async function verifyToken(req: Request, res: Response, next: NextFunction) {
  try {
    if (
      !req.headers.authorization ||
      !req.headers.authorization.startsWith("Bearer")
    )
      throw new Error("Bearer JWT not found in authorization header");
    const token = req.headers.authorization.split(" ")[1];
    const { email } = jwt.verify(
      token,
      process.env.JWT_SECERET
    ) as DecodedPayload;


    // Verifying user email
    const userData = await User.find({ email });
    if (!userData.length) throw new Error("Invalid token");

    req.body.email = email;

    next();
  } catch (error: any) {
    next(error);
  }
}

export default verifyToken;
