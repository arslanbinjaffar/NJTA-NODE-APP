// import express from "express";

// // Controllers
// import {
//   shopifyAuth,
//   shopifyAuthCallback,
//   createSession,
//   getStoreProducts,
//   addProduct,
//   editProduct,
//   deleteProduct,
// } from "../../../../controllers/shopify.js";

// // Middlewares
// import {
//   createSessionValidator,
//   getStoreProductsValidator,
// } from "../../../../middlewares/validators/shopify.js";

// import verifyToken from "../../../../middlewares/auth/verifyJWT.js";
// const router = express.Router();

// // Shopify api's
// // router.get(
// //   "/auth",
// //   //   verifyToken,
// //   //   createTextValidator,
// //   shopifyAuth
// // );

// // router.get(
// //   "/auth/callback",
// //   //   verifyToken,
// //   //   createTextValidator,
// //   shopifyAuthCallback
// // );

// router.post(
//   "/create-session/:userId",
//   //   verifyToken,
//   createSessionValidator,
//   createSession
// );

// router.post(
//   "/get-store-products/:userId",
//   //   verifyToken,
//   getStoreProductsValidator,
//   getStoreProducts
// );

// router.post(
//   "/create-product/:userId/:pageId",
//   //   verifyToken,
//   getStoreProductsValidator,
//   addProduct
// );

// router.patch(
//   "/edit-product/:userId/:pageId/:blockId",
//   //   verifyToken,
//   getStoreProductsValidator,
//   editProduct
// );

// router.delete(
//   "/delete-product/:userId/:pageId/:blockId",
//   //   verifyToken,
//   getStoreProductsValidator,
//   deleteProduct
// );

// export default router;
