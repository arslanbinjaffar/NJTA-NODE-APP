import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";

// Models
import Page from "../models/page.js";
import User from "../models/user.js";
import ContentBlockMetaData from "../models/contentBlocksMetaData.js";
import Global from "../models/globals.js";

/*
  @desc POST create contact form in page
  @route POST api/v1/create/contact-form/:userId/:pageId
  @access Public
 */
const createContactForm = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { blockOrder, blockType, data } = req.body;
  const { userId, pageId } = req.params;
  try {
    const convertedUserId = new mongoose.Types.ObjectId(userId);
    const convertedPageId = new mongoose.Types.ObjectId(pageId);

    if (blockType !== "contactForm")
      throw new Error("Block type not recognized");

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
      message: "Contact form created successfully",
    });
  } catch (error) {
    next(error);
  }
};

/*
  @desc PATCH update single contact form
  @route PATCH api/v1/contact-form/:userId/:pageId/:blockId
  @access Public
 */
const updateContactForm = async (
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

    if (blockType !== "contactForm")
      throw new Error("Block type not recognized");

    // Editing contact form
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
      message: "Contact form updated successfully",
    });
  } catch (error) {
    next(error);
  }
};

/*
  @desc DELETE delete single contact form
  @route DELETE api/v1/contact-form/:userId/:pageId/:blockId
  @access Public
 */
const deleteContactForm = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userId, pageId, blockId } = req.params;

  try {
    // Delete contact form
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
      message: "Contact form deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

export { createContactForm, deleteContactForm, updateContactForm };
