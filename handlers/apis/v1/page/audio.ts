import express from "express";

// Controllers
import {
  deleteAudio,
  updateAudio,
  createAudio,
} from "../../../../controllers/audio.js";

// Middlewares
import verifyToken from "../../../../middlewares/auth/verifyJWT.js";
import {
  createAudioValidator,
  deleteAudioValidator,
  updateAudioValidator,
} from "../../../../middlewares/validators/audio.js";

const router = express.Router();

//Audio file api's
/**
 * @openapi
 * /api/v1/audio/create/{userId}/{pageId}:
 *   post:
 *     summary: Create a new audio block on a page
 *     tags: [Audio]
 *     parameters:
 *       - in: path
 *         name: userId
 *         description: ID of the user for whom the audio block is being created.
 *         required: true
 *         schema:
 *           type: string
 *           example: "64db5086a68cd90a49774199"
 *       - in: path
 *         name: pageId
 *         description: ID of the page to which the audio block is being added.
 *         required: true
 *         schema:
 *           type: string
 *           example: "55dd8d6a95c1bef4603276zsr3"
 *     requestBody:
 *       description: Data for creating a new audio block.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               blockType:
 *                 type: string
 *                 example: "audio"
 *               blockOrder:
 *                 type: integer
 *                 example: 2
 *               data:
 *                 type: object
 *                 properties:
 *                   audioUrl:
 *                     type: string
 *                     example: "lskbdjailkd"
 *     responses:
 *       201:
 *         description: Audio created successfully.
 *       400:
 *         description: Bad request.
 *       500:
 *         description: An error occurred.
 */

router.post(
  "/create/:userId/:pageId",
  verifyToken,
  createAudioValidator,
  createAudio
);

/**
 * @openapi
 * /api/v1/audio/edit/{userId}/{pageId}/{blockId}:
 *   patch:
 *     summary: Update an existing audio block on a page
 *     tags: [Audio]
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
 *         description: ID of the page containing the audio block.
 *         required: true
 *         schema:
 *           type: string
 *           example: "55dd8d6a95c1bef4603276zsr3"
 *       - in: path
 *         name: blockId
 *         description: ID of the audio block to be updated.
 *         required: true
 *         schema:
 *           type: string
 *           example: "jkshfjk345ksd23543ksbk2345n"
 *     requestBody:
 *       description: Data for updating the audio block.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               data:
 *                 type: object
 *                 properties:
 *                   audioUrl:
 *                     type: string
 *                     example: "updatedAudioUrl"
 *     responses:
 *       200:
 *         description: Audio updated successfully.
 *       400:
 *         description: Bad request.
 *       500:
 *         description: An error occurred.
 */

router.patch(
  "/edit/:userId/:pageId/:blockId",
  verifyToken,
  updateAudioValidator,
  updateAudio
);

/**
 * @openapi
 * /api/v1/audio/delete/{userId}/{pageId}/{blockId}:
 *   delete:
 *     summary: Delete an existing audio block from a page
 *     tags: [Audio]
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
 *         description: ID of the page containing the audio block.
 *         required: true
 *         schema:
 *           type: string
 *           example: "55dd8d6a95c1bef4603276zsr3"
 *       - in: path
 *         name: blockId
 *         description: ID of the audio block to be deleted.
 *         required: true
 *         schema:
 *           type: string
 *           example: "jkshfjk345ksd23543ksbk2345n"
 *     responses:
 *       200:
 *         description: Audio deleted successfully.
 *       400:
 *         description: Bad request.
 *       500:
 *         description: An error occurred.
 */

router.delete(
  "/delete/:userId/:pageId/:blockId",
  verifyToken,
  deleteAudioValidator,
  deleteAudio
);

export default router;
