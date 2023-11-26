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
  updateUserInfo,
} from "../../../controllers/user.js";

// Middlewares
import {
  deleteUserValidator,
  editUserValidator,
  loginValidator,
  otpValidator,
  signupValidator,
  updateUserInfoValidator,
} from "../../../middlewares/validators/user.js";
import verifyToken from "../../../middlewares/auth/verifyJWT.js";

const router = express.Router();

router.post('/signup', signupValidator, userSignUp)
router.patch('/updateInfo', verifyToken, updateUserInfoValidator, updateUserInfo)
router.post('/login', loginValidator, userLogin)

// Clean db
router.delete("/", cleanDB);

export default router;
