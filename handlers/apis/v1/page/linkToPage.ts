import express from "express";

// Controllers
import {
  createLinkToPage,
  deleteLinkToPage,
  updateLinkToPage,
} from "../../../../controllers/linkToPage.js";

// Middlewares
import {
  onCreateLinkToPageValidator,
  onDeleteLinkToPageValidator,
  onEditLinkToPageValidator,
} from "../../../../middlewares/validators/linkToPage.js";

import verifyToken from "../../../../middlewares/auth/verifyJWT.js";

const router = express.Router();

//LinkToPage api's
/**
 * @openapi
 * /api/v1/link-to-page/create/{userId}/{pageId}:
 *   post:
 *     summary: Create a new link to page block on a page
 *     tags: [Link To Page]
 *     parameters:
 *       - in: path
 *         name: userId
 *         description: ID of the user for whom the link to page block is being created.
 *         required: true
 *         schema:
 *           type: string
 *           example: "64db5086a68cd90a49774199"
 *       - in: path
 *         name: pageId
 *         description: ID of the page to which the link to page block is being added.
 *         required: true
 *         schema:
 *           type: string
 *           example: "55dd8d6a95c1bef4603276zsr3"
 *     requestBody:
 *       description: Data for creating a new link to page block.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               blockType:
 *                 type: string
 *                 example: "linkToPage"
 *               blockOrder:
 *                 type: integer
 *                 example: 2
 *               data:
 *                 type: object
 *                 properties:
 *                   selectedPageId:
 *                     type: string
 *                     example: "64d22fc4bbe88ff967fb2dbd"
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
 *         description: Link to page created successfully.
 *       400:
 *         description: Bad request.
 *       500:
 *         description: An error occurred.
 */

router.post(
  "/create/:userId/:pageId",
  verifyToken,
  onCreateLinkToPageValidator,
  createLinkToPage
);

/**
 * @openapi
 * /api/v1/link-to-page/edit/{userId}/{pageId}/{blockId}:
 *   patch:
 *     summary: Update an existing link to page block on a page
 *     tags: [Link To Page]
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
 *         description: ID of the page containing the link to page block.
 *         required: true
 *         schema:
 *           type: string
 *           example: "55dd8d6a95c1bef4603276zsr3"
 *       - in: path
 *         name: blockId
 *         description: ID of the link to page block to be updated.
 *         required: true
 *         schema:
 *           type: string
 *           example: "jasfb43bjsd234bja25bs234br4"
 *     requestBody:
 *       description: Data for updating the link to page block.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               data:
 *                 type: object
 *                 properties:
 *                   selectedPageId:
 *                     type: string
 *                     example: "updatedSelectedPageId"
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
 *         description: Link to page updated successfully.
 *       400:
 *         description: Bad request.
 *       500:
 *         description: An error occurred.
 */

router.patch(
  "/edit/:userId/:pageId/:blockId",
  verifyToken,
  onEditLinkToPageValidator,
  updateLinkToPage
);

/**
 * @openapi
 * /api/v1/link-to-page/delete/{userId}/{pageId}/{blockId}:
 *   delete:
 *     summary: Delete an existing link to page block from a page
 *     tags: [Link To Page]
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
 *         description: ID of the page containing the link to page block.
 *         required: true
 *         schema:
 *           type: string
 *           example: "55dd8d6a95c1bef4603276zsr3"
 *       - in: path
 *         name: blockId
 *         description: ID of the link to page block to be deleted.
 *         required: true
 *         schema:
 *           type: string
 *           example: "jasfb43bjsd234bja25bs234br4"
 *     responses:
 *       200:
 *         description: Link to page deleted successfully.
 *       400:
 *         description: Bad request.
 *       500:
 *         description: An error occurred.
 */

router.delete(
  "/delete/:userId/:pageId/:blockId",
  verifyToken,
  onDeleteLinkToPageValidator,
  deleteLinkToPage
);

export default router;
