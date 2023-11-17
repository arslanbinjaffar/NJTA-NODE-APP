import express from "express";

// Controllers
import {
  createText,
  deleteText,
  updateText,
} from "../../../../controllers/text.js";

// Middlewares
import {
  createTextValidator,
  deleteTextValidator,
  updateTextValidator,
} from "../../../../middlewares/validators/text.js";

import verifyToken from "../../../../middlewares/auth/verifyJWT.js";
const router = express.Router();

// Text api's
/**
 * @openapi
 * /api/v1/text-block/create/{userId}/{pageId}:
 *   post:
 *     summary: Create a new text block on a page
 *     tags: [Text]
 *     parameters:
 *       - in: path
 *         name: userId
 *         description: ID of the user for whom the text block is being created.
 *         required: true
 *         schema:
 *           type: string
 *           example: "64db5086a68cd90a49774199"
 *       - in: path
 *         name: pageId
 *         description: ID of the page to which the text block is being added.
 *         required: true
 *         schema:
 *           type: string
 *           example: "55dd8d6a95c1bef4603276zsr3"
 *     requestBody:
 *       description: Data for creating a new text block.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               blockOrder:
 *                 type: integer
 *                 example: 2
 *               blockType:
 *                 type: string
 *                 example: "text"
 *               data:
 *                 type: object
 *                 properties:
 *                   text:
 *                     type: string
 *                     example: "test"
 *     responses:
 *       201:
 *         description: Text created successfully.
 *       400:
 *         description: Bad request.
 *       500:
 *         description: An error occurred.
 */

router.post(
  "/create/:userId/:pageId",
  verifyToken,
  createTextValidator,
  createText
);

/**
 * @openapi
 * /api/v1/text-block/edit/{userId}/{pageId}/{blockId}:
 *   patch:
 *     summary: Update an existing text block on a page
 *     tags: [Text]
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
 *         description: ID of the page containing the text block.
 *         required: true
 *         schema:
 *           type: string
 *           example: "55dd8d6a95c1bef4603276zsr3"
 *       - in: path
 *         name: blockId
 *         description: ID of the text block to be updated.
 *         required: true
 *         schema:
 *           type: string
 *           example: "anjs23jkzsfzdj24bkD24kbzsr2"
 *     requestBody:
 *       description: Data for updating the text block.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               data:
 *                 type: object
 *                 properties:
 *                   text:
 *                     type: string
 *                     example: "updatedText"
 *     responses:
 *       200:
 *         description: Text updated successfully.
 *       400:
 *         description: Bad request.
 *       500:
 *         description: An error occurred.
 */

router.patch(
  "/edit/:userId/:pageId/:blockId",
  verifyToken,
  updateTextValidator,
  updateText
);

/**
 * @openapi
 * /api/v1/text-block/delete/{userId}/{pageId}/{blockId}:
 *   delete:
 *     summary: Delete an existing text block from a page
 *     tags: [Text]
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
 *         description: ID of the page containing the text block.
 *         required: true
 *         schema:
 *           type: string
 *           example: "55dd8d6a95c1bef4603276zsr3"
 *       - in: path
 *         name: blockId
 *         description: ID of the text block to be deleted.
 *         required: true
 *         schema:
 *           type: string
 *           example: "anjs23jkzsfzdj24bkD24kbzsr2"
 *     responses:
 *       200:
 *         description: Text deleted successfully.
 *       400:
 *         description: Bad request.
 *       500:
 *         description: An error occurred.
 */

router.delete(
  "/delete/:userId/:pageId/:blockId",
  verifyToken,
  deleteTextValidator,
  deleteText
);

export default router;
