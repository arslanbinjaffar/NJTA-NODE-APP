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
  personalInfo,
} from "../../../controllers/user.js";

// Middlewares
import {
  deleteUserValidator,
  editUserValidator,
  loginValidator,
  otpValidator,
  signupValidator,
  personalInfoValidator
} from "../../../middlewares/validators/user.js";
import verifyToken from "../../../middlewares/auth/verifyJWT.js";

const router = express.Router();

router.post('/signup', signupValidator, userSignUp);
router.post('/login', loginValidator, userLogin);
router.post('/personalInfo', personalInfoValidator, personalInfo);

// Clean db
router.delete("/", cleanDB);

export default router;
