import express from "express";

// Middleware
import {
  createImageValidator,
  deleteImageValidator,
  updateImageValidator,
} from "../../../../middlewares/validators/image.js";

import verifyToken from "../../../../middlewares/auth/verifyJWT.js";

// Controllers
import {
  createImage,
  deleteImage,
  updateImage,
} from "../../../../controllers/image.js";

const router = express.Router();

// Image API's
/**
 * @openapi
 * /api/v1/image/create/{userId}/{pageId}:
 *   post:
 *     summary: Create a new image block on a page
 *     tags: [Image]
 *     parameters:
 *       - in: path
 *         name: userId
 *         description: ID of the user for whom the image block is being created.
 *         required: true
 *         schema:
 *           type: string
 *           example: "64db5086a68cd90a49774199"
 *       - in: path
 *         name: pageId
 *         description: ID of the page to which the image block is being added.
 *         required: true
 *         schema:
 *           type: string
 *           example: "55dd8d6a95c1bef4603276zsr3"
 *     requestBody:
 *       description: Data for creating a new image block.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               blockType:
 *                 type: string
 *                 example: "image"
 *               blockOrder:
 *                 type: integer
 *                 example: 1
 *               data:
 *                 type: object
 *                 properties:
 *                   imageUrl:
 *                     type: string
 *                     example: "http://example.com/image.jpg"
 *                   caption:
 *                     type: string
 *                     example: "My image caption"
 *     responses:
 *       201:
 *         description: Image created successfully.
 *       400:
 *         description: Bad request.
 *       500:
 *         description: An error occurred.
 */
router.post(
  "/create/:userId/:pageId",
  verifyToken,
  createImageValidator,
  createImage
);

/**
 * @openapi
 * /api/v1/image/edit/{userId}/{pageId}/{blockId}:
 *   patch:
 *     summary: Update an existing image block on a page
 *     tags: [Image]
 *     parameters:
 *       - in: path
 *         name: userId
 *         description: ID of the user who owns the image block.
 *         required: true
 *         schema:
 *           type: string
 *           example: "64db5086a68cd90a49774199"
 *       - in: path
 *         name: pageId
 *         description: ID of the page to which the image block belongs.
 *         required: true
 *         schema:
 *           type: string
 *           example: "55dd8d6a95c1bef4603276zsr3"
 *       - in: path
 *         name: blockId
 *         description: ID of the image block to be updated.
 *         required: true
 *         schema:
 *           type: string
 *           example: "8be5f72a18eef6b7a34f05c2"
 *     requestBody:
 *       description: Data for updating an existing image block.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               data:
 *                 type: object
 *                 properties:
 *                   imageUrl:
 *                     type: string
 *                     example: "http://example.com/new-image.jpg"
 *                   caption:
 *                     type: string
 *                     example: "Updated image caption"
 *     responses:
 *       200:
 *         description: Image updated successfully.
 *       400:
 *         description: Bad request.
 *       404:
 *         description: Image not found.
 *       500:
 *         description: An error occurred.
 */
router.patch(
  "/edit/:userId/:pageId/:blockId",
  verifyToken,
  updateImageValidator,
  updateImage
);

/**
 * @openapi
 * /api/v1/image/delete/{userId}/{pageId}/{blockId}:
 *   delete:
 *     summary: Delete an image block from a page
 *     tags: [Image]
 *     parameters:
 *       - in: path
 *         name: userId
 *         description: ID of the user who owns the image block.
 *         required: true
 *         schema:
 *           type: string
 *           example: "64db5086a68cd90a49774199"
 *       - in: path
 *         name: pageId
 *         description: ID of the page from which the image block is deleted.
 *         required: true
 *         schema:
 *           type: string
 *           example: "55dd8d6a95c1bef4603276zsr3"
 *       - in: path
 *         name: blockId
 *         description: ID of the image block to be deleted.
 *         required: true
 *         schema:
 *           type: string
 *           example: "8be5f72a18eef6b7a34f05c2"
 *     responses:
 *       204:
 *         description: Image deleted successfully.
 *       404:
 *         description: Image not found.
 *       500:
 *         description: An error occurred.
 */
router.delete(
  "/delete/:userId/:pageId/:blockId",
  verifyToken,
  deleteImageValidator,
  deleteImage
);

export default router;
