import express from "express";

// Middlewares
import {
  createLogoValidator,
  deleteLogoValidator,
  updateLogoValidator,
} from "../../../../middlewares/validators/logo.js";

import verifyToken from "../../../../middlewares/auth/verifyJWT.js";

// Controllers
import {
  deleteLogo,
  updateLogo,
  createLogo,
} from "../../../../controllers/logo.js";

const router = express.Router();

//Logo file api's

/**
 * @openapi
 * /api/v1/logo/create/{userId}/{pageId}:
 *   post:
 *     summary: Create a new logo block on a page
 *     tags: [Logo]
 *     parameters:
 *       - in: path
 *         name: userId
 *         description: ID of the user for whom the logo block is being created.
 *         required: true
 *         schema:
 *           type: string
 *           example: "64db5086a68cd90a49774199"
 *       - in: path
 *         name: pageId
 *         description: ID of the page to which the logo block is being added.
 *         required: true
 *         schema:
 *           type: string
 *           example: "55dd8d6a95c1bef4603276zsr3"
 *     requestBody:
 *       description: Data for creating a new logo block.
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
 *                 example: "logo"
 *               data:
 *                 type: object
 *                 properties:
 *                   logoUrl:
 *                     type: string
 *                     example: "HASjkgdjf"
 *     responses:
 *       201:
 *         description: Logo created successfully.
 *       400:
 *         description: Bad request.
 *       500:
 *         description: An error occurred.
 */

router.post(
  "/create/:userId/:pageId",
  verifyToken,
  createLogoValidator,
  createLogo
);

/**
 * @openapi
 * /api/v1/logo/edit/{userId}/{pageId}/{blockId}:
 *   patch:
 *     summary: Update an existing logo block on a page
 *     tags: [Logo]
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
 *         description: ID of the page containing the logo block.
 *         required: true
 *         schema:
 *           type: string
 *           example: "55dd8d6a95c1bef4603276zsr3"
 *       - in: path
 *         name: blockId
 *         description: ID of the logo block to be updated.
 *         required: true
 *         schema:
 *           type: string
 *           example: "ankld8d6a95c1bef46ajksdkbaj"
 *     requestBody:
 *       description: Data for updating the logo block.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               data:
 *                 type: object
 *                 properties:
 *                   logoUrl:
 *                     type: string
 *                     example: "updated logo"
 *     responses:
 *       200:
 *         description: Logo updated successfully.
 *       400:
 *         description: Bad request.
 *       500:
 *         description: An error occurred.
 */

router.patch("/edit/:userId", verifyToken, updateLogoValidator, updateLogo);

/**
 * @openapi
 * /api/v1/logo/delete/{userId}/{pageId}/{blockId}:
 *   delete:
 *     summary: Delete an existing logo block from a page
 *     tags: [Logo]
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
 *         description: ID of the page containing the logo block.
 *         required: true
 *         schema:
 *           type: string
 *           example: "55dd8d6a95c1bef4603276zsr3"
 *       - in: path
 *         name: blockId
 *         description: ID of the logo block to be deleted.
 *         required: true
 *         schema:
 *           type: string
 *           example: "ankld8d6a95c1bef46ajksdkbaj"
 *     responses:
 *       200:
 *         description: Logo deleted successfully.
 *       400:
 *         description: Bad request.
 *       500:
 *         description: An error occurred.
 */

router
  .route("/delete/:userId/:pageId/:blockId")
  .delete(verifyToken, deleteLogoValidator, deleteLogo);

export default router;
