const historyService = require("../services/history.service");
const userModel = require("../models/auth.model");
const Note = require("../models/note.model");
const History = require("../models/history.model");

const getAllNotesAdmin = async (req, res, next) => {
  try {
    const notes = await Note.find()
      .populate("user", "username email")
      .sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: notes });
  } catch (error) {
    next(error);
  }
};

const getAllHistoryAdmin = async (req, res, next) => {
  try {
    const history = await historyService.getAllHistory();
    res.status(200).json({ success: true, data: history });
  } catch (error) {
    next(error);
  }
};

const getDashboardStats = async (req, res, next) => {
  try {
    const totalUsers = await userModel.countDocuments();

    const totalNotes = await Note.countDocuments();

    const totalHistoryEntries = await History.countDocuments();

    const recentNotes = await Note.countDocuments({
      createdAt: {
        $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      },
    });

    const deletedNotes = await History.countDocuments({
      action: "deleted",
    });

    res.status(200).json({
      success: true,
      data: {
        totalUsers,
        totalNotes,
        recentNotes,
        deletedNotes,
        totalHistoryEntries,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getAllNotesAdmin, getAllHistoryAdmin, getDashboardStats };
