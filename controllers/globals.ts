import { Request, Response, NextFunction } from "express";

// Models
import Global from "../models/globals.js";

/*
  @desc GET all globals
  @route GET /api/v1/globals
  @access Public
 */
const getAllGlobals = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const allGlobals = await Global.find();

    res.json({
      status: 200,
      success: true,
      data: allGlobals,
      message: null,
    });
  } catch (error) {
    next(error);
  }
};

/*
  @desc GET globals by user id
  @route GET /api/v1/globals/get/:userId
  @access Public
 */
const getGlobalsByUserId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userId } = req.params;
  try {
    const allGlobals = await Global.find({ userId });

    res.json({
      status: 200,
      success: true,
      data: allGlobals,
      message: null,
    });
  } catch (error) {
    next(error);
  }
};

/*
  @desc POST create globals
  @route POST /api/v1/globals/create/:userId
  @access Public
 */
const createGlobal = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userId } = req.params;
  const { blockType, data } = req.body;
  try {
    const result = await Global.create({
      userId,
      blockType,
      data,
    });

    if (!result) throw new Error("Global could not be created");

    return res.json({
      status: 200,
      success: true,
      data: result,
      message: "Globals created successfully",
    });
  } catch (error) {
    next(error);
  }
};

/*
  @desc POST edit globals
  @route POST /api/v1/globals/edit/:userId
  @access Public
 */
const editGlobal = async (req: Request, res: Response, next: NextFunction) => {
  const { userId } = req.params;
  const { blockType, data } = req.body;

  try {
    const result = await Global.findOneAndUpdate(
      { userId },
      {
        blockType,
        data,
      },
      { new: true }
    );
    if (!result) throw new Error("Global data not found, wrong userId");

    res.json({
      status: 200,
      success: true,
      data: result,
      message: "Global updated successfully",
    });
  } catch (error) {
    next(error);
  }
};

/*
  @desc DELETE  delete a global
  @route DELETE /api/v1/globals/delete/:userId
  @access Public
 */
const deleteGlobal = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userId } = req.params;

  try {
    const result = await Global.findOneAndDelete({ userId });
    if (!result) throw new Error("Global not found");

    res.json({
      status: 200,
      success: true,
      data: result,
      message: "Global deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

/*
  @desc DELETE  delete all globals
  @route DELETE /api/v1/globals/delete-all
  @access Public
 */
const deleteAllGlobals = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await Global.deleteMany();

    if (!result) throw new Error("Globals could not be deleted");

    res.json({
      status: 200,
      success: true,
      data: null,
      message: "All globals deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

export {
  getAllGlobals,
  createGlobal,
  editGlobal,
  deleteGlobal,
  deleteAllGlobals,
  getGlobalsByUserId,
};
