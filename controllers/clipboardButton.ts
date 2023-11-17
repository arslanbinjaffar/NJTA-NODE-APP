import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";

// Models
import Page from "../models/page.js";
import User from "../models/user.js";
import ContentBlockMetaData from "../models/contentBlocksMetaData.js";

/*
  @desc POST create clipboardButton in page
  @route POST api/v1/create/clipboard-button/:userId/:pageId
  @access Public
 */
const createClipboardButton = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { blockOrder, blockType, data } = req.body;
  const { userId, pageId } = req.params;
  try {
    const convertedUserId = new mongoose.Types.ObjectId(userId);
    const convertedPageId = new mongoose.Types.ObjectId(pageId);

    if (blockType !== "clipboard") throw new Error("Block type not recognized");

    // Check from content block metadata
    const contentBlockMD = await ContentBlockMetaData.findOne({
      blockType,
    });

    if (!contentBlockMD) throw new Error("Content block metadata not found");

    // Get user info to check pro
    const userData = await User.findById(userId);

    if (!userData?.pro && contentBlockMD?.pro)
      throw new Error("Not allowed, user must be pro");

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

    const blockData = {
      blockType,
      blockOrder,
      data,
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
      message: "Clipboard button created successfully",
    });
  } catch (error) {
    next(error);
  }
};

/*
  @desc PATCH update single clipboardButton
  @route PATCH api/v1/clipboard-button/:userId/:pageId/:blockId
  @access Public
 */
const updateClipboardButton = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { blockType, data } = req.body;
  const { userId, pageId, blockId } = req.params;

  try {
    const convertedUserId = new mongoose.Types.ObjectId(userId);
    const convertedPageId = new mongoose.Types.ObjectId(pageId);
    const convertedBlockId = new mongoose.Types.ObjectId(blockId);

    if (blockType !== "clipboard") throw new Error("Block type not recognized");

    // Editing clipboardButton
    const contentBlockMD = await ContentBlockMetaData.findOne({
      blockType,
    });

    if (!contentBlockMD) throw new Error("Content block metadata not found");

    // Updating in page
    const pageData = await Page.findOneAndUpdate(
      {
        userId: convertedUserId,
        "pages._id": convertedPageId,
        "pages.contentBlocks._id": convertedBlockId,
      },
      {
        $set: {
          "pages.$[i].contentBlocks.$[j].data": data,
        },
      },
      {
        arrayFilters: [
          {
            "i._id": convertedPageId,
          },
          {
            "j._id": convertedBlockId,
          },
        ],
      }
    );

    if (!pageData) throw new Error("Page not found, wrong pageId or blockId");

    res.json({
      status: 200,
      success: true,
      data: data,
      message: "Clipboard button updated successfully",
    });
  } catch (error) {
    next(error);
  }
};

/*
  @desc DELETE delete single clipboardButton
  @route DELETE api/v1/clipboard-button/:userId/:pageId/:blockId
  @access Public
 */
const deleteClipboardButton = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userId, pageId, blockId } = req.params;

  try {
    // Delete clipboardButton
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
      message: "Clipboard button deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

export { createClipboardButton, deleteClipboardButton, updateClipboardButton };
