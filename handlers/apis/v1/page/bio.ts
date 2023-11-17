import express from "express";

// Middlewares
import {
  onCreateBioValidator,
  onDeleteBioValidator,
  onEditBioValidator,
} from "../../../../middlewares/validators/bio.js";

import verifyToken from "../../../../middlewares/auth/verifyJWT.js";

// Controllers
import { createBio, deleteBio, editBio } from "../../../../controllers/bio.js";

const router = express.Router();

/**
 * @openapi
 * /api/v1/bio/create/{userId}/{pageId}:
 *   post:
 *     summary: Create a new bio block on a page
 *     tags: [Bio]
 *     parameters:
 *       - in: path
 *         name: userId
 *         description: ID of the user for whom the bio block is being created.
 *         required: true
 *         schema:
 *           type: string
 *           example: "64db5086a68cd90a49774199"
 *       - in: path
 *         name: pageId
 *         description: ID of the page to which the bio block is being added.
 *         required: true
 *         schema:
 *           type: string
 *           example: "55dd8d6a95c1bef4603276zsr3"
 *     requestBody:
 *       description: Data for creating a new bio block.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               blockOrder:
 *                 type: integer
 *                 example: 2331
 *               blockType:
 *                 type: string
 *                 example: "bio"
 *               data:
 *                 type: object
 *                 properties:
 *                   headline:
 *                     type: string
 *                     example: "ios.url"
 *                   bioText:
 *                     type: string
 *                     example: "asdf"
 *                   url:
 *                     type: string
 *                     example: "asdf"
 *     responses:
 *       201:
 *         description: Bio created successfully.
 *       400:
 *         description: Bad request.
 *       500:
 *         description: An error occurred.
 */

router.post(
  "/create/:userId/:pageId",
  verifyToken,
  onCreateBioValidator,
  createBio
);

/**
 * @openapi
 * /api/v1/bio/edit/{userId}:
 *   patch:
 *     summary: Edit the bio block for a user
 *     tags: [Bio]
 *     parameters:
 *       - in: path
 *         name: userId
 *         description: ID of the user whose bio block is being edited.
 *         required: true
 *         schema:
 *           type: string
 *           example: "64db5086a68cd90a49774199"
 *     requestBody:
 *       description: Data for editing the bio block.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               headline:
 *                 type: string
 *                 example: "newHeadline"
 *               bioText:
 *                 type: string
 *                 example: "Updated bio text"
 *               url:
 *                 type: string
 *                 example: "newUrl"
 *     responses:
 *       200:
 *         description: Bio edited successfully.
 *       400:
 *         description: Bad request.
 *       500:
 *         description: An error occurred.
 */

router.patch("/edit/:userId", verifyToken, onEditBioValidator, editBio);

/**
 * @openapi
 * /api/v1/bio/delete/{userId}/{pageId}/{blockId}:
 *   delete:
 *     summary: Delete a bio block from a user's page
 *     tags: [Bio]
 *     parameters:
 *       - in: path
 *         name: userId
 *         description: ID of the user who owns the page and bio block.
 *         required: true
 *         schema:
 *           type: string
 *           example: "64db5086a68cd90a49774199"
 *       - in: path
 *         name: pageId
 *         description: ID of the page containing the bio block.
 *         required: true
 *         schema:
 *           type: string
 *           example: "55dd8d6a95c1bef4603276zsr3"
 *       - in: path
 *         name: blockId
 *         description: ID of the bio block to be deleted.
 *         required: true
 *         schema:
 *           type: string
 *           example: "hagdhjv23234jvsD2443224sff"
 *     responses:
 *       200:
 *         description: Bio deleted successfully.
 *       400:
 *         description: Bad request.
 *       500:
 *         description: An error occurred.
 */

router.delete(
  "/delete/:userId/:pageId/:blockId",
  verifyToken,
  onDeleteBioValidator,
  deleteBio
);

export default router;
