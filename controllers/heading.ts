import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";

// Models
import ContentBlockMetaData from "../models/contentBlocksMetaData.js";
import Page from "../models/page.js";
import User from "../models/user.js";

/*
  @desc create page heading
  @route Post /api/v1/heading/create/:userId/:pageId
  @access Public
 */
const createPageHeading = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { blockOrder, blockType, data } = req.body;
  const { pageId, userId } = req.params;
  try {
    const convertedUserId = new mongoose.Types.ObjectId(userId);
    const convertedPageId = new mongoose.Types.ObjectId(pageId);

    if (blockType !== "heading") throw new Error("Block type not recognized");

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
    const headingOccurrenceInPageData = await Page.aggregate([
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
    const headingOccurrenceInPageDataLimit = headingOccurrenceInPageData.length
      ? headingOccurrenceInPageData[0]?.count
      : 0;

    if (
      contentBlockMD?.blockLimit > 0 &&
      headingOccurrenceInPageDataLimit >= contentBlockMD?.blockLimit
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
      }
    );

    if (!pageResult) throw new Error("Page not found, wrong pageId");

    return res.json({
      status: 200,
      success: true,
      data: blockData,
      message: "Heading created successfully",
    });
  } catch (error) {
    next(error);
  }
};

/*
  @desc update page heading 
  @route PUT /api/v1/heading/:userId/:pageId/:blockId
  @access Public
 */
const updateHeading = async (
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

    if (blockType !== "heading") throw new Error("Block type not recognized");

    // Editing heading
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
      message: "Heading updated successfully",
    });
  } catch (error) {
    next(error);
  }
};

/*
  @desc delete page heading 
  @route del /api/v1/heading/:userId/:pageId/:blockId
  @access Public
 */
const deleteHeading = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { pageId, blockId, userId } = req.params;

  try {
    // Delete heading
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
      message: "Heading deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

export { createPageHeading, deleteHeading, updateHeading };
