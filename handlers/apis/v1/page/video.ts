import express from "express";

// Middleware
import {
  createVideoValidator,
  deleteVideoValidator,
  updateVideoValidator,
} from "../../../../middlewares/validators/video.js";

import verifyToken from "../../../../middlewares/auth/verifyJWT.js";

// Controllers
import {
  createVideo,
  deleteVideo,
  updateVideo,
} from "../../../../controllers/video.js";

const router = express.Router();

// Video api's
/**
 * @openapi
 * /api/v1/video/create/{userId}/{pageId}:
 *   post:
 *     summary: Create a new video block on a page
 *     tags: [Video]
 *     parameters:
 *       - in: path
 *         name: userId
 *         description: ID of the user for whom the video block is being created.
 *         required: true
 *         schema:
 *           type: string
 *           example: "64db5086a68cd90a49774199"
 *       - in: path
 *         name: pageId
 *         description: ID of the page to which the video block is being added.
 *         required: true
 *         schema:
 *           type: string
 *           example: "55dd8d6a95c1bef4603276zsr3"
 *     requestBody:
 *       description: Data for creating a new video block.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               blockType:
 *                 type: string
 *                 example: "video"
 *               blockOrder:
 *                 type: integer
 *                 example: 5
 *               data:
 *                 type: object
 *                 properties:
 *                   videoUrl:
 *                     type: string
 *                     example: "videourl"
 *                   thumbnail:
 *                     type: string
 *                     example: "videothumbnail"
 *     responses:
 *       201:
 *         description: Video created successfully.
 *       400:
 *         description: Bad request.
 *       500:
 *         description: An error occurred.
 */

router.post(
  "/create/:userId/:pageId",
  verifyToken,
  createVideoValidator,
  createVideo
);

/**
 * @openapi
 * /api/v1/video/edit/{userId}/{pageId}/{blockId}:
 *   patch:
 *     summary: Update an existing video block on a page
 *     tags: [Video]
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
 *         description: ID of the page containing the video block.
 *         required: true
 *         schema:
 *           type: string
 *           example: "55dd8d6a95c1bef4603276zsr3"
 *       - in: path
 *         name: blockId
 *         description: ID of the video block to be updated.
 *         required: true
 *         schema:
 *           type: string
 *           example: "jasfb43bjsd234bja25bs234br4"
 *     requestBody:
 *       description: Data for updating the video block.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               data:
 *                 type: object
 *                 properties:
 *                   videoUrl:
 *                     type: string
 *                     example: "updatedVideourl"
 *                   thumbnail:
 *                     type: string
 *                     example: "updatedVideothumbnail"
 *     responses:
 *       200:
 *         description: Video updated successfully.
 *       400:
 *         description: Bad request.
 *       500:
 *         description: An error occurred.
 */

router.patch(
  "/edit/:userId/:pageId/:blockId",
  verifyToken,
  updateVideoValidator,
  updateVideo
);

/**
 * @openapi
 * /api/v1/video/delete/{userId}/{pageId}/{blockId}:
 *   delete:
 *     summary: Delete an existing video block from a page
 *     tags: [Video]
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
 *         description: ID of the page containing the video block.
 *         required: true
 *         schema:
 *           type: string
 *           example: "55dd8d6a95c1bef4603276zsr3"
 *       - in: path
 *         name: blockId
 *         description: ID of the video block to be deleted.
 *         required: true
 *         schema:
 *           type: string
 *           example: "jasfb43bjsd234bja25bs234br4"
 *     responses:
 *       200:
 *         description: Video deleted successfully.
 *       400:
 *         description: Bad request.
 *       500:
 *         description: An error occurred.
 */

router.delete(
  "/delete/:userId/:pageId/:blockId",
  verifyToken,
  deleteVideoValidator,
  deleteVideo
);

export default router;
