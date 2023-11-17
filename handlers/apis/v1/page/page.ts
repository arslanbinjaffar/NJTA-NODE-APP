import express from "express";

// Middlewares
import {
  deleteValidator,
  getAllPageValidator,
  getPageValidator,
  pageUpdateValidator,
  createPageValidator,
  getSingleWebPageValidator,
  insertBlockValidator,
  reorderContentBlocksValidator,
} from "../../../../middlewares/validators/page.js";

import verifyToken from "../../../../middlewares/auth/verifyJWT.js";

// Controllers
import {
  createPage,
  deletePage,
  getAllPagesByUserId,
  getSinglePage,
  updatePage,
  getAllPages,
  insertGlobalBlock,
  getSingleWebPage,
  reorderContentBlocks,
  getStaticPage,
} from "../../../../controllers/page.js";

const router = express.Router();

//Page api's
/**
 * @openapi
 * /api/v1/page/all:
 *   get:
 *     summary: Get all pages for all users
 *     tags: [Page]
 *     responses:
 *       200:
 *         description: Successfully retrieved all pages.
 *         content:
 *           application/json:
 *             example:
 *               status: 200
 *               success: true
 *               data:
 *                 - _id: "64e740f3b1c6d1aaa19dfb66"
 *                   userId: "64db5086a68cd90a49774199"
 *                   pages:
 *                     - _id: "64e740f3b1c6d1aaa19dfb67"
 *                       pageStyles: null
 *                       thumbnail: null
 *                       title: ""
 *                       visibility: true
 *                       contentBlocks: []
 *                   __v: 0
 *               message: null
 *       500:
 *         description: An error occurred.
 */

router.get("/all", getAllPages);

/**
 * @openapi
 * /api/v1/page/create/:userId:
 *   post:
 *     summary: Create a new page
 *     tags: [Page]
 *     parameters:
 *       - in: path
 *         name: userId
 *         description: ID of the user for whom the page is being created.
 *         required: true
 *         schema:
 *           type: string
 *           example: "64db5086a68cd90a49774199"
 *     requestBody:
 *       description: Data for creating a new page.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "my page1"
 *     responses:
 *       201:
 *         description: Page created successfully.
 *       400:
 *         description: Bad request.
 *       500:
 *         description: An error occurred.
 */

router.post("/create/:userId", verifyToken, createPageValidator, createPage);

/**
 * @openapi
 * /api/v1/page/all-pages/{userId}:
 *   get:
 *     summary: Get all pages for a specific user
 *     tags: [Page]
 *     parameters:
 *       - in: path
 *         name: userId
 *         description: ID of the user whose pages are being retrieved.
 *         required: true
 *         schema:
 *           type: string
 *           example: "64db5086a68cd90a49774199"
 *     responses:
 *       200:
 *         description: Successfully retrieved all pages for the specified user.
 *         content:
 *           application/json:
 *             example:
 *               status: 200
 *               success: true
 *               data:
 *                 - _id: "64e740f3b1c6d1aaa19dfb66"
 *                   userId: "64db5086a68cd90a49774199"
 *                   pages:
 *                     - _id: "64e740f3b1c6d1aaa19dfb67"
 *                       pageStyles: null
 *                       thumbnail: null
 *                       title: ""
 *                       visibility: true
 *                       contentBlocks: []
 *                   __v: 0
 *               message: null
 *       500:
 *         description: An error occurred.
 */

router.get(
  "/all-pages/:userId",
  verifyToken,
  getAllPageValidator,
  getAllPagesByUserId
);

/**
 * @openapi
 * /api/v1/page/{userId}/{pageId}:
 *   get:
 *     summary: Get a single page for a specific user by user ID and page ID
 *     tags: [Page]
 *     parameters:
 *       - in: path
 *         name: userId
 *         description: ID of the user whose page is being retrieved.
 *         required: true
 *         schema:
 *           type: string
 *           example: "64db5086a68cd90a49774199"
 *       - in: path
 *         name: pageId
 *         description: ID of the page to be retrieved.
 *         required: true
 *         schema:
 *           type: string
 *           example: "64e740f3b1c6d1aaa19dfb67"
 *     responses:
 *       200:
 *         description: Successfully retrieved the specified page.
 *         content:
 *           application/json:
 *             example:
 *               status: 200
 *               success: true
 *               data:
 *                 _id: "64e740f3b1c6d1aaa19dfb66"
 *                 userId: "64db5086a68cd90a49774199"
 *                 pages:
 *                   - _id: "64e740f3b1c6d1aaa19dfb67"
 *                     pageStyles: null
 *                     thumbnail: null
 *                     title: ""
 *                     visibility: true
 *                     contentBlocks: []
 *                 __v: 0
 *               message: null
 *       500:
 *         description: An error occurred.
 */

router
  .route("/:userId/:pageId")
  .get(verifyToken, getPageValidator, getSinglePage);

router.route("/static-web").get(getStaticPage);

/**
 * @openapi
 * /api/v1/page/{userId}/{pageId}:
 *   put:
 *     summary: Update a page for a specific user by user ID and page ID
 *     tags: [Page]
 *     parameters:
 *       - in: path
 *         name: userId
 *         description: ID of the user whose page is being updated.
 *         required: true
 *         schema:
 *           type: string
 *           example: "64db5086a68cd90a49774199"
 *       - in: path
 *         name: pageId
 *         description: ID of the page to be updated.
 *         required: true
 *         schema:
 *           type: string
 *           example: "64e740f3b1c6d1aaa19dfb67"
 *     requestBody:
 *       description: Data for updating the page.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "changed"
 *               visibility:
 *                 type: boolean
 *                 example: true
 *               pageStyles:
 *                 type: object
 *                 example: {"abc": "a"}
 *     responses:
 *       200:
 *         description: Page updated successfully.
 *       400:
 *         description: Bad request.
 *       500:
 *         description: An error occurred.
 */

router
  .route("/:userId/:pageId")
  .put(verifyToken, pageUpdateValidator, updatePage);

/**
 * @openapi
 * /api/v1/page/web/{userId}/{pageId}:
 *   get:
 *     summary: Get details of a single web page for a specific user by user ID and page ID
 *     tags: [Page]
 *     parameters:
 *       - in: path
 *         name: userId
 *         description: ID of the user whose page details are being retrieved.
 *         required: true
 *         schema:
 *           type: string
 *           example: "64db5086a68cd90a49774199"
 *       - in: path
 *         name: pageId
 *         description: ID of the page for which details are being retrieved.
 *         required: true
 *         schema:
 *           type: string
 *           example: "64e740f3b1c6d1aaa19dfb67"
 *     responses:
 *       200:
 *         description: Page details retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                   example: 200
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     pageStyles:
 *                       type: object
 *                       nullable: true
 *                     thumbnail:
 *                       type: string
 *                       nullable: true
 *                     title:
 *                       type: string
 *                       example: "My Page"
 *                     visibility:
 *                       type: boolean
 *                       example: true
 *                     contentBlocks:
 *                       type: array
 *                       items:
 *                         type: object
 *                       example: []
 *                     _id:
 *                       type: string
 *                       example: "64e740f3b1c6d1aaa19dfb67"
 *                 message:
 *                   type: null
 *     400:
 *       description: Bad request.
 *     500:
 *       description: An error occurred.
 */

router.get(
  "/web/:userId/:pageId",
  verifyToken,
  getSingleWebPageValidator,
  getSingleWebPage
);

/**
 * @openapi
 * /api/v1/page/{userId}/{pageId}:
 *   delete:
 *     summary: Delete a page for a specific user by user ID and page ID
 *     tags: [Page]
 *     parameters:
 *       - in: path
 *         name: userId
 *         description: ID of the user whose page is being deleted.
 *         required: true
 *         schema:
 *           type: string
 *           example: "64db5086a68cd90a49774199"
 *       - in: path
 *         name: pageId
 *         description: ID of the page to be deleted.
 *         required: true
 *         schema:
 *           type: string
 *           example: "64e740f3b1c6d1aaa19dfb67"
 *     responses:
 *       200:
 *         description: Page deleted successfully.
 *       400:
 *         description: Bad request.
 *       500:
 *         description: An error occurred.
 */

router.delete("/:userId/:pageId", verifyToken, deleteValidator, deletePage);

/**
 * @openapi
 * /api/v1/page/insert-global-block/{userId}/{pageId}:
 *   post:
 *     summary: Insert a global content block into a specific page by user ID and page ID
 *     tags: [Page]
 *     parameters:
 *       - in: path
 *         name: userId
 *         description: ID of the user who owns the page.
 *         required: true
 *         schema:
 *           type: string
 *           example: "64db5086a68cd90a49774199"
 *       - in: path
 *         name: pageId
 *         description: ID of the page where the global block will be inserted.
 *         required: true
 *         schema:
 *           type: string
 *           example: "64e740f3b1c6d1aaa19dfb67"
 *     requestBody:
 *       description: Data for inserting a global content block into the page.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               globalBlockId:
 *                 type: string
 *                 description: ID of the global content block to be inserted.
 *                 example: "64e85224759987c896317752"
 *               blockOrder:
 *                 type: integer
 *                 description: Position where the global block should be inserted in the page.
 *                 example: 2
 *     responses:
 *       201:
 *         description: Global block inserted into the page successfully.
 *       400:
 *         description: Bad request.
 *       500:
 *         description: An error occurred.
 */

router.post(
  "/insert-global-block/:userId/:pageId",
  verifyToken,
  insertBlockValidator,
  insertGlobalBlock
);

router.post(
  "/page-reorder/:userId/:pageId",
  verifyToken,
  reorderContentBlocksValidator,
  reorderContentBlocks
);

export default router;
