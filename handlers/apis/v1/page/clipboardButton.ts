import express from "express";

// Middlewares
import {
  onCreateClipboardButtonValidator,
  onDeleteClipboardButtonValidator,
  onEditClipboardButtonValidator,
} from "../../../../middlewares/validators/clipboardButton.js";

import verifyToken from "../../../../middlewares/auth/verifyJWT.js";

// Controllers
import {
  createClipboardButton,
  deleteClipboardButton,
  updateClipboardButton,
} from "../../../../controllers/clipboardButton.js";

const router = express.Router();

//clipboardButton api's
/**
 * @openapi
 * /api/v1/clipboard-button/create/{userId}/{pageId}:
 *   post:
 *     summary: Create a new clipboard button block on a page
 *     tags: [Clipboard Button]
 *     parameters:
 *       - in: path
 *         name: userId
 *         description: ID of the user for whom the clipboard button block is being created.
 *         required: true
 *         schema:
 *           type: string
 *           example: "64db5086a68cd90a49774199"
 *       - in: path
 *         name: pageId
 *         description: ID of the page to which the clipboard button block is being added.
 *         required: true
 *         schema:
 *           type: string
 *           example: "55dd8d6a95c1bef4603276zsr3"
 *     requestBody:
 *       description: Data for creating a new clipboard button block.
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
 *                 example: "clipboard"
 *               data:
 *                 type: object
 *                 properties:
 *                   content:
 *                     type: string
 *                     example: "any"
 *                   icon:
 *                     type: string
 *                     example: "ashfis"
 *                   highlight:
 *                     type: boolean
 *                     example: false
 *     responses:
 *       201:
 *         description: Clipboard button created successfully.
 *       400:
 *         description: Bad request.
 *       500:
 *         description: An error occurred.
 */

router.post(
  "/create/:userId/:pageId",
  verifyToken,
  onCreateClipboardButtonValidator,
  createClipboardButton
);

/**
 * @openapi
 * /api/v1/clipboard-button/edit/{userId}/{pageId}/{blockId}:
 *   patch:
 *     summary: Update an existing clipboard button block on a page
 *     tags: [Clipboard Button]
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
 *         description: ID of the page containing the clipboard button block.
 *         required: true
 *         schema:
 *           type: string
 *           example: "55dd8d6a95c1bef4603276zsr3"
 *       - in: path
 *         name: blockId
 *         description: ID of the clipboard button block to be updated.
 *         required: true
 *         schema:
 *           type: string
 *           example: "jskfb214jkasf2345jfui34nsjka"
 *     requestBody:
 *       description: Data for updating the clipboard button block.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               data:
 *                 type: object
 *                 properties:
 *                   content:
 *                     type: string
 *                     example: "updatedContent"
 *                   icon:
 *                     type: string
 *                     example: "updatedIcon"
 *                   highlight:
 *                     type: boolean
 *                     example: true
 *     responses:
 *       200:
 *         description: Clipboard button updated successfully.
 *       400:
 *         description: Bad request.
 *       500:
 *         description: An error occurred.
 */

router.patch(
  "/edit/:userId/:pageId/:blockId",
  verifyToken,
  onEditClipboardButtonValidator,
  updateClipboardButton
);

/**
 * @openapi
 * /api/v1/clipboard-button/delete/{userId}/{pageId}/{blockId}:
 *   delete:
 *     summary: Delete an existing clipboard button block from a page
 *     tags: [Clipboard Button]
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
 *         description: ID of the page containing the clipboard button block.
 *         required: true
 *         schema:
 *           type: string
 *           example: "55dd8d6a95c1bef4603276zsr3"
 *       - in: path
 *         name: blockId
 *         description: ID of the clipboard button block to be deleted.
 *         required: true
 *         schema:
 *           type: string
 *           example: "jskfb214jkasf2345jfui34nsjka"
 *     responses:
 *       200:
 *         description: Clipboard button deleted successfully.
 *       400:
 *         description: Bad request.
 *       500:
 *         description: An error occurred.
 */

router.delete(
  "/delete/:userId/:pageId/:blockId",
  verifyToken,
  onDeleteClipboardButtonValidator,
  deleteClipboardButton
);

export default router;
