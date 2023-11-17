import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";

//@ts-ignore
import { ConfigWrapper, ListsApi } from "klaviyo-api";

// Mailchimpt imports
import mailchimp from "@mailchimp/mailchimp_marketing";
import fetch from "node-fetch";
import querystring from "querystring";
import { URLSearchParams } from "url";

// Models
import ContentBlockMetaData from "../models/contentBlocksMetaData.js";
import Page from "../models/page.js";
import User from "../models/user.js";

// mailchimp
const mailChimpAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.redirect(
    `https://login.mailchimp.com/oauth2/authorize?${querystring.stringify({
      response_type: "code",
      client_id: process.env.MAILCHIMP_CLIENT_ID,
      redirect_uri: process.env.MAILCHIMP_REDIRECT_URL,
    })}`
  );
};

const mailChimpCallback = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  return res.json({
    status: 200,
    success: true,
    data: null,
    message: "Auth completed",
  });
};

const mailChimpCreateSession = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userId } = req.params;
  const { code } = req.body;

  try {
    const tokenResponse = await fetch(
      "https://login.mailchimp.com/oauth2/token",
      {
        method: "POST",
        body: new URLSearchParams({
          grant_type: "authorization_code",
          client_id: process.env.MAILCHIMP_CLIENT_ID,
          client_secret: process.env.MAILCHIMP_CLIENT_SECERET_KEY,
          redirect_uri: process.env.MAILCHIMP_REDIRECT_URL,
          code,
        }),
      }
    );

    const { access_token } = (await tokenResponse.json()) as {
      access_token: string;
    };

    const metadataResponse = await fetch(
      "https://login.mailchimp.com/oauth2/metadata",
      {
        headers: {
          Authorization: `OAuth ${access_token}`,
        },
      }
    );

    const { dc } = (await metadataResponse.json()) as { dc: string };

    const userResponse = await User.findOneAndUpdate(
      { _id: userId },
      {
        $set: {
          "metadata.mailChimp": {
            session: access_token,
            server: dc,
          },
          "metadata.isMailChimp": true,
        },
      },
      { new: true, upsert: true }
    );

    if (!userResponse) throw new Error("Sessions not stored");

    return res.json({
      status: 200,
      success: true,
      data: access_token,
      message: "Successfully Stored",
    });
  } catch (error) {
    next(error);
  }
};

const getMailChimpAudience = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userId, offset } = req.params;
  try {
    const userResult: any = await User.findOne({ _id: userId });
    if (!userResult) throw new Error("User not found");
    const code = userResult.metadata.mailChimp.session;

    const metadataResponse = await fetch(
      "https://login.mailchimp.com/oauth2/metadata",
      {
        headers: {
          Authorization: `OAuth ${code}`,
        },
      }
    );

    const { dc } = (await metadataResponse.json()) as any;

    mailchimp.setConfig({
      accessToken: code,
      server: dc,
    });

    const allList = await mailchimp.lists.getAllLists({
      fields: [
        "lists.id",
        "lists.web_id",
        "lists.name",
        "lists.contact",
        "lists.subscribe_url_short",
        "lists.subscribe_url_long",
        "total_items",
      ],
      offset: parseInt(offset),
      count: 10,
    });

    return res.json({
      status: 200,
      success: true,
      data: allList,
      message: null,
    });
  } catch (error) {
    next(error);
  }
};

const connectKlayvio = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userId } = req.params;
  let { key, cursor } = req.body;

  try {
    if (!key) {
      const userResult: any = await User.findOne({ _id: userId });
      if (!userResult) throw new Error("User not found");
      key = userResult.metadata.klayvio;
    }
    const listsApi = new ListsApi(ConfigWrapper(key));

    const lists = await listsApi.getLists({
      pageCursor: cursor,
      pageSize: 10,
    });
    if (lists.status == 200) {
      try {
        const userResponse = await User.findOneAndUpdate(
          { _id: userId },
          {
            $set: {
              "metadata.klayvio": key,
              "metadata.isKlayvio": true,
            },
          },
          { new: true, upsert: true }
        );

        if (!userResponse) throw new Error("Key not stored ");

        return res.json({
          status: 200,
          success: true,
          data: { lists: lists.body.data, cursor: lists.body.links },
          message: "Successfully fetched klayvio data",
        });
      } catch (error) {
        next(error);
      }
    }
  } catch (error) {
    next(error);
  }
};

/*
  @desc POST create email subscribe in page
  @route POST api/v1/create/emailSubscribe/:userId/:pageId
  @access Public
 */
const createEmailSubscribe = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { blockOrder, blockType, data } = req.body;
  const { userId, pageId } = req.params;

  try {
    const convertedUserId = new mongoose.Types.ObjectId(userId);
    const convertedPageId = new mongoose.Types.ObjectId(pageId);

    if (blockType !== "emailSubscribe")
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

    // // Check occurrences in globals
    // const blockOccurrenceInGlobals = await Global.find({
    //   userId,
    //   "globals.blockType": blockType,
    // });
    // if (blockOccurrenceInGlobals.length)
    //   throw new Error("Block already exists in globals, try to insert");

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

    // // Creating document in globals
    // const globalResult = await Global.findOneAndUpdate(
    //   {
    //     userId,
    //   },
    //   {
    //     $push: {
    //       globals: {
    //         blockType,
    //         data,
    //       },
    //     },
    //   },
    //   {
    //     new: true,
    //     upsert: true,
    //     projection: {
    //       globals: {
    //         $elemMatch: {
    //           "data.type": data.type,
    //         },
    //       },
    //     },
    //   }
    // );

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
      message: "Email subscribe created successfully",
    });
  } catch (error) {
    next(error);
  }
};

/*
  @desc PATCH update single email subscribe
  @route PATCH api/v1/emailSubscribe/:userId/:pageId/:blockId
  @access Public
 */
const updateEmailSubscribe = async (
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

    if (blockType !== "emailSubscribe")
      throw new Error("Block type not recognized");

    // Editing emailSubscribe
    const contentBlockMD = await ContentBlockMetaData.findOne({
      blockType,
    });

    if (!contentBlockMD) throw new Error("Content block metadata not found");

    // Updating in global
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

    if (!pageData) throw new Error("Globals not found, wrong userId");

    res.json({
      status: 200,
      success: true,
      data: data,
      message: "Email subscribe updated successfully",
    });
  } catch (error) {
    next(error);
  }
};

/*
  @desc DELETE delete single email subscribe
  @route DELETE api/v1/emailSubscribe/:userId/:pageId/:blockId
  @access Public
 */
const deleteEmailSubscribe = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userId, pageId, blockId } = req.params;

  try {
    // Delete emailSubscribe
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
      message: "Email subscribe deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

export {
  connectKlayvio,
  createEmailSubscribe,
  deleteEmailSubscribe,
  getMailChimpAudience,
  mailChimpAuth,
  mailChimpCallback,
  mailChimpCreateSession,
  updateEmailSubscribe,
};
