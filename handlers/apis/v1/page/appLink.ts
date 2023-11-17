import express from "express";

// Middlewares
import verifyToken from "../../../../middlewares/auth/verifyJWT.js";
import {
  appLinkCreateValidator,
  deleteAppLinkValidator,
  updateAppLinkValidator,
} from "../../../../middlewares/validators/appLink.js";

// Controllers
import {
  createAppLink,
  deleteAppLink,
  updateAppLink,
} from "../../../../controllers/appLink.js";

const router = express.Router();

/**
 * @openapi
 * /api/v1/app-link/create/{userId}/{pageId}:
 *   post:
 *     summary: Create a new app link block on a page
 *     tags: [App Link]
 *     parameters:
 *       - in: path
 *         name: userId
 *         description: ID of the user for whom the app link block is being created.
 *         required: true
 *         schema:
 *           type: string
 *           example: "64db5086a68cd90a49774199"
 *       - in: path
 *         name: pageId
 *         description: ID of the page to which the app link block is being added.
 *         required: true
 *         schema:
 *           type: string
 *           example: "55dd8d6a95c1bef4603276zsr3"
 *     requestBody:
 *       description: Data for creating a new app link block.
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
 *                 example: "appLink"
 *               data:
 *                 type: object
 *                 properties:
 *                   ios:
 *                     type: string
 *                     example: "ios.url"
 *                   android:
 *                     type: string
 *                     example: "android.url"
 *     responses:
 *       201:
 *         description: App link created successfully.
 *       400:
 *         description: Bad request.
 *       500:
 *         description: An error occurred.
 */

router.post(
  "/create/:userId/:pageId",
  verifyToken,
  appLinkCreateValidator,
  createAppLink
);

/**
 * @openapi
 * /api/v1/app-link/edit/{userId}/{pageId}/{blockId}:
 *   patch:
 *     summary: Update an existing app link block on a page
 *     tags: [App Link]
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
 *         description: ID of the page containing the app link block.
 *         required: true
 *         schema:
 *           type: string
 *           example: "55dd8d6a95c1bef4603276zsr3"
 *       - in: path
 *         name: blockId
 *         description: ID of the app link block to be updated.
 *         required: true
 *         schema:
 *           type: string
 *           example: "jkafgui23bhak124bvuzSw4baj4"
 *     requestBody:
 *       description: Data for updating the app link block.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               data:
 *                 type: object
 *                 properties:
 *                   ios:
 *                     type: string
 *                     example: "newIosUrl"
 *                   android:
 *                     type: string
 *                     example: "newAndroidUrl"
 *     responses:
 *       200:
 *         description: App link updated successfully.
 *       400:
 *         description: Bad request.
 *       500:
 *         description: An error occurred.
 */

router.patch(
  "/edit/:userId/:pageId/:blockId",
  verifyToken,
  updateAppLinkValidator,
  updateAppLink
);

/**
 * @openapi
 * /api/v1/app-link/delete/{userId}/{pageId}/{blockId}:
 *   delete:
 *     summary: Delete an existing app link block from a page
 *     tags: [App Link]
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
 *         description: ID of the page containing the app link block.
 *         required: true
 *         schema:
 *           type: string
 *           example: "55dd8d6a95c1bef4603276zsr3"
 *       - in: path
 *         name: blockId
 *         description: ID of the app link block to be deleted.
 *         required: true
 *         schema:
 *           type: string
 *           example: "jkafgui23bhak124bvuzSw4baj4"
 *     responses:
 *       200:
 *         description: App link deleted successfully.
 *       400:
 *         description: Bad request.
 *       500:
 *         description: An error occurred.
 */

router.delete(
  "/delete/:userId/:pageId/:blockId",
  verifyToken,
  deleteAppLinkValidator,
  deleteAppLink
);

export default router;
