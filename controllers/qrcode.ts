import { NextFunction, Request, Response } from "express";
import { nanoid } from "nanoid";

// Models
import qrCodeStyle from "../models/qrCodeStyle.js";
import QrCode from "../models/qrcode.js";

// Global variables
const qubBaseUrl = "https://qr.qubio.me/";

/*
  @desc GET all users
  @route GET /api/user/all-qr-styles
  @access Public
 */
const getAllQrCodeStylesByUserId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userId } = req.params;
  try {
    const result = await QrCode.find(
      { userId },
      {
        _id: 0,
        qrStyles: 1,
      }
    );

    res.json({
      status: 200,
      success: true,
      data: result,
      message: null,
    });
  } catch (error) {
    next(error);
  }
};

/*
    @desc POST get qr-codes by user id
    @route POST /api/user/user-qrcodes/:id
    @access Public
   */
const getQrCodeByUserId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userId } = req.params;

  try {
    const result = await QrCode.find({ userId });
    if (!result) throw new Error("Qr-code not found");

    res.json({
      status: 200,
      success: true,
      data: result,
      message: null,
    });
  } catch (error) {
    next(error);
  }
};

/*
    @desc GET all users
    @route GET /api/user/all-qrcodes
    @access Public
   */
const getAllQrCodes = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const allQrCodes = await QrCode.find();

    res.json({
      status: 200,
      success: true,
      data: allQrCodes,
      message: null,
    });
  } catch (error) {
    next(error);
  }
};

/*
  @desc POST qr-code
  @route POST /api/user/create-qrcode
  @access Public
*/
const createQrCode = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, qrCodeImage, style, destinationUrl } = req.body;
  const { userId } = req.params;
  let qrCodeResult;

  try {
    // Get qrCode data
    const qrCode = await QrCode.findOne({ userId });
    console.log(qubBaseUrl.concat(nanoid(15)));

    let pageTemplate = {
      name,
      qrCodeImage,
      style,
      destinationUrl,
      qubUrl: qubBaseUrl.concat(nanoid(15)),
    };

    // Create new qr code
    if (!qrCode) {
      qrCodeResult = await QrCode.create({
        userId,
        qrCodes: [pageTemplate],
      });
    } else {
      qrCodeResult = await QrCode.findOneAndUpdate(
        { userId },
        {
          $push: {
            qrCodes: pageTemplate,
          },
        },
        {
          new: true,
          projection: { qrCodes: { $slice: -1 } },
        }
      );
    }

    if (!qrCodeResult)
      throw new Error("QrCode not created, something went wrong");

    res.json({
      status: 200,
      success: true,
      data: qrCodeResult,
      message: "QR created successfully",
    });
  } catch (error) {
    next(error);
  }
};

/*
  @desc DELETE a qr code
  @route DELETE /api/v1/user/qrcode/:id
  @access Public
*/
const deleteQRcode = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userId, qrCodeId } = req.params;
  try {
    const result = await QrCode.findOneAndUpdate(
      {
        userId,
        "qrCodes._id": qrCodeId,
      },
      {
        $pull: {
          qrCodes: {
            _id: qrCodeId,
          },
        },
      }
    );
    if (!result) throw new Error("QR code not found");

    res.json({
      status: 200,
      success: true,
      data: null,
      message: "QR code deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

/*
      @desc DELETE a qr code
      @route DELETE /api/v1/user/delete-qr-styles/:id
      @access Public
  */
const deleteQRcodeStyle = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userId, qrStyleId } = req.params;

  try {
    // Delete qrStyle;
    const qrStyle = await QrCode.findOneAndUpdate(
      {
        userId,
        "qrStyles._id": qrStyleId,
      },
      {
        $pull: {
          qrStyles: {
            _id: qrStyleId,
          },
        },
      },
      { new: true }
    );

    if (!qrStyle) throw new Error("qrStyle deletion failed");

    res.json({
      status: 200,
      success: true,
      data: null,
      message: "qrStyle deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

/*
      @desc POST add qr code styles
      @route POST /api/v1/user/add-qr-styles
      @access Public
  */
const addQrStyles = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId } = req.params;
    let qrResult;
    const style = {
      name: req.body.name,
      bodyColor: req.body.bodyColor,
      bodyStyle: req.body.bodyStyle,
      eyeColor: req.body.eyeColor,
      eyeStyle: req.body.eyeStyle,
      frame: req.body.frame,
      frameColor: req.body.frameColor,
      frameIcon: req.body.frameIcon,
      frameText: req.body.frameText,
      frameTextColor: req.body.frameTextColor,
      logo: req.body.logo,
      thumbnail: req.body.thumbnail,
    };

    const qrData = await QrCode.findOne({ userId });

    if (!qrData) {
      qrResult = await QrCode.create({
        userId,
        qrStyles: [style],
      });
    } else {
      qrResult = await QrCode.findOneAndUpdate(
        { userId },
        {
          $push: { qrStyles: style },
        },
        { new: true }
      );
    }
    if (!qrResult) throw new Error("No QrStyles found, something went wrong");

    res.json({
      status: 200,
      success: true,
      data: qrResult,
      message: "QR styles added successfully",
    });
  } catch (error) {
    next(error);
  }
};

/*
      @desc PATCH update qr code styles
      @route PATCH /api/v1/user/update-qr-styles
      @access Public
  */
const updateQrStyles = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userId, qrStyleId } = req.params;
  const {
    name,
    bodyColor,
    bodyStyle,
    eyeColor,
    eyeStyle,
    frame,
    frameColor,
    frameIcon,
    frameText,
    frameTextColor,
    logo,
    thumbnail,
  } = req.body;

  try {
    const result = await QrCode.findOneAndUpdate(
      { userId, "qrStyles._id": qrStyleId },
      {
        $set: {
          "qrStyles.$[i].name": name,
          "qrStyles.$[i].bodyColor": bodyColor,
          "qrStyles.$[i].bodyStyle": bodyStyle,
          "qrStyles.$[i].eyeColor": eyeColor,
          "qrStyles.$[i].eyeStyle": eyeStyle,
          "qrStyles.$[i].frame": frame,
          "qrStyles.$[i].frameColor": frameColor,
          "qrStyles.$[i].frameIcon": frameIcon,
          "qrStyles.$[i].frameText": frameText,
          "qrStyles.$[i].frameTextColor": frameTextColor,
          "qrStyles.$[i].logo": logo,
          "qrStyles.$[i].thumbnail": thumbnail,
        },
      },
      {
        new: true,
        arrayFilters: [
          {
            "i._id": qrStyleId,
          },
        ],
        projection: {
          qrStyles: {
            $elemMatch: { _id: qrStyleId },
          },
        },
      }
    );
    if (!result) throw new Error("Styles not found");

    res.json({
      status: 200,
      success: true,
      data: result,
      message: "QR style updated successfully",
    });
  } catch (error) {
    next(error);
  }
};

/*
  @desc PATCH update qr code styles
  @route PATCH /api/v1/user/update-qr-styles
  @access Public
*/
const updateQrCode = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId, qrCodeId } = req.params;
    const { name, qrCodeImage, style, destinationUrl } = req.body;
    const result = await QrCode.findOneAndUpdate(
      {
        userId,
        "qrCodes._id": qrCodeId,
      },
      {
        $set: {
          "qrCodes.$[i].name": name,
          "qrCodes.$[i].qrCodeImage": qrCodeImage,
          "qrCodes.$[i].style": style,
          "qrCodes.$[i].destinationUrl": destinationUrl,
        },
      },
      {
        new: true,
        arrayFilters: [
          {
            "i._id": qrCodeId,
          },
        ],
        projection: {
          qrCodes: {
            $elemMatch: { _id: qrCodeId },
          },
        },
      }
    );

    if (!result) throw new Error("Styles not found");

    res.json({
      status: 200,
      success: true,
      data: null,
      message: "QR updated successfully",
    });
  } catch (error) {
    next(error);
  }
};

export {
  addQrStyles,
  createQrCode,
  deleteQRcode,
  deleteQRcodeStyle,
  getAllQrCodeStylesByUserId,
  getAllQrCodes,
  getQrCodeByUserId,
  updateQrCode,
  updateQrStyles,
};
