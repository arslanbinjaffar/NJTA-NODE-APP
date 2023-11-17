import express from "express";

// Middlewares
import {
  onCreateGlobalValidator,
  onEditGlobalValidator,
  onDeleteGlobalValidator,
  onGetGlobalsByUserId,
} from "../../../middlewares/validators/global.js";

// Controllers
import {
  getAllGlobals,
  createGlobal,
  editGlobal,
  deleteGlobal,
  deleteAllGlobals,
  getGlobalsByUserId,
} from "../../../controllers/globals.js";
import verifyToken from "../../../middlewares/auth/verifyJWT.js";

const router = express.Router();

// Globals api's
/**
 * @openapi
 * /api/v1/globals/create/{userId}:
 *   post:
 *     summary: Create a new globals
 *     tags: [Globals]
 *     parameters:
 *       - in: path
 *         name: userId
 *         description: ID of the user for whom the global is being created.
 *         required: true
 *         schema:
 *           type: string
 *           example: "64db5086a68cd90a49774199"
 *     requestBody:
 *       description: Data for creating a new globals.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               blockType:
 *                 type: string
 *                 example: "heading"
 *               blockOrder:
 *                 type: integer
 *                 example: 1
 *               data:
 *                 type: object
 *                 properties:
 *                   content:
 *                     type: string
 *                     example: "Example content"
 *     responses:
 *       201:
 *         description: Globals created successfully.
 *       400:
 *         description: Bad request.
 *       500:
 *         description: An error occurred.
 */

router.post("/create/:userId", onCreateGlobalValidator, createGlobal);

/**
 * @openapi
 * /api/v1/globals:
 *   get:
 *     summary: Get all globals
 *     tags: [Globals]
 *     responses:
 *       200:
 *         description: Successfully retrieved globals.
 *         content:
 *           application/json:
 *             example:
 *               status: 200
 *               success: true
 *               data: [
 *                 {
 *                   _id: "64e85224759987c896317752",
 *                   userId: "64db5086a68cd90a49774199",
 *                   blockType: "video",
 *                   data: {
 *                     videoUrl: "videourl",
 *                     thumbnail: "videothumbnail"
 *                   },
 *                   globals: [],
 *                   __v: 0
 *                 }
 *               ]
 *       500:
 *         description: An error occurred.
 */

router.get("/", getAllGlobals);

/**
 * @openapi
 * /api/v1/globals/get/{userId}:
 *   get:
 *     summary: Get globals by user ID
 *     tags: [Globals]
 *     parameters:
 *       - in: path
 *         name: userId
 *         description: ID of the user for whom to retrieve globals.
 *         required: true
 *         schema:
 *           type: string
 *           example: "64db5086a68cd90a49774199"
 *     responses:
 *       200:
 *         description: Successfully retrieved globals for the specified user.
 *         content:
 *           application/json:
 *             example:
 *               status: 200
 *               success: true
 *               data: [
 *                 {
 *                   _id: "64e85224759987c896317752",
 *                   userId: "64db5086a68cd90a49774199",
 *                   blockType: "video",
 *                   data: {
 *                     videoUrl: "videourl",
 *                     thumbnail: "videothumbnail"
 *                   },
 *                   globals: [],
 *                   __v: 0
 *                 }
 *               ]
 *       400:
 *         description: Bad request.
 *       500:
 *         description: An error occurred.
 */

router.get(
  "/get/:userId",
  verifyToken,
  onGetGlobalsByUserId,
  getGlobalsByUserId
);
/**
 * @openapi
 * /api/v1/globals/edit/{userId}:
 *   patch:
 *     summary: Update a global by user ID
 *     tags: [Globals]
 *     parameters:
 *       - in: path
 *         name: userId
 *         description: ID of the user who owns the global.
 *         required: true
 *         schema:
 *           type: string
 *           example: "64db5086a68cd90a49774199"
 *     requestBody:
 *       description: Data for updating the global.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               blockType:
 *                 type: string
 *                 example: "video"
 *               data:
 *                 type: object
 *                 properties:
 *                   videoUrl:
 *                     type: string
 *                     example: "newvideourl"
 *                   thumbnail:
 *                     type: string
 *                     example: "newvideothumbnail"
 *     responses:
 *       200:
 *         description: Globals updated successfully.
 *       400:
 *         description: Bad request.
 *       500:
 *         description: An error occurred.
 */

router.patch("/edit/:userId", onEditGlobalValidator, editGlobal);

/**
 * @openapi
 * /api/v1/globals/delete/{userId}:
 *   delete:
 *     summary: Delete a global by user ID
 *     tags: [Globals]
 *     parameters:
 *       - in: path
 *         name: userId
 *         description: ID of the user who owns the global.
 *         required: true
 *         schema:
 *           type: string
 *           example: "64db5086a68cd90a49774199"
 *     responses:
 *       200:
 *         description: Globals deleted successfully.
 *       400:
 *         description: Bad request.
 *       500:
 *         description: An error occurred.
 */

router.delete("/delete/:userId", onDeleteGlobalValidator, deleteGlobal);

/**
 * @openapi
 * /api/v1/globals/delete-all:
 *   delete:
 *     summary: Delete all globals
 *     tags: [Globals]
 *     responses:
 *       200:
 *         description: All globals deleted successfully.
 *       500:
 *         description: An error occurred.
 */

router.delete("/delete-all", deleteAllGlobals);

export default router;
