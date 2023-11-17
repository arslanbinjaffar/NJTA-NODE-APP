import { Request, Response, NextFunction, query } from "express";
import mongoose from "mongoose";

// Models
import ContentBlockMetaData from "../models/contentBlocksMetaData.js";
import Global from "../models/globals.js";
import Page from "../models/page.js";
import User from "../models/user.js";

/*
  @desc create Social Link
  @route PUT /api/v1/page/social/create/:pageId/:blockId
  @access Public
 */

const createSocialLink = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { blockType, data } = req.body;
  const { userId } = req.params;

  try {
    if (blockType !== "social") throw new Error("Block type not recognized");

    // Check from content block metadata
    const contentBlockMD = await ContentBlockMetaData.findOne({
      blockType,
    });

    if (!contentBlockMD) throw new Error("Content block metadata not found");

    // Get user info to check pro
    const userData = await User.findById(userId);

    if (!userData?.pro && contentBlockMD?.pro)
      throw new Error("Not allowed, user must be pro");

    // Getting data from globals
    const globalData = await Global.find({
      userId,
      "globals.blockType": blockType,
    });

    let globalResult;

    if (!globalData.length) {
      // Creating document in globals
      globalResult = await Global.findOneAndUpdate(
        {
          userId,
        },
        {
          $push: {
            globals: {
              blockType,
              data: [
                {
                  accountUrl: data[0].accountUrl,
                  platform: data[0].platform,
                  icon: data[0].icon,
                  _id: new mongoose.mongo.ObjectId(),
                },
              ],
            },
          },
        },
        {
          new: true,
          upsert: true,
        }
      );

      if (!globalResult) throw new Error("Something went wrong");
    } else {
      // Matching platform
      const platformMatched = await Global.find({
        userId,
        "globals.blockType": blockType,
        "globals.data.platform": data[0].platform,
      });

      // Updating item
      if (platformMatched.length) {
        globalResult = await Global.findOneAndUpdate(
          {
            userId,
            "globals.blockType": blockType,
            "globals.data.platform": data[0].platform,
          },
          {
            $set: {
              "globals.$.data.$[j].accountUrl": data[0].accountUrl,
            },
          },
          {
            new: true,
            arrayFilters: [
              {
                "j.platform": data[0].platform,
              },
            ],
          }
        );

        return res.json({
          status: 200,
          success: true,
          data: globalResult,
          message: "Social links updated successfully",
        });
      }

      globalResult = await Global.findOneAndUpdate(
        {
          userId,
          "globals.blockType": blockType,
        },
        {
          $push: {
            "globals.$.data": {
              accountUrl: data[0].accountUrl,
              platform: data[0].platform,
              icon: data[0].icon,
              _id: new mongoose.mongo.ObjectId(),
            },
          },
        },
        { new: true }
      );
      if (!globalResult) throw new Error("Something went wrong");
    }

    res.json({
      status: 200,
      success: true,
      data: globalResult,
      message: "Social links created successfully",
    });
  } catch (error) {
    next(error);
  }
};

/*
  @desc update Social Link
  @route PATCH /api/v1/social/update/:pageId
  @access Public
 */
const addSocialToPage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { blockType, blockOrder, data } = req.body;
  const { userId, pageId } = req.params;
  let socialsArray: any = [];

  try {
    if (blockType !== "social") throw new Error("Block type not recognized");

    // Getting data from globals
    const globalResult: any = await Global.find(
      {
        userId,
        "globals.blockType": blockType,
        "globals.data.platform": {
          $all: data,
        },
      },
      {
        "globals.data.$": 1,
      }
    );

    if (!globalResult.length) throw new Error("Data not found in globals");

    data.forEach((currentValue: any) => {
      globalResult[0].globals[0].data.forEach((item: any) => {
        if (currentValue == item.platform) {
          socialsArray.push({
            id: item._id,
          });
        }
      });
    });

    const queryResult = await Page.find(
      {
        userId,
        "pages._id": pageId,
      },
      {
        "pages.contentBlocks.$": 1,
      }
    );

    if (!queryResult.length) throw new Error("something went wrong");

    // Finding the occurrences of social in page
    let occurrenceOfSocialInPage = false;
    queryResult[0].pages[0].contentBlocks.forEach((currentValue) => {
      if (currentValue.blockType == blockType) occurrenceOfSocialInPage = true;
    });

    // Inserting the social block in page
    let pageResult;
    if (!occurrenceOfSocialInPage) {
      pageResult = await Page.findOneAndUpdate(
        {
          userId,
          "pages._id": pageId,
        },
        {
          $push: {
            "pages.$.contentBlocks": {
              blockType,
              blockOrder,
              data: socialsArray,
            },
          },
        },
        { new: true }
      );

      if (!pageResult) throw new Error("Page not found");
    } else {
      pageResult = await Page.findOneAndUpdate(
        {
          userId,
          "pages._id": pageId,
          "pages.contentBlocks.blockType": blockType,
        },
        {
          "pages.$.contentBlocks.$[j].data": socialsArray,
        },
        {
          new: true,
          arrayFilters: [{ "j.blockType": blockType }],
        }
      );
      if (!pageResult) throw new Error("Page not found");
    }

    res.json({
      status: 200,
      success: true,
      data: null,
      message: "Social links added to page successfully",
    });
  } catch (error) {
    next(error);
  }
};

/*
  @desc delete Social Link
  @route Delete /api/v1/page/social/delete/:pageId/:blockId
  @access Public
 */
const deleteSocialLink = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userId, pageId, blockId } = req.params;

  try {
    const queryResult = await Page.findOneAndUpdate(
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

    if (!queryResult) throw new Error("Block not found");

    res.json({
      status: 200,
      success: true,
      data: null,
      message: "Social block deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

export { createSocialLink, addSocialToPage, deleteSocialLink };
