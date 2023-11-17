import express from "express";

// Middlewares
import {
  createContactCardValidator,
  deleteContactCardValidator,
  updateContactCardValidator,
} from "../../../../middlewares/validators/contactCard.js";

import verifyToken from "../../../../middlewares/auth/verifyJWT.js";

// Controllers
import {
  createContactCard,
  deleteContactCard,
  updateContactCard,
} from "../../../../controllers/contactCard.js";

const router = express.Router();

// Contact form api's
/**
 * @openapi
 * /api/v1/contact-card/create/{userId}/{pageId}:
 *   post:
 *     summary: Create a new contact card block on a page
 *     tags: [Contact Card]
 *     parameters:
 *       - in: path
 *         name: userId
 *         description: ID of the user for whom the contact card block is being created.
 *         required: true
 *         schema:
 *           type: string
 *           example: "64db5086a68cd90a49774199"
 *       - in: path
 *         name: pageId
 *         description: ID of the page to which the contact card block is being added.
 *         required: true
 *         schema:
 *           type: string
 *           example: "55dd8d6a95c1bef4603276zsr3"
 *     requestBody:
 *       description: Data for creating a new contact card block.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               blockType:
 *                 type: string
 *                 example: "contactCard"
 *               blockOrder:
 *                 type: integer
 *                 example: 3
 *               data:
 *                 type: object
 *                 properties:
 *                   firstname:
 *                     type: string
 *                     example: "asdf"
 *                   lastname:
 *                     type: string
 *                     example: "asdf"
 *                   company:
 *                     type: string
 *                     example: "asdf"
 *                   position:
 *                     type: string
 *                     example: "asdf"
 *                   email:
 *                     type: string
 *                     example: "asdf"
 *                   phone:
 *                     type: integer
 *                     example: 123
 *                   address1:
 *                     type: string
 *                     example: "asdf"
 *                   address2:
 *                     type: string
 *                     example: "asdf"
 *                   city:
 *                     type: string
 *                     example: "asdf"
 *                   state:
 *                     type: string
 *                     example: "asdf"
 *                   zip:
 *                     type: integer
 *                     example: 123
 *                   country:
 *                     type: string
 *                     example: "asdf"
 *                   buttonText:
 *                     type: string
 *                     example: "asdf"
 *                   icon:
 *                     type: string
 *                     example: "asdf"
 *                   highlight:
 *                     type: boolean
 *                     example: true
 *                   allowDownload:
 *                     type: boolean
 *                     example: true
 *                   downloadButtonText:
 *                     type: string
 *                     example: "asdf"
 *     responses:
 *       201:
 *         description: Contact card created successfully.
 *       400:
 *         description: Bad request.
 *       500:
 *         description: An error occurred.
 */

router.post(
  "/create/:userId/:pageId",
  verifyToken,
  createContactCardValidator,
  createContactCard
);

/**
 * @openapi
 * /api/v1/contact-card/edit/{userId}/{pageId}/{blockId}:
 *   patch:
 *     summary: Update an existing contact card block on a page
 *     tags: [Contact Card]
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
 *         description: ID of the page containing the contact card block.
 *         required: true
 *         schema:
 *           type: string
 *           example: "55dd8d6a95c1bef4603276zsr3"
 *       - in: path
 *         name: blockId
 *         description: ID of the contact card block to be updated.
 *         required: true
 *         schema:
 *           type: string
 *           example: "jasfb43bjsd234bja25bs234br4"
 *     requestBody:
 *       description: Data for updating the contact card block.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               data:
 *                 type: object
 *                 properties:
 *                   firstname:
 *                     type: string
 *                     example: "Updated First Name"
 *                   lastname:
 *                     type: string
 *                     example: "Updated Last Name"
 *                   company:
 *                     type: string
 *                     example: "Updated Company"
 *                   position:
 *                     type: string
 *                     example: "Updated Position"
 *                   email:
 *                     type: string
 *                     example: "updated@example.com"
 *                   phone:
 *                     type: string
 *                     example: "+9876543210"
 *                   address1:
 *                     type: string
 *                     example: "Updated Address 1"
 *                   address2:
 *                     type: string
 *                     example: "Updated Address 2"
 *                   city:
 *                     type: string
 *                     example: "Updated City"
 *                   state:
 *                     type: string
 *                     example: "Updated State"
 *                   zip:
 *                     type: integer
 *                     example: 98765
 *                   country:
 *                     type: string
 *                     example: "Updated Country"
 *                   buttonText:
 *                     type: string
 *                     example: "Updated Button Text"
 *                   icon:
 *                     type: string
 *                     example: "Updated Icon"
 *                   highlight:
 *                     type: boolean
 *                     example: true
 *                   allowDownload:
 *                     type: boolean
 *                     example: true
 *                   downloadButtonText:
 *                     type: string
 *                     example: "Updated Download Button Text"
 *     responses:
 *       200:
 *         description: Contact card updated successfully.
 *       400:
 *         description: Bad request.
 *       500:
 *         description: An error occurred.
 */

router.patch(
  "/edit/:userId",
  verifyToken,
  updateContactCardValidator,
  updateContactCard
);

/**
 * @openapi
 * /api/v1/contact-card/delete/{userId}/{pageId}/{blockId}:
 *   delete:
 *     summary: Delete an existing contact card block from a page
 *     tags: [Contact Card]
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
 *         description: ID of the page containing the contact card block.
 *         required: true
 *         schema:
 *           type: string
 *           example: "55dd8d6a95c1bef4603276zsr3"
 *       - in: path
 *         name: blockId
 *         description: ID of the contact card block to be deleted.
 *         required: true
 *         schema:
 *           type: string
 *           example: "jasfb43bjsd234bja25bs234br4"
 *     responses:
 *       200:
 *         description: Contact card deleted successfully.
 *       400:
 *         description: Bad request.
 *       500:
 *         description: An error occurred.
 */

router.delete(
  "/delete/:userId/:pageId/:blockId",
  verifyToken,
  deleteContactCardValidator,
  deleteContactCard
);

export default router;
