const express = require("express");
const { authUser } = require("../middlewares/auth.middleware");
const historyService = require("../services/history.service");

const router = express.Router();

router.get("/", authUser, async (req, res, next) => {
  try {
    const history = await historyService.getUserHistory(req.user.id);
    res.status(200).json({ success: true, data: history });
  } catch (error) {
    next(error);
  }
});

module.exports = router;