const Note = require("../models/note.model");

const getAllNotes = async (userId, role) => {
  if (role === "admin") {
    return await Note.find().sort({ createdAt: -1 });
  }
  return await Note.find({ user: userId }).sort({ createdAt: -1 });
};

const getNoteById = async (id, userId, role) => {
  const query = role === "admin" ? { _id: id } : { _id: id, user: userId };
  return await Note.findOne(query);
};

const createNote = async (noteData) => {
  return await Note.create(noteData);
};

const updateNote = async (id, noteData, userId, role) => {
  const query = role === "admin" ? { _id: id } : { _id: id, user: userId };
  return await Note.findByIdAndUpdate(query, noteData, {
    new: true,
    runValidators: true,
  });
};

const deleteNote = async (id, userId, role) => {
  const query = role === "admin" ? { _id: id } : { _id: id, user: userId };
  return await Note.findByIdAndDelete(query);
};

module.exports = {
  getAllNotes,
  getNoteById,
  createNote,
  updateNote,
  deleteNote,
};
