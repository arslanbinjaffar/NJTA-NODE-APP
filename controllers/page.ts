import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";

// Models
import ContentBlockMetaData from "../models/contentBlocksMetaData.js";
import Global from "../models/globals.js";
import Page from "../models/page.js";
import User from "../models/user.js";

/*
  @desc create page
  @route POST /api/v1/page/create/:userId
  @access Public
 */
const createPage = async (req: Request, res: Response, next: NextFunction) => {
  const { title } = req.body;
  const { userId } = req.params;

  // Global variables
  let pageResult;

  try {
    const convertedUserId = new mongoose.Types.ObjectId(userId);

    // Get page data
    const pageData = await Page.findOne({ userId });

    const pageTemplate = {
      title,
      pageStyle: {},
      contentBlocks: [],
    };

    if (!pageData) {
      pageResult = await Page.create({
        userId,
        pages: [pageTemplate],
      });
    } else {
      pageResult = await Page.findOneAndUpdate(
        { userId },
        {
          $push: {
            pages: pageTemplate,
          },
        },
        {
          new: true,
          projection: { pages: { $slice: -1 } },
        }
      );
    }
    if (!pageResult) throw new Error("Page not created, something went wrong");

    res.json({
      status: 200,
      success: true,
      data: pageResult.pages[0],
      message: "Page created successfully",
    });
  } catch (error) {
    next(error);
  }
};

/*
  @desc get page 
  @route GET /api/v1/page/:pageId
  @access Public
 */
const getSinglePage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userId, pageId } = req.params;
  try {
    // Get page data
    const pageData = await Page.find({
      userId,
    });

    if (!pageData.length) throw new Error("No page exists");

    const page = pageData[0].pages.filter((val) => val?._id == pageId);

    if (!page.length) throw new Error("Page not found");

    let tempPage = page[0];

    // Fetching data from global based on received arguments
    const fetchDataFromGlobals = async (objectID: string, index: number) => {
      const convertedId = new mongoose.Types.ObjectId(objectID);
      const result = await Global.findOne(
        {
          userId,
          "globals._id": convertedId,
        },
        {
          _id: 0,
          globals: {
            $elemMatch: {
              _id: convertedId,
            },
          },
        }
      );

      return result?.globals[0]?.data;
    };

    const fetchSocialsFromGlobals = async (
      arrayOfIds: string,
      index: number
    ) => {
      let socials = [];
      const result = await Global.findOne(
        {
          userId,
        },
        {
          _id: 0,
          globals: {
            $elemMatch: {
              blockType: "social",
            },
          },
        }
      );

      interface Platform {
        id: string;
      }

      let dbResponse: any = result?.globals[0].data;
      let platform: any;
      for (platform of arrayOfIds) {
        for (const dbItem of dbResponse) {
          if (dbItem._id.toString() === platform.id.toString()) {
            socials.push(dbItem);
          }
        }
      }

      return socials;
    };
    // Assigning globals data to page data
    async function fetchGlobals() {
      const cbs: any = page[0]?.contentBlocks;
      let i = 0;
      for (const cb of cbs) {
        if (typeof cb.blockType == "string") {
          if (
            cb.blockType == "bio" ||
            cb.blockType == "logo" ||
            cb.blockType == "contactCard"
          ) {
            const contents = await fetchDataFromGlobals(cb.data, i);
            tempPage.contentBlocks[i].data = {
              ...contents,
            };
          }
          // if (cb.blockType == "emailSubscribe") {
          //   const contents: any = await fetchDataFromGlobals(cb.data._id, i);
          //   if (cb.data.type == contents.type) {
          //     tempPage.contentBlocks[i].data = {
          //       ...contents,
          //     };
          //   }
          // }
          // For social
          if (cb.blockType == "social") {
            const contents: any = await fetchSocialsFromGlobals(cb.data, i);

            tempPage.contentBlocks[i].data = contents;
          }
          i++;
        }
      }
    }

    // Calling function
    await fetchGlobals();

    res.json({
      status: 200,
      success: true,
      data: tempPage,
      message: null,
    });
  } catch (error) {
    next(error);
  }
};
const getStaticPage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const tmpPage = {
      title: "Qub Page",
      visibility: true,
      pageStyle: { backgroundColor: "red" },
      contentBlocks: [
        {
          blockType: "heading",
          blockOrder: 1,
          data: {
            heading: "Sample heading",
          },
          _id: "64db53b1ffd44a65660c7da2",
        },
        {
          blockType: "image",
          blockOrder: 2,
          data: {
            description: "image description",
            imageUrl:
              "https://qubio-dev.s3.ap-southeast-1.amazonaws.com/images.jpg",
          },
          _id: "64db53b1ffd44a65660c7da3",
        },
        {
          blockType: "carousel",
          blockOrder: 3,
          data: {
            carousel: [
              "https://qubio-dev.s3.ap-southeast-1.amazonaws.com/images9.jpg",
              "https://qubio-dev.s3.ap-southeast-1.amazonaws.com/images8.jpg",
              "https://qubio-dev.s3.ap-southeast-1.amazonaws.com/images7.jpg",
              "https://qubio-dev.s3.ap-southeast-1.amazonaws.com/images5.jpg",
              "https://qubio-dev.s3.ap-southeast-1.amazonaws.com/images4.jpg",
              "https://qubio-dev.s3.ap-southeast-1.amazonaws.com/images3.jpg",
              "https://qubio-dev.s3.ap-southeast-1.amazonaws.com/images2.jpg",
              "https://qubio-dev.s3.ap-southeast-1.amazonaws.com/images11.jpg",
              "https://qubio-dev.s3.ap-southeast-1.amazonaws.com/images10.jpg",
            ],
          },
          _id: "64db53b1ffd44a65660c7da4",
        },
        {
          blockType: "audio",
          blockOrder: 4,
          data: {
            audioUrl:
              "https://qubio-dev.s3.ap-southeast-1.amazonaws.com/Over_the_Horizon.mp3",
            title: "audio title",
          },
          _id: "64db53b1ffd44a65660c7da5",
        },
        {
          blockType: "video",
          blockOrder: 5,
          data: {
            videoUrl: "https://www.youtube.com/watch?v=YiSQ_db-Dcw",
            thumbnail:
              "https://s3-alpha.figma.com/hub/file/3793902531/fcd64a6f-fb24-4c37-9bc6-ac1fe9728f19-cover.png",
            type: "embedded",
            tag: "youtube",
          },
          _id: "64db53b1ffd44a65660c7da6",
        },
        {
          blockType: "video",
          blockOrder: 6,
          data: {
            videoUrl: "https://www.youtube.com/watch?v=YiSQ_db-Dcw",
            thumbnail:
              "https://s3-alpha.figma.com/hub/file/3793902531/fcd64a6f-fb24-4c37-9bc6-ac1fe9728f19-cover.png",
            type: "local",
          },
          _id: "64db53b1ffd44a65660c7da7",
        },
        {
          blockType: "social",
          blockOrder: 7,
          data: [
            {
              accountUrl: "https://www.instagram.com/",
              platform: "instagram",
              icon: "fa-instagram",
            },
            {
              accountUrl: "https://twitter.com/?lang=en",
              platform: "twitter",
              icon: "fa-twitter",
            },
            {
              accountUrl: "https://pk.linkedin.com/",
              platform: "linkedin",
              icon: "fa-linkedin",
            },
            {
              accountUrl: "https://www.facebook.com/",
              platform: "facebook",
              icon: "fa-facebook",
            },
            {
              accountUrl: "https://www.twitch.tv/",
              platform: "twitch",
              icon: "fa-twitch",
            },
            {
              accountUrl: "https://discord.com/",
              platform: "discord",
              icon: "fa-discord",
            },
            {
              accountUrl: "https://www.tiktok.com/en/",
              platform: "tiktok",
              icon: "fa-tiktok",
            },
            {
              accountUrl: "https://open.spotify.com/",
              platform: "spotify",
              icon: "fa-spotify",
            },
            {
              accountUrl: "https://www.snapchat.com/",
              platform: "snapchat",
              icon: "fa-snapchat",
            },
          ],
          _id: "64db53b1ffd44a65660c7da8",
        },
        {
          blockType: "link",
          blockOrder: 8,
          data: {
            url: "https://tse2.mm.bing.net/th?id=OIP.p3e5Y37IbeWX45Atdp_9_AHaE8&pid=Api&P=0&h=180",
            icon: "link",
            buttonText: "enter",
            highlight: false,
          },
          _id: "64db53b1ffd44a65660c7da9",
        },
        {
          blockType: "logo",
          blockOrder: 9,
          data: {
            logoUrl:
              "https://bloggytalky.com/wp-content/uploads/2017/07/create-a-free-logo-design-logo-designs-design-a-free-logo-design-a-free-logo-alltech-just-free-logo-design.png",
          },
          _id: "64db53b1ffd44a65660c7da0",
        },
        {
          blockType: "text",
          blockOrder: 10,
          data: {
            text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
          },
          _id: "64db53b1ffd44a65660c8da1",
        },
        {
          blockType: "bio",
          blockOrder: 11,
          data: {
            headline: "sample title",
            bioText: "Lorem Ipsum",
            url: "https://qubio-dev.s3.ap-southeast-1.amazonaws.com/images.jpg",
          },
          _id: "64db53b1ffd44a65660c8da2",
        },
        {
          blockType: "clipboard",
          blockOrder: 12,
          data: {
            content: "Lorem Ipsum",
            icon: "clipboard",
            highlight: false,
          },
          _id: "64db53b1ffd44a65660c8da3",
        },
        {
          blockType: "appLink",
          blockOrder: 13,
          data: {
            ios: "ios.url",
            android: "android.url",
          },
        },
      ],
      _id: "64db53b1ffd44a65660c9db4",
    };
    res.json({
      status: 200,
      success: true,
      data: tmpPage,
      message: null,
    });
  } catch (error) {
    next(error);
  }
};

/*
  @desc get page 
  @route GET /api/v1/page/:pageId
  @access Public
 */
const getSingleWebPage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userId, pageId } = req.params;
  try {
    // Get page data
    const pageData = await Page.find({
      userId,
    });

    if (!pageData.length) throw new Error("No page exists");

    const page = pageData[0].pages.filter((val) => val?._id == pageId);

    if (!page.length) throw new Error("Page not found");

    let tempPage = page[0];

    // Fetching data from global based on received arguments
    const fetchDataFromGlobals = async (blockType: string, index: number) => {
      const result = await Global.findOne(
        {
          userId,
          "globals.blockType": "bio",
        },
        {
          _id: 0,
          globals: {
            $elemMatch: {
              blockType,
            },
          },
        }
      );

      return result?.globals[0]?.data;
    };

    // Assigning globals data to page data
    async function fetchGlobals() {
      const cbs = page[0]?.contentBlocks;
      let i = 0;
      for (const cb of cbs) {
        if (typeof cb.blockType == "string") {
          if (cb.blockType == "bio") {
            const contents = await fetchDataFromGlobals(cb.blockType, i);

            tempPage.contentBlocks[i].data = {
              ...contents,
            };
          }
          i++;
        }
      }
    }

    // Calling function
    await fetchGlobals();

    console.log("🚀 ~ file: page.ts:266 ~ tempPage:", tempPage);
    res.json({
      status: 200,
      success: true,
      data: tempPage,
      message: null,
    });
  } catch (error) {
    next(error);
  }
};

/*
  @desc get all pages 
  @route GET /api/v1/page/all-pages/:userId
  @access Public
 */
const getAllPagesByUserId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userId } = req.params;
  try {
    // Get page
    const pageData = await Page.find({
      userId,
    });

    if (!pageData) throw new Error("No pages found");

    res.json({
      status: 200,
      success: true,
      data: pageData,
      message: null,
    });
  } catch (error) {
    next(error);
  }
};

/*
  @desc get all pages 
  @route GET /api/v1/page/all-pages
  @access Public
 */
const getAllPages = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Get All page
    const pageHeadings = await Page.find();

    if (!pageHeadings) throw new Error("page not found");

    res.json({
      status: 200,
      success: true,
      data: pageHeadings,
      message: null,
    });
  } catch (error) {
    next(error);
  }
};

/*
  @desc update page 
  @route PUT /api/v1/page/:pageId
  @access Public
 */
const updatePage = async (req: Request, res: Response, next: NextFunction) => {
  const { title, visibility, thumbnail, pageStyles } = req.body;
  const { pageId, userId } = req.params;

  try {
    // Find the page by its ID in the database
    const pageResult = await Page.findOneAndUpdate(
      { userId, "pages._id": pageId },
      {
        $set: {
          "pages.$.title": title,
          "pages.$.visibility": visibility,
          "pages.$.thumbnail": thumbnail,
          "pages.$.pageStyles": pageStyles,
        },
      },
      { new: true }
    );

    if (!pageResult) {
      throw new Error("Page updation failed");
    }

    res.json({
      status: 200,
      success: true,
      data: pageResult,
      message: "Page updated successfully",
    });
  } catch (error) {
    next(error);
  }
};

/*
  @desc delete page 
  @route del /api/v1/page/:pageId
  @access Public
 */
const deletePage = async (req: Request, res: Response, next: NextFunction) => {
  const { userId, pageId } = req.params;

  try {
    // Delete page;
    const page = await Page.findOneAndUpdate(
      {
        userId,
        "pages._id": pageId,
      },
      {
        $pull: {
          pages: {
            _id: pageId,
          },
        },
      },
      { new: true }
    );

    if (!page) throw new Error("Page deletion failed");

    res.json({
      status: 200,
      success: true,
      data: null,
      message: "Page deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

const insertGlobalBlock = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { blockType, blockOrder, data } = req.body;
  const { userId, pageId } = req.params;

  try {
    const convertedUserId = new mongoose.Types.ObjectId(userId);
    const convertedPageId = new mongoose.Types.ObjectId(pageId);

    if (
      blockType != "bio" &&
      blockType != "logo" &&
      blockType != "contactCard" &&
      blockType != "product" &&
      blockType != "emailSubscribe"
    )
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

    const globalResult = await Global.find(
      {
        userId,
        "globals._id": data.id,
      },
      {
        globals: {
          $elemMatch: {
            _id: data.id,
          },
        },
      }
    );

    if (!globalResult) throw new Error("Data not found");

    const blockTemplate = {
      blockOrder,
      blockType,
      data: globalResult[0].globals[0]._id,
    };

    const pageResult = await Page.findOneAndUpdate(
      {
        userId,
        "pages._id": pageId,
      },
      {
        $push: {
          "pages.$.contentBlocks": blockTemplate,
        },
      },
      { new: true, projection: { pages: { $slice: -1 } } }
    );

    if (!pageResult) throw new Error("Something went wrong");

    return res.json({
      status: 200,
      success: true,
      data: pageResult,
      message: "Block inserted successfully",
    });
  } catch (error) {
    next(error);
  }
};

const reorderContentBlocks = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userId, pageId } = req.params;
  const { contentBlocks } = req.body;

  type contentBlocksTypes = [
    {
      blockType: {
        type: string;
      };
      blockOrder: {
        type: number;
      };
      data: {};
      _id?: any;
    }
  ];

  try {
    const userPage = await Page.findOne(
      { userId },
      { pages: { $elemMatch: { _id: pageId } } }
    );
    if (!userPage) {
      throw new Error("Page not found");
    }

    let contentblocksData: contentBlocksTypes =
      userPage!.pages[0].contentBlocks;

    if (contentblocksData.length !== contentBlocks.length) {
      throw new Error("Page data not matched");
    }

    for (let i = 0; i < contentblocksData.length; i++) {
      for (let j = 0; j < contentBlocks.length; j++) {
        if (
          contentblocksData[i]._id.toString() ==
          new mongoose.Types.ObjectId(contentBlocks[j]._id.toString())
        ) {
          contentblocksData[i].blockOrder = contentBlocks[j].blockOrder;
        }
      }
    }

    await Page!.updateOne(
      { "pages._id": pageId },
      { $set: { "pages.$.contentBlocks": contentblocksData } }
    );
    return res.json({
      status: 200,
      success: true,
      data: contentblocksData,
      message: "Blocks re-arranged successfully",
    });
  } catch (error) {
    next(error);
  }
};

export {
  createPage,
  deletePage,
  getAllPages,
  getAllPagesByUserId,
  getSinglePage,
  getStaticPage,
  insertGlobalBlock,
  updatePage,
  getSingleWebPage,
  reorderContentBlocks,
};
