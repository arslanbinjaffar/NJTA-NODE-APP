import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";

// Models
import qrCodeStyle from "../models/qrCodeStyle.js";
import QrCode from "../models/qrcode.js";
import User from "../models/user.js";
import Page from "../models/page.js";
import Global from "../models/globals.js";
import ContentBlockMetaData from "../models/contentBlocksMetaData.js";

// Middlewares
// import sendAwsSesEmail from "../middlewares/aws/simpleEmailService.js";

// Helper functions
import generateJWT from "../helper/createJWT.js";
import { randomOtpGenerator } from "../helper/randomOtpGenerator.js";
import Tenant from "../models/tenant.js";

const createTenant = async (req: Request, res: Response, next: NextFunction) => {
  const { email,password} = req.body;

  try {
    const isExist = await Tenant.findOne({ email });
    if (isExist) throw new Error("Tenant already exists");

    // Creating new user
    const result = await Tenant.create({
      email: email.toLowerCase(),
      password,
    });

    res.json({
        status: 200,
        success: true,
        data: null,
        message: "Tenant created successfully",
      });
   
  } catch (error) {
    next(error);
  }
};

const userLogin = async (req: Request, res: Response, next: NextFunction) => {
  const { email } = req.body;
  const otp = randomOtpGenerator();

  try {
    const isExist = await User.findOne({ email });
    if (!isExist) throw new Error("Account does not exist");

    // Check if account is verified
    if (!isExist)
      throw new Error("Account not verified. Login unsuccessful");

    // Sending random OTP to email
    // const emailResponse = await sendAwsSesEmail(email, otp);
    // if (!emailResponse)
    //   throw new Error("Something went wrong while sending email");

    // Overwriting the old otp
    await User.findOneAndUpdate({ email }, { otp });

    res.json({
      status: 200,
      success: true,
      data: null,
      message: "OTP send successfully",
    });
  } catch (error) {
    next(error);
  }
};

const verifyAccount = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, otp } = req.body;
  try {
    const userData = await User.findOne({ email });

    // Verifying otp
    if (userData != otp) {
      await User.findOneAndDelete({ email });
      throw new Error("OTP not matched");
    }

    // Changing verifying status
    await User.findOneAndUpdate({ email }, { verified: true });

    res.json({
      status: 200,
      success: true,
      data: null,
      message: "Account verified successfully",
    });
  } catch (error) {
    next(error);
  }
};

/*
  @desc login otp verification
  @route POST /api/user/verify-otp
  @access Public
 */
const verifyOtp = async (req: Request, res: Response, next: NextFunction) => {
  const { email, otp } = req.body;
  try {
    const userData = await User.findOne({ email });

    // Verifying otp
    if (userData != otp) throw new Error("OTP not matched");

    // Changing verifying status
    await User.findOneAndUpdate({ email }, { verified: true });

    if (!userData) throw new Error("User data not found");

    res.json({
      status: 200,
      success: true,
      data: generateJWT(
        email,
        userData?.id,
        userData?.firstName,
        userData?.lastName,
        "company"
      ),
      message: "User login successful",
    });
  } catch (error) {
    next(error);
  }
};

/*
  @desc GET all users
  @route GET /api/user/all-users
  @access Public
 */
const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const allUsers = await User.find();

    res.json({
      status: 200,
      success: true,
      data: allUsers,
      message: null,
    });
  } catch (error) {
    next(error);
  }
};

/*
  @desc GET all users
  @route GET /api/user/all-users
  @access Public
 */
const getUserById = async (req: Request, res: Response, next: NextFunction) => {
  const { userId } = req.params;
  try {
    const userData = await User.findById(userId);

    res.json({
      status: 200,
      success: true,
      data: userData,
      message: null,
    });
  } catch (error) {
    next(error);
  }
};

/*
    @desc PATCH edit user
    @route PATCH /api/v1/user/edit-user/:id
    @access Public
*/
const editUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { firstname, lastname, email, company } = req.body;

    const result = await User.findByIdAndUpdate(id, {
      firstname,
      lastname,
      email,
      company,
    });

    if (!result) throw new Error("User not found");

    res.json({
      status: 200,
      success: true,
      data: null,
      message: "User updated successfully",
    });
  } catch (error) {
    next(error);
  }
};

/*
    @desc DELETE a user
    @route DELETE /api/v1/user/:id
    @access Public
*/
const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  try {
    const result = await User.findByIdAndDelete(id);
    if (!result) throw new Error("User not found");
    res.json({
      status: 200,
      success: true,
      data: null,
      message: "User deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

/*
    @desc DELETE delete all data from db
    @route DELETE /api/v1/user/
    @access Public
*/
const cleanDB = async (req: Request, res: Response, next: NextFunction) => {
  try {
    mongoose.connection.db.dropDatabase();

    res.json({
      status: 200,
      success: true,
      data: null,
      message: "Database cleaned successfully",
    });
  } catch (error) {
    next(error);
  }
};

const resendOtp = async (req: Request, res: Response, next: NextFunction) => {
  const { email } = req.body;
  const otp = randomOtpGenerator();

  try {
    // const emailResponse = await sendAwsSesEmail(email, otp);
    // if (!emailResponse)
    //   throw new Error("Something went wrong while sending OTP");

    // Overwriting the old otp
    await User.findOneAndUpdate({ email }, { otp });

    res.json({
      status: 200,
      success: true,
      data: null,
      message: "OTP resend successfully",
    });
  } catch (error) {
    next(error);
  }
};

export {
  cleanDB,
  deleteUser,
  editUser,
  getAllUsers,
  userLogin,
  createTenant,
  verifyAccount,
  verifyOtp,
  resendOtp,
  getUserById,
};
