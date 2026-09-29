// services/historyService.js
const History = require("../models/history.model");

const logHistory = async ({ user, action, noteId, noteTitle }) => {
  return await History.create({ user, action, noteId, noteTitle });
};

const getUserHistory = async (userId) => {
  return await History.find({ user: userId }).sort({ createdAt: -1 });
};

const getAllHistory = async () => {
  return await History.find()
    .populate("user", "username email")
    .sort({ createdAt: -1 });
};

module.exports = { logHistory, getUserHistory, getAllHistory };