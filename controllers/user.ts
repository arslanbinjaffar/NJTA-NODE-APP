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

const userSignUp = async (req: Request, res: Response, next: NextFunction) => {
  const { firstName, lastName, email, phoneNumber, password, referCode, role, tenantId } = req.body;

  try {
    const isExist = await User.findOne({ email, phoneNumber, tenantId });
    const isStaffExist = await Tenant.findOne({ email });
    if (isExist || isStaffExist) throw new Error("Account already exists");

    // Creating new user
    const result = await User.create({
      firstName,
      lastName,
      email: email.toLowerCase(),
      phoneNumber,
      password,
      referCode,
      role,
      tenantId
    });

    res.json({
      status: 200,
      success: true,
      data: result,
      message: "Staff Created Successfully",
    });

  } catch (error) {
    next(error);
  }
};

/*
  @desc User login
  @route POST /api/user/login
  @access Public
 */
const userLogin = async (req: Request, res: Response, next: NextFunction) => {

  const { email } = req.body;
  try {
    const isExist = await User.findOne({ email });
    if (!isExist) throw new Error("Account does not exist");

    // Sending random OTP to email
    // const emailResponse = await sendAwsSesEmail(email, otp);
    // if (!emailResponse)
    //   throw new Error("Something went wrong while sending email");

    res.json({
      status: 200,
      success: true,
      data: null,
      message: "User login successfully",
    });
  } catch (error) {
    next(error);
  }
};

/*
  @desc signup account verification
  @route POST /api/user/verify-account
  @access Public
 */
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
  userSignUp,
  verifyAccount,
  verifyOtp,
  resendOtp,
  getUserById,
};
