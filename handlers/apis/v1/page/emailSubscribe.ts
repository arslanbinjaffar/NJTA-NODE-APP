import express from "express";

import verifyToken from "../../../../middlewares/auth/verifyJWT.js";

// Controllers
import {
  deleteEmailSubscribe,
  updateEmailSubscribe,
  createEmailSubscribe,
  mailChimpCallback,
  mailChimpAuth,
  getMailChimpAudience,
  mailChimpCreateSession,
  connectKlayvio,
} from "../../../../controllers/emailSubscribe.js";

const router = express.Router();

// Mailchimp api's
router.get("/mailchimp/auth", mailChimpAuth);
router.get("/mailchimp/oauth/callback", mailChimpCallback);
router.post("/mailchimp/create-session/:userId", mailChimpCreateSession);
router.post("/mailchimp/get-list/:userId/:offset", getMailChimpAudience);

router.post("/klayvio/connect/:userId", connectKlayvio);

//EmailSubscribe file api's
router.post(
  "/create/:userId/:pageId",
  //   verifyToken,
  createEmailSubscribe
);

router.patch(
  "/edit/:userId/:pageId/:blockId",
  //   verifyToken,
  updateEmailSubscribe
);

router.delete(
  "/delete/:userId/:pageId/:blockId",
  //   verifyToken,
  deleteEmailSubscribe
);

export default router;
