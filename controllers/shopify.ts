// import { NextFunction, Request, Response } from "express";
// import { sessionStorage, shopify } from "../config/shopify/connection.js";
// import mongoose from "mongoose";

// // Models
// import User from "../models/user.js";
// import ContentBlockMetaData from "../models/contentBlocksMetaData.js";
// import Page from "../models/page.js";
// import getProducts from "../shopify/product-creator.js";

// const shopifyAuth = async (req: Request, res: Response, next: NextFunction) => {
//   await shopify.auth.begin();
// };

// const shopifyAuthCallback = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   shopify.auth.callback(), shopify.redirectToShopifyOrAppRoot();
// };

// const createSession = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   const { userId } = req.params;
//   const { storeName } = req.body;
//   try {
//     const userSessionStorage = await sessionStorage.findSessionsByShop(
//       `${storeName}.myshopify.com`
//     );

//     // Storing session info in user metadata
//     const userResponse = await User.findOneAndUpdate(
//       { _id: userId },
//       {
//         $set: {
//           "metadata.shopify": {
//             session: userSessionStorage,
//             storeName: `${storeName}.myshopify.com`,
//           },
//           "metadata.isShopify": true,
//         },
//       },
//       { new: true, upsert: true }
//     );

//     res.json({
//       status: 200,
//       success: true,
//       data: userResponse,
//       message: null,
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// const getStoreProducts = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   const { userId } = req.params;
//   const { storeName } = req.body;

//   try {
//     const user: any = await User.findById(userId);
//     if (!user) throw new Error("Session not found");

//     let data: any;

//     const userSessionStorage = user.metadata.shopify.session;

//     data = await getProducts(userSessionStorage[0], req.body);

//     res.json({
//       status: 200,
//       success: true,
//       data: data.body.data.products,
//       message: null,
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// const addProduct = async (req: Request, res: Response, next: NextFunction) => {
//   const { blockOrder, blockType, data } = req.body;
//   const { pageId, userId } = req.params;
//   try {
//     const convertedUserId = new mongoose.Types.ObjectId(userId);
//     const convertedPageId = new mongoose.Types.ObjectId(pageId);

//     if (blockType !== "product") throw new Error("Block type not recognized");

//     // Check from content block metadata
//     const contentBlockMD = await ContentBlockMetaData.findOne({
//       blockType,
//     });

//     if (!contentBlockMD) throw new Error("Content block metadata not found");

//     // Get user info to check pro
//     const userData = await User.findById(userId);

//     if (!userData?.pro && contentBlockMD?.pro)
//       throw new Error("Not allowed, user must be pro");

//     // Check for block order duplication
//     const blockOrderDuplication = await Page.aggregate([
//       {
//         $match: {
//           userId: convertedUserId,
//         },
//       },
//       {
//         $unwind: "$pages",
//       },
//       {
//         $unwind: "$pages.contentBlocks",
//       },
//       {
//         $match: {
//           "pages._id": convertedPageId,
//           "pages.contentBlocks.blockOrder": blockOrder,
//         },
//       },
//       {
//         $group: {
//           _id: null,
//           count: {
//             $sum: 1,
//           },
//         },
//       },
//     ]);

//     // Check if blockOrder is repeated
//     if (blockOrderDuplication.length)
//       throw new Error("Block order cannot be duplicated");

//     // Calculate the occurrence of block in page
//     const appLinkOccurrenceInPageData = await Page.aggregate([
//       {
//         $match: {
//           userId: convertedUserId,
//         },
//       },
//       {
//         $unwind: "$pages",
//       },
//       {
//         $unwind: "$pages.contentBlocks",
//       },
//       {
//         $match: {
//           "pages._id": convertedPageId,
//           "pages.contentBlocks.blockType": blockType,
//         },
//       },
//       {
//         $group: {
//           _id: null,
//           count: {
//             $sum: 1,
//           },
//         },
//       },
//     ]);

//     // Check for if blockLimit is exceeded
//     const appLinkOccurrenceInPageDataLimit = appLinkOccurrenceInPageData.length
//       ? appLinkOccurrenceInPageData[0]?.count
//       : 0;

//     if (
//       contentBlockMD?.blockLimit > 0 &&
//       appLinkOccurrenceInPageDataLimit >= contentBlockMD?.blockLimit
//     )
//       throw new Error("Block limit exceeded");

//     const blockData = {
//       blockType,
//       blockOrder,
//       data,
//     };

//     const pageResult = await Page.findOneAndUpdate(
//       {
//         userId,
//         "pages._id": pageId,
//       },
//       {
//         $push: {
//           "pages.$.contentBlocks": blockData,
//         },
//       },
//       { new: true }
//     );

//     if (!pageResult) throw new Error("Page not found, wrong pageId");

//     return res.json({
//       status: 200,
//       success: true,
//       data: blockData,
//       message: "Product created successfully",
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// const editProduct = async (req: Request, res: Response, next: NextFunction) => {
//   const { blockType, data } = req.body;
//   const { userId, pageId, blockId } = req.params;

//   try {
//     const convertedUserId = new mongoose.Types.ObjectId(userId);
//     const convertedPageId = new mongoose.Types.ObjectId(pageId);
//     const convertedBlockId = new mongoose.Types.ObjectId(blockId);

//     if (blockType !== "product") throw new Error("Block type not recognized");

//     // Editing appLink
//     const contentBlockMD = await ContentBlockMetaData.findOne({
//       blockType,
//     });

//     if (!contentBlockMD) throw new Error("Content block metadata not found");

//     // Updating in page
//     const pageData = await Page.findOneAndUpdate(
//       {
//         userId: convertedUserId,
//         "pages._id": convertedPageId,
//         "pages.contentBlocks._id": convertedBlockId,
//       },
//       {
//         $set: {
//           "pages.$[i].contentBlocks.$[j].data": data,
//         },
//       },
//       {
//         arrayFilters: [
//           {
//             "i._id": convertedPageId,
//           },
//           {
//             "j._id": convertedBlockId,
//           },
//         ],
//       }
//     );

//     if (!pageData) throw new Error("Page not found, wrong pageId or blockId");

//     res.json({
//       status: 200,
//       success: true,
//       data: data,
//       message: "Product updated successfully",
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// const deleteProduct = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   const { userId, pageId, blockId } = req.params;

//   try {
//     const pageData = await Page.find({ userId });

//     if (!pageData) throw new Error("Page not found, wrong userId");

//     const deleteResult = await Page.findOneAndUpdate(
//       {
//         userId,
//         "pages._id": pageId,
//         "pages.contentBlocks._id": blockId,
//       },
//       {
//         $pull: {
//           "pages.$.contentBlocks": { _id: blockId },
//         },
//       },
//       { new: true }
//     );

//     if (!deleteResult) throw new Error("Block not found");

//     res.json({
//       status: 200,
//       success: true,
//       data: {},
//       message: "Product deleted successfully",
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// export {
//   createSession,
//   getStoreProducts,
//   shopifyAuth,
//   shopifyAuthCallback,
//   addProduct,
//   editProduct,
//   deleteProduct,
// };
