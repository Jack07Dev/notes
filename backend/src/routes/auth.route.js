const express = require("express");
const authController = require("../controllers/auth.controller");
const { authUser } = require("../middlewares/auth.middleware");
const router = express.Router();

router.post("/register", authController.userRegisteration);
router.post("/login", authController.userLogin);
router.post("/logout", authController.userLogout);
router.get("/me", authUser, authController.getCurrentUser);
router.put("/profile", authUser, authController.updateProfile);
router.put("/change-password", authUser, authController.changePassword);
router.post("/forgot-password", authController.forgotPassword);
router.post("/verify-otp", authController.verifyOtp);
router.post("/reset-password", authController.resetPassword);

module.exports = router;
