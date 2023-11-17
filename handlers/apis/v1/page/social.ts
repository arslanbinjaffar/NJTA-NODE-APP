import express from "express";

// Middleware
import {
  deleteLinksValidator,
  createSocialLinkValidator,
  updateLinksValidator,
} from "../../../../middlewares/validators/social.js";

import verifyToken from "../../../../middlewares/auth/verifyJWT.js";

// Controllers
import {
  createSocialLink,
  deleteSocialLink,
  addSocialToPage,
} from "../../../../controllers/social.js";

const router = express.Router();

// Social api's
router.post(
  "/create/:userId",
  verifyToken,
  createSocialLinkValidator,
  createSocialLink
);
router.post(
  "/update/:userId/:pageId",
  verifyToken,
  updateLinksValidator,
  addSocialToPage
);
router.delete(
  "/delete/:userId/:pageId/:blockId",
  verifyToken,
  deleteLinksValidator,
  deleteSocialLink
);

export default router;
