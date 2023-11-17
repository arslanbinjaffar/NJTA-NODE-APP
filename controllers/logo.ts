import { Request, Response, NextFunction } from "express";
import Global from "../models/globals.js";
import mongoose from "mongoose";

// Models
import ContentBlockMetaData from "../models/contentBlocksMetaData.js";
import Page from "../models/page.js";
import User from "../models/user.js";

/*
  @desc POST create logo in page
  @route POST api/v1/create/logo/:userId/:pageId
  @access Public
 */
const createLogo = async (req: Request, res: Response, next: NextFunction) => {
  const { blockOrder, blockType, data } = req.body;
  const { userId, pageId } = req.params;
  try {
    const convertedUserId = new mongoose.Types.ObjectId(userId);
    const convertedPageId = new mongoose.Types.ObjectId(pageId);

    if (blockType !== "logo") throw new Error("Block type not recognized");

    // Check from content block metadata
    const contentBlockMD = await ContentBlockMetaData.findOne({
      blockType,
    });

    if (!contentBlockMD) throw new Error("Content block metadata not found");

    // Get user info to check pro
    const userData = await User.findById(userId);

    if (!userData?.pro && contentBlockMD?.pro)
      throw new Error("Not allowed, user must be pro");

    // Check occurrences in globals
    const blockOccurrenceInGlobals = await Global.find({
      userId,
      "globals.blockType": blockType,
    });
    if (blockOccurrenceInGlobals.length)
      throw new Error("Block already exists in globals, try to insert");

    // Check for block order duplication
    const blockOrderDuplication = await Page.aggregate([
      {
        $match: {
          userId: convertedUserId,
        },
      },
      {
        $unwind: "$pages",
      },
      {
        $unwind: "$pages.contentBlocks",
      },
      {
        $match: {
          "pages._id": convertedPageId,
          "pages.contentBlocks.blockOrder": blockOrder,
        },
      },
      {
        $group: {
          _id: null,
          count: {
            $sum: 1,
          },
        },
      },
    ]);

    // Check if blockOrder is repeated
    if (blockOrderDuplication.length)
      throw new Error("Block order cannot be duplicated");

    // Calculate the occurrence of block in page
    const blockOccurrenceInPageData = await Page.aggregate([
      {
        $match: {
          userId: convertedUserId,
        },
      },
      {
        $unwind: "$pages",
      },
      {
        $unwind: "$pages.contentBlocks",
      },
      {
        $match: {
          "pages._id": convertedPageId,
          "pages.contentBlocks.blockType": blockType,
        },
      },
      {
        $group: {
          _id: null,
          count: {
            $sum: 1,
          },
        },
      },
    ]);

    // Check for if blockLimit is exceeded
    const blockOccurrenceInPageDataLimit = blockOccurrenceInPageData.length
      ? blockOccurrenceInPageData[0]?.count
      : 0;

    if (
      contentBlockMD?.blockLimit > 0 &&
      blockOccurrenceInPageDataLimit >= contentBlockMD?.blockLimit
    )
      throw new Error("Block limit exceeded");

    // Creating document in globals
    const globalResult = await Global.findOneAndUpdate(
      {
        userId,
      },
      {
        $push: {
          globals: {
            blockType,
            data,
          },
        },
      },
      {
        new: true,
        upsert: true,
        projection: {
          globals: {
            $elemMatch: { blockType },
          },
        },
      }
    );

    const blockData = {
      blockType,
      blockOrder,
      data: globalResult.globals[0]._id,
    };

    const pageResult = await Page.findOneAndUpdate(
      {
        userId,
        "pages._id": pageId,
      },
      {
        $push: {
          "pages.$.contentBlocks": blockData,
        },
      },
      { new: true }
    );

    if (!pageResult) throw new Error("Page not found, wrong pageId");

    return res.json({
      status: 200,
      success: true,
      data: blockData,
      message: "Logo created successfully",
    });
  } catch (error) {
    next(error);
  }
};

/*
  @desc PATCH update single logo
  @route PATCH api/v1/logo/:userId/:pageId/:blockId
  @access Public
 */
const updateLogo = async (req: Request, res: Response, next: NextFunction) => {
  const { blockType, data } = req.body;
  const { userId } = req.params;

  try {
    if (blockType !== "logo") throw new Error("Block type not recognized");

    // Editing logo
    const contentBlockMD = await ContentBlockMetaData.findOne({
      blockType,
    });

    if (!contentBlockMD) throw new Error("Content block metadata not found");

    // Updating in global
    const globalData = await Global.findOneAndUpdate(
      {
        userId,
        "globals.blockType": blockType,
      },
      {
        $set: {
          "globals.$.data": data,
        },
      }
    );

    if (!globalData) throw new Error("Globals not found, wrong userId");

    res.json({
      status: 200,
      success: true,
      data: data,
      message: "Logo updated successfully",
    });
  } catch (error) {
    next(error);
  }
};

/*
  @desc DELETE delete single logo
  @route DELETE api/v1/logo/:userId/:pageId/:blockId
  @access Public
 */
const deleteLogo = async (req: Request, res: Response, next: NextFunction) => {
  const { userId, pageId, blockId } = req.params;

  try {
    // Delete logo
    const pageData = await Page.find({ userId });

    if (!pageData) throw new Error("Page not found, wrong userId");

    const deleteResult = await Page.findOneAndUpdate(
      {
        userId,
        "pages._id": pageId,
        "pages.contentBlocks._id": blockId,
      },
      {
        $pull: {
          "pages.$.contentBlocks": { _id: blockId },
        },
      },
      { new: true }
    );

    if (!deleteResult) throw new Error("Block not found");

    res.json({
      status: 200,
      success: true,
      data: {},
      message: "Logo deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

export { createLogo, updateLogo, deleteLogo };
