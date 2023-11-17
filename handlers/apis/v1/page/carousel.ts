import express from "express";

// Middlewares
import {
  uploadCarouselValidator,
  deleteCarouseValidator,
  updateCarouseValidator,
} from "../../../../middlewares/validators/carousel.js";

import verifyToken from "../../../../middlewares/auth/verifyJWT.js";

// Controllers
import {
  createCarousel,
  deleteCarousel,
  updateCarousel,
} from "../../../../controllers/carousel.js";

const router = express.Router();

// Carousel api's
/**
 * @openapi
 * /api/v1/carousel/create/{userId}/{pageId}:
 *   post:
 *     summary: Create a new carousel block on a page
 *     tags: [Carousel]
 *     parameters:
 *       - in: path
 *         name: userId
 *         description: ID of the user for whom the carousel block is being created.
 *         required: true
 *         schema:
 *           type: string
 *           example: "64db5086a68cd90a49774199"
 *       - in: path
 *         name: pageId
 *         description: ID of the page to which the carousel block is being added.
 *         required: true
 *         schema:
 *           type: string
 *           example: "55dd8d6a95c1bef4603276zsr3"
 *     requestBody:
 *       description: Data for creating a new carousel block.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               blockType:
 *                 type: string
 *                 example: "carousel"
 *               blockOrder:
 *                 type: integer
 *                 example: 2
 *               data:
 *                 type: object
 *                 properties:
 *                   carousels:
 *                     type: array
 *                     items:
 *                       type: string
 *                     example: ["asdf2"]
 *     responses:
 *       201:
 *         description: Carousel created successfully.
 *       400:
 *         description: Bad request.
 *       500:
 *         description: An error occurred.
 */

router.post(
  "/create/:userId/:pageId",
  verifyToken,
  uploadCarouselValidator,
  createCarousel
);

/**
 * @openapi
 * /api/v1/carousel/edit/{userId}/{pageId}/{blockId}:
 *   patch:
 *     summary: Update an existing carousel block on a page
 *     tags: [Carousel]
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
 *         description: ID of the page containing the carousel block.
 *         required: true
 *         schema:
 *           type: string
 *           example: "55dd8d6a95c1bef4603276zsr3"
 *       - in: path
 *         name: blockId
 *         description: ID of the carousel block to be updated.
 *         required: true
 *         schema:
 *           type: string
 *           example: "saif4bjd2b35hbsn23gjhnasfb2"
 *     requestBody:
 *       description: Data for updating the carousel block.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               data:
 *                 type: object
 *                 properties:
 *                   carousels:
 *                     type: array
 *                     items:
 *                       type: string
 *                     example: ["updatedCarouselUrl"]
 *     responses:
 *       200:
 *         description: Carousel updated successfully.
 *       400:
 *         description: Bad request.
 *       500:
 *         description: An error occurred.
 */

router.patch(
  "/edit/:userId/:pageId/:blockId",
  verifyToken,
  updateCarouseValidator,
  updateCarousel
);

/**
 * @openapi
 * /api/v1/carousel/delete/{userId}/{pageId}/{blockId}:
 *   delete:
 *     summary: Delete an existing carousel block from a page
 *     tags: [Carousel]
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
 *         description: ID of the page containing the carousel block.
 *         required: true
 *         schema:
 *           type: string
 *           example: "55dd8d6a95c1bef4603276zsr3"
 *       - in: path
 *         name: blockId
 *         description: ID of the carousel block to be deleted.
 *         required: true
 *         schema:
 *           type: string
 *           example: "saif4bjd2b35hbsn23gjhnasfb2"
 *     responses:
 *       200:
 *         description: Carousel deleted successfully.
 *       400:
 *         description: Bad request.
 *       500:
 *         description: An error occurred.
 */

router.delete(
  "/delete/:userId/:pageId/:blockId",
  verifyToken,
  deleteCarouseValidator,
  deleteCarousel
);

export default router;
