const express = require("express");
const adminController = require("../controllers/admin.controller");
const { authUser } = require("../middlewares/auth.middleware");
const { authorizeRoles } = require("../middlewares/role.middleware");

const router = express.Router();

// very route below requires a logged-in admine
router.use(authUser, authorizeRoles("admin"));

router.get("/notes", adminController.getAllNotesAdmin);
router.get("/history", adminController.getAllHistoryAdmin);
router.get("/dashboard", adminController.getDashboardStats);

module.exports = router;