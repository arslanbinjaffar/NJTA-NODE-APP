import express from "express";

// Controlles
import {
  createLink,
  deleteLink,
  updateLink,
} from "../../../../controllers/link.js";

// Middlewares
import {
  onCreateLinkValidator,
  onDeleteLinkValidator,
  onEditLinkValidator,
} from "../../../../middlewares/validators/link.js";

import verifyToken from "../../../../middlewares/auth/verifyJWT.js";

const router = express.Router();

//link api's
/**
 * @openapi
 * /api/v1/link/create/{userId}/{pageId}:
 *   post:
 *     summary: Create a new link block on a page
 *     tags: [Link]
 *     parameters:
 *       - in: path
 *         name: userId
 *         description: ID of the user for whom the link block is being created.
 *         required: true
 *         schema:
 *           type: string
 *           example: "64db5086a68cd90a49774199"
 *       - in: path
 *         name: pageId
 *         description: ID of the page to which the link block is being added.
 *         required: true
 *         schema:
 *           type: string
 *           example: "55dd8d6a95c1bef4603276zsr3"
 *     requestBody:
 *       description: Data for creating a new link block.
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
 *                 example: "link"
 *               data:
 *                 type: object
 *                 properties:
 *                   url:
 *                     type: string
 *                     example: "any"
 *                   icon:
 *                     type: string
 *                     example: "ashfis"
 *                   buttonText:
 *                     type: string
 *                     example: "enter"
 *                   highlight:
 *                     type: boolean
 *                     example: false
 *     responses:
 *       201:
 *         description: Link created successfully.
 *       400:
 *         description: Bad request.
 *       500:
 *         description: An error occurred.
 */

router.post(
  "/create/:userId/:pageId",
  verifyToken,
  onCreateLinkValidator,
  createLink
);
/**
 * @openapi
 * /api/v1/link/edit/{userId}/{pageId}/{blockId}:
 *   patch:
 *     summary: Update an existing link block on a page
 *     tags: [Link]
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
 *         description: ID of the page containing the link block.
 *         required: true
 *         schema:
 *           type: string
 *           example: "55dd8d6a95c1bef4603276zsr3"
 *       - in: path
 *         name: blockId
 *         description: ID of the link block to be updated.
 *         required: true
 *         schema:
 *           type: string
 *           example: "ajkfh23135ak24kjsd24kjsr244"
 *     requestBody:
 *       description: Data for updating the link block.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               data:
 *                 type: object
 *                 properties:
 *                   url:
 *                     type: string
 *                     example: "updatedUrl"
 *                   icon:
 *                     type: string
 *                     example: "updatedIcon"
 *                   buttonText:
 *                     type: string
 *                     example: "updatedButtonText"
 *                   highlight:
 *                     type: boolean
 *                     example: true
 *     responses:
 *       200:
 *         description: Link updated successfully.
 *       400:
 *         description: Bad request.
 *       500:
 *         description: An error occurred.
 */

router
  .route("/edit/:userId/:pageId/:blockId")
  .patch(verifyToken, onEditLinkValidator, updateLink);

/**
 * @openapi
 * /api/v1/link/delete/{userId}/{pageId}/{blockId}:
 *   delete:
 *     summary: Delete an existing link block from a page
 *     tags: [Link]
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
 *         description: ID of the page containing the link block.
 *         required: true
 *         schema:
 *           type: string
 *           example: "55dd8d6a95c1bef4603276zsr3"
 *       - in: path
 *         name: blockId
 *         description: ID of the link block to be deleted.
 *         required: true
 *         schema:
 *           type: string
 *           example: "ajkfh23135ak24kjsd24kjsr244"
 *     responses:
 *       200:
 *         description: Link deleted successfully.
 *       400:
 *         description: Bad request.
 *       500:
 *         description: An error occurred.
 */

router.delete(
  "/delete/:userId/:pageId/:blockId",
  verifyToken,
  onDeleteLinkValidator,
  deleteLink
);

export default router;
