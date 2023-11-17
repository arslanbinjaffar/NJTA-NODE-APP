import express from "express";

// Controllers
import {
  createContactForm,
  deleteContactForm,
  updateContactForm,
} from "../../../../controllers/contactForm.js";

// Middlewares
import {
  onCreateContactFormValidator,
  onDeleteContactFormValidator,
  onEditContactFormValidator,
} from "../../../../middlewares/validators/contactForm.js";

import verifyToken from "../../../../middlewares/auth/verifyJWT.js";

const router = express.Router();

//Contact form api's
/**
 * @openapi
 * /api/v1/contact-form/create/{userId}/{pageId}:
 *   post:
 *     summary: Create a new contact form block on a page
 *     tags: [Contact Form]
 *     parameters:
 *       - in: path
 *         name: userId
 *         description: ID of the user for whom the contact form block is being created.
 *         required: true
 *         schema:
 *           type: string
 *           example: "64db5086a68cd90a49774199"
 *       - in: path
 *         name: pageId
 *         description: ID of the page to which the contact form block is being added.
 *         required: true
 *         schema:
 *           type: string
 *           example: "55dd8d6a95c1bef4603276zsr3"
 *     requestBody:
 *       description: Data for creating a new contact form block.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               blockType:
 *                 type: string
 *                 example: "contactForm"
 *               blockOrder:
 *                 type: integer
 *                 example: 4
 *               data:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: boolean
 *                     example: false
 *                   emailaddress:
 *                     type: boolean
 *                     example: true
 *                   phone:
 *                     type: boolean
 *                     example: true
 *                   message:
 *                     type: boolean
 *                     example: true
 *                   email:
 *                     type: string
 *                     example: "    "
 *                   buttonText:
 *                     type: string
 *                     example: "jksfh"
 *                   icon:
 *                     type: string
 *                     example: "ashfis"
 *                   highlight:
 *                     type: boolean
 *                     example: false
 *                   formButtonText:
 *                     type: string
 *                     example: "good "
 *                   formConfirmationText:
 *                     type: string
 *                     example: "anny"
 *     responses:
 *       201:
 *         description: Contact form created successfully.
 *       400:
 *         description: Bad request.
 *       500:
 *         description: An error occurred.
 */

router.post(
  "/create/:userId/:pageId",
  verifyToken,
  onCreateContactFormValidator,
  createContactForm
);

/**
 * @openapi
 * /api/v1/contact-form/edit/{userId}/{pageId}/{blockId}:
 *   patch:
 *     summary: Update an existing contact form block on a page
 *     tags: [Contact Form]
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
 *         description: ID of the page containing the contact form block.
 *         required: true
 *         schema:
 *           type: string
 *           example: "55dd8d6a95c1bef4603276zsr3"
 *       - in: path
 *         name: blockId
 *         description: ID of the contact form block to be updated.
 *         required: true
 *         schema:
 *           type: string
 *           example: "afvui214ga235bsdjg35jsvfdu2"
 *     requestBody:
 *       description: Data for updating the contact form block.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               data:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: boolean
 *                     example: true
 *                   emailaddress:
 *                     type: boolean
 *                     example: false
 *                   phone:
 *                     type: boolean
 *                     example: false
 *                   message:
 *                     type: boolean
 *                     example: true
 *                   email:
 *                     type: string
 *                     example: "updated@example.com"
 *                   buttonText:
 *                     type: string
 *                     example: "updatedButtonText"
 *                   icon:
 *                     type: string
 *                     example: "updatedIcon"
 *                   highlight:
 *                     type: boolean
 *                     example: true
 *                   formButtonText:
 *                     type: string
 *                     example: "updatedFormButtonText"
 *                   formConfirmationText:
 *                     type: string
 *                     example: "updatedFormConfirmationText"
 *     responses:
 *       200:
 *         description: Contact form updated successfully.
 *       400:
 *         description: Bad request.
 *       500:
 *         description: An error occurred.
 */

router.patch(
  "/edit/:userId/:pageId/:blockId",
  verifyToken,
  onEditContactFormValidator,
  updateContactForm
);

/**
 * @openapi
 * /api/v1/contact-form/delete/{userId}/{pageId}/{blockId}:
 *   delete:
 *     summary: Delete an existing contact form block from a page
 *     tags: [Contact Form]
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
 *         description: ID of the page containing the contact form block.
 *         required: true
 *         schema:
 *           type: string
 *           example: "55dd8d6a95c1bef4603276zsr3"
 *       - in: path
 *         name: blockId
 *         description: ID of the contact form block to be deleted.
 *         required: true
 *         schema:
 *           type: string
 *           example: "afvui214ga235bsdjg35jsvfdu2"
 *     responses:
 *       200:
 *         description: Contact form deleted successfully.
 *       400:
 *         description: Bad request.
 *       500:
 *         description: An error occurred.
 */

router.delete(
  "/delete/:userId/:pageId/:blockId",
  verifyToken,
  onDeleteContactFormValidator,
  deleteContactForm
);

export default router;
