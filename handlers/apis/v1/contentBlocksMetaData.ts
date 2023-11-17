import express from "express";

// Middlewares
import {
  onCreateCBMDValidator,
  onEditCBMDValidator,
  onDeleteCBMDValidator,
} from "../../../middlewares/validators/contentBlockMD.js";

// Controllers
import {
  getAllContentBlockMD,
  createContentBlockMD,
  editContentBlockMD,
  deleteContentBlockMD,
  deleteAllContentBlockMD,
} from "../../../controllers/contentBlocksMetaData.js";

const router = express.Router();

// ContentBlockMetaGlobal api's
/**
 * @openapi
 * /api/v1/content-block/create:
 *   post:
 *     summary: Create a new content block metadata globally
 *     tags: [Content Block Meta Global]
 *     requestBody:
 *       description: Data for creating a new content block metadata globally.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "logo"
 *               subtitle:
 *                 type: string
 *                 example: "asdf"
 *               global:
 *                 type: boolean
 *                 example: true
 *               pro:
 *                 type: boolean
 *                 example: false
 *               icon:
 *                 type: string
 *                 example: "asdf"
 *               section:
 *                 type: string
 *                 example: "asdf"
 *               blockLimit:
 *                 type: integer
 *                 example: 3
 *               blockType:
 *                 type: string
 *                 example: "logo"
 *     responses:
 *       201:
 *         description: Content block metadata created successfully.
 *       400:
 *         description: Bad request.
 *       500:
 *         description: An error occurred.
 */

router.post("/create", onCreateCBMDValidator, createContentBlockMD);

/**
 * @openapi
 * /api/v1/content-block:
 *   get:
 *     summary: Get all content block metadata
 *     tags: [Content Block Meta Global]
 *     responses:
 *       200:
 *         description: Successfully retrieved all content block metadata.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 200
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: "64e30fafb974c7b6b2dfa36d"
 *                       title:
 *                         type: string
 *                         example: "Bio"
 *                       subtitle:
 *                         type: string
 *                         example: "Introduce yourself"
 *                       global:
 *                         type: boolean
 *                         example: true
 *                       pro:
 *                         type: boolean
 *                         example: false
 *                       icon:
 *                         type: string
 *                         example: "bio.png"
 *                       section:
 *                         type: string
 *                         example: "Essentials"
 *                       blockLimit:
 *                         type: integer
 *                         example: 1
 *                       blockType:
 *                         type: string
 *                         example: "bio"
 *                 message:
 *                   type: null
 *     security: []
 */

router.get("/", getAllContentBlockMD);

/**
 * @openapi
 * /api/v1/content-block/edit/{blockId}:
 *   patch:
 *     summary: Update content block metadata by block ID
 *     tags: [Content Block Meta Global]
 *     parameters:
 *       - in: path
 *         name: blockId
 *         description: ID of the content block metadata to be updated.
 *         required: true
 *         schema:
 *           type: string
 *           example: "64e30fafb974c7b6b2dfa36d"
 *     requestBody:
 *       description: Data for updating content block metadata.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Updated Title"
 *               subtitle:
 *                 type: string
 *                 example: "Updated Subtitle"
 *               global:
 *                 type: boolean
 *                 example: true
 *               pro:
 *                 type: boolean
 *                 example: true
 *               icon:
 *                 type: string
 *                 example: "updated-icon.png"
 *               section:
 *                 type: string
 *                 example: "Updated Section"
 *               blockLimit:
 *                 type: integer
 *                 example: 5
 *               blockType:
 *                 type: string
 *                 example: "updatedBlockType"
 *     responses:
 *       200:
 *         description: Content block metadata updated successfully.
 *       400:
 *         description: Bad request.
 *       500:
 *         description: An error occurred.
 */

router.patch("/edit/:blockId", onEditCBMDValidator, editContentBlockMD);

/**
 * @openapi
 * /api/v1/content-block/delete/{blockId}:
 *   delete:
 *     summary: Delete content block metadata by block ID
 *     tags: [Content Block Meta Global]
 *     parameters:
 *       - in: path
 *         name: blockId
 *         description: ID of the content block metadata to be deleted.
 *         required: true
 *         schema:
 *           type: string
 *           example: "64e30fafb974c7b6b2dfa36d"
 *     responses:
 *       200:
 *         description: Content block metadata deleted successfully.
 *       400:
 *         description: Bad request.
 *       500:
 *         description: An error occurred.
 */

router.delete("/delete/:blockId", onDeleteCBMDValidator, deleteContentBlockMD);

/**
 * @openapi
 * /api/v1/content-block/delete-all:
 *   delete:
 *     summary: Delete all content block metadata
 *     tags: [Content Block Meta Global]
 *     responses:
 *       200:
 *         description: All content block metadata deleted successfully.
 *       400:
 *         description: Bad request.
 *       500:
 *         description: An error occurred.
 */

router.delete("/delete-all", deleteAllContentBlockMD);

export default router;
