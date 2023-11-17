import express from "express";

// Controllers
import {
  addQrStyles,
  createQrCode,
  deleteQRcode,
  deleteQRcodeStyle,
  getAllQrCodeStylesByUserId,
  getAllQrCodes,
  getQrCodeByUserId,
  updateQrCode,
  updateQrStyles,
} from "../../../controllers/qrcode.js";

// Middlewares
import {
  createQrCodeValidator,
  deleteQRCodeValidator,
  deleteQRcodeStyleValidator,
  qrCodeByUserIdValidator,
  qrCodeStylesByUserIdValidator,
  qrStylesUpdateValidator,
  qrStylesValidator,
} from "../../../middlewares/validators/qrcode.js";
import verifyToken from "../../../middlewares/auth/verifyJWT.js";

const router = express.Router();

// Qr-code api's
/**
 * @openapi
 * /api/v1/qr/add-qr-styles:
 *   post:
 *     summary: Add QR code styles
 *     tags: [QR Code]
 *     requestBody:
 *       description: Data for adding QR code styles.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 example: "64ca4f06f9d37cd926bc7c1b"
 *               styles:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     color:
 *                       type: string
 *                       example: "red"
 *     responses:
 *       200:
 *         description: QR code styles added successfully.
 *       400:
 *         description: Bad request.
 *       500:
 *         description: An error occurred.
 */

router.post(
  "/add-qr-styles/:userId",
  verifyToken,
  qrStylesValidator,
  addQrStyles
);

/**
 * @openapi
 * /api/v1/qr/update-qr-styles:
 *   patch:
 *     summary: Update QR code styles
 *     tags: [QR Code]
 *     requestBody:
 *       description: Data for updating QR code styles.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 example: "64ca4f06f9d37cd926bc7c1b"
 *               styles:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     color:
 *                       type: string
 *                       example: "blue"
 *     responses:
 *       200:
 *         description: QR code styles updated successfully.
 *       400:
 *         description: Bad request.
 *       500:
 *         description: An error occurred.
 */

router.patch(
  "/update-qr-styles/:userId/:qrStyleId",
  verifyToken,
  qrStylesUpdateValidator,
  updateQrStyles
);

router.patch(
  "/update-qr-code/:userId/:qrCodeId",
  verifyToken,
  qrStylesUpdateValidator,
  updateQrCode
);

/**
 * @openapi
 * /api/v1/qr/create-qrcode/{userId}:
 *   post:
 *     summary: Create a new QR code
 *     tags: [QR Code]
 *     parameters:
 *       - in: path
 *         name: userId
 *         description: ID of the user for whom the QR code is being created.
 *         required: true
 *         schema:
 *           type: string
 *           example: "64db5086a68cd90a49774199"
 *     requestBody:
 *       description: Data for creating a new QR code.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "qr"
 *               image:
 *                 type: string
 *                 example: "asdf"
 *               qrCodeImage:
 *                 type: string
 *                 example: "asdf"
 *               styleInfo:
 *                 type: object
 *                 properties:
 *                   color:
 *                     type: string
 *                     example: "green"
 *               destinationUrl:
 *                 type: string
 *                 example: "https://ab1c.com"
 *     responses:
 *       201:
 *         description: QR code created successfully.
 *       400:
 *         description: Bad request.
 *       500:
 *         description: An error occurred.
 */

router.post(
  "/create-qrcode/:userId",
  verifyToken,
  createQrCodeValidator,
  createQrCode
);

/**
 * @openapi
 * /api/v1/qr/user-qrcodes/{id}:
 *   post:
 *     summary: Get QR codes for a user
 *     tags: [QR Code]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the user whose QR codes are being retrieved.
 *         required: true
 *         schema:
 *           type: string
 *           example: "64db5086a68cd90a49774199"
 *     requestBody:
 *       description: Data for finding QR codes by user ID.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: QR codes retrieved successfully.
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
 *                       name:
 *                         type: string
 *                         example: "qr"
 *                       image:
 *                         type: string
 *                         example: "asdf"
 *                       qrCodeImage:
 *                         type: string
 *                         example: "asdf"
 *                       styleInfo:
 *                         type: object
 *                         properties:
 *                           color:
 *                             type: string
 *                             example: "green"
 *                       destinationUrl:
 *                         type: string
 *                         example: "https://ab1c.com"
 *                 message:
 *                   type: null
 *       400:
 *         description: Bad request.
 *       500:
 *         description: An error occurred.
 */

router.get(
  "/qrcode/:userId",
  verifyToken,
  qrCodeByUserIdValidator,
  getQrCodeByUserId
);

/**
 * @openapi
 * /api/v1/qr/all-qrcodes:
 *   get:
 *     summary: Get all QR codes
 *     tags: [QR Code]
 *     responses:
 *       200:
 *         description: QR codes retrieved successfully.
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
 *                       name:
 *                         type: string
 *                         example: "qr"
 *                       image:
 *                         type: string
 *                         example: "asdf"
 *                       qrCodeImage:
 *                         type: string
 *                         example: "asdf"
 *                       styleInfo:
 *                         type: object
 *                         properties:
 *                           color:
 *                             type: string
 *                             example: "green"
 *                       destinationUrl:
 *                         type: string
 *                         example: "https://ab1c.com"
 *                 message:
 *                   type: null
 *       400:
 *         description: Bad request.
 *       500:
 *         description: An error occurred.
 */

router.get("/all-qrcodes", getAllQrCodes);
router.get(
  "/all-qrcode-styles/:userId",
  verifyToken,
  qrCodeStylesByUserIdValidator,
  getAllQrCodeStylesByUserId
);

/**
 * @openapi
 * /api/v1/qr/qrcode/{id}:
 *   delete:
 *     summary: Delete a QR code by ID
 *     tags: [QR Code]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the QR code to be deleted.
 *         required: true
 *         schema:
 *           type: string
 *           example: "64e85224759987c896317752"
 *     responses:
 *       200:
 *         description: QR code deleted successfully.
 *       400:
 *         description: Bad request.
 *       500:
 *         description: An error occurred.
 */

router.delete(
  "/qrcode/:userId/:qrCodeId",
  verifyToken,
  deleteQRCodeValidator,
  deleteQRcode
);

/**
 * @openapi
 * /api/v1/qr/delete-qr-styles/{id}:
 *   delete:
 *     summary: Delete a QR code style by ID
 *     tags: [QR Code]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the QR code style to be deleted.
 *         required: true
 *         schema:
 *           type: string
 *           example: "64e85224759987c896317752"
 *     responses:
 *       200:
 *         description: QR code style deleted successfully.
 *       400:
 *         description: Bad request.
 *       500:
 *         description: An error occurred.
 */

router.delete(
  "/delete-qr-styles/:userId/:qrStyleId",
  verifyToken,
  deleteQRcodeStyleValidator,
  deleteQRcodeStyle
);

export default router;
