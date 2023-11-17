import express from "express";

// Controllers
import {
  cleanDB,
  deleteUser,
  editUser,
  getAllUsers,
  userLogin,
  userSignUp,
  verifyAccount,
  resendOtp,
  verifyOtp,
  getUserById,
} from "../../../controllers/user.js";

// Middleware
import verifyToken from "../../../middlewares/auth/verifyJWT.js";
import { createTenantValidator } from "../../../middlewares/validators/tenant.js";
import { createTenant } from "../../../controllers/tenant.js";

const router = express.Router();

router.post('/create',createTenantValidator,createTenant);

// Clean db
router.delete("/", cleanDB);

export default router;
