import express from "express";

// Middlewares
import {
  createHeadingValidator,
  deleteHeadingValidator,
  updateHeadingValidator,
} from "../../../../middlewares/validators/heading.js";

import verifyToken from "../../../../middlewares/auth/verifyJWT.js";

// Controllers
import {
  createPageHeading,
  deleteHeading,
  updateHeading,
} from "../../../../controllers/heading.js";

const router = express.Router();

// Heading api's

/**
 * @openapi
 * /api/v1/heading/create/{userId}/{pageId}:
 *   post:
 *     summary: Create a new heading block on a page
 *     tags: [Heading]
 *     parameters:
 *       - in: path
 *         name: userId
 *         description: ID of the user for whom the heading block is being created.
 *         required: true
 *         schema:
 *           type: string
 *           example: "64db5086a68cd90a49774199"
 *       - in: path
 *         name: pageId
 *         description: ID of the page to which the heading block is being added.
 *         required: true
 *         schema:
 *           type: string
 *           example: "64ed8d6a95c1bef460276aec"
 *     requestBody:
 *       description: Data for creating a new heading block.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               blockOrder:
 *                 type: integer
 *                 example: 3
 *               blockType:
 *                 type: string
 *                 example: "heading"
 *               data:
 *                 type: object
 *                 properties:
 *                   heading:
 *                     type: string
 *                     example: "test12"
 *     responses:
 *       201:
 *         description: Heading created successfully.
 *       400:
 *         description: Bad request.
 *       500:
 *         description: An error occurred.
 */
router.post(
  "/create/:userId/:pageId",
  verifyToken,
  createHeadingValidator,
  createPageHeading
);

/**
 * @openapi
 * /api/v1/heading/edit/{userId}/{pageId}/{blockId}:
 *   patch:
 *     summary: Update an existing heading within a content block
 *     tags: [Heading]
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
 *         description: ID of the page containing the content block.
 *         required: true
 *         schema:
 *           type: string
 *           example: "64ed8d6a95c1bef460276aec"
 *       - in: path
 *         name: blockId
 *         description: ID of the content block containing the heading to be updated.
 *         required: true
 *         schema:
 *           type: string
 *           example: "55dd8d6a95c1bef4603276zsr"
 *     requestBody:
 *       description: Data for updating the heading within the content block.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               data:
 *                 type: object
 *                 properties:
 *                   heading:
 *                     type: string
 *                     example: "Updated Heading"
 *     responses:
 *       200:
 *         description: Heading within the content block updated successfully.
 *       400:
 *         description: Bad request.
 *       500:
 *         description: An error occurred.
 */

router.patch(
  "/edit/:userId/:pageId/:blockId",
  verifyToken,
  updateHeadingValidator,
  updateHeading
);

/**
 * @openapi
 * /api/v1/heading/delete/{userId}/{pageId}/{blockId}:
 *   delete:
 *     summary: Delete an existing heading from a content block
 *     tags: [Heading]
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
 *         description: ID of the page containing the content block.
 *         required: true
 *         schema:
 *           type: string
 *           example: "64ed8d6a95c1bef460276aec"
 *       - in: path
 *         name: blockId
 *         description: ID of the content block containing the heading to be deleted.
 *         required: true
 *         schema:
 *           type: string
 *           example: "55dd8d6a95c1bef4603276zsr"
 *     responses:
 *       200:
 *         description: Heading within the content block deleted successfully.
 *       400:
 *         description: Bad request.
 *       500:
 *         description: An error occurred.
 */

router.delete(
  "/delete/:userId/:pageId/:blockId",
  verifyToken,
  deleteHeadingValidator,
  deleteHeading
);

export default router;
